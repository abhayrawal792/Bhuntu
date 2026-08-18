import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

import websocket

BASE = 'http://127.0.0.1:4177/Bhuntu/'
ROUTES = ['/gallery', '/bento-box', '/love-languages-quiz', '/love-grand-finale', '/room/12']

def send(ws, method, params=None, counter=[0]):
    counter[0] += 1
    message_id = counter[0]
    ws.send(json.dumps({'id': message_id, 'method': method, 'params': params or {}}))
    while True:
        message = json.loads(ws.recv())
        if message.get('id') == message_id:
            return message

request = urllib.request.Request('http://127.0.0.1:9223/json/new?' + urllib.parse.quote(BASE), method='PUT')
with urllib.request.urlopen(request, timeout=10) as response:
    target = json.load(response)
ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=15)
send(ws, 'Runtime.enable')
send(ws, 'Page.enable')
send(ws, 'Emulation.setDeviceMetricsOverride', {'width': 390, 'height': 844, 'deviceScaleFactor': 1, 'mobile': True})
send(ws, 'Runtime.evaluate', {'expression': "localStorage.setItem('bhuntu-progress', JSON.stringify({state:{hasEntered:true,currentRoomIndex:0,maxUnlockedIndex:262},version:0}));"})

results = []
for route in ROUTES:
    send(ws, 'Runtime.evaluate', {'expression': f'location.href={json.dumps(BASE + "#" + route)}'})
    time.sleep(1.0)
    expression = """(()=>{const root=document.querySelector('#root');const all=[...document.querySelectorAll('button,a[href],input,select,textarea')];const images=[...document.images];return {url:location.href,textLength:(root?.innerText||'').trim().length,viewport:{width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight},horizontalOverflow:document.documentElement.scrollWidth>innerWidth+2,missingAlt:images.filter(i=>!i.getAttribute('alt')).length,emptyInteractive:all.filter(e=>!e.getAttribute('aria-label')&&!((e.innerText||e.value||'').trim())).length,disabledVisible:all.filter(e=>e.disabled&&e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0).length,stage:document.querySelector('[data-independent-stage]')?.dataset.independentStage||null,giftVariant:document.querySelector('[data-gift-variant]')?.dataset.giftVariant||null}})()"""
    reply = send(ws, 'Runtime.evaluate', {'expression': expression, 'returnByValue': True})
    value = reply.get('result', {}).get('result', {}).get('value', {})
    value['route'] = route
    results.append(value)

Path('audit/mobile_accessibility_smoke.json').write_text(json.dumps(results, indent=2, ensure_ascii=False))
print(json.dumps({'routes': len(results), 'horizontalOverflow': sum(1 for row in results if row.get('horizontalOverflow')), 'missingAlt': sum(row.get('missingAlt', 0) for row in results), 'emptyInteractive': sum(row.get('emptyInteractive', 0) for row in results), 'blank': sum(1 for row in results if row.get('textLength', 0) < 40)}, indent=2))
