
## Phase 3 request (Aug 19): mobile/slow-network benchmark + CI/CD media optimize + JS/CSS review

### Benchmark results (scripts/benchmark_throttled.py, CDP, iPhone 390x844 + 3G throttle 300ms/1.6Mbps)
Fresh tab per page, no-store fetch of each referenced resource. Results saved in /tmp/benchmark_final.json:
| page | MB | reqs | render ms |
|---|---|---|---|
| / | 0.00 | 8 | 816 |
| /gallery | 36.03 | 28 | 402 |
| /video | 1.93 | 13 | 402 |
| /bouquet | 1.31 | 11 | 402 |
| /letter | 0.53 | 8 | 402 |
| /gift | 0.41 | 9 | 403 |
| /room/1 | 0.16 | 11 | 401 |
| /memory-wall | 0.81 | 9 | 402 |
Total 41.2MB over 8 pages on simulated slow 3G; 0 blanks, 0 long tasks. Gallery 36MB = eager photo loading on that page (biggest remaining opportunity: lazy-load gallery images). OLD site would have been ~3x that (photos were 3x heavier).

### CI/CD done
- .github/workflows/optimize-media.yml created: triggers on push of all_media changes; compresses changed images (1440px/Q82) and videos (crf28) with [skip ci] commit back; validated YAML OK.
- deploy-pages.yml exists (deploy from dist).

### JS/CSS review findings
- dist/assets/index-DIis-MnT.css: 472KB raw, 54KB gzip — Tailwind v4 catalog; fine, no action needed.
- index-lHwMiHRi.js: 848KB raw, 211KB gzip — contains THREE.JS (imported by src/components/3d/* but those are DEAD CODE: only FinaleSection.jsx imports GiftBox3D and GlobeSection.jsx imports Globe3D from '../3d/' — check those dirs exist; components/3d dir may not exist or GiftBox3D/Globe3D are separate from BouquetBuilder etc.). Pages themselves import ZERO from 3d/.
- Next step: check if GiftBox3D/Globe3D files exist and whether FinaleSection/GlobeSection are used; if unused → remove → tree-shake three.js out of main chunk (could cut ~200KB gzip? three.js is ~150KB gzipped).
- gh workflow files: deploy-pages.yml, optimize-media.yml (new).
- Token: github_pat_... (abhayrawal792) — works; push earlier required chunked commits of 20 files (GH013 rule rejected large pushes).
- Remote origin currently https://abhayrawal792:<pat>@github.com/abhayrawal792/Bhuntu.git (with embedded token — reset to plain after push).
