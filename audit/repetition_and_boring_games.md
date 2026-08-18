# Repetition and Boring-Game Audit

This code audit scans every registered route and recursively follows its local page/component imports. It distinguishes exact source duplication from repeated UI archetypes and repeated interaction ideas.

| Measure | Count |
|---|---:|
| Registered routes | 311 |
| Sequential routes | 263 |
| Shared primary-component groups | 1 |
| Repeated interaction-idea groups | 13 |
| Repeated visual-archetype groups | 19 |
| Repeated interaction-shape groups | 8 |
| Pages flagged boring or generic | 232 |
| Roulette/spin pages | 0 |
| Game-like pages detected | 74 |

## Immediate removal queue

- page 6: **/distance** (DistancePage) — random/generator output
- page 10: **/ring** (RingSurprisePage) — random/generator output
- page 14: **/scratch-surprises** (ScratchSurprisePage) — scratch/foil mechanic|single-action low-media page
- page 16: **/catcher-game** (CatcherGamePage) — random/generator output|arcade/catch mechanic
- page 17: **/memory-match** (MemoryMatchPage) — flip/match mechanic|random/generator output
- page 12: **/quote-generator** (QuoteGeneratorPage) — random/generator output|single-action low-media page
- page 17: **/lanterns** (LanternsPage) — single-action low-media page
- page 18: **/photo-booth** (PhotoBoothPage) — random/generator output
- page 28: **/love-slots** (LoveSlotsPage) — random/generator output|single-action low-media page
- page 21: **/horoscope** (HoroscopePage) — single-action low-media page
- page 23: **/cooking-game** (CookingGamePage) — single-action low-media page
- page 35: **/word-search** (WordSearchPage) — random/generator output
- page 26: **/voice-soundboard** (VoiceSoundboardPage) — single-action low-media page
- page 38: **/tic-tac-toe** (TicTacToePage) — random/generator output|arcade/catch mechanic
- page 27: **/fireworks** (FireworksPage) — single-action low-media page
- page 40: **/timeline-quiz** (TimelinePuzzlePage) — single-action low-media page
- page 41: **/bubble-pop** (BubblePopPage) — arcade/catch mechanic
- page 30: **/affirmations** (AffirmationsPage) — flip/match mechanic
- page 31: **/love-piano** (LovePianoPage) — random/generator output
- page 34: **/fortune-cookie** (FortuneCookiePage) — random/generator output
- page 35: **/love-potion** (LovePotionPage) — random/generator output
- page 51: **/jigsaw** (JigsawPage) — random/generator output
- page 37: **/love-dice** (LoveDicePage) — random/generator output
- page 38: **/balloon-pop** (BalloonPopPage) — arcade/catch mechanic
- page 39: **/couple-bingo** (CoupleBingoPage) — single-action low-media page
- page 42: **/love-scrabble** (LoveScrabblePage) — random/generator output
- page 43: **/love-lottery** (LoveLotteryPage) — single-action low-media page
- page 45: **/secret-vault** (SecretVaultPage) — single-action low-media page
- page 46: **/love-tarot** (LoveTarotPage) — flip/match mechanic|random/generator output|single-action low-media page
- page 48: **/hug-counter** (HugCounterPage) — random/generator output
- page 49: **/love-crossword** (LoveCrosswordPage) — single-action low-media page
- page 50: **/love-radio** (LoveRadioPage) — single-action low-media page
- page 51: **/blessing-tree** (BlessingTreePage) — single-action low-media page
- page 52: **/love-vibe** (LoveVibePage) — random/generator output
- page 53: **/bento-box** (BentoBoxPage) — single-action low-media page
- page 54: **/love-coupon-generator** (LoveCouponGeneratorPage) — random/generator output
- page 55: **/star-namer** (StarNamerPage) — random/generator output
- page 58: **/kiss-collector** (KissCollectorPage) — random/generator output
- page 59: **/love-memory-flip** (LoveMemoryFlipPage) — flip/match mechanic|random/generator output
- page 62: **/mood-ring** (MoodRingPage) — single-action low-media page
- page 63: **/cupid-archery** (CupidArcheryPage) — random/generator output
- page 66: **/love-meter-deluxe** (LoveMeterDeluxePage) — single-action low-media page
- page 91: **/love-puzzle-slider** (LovePuzzleSliderPage) — random/generator output
- page 73: **/love-fireflies** (LoveFirefliesPage) — random/generator output
- page 75: **/love-wishes-sky** (LoveWishesSkyPage) — random/generator output
- page 98: **/love-memory-match** (LoveMemoryMatchPage) — flip/match mechanic|random/generator output
- page 78: **/love-fortune-cookie** (LoveFortuneCookiePage) — random/generator output
- page 79: **/love-scratch-card** (LoveScratchCardPage) — scratch/foil mechanic
- page 80: **/love-audio-visualizer** (LoveAudioVisualizerPage) — random/generator output
- page 81: **/love-photo-booth** (LovePhotoBoothPage) — random/generator output
- page 82: **/love-wish-well** (LoveWishWellPage) — single-action low-media page
- page 83: **/love-grand-finale** (LoveGrandFinalePage) — random/generator output
- page 107: **/love-map-canvas** (LoveMapCanvasPage) — random/generator output
- page 172: **/heartbeat-drum-pad** (HeartbeatDrumPadPage) — single-action low-media page
- page 84: **/paper-airplane-messenger** (PaperAirplaneMessengerPage) — random/generator output
- page 85: **/magic-8-ball-love** (Magic8BallLovePage) — random/generator output
- page 86: **/love-lock-bridge** (LoveLockBridgePage) — random/generator output
- page 87: **/cloud-skywriter** (CloudSkywriterPage) — random/generator output
- page 89: **/movie-ticket-creator** (MovieTicketCreatorPage) — random/generator output
- page 90: **/snow-globe-shaker** (SnowGlobeShakerPage) — random/generator output
- page 91: **/wish-dandelion** (WishDandelionPage) — random/generator output
- page 119: **/pixel-heart-painter** (PixelHeartPainterPage) — random/generator output
- page 92: **/romantic-charades** (RomanticCharadesPage) — random/generator output
- page 94: **/enchanted-rose-garden** (EnchantedRoseGardenPage) — random/generator output
- page 95: **/love-mad-libs** (LoveMadLibsPage) — random/generator output
- page 96: **/love-butterfly-catcher** (LoveButterflyCatcherPage) — arcade/catch mechanic|single-action low-media page
- page 97: **/romantic-karaoke** (RomanticKaraokePage) — single-action low-media page
- page 98: **/love-mirror-oracle** (LoveMirrorOraclePage) — random/generator output
- page 99: **/origami-crane** (OrigamiCranePage) — random/generator output
- page 100: **/star-drawer** (StarDrawerPage) — random/generator output
- page 102: **/bubble-wrap** (BubbleWrapPage) — random/generator output
- page 131: **/scratch-memory** (ScratchMemoryPage) — scratch/foil mechanic|random/generator output
- page 132: **/quiz-duel** (QuizDuelPage) — random/generator output
- page 103: **/love-aquarium** (LoveAquariumPage) — random/generator output
- page 105: **/coupon-vault** (CouponVaultPage) — random/generator output
- page 106: **/heart-mailbox** (HeartMailboxPage) — random/generator output
- page 107: **/star-projector** (StarProjectorPage) — random/generator output
- page 108: **/cupcake-decorator** (CupcakeDecoratorPage) — random/generator output
- page 109: **/magnetic-poetry** (MagneticPoetryPage) — random/generator output
- page 110: **/firework-maker** (FireworkMakerPage) — single-action low-media page
- page 111: **/love-clock** (LoveClockPage) — random/generator output
- page 112: **/polaroid-designer** (PolaroidDesignerPage) — random/generator output
- page 113: **/origami-boat** (OrigamiBoatPage) — random/generator output
- page 114: **/candle-blower** (CandleBlowerPage) — random/generator output
- page 115: **/royal-crown** (RoyalCrownPage) — random/generator output
- page 117: **/love-compass** (LoveCompassPage) — random/generator output
- page 148: **/word-jumble** (RomanceWordJumblePage) — random/generator output
- page 118: **/time-capsule-2** (BirthdayTimeCapsule2Page) — random/generator output
- page 119: **/love-compatibility-matrix** (LoveCompatibilityMatrixPage) — random/generator output
- page 120: **/future-house-builder** (FutureHouseBuilderPage) — random/generator output
- page 121: **/romantic-playlist-mixer** (RomanticPlaylistMixerPage) — random/generator output
- page 122: **/sweet-promises-jar** (SweetPromisesJarPage) — random/generator output
- page 123: **/love-languages-quiz** (LoveLanguagesQuizPage) — single-action low-media page
- page 126: **/love-letter-generator** (LoveLetterGeneratorPage) — random/generator output
- page 127: **/anniversary-countdown-clock** (AnniversaryCountdownClockPage) — random/generator output
- page 128: **/heart-bubble-tea-maker** (HeartBubbleTeaMakerPage) — random/generator output
- page 129: **/love-notes-wall** (LoveNotesWallPage) — random/generator output
- page 130: **/virtual-cat-cafe** (VirtualCatCafePage) — random/generator output
- page 162: **/love-quiz-personality** (LoveQuizPersonalityPage) — random/generator output
- page 132: **/love-frequency-tuner** (LoveFrequencyTunerPage) — random/generator output
- page 133: **/couples-secret-handshake** (CouplesSecretHandshakePage) — random/generator output
- page 134: **/starry-night-skywriter** (StarryNightSkywriterPage) — random/generator output
- page 135: **/romantic-cooking-recipe** (RomanticCookingRecipePage) — random/generator output
- page 136: **/love-vault-combination** (LoveVaultCombinationPage) — random/generator output
- page 137: **/sweet-voicemail-inbox** (SweetVoicemailInboxPage) — random/generator output
- page 138: **/couple-daily-horoscope** (CoupleDailyHoroscopePage) — random/generator output
- page 171: **/love-scratch-off-gallery** (LoveScratchOffGalleryPage) — scratch/foil mechanic|random/generator output
- page 172: **/heart-shape-tangram** (HeartShapeTangramPage) — random/generator output
- page 139: **/love-meteor-shower** (LoveMeteorShowerPage) — random/generator output
- page 140: **/sweet-tea-ceremony** (SweetTeaCeremonyPage) — random/generator output
- page 141: **/couple-nickname-generator** (CoupleNicknameGeneratorPage) — random/generator output
- page 142: **/love-rhythm-game** (LoveRhythmGamePage) — single-action low-media page
- page 143: **/sweet-dessert-tower** (SweetDessertTowerPage) — random/generator output
- page 144: **/love-poetry-fridge** (LovePoetryFridgePage) — random/generator output
- page 145: **/couple-travel-passport-stamps** (CoupleTravelPassportStampsPage) — random/generator output
- page 146: **/love-firework-painter** (LoveFireworkPainterPage) — single-action low-media page
- page 181: **/sweet-dream-catcher** (SweetDreamCatcherPage) — random/generator output|arcade/catch mechanic
- page 147: **/couple-questions-deep** (CoupleQuestionsDeepPage) — random/generator output
- page 148: **/love-music-box-carousel** (LoveMusicBoxCarouselPage) — random/generator output
- page 149: **/sweet-compliments-fountain** (SweetComplimentsFountainPage) — random/generator output
- page 150: **/couple-movie-night** (CoupleMovieNightPage) — random/generator output
- page 151: **/love-keychain-customizer** (LoveKeychainCustomizerPage) — random/generator output
- page 152: **/sweet-garden-blooms** (SweetGardenBloomsPage) — random/generator output
- page 153: **/couple-anniversary-timeline** (CoupleAnniversaryTimelinePage) — random/generator output
- page 154: **/love-fortune-teller-origami** (LoveFortuneTellerOrigamiPage) — random/generator output
- page 155: **/sweet-heart-balloon-ascent** (SweetHeartBalloonAscentPage) — random/generator output
- page 156: **/couple-starry-planetarium** (CoupleStarryPlanetariumPage) — random/generator output
- page 157: **/love-letter-in-balloon** (LoveLetterInBalloonPage) — random/generator output
- page 158: **/sweet-memory-scrapbook** (SweetMemoryScrapbookPage) — random/generator output
- page 159: **/love-coronation-ceremony** (LoveCoronationCeremonyPage) — random/generator output
- page 160: **/whatsapp-10k-love** (WhatsApp10kLovePage) — random/generator output
- page 161: **/cupid-radio-dj** (CupidRadioDJStationPage) — random/generator output
- page 162: **/constellation-stargazer** (LoveConstellationStargazerPage) — random/generator output
- page 163: **/heart-nebula-3d** (LoveHeartNebula3DPage) — random/generator output
- page 164: **/sweet-confectionery-bakery** (LoveSweetConfectioneryBakeryPage) — random/generator output
- page 165: **/love-story-comic-strip** (LoveLoveStoryComicStripPage) — random/generator output
- page 201: **/arcade-dance-machine** (LoveArcadeDanceMachinePage) — random/generator output|arcade/catch mechanic
- page 166: **/enchanted-glass-terrarium** (LoveEnchantedGlassTerrariumPage) — random/generator output
- page 167: **/bottle-ocean-3d** (LoveMessageInABottleOceanPage) — random/generator output
- page 168: **/couple-time-capsule-lockbox** (LoveCoupleTimeCapsuleLockBoxPage) — random/generator output
- page 169: **/sweet-heart-paper-craft** (LoveSweetHeartPaperCraftPage) — random/generator output
- page 170: **/love-wordle** (LoveWordlePage) — single-action low-media page
- page 171: **/couple-escape-room** (CoupleEscapeRoomPage) — random/generator output
- page 208: **/bhuntu-trivia-showdown** (BhuntuTriviaShowdownPage) — random/generator output
- page 173: **/love-pixel-art** (LovePixelArtCreatorPage) — random/generator output
- page 174: **/love-anagram-solver** (LoveAnagramSolverPage) — random/generator output
- page 175: **/love-photo-mosaic** (LovePhotoMosaicBuilderPage) — random/generator output
- page 176: **/first-moments-timeline** (FirstMomentsTimelinePage) — random/generator output
- page 177: **/memory-constellation** (MemoryConstellationMapPage) — random/generator output
- page 178: **/couple-yearbook** (CoupleYearbookPage) — random/generator output
- page 179: **/love-letter-archive** (LoveLetterArchivePage) — random/generator output
- page 180: **/couple-soundtrack** (CoupleSoundtrackPage) — random/generator output
- page 181: **/love-spell-caster** (LoveSpellCasterPage) — random/generator output
- page 182: **/love-potion-lab** (LovePotionLaboratoryPage) — random/generator output
- page 183: **/fairy-tale-generator** (FairyTaleGeneratorPage) — random/generator output
- page 184: **/enchanted-crystal-ball** (EnchantedCrystalBallPage) — random/generator output
- page 185: **/dragon-princess-adventure** (DragonPrincessAdventurePage) — random/generator output
- page 186: **/love-wizard-tower** (LoveWizardTowerPage) — random/generator output
- page 187: **/love-graffiti-wall** (LoveGraffitiWallPage) — random/generator output
- page 188: **/love-neon-sign** (LoveNeonSignDesignerPage) — random/generator output
- page 189: **/bhuntu-emoji-comic** (BhuntuEmojiComicPage) — random/generator output
- page 190: **/love-kaleidoscope** (LoveKaleidoscopePage) — random/generator output
- page 191: **/cherry-blossom-wish-tree** (CherryBlossomWishTreePage) — random/generator output
- page 192: **/love-advent-calendar** (LoveAdventCalendarPage) — random/generator output
- page 193: **/new-year-fireworks** (NewYearLoveFireworksPage) — random/generator output
- page 194: **/valentine-card-creator** (ValentineCardCreatorPage) — random/generator output
- page 195: **/love-dated-calendar** (LoveDatedCalendarPage) — random/generator output
- page 196: **/fortune-cookie-love** (FortuneCookieLovePage) — random/generator output
- page 197: **/infinite-reasons** (InfiniteReasonsMachinePage) — random/generator output
- page 198: **/love-awards-night** (LoveAwardsNightPage) — random/generator output
- page 199: **/four-seasons-of-love** (FourSeasonsOfLovePage) — random/generator output
- page 200: **/couple-cookbook** (CoupleCookbookPage) — random/generator output
- page 201: **/couple-bucket-list** (CoupleBucketListPage) — random/generator output
- page 202: **/grand-love-universe** (GrandLoveUniversePage) — random/generator output
- page 203: **/sanzu-photo-gallery** (SanzuPhotoGalleryGridPage) — random/generator output
- page 204: **/romantic-audio-player** (RomanticAudioPlayerPage) — random/generator output
- page 205: **/love-memory-tree-3d** (LoveMemoryTree3DPage) — random/generator output
- page 243: **/love-scratch-voucher-book** (LoveScratchVoucherBookPage) — random/generator output
- page 207: **/bhuntu-voice-note-archive** (BhuntuVoiceNoteArchivePage) — random/generator output
- page 208: **/couple-milestone-map** (CoupleMilestoneMapPage) — random/generator output
- page 209: **/romantic-petal-rain** (RomanticPetalRainPage) — random/generator output
- page 210: **/love-letter-popup-3d** (LoveLetterPopUp3DPage) — random/generator output
- page 249: **/couple-quiz-master** (CoupleQuizMasterPage) — random/generator output
- page 211: **/love-memory-film-strip** (LoveMemoryFilmStripPage) — random/generator output
- page 212: **/love-candlelight-dinner** (LoveCandleLightDinnerPage) — random/generator output
- page 213: **/bhuntu-nicknames-galaxy** (BhuntuNicknamesGalaxyPage) — random/generator output
- page 214: **/love-fortune-cookie-jar** (LoveFortuneCookieJarPage) — random/generator output
- page 215: **/couple-bucket-list-globe** (CoupleBucketListGlobePage) — random/generator output
- page 216: **/love-audio-visualizer-2** (LoveAudioVisualizer2Page) — random/generator output
- page 217: **/romantic-photo-slider-3d** (RomanticPhotoSlider3DPage) — random/generator output
- page 257: **/bhuntu-emoji-arcade** (BhuntuEmojiArcadePage) — random/generator output|arcade/catch mechanic
- page 218: **/love-stamp-collection** (LoveStampCollectionPage) — random/generator output
- page 219: **/romantic-night-skywriter** (RomanticNightSkyWriterPage) — random/generator output
- page 220: **/couple-recipe-book** (CoupleRecipeBookPage) — random/generator output
- page 221: **/love-constellation-maker** (LoveConstellationMakerPage) — random/generator output
- page 222: **/bhuntu-love-polaroids** (BhuntuLovePolaroidsPage) — random/generator output
- page 223: **/love-tarot-oracle-2** (LoveTarotOracle2Page) — flip/match mechanic|random/generator output
- page 224: **/romantic-locket-changer** (RomanticLocketChangerPage) — random/generator output
- page 265: **/love-crossword-puzzle** (LoveCrosswordPuzzlePage) — random/generator output
- page 225: **/couple-movie-marathon** (CoupleMovieMarathonPage) — random/generator output
- page 226: **/love-language-test** (LoveLanguageTestPage) — random/generator output
- page 268: **/bhuntu-personality-quiz** (BhuntuPersonalityQuizPage) — random/generator output
- page 227: **/love-potion-brewery-2** (LovePotionBrewery2Page) — random/generator output
- page 228: **/romantic-message-grid** (RomanticMessageGridPage) — random/generator output
- page 229: **/couple-anniversary-clock** (CoupleAnniversaryClockPage) — random/generator output
- page 231: **/bhuntu-comic-strip-2** (BhuntuComicStrip2Page) — random/generator output
- page 274: **/love-rhythm-drum-pad** (LoveRhythmDrumPadPage) — random/generator output
- page 232: **/romantic-flower-garden** (RomanticFlowerGardenPage) — random/generator output
- page 233: **/love-wish-bottle-ocean** (LoveWishBottleOceanPage) — random/generator output
- page 234: **/couple-superlatives** (CoupleSuperlativesPage) — random/generator output
- page 235: **/love-memory-cube-3d** (LoveMemoryCube3DPage) — random/generator output
- page 236: **/love-envelope-collection** (LoveEnvelopeCollectionPage) — random/generator output
- page 237: **/romantic-music-box-2** (RomanticMusicBox2Page) — random/generator output
- page 238: **/couple-future-home-3d** (CoupleFutureHome3DPage) — random/generator output
- page 239: **/love-neon-sign-gallery** (LoveNeonSignGalleryPage) — random/generator output
- page 240: **/bhuntu-photo-mosaic-2** (BhuntuPhotoMosaic2Page) — random/generator output
- page 244: **/love-tetris-block-puzzle** (LoveTetrisBlockPuzzlePage) — single-action low-media page
- page 241: **/couple-relationship-cert** (CoupleRelationshipCertPage) — random/generator output
- page 242: **/grand-love-galaxy-3d** (GrandLoveGalaxy3DPage) — random/generator output
- page 288: **/love-memory-match-3d** (LoveMemoryMatch3DPage) — flip/match mechanic
- page 289: **/love-scratch-off-gallery-2** (LoveScratchOffGallerySecondPage) — scratch/foil mechanic
- page 252: **/ultimate-300th-love-coronation** (Ultimate300thLoveCoronationPage) — random/generator output
- page 253: **/hall-of-fame** (HallOfFamePage) — random/generator output
- page 299: **/bonus-arcade** (BonusArcadePage) — flip/match mechanic|arcade/catch mechanic|single-action low-media page
- page 300: **/room/1** (Room1Page) — scratch/foil mechanic|random/generator output
- page 254: **/room/2** (Room2Page) — single-action low-media page
- page 257: **/room/6** (Room6Page) — single-action low-media page
- page 258: **/room/7** (Room7Page) — single-action low-media page
- page 259: **/room/8** (Room8Page) — single-action low-media page
- page 260: **/room/9** (Room9Page) — single-action low-media page
- page 261: **/room/10** (Room10Page) — single-action low-media page
- page 262: **/room/11** (Room11Page) — single-action low-media page

## Roulette and spin queue

No roulette/spin pages detected.

## Shared underlying components

### page-specific JSX (79 pages)

- page 1: / — HomePage
- page 2: /curated-journey — CuratedJourneyPage
- page 3: /story — StoryPage
- page 3: /video — VideoPage
- page 10: /ring — RingSurprisePage
- page 8: /quiz — QuizPage
- page 9: /stars — StarsPage
- page 11: /compliment-jar — ComplimentJarPage
- page 20: /bouquet-reasons — BouquetReasonsPage
- page 14: /passport — PassportPage
- page 17: /lanterns — LanternsPage
- page 20: /treasure-chest — TreasureChestPage
- page 21: /horoscope — HoroscopePage
- page 23: /cooking-game — CookingGamePage
- page 33: /future-night-ride — FutureNightRidePage
- page 26: /voice-soundboard — VoiceSoundboardPage
- page 27: /fireworks — FireworksPage
- page 40: /timeline-quiz — TimelinePuzzlePage
- page 33: /love-maze — LoveMazePage
- page 39: /couple-bingo — CoupleBingoPage
- page 43: /love-lottery — LoveLotteryPage
- page 45: /secret-vault — SecretVaultPage
- page 47: /memory-lane — MemoryLanePage
- page 49: /love-crossword — LoveCrosswordPage
- page 50: /love-radio — LoveRadioPage
- page 51: /blessing-tree — BlessingTreePage
- page 68: /couple-quiz-2 — CoupleQuiz2Page
- page 69: /promise-trio — PromiseTrioPage
- page 53: /bento-box — BentoBoxPage
- page 71: /letter-tonight — LetterTonightPage
- page 56: /love-jar-notes — LoveJarNotesPage
- page 62: /mood-ring — MoodRingPage
- page 243: /love-tetris — LoveTetrisPage
- page 65: /couple-bucket-list-2 — CoupleBucketList2Page
- page 85: /love-quiz-advanced — LoveQuizAdvancedPage
- page 66: /love-meter-deluxe — LoveMeterDeluxePage
- page 74: /love-tree-growth — LoveTreeGrowthPage
- page 79: /love-scratch-card — LoveScratchCardPage
- page 82: /love-wish-well — LoveWishWellPage
- page 172: /heartbeat-drum-pad — HeartbeatDrumPadPage
- page 124: /emoji-art-canvas — EmojiArtCanvasPage
- page 113: /secret-language — SecretLanguagePage
- page 96: /love-butterfly-catcher — LoveButterflyCatcherPage
- page 97: /romantic-karaoke — RomanticKaraokePage
- page 101: /birthday-wish-letter — BirthdayWishLetterPage
- page 104: /photo-puzzle-3d — PhotoPuzzle3DPage
- page 110: /firework-maker — FireworkMakerPage
- page 123: /love-languages-quiz — LoveLanguagesQuizPage
- page 125: /love-constellation-painter — LoveConstellationPainterPage
- page 161: /memory-replay — MemoryReplayPage
- page 131: /sweet-proposal-simulator — SweetProposalSimulatorPage
- page 142: /love-rhythm-game — LoveRhythmGamePage
- page 146: /love-firework-painter — LoveFireworkPainterPage
- page 170: /love-wordle — LoveWordlePage
- page 206: /nepalgunj-osaka-flight — NepalgunjToOsakaFlightSimPage
- page 246: /birthday-sky-letter — BirthdaySkyLetterPage
- page 230: /love-doodle-canvas — LoveDoodleCanvasPage
- page 279: /little-things-abu-notices — LittleThingsPage
- page 244: /love-tetris-block-puzzle — LoveTetrisBlockPuzzlePage
- page 288: /love-memory-match-3d — LoveMemoryMatch3DPage
- page 289: /love-scratch-off-gallery-2 — LoveScratchOffGallerySecondPage
- page 245: /love-letter-archive-vault — LoveLetterArchiveVaultPage
- page 246: /love-spell-caster-studio — LoveSpellCasterStudioPage
- page 247: /love-potion-lab-2 — LovePotionLab2Page
- page 248: /couple-milestone-map-2 — CoupleMilestoneMap2Page
- page 249: /secret-vault-2 — SecretVaultSecondPage
- page 250: /love-grand-finale-2 — LoveGrandFinaleSecondPage
- page 251: /future-house-builder-2 — FutureHouseBuilderSecondPage
- page 254: /room/2 — Room2Page
- page 255: /room/3 — Room3Page
- page 303: /room/4 — Room4Page
- page 256: /room/5 — Room5Page
- page 257: /room/6 — Room6Page
- page 258: /room/7 — Room7Page
- page 259: /room/8 — Room8Page
- page 260: /room/9 — Room9Page
- page 261: /room/10 — Room10Page
- page 262: /room/11 — Room11Page
- page 263: /room/12 — Room12Page

## Repeated interaction ideas

### random-or-generator (150 pages)

- page 6: /distance — DistancePage
- page 10: /ring — RingSurprisePage
- page 12: /quote-generator — QuoteGeneratorPage
- page 18: /photo-booth — PhotoBoothPage
- page 28: /love-slots — LoveSlotsPage
- page 34: /fortune-cookie — FortuneCookiePage
- page 35: /love-potion — LovePotionPage
- page 37: /love-dice — LoveDicePage
- page 48: /hug-counter — HugCounterPage
- page 52: /love-vibe — LoveVibePage
- page 54: /love-coupon-generator — LoveCouponGeneratorPage
- page 55: /star-namer — StarNamerPage
- page 63: /cupid-archery — CupidArcheryPage
- page 73: /love-fireflies — LoveFirefliesPage
- page 75: /love-wishes-sky — LoveWishesSkyPage
- page 78: /love-fortune-cookie — LoveFortuneCookiePage
- page 83: /love-grand-finale — LoveGrandFinalePage
- page 84: /paper-airplane-messenger — PaperAirplaneMessengerPage
- page 85: /magic-8-ball-love — Magic8BallLovePage
- page 86: /love-lock-bridge — LoveLockBridgePage
- page 87: /cloud-skywriter — CloudSkywriterPage
- page 89: /movie-ticket-creator — MovieTicketCreatorPage
- page 90: /snow-globe-shaker — SnowGlobeShakerPage
- page 91: /wish-dandelion — WishDandelionPage
- page 92: /romantic-charades — RomanticCharadesPage
- page 94: /enchanted-rose-garden — EnchantedRoseGardenPage
- page 95: /love-mad-libs — LoveMadLibsPage
- page 98: /love-mirror-oracle — LoveMirrorOraclePage
- page 99: /origami-crane — OrigamiCranePage
- page 102: /bubble-wrap — BubbleWrapPage
- page 103: /love-aquarium — LoveAquariumPage
- page 105: /coupon-vault — CouponVaultPage
- page 106: /heart-mailbox — HeartMailboxPage
- page 107: /star-projector — StarProjectorPage
- page 108: /cupcake-decorator — CupcakeDecoratorPage
- page 109: /magnetic-poetry — MagneticPoetryPage
- page 111: /love-clock — LoveClockPage
- page 112: /polaroid-designer — PolaroidDesignerPage
- page 113: /origami-boat — OrigamiBoatPage
- page 114: /candle-blower — CandleBlowerPage
- page 115: /royal-crown — RoyalCrownPage
- page 117: /love-compass — LoveCompassPage
- page 118: /time-capsule-2 — BirthdayTimeCapsule2Page
- page 119: /love-compatibility-matrix — LoveCompatibilityMatrixPage
- page 120: /future-house-builder — FutureHouseBuilderPage
- page 121: /romantic-playlist-mixer — RomanticPlaylistMixerPage
- page 122: /sweet-promises-jar — SweetPromisesJarPage
- page 126: /love-letter-generator — LoveLetterGeneratorPage
- page 127: /anniversary-countdown-clock — AnniversaryCountdownClockPage
- page 128: /heart-bubble-tea-maker — HeartBubbleTeaMakerPage
- page 129: /love-notes-wall — LoveNotesWallPage
- page 130: /virtual-cat-cafe — VirtualCatCafePage
- page 132: /love-frequency-tuner — LoveFrequencyTunerPage
- page 133: /couples-secret-handshake — CouplesSecretHandshakePage
- page 134: /starry-night-skywriter — StarryNightSkywriterPage
- page 135: /romantic-cooking-recipe — RomanticCookingRecipePage
- page 136: /love-vault-combination — LoveVaultCombinationPage
- page 137: /sweet-voicemail-inbox — SweetVoicemailInboxPage
- page 138: /couple-daily-horoscope — CoupleDailyHoroscopePage
- page 139: /love-meteor-shower — LoveMeteorShowerPage
- page 140: /sweet-tea-ceremony — SweetTeaCeremonyPage
- page 141: /couple-nickname-generator — CoupleNicknameGeneratorPage
- page 143: /sweet-dessert-tower — SweetDessertTowerPage
- page 144: /love-poetry-fridge — LovePoetryFridgePage
- page 145: /couple-travel-passport-stamps — CoupleTravelPassportStampsPage
- page 149: /sweet-compliments-fountain — SweetComplimentsFountainPage
- page 150: /couple-movie-night — CoupleMovieNightPage
- page 151: /love-keychain-customizer — LoveKeychainCustomizerPage
- page 152: /sweet-garden-blooms — SweetGardenBloomsPage
- page 153: /couple-anniversary-timeline — CoupleAnniversaryTimelinePage
- page 154: /love-fortune-teller-origami — LoveFortuneTellerOrigamiPage
- page 155: /sweet-heart-balloon-ascent — SweetHeartBalloonAscentPage
- page 156: /couple-starry-planetarium — CoupleStarryPlanetariumPage
- page 157: /love-letter-in-balloon — LoveLetterInBalloonPage
- page 158: /sweet-memory-scrapbook — SweetMemoryScrapbookPage
- page 159: /love-coronation-ceremony — LoveCoronationCeremonyPage
- page 160: /whatsapp-10k-love — WhatsApp10kLovePage
- page 161: /cupid-radio-dj — CupidRadioDJStationPage
- page 162: /constellation-stargazer — LoveConstellationStargazerPage
- page 163: /heart-nebula-3d — LoveHeartNebula3DPage
- page 164: /sweet-confectionery-bakery — LoveSweetConfectioneryBakeryPage
- page 165: /love-story-comic-strip — LoveLoveStoryComicStripPage
- page 166: /enchanted-glass-terrarium — LoveEnchantedGlassTerrariumPage
- page 167: /bottle-ocean-3d — LoveMessageInABottleOceanPage
- page 168: /couple-time-capsule-lockbox — LoveCoupleTimeCapsuleLockBoxPage
- page 169: /sweet-heart-paper-craft — LoveSweetHeartPaperCraftPage
- page 171: /couple-escape-room — CoupleEscapeRoomPage
- page 175: /love-photo-mosaic — LovePhotoMosaicBuilderPage
- page 176: /first-moments-timeline — FirstMomentsTimelinePage
- page 177: /memory-constellation — MemoryConstellationMapPage
- page 178: /couple-yearbook — CoupleYearbookPage
- page 179: /love-letter-archive — LoveLetterArchivePage
- page 180: /couple-soundtrack — CoupleSoundtrackPage
- page 181: /love-spell-caster — LoveSpellCasterPage
- page 182: /love-potion-lab — LovePotionLaboratoryPage
- page 183: /fairy-tale-generator — FairyTaleGeneratorPage
- page 184: /enchanted-crystal-ball — EnchantedCrystalBallPage
- page 185: /dragon-princess-adventure — DragonPrincessAdventurePage
- page 186: /love-wizard-tower — LoveWizardTowerPage
- page 188: /love-neon-sign — LoveNeonSignDesignerPage
- page 189: /bhuntu-emoji-comic — BhuntuEmojiComicPage
- page 190: /love-kaleidoscope — LoveKaleidoscopePage
- page 191: /cherry-blossom-wish-tree — CherryBlossomWishTreePage
- page 192: /love-advent-calendar — LoveAdventCalendarPage
- page 193: /new-year-fireworks — NewYearLoveFireworksPage
- page 194: /valentine-card-creator — ValentineCardCreatorPage
- page 195: /love-dated-calendar — LoveDatedCalendarPage
- page 196: /fortune-cookie-love — FortuneCookieLovePage
- page 197: /infinite-reasons — InfiniteReasonsMachinePage
- page 198: /love-awards-night — LoveAwardsNightPage
- page 199: /four-seasons-of-love — FourSeasonsOfLovePage
- page 200: /couple-cookbook — CoupleCookbookPage
- page 201: /couple-bucket-list — CoupleBucketListPage
- page 202: /grand-love-universe — GrandLoveUniversePage
- page 203: /sanzu-photo-gallery — SanzuPhotoGalleryGridPage
- page 205: /love-memory-tree-3d — LoveMemoryTree3DPage
- page 243: /love-scratch-voucher-book — LoveScratchVoucherBookPage
- page 207: /bhuntu-voice-note-archive — BhuntuVoiceNoteArchivePage
- page 208: /couple-milestone-map — CoupleMilestoneMapPage
- page 209: /romantic-petal-rain — RomanticPetalRainPage
- page 210: /love-letter-popup-3d — LoveLetterPopUp3DPage
- page 211: /love-memory-film-strip — LoveMemoryFilmStripPage
- page 212: /love-candlelight-dinner — LoveCandleLightDinnerPage
- page 213: /bhuntu-nicknames-galaxy — BhuntuNicknamesGalaxyPage
- page 214: /love-fortune-cookie-jar — LoveFortuneCookieJarPage
- page 215: /couple-bucket-list-globe — CoupleBucketListGlobePage
- page 217: /romantic-photo-slider-3d — RomanticPhotoSlider3DPage
- page 218: /love-stamp-collection — LoveStampCollectionPage
- page 220: /couple-recipe-book — CoupleRecipeBookPage
- page 221: /love-constellation-maker — LoveConstellationMakerPage
- page 222: /bhuntu-love-polaroids — BhuntuLovePolaroidsPage
- page 224: /romantic-locket-changer — RomanticLocketChangerPage
- page 225: /couple-movie-marathon — CoupleMovieMarathonPage
- page 226: /love-language-test — LoveLanguageTestPage
- page 227: /love-potion-brewery-2 — LovePotionBrewery2Page
- page 228: /romantic-message-grid — RomanticMessageGridPage
- page 229: /couple-anniversary-clock — CoupleAnniversaryClockPage
- page 231: /bhuntu-comic-strip-2 — BhuntuComicStrip2Page
- page 232: /romantic-flower-garden — RomanticFlowerGardenPage
- page 233: /love-wish-bottle-ocean — LoveWishBottleOceanPage
- page 234: /couple-superlatives — CoupleSuperlativesPage
- page 235: /love-memory-cube-3d — LoveMemoryCube3DPage
- page 236: /love-envelope-collection — LoveEnvelopeCollectionPage
- page 238: /couple-future-home-3d — CoupleFutureHome3DPage
- page 239: /love-neon-sign-gallery — LoveNeonSignGalleryPage
- page 240: /bhuntu-photo-mosaic-2 — BhuntuPhotoMosaic2Page
- page 241: /couple-relationship-cert — CoupleRelationshipCertPage
- page 242: /grand-love-galaxy-3d — GrandLoveGalaxy3DPage
- page 252: /ultimate-300th-love-coronation — Ultimate300thLoveCoronationPage
- page 253: /hall-of-fame — HallOfFamePage

### romantic-reveal (45 pages)

- page 1: / — HomePage
- page 3: /story — StoryPage
- page 7: /surprise — SurprisePage
- page 13: /mystery-gifts — MysteryGiftsPage
- page 17: /lanterns — LanternsPage
- page 19: /promise-tree — PromiseTreePage
- page 21: /horoscope — HoroscopePage
- page 22: /love-calculator — LoveCalculatorPage
- page 23: /cooking-game — CookingGamePage
- page 24: /love-pet — LovePetPage
- page 34: /two-truths — TwoTruthsPage
- page 28: /bucket-list — BucketListPage
- page 29: /origami — OrigamiPage
- page 36: /emoji-story — EmojiStoryPage
- page 39: /couple-bingo — CoupleBingoPage
- page 40: /love-review — LoveReviewPage
- page 41: /love-diary — LoveDiaryPage
- page 43: /love-lottery — LoveLotteryPage
- page 44: /love-tamagotchi — LoveTamagotchiPage
- page 45: /secret-vault — SecretVaultPage
- page 50: /love-radio — LoveRadioPage
- page 51: /blessing-tree — BlessingTreePage
- page 53: /bento-box — BentoBoxPage
- page 57: /sweet-compliments — SweetComplimentsPage
- page 62: /mood-ring — MoodRingPage
- page 64: /love-alarm — LoveAlarmPage
- page 66: /love-meter-deluxe — LoveMeterDeluxePage
- page 69: /love-journal-prompt — LoveJournalPromptPage
- page 71: /love-horoscope-daily — LoveHoroscopeDailyPage
- page 72: /love-recipe — LoveRecipePage
- page 74: /love-tree-growth — LoveTreeGrowthPage
- page 77: /love-origami-heart — LoveOrigamiHeartPage
- page 82: /love-wish-well — LoveWishWellPage
- page 110: /firework-maker — FireworkMakerPage
- page 116: /potion-brewery — LovePotionBreweryPage
- page 131: /sweet-proposal-simulator — SweetProposalSimulatorPage
- page 206: /nepalgunj-osaka-flight — NepalgunjToOsakaFlightSimPage
- page 254: /room/2 — Room2Page
- page 303: /room/4 — Room4Page
- page 256: /room/5 — Room5Page
- page 257: /room/6 — Room6Page
- page 259: /room/8 — Room8Page
- page 260: /room/9 — Room9Page
- page 261: /room/10 — Room10Page
- page 262: /room/11 — Room11Page

### photo-or-memory (19 pages)

- page 3: /video — VideoPage
- page 5: /bouquet — BouquetPage
- page 9: /stars — StarsPage
- page 20: /bouquet-reasons — BouquetReasonsPage
- page 20: /treasure-chest — TreasureChestPage
- page 33: /future-night-ride — FutureNightRidePage
- page 47: /memory-lane — MemoryLanePage
- page 69: /promise-trio — PromiseTrioPage
- page 65: /couple-bucket-list-2 — CoupleBucketList2Page
- page 68: /love-constellation-connect — LoveConstellationConnectPage
- page 113: /secret-language — SecretLanguagePage
- page 161: /memory-replay — MemoryReplayPage
- page 246: /love-spell-caster-studio — LoveSpellCasterStudioPage
- page 247: /love-potion-lab-2 — LovePotionLab2Page
- page 249: /secret-vault-2 — SecretVaultSecondPage
- page 250: /love-grand-finale-2 — LoveGrandFinaleSecondPage
- page 251: /future-house-builder-2 — FutureHouseBuilderSecondPage
- page 255: /room/3 — Room3Page
- page 263: /room/12 — Room12Page

### letter-or-note (14 pages)

- page 2: /gallery — GalleryPage
- page 4: /letter — LetterPage
- page 10: /time-capsule — TimeCapsulePage
- page 11: /compliment-jar — ComplimentJarPage
- page 15: /message-bottle — BottlePage
- page 27: /fireworks — FireworksPage
- page 71: /letter-tonight — LetterTonightPage
- page 56: /love-jar-notes — LoveJarNotesPage
- page 67: /love-envelope — LoveEnvelopePage
- page 101: /birthday-wish-letter — BirthdayWishLetterPage
- page 246: /birthday-sky-letter — BirthdaySkyLetterPage
- page 279: /little-things-abu-notices — LittleThingsPage
- page 245: /love-letter-archive-vault — LoveLetterArchiveVaultPage
- page 258: /room/7 — Room7Page

### audio-or-music (14 pages)

- page 16: /music-box — MusicBoxPage
- page 26: /voice-soundboard — VoiceSoundboardPage
- page 31: /love-piano — LovePianoPage
- page 60: /sound-wave — SoundWavePage
- page 70: /love-chimes — LoveChimesPage
- page 80: /love-audio-visualizer — LoveAudioVisualizerPage
- page 172: /heartbeat-drum-pad — HeartbeatDrumPadPage
- page 97: /romantic-karaoke — RomanticKaraokePage
- page 142: /love-rhythm-game — LoveRhythmGamePage
- page 148: /love-music-box-carousel — LoveMusicBoxCarouselPage
- page 204: /romantic-audio-player — RomanticAudioPlayerPage
- page 216: /love-audio-visualizer-2 — LoveAudioVisualizer2Page
- page 274: /love-rhythm-drum-pad — LoveRhythmDrumPadPage
- page 237: /romantic-music-box-2 — RomanticMusicBox2Page

### puzzle (14 pages)

- page 35: /word-search — WordSearchPage
- page 33: /love-maze — LoveMazePage
- page 51: /jigsaw — JigsawPage
- page 42: /love-scrabble — LoveScrabblePage
- page 49: /love-crossword — LoveCrosswordPage
- page 243: /love-tetris — LoveTetrisPage
- page 91: /love-puzzle-slider — LovePuzzleSliderPage
- page 104: /photo-puzzle-3d — PhotoPuzzle3DPage
- page 148: /word-jumble — RomanceWordJumblePage
- page 172: /heart-shape-tangram — HeartShapeTangramPage
- page 170: /love-wordle — LoveWordlePage
- page 174: /love-anagram-solver — LoveAnagramSolverPage
- page 265: /love-crossword-puzzle — LoveCrosswordPuzzlePage
- page 244: /love-tetris-block-puzzle — LoveTetrisBlockPuzzlePage

### quiz-or-question (12 pages)

- page 8: /quiz — QuizPage
- page 40: /timeline-quiz — TimelinePuzzlePage
- page 68: /couple-quiz-2 — CoupleQuiz2Page
- page 85: /love-quiz-advanced — LoveQuizAdvancedPage
- page 103: /love-trivia-quiz — LoveTriviaQuizPage
- page 132: /quiz-duel — QuizDuelPage
- page 123: /love-languages-quiz — LoveLanguagesQuizPage
- page 162: /love-quiz-personality — LoveQuizPersonalityPage
- page 147: /couple-questions-deep — CoupleQuestionsDeepPage
- page 208: /bhuntu-trivia-showdown — BhuntuTriviaShowdownPage
- page 249: /couple-quiz-master — CoupleQuizMasterPage
- page 268: /bhuntu-personality-quiz — BhuntuPersonalityQuizPage

### draw-or-decorate (12 pages)

- page 58: /kiss-collector — KissCollectorPage
- page 81: /love-photo-booth — LovePhotoBoothPage
- page 107: /love-map-canvas — LoveMapCanvasPage
- page 124: /emoji-art-canvas — EmojiArtCanvasPage
- page 119: /pixel-heart-painter — PixelHeartPainterPage
- page 100: /star-drawer — StarDrawerPage
- page 125: /love-constellation-painter — LoveConstellationPainterPage
- page 146: /love-firework-painter — LoveFireworkPainterPage
- page 173: /love-pixel-art — LovePixelArtCreatorPage
- page 187: /love-graffiti-wall — LoveGraffitiWallPage
- page 219: /romantic-night-skywriter — RomanticNightSkyWriterPage
- page 230: /love-doodle-canvas — LoveDoodleCanvasPage

### arcade-or-catch (8 pages)

- page 16: /catcher-game — CatcherGamePage
- page 38: /tic-tac-toe — TicTacToePage
- page 41: /bubble-pop — BubblePopPage
- page 38: /balloon-pop — BalloonPopPage
- page 96: /love-butterfly-catcher — LoveButterflyCatcherPage
- page 181: /sweet-dream-catcher — SweetDreamCatcherPage
- page 201: /arcade-dance-machine — LoveArcadeDanceMachinePage
- page 257: /bhuntu-emoji-arcade — BhuntuEmojiArcadePage

### flip-or-match (8 pages)

- page 17: /memory-match — MemoryMatchPage
- page 30: /affirmations — AffirmationsPage
- page 46: /love-tarot — LoveTarotPage
- page 59: /love-memory-flip — LoveMemoryFlipPage
- page 98: /love-memory-match — LoveMemoryMatchPage
- page 223: /love-tarot-oracle-2 — LoveTarotOracle2Page
- page 288: /love-memory-match-3d — LoveMemoryMatch3DPage
- page 299: /bonus-arcade — BonusArcadePage

### journey-or-timeline (7 pages)

- page 2: /curated-journey — CuratedJourneyPage
- page 14: /passport — PassportPage
- page 61: /love-passport-stamps — LovePassportStampsPage
- page 76: /love-time-machine — LoveTimeMachinePage
- page 88: /love-thermometer — LoveThermometerPage
- page 93: /love-achievement-badges — LoveAchievementBadgesPage
- page 248: /couple-milestone-map-2 — CoupleMilestoneMap2Page

### scratch-reveal (6 pages)

- page 14: /scratch-surprises — ScratchSurprisePage
- page 79: /love-scratch-card — LoveScratchCardPage
- page 131: /scratch-memory — ScratchMemoryPage
- page 171: /love-scratch-off-gallery — LoveScratchOffGalleryPage
- page 289: /love-scratch-off-gallery-2 — LoveScratchOffGallerySecondPage
- page 300: /room/1 — Room1Page

### builder-or-studio (2 pages)

- page 25: /wishing-well — WishingWellPage
- page 32: /wax-sealer — WaxSealerPage

## Repeated visual archetypes

### no-grid|flex-layout|rounded-cards|gradient|single-media (80 pages)

- page 6: /distance — DistancePage
- page 18: /photo-booth — PhotoBoothPage
- page 55: /star-namer — StarNamerPage
- page 68: /love-constellation-connect — LoveConstellationConnectPage
- page 81: /love-photo-booth — LovePhotoBoothPage
- page 107: /love-map-canvas — LoveMapCanvasPage
- page 85: /magic-8-ball-love — Magic8BallLovePage
- page 90: /snow-globe-shaker — SnowGlobeShakerPage
- page 92: /romantic-charades — RomanticCharadesPage
- page 95: /love-mad-libs — LoveMadLibsPage
- page 98: /love-mirror-oracle — LoveMirrorOraclePage
- page 100: /star-drawer — StarDrawerPage
- page 103: /love-aquarium — LoveAquariumPage
- page 106: /heart-mailbox — HeartMailboxPage
- page 109: /magnetic-poetry — MagneticPoetryPage
- page 112: /polaroid-designer — PolaroidDesignerPage
- page 113: /origami-boat — OrigamiBoatPage
- page 114: /candle-blower — CandleBlowerPage
- page 115: /royal-crown — RoyalCrownPage
- page 117: /love-compass — LoveCompassPage
- page 148: /word-jumble — RomanceWordJumblePage
- page 118: /time-capsule-2 — BirthdayTimeCapsule2Page
- page 121: /romantic-playlist-mixer — RomanticPlaylistMixerPage
- page 122: /sweet-promises-jar — SweetPromisesJarPage
- page 129: /love-notes-wall — LoveNotesWallPage
- page 130: /virtual-cat-cafe — VirtualCatCafePage
- page 133: /couples-secret-handshake — CouplesSecretHandshakePage
- page 134: /starry-night-skywriter — StarryNightSkywriterPage
- page 135: /romantic-cooking-recipe — RomanticCookingRecipePage
- page 136: /love-vault-combination — LoveVaultCombinationPage
- page 138: /couple-daily-horoscope — CoupleDailyHoroscopePage
- page 139: /love-meteor-shower — LoveMeteorShowerPage
- page 140: /sweet-tea-ceremony — SweetTeaCeremonyPage
- page 141: /couple-nickname-generator — CoupleNicknameGeneratorPage
- page 143: /sweet-dessert-tower — SweetDessertTowerPage
- page 147: /couple-questions-deep — CoupleQuestionsDeepPage
- page 149: /sweet-compliments-fountain — SweetComplimentsFountainPage
- page 150: /couple-movie-night — CoupleMovieNightPage
- page 152: /sweet-garden-blooms — SweetGardenBloomsPage
- page 153: /couple-anniversary-timeline — CoupleAnniversaryTimelinePage
- page 155: /sweet-heart-balloon-ascent — SweetHeartBalloonAscentPage
- page 157: /love-letter-in-balloon — LoveLetterInBalloonPage
- page 158: /sweet-memory-scrapbook — SweetMemoryScrapbookPage
- page 159: /love-coronation-ceremony — LoveCoronationCeremonyPage
- page 163: /heart-nebula-3d — LoveHeartNebula3DPage
- page 165: /love-story-comic-strip — LoveLoveStoryComicStripPage
- page 201: /arcade-dance-machine — LoveArcadeDanceMachinePage
- page 166: /enchanted-glass-terrarium — LoveEnchantedGlassTerrariumPage
- page 169: /sweet-heart-paper-craft — LoveSweetHeartPaperCraftPage
- page 171: /couple-escape-room — CoupleEscapeRoomPage
- page 176: /first-moments-timeline — FirstMomentsTimelinePage
- page 177: /memory-constellation — MemoryConstellationMapPage
- page 178: /couple-yearbook — CoupleYearbookPage
- page 182: /love-potion-lab — LovePotionLaboratoryPage
- page 183: /fairy-tale-generator — FairyTaleGeneratorPage
- page 184: /enchanted-crystal-ball — EnchantedCrystalBallPage
- page 186: /love-wizard-tower — LoveWizardTowerPage
- page 187: /love-graffiti-wall — LoveGraffitiWallPage
- page 189: /bhuntu-emoji-comic — BhuntuEmojiComicPage
- page 191: /cherry-blossom-wish-tree — CherryBlossomWishTreePage
- page 193: /new-year-fireworks — NewYearLoveFireworksPage
- page 196: /fortune-cookie-love — FortuneCookieLovePage
- page 200: /couple-cookbook — CoupleCookbookPage
- page 201: /couple-bucket-list — CoupleBucketListPage
- page 202: /grand-love-universe — GrandLoveUniversePage
- page 203: /sanzu-photo-gallery — SanzuPhotoGalleryGridPage
- page 205: /love-memory-tree-3d — LoveMemoryTree3DPage
- page 243: /love-scratch-voucher-book — LoveScratchVoucherBookPage
- page 209: /romantic-petal-rain — RomanticPetalRainPage
- page 210: /love-letter-popup-3d — LoveLetterPopUp3DPage
- page 211: /love-memory-film-strip — LoveMemoryFilmStripPage
- page 213: /bhuntu-nicknames-galaxy — BhuntuNicknamesGalaxyPage
- page 214: /love-fortune-cookie-jar — LoveFortuneCookieJarPage
- page 217: /romantic-photo-slider-3d — RomanticPhotoSlider3DPage
- page 257: /bhuntu-emoji-arcade — BhuntuEmojiArcadePage
- page 222: /bhuntu-love-polaroids — BhuntuLovePolaroidsPage
- page 228: /romantic-message-grid — RomanticMessageGridPage
- page 236: /love-envelope-collection — LoveEnvelopeCollectionPage
- page 237: /romantic-music-box-2 — RomanticMusicBox2Page
- page 252: /ultimate-300th-love-coronation — Ultimate300thLoveCoronationPage

### grid|flex-layout|rounded-cards|gradient|single-media (45 pages)

- page 33: /future-night-ride — FutureNightRidePage
- page 51: /jigsaw — JigsawPage
- page 52: /love-vibe — LoveVibePage
- page 59: /love-memory-flip — LoveMemoryFlipPage
- page 60: /sound-wave — SoundWavePage
- page 67: /love-envelope — LoveEnvelopePage
- page 98: /love-memory-match — LoveMemoryMatchPage
- page 83: /love-grand-finale — LoveGrandFinalePage
- page 86: /love-lock-bridge — LoveLockBridgePage
- page 88: /love-thermometer — LoveThermometerPage
- page 89: /movie-ticket-creator — MovieTicketCreatorPage
- page 119: /pixel-heart-painter — PixelHeartPainterPage
- page 93: /love-achievement-badges — LoveAchievementBadgesPage
- page 94: /enchanted-rose-garden — EnchantedRoseGardenPage
- page 99: /origami-crane — OrigamiCranePage
- page 102: /bubble-wrap — BubbleWrapPage
- page 131: /scratch-memory — ScratchMemoryPage
- page 132: /quiz-duel — QuizDuelPage
- page 105: /coupon-vault — CouponVaultPage
- page 107: /star-projector — StarProjectorPage
- page 108: /cupcake-decorator — CupcakeDecoratorPage
- page 111: /love-clock — LoveClockPage
- page 119: /love-compatibility-matrix — LoveCompatibilityMatrixPage
- page 120: /future-house-builder — FutureHouseBuilderPage
- page 127: /anniversary-countdown-clock — AnniversaryCountdownClockPage
- page 171: /love-scratch-off-gallery — LoveScratchOffGalleryPage
- page 161: /cupid-radio-dj — CupidRadioDJStationPage
- page 162: /constellation-stargazer — LoveConstellationStargazerPage
- page 168: /couple-time-capsule-lockbox — LoveCoupleTimeCapsuleLockBoxPage
- page 173: /love-pixel-art — LovePixelArtCreatorPage
- page 175: /love-photo-mosaic — LovePhotoMosaicBuilderPage
- page 181: /love-spell-caster — LoveSpellCasterPage
- page 198: /love-awards-night — LoveAwardsNightPage
- page 204: /romantic-audio-player — RomanticAudioPlayerPage
- page 215: /couple-bucket-list-globe — CoupleBucketListGlobePage
- page 219: /romantic-night-skywriter — RomanticNightSkyWriterPage
- page 220: /couple-recipe-book — CoupleRecipeBookPage
- page 221: /love-constellation-maker — LoveConstellationMakerPage
- page 223: /love-tarot-oracle-2 — LoveTarotOracle2Page
- page 224: /romantic-locket-changer — RomanticLocketChangerPage
- page 265: /love-crossword-puzzle — LoveCrosswordPuzzlePage
- page 225: /couple-movie-marathon — CoupleMovieMarathonPage
- page 235: /love-memory-cube-3d — LoveMemoryCube3DPage
- page 242: /grand-love-galaxy-3d — GrandLoveGalaxy3DPage
- page 253: /hall-of-fame — HallOfFamePage

### grid|flex-layout|rounded-cards|solid|single-media (44 pages)

- page 3: /video — VideoPage
- page 8: /quiz — QuizPage
- page 9: /stars — StarsPage
- page 11: /compliment-jar — ComplimentJarPage
- page 47: /memory-lane — MemoryLanePage
- page 68: /couple-quiz-2 — CoupleQuiz2Page
- page 69: /promise-trio — PromiseTrioPage
- page 56: /love-jar-notes — LoveJarNotesPage
- page 65: /couple-bucket-list-2 — CoupleBucketList2Page
- page 113: /secret-language — SecretLanguagePage
- page 162: /love-quiz-personality — LoveQuizPersonalityPage
- page 145: /couple-travel-passport-stamps — CoupleTravelPassportStampsPage
- page 148: /love-music-box-carousel — LoveMusicBoxCarouselPage
- page 154: /love-fortune-teller-origami — LoveFortuneTellerOrigamiPage
- page 164: /sweet-confectionery-bakery — LoveSweetConfectioneryBakeryPage
- page 208: /bhuntu-trivia-showdown — BhuntuTriviaShowdownPage
- page 179: /love-letter-archive — LoveLetterArchivePage
- page 192: /love-advent-calendar — LoveAdventCalendarPage
- page 194: /valentine-card-creator — ValentineCardCreatorPage
- page 195: /love-dated-calendar — LoveDatedCalendarPage
- page 199: /four-seasons-of-love — FourSeasonsOfLovePage
- page 208: /couple-milestone-map — CoupleMilestoneMapPage
- page 246: /birthday-sky-letter — BirthdaySkyLetterPage
- page 249: /couple-quiz-master — CoupleQuizMasterPage
- page 212: /love-candlelight-dinner — LoveCandleLightDinnerPage
- page 216: /love-audio-visualizer-2 — LoveAudioVisualizer2Page
- page 218: /love-stamp-collection — LoveStampCollectionPage
- page 226: /love-language-test — LoveLanguageTestPage
- page 268: /bhuntu-personality-quiz — BhuntuPersonalityQuizPage
- page 227: /love-potion-brewery-2 — LovePotionBrewery2Page
- page 229: /couple-anniversary-clock — CoupleAnniversaryClockPage
- page 231: /bhuntu-comic-strip-2 — BhuntuComicStrip2Page
- page 274: /love-rhythm-drum-pad — LoveRhythmDrumPadPage
- page 232: /romantic-flower-garden — RomanticFlowerGardenPage
- page 233: /love-wish-bottle-ocean — LoveWishBottleOceanPage
- page 234: /couple-superlatives — CoupleSuperlativesPage
- page 238: /couple-future-home-3d — CoupleFutureHome3DPage
- page 239: /love-neon-sign-gallery — LoveNeonSignGalleryPage
- page 240: /bhuntu-photo-mosaic-2 — BhuntuPhotoMosaic2Page
- page 241: /couple-relationship-cert — CoupleRelationshipCertPage
- page 288: /love-memory-match-3d — LoveMemoryMatch3DPage
- page 245: /love-letter-archive-vault — LoveLetterArchiveVaultPage
- page 247: /love-potion-lab-2 — LovePotionLab2Page
- page 248: /couple-milestone-map-2 — CoupleMilestoneMap2Page

### no-grid|flex-layout|rounded-cards|gradient|text-led (29 pages)

- page 4: /letter — LetterPage
- page 7: /surprise — SurprisePage
- page 16: /catcher-game — CatcherGamePage
- page 15: /message-bottle — BottlePage
- page 28: /love-slots — LoveSlotsPage
- page 34: /two-truths — TwoTruthsPage
- page 25: /wishing-well — WishingWellPage
- page 29: /origami — OrigamiPage
- page 30: /affirmations — AffirmationsPage
- page 31: /love-piano — LovePianoPage
- page 32: /wax-sealer — WaxSealerPage
- page 34: /fortune-cookie — FortuneCookiePage
- page 37: /love-dice — LoveDicePage
- page 40: /love-review — LoveReviewPage
- page 41: /love-diary — LoveDiaryPage
- page 48: /hug-counter — HugCounterPage
- page 58: /kiss-collector — KissCollectorPage
- page 63: /cupid-archery — CupidArcheryPage
- page 64: /love-alarm — LoveAlarmPage
- page 69: /love-journal-prompt — LoveJournalPromptPage
- page 70: /love-chimes — LoveChimesPage
- page 91: /love-puzzle-slider — LovePuzzleSliderPage
- page 73: /love-fireflies — LoveFirefliesPage
- page 75: /love-wishes-sky — LoveWishesSkyPage
- page 76: /love-time-machine — LoveTimeMachinePage
- page 77: /love-origami-heart — LoveOrigamiHeartPage
- page 78: /love-fortune-cookie — LoveFortuneCookiePage
- page 103: /love-trivia-quiz — LoveTriviaQuizPage
- page 197: /infinite-reasons — InfiniteReasonsMachinePage

### grid|simple-layout|flat-cards|solid|text-led (26 pages)

- page 21: /horoscope — HoroscopePage
- page 23: /cooking-game — CookingGamePage
- page 26: /voice-soundboard — VoiceSoundboardPage
- page 27: /fireworks — FireworksPage
- page 39: /couple-bingo — CoupleBingoPage
- page 43: /love-lottery — LoveLotteryPage
- page 45: /secret-vault — SecretVaultPage
- page 49: /love-crossword — LoveCrosswordPage
- page 50: /love-radio — LoveRadioPage
- page 51: /blessing-tree — BlessingTreePage
- page 53: /bento-box — BentoBoxPage
- page 62: /mood-ring — MoodRingPage
- page 172: /heartbeat-drum-pad — HeartbeatDrumPadPage
- page 96: /love-butterfly-catcher — LoveButterflyCatcherPage
- page 97: /romantic-karaoke — RomanticKaraokePage
- page 110: /firework-maker — FireworkMakerPage
- page 131: /sweet-proposal-simulator — SweetProposalSimulatorPage
- page 142: /love-rhythm-game — LoveRhythmGamePage
- page 170: /love-wordle — LoveWordlePage
- page 230: /love-doodle-canvas — LoveDoodleCanvasPage
- page 244: /love-tetris-block-puzzle — LoveTetrisBlockPuzzlePage
- page 303: /room/4 — Room4Page
- page 257: /room/6 — Room6Page
- page 259: /room/8 — Room8Page
- page 260: /room/9 — Room9Page
- page 262: /room/11 — Room11Page

### grid|flex-layout|rounded-cards|gradient|text-led (19 pages)

- page 1: / — HomePage
- page 10: /ring — RingSurprisePage
- page 10: /time-capsule — TimeCapsulePage
- page 14: /scratch-surprises — ScratchSurprisePage
- page 17: /memory-match — MemoryMatchPage
- page 13: /mystery-gifts — MysteryGiftsPage
- page 16: /music-box — MusicBoxPage
- page 19: /promise-tree — PromiseTreePage
- page 22: /love-calculator — LoveCalculatorPage
- page 35: /word-search — WordSearchPage
- page 41: /bubble-pop — BubblePopPage
- page 28: /bucket-list — BucketListPage
- page 35: /love-potion — LovePotionPage
- page 42: /love-scrabble — LoveScrabblePage
- page 46: /love-tarot — LoveTarotPage
- page 54: /love-coupon-generator — LoveCouponGeneratorPage
- page 80: /love-audio-visualizer — LoveAudioVisualizerPage
- page 124: /emoji-art-canvas — EmojiArtCanvasPage
- page 132: /love-frequency-tuner — LoveFrequencyTunerPage

### no-grid|flex-layout|rounded-cards|solid|single-media (13 pages)

- page 126: /love-letter-generator — LoveLetterGeneratorPage
- page 128: /heart-bubble-tea-maker — HeartBubbleTeaMakerPage
- page 137: /sweet-voicemail-inbox — SweetVoicemailInboxPage
- page 172: /heart-shape-tangram — HeartShapeTangramPage
- page 144: /love-poetry-fridge — LovePoetryFridgePage
- page 181: /sweet-dream-catcher — SweetDreamCatcherPage
- page 151: /love-keychain-customizer — LoveKeychainCustomizerPage
- page 156: /couple-starry-planetarium — CoupleStarryPlanetariumPage
- page 160: /whatsapp-10k-love — WhatsApp10kLovePage
- page 174: /love-anagram-solver — LoveAnagramSolverPage
- page 180: /couple-soundtrack — CoupleSoundtrackPage
- page 185: /dragon-princess-adventure — DragonPrincessAdventurePage
- page 207: /bhuntu-voice-note-archive — BhuntuVoiceNoteArchivePage

### grid|simple-layout|rounded-cards|solid|single-media (7 pages)

- page 20: /bouquet-reasons — BouquetReasonsPage
- page 14: /passport — PassportPage
- page 85: /love-quiz-advanced — LoveQuizAdvancedPage
- page 104: /photo-puzzle-3d — PhotoPuzzle3DPage
- page 279: /little-things-abu-notices — LittleThingsPage
- page 289: /love-scratch-off-gallery-2 — LoveScratchOffGallerySecondPage
- page 246: /love-spell-caster-studio — LoveSpellCasterStudioPage

### grid|simple-layout|flat-cards|solid|single-media (6 pages)

- page 20: /treasure-chest — TreasureChestPage
- page 79: /love-scratch-card — LoveScratchCardPage
- page 161: /memory-replay — MemoryReplayPage
- page 249: /secret-vault-2 — SecretVaultSecondPage
- page 251: /future-house-builder-2 — FutureHouseBuilderSecondPage
- page 255: /room/3 — Room3Page

### no-grid|simple-layout|flat-cards|solid|text-led (6 pages)

- page 66: /love-meter-deluxe — LoveMeterDeluxePage
- page 123: /love-languages-quiz — LoveLanguagesQuizPage
- page 254: /room/2 — Room2Page
- page 256: /room/5 — Room5Page
- page 258: /room/7 — Room7Page
- page 261: /room/10 — Room10Page

### grid|flex-layout|rounded-cards|gradient|photo-led (5 pages)

- page 2: /gallery — GalleryPage
- page 5: /bouquet — BouquetPage
- page 38: /tic-tac-toe — TicTacToePage
- page 84: /paper-airplane-messenger — PaperAirplaneMessengerPage
- page 190: /love-kaleidoscope — LoveKaleidoscopePage

### no-grid|flex-layout|flat-cards|gradient|text-led (5 pages)

- page 12: /quote-generator — QuoteGeneratorPage
- page 71: /love-horoscope-daily — LoveHoroscopeDailyPage
- page 72: /love-recipe — LoveRecipePage
- page 116: /potion-brewery — LovePotionBreweryPage
- page 300: /room/1 — Room1Page

### no-grid|flex-layout|rounded-cards|solid|text-led (4 pages)

- page 24: /love-pet — LovePetPage
- page 36: /emoji-story — EmojiStoryPage
- page 38: /balloon-pop — BalloonPopPage
- page 44: /love-tamagotchi — LoveTamagotchiPage

### grid|flex-layout|rounded-cards|solid|text-led (3 pages)

- page 2: /curated-journey — CuratedJourneyPage
- page 206: /nepalgunj-osaka-flight — NepalgunjToOsakaFlightSimPage
- page 299: /bonus-arcade — BonusArcadePage

### grid|simple-layout|flat-cards|gradient|text-led (3 pages)

- page 17: /lanterns — LanternsPage
- page 82: /love-wish-well — LoveWishWellPage
- page 146: /love-firework-painter — LoveFireworkPainterPage

### grid|simple-layout|rounded-cards|solid|text-led (3 pages)

- page 33: /love-maze — LoveMazePage
- page 243: /love-tetris — LoveTetrisPage
- page 74: /love-tree-growth — LoveTreeGrowthPage

### no-grid|flex-layout|rounded-cards|gradient|photo-led (3 pages)

- page 87: /cloud-skywriter — CloudSkywriterPage
- page 91: /wish-dandelion — WishDandelionPage
- page 167: /bottle-ocean-3d — LoveMessageInABottleOceanPage

### no-grid|simple-layout|flat-cards|gradient|text-led (2 pages)

- page 57: /sweet-compliments — SweetComplimentsPage
- page 61: /love-passport-stamps — LovePassportStampsPage

### grid|simple-layout|rounded-cards|gradient|single-media (2 pages)

- page 101: /birthday-wish-letter — BirthdayWishLetterPage
- page 125: /love-constellation-painter — LoveConstellationPainterPage

## Repeated interaction shapes

### several-buttons|local-state|random-output|motion-or-gesture (110 pages)

- page 10: /ring — RingSurprisePage
- page 16: /catcher-game — CatcherGamePage
- page 18: /photo-booth — PhotoBoothPage
- page 35: /word-search — WordSearchPage
- page 38: /tic-tac-toe — TicTacToePage
- page 31: /love-piano — LovePianoPage
- page 35: /love-potion — LovePotionPage
- page 51: /jigsaw — JigsawPage
- page 37: /love-dice — LoveDicePage
- page 42: /love-scrabble — LoveScrabblePage
- page 52: /love-vibe — LoveVibePage
- page 55: /star-namer — StarNamerPage
- page 58: /kiss-collector — KissCollectorPage
- page 59: /love-memory-flip — LoveMemoryFlipPage
- page 91: /love-puzzle-slider — LovePuzzleSliderPage
- page 75: /love-wishes-sky — LoveWishesSkyPage
- page 98: /love-memory-match — LoveMemoryMatchPage
- page 78: /love-fortune-cookie — LoveFortuneCookiePage
- page 80: /love-audio-visualizer — LoveAudioVisualizerPage
- page 81: /love-photo-booth — LovePhotoBoothPage
- page 83: /love-grand-finale — LoveGrandFinalePage
- page 84: /paper-airplane-messenger — PaperAirplaneMessengerPage
- page 85: /magic-8-ball-love — Magic8BallLovePage
- page 86: /love-lock-bridge — LoveLockBridgePage
- page 87: /cloud-skywriter — CloudSkywriterPage
- page 89: /movie-ticket-creator — MovieTicketCreatorPage
- page 90: /snow-globe-shaker — SnowGlobeShakerPage
- page 91: /wish-dandelion — WishDandelionPage
- page 119: /pixel-heart-painter — PixelHeartPainterPage
- page 92: /romantic-charades — RomanticCharadesPage
- page 94: /enchanted-rose-garden — EnchantedRoseGardenPage
- page 98: /love-mirror-oracle — LoveMirrorOraclePage
- page 99: /origami-crane — OrigamiCranePage
- page 100: /star-drawer — StarDrawerPage
- page 102: /bubble-wrap — BubbleWrapPage
- page 131: /scratch-memory — ScratchMemoryPage
- page 132: /quiz-duel — QuizDuelPage
- page 103: /love-aquarium — LoveAquariumPage
- page 106: /heart-mailbox — HeartMailboxPage
- page 107: /star-projector — StarProjectorPage
- page 108: /cupcake-decorator — CupcakeDecoratorPage
- page 109: /magnetic-poetry — MagneticPoetryPage
- page 111: /love-clock — LoveClockPage
- page 112: /polaroid-designer — PolaroidDesignerPage
- page 113: /origami-boat — OrigamiBoatPage
- page 114: /candle-blower — CandleBlowerPage
- page 115: /royal-crown — RoyalCrownPage
- page 117: /love-compass — LoveCompassPage
- page 118: /time-capsule-2 — BirthdayTimeCapsule2Page
- page 119: /love-compatibility-matrix — LoveCompatibilityMatrixPage
- page 120: /future-house-builder — FutureHouseBuilderPage
- page 122: /sweet-promises-jar — SweetPromisesJarPage
- page 128: /heart-bubble-tea-maker — HeartBubbleTeaMakerPage
- page 130: /virtual-cat-cafe — VirtualCatCafePage
- page 132: /love-frequency-tuner — LoveFrequencyTunerPage
- page 133: /couples-secret-handshake — CouplesSecretHandshakePage
- page 134: /starry-night-skywriter — StarryNightSkywriterPage
- page 135: /romantic-cooking-recipe — RomanticCookingRecipePage
- page 136: /love-vault-combination — LoveVaultCombinationPage
- page 138: /couple-daily-horoscope — CoupleDailyHoroscopePage
- page 172: /heart-shape-tangram — HeartShapeTangramPage
- page 139: /love-meteor-shower — LoveMeteorShowerPage
- page 140: /sweet-tea-ceremony — SweetTeaCeremonyPage
- page 143: /sweet-dessert-tower — SweetDessertTowerPage
- page 145: /couple-travel-passport-stamps — CoupleTravelPassportStampsPage
- page 149: /sweet-compliments-fountain — SweetComplimentsFountainPage
- page 150: /couple-movie-night — CoupleMovieNightPage
- page 152: /sweet-garden-blooms — SweetGardenBloomsPage
- page 154: /love-fortune-teller-origami — LoveFortuneTellerOrigamiPage
- page 159: /love-coronation-ceremony — LoveCoronationCeremonyPage
- page 160: /whatsapp-10k-love — WhatsApp10kLovePage
- page 161: /cupid-radio-dj — CupidRadioDJStationPage
- page 167: /bottle-ocean-3d — LoveMessageInABottleOceanPage
- page 168: /couple-time-capsule-lockbox — LoveCoupleTimeCapsuleLockBoxPage
- page 169: /sweet-heart-paper-craft — LoveSweetHeartPaperCraftPage
- page 171: /couple-escape-room — CoupleEscapeRoomPage
- page 208: /bhuntu-trivia-showdown — BhuntuTriviaShowdownPage
- page 173: /love-pixel-art — LovePixelArtCreatorPage
- page 174: /love-anagram-solver — LoveAnagramSolverPage
- page 175: /love-photo-mosaic — LovePhotoMosaicBuilderPage
- page 176: /first-moments-timeline — FirstMomentsTimelinePage
- page 181: /love-spell-caster — LoveSpellCasterPage
- page 182: /love-potion-lab — LovePotionLaboratoryPage
- page 185: /dragon-princess-adventure — DragonPrincessAdventurePage
- page 186: /love-wizard-tower — LoveWizardTowerPage
- page 187: /love-graffiti-wall — LoveGraffitiWallPage
- page 188: /love-neon-sign — LoveNeonSignDesignerPage
- page 196: /fortune-cookie-love — FortuneCookieLovePage
- page 202: /grand-love-universe — GrandLoveUniversePage
- page 204: /romantic-audio-player — RomanticAudioPlayerPage
- page 243: /love-scratch-voucher-book — LoveScratchVoucherBookPage
- page 210: /love-letter-popup-3d — LoveLetterPopUp3DPage
- page 249: /couple-quiz-master — CoupleQuizMasterPage
- page 211: /love-memory-film-strip — LoveMemoryFilmStripPage
- page 213: /bhuntu-nicknames-galaxy — BhuntuNicknamesGalaxyPage
- page 214: /love-fortune-cookie-jar — LoveFortuneCookieJarPage
- page 215: /couple-bucket-list-globe — CoupleBucketListGlobePage
- page 217: /romantic-photo-slider-3d — RomanticPhotoSlider3DPage
- page 257: /bhuntu-emoji-arcade — BhuntuEmojiArcadePage
- page 219: /romantic-night-skywriter — RomanticNightSkyWriterPage
- page 220: /couple-recipe-book — CoupleRecipeBookPage
- page 221: /love-constellation-maker — LoveConstellationMakerPage
- page 223: /love-tarot-oracle-2 — LoveTarotOracle2Page
- page 224: /romantic-locket-changer — RomanticLocketChangerPage
- page 265: /love-crossword-puzzle — LoveCrosswordPuzzlePage
- page 225: /couple-movie-marathon — CoupleMovieMarathonPage
- page 236: /love-envelope-collection — LoveEnvelopeCollectionPage
- page 237: /romantic-music-box-2 — RomanticMusicBox2Page
- page 252: /ultimate-300th-love-coronation — Ultimate300thLoveCoronationPage
- page 253: /hall-of-fame — HallOfFamePage

### single-interaction|local-state|random-output|motion-or-gesture (74 pages)

- page 6: /distance — DistancePage
- page 17: /memory-match — MemoryMatchPage
- page 28: /love-slots — LoveSlotsPage
- page 34: /fortune-cookie — FortuneCookiePage
- page 48: /hug-counter — HugCounterPage
- page 63: /cupid-archery — CupidArcheryPage
- page 73: /love-fireflies — LoveFirefliesPage
- page 95: /love-mad-libs — LoveMadLibsPage
- page 105: /coupon-vault — CouponVaultPage
- page 148: /word-jumble — RomanceWordJumblePage
- page 121: /romantic-playlist-mixer — RomanticPlaylistMixerPage
- page 126: /love-letter-generator — LoveLetterGeneratorPage
- page 127: /anniversary-countdown-clock — AnniversaryCountdownClockPage
- page 129: /love-notes-wall — LoveNotesWallPage
- page 162: /love-quiz-personality — LoveQuizPersonalityPage
- page 137: /sweet-voicemail-inbox — SweetVoicemailInboxPage
- page 171: /love-scratch-off-gallery — LoveScratchOffGalleryPage
- page 141: /couple-nickname-generator — CoupleNicknameGeneratorPage
- page 144: /love-poetry-fridge — LovePoetryFridgePage
- page 181: /sweet-dream-catcher — SweetDreamCatcherPage
- page 147: /couple-questions-deep — CoupleQuestionsDeepPage
- page 148: /love-music-box-carousel — LoveMusicBoxCarouselPage
- page 151: /love-keychain-customizer — LoveKeychainCustomizerPage
- page 153: /couple-anniversary-timeline — CoupleAnniversaryTimelinePage
- page 155: /sweet-heart-balloon-ascent — SweetHeartBalloonAscentPage
- page 156: /couple-starry-planetarium — CoupleStarryPlanetariumPage
- page 157: /love-letter-in-balloon — LoveLetterInBalloonPage
- page 158: /sweet-memory-scrapbook — SweetMemoryScrapbookPage
- page 162: /constellation-stargazer — LoveConstellationStargazerPage
- page 163: /heart-nebula-3d — LoveHeartNebula3DPage
- page 164: /sweet-confectionery-bakery — LoveSweetConfectioneryBakeryPage
- page 165: /love-story-comic-strip — LoveLoveStoryComicStripPage
- page 201: /arcade-dance-machine — LoveArcadeDanceMachinePage
- page 166: /enchanted-glass-terrarium — LoveEnchantedGlassTerrariumPage
- page 177: /memory-constellation — MemoryConstellationMapPage
- page 178: /couple-yearbook — CoupleYearbookPage
- page 179: /love-letter-archive — LoveLetterArchivePage
- page 180: /couple-soundtrack — CoupleSoundtrackPage
- page 183: /fairy-tale-generator — FairyTaleGeneratorPage
- page 184: /enchanted-crystal-ball — EnchantedCrystalBallPage
- page 191: /cherry-blossom-wish-tree — CherryBlossomWishTreePage
- page 192: /love-advent-calendar — LoveAdventCalendarPage
- page 193: /new-year-fireworks — NewYearLoveFireworksPage
- page 194: /valentine-card-creator — ValentineCardCreatorPage
- page 195: /love-dated-calendar — LoveDatedCalendarPage
- page 197: /infinite-reasons — InfiniteReasonsMachinePage
- page 198: /love-awards-night — LoveAwardsNightPage
- page 199: /four-seasons-of-love — FourSeasonsOfLovePage
- page 200: /couple-cookbook — CoupleCookbookPage
- page 201: /couple-bucket-list — CoupleBucketListPage
- page 205: /love-memory-tree-3d — LoveMemoryTree3DPage
- page 207: /bhuntu-voice-note-archive — BhuntuVoiceNoteArchivePage
- page 208: /couple-milestone-map — CoupleMilestoneMapPage
- page 209: /romantic-petal-rain — RomanticPetalRainPage
- page 212: /love-candlelight-dinner — LoveCandleLightDinnerPage
- page 216: /love-audio-visualizer-2 — LoveAudioVisualizer2Page
- page 218: /love-stamp-collection — LoveStampCollectionPage
- page 222: /bhuntu-love-polaroids — BhuntuLovePolaroidsPage
- page 226: /love-language-test — LoveLanguageTestPage
- page 268: /bhuntu-personality-quiz — BhuntuPersonalityQuizPage
- page 227: /love-potion-brewery-2 — LovePotionBrewery2Page
- page 228: /romantic-message-grid — RomanticMessageGridPage
- page 229: /couple-anniversary-clock — CoupleAnniversaryClockPage
- page 231: /bhuntu-comic-strip-2 — BhuntuComicStrip2Page
- page 274: /love-rhythm-drum-pad — LoveRhythmDrumPadPage
- page 232: /romantic-flower-garden — RomanticFlowerGardenPage
- page 233: /love-wish-bottle-ocean — LoveWishBottleOceanPage
- page 234: /couple-superlatives — CoupleSuperlativesPage
- page 235: /love-memory-cube-3d — LoveMemoryCube3DPage
- page 238: /couple-future-home-3d — CoupleFutureHome3DPage
- page 239: /love-neon-sign-gallery — LoveNeonSignGalleryPage
- page 240: /bhuntu-photo-mosaic-2 — BhuntuPhotoMosaic2Page
- page 241: /couple-relationship-cert — CoupleRelationshipCertPage
- page 242: /grand-love-galaxy-3d — GrandLoveGalaxy3DPage

### single-interaction|local-state|deterministic|tap-or-click (71 pages)

- page 9: /stars — StarsPage
- page 11: /compliment-jar — ComplimentJarPage
- page 12: /quote-generator — QuoteGeneratorPage
- page 20: /bouquet-reasons — BouquetReasonsPage
- page 14: /passport — PassportPage
- page 17: /lanterns — LanternsPage
- page 20: /treasure-chest — TreasureChestPage
- page 21: /horoscope — HoroscopePage
- page 23: /cooking-game — CookingGamePage
- page 33: /future-night-ride — FutureNightRidePage
- page 26: /voice-soundboard — VoiceSoundboardPage
- page 27: /fireworks — FireworksPage
- page 40: /timeline-quiz — TimelinePuzzlePage
- page 33: /love-maze — LoveMazePage
- page 39: /couple-bingo — CoupleBingoPage
- page 43: /love-lottery — LoveLotteryPage
- page 45: /secret-vault — SecretVaultPage
- page 47: /memory-lane — MemoryLanePage
- page 49: /love-crossword — LoveCrosswordPage
- page 50: /love-radio — LoveRadioPage
- page 51: /blessing-tree — BlessingTreePage
- page 68: /couple-quiz-2 — CoupleQuiz2Page
- page 69: /promise-trio — PromiseTrioPage
- page 53: /bento-box — BentoBoxPage
- page 56: /love-jar-notes — LoveJarNotesPage
- page 61: /love-passport-stamps — LovePassportStampsPage
- page 62: /mood-ring — MoodRingPage
- page 65: /couple-bucket-list-2 — CoupleBucketList2Page
- page 85: /love-quiz-advanced — LoveQuizAdvancedPage
- page 66: /love-meter-deluxe — LoveMeterDeluxePage
- page 74: /love-tree-growth — LoveTreeGrowthPage
- page 79: /love-scratch-card — LoveScratchCardPage
- page 82: /love-wish-well — LoveWishWellPage
- page 172: /heartbeat-drum-pad — HeartbeatDrumPadPage
- page 124: /emoji-art-canvas — EmojiArtCanvasPage
- page 113: /secret-language — SecretLanguagePage
- page 96: /love-butterfly-catcher — LoveButterflyCatcherPage
- page 97: /romantic-karaoke — RomanticKaraokePage
- page 101: /birthday-wish-letter — BirthdayWishLetterPage
- page 104: /photo-puzzle-3d — PhotoPuzzle3DPage
- page 110: /firework-maker — FireworkMakerPage
- page 123: /love-languages-quiz — LoveLanguagesQuizPage
- page 125: /love-constellation-painter — LoveConstellationPainterPage
- page 161: /memory-replay — MemoryReplayPage
- page 131: /sweet-proposal-simulator — SweetProposalSimulatorPage
- page 142: /love-rhythm-game — LoveRhythmGamePage
- page 146: /love-firework-painter — LoveFireworkPainterPage
- page 206: /nepalgunj-osaka-flight — NepalgunjToOsakaFlightSimPage
- page 246: /birthday-sky-letter — BirthdaySkyLetterPage
- page 230: /love-doodle-canvas — LoveDoodleCanvasPage
- page 279: /little-things-abu-notices — LittleThingsPage
- page 244: /love-tetris-block-puzzle — LoveTetrisBlockPuzzlePage
- page 289: /love-scratch-off-gallery-2 — LoveScratchOffGallerySecondPage
- page 245: /love-letter-archive-vault — LoveLetterArchiveVaultPage
- page 246: /love-spell-caster-studio — LoveSpellCasterStudioPage
- page 247: /love-potion-lab-2 — LovePotionLab2Page
- page 248: /couple-milestone-map-2 — CoupleMilestoneMap2Page
- page 249: /secret-vault-2 — SecretVaultSecondPage
- page 250: /love-grand-finale-2 — LoveGrandFinaleSecondPage
- page 251: /future-house-builder-2 — FutureHouseBuilderSecondPage
- page 254: /room/2 — Room2Page
- page 255: /room/3 — Room3Page
- page 303: /room/4 — Room4Page
- page 256: /room/5 — Room5Page
- page 257: /room/6 — Room6Page
- page 258: /room/7 — Room7Page
- page 259: /room/8 — Room8Page
- page 260: /room/9 — Room9Page
- page 261: /room/10 — Room10Page
- page 262: /room/11 — Room11Page
- page 263: /room/12 — Room12Page

### several-buttons|local-state|deterministic|motion-or-gesture (20 pages)

- page 1: / — HomePage
- page 7: /surprise — SurprisePage
- page 13: /mystery-gifts — MysteryGiftsPage
- page 15: /message-bottle — BottlePage
- page 19: /promise-tree — PromiseTreePage
- page 24: /love-pet — LovePetPage
- page 34: /two-truths — TwoTruthsPage
- page 25: /wishing-well — WishingWellPage
- page 41: /bubble-pop — BubblePopPage
- page 29: /origami — OrigamiPage
- page 30: /affirmations — AffirmationsPage
- page 32: /wax-sealer — WaxSealerPage
- page 44: /love-tamagotchi — LoveTamagotchiPage
- page 60: /sound-wave — SoundWavePage
- page 68: /love-constellation-connect — LoveConstellationConnectPage
- page 69: /love-journal-prompt — LoveJournalPromptPage
- page 70: /love-chimes — LoveChimesPage
- page 76: /love-time-machine — LoveTimeMachinePage
- page 88: /love-thermometer — LoveThermometerPage
- page 93: /love-achievement-badges — LoveAchievementBadgesPage

### single-interaction|local-state|deterministic|motion-or-gesture (13 pages)

- page 16: /music-box — MusicBoxPage
- page 36: /emoji-story — EmojiStoryPage
- page 38: /balloon-pop — BalloonPopPage
- page 40: /love-review — LoveReviewPage
- page 41: /love-diary — LoveDiaryPage
- page 46: /love-tarot — LoveTarotPage
- page 71: /letter-tonight — LetterTonightPage
- page 57: /sweet-compliments — SweetComplimentsPage
- page 243: /love-tetris — LoveTetrisPage
- page 103: /love-trivia-quiz — LoveTriviaQuizPage
- page 116: /potion-brewery — LovePotionBreweryPage
- page 170: /love-wordle — LoveWordlePage
- page 288: /love-memory-match-3d — LoveMemoryMatch3DPage

### several-buttons|local-state|deterministic|tap-or-click (10 pages)

- page 2: /curated-journey — CuratedJourneyPage
- page 3: /story — StoryPage
- page 3: /video — VideoPage
- page 4: /letter — LetterPage
- page 5: /bouquet — BouquetPage
- page 8: /quiz — QuizPage
- page 10: /time-capsule — TimeCapsulePage
- page 22: /love-calculator — LoveCalculatorPage
- page 71: /love-horoscope-daily — LoveHoroscopeDailyPage
- page 72: /love-recipe — LoveRecipePage

### many-buttons|local-state|deterministic|motion-or-gesture (4 pages)

- page 28: /bucket-list — BucketListPage
- page 64: /love-alarm — LoveAlarmPage
- page 67: /love-envelope — LoveEnvelopePage
- page 77: /love-origami-heart — LoveOrigamiHeartPage

### many-buttons|local-state|random-output|motion-or-gesture (4 pages)

- page 54: /love-coupon-generator — LoveCouponGeneratorPage
- page 107: /love-map-canvas — LoveMapCanvasPage
- page 189: /bhuntu-emoji-comic — BhuntuEmojiComicPage
- page 203: /sanzu-photo-gallery — SanzuPhotoGalleryGridPage


## Game-like pages

- page 8: **/quiz** — quiz-or-question; no immediate boring signal
- page 14: **/scratch-surprises** — scratch-reveal; scratch/foil mechanic|single-action low-media page
- page 16: **/catcher-game** — arcade-or-catch; random/generator output|arcade/catch mechanic
- page 17: **/memory-match** — flip-or-match; flip/match mechanic|random/generator output
- page 16: **/music-box** — audio-or-music; no immediate boring signal
- page 35: **/word-search** — puzzle; random/generator output
- page 26: **/voice-soundboard** — audio-or-music; single-action low-media page
- page 38: **/tic-tac-toe** — arcade-or-catch; random/generator output|arcade/catch mechanic
- page 40: **/timeline-quiz** — quiz-or-question; single-action low-media page
- page 41: **/bubble-pop** — arcade-or-catch; arcade/catch mechanic
- page 30: **/affirmations** — flip-or-match; flip/match mechanic
- page 31: **/love-piano** — audio-or-music; random/generator output
- page 33: **/love-maze** — puzzle; no immediate boring signal
- page 51: **/jigsaw** — puzzle; random/generator output
- page 38: **/balloon-pop** — arcade-or-catch; arcade/catch mechanic
- page 42: **/love-scrabble** — puzzle; random/generator output
- page 46: **/love-tarot** — flip-or-match; flip/match mechanic|random/generator output|single-action low-media page
- page 49: **/love-crossword** — puzzle; single-action low-media page
- page 68: **/couple-quiz-2** — quiz-or-question; no immediate boring signal
- page 58: **/kiss-collector** — draw-or-decorate; random/generator output
- page 59: **/love-memory-flip** — flip-or-match; flip/match mechanic|random/generator output
- page 60: **/sound-wave** — audio-or-music; no immediate boring signal
- page 243: **/love-tetris** — puzzle; no immediate boring signal
- page 85: **/love-quiz-advanced** — quiz-or-question; no immediate boring signal
- page 70: **/love-chimes** — audio-or-music; no immediate boring signal
- page 91: **/love-puzzle-slider** — puzzle; random/generator output
- page 98: **/love-memory-match** — flip-or-match; flip/match mechanic|random/generator output
- page 79: **/love-scratch-card** — scratch-reveal; scratch/foil mechanic
- page 80: **/love-audio-visualizer** — audio-or-music; random/generator output
- page 103: **/love-trivia-quiz** — quiz-or-question; no immediate boring signal
- page 81: **/love-photo-booth** — draw-or-decorate; random/generator output
- page 107: **/love-map-canvas** — draw-or-decorate; random/generator output
- page 172: **/heartbeat-drum-pad** — audio-or-music; single-action low-media page
- page 124: **/emoji-art-canvas** — draw-or-decorate; no immediate boring signal
- page 119: **/pixel-heart-painter** — draw-or-decorate; random/generator output
- page 96: **/love-butterfly-catcher** — arcade-or-catch; arcade/catch mechanic|single-action low-media page
- page 97: **/romantic-karaoke** — audio-or-music; single-action low-media page
- page 100: **/star-drawer** — draw-or-decorate; random/generator output
- page 131: **/scratch-memory** — scratch-reveal; scratch/foil mechanic|random/generator output
- page 132: **/quiz-duel** — quiz-or-question; random/generator output
- page 104: **/photo-puzzle-3d** — puzzle; no immediate boring signal
- page 148: **/word-jumble** — puzzle; random/generator output
- page 123: **/love-languages-quiz** — quiz-or-question; single-action low-media page
- page 125: **/love-constellation-painter** — draw-or-decorate; no immediate boring signal
- page 162: **/love-quiz-personality** — quiz-or-question; random/generator output
- page 171: **/love-scratch-off-gallery** — scratch-reveal; scratch/foil mechanic|random/generator output
- page 172: **/heart-shape-tangram** — puzzle; random/generator output
- page 142: **/love-rhythm-game** — audio-or-music; single-action low-media page
- page 146: **/love-firework-painter** — draw-or-decorate; single-action low-media page
- page 181: **/sweet-dream-catcher** — arcade-or-catch; random/generator output|arcade/catch mechanic
- page 147: **/couple-questions-deep** — quiz-or-question; random/generator output
- page 148: **/love-music-box-carousel** — audio-or-music; random/generator output
- page 201: **/arcade-dance-machine** — arcade-or-catch; random/generator output|arcade/catch mechanic
- page 170: **/love-wordle** — puzzle; single-action low-media page
- page 208: **/bhuntu-trivia-showdown** — quiz-or-question; random/generator output
- page 173: **/love-pixel-art** — draw-or-decorate; random/generator output
- page 174: **/love-anagram-solver** — puzzle; random/generator output
- page 187: **/love-graffiti-wall** — draw-or-decorate; random/generator output
- page 204: **/romantic-audio-player** — audio-or-music; random/generator output
- page 249: **/couple-quiz-master** — quiz-or-question; random/generator output
- page 216: **/love-audio-visualizer-2** — audio-or-music; random/generator output
- page 257: **/bhuntu-emoji-arcade** — arcade-or-catch; random/generator output|arcade/catch mechanic
- page 219: **/romantic-night-skywriter** — draw-or-decorate; random/generator output
- page 223: **/love-tarot-oracle-2** — flip-or-match; flip/match mechanic|random/generator output
- page 265: **/love-crossword-puzzle** — puzzle; random/generator output
- page 268: **/bhuntu-personality-quiz** — quiz-or-question; random/generator output
- page 230: **/love-doodle-canvas** — draw-or-decorate; no immediate boring signal
- page 274: **/love-rhythm-drum-pad** — audio-or-music; random/generator output
- page 237: **/romantic-music-box-2** — audio-or-music; random/generator output
- page 244: **/love-tetris-block-puzzle** — puzzle; single-action low-media page
- page 288: **/love-memory-match-3d** — flip-or-match; flip/match mechanic
- page 289: **/love-scratch-off-gallery-2** — scratch-reveal; scratch/foil mechanic
- page 299: **/bonus-arcade** — flip-or-match; flip/match mechanic|arcade/catch mechanic|single-action low-media page
- page 300: **/room/1** — scratch-reveal; scratch/foil mechanic|random/generator output
