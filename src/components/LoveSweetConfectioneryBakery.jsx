import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Cake } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const BOBA_FLAVORS = [
  { name: 'Taro 🍇', desc: 'Creamy purple taro boba with brown sugar pearls.' },
  { name: 'Matcha 🍵', desc: 'Fresh Japanese matcha latte boba tea.' },
  { name: 'Strawberry 🍓', desc: 'Sweet strawberry milk boba with heart jelly.' }
];

export default function LoveSweetConfectioneryBakery() {
  const { triggerHaptic } = useAppStore();

  const [flavorIdx, setFlavorIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFlavor = BOBA_FLAVORS[flavorIdx % BOBA_FLAVORS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleBrewBoba = (i) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setFlavorIdx(i);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧋 BOBA TEA & BAKERY CAFE 🧋\n\nBrewed: "${currentFlavor.name}"\n"${currentFlavor.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Boba Tea & Bakery 🧋✨"
      badgeIcon={<Cake className="w-3.5 h-3.5 text-pink-400" />}
      title={"Boba Tea & Bakery Cafe"}
      subtitle={"Brewing Sweet Boba Tea for Queen Sanzu"}
      description={"Brew custom boba tea flavors, bake sweet desserts, and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CAFE CANVAS & PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Bakery Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-pink-900/80 px-3 py-1 rounded-lg text-xs font-mono text-pink-200 border border-white/20 font-bold">
              🧋 {currentFlavor.name}
            </div>
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-extrabold text-pink-300 mb-1">{currentFlavor.name}</h3>
            <p className="text-xs text-gray-300 italic">"{currentFlavor.desc}"</p>
          </div>
        </div>

        {/* FLAVOR SELECTOR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {BOBA_FLAVORS.map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleBrewBoba(i)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                flavorIdx === i
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-pink-200 border-pink-500/40 hover:border-pink-400'
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
            <span>Share Boba Date</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
