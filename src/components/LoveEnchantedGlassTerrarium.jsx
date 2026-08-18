import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Droplets, Sparkles, Share2, RefreshCw, Flower2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function LoveEnchantedGlassTerrarium() {
  const { triggerHaptic } = useAppStore();

  const [watered, setWatered] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleWaterTerrarium = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setWatered(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌿 ENCHANTED GLASS TERRARIUM 🌿\n\nNurtured everlasting love saplings for Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Enchanted Glass Terrarium 🌿✨"
      badgeIcon={<Flower2 className="w-3.5 h-3.5 text-emerald-400" />}
      title={"Enchanted Glass Terrarium"}
      subtitle={"Nurturing Everlasting Love Sanctuary for Sanzu"}
      description={"Water glowing love saplings inside the glass dome and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* GLASS DOME CANVAS & PHOTO REVEAL */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-emerald-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Terrarium Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-emerald-900/80 px-3 py-1 rounded-lg text-xs font-mono text-emerald-200 border border-white/20 font-bold">
              🌿 Glass Sanctuary
            </div>
          </div>

          <div className="pt-1">
            <p className="text-xs text-emerald-200 italic font-bold">
              {watered ? '"Nurtured with eternal love water for Bebo! 🌿💖"' : 'Tap below to water the magical terrarium!'}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleWaterTerrarium}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Droplets className="w-4 h-4 text-blue-300" />
            <span>Water Terrarium 💧</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Terrarium</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
