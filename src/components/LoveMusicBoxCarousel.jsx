import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Music, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FOODS = [
  { name: 'Takoyaki 🐙', desc: 'Hot octopus balls drizzled with savory sauce in Dotonbori.' },
  { name: 'Taiyaki 🐟', desc: 'Warm fish-shaped waffle stuffed with sweet red bean paste.' },
  { name: 'Mochi Skewers 🍡', desc: 'Soft & chewy dango with sweet soy glaze under neon lights.' },
  { name: 'Matcha Soft Serve 🍦', desc: 'Creamy green tea ice cream shared on a cozy bench in Shibuya.' }
];

export default function LoveMusicBoxCarousel() {
  const { triggerHaptic } = useAppStore();

  const [activeIdx, setActiveIdx] = useState(0);
  const [eaten, setEaten] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFood = FOODS[activeIdx % FOODS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleEat = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setActiveIdx(idx);
    if (!eaten.includes(idx)) setEaten((e) => [...e, idx]);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎠 MUSICAL CAROUSEL & STREET FOOD DATE 🎠\n\nTasted: "${currentFood.name}"\n"${currentFood.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Musical Carousel 🎠✨"
      badgeIcon={<Music className="w-3.5 h-3.5 text-pink-400" />}
      title={"Musical Carousel & Food Date"}
      subtitle={"Tokyo Street Food & Carousel Rides with Sanzu"}
      description={"Stroll through Japanese night markets, taste street snacks, and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CAROUSEL STAGE & PHOTO REVEAL */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Carousel Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="pt-1">
            <h3 className="text-lg font-extrabold text-pink-300 mb-1">{currentFood.name}</h3>
            <p className="text-xs text-gray-300 italic mb-2">"{currentFood.desc}"</p>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-400 font-bold">
              {eaten.length}/{FOODS.length} Snacks Tasted 😋
            </span>
          </div>
        </div>

        {/* FOOD OPTIONS */}
        <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto mb-6">
          {FOODS.map((f, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleEat(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md font-bold'
                  : 'bg-white text-gray-800 border-pink-200 hover:border-pink-400'
              }`}
            >
              {f.name}
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
            <span>Share Carousel</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
