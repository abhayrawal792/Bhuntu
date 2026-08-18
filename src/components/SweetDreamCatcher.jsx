import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FEATHERS = ['Pink Feather 🪶', 'Golden Star ⭐', 'Rose Flower 🌸', 'Crystal Gem 💎'];

export default function SweetDreamCatcher() {
  const { triggerHaptic } = useAppStore();

  const [attached, setAttached] = useState([0]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const toggleFeather = (i) => {
    playPop();
    triggerHaptic(15);
    setAttached((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

    if (attached.length + 1 === FEATHERS.length) {
      playBloom();
      playSparkle();
      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🪶 SWEET DREAMCATCHER 🪶\n\nWove a protective dreamcatcher for Queen Sanzu to capture peaceful sweet dreams!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Weave a Dreamcatcher 🪶✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Sweet Dreamcatcher Studio"}
      subtitle={"Capturing Sweet Peaceful Dreams for Sanzu"}
      description={"Attach feathers and gems to filter out bad dreams for Bebo and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* DREAMCATCHER HOOP & PHOTO CANVAS */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Dreamcatcher Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="flex justify-center gap-1.5 flex-wrap">
            {attached.map((idx) => (
              <span key={idx} className="text-xs bg-pink-900/60 text-pink-200 border border-pink-400 px-2.5 py-1 rounded-full font-bold">
                {FEATHERS[idx]}
              </span>
            ))}
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-2 flex-wrap max-w-md mx-auto mb-6">
          {FEATHERS.map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={() => toggleFeather(i)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                attached.includes(i) ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-white text-gray-800 border-pink-200 hover:border-pink-400'
              }`}
            >
              {attached.includes(i) ? '✓ ' : '+ '} {f}
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
            <span>Share Dreamcatcher</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
