import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cookie, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FORTUNES = [
  "Abu loves Queen Sanzu more today than yesterday! 💕",
  "A special message from Abu is on its way to Sanzu! 💌",
  "Distance is temporary — love between Nepal & Japan is infinite! ✈️"
];

export default function FortuneCookieLove() {
  const { triggerHaptic } = useAppStore();

  const [cracked, setCracked] = useState(false);
  const [fortuneIdx, setFortuneIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFortune = FORTUNES[fortuneIdx % FORTUNES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCrackCookie = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setCracked(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleNextCookie = () => {
    playPop();
    triggerHaptic(10);
    setFortuneIdx((i) => (i + 1) % FORTUNES.length);
    setCracked(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🥠 FORTUNE COOKIE LOVE 🥠\n\nCracked Fortune:\n"${currentFortune}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Fortune Cookie Love 🥠✨"
      badgeIcon={<Cookie className="w-3.5 h-3.5 text-amber-400" />}
      title={"Fortune Cookie Love"}
      subtitle={"Crack Open Love Fortune Cookies for Sanzu"}
      description={"Crack open love fortune cookies baked by Abu to reveal sweet fortunes and secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* COOKIE CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {cracked ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Fortune Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/60 text-amber-200 text-xs font-bold">
                "{currentFortune}"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-amber-900/30 border-2 border-amber-400 mx-auto flex items-center justify-center text-5xl shadow-inner animate-bounce cursor-pointer" onClick={handleCrackCookie}>
                🥠
              </div>
              <p className="text-xs font-extrabold text-amber-300 font-mono uppercase tracking-wider">
                TAP COOKIE TO CRACK OPEN
              </p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!cracked ? (
            <button
              type="button"
              onClick={handleCrackCookie}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Crack Fortune Cookie 🥠</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextCookie}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Cookie 🥠</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Fortune</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
