import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Waves, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WISHES = [
  { bottle: "Ocean Bottle #1 🍾", text: "May Abu & Queen Sanzu marry soon and build our dream home!" },
  { bottle: "Ocean Bottle #2 🌊", text: "May 4,500 miles between Nepalgunj & Osaka disappear forever!" },
  { bottle: "Ocean Bottle #3 💖", text: "May Queen Sanzu always be this happy, loved, and smiling!" }
];

export default function LoveWishBottleOcean() {
  const { triggerHaptic } = useAppStore();

  const [wishIdx, setWishIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentWish = WISHES[wishIdx % WISHES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectWish = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setWishIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌊 LOVE WISH BOTTLE OCEAN 🌊\n\n[${currentWish.bottle}]\n"${currentWish.text}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Love Wish Bottle Ocean 🌊✨"
      badgeIcon={<Waves className="w-3.5 h-3.5 text-cyan-400" />}
      title={"Love Wish Bottle Ocean"}
      subtitle={"Floating Message Bottles Sealed with Devotion"}
      description={"Uncork floating wish bottles drifting across the ocean waves to unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* OCEAN CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={wishIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-cyan-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Wish Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-cyan-900/80 px-3 py-1 rounded-lg text-xs font-mono text-cyan-200 border border-white/20 font-bold">
                🌊 Bottle #{wishIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider mb-1">
                {currentWish.bottle}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentWish.text}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BOTTLE BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {WISHES.map((w, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectWish(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                wishIdx === idx
                  ? 'bg-cyan-500 text-white border-cyan-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-cyan-200 border-cyan-500/40 hover:border-cyan-400'
              }`}
            >
              🌊 Bottle #{idx + 1}
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
            <span>Share Ocean Wish</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
