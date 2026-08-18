import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Utensils, Sparkles, Share2, RefreshCw, Flame, Heart } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const INGREDIENTS = [
  { name: "Flour Dough 🌾", icon: "🌾" },
  { name: "Spicy Mint Water 🌶️", icon: "🌶️" },
  { name: "Fresh Momo Filling 🥩", icon: "🥟" },
  { name: "Abu's Pure Love ❤️", icon: "💖" }
];

const DISHES = [
  { title: "Panipuri Feast 🥟", desc: "Crispy puris filled with potato, chickpeas, and spicy mint water!" },
  { title: "Steamed Momo Platter 🥟", desc: "Fresh hot momos hand-folded by Abu for Queen Sanzu!" },
  { title: "Clay Pot Matka Chiya ☕", desc: "Pot-brewed cardamom tea enjoyed under Osaka stars!" }
];

export default function CoupleRecipeBook() {
  const { triggerHaptic } = useAppStore();

  const [potItems, setPotItems] = useState([]);
  const [isCooked, setIsCooked] = useState(false);
  const [dishIdx, setDishIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentDish = DISHES[dishIdx % DISHES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleAddIngredient = (item) => {
    if (potItems.length >= 4) return;
    playPop();
    triggerHaptic(10);
    setPotItems(prev => [...prev, item]);
  };

  const handleStartCooking = () => {
    if (potItems.length === 0) return;

    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120]);
    setIsCooked(true);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
  };

  const handleResetPot = () => {
    playPop();
    triggerHaptic(10);
    setPotItems([]);
    setIsCooked(false);
    setDishIdx(d => (d + 1) % DISHES.length);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🍳 COUPLE KITCHEN STEAMER 🍳\n\nCooked Dish: [${currentDish.title}]\nRecipe: "${currentDish.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Couple Kitchen Steamer 🍳✨"
      badgeIcon={<Utensils className="w-3.5 h-3.5 text-amber-400" />}
      title={"Interactive Couple Kitchen"}
      subtitle={"Cook Panipuri & Steamed Momos for Queen Sanzu"}
      description={"Select fresh ingredients, drop them into Abu's steamer pot, and cook delicious feasts for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* KITCHEN STOVE & STEAMER POT CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-amber-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* STEAMER POT & DISH DISPLAY */}
          <div className="relative w-full h-56 rounded-2xl bg-amber-950/30 border-2 border-amber-400/40 p-4 shadow-inner flex flex-col items-center justify-center overflow-hidden">
            {isCooked ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full h-full space-y-2 flex flex-col items-center"
              >
                <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Chef Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                  />
                  <div className="absolute top-2 right-2 bg-amber-950/80 px-2.5 py-1 rounded text-[10px] font-mono font-bold text-amber-200">
                    COOKED FRESH
                  </div>
                </div>
                <p className="text-xs font-black text-amber-300">
                  {currentDish.title} — READY TO EAT! 🥟
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <motion.div
                  animate={{ y: [-4, 4, -4], rotate: [-2, 2, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-6xl"
                >
                  🍲
                </motion.div>
                <div className="text-xs font-mono font-bold text-amber-300">
                  STEAMER POT: {potItems.length}/4 INGREDIENTS
                </div>
                <div className="flex gap-2 justify-center flex-wrap">
                  {potItems.map((ing, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-amber-900 border border-amber-400 text-[10px] font-bold text-amber-200">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* INGREDIENT SELECTORS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INGREDIENTS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleAddIngredient(item.name)}
                disabled={isCooked}
                className="p-3 rounded-2xl bg-stone-900 hover:bg-amber-900 border border-amber-500/40 text-amber-200 font-extrabold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow disabled:opacity-50"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[11px] truncate w-full text-center">{item.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {!isCooked ? (
              <button
                type="button"
                onClick={handleStartCooking}
                disabled={potItems.length === 0}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Flame className="w-4 h-4" />
                <span>Cook Feast! 🍳</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetPot}
                className="py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-200 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Cook Next Dish</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Dish Recipe</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
