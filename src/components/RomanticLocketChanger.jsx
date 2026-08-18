import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, RefreshCw, Lock, Unlock } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const METALS = [
  { name: "Gold 💛", color: "from-amber-400 to-yellow-600 border-amber-300 shadow-amber-500/50" },
  { name: "Rose Gold 🌸", color: "from-rose-400 to-pink-600 border-rose-300 shadow-rose-500/50" },
  { name: "Silver 🩶", color: "from-slate-300 to-stone-500 border-slate-200 shadow-slate-400/50" },
  { name: "Diamond 💎", color: "from-cyan-300 to-blue-500 border-cyan-200 shadow-cyan-400/50" }
];

export default function RomanticLocketChanger() {
  const { triggerHaptic } = useAppStore();

  const [metalIdx, setMetalIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMetal = METALS[metalIdx % METALS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleToggleLocket = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);

    if (!isOpen) {
      setIsOpen(true);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
    } else {
      setIsOpen(false);
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📿 3D GOLDEN HEART LOCKET 📿\n\nFinish: ${currentMetal.name}\nEngraved Vow: "Abu + Queen Sanzu Forever 💍"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="3D Golden Locket 📿✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-400" />}
      title={"3D Golden Heart Locket"}
      subtitle={"Hinged Golden Heart Locket Preserving Queen Sanzu's Photo"}
      description={"Swing open the hinged golden heart doors of the locket to reveal Queen Sanzu's face photo and engraved vows!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* SWAYING CHAIN */}
        <div className="w-1 h-12 bg-amber-400/60 rounded-full mx-auto animate-pulse" />

        {/* 3D HINGED LOCKET CABINET */}
        <div className="relative max-w-sm mx-auto rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl p-6 space-y-6 flex flex-col items-center">
          
          {/* HEART LOCKET CONTAINER */}
          <div
            onClick={handleToggleLocket}
            className={`relative w-64 h-64 rounded-full bg-gradient-to-br ${currentMetal.color} border-4 p-4 shadow-2xl cursor-pointer transition-transform duration-500 hover:scale-105 flex items-center justify-center overflow-hidden`}
          >
            {/* INSIDE PHOTO STAGE */}
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/60 relative bg-black shadow-inner">
              <img
                src={currentPhoto}
                alt="Locket Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
            </div>

            {/* HINGED DOOR COVERS (LEFT & RIGHT) */}
            <motion.div
              animate={{ rotateY: isOpen ? -140 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className={`absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-br ${currentMetal.color} border-r-2 border-white/40 origin-left flex items-center justify-end pr-2 z-20`}
            >
              {!isOpen && <Lock className="w-6 h-6 text-stone-900 shadow" />}
            </motion.div>

            <motion.div
              animate={{ rotateY: isOpen ? 140 : 0 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className={`absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-bl ${currentMetal.color} border-l-2 border-white/40 origin-right flex items-center justify-start pl-2 z-20`}
            >
              {!isOpen && <Heart className="w-6 h-6 text-stone-900 fill-stone-900 shadow" />}
            </motion.div>
          </div>

          {/* INSCRIPTION BANNER */}
          <div className="bg-black/90 p-3.5 rounded-2xl border border-amber-400/40 w-full space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-widest block">
              ENGRAVED LOCKET VOW
            </span>
            <p className="text-xs font-black text-white">
              "Abu + Queen Sanzu — Everlasting Marriage 💍"
            </p>
          </div>

          {/* METAL FINISH SELECTOR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
            {METALS.map((m, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMetalIdx(idx)}
                className={`py-2 px-2 rounded-xl border text-[11px] font-extrabold transition-all cursor-pointer ${
                  metalIdx === idx
                    ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md font-extrabold'
                    : 'bg-stone-900 text-amber-200 border-amber-500/30 hover:border-amber-400'
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2 w-full">
            <button
              type="button"
              onClick={handleToggleLocket}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isOpen ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
              <span>{isOpen ? 'Close Locket' : 'Open Golden Locket'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Locket</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
