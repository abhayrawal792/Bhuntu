import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, ArrowRight, Gift, Star, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

// Custom Reasons & Memories database from HappyBirthdayGF adapted for Queen Sanzu (Bhuntu / Bebo)
const REASONS = [
  { 
    title: "Reason #1: Your Kind & Pure Heart 💖",
    text: "You’re such a kind, sweet, and wonderful person, Sanzu, and I feel so blessed to share such an eternal bond with you! 🌟",
    emoji: "💖"
  },
  { 
    title: "Reason #2: Joy, Laughter & Smiles 🌸",
    text: "May your birthday and every single day be filled with endless love, laughter, and pure happiness in Osaka & Nepal! 💗",
    emoji: "🌸"
  },
  { 
    title: "Reason #3: Everlasting Success & Dreams ✨",
    text: "Wishing you success, happiness, and everything your beautiful heart desires. October 28 proposal vow is sealed forever! 💕",
    emoji: "✨"
  },
  { 
    title: "Reason #4: Stay The Amazing Queen You Are 👑",
    text: "Stay the amazing, beautiful girl you are—always spreading positivity and joy around. Have the happiest birthday year ahead, Bebo! 🥳",
    emoji: "🌟"
  }
];

export default function LoveMessageInABottleOcean() {
  const { triggerHaptic } = useAppStore();

  const [scene, setScene] = useState('welcome'); // 'welcome' -> 'reasons' -> 'storylane'
  const [stackedReasons, setStackedReasons] = useState([REASONS[0]]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  // Mouse move custom heart cursor follow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnterWorld = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setScene('reasons');
    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleShuffleReason = () => {
    playPop();
    triggerHaptic(15);

    if (stackedReasons.length < REASONS.length) {
      const nextReason = REASONS[stackedReasons.length];
      setStackedReasons(prev => [...prev, nextReason]);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

      if (stackedReasons.length + 1 === REASONS.length) {
        playBloom();
        playSparkle();
      }
    } else {
      // Transition to Storylane
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setScene('storylane');
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    }
  };

  const handleResetWorld = () => {
    playPop();
    triggerHaptic(10);
    setScene('welcome');
    setStackedReasons([REASONS[0]]);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💖 HAPPY BIRTHDAY QUEEN SANZU 💖\n\nBirthday Card Reasons & Storylane Unlocked!\n"You are the BESTEST Bebo ever! 💖"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Happy Birthday GF Card 🎂✨"
      badgeIcon={<Gift className="w-3.5 h-3.5 text-pink-400" />}
      title={"Happy Birthday GF Card"}
      subtitle={"Interactive Birthday Storylane for Queen Sanzu"}
      description={"Interactive multi-scene birthday card featuring floating heart cursor, reason card stacking, and memory storylane!"}
    >
      {/* CUSTOM FLOATING HEART CURSOR */}
      <div
        className="fixed w-7 h-7 pointer-events-none z-50 transition-transform duration-75 mix-blend-difference hidden sm:block"
        style={{ left: `${cursorPos.x - 14}px`, top: `${cursorPos.y - 14}px` }}
      >
        <Heart className="w-full h-full fill-pink-400 text-pink-400 filter drop-shadow-[0_0_8px_#ff69b4]" />
      </div>

      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center min-h-[520px] flex flex-col justify-center">
        
        {/* SCENE 1: WELCOME SCREEN (index.html) */}
        {scene === 'welcome' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-pink-100 via-purple-100 to-rose-100 border-4 border-pink-400 shadow-2xl space-y-6 text-stone-900 font-sans"
          >
            <motion.h1
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl sm:text-4xl font-extrabold text-pink-600 drop-shadow-md font-serif"
            >
              Happy Birthday Sanzu 💖
            </motion.h1>

            <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-xl relative bg-black">
              <img
                src={currentPhoto}
                alt="Entrance Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            <p className="text-xs text-stone-700 font-semibold leading-relaxed max-w-sm mx-auto">
              Welcome to Queen Sanzu's private birthday world crafted with eternal love from Abu!
            </p>

            <button
              type="button"
              onClick={handleEnterWorld}
              className="w-full py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xs shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Click to Enter Our World 💕</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* SCENE 2: REASONS CARD STACK (cause.html & cause.js) */}
        {scene === 'reasons' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 border-4 border-pink-400 shadow-2xl space-y-5 text-stone-900"
          >
            <h2 className="text-2xl font-black text-pink-600 font-serif">
              Why You're My Bestest Girl! 💖
            </h2>

            {/* REASON COUNTER */}
            <div className="text-xs font-mono font-bold text-pink-700 bg-pink-200/60 py-1.5 px-3 rounded-full inline-block border border-pink-300">
              Reason {stackedReasons.length} of {REASONS.length}
            </div>

            {/* STACKED REASON CARDS */}
            <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
              <AnimatePresence>
                {stackedReasons.map((reason, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 rounded-2xl bg-white/90 border-2 border-pink-300 shadow-lg text-left space-y-2 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-pink-600">{reason.title}</span>
                      <span className="text-base">{reason.emoji}</span>
                    </div>

                    <p className="text-xs text-stone-800 font-medium leading-relaxed">
                      "{reason.text}"
                    </p>

                    {/* PHOTO INSIDE CARD */}
                    <div className="w-full h-36 rounded-xl overflow-hidden border border-pink-200 shadow relative bg-black mt-2">
                      <img
                        src={BHUNTU_PHOTOS[(photoIdx + idx) % BHUNTU_PHOTOS.length] || currentPhoto}
                        alt="Reason Photo"
                        onError={(e) => handlePhotoError(e, photoIdx)}
                        className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* SHUFFLE / STORYLANE BUTTON */}
            <button
              type="button"
              onClick={handleShuffleReason}
              className="w-full py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-xs shadow-xl hover:scale-102 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>
                {stackedReasons.length < REASONS.length ? 'Click Here... 💕' : 'Enter Our Storylane 💫'}
              </span>
            </button>
          </motion.div>
        )}

        {/* SCENE 3: GRAND MEMORY STORYLANE (last.html) */}
        {scene === 'storylane' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-pink-200 via-purple-100 to-amber-100 border-4 border-pink-400 shadow-2xl space-y-5 text-stone-900 relative overflow-hidden"
          >
            {/* SPARKLE LAYER */}
            <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle,_#ff69b4_1px,_transparent_1px)] bg-[size:30px_30px]" />

            <h2 className="text-3xl font-black text-pink-600 font-serif">
              Our Storylane 💫
            </h2>

            {/* POLAROID PHOTO FRAME */}
            <div className="w-full h-56 rounded-2xl overflow-hidden border-4 border-white shadow-2xl relative bg-black mx-auto">
              <img
                src={currentPhoto}
                alt="Storylane Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-white/90 text-[11px] font-bold text-pink-700 py-1 font-serif">
                You're the BESTEST Bebo Ever! 💖
              </div>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-pink-300 text-xs text-stone-800 font-semibold leading-relaxed shadow-sm">
              "Happy Birthday Queen Sanzu! Thank you for bringing endless warmth, laughter, and love into Abu's life. Here's to a lifetime of happiness, momos, and our future dream home!"
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleResetWorld}
                className="py-3.5 px-4 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Replay</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Birthday Card</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
