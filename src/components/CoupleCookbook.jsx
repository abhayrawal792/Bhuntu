import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Utensils, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const DISHES = [
  { name: "Spicy Panipuri 🥟", desc: "Bhuntu's absolute favorite treat, prepared with extra love!" },
  { name: "Steamed Momos 🥟", desc: "Hot dumplings to share on cozy dates!" },
  { name: "Current Spicy Noodles 🍜", desc: "Late night noodle feast for Abu & Sanzu!" }
];

export default function CoupleCookbook() {
  const { triggerHaptic } = useAppStore();

  const [dishIdx, setDishIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentDish = DISHES[dishIdx % DISHES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCookDish = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setDishIdx((i) => (i + 1) % DISHES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🍳 COUPLE COOKBOOK & BENTO 🍳\n\nCooked Recipe: [${currentDish.name}]\n"${currentDish.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Couple Cookbook & Bento 🍳✨"
      badgeIcon={<Utensils className="w-3.5 h-3.5 text-emerald-400" />}
      title={"Couple Cookbook & Bento"}
      subtitle={"Cooking Favorite Dishes for Queen Sanzu"}
      description={"Cook romantic favorite recipes for Queen Sanzu and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* COOKBOOK CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-emerald-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Cookbook Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-emerald-900/80 px-3 py-1 rounded-lg text-xs font-mono text-emerald-200 border border-white/20 font-bold">
              🍱 Recipe #{dishIdx + 1}
            </div>
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-extrabold text-emerald-300 mb-1">{currentDish.name}</h3>
            <p className="text-xs text-gray-300 italic">"{currentDish.desc}"</p>
          </div>
        </div>

        {/* COOK BUTTON */}
        <div className="mb-6 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleCookDish}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Cook Next Dish 🍳</span>
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
            <span>Share Recipe</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
