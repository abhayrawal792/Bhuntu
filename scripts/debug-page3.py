import json, time, urllib.request, urllib.parse, websocket
BASE = 'http://127.0.0.1:4173/Bhuntu/'
req = urllib.request.Request('http://127.0.0.1:9223/json/new?' + urllib.parse.quote(BASE), method='PUT')
with urllib.request.urlopen(req, timeout=10) as r:
    target = json.load(r)
ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=60)
counter=[0]
log=[]
def send(method, params=None):
    counter[0]+=1; mid=counter[0]
    ws.send(json.dumps({'id':mid,'method':method,'params':params or {}}))
    while True:
        msg=json.loads(ws.recv())
        if msg.get('method')=='Runtime.consoleAPICalled':
            log.append('CONSOLE('+msg['params']['type']+'): '+' '.join(str(a.get('value','')) for a in msg['params']['args'])[:200])
        if msg.get('method')=='Runtime.exceptionThrown':
            log.append('EXCEPTION: '+msg['params']['exceptionDetails'].get('text','')[:200])
        if msg.get('id')==mid: return msg
send('Runtime.enable'); send('Page.enable')
send('Runtime.evaluate', {'expression': "window.addEventListener('error', (e) => console.error('WINDOW_ERROR:', e.message, e.filename));"})
time.sleep(3)
send('Runtime.evaluate', {'expression': "location.href='"+BASE+"#/'"})
time.sleep(4)
m = send('Runtime.evaluate', {'expression': "(()=>{const r=document.querySelector('#root');return (r?.innerHTML||'NO_ROOT').slice(0,200)})()", 'returnByValue':True})
print('\n'.join(log))
print('ROOT:', m['result']['result']['value'])
