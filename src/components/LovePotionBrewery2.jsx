import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FlaskConical, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const POTIONS = [
  { name: "Eternal Love Elixir 🧪", desc: "Brewed with 100% pure devotion, sakura petals, and sweet smiles!" },
  { name: "Nepalgunj-Osaka Bridge Potion 🌐", desc: "Instantly erases 4,500 miles between Abu & Queen Sanzu!" },
  { name: "Everlasting Marriage Serum 💍", desc: "Seals our sacred vow to build our dream home together!" }
];

export default function LovePotionBrewery2() {
  const { triggerHaptic } = useAppStore();

  const [potionIdx, setPotionIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPotion = POTIONS[potionIdx % POTIONS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleBrewPotion = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setPotionIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧪 LOVE POTION BREWERY 🧪\n\n[${currentPotion.name}]\n"${currentPotion.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Love Potion Brewery 🧪✨"
      badgeIcon={<FlaskConical className="w-3.5 h-3.5 text-purple-400" />}
      title={"Love Potion Brewery"}
      subtitle={"Brew Magical Romantic Elixirs for Queen Sanzu"}
      description={"Mix magical romantic ingredients in the alchemy cauldron to unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* POTION CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={potionIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Potion Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-purple-900/80 px-3 py-1 rounded-lg text-xs font-mono text-purple-200 border border-white/20 font-bold">
                🧪 Potion #{potionIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider mb-1">
                {currentPotion.name}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentPotion.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* POTION BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {POTIONS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleBrewPotion(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                potionIdx === idx
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-purple-200 border-purple-500/40 hover:border-purple-400'
              }`}
            >
              🧪 Potion #{idx + 1}
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
            <span>Share Love Potion</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
