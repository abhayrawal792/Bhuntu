import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Flame } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FIREWORKS = [
  "Golden Starlight Burst 🎆",
  "Pink Heart Sparkler ✨",
  "Everlasting Rainbow Comet 🌈"
];

export default function NewYearLoveFireworks() {
  const { triggerHaptic } = useAppStore();

  const [fireworkIdx, setFireworkIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFirework = FIREWORKS[fireworkIdx % FIREWORKS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleLaunchFirework = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setFireworkIdx((i) => (i + 1) % FIREWORKS.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎆 NEW YEAR LOVE FIREWORKS 🎆\n\nLaunched: [${currentFirework}]\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="New Year Love Fireworks 🎆✨"
      badgeIcon={<Flame className="w-3.5 h-3.5 text-amber-400" />}
      title={"New Year Love Fireworks"}
      subtitle={"Launch Romantic Fireworks for Queen Sanzu"}
      description={"Launch spectacular night sky fireworks to celebrate Queen Sanzu and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* FIREWORKS CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Fireworks Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-amber-950/80 px-3 py-1 rounded-lg text-xs font-mono text-amber-200 border border-amber-400/40 font-bold">
              🎆 {currentFirework}
            </div>
          </div>
        </div>

        {/* LAUNCH BUTTON */}
        <div className="mb-6 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleLaunchFirework}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Launch Love Fireworks 🎆</span>
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
            <span>Share Fireworks</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
