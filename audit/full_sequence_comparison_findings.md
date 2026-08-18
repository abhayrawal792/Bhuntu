# Full Sequence Comparison Findings

This comparison reads the complete sequential audit after all 262 pages were recorded. It separates true duplicate implementations from pages that merely share global infrastructure such as the audio controller, store, or shell.

| Finding | Count |
|---|---:|
| Exact source-fingerprint groups | 0 |
| Pages involved in exact duplicate groups | 0 |
| Shared-template groups with more than one page | 11 |
| Pages with fewer than two local image signals | 17 |
| Pages with one or fewer interaction signals | 0 |
| Thin candidates after recursive source inspection | 0 |

## True duplicate implementation groups

No exact duplicate implementation groups were found.

## Shared-template groups

- **page-specific source**: 15 pages; 001 /, 003 /video, 008 /quiz, 009 /stars, 047 /memory-lane, 056 /love-jar-notes, 065 /couple-bucket-list-2, 101 /birthday-wish-letter, and more.
- **NepalgunjToOsakaFlightSim**: 3 pages; 006 /distance, 206 /nepalgunj-osaka-flight, 254 /room/2.
- **SakuraPromiseTree**: 2 pages; 019 /promise-tree, 260 /room/9.
- **TravelBucketList**: 2 pages; 028 /bucket-list, 259 /room/8.
- **LoveEnvelope**: 2 pages; 067 /love-envelope, 258 /room/7.
- **LoveGrandFinale**: 2 pages; 083 /love-grand-finale, 263 /room/12.
- **LoveCoronationCeremony**: 2 pages; 159 /love-coronation-ceremony, 262 /room/11.
- **LoveLoveStoryComicStrip**: 2 pages; 165 /love-story-comic-strip, 256 /room/5.
- **FirstMomentsTimeline**: 2 pages; 176 /first-moments-timeline, 257 /room/6.
- **BhuntuVoiceNoteArchive**: 2 pages; 207 /bhuntu-voice-note-archive, 261 /room/10.
- **BhuntuLovePolaroids**: 2 pages; 222 /bhuntu-love-polaroids, 255 /room/3.

## Low-media pages to review

- Page 001, /, “Samjhana’s Birthday Door from Abu”: 0 image signals, 0 total media signals, 8 interaction signals; implementation HomePage.
- Page 003, /video, “Samjhana in Motion”: 0 image signals, 2 total media signals, 7 interaction signals; implementation VideoPage.
- Page 008, /quiz, “The One Game Abu Made for Samjhana”: 0 image signals, 0 total media signals, 10 interaction signals; implementation QuizPage.
- Page 040, /love-review, “Abu’s Review of Samjhana”: 0 image signals, 0 total media signals, 51 interaction signals; implementation LoveReviewPage.
- Page 042, /love-scrabble, “The Words Abu Keeps”: 0 image signals, 0 total media signals, 66 interaction signals; implementation LoveScrabblePage.
- Page 057, /sweet-compliments, “The Sweet Things Abu Means”: 0 image signals, 0 total media signals, 5 interaction signals; implementation SweetComplimentsPage.
- Page 061, /love-passport-stamps, “Stamps from Our Story”: 0 image signals, 0 total media signals, 7 interaction signals; implementation LovePassportStampsPage.
- Page 071, /love-horoscope-daily, “Today’s Note from the Stars”: 0 image signals, 0 total media signals, 8 interaction signals; implementation LoveHoroscopeDailyPage.
- Page 072, /love-recipe, “The Recipe for a Good Day Together”: 0 image signals, 0 total media signals, 8 interaction signals; implementation LoveRecipePage.
- Page 074, /love-tree-growth, “How Abu’s Love Keeps Growing”: 0 image signals, 0 total media signals, 9 interaction signals; implementation LoveTreeGrowthPage.
- Page 077, /love-origami-heart, “A Folded Heart for Bhuntu”: 0 image signals, 0 total media signals, 71 interaction signals; implementation LoveOrigamiHeartPage.
- Page 078, /love-fortune-cookie, “A Fortune Abu Left Inside”: 0 image signals, 0 total media signals, 66 interaction signals; implementation LoveFortuneCookiePage.
- Page 079, /love-scratch-card, “Love Scratch Card”: 0 image signals, 0 total media signals, 10 interaction signals; implementation LoveScratchCardPage.
- Page 080, /love-audio-visualizer, “What Abu Hears in Your Voice”: 0 image signals, 0 total media signals, 65 interaction signals; implementation LoveAudioVisualizerPage.
- Page 082, /love-wish-well, “A Well of Abu’s Wishes”: 0 image signals, 0 total media signals, 56 interaction signals; implementation LoveWishWellPage.
- Page 110, /firework-maker, “Firework Maker”: 0 image signals, 0 total media signals, 6 interaction signals; implementation FireworkMakerPage.
- Page 116, /potion-brewery, “Potion Brewery”: 0 image signals, 0 total media signals, 4 interaction signals; implementation LovePotionBreweryPage.

## Thin or boring candidates requiring redesign


## Recommended action order

The first priority is to redesign the seven exact duplicate groups because they directly violate the requirement that page ideas must not be reused. The second priority is the four thin candidates. The third priority is the low-media list: pages with strong video, canvas, or typographic experiences are not automatically broken, but pages with both low media and low interaction should receive photo-led replacements. Generic global shell imports should not be counted as page duplication by themselves.

