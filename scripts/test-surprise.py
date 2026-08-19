#!/usr/bin/env python3
"""Verify /surprise renders its real content (FinaleSection with GiftBox3D), not the error card."""
import json, time, urllib.parse, urllib.request, websocket

BASE = 'http://127.0.0.1:4173/Bhuntu/'
req = urllib.request.Request('http://127.0.0.1:9223/json/new?' + urllib.parse.quote(BASE), method='PUT')
with urllib.request.urlopen(req, timeout=10) as r:
    target = json.load(r)
ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=90)
c = [0]

def send(method, params=None):
    c[0] += 1
    mid = c[0]
    ws.send(json.dumps({'id': mid, 'method': method, 'params': params or {}}))
    while True:
        m = json.loads(ws.recv())
        if m.get('id') == mid:
            return m

send('Runtime.enable')
send('Page.enable')
send('Page.navigate', {'url': BASE + '#/surprise'})
time.sleep(5)
m = send('Runtime.evaluate', {'expression': """
(()=>{
  const root = document.querySelector('#root');
  const text = root?.innerText || '';
  const errCard = text.includes('Bring it back') || text.includes('Oops');
  const hasCanvas = !!root?.querySelector('canvas');
  return JSON.stringify({textLen: text.length, errCard, hasCanvas, title: (document.title||'').slice(0,40)});
})()""", 'returnByValue': True})
val = m['result']['result']['value']
print(val)
d = json.loads(val)
ok = d['textLen'] > 300 and not d['errCard']
print('PASS' if ok else 'FAIL', '- surprise page renders content:', d)
raise SystemExit(0 if ok else 1)
