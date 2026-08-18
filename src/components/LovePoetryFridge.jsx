import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MAGNETS = ["Sanzu", "Bebo", "is my", "whole", "universe", "forever", "love", "beautiful", "smile", "Nepalgunj", "Osaka", "together"];

export default function LovePoetryFridge() {
  const { triggerHaptic } = useAppStore();

  const [selectedWords, setSelectedWords] = useState(["Sanzu", "is my", "whole", "universe"]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const toggleWord = (w) => {
    playPop();
    triggerHaptic(10);
    if (selectedWords.includes(w)) {
      setSelectedWords((prev) => prev.filter((x) => x !== w));
    } else {
      setSelectedWords((prev) => [...prev, w]);
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📜 FRIDGE MAGNET POETRY 📜\n\nComposed Poem:\n"${selectedWords.join(' ')}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Fridge Magnet Poetry 📜✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
      title={"Fridge Magnet Poetry"}
      subtitle={"Snap Magnet Tiles to Compose Poems"}
      description={"Click magnetic word tiles to build a sweet love poem on the fridge door around Sanzu's photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* FRIDGE DOOR CANVAS WITH PHOTO */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-slate-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Magnet */}
          <div className="w-full h-48 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Fridge Magnet Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 text-sm bg-black/70 px-2 py-0.5 rounded text-amber-200 font-mono font-bold border border-white/20">
              🧲 Photo Magnet
            </div>
          </div>

          {/* Selected Words Canvas */}
          <div className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-700 min-h-[70px] flex items-center justify-center flex-wrap gap-1.5 shadow-inner">
            {selectedWords.map((w, i) => (
              <motion.span key={i} layout className="px-2.5 py-1 rounded bg-amber-100 text-slate-900 font-mono font-bold text-xs shadow border border-amber-300">
                {w}
              </motion.span>
            ))}
          </div>
        </div>

        {/* WORD OPTIONS */}
        <div className="flex justify-center gap-1.5 flex-wrap max-w-md mx-auto mb-6">
          {MAGNETS.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleWord(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                selectedWords.includes(m) ? 'bg-rose-500 text-white border-rose-500 shadow' : 'bg-white text-slate-800 border-slate-300'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Poem</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
