import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Gift,
  RotateCcw,
  Sparkles,
  Share2,
  Trophy,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WISHES = [
  "🎂 Unlimited Birthday Hugs!",
  "🎁 Secret Birthday Surprise!",
  "👑 Queen Royalty Treatment!",
  "🍕 Late Night Osaka Feast!",
  "🎬 VIP Movie Night Choice!",
  "✈️ Japan Reunion Flight Ticket!",
  "💐 Infinite Rose Bouquets!",
  "💌 100 Handwritten Love Notes!"
];

export default function WishWheel() {
  const { triggerHaptic } = useAppStore();

  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    playPop();
    triggerHaptic([20, 40, 60, 80, 100, 120]);

    const addRot = 1440 + Math.floor(Math.random() * 360);
    const nextRot = rotation + addRot;
    setRotation(nextRot);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    setTimeout(() => {
      setSpinning(false);
      playBloom();
      playSparkle();

      const idx = Math.floor(((360 - (nextRot % 360)) % 360) / (360 / WISHES.length));
      const prize = WISHES[idx];

      setResult({
        prizeText: prize,
        photoIdx: nextPhoto,
        photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
      });

      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    }, 3200);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎡 WHEEL OF BIRTHDAY WISHES 🎡\n\nI spun the wheel and won: "${result?.prizeText}"!\n\nHappy Birthday Queen Sanzu Rawal! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Wheel of Birthday Wishes 🎡✨"
      badgeIcon={<Gift className="w-3.5 h-3.5 text-amber-400" />}
      title={"जन्मदिन इच्छा चक्र"}
      subtitle={"Spin the Carnival Wheel for Birthday Surprises"}
      description={"Spin the golden carnival wheel to unlock special birthday treats, promises, and Sanzu's secret memory photo prizes!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* 3D CARNIVAL WHEEL */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto mb-8">
          {/* Top Pointer Arrow */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-rose-500 z-30 filter drop-shadow" />

          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 3.2, ease: 'easeOut' }}
            className="w-full h-full rounded-full border-4 border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.6)] overflow-hidden bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-800 relative flex items-center justify-center"
          >
            {WISHES.map((w, i) => (
              <div
                key={i}
                className="absolute text-[11px] font-extrabold text-white text-center w-full drop-shadow"
                style={{
                  transform: `rotate(${i * (360 / WISHES.length)}deg) translateY(-95px)`
                }}
              >
                {w.split(' ')[0]} {w.split(' ')[1]}
              </div>
            ))}

            {/* Center Pin Button */}
            <div className="w-18 h-18 rounded-full bg-white shadow-2xl border-4 border-amber-400 z-20 flex items-center justify-center font-extrabold text-xs text-rose-600">
              SPIN 🎡
            </div>
          </motion.div>
        </div>

        {/* SPIN BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSpin}
          disabled={spinning}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 text-amber-950 font-extrabold text-sm shadow-xl cursor-pointer disabled:opacity-50 border border-yellow-200 mb-6"
        >
          {spinning ? 'SPINNING CARNIVAL WHEEL...' : 'SPIN THE WHEEL NOW! 🎡✨'}
        </motion.button>

        {/* WINNER PRIZE MODAL POPUP */}
        <AnimatePresence>
          {result && !spinning && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-amber-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setResult(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  🎉 Birthday Prize Won!
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-amber-200 mb-3">
                  {result.prizeText}
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={result.photoUrl}
                    alt="Prize Photo"
                    onError={(e) => handlePhotoError(e, result.photoIdx)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Prize Memory Photo Unlocked! 🎡📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Claim Prize on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
