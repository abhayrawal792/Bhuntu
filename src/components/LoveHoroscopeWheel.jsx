import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Compass } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const HOROSCOPES = [
  { sign: "Leo Queen ♌", prediction: "Stars align for eternal happiness, endless love, and building our dream home!" },
  { sign: "Aries King ♈", prediction: "Abu's devotion grows deeper every single day!" },
  { sign: "Cosmic Union ✨", prediction: "4,500 miles between Nepalgunj & Osaka disappear under the same starry night!" }
];

export default function LoveHoroscopeWheel() {
  const { triggerHaptic } = useAppStore();

  const [hscopeIdx, setHscopeIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentHoroscope = HOROSCOPES[hscopeIdx % HOROSCOPES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSpinWheel = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setHscopeIdx((i) => (i + 1) % HOROSCOPES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `✨ LOVE HOROSCOPE WHEEL ✨\n\n[${currentHoroscope.sign}]\n"${currentHoroscope.prediction}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Love Horoscope Wheel ✨🔮"
      badgeIcon={<Compass className="w-3.5 h-3.5 text-amber-400" />}
      title={"Love Horoscope Wheel"}
      subtitle={"Zodiac Love & Destiny Predictions for Queen Sanzu"}
      description={"Spin the cosmic horoscope wheel to reveal destiny readings and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* HOROSCOPE CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={hscopeIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Horoscope Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-amber-950/80 px-3 py-1 rounded-lg text-xs font-mono text-amber-200 border border-white/20 font-bold">
                🔮 {currentHoroscope.sign}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                {currentHoroscope.sign}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentHoroscope.prediction}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SPIN BUTTON */}
        <div className="mb-6 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleSpinWheel}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Spin Horoscope Wheel ✨</span>
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Horoscope</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}