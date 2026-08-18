import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Eye,
  Heart,
  Share2,
  RefreshCw,
  Crown
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FORTUNES = [
  { msg: "The Magic Mirror sees a Queen who deserves the entire universe 👑", aura: "from-pink-500 to-rose-600" },
  { msg: "Your beauty & smile light up Abu's world every single day 🌹", aura: "from-purple-500 to-violet-600" },
  { msg: "Abu is thinking about you with a sweet smile RIGHT NOW 💭", aura: "from-cyan-500 to-blue-600" },
  { msg: "A grand romantic surprise & flight to Japan awaits ✈️", aura: "from-amber-500 to-orange-600" },
  { msg: "Magic Mirror says: YOU are the fairest & most beloved Queen of all! 👸✨", aura: "from-rose-500 to-pink-600" }
];

export default function LoveMirrorOracle() {
  const { triggerHaptic } = useAppStore();

  const [isGazing, setIsGazing] = useState(false);
  const [currentFortune, setCurrentFortune] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [gazeCount, setGazeCount] = useState(0);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleGazeMirror = () => {
    if (isGazing) return;

    setIsGazing(true);
    setCurrentFortune(null);
    playPop();
    triggerHaptic([30, 60, 90, 150]);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (nextPhoto === photoIdx) nextPhoto = (nextPhoto + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(nextPhoto);

    setTimeout(() => {
      setIsGazing(false);
      const randFort = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setCurrentFortune(randFort);
      setGazeCount((prev) => prev + 1);

      playBloom();
      playSparkle();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
    }, 1800);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🪞 MAGIC LOVE MIRROR ORACLE 🪞\n\nProphecy: "${currentFortune?.msg}"\n\nHappy Birthday Queen Sanzu Rawal! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Magic Love Mirror Oracle 🪞✨"
      badgeIcon={<Eye className="w-3.5 h-3.5 text-purple-400" />}
      title={"जादुई प्रेम दर्पण"}
      subtitle={"Gaze Into the Royal Magic Mirror"}
      description={"Tap or gaze into the royal golden mirror to reveal romantic prophecies and secret reflections of Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* 3D ROYAL MIRGER STAGE */}
        <div className="relative w-56 h-72 sm:w-64 sm:h-80 mx-auto cursor-pointer mb-8">
          <motion.div
            onClick={handleGazeMirror}
            animate={
              isGazing
                ? {
                    rotate: [0, 10, -10, 5, -5, 0],
                    scale: [1, 1.05, 0.98, 1.03, 1]
                  }
                : { y: [0, -6, 0] }
            }
            transition={
              isGazing
                ? { duration: 1, ease: 'easeInOut' }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            className="w-full h-full relative"
          >
            {/* Outer Golden Frame */}
            <div className="w-full h-full rounded-[40%_40%_45%_45%] bg-gradient-to-b from-amber-500 via-yellow-400 to-amber-700 p-3 shadow-[0_0_50px_rgba(245,158,11,0.6)] border-4 border-yellow-200">
              {/* Glass Reflection */}
              <div className="w-full h-full rounded-[38%_38%_43%_43%] bg-slate-950 border-2 border-white/40 relative overflow-hidden flex items-center justify-center">
                {isGazing ? (
                  <div className="flex flex-col items-center gap-2">
                    <Sparkles className="w-10 h-10 text-amber-300 animate-spin" />
                    <span className="text-[10px] font-mono text-amber-200 font-bold uppercase tracking-widest">
                      Reflecting Soul...
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    <img
                      src={currentPhoto}
                      alt="Reflection"
                      onError={(e) => handlePhotoError(e, photoIdx)}
                      className="w-full h-full object-contain brightness-110 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute bottom-3 left-0 right-0 text-[10px] font-mono font-bold text-amber-200 text-center">
                      Tap Mirror to Gaze 🪞
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Crown Decoration */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-3xl filter drop-shadow">
              👑
            </div>
          </motion.div>
        </div>

        {/* FORTUNE & REVEAL CARD */}
        <AnimatePresence>
          {currentFortune && !isGazing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              className={`max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-r ${currentFortune.aura} text-white shadow-2xl border-2 border-white/30 space-y-4 mb-6`}
            >
              <Crown className="w-8 h-8 mx-auto text-amber-300 drop-shadow" />

              <h3 className="text-base sm:text-lg font-extrabold font-nepali leading-relaxed">
                "{currentFortune.msg}"
              </h3>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleGazeMirror}
                  className="flex-1 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Gaze Again</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Prophecy</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
