import json
import os
import time
import urllib.request
import urllib.parse
from pathlib import Path

import websocket

BASE = os.environ.get('BHUNTU_SWEEP_BASE', 'http://127.0.0.1:4173/Bhuntu/')
SEQUENCE = json.loads(Path('/tmp/bhuntu_room_sequence.json').read_text()) if Path('/tmp/bhuntu_room_sequence.json').exists() else None

if SEQUENCE is None:
    raise SystemExit('Expected generated sequence JSON at /tmp/bhuntu_room_sequence.json')

events = []

def send(ws, method, params=None, counter=[0]):
    counter[0] += 1
    msg_id = counter[0]
    ws.send(json.dumps({'id': msg_id, 'method': method, 'params': params or {}}))
    while True:
        raw = ws.recv()
        msg = json.loads(raw)
        if msg.get('method') in {'Runtime.exceptionThrown', 'Runtime.consoleAPICalled', 'Log.entryAdded'}:
            events.append(msg)
        if msg.get('id') == msg_id:
            return msg

request = urllib.request.Request('http://127.0.0.1:9223/json/new?' + urllib.parse.quote(BASE), method='PUT')
with urllib.request.urlopen(request, timeout=10) as response:
    target = json.load(response)
ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=15)
send(ws, 'Runtime.enable')
send(ws, 'Page.enable')
send(ws, 'Network.enable')
send(ws, 'Runtime.evaluate', {'expression': "localStorage.setItem('bhuntu-progress', JSON.stringify({state:{hasEntered:true,currentRoomIndex:0,maxUnlockedIndex:262},version:0})); location.href='" + BASE + "#/gallery';"})
time.sleep(2)

results = []
for index, route in enumerate(SEQUENCE):
    route_expr = json.dumps(BASE + '#' + route)
    event_start = len(events)
    send(ws, 'Runtime.evaluate', {'expression': f'location.href={route_expr}'})
    time.sleep(0.55)
    expression = """(()=>{const root=document.querySelector('#root');return {text:(root?.innerText||'').trim(),html:(root?.innerHTML||'').trim(),url:location.href}})()"""
    reply = send(ws, 'Runtime.evaluate', {'expression': expression, 'returnByValue': True})
    value = reply.get('result', {}).get('result', {}).get('value', {})
    text = value.get('text', '')
    route_events = events[event_start:]
    errors = []
    for event in route_events:
        if event.get('method') == 'Runtime.exceptionThrown':
            errors.append(event.get('params', {}).get('exceptionDetails', {}).get('text', 'Runtime exception'))
        elif event.get('method') == 'Runtime.consoleAPICalled' and event.get('params', {}).get('type') in {'error', 'assert'}:
            errors.append(' '.join(str(arg.get('value', '')) for arg in event.get('params', {}).get('args', [])))
        elif event.get('method') == 'Log.entryAdded' and event.get('params', {}).get('entry', {}).get('level') == 'error':
            errors.append(event.get('params', {}).get('entry', {}).get('text', 'Browser error'))
    results.append({'index': index + 1, 'route': route, 'url': value.get('url'), 'blank': len(text) < 40, 'textLength': len(text), 'errors': sorted(set(errors)), 'sample': text[:180]})

Path('audit/sequential_runtime_sweep.json').write_text(json.dumps(results, indent=2, ensure_ascii=False))
print(json.dumps({'routes': len(results), 'blank': sum(r['blank'] for r in results), 'with_errors': sum(bool(r['errors']) for r in results), 'first_blank': next((r for r in results if r['blank']), None), 'first_error': next((r for r in results if r['errors']), None)}, indent=2, ensure_ascii=False))
