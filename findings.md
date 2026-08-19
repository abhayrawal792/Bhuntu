# Bhuntu Bug Investigation Findings (Aug 19, 2026)

## User symptom
"when I click continue or go to next page it shows blank, only shows actual web page when refresh"

## Verified facts
- Repo: abhayrawal792/Bhuntu, main branch, React 19 + Vite 8 + react-router-dom HashRouter, 263 sequential pages.
- Build: `npm run build` succeeds (708ms, dist refreshed into repo root for legacy GitHub Pages).
- Live site = https://abhayrawal792.github.io/Bhuntu/ (built, legacy Pages, source branch main, path /).
- Live index chunk md5 identical to local dist -> deployment matches latest commit 16f4125f.
- Workflow runs: recent X marks were cancelled runs; latest deploy SUCCESSFUL.
- Automated sweeps (CDP + headless Chromium):
  - sweep-all-pages.py: 263/263 routes render, 0 blanks, 0 JS errors (0.9s dwell each)
  - sweep-dwell.py: 263/263 clean (2.5s dwell each)
  - sweep-clicks.py: 260 consecutive footer "Next page" clicks, 0 blanks, 0 errors
  - sweep-mobile-all.py: 263/263 clean under iPhone emulation (390x844, 3s dwell)
- Audits: audit:uniqueness PASS 323 pages; game-policy PASS (20 games); gift-system PASS (311 records, 0 errors); fresh audit flags 212 pages sharing components (expected by design).
- Live manual browser test: password entry -> /gallery renders fully (Memory Vault, photos, navbar, footer).

## Observed transient behavior during live manual test
- Immediately AFTER password unlock, the FIRST navigated page (/gallery) showed "Loading Surprise 💕" spinner (Suspense fallback) briefly — the lazy chunk loads on demand. On slow mobile connection this spinner/window can look blank for several seconds. This is the most plausible explanation of "blank until refresh".
- There is NO error boundary around lazy-loaded routes: if a chunk fails to load (network), React throws the chunk-load error, unmounts the route tree, and the page appears BLANK. A refresh re-fetches the chunk -> page appears. This EXACTLY matches the user's symptom.
- vite.config base = /Bhuntu/ in production. Chunk load failures on flaky mobile connections + HashRouter lazy routes = blank page until refresh.

## Fixes planned
1. Add a route-level ErrorBoundary (with chunk-load retry: reload location / full reload) wrapping lazy pages inside the Suspense boundary.
2. Improve Suspense fallback so it is visible (loading state shown, not blank).
3. Optionally add navigation progress feedback.

## Notes
- RouteGuard logic: unknown routes redirect to current; sequential lock works.
- PersonalGiftLayer overlay renders per-page keepsake block (works fine).

## Manual live-site observation (browser)
- Transitions on the live site work: gallery -> video -> letter -> bouquet all render.
- NEW finding: On /bouquet, the five "luxury bouquet" cards load images from EXTERNAL domains (zivmart.com, perfectgiftadda.com, labellarosaflowers.com, i.pinimg.com, flowersonnortonst.com.au). In the sandbox browser these external images were EMPTY (cards showed gradient placeholders only). On the user's phone/region these may load very slowly or fail — visually blank cards inside the page. This could contribute to the user's "blank" perception. Also, external hotlinked images are not guaranteed to stay up (broken-link risk).
- The page still shows the personal gift layer, keepaske, photos from /all_media (these are fine).
- Confirmed transient "Loading Surprise 💕" spinner right after password unlock on first navigation (lazy chunk load).

## Additional planned fixes
4. Handle broken/blank external images: keep the bouquet cards functional with fallback placeholders / local images if external fails (onError fallback), and avoid depending on external hotlinks for core visuals.
5. Add route-level error boundary with retry to protect against chunk-load failures (primary fix for "blank until refresh").
