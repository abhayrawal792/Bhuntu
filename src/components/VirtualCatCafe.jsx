import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Coffee, Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CATS = [
  { name: 'Mochi 🐱', emoji: '🐱', mood: 'Happy & Purring', msg: 'Mochi purrs warmly when Sanzu pets her!' },
  { name: 'Bebo Jr 😺', emoji: '😺', mood: 'Playful Kitten', msg: 'Bebo Jr is chasing a heart string!' },
  { name: 'Luna 🐈', emoji: '🐈', mood: 'Sleeping Cozy', msg: 'Luna loves cuddling next to Bebo!' }
];

export default function VirtualCatCafe() {
  const { triggerHaptic } = useAppStore();

  const [activeCat, setActiveCat] = useState(0);
  const [treatsCount, setTreatsCount] = useState(3);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentCat = CATS[activeCat % CATS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleFeedCat = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setTreatsCount((prev) => prev + 1);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🐱 BEBO'S VIRTUAL CAT CAFE 🐱\n\nKitten: ${currentCat.name}\nStatus: ${currentCat.mood}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Cute Kitten Coffee Date 🐱☕"
      badgeIcon={<Coffee className="w-3.5 h-3.5 text-pink-500" />}
      title={"Virtual Kitten Coffee Date"}
      subtitle={"Pet Cute Kittens with Queen Sanzu"}
      description={"Pet cute kittens and enjoy a warm cappuccino date with secret memory photo reveals!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CAT STAGE WITH PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Cat Cafe Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="pt-2">
            <h3 className="text-xl font-extrabold text-white mb-1">{currentCat.name}</h3>
            <span className="text-xs font-bold text-pink-300 bg-pink-900/60 px-3 py-1 rounded-full border border-pink-400 inline-block mb-2">
              Status: {currentCat.mood}
            </span>
            <p className="text-xs text-gray-300 italic">"{currentCat.msg}"</p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-2 mb-6">
          {CATS.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                playPop();
                setActiveCat(i);
              }}
              className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                activeCat === i
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                  : 'bg-white text-rose-950 border-pink-200 hover:border-pink-400'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleFeedCat}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Feed Treat 🐟 ({treatsCount})</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Cafe</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
