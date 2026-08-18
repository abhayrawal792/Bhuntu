import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MACARONS = ['🩷 Pink Strawberry', '🩵 Blue Blueberry', '💜 Purple Lavender', '💛 Yellow Lemon', '💚 Green Pistachio'];

export default function SweetDessertTower() {
  const { triggerHaptic } = useAppStore();

  const [tower, setTower] = useState([0]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const addMacaron = () => {
    playPop();
    triggerHaptic(15);
    if (tower.length < 8) {
      setTower((prev) => [Math.floor(Math.random() * MACARONS.length), ...prev]);
      if (tower.length + 1 === 8) {
        playBloom();
        playSparkle();
        triggerHaptic([40, 80, 120]);
        let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
        setPhotoIdx(nextPhoto);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      }
    }
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setTower([0]);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧁 MACARON DESSERT TOWER 🧁\n\nStacked 8-Layer Macaron Tower for Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Macaron Dessert Tower 🧁✨"
      badgeIcon={<Cake className="w-3.5 h-3.5 text-pink-500" />}
      title={"Macaron Dessert Tower"}
      subtitle={"Stack Macarons High for Queen Sanzu"}
      description={"Tap below to stack colorful sweet macarons into a tall dessert tower and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* TOWER STAGE & PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {tower.length === 8 && (
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40 mb-2">
              <img
                src={currentPhoto}
                alt="Dessert Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>
          )}

          <div className="w-full h-56 rounded-2xl border-2 border-pink-200/40 bg-black/40 flex flex-col justify-end items-center p-3 overflow-hidden">
            <div className="space-y-1 w-full max-w-[200px]">
              {tower.map((idx, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="py-1.5 px-3 rounded-full bg-white text-xs font-bold text-rose-600 shadow-md text-center"
                >
                  {MACARONS[idx]}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={addMacaron}
            disabled={tower.length >= 8}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40"
          >
            <Sparkles className="w-4 h-4" />
            <span>Stack Macaron! ({tower.length}/8)</span>
          </button>

          {tower.length > 1 && (
            <button
              type="button"
              onClick={handleReset}
              className="py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Tower</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
