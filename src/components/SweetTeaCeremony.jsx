import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Coffee, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const INGREDIENTS = [
  { name: "Fresh Milk & Water 🥛", icon: "🥛" },
  { name: "Nepali Tea Leaves 🍃", icon: "🍃" },
  { name: "Cardamom & Ginger 🫚", icon: "🫚" },
  { name: "Sweet Love Sugar 🍬", icon: "🍬" }
];

export default function SweetTeaCeremony() {
  const { triggerHaptic } = useAppStore();

  const [added, setAdded] = useState([]);
  const [poured, setPoured] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleAdd = (i) => {
    playPop();
    triggerHaptic(15);
    if (!added.includes(i)) setAdded((prev) => [...prev, i]);
  };

  const handlePour = () => {
    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120]);
    setPoured(true);
    confetti({ particleCount: 95, spread: 85, origin: { y: 0.5 } });
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setAdded([]);
    setPoured(false);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `☕ NEPALI MATKA CHIYA DATE ☕\n\nBrewed fresh hot masala chiya for Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Nepali Matka Chiya Date ☕✨"
      badgeIcon={<Coffee className="w-3.5 h-3.5 text-amber-600" />}
      title={"Nepali Matka Chiya Date"}
      subtitle={"Brewing Spiced Masala Tea for Queen Sanzu"}
      description={"Add spices and pour hot masala chiya into clay matka cups to unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* TEA CEREMONY STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-500 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {poured ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Tea Ceremony Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/60 text-amber-200 text-xs font-bold">
                "Steaming Hot Matka Chiya Ready for Bebo! ☕💖"
              </div>
            </motion.div>
          ) : (
            <div className="py-6 space-y-3">
              <span className="text-7xl block animate-bounce">🫖</span>
              <p className="text-xs font-extrabold text-amber-300 font-mono">
                Added Ingredients: {added.length} / {INGREDIENTS.length}
              </p>
            </div>
          )}
        </div>

        {/* INGREDIENTS SELECTOR */}
        {!poured ? (
          <div className="space-y-4 max-w-md mx-auto mb-6">
            <div className="flex justify-center gap-2 flex-wrap">
              {INGREDIENTS.map((ing, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAdd(i)}
                  disabled={added.includes(i)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                    added.includes(i) ? 'bg-amber-900 text-amber-100 border-amber-800' : 'bg-white text-amber-950 border-amber-300 shadow-sm'
                  }`}
                >
                  {ing.icon} {ing.name}
                </button>
              ))}
            </div>

            {added.length === INGREDIENTS.length && (
              <button
                type="button"
                onClick={handlePour}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 via-rose-600 to-amber-700 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Pour Hot Matka Chiya! ☕</span>
              </button>
            )}
          </div>
        ) : null}

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {poured && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Brew Another Cup</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Tea Date</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
