import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

/* ── Chunk-load resilience ────────────────────────────────────────────
   If a lazy page's JS chunk fails to fetch (flaky mobile connection),
   automatically reload ONCE so the visitor never sees a blank screen
   while waiting for a refresh. Reloads are deduped per app session so
   infinite loops are impossible even if a chunk is permanently broken.
   ───────────────────────────────────────────────────────────────────── */
if (typeof window !== 'undefined') {
  const CHUNK_RETRY_KEY = 'bhuntu-chunk-retry';
  let retryCount = 0;
  try {
    retryCount = Number(window.sessionStorage.getItem(CHUNK_RETRY_KEY) || '0') || 0;
  } catch (_) {}
  if (retryCount < 1) {
    window.addEventListener('error', (event) => {
      const target = event.target || event.srcElement;
      const isScript = target && target.tagName === 'SCRIPT';
      const isChunky = /chunk|failed to fetch/i.test(String(event.message || ''));
      if (isScript || isChunky) {
        try { window.sessionStorage.setItem(CHUNK_RETRY_KEY, String(retryCount + 1)); } catch (_) {}
        window.location.reload();
      }
    }, true);
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
