import React, { useState, lazy, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import RouteGuard from './components/RouteGuard';
import Navbar from './components/Navbar';
import PageFooter from './components/PageFooter';
import EasterEggModal from './components/EasterEggModal';
import PersonalGiftLayer from './components/PersonalGiftLayer';
import IndependentPageStage from './components/IndependentPageStage';

const HomePage = lazy(() => import('./pages/HomePage'));
const CuratedJourneyPage = lazy(() => import('./pages/CuratedJourneyPage'));
const Room1Page = lazy(() => import('./pages/Room1Page'));
const Room2Page = lazy(() => import('./pages/Room2Page'));
const Room3Page = lazy(() => import('./pages/Room3Page'));
const Room4Page = lazy(() => import('./pages/Room4Page'));
const Room5Page = lazy(() => import('./pages/Room5Page'));
const Room6Page = lazy(() => import('./pages/Room6Page'));
const Room7Page = lazy(() => import('./pages/Room7Page'));
const Room8Page = lazy(() => import('./pages/Room8Page'));
const Room9Page = lazy(() => import('./pages/Room9Page'));
const Room10Page = lazy(() => import('./pages/Room10Page'));
const Room11Page = lazy(() => import('./pages/Room11Page'));
const Room12Page = lazy(() => import('./pages/Room12Page'));

const StoryPage = lazy(() => import('./pages/StoryPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const LetterPage = lazy(() => import('./pages/LetterPage'));
const BouquetPage = lazy(() => import('./pages/BouquetPage'));
const DistancePage = lazy(() => import('./pages/DistancePage'));
const SurprisePage = lazy(() => import('./pages/SurprisePage'));
const RingSurprisePage = lazy(() => import('./pages/RingSurprisePage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const StarsPage = lazy(() => import('./pages/StarsPage'));
const TimeCapsulePage = lazy(() => import('./pages/TimeCapsulePage'));
const ScratchSurprisePage = lazy(() => import('./pages/ScratchSurprisePage'));
const ComplimentJarPage = lazy(() => import('./pages/ComplimentJarPage'));
const CatcherGamePage = lazy(() => import('./pages/CatcherGamePage'));
const MemoryMatchPage = lazy(() => import('./pages/MemoryMatchPage'));
const QuoteGeneratorPage = lazy(() => import('./pages/QuoteGeneratorPage'));
const MysteryGiftsPage = lazy(() => import('./pages/MysteryGiftsPage'));
const PassportPage = lazy(() => import('./pages/PassportPage'));
const BottlePage = lazy(() => import('./pages/BottlePage'));
const MusicBoxPage = lazy(() => import('./pages/MusicBoxPage'));
const LanternsPage = lazy(() => import('./pages/LanternsPage'));
const PhotoBoothPage = lazy(() => import('./pages/PhotoBoothPage'));
const PromiseTreePage = lazy(() => import('./pages/PromiseTreePage'));
const TreasureChestPage = lazy(() => import('./pages/TreasureChestPage'));
const LoveSlotsPage = lazy(() => import('./pages/LoveSlotsPage'));
const HoroscopePage = lazy(() => import('./pages/HoroscopePage'));
const LoveCalculatorPage = lazy(() => import('./pages/LoveCalculatorPage'));
const CookingGamePage = lazy(() => import('./pages/CookingGamePage'));
const LovePetPage = lazy(() => import('./pages/LovePetPage'));
const TwoTruthsPage = lazy(() => import('./pages/TwoTruthsPage'));
const WordSearchPage = lazy(() => import('./pages/WordSearchPage'));
const WishingWellPage = lazy(() => import('./pages/WishingWellPage'));
const VoiceSoundboardPage = lazy(() => import('./pages/VoiceSoundboardPage'));
const TicTacToePage = lazy(() => import('./pages/TicTacToePage'));
const FireworksPage = lazy(() => import('./pages/FireworksPage'));
const TimelinePuzzlePage = lazy(() => import('./pages/TimelinePuzzlePage'));
const BubblePopPage = lazy(() => import('./pages/BubblePopPage'));
const BucketListPage = lazy(() => import('./pages/BucketListPage'));
const OrigamiPage = lazy(() => import('./pages/OrigamiPage'));
const AffirmationsPage = lazy(() => import('./pages/AffirmationsPage'));
const LovePianoPage = lazy(() => import('./pages/LovePianoPage'));
const WaxSealerPage = lazy(() => import('./pages/WaxSealerPage'));
const HallOfFamePage = lazy(() => import('./pages/HallOfFamePage'));
const LoveMazePage = lazy(() => import('./pages/LoveMazePage'));
const FortuneCookiePage = lazy(() => import('./pages/FortuneCookiePage'));
const LovePotionPage = lazy(() => import('./pages/LovePotionPage'));
const EmojiStoryPage = lazy(() => import('./pages/EmojiStoryPage'));
const JigsawPage = lazy(() => import('./pages/JigsawPage'));
const BonusArcadePage = lazy(() => import('./pages/BonusArcadePage'));
const LoveDicePage = lazy(() => import('./pages/LoveDicePage'));
const BalloonPopPage = lazy(() => import('./pages/BalloonPopPage'));
const CoupleBingoPage = lazy(() => import('./pages/CoupleBingoPage'));
const LoveReviewPage = lazy(() => import('./pages/LoveReviewPage'));
const LoveDiaryPage = lazy(() => import('./pages/LoveDiaryPage'));
const LoveScrabblePage = lazy(() => import('./pages/LoveScrabblePage'));
const LoveLotteryPage = lazy(() => import('./pages/LoveLotteryPage'));
const LoveTamagotchiPage = lazy(() => import('./pages/LoveTamagotchiPage'));
const SecretVaultPage = lazy(() => import('./pages/SecretVaultPage'));
const LoveTarotPage = lazy(() => import('./pages/LoveTarotPage'));
const MemoryLanePage = lazy(() => import('./pages/MemoryLanePage'));
const HugCounterPage = lazy(() => import('./pages/HugCounterPage'));
const LoveCrosswordPage = lazy(() => import('./pages/LoveCrosswordPage'));
const LoveRadioPage = lazy(() => import('./pages/LoveRadioPage'));
const BlessingTreePage = lazy(() => import('./pages/BlessingTreePage'));
const LoveVibePage = lazy(() => import('./pages/LoveVibePage'));
const CoupleQuiz2Page = lazy(() => import('./pages/CoupleQuiz2Page'));
const BentoBoxPage = lazy(() => import('./pages/BentoBoxPage'));
const LoveCouponGeneratorPage = lazy(() => import('./pages/LoveCouponGeneratorPage'));
const StarNamerPage = lazy(() => import('./pages/StarNamerPage'));
const LoveJarNotesPage = lazy(() => import('./pages/LoveJarNotesPage'));
const SweetComplimentsPage = lazy(() => import('./pages/SweetComplimentsPage'));
const KissCollectorPage = lazy(() => import('./pages/KissCollectorPage'));
const LoveMemoryFlipPage = lazy(() => import('./pages/LoveMemoryFlipPage'));
const SoundWavePage = lazy(() => import('./pages/SoundWavePage'));
const LovePassportStampsPage = lazy(() => import('./pages/LovePassportStampsPage'));
const MoodRingPage = lazy(() => import('./pages/MoodRingPage'));
const LoveTetrisPage = lazy(() => import('./pages/LoveTetrisPage'));
const CupidArcheryPage = lazy(() => import('./pages/CupidArcheryPage'));
const LoveAlarmPage = lazy(() => import('./pages/LoveAlarmPage'));
const CoupleBucketList2Page = lazy(() => import('./pages/CoupleBucketList2Page'));
const LoveQuizAdvancedPage = lazy(() => import('./pages/LoveQuizAdvancedPage'));
const LoveMeterDeluxePage = lazy(() => import('./pages/LoveMeterDeluxePage'));
const LoveEnvelopePage = lazy(() => import('./pages/LoveEnvelopePage'));
const LoveConstellationConnectPage = lazy(() => import('./pages/LoveConstellationConnectPage'));
const LoveJournalPromptPage = lazy(() => import('./pages/LoveJournalPromptPage'));
const LoveChimesPage = lazy(() => import('./pages/LoveChimesPage'));
const LovePuzzleSliderPage = lazy(() => import('./pages/LovePuzzleSliderPage'));
const LoveHoroscopeDailyPage = lazy(() => import('./pages/LoveHoroscopeDailyPage'));
const LoveRecipePage = lazy(() => import('./pages/LoveRecipePage'));
const LoveFirefliesPage = lazy(() => import('./pages/LoveFirefliesPage'));
const LoveTreeGrowthPage = lazy(() => import('./pages/LoveTreeGrowthPage'));
const LoveWishesSkyPage = lazy(() => import('./pages/LoveWishesSkyPage'));
const LoveTimeMachinePage = lazy(() => import('./pages/LoveTimeMachinePage'));
const LoveMemoryMatchPage = lazy(() => import('./pages/LoveMemoryMatchPage'));
const LoveOrigamiHeartPage = lazy(() => import('./pages/LoveOrigamiHeartPage'));
const LoveFortuneCookiePage = lazy(() => import('./pages/LoveFortuneCookiePage'));
const LoveScratchCardPage = lazy(() => import('./pages/LoveScratchCardPage'));
const LoveAudioVisualizerPage = lazy(() => import('./pages/LoveAudioVisualizerPage'));
const LoveTriviaQuizPage = lazy(() => import('./pages/LoveTriviaQuizPage'));
const LovePhotoBoothPage = lazy(() => import('./pages/LovePhotoBoothPage'));
const LoveWishWellPage = lazy(() => import('./pages/LoveWishWellPage'));
const LoveGrandFinalePage = lazy(() => import('./pages/LoveGrandFinalePage'));

const LoveMapCanvasPage = lazy(() => import('./pages/LoveMapCanvasPage'));
const HeartbeatDrumPadPage = lazy(() => import('./pages/HeartbeatDrumPadPage'));
const PaperAirplaneMessengerPage = lazy(() => import('./pages/PaperAirplaneMessengerPage'));
const EmojiArtCanvasPage = lazy(() => import('./pages/EmojiArtCanvasPage'));
const Magic8BallLovePage = lazy(() => import('./pages/Magic8BallLovePage'));
const LoveLockBridgePage = lazy(() => import('./pages/LoveLockBridgePage'));
const CloudSkywriterPage = lazy(() => import('./pages/CloudSkywriterPage'));
const LoveThermometerPage = lazy(() => import('./pages/LoveThermometerPage'));
const MovieTicketCreatorPage = lazy(() => import('./pages/MovieTicketCreatorPage'));
const SnowGlobeShakerPage = lazy(() => import('./pages/SnowGlobeShakerPage'));
const WishDandelionPage = lazy(() => import('./pages/WishDandelionPage'));
const PixelHeartPainterPage = lazy(() => import('./pages/PixelHeartPainterPage'));
const RomanticCharadesPage = lazy(() => import('./pages/RomanticCharadesPage'));
const LoveAchievementBadgesPage = lazy(() => import('./pages/LoveAchievementBadgesPage'));
const EnchantedRoseGardenPage = lazy(() => import('./pages/EnchantedRoseGardenPage'));
const LoveMadLibsPage = lazy(() => import('./pages/LoveMadLibsPage'));
const LoveButterflyCatcherPage = lazy(() => import('./pages/LoveButterflyCatcherPage'));
const RomanticKaraokePage = lazy(() => import('./pages/RomanticKaraokePage'));
const LoveMirrorOraclePage = lazy(() => import('./pages/LoveMirrorOraclePage'));

const OrigamiCranePage = lazy(() => import('./pages/OrigamiCranePage'));
const StarDrawerPage = lazy(() => import('./pages/StarDrawerPage'));
const BubbleWrapPage = lazy(() => import('./pages/BubbleWrapPage'));
const ScratchMemoryPage = lazy(() => import('./pages/ScratchMemoryPage'));
const QuizDuelPage = lazy(() => import('./pages/QuizDuelPage'));
const LoveAquariumPage = lazy(() => import('./pages/LoveAquariumPage'));
const PhotoPuzzle3DPage = lazy(() => import('./pages/PhotoPuzzle3DPage'));
const CouponVaultPage = lazy(() => import('./pages/CouponVaultPage'));
const HeartMailboxPage = lazy(() => import('./pages/HeartMailboxPage'));
const StarProjectorPage = lazy(() => import('./pages/StarProjectorPage'));
const CupcakeDecoratorPage = lazy(() => import('./pages/CupcakeDecoratorPage'));
const MagneticPoetryPage = lazy(() => import('./pages/MagneticPoetryPage'));
const FireworkMakerPage = lazy(() => import('./pages/FireworkMakerPage'));
const LoveClockPage = lazy(() => import('./pages/LoveClockPage'));
const PolaroidDesignerPage = lazy(() => import('./pages/PolaroidDesignerPage'));
const OrigamiBoatPage = lazy(() => import('./pages/OrigamiBoatPage'));
const CandleBlowerPage = lazy(() => import('./pages/CandleBlowerPage'));
const RoyalCrownPage = lazy(() => import('./pages/RoyalCrownPage'));
const LovePotionBreweryPage = lazy(() => import('./pages/LovePotionBreweryPage'));
const LoveCompassPage = lazy(() => import('./pages/LoveCompassPage'));
const RomanceWordJumblePage = lazy(() => import('./pages/RomanceWordJumblePage'));
const BirthdayTimeCapsule2Page = lazy(() => import('./pages/BirthdayTimeCapsule2Page'));

const LoveCompatibilityMatrixPage = lazy(() => import('./pages/LoveCompatibilityMatrixPage'));
const FutureHouseBuilderPage = lazy(() => import('./pages/FutureHouseBuilderPage'));
const RomanticPlaylistMixerPage = lazy(() => import('./pages/RomanticPlaylistMixerPage'));
const SweetPromisesJarPage = lazy(() => import('./pages/SweetPromisesJarPage'));
const LoveLanguagesQuizPage = lazy(() => import('./pages/LoveLanguagesQuizPage'));
const LoveConstellationPainterPage = lazy(() => import('./pages/LoveConstellationPainterPage'));
const LoveLetterGeneratorPage = lazy(() => import('./pages/LoveLetterGeneratorPage'));
const AnniversaryCountdownClockPage = lazy(() => import('./pages/AnniversaryCountdownClockPage'));
const HeartBubbleTeaMakerPage = lazy(() => import('./pages/HeartBubbleTeaMakerPage'));
const LoveNotesWallPage = lazy(() => import('./pages/LoveNotesWallPage'));
const VirtualCatCafePage = lazy(() => import('./pages/VirtualCatCafePage'));
const LoveQuizPersonalityPage = lazy(() => import('./pages/LoveQuizPersonalityPage'));
const SweetProposalSimulatorPage = lazy(() => import('./pages/SweetProposalSimulatorPage'));
const LoveFrequencyTunerPage = lazy(() => import('./pages/LoveFrequencyTunerPage'));
const CouplesSecretHandshakePage = lazy(() => import('./pages/CouplesSecretHandshakePage'));
const StarryNightSkywriterPage = lazy(() => import('./pages/StarryNightSkywriterPage'));
const RomanticCookingRecipePage = lazy(() => import('./pages/RomanticCookingRecipePage'));
const LoveVaultCombinationPage = lazy(() => import('./pages/LoveVaultCombinationPage'));
const SweetVoicemailInboxPage = lazy(() => import('./pages/SweetVoicemailInboxPage'));
const CoupleDailyHoroscopePage = lazy(() => import('./pages/CoupleDailyHoroscopePage'));
const LoveScratchOffGalleryPage = lazy(() => import('./pages/LoveScratchOffGalleryPage'));
const HeartShapeTangramPage = lazy(() => import('./pages/HeartShapeTangramPage'));
const LoveMeteorShowerPage = lazy(() => import('./pages/LoveMeteorShowerPage'));
const SweetTeaCeremonyPage = lazy(() => import('./pages/SweetTeaCeremonyPage'));
const CoupleNicknameGeneratorPage = lazy(() => import('./pages/CoupleNicknameGeneratorPage'));
const LoveRhythmGamePage = lazy(() => import('./pages/LoveRhythmGamePage'));
const SweetDessertTowerPage = lazy(() => import('./pages/SweetDessertTowerPage'));
const LovePoetryFridgePage = lazy(() => import('./pages/LovePoetryFridgePage'));
const CoupleTravelPassportStampsPage = lazy(() => import('./pages/CoupleTravelPassportStampsPage'));
const LoveFireworkPainterPage = lazy(() => import('./pages/LoveFireworkPainterPage'));
const SweetDreamCatcherPage = lazy(() => import('./pages/SweetDreamCatcherPage'));
const CoupleQuestionsDeepPage = lazy(() => import('./pages/CoupleQuestionsDeepPage'));
const LoveMusicBoxCarouselPage = lazy(() => import('./pages/LoveMusicBoxCarouselPage'));
const SweetComplimentsFountainPage = lazy(() => import('./pages/SweetComplimentsFountainPage'));
const CoupleMovieNightPage = lazy(() => import('./pages/CoupleMovieNightPage'));
const LoveKeychainCustomizerPage = lazy(() => import('./pages/LoveKeychainCustomizerPage'));
const SweetGardenBloomsPage = lazy(() => import('./pages/SweetGardenBloomsPage'));
const CoupleAnniversaryTimelinePage = lazy(() => import('./pages/CoupleAnniversaryTimelinePage'));
const LoveFortuneTellerOrigamiPage = lazy(() => import('./pages/LoveFortuneTellerOrigamiPage'));
const SweetHeartBalloonAscentPage = lazy(() => import('./pages/SweetHeartBalloonAscentPage'));
const CoupleStarryPlanetariumPage = lazy(() => import('./pages/CoupleStarryPlanetariumPage'));
const LoveLetterInBalloonPage = lazy(() => import('./pages/LoveLetterInBalloonPage'));
const SweetMemoryScrapbookPage = lazy(() => import('./pages/SweetMemoryScrapbookPage'));
const LoveCoronationCeremonyPage = lazy(() => import('./pages/LoveCoronationCeremonyPage'));

const WhatsApp10kLovePage = lazy(() => import('./pages/WhatsApp10kLovePage'));
const CupidRadioDJStationPage = lazy(() => import('./pages/CupidRadioDJStationPage'));
const LoveConstellationStargazerPage = lazy(() => import('./pages/LoveConstellationStargazerPage'));
const LoveHeartNebula3DPage = lazy(() => import('./pages/LoveHeartNebula3DPage'));
const LoveSweetConfectioneryBakeryPage = lazy(() => import('./pages/LoveSweetConfectioneryBakeryPage'));
const LoveLoveStoryComicStripPage = lazy(() => import('./pages/LoveLoveStoryComicStripPage'));
const LoveArcadeDanceMachinePage = lazy(() => import('./pages/LoveArcadeDanceMachinePage'));
const LoveEnchantedGlassTerrariumPage = lazy(() => import('./pages/LoveEnchantedGlassTerrariumPage'));
const LoveMessageInABottleOceanPage = lazy(() => import('./pages/LoveMessageInABottleOceanPage'));
const LoveCoupleTimeCapsuleLockBoxPage = lazy(() => import('./pages/LoveCoupleTimeCapsuleLockBoxPage'));
const LoveSweetHeartPaperCraftPage = lazy(() => import('./pages/LoveSweetHeartPaperCraftPage'));

// ✨ NEW PAGES 219–250 — Photo-Rich Birthday Expansion ✨
const LoveWordlePage = lazy(() => import('./pages/LoveWordlePage'));
const CoupleEscapeRoomPage = lazy(() => import('./pages/CoupleEscapeRoomPage'));
const BhuntuTriviaShowdownPage = lazy(() => import('./pages/BhuntuTriviaShowdownPage'));
const LovePixelArtCreatorPage = lazy(() => import('./pages/LovePixelArtCreatorPage'));
const LoveAnagramSolverPage = lazy(() => import('./pages/LoveAnagramSolverPage'));
const LovePhotoMosaicBuilderPage = lazy(() => import('./pages/LovePhotoMosaicBuilderPage'));
const FirstMomentsTimelinePage = lazy(() => import('./pages/FirstMomentsTimelinePage'));
const MemoryConstellationMapPage = lazy(() => import('./pages/MemoryConstellationMapPage'));
const CoupleYearbookPage = lazy(() => import('./pages/CoupleYearbookPage'));
const LoveLetterArchivePage = lazy(() => import('./pages/LoveLetterArchivePage'));
const CoupleSoundtrackPage = lazy(() => import('./pages/CoupleSoundtrackPage'));
const LoveSpellCasterPage = lazy(() => import('./pages/LoveSpellCasterPage'));
const LovePotionLaboratoryPage = lazy(() => import('./pages/LovePotionLaboratoryPage'));
const FairyTaleGeneratorPage = lazy(() => import('./pages/FairyTaleGeneratorPage'));
const EnchantedCrystalBallPage = lazy(() => import('./pages/EnchantedCrystalBallPage'));
const DragonPrincessAdventurePage = lazy(() => import('./pages/DragonPrincessAdventurePage'));
const LoveWizardTowerPage = lazy(() => import('./pages/LoveWizardTowerPage'));
const LoveGraffitiWallPage = lazy(() => import('./pages/LoveGraffitiWallPage'));
const LoveNeonSignDesignerPage = lazy(() => import('./pages/LoveNeonSignDesignerPage'));
const BhuntuEmojiComicPage = lazy(() => import('./pages/BhuntuEmojiComicPage'));
const LoveKaleidoscopePage = lazy(() => import('./pages/LoveKaleidoscopePage'));
const CherryBlossomWishTreePage = lazy(() => import('./pages/CherryBlossomWishTreePage'));
const LoveAdventCalendarPage = lazy(() => import('./pages/LoveAdventCalendarPage'));
const NewYearLoveFireworksPage = lazy(() => import('./pages/NewYearLoveFireworksPage'));
const ValentineCardCreatorPage = lazy(() => import('./pages/ValentineCardCreatorPage'));
const LoveDatedCalendarPage = lazy(() => import('./pages/LoveDatedCalendarPage'));
const FortuneCookieLovePage = lazy(() => import('./pages/FortuneCookieLovePage'));
const InfiniteReasonsMachinePage = lazy(() => import('./pages/InfiniteReasonsMachinePage'));
const LoveAwardsNightPage = lazy(() => import('./pages/LoveAwardsNightPage'));
const FourSeasonsOfLovePage = lazy(() => import('./pages/FourSeasonsOfLovePage'));
const CoupleCookbookPage = lazy(() => import('./pages/CoupleCookbookPage'));
const CoupleBucketListPage = lazy(() => import('./pages/CoupleBucketListPage'));
const GrandLoveUniversePage = lazy(() => import('./pages/GrandLoveUniversePage'));

// ✨ NEW PAGES 251–300 — Ultimate 300 Web Pages Expansion ✨
const SanzuPhotoGalleryGridPage = lazy(() => import('./pages/SanzuPhotoGalleryGridPage'));
const RomanticAudioPlayerPage = lazy(() => import('./pages/RomanticAudioPlayerPage'));
const LoveMemoryTree3DPage = lazy(() => import('./pages/LoveMemoryTree3DPage'));
const NepalgunjToOsakaFlightSimPage = lazy(() => import('./pages/NepalgunjToOsakaFlightSimPage'));
const LoveScratchVoucherBookPage = lazy(() => import('./pages/LoveScratchVoucherBookPage'));
const BhuntuVoiceNoteArchivePage = lazy(() => import('./pages/BhuntuVoiceNoteArchivePage'));
const CoupleMilestoneMapPage = lazy(() => import('./pages/CoupleMilestoneMapPage'));
const RomanticPetalRainPage = lazy(() => import('./pages/RomanticPetalRainPage'));
const LoveLetterPopUp3DPage = lazy(() => import('./pages/LoveLetterPopUp3DPage'));
const CoupleQuizMasterPage = lazy(() => import('./pages/CoupleQuizMasterPage'));
const LoveMemoryFilmStripPage = lazy(() => import('./pages/LoveMemoryFilmStripPage'));
const LoveCandleLightDinnerPage = lazy(() => import('./pages/LoveCandleLightDinnerPage'));
const BhuntuNicknamesGalaxyPage = lazy(() => import('./pages/BhuntuNicknamesGalaxyPage'));
const LoveFortuneCookieJarPage = lazy(() => import('./pages/LoveFortuneCookieJarPage'));
const CoupleBucketListGlobePage = lazy(() => import('./pages/CoupleBucketListGlobePage'));
const LoveAudioVisualizer2Page = lazy(() => import('./pages/LoveAudioVisualizer2Page'));
const RomanticPhotoSlider3DPage = lazy(() => import('./pages/RomanticPhotoSlider3DPage'));
const BhuntuEmojiArcadePage = lazy(() => import('./pages/BhuntuEmojiArcadePage'));
const LoveStampCollectionPage = lazy(() => import('./pages/LoveStampCollectionPage'));
const RomanticNightSkyWriterPage = lazy(() => import('./pages/RomanticNightSkyWriterPage'));
const CoupleRecipeBookPage = lazy(() => import('./pages/CoupleRecipeBookPage'));
const LoveConstellationMakerPage = lazy(() => import('./pages/LoveConstellationMakerPage'));
const BhuntuLovePolaroidsPage = lazy(() => import('./pages/BhuntuLovePolaroidsPage'));
const LoveTarotOracle2Page = lazy(() => import('./pages/LoveTarotOracle2Page'));
const RomanticLocketChangerPage = lazy(() => import('./pages/RomanticLocketChangerPage'));
const LoveCrosswordPuzzlePage = lazy(() => import('./pages/LoveCrosswordPuzzlePage'));
const CoupleMovieMarathonPage = lazy(() => import('./pages/CoupleMovieMarathonPage'));
const LoveLanguageTestPage = lazy(() => import('./pages/LoveLanguageTestPage'));
const BhuntuPersonalityQuizPage = lazy(() => import('./pages/BhuntuPersonalityQuizPage'));
const LovePotionBrewery2Page = lazy(() => import('./pages/LovePotionBrewery2Page'));
const RomanticMessageGridPage = lazy(() => import('./pages/RomanticMessageGridPage'));
const CoupleAnniversaryClockPage = lazy(() => import('./pages/CoupleAnniversaryClockPage'));
const LoveDoodleCanvasPage = lazy(() => import('./pages/LoveDoodleCanvasPage'));
const BhuntuComicStrip2Page = lazy(() => import('./pages/BhuntuComicStrip2Page'));
const LoveRhythmDrumPadPage = lazy(() => import('./pages/LoveRhythmDrumPadPage'));
const RomanticFlowerGardenPage = lazy(() => import('./pages/RomanticFlowerGardenPage'));
const LoveWishBottleOceanPage = lazy(() => import('./pages/LoveWishBottleOceanPage'));
const CoupleSuperlativesPage = lazy(() => import('./pages/CoupleSuperlativesPage'));
const LoveMemoryCube3DPage = lazy(() => import('./pages/LoveMemoryCube3DPage'));
const LoveEnvelopeCollectionPage = lazy(() => import('./pages/LoveEnvelopeCollectionPage'));
const RomanticMusicBox2Page = lazy(() => import('./pages/RomanticMusicBox2Page'));
const CoupleFutureHome3DPage = lazy(() => import('./pages/CoupleFutureHome3DPage'));
const LoveNeonSignGalleryPage = lazy(() => import('./pages/LoveNeonSignGalleryPage'));
const BhuntuPhotoMosaic2Page = lazy(() => import('./pages/BhuntuPhotoMosaic2Page'));
const LoveTetrisBlockPuzzlePage = lazy(() => import('./pages/LoveTetrisBlockPuzzlePage'));
const CoupleRelationshipCertPage = lazy(() => import('./pages/CoupleRelationshipCertPage'));
const GrandLoveGalaxy3DPage = lazy(() => import('./pages/GrandLoveGalaxy3DPage'));
const Ultimate300thLoveCoronationPage = lazy(() => import('./pages/Ultimate300thLoveCoronationPage'));
const BouquetReasonsPage = lazy(() => import('./pages/BouquetReasonsPage'));
const FutureNightRidePage = lazy(() => import('./pages/FutureNightRidePage'));
const PromiseTrioPage = lazy(() => import('./pages/PromiseTrioPage'));
const LetterTonightPage = lazy(() => import('./pages/LetterTonightPage'));
const SecretLanguagePage = lazy(() => import('./pages/SecretLanguagePage'));
const BirthdayWishLetterPage = lazy(() => import('./pages/BirthdayWishLetterPage'));
const MemoryReplayPage = lazy(() => import('./pages/MemoryReplayPage'));
const BirthdaySkyLetterPage = lazy(() => import('./pages/BirthdaySkyLetterPage'));
const LittleThingsPage = lazy(() => import('./pages/LittleThingsPage'));
const SecretVaultSecondPage = lazy(() => import('./pages/SecretVaultSecondPage'));
const LoveMemoryMatch3DPage = lazy(() => import('./pages/LoveMemoryMatch3DPage'));
const LoveGrandFinaleSecondPage = lazy(() => import('./pages/LoveGrandFinaleSecondPage'));
const FutureHouseBuilderSecondPage = lazy(() => import('./pages/FutureHouseBuilderSecondPage'));
const LoveScratchOffGallerySecondPage = lazy(() => import('./pages/LoveScratchOffGallerySecondPage'));
const CoupleMilestoneMap2Page = lazy(() => import('./pages/CoupleMilestoneMap2Page'));
const LoveLetterArchiveVaultPage = lazy(() => import('./pages/LoveLetterArchiveVaultPage'));
const LoveSpellCasterStudioPage = lazy(() => import('./pages/LoveSpellCasterStudioPage'));
const LovePotionLab2Page = lazy(() => import('./pages/LovePotionLab2Page'));


import AudioController, { playSparkle } from './components/AudioController';
import { ROOM_SEQUENCE } from './data/roomSequence';

import { useAppStore } from './store/useAppStore';

function MainAppContent() {
  const { hasEntered, setHasEntered, setCurrentRoomIndex } = useAppStore();
  const navigate = useNavigate();
  const [isAudioStarted, setIsAudioStarted] = useState(false);

  const handleStart = () => {
    playSparkle();
    // Page 1 is the doorway; the first unlocked destination is page 2.
    const firstBirthdayRoomIndex = 1;
    setCurrentRoomIndex(firstBirthdayRoomIndex);
    setHasEntered(true);
    setIsAudioStarted(true);
    navigate(ROOM_SEQUENCE[firstBirthdayRoomIndex], { replace: true });
  };

  return (
    <div
      className="min-h-dvh bg-[#FAF8F8] text-[#1A1A1A] relative font-ui"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Gatekeeper — shown until Samjhana enters the Bhuntu password */}
      {!hasEntered && <LoadingScreen onStart={handleStart} />}

      {/* Easter Egg Modal */}
      <EasterEggModal />

      {hasEntered && (
        <>
          {/* ---- Route guard: enforces series navigation ---- */}
          <RouteGuard />

          {/* ---- Navbar (fixed top, accounts for Dynamic Island via CSS) ---- */}
          <Navbar />

          {/*
            ---- Main wrapper ----
            padding-top = navbar height (56px) + Dynamic Island safe-area
            padding-bottom = fixed footer height (52px) + home indicator safe-area
            This ONE wrapper handles ALL pages — no page needs its own padding.
          */}
          <main
            className="relative z-10"
            style={{
              paddingTop: 'calc(56px + env(safe-area-inset-top))',
              paddingBottom: 'calc(52px + max(env(safe-area-inset-bottom), 8px))',
            }}
          >
            <Suspense fallback={
      <div className="min-h-dvh flex items-center justify-center bg-[#FAF8F8]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-pink-200 border-t-rose-500 animate-spin" />
          <span className="text-xs font-bold text-rose-500 font-ui animate-pulse">Loading Surprise 💕</span>
        </div>
      </div>
    }>
                <IndependentPageStage>
                <Routes>
              {/* -- Named routes -- */}
              <Route path="/"                  element={<HomePage />} />
              <Route path="/curated-journey"   element={<CuratedJourneyPage />} />
              <Route path="/story"             element={<StoryPage />} />
              <Route path="/gallery"           element={<GalleryPage />} />
              <Route path="/video"             element={<VideoPage />} />
              <Route path="/letter"            element={<LetterPage />} />
              <Route path="/bouquet"           element={<BouquetPage />} />
              <Route path="/distance"          element={<DistancePage />} />
              <Route path="/surprise"          element={<SurprisePage />} />
              <Route path="/ring"              element={<RingSurprisePage />} />
              <Route path="/quiz"              element={<QuizPage />} />
              <Route path="/stars"             element={<StarsPage />} />
              <Route path="/time-capsule"      element={<TimeCapsulePage />} />
              <Route path="/scratch-surprises"  element={<ScratchSurprisePage />} />
              <Route path="/compliment-jar"    element={<ComplimentJarPage />} />
              <Route path="/catcher-game"      element={<CatcherGamePage />} />
              <Route path="/memory-match"      element={<MemoryMatchPage />} />
              <Route path="/quote-generator"   element={<QuoteGeneratorPage />} />
              <Route path="/mystery-gifts"     element={<MysteryGiftsPage />} />
              <Route path="/bouquet-reasons"        element={<BouquetReasonsPage />} />
              <Route path="/passport"          element={<PassportPage />} />
              <Route path="/message-bottle"    element={<BottlePage />} />
              <Route path="/music-box"         element={<MusicBoxPage />} />
              <Route path="/lanterns"          element={<LanternsPage />} />
              <Route path="/photo-booth"       element={<PhotoBoothPage />} />
              <Route path="/promise-tree"      element={<PromiseTreePage />} />
              <Route path="/treasure-chest"    element={<TreasureChestPage />} />
              <Route path="/love-slots"        element={<LoveSlotsPage />} />
              <Route path="/horoscope"         element={<HoroscopePage />} />
              <Route path="/love-calculator"   element={<LoveCalculatorPage />} />
              <Route path="/cooking-game"      element={<CookingGamePage />} />
              <Route path="/love-pet"          element={<LovePetPage />} />
              <Route path="/future-night-ride"      element={<FutureNightRidePage />} />
              <Route path="/two-truths"        element={<TwoTruthsPage />} />
              <Route path="/word-search"       element={<WordSearchPage />} />
              <Route path="/wishing-well"      element={<WishingWellPage />} />
              <Route path="/voice-soundboard"  element={<VoiceSoundboardPage />} />
              <Route path="/tic-tac-toe"       element={<TicTacToePage />} />
              <Route path="/fireworks"         element={<FireworksPage />} />
              <Route path="/timeline-quiz"     element={<TimelinePuzzlePage />} />
              <Route path="/bubble-pop"        element={<BubblePopPage />} />
              <Route path="/bucket-list"       element={<BucketListPage />} />
              <Route path="/origami"           element={<OrigamiPage />} />
              <Route path="/affirmations"      element={<AffirmationsPage />} />
              <Route path="/love-piano"        element={<LovePianoPage />} />
              <Route path="/wax-sealer"        element={<WaxSealerPage />} />
              <Route path="/love-maze"         element={<LoveMazePage />} />
              <Route path="/fortune-cookie"    element={<FortuneCookiePage />} />
              <Route path="/love-potion"       element={<LovePotionPage />} />
              <Route path="/emoji-story"       element={<EmojiStoryPage />} />
              <Route path="/jigsaw"            element={<JigsawPage />} />
              <Route path="/love-dice"         element={<LoveDicePage />} />
              <Route path="/balloon-pop"       element={<BalloonPopPage />} />
              <Route path="/couple-bingo"      element={<CoupleBingoPage />} />
              <Route path="/love-review"       element={<LoveReviewPage />} />
              <Route path="/love-diary"        element={<LoveDiaryPage />} />
              <Route path="/love-scrabble"     element={<LoveScrabblePage />} />
              <Route path="/love-lottery"      element={<LoveLotteryPage />} />
              <Route path="/love-tamagotchi"   element={<LoveTamagotchiPage />} />
              <Route path="/secret-vault"      element={<SecretVaultPage />} />
              <Route path="/love-tarot"        element={<LoveTarotPage />} />
              <Route path="/memory-lane"       element={<MemoryLanePage />} />
              <Route path="/hug-counter"       element={<HugCounterPage />} />
              <Route path="/love-crossword"    element={<LoveCrosswordPage />} />
              <Route path="/love-radio"        element={<LoveRadioPage />} />
              <Route path="/blessing-tree"     element={<BlessingTreePage />} />
              <Route path="/love-vibe"         element={<LoveVibePage />} />
              <Route path="/couple-quiz-2"     element={<CoupleQuiz2Page />} />
              <Route path="/promise-trio"   element={<PromiseTrioPage />} />
              <Route path="/bento-box"         element={<BentoBoxPage />} />
              <Route path="/letter-tonight" element={<LetterTonightPage />} />
              <Route path="/love-coupon-generator" element={<LoveCouponGeneratorPage />} />
              <Route path="/star-namer"        element={<StarNamerPage />} />
              <Route path="/love-jar-notes"    element={<LoveJarNotesPage />} />
              <Route path="/sweet-compliments" element={<SweetComplimentsPage />} />
              <Route path="/kiss-collector"    element={<KissCollectorPage />} />
              <Route path="/love-memory-flip"  element={<LoveMemoryFlipPage />} />
              <Route path="/sound-wave"        element={<SoundWavePage />} />
              <Route path="/love-passport-stamps" element={<LovePassportStampsPage />} />
              <Route path="/mood-ring"         element={<MoodRingPage />} />
              <Route path="/love-tetris"       element={<LoveTetrisPage />} />
              <Route path="/cupid-archery"     element={<CupidArcheryPage />} />
              <Route path="/love-alarm"        element={<LoveAlarmPage />} />
              <Route path="/couple-bucket-list-2" element={<CoupleBucketList2Page />} />
              <Route path="/love-quiz-advanced" element={<LoveQuizAdvancedPage />} />
              <Route path="/love-meter-deluxe" element={<LoveMeterDeluxePage />} />
              <Route path="/love-envelope"     element={<LoveEnvelopePage />} />
              <Route path="/love-constellation-connect" element={<LoveConstellationConnectPage />} />
              <Route path="/love-journal-prompt" element={<LoveJournalPromptPage />} />
              <Route path="/love-chimes"       element={<LoveChimesPage />} />
              <Route path="/love-puzzle-slider" element={<LovePuzzleSliderPage />} />
              <Route path="/love-horoscope-daily" element={<LoveHoroscopeDailyPage />} />
              <Route path="/love-recipe"       element={<LoveRecipePage />} />
              <Route path="/love-fireflies"    element={<LoveFirefliesPage />} />
              <Route path="/love-tree-growth"  element={<LoveTreeGrowthPage />} />
              <Route path="/love-wishes-sky"   element={<LoveWishesSkyPage />} />
              <Route path="/love-time-machine" element={<LoveTimeMachinePage />} />
              <Route path="/love-memory-match" element={<LoveMemoryMatchPage />} />
              <Route path="/love-origami-heart" element={<LoveOrigamiHeartPage />} />
              <Route path="/love-fortune-cookie" element={<LoveFortuneCookiePage />} />
              <Route path="/love-scratch-card" element={<LoveScratchCardPage />} />
              <Route path="/love-audio-visualizer" element={<LoveAudioVisualizerPage />} />
              <Route path="/love-trivia-quiz" element={<LoveTriviaQuizPage />} />
              <Route path="/love-photo-booth" element={<LovePhotoBoothPage />} />
              <Route path="/love-wish-well" element={<LoveWishWellPage />} />
              <Route path="/love-grand-finale" element={<LoveGrandFinalePage />} />

              {/* ---- 20 NEW Interactive Pages ---- */}
              <Route path="/love-map-canvas" element={<LoveMapCanvasPage />} />
              <Route path="/heartbeat-drum-pad" element={<HeartbeatDrumPadPage />} />
              <Route path="/paper-airplane-messenger" element={<PaperAirplaneMessengerPage />} />
              <Route path="/emoji-art-canvas" element={<EmojiArtCanvasPage />} />
              <Route path="/magic-8-ball-love" element={<Magic8BallLovePage />} />
              <Route path="/love-lock-bridge" element={<LoveLockBridgePage />} />
              <Route path="/secret-language" element={<SecretLanguagePage />} />
              <Route path="/cloud-skywriter" element={<CloudSkywriterPage />} />
              <Route path="/love-thermometer" element={<LoveThermometerPage />} />
              <Route path="/movie-ticket-creator" element={<MovieTicketCreatorPage />} />
              <Route path="/snow-globe-shaker" element={<SnowGlobeShakerPage />} />
              <Route path="/wish-dandelion" element={<WishDandelionPage />} />
              <Route path="/pixel-heart-painter" element={<PixelHeartPainterPage />} />
              <Route path="/romantic-charades" element={<RomanticCharadesPage />} />
              <Route path="/love-achievement-badges" element={<LoveAchievementBadgesPage />} />
              <Route path="/enchanted-rose-garden" element={<EnchantedRoseGardenPage />} />
              <Route path="/love-mad-libs" element={<LoveMadLibsPage />} />
              <Route path="/love-butterfly-catcher" element={<LoveButterflyCatcherPage />} />
              <Route path="/romantic-karaoke" element={<RomanticKaraokePage />} />
              <Route path="/love-mirror-oracle" element={<LoveMirrorOraclePage />} />

              {/* ---- 19 NEW Unique Interactive Pages ---- */}
              <Route path="/origami-crane" element={<OrigamiCranePage />} />
              <Route path="/star-drawer" element={<StarDrawerPage />} />
              <Route path="/birthday-wish-letter" element={<BirthdayWishLetterPage />} />
              <Route path="/bubble-wrap" element={<BubbleWrapPage />} />
              <Route path="/scratch-memory" element={<ScratchMemoryPage />} />
              <Route path="/quiz-duel" element={<QuizDuelPage />} />
              <Route path="/love-aquarium" element={<LoveAquariumPage />} />
              <Route path="/photo-puzzle-3d" element={<PhotoPuzzle3DPage />} />
              <Route path="/coupon-vault" element={<CouponVaultPage />} />
              <Route path="/heart-mailbox" element={<HeartMailboxPage />} />
              <Route path="/star-projector" element={<StarProjectorPage />} />
              <Route path="/cupcake-decorator" element={<CupcakeDecoratorPage />} />
              <Route path="/magnetic-poetry" element={<MagneticPoetryPage />} />
              <Route path="/firework-maker" element={<FireworkMakerPage />} />
              <Route path="/love-clock" element={<LoveClockPage />} />
              <Route path="/polaroid-designer" element={<PolaroidDesignerPage />} />
              <Route path="/origami-boat" element={<OrigamiBoatPage />} />
              <Route path="/candle-blower" element={<CandleBlowerPage />} />
              <Route path="/royal-crown" element={<RoyalCrownPage />} />
              <Route path="/potion-brewery" element={<LovePotionBreweryPage />} />
              <Route path="/love-compass" element={<LoveCompassPage />} />
              <Route path="/word-jumble" element={<RomanceWordJumblePage />} />
              <Route path="/time-capsule-2" element={<BirthdayTimeCapsule2Page />} />

              {/* ---- 46 NEW Unique Interactive Pages to reach 200 Total Pages ---- */}
              <Route path="/love-compatibility-matrix" element={<LoveCompatibilityMatrixPage />} />
              <Route path="/future-house-builder" element={<FutureHouseBuilderPage />} />
              <Route path="/romantic-playlist-mixer" element={<RomanticPlaylistMixerPage />} />
              <Route path="/sweet-promises-jar" element={<SweetPromisesJarPage />} />
              <Route path="/love-languages-quiz" element={<LoveLanguagesQuizPage />} />
              <Route path="/love-constellation-painter" element={<LoveConstellationPainterPage />} />
              <Route path="/love-letter-generator" element={<LoveLetterGeneratorPage />} />
              <Route path="/anniversary-countdown-clock" element={<AnniversaryCountdownClockPage />} />
              <Route path="/heart-bubble-tea-maker" element={<HeartBubbleTeaMakerPage />} />
              <Route path="/love-notes-wall" element={<LoveNotesWallPage />} />
              <Route path="/virtual-cat-cafe" element={<VirtualCatCafePage />} />
              <Route path="/memory-replay" element={<MemoryReplayPage />} />
              <Route path="/love-quiz-personality" element={<LoveQuizPersonalityPage />} />
              <Route path="/sweet-proposal-simulator" element={<SweetProposalSimulatorPage />} />
              <Route path="/love-frequency-tuner" element={<LoveFrequencyTunerPage />} />
              <Route path="/couples-secret-handshake" element={<CouplesSecretHandshakePage />} />
              <Route path="/starry-night-skywriter" element={<StarryNightSkywriterPage />} />
              <Route path="/romantic-cooking-recipe" element={<RomanticCookingRecipePage />} />
              <Route path="/love-vault-combination" element={<LoveVaultCombinationPage />} />
              <Route path="/sweet-voicemail-inbox" element={<SweetVoicemailInboxPage />} />
              <Route path="/couple-daily-horoscope" element={<CoupleDailyHoroscopePage />} />
              <Route path="/love-scratch-off-gallery" element={<LoveScratchOffGalleryPage />} />
              <Route path="/heart-shape-tangram" element={<HeartShapeTangramPage />} />
              <Route path="/love-meteor-shower" element={<LoveMeteorShowerPage />} />
              <Route path="/sweet-tea-ceremony" element={<SweetTeaCeremonyPage />} />
              <Route path="/couple-nickname-generator" element={<CoupleNicknameGeneratorPage />} />
              <Route path="/love-rhythm-game" element={<LoveRhythmGamePage />} />
              <Route path="/sweet-dessert-tower" element={<SweetDessertTowerPage />} />
              <Route path="/love-poetry-fridge" element={<LovePoetryFridgePage />} />
              <Route path="/couple-travel-passport-stamps" element={<CoupleTravelPassportStampsPage />} />
              <Route path="/love-firework-painter" element={<LoveFireworkPainterPage />} />
              <Route path="/sweet-dream-catcher" element={<SweetDreamCatcherPage />} />
              <Route path="/couple-questions-deep" element={<CoupleQuestionsDeepPage />} />
              <Route path="/love-music-box-carousel" element={<LoveMusicBoxCarouselPage />} />
              <Route path="/sweet-compliments-fountain" element={<SweetComplimentsFountainPage />} />
              <Route path="/couple-movie-night" element={<CoupleMovieNightPage />} />
              <Route path="/love-keychain-customizer" element={<LoveKeychainCustomizerPage />} />
              <Route path="/sweet-garden-blooms" element={<SweetGardenBloomsPage />} />
              <Route path="/couple-anniversary-timeline" element={<CoupleAnniversaryTimelinePage />} />
              <Route path="/love-fortune-teller-origami" element={<LoveFortuneTellerOrigamiPage />} />
              <Route path="/sweet-heart-balloon-ascent" element={<SweetHeartBalloonAscentPage />} />
              <Route path="/couple-starry-planetarium" element={<CoupleStarryPlanetariumPage />} />
              <Route path="/love-letter-in-balloon" element={<LoveLetterInBalloonPage />} />
              <Route path="/sweet-memory-scrapbook" element={<SweetMemoryScrapbookPage />} />
              <Route path="/love-coronation-ceremony" element={<LoveCoronationCeremonyPage />} />

              {/* ---- 11 NEW Romantic Interactive Pages (10,000 I Love You & Cute Experiences) ---- */}
              <Route path="/whatsapp-10k-love" element={<WhatsApp10kLovePage />} />
              <Route path="/cupid-radio-dj" element={<CupidRadioDJStationPage />} />
              <Route path="/constellation-stargazer" element={<LoveConstellationStargazerPage />} />
              <Route path="/heart-nebula-3d" element={<LoveHeartNebula3DPage />} />
              <Route path="/sweet-confectionery-bakery" element={<LoveSweetConfectioneryBakeryPage />} />
              <Route path="/love-story-comic-strip" element={<LoveLoveStoryComicStripPage />} />
              <Route path="/arcade-dance-machine" element={<LoveArcadeDanceMachinePage />} />
              <Route path="/enchanted-glass-terrarium" element={<LoveEnchantedGlassTerrariumPage />} />
              <Route path="/bottle-ocean-3d" element={<LoveMessageInABottleOceanPage />} />
              <Route path="/couple-time-capsule-lockbox" element={<LoveCoupleTimeCapsuleLockBoxPage />} />
              <Route path="/sweet-heart-paper-craft" element={<LoveSweetHeartPaperCraftPage />} />

              {/* ✨✨ NEW PAGES 219–250 — Photo-Rich Birthday Expansion ✨✨ */}
              <Route path="/love-wordle"               element={<LoveWordlePage />} />
              <Route path="/couple-escape-room"        element={<CoupleEscapeRoomPage />} />
              <Route path="/bhuntu-trivia-showdown"    element={<BhuntuTriviaShowdownPage />} />
              <Route path="/love-pixel-art"            element={<LovePixelArtCreatorPage />} />
              <Route path="/love-anagram-solver"       element={<LoveAnagramSolverPage />} />
              <Route path="/love-photo-mosaic"         element={<LovePhotoMosaicBuilderPage />} />
              <Route path="/first-moments-timeline"    element={<FirstMomentsTimelinePage />} />
              <Route path="/memory-constellation"      element={<MemoryConstellationMapPage />} />
              <Route path="/couple-yearbook"           element={<CoupleYearbookPage />} />
              <Route path="/love-letter-archive"       element={<LoveLetterArchivePage />} />
              <Route path="/couple-soundtrack"         element={<CoupleSoundtrackPage />} />
              <Route path="/love-spell-caster"         element={<LoveSpellCasterPage />} />
              <Route path="/love-potion-lab"           element={<LovePotionLaboratoryPage />} />
              <Route path="/fairy-tale-generator"      element={<FairyTaleGeneratorPage />} />
              <Route path="/enchanted-crystal-ball"    element={<EnchantedCrystalBallPage />} />
              <Route path="/dragon-princess-adventure" element={<DragonPrincessAdventurePage />} />
              <Route path="/love-wizard-tower"         element={<LoveWizardTowerPage />} />
              <Route path="/love-graffiti-wall"        element={<LoveGraffitiWallPage />} />
              <Route path="/love-neon-sign"            element={<LoveNeonSignDesignerPage />} />
              <Route path="/bhuntu-emoji-comic"        element={<BhuntuEmojiComicPage />} />
              <Route path="/love-kaleidoscope"         element={<LoveKaleidoscopePage />} />
              <Route path="/cherry-blossom-wish-tree"  element={<CherryBlossomWishTreePage />} />
              <Route path="/love-advent-calendar"      element={<LoveAdventCalendarPage />} />
              <Route path="/new-year-fireworks"        element={<NewYearLoveFireworksPage />} />
              <Route path="/valentine-card-creator"    element={<ValentineCardCreatorPage />} />
              <Route path="/love-dated-calendar"       element={<LoveDatedCalendarPage />} />
              <Route path="/fortune-cookie-love"       element={<FortuneCookieLovePage />} />
              <Route path="/infinite-reasons"          element={<InfiniteReasonsMachinePage />} />
              <Route path="/love-awards-night"         element={<LoveAwardsNightPage />} />
              <Route path="/four-seasons-of-love"      element={<FourSeasonsOfLovePage />} />
              <Route path="/couple-cookbook"           element={<CoupleCookbookPage />} />
              <Route path="/couple-bucket-list"        element={<CoupleBucketListPage />} />
              <Route path="/grand-love-universe"       element={<GrandLoveUniversePage />} />

              {/* ✨✨ NEW PAGES 251–300 — Ultimate 300 Web Pages Expansion ✨✨ */}
              <Route path="/sanzu-photo-gallery" element={<SanzuPhotoGalleryGridPage />} />
              <Route path="/romantic-audio-player" element={<RomanticAudioPlayerPage />} />
              <Route path="/love-memory-tree-3d" element={<LoveMemoryTree3DPage />} />
              <Route path="/nepalgunj-osaka-flight" element={<NepalgunjToOsakaFlightSimPage />} />
              <Route path="/love-scratch-voucher-book" element={<LoveScratchVoucherBookPage />} />
              <Route path="/bhuntu-voice-note-archive" element={<BhuntuVoiceNoteArchivePage />} />
              <Route path="/couple-milestone-map" element={<CoupleMilestoneMapPage />} />
              <Route path="/birthday-sky-letter" element={<BirthdaySkyLetterPage />} />
              <Route path="/romantic-petal-rain" element={<RomanticPetalRainPage />} />
              <Route path="/love-letter-popup-3d" element={<LoveLetterPopUp3DPage />} />
              <Route path="/couple-quiz-master" element={<CoupleQuizMasterPage />} />
              <Route path="/love-memory-film-strip" element={<LoveMemoryFilmStripPage />} />
              <Route path="/love-candlelight-dinner" element={<LoveCandleLightDinnerPage />} />
              <Route path="/bhuntu-nicknames-galaxy" element={<BhuntuNicknamesGalaxyPage />} />
              <Route path="/love-fortune-cookie-jar" element={<LoveFortuneCookieJarPage />} />
              <Route path="/couple-bucket-list-globe" element={<CoupleBucketListGlobePage />} />
              <Route path="/love-audio-visualizer-2" element={<LoveAudioVisualizer2Page />} />
              <Route path="/romantic-photo-slider-3d" element={<RomanticPhotoSlider3DPage />} />
              <Route path="/bhuntu-emoji-arcade" element={<BhuntuEmojiArcadePage />} />
              <Route path="/love-stamp-collection" element={<LoveStampCollectionPage />} />
              <Route path="/romantic-night-skywriter" element={<RomanticNightSkyWriterPage />} />
              <Route path="/couple-recipe-book" element={<CoupleRecipeBookPage />} />
              <Route path="/love-constellation-maker" element={<LoveConstellationMakerPage />} />
              <Route path="/bhuntu-love-polaroids" element={<BhuntuLovePolaroidsPage />} />
              <Route path="/love-tarot-oracle-2" element={<LoveTarotOracle2Page />} />
              <Route path="/romantic-locket-changer" element={<RomanticLocketChangerPage />} />
              <Route path="/love-crossword-puzzle" element={<LoveCrosswordPuzzlePage />} />
              <Route path="/couple-movie-marathon" element={<CoupleMovieMarathonPage />} />
              <Route path="/love-language-test" element={<LoveLanguageTestPage />} />
              <Route path="/bhuntu-personality-quiz" element={<BhuntuPersonalityQuizPage />} />
              <Route path="/love-potion-brewery-2" element={<LovePotionBrewery2Page />} />
              <Route path="/romantic-message-grid" element={<RomanticMessageGridPage />} />
              <Route path="/couple-anniversary-clock" element={<CoupleAnniversaryClockPage />} />
              <Route path="/love-doodle-canvas" element={<LoveDoodleCanvasPage />} />
              <Route path="/bhuntu-comic-strip-2" element={<BhuntuComicStrip2Page />} />
              <Route path="/love-rhythm-drum-pad" element={<LoveRhythmDrumPadPage />} />
              <Route path="/romantic-flower-garden" element={<RomanticFlowerGardenPage />} />
              <Route path="/love-wish-bottle-ocean" element={<LoveWishBottleOceanPage />} />
              <Route path="/couple-superlatives" element={<CoupleSuperlativesPage />} />
              <Route path="/love-memory-cube-3d" element={<LoveMemoryCube3DPage />} />
              <Route path="/little-things-abu-notices" element={<LittleThingsPage />} />
              <Route path="/love-envelope-collection" element={<LoveEnvelopeCollectionPage />} />
              <Route path="/romantic-music-box-2" element={<RomanticMusicBox2Page />} />
              <Route path="/couple-future-home-3d" element={<CoupleFutureHome3DPage />} />
              <Route path="/love-neon-sign-gallery" element={<LoveNeonSignGalleryPage />} />
              <Route path="/bhuntu-photo-mosaic-2" element={<BhuntuPhotoMosaic2Page />} />
              <Route path="/love-tetris-block-puzzle" element={<LoveTetrisBlockPuzzlePage />} />
              <Route path="/couple-relationship-cert" element={<CoupleRelationshipCertPage />} />
              <Route path="/grand-love-galaxy-3d" element={<GrandLoveGalaxy3DPage />} />
              <Route path="/love-memory-match-3d" element={<LoveMemoryMatch3DPage />} />
              <Route path="/love-scratch-off-gallery-2" element={<LoveScratchOffGallerySecondPage />} />
              <Route path="/love-letter-archive-vault" element={<LoveLetterArchiveVaultPage />} />
              <Route path="/love-spell-caster-studio" element={<LoveSpellCasterStudioPage />} />
              <Route path="/love-potion-lab-2" element={<LovePotionLab2Page />} />
              <Route path="/couple-milestone-map-2" element={<CoupleMilestoneMap2Page />} />
              <Route path="/secret-vault-2" element={<SecretVaultSecondPage />} />
              <Route path="/love-grand-finale-2" element={<LoveGrandFinaleSecondPage />} />
              <Route path="/future-house-builder-2" element={<FutureHouseBuilderSecondPage />} />
              <Route path="/ultimate-300th-love-coronation" element={<Ultimate300thLoveCoronationPage />} />


              <Route path="/hall-of-fame"      element={<HallOfFamePage />} />


              {/* ---- Room routes (12 rooms + extras) ---- */}
              <Route path="/bonus-arcade" element={<BonusArcadePage />} />
              <Route path="/room/1"   element={<Room1Page />} />
              <Route path="/room/2"   element={<Room2Page />} />
              <Route path="/room/3"   element={<Room3Page />} />
              <Route path="/room/4"   element={<Room4Page />} />
              <Route path="/room/5"   element={<Room5Page />} />
              <Route path="/room/6"   element={<Room6Page />} />
              <Route path="/room/7"   element={<Room7Page />} />
              <Route path="/room/8"   element={<Room8Page />} />
              <Route path="/room/9"   element={<Room9Page />} />
              <Route path="/room/10"  element={<Room10Page />} />
              <Route path="/room/11"  element={<Room11Page />} />
              <Route path="/room/12"  element={<Room12Page />} />
              </Routes>
                </IndependentPageStage>
              <PersonalGiftLayer />
              </Suspense>
          </main>

          {/* ---- Single global footer — fixed bottom, never duplicated ---- */}
          <PageFooter />

          <AudioController
            isAudioStarted={isAudioStarted}
            setIsAudioStarted={setIsAudioStarted}
          />
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainAppContent />
    </Router>
  );
}
