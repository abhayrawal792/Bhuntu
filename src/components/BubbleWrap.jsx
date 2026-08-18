import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  Share2,
  Eye
} from 'lucide-react';
import { playPop, playSparkle, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SIZE = 36;
const GRID_COLS = 6;

export default function BubbleWrap() {
  const { triggerHaptic } = useAppStore();

  const [popped, setPopped] = useState(Array(SIZE).fill(false));
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const poppedCount = popped.filter(Boolean).length;
  const revealPct = Math.round((poppedCount / SIZE) * 100);

  const handlePop = (i) => {
    if (popped[i]) return;

    playPop();
    triggerHaptic(12);

    const next = [...popped];
    next[i] = true;
    setPopped(next);

    if (next.every(Boolean)) {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90, 150]);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleReset = () => {
    playPop();
    setPopped(Array(SIZE).fill(false));
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🫧 HEART BUBBLE WRAP POPPER 🫧\n\nI popped all ${poppedCount}/${SIZE} heart bubbles and revealed Sanzu's memory photo! Happy Birthday Queen Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Heart Bubble Wrap Popper 🫧✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Heart Bubble Wrap"}
      subtitle={"Pop Heart Bubbles & Reveal Secret Memory Photos"}
      description={"Satisfying ASMR bubble wrap popping! Pop all 36 heart bubbles to reveal Sanzu's secret photo underneath!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* REVEAL METER */}
        <div className="mb-6 p-4 rounded-3xl bg-slate-900 border-2 border-pink-400/50 shadow-xl max-w-sm mx-auto text-center">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
            <span className="text-gray-300 flex items-center gap-1 font-bold">
              <Eye className="w-4 h-4 text-pink-400" />
              Photo Reveal: <span className="text-pink-300 font-extrabold text-sm">{revealPct}%</span>
            </span>
            <span className="text-amber-300 font-bold">
              {revealPct >= 100 ? '100% Unlocked! 📸👑' : `Pop ${SIZE - poppedCount} More Bubbles`}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/60 border border-white/20 overflow-hidden relative p-0.5">
            <motion.div
              animate={{ width: `${revealPct}%` }}
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            />
          </div>
        </div>

        {/* BUBBLE CANVAS WITH HIDDEN PHOTO UNDERNEATH */}
        <div className="relative max-w-xs mx-auto aspect-square rounded-3xl p-3 bg-slate-950 border-4 border-pink-400/60 shadow-2xl overflow-hidden mb-6">
          {/* Underlying Photo */}
          <div className="absolute inset-3 rounded-2xl overflow-hidden z-0">
            <img
              src={currentPhoto}
              alt="Memory Reveal"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105 transition-all duration-500"
            />
          </div>

          {/* Bubble Grid Overlay */}
          <div className="relative z-10 w-full h-full grid grid-cols-6 gap-2">
            {popped.map((p, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.75 }}
                onClick={() => handlePop(i)}
                className={`w-full h-full rounded-full cursor-pointer flex items-center justify-center border transition-all shadow-md ${
                  p
                    ? 'bg-transparent border-transparent opacity-40 text-xs'
                    : 'bg-gradient-to-br from-rose-500 to-pink-600 border-white/40 text-white text-lg shadow-lg hover:scale-105'
                }`}
              >
                {p ? '💥' : '💓'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Wrap</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Score</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
