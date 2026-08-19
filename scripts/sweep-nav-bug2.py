import json
import time
import urllib.request
import urllib.parse
import websocket

BASE = 'http://127.0.0.1:4173/Bhuntu/'
events = []
blanks = 0

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
ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=90)
send(ws, 'Runtime.enable')
send(ws, 'Page.enable')

def snapshot():
    return send(ws, 'Runtime.evaluate', {
        'expression': """(()=>{const root=document.querySelector('#root');return {text:(root?.innerText||'').trim(),url:location.href}})()""",
        'returnByValue': True}).get('result', {}).get('result', {}).get('value', {})

def store_state():
    return send(ws, 'Runtime.evaluate', {
        'expression': """(() => { try { const raw = localStorage.getItem('bhuntu-progress'); if (!raw) return null; return JSON.parse(raw).state; } catch(e) { return null; } })()""",
        'returnByValue': True}).get('result', {}).get('result', {}).get('value', {})

def button_texts():
    return send(ws, 'Runtime.evaluate', {
        'expression': """(() => [...document.querySelectorAll('button,input[type=button]')].map(b => (b.textContent.trim() || b.value || '')).filter(t => t.length < 60).slice(0, 15))()""",
        'returnByValue': True}).get('result', {}).get('result', {}).get('value', [])

def click(substring):
    return send(ws, 'Runtime.evaluate', {
        'expression': f"""(() => {{ const btns=[...document.querySelectorAll('button,input[type=button]')]; const b=btns.find(b => (b.textContent.trim()+b.value).includes({json.dumps(substring)})); if(b){{b.click(); return 'clicked: '+b.textContent.trim().slice(0,40);}} return 'not found'; }})()""",
        'returnByValue': True}).get('result', {}).get('result', {}).get('value', '')

# 1. Load home, enter password
send(ws, 'Runtime.evaluate', {'expression': "location.href='" + BASE + "#/'"})
time.sleep(3)
send(ws, 'Runtime.evaluate', {'expression': "(() => { const input = document.getElementById('bhuntu-password'); const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; setter.call(input, 'bhuntu'); input.dispatchEvent(new Event('input', {bubbles: true})); return 'typed: ' + input.value; })()", 'returnByValue': True})
time.sleep(0.5)
print('START BUTTONS:', button_texts())
print('unlock result:', click('Unlock'))
time.sleep(2)
print('AFTER UNLOCK buttons:', button_texts())

# 2. The home page has 'Open Abu's first gift' and 'Follow Abu's trail' buttons
print('gift result:', click("Open Abu’s first gift"))
time.sleep(3)
snap = snapshot()
print('AFTER GIFT:', snap['url'], 'text_len=', len(snap['text']))
st = store_state()
print('STORE:', st)

# 3. Now just iterate Next page clicks until we finish, tracking store index to detect resets
prev_idx = -1
stuck = 0
i = 0
while i < 400:
    snap = snapshot()
    st = store_state()
    idx = st.get('currentRoomIndex') if st else -1
    nxt = click('Next page')
    time.sleep(0.7)
    after = snapshot()
    st2 = store_state()
    idx2 = st2.get('currentRoomIndex') if st2 else -1
    ok = len(after.get('text', '')) >= 40
    if not ok:
        blanks += 1
        print(f'*** BLANK at idx {idx}: url={after.get("url")[-50:]}')
    if idx == idx2:
        stuck += 1
        if stuck > 3 and idx == 0:
            print(f'STUCK AT HOME after page {i}; last urls ok')
            break
    else:
        stuck = 0
    if i % 50 == 0:
        print(f'NAV {i}: idx {idx}->{idx2} url={after.get("url")[-50:]} text={len(after.get("text",""))}')
    i += 1
    if idx2 == -1 or (idx2 >= 262):
        break

print(f'DONE. blanks={blanks}, iterations={i}, final idx={store_state()}')
print('FINAL URL:', snapshot()['url'])
