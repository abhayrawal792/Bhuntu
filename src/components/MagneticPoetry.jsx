import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WORDS = [
  "Sanzu", "is", "my", "forever", "queen", "beautiful", "love", "smile",
  "angel", "heart", "soulmate", "always", "kind", "happy", "life", "universe", "Nepalgunj", "Japan"
];

export default function MagneticPoetry() {
  const { triggerHaptic } = useAppStore();

  const [poem, setPoem] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [isFinished, setIsFinished] = useState(false);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleAddWord = (w) => {
    playPop();
    triggerHaptic(10);
    setPoem((prev) => [...prev, w]);
  };

  const handleFinishPoem = () => {
    if (poem.length === 0) return;
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setIsFinished(true);
    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleClear = () => {
    playPop();
    setPoem([]);
    setIsFinished(false);
  };

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📜 FRIDGE MAGNET POETRY 📜\n\n"${poem.join(' ')}"\n\n- Composed for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Romantic Magnet Poetry 📜✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"चुम्बकीय कविता बोर्ड"}
      subtitle={"Compose Custom Magnet Poetry on the Fridge"}
      description={"Tap word magnets to build a custom love poem for Sanzu, complete with her secret photo backdrop!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* FRIDGE POETRY CANVAS WITH PHOTO BACKDROP */}
        <div className="relative max-w-md mx-auto min-h-[220px] p-5 rounded-3xl bg-slate-900 border-4 border-amber-300/80 shadow-2xl overflow-hidden mb-6 flex flex-col justify-between">
          <div className="absolute inset-0 z-0">
            <img
              src={currentPhoto}
              alt="Backdrop"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain brightness-60 contrast-110"
            />
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs" />
          </div>

          <div className="relative z-10 flex flex-wrap gap-2 items-center justify-center min-h-[140px]">
            {poem.length === 0 ? (
              <p className="text-pink-200 text-xs font-bold italic bg-black/50 px-4 py-2 rounded-xl border border-white/20">
                Tap word magnets below to build a poem...
              </p>
            ) : (
              poem.map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-mono text-xs font-extrabold shadow-md border border-slate-300"
                >
                  {w}
                </motion.span>
              ))
            )}
          </div>

          <div className="relative z-10 flex items-center justify-between pt-2">
            <span className="text-[10px] font-mono text-amber-200 bg-black/60 px-2.5 py-1 rounded-full border border-white/20">
              Words: {poem.length}
            </span>
            <button
              type="button"
              onClick={handleNextPhoto}
              className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold border border-white/30 cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Change Photo</span>
            </button>
          </div>
        </div>

        {/* WORD MAGNETS */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto mb-6">
          {WORDS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => handleAddWord(w)}
              className="px-3 py-1.5 rounded-xl bg-white border border-gray-300 font-mono text-xs font-bold text-gray-800 shadow-sm hover:bg-pink-100 cursor-pointer active:scale-95 transition-all"
            >
              {w}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleFinishPoem}
            disabled={poem.length === 0}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md disabled:opacity-40 cursor-pointer"
          >
            <span>✨ Complete Poem</span>
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
