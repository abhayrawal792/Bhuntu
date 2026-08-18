import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Cake,
  Sparkles,
  Share2,
  RefreshCw,
  Wind
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function CandleBlower() {
  const { triggerHaptic } = useAppStore();

  const [blownOut, setBlownOut] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleBlowOut = () => {
    if (blownOut) return;

    playPop();
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);

    setBlownOut(true);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
    setBlownOut(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💨 BIRTHDAY CANDLE BLOWER 💨\n\nI made a birthday wish and blew out all 3 candles on Queen Sanzu's cake! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Birthday Candle Blower 🎂✨"
      badgeIcon={<Cake className="w-3.5 h-3.5 text-pink-400" />}
      title={"जन्मदिन मैनबत्ती निभाऊ"}
      subtitle={"Make a Wish & Blow Out the Birthday Candles"}
      description={"Close your eyes, make a birthday wish, and tap to blow out the flames to reveal Sanzu's birthday memory photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* 3D BIRTHDAY CAKE STAGE */}
        <div
          onClick={handleBlowOut}
          className="max-w-xs mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400/60 shadow-2xl flex flex-col items-center justify-center cursor-pointer mb-6 relative overflow-hidden"
        >
          {/* Candle Flames */}
          <div className="flex gap-4 mb-3 z-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {!blownOut ? (
                  <motion.span
                    animate={{ scale: [1, 1.25, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-3xl filter drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]"
                  >
                    🔥
                  </motion.span>
                ) : (
                  <span className="text-sm opacity-50 animate-ping">💨</span>
                )}
                <div className="w-3 h-10 bg-gradient-to-b from-pink-400 to-rose-500 rounded-t-full border border-pink-300 shadow-md" />
              </div>
            ))}
          </div>

          {/* Photo Topper on Cake */}
          <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-white shadow-xl relative bg-black/40 mb-3 z-10">
            <img
              src={currentPhoto}
              alt="Cake Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className={`w-full h-full object-contain object-center saturate-105 transition-all duration-500 ${
                blownOut ? 'brightness-115 contrast-105 scale-105' : 'brightness-75 blur-xs'
              }`}
            />
            {!blownOut && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-[11px] font-mono text-amber-200 font-bold px-2 text-center">
                Blow candles to reveal photo! 💨
              </div>
            )}
          </div>

          {/* Cake Base */}
          <div className="w-48 h-16 bg-gradient-to-b from-pink-500 to-rose-600 rounded-2xl border-2 border-white shadow-md flex items-center justify-center font-extrabold text-white text-sm font-nepali z-10">
            Sanzu's Birthday Cake 🎂
          </div>
        </div>

        {/* BLOWN OUT BANNER */}
        {blownOut && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-sm shadow-xl max-w-xs mx-auto mb-6 font-nepali"
          >
            🎉 HAPPY BIRTHDAY SANZU! MAY ALL YOUR WISHES COME TRUE! 🎉
          </motion.div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!blownOut ? (
            <button
              type="button"
              onClick={handleBlowOut}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Wind className="w-4 h-4" />
              <span>Blow Candles!</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Relight & Random Photo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Wish</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
