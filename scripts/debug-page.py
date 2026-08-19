import json, time, urllib.request, urllib.parse, websocket
BASE = 'http://127.0.0.1:4173/Bhuntu/'
req = urllib.request.Request('http://127.0.0.1:9223/json/new?' + urllib.parse.quote(BASE), method='PUT')
with urllib.request.urlopen(req, timeout=10) as r:
    target = json.load(r)
ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=60)
counter=[0]
def send(method, params=None):
    counter[0]+=1; mid=counter[0]
    ws.send(json.dumps({'id':mid,'method':method,'params':params or {}}))
    out=[]
    while True:
        msg=json.loads(ws.recv())
        if msg.get('method')=='Runtime.exceptionThrown': out.append('EXCEPTION: '+msg['params']['exceptionDetails'].get('text',''))
        if msg.get('id')==mid: return msg, out
send('Runtime.enable')
send('Page.enable')
send('Emulation.setDeviceMetricsOverride', {'width':390,'height':844,'deviceScaleFactor':2,'mobile':True})
m, exc = send('Runtime.evaluate', {'expression': "localStorage.setItem('bhuntu-progress', JSON.stringify({state:{hasEntered:true,currentRoomIndex:0,maxUnlockedIndex:263},version:0})); location.href='"+BASE+"#/gallery'"})
print(exc)
time.sleep(5)
m, exc = send('Runtime.evaluate', {'expression': "(()=>{const r=document.querySelector('#root');return {text:(r?.innerText||'').trim().slice(0,100), html:(r?.innerHTML||'').length}})()", 'returnByValue':True})
print(m['result']['result']['value'], exc)
