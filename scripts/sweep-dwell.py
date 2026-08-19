import json, time, urllib.request, urllib.parse, websocket

BASE = 'http://127.0.0.1:4173/Bhuntu/'
seq = [l.strip().strip('",') for l in open('src/data/roomSequence.js') if l.strip().startswith('"/')]
events = []

def make():
    req = urllib.request.Request('http://127.0.0.1:9223/json/new?' + urllib.parse.quote(BASE), method='PUT')
    with urllib.request.urlopen(req, timeout=10) as r:
        target = json.load(r)
    ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=90)
    counter = [0]
    def send(method, params=None):
        counter[0] += 1; mid = counter[0]
        ws.send(json.dumps({'id': mid, 'method': method, 'params': params or {}}))
        while True:
            msg = json.loads(ws.recv())
            if msg.get('method') in {'Runtime.exceptionThrown','Runtime.consoleAPICalled','Log.entryAdded'}:
                events.append(msg)
            if msg.get('id') == mid: return msg
    send('Runtime.enable'); send('Page.enable'); send('Network.enable')
    return ws, send

ws, send = make()
send('Runtime.evaluate', {'expression': "localStorage.setItem('bhuntu-progress', JSON.stringify({state:{hasEntered:true,currentRoomIndex:0,maxUnlockedIndex:263},version:0})); location.href='" + BASE + "#/'"})
time.sleep(3)

def snap():
    return send('Runtime.evaluate', {'expression': "(()=>{const root=document.querySelector('#root');return {text:(root?.innerText||'').trim(),url:location.href}})()", 'returnByValue': True})['result']['result']['value']

results = []
for i, route in enumerate(seq):
    events_before = len(events)
    send('Runtime.evaluate', {'expression': f"location.href='{BASE}#{route}'"})
    time.sleep(2.5)
    s = snap()
    errs = []
    for ev in events[events_before:]:
        if ev['method'] == 'Runtime.exceptionThrown':
            errs.append(ev['params']['exceptionDetails'].get('text','')[:140])
        elif ev['method'] == 'Runtime.consoleAPICalled' and ev['params']['type'] in {'error','assert'}:
            errs.append((' '.join(str(a.get('value','')) for a in ev['params']['args']))[:140])
    txt = len(s.get('text',''))
    results.append({'i': i, 'route': route, 'text': txt, 'blank': txt < 40, 'errors': sorted(set(errs))})
    if txt < 40 or errs:
        print(f"!!! idx={i} route={route} text_len={txt} errors={errs[:3]}")

json.dump(results, open('/tmp/sweep_dwell.json','w'), indent=1)
print(f"DONE. {len(results)} pages. blanks={sum(1 for r in results if r['blank'])}, pages-with-errors={sum(1 for r in results if r['errors'])}")
