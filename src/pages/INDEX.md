# Bhuntu Birthday Website — Master 300 Page Index & Design Theme Bible Mapping

Target Viewport: **iPhone 16 Pro (393 × 852 px)** | Total Pages: **303** | Router: **React Router HashRouter** | Code Splitting: **React.lazy + Suspense**

## Master Guidelines & Directives
- **Personalization**: Written from **Abhay (boyfriend / Abu)** to **Sanzu (girlfriend / Bebo / Bhuntu / Sanuu / Fuchee / Runchee)**.
- **WhatsApp Chat Policy**: Only use chat messages/text logs for gathering information, memories, inside jokes, dates, and dialogue. **No WhatsApp image media files used**.
- **Media**: Real photo assets sourced exclusively from `public/photos/` (`photo1.jpg` – `photo42.jpg`).
- **Visual Languages**: 8 distinct World Visual Systems defined in `src/themes.js` (`celestial`, `paper`, `arcade`, `garden`, `journey`, `retro`, `sweet`, `music`).

---

| # | Route Path | Page Component | Assigned World | Interaction Type | Emotional Concept / Title | Status |
|---|------------|----------------|----------------|------------------|---------------------------|--------|
| 1 | `/` | `HomePage` | Monsoon Nepal | Scroll-reveal story | The first message you two ever exchanged | ok |
| 2 | `/story` | `StoryPage` | Osaka Neon | 3D/spatial scene | A thing only you know about her that no one else does | ok |
| 3 | `/gallery` | `GalleryPage` | Old Polaroid Attic | Quiz or personality test | A weather-vane pointing always toward her | ok |
| 4 | `/video` | `VideoPage` | Midnight Constellation | Audio-first experience | The story behind your nickname | ok |
| 5 | `/letter` | `LetterPage` | Momo Steam Kitchen | Photo/video showcase | Your compatibility according to zodiac, played for laughs | ok |
| 6 | `/bouquet` | `BouquetPage` | Golden Hour Rooftop | Choice-based branching | A train ticket to a place you'll go together one day | ok |
| 7 | `/distance` | `DistancePage` | Handwritten Notebook | Sequential unlock | A coincidence that felt like fate | ok |
| 8 | `/surprise` | `SurprisePage` | Arcade Cabinet | Mini-game with real scoring | A top-10 list of her best qualities | ok |
| 9 | `/ring` | `RingSurprisePage` | Botanical Pressed Flowers | Long-press / hold interaction | A scoreboard of who says 'I love you' first more often | ok |
| 10 | `/quiz` | `QuizPage` | Deep Ocean Bottle-Letter | Countdown/timed reveal | The moment you knew you loved her | ok |
| 11 | `/stars` | `StarsPage` | Vintage Film Reel | Shake/tilt interaction (device motion) | A page where you confess something you've never told her | ok |
| 12 | `/time-capsule` | `TimeCapsulePage` | Cosmic Wedding Gold | Drag-and-drop | A candle that 'lights' when she taps it, revealing a memory | ok |
| 13 | `/scratch-surprises` | `ScratchSurprisePage` | Cozy Blanket Fort | Pure stillness page | A song that reminds you of her | ok |
| 14 | `/compliment-jar` | `ComplimentJarPage` | Festival Lights (Tihar/Diwali) | Tap-to-reveal / scratch-off | Things you miss most about her when you're apart | ok |
| 15 | `/catcher-game` | `CatcherGamePage` | Watercolor Sky | Typing/input-based | A kite flying a message across a Nepalgunj sky | ok |
| 16 | `/memory-match` | `MemoryMatchPage` | Retro Cassette / Y2K | Scroll-reveal story | The home you imagine building together someday | ok |
| 17 | `/quote-generator` | `QuoteGeneratorPage` | Snow Globe Winter | 3D/spatial scene | Trivia questions about her own favorite things | ok |
| 18 | `/mystery-gifts` | `MysteryGiftsPage` | Treehouse / Forest Canopy | Quiz or personality test | A mixtape cover she can flip through, song by song | ok |
| 19 | `/spin-wheel` | `SpinWheelPage` | Handmade Origami | Audio-first experience | A flaw of yours she's patient with | ok |
| 20 | `/passport` | `PassportPage` | Grand Finale Ballroom | Photo/video showcase | An awards ceremony with categories invented just for her | ok |
| 21 | `/message-bottle` | `BottlePage` | Monsoon Nepal | Choice-based branching | A recipe box of 'ingredients' that make up your relationship | ok |
| 22 | `/music-box` | `MusicBoxPage` | Osaka Neon | Sequential unlock | A compliment you've never said out loud until now | ok |
| 23 | `/lanterns` | `LanternsPage` | Old Polaroid Attic | Mini-game with real scoring | A weather report metaphor for how she makes you feel | ok |
| 24 | `/photo-booth` | `PhotoBoothPage` | Midnight Constellation | Long-press / hold interaction | A birthday countdown that's been secretly running all year | ok |
| 25 | `/promise-tree` | `PromiseTreePage` | Momo Steam Kitchen | Countdown/timed reveal | A challenge only she could complete | ok |
| 26 | `/treasure-chest` | `TreasureChestPage` | Golden Hour Rooftop | Shake/tilt interaction (device motion) | A bookshelf of inside jokes disguised as book titles | ok |
| 27 | `/love-slots` | `LoveSlotsPage` | Handwritten Notebook | Drag-and-drop | A final reflection on everything the 300 pages meant | ok |
| 28 | `/horoscope` | `HoroscopePage` | Arcade Cabinet | Pure stillness page | A list of specific reasons you chose her | ok |
| 29 | `/love-calculator` | `LoveCalculatorPage` | Botanical Pressed Flowers | Tap-to-reveal / scratch-off | A museum exhibit of 'artifacts' from your relationship | ok |
| 30 | `/cooking-game` | `CookingGamePage` | Deep Ocean Bottle-Letter | Typing/input-based | The story behind her nickname | ok |
| 31 | `/love-pet` | `LovePetPage` | Vintage Film Reel | Scroll-reveal story | Comparing her to something in nature she'd find funny or sweet | ok |
| 32 | `/ferris-wheel` | `FerrisWheelPage` | Cosmic Wedding Gold | 3D/spatial scene | A recipe for her perfect comfort day | ok |
| 33 | `/two-truths` | `TwoTruthsPage` | Cozy Blanket Fort | Quiz or personality test | A road trip or short trip you took together | ok |
| 34 | `/word-search` | `WordSearchPage` | Festival Lights (Tihar/Diwali) | Audio-first experience | A tracker of the physical distance between you two right now | ok |
| 35 | `/wishing-well` | `WishingWellPage` | Watercolor Sky | Photo/video showcase | A countdown clock to your next anniversary | ok |
| 36 | `/voice-soundboard` | `VoiceSoundboardPage` | Retro Cassette / Y2K | Choice-based branching | A promise she made to you | ok |
| 37 | `/tic-tac-toe` | `TicTacToePage` | Snow Globe Winter | Sequential unlock | A spin-the-wheel dare or truth game | ok |
| 38 | `/fireworks` | `FireworksPage` | Treehouse / Forest Canopy | Mini-game with real scoring | A gift box that unwraps in layers | ok |
| 39 | `/timeline-quiz` | `TimelinePuzzlePage` | Handmade Origami | Long-press / hold interaction | Your favorite photo of her and the story behind it | ok |
| 40 | `/bubble-pop` | `BubblePopPage` | Grand Finale Ballroom | Countdown/timed reveal | A letter written as if from your past, newly-dating selves | ok |
| 41 | `/bucket-list` | `BucketListPage` | Monsoon Nepal | Shake/tilt interaction (device motion) | A scrapbook page mixing a real photo and a handwritten note | ok |
| 42 | `/origami` | `OrigamiPage` | Osaka Neon | Drag-and-drop | A future trip you've talked about taking together | ok |
| 43 | `/affirmations` | `AffirmationsPage` | Old Polaroid Attic | Pure stillness page | A poem built from real details about her | ok |
| 44 | `/love-piano` | `LovePianoPage` | Midnight Constellation | Tap-to-reveal / scratch-off | A train window view narrating a memory as it 'passes by' | ok |
| 45 | `/wax-sealer` | `WaxSealerPage` | Momo Steam Kitchen | Typing/input-based | A flaw of hers you love anyway | ok |
| 46 | `/love-maze` | `LoveMazePage` | Golden Hour Rooftop | Scroll-reveal story | A comic strip of one real funny moment between you | ok |
| 47 | `/fortune-cookie` | `FortuneCookiePage` | Handwritten Notebook | 3D/spatial scene | A star map of the night you met | ok |
| 48 | `/love-potion` | `LovePotionPage` | Arcade Cabinet | Quiz or personality test | The first thing you noticed about her | ok |
| 49 | `/emoji-story` | `EmojiStoryPage` | Botanical Pressed Flowers | Audio-first experience | A garden that blooms as she scrolls, each flower a memory | ok |
| 50 | `/jigsaw` | `JigsawPage` | Deep Ocean Bottle-Letter | Photo/video showcase | A jar of fireflies each one a tiny memory | ok |
| 51 | `/love-dice` | `LoveDicePage` | Vintage Film Reel | Choice-based branching | A bet or dare between you two | ok |
| 52 | `/balloon-pop` | `BalloonPopPage` | Cosmic Wedding Gold | Sequential unlock | A passport stamped with places you've been together | ok |
| 53 | `/couple-bingo` | `CoupleBingoPage` | Cozy Blanket Fort | Mini-game with real scoring | A page that only unlocks after she's smiled at three previous pages | ok |
| 54 | `/love-review` | `LoveReviewPage` | Festival Lights (Tihar/Diwali) | Long-press / hold interaction | A straightforward thank-you for something she's done for you | ok |
| 55 | `/love-diary` | `LoveDiaryPage` | Watercolor Sky | Countdown/timed reveal | A fortune-telling machine that only gives true answers about you two | ok |
| 56 | `/love-scrabble` | `LoveScrabblePage` | Retro Cassette / Y2K | Shake/tilt interaction (device motion) | A specific rainy day memory in Nepalgunj | ok |
| 57 | `/love-lottery` | `LoveLotteryPage` | Snow Globe Winter | Drag-and-drop | A duet or song you'd dedicate to her | ok |
| 58 | `/love-tamagotchi` | `LoveTamagotchiPage` | Treehouse / Forest Canopy | Pure stillness page | A jukebox of voice notes she's sent you | ok |
| 59 | `/secret-vault` | `SecretVaultPage` | Handmade Origami | Tap-to-reveal / scratch-off | The food she always orders and why it's her comfort food | ok |
| 60 | `/love-tarot` | `LoveTarotPage` | Grand Finale Ballroom | Typing/input-based | A countdown to when you'll next see each other | ok |
| 61 | `/memory-lane` | `MemoryLanePage` | Monsoon Nepal | Scroll-reveal story | A diary entry from the night you first said 'I love you' | ok |
| 62 | `/hug-counter` | `HugCounterPage` | Osaka Neon | 3D/spatial scene | A promise you made to her | ok |
| 63 | `/love-crossword` | `LoveCrosswordPage` | Old Polaroid Attic | Quiz or personality test | A guess-the-memory quiz using real details only she'd know | ok |
| 64 | `/love-radio` | `LoveRadioPage` | Midnight Constellation | Audio-first experience | A birthday cake she gets to 'decorate' herself | ok |
| 65 | `/blessing-tree` | `BlessingTreePage` | Momo Steam Kitchen | Photo/video showcase | A time you took care of her when she was sick | ok |
| 66 | `/love-vibe` | `LoveVibePage` | Golden Hour Rooftop | Choice-based branching | A letter written as if from your future married selves | ok |
| 67 | `/couple-quiz-2` | `CoupleQuiz2Page` | Handwritten Notebook | Sequential unlock | A weather system shaped like her mood swings, told with love | ok |
| 68 | `/love-spinner-3d` | `LoveSpinner3DPage` | Arcade Cabinet | Mini-game with real scoring | The distance between Nepalgunj and Osaka and what it means to you both | ok |
| 69 | `/bento-box` | `BentoBoxPage` | Botanical Pressed Flowers | Long-press / hold interaction | A running list of her quirks you've quietly fallen for | ok |
| 70 | `/love-wheel-fortune` | `LoveWheelFortunePage` | Deep Ocean Bottle-Letter | Countdown/timed reveal | A snow globe you shake to reveal a frozen-in-time memory | ok |
| 71 | `/love-coupon-generator` | `LoveCouponGeneratorPage` | Vintage Film Reel | Shake/tilt interaction (device motion) | A habit of hers you secretly find adorable | ok |
| 72 | `/star-namer` | `StarNamerPage` | Cosmic Wedding Gold | Drag-and-drop | A build-your-own perfect date night simulator | ok |
| 73 | `/love-jar-notes` | `LoveJarNotesPage` | Cozy Blanket Fort | Pure stillness page | A paper boat sailing a message down a river | ok |
| 74 | `/sweet-compliments` | `SweetComplimentsPage` | Festival Lights (Tihar/Diwali) | Tap-to-reveal / scratch-off | A time you two stayed up all night talking | ok |
| 75 | `/kiss-collector` | `KissCollectorPage` | Watercolor Sky | Typing/input-based | A wind-up music box playing a song that matters to you both | ok |
| 76 | `/love-memory-flip` | `LoveMemoryFlipPage` | Retro Cassette / Y2K | Scroll-reveal story | A puzzle she has to piece together to reveal a photo | ok |
| 77 | `/sound-wave` | `SoundWavePage` | Snow Globe Winter | 3D/spatial scene | A recipe you both love, momo or panipuri | ok |
| 78 | `/love-passport-stamps` | `LovePassportStampsPage` | Treehouse / Forest Canopy | Quiz or personality test | A radio dial you tune through moments of your relationship | ok |
| 79 | `/mood-ring` | `MoodRingPage` | Handmade Origami | Audio-first experience | A 'proof of love' certificate with real evidence, played for laughs | ok |
| 80 | `/love-tetris` | `LoveTetrisPage` | Grand Finale Ballroom | Photo/video showcase | A heartfelt apology for something specific | ok |
| 81 | `/cupid-archery` | `CupidArcheryPage` | Monsoon Nepal | Choice-based branching | A scoreboard of silly competitions you've had | ok |
| 82 | `/love-alarm` | `LoveAlarmPage` | Osaka Neon | Sequential unlock | The first phone call and how nervous you both were | ok |
| 83 | `/couple-bucket-list-2` | `CoupleBucketList2Page` | Old Polaroid Attic | Mini-game with real scoring | A thing only she knows about you | ok |
| 84 | `/love-quiz-advanced` | `LoveQuizAdvancedPage` | Midnight Constellation | Long-press / hold interaction | A hand of cards each revealing a memory | ok |
| 85 | `/love-meter-deluxe` | `LoveMeterDeluxePage` | Momo Steam Kitchen | Countdown/timed reveal | A real argument you had and how you made up | ok |
| 86 | `/love-envelope` | `LoveEnvelopePage` | Golden Hour Rooftop | Shake/tilt interaction (device motion) | Her results if she took the 5 love languages test | ok |
| 87 | `/love-constellation-connect` | `LoveConstellationConnectPage` | Handwritten Notebook | Drag-and-drop | A suitcase you're packing for a future trip, item by item | ok |
| 88 | `/love-journal-prompt` | `LoveJournalPromptPage` | Arcade Cabinet | Pure stillness page | Her laugh and what always triggers it | ok |
| 89 | `/love-chimes` | `LoveChimesPage` | Botanical Pressed Flowers | Tap-to-reveal / scratch-off | A caption game using a real photo of the two of you | ok |
| 90 | `/love-puzzle-slider` | `LovePuzzleSliderPage` | Deep Ocean Bottle-Letter | Typing/input-based | A paper airplane carrying a note across the screen | ok |
| 91 | `/love-horoscope-daily` | `LoveHoroscopeDailyPage` | Vintage Film Reel | Scroll-reveal story | A time she took care of you when you were sick | ok |
| 92 | `/love-recipe` | `LoveRecipePage` | Cosmic Wedding Gold | 3D/spatial scene | A playlist that tells your story song by song | ok |
| 93 | `/love-fireflies` | `LoveFirefliesPage` | Cozy Blanket Fort | Quiz or personality test | A compass that always points to where she is | ok |
| 94 | `/love-tree-growth` | `LoveTreeGrowthPage` | Festival Lights (Tihar/Diwali) | Audio-first experience | A shared inside joke only the two of you understand | ok |
| 95 | `/love-wishes-sky` | `LoveWishesSkyPage` | Watercolor Sky | Photo/video showcase | Your best fight and exactly how you fixed it | ok |
| 96 | `/love-time-machine` | `LoveTimeMachinePage` | Retro Cassette / Y2K | Choice-based branching | A lantern festival where each lantern is a wish for your future | ok |
| 97 | `/love-memory-match` | `LoveMemoryMatchPage` | Snow Globe Winter | Sequential unlock | Names you've joked about for future kids | ok |
| 98 | `/love-origami-heart` | `LoveOrigamiHeartPage` | Treehouse / Forest Canopy | Mini-game with real scoring | A map of every place you've been together, real or planned | ok |
| 99 | `/love-fortune-cookie` | `LoveFortuneCookiePage` | Handmade Origami | Long-press / hold interaction | A treasure chest that only opens after she answers something correctly | ok |
| 100 | `/love-scratch-card` | `LoveScratchCardPage` | Grand Finale Ballroom | Countdown/timed reveal | A time she made you laugh so hard you cried | ok |
| 101 | `/love-audio-visualizer` | `LoveAudioVisualizerPage` | Monsoon Nepal | Shake/tilt interaction (device motion) | A constellation you've named after one memory | ok |
| 102 | `/love-trivia-quiz` | `LoveTriviaQuizPage` | Osaka Neon | Drag-and-drop | A photo booth strip of four real moments, styled retro | ok |
| 103 | `/love-photo-booth` | `LovePhotoBoothPage` | Old Polaroid Attic | Pure stillness page | A specific festival you celebrated together or apart | ok |
| 104 | `/love-wish-well` | `LoveWishWellPage` | Midnight Constellation | Tap-to-reveal / scratch-off | A recipe card for 'what makes us work' | ok |
| 105 | `/love-grand-finale` | `LoveGrandFinalePage` | Momo Steam Kitchen | Typing/input-based | An interactive timeline of your entire relationship so far | ok |
| 106 | `/love-map-canvas` | `LoveMapCanvasPage` | Golden Hour Rooftop | Scroll-reveal story | A treasure-hunt style clue leading to a hidden message | ok |
| 107 | `/heartbeat-drum-pad` | `HeartbeatDrumPadPage` | Handwritten Notebook | 3D/spatial scene | A constellation map of her personality traits | ok |
| 108 | `/paper-airplane-messenger` | `PaperAirplaneMessengerPage` | Arcade Cabinet | Quiz or personality test | The first message you two ever exchanged | ok |
| 109 | `/emoji-art-canvas` | `EmojiArtCanvasPage` | Botanical Pressed Flowers | Audio-first experience | A thing only you know about her that no one else does | ok |
| 110 | `/magic-8-ball-love` | `Magic8BallLovePage` | Deep Ocean Bottle-Letter | Photo/video showcase | A weather-vane pointing always toward her | ok |
| 111 | `/love-lock-bridge` | `LoveLockBridgePage` | Vintage Film Reel | Choice-based branching | The story behind your nickname | ok |
| 112 | `/secret-cipher-wheel` | `SecretCipherWheelPage` | Cosmic Wedding Gold | Sequential unlock | Your compatibility according to zodiac, played for laughs | ok |
| 113 | `/cloud-skywriter` | `CloudSkywriterPage` | Cozy Blanket Fort | Mini-game with real scoring | A train ticket to a place you'll go together one day | ok |
| 114 | `/love-thermometer` | `LoveThermometerPage` | Festival Lights (Tihar/Diwali) | Long-press / hold interaction | A coincidence that felt like fate | ok |
| 115 | `/movie-ticket-creator` | `MovieTicketCreatorPage` | Watercolor Sky | Countdown/timed reveal | A top-10 list of her best qualities | ok |
| 116 | `/snow-globe-shaker` | `SnowGlobeShakerPage` | Retro Cassette / Y2K | Shake/tilt interaction (device motion) | A scoreboard of who says 'I love you' first more often | ok |
| 117 | `/wish-dandelion` | `WishDandelionPage` | Snow Globe Winter | Drag-and-drop | The moment you knew you loved her | ok |
| 118 | `/pixel-heart-painter` | `PixelHeartPainterPage` | Treehouse / Forest Canopy | Pure stillness page | A page where you confess something you've never told her | ok |
| 119 | `/romantic-charades` | `RomanticCharadesPage` | Handmade Origami | Tap-to-reveal / scratch-off | A candle that 'lights' when she taps it, revealing a memory | ok |
| 120 | `/love-achievement-badges` | `LoveAchievementBadgesPage` | Grand Finale Ballroom | Typing/input-based | A song that reminds you of her | ok |
| 121 | `/enchanted-rose-garden` | `EnchantedRoseGardenPage` | Monsoon Nepal | Scroll-reveal story | Things you miss most about her when you're apart | ok |
| 122 | `/love-mad-libs` | `LoveMadLibsPage` | Osaka Neon | 3D/spatial scene | A kite flying a message across a Nepalgunj sky | ok |
| 123 | `/love-butterfly-catcher` | `LoveButterflyCatcherPage` | Old Polaroid Attic | Quiz or personality test | The home you imagine building together someday | ok |
| 124 | `/romantic-karaoke` | `RomanticKaraokePage` | Midnight Constellation | Audio-first experience | Trivia questions about her own favorite things | ok |
| 125 | `/love-mirror-oracle` | `LoveMirrorOraclePage` | Momo Steam Kitchen | Photo/video showcase | A mixtape cover she can flip through, song by song | ok |
| 126 | `/origami-crane` | `OrigamiCranePage` | Golden Hour Rooftop | Choice-based branching | A flaw of yours she's patient with | ok |
| 127 | `/star-drawer` | `StarDrawerPage` | Handwritten Notebook | Sequential unlock | An awards ceremony with categories invented just for her | ok |
| 128 | `/wish-wheel` | `WishWheelPage` | Arcade Cabinet | Mini-game with real scoring | A recipe box of 'ingredients' that make up your relationship | ok |
| 129 | `/bubble-wrap` | `BubbleWrapPage` | Botanical Pressed Flowers | Long-press / hold interaction | A compliment you've never said out loud until now | ok |
| 130 | `/scratch-memory` | `ScratchMemoryPage` | Deep Ocean Bottle-Letter | Countdown/timed reveal | A weather report metaphor for how she makes you feel | ok |
| 131 | `/quiz-duel` | `QuizDuelPage` | Vintage Film Reel | Shake/tilt interaction (device motion) | A birthday countdown that's been secretly running all year | ok |
| 132 | `/love-aquarium` | `LoveAquariumPage` | Cosmic Wedding Gold | Drag-and-drop | A challenge only she could complete | ok |
| 133 | `/photo-puzzle-3d` | `PhotoPuzzle3DPage` | Cozy Blanket Fort | Pure stillness page | A bookshelf of inside jokes disguised as book titles | ok |
| 134 | `/coupon-vault` | `CouponVaultPage` | Festival Lights (Tihar/Diwali) | Tap-to-reveal / scratch-off | A final reflection on everything the 300 pages meant | ok |
| 135 | `/heart-mailbox` | `HeartMailboxPage` | Watercolor Sky | Typing/input-based | A list of specific reasons you chose her | ok |
| 136 | `/star-projector` | `StarProjectorPage` | Retro Cassette / Y2K | Scroll-reveal story | A museum exhibit of 'artifacts' from your relationship | ok |
| 137 | `/cupcake-decorator` | `CupcakeDecoratorPage` | Snow Globe Winter | 3D/spatial scene | The story behind her nickname | ok |
| 138 | `/magnetic-poetry` | `MagneticPoetryPage` | Treehouse / Forest Canopy | Quiz or personality test | Comparing her to something in nature she'd find funny or sweet | ok |
| 139 | `/firework-maker` | `FireworkMakerPage` | Handmade Origami | Audio-first experience | A recipe for her perfect comfort day | ok |
| 140 | `/love-clock` | `LoveClockPage` | Grand Finale Ballroom | Photo/video showcase | A road trip or short trip you took together | ok |
| 141 | `/polaroid-designer` | `PolaroidDesignerPage` | Monsoon Nepal | Choice-based branching | A tracker of the physical distance between you two right now | ok |
| 142 | `/origami-boat` | `OrigamiBoatPage` | Osaka Neon | Sequential unlock | A countdown clock to your next anniversary | ok |
| 143 | `/candle-blower` | `CandleBlowerPage` | Old Polaroid Attic | Mini-game with real scoring | A promise she made to you | ok |
| 144 | `/royal-crown` | `RoyalCrownPage` | Midnight Constellation | Long-press / hold interaction | A spin-the-wheel dare or truth game | ok |
| 145 | `/potion-brewery` | `LovePotionBreweryPage` | Momo Steam Kitchen | Countdown/timed reveal | A gift box that unwraps in layers | ok |
| 146 | `/love-compass` | `LoveCompassPage` | Golden Hour Rooftop | Shake/tilt interaction (device motion) | Your favorite photo of her and the story behind it | ok |
| 147 | `/word-jumble` | `RomanceWordJumblePage` | Handwritten Notebook | Drag-and-drop | A letter written as if from your past, newly-dating selves | ok |
| 148 | `/time-capsule-2` | `BirthdayTimeCapsule2Page` | Arcade Cabinet | Pure stillness page | A scrapbook page mixing a real photo and a handwritten note | ok |
| 149 | `/love-compatibility-matrix` | `LoveCompatibilityMatrixPage` | Botanical Pressed Flowers | Tap-to-reveal / scratch-off | A future trip you've talked about taking together | ok |
| 150 | `/future-house-builder` | `FutureHouseBuilderPage` | Deep Ocean Bottle-Letter | Typing/input-based | A poem built from real details about her | ok |
| 151 | `/romantic-playlist-mixer` | `RomanticPlaylistMixerPage` | Vintage Film Reel | Scroll-reveal story | A train window view narrating a memory as it 'passes by' | ok |
| 152 | `/sweet-promises-jar` | `SweetPromisesJarPage` | Cosmic Wedding Gold | 3D/spatial scene | A flaw of hers you love anyway | ok |
| 153 | `/love-languages-quiz` | `LoveLanguagesQuizPage` | Cozy Blanket Fort | Quiz or personality test | A comic strip of one real funny moment between you | ok |
| 154 | `/couple-bucket-list-spinner` | `CoupleBucketListSpinnerPage` | Festival Lights (Tihar/Diwali) | Audio-first experience | A star map of the night you met | ok |
| 155 | `/love-constellation-painter` | `LoveConstellationPainterPage` | Watercolor Sky | Photo/video showcase | The first thing you noticed about her | ok |
| 156 | `/love-letter-generator` | `LoveLetterGeneratorPage` | Retro Cassette / Y2K | Choice-based branching | A garden that blooms as she scrolls, each flower a memory | ok |
| 157 | `/anniversary-countdown-clock` | `AnniversaryCountdownClockPage` | Snow Globe Winter | Sequential unlock | A jar of fireflies each one a tiny memory | ok |
| 158 | `/heart-bubble-tea-maker` | `HeartBubbleTeaMakerPage` | Treehouse / Forest Canopy | Mini-game with real scoring | A bet or dare between you two | ok |
| 159 | `/love-notes-wall` | `LoveNotesWallPage` | Handmade Origami | Long-press / hold interaction | A passport stamped with places you've been together | ok |
| 160 | `/virtual-cat-cafe` | `VirtualCatCafePage` | Grand Finale Ballroom | Countdown/timed reveal | A page that only unlocks after she's smiled at three previous pages | ok |
| 161 | `/romantic-memory-wheel` | `RomanticMemoryWheelPage` | Monsoon Nepal | Shake/tilt interaction (device motion) | A straightforward thank-you for something she's done for you | ok |
| 162 | `/love-quiz-personality` | `LoveQuizPersonalityPage` | Osaka Neon | Drag-and-drop | A fortune-telling machine that only gives true answers about you two | ok |
| 163 | `/sweet-proposal-simulator` | `SweetProposalSimulatorPage` | Old Polaroid Attic | Pure stillness page | A specific rainy day memory in Nepalgunj | ok |
| 164 | `/love-frequency-tuner` | `LoveFrequencyTunerPage` | Midnight Constellation | Tap-to-reveal / scratch-off | A duet or song you'd dedicate to her | ok |
| 165 | `/couples-secret-handshake` | `CouplesSecretHandshakePage` | Momo Steam Kitchen | Typing/input-based | A jukebox of voice notes she's sent you | ok |
| 166 | `/starry-night-skywriter` | `StarryNightSkywriterPage` | Golden Hour Rooftop | Scroll-reveal story | The food she always orders and why it's her comfort food | ok |
| 167 | `/romantic-cooking-recipe` | `RomanticCookingRecipePage` | Handwritten Notebook | 3D/spatial scene | A countdown to when you'll next see each other | ok |
| 168 | `/love-vault-combination` | `LoveVaultCombinationPage` | Arcade Cabinet | Quiz or personality test | A diary entry from the night you first said 'I love you' | ok |
| 169 | `/sweet-voicemail-inbox` | `SweetVoicemailInboxPage` | Botanical Pressed Flowers | Audio-first experience | A promise you made to her | ok |
| 170 | `/couple-daily-horoscope` | `CoupleDailyHoroscopePage` | Deep Ocean Bottle-Letter | Photo/video showcase | A guess-the-memory quiz using real details only she'd know | ok |
| 171 | `/love-scratch-off-gallery` | `LoveScratchOffGalleryPage` | Vintage Film Reel | Choice-based branching | A birthday cake she gets to 'decorate' herself | ok |
| 172 | `/heart-shape-tangram` | `HeartShapeTangramPage` | Cosmic Wedding Gold | Sequential unlock | A time you took care of her when she was sick | ok |
| 173 | `/love-meteor-shower` | `LoveMeteorShowerPage` | Cozy Blanket Fort | Mini-game with real scoring | A letter written as if from your future married selves | ok |
| 174 | `/sweet-tea-ceremony` | `SweetTeaCeremonyPage` | Festival Lights (Tihar/Diwali) | Long-press / hold interaction | A weather system shaped like her mood swings, told with love | ok |
| 175 | `/couple-nickname-generator` | `CoupleNicknameGeneratorPage` | Watercolor Sky | Countdown/timed reveal | The distance between Nepalgunj and Osaka and what it means to you both | ok |
| 176 | `/love-rhythm-game` | `LoveRhythmGamePage` | Retro Cassette / Y2K | Shake/tilt interaction (device motion) | A running list of her quirks you've quietly fallen for | ok |
| 177 | `/sweet-dessert-tower` | `SweetDessertTowerPage` | Snow Globe Winter | Drag-and-drop | A snow globe you shake to reveal a frozen-in-time memory | ok |
| 178 | `/love-poetry-fridge` | `LovePoetryFridgePage` | Treehouse / Forest Canopy | Pure stillness page | A habit of hers you secretly find adorable | ok |
| 179 | `/couple-travel-passport-stamps` | `CoupleTravelPassportStampsPage` | Handmade Origami | Tap-to-reveal / scratch-off | A build-your-own perfect date night simulator | ok |
| 180 | `/love-firework-painter` | `LoveFireworkPainterPage` | Grand Finale Ballroom | Typing/input-based | A paper boat sailing a message down a river | ok |
| 181 | `/sweet-dream-catcher` | `SweetDreamCatcherPage` | Monsoon Nepal | Scroll-reveal story | A time you two stayed up all night talking | ok |
| 182 | `/couple-questions-deep` | `CoupleQuestionsDeepPage` | Osaka Neon | 3D/spatial scene | A wind-up music box playing a song that matters to you both | ok |
| 183 | `/love-music-box-carousel` | `LoveMusicBoxCarouselPage` | Old Polaroid Attic | Quiz or personality test | A puzzle she has to piece together to reveal a photo | ok |
| 184 | `/sweet-compliments-fountain` | `SweetComplimentsFountainPage` | Midnight Constellation | Audio-first experience | A recipe you both love, momo or panipuri | ok |
| 185 | `/couple-movie-night` | `CoupleMovieNightPage` | Momo Steam Kitchen | Photo/video showcase | A radio dial you tune through moments of your relationship | ok |
| 186 | `/love-keychain-customizer` | `LoveKeychainCustomizerPage` | Golden Hour Rooftop | Choice-based branching | A 'proof of love' certificate with real evidence, played for laughs | ok |
| 187 | `/sweet-garden-blooms` | `SweetGardenBloomsPage` | Handwritten Notebook | Sequential unlock | A heartfelt apology for something specific | ok |
| 188 | `/couple-anniversary-timeline` | `CoupleAnniversaryTimelinePage` | Arcade Cabinet | Mini-game with real scoring | A scoreboard of silly competitions you've had | ok |
| 189 | `/love-fortune-teller-origami` | `LoveFortuneTellerOrigamiPage` | Botanical Pressed Flowers | Long-press / hold interaction | The first phone call and how nervous you both were | ok |
| 190 | `/sweet-heart-balloon-ascent` | `SweetHeartBalloonAscentPage` | Deep Ocean Bottle-Letter | Countdown/timed reveal | A thing only she knows about you | ok |
| 191 | `/couple-starry-planetarium` | `CoupleStarryPlanetariumPage` | Vintage Film Reel | Shake/tilt interaction (device motion) | A hand of cards each revealing a memory | ok |
| 192 | `/love-letter-in-balloon` | `LoveLetterInBalloonPage` | Cosmic Wedding Gold | Drag-and-drop | A real argument you had and how you made up | ok |
| 193 | `/sweet-memory-scrapbook` | `SweetMemoryScrapbookPage` | Cozy Blanket Fort | Pure stillness page | Her results if she took the 5 love languages test | ok |
| 194 | `/love-coronation-ceremony` | `LoveCoronationCeremonyPage` | Festival Lights (Tihar/Diwali) | Tap-to-reveal / scratch-off | A suitcase you're packing for a future trip, item by item | ok |
| 195 | `/whatsapp-10k-love` | `WhatsApp10kLovePage` | Watercolor Sky | Typing/input-based | Her laugh and what always triggers it | ok |
| 196 | `/cupid-radio-dj` | `CupidRadioDJStationPage` | Retro Cassette / Y2K | Scroll-reveal story | A caption game using a real photo of the two of you | ok |
| 197 | `/constellation-stargazer` | `LoveConstellationStargazerPage` | Snow Globe Winter | 3D/spatial scene | A paper airplane carrying a note across the screen | ok |
| 198 | `/heart-nebula-3d` | `LoveHeartNebula3DPage` | Treehouse / Forest Canopy | Quiz or personality test | A time she took care of you when you were sick | ok |
| 199 | `/sweet-confectionery-bakery` | `LoveSweetConfectioneryBakeryPage` | Handmade Origami | Audio-first experience | A playlist that tells your story song by song | ok |
| 200 | `/love-story-comic-strip` | `LoveLoveStoryComicStripPage` | Grand Finale Ballroom | Photo/video showcase | A compass that always points to where she is | ok |
| 201 | `/arcade-dance-machine` | `LoveArcadeDanceMachinePage` | Monsoon Nepal | Choice-based branching | A shared inside joke only the two of you understand | ok |
| 202 | `/enchanted-glass-terrarium` | `LoveEnchantedGlassTerrariumPage` | Osaka Neon | Sequential unlock | Your best fight and exactly how you fixed it | ok |
| 203 | `/bottle-ocean-3d` | `LoveMessageInABottleOceanPage` | Old Polaroid Attic | Mini-game with real scoring | A lantern festival where each lantern is a wish for your future | ok |
| 204 | `/couple-time-capsule-lockbox` | `LoveCoupleTimeCapsuleLockBoxPage` | Midnight Constellation | Long-press / hold interaction | Names you've joked about for future kids | ok |
| 205 | `/sweet-heart-paper-craft` | `LoveSweetHeartPaperCraftPage` | Momo Steam Kitchen | Countdown/timed reveal | A map of every place you've been together, real or planned | ok |
| 206 | `/love-wordle` | `LoveWordlePage` | Golden Hour Rooftop | Shake/tilt interaction (device motion) | A treasure chest that only opens after she answers something correctly | ok |
| 207 | `/couple-escape-room` | `CoupleEscapeRoomPage` | Handwritten Notebook | Drag-and-drop | A time she made you laugh so hard you cried | ok |
| 208 | `/love-spin-bottle` | `LoveSpinBottlePage` | Arcade Cabinet | Pure stillness page | A constellation you've named after one memory | ok |
| 209 | `/bhuntu-trivia-showdown` | `BhuntuTriviaShowdownPage` | Botanical Pressed Flowers | Tap-to-reveal / scratch-off | A photo booth strip of four real moments, styled retro | ok |
| 210 | `/love-pixel-art` | `LovePixelArtCreatorPage` | Deep Ocean Bottle-Letter | Typing/input-based | A specific festival you celebrated together or apart | ok |
| 211 | `/love-anagram-solver` | `LoveAnagramSolverPage` | Vintage Film Reel | Scroll-reveal story | A recipe card for 'what makes us work' | ok |
| 212 | `/love-photo-mosaic` | `LovePhotoMosaicBuilderPage` | Cosmic Wedding Gold | 3D/spatial scene | An interactive timeline of your entire relationship so far | ok |
| 213 | `/first-moments-timeline` | `FirstMomentsTimelinePage` | Cozy Blanket Fort | Quiz or personality test | A treasure-hunt style clue leading to a hidden message | ok |
| 214 | `/memory-constellation` | `MemoryConstellationMapPage` | Festival Lights (Tihar/Diwali) | Audio-first experience | A constellation map of her personality traits | ok |
| 215 | `/couple-yearbook` | `CoupleYearbookPage` | Watercolor Sky | Photo/video showcase | The first message you two ever exchanged | ok |
| 216 | `/love-letter-archive` | `LoveLetterArchivePage` | Retro Cassette / Y2K | Choice-based branching | A thing only you know about her that no one else does | ok |
| 217 | `/couple-soundtrack` | `CoupleSoundtrackPage` | Snow Globe Winter | Sequential unlock | A weather-vane pointing always toward her | ok |
| 218 | `/love-spell-caster` | `LoveSpellCasterPage` | Treehouse / Forest Canopy | Mini-game with real scoring | The story behind your nickname | ok |
| 219 | `/love-potion-lab` | `LovePotionLaboratoryPage` | Handmade Origami | Long-press / hold interaction | Your compatibility according to zodiac, played for laughs | ok |
| 220 | `/fairy-tale-generator` | `FairyTaleGeneratorPage` | Grand Finale Ballroom | Countdown/timed reveal | A train ticket to a place you'll go together one day | ok |
| 221 | `/enchanted-crystal-ball` | `EnchantedCrystalBallPage` | Monsoon Nepal | Shake/tilt interaction (device motion) | A coincidence that felt like fate | ok |
| 222 | `/dragon-princess-adventure` | `DragonPrincessAdventurePage` | Osaka Neon | Drag-and-drop | A top-10 list of her best qualities | ok |
| 223 | `/love-wizard-tower` | `LoveWizardTowerPage` | Old Polaroid Attic | Pure stillness page | A scoreboard of who says 'I love you' first more often | ok |
| 224 | `/love-graffiti-wall` | `LoveGraffitiWallPage` | Midnight Constellation | Tap-to-reveal / scratch-off | The moment you knew you loved her | ok |
| 225 | `/love-neon-sign` | `LoveNeonSignDesignerPage` | Momo Steam Kitchen | Typing/input-based | A page where you confess something you've never told her | ok |
| 226 | `/bhuntu-emoji-comic` | `BhuntuEmojiComicPage` | Golden Hour Rooftop | Scroll-reveal story | A candle that 'lights' when she taps it, revealing a memory | ok |
| 227 | `/love-kaleidoscope` | `LoveKaleidoscopePage` | Handwritten Notebook | 3D/spatial scene | A song that reminds you of her | ok |
| 228 | `/cherry-blossom-wish-tree` | `CherryBlossomWishTreePage` | Arcade Cabinet | Quiz or personality test | Things you miss most about her when you're apart | ok |
| 229 | `/love-advent-calendar` | `LoveAdventCalendarPage` | Botanical Pressed Flowers | Audio-first experience | A kite flying a message across a Nepalgunj sky | ok |
| 230 | `/new-year-fireworks` | `NewYearLoveFireworksPage` | Deep Ocean Bottle-Letter | Photo/video showcase | The home you imagine building together someday | ok |
| 231 | `/valentine-card-creator` | `ValentineCardCreatorPage` | Vintage Film Reel | Choice-based branching | Trivia questions about her own favorite things | ok |
| 232 | `/love-dated-calendar` | `LoveDatedCalendarPage` | Cosmic Wedding Gold | Sequential unlock | A mixtape cover she can flip through, song by song | ok |
| 233 | `/fortune-cookie-love` | `FortuneCookieLovePage` | Cozy Blanket Fort | Mini-game with real scoring | A flaw of yours she's patient with | ok |
| 234 | `/infinite-reasons` | `InfiniteReasonsMachinePage` | Festival Lights (Tihar/Diwali) | Long-press / hold interaction | An awards ceremony with categories invented just for her | ok |
| 235 | `/love-awards-night` | `LoveAwardsNightPage` | Watercolor Sky | Countdown/timed reveal | A recipe box of 'ingredients' that make up your relationship | ok |
| 236 | `/four-seasons-of-love` | `FourSeasonsOfLovePage` | Retro Cassette / Y2K | Shake/tilt interaction (device motion) | A compliment you've never said out loud until now | ok |
| 237 | `/couple-cookbook` | `CoupleCookbookPage` | Snow Globe Winter | Drag-and-drop | A weather report metaphor for how she makes you feel | ok |
| 238 | `/couple-bucket-list` | `CoupleBucketListPage` | Treehouse / Forest Canopy | Pure stillness page | A birthday countdown that's been secretly running all year | ok |
| 239 | `/grand-love-universe` | `GrandLoveUniversePage` | Handmade Origami | Tap-to-reveal / scratch-off | A challenge only she could complete | ok |
| 240 | `/sanzu-photo-gallery` | `SanzuPhotoGalleryGridPage` | Grand Finale Ballroom | Typing/input-based | A bookshelf of inside jokes disguised as book titles | ok |
| 241 | `/romantic-audio-player` | `RomanticAudioPlayerPage` | Monsoon Nepal | Scroll-reveal story | A final reflection on everything the 300 pages meant | ok |
| 242 | `/love-memory-tree-3d` | `LoveMemoryTree3DPage` | Osaka Neon | 3D/spatial scene | A list of specific reasons you chose her | ok |
| 243 | `/nepalgunj-osaka-flight` | `NepalgunjToOsakaFlightSimPage` | Old Polaroid Attic | Quiz or personality test | A museum exhibit of 'artifacts' from your relationship | ok |
| 244 | `/love-scratch-voucher-book` | `LoveScratchVoucherBookPage` | Midnight Constellation | Audio-first experience | The story behind her nickname | ok |
| 245 | `/bhuntu-voice-note-archive` | `BhuntuVoiceNoteArchivePage` | Momo Steam Kitchen | Photo/video showcase | Comparing her to something in nature she'd find funny or sweet | ok |
| 246 | `/couple-milestone-map` | `CoupleMilestoneMapPage` | Golden Hour Rooftop | Choice-based branching | A recipe for her perfect comfort day | ok |
| 247 | `/love-horoscope-wheel` | `LoveHoroscopeWheelPage` | Handwritten Notebook | Sequential unlock | A road trip or short trip you took together | ok |
| 248 | `/romantic-petal-rain` | `RomanticPetalRainPage` | Arcade Cabinet | Mini-game with real scoring | A tracker of the physical distance between you two right now | ok |
| 249 | `/love-letter-popup-3d` | `LoveLetterPopUp3DPage` | Botanical Pressed Flowers | Long-press / hold interaction | A countdown clock to your next anniversary | ok |
| 250 | `/couple-quiz-master` | `CoupleQuizMasterPage` | Deep Ocean Bottle-Letter | Countdown/timed reveal | A promise she made to you | ok |
| 251 | `/love-memory-film-strip` | `LoveMemoryFilmStripPage` | Vintage Film Reel | Photo Showcase | SanzuPhotoGalleryGrid — Masonry gallery with filter toggles | ok |
| 252 | `/love-candlelight-dinner` | `LoveCandleLightDinnerPage` | Cosmic Wedding Gold | Audio-first experience | RomanticAudioPlayer — Vintage cassette tape audio player | ok |
| 253 | `/bhuntu-nicknames-galaxy` | `BhuntuNicknamesGalaxyPage` | Cozy Blanket Fort | 3D/spatial scene | LoveMemoryTree3D — 3D Tree with swaying photo frames | ok |
| 254 | `/love-fortune-cookie-jar` | `LoveFortuneCookieJarPage` | Festival Lights (Tihar/Diwali) | Sequential unlock | NepalgunjToOsakaFlightSim — Nepalgunj to Osaka flight simulator | ok |
| 255 | `/couple-bucket-list-globe` | `CoupleBucketListGlobePage` | Watercolor Sky | Tap-to-reveal / scratch-off | LoveScratchVoucherBook — 10-page scratch-off coupon flipbook | ok |
| 256 | `/love-audio-visualizer-2` | `LoveAudioVisualizer2Page` | Retro Cassette / Y2K | Audio-first experience | BhuntuVoiceNoteArchive — WhatsApp-style voice note player with waveforms | ok |
| 257 | `/romantic-photo-slider-3d` | `RomanticPhotoSlider3DPage` | Snow Globe Winter | Sequential unlock | CoupleMilestoneMap — Interactive Nepal & Japan map | ok |
| 258 | `/bhuntu-emoji-arcade` | `BhuntuEmojiArcadePage` | Treehouse / Forest Canopy | 3D/spatial scene | LoveHoroscopeWheel — Cosmic zodiac alignment wheel | ok |
| 259 | `/love-stamp-collection` | `LoveStampCollectionPage` | Handmade Origami | Pure stillness page | RomanticPetalRain — Interactive canvas petal & blossom storm | ok |
| 260 | `/romantic-night-skywriter` | `RomanticNightSkyWriterPage` | Grand Finale Ballroom | 3D/spatial scene | LoveLetterPopUp3D — 3D Origami Pop-Up golden letter | ok |
| 261 | `/couple-recipe-book` | `CoupleRecipeBookPage` | Monsoon Nepal | Quiz or personality test | CoupleQuizMaster — 10-question master relationship quiz | ok |
| 262 | `/love-constellation-maker` | `LoveConstellationMakerPage` | Osaka Neon | Photo Showcase | LoveMemoryFilmStrip — 35mm rolling vintage film strip | ok |
| 263 | `/bhuntu-love-polaroids` | `BhuntuLovePolaroidsPage` | Old Polaroid Attic | Choice-based branching | LoveCandleLightDinner — Virtual Candlelight Dinner with momo & panipuri | ok |
| 264 | `/love-tarot-oracle-2` | `LoveTarotOracle2Page` | Midnight Constellation | 3D/spatial scene | BhuntuNicknamesGalaxy — 3D orbiting nicknames cloud | ok |
| 265 | `/romantic-locket-changer` | `RomanticLocketChangerPage` | Momo Steam Kitchen | Tap-to-reveal / scratch-off | LoveFortuneCookieJar — Endless fortune cookie jar | ok |
| 266 | `/love-crossword-puzzle` | `LoveCrosswordPuzzlePage` | Golden Hour Rooftop | 3D/spatial scene | CoupleBucketListGlobe — 3D World Globe with travel pins | ok |
| 267 | `/couple-movie-marathon` | `CoupleMovieMarathonPage` | Handwritten Notebook | Audio-first experience | LoveAudioVisualizer2 — Neon heart beat audio waveform | ok |
| 268 | `/love-language-test` | `LoveLanguageTestPage` | Arcade Cabinet | Photo Showcase | RomanticPhotoSlider3D — 3D Carousel photo slider | ok |
| 269 | `/bhuntu-personality-quiz` | `BhuntuPersonalityQuizPage` | Botanical Pressed Flowers | Mini-game with real scoring | BhuntuEmojiArcade — Whack-a-Heart emoji arcade game | ok |
| 270 | `/love-potion-brewery-2` | `LovePotionBrewery2Page` | Deep Ocean Bottle-Letter | Sequential unlock | LoveStampCollection — Vintage romance stamp album | ok |
| 271 | `/romantic-message-grid` | `RomanticMessageGridPage` | Vintage Film Reel | Typing/input-based | RomanticNightSkyWriter — Night sky neon message drawer | ok |
| 272 | `/couple-anniversary-clock` | `CoupleAnniversaryClockPage` | Cosmic Wedding Gold | Choice-based branching | CoupleRecipeBook — Recipe book for Panipuri, Momo & Noodles | ok |
| 273 | `/love-doodle-canvas` | `LoveDoodleCanvasPage` | Cozy Blanket Fort | 3D/spatial scene | LoveConstellationMaker — Star constellation painter | ok |
| 274 | `/bhuntu-comic-strip-2` | `BhuntuComicStrip2Page` | Festival Lights (Tihar/Diwali) | Drag-and-drop | BhuntuLovePolaroids — Drag-and-drop polaroid photo studio | ok |
| 275 | `/love-rhythm-drum-pad` | `LoveRhythmDrumPadPage` | Watercolor Sky | Quiz or personality test | LoveTarotOracle2 — 5-Card mystic love tarot spread | ok |
| 276 | `/romantic-flower-garden` | `RomanticFlowerGardenPage` | Retro Cassette / Y2K | Long-press / hold interaction | RomanticLocketChanger — Golden heart locket with photos inside | ok |
| 277 | `/love-wish-bottle-ocean` | `LoveWishBottleOceanPage` | Snow Globe Winter | Mini-game with real scoring | LoveCrosswordPuzzle — Romantic love crossword puzzle | ok |
| 278 | `/couple-superlatives` | `CoupleSuperlativesPage` | Treehouse / Forest Canopy | Choice-based branching | CoupleMovieMarathon — Virtual cinema theater room | ok |
| 279 | `/love-memory-cube-3d` | `LoveMemoryCube3DPage` | Handmade Origami | Quiz or personality test | LoveLanguageTest — 5 Love Languages quiz | ok |
| 280 | `/bhuntu-trivia-wheel` | `BhuntuTriviaWheelPage` | Grand Finale Ballroom | Quiz or personality test | BhuntuPersonalityQuiz — Queen Bebo personality quiz | ok |
| 281 | `/love-envelope-collection` | `LoveEnvelopeCollectionPage` | Monsoon Nepal | Mini-game with real scoring | LovePotionBrewery2 — Cauldron potion brewing lab | ok |
| 282 | `/romantic-music-box-2` | `RomanticMusicBox2Page` | Osaka Neon | Tap-to-reveal / scratch-off | RomanticMessageGrid — 100 reasons why interactive grid | ok |
| 283 | `/couple-future-home-3d` | `CoupleFutureHome3DPage` | Old Polaroid Attic | Countdown/timed reveal | CoupleAnniversaryClock — 1-Year Anniversary live precision clock | ok |
| 284 | `/love-neon-sign-gallery` | `LoveNeonSignGalleryPage` | Midnight Constellation | Typing/input-based | LoveDoodleCanvas — Glowing neon doodle canvas | ok |
| 285 | `/bhuntu-photo-mosaic-2` | `BhuntuPhotoMosaic2Page` | Momo Steam Kitchen | Scroll-reveal story | BhuntuComicStrip2 — When Abu Met Bhuntu illustrated comic | ok |
| 286 | `/love-tetris-block-puzzle` | `LoveTetrisBlockPuzzlePage` | Golden Hour Rooftop | Audio-first experience | LoveRhythmDrumPad — Heartbeat beatmaker drum pad | ok |
| 287 | `/couple-relationship-cert` | `CoupleRelationshipCertPage` | Handwritten Notebook | Long-press / hold interaction | RomanticFlowerGarden — Virtual flower bloom garden | ok |
| 288 | `/grand-love-galaxy-3d` | `GrandLoveGalaxy3DPage` | Arcade Cabinet | 3D/spatial scene | LoveWishBottleOcean — 3D Pacific Ocean drift bottle | ok |
| 289 | `/ultimate-300th-love-coronation` | `Ultimate300thLoveCoronationPage` | Botanical Pressed Flowers | Sequential unlock | CoupleSuperlatives — Couple superlative award trophies | ok |
| 290 | `/hall-of-fame` | `HallOfFamePage` | Deep Ocean Bottle-Letter | 3D/spatial scene | LoveMemoryCube3D — Rotating 3D photo cube in space | ok |
| 291 | `/bonus-arcade` | `BonusArcadePage` | Grand Finale Ballroom | Mini-game with real scoring | BhuntuTriviaWheel — Spinning birthday trivia wheel | ok |
| 292 | `/room/1` | `Room1Page` | Grand Finale Ballroom | Sequential unlock | LoveEnvelopeCollection — Stack of Open When wax-sealed letters | ok |
| 293 | `/room/2` | `Room2Page` | Grand Finale Ballroom | Audio-first experience | RomanticMusicBox2 — Ballerina wind-up music box | ok |
| 294 | `/room/3` | `Room3Page` | Grand Finale Ballroom | 3D/spatial scene | CoupleFutureHome3D — 3D future dream home designer | ok |
| 295 | `/room/4` | `Room4Page` | Grand Finale Ballroom | Typing/input-based | LoveNeonSignGallery — Custom neon light sign designer | ok |
| 296 | `/room/5` | `Room5Page` | Grand Finale Ballroom | Photo Showcase | BhuntuPhotoMosaic2 — 50-tile mega heart photo mosaic | ok |
| 297 | `/room/6` | `Room6Page` | Grand Finale Ballroom | Mini-game with real scoring | LoveTetrisBlockPuzzle — Heart block falling puzzle arcade | ok |
| 298 | `/room/7` | `Room7Page` | Grand Finale Ballroom | Sequential unlock | CoupleRelationshipCert — Official Certificate of Eternal Love | ok |
| 299 | `/room/8` | `Room8Page` | Grand Finale Ballroom | 3D/spatial scene | GrandLoveGalaxy3D — 3D Solar system of love planets | ok |
| 300 | `/room/9` | `Room9Page` | Grand Finale Ballroom | Grand Coronation | Ultimate300thLoveCoronation — THE GRAND 300TH LOVE CORONATION FINALE | ok |
| 301 | `/room/10` | `Room10Page` | Grand Finale Ballroom | Interactive Experience | Romantic Birthday Surprise | ok |
| 302 | `/room/11` | `Room11Page` | Grand Finale Ballroom | Interactive Experience | Romantic Birthday Surprise | ok |
| 303 | `/room/12` | `Room12Page` | Grand Finale Ballroom | Interactive Experience | Romantic Birthday Surprise | ok |
