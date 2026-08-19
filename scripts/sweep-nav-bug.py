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
ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=60)
send(ws, 'Runtime.enable')
send(ws, 'Page.enable')
send(ws, 'Network.enable')

def snapshot():
    return send(ws, 'Runtime.evaluate', {
        'expression': """(()=>{const root=document.querySelector('#root');return {text:(root?.innerText||'').trim(),url:location.href}})()""",
        'returnByValue': True}).get('result', {}).get('result', {}).get('value', {})

def button_texts():
    return send(ws, 'Runtime.evaluate', {
        'expression': """(() => [...document.querySelectorAll('button,input[type=button]')].map(b => b.textContent.trim() || b.value || '').slice(0, 20))()""",
        'returnByValue': True}).get('result', {}).get('result', {}).get('value', [])

def click_button_matching(substring):
    send(ws, 'Runtime.evaluate', {
        'expression': f"""(() => {{ const btns=[...document.querySelectorAll('button,input[type=button]')]; const b=btns.find(b => (b.textContent.trim()+b.value).includes({json.dumps(substring)})); if(b){{b.click(); return 'clicked';}} return 'not found'; }})()""",
        'returnByValue': True})

# 1. Load home
send(ws, 'Runtime.evaluate', {'expression': "location.href='" + BASE + "#/'"})
time.sleep(3)
print('AFTER LOAD HOME:')
print('  snapshot:', snapshot())
print('  buttons:', button_texts())

# 2. Find the correct password from config, type it, click Unlock
send(ws, 'Runtime.evaluate', {'expression': "(() => { const input = document.getElementById('bhuntu-password'); if (!input) return 'input not found'; const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set; setter.call(input, 'bhuntu'); input.dispatchEvent(new Event('input', {bubbles: true})); return 'typed: ' + input.value; })()", 'returnByValue': True})
time.sleep(0.5)
print('  buttons before unlock:', button_texts())
click_button_matching('Unlock')
time.sleep(3)
print('AFTER UNLOCK:')
print('  snapshot:', snapshot())
print('  buttons:', button_texts())
print('AFTER START:')
print('  snapshot:', snapshot())
print('  buttons:', button_texts())

# 3. Unlock all pages in the store so Next keeps advancing through the entire sequence,
#    then click Next page through the whole journey, checking for blank pages
send(ws, 'Runtime.evaluate', {
    'expression': "(() => { localStorage.setItem('bhuntu-progress', JSON.stringify({state:{hasEntered:true,currentRoomIndex:1,maxUnlockedIndex:263},version:0})); return 'ok'; })()", 'returnByValue': True})
time.sleep(1)

for i in range(262):
    before = snapshot()
    click_button_matching('Next page')
    time.sleep(0.8)
    after = snapshot()
    # if we got stuck (same url twice in a row), try a hard navigation to the next route to keep going
    if before.get('url') == after.get('url') and i > 0:
        send(ws, 'Runtime.evaluate', {'expression': 'location.href', 'returnByValue': True})
    blanks += 1 if len(after.get('text', '')) < 40 else 0
    status = 'OK' if len(after.get('text', '')) >= 40 else '*** BLANK ***'
    print(f'NAV {i+1}: {before.get("url","?")[-60:]} -> {after.get("url","?")[-60:]} | text_len={len(after.get("text",""))} | {status}')

print(f'\nSUMMARY: total blank pages = {blanks}')
