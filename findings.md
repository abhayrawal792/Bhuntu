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

## New findings (Phase 5 follow-up, user request "make all tos working" = all touch/transition interactions)

### Bug A — RouteGuard silent-redirect loop
File src/components/RouteGuard.jsx:
- When requestedIndex > maxUnlockedIndex+1 OR |requestedIndex - safeCurrentIndex| > 1, it redirects (replace) to ROOM_SEQUENCE[Math.min(safeNextIndex, maxUnlockedIndex)].
- BUG: if safeNextIndex > maxUnlockedIndex, Math.min gives maxUnlockedIndex — redirects to the ALREADY-CURRENT room index. Combined with setCurrentRoomIndex(requestedIndex) at the end, if a user shares a deep hash link or app state drifts, navigation to the NEXT page can get silently redirected back, appearing as "nothing happens / blank".
- Also: setCurrentRoomIndex in store is clamped (index > furthestAllowed → no state change). PageFooter.handleNext calls setCurrentRoomIndex(nextIdx) then navigate(next). If state clamps, URL still changes, then RouteGuard redirects back = tap feels dead.

### Bug B — Store/URL drift
- currentRoomIndex persists in localStorage; if user navigates via URL (or the guard sets URL differently), footer's Previous/Next buttons operate on stale index (e.g., footer shows "Doorway" on deep page because currentRoomIndex=0 persisted).

### Bug C — playSparkle() / triggerHaptic before navigation can throw (audio gesture on mobile) and potentially block? — actually onClick continues after. Not blocking but should be wrapped in try/catch.

### What's already implemented (commits on local main)
1. src/components/RouteErrorBoundary.jsx — route-level error boundary with chunk-error detection, "Bring it back" retry button (reloads exact URL). Wrapped via LocationAwareErrorBoundary in App.jsx (keyed on pathname, uses useLocation).
2. BouquetSection.jsx — FallbackImage component swapping failed external hotlinks to local photos (seeded).
3. Sweep scripts: scripts/sweep-mobile-all.py, sweep-clicks.py, sweep-all-pages.py, sweep-dwell.py (kept).
4. Verified after fix: mobile dwell sweep 263/263 clean; click sweep 260 steps clean; audits pass.

### Push status
- Local commits: 077fb925 (fix) + 128f0158 (remove debug files). Push FAILED: GH_TOKEN is abhayrawal999, repo is abhayrawal792/Bhuntu, viewerPermission READ → 403 on push. Asked user for access; user replied "first make all tos working".

### Remaining work (new plan)
Phase 1: audit weak touch/transition points — done (A/B/C above).
Phase 2: fix:
 - RouteGuard: redirect to safeNextIndex (the legitimate next page) instead of maxUnlockedIndex; allow forward drift sync by updating currentRoomIndex when URL legitimately ahead? Keep sequential lock but never redirect to a page behind the current one when clicking Next.
 - Store: sync currentRoomIndex to URL index inside guard (already does setCurrentRoomIndex(requestedIndex) for allowed pages). Ensure footer Next always navigates relative to URL index, not store index.
 - PageFooter: derive activeIndex from location.pathname (ROOM_SEQUENCE.indexOf) instead of currentRoomIndex, so buttons never drift.
 - Wrap playSparkle/triggerHaptic in try/catch in PageFooter and AudioController usage.
 - Add global window chunk-retry: on failed script load, auto-reload once.
Phase 3: rebuild, sweep all pages (mobile), run audits.
Phase 4: push + report (access issue remains).
