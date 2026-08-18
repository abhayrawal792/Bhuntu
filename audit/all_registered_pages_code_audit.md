# All Registered Pages — Full Code and Experience Audit

This audit covers every registered `<Route>` in `src/App.jsx`, not only the curated sequence. Each record follows the route into its page file and recursively into local page/component imports. It checks route membership, source availability, dependency graph, missing imports, unknown navigation targets, media signals, interaction signals, personal-voice signals, design tokens, generic/randomized patterns, gift metadata, and exact source duplication.

| Measure | Result |
|---|---:|
| Registered routes inspected | 311 |
| Routes in sequential journey | 263 |
| Registered routes outside sequence | 48 |
| Missing local imports | 0 |
| Unknown internal navigation targets | 0 |
| Exact duplicate source groups | 0 |
| Pages in exact duplicate groups | 0 |
| High boredom-risk implementations | 31 |
| Pages with generic/randomized signals | 49 |
| Pages missing unique gift metadata | 0 |

## Method

The audit is code-based and exhaustive: every route is inspected in route-registration order, while the sequence number is recorded separately for strict journey order. A page is marked **high boredom risk** only when the recursively aggregated source is small, media-light, interaction-light, and low in personal voice. Shared global utilities are recorded but are not treated as duplication unless the full normalized dependency source is identical.

## Every registered page, in App.jsx registration order

### Registered page 001 — Samjhana’s Birthday Door from Abu

**Route:** `/` · **Journey status:** sequence page 1 · **Journey order:** 1
**Code:** `src/pages/HomePage.jsx` → primary local component **page-specific JSX**; 3 local files, 17146 aggregated bytes.
**Design:** from-rose-200 via-orange-100 to-amber-100 from-sky-200 via-indigo-100 to-violet-100 from-emerald-200 via-teal-100 to-cyan-100 bg-[. **Media:** 0. **Interactions:** 8. **Personal voice:** 90.
**Gift record:** complete; gift “a private letter from Abu”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b44eaf96801f`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 002 — The Abu-to-Sanzu Journey

**Route:** `/curated-journey` · **Journey status:** registered but not in sequence
**Code:** `src/pages/CuratedJourneyPage.jsx` → primary local component **page-specific JSX**; 2 local files, 7225 aggregated bytes.
**Design:** bg-[ text-[ rounded-full border-[ text-[10px] font-bold text-xs text-white/35 text-sm text-white/55. **Media:** 0. **Interactions:** 4. **Personal voice:** 68.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `eb2c3c5d8d83`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 003 — The Story of How Abu Met Samjhana

**Route:** `/story` · **Journey status:** registered but not in sequence
**Code:** `src/pages/StoryPage.jsx` → primary local component **page-specific JSX**; 1 local files, 3803 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-bold font-serif text-2xl rounded-full border-y border-[ text-[8rem]. **Media:** 0. **Interactions:** 5. **Personal voice:** 19.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `e68543514e96`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 004 — The Faces Abu Keeps Close

**Route:** `/gallery` · **Journey status:** sequence page 2 · **Journey order:** 2
**Code:** `src/pages/GalleryPage.jsx` → primary local component **GallerySection**; 12 local files, 55144 aggregated bytes.
**Design:** bg-gradient-to-b from-[ via-[ to-[ text-center rounded-full bg-pink-100 border-pink-200 text-rose-600 text-xs. **Media:** 46. **Interactions:** 79. **Personal voice:** 58.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d6d180e38452`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 005 — Samjhana in Motion

**Route:** `/video` · **Journey status:** sequence page 3 · **Journey order:** 3
**Code:** `src/pages/VideoPage.jsx` → primary local component **page-specific JSX**; 1 local files, 4014 aggregated bytes.
**Design:** to-Osaka bg-[ text-[ border-b border-white/10 text-xs font-bold text-white/55 text-white text-amber-200/75. **Media:** 2. **Interactions:** 7. **Personal voice:** 25.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `24be3744e8ba`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 006 — A Letter from Abu

**Route:** `/letter` · **Journey status:** sequence page 4 · **Journey order:** 4
**Code:** `src/pages/LetterPage.jsx` → primary local component **LetterSection**; 8 local files, 99015 aggregated bytes.
**Design:** bg-gradient-to-b from-[ via-[ to-[ text-emerald-100 text-center rounded-full bg-emerald-500/20 text-emerald-300 border-emerald-400/30. **Media:** 30. **Interactions:** 52. **Personal voice:** 234.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `edce1cd68dd1`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 007 — A Bouquet of Words for Bhuntu

**Route:** `/bouquet` · **Journey status:** sequence page 5 · **Journey order:** 5
**Code:** `src/pages/BouquetPage.jsx` → primary local component **BouquetSection**; 8 local files, 101901 aggregated bytes.
**Design:** bg-gradient-to-b from-[ via-[ to-[ text-center rounded-full bg-pink-100 border-pink-200 text-rose-600 text-xs. **Media:** 34. **Interactions:** 59. **Personal voice:** 235.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `9707afae0c38`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 008 — Nepalgunj to Sakai, Osaka

**Route:** `/distance` · **Journey status:** sequence page 6 · **Journey order:** 6
**Code:** `src/pages/DistancePage.jsx` → primary local component **NepalgunjToOsakaFlightSim**; 10 local files, 58505 aggregated bytes.
**Design:** text-sky-400 text-center font-ui rounded-3xl bg-slate-950 border-4 border-sky-500/80 shadow-[0_0_50px_rgba text-xs font-mono. **Media:** 27. **Interactions:** 54. **Personal voice:** 49.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `4b6d257c0bd2`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 009 — The Surprise Abu Hid for You

**Route:** `/surprise` · **Journey status:** sequence page 7 · **Journey order:** 7
**Code:** `src/pages/SurprisePage.jsx` → primary local component **FinaleSection**; 11 local files, 109674 aggregated bytes.
**Design:** bg-gradient-to-b from-[ via-[ to-[ text-pink-300 text-rose-400 text-center rounded-full bg-white/80 border-pink-200. **Media:** 30. **Interactions:** 65. **Personal voice:** 233.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `a14626290122`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 010 — A Little Promise for the Future

**Route:** `/ring` · **Journey status:** registered but not in sequence
**Code:** `src/pages/RingSurprisePage.jsx` → primary local component **AudioController**; 5 local files, 46393 aggregated bytes.
**Design:** rounded-full border-4 border-pink-400/40 shadow-2xl text-yellow-300 text-base rounded-t-xl bg-gradient-to-br from-rose-500 to-pink-600. **Media:** 0. **Interactions:** 78. **Personal voice:** 30.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `4e48b1ef3bf4`; no direct code error signal; randomized output | interaction with low media; all detected internal targets registered.

### Registered page 011 — The One Game Abu Made for Samjhana

**Route:** `/quiz` · **Journey status:** sequence page 8 · **Journey order:** 8
**Code:** `src/pages/QuizPage.jsx` → primary local component **page-specific JSX**; 2 local files, 12350 aggregated bytes.
**Design:** bg-[ text-white rounded-[2rem] shadow-2xl border-cyan-200/20 bg-white/10 text-pink-400 text-5xl font-black text-lg. **Media:** 31. **Interactions:** 12. **Personal voice:** 17.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `bf3af93f598d`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 012 — The Sky Map Abu Keeps for You

**Route:** `/stars` · **Journey status:** sequence page 9 · **Journey order:** 9
**Code:** `src/pages/StarsPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321580 aggregated bytes.
**Design:** bg-[ text-[ text-sky-200 text-xs font-black text-6xl text-8xl text-lg text-sky-100/60 rounded-full. **Media:** 33. **Interactions:** 6. **Personal voice:** 4138.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `41be7bad9823`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 013 — Open When You Miss Abu

**Route:** `/time-capsule` · **Journey status:** sequence page 10 · **Journey order:** 10
**Code:** `src/pages/TimeCapsulePage.jsx` → primary local component **OpenWhenLetters**; 8 local files, 98558 aggregated bytes.
**Design:** text-center rounded-full bg-rose-100 border-rose-200 text-rose-600 font-bold text-xs shadow-sm text-pink-500 text-2xl. **Media:** 30. **Interactions:** 58. **Personal voice:** 230.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `a5cfd6bfffd7`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 014 — Small Surprises Under the Surface

**Route:** `/scratch-surprises` · **Journey status:** registered but not in sequence
**Code:** `src/pages/ScratchSurprisePage.jsx` → primary local component **ScratchCard**; 8 local files, 98048 aggregated bytes.
**Design:** rounded-3xl border-2 border-pink-200 shadow-xl text-center bg-white text-xs font-bold font-ui rounded-full. **Media:** 30. **Interactions:** 49. **Personal voice:** 228.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0d535e083aef`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 015 — The Compliments Abu Saves

**Route:** `/compliment-jar` · **Journey status:** sequence page 11 · **Journey order:** 11
**Code:** `src/pages/ComplimentJarPage.jsx` → primary local component **page-specific JSX**; 2 local files, 12609 aggregated bytes.
**Design:** bg-[ text-[ rounded-[2.5rem] text-amber-50 text-amber-300 text-xs font-black text-5xl text-amber-100/75 rounded-2xl. **Media:** 31. **Interactions:** 8. **Personal voice:** 13.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b11481a7c132`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 016 — Hearts Abu Would Catch for You

**Route:** `/catcher-game` · **Journey status:** registered but not in sequence
**Code:** `src/pages/CatcherGamePage.jsx` → primary local component **HeartCatcherGame**; 10 local files, 109663 aggregated bytes.
**Design:** font-ui text-sm font-bold text-gray-800 text-rose-600 rounded-full bg-gray-100 text-gray-700 bg-gray-200 rounded-3xl. **Media:** 30. **Interactions:** 63. **Personal voice:** 229.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c53a74dc61ad`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 017 — The Memories Abu Recognizes

**Route:** `/memory-match` · **Journey status:** registered but not in sequence
**Code:** `src/pages/MemoryMatchPage.jsx` → primary local component **MemoryMatchGame**; 10 local files, 109384 aggregated bytes.
**Design:** font-ui text-xs font-bold text-gray-700 text-rose-600 text-green-600 rounded-full bg-gray-100 bg-gray-200 rounded-2xl. **Media:** 30. **Interactions:** 65. **Personal voice:** 229.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `84b381e25e0d`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 018 — Words Abu Wants You to Hear

**Route:** `/quote-generator` · **Journey status:** sequence page 12 · **Journey order:** 12
**Code:** `src/pages/QuoteGeneratorPage.jsx` → primary local component **TypewriterQuotes**; 8 local files, 95058 aggregated bytes.
**Design:** text-center rounded-full bg-rose-100 border-rose-200 text-rose-600 font-bold text-xs shadow-sm font-ui text-pink-500. **Media:** 30. **Interactions:** 48. **Personal voice:** 228.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `bca69bfeb650`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 019 — Four Gifts for Samjhana

**Route:** `/mystery-gifts` · **Journey status:** sequence page 13 · **Journey order:** 13
**Code:** `src/pages/MysteryGiftsPage.jsx` → primary local component **MysteryGiftBoxes**; 9 local files, 99114 aggregated bytes.
**Design:** text-center rounded-full bg-rose-100 border-rose-200 text-rose-600 font-bold text-xs shadow-sm font-ui text-pink-500. **Media:** 30. **Interactions:** 59. **Personal voice:** 231.
**Gift record:** complete; gift “a private letter from Abu”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `5ce242350332`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 020 — A Bouquet of Reasons Abu Loves You

**Route:** `/bouquet-reasons` · **Journey status:** registered but not in sequence
**Code:** `src/pages/BouquetReasonsPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321323 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-rose-500 text-6xl text-8xl text-lg rounded-[2rem] shadow-xl. **Media:** 32. **Interactions:** 6. **Personal voice:** 4135.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `7c2b087475c8`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 021 — Our Nepalgunj-to-Sakai Ticket

**Route:** `/passport` · **Journey status:** sequence page 14 · **Journey order:** 14
**Code:** `src/pages/PassportPage.jsx` → primary local component **page-specific JSX**; 2 local files, 11830 aggregated bytes.
**Design:** bg-[ text-[ rounded-[2rem] border-2 border-dashed border-[ bg-white text-blue-700 text-xs font-black. **Media:** 31. **Interactions:** 6. **Personal voice:** 14.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `3f34f2226588`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 022 — A Message Abu Sent Across the Water

**Route:** `/message-bottle` · **Journey status:** sequence page 15 · **Journey order:** 15
**Code:** `src/pages/BottlePage.jsx` → primary local component **MessageInBottle**; 10 local files, 110165 aggregated bytes.
**Design:** rounded-3xl bg-gradient-to-b from-cyan-900 via-blue-900 to-indigo-950 border-2 border-cyan-400 shadow-2xl text-cyan-300 text-center. **Media:** 30. **Interactions:** 64. **Personal voice:** 229.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `85d794270d12`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 023 — The Song Abu Hears in Your Name

**Route:** `/music-box` · **Journey status:** sequence page 16 · **Journey order:** 16
**Code:** `src/pages/MusicBoxPage.jsx` → primary local component **LoveMusicBox**; 10 local files, 112378 aggregated bytes.
**Design:** rounded-3xl border-2 border-purple-300 shadow-2xl bg-gradient-to-b from-amber-100 via-amber-50 to-pink-50 text-center text-rose-500. **Media:** 30. **Interactions:** 66. **Personal voice:** 232.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `9a9d0e60b3f4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 024 — Wishes Abu Sends Up for You

**Route:** `/lanterns` · **Journey status:** sequence page 17 · **Journey order:** 17
**Code:** `src/pages/LanternsPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1555 aggregated bytes.
**Design:** bg-gradient-to-b from-[ to-[ text-white text-center text-amber-200 text-xs font-black text-6xl text-lg. **Media:** 0. **Interactions:** 2. **Personal voice:** 6.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `6337412444e2`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 025 — The Photo Room for Sanzu

**Route:** `/photo-booth` · **Journey status:** sequence page 18 · **Journey order:** 18
**Code:** `src/pages/PhotoBoothPage.jsx` → primary local component **PolaroidPhotoBooth**; 9 local files, 56595 aggregated bytes.
**Design:** bg-white border-2 border-pink-200 rounded-2xl shadow-2xl text-left rounded-xl bg-pink-50 border-gray-200 text-3xl. **Media:** 28. **Interactions:** 60. **Personal voice:** 35.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `59b1dc8df05e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 026 — The Promises Abu Planted

**Route:** `/promise-tree` · **Journey status:** sequence page 19 · **Journey order:** 19
**Code:** `src/pages/PromiseTreePage.jsx` → primary local component **SakuraPromiseTree**; 10 local files, 109844 aggregated bytes.
**Design:** rounded-3xl bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 border-2 border-pink-300 shadow-2xl bg-amber-800 rounded-t-full. **Media:** 30. **Interactions:** 64. **Personal voice:** 229.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `673fd0060733`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 027 — The Keepsake Abu Locked Away

**Route:** `/treasure-chest` · **Journey status:** sequence page 20 · **Journey order:** 20
**Code:** `src/pages/TreasureChestPage.jsx` → primary local component **page-specific JSX**; 2 local files, 11480 aggregated bytes.
**Design:** bg-[ text-amber-50 text-amber-300 text-xs font-black text-6xl rounded-[2rem] border-amber-200/20 bg-amber-100/10 text-left. **Media:** 31. **Interactions:** 6. **Personal voice:** 12.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `bb5e8b36e979`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 028 — The Little Luck Abu Wishes You

**Route:** `/love-slots` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveSlotsPage.jsx` → primary local component **LoveSlots**; 10 local files, 108621 aggregated bytes.
**Design:** rounded-3xl border-2 border-pink-300 shadow-2xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white bg-slate-800 rounded-2xl. **Media:** 30. **Interactions:** 61. **Personal voice:** 230.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `a4691c517ac1`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 029 — Samjhana Written in the Stars

**Route:** `/horoscope` · **Journey status:** sequence page 21 · **Journey order:** 21
**Code:** `src/pages/HoroscopePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1470 aggregated bytes.
**Design:** bg-[ text-white text-amber-300 text-xs font-black text-indigo-300 text-6xl rounded-[2rem] text-left border-amber-300. **Media:** 0. **Interactions:** 2. **Personal voice:** 8.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `305f423081a3`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 030 — The Measureless Love Abu Feels

**Route:** `/love-calculator` · **Journey status:** sequence page 22 · **Journey order:** 22
**Code:** `src/pages/LoveCalculatorPage.jsx` → primary local component **LoveCalculator**; 8 local files, 99650 aggregated bytes.
**Design:** text-center font-ui rounded-full bg-rose-100 text-rose-600 font-bold text-xs shadow-sm text-pink-500 text-2xl. **Media:** 30. **Interactions:** 65. **Personal voice:** 250.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c678fa14647a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 031 — A Birthday Table for Sanu

**Route:** `/cooking-game` · **Journey status:** sequence page 23 · **Journey order:** 23
**Code:** `src/pages/CookingGamePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1893 aggregated bytes.
**Design:** bg-[ text-[ text-orange-600 text-xs font-black text-orange-700 text-6xl text-lg to-Sakai rounded-3xl. **Media:** 0. **Interactions:** 2. **Personal voice:** 9.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `3ab78bfc816f`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 032 — A Soft Companion for Lonely Days

**Route:** `/love-pet` · **Journey status:** sequence page 24 · **Journey order:** 24
**Code:** `src/pages/LovePetPage.jsx` → primary local component **VirtualLovePet**; 10 local files, 108005 aggregated bytes.
**Design:** rounded-3xl border-2 border-pink-300 shadow-2xl bg-white rounded-full bg-pink-100 text-7xl shadow-inner border-4. **Media:** 30. **Interactions:** 59. **Personal voice:** 231.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `99c66a713499`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 033 — The Night Ride We Still Owe Ourselves

**Route:** `/future-night-ride` · **Journey status:** registered but not in sequence
**Code:** `src/pages/FutureNightRidePage.jsx` → primary local component **page-specific JSX**; 4 local files, 321429 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-cyan-300/70 text-6xl text-8xl text-cyan-300 rounded-[2rem] border-cyan-200/15. **Media:** 32. **Interactions:** 6. **Personal voice:** 4134.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `419c77a6e150`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 034 — The Things Abu Knows About You

**Route:** `/two-truths` · **Journey status:** registered but not in sequence
**Code:** `src/pages/TwoTruthsPage.jsx` → primary local component **TwoTruthsGame**; 10 local files, 116224 aggregated bytes.
**Design:** font-ui bg-white/80 rounded-2xl border-pink-200 shadow-sm text-xs font-bold text-gray-800 text-rose-600 font-extrabold. **Media:** 30. **Interactions:** 68. **Personal voice:** 258.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d5db8b736f8a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 035 — Words Hidden in Our Story

**Route:** `/word-search` · **Journey status:** registered but not in sequence
**Code:** `src/pages/WordSearchPage.jsx` → primary local component **LoveWordSearch**; 10 local files, 117406 aggregated bytes.
**Design:** font-ui bg-white/80 rounded-2xl border-pink-200 shadow-sm text-xs font-bold text-gray-800 text-rose-600 text-[10px]. **Media:** 30. **Interactions:** 69. **Personal voice:** 238.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `98a456e9203e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 036 — The Wish Abu Dropped for You

**Route:** `/wishing-well` · **Journey status:** sequence page 25 · **Journey order:** 25
**Code:** `src/pages/WishingWellPage.jsx` → primary local component **WishingWell**; 11 local files, 117182 aggregated bytes.
**Design:** font-ui bg-white/80 rounded-2xl border-pink-200 shadow-sm text-left text-xs font-bold text-gray-700 text-amber-500. **Media:** 30. **Interactions:** 78. **Personal voice:** 240.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `8843740b5847`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 037 — The Things Abu Wants to Say Out Loud

**Route:** `/voice-soundboard` · **Journey status:** sequence page 26 · **Journey order:** 26
**Code:** `src/pages/VoiceSoundboardPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1596 aggregated bytes.
**Design:** bg-[ text-white text-fuchsia-300 text-xs font-black text-6xl rounded-2xl text-left font-bold bg-fuchsia-300. **Media:** 0. **Interactions:** 2. **Personal voice:** 4.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `b331b165e220`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 038 — Two Hearts, One Gentle Match

**Route:** `/tic-tac-toe` · **Journey status:** registered but not in sequence
**Code:** `src/pages/TicTacToePage.jsx` → primary local component **LoveTicTacToe**; 10 local files, 115505 aggregated bytes.
**Design:** font-ui bg-white/80 rounded-2xl border-pink-200 shadow-sm text-xs font-bold text-gray-800 rounded-full border-2. **Media:** 35. **Interactions:** 71. **Personal voice:** 291.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `15e940b4f8f8`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 039 — A Sky Full of Abu’s Wishes

**Route:** `/fireworks` · **Journey status:** sequence page 27 · **Journey order:** 27
**Code:** `src/pages/FireworksPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1524 aggregated bytes.
**Design:** bg-[ text-white text-center text-pink-300 text-xs font-black text-sky-300 text-6xl rounded-full border-2. **Media:** 0. **Interactions:** 2. **Personal voice:** 4.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `c9a745207c2d`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 040 — Put Our Memories Back in Order

**Route:** `/timeline-quiz` · **Journey status:** registered but not in sequence
**Code:** `src/pages/TimelinePuzzlePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1725 aggregated bytes.
**Design:** bg-[ text-[ text-indigo-700 text-xs font-black text-6xl rounded-[2rem] bg-white shadow-xl rounded-full. **Media:** 0. **Interactions:** 2. **Personal voice:** 12.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `76b81c563cf9`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 041 — A Pocketful of Better Days

**Route:** `/bubble-pop` · **Journey status:** registered but not in sequence
**Code:** `src/pages/BubblePopPage.jsx` → primary local component **BubblePopGame**; 10 local files, 113539 aggregated bytes.
**Design:** font-ui bg-white/80 rounded-2xl border-pink-200 shadow-sm text-xs font-bold text-gray-800 text-rose-600 font-extrabold. **Media:** 30. **Interactions:** 62. **Personal voice:** 248.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `cafe668fd9b6`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 042 — Places Abu Still Wants to Take You

**Route:** `/bucket-list` · **Journey status:** sequence page 28 · **Journey order:** 28
**Code:** `src/pages/BucketListPage.jsx` → primary local component **TravelBucketList**; 10 local files, 119897 aggregated bytes.
**Design:** font-ui bg-white/80 rounded-3xl border-pink-200 shadow-sm text-xs font-bold text-rose-600 text-rose-500 text-pink-600. **Media:** 30. **Interactions:** 82. **Personal voice:** 261.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `050297131ed9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 043 — A Paper Heart for Samjhana

**Route:** `/origami` · **Journey status:** sequence page 29 · **Journey order:** 29
**Code:** `src/pages/OrigamiPage.jsx` → primary local component **OrigamiHeart**; 10 local files, 113394 aggregated bytes.
**Design:** from-amber-50 to-yellow-50 border-amber-200 from-pink-50 to-rose-50 border-pink-200 from-rose-50 to-pink-50 border-rose-300 from-rose-100. **Media:** 30. **Interactions:** 64. **Personal voice:** 234.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `bf2865b4e14c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 044 — Words for Your Difficult Days

**Route:** `/affirmations` · **Journey status:** sequence page 30 · **Journey order:** 30
**Code:** `src/pages/AffirmationsPage.jsx` → primary local component **LoveAffirmations**; 10 local files, 114503 aggregated bytes.
**Design:** from-rose-500 to-pink-600 from-amber-500 to-orange-500 from-purple-500 to-indigo-600 from-pink-500 to-fuchsia-600 from-rose-600 to-red-500. **Media:** 30. **Interactions:** 61. **Personal voice:** 242.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b1a1c1d8575a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 045 — The Birthday Song for Bhuntu

**Route:** `/love-piano` · **Journey status:** sequence page 31 · **Journey order:** 31
**Code:** `src/pages/LovePianoPage.jsx` → primary local component **LovePiano**; 7 local files, 83775 aggregated bytes.
**Design:** from-pink-500 to-rose-400 from-rose-400 to-pink-400 from-purple-400 to-pink-500 from-indigo-400 to-purple-400 from-sky-400 to-indigo-400. **Media:** 30. **Interactions:** 26. **Personal voice:** 225.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d76819b20d85`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 046 — The Letter Abu Sealed for You

**Route:** `/wax-sealer` · **Journey status:** sequence page 32 · **Journey order:** 32
**Code:** `src/pages/WaxSealerPage.jsx` → primary local component **WaxSealer**; 10 local files, 115370 aggregated bytes.
**Design:** bg-red-600 bg-pink-500 bg-purple-600 bg-amber-600 rounded-full text-[11px] font-bold bg-green-500 text-white bg-gray-200. **Media:** 31. **Interactions:** 77. **Personal voice:** 230.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `8d64d435eb4d`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 047 — Finding the Way Back to You

**Route:** `/love-maze` · **Journey status:** sequence page 33 · **Journey order:** 33
**Code:** `src/pages/LoveMazePage.jsx` → primary local component **page-specific JSX**; 1 local files, 2186 aggregated bytes.
**Design:** bg-[ text-[ rounded-[2.5rem] text-emerald-50 text-amber-300 text-xs font-black text-emerald-300 text-5xl text-emerald-100/70. **Media:** 0. **Interactions:** 4. **Personal voice:** 8.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `903820951d55`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 048 — Fortunes Abu Wishes for Sanzu

**Route:** `/fortune-cookie` · **Journey status:** sequence page 34 · **Journey order:** 34
**Code:** `src/pages/FortuneCookiePage.jsx` → primary local component **FortuneCookie**; 8 local files, 97925 aggregated bytes.
**Design:** text-center font-ui rounded-full bg-amber-100 text-amber-700 font-bold text-xs shadow-sm text-amber-600 text-2xl. **Media:** 30. **Interactions:** 59. **Personal voice:** 230.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0bce1e6de655`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 049 — A Little Bottle of Abu’s Feelings

**Route:** `/love-potion` · **Journey status:** sequence page 35 · **Journey order:** 35
**Code:** `src/pages/LovePotionPage.jsx` → primary local component **LovePotion**; 8 local files, 101260 aggregated bytes.
**Design:** text-center font-ui rounded-full bg-purple-100 text-purple-700 font-bold text-xs shadow-sm text-purple-600 text-2xl. **Media:** 30. **Interactions:** 60. **Personal voice:** 230.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `9cb26c4b5556`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 050 — Our Story in Small Symbols

**Route:** `/emoji-story` · **Journey status:** sequence page 36 · **Journey order:** 36
**Code:** `src/pages/EmojiStoryPage.jsx` → primary local component **EmojiStory**; 10 local files, 109140 aggregated bytes.
**Design:** text-xs font-bold text-gray-500 font-ui rounded-3xl bg-white border-2 border-pink-300 shadow-xl text-4xl. **Media:** 30. **Interactions:** 57. **Personal voice:** 229.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `8869f2cca4c1`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 051 — The Pieces Abu Remembers

**Route:** `/jigsaw` · **Journey status:** registered but not in sequence
**Code:** `src/pages/JigsawPage.jsx` → primary local component **JigsawPuzzle**; 10 local files, 114805 aggregated bytes.
**Design:** font-ui bg-white/80 rounded-2xl border-pink-200 shadow-sm text-xs font-bold text-gray-800 text-rose-600 font-extrabold. **Media:** 33. **Interactions:** 71. **Personal voice:** 240.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e0495e0add68`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 052 — A Tiny Chance to Smile

**Route:** `/love-dice` · **Journey status:** sequence page 37 · **Journey order:** 37
**Code:** `src/pages/LoveDicePage.jsx` → primary local component **LoveDice**; 8 local files, 102277 aggregated bytes.
**Design:** text-center font-ui rounded-full bg-rose-100 text-rose-600 font-bold text-xs shadow-sm text-pink-500 text-2xl. **Media:** 30. **Interactions:** 61. **Personal voice:** 236.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1fa7d510c637`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 053 — A Sky of Notes for Babe

**Route:** `/balloon-pop` · **Journey status:** sequence page 38 · **Journey order:** 38
**Code:** `src/pages/BalloonPopPage.jsx` → primary local component **BalloonPop**; 10 local files, 109057 aggregated bytes.
**Design:** text-xs text-gray-400 font-ui text-2xl text-4xl text-[11px] font-bold text-gray-500 rounded-3xl bg-white. **Media:** 30. **Interactions:** 59. **Personal voice:** 230.
**Gift record:** complete; gift “a private letter from Abu”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1b9a28620b4b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 054 — The Little Things We Notice

**Route:** `/couple-bingo` · **Journey status:** sequence page 39 · **Journey order:** 39
**Code:** `src/pages/CoupleBingoPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1633 aggregated bytes.
**Design:** bg-[ text-[ border-b-2 border-[ text-xs font-black text-6xl font-mono text-sm text-left. **Media:** 0. **Interactions:** 2. **Personal voice:** 7.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `28bc20565e13`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 055 — Abu’s Review of Samjhana

**Route:** `/love-review` · **Journey status:** sequence page 40 · **Journey order:** 40
**Code:** `src/pages/LoveReviewPage.jsx` → primary local component **LoveReview**; 8 local files, 46585 aggregated bytes.
**Design:** text-amber-500 text-left font-ui rounded-2xl bg-white border-2 border-amber-200 shadow-md text-xl text-xs. **Media:** 0. **Interactions:** 51. **Personal voice:** 47.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `490a73541ff9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 056 — Pages Abu Writes About You

**Route:** `/love-diary` · **Journey status:** sequence page 41 · **Journey order:** 41
**Code:** `src/pages/LoveDiaryPage.jsx` → primary local component **LoveDiary**; 10 local files, 109488 aggregated bytes.
**Design:** text-xs text-gray-400 font-ui bg-amber-50 border-2 border-amber-300 rounded-3xl shadow-2xl text-2xl font-bold. **Media:** 31. **Interactions:** 56. **Personal voice:** 231.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `528488b80807`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 057 — The Words Abu Keeps

**Route:** `/love-scrabble` · **Journey status:** sequence page 42 · **Journey order:** 42
**Code:** `src/pages/LoveScrabblePage.jsx` → primary local component **LoveScrabble**; 9 local files, 53185 aggregated bytes.
**Design:** font-ui text-center rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border-amber-300 text-amber-700 font-bold text-xs. **Media:** 0. **Interactions:** 66. **Personal voice:** 36.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `131daaecc3b2`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 058 — The Lucky Number Is You

**Route:** `/love-lottery` · **Journey status:** sequence page 43 · **Journey order:** 43
**Code:** `src/pages/LoveLotteryPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1574 aggregated bytes.
**Design:** bg-[ text-[ text-center text-rose-600 text-xs font-black text-6xl text-lg rounded-[2rem] border-2. **Media:** 0. **Interactions:** 2. **Personal voice:** 8.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `85e10fd2cdf7`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 059 — A Tiny Heart to Look After

**Route:** `/love-tamagotchi` · **Journey status:** sequence page 44 · **Journey order:** 44
**Code:** `src/pages/LoveTamagotchiPage.jsx` → primary local component **LoveTamagotchi**; 10 local files, 109384 aggregated bytes.
**Design:** rounded-3xl bg-pink-50 border-4 border-pink-300 shadow-2xl text-6xl text-xs font-bold text-rose-600 bg-white. **Media:** 30. **Interactions:** 63. **Personal voice:** 230.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `585b0d56e2a6`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 060 — The Secret Abu Saved

**Route:** `/secret-vault` · **Journey status:** sequence page 45 · **Journey order:** 45
**Code:** `src/pages/SecretVaultPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1462 aggregated bytes.
**Design:** bg-[ text-lime-50 text-lime-300 text-xs font-black text-6xl rounded-[2rem] text-left border-lime-300 bg-lime-300. **Media:** 0. **Interactions:** 2. **Personal voice:** 6.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `6abce1a1eceb`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 061 — A Reading for Abu and Sanzu

**Route:** `/love-tarot` · **Journey status:** sequence page 46 · **Journey order:** 46
**Code:** `src/pages/LoveTarotPage.jsx` → primary local component **LoveTarot**; 10 local files, 108267 aggregated bytes.
**Design:** rounded-3xl border-2 shadow-lg bg-purple-50 border-purple-300 bg-gradient-to-br from-indigo-900 to-purple-900 border-purple-500 text-purple-200. **Media:** 30. **Interactions:** 54. **Personal voice:** 229.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `5d1ee0b2921f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 062 — The Lane of Our First Memories

**Route:** `/memory-lane` · **Journey status:** sequence page 47 · **Journey order:** 47
**Code:** `src/pages/MemoryLanePage.jsx` → primary local component **page-specific JSX**; 4 local files, 321887 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-6xl text-8xl text-lg rounded-[2rem] shadow-xl rounded-[1.5rem]. **Media:** 32. **Interactions:** 8. **Personal voice:** 4134.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e21896e65c8d`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 063 — Hugs Abu Owes You

**Route:** `/hug-counter` · **Journey status:** sequence page 48 · **Journey order:** 48
**Code:** `src/pages/HugCounterPage.jsx` → primary local component **HugCounter**; 10 local files, 114092 aggregated bytes.
**Design:** text-yellow-500 text-orange-500 text-rose-500 text-purple-500 text-pink-600 to-hug from-rose-500 to-orange-500 from-pink-500 to-rose-500. **Media:** 30. **Interactions:** 81. **Personal voice:** 233.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `cbec36294279`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 064 — A Crossword Made of Our Clues

**Route:** `/love-crossword` · **Journey status:** sequence page 49 · **Journey order:** 49
**Code:** `src/pages/LoveCrosswordPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1487 aggregated bytes.
**Design:** bg-[ text-[ text-center text-rose-700 text-xs font-black text-6xl rounded-2xl border-rose-200 bg-white. **Media:** 0. **Interactions:** 2. **Personal voice:** 7.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `425f46b57010`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 065 — Abu’s Late-Night Radio for You

**Route:** `/love-radio` · **Journey status:** sequence page 50 · **Journey order:** 50
**Code:** `src/pages/LoveRadioPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1769 aggregated bytes.
**Design:** bg-[ text-amber-50 rounded-[2rem] border-amber-200/20 bg-amber-100/10 text-amber-300 text-xs font-black text-5xl text-amber-100/70. **Media:** 0. **Interactions:** 2. **Personal voice:** 6.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `f96a064e26cf`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 066 — A Tree of Abu’s Blessings

**Route:** `/blessing-tree` · **Journey status:** sequence page 51 · **Journey order:** 51
**Code:** `src/pages/BlessingTreePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1695 aggregated bytes.
**Design:** bg-[ text-[ text-emerald-700 text-xs font-black text-6xl rounded-[2.5rem] rounded-t-full bg-amber-700 rounded-full. **Media:** 0. **Interactions:** 2. **Personal voice:** 3.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `b81c491b1776`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 067 — The Feeling You Leave in Every Room

**Route:** `/love-vibe` · **Journey status:** sequence page 52 · **Journey order:** 52
**Code:** `src/pages/LoveVibePage.jsx` → primary local component **LoveVibe**; 10 local files, 116100 aggregated bytes.
**Design:** font-ui bg-white/80 rounded-2xl border-pink-200 shadow-sm text-xs font-bold text-gray-800 rounded-full bg-amber-100. **Media:** 32. **Interactions:** 89. **Personal voice:** 242.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `2e8122d929ef`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 068 — How Abu Remembers Our Details

**Route:** `/couple-quiz-2` · **Journey status:** registered but not in sequence
**Code:** `src/pages/CoupleQuiz2Page.jsx` → primary local component **page-specific JSX**; 4 local files, 321393 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-violet-700/70 text-6xl text-8xl rounded-[2rem] shadow-xl text-lg. **Media:** 32. **Interactions:** 6. **Personal voice:** 4136.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `76b18f420c64`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 069 — Three Little Promises for Our Future

**Route:** `/promise-trio` · **Journey status:** registered but not in sequence
**Code:** `src/pages/PromiseTrioPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321624 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-6xl text-8xl text-lg rounded-[2rem] border-[ bg-white. **Media:** 32. **Interactions:** 6. **Personal voice:** 4133.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f8581ce47c0e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 070 — A Bento Box of Small Memories

**Route:** `/bento-box` · **Journey status:** sequence page 53 · **Journey order:** 53
**Code:** `src/pages/BentoBoxPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1589 aggregated bytes.
**Design:** bg-[ text-[ text-orange-700 text-xs font-black text-6xl rounded-3xl border-4 text-left border-orange-700. **Media:** 0. **Interactions:** 2. **Personal voice:** 9.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `a101e06cf9cb`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 071 — The Letter Abu Would Send Tonight

**Route:** `/letter-tonight` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LetterTonightPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321276 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-6xl text-8xl rounded-lg shadow-xl rounded-[1.5rem] shadow-2xl. **Media:** 33. **Interactions:** 6. **Personal voice:** 4132.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `7838e9d9ad42`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 072 — Coupons Abu Would Give You

**Route:** `/love-coupon-generator` · **Journey status:** sequence page 54 · **Journey order:** 54
**Code:** `src/pages/LoveCouponGeneratorPage.jsx` → primary local component **LoveCouponGenerator**; 11 local files, 124151 aggregated bytes.
**Design:** from-rose-500 to-pink-600 from-amber-500 to-rose-500 from-sky-500 to-indigo-600 from-purple-600 from-yellow-500 to-amber-600 from-pink-500. **Media:** 30. **Interactions:** 75. **Personal voice:** 267.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `082e51dd287e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 073 — The Star Abu Named for Samjhana

**Route:** `/star-namer` · **Journey status:** sequence page 55 · **Journey order:** 55
**Code:** `src/pages/StarNamerPage.jsx` → primary local component **StarNamer**; 11 local files, 123229 aggregated bytes.
**Design:** ring-orion text-amber-400 font-ui bg-indigo-950/80 rounded-2xl border-indigo-500/30 text-white shadow-xl text-xs font-bold. **Media:** 33. **Interactions:** 68. **Personal voice:** 264.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b07db21b208e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 074 — Notes Abu Put in the Jar

**Route:** `/love-jar-notes` · **Journey status:** sequence page 56 · **Journey order:** 56
**Code:** `src/pages/LoveJarNotesPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321343 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-6xl text-8xl text-lg rounded-[1.5rem] shadow-lg rounded-[2rem]. **Media:** 32. **Interactions:** 6. **Personal voice:** 4133.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `9442b0b64541`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 075 — The Sweet Things Abu Means

**Route:** `/sweet-compliments` · **Journey status:** sequence page 57 · **Journey order:** 57
**Code:** `src/pages/SweetComplimentsPage.jsx` → primary local component **SweetCompliments**; 2 local files, 3641 aggregated bytes.
**Design:** no Tailwind design tokens detected. **Media:** 0. **Interactions:** 5. **Personal voice:** 3.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `6359b652c1da`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 076 — Kisses Saved for the Day We Meet

**Route:** `/kiss-collector` · **Journey status:** sequence page 58 · **Journey order:** 58
**Code:** `src/pages/KissCollectorPage.jsx` → primary local component **KissCollector**; 10 local files, 112212 aggregated bytes.
**Design:** text-pink-400 text-xs font-bold text-gray-500 rounded-full border-3 shadow-md ring-2 ring-offset-2 ring-pink-500. **Media:** 30. **Interactions:** 65. **Personal voice:** 233.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `5c7f3730caeb`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 077 — Turn Over an Abu Memory

**Route:** `/love-memory-flip` · **Journey status:** sequence page 59 · **Journey order:** 59
**Code:** `src/pages/LoveMemoryFlipPage.jsx` → primary local component **LoveMemoryFlip**; 11 local files, 120513 aggregated bytes.
**Design:** text-pink-500 font-ui bg-white/80 rounded-3xl border-2 border-pink-300 shadow-md rounded-full text-xs font-black. **Media:** 32. **Interactions:** 82. **Personal voice:** 250.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ab2c728f8bf9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 078 — The Sound of Your Name

**Route:** `/sound-wave` · **Journey status:** sequence page 60 · **Journey order:** 60
**Code:** `src/pages/SoundWavePage.jsx` → primary local component **SoundWave**; 11 local files, 118734 aggregated bytes.
**Design:** text-purple-400 font-ui rounded-3xl bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 text-white border-2 border-purple-500/40. **Media:** 32. **Interactions:** 65. **Personal voice:** 248.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `199a3e1de106`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 079 — Stamps from Our Story

**Route:** `/love-passport-stamps` · **Journey status:** sequence page 61 · **Journey order:** 61
**Code:** `src/pages/LovePassportStampsPage.jsx` → primary local component **LovePassportStamps**; 2 local files, 3942 aggregated bytes.
**Design:** no Tailwind design tokens detected. **Media:** 0. **Interactions:** 7. **Personal voice:** 4.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `3bc13dcf7b07`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 080 — The Mood Abu Notices First

**Route:** `/mood-ring` · **Journey status:** sequence page 62 · **Journey order:** 62
**Code:** `src/pages/MoodRingPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1385 aggregated bytes.
**Design:** bg-rose-300 bg-amber-300 bg-indigo-300 text-[ text-xs font-black text-6xl rounded-[2rem] border-4 text-left. **Media:** 0. **Interactions:** 2. **Personal voice:** 5.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `d262158ce5f6`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 081 — A Tower of Tiny Memories

**Route:** `/love-tetris` · **Journey status:** sequence page 243 · **Journey order:** 243
**Code:** `src/pages/LoveTetrisPage.jsx` → primary local component **page-specific JSX**; 1 local files, 2029 aggregated bytes.
**Design:** bg-[ text-[ text-sky-700 text-xs font-black text-6xl rounded-[2rem] border-sky-200 bg-white shadow-lg. **Media:** 0. **Interactions:** 3. **Personal voice:** 8.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `bd5ab84b3661`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 082 — Aiming Abu’s Good Wishes Your Way

**Route:** `/cupid-archery` · **Journey status:** sequence page 63 · **Journey order:** 63
**Code:** `src/pages/CupidArcheryPage.jsx` → primary local component **CupidArchery**; 10 local files, 114703 aggregated bytes.
**Design:** rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs bg-indigo-100 text-indigo-700 bg-rose-100 text-rose-600 rounded-3xl. **Media:** 30. **Interactions:** 75. **Personal voice:** 232.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `31f5832f569d`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 083 — The Wake-Up Note from Abu

**Route:** `/love-alarm` · **Journey status:** sequence page 64 · **Journey order:** 64
**Code:** `src/pages/LoveAlarmPage.jsx` → primary local component **LoveAlarm**; 10 local files, 114743 aggregated bytes.
**Design:** rounded-3xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-4 border-pink-400 shadow-2xl text-white rounded-full. **Media:** 30. **Interactions:** 75. **Personal voice:** 235.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ae578013a917`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 084 — Our Next Places Together

**Route:** `/couple-bucket-list-2` · **Journey status:** sequence page 65 · **Journey order:** 65
**Code:** `src/pages/CoupleBucketList2Page.jsx` → primary local component **page-specific JSX**; 4 local files, 321546 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-6xl text-8xl text-lg rounded-[2rem] bg-white shadow-xl. **Media:** 32. **Interactions:** 6. **Personal voice:** 4136.
**Gift record:** complete; gift “a private letter from Abu”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d006f5b3d2f8`; no direct code error signal; generic/randomized idea; all detected internal targets registered.

### Registered page 085 — The Details Abu Never Forgets

**Route:** `/love-quiz-advanced` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveQuizAdvancedPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321373 aggregated bytes.
**Design:** bg-[ text-[ text-teal-200 text-xs font-black text-6xl text-8xl rounded-[2rem] border-teal-100/15 bg-white/[.06]. **Media:** 32. **Interactions:** 6. **Personal voice:** 4138.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1186183dbc33`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 086 — Abu’s Measureless Love Meter

**Route:** `/love-meter-deluxe` · **Journey status:** sequence page 66 · **Journey order:** 66
**Code:** `src/pages/LoveMeterDeluxePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1880 aggregated bytes.
**Design:** bg-[ text-[ text-violet-700 text-xs font-black text-6xl text-lg rounded-[2rem] border-2 text-left. **Media:** 0. **Interactions:** 2. **Personal voice:** 17.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `cc49d49cf4e1`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 087 — An Envelope from Abu

**Route:** `/love-envelope` · **Journey status:** sequence page 67 · **Journey order:** 67
**Code:** `src/pages/LoveEnvelopePage.jsx` → primary local component **LoveEnvelope**; 11 local files, 121531 aggregated bytes.
**Design:** from-amber-400 to-amber-600 from-rose-500 to-pink-600 from-purple-500 to-indigo-600 text-rose-500 font-ui bg-white/80 rounded-2xl. **Media:** 32. **Interactions:** 83. **Personal voice:** 259.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `12c651231005`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 088 — Connect the Names Abu Loves

**Route:** `/love-constellation-connect` · **Journey status:** sequence page 68 · **Journey order:** 68
**Code:** `src/pages/LoveConstellationConnectPage.jsx` → primary local component **LoveConstellationConnect**; 11 local files, 118464 aggregated bytes.
**Design:** text-amber-400 font-ui rounded-full text-xs font-black bg-amber-400 text-slate-950 border-amber-400 shadow-md bg-slate-900/80. **Media:** 32. **Interactions:** 67. **Personal voice:** 247.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `18a3beed87de`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 089 — A Journal Prompt from Abu

**Route:** `/love-journal-prompt` · **Journey status:** sequence page 69 · **Journey order:** 69
**Code:** `src/pages/LoveJournalPromptPage.jsx` → primary local component **LoveJournalPrompt**; 11 local files, 114943 aggregated bytes.
**Design:** rounded-full bg-green-100 text-green-700 font-extrabold text-xs bg-gray-200 bg-green-500 bg-amber-800 rounded-l-xl shadow-inner. **Media:** 30. **Interactions:** 70. **Personal voice:** 257.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `8b896c6098c6`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 090 — Chimes for Your Quiet Days

**Route:** `/love-chimes` · **Journey status:** sequence page 70 · **Journey order:** 70
**Code:** `src/pages/LoveChimesPage.jsx` → primary local component **LoveChimes**; 10 local files, 112390 aggregated bytes.
**Design:** from-cyan-400 to-cyan-600 from-blue-400 to-blue-600 from-indigo-400 to-indigo-600 from-purple-400 to-purple-600 from-pink-400 to-pink-600. **Media:** 30. **Interactions:** 74. **Personal voice:** 230.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `be449370417a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 091 — Slide the Story into Place

**Route:** `/love-puzzle-slider` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LovePuzzleSliderPage.jsx` → primary local component **LovePuzzleSlider**; 10 local files, 111496 aggregated bytes.
**Design:** rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs bg-amber-100 text-amber-700 bg-gray-100 text-gray-600 font-bold. **Media:** 30. **Interactions:** 62. **Personal voice:** 230.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `87c9ecd18a7f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 092 — Today’s Note from the Stars

**Route:** `/love-horoscope-daily` · **Journey status:** sequence page 71 · **Journey order:** 71
**Code:** `src/pages/LoveHoroscopeDailyPage.jsx` → primary local component **LoveHoroscopeDaily**; 2 local files, 5015 aggregated bytes.
**Design:** no Tailwind design tokens detected. **Media:** 0. **Interactions:** 8. **Personal voice:** 6.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `e482e07b3c4e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 093 — The Recipe for a Good Day Together

**Route:** `/love-recipe` · **Journey status:** sequence page 72 · **Journey order:** 72
**Code:** `src/pages/LoveRecipePage.jsx` → primary local component **LoveRecipe**; 2 local files, 4308 aggregated bytes.
**Design:** no Tailwind design tokens detected. **Media:** 0. **Interactions:** 8. **Personal voice:** 2.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `f084814cc75f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 094 — Fireflies for Sanzu

**Route:** `/love-fireflies` · **Journey status:** sequence page 73 · **Journey order:** 73
**Code:** `src/pages/LoveFirefliesPage.jsx` → primary local component **LoveFireflies**; 10 local files, 114473 aggregated bytes.
**Design:** rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs bg-gray-200 bg-gradient-to-r from-amber-400 to-amber-500 rounded-3xl. **Media:** 30. **Interactions:** 74. **Personal voice:** 233.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `688bbd5b5d41`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 095 — How Abu’s Love Keeps Growing

**Route:** `/love-tree-growth` · **Journey status:** sequence page 74 · **Journey order:** 74
**Code:** `src/pages/LoveTreeGrowthPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1943 aggregated bytes.
**Design:** bg-[ text-[ text-emerald-700 text-xs font-black text-6xl border-l-4 border-emerald-200 rounded-2xl text-left. **Media:** 0. **Interactions:** 4. **Personal voice:** 2.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `6530937cf63a`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 096 — Wishes Written Above Us

**Route:** `/love-wishes-sky` · **Journey status:** sequence page 75 · **Journey order:** 75
**Code:** `src/pages/LoveWishesSkyPage.jsx` → primary local component **LoveWishesSky**; 11 local files, 114740 aggregated bytes.
**Design:** text-amber-400 font-ui rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-black border-4 border-amber-400 shadow-2xl. **Media:** 30. **Interactions:** 60. **Personal voice:** 257.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `fb7324593f3b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 097 — A Trip Back to Our First Days

**Route:** `/love-time-machine` · **Journey status:** sequence page 76 · **Journey order:** 76
**Code:** `src/pages/LoveTimeMachinePage.jsx` → primary local component **LoveTimeMachine**; 10 local files, 112344 aggregated bytes.
**Design:** rounded-full text-sm font-bold bg-indigo-600 text-white shadow-lg bg-green-500 bg-gray-200 text-gray-500 bg-gray-300. **Media:** 30. **Interactions:** 63. **Personal voice:** 231.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `995a52b0640e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 098 — Match the Memory to the Feeling

**Route:** `/love-memory-match` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveMemoryMatchPage.jsx` → primary local component **LoveMemoryMatch**; 10 local files, 63618 aggregated bytes.
**Design:** text-rose-500 font-ui bg-white/80 rounded-2xl border-rose-200 shadow-sm text-xs font-bold text-gray-700 rounded-full. **Media:** 28. **Interactions:** 79. **Personal voice:** 40.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `59f38dcc5b91`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 099 — A Folded Heart for Bhuntu

**Route:** `/love-origami-heart` · **Journey status:** sequence page 77 · **Journey order:** 77
**Code:** `src/pages/LoveOrigamiHeartPage.jsx` → primary local component **LoveOrigamiHeart**; 9 local files, 54470 aggregated bytes.
**Design:** text-rose-500 font-ui rounded-full text-xs font-black shadow-md bg-emerald-500 text-white bg-pink-500 ring-4. **Media:** 0. **Interactions:** 71. **Personal voice:** 46.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `2ceb6b4f8c85`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 100 — A Fortune Abu Left Inside

**Route:** `/love-fortune-cookie` · **Journey status:** sequence page 78 · **Journey order:** 78
**Code:** `src/pages/LoveFortuneCookiePage.jsx` → primary local component **LoveFortuneCookie**; 9 local files, 49867 aggregated bytes.
**Design:** text-amber-500 font-ui rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-4 border-amber-200 shadow-2xl. **Media:** 0. **Interactions:** 66. **Personal voice:** 48.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `dc1f4866a5ad`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 101 — Love Scratch Card

**Route:** `/love-scratch-card` · **Journey status:** sequence page 79 · **Journey order:** 79
**Code:** `src/pages/LoveScratchCardPage.jsx` → primary local component **page-specific JSX**; 2 local files, 11519 aggregated bytes.
**Design:** bg-[ text-[ rounded-[2rem] shadow-xl text-rose-700 text-xs font-black text-6xl text-lg rounded-full. **Media:** 31. **Interactions:** 6. **Personal voice:** 9.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `8eb4c1f49aa5`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 102 — What Abu Hears in Your Voice

**Route:** `/love-audio-visualizer` · **Journey status:** sequence page 80 · **Journey order:** 80
**Code:** `src/pages/LoveAudioVisualizerPage.jsx` → primary local component **LoveAudioVisualizer**; 9 local files, 50755 aggregated bytes.
**Design:** text-rose-500 font-ui rounded-2xl text-left bg-rose-500 text-white border-rose-600 shadow-lg bg-white/80 text-gray-800. **Media:** 0. **Interactions:** 65. **Personal voice:** 44.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `12d9f3271e82`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 103 — Our Details, Abu’s Answers

**Route:** `/love-trivia-quiz` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveTriviaQuizPage.jsx` → primary local component **LoveTriviaQuiz**; 8 local files, 45997 aggregated bytes.
**Design:** rounded-3xl bg-white border-4 border-pink-300 shadow-2xl text-xs font-bold text-gray-500 text-base font-extrabold. **Media:** 0. **Interactions:** 59. **Personal voice:** 36.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1ad7850166e9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 104 — A Photo Booth for Sanzu

**Route:** `/love-photo-booth` · **Journey status:** sequence page 81 · **Journey order:** 81
**Code:** `src/pages/LovePhotoBoothPage.jsx` → primary local component **LovePhotoBooth**; 10 local files, 63448 aggregated bytes.
**Design:** bg-rose-50 border-rose-300 text-rose-600 bg-amber-50 border-amber-300 text-amber-700 bg-purple-950 border-purple-500 text-white text-purple-300. **Media:** 30. **Interactions:** 74. **Personal voice:** 41.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `fe88fe95762f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 105 — A Well of Abu’s Wishes

**Route:** `/love-wish-well` · **Journey status:** sequence page 82 · **Journey order:** 82
**Code:** `src/pages/LoveWishWellPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1444 aggregated bytes.
**Design:** bg-[ text-[ text-cyan-700 text-xs font-black text-6xl rounded-[50%] border-8 border-cyan-700 bg-[radial-gradient. **Media:** 0. **Interactions:** 2. **Personal voice:** 7.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `97ccdde54256`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 106 — The Last Gift from Abu

**Route:** `/love-grand-finale` · **Journey status:** sequence page 83 · **Journey order:** 83
**Code:** `src/pages/LoveGrandFinalePage.jsx` → primary local component **LoveGrandFinale**; 10 local files, 66862 aggregated bytes.
**Design:** from-amber-300 via-yellow-400 to-amber-500 from-sky-300 via-blue-400 to-indigo-500 from-pink-300 via-rose-400 to-pink-500 from-purple-300. **Media:** 27. **Interactions:** 71. **Personal voice:** 56.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `432db44b2fb9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 107 — Love Map Canvas

**Route:** `/love-map-canvas` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveMapCanvasPage.jsx` → primary local component **LoveMapCanvas**; 10 local files, 76053 aggregated bytes.
**Design:** text-sky-400 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border-pink-400/40 text-center text-xs text-pink-200. **Media:** 28. **Interactions:** 84. **Personal voice:** 51.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d1e981773ff9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 108 — Heartbeat Drum Pad

**Route:** `/heartbeat-drum-pad` · **Journey status:** sequence page 172 · **Journey order:** 172
**Code:** `src/pages/HeartbeatDrumPadPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1472 aggregated bytes.
**Design:** bg-[ text-white text-rose-400 text-xs font-black text-rose-300 text-6xl rounded-[2rem] text-left border-rose-300. **Media:** 0. **Interactions:** 2. **Personal voice:** 6.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `b95db05f5463`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 109 — Paper Airplane Messenger

**Route:** `/paper-airplane-messenger` · **Journey status:** sequence page 84 · **Journey order:** 84
**Code:** `src/pages/PaperAirplaneMessengerPage.jsx` → primary local component **PaperAirplaneMessenger**; 10 local files, 69115 aggregated bytes.
**Design:** from-pink-500 via-rose-500 to-red-500 from-amber-400 via-yellow-400 to-amber-600 from-pink-300 via-pink-400 to-rose-400 from-indigo-500. **Media:** 30. **Interactions:** 75. **Personal voice:** 45.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f1f546949cf3`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 110 — Our Story in Small Symbols

**Route:** `/emoji-art-canvas` · **Journey status:** sequence page 124 · **Journey order:** 124
**Code:** `src/pages/EmojiArtCanvasPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1885 aggregated bytes.
**Design:** bg-[ text-[ text-pink-600 text-xs font-black text-6xl rounded-[2rem] bg-white shadow-xl rounded-2xl. **Media:** 0. **Interactions:** 4. **Personal voice:** 5.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `1607d51a3ab1`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 111 — Magic 8 Ball Love

**Route:** `/magic-8-ball-love` · **Journey status:** sequence page 85 · **Journey order:** 85
**Code:** `src/pages/Magic8BallLovePage.jsx` → primary local component **Magic8BallLove**; 10 local files, 63082 aggregated bytes.
**Design:** text-purple-400 text-xs font-bold text-violet-300 text-pink-400 rounded-full bg-white/10 bg-white/20 text-violet-200 border-violet-400/30. **Media:** 27. **Interactions:** 67. **Personal voice:** 44.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `861fe24154a6`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 112 — Love Lock Bridge

**Route:** `/love-lock-bridge` · **Journey status:** sequence page 86 · **Journey order:** 86
**Code:** `src/pages/LoveLockBridgePage.jsx` → primary local component **LoveLockBridge**; 10 local files, 65156 aggregated bytes.
**Design:** from-amber-400 via-yellow-400 to-amber-600 text-amber-950 border-yellow-200 from-pink-400 via-rose-400 to-pink-600 text-rose-950 border-pink-200. **Media:** 28. **Interactions:** 67. **Personal voice:** 46.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ba8a3fcb9b18`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 113 — The Secret Language of Us

**Route:** `/secret-language` · **Journey status:** registered but not in sequence
**Code:** `src/pages/SecretLanguagePage.jsx` → primary local component **page-specific JSX**; 4 local files, 321527 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-fuchsia-200/65 text-6xl text-8xl text-lg text-fuchsia-100/65 rounded-[2rem]. **Media:** 32. **Interactions:** 6. **Personal voice:** 4137.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `17d0089f5968`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 114 — Cloud Skywriter

**Route:** `/cloud-skywriter` · **Journey status:** sequence page 87 · **Journey order:** 87
**Code:** `src/pages/CloudSkywriterPage.jsx` → primary local component **CloudSkywriter**; 10 local files, 64315 aggregated bytes.
**Design:** text-sky-300 rounded-3xl bg-gradient-to-b from-purple-950 via-rose-900 to-amber-700 border-4 border-amber-300/80 shadow-2xl rounded-full. **Media:** 29. **Interactions:** 69. **Personal voice:** 41.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `bd96abd2ba19`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 115 — Love Thermometer

**Route:** `/love-thermometer` · **Journey status:** sequence page 88 · **Journey order:** 88
**Code:** `src/pages/LoveThermometerPage.jsx` → primary local component **LoveThermometer**; 10 local files, 62738 aggregated bytes.
**Design:** from-sky-400 via-cyan-400 to-blue-500 from-amber-400 via-orange-500 to-rose-500 from-rose-500 via-red-500 to-amber-400 text-rose-500. **Media:** 27. **Interactions:** 68. **Personal voice:** 36.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `2b9f1133932e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 116 — Movie Ticket Creator

**Route:** `/movie-ticket-creator` · **Journey status:** sequence page 89 · **Journey order:** 89
**Code:** `src/pages/MovieTicketCreatorPage.jsx` → primary local component **MovieTicketCreator**; 10 local files, 63080 aggregated bytes.
**Design:** text-amber-400 rounded-3xl bg-white border-2 border-amber-300 shadow-2xl text-sm font-extrabold font-nepali text-gray-800. **Media:** 28. **Interactions:** 66. **Personal voice:** 47.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `429499586fb8`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 117 — Snow Globe Shaker

**Route:** `/snow-globe-shaker` · **Journey status:** sequence page 90 · **Journey order:** 90
**Code:** `src/pages/SnowGlobeShakerPage.jsx` → primary local component **SnowGlobeShaker**; 10 local files, 58818 aggregated bytes.
**Design:** text-sky-400 text-center rounded-full bg-gradient-to-br from-sky-400/30 via-purple-500/20 to-indigo-900/40 border-4 border-sky-300/70 shadow-[0_0_50px_rgba. **Media:** 27. **Interactions:** 63. **Personal voice:** 44.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `43b2c6e589a7`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 118 — Wish Dandelion

**Route:** `/wish-dandelion` · **Journey status:** sequence page 91 · **Journey order:** 91
**Code:** `src/pages/WishDandelionPage.jsx` → primary local component **WishDandelion**; 10 local files, 63047 aggregated bytes.
**Design:** text-lime-400 rounded-3xl bg-gradient-to-b from-sky-950 via-teal-950 to-emerald-950 border-4 border-lime-400/60 shadow-2xl text-xl. **Media:** 29. **Interactions:** 72. **Personal voice:** 43.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `cfd0a288ad3c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 119 — Pixel Heart Painter

**Route:** `/pixel-heart-painter` · **Journey status:** registered but not in sequence
**Code:** `src/pages/PixelHeartPainterPage.jsx` → primary local component **PixelHeartPainter**; 10 local files, 62515 aggregated bytes.
**Design:** text-pink-400 rounded-3xl bg-slate-900 border-2 border-pink-400/50 shadow-xl text-center text-xs font-mono text-gray-300. **Media:** 28. **Interactions:** 64. **Personal voice:** 38.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ac022b3555bf`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 120 — Romantic Charades

**Route:** `/romantic-charades` · **Journey status:** sequence page 92 · **Journey order:** 92
**Code:** `src/pages/RomanticCharadesPage.jsx` → primary local component **RomanticCharades**; 10 local files, 61025 aggregated bytes.
**Design:** text-orange-400 text-center rounded-3xl bg-gradient-to-br from-orange-600 via-rose-600 to-purple-900 text-white shadow-2xl border-4. **Media:** 27. **Interactions:** 67. **Personal voice:** 49.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `2d873d182eed`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 121 — Love Achievement Badges

**Route:** `/love-achievement-badges` · **Journey status:** sequence page 93 · **Journey order:** 93
**Code:** `src/pages/LoveAchievementBadgesPage.jsx` → primary local component **LoveAchievementBadges**; 10 local files, 60734 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-900 border-2 border-amber-400/60 shadow-2xl text-white text-xs font-mono. **Media:** 27. **Interactions:** 61. **Personal voice:** 37.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `50e2ddf5445f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 122 — Enchanted Rose Garden

**Route:** `/enchanted-rose-garden` · **Journey status:** sequence page 94 · **Journey order:** 94
**Code:** `src/pages/EnchantedRoseGardenPage.jsx` → primary local component **EnchantedRoseGarden**; 10 local files, 62337 aggregated bytes.
**Design:** border-rose-400 bg-rose-50 border-pink-400 bg-pink-50 border-amber-400 bg-amber-50 border-cyan-400 bg-cyan-50 text-rose-500 text-center. **Media:** 27. **Interactions:** 66. **Personal voice:** 37.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `a9523d10876b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 123 — Love Mad Libs

**Route:** `/love-mad-libs` · **Journey status:** sequence page 95 · **Journey order:** 95
**Code:** `src/pages/LoveMadLibsPage.jsx` → primary local component **LoveMadLibs**; 10 local files, 59214 aggregated bytes.
**Design:** text-pink-500 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl text-sm font-extrabold font-nepali text-gray-800. **Media:** 27. **Interactions:** 61. **Personal voice:** 40.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `4528933264e1`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 124 — Love Butterfly Catcher

**Route:** `/love-butterfly-catcher` · **Journey status:** sequence page 96 · **Journey order:** 96
**Code:** `src/pages/LoveButterflyCatcherPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1607 aggregated bytes.
**Design:** bg-[ text-[ text-emerald-700 text-xs font-black text-6xl text-lg rounded-[2rem] border-2 text-left. **Media:** 0. **Interactions:** 2. **Personal voice:** 8.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `0f74b8a725fc`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 125 — Romantic Karaoke

**Route:** `/romantic-karaoke` · **Journey status:** sequence page 97 · **Journey order:** 97
**Code:** `src/pages/RomanticKaraokePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1614 aggregated bytes.
**Design:** bg-[ text-white text-fuchsia-300 text-xs font-black text-6xl rounded-[2rem] border-fuchsia-300 bg-fuchsia-300/15 border-white/15. **Media:** 0. **Interactions:** 2. **Personal voice:** 8.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `862ab0112714`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 126 — Love Mirror Oracle

**Route:** `/love-mirror-oracle` · **Journey status:** sequence page 98 · **Journey order:** 98
**Code:** `src/pages/LoveMirrorOraclePage.jsx` → primary local component **LoveMirrorOracle**; 10 local files, 58736 aggregated bytes.
**Design:** from-pink-500 to-rose-600 from-purple-500 to-violet-600 from-cyan-500 to-blue-600 from-amber-500 to-orange-600 from-rose-500 to-pink-600. **Media:** 27. **Interactions:** 61. **Personal voice:** 39.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `465c3891b6f7`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 127 — Origami Crane

**Route:** `/origami-crane` · **Journey status:** sequence page 99 · **Journey order:** 99
**Code:** `src/pages/OrigamiCranePage.jsx` → primary local component **OrigamiCrane**; 10 local files, 60406 aggregated bytes.
**Design:** from-pink-400 to-rose-500 text-pink-950 from-amber-400 to-yellow-500 text-amber-950 from-cyan-400 to-blue-600 text-blue-950 from-emerald-400. **Media:** 27. **Interactions:** 65. **Personal voice:** 37.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `3fd19ce2e2ea`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 128 — Star Drawer

**Route:** `/star-drawer` · **Journey status:** sequence page 100 · **Journey order:** 100
**Code:** `src/pages/StarDrawerPage.jsx` → primary local component **StarDrawer**; 10 local files, 59973 aggregated bytes.
**Design:** text-amber-300 text-center rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 border-4 border-pink-400/60 shadow-2xl. **Media:** 27. **Interactions:** 63. **Personal voice:** 43.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b173cfe8cedb`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 129 — A Sealed Birthday Letter from Abu

**Route:** `/birthday-wish-letter` · **Journey status:** sequence page 101 · **Journey order:** 101
**Code:** `src/pages/BirthdayWishLetterPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321304 aggregated bytes.
**Design:** bg-gradient-to-br from-[ via-[ to-[ text-[ text-center text-xs font-black text-rose-500 text-6xl. **Media:** 32. **Interactions:** 6. **Personal voice:** 4132.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `9055feba0166`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 130 — Bubble Wrap

**Route:** `/bubble-wrap` · **Journey status:** sequence page 102 · **Journey order:** 102
**Code:** `src/pages/BubbleWrapPage.jsx` → primary local component **BubbleWrap**; 10 local files, 57211 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-900 border-2 border-pink-400/50 shadow-xl text-xs font-mono text-gray-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 37.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f113927f5957`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 131 — Scratch Memory

**Route:** `/scratch-memory` · **Journey status:** registered but not in sequence
**Code:** `src/pages/ScratchMemoryPage.jsx` → primary local component **ScratchMemory**; 10 local files, 59872 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl border-2 shadow-lg bg-slate-900 border-amber-400 text-white bg-gradient-to-br from-amber-300. **Media:** 28. **Interactions:** 60. **Personal voice:** 39.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e2153eb0e6e5`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 132 — Two Hearts, One Story

**Route:** `/quiz-duel` · **Journey status:** registered but not in sequence
**Code:** `src/pages/QuizDuelPage.jsx` → primary local component **QuizDuel**; 10 local files, 60063 aggregated bytes.
**Design:** text-rose-400 text-center rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 border-4 border-rose-400/60 shadow-2xl. **Media:** 27. **Interactions:** 68. **Personal voice:** 43.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0c83570baf0d`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 133 — Love Aquarium

**Route:** `/love-aquarium` · **Journey status:** sequence page 103 · **Journey order:** 103
**Code:** `src/pages/LoveAquariumPage.jsx` → primary local component **LoveAquarium**; 10 local files, 60115 aggregated bytes.
**Design:** text-cyan-400 text-center rounded-3xl bg-gradient-to-b from-sky-950 via-cyan-950 to-blue-950 border-4 border-cyan-400/60 shadow-2xl. **Media:** 27. **Interactions:** 62. **Personal voice:** 38.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `dd961377fd14`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 134 — Photo Puzzle 3d

**Route:** `/photo-puzzle-3d` · **Journey status:** sequence page 104 · **Journey order:** 104
**Code:** `src/pages/PhotoPuzzle3DPage.jsx` → primary local component **page-specific JSX**; 2 local files, 12094 aggregated bytes.
**Design:** bg-[ text-white text-violet-300 text-xs font-black text-6xl text-lg text-white/65 rounded-[2rem] border-violet-200/20. **Media:** 31. **Interactions:** 6. **Personal voice:** 8.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `df364097dc06`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 135 — Coupon Vault

**Route:** `/coupon-vault` · **Journey status:** sequence page 105 · **Journey order:** 105
**Code:** `src/pages/CouponVaultPage.jsx` → primary local component **CouponVault**; 10 local files, 57130 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 text-white border-4 border-amber-400 shadow-2xl rounded-full bg-slate-900. **Media:** 27. **Interactions:** 54. **Personal voice:** 38.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e447d61c2127`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 136 — Heart Mailbox

**Route:** `/heart-mailbox` · **Journey status:** sequence page 106 · **Journey order:** 106
**Code:** `src/pages/HeartMailboxPage.jsx` → primary local component **HeartMailbox**; 10 local files, 59555 aggregated bytes.
**Design:** text-rose-400 text-center bg-gradient-to-b from-red-600 to-rose-700 rounded-t-full border-4 border-rose-800 shadow-2xl bg-rose-950. **Media:** 27. **Interactions:** 67. **Personal voice:** 36.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f0d947cec907`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 137 — Star Projector

**Route:** `/star-projector` · **Journey status:** sequence page 107 · **Journey order:** 107
**Code:** `src/pages/StarProjectorPage.jsx` → primary local component **StarProjector**; 10 local files, 57529 aggregated bytes.
**Design:** from-pink-500/40 via-purple-600/30 to-indigo-950 from-amber-400/40 via-yellow-500/30 to-slate-950 from-cyan-400/40 via-blue-600/30 from-emerald-400/40 via-teal-600/30. **Media:** 27. **Interactions:** 54. **Personal voice:** 39.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `80e2e05d70ff`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 138 — Cupcake Decorator

**Route:** `/cupcake-decorator` · **Journey status:** sequence page 108 · **Journey order:** 108
**Code:** `src/pages/CupcakeDecoratorPage.jsx` → primary local component **CupcakeDecorator**; 10 local files, 59183 aggregated bytes.
**Design:** from-pink-400 to-rose-500 text-pink-950 from-amber-700 to-amber-900 text-amber-100 from-amber-300 to-yellow-400 text-amber-950 from-cyan-400. **Media:** 27. **Interactions:** 58. **Personal voice:** 39.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e305e63f9f40`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 139 — Magnetic Poetry

**Route:** `/magnetic-poetry` · **Journey status:** sequence page 109 · **Journey order:** 109
**Code:** `src/pages/MagneticPoetryPage.jsx` → primary local component **MagneticPoetry**; 10 local files, 57918 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-900 border-4 border-amber-300/80 shadow-2xl bg-slate-950/60 text-pink-200 text-xs. **Media:** 27. **Interactions:** 60. **Personal voice:** 40.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `456e451f431c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 140 — Firework Maker

**Route:** `/firework-maker` · **Journey status:** sequence page 110 · **Journey order:** 110
**Code:** `src/pages/FireworkMakerPage.jsx` → primary local component **page-specific JSX**; 1 local files, 2208 aggregated bytes.
**Design:** bg-[ text-[ text-rose-600 text-xs font-black text-6xl text-lg rounded-[2rem] border-2 text-left. **Media:** 0. **Interactions:** 2. **Personal voice:** 16.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `4a1c2d65f9ed`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 141 — Love Clock

**Route:** `/love-clock` · **Journey status:** sequence page 111 · **Journey order:** 111
**Code:** `src/pages/LoveClockPage.jsx` → primary local component **LoveClock**; 10 local files, 60383 aggregated bytes.
**Design:** text-pink-400 text-center rounded-full border-4 border-amber-300 shadow-2xl bg-black/40 bg-white/20 bg-white/30 text-white. **Media:** 27. **Interactions:** 66. **Personal voice:** 40.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `6124e1cec378`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 142 — Polaroid Designer

**Route:** `/polaroid-designer` · **Journey status:** sequence page 112 · **Journey order:** 112
**Code:** `src/pages/PolaroidDesignerPage.jsx` → primary local component **PolaroidDesigner**; 10 local files, 57312 aggregated bytes.
**Design:** text-rose-400 text-center bg-white rounded-3xl shadow-2xl border-4 border-gray-100 rounded-2xl border-2 border-gray-200. **Media:** 27. **Interactions:** 57. **Personal voice:** 39.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e094fb2fd171`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 143 — Origami Boat

**Route:** `/origami-boat` · **Journey status:** sequence page 113 · **Journey order:** 113
**Code:** `src/pages/OrigamiBoatPage.jsx` → primary local component **OrigamiBoat**; 10 local files, 57071 aggregated bytes.
**Design:** text-cyan-400 text-center rounded-3xl bg-gradient-to-b from-sky-950 via-cyan-950 to-blue-950 border-4 border-cyan-400/60 shadow-2xl. **Media:** 27. **Interactions:** 55. **Personal voice:** 42.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b0724d406f5b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 144 — Candle Blower

**Route:** `/candle-blower` · **Journey status:** sequence page 114 · **Journey order:** 114
**Code:** `src/pages/CandleBlowerPage.jsx` → primary local component **CandleBlower**; 10 local files, 57750 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400/60 shadow-2xl text-3xl shadow-[0_0_12px_rgba text-sm. **Media:** 27. **Interactions:** 58. **Personal voice:** 40.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ca9579df711d`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 145 — Royal Crown

**Route:** `/royal-crown` · **Journey status:** sequence page 115 · **Journey order:** 115
**Code:** `src/pages/RoyalCrownPage.jsx` → primary local component **RoyalCrown**; 10 local files, 56943 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 border-4 border-white shadow-2xl. **Media:** 27. **Interactions:** 57. **Personal voice:** 46.
**Gift record:** complete; gift “a private letter from Abu”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `259c5efa757c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 146 — Potion Brewery

**Route:** `/potion-brewery` · **Journey status:** sequence page 116 · **Journey order:** 116
**Code:** `src/pages/LovePotionBreweryPage.jsx` → primary local component **LovePotionBrewery**; 2 local files, 3553 aggregated bytes.
**Design:** no Tailwind design tokens detected. **Media:** 0. **Interactions:** 4. **Personal voice:** 2.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `a22ebb6eebb4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 147 — Love Compass

**Route:** `/love-compass` · **Journey status:** sequence page 117 · **Journey order:** 117
**Code:** `src/pages/LoveCompassPage.jsx` → primary local component **LoveCompass**; 10 local files, 58369 aggregated bytes.
**Design:** text-pink-400 text-center rounded-full bg-white border-pink-200 shadow-sm text-xs font-bold text-rose-500 text-gray-700. **Media:** 27. **Interactions:** 60. **Personal voice:** 42.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `23dcba9c5418`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 148 — Words Abu Saves for Samjhana

**Route:** `/word-jumble` · **Journey status:** registered but not in sequence
**Code:** `src/pages/RomanceWordJumblePage.jsx` → primary local component **RomanceWordJumble**; 10 local files, 57955 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400/60 shadow-2xl text-xs font-mono text-pink-300. **Media:** 27. **Interactions:** 60. **Personal voice:** 44.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `2d18b6786802`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 149 — Time Capsule 2

**Route:** `/time-capsule-2` · **Journey status:** sequence page 118 · **Journey order:** 118
**Code:** `src/pages/BirthdayTimeCapsule2Page.jsx` → primary local component **BirthdayTimeCapsule2**; 10 local files, 57010 aggregated bytes.
**Design:** text-purple-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-400/60 shadow-2xl rounded-full bg-purple-900/60 border-2. **Media:** 27. **Interactions:** 57. **Personal voice:** 40.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `dc9cfa37e67a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 150 — Love Compatibility Matrix

**Route:** `/love-compatibility-matrix` · **Journey status:** sequence page 119 · **Journey order:** 119
**Code:** `src/pages/LoveCompatibilityMatrixPage.jsx` → primary local component **LoveCompatibilityMatrix**; 10 local files, 59638 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-400/60 shadow-2xl rounded-full bg-gradient-to-tr from-pink-500. **Media:** 27. **Interactions:** 61. **Personal voice:** 47.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `7c5a4c58e870`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 151 — Future House Builder

**Route:** `/future-house-builder` · **Journey status:** sequence page 120 · **Journey order:** 120
**Code:** `src/pages/FutureHouseBuilderPage.jsx` → primary local component **FutureHouseBuilder**; 10 local files, 60495 aggregated bytes.
**Design:** text-amber-600 text-center rounded-3xl border-4 shadow-2xl text-left border-b border-amber-900/10 text-sm font-extrabold. **Media:** 27. **Interactions:** 58. **Personal voice:** 45.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `afab35e93042`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 152 — Romantic Playlist Mixer

**Route:** `/romantic-playlist-mixer` · **Journey status:** sequence page 121 · **Journey order:** 121
**Code:** `src/pages/RomanticPlaylistMixerPage.jsx` → primary local component **RomanticPlaylistMixer**; 10 local files, 56400 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400/60 shadow-2xl rounded-full bg-gradient-to-br from-gray-900. **Media:** 27. **Interactions:** 54. **Personal voice:** 44.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d2318af60a49`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 153 — Sweet Promises Jar

**Route:** `/sweet-promises-jar` · **Journey status:** sequence page 122 · **Journey order:** 122
**Code:** `src/pages/SweetPromisesJarPage.jsx` → primary local component **SweetPromisesJar**; 10 local files, 57401 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl bg-slate-950 border-4 border-rose-400/60 shadow-2xl rounded-full bg-rose-900/40 border-2. **Media:** 27. **Interactions:** 58. **Personal voice:** 40.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `54fe1eae877e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 154 — Love Languages Quiz

**Route:** `/love-languages-quiz` · **Journey status:** sequence page 123 · **Journey order:** 123
**Code:** `src/pages/LoveLanguagesQuizPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1609 aggregated bytes.
**Design:** bg-[ text-[ rounded-[2.5rem] border-white text-white shadow-2xl text-sky-200 text-xs font-black text-6xl. **Media:** 0. **Interactions:** 2. **Personal voice:** 8.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `fbc3a09c6417`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 155 — Love Constellation Painter

**Route:** `/love-constellation-painter` · **Journey status:** sequence page 125 · **Journey order:** 125
**Code:** `src/pages/LoveConstellationPainterPage.jsx` → primary local component **page-specific JSX**; 2 local files, 11909 aggregated bytes.
**Design:** bg-[ text-white text-xs font-black text-indigo-300 text-6xl rounded-[2rem] border-indigo-200/20 bg-[radial-gradient rounded-full. **Media:** 31. **Interactions:** 6. **Personal voice:** 11.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c3562df8d168`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 156 — Love Letter Generator

**Route:** `/love-letter-generator` · **Journey status:** sequence page 126 · **Journey order:** 126
**Code:** `src/pages/LoveLetterGeneratorPage.jsx` → primary local component **LoveLetterGenerator**; 10 local files, 56929 aggregated bytes.
**Design:** text-amber-700 text-center rounded-full text-xs font-bold bg-amber-800 text-amber-50 border-amber-800 shadow-md bg-white. **Media:** 27. **Interactions:** 54. **Personal voice:** 45.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0815e16aac8b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 157 — Anniversary Countdown Clock

**Route:** `/anniversary-countdown-clock` · **Journey status:** sequence page 127 · **Journey order:** 127
**Code:** `src/pages/AnniversaryCountdownClockPage.jsx` → primary local component **AnniversaryCountdownClock**; 10 local files, 56778 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl border-4 border-amber-300 shadow-2xl bg-black/40 bg-black/75 rounded-xl text-xs. **Media:** 27. **Interactions:** 55. **Personal voice:** 38.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b780d8f3855e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 158 — Heart Bubble Tea Maker

**Route:** `/heart-bubble-tea-maker` · **Journey status:** sequence page 128 · **Journey order:** 128
**Code:** `src/pages/HeartBubbleTeaMakerPage.jsx` → primary local component **HeartBubbleTeaMaker**; 10 local files, 57898 aggregated bytes.
**Design:** text-pink-500 text-center rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 56. **Personal voice:** 41.
**Gift record:** complete; gift “a private letter from Abu”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `5e9b44dc2e04`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 159 — Love Notes Wall

**Route:** `/love-notes-wall` · **Journey status:** sequence page 129 · **Journey order:** 129
**Code:** `src/pages/LoveNotesWallPage.jsx` → primary local component **LoveNotesWall**; 10 local files, 56136 aggregated bytes.
**Design:** bg-pink-100 border-pink-300 text-pink-900 bg-amber-100 border-amber-300 text-amber-900 bg-purple-100 border-purple-300 text-purple-900 bg-rose-100. **Media:** 27. **Interactions:** 54. **Personal voice:** 40.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1d4ffecb2671`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 160 — Virtual Cat Cafe

**Route:** `/virtual-cat-cafe` · **Journey status:** sequence page 130 · **Journey order:** 130
**Code:** `src/pages/VirtualCatCafePage.jsx` → primary local component **VirtualCatCafe**; 10 local files, 56472 aggregated bytes.
**Design:** text-pink-500 text-center rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 55. **Personal voice:** 41.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0ffc97e38e4f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 161 — The Memory Abu Keeps Replaying

**Route:** `/memory-replay` · **Journey status:** registered but not in sequence
**Code:** `src/pages/MemoryReplayPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321300 aggregated bytes.
**Design:** bg-[ text-white text-xs font-black text-orange-300/70 text-6xl text-8xl text-orange-300 rounded-[2rem] border-8. **Media:** 33. **Interactions:** 8. **Personal voice:** 4129.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `72d2ffd6cd19`; no direct code error signal; placeholder copy; all detected internal targets registered.

### Registered page 162 — Love Quiz Personality

**Route:** `/love-quiz-personality` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveQuizPersonalityPage.jsx` → primary local component **LoveQuizPersonality**; 10 local files, 56169 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl border-4 border-rose-300 shadow-2xl bg-black/40 bg-black/75 rounded-xl text-xs. **Media:** 27. **Interactions:** 53. **Personal voice:** 42.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1b05f7403050`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 163 — Sweet Proposal Simulator

**Route:** `/sweet-proposal-simulator` · **Journey status:** sequence page 131 · **Journey order:** 131
**Code:** `src/pages/SweetProposalSimulatorPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1686 aggregated bytes.
**Design:** bg-[ text-[ text-rose-700 text-xs font-black text-6xl rounded-[2.5rem] text-rose-50 rounded-full font-mono. **Media:** 0. **Interactions:** 4. **Personal voice:** 8.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `40eedbc80199`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 164 — Love Frequency Tuner

**Route:** `/love-frequency-tuner` · **Journey status:** sequence page 132 · **Journey order:** 132
**Code:** `src/pages/LoveFrequencyTunerPage.jsx` → primary local component **LoveFrequencyTuner**; 10 local files, 65710 aggregated bytes.
**Design:** rounded-sm text-amber-400 rounded-3xl border-2 border-stone-600 bg-stone-500 rounded-2xl border-stone-700 text-white text-xs. **Media:** 27. **Interactions:** 80. **Personal voice:** 43.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ab0c4d32b7aa`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 165 — Couples Secret Handshake

**Route:** `/couples-secret-handshake` · **Journey status:** sequence page 133 · **Journey order:** 133
**Code:** `src/pages/CouplesSecretHandshakePage.jsx` → primary local component **CouplesSecretHandshake**; 10 local files, 57371 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 59. **Personal voice:** 39.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `07c91aff60e4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 166 — Starry Night Skywriter

**Route:** `/starry-night-skywriter` · **Journey status:** sequence page 134 · **Journey order:** 134
**Code:** `src/pages/StarryNightSkywriterPage.jsx` → primary local component **StarryNightSkywriter**; 10 local files, 57220 aggregated bytes.
**Design:** text-sky-400 text-center rounded-3xl bg-slate-950 border-4 border-sky-400/60 shadow-2xl rounded-full bg-sky-900/30 border-2. **Media:** 27. **Interactions:** 58. **Personal voice:** 41.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `87491feecbb4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 167 — Romantic Cooking Recipe

**Route:** `/romantic-cooking-recipe` · **Journey status:** sequence page 135 · **Journey order:** 135
**Code:** `src/pages/RomanticCookingRecipePage.jsx` → primary local component **RomanticCookingRecipe**; 10 local files, 57046 aggregated bytes.
**Design:** text-amber-500 text-center rounded-3xl bg-white border-4 border-amber-400 shadow-2xl text-6xl text-base font-extrabold. **Media:** 27. **Interactions:** 59. **Personal voice:** 39.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `de3f78923ba1`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 168 — Love Vault Combination

**Route:** `/love-vault-combination` · **Journey status:** sequence page 136 · **Journey order:** 136
**Code:** `src/pages/LoveVaultCombinationPage.jsx` → primary local component **LoveVaultCombination**; 10 local files, 57011 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-500 shadow-2xl rounded-full bg-gradient-to-tr from-amber-500. **Media:** 27. **Interactions:** 58. **Personal voice:** 41.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `7b0917531398`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 169 — Sweet Voicemail Inbox

**Route:** `/sweet-voicemail-inbox` · **Journey status:** sequence page 137 · **Journey order:** 137
**Code:** `src/pages/SweetVoicemailInboxPage.jsx` → primary local component **SweetVoicemailInbox**; 10 local files, 56764 aggregated bytes.
**Design:** text-purple-400 text-center rounded-3xl border-4 border-purple-300 shadow-2xl bg-black/40 bg-black/75 rounded-xl text-xs. **Media:** 27. **Interactions:** 54. **Personal voice:** 41.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ab494b21e654`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 170 — Couple Daily Horoscope

**Route:** `/couple-daily-horoscope` · **Journey status:** sequence page 138 · **Journey order:** 138
**Code:** `src/pages/CoupleDailyHoroscopePage.jsx` → primary local component **CoupleDailyHoroscope**; 10 local files, 57481 aggregated bytes.
**Design:** text-purple-300 text-center rounded-3xl bg-slate-950 border-4 border-purple-400/60 shadow-2xl rounded-full bg-purple-900/40 border-2. **Media:** 27. **Interactions:** 58. **Personal voice:** 41.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `854c7dee2637`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 171 — Love Scratch Off Gallery

**Route:** `/love-scratch-off-gallery` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveScratchOffGalleryPage.jsx` → primary local component **LoveScratchOffGallery**; 10 local files, 56111 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl border-4 border-amber-300 shadow-2xl bg-black/40 rounded-2xl border-2 border-pink-300. **Media:** 27. **Interactions:** 55. **Personal voice:** 39.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `66322f62b886`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 172 — Heart Shape Tangram

**Route:** `/heart-shape-tangram` · **Journey status:** registered but not in sequence
**Code:** `src/pages/HeartShapeTangramPage.jsx` → primary local component **HeartShapeTangram**; 10 local files, 57296 aggregated bytes.
**Design:** bg-rose-500 bg-pink-500 bg-amber-400 bg-purple-500 text-rose-500 text-center rounded-3xl bg-slate-950 border-4 border-amber-400. **Media:** 27. **Interactions:** 57. **Personal voice:** 38.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `07aaec68c653`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 173 — Love Meteor Shower

**Route:** `/love-meteor-shower` · **Journey status:** sequence page 139 · **Journey order:** 139
**Code:** `src/pages/LoveMeteorShowerPage.jsx` → primary local component **LoveMeteorShower**; 10 local files, 56434 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400/60 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 55. **Personal voice:** 37.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f84811397d66`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 174 — Sweet Tea Ceremony

**Route:** `/sweet-tea-ceremony` · **Journey status:** sequence page 140 · **Journey order:** 140
**Code:** `src/pages/SweetTeaCeremonyPage.jsx` → primary local component **SweetTeaCeremony**; 10 local files, 57519 aggregated bytes.
**Design:** text-amber-600 text-center rounded-3xl bg-slate-950 border-4 border-amber-500 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 59. **Personal voice:** 38.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `95decfdb214f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 175 — Couple Nickname Generator

**Route:** `/couple-nickname-generator` · **Journey status:** sequence page 141 · **Journey order:** 141
**Code:** `src/pages/CoupleNicknameGeneratorPage.jsx` → primary local component **CoupleNicknameGenerator**; 10 local files, 56099 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 56. **Personal voice:** 41.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `590bae85d1a2`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 176 — Love Rhythm Game

**Route:** `/love-rhythm-game` · **Journey status:** sequence page 142 · **Journey order:** 142
**Code:** `src/pages/LoveRhythmGamePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1646 aggregated bytes.
**Design:** bg-[ text-white text-center text-rose-400 text-xs font-black text-sky-300 text-6xl text-lg text-sky-100/70. **Media:** 0. **Interactions:** 3. **Personal voice:** 3.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `e2fb4251ba2a`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 177 — Sweet Dessert Tower

**Route:** `/sweet-dessert-tower` · **Journey status:** sequence page 143 · **Journey order:** 143
**Code:** `src/pages/SweetDessertTowerPage.jsx` → primary local component **SweetDessertTower**; 10 local files, 56618 aggregated bytes.
**Design:** text-pink-500 text-center rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 38.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b2e10a9c113c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 178 — Love Poetry Fridge

**Route:** `/love-poetry-fridge` · **Journey status:** sequence page 144 · **Journey order:** 144
**Code:** `src/pages/LovePoetryFridgePage.jsx` → primary local component **LovePoetryFridge**; 10 local files, 55928 aggregated bytes.
**Design:** text-amber-500 text-center rounded-3xl bg-slate-950 border-4 border-slate-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 39.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `efb2ab711b7a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 179 — Couple Travel Passport Stamps

**Route:** `/couple-travel-passport-stamps` · **Journey status:** sequence page 145 · **Journey order:** 145
**Code:** `src/pages/CoupleTravelPassportStampsPage.jsx` → primary local component **CoupleTravelPassportStamps**; 10 local files, 57199 aggregated bytes.
**Design:** text-blue-400 text-center rounded-3xl bg-slate-950 border-4 border-blue-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 56. **Personal voice:** 44.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1a00a99403c6`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 180 — Love Firework Painter

**Route:** `/love-firework-painter` · **Journey status:** sequence page 146 · **Journey order:** 146
**Code:** `src/pages/LoveFireworkPainterPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1502 aggregated bytes.
**Design:** bg-[ text-white text-amber-300 text-xs font-black text-sky-300 text-6xl text-amber-200/30 rounded-t-full border-2. **Media:** 0. **Interactions:** 2. **Personal voice:** 4.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `d5fb834e779c`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 181 — Sweet Dream Catcher

**Route:** `/sweet-dream-catcher` · **Journey status:** registered but not in sequence
**Code:** `src/pages/SweetDreamCatcherPage.jsx` → primary local component **SweetDreamCatcher**; 10 local files, 55768 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 38.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `aade75d3bb18`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 182 — Couple Questions Deep

**Route:** `/couple-questions-deep` · **Journey status:** sequence page 147 · **Journey order:** 147
**Code:** `src/pages/CoupleQuestionsDeepPage.jsx` → primary local component **CoupleQuestionsDeep**; 10 local files, 56188 aggregated bytes.
**Design:** text-purple-500 text-center rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 38.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `cb15a02ff0da`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 183 — Love Music Box Carousel

**Route:** `/love-music-box-carousel` · **Journey status:** sequence page 148 · **Journey order:** 148
**Code:** `src/pages/LoveMusicBoxCarouselPage.jsx` → primary local component **LoveMusicBoxCarousel**; 10 local files, 56212 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 36.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `a310b2ea4086`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 184 — Sweet Compliments Fountain

**Route:** `/sweet-compliments-fountain` · **Journey status:** sequence page 149 · **Journey order:** 149
**Code:** `src/pages/SweetComplimentsFountainPage.jsx` → primary local component **SweetComplimentsFountain**; 10 local files, 56552 aggregated bytes.
**Design:** text-sky-400 text-center rounded-3xl bg-slate-950 border-4 border-sky-400/60 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 56. **Personal voice:** 37.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `a69040e064b2`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 185 — Couple Movie Night

**Route:** `/couple-movie-night` · **Journey status:** sequence page 150 · **Journey order:** 150
**Code:** `src/pages/CoupleMovieNightPage.jsx` → primary local component **CoupleMovieNight**; 10 local files, 56519 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl border-4 shadow-2xl bg-slate-950 border-rose-500 bg-slate-900 border-slate-700 rounded-2xl. **Media:** 27. **Interactions:** 56. **Personal voice:** 38.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `db3d541aa8b7`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 186 — Love Keychain Customizer

**Route:** `/love-keychain-customizer` · **Journey status:** sequence page 151 · **Journey order:** 151
**Code:** `src/pages/LoveKeychainCustomizerPage.jsx` → primary local component **LoveKeychainCustomizer**; 10 local files, 55597 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl rounded-2xl border-amber-300 shadow-xl. **Media:** 27. **Interactions:** 53. **Personal voice:** 42.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `630159b141f9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 187 — Sweet Garden Blooms

**Route:** `/sweet-garden-blooms` · **Journey status:** sequence page 152 · **Journey order:** 152
**Code:** `src/pages/SweetGardenBloomsPage.jsx` → primary local component **SweetGardenBlooms**; 10 local files, 57007 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 42.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e8c2ad60657b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 188 — Couple Anniversary Timeline

**Route:** `/couple-anniversary-timeline` · **Journey status:** sequence page 153 · **Journey order:** 153
**Code:** `src/pages/CoupleAnniversaryTimelinePage.jsx` → primary local component **CoupleAnniversaryTimeline**; 10 local files, 56536 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 42.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c7acd67d6036`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 189 — Love Fortune Teller Origami

**Route:** `/love-fortune-teller-origami` · **Journey status:** sequence page 154 · **Journey order:** 154
**Code:** `src/pages/LoveFortuneTellerOrigamiPage.jsx` → primary local component **LoveFortuneTellerOrigami**; 10 local files, 57578 aggregated bytes.
**Design:** text-purple-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 56. **Personal voice:** 44.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `61ba634a4911`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 190 — Sweet Heart Balloon Ascent

**Route:** `/sweet-heart-balloon-ascent` · **Journey status:** sequence page 155 · **Journey order:** 155
**Code:** `src/pages/SweetHeartBalloonAscentPage.jsx` → primary local component **SweetHeartBalloonAscent**; 10 local files, 55272 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 36.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c7ffa950aca4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 191 — Couple Starry Planetarium

**Route:** `/couple-starry-planetarium` · **Journey status:** sequence page 156 · **Journey order:** 156
**Code:** `src/pages/CoupleStarryPlanetariumPage.jsx` → primary local component **CoupleStarryPlanetarium**; 10 local files, 56245 aggregated bytes.
**Design:** text-amber-300 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 41.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `24187e8bf80f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 192 — Love Letter In Balloon

**Route:** `/love-letter-in-balloon` · **Journey status:** sequence page 157 · **Journey order:** 157
**Code:** `src/pages/LoveLetterInBalloonPage.jsx` → primary local component **LoveLetterInBalloon**; 10 local files, 56443 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 37.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `259211ab36c8`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 193 — Sweet Memory Scrapbook

**Route:** `/sweet-memory-scrapbook` · **Journey status:** sequence page 158 · **Journey order:** 158
**Code:** `src/pages/SweetMemoryScrapbookPage.jsx` → primary local component **SweetMemoryScrapbook**; 10 local files, 56444 aggregated bytes.
**Design:** text-amber-700 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 40.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e996ff143515`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 194 — Love Coronation Ceremony

**Route:** `/love-coronation-ceremony` · **Journey status:** sequence page 159 · **Journey order:** 159
**Code:** `src/pages/LoveCoronationCeremonyPage.jsx` → primary local component **LoveCoronationCeremony**; 10 local files, 57180 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 49.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `7a33d11b6a44`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 195 — Whatsapp 10k Love

**Route:** `/whatsapp-10k-love` · **Journey status:** sequence page 160 · **Journey order:** 160
**Code:** `src/pages/WhatsApp10kLovePage.jsx` → primary local component **WhatsApp10kLove**; 10 local files, 65632 aggregated bytes.
**Design:** text-emerald-400 text-center font-ui bg-slate-900/90 rounded-2xl border-emerald-500/30 shadow-xl rounded-full border-2 border-emerald-400. **Media:** 27. **Interactions:** 67. **Personal voice:** 51.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `18527f244c4f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 196 — Cupid Radio Dj

**Route:** `/cupid-radio-dj` · **Journey status:** sequence page 161 · **Journey order:** 161
**Code:** `src/pages/CupidRadioDJStationPage.jsx` → primary local component **CupidRadioDJStation**; 10 local files, 61907 aggregated bytes.
**Design:** text-amber-400 rounded-3xl bg-gradient-to-b from-amber-950 via-slate-950 to-stone-950 border-4 border-amber-500/60 shadow-[0_0_50px_rgba bg-black/90. **Media:** 27. **Interactions:** 59. **Personal voice:** 43.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `11420e5c2dea`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 197 — Constellation Stargazer

**Route:** `/constellation-stargazer` · **Journey status:** sequence page 162 · **Journey order:** 162
**Code:** `src/pages/LoveConstellationStargazerPage.jsx` → primary local component **LoveConstellationStargazer**; 10 local files, 58646 aggregated bytes.
**Design:** text-purple-300 text-center rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-[0_0_50px_rgba bg-purple-950/40 rounded-2xl border-purple-400/40. **Media:** 27. **Interactions:** 56. **Personal voice:** 39.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e86d868b3d42`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 198 — Heart Nebula 3d

**Route:** `/heart-nebula-3d` · **Journey status:** sequence page 163 · **Journey order:** 163
**Code:** `src/pages/LoveHeartNebula3DPage.jsx` → primary local component **LoveHeartNebula3D**; 10 local files, 55976 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl bg-slate-950 border-4 border-rose-500 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 37.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ba857fd96a0c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 199 — Sweet Confectionery Bakery

**Route:** `/sweet-confectionery-bakery` · **Journey status:** sequence page 164 · **Journey order:** 164
**Code:** `src/pages/LoveSweetConfectioneryBakeryPage.jsx` → primary local component **LoveSweetConfectioneryBakery**; 10 local files, 56008 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 36.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `6393582714de`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 200 — Love Story Comic Strip

**Route:** `/love-story-comic-strip` · **Journey status:** sequence page 165 · **Journey order:** 165
**Code:** `src/pages/LoveLoveStoryComicStripPage.jsx` → primary local component **LoveLoveStoryComicStrip**; 10 local files, 56421 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl bg-slate-950 border-4 border-rose-500 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 39.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b139c7b2a4e8`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 201 — Arcade Dance Machine

**Route:** `/arcade-dance-machine` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveArcadeDanceMachinePage.jsx` → primary local component **LoveArcadeDanceMachine**; 10 local files, 55838 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-500 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 39.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `72969e68fb5a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 202 — Enchanted Glass Terrarium

**Route:** `/enchanted-glass-terrarium` · **Journey status:** sequence page 166 · **Journey order:** 166
**Code:** `src/pages/LoveEnchantedGlassTerrariumPage.jsx` → primary local component **LoveEnchantedGlassTerrarium**; 10 local files, 55499 aggregated bytes.
**Design:** text-emerald-400 text-center rounded-3xl bg-slate-950 border-4 border-emerald-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 38.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `7912c7efa897`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 203 — Bottle Ocean 3d

**Route:** `/bottle-ocean-3d` · **Journey status:** sequence page 167 · **Journey order:** 167
**Code:** `src/pages/LoveMessageInABottleOceanPage.jsx` → primary local component **LoveMessageInABottleOcean**; 10 local files, 63833 aggregated bytes.
**Design:** text-pink-400 shadow-[0_0_8px_ text-center rounded-3xl bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 border-4 border-pink-400. **Media:** 29. **Interactions:** 65. **Personal voice:** 51.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `692cbae9caab`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 204 — Couple Time Capsule Lockbox

**Route:** `/couple-time-capsule-lockbox` · **Journey status:** sequence page 168 · **Journey order:** 168
**Code:** `src/pages/LoveCoupleTimeCapsuleLockBoxPage.jsx` → primary local component **LoveCoupleTimeCapsuleLockBox**; 10 local files, 58078 aggregated bytes.
**Design:** text-sky-400 text-center rounded-3xl bg-slate-950 border-4 border-sky-500/70 shadow-2xl rounded-2xl text-xs font-extrabold. **Media:** 27. **Interactions:** 61. **Personal voice:** 38.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `88d492efccb5`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 205 — Sweet Heart Paper Craft

**Route:** `/sweet-heart-paper-craft` · **Journey status:** sequence page 169 · **Journey order:** 169
**Code:** `src/pages/LoveSweetHeartPaperCraftPage.jsx` → primary local component **LoveSweetHeartPaperCraft**; 10 local files, 58857 aggregated bytes.
**Design:** bg-rose-700 border-rose-400 bg-amber-600 border-amber-300 bg-purple-700 border-purple-400 text-rose-500 text-center rounded-3xl bg-amber-950/40. **Media:** 27. **Interactions:** 60. **Personal voice:** 38.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `4872b36ef6c0`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 206 — Love Wordle

**Route:** `/love-wordle` · **Journey status:** sequence page 170 · **Journey order:** 170
**Code:** `src/pages/LoveWordlePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1386 aggregated bytes.
**Design:** bg-[ text-[ text-indigo-700 text-xs font-black text-6xl text-lg rounded-2xl border-4 font-mono. **Media:** 0. **Interactions:** 2. **Personal voice:** 8.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `9a9d3c2a540d`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 207 — Couple Escape Room

**Route:** `/couple-escape-room` · **Journey status:** sequence page 171 · **Journey order:** 171
**Code:** `src/pages/CoupleEscapeRoomPage.jsx` → primary local component **CoupleEscapeRoom**; 10 local files, 64252 aggregated bytes.
**Design:** from-amber-950 via-slate-950 to-stone-950 from-blue-950 to-indigo-950 from-rose-950 to-pink-950 from-purple-950 to-amber-950 from-emerald-950. **Media:** 27. **Interactions:** 74. **Personal voice:** 49.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `572ab4772499`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 208 — Bhuntu Trivia Showdown

**Route:** `/bhuntu-trivia-showdown` · **Journey status:** registered but not in sequence
**Code:** `src/pages/BhuntuTriviaShowdownPage.jsx` → primary local component **BhuntuTriviaShowdown**; 10 local files, 59282 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-500/70 shadow-2xl bg-amber-950/40 rounded-2xl border-amber-400/40. **Media:** 27. **Interactions:** 58. **Personal voice:** 58.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ea6393d19b39`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 209 — Love Pixel Art

**Route:** `/love-pixel-art` · **Journey status:** sequence page 173 · **Journey order:** 173
**Code:** `src/pages/LovePixelArtCreatorPage.jsx` → primary local component **LovePixelArtCreator**; 10 local files, 59041 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl bg-stone-900/90 rounded-2xl border-stone-800. **Media:** 27. **Interactions:** 61. **Personal voice:** 39.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `862b5372112b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 210 — Love Anagram Solver

**Route:** `/love-anagram-solver` · **Journey status:** sequence page 174 · **Journey order:** 174
**Code:** `src/pages/LoveAnagramSolverPage.jsx` → primary local component **LoveAnagramSolver**; 10 local files, 58963 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl bg-pink-950/40 rounded-2xl border-pink-400/40. **Media:** 27. **Interactions:** 67. **Personal voice:** 43.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `66349af7d7b4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 211 — Love Photo Mosaic

**Route:** `/love-photo-mosaic` · **Journey status:** sequence page 175 · **Journey order:** 175
**Code:** `src/pages/LovePhotoMosaicBuilderPage.jsx` → primary local component **LovePhotoMosaicBuilder**; 10 local files, 58308 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-500/70 shadow-2xl bg-amber-950/40 rounded-2xl border-amber-400/40. **Media:** 27. **Interactions:** 59. **Personal voice:** 37.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `676e6f184185`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 212 — First Moments Timeline

**Route:** `/first-moments-timeline` · **Journey status:** sequence page 176 · **Journey order:** 176
**Code:** `src/pages/FirstMomentsTimelinePage.jsx` → primary local component **FirstMomentsTimeline**; 10 local files, 61982 aggregated bytes.
**Design:** text-pink-400 text-center font-ui rounded-3xl bg-slate-950/90 border-4 border-pink-500/60 shadow-2xl text-white bg-pink-950/50. **Media:** 28. **Interactions:** 63. **Personal voice:** 51.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `468370679595`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 213 — Memory Constellation

**Route:** `/memory-constellation` · **Journey status:** sequence page 177 · **Journey order:** 177
**Code:** `src/pages/MemoryConstellationMapPage.jsx` → primary local component **MemoryConstellationMap**; 10 local files, 63126 aggregated bytes.
**Design:** text-purple-300 rounded-3xl border-indigo-700/60 shadow-[0_0_60px_rgba text-indigo-300 text-xs font-semibold bg-purple-900/80 border-purple-400/40 text-purple-200. **Media:** 27. **Interactions:** 65. **Personal voice:** 39.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f712f05b907b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 214 — Couple Yearbook

**Route:** `/couple-yearbook` · **Journey status:** sequence page 178 · **Journey order:** 178
**Code:** `src/pages/CoupleYearbookPage.jsx` → primary local component **CoupleYearbook**; 10 local files, 56402 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 46.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d8ae5de30fa2`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 215 — Love Letter Archive

**Route:** `/love-letter-archive` · **Journey status:** sequence page 179 · **Journey order:** 179
**Code:** `src/pages/LoveLetterArchivePage.jsx` → primary local component **LoveLetterArchive**; 10 local files, 58823 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl bg-amber-950/40 border-4 border-amber-500/70 shadow-2xl bg-black/80 rounded-2xl border-amber-400/40. **Media:** 27. **Interactions:** 55. **Personal voice:** 44.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `529e5f9ef9c4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 216 — Couple Soundtrack

**Route:** `/couple-soundtrack` · **Journey status:** sequence page 180 · **Journey order:** 180
**Code:** `src/pages/CoupleSoundtrackPage.jsx` → primary local component **CoupleSoundtrack**; 10 local files, 56547 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 45.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b14dade7c779`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 217 — Love Spell Caster

**Route:** `/love-spell-caster` · **Journey status:** sequence page 181 · **Journey order:** 181
**Code:** `src/pages/LoveSpellCasterPage.jsx` → primary local component **LoveSpellCaster**; 10 local files, 58703 aggregated bytes.
**Design:** text-amber-300 text-rose-400 text-purple-300 text-orange-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-2xl. **Media:** 27. **Interactions:** 60. **Personal voice:** 37.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0cdf95faebde`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 218 — Love Potion Lab

**Route:** `/love-potion-lab` · **Journey status:** sequence page 182 · **Journey order:** 182
**Code:** `src/pages/LovePotionLaboratoryPage.jsx` → primary local component **LovePotionLaboratory**; 10 local files, 56372 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 56. **Personal voice:** 38.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1fd5967670ef`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 219 — Fairy Tale Generator

**Route:** `/fairy-tale-generator` · **Journey status:** sequence page 183 · **Journey order:** 183
**Code:** `src/pages/FairyTaleGeneratorPage.jsx` → primary local component **FairyTaleGenerator**; 10 local files, 56264 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 47.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e3a23426c963`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 220 — Enchanted Crystal Ball

**Route:** `/enchanted-crystal-ball` · **Journey status:** sequence page 184 · **Journey order:** 184
**Code:** `src/pages/EnchantedCrystalBallPage.jsx` → primary local component **EnchantedCrystalBall**; 10 local files, 55880 aggregated bytes.
**Design:** text-indigo-300 text-center rounded-3xl bg-slate-950 border-4 border-indigo-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 56. **Personal voice:** 39.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `89b5ade1c669`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 221 — Dragon Princess Adventure

**Route:** `/dragon-princess-adventure` · **Journey status:** sequence page 185 · **Journey order:** 185
**Code:** `src/pages/DragonPrincessAdventurePage.jsx` → primary local component **DragonPrincessAdventure**; 10 local files, 57291 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 43.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0b6caa33d397`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 222 — Love Wizard Tower

**Route:** `/love-wizard-tower` · **Journey status:** sequence page 186 · **Journey order:** 186
**Code:** `src/pages/LoveWizardTowerPage.jsx` → primary local component **LoveWizardTower**; 10 local files, 57786 aggregated bytes.
**Design:** text-purple-300 text-center rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 63. **Personal voice:** 43.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `10c7870bc941`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 223 — Love Graffiti Wall

**Route:** `/love-graffiti-wall` · **Journey status:** sequence page 187 · **Journey order:** 187
**Code:** `src/pages/LoveGraffitiWallPage.jsx` → primary local component **LoveGraffitiWall**; 10 local files, 60116 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl rounded-2xl border-stone-700 bg-stone-900. **Media:** 28. **Interactions:** 56. **Personal voice:** 42.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `4385946aa48c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 224 — Love Neon Sign

**Route:** `/love-neon-sign` · **Journey status:** sequence page 188 · **Journey order:** 188
**Code:** `src/pages/LoveNeonSignDesignerPage.jsx` → primary local component **LoveNeonSignDesigner**; 8 local files, 56157 aggregated bytes.
**Design:** font-family: text-align: font-size: text-shadow: border-radius: font-weight: text-decoration: bg-white/90 text-pink-600 rounded-full. **Media:** 31. **Interactions:** 60. **Personal voice:** 59.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f4f66d09ec57`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 225 — Bhuntu Emoji Comic

**Route:** `/bhuntu-emoji-comic` · **Journey status:** sequence page 189 · **Journey order:** 189
**Code:** `src/pages/BhuntuEmojiComicPage.jsx` → primary local component **BhuntuEmojiComic**; 8 local files, 56044 aggregated bytes.
**Design:** font-family: border-radius: font-weight: font-size: bg-white/90 text-pink-600 rounded-full border-pink-300 shadow-md font-bold. **Media:** 28. **Interactions:** 71. **Personal voice:** 57.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0312a3f91a7a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 226 — Love Kaleidoscope

**Route:** `/love-kaleidoscope` · **Journey status:** sequence page 190 · **Journey order:** 190
**Code:** `src/pages/LoveKaleidoscopePage.jsx` → primary local component **LoveKaleidoscope**; 8 local files, 52525 aggregated bytes.
**Design:** font-family: border-radius: text-align: font-size: font-weight: bg-white/90 text-pink-600 rounded-full border-pink-300 shadow-md. **Media:** 32. **Interactions:** 64. **Personal voice:** 71.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `587a06ddd44a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 227 — Cherry Blossom Wish Tree

**Route:** `/cherry-blossom-wish-tree` · **Journey status:** sequence page 191 · **Journey order:** 191
**Code:** `src/pages/CherryBlossomWishTreePage.jsx` → primary local component **CherryBlossomWishTree**; 10 local files, 55625 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 40.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ef6797d97dc4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 228 — Love Advent Calendar

**Route:** `/love-advent-calendar` · **Journey status:** sequence page 192 · **Journey order:** 192
**Code:** `src/pages/LoveAdventCalendarPage.jsx` → primary local component **LoveAdventCalendar**; 10 local files, 56306 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 38.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `39d51382cad1`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 229 — New Year Fireworks

**Route:** `/new-year-fireworks` · **Journey status:** sequence page 193 · **Journey order:** 193
**Code:** `src/pages/NewYearLoveFireworksPage.jsx` → primary local component **NewYearLoveFireworks**; 10 local files, 55508 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 37.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d73eba7ccb47`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 230 — Valentine Card Creator

**Route:** `/valentine-card-creator` · **Journey status:** sequence page 194 · **Journey order:** 194
**Code:** `src/pages/ValentineCardCreatorPage.jsx` → primary local component **ValentineCardCreator**; 10 local files, 56368 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 43.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `9d57337fe83f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 231 — Love Dated Calendar

**Route:** `/love-dated-calendar` · **Journey status:** sequence page 195 · **Journey order:** 195
**Code:** `src/pages/LoveDatedCalendarPage.jsx` → primary local component **LoveDatedCalendar**; 10 local files, 56623 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 43.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c41e84a393fa`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 232 — Fortune Cookie Love

**Route:** `/fortune-cookie-love` · **Journey status:** sequence page 196 · **Journey order:** 196
**Code:** `src/pages/FortuneCookieLovePage.jsx` → primary local component **FortuneCookieLove**; 10 local files, 56753 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 58. **Personal voice:** 41.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `19149114ba2f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 233 — Infinite Reasons

**Route:** `/infinite-reasons` · **Journey status:** sequence page 197 · **Journey order:** 197
**Code:** `src/pages/InfiniteReasonsMachinePage.jsx` → primary local component **InfiniteReasonsMachine**; 10 local files, 63048 aggregated bytes.
**Design:** rounded-xl border-2 border-rose-400/40 bg-slate-950/80 bg-rose-500/10 border-y border-rose-400/30 text-[9px] font-bold text-rose-200/60. **Media:** 27. **Interactions:** 77. **Personal voice:** 41.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `eaa0fc840df3`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 234 — Love Awards Night

**Route:** `/love-awards-night` · **Journey status:** sequence page 198 · **Journey order:** 198
**Code:** `src/pages/LoveAwardsNightPage.jsx` → primary local component **LoveAwardsNight**; 10 local files, 58414 aggregated bytes.
**Design:** text-amber-400 rounded-3xl bg-gradient-to-b from-red-950 via-slate-950 to-stone-950 border-4 border-amber-500/70 shadow-[0_0_50px_rgba bg-black/80. **Media:** 27. **Interactions:** 54. **Personal voice:** 45.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `9852b3573d26`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 235 — Four Seasons Of Love

**Route:** `/four-seasons-of-love` · **Journey status:** sequence page 199 · **Journey order:** 199
**Code:** `src/pages/FourSeasonsOfLovePage.jsx` → primary local component **FourSeasonsOfLove**; 10 local files, 56831 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 47.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b1f05a6d7c47`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 236 — Couple Cookbook

**Route:** `/couple-cookbook` · **Journey status:** sequence page 200 · **Journey order:** 200
**Code:** `src/pages/CoupleCookbookPage.jsx` → primary local component **CoupleCookbook**; 10 local files, 55843 aggregated bytes.
**Design:** text-emerald-400 text-center rounded-3xl bg-slate-950 border-4 border-emerald-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 41.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `9548fbf4bca0`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 237 — Couple Bucket List

**Route:** `/couple-bucket-list` · **Journey status:** sequence page 201 · **Journey order:** 201
**Code:** `src/pages/CoupleBucketListPage.jsx` → primary local component **CoupleBucketList**; 10 local files, 55852 aggregated bytes.
**Design:** text-emerald-400 text-center rounded-3xl bg-slate-950 border-4 border-emerald-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 43.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c689544b2a26`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 238 — Grand Love Universe

**Route:** `/grand-love-universe` · **Journey status:** sequence page 202 · **Journey order:** 202
**Code:** `src/pages/GrandLoveUniversePage.jsx` → primary local component **GrandLoveUniverse**; 10 local files, 61349 aggregated bytes.
**Design:** from-amber-400 to-yellow-500 from-blue-400 to-indigo-600 from-yellow-300 to-amber-500 from-pink-400 to-rose-500 from-orange-400 to-amber-600. **Media:** 27. **Interactions:** 60. **Personal voice:** 47.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `885f55509a2b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 239 — Samjhana Through Abu’s Eyes

**Route:** `/sanzu-photo-gallery` · **Journey status:** sequence page 203 · **Journey order:** 203
**Code:** `src/pages/SanzuPhotoGalleryGridPage.jsx` → primary local component **SanzuPhotoGalleryGrid**; 10 local files, 58925 aggregated bytes.
**Design:** text-pink-400 text-center font-ui rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2. **Media:** 28. **Interactions:** 66. **Personal voice:** 47.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c81ed67d2b4c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 240 — The Voice Abu Keeps Close

**Route:** `/romantic-audio-player` · **Journey status:** sequence page 204 · **Journey order:** 204
**Code:** `src/pages/RomanticAudioPlayerPage.jsx` → primary local component **RomanticAudioPlayer**; 10 local files, 59097 aggregated bytes.
**Design:** text-pink-400 rounded-3xl bg-gradient-to-b from-stone-900 via-slate-950 to-stone-950 border-4 border-pink-500/50 shadow-[0_0_50px_rgba bg-stone-900. **Media:** 28. **Interactions:** 59. **Personal voice:** 41.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `3c2a58df45a3`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 241 — The Memory Tree We Keep Growing

**Route:** `/love-memory-tree-3d` · **Journey status:** sequence page 205 · **Journey order:** 205
**Code:** `src/pages/LoveMemoryTree3DPage.jsx` → primary local component **LoveMemoryTree3D**; 10 local files, 55495 aggregated bytes.
**Design:** text-emerald-400 text-center rounded-3xl bg-slate-950 border-4 border-emerald-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 53. **Personal voice:** 37.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `7d31879ca0b0`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 242 — The Flight Between Abu and Sanzu

**Route:** `/nepalgunj-osaka-flight` · **Journey status:** sequence page 206 · **Journey order:** 206
**Code:** `src/pages/NepalgunjToOsakaFlightSimPage.jsx` → primary local component **page-specific JSX**; 1 local files, 2317 aggregated bytes.
**Design:** bg-[ text-[ text-teal-700 text-xs font-black text-6xl rounded-[2rem] border-teal-100 bg-white shadow-xl. **Media:** 0. **Interactions:** 4. **Personal voice:** 9.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `64d424df20ac`; no direct code error signal; placeholder copy | interaction with low media; all detected internal targets registered.

### Registered page 243 — Vouchers Abu Would Give You

**Route:** `/love-scratch-voucher-book` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveScratchVoucherBookPage.jsx` → primary local component **LoveScratchVoucherBook**; 10 local files, 56927 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 41.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `69c6461f7455`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 244 — Voice Notes Abu Saves

**Route:** `/bhuntu-voice-note-archive` · **Journey status:** sequence page 207 · **Journey order:** 207
**Code:** `src/pages/BhuntuVoiceNoteArchivePage.jsx` → primary local component **BhuntuVoiceNoteArchive**; 10 local files, 56518 aggregated bytes.
**Design:** text-purple-300 text-center rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 49.
**Gift record:** complete; gift “a private letter from Abu”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `10e3fae36b4c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 245 — The Milestones We Keep

**Route:** `/couple-milestone-map` · **Journey status:** sequence page 208 · **Journey order:** 208
**Code:** `src/pages/CoupleMilestoneMapPage.jsx` → primary local component **CoupleMilestoneMap**; 10 local files, 56700 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 42.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `2688d168f933`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 246 — Your Birthday Sky Letter

**Route:** `/birthday-sky-letter` · **Journey status:** registered but not in sequence
**Code:** `src/pages/BirthdaySkyLetterPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321513 aggregated bytes.
**Design:** bg-[ text-[ text-amber-200 text-xs font-black text-6xl text-8xl text-lg text-blue-100/60 rounded-full. **Media:** 33. **Interactions:** 6. **Personal voice:** 4132.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `11582bd1e57e`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 247 — Petals for Samjhana

**Route:** `/romantic-petal-rain` · **Journey status:** sequence page 209 · **Journey order:** 209
**Code:** `src/pages/RomanticPetalRainPage.jsx` → primary local component **RomanticPetalRain**; 10 local files, 55920 aggregated bytes.
**Design:** text-rose-400 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 42.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d48c7839efaa`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 248 — A Letter That Opens for You

**Route:** `/love-letter-popup-3d` · **Journey status:** sequence page 210 · **Journey order:** 210
**Code:** `src/pages/LoveLetterPopUp3DPage.jsx` → primary local component **LoveLetterPopUp3D**; 10 local files, 56879 aggregated bytes.
**Design:** text-rose-400 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 40.
**Gift record:** complete; gift “a private letter from Abu”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d92c9a2e21e2`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 249 — The Master List of Our Details

**Route:** `/couple-quiz-master` · **Journey status:** registered but not in sequence
**Code:** `src/pages/CoupleQuizMasterPage.jsx` → primary local component **CoupleQuizMaster**; 10 local files, 59052 aggregated bytes.
**Design:** text-purple-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-2xl bg-purple-950/40 rounded-2xl border-purple-400/40. **Media:** 27. **Interactions:** 58. **Personal voice:** 46.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `8275818aabb3`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 250 — Our Story on Film

**Route:** `/love-memory-film-strip` · **Journey status:** sequence page 211 · **Journey order:** 211
**Code:** `src/pages/LoveMemoryFilmStripPage.jsx` → primary local component **LoveMemoryFilmStrip**; 10 local files, 61840 aggregated bytes.
**Design:** text-amber-400 text-center rounded-full text-xs font-bold bg-amber-500 text-black border-amber-300 font-extrabold bg-stone-900. **Media:** 27. **Interactions:** 60. **Personal voice:** 49.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b24a6c38ec16`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 251 — A Table for Abu and Sanzu

**Route:** `/love-candlelight-dinner` · **Journey status:** sequence page 212 · **Journey order:** 212
**Code:** `src/pages/LoveCandleLightDinnerPage.jsx` → primary local component **LoveCandleLightDinner**; 10 local files, 56607 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 39.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `83fa0c457b84`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 252 — The Galaxy of Names Abu Calls You

**Route:** `/bhuntu-nicknames-galaxy` · **Journey status:** sequence page 213 · **Journey order:** 213
**Code:** `src/pages/BhuntuNicknamesGalaxyPage.jsx` → primary local component **BhuntuNicknamesGalaxy**; 10 local files, 62266 aggregated bytes.
**Design:** text-purple-300 text-center rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-[0_0_50px_rgba text-xs font-mono font-bold. **Media:** 27. **Interactions:** 59. **Personal voice:** 57.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `7d7ddc6675b4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 253 — Fortunes Abu Writes for You

**Route:** `/love-fortune-cookie-jar` · **Journey status:** sequence page 214 · **Journey order:** 214
**Code:** `src/pages/LoveFortuneCookieJarPage.jsx` → primary local component **LoveFortuneCookieJar**; 10 local files, 63875 aggregated bytes.
**Design:** rounded-full bg-amber-400 text-amber-400 rounded-t-xl bg-amber-600/40 rounded-b-[3rem] border-2 border-amber-300/30 text-[8px] font-mono. **Media:** 27. **Interactions:** 78. **Personal voice:** 39.
**Gift record:** complete; gift “a private letter from Abu”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `3b50b41943ee`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 254 — Our Future Places on a Globe

**Route:** `/couple-bucket-list-globe` · **Journey status:** sequence page 215 · **Journey order:** 215
**Code:** `src/pages/CoupleBucketListGlobePage.jsx` → primary local component **CoupleBucketListGlobe**; 10 local files, 63531 aggregated bytes.
**Design:** text-sky-400 text-center text-xs font-mono font-bold text-sky-300 bg-sky-950/40 rounded-2xl border-sky-400/30 text-amber-300. **Media:** 27. **Interactions:** 59. **Personal voice:** 47.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0129b056c8a9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 255 — The Shape of Your Voice

**Route:** `/love-audio-visualizer-2` · **Journey status:** sequence page 216 · **Journey order:** 216
**Code:** `src/pages/LoveAudioVisualizer2Page.jsx` → primary local component **LoveAudioVisualizer2**; 10 local files, 56501 aggregated bytes.
**Design:** text-sky-400 text-center rounded-3xl bg-slate-950 border-4 border-sky-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 38.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `cb309f4e99b1`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 256 — A Slow Gallery of Samjhana

**Route:** `/romantic-photo-slider-3d` · **Journey status:** sequence page 217 · **Journey order:** 217
**Code:** `src/pages/RomanticPhotoSlider3DPage.jsx` → primary local component **RomanticPhotoSlider3D**; 10 local files, 61606 aggregated bytes.
**Design:** bg-stone-900 rounded-sm bg-stone-950 border-stone-700 shadow-inner text-amber-300 font-mono text-[10px] text-amber-500/80 rounded-full. **Media:** 28. **Interactions:** 71. **Personal voice:** 40.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `3dfb7ccbd077`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 257 — Our Story in Small Symbols

**Route:** `/bhuntu-emoji-arcade` · **Journey status:** registered but not in sequence
**Code:** `src/pages/BhuntuEmojiArcadePage.jsx` → primary local component **BhuntuEmojiArcade**; 10 local files, 64607 aggregated bytes.
**Design:** from-pink-500 to-rose-500 from-rose-500 to-red-500 from-pink-400 to-purple-400 from-cyan-400 to-blue-500 from-amber-400 to-yellow-500. **Media:** 27. **Interactions:** 84. **Personal voice:** 44.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `5df1de913b2f`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 258 — Stamps Abu Collected for You

**Route:** `/love-stamp-collection` · **Journey status:** sequence page 218 · **Journey order:** 218
**Code:** `src/pages/LoveStampCollectionPage.jsx` → primary local component **LoveStampCollection**; 10 local files, 58395 aggregated bytes.
**Design:** text-rose-500 text-center rounded-3xl bg-amber-950/40 border-4 border-amber-500/70 shadow-2xl bg-black/80 rounded-2xl border-amber-400/40. **Media:** 27. **Interactions:** 55. **Personal voice:** 43.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c58bb204b809`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 259 — A Message Abu Wrote in the Night

**Route:** `/romantic-night-skywriter` · **Journey status:** sequence page 219 · **Journey order:** 219
**Code:** `src/pages/RomanticNightSkyWriterPage.jsx` → primary local component **RomanticNightSkyWriter**; 10 local files, 58697 aggregated bytes.
**Design:** text-purple-300 text-center rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-[0_0_50px_rgba rounded-2xl bg-gradient-to-b from-slate-950. **Media:** 27. **Interactions:** 59. **Personal voice:** 43.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `669d5783ac52`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 260 — Recipes for Our Future Days

**Route:** `/couple-recipe-book` · **Journey status:** sequence page 220 · **Journey order:** 220
**Code:** `src/pages/CoupleRecipeBookPage.jsx` → primary local component **CoupleRecipeBook**; 10 local files, 59167 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-500/70 shadow-2xl rounded-2xl bg-amber-950/30 border-2. **Media:** 27. **Interactions:** 61. **Personal voice:** 43.
**Gift record:** complete; gift “a tiny cinema ticket for one moment Abu would replay”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f320332de3ad`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 261 — A Constellation for Sanzu

**Route:** `/love-constellation-maker` · **Journey status:** sequence page 221 · **Journey order:** 221
**Code:** `src/pages/LoveConstellationMakerPage.jsx` → primary local component **LoveConstellationMaker**; 10 local files, 59499 aggregated bytes.
**Design:** text-purple-300 text-center rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-[0_0_50px_rgba rounded-full border-amber-400/80 bg-gradient-to-b. **Media:** 27. **Interactions:** 59. **Personal voice:** 37.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `991e7daba356`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 262 — Bhuntu Love Polaroids

**Route:** `/bhuntu-love-polaroids` · **Journey status:** sequence page 222 · **Journey order:** 222
**Code:** `src/pages/BhuntuLovePolaroidsPage.jsx` → primary local component **BhuntuLovePolaroids**; 10 local files, 56296 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 46.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `ea6123f447c3`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 263 — The Future Abu Wishes You

**Route:** `/love-tarot-oracle-2` · **Journey status:** sequence page 223 · **Journey order:** 223
**Code:** `src/pages/LoveTarotOracle2Page.jsx` → primary local component **LoveTarotOracle2**; 10 local files, 58409 aggregated bytes.
**Design:** text-purple-300 rounded-3xl border-2 shadow-2xl bg-slate-950 border-purple-400/80 shadow-[0_0_30px_rgba bg-gradient-to-b from-purple-950 via-slate-950. **Media:** 27. **Interactions:** 57. **Personal voice:** 41.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c5a5f467d5cd`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 264 — A Locket for the Person Abu Loves

**Route:** `/romantic-locket-changer` · **Journey status:** sequence page 224 · **Journey order:** 224
**Code:** `src/pages/RomanticLocketChangerPage.jsx` → primary local component **RomanticLocketChanger**; 10 local files, 58332 aggregated bytes.
**Design:** from-amber-400 to-yellow-600 border-amber-300 shadow-amber-500/50 from-rose-400 to-pink-600 border-rose-300 shadow-rose-500/50 from-slate-300 to-stone-500. **Media:** 27. **Interactions:** 59. **Personal voice:** 41.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `551135a83293`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 265 — Clues from Our Little World

**Route:** `/love-crossword-puzzle` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveCrosswordPuzzlePage.jsx` → primary local component **LoveCrosswordPuzzle**; 10 local files, 58786 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl bg-pink-950/40 rounded-2xl border-pink-400/40. **Media:** 27. **Interactions:** 60. **Personal voice:** 42.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `62cfcfd1243c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 266 — Movies Abu Wants to Watch with You

**Route:** `/couple-movie-marathon` · **Journey status:** sequence page 225 · **Journey order:** 225
**Code:** `src/pages/CoupleMovieMarathonPage.jsx` → primary local component **CoupleMovieMarathon**; 10 local files, 58815 aggregated bytes.
**Design:** text-amber-400 rounded-3xl bg-gradient-to-b from-red-950 via-slate-950 to-stone-950 border-4 border-amber-500/70 shadow-[0_0_50px_rgba bg-black/90. **Media:** 27. **Interactions:** 60. **Personal voice:** 41.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the dream of Pokhara, Manang, and Mustang waiting for us”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f20bd562e6c8`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 267 — The Language of Your “Huss”

**Route:** `/love-language-test` · **Journey status:** sequence page 226 · **Journey order:** 226
**Code:** `src/pages/LoveLanguageTestPage.jsx` → primary local component **LoveLanguageTest**; 10 local files, 56555 aggregated bytes.
**Design:** text-rose-400 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 38.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0c66bb4d32b4`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 268 — The Samjhana Abu Knows

**Route:** `/bhuntu-personality-quiz` · **Journey status:** registered but not in sequence
**Code:** `src/pages/BhuntuPersonalityQuizPage.jsx` → primary local component **BhuntuPersonalityQuiz**; 10 local files, 56586 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 47.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0df8bd51b8c9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 269 — A Second Bottle of Abu’s Feelings

**Route:** `/love-potion-brewery-2` · **Journey status:** sequence page 227 · **Journey order:** 227
**Code:** `src/pages/LovePotionBrewery2Page.jsx` → primary local component **LovePotionBrewery2**; 10 local files, 56554 aggregated bytes.
**Design:** text-purple-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 39.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `aff02ecb82b2`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 270 — Messages Abu Arranged for You

**Route:** `/romantic-message-grid` · **Journey status:** sequence page 228 · **Journey order:** 228
**Code:** `src/pages/RomanticMessageGridPage.jsx` → primary local component **RomanticMessageGrid**; 10 local files, 56139 aggregated bytes.
**Design:** text-rose-400 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 43.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `c7515b1f037a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 271 — The Time We Keep Together

**Route:** `/couple-anniversary-clock` · **Journey status:** sequence page 229 · **Journey order:** 229
**Code:** `src/pages/CoupleAnniversaryClockPage.jsx` → primary local component **CoupleAnniversaryClock**; 10 local files, 56538 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 36.
**Gift record:** complete; gift “a quiet “open when” note for your pocket”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `41e64ad4aa28`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 272 — A Doodle from Abu

**Route:** `/love-doodle-canvas` · **Journey status:** sequence page 230 · **Journey order:** 230
**Code:** `src/pages/LoveDoodleCanvasPage.jsx` → primary local component **page-specific JSX**; 1 local files, 1742 aggregated bytes.
**Design:** bg-[ text-[ text-rose-600 text-xs font-black text-6xl text-lg rounded-[2rem] border-4 border-dashed. **Media:** 0. **Interactions:** 4. **Personal voice:** 3.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the day “Abhay” became “Abu” because you made it yours”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `93b027b24563`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 273 — The Comic Abu Would Draw for You

**Route:** `/bhuntu-comic-strip-2` · **Journey status:** sequence page 231 · **Journey order:** 231
**Code:** `src/pages/BhuntuComicStrip2Page.jsx` → primary local component **BhuntuComicStrip2**; 10 local files, 56628 aggregated bytes.
**Design:** text-purple-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 50.
**Gift record:** complete; gift “a private letter from Abu”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `daf4a4e56ce1`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 274 — The Rhythm of Our Calls

**Route:** `/love-rhythm-drum-pad` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveRhythmDrumPadPage.jsx` → primary local component **LoveRhythmDrumPad**; 10 local files, 56474 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 38.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `53028472f390`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 275 — A Garden for Sanzu

**Route:** `/romantic-flower-garden` · **Journey status:** sequence page 232 · **Journey order:** 232
**Code:** `src/pages/RomanticFlowerGardenPage.jsx` → primary local component **RomanticFlowerGarden**; 10 local files, 56497 aggregated bytes.
**Design:** text-rose-400 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 41.
**Gift record:** complete; gift “a small surprise box with one true thing inside”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `3369b4cf89cc`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 276 — A Wish Bottle from Abu

**Route:** `/love-wish-bottle-ocean` · **Journey status:** sequence page 233 · **Journey order:** 233
**Code:** `src/pages/LoveWishBottleOceanPage.jsx` → primary local component **LoveWishBottleOcean**; 10 local files, 56491 aggregated bytes.
**Design:** text-cyan-400 text-center rounded-3xl bg-slate-950 border-4 border-cyan-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 39.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `d69e5da4c7f5`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 277 — The Things You Are Best At

**Route:** `/couple-superlatives` · **Journey status:** sequence page 234 · **Journey order:** 234
**Code:** `src/pages/CoupleSuperlativesPage.jsx` → primary local component **CoupleSuperlatives**; 10 local files, 56715 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 44.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f93072f8457b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 278 — A Cube of Our Favorite Moments

**Route:** `/love-memory-cube-3d` · **Journey status:** sequence page 235 · **Journey order:** 235
**Code:** `src/pages/LoveMemoryCube3DPage.jsx` → primary local component **LoveMemoryCube3D**; 10 local files, 60545 aggregated bytes.
**Design:** from-cyan-500 to-blue-600 from-rose-500 to-pink-600 from-amber-400 to-yellow-500 from-orange-400 to-amber-500 from-purple-500 to-indigo-600. **Media:** 27. **Interactions:** 56. **Personal voice:** 42.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f4ec6d0ae24b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 279 — The Little Things Abu Notices

**Route:** `/little-things-abu-notices` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LittleThingsPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321518 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-emerald-700/70 text-6xl text-8xl text-lg text-emerald-700 text-sm. **Media:** 32. **Interactions:** 6. **Personal voice:** 4137.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b5f3f21225ef`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 280 — Letters Abu Has Been Saving

**Route:** `/love-envelope-collection` · **Journey status:** sequence page 236 · **Journey order:** 236
**Code:** `src/pages/LoveEnvelopeCollectionPage.jsx` → primary local component **LoveEnvelopeCollection**; 10 local files, 56955 aggregated bytes.
**Design:** text-rose-400 text-center rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 42.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e23a5638c07c`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 281 — A Second Song for Bhuntu

**Route:** `/romantic-music-box-2` · **Journey status:** sequence page 237 · **Journey order:** 237
**Code:** `src/pages/RomanticMusicBox2Page.jsx` → primary local component **RomanticMusicBox2**; 10 local files, 56894 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 39.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `163642576e31`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 282 — The Home Abu Imagines

**Route:** `/couple-future-home-3d` · **Journey status:** sequence page 238 · **Journey order:** 238
**Code:** `src/pages/CoupleFutureHome3DPage.jsx` → primary local component **CoupleFutureHome3D**; 10 local files, 56487 aggregated bytes.
**Design:** text-blue-400 text-center rounded-3xl bg-slate-950 border-4 border-blue-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 41.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `175de460e500`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 283 — A Sign with Your Name on It

**Route:** `/love-neon-sign-gallery` · **Journey status:** sequence page 239 · **Journey order:** 239
**Code:** `src/pages/LoveNeonSignGalleryPage.jsx` → primary local component **LoveNeonSignGallery**; 10 local files, 56425 aggregated bytes.
**Design:** text-pink-400 text-center rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 41.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `637db60052d2`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 284 — Pieces of Samjhana in One Picture

**Route:** `/bhuntu-photo-mosaic-2` · **Journey status:** sequence page 240 · **Journey order:** 240
**Code:** `src/pages/BhuntuPhotoMosaic2Page.jsx` → primary local component **BhuntuPhotoMosaic2**; 10 local files, 56551 aggregated bytes.
**Design:** text-purple-400 text-center rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 47.
**Gift record:** complete; gift “a private letter from Abu”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `668ffee1d886`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 285 — Building a Future from Little Pieces

**Route:** `/love-tetris-block-puzzle` · **Journey status:** sequence page 244 · **Journey order:** 244
**Code:** `src/pages/LoveTetrisBlockPuzzlePage.jsx` → primary local component **page-specific JSX**; 1 local files, 1710 aggregated bytes.
**Design:** bg-[ text-[ text-emerald-800 text-xs font-black text-6xl border-4 text-left border-emerald-700 bg-emerald-200. **Media:** 0. **Interactions:** 2. **Personal voice:** 2.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `a3f7cb838e80`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 286 — The Certificate of Being Samjhana

**Route:** `/couple-relationship-cert` · **Journey status:** sequence page 241 · **Journey order:** 241
**Code:** `src/pages/CoupleRelationshipCertPage.jsx` → primary local component **CoupleRelationshipCert**; 10 local files, 56613 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 54. **Personal voice:** 40.
**Gift record:** complete; gift “a tiny memory ticket from Nepalgunj”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `06581c531bec`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 287 — The Big Sky Abu Made for You

**Route:** `/grand-love-galaxy-3d` · **Journey status:** sequence page 242 · **Journey order:** 242
**Code:** `src/pages/GrandLoveGalaxy3DPage.jsx` → primary local component **GrandLoveGalaxy3D**; 10 local files, 57393 aggregated bytes.
**Design:** from-purple-500 to-indigo-600 from-pink-500 to-rose-600 from-amber-400 to-yellow-500 text-purple-400 text-center font-ui rounded-3xl. **Media:** 27. **Interactions:** 55. **Personal voice:** 41.
**Gift record:** complete; gift “a private letter from Abu”; memory “the way you can be Sanzu, Bhuntu, Sanu, Babe, or Runchi and still be home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `773bc68364c9`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 288 — Three Dimensions of Our Memory

**Route:** `/love-memory-match-3d` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveMemoryMatch3DPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321574 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-emerald-700/70 text-6xl text-8xl text-emerald-600 text-lg rounded-[2rem]. **Media:** 32. **Interactions:** 8. **Personal voice:** 4132.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “the room-search conversation that started in Nepalgunj”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `f0ff04290b02`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 289 — A Second Gallery of Hidden Notes

**Route:** `/love-scratch-off-gallery-2` · **Journey status:** registered but not in sequence
**Code:** `src/pages/LoveScratchOffGallerySecondPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321089 aggregated bytes.
**Design:** bg-[ text-[ text-amber-200 text-xs font-black text-6xl text-8xl text-lg text-white/60 rounded-[2rem]. **Media:** 32. **Interactions:** 6. **Personal voice:** 4129.
**Gift record:** complete; gift “a promise folded into a keepsake card”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b02101e5527a`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 290 — The Archive Abu Locked for You

**Route:** `/love-letter-archive-vault` · **Journey status:** sequence page 245 · **Journey order:** 245
**Code:** `src/pages/LoveLetterArchiveVaultPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321148 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-6xl text-8xl rounded-2xl text-left border-[ bg-white/70. **Media:** 32. **Interactions:** 6. **Personal voice:** 4130.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `b23839d6a5ec`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 291 — Words That Make a Day Softer

**Route:** `/love-spell-caster-studio` · **Journey status:** sequence page 246 · **Journey order:** 246
**Code:** `src/pages/LoveSpellCasterStudioPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321277 aggregated bytes.
**Design:** bg-[ text-[ text-violet-200 text-xs font-black text-6xl text-8xl rounded-[2rem] border-violet-200/15 bg-white/[.06]. **Media:** 32. **Interactions:** 6. **Personal voice:** 4133.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `2a86d2000f48`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 292 — The Lab of Abu’s Feelings

**Route:** `/love-potion-lab-2` · **Journey status:** sequence page 247 · **Journey order:** 247
**Code:** `src/pages/LovePotionLab2Page.jsx` → primary local component **page-specific JSX**; 4 local files, 321705 aggregated bytes.
**Design:** bg-[ text-[ text-lime-200 text-xs font-black text-6xl text-8xl rounded-[2rem] border-lime-200/15 bg-white/[.06]. **Media:** 32. **Interactions:** 6. **Personal voice:** 4133.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `404a8b098129`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 293 — A Second Map of Our Story

**Route:** `/couple-milestone-map-2` · **Journey status:** sequence page 248 · **Journey order:** 248
**Code:** `src/pages/CoupleMilestoneMap2Page.jsx` → primary local component **page-specific JSX**; 4 local files, 321346 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-6xl text-8xl rounded-[2rem] rounded-[1.5rem] rounded-2xl text-left. **Media:** 32. **Interactions:** 6. **Personal voice:** 4131.
**Gift record:** complete; gift “a future postcard from the light-blue scooter road”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `763aa2fac11d`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 294 — Secret Vault 2

**Route:** `/secret-vault-2` · **Journey status:** sequence page 249 · **Journey order:** 249
**Code:** `src/pages/SecretVaultSecondPage.jsx` → primary local component **page-specific JSX**; 4 local files, 320930 aggregated bytes.
**Design:** bg-[ text-indigo-50 text-xs font-black text-indigo-300/70 text-6xl text-8xl rounded-[2.5rem] shadow-2xl border-indigo-200/15. **Media:** 32. **Interactions:** 6. **Personal voice:** 4130.
**Gift record:** complete; gift “a Sakai-to-Nepalgunj distance token”; memory “Water Park laughter and the day moving too quickly”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `4339e1867435`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 295 — Love Grand Finale 2

**Route:** `/love-grand-finale-2` · **Journey status:** sequence page 250 · **Journey order:** 250
**Code:** `src/pages/LoveGrandFinaleSecondPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321254 aggregated bytes.
**Design:** bg-gradient-to-b from-[ via-[ to-[ text-[ text-xs font-black text-6xl text-8xl text-lg. **Media:** 32. **Interactions:** 6. **Personal voice:** 4132.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `e3b6c891f293`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 296 — Another Window into Our Future

**Route:** `/future-house-builder-2` · **Journey status:** sequence page 251 · **Journey order:** 251
**Code:** `src/pages/FutureHouseBuilderSecondPage.jsx` → primary local component **page-specific JSX**; 4 local files, 321259 aggregated bytes.
**Design:** bg-[ text-[ text-xs font-black text-emerald-700/70 text-6xl text-8xl text-lg rounded-[2rem] shadow-xl. **Media:** 32. **Interactions:** 6. **Personal voice:** 4134.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “Bageshwori Temple and the prayers we carried home”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `2d34c13235bb`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 297 — The Grand Birthday Gift for Samjhana

**Route:** `/ultimate-300th-love-coronation` · **Journey status:** sequence page 252 · **Journey order:** 252
**Code:** `src/pages/Ultimate300thLoveCoronationPage.jsx` → primary local component **Ultimate300thLoveCoronation**; 10 local files, 57282 aggregated bytes.
**Design:** text-amber-400 text-center rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl rounded-2xl border-2 border-amber-300. **Media:** 27. **Interactions:** 57. **Personal voice:** 43.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `1f063f8a2f43`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 298 — Samjhana’s Hall of Abu’s Favourite Things

**Route:** `/hall-of-fame` · **Journey status:** sequence page 253 · **Journey order:** 253
**Code:** `src/pages/HallOfFamePage.jsx` → primary local component **HallOfFame**; 11 local files, 114443 aggregated bytes.
**Design:** text-amber-400 font-ui rounded-3xl border-4 border-amber-400 bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950 text-white. **Media:** 33. **Interactions:** 58. **Personal voice:** 252.
**Gift record:** complete; gift “a soft landing place for a difficult day”; memory “dropping you at the Language Institute before Japan”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `307a51e47cb8`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 299 — The Bonus Room of Small Surprises

**Route:** `/bonus-arcade` · **Journey status:** registered but not in sequence
**Code:** `src/pages/BonusArcadePage.jsx` → primary local component **WorldShell**; 3 local files, 16895 aggregated bytes.
**Design:** text-left rounded-2xl border-pink-300 shadow-md bg-white/90 border-rose-400 shadow-xl font-bold text-rose-600 font-ui. **Media:** 0. **Interactions:** 9. **Personal voice:** 2.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `bcf4101edf7e`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 300 — Room 1 — The First Door

**Route:** `/room/1` · **Journey status:** registered but not in sequence
**Code:** `src/pages/Room1Page.jsx` → primary local component **LoveScratchCard**; 2 local files, 8747 aggregated bytes.
**Design:** no Tailwind design tokens detected. **Media:** 0. **Interactions:** 10. **Personal voice:** 28.
**Gift record:** complete; gift “a private letter from Abu”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `86902abe8d86`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 301 — Room 2 — The Distance Between Us

**Route:** `/room/2` · **Journey status:** sequence page 254 · **Journey order:** 254
**Code:** `src/pages/Room2Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1471 aggregated bytes.
**Design:** bg-[ text-sky-50 text-sky-300 text-xs font-black text-6xl rounded-[2rem] border-sky-100/20 bg-white/10 font-mono. **Media:** 0. **Interactions:** 2. **Personal voice:** 8.
**Gift record:** complete; gift “a bouquet of words for your soft days”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `07e5f934e71c`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 302 — Room 3 — The Photo Abu Keeps

**Route:** `/room/3` · **Journey status:** sequence page 255 · **Journey order:** 255
**Code:** `src/pages/Room3Page.jsx` → primary local component **page-specific JSX**; 2 local files, 11478 aggregated bytes.
**Design:** bg-[ text-[ text-rose-700 text-xs font-black text-6xl rounded-[2rem] shadow-xl bg-white text-rose-500. **Media:** 34. **Interactions:** 7. **Personal voice:** 8.
**Gift record:** complete; gift “a voice-note moment for the nights you miss home”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `29d9b4dc6a4b`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

### Registered page 303 — Room 4 — The Memory Abu Knows

**Route:** `/room/4` · **Journey status:** registered but not in sequence
**Code:** `src/pages/Room4Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1594 aggregated bytes.
**Design:** bg-[ text-[ text-amber-700 text-xs font-black text-6xl rounded-[2rem] border-2 text-left border-amber-700. **Media:** 0. **Interactions:** 4. **Personal voice:** 10.
**Gift record:** complete; gift “a compliment saved for your next tired day”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `727ba06836fb`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 304 — Room 5 — The Story We Tell

**Route:** `/room/5` · **Journey status:** sequence page 256 · **Journey order:** 256
**Code:** `src/pages/Room5Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1579 aggregated bytes.
**Design:** bg-[ text-[ text-rose-700 text-xs font-black text-6xl rounded-full font-bold bg-rose-700 text-white. **Media:** 0. **Interactions:** 4. **Personal voice:** 7.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “Chau-Chau, Panipuri, momo, and the foods that became our language”.
**Checks:** boredom risk **MEDIUM**; duplicate fingerprint `6f1d65b1638d`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 305 — Room 6 — The Things Abu Loves

**Route:** `/room/6` · **Journey status:** sequence page 257 · **Journey order:** 257
**Code:** `src/pages/Room6Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1525 aggregated bytes.
**Design:** bg-[ text-[ text-sky-700 text-xs font-black text-6xl rounded-2xl text-left bg-sky-700 text-white. **Media:** 0. **Interactions:** 2. **Personal voice:** 7.
**Gift record:** complete; gift “a birthday blessing written in Abu’s handwriting”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `ae0d3f8a33e0`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 306 — Room 7 — An Envelope for Sanzu

**Route:** `/room/7` · **Journey status:** sequence page 258 · **Journey order:** 258
**Code:** `src/pages/Room7Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1573 aggregated bytes.
**Design:** bg-[ text-[ text-rose-700 text-xs font-black text-6xl rounded-[2rem] border-2 text-left border-rose-700. **Media:** 0. **Interactions:** 2. **Personal voice:** 4.
**Gift record:** complete; gift “a memory ribbon tied to your favourite name”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `eb062acb27b2`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 307 — Room 8 — The Places We Still Want

**Route:** `/room/8` · **Journey status:** sequence page 259 · **Journey order:** 259
**Code:** `src/pages/Room8Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1516 aggregated bytes.
**Design:** bg-[ text-[ text-emerald-700 text-xs font-black text-6xl rounded-[2rem] border-2 text-left border-emerald-700. **Media:** 0. **Interactions:** 2. **Personal voice:** 7.
**Gift record:** complete; gift “a promise map for the places we still want to see”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `43235d5c5789`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 308 — Room 9 — A Wish for Bhuntu

**Route:** `/room/9` · **Journey status:** sequence page 260 · **Journey order:** 260
**Code:** `src/pages/Room9Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1370 aggregated bytes.
**Design:** bg-[ text-[ text-center text-pink-600 text-xs font-black text-6xl rounded-[50%] border-2 border-pink-600. **Media:** 0. **Interactions:** 2. **Personal voice:** 2.
**Gift record:** complete; gift “a private letter from Abu”; memory “the future light-blue scooter ride toward Bardiya”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `c02c9d0315c4`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 309 — Room 10 — A Voice from Abu

**Route:** `/room/10` · **Journey status:** sequence page 261 · **Journey order:** 261
**Code:** `src/pages/Room10Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1405 aggregated bytes.
**Design:** bg-[ text-white text-cyan-300 text-xs font-black text-6xl rounded-2xl text-left bg-cyan-300 text-[. **Media:** 0. **Interactions:** 2. **Personal voice:** 5.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `5620f3ee7967`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 310 — Room 11 — The Promise Room

**Route:** `/room/11` · **Journey status:** sequence page 262 · **Journey order:** 262
**Code:** `src/pages/Room11Page.jsx` → primary local component **page-specific JSX**; 1 local files, 1357 aggregated bytes.
**Design:** bg-[ text-amber-50 text-center text-amber-300 text-xs font-black text-6xl rounded-[2rem] border-2 text-left. **Media:** 0. **Interactions:** 2. **Personal voice:** 4.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **HIGH**; duplicate fingerprint `4cdd77e5df96`; no direct code error signal; interaction with low media; all detected internal targets registered.

### Registered page 311 — Room 12 — The Final Gift

**Route:** `/room/12` · **Journey status:** sequence page 263 · **Journey order:** 263
**Code:** `src/pages/Room12Page.jsx` → primary local component **page-specific JSX**; 2 local files, 11257 aggregated bytes.
**Design:** bg-gradient-to-b from-[ via-[ to-[ text-white text-center text-amber-100 text-xs font-black text-6xl. **Media:** 31. **Interactions:** 6. **Personal voice:** 5.
**Gift record:** complete; gift “a Bageshwori memory pressed between two pages”; memory “late-night video calls between Nepalgunj and Sakai, Osaka”.
**Checks:** boredom risk **LOW**; duplicate fingerprint `0721fb028a06`; no direct code error signal; no generic/randomized signal; all detected internal targets registered.

## Exact duplicate code groups

No exact duplicate groups detected.

## Shared primary components

- **page-specific JSX**: 78 routes — /, /curated-journey, /story, /video, /quiz, /stars, /compliment-jar, /bouquet-reasons, /passport, /lanterns, /treasure-chest, /horoscope, /cooking-game, /future-night-ride, /voice-soundboard, /fireworks, /timeline-quiz, /love-maze, /couple-bingo, /love-lottery, /secret-vault, /memory-lane, /love-crossword, /love-radio, /blessing-tree, /couple-quiz-2, /promise-trio, /bento-box, /letter-tonight, /love-jar-notes, /mood-ring, /love-tetris, /couple-bucket-list-2, /love-quiz-advanced, /love-meter-deluxe, /love-tree-growth, /love-scratch-card, /love-wish-well, /heartbeat-drum-pad, /emoji-art-canvas, /secret-language, /love-butterfly-catcher, /romantic-karaoke, /birthday-wish-letter, /photo-puzzle-3d, /firework-maker, /love-languages-quiz, /love-constellation-painter, /memory-replay, /sweet-proposal-simulator, /love-rhythm-game, /love-firework-painter, /love-wordle, /nepalgunj-osaka-flight, /birthday-sky-letter, /love-doodle-canvas, /little-things-abu-notices, /love-tetris-block-puzzle, /love-memory-match-3d, /love-scratch-off-gallery-2, /love-letter-archive-vault, /love-spell-caster-studio, /love-potion-lab-2, /couple-milestone-map-2, /secret-vault-2, /love-grand-finale-2, /future-house-builder-2, /room/2, /room/3, /room/4, /room/5, /room/6, /room/7, /room/8, /room/9, /room/10, /room/11, /room/12.

## Fix queue

- / — Samjhana’s Birthday Door from Abu: interaction with low media.
- /curated-journey — The Abu-to-Sanzu Journey: interaction with low media.
- /story — The Story of How Abu Met Samjhana: interaction with low media.
- /video — Samjhana in Motion: interaction with low media.
- /ring — A Little Promise for the Future: randomized output | interaction with low media.
- /lanterns — Wishes Abu Sends Up for You: high boredom risk; interaction with low media.
- /horoscope — Samjhana Written in the Stars: high boredom risk; interaction with low media.
- /cooking-game — A Birthday Table for Sanu: high boredom risk; interaction with low media.
- /voice-soundboard — The Things Abu Wants to Say Out Loud: high boredom risk; interaction with low media.
- /fireworks — A Sky Full of Abu’s Wishes: high boredom risk; interaction with low media.
- /timeline-quiz — Put Our Memories Back in Order: high boredom risk; interaction with low media.
- /love-maze — Finding the Way Back to You: interaction with low media.
- /couple-bingo — The Little Things We Notice: high boredom risk; interaction with low media.
- /love-lottery — The Lucky Number Is You: high boredom risk; interaction with low media.
- /secret-vault — The Secret Abu Saved: high boredom risk; interaction with low media.
- /love-crossword — A Crossword Made of Our Clues: high boredom risk; interaction with low media.
- /love-radio — Abu’s Late-Night Radio for You: high boredom risk; interaction with low media.
- /blessing-tree — A Tree of Abu’s Blessings: high boredom risk; interaction with low media.
- /bento-box — A Bento Box of Small Memories: high boredom risk; interaction with low media.
- /mood-ring — The Mood Abu Notices First: high boredom risk; interaction with low media.
- /love-tetris — A Tower of Tiny Memories: interaction with low media.
- /couple-bucket-list-2 — Our Next Places Together: generic/randomized idea.
- /love-meter-deluxe — Abu’s Measureless Love Meter: high boredom risk; interaction with low media.
- /love-tree-growth — How Abu’s Love Keeps Growing: interaction with low media.
- /love-wish-well — A Well of Abu’s Wishes: high boredom risk; interaction with low media.
- /heartbeat-drum-pad — Heartbeat Drum Pad: high boredom risk; interaction with low media.
- /emoji-art-canvas — Our Story in Small Symbols: interaction with low media.
- /love-butterfly-catcher — Love Butterfly Catcher: high boredom risk; interaction with low media.
- /romantic-karaoke — Romantic Karaoke: high boredom risk; interaction with low media.
- /firework-maker — Firework Maker: high boredom risk; interaction with low media.
- /love-languages-quiz — Love Languages Quiz: high boredom risk; interaction with low media.
- /memory-replay — The Memory Abu Keeps Replaying: placeholder copy.
- /sweet-proposal-simulator — Sweet Proposal Simulator: interaction with low media.
- /love-rhythm-game — Love Rhythm Game: interaction with low media.
- /love-firework-painter — Love Firework Painter: high boredom risk; interaction with low media.
- /love-wordle — Love Wordle: high boredom risk; interaction with low media.
- /nepalgunj-osaka-flight — The Flight Between Abu and Sanzu: placeholder copy | interaction with low media.
- /love-doodle-canvas — A Doodle from Abu: interaction with low media.
- /love-tetris-block-puzzle — Building a Future from Little Pieces: high boredom risk; interaction with low media.
- /bonus-arcade — The Bonus Room of Small Surprises: interaction with low media.
- /room/2 — Room 2 — The Distance Between Us: high boredom risk; interaction with low media.
- /room/4 — Room 4 — The Memory Abu Knows: interaction with low media.
- /room/5 — Room 5 — The Story We Tell: interaction with low media.
- /room/6 — Room 6 — The Things Abu Loves: high boredom risk; interaction with low media.
- /room/7 — Room 7 — An Envelope for Sanzu: high boredom risk; interaction with low media.
- /room/8 — Room 8 — The Places We Still Want: high boredom risk; interaction with low media.
- /room/9 — Room 9 — A Wish for Bhuntu: high boredom risk; interaction with low media.
- /room/10 — Room 10 — A Voice from Abu: high boredom risk; interaction with low media.
- /room/11 — Room 11 — The Promise Room: high boredom risk; interaction with low media.
