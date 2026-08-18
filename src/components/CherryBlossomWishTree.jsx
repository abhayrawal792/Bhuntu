import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Flower2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WISHES = [
  "Hang Wish Ribbon: 'May Abu & Queen Sanzu be happily married forever!' 🌸",
  "Hang Wish Ribbon: 'May distance between Nepalgunj & Osaka vanish soon!' ✈️",
  "Hang Wish Ribbon: '100 years of joy, health & laughter for Bebo!' 💖"
];

export default function CherryBlossomWishTree() {
  const { triggerHaptic } = useAppStore();

  const [wishIdx, setWishIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentWish = WISHES[wishIdx % WISHES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleHangWish = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setWishIdx((i) => (i + 1) % WISHES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌸 CHERRY BLOSSOM WISH TREE 🌸\n\n"${currentWish}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Cherry Blossom Wish Tree 🌸✨"
      badgeIcon={<Flower2 className="w-3.5 h-3.5 text-pink-400" />}
      title={"Cherry Blossom Wish Tree"}
      subtitle={"Hang Sacred Wish Ribbons for Queen Sanzu"}
      description={"Hang romantic wish ribbons on the Japanese cherry blossom tree and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* WISH TREE CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Wish Tree Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-pink-900/80 px-3 py-1 rounded-lg text-xs font-mono text-pink-200 border border-white/20 font-bold">
              🌸 Wish #{wishIdx + 1}
            </div>
          </div>

          <div className="pt-1">
            <p className="text-xs text-pink-200 font-bold leading-relaxed">
              "{currentWish}"
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleHangWish}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Hang Wish Ribbon 🌸</span>
          </button>

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
