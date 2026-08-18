import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SUPERLATIVES = [
  { title: "Most Likely to Make Abu Smile Instantly", winner: "Queen Sanzu 💕", subtitle: "Even a single text from her lights up Abu's whole world!" },
  { title: "Most Beautiful Girl in the Entire Universe", winner: "Queen Sanzu ✨", subtitle: "Always stunning, inside and out!" },
  { title: "Best Long-Distance Couple Award", winner: "Abu & Sanzu 🇳🇵✈️🇯🇵", subtitle: "Nepalgunj to Osaka — connected by unbreakable love!" }
];

export default function CoupleYearbook() {
  const { triggerHaptic } = useAppStore();

  const [current, setCurrent] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentAward = SUPERLATIVES[current % SUPERLATIVES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextAward = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setCurrent((c) => (c + 1) % SUPERLATIVES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📚 ABU & SANZU LOVE YEARBOOK 📚\n\nSuperlative: [${currentAward.title}]\nWinner: "${currentAward.winner}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Love Yearbook 📚✨"
      badgeIcon={<BookOpen className="w-3.5 h-3.5 text-amber-400" />}
      title={"Love Yearbook"}
      subtitle={"Superlatives & Awards for Queen Sanzu"}
      description={"Flip through romantic yearbook superlatives and unlock secret photo cards for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* YEARBOOK CANVAS & PHOTO REVEAL */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Yearbook Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-amber-950/80 px-3 py-1 rounded-lg text-xs font-mono text-amber-200 border border-amber-400/40 font-bold">
                🏆 Award #{current + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                {currentAward.title}
              </h3>
              <p className="text-sm font-black text-white mb-1">Winner: {currentAward.winner}</p>
              <p className="text-xs text-gray-300 italic">"{currentAward.subtitle}"</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextAward}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Award 🏆</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Award</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
