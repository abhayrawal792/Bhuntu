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

def store():
    return send('Runtime.evaluate', {'expression': "(() => { try { const raw = localStorage.getItem('bhuntu-progress'); if (!raw) return null; return JSON.parse(raw).state; } catch(e) { return null; } })()", 'returnByValue': True})['result']['result']['value']

def buttons():
    return send('Runtime.evaluate', {'expression': "(() => [...document.querySelectorAll('button')].map(b => b.textContent.trim()).filter(t => t && t.length < 40))()", 'returnByValue': True})['result']['result']['value']

# Click the footer "Next page" button from /gallery onwards (skip home where footer hidden)
# First navigate to /gallery via footer: use Next from home is hidden, so navigate to idx 1 via trail button click
send('Runtime.evaluate', {'expression': "(() => { const b=[...document.querySelectorAll('button')].find(b => b.textContent.includes('Follow')); if(b){b.click(); return 'clicked';} return 'none'; })()"})
time.sleep(2)
print('TRAIL CLICK, url:', snap()['url'][-40:])

blank=0; stuck=0; results=[]
for step in range(260):
    ev0 = len(events)
    before_url = snap()['url']
    st = store() or {}
    # footer has 'Next page'; click it
    send('Runtime.evaluate', {'expression': "(() => { const b=[...document.querySelectorAll('button')].find(b => b.textContent.trim()==='Next page'); if(b){b.click(); return 'clicked';} return 'none'; })()"})
    time.sleep(0.6)
    s = snap()
    errs = []
    for ev in events[ev0:]:
        if ev['method']=='Runtime.exceptionThrown': errs.append(ev['params']['exceptionDetails'].get('text','')[:120])
        elif ev['method']=='Runtime.consoleAPICalled' and ev['params']['type'] in {'error','assert'}: errs.append((' '.join(str(a.get('value','')) for a in ev['params']['args']))[:120])
    txt = len(s.get('text',''))
    results.append({'step':step,'before':before_url[-50:],'after':s['url'][-50:],'text':txt,'errors':errs})
    if txt < 40:
        blank+=1; print(f"!!! BLANK step {step}: url={s['url'][-60:]}")
    if errs: print(f"!!! ERRORS step {step}: {errs[:2]}")
    if s['url'] == before_url:
        stuck+=1
        if stuck >= 5: print(f"STUCK x{stuck} at {s['url'][-50:]}"); break
    else: stuck=0

json.dump(results, open('/tmp/sweep_clicks.json','w'), indent=1)
print(f"DONE steps={len(results)} blanks={blank} final_url={snap()['url'][-50:]}")
