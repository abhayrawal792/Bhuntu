import WorldShell from './WorldShell';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw, Send, Gift, Trophy, Volume2, Sparkle, Dices, RotateCcw, Award } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WHEEL_SECTORS = [
  { id: 1, title: 'Queen Sanzu 👑', color: 'from-amber-400 to-amber-600', nepali: "Without makeup huda pani temi mera lagi aukat bhanda bahar wala partner hou! 💕", english: "Pure natural beauty, effortlessly stunning.", photoIdx: 12 },
  { id: 2, title: 'Kiss & Hugs 💋', color: 'from-rose-500 to-pink-600', nepali: "Paxi hjur le tya sabai ko agadi maya ra kissi garnu hunxa... Haan ji! 💋", english: "Forever and always together in front of the whole world.", photoIdx: 71 },
  { id: 3, title: 'Chiya Date ☕', color: 'from-orange-400 to-amber-500', nepali: "Panipuri, momo ra current noodles khana man lagda temi kasto pyari baby lagchau! 🥟🍜", english: "Your cute food cravings make me love you even more!", photoIdx: 21 },
  { id: 4, title: 'Scooter Ride 🛵', color: 'from-sky-400 to-blue-600', nepali: "Light blue scooter ma Bardiya jada ra 30 to 40 kiddos huda sammi sadhai temrai hu! 🛵💙", english: "Riding to Bardiya together on our light blue scooter forever!", photoIdx: 88 },
  { id: 5, title: 'Natural Beauty 🌸', color: 'from-pink-400 to-rose-500', nepali: "Sanu, jab temi le 'Sanzu..!!👀🤍✨' vanera meetho message garchau, mero heart full smile huncha! ❤️", english: "The prettiest smile in the universe, my Bebo!", photoIdx: 0 },
  { id: 6, title: 'Future Wifey 💍', color: 'from-purple-500 to-indigo-600', nepali: "Ma temlai sadhai usto dherai maya gariraxu ra sadhai garirahansuk, mero Bebo! 💍", english: "Loved you yesterday, love you today, love you forever.", photoIdx: 49 },
  { id: 7, title: 'Distance Defier ✈️', color: 'from-teal-400 to-emerald-600', nepali: "Nepalgunj bata Osaka (Sakai) hazaarau miles bhaye pani temro 'Call garne 🥺' message le duri birsaidinx! ✈️", english: "Distance disappears the moment I hear your voice.", photoIdx: 15 },
  { id: 8, title: 'Sweetest Voice 🎵', color: 'from-fuchsia-500 to-pink-600', nepali: "Temro 'Huss', 'Umms', ra 'Mero Buda' vanne meetho bani le mero heart melt gardinxa! 🌸", english: "Your sweet texting style melts my heart every single day.", photoIdx: 79 }
];

export default function ComplimentJar() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.complimentJar;
  const { triggerHaptic } = useAppStore();

  const [mode, setMode] = useState('wheel'); // wheel | scratch | slots
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedResult, setSelectedResult] = useState(WHEEL_SECTORS[0]);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Spin Wheel Handler
  const handleSpinWheel = () => {
    if (isSpinning) return;
    playPop();
    triggerHaptic([30, 90]);
    setIsSpinning(true);

    const randomDegrees = 1440 + Math.floor(Math.random() * 360);
    const newRotation = rotation + randomDegrees;
    setRotation(newRotation);

    // Calculate winning sector
    const normalizedDeg = (newRotation % 360);
    const sectorAngle = 360 / WHEEL_SECTORS.length;
    const winningIdx = Math.floor((360 - (normalizedDeg % 360)) / sectorAngle) % WHEEL_SECTORS.length;

    setTimeout(() => {
      setIsSpinning(false);
      playBloom();
      setSelectedResult(WHEEL_SECTORS[winningIdx]);
      setScratchedPercent(0); // reset scratch card if in scratch mode
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    }, 3500);
  };

  // Voice Reader Handler
  const handleSpeakVoice = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    playSparkle();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = 1.15;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const photoSrc = selectedResult ? BHUNTU_PHOTOS[selectedResult.photoIdx % BHUNTU_PHOTOS.length] : null;

  return (
    <WorldShell
      theme="sweet"
      badge="Deluxe Love Fortune & Compliment Studio 🎡✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />}
      title="Bhuntu's Interactive Love Fortune & Compliment Studio 🎡✨"
      subtitle="Spin the 3D Romantic Fortune Wheel, scratch golden foil notes, or listen to voice compliments!"
      description="100% interactive, non-boring love fortune experience for princess Sanzu!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-pink-200 shadow-sm">
          {[
            { id: 'wheel', label: '🎡 3D Spin Wheel', icon: Sparkles },
            { id: 'scratch', label: '🪙 Gold Foil Scratch', icon: Heart },
            { id: 'slots', label: '🎰 Love Slot Jackpot', icon: Dices }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { playPop(); setMode(tab.id); }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                mode === tab.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-pink-50'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* MODE 1: 3D SPINNING LOVE WHEEL */}
        {mode === 'wheel' && (
          <div className="flex flex-col items-center space-y-5">
            {/* Pointer Pin */}
            <div className="relative z-20 -mb-7">
              <div className="w-8 h-8 bg-rose-600 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-xl animate-bounce">
                ▼
              </div>
            </div>

            {/* Glowing 3D Wheel Container */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-600 shadow-2xl border-4 border-white">
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 3.5, ease: [0.15, 0.9, 0.2, 1] }}
                className="w-full h-full rounded-full relative overflow-hidden bg-white shadow-inner"
              >
                {WHEEL_SECTORS.map((sec, i) => {
                  const angle = 360 / WHEEL_SECTORS.length;
                  const skewAngle = 90 - angle;

                  return (
                    <div
                      key={sec.id}
                      className={`absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left bg-gradient-to-tr ${sec.color} border border-white/40 flex items-center justify-center text-white font-extrabold text-[10px] sm:text-xs shadow-xs cursor-pointer`}
                      style={{
                        transform: `rotate(${i * angle}deg) skewY(-${skewAngle}deg)`,
                      }}
                    >
                      <span
                        className="inline-block transform rotate-45 translate-x-4 -translate-y-2 whitespace-nowrap drop-shadow-md"
                        style={{ transform: `rotate(${angle / 2 + 45}deg)` }}
                      >
                        {sec.title}
                      </span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Center Spin Button Hub */}
              <button
                onClick={handleSpinWheel}
                disabled={isSpinning}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white border-4 border-rose-500 text-rose-600 font-black text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex flex-col items-center justify-center uppercase tracking-tighter disabled:opacity-75"
              >
                <Sparkles className={`w-5 h-5 text-rose-500 mb-0.5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isSpinning ? 'SPINNING' : 'SPIN! 🎡'}</span>
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: GOLD FOIL SCRATCH CARD */}
        {mode === 'scratch' && (
          <div className="glass-card p-6 rounded-3xl border-2 border-amber-300 bg-amber-50/40 shadow-xl text-center space-y-4 max-w-md mx-auto">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-extrabold text-[10px] uppercase tracking-wider">
                🪙 Interactive Gold Scratch Foil
              </span>
              <h3 className="text-sm font-black text-gray-800">
                Tap or Scratch Below to Reveal Bhuntu's Secret Compliment!
              </h3>
            </div>

            <div
              onClick={() => { playSparkle(); setScratchedPercent(100); }}
              className="relative w-full h-48 rounded-2xl overflow-hidden cursor-pointer shadow-inner border-2 border-amber-400 group"
            >
              {/* Foil Layer */}
              <AnimatePresence>
                {scratchedPercent < 100 && (
                  <motion.div
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="absolute inset-0 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 z-20 flex flex-col items-center justify-center p-4 text-amber-950 font-black space-y-2 border-4 border-amber-300 shadow-2xl"
                  >
                    <Trophy className="w-10 h-10 text-amber-800 animate-bounce" />
                    <span className="text-sm uppercase tracking-widest font-mono">
                      ★ TAP OR SCRATCH GOLD FOIL ★
                    </span>
                    <p className="text-[10px] text-amber-900/80 italic font-normal">
                      Click anywhere to scratch off gold layer!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Revealed Content Behind Foil */}
              <div className="w-full h-full p-4 bg-white flex items-center gap-4 text-left">
                <div className="w-20 h-20 rounded-xl overflow-hidden border border-pink-300 shrink-0">
                  <img
                    src={photoSrc}
                    onError={e => handlePhotoError(e, selectedResult.photoIdx)}
                    alt="Scratched Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <p className="text-xs font-black text-gray-900 font-nepali">
                    "{selectedResult.nepali}"
                  </p>
                  <p className="text-[11px] text-rose-600 italic">
                    "{selectedResult.english}"
                  </p>
                </div>
              </div>
            </div>

            {scratchedPercent >= 100 && (
              <button
                onClick={() => setScratchedPercent(0)}
                className="px-5 py-2 rounded-full bg-amber-500 text-white font-extrabold text-xs shadow-md cursor-pointer hover:bg-amber-600 flex items-center gap-1.5 mx-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Re-cover Gold Foil 🪙
              </button>
            )}
          </div>
        )}

        {/* MODE 3: LOVE SLOT MACHINE */}
        {mode === 'slots' && (
          <div className="glass-card p-6 rounded-3xl border-2 border-pink-300 bg-white/95 shadow-xl text-center space-y-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2">
              <Dices className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wide">
                777 Triple Heart Love Slot Machine 🎰
              </h3>
            </div>

            {/* 3 Slot Reels Display */}
            <div className="grid grid-cols-3 gap-2 bg-gray-950 p-4 rounded-2xl border-4 border-amber-400 shadow-2xl">
              {[
                selectedResult.title.split(' ')[0] || '👑',
                selectedResult.tag || '💖',
                '777 🎰'
              ].map((symbol, idx) => (
                <div
                  key={idx}
                  className="h-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-xl border border-amber-500/50 flex flex-col items-center justify-center text-amber-300 font-black text-sm text-center shadow-inner"
                >
                  <span className="text-2xl mb-0.5">{symbol}</span>
                  <span className="text-[9px] text-amber-400 font-mono">JACKPOT</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleSpinWheel}
              disabled={isSpinning}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-xl cursor-pointer hover:scale-102 transition-all disabled:opacity-75"
            >
              Pull Jackpot Lever 🎰
            </button>
          </div>
        )}

        {/* WINNING RESULT CARD DISPLAY */}
        {selectedResult && (
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-3xl p-6 sm:p-7 border-2 border-pink-300 shadow-2xl bg-white text-left space-y-4"
          >
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-xs uppercase tracking-wider">
                <Heart className="w-4 h-4 fill-rose-500" />
                <span>Selected Fortune: {selectedResult.title}</span>
              </div>

              <button
                onClick={() => handleSpeakVoice(selectedResult.nepali)}
                className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-all ${
                  isSpeaking
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-pink-100 text-rose-700 hover:bg-pink-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isSpeaking ? 'Speaking...' : 'Voice Read 🎙️'}</span>
              </button>
            </div>

            {/* Photo & Quote display */}
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-lg shrink-0 relative">
                <img
                  src={photoSrc}
                  onError={e => handlePhotoError(e, selectedResult.photoIdx)}
                  alt="Fortune Photo"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/60 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full backdrop-blur-xs">
                  Bhuntu 📸
                </span>
              </div>

              <div className="space-y-2 flex-1 text-center sm:text-left">
                <p className="text-gray-900 font-ui text-sm sm:text-base leading-relaxed font-black">
                  "{selectedResult.english}"
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => {
                sendWhatsAppMessage(`🎡 Hey Abu! I spun our Romantic Fortune Wheel & landed on *${selectedResult.title}*:\n\n"${selectedResult.nepali}"\n\n("${selectedResult.english}") ❤️✨`, '🎡 Romantic Fortune Spin');
              }}
              className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 font-ui"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Fortune to Abu on WhatsApp 📲</span>
            </button>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
