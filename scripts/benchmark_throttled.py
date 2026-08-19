#!/usr/bin/env python3
"""Benchmark the site under mobile + slow 3G conditions, one fresh tab per page.

For each page: measures render time (first contentful-ish), number of requests
and total transferred bytes via Performance.getResourceTiming (authoritative),
and long-task count. Reports a summary table.
"""
import json
import time
import urllib.parse
import urllib.request
import websocket

BASE = 'http://127.0.0.1:4173/Bhuntu/'
PAGES = ['/', '/gallery', '/video', '/bouquet', '/letter', '/gift', '/room/1', '/memory-wall']

counter = [0]
ws = None

def connect():
    global ws
    req = urllib.request.Request('http://127.0.0.1:9223/json/new?' + urllib.parse.quote(BASE), method='PUT')
    with urllib.request.urlopen(req, timeout=10) as r:
        target = json.load(r)
    ws = websocket.create_connection(target['webSocketDebuggerUrl'], timeout=120)

def recv_all(into):
    import select
    while True:
        if not select.select([ws.sock], [], [], 0.05)[0]:
            break
        m = json.loads(ws.recv())
        into.append(m)

def send(method, params=None):
    counter[0] += 1
    mid = counter[0]
    ws.send(json.dumps({'id': mid, 'method': method, 'params': params or {}}))
    evs = []
    while True:
        m = json.loads(ws.recv())
        evs.append(m)
        if m.get('id') == mid:
            recv_all(evs)
            return evs

JS_TEXT = """
(()=>{
  const t = performance.getEntriesByType('resource');
  let bytes = 0, reqs = t.length;
  for (const e of t) {
    const ts = e.transferSize || 0;
    bytes += ts;
  }
  const nav = performance.getEntriesByType('navigation')[0];
  return JSON.stringify({
    bytes, reqs,
    renderMs: nav ? nav.responseEnd : 0,
    domContentLoaded: nav ? nav.domContentLoadedEventEnd : 0,
    longTasks: (performance.getEntriesByType('longtask')||[]).length
  });
})()"""

def bench_page(path):
    connect()
    # setup fresh tab
    for ev in send('Runtime.enable'):
        pass
    for ev in send('Page.enable'):
        pass
    # Slow 3G
    send('Network.enable')
    send('Network.emulateNetworkConditions', {'offline': False, 'latency': 300,
         'downloadThroughput': 1.6e6/8, 'uploadThroughput': 750e3/8})
    send('Emulation.setDeviceMetricsOverride', {'width': 390, 'height': 844, 'deviceScaleFactor': 2, 'mobile': True,
         'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'})
    t0 = time.time()
    stamp = int(time.time()*1000)
    send('Network.setCacheDisabled', {'cacheDisabled': True})
    send('Page.navigate', {'url': BASE + '#'+path+'?v='+str(stamp)})
    # wait until root text >= 100 chars or timeout
    render_ms = None
    for _ in range(60):
        time.sleep(0.5)
        evs = send('Runtime.evaluate', {'expression': "(document.querySelector('#root')?.innerText||'').length", 'returnByValue': True})
        val = next((m.get('result', {}).get('result', {}).get('value') for m in evs if m.get('id') and m['result'].get('result', {}).get('type') == 'number'), None)
        if isinstance(val, int) and val >= 100:
            render_ms = int((time.time() - t0) * 1000)
            break
    evs = send('Runtime.evaluate', {'expression': JS_TEXT, 'returnByValue': True})
    data = next((m['result']['result']['value'] for m in evs if m.get('id') and m.get('result', {}).get('result', {}).get('type') == 'string'), '{}')
    m = json.loads(data)
    m['render_ms'] = render_ms if render_ms is not None else int((time.time() - t0) * 1000)
    ws.close()
    return m

print(f"{'page':<16} {'MB':>7} {'reqs':>5} {'render ms':>9} {'long tasks':>11}")
rows = []
for p in PAGES:
    m = bench_page(p)
    rows.append({'page': p, **m})
    print(f"{p:<16} {m['bytes']/1e6:>7.2f} {m['reqs']:>5} {m['render_ms']:>9} {m['longTasks']:>11}")
json.dump(rows, open('/tmp/benchmark_throttled.json', 'w'), indent=1)
tb = sum(r['bytes'] for r in rows)
tr = sum(r['render_ms'] for r in rows)
print(f"\nSUMMARY: {len(rows)} pages, {tb/1e6:.2f}MB total transfer, {tr/1000:.1f}s cumulative render time")
