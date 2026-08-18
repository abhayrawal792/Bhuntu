import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Wand2, Sparkles, Share2, RefreshCw, Flame, Moon, Heart, Star } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const INGREDIENTS = [
  { name: "Star Dust ✨", icon: <Star className="w-5 h-5 text-amber-300" /> },
  { name: "Rose Petals 🌹", icon: <Heart className="w-5 h-5 text-rose-400" /> },
  { name: "Moon Light 🌙", icon: <Moon className="w-5 h-5 text-purple-300" /> },
  { name: "Dragon Flame 🔥", icon: <Flame className="w-5 h-5 text-orange-400" /> }
];

export default function LoveSpellCaster() {
  const { triggerHaptic } = useAppStore();

  const [cauldron, setCauldron] = useState([]);
  const [isBrewed, setIsBrewed] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleAddIngredient = (item) => {
    if (cauldron.length >= 3) return;
    playPop();
    triggerHaptic(10);
    setCauldron(c => [...c, item]);
  };

  const handleCastSpell = () => {
    if (cauldron.length === 0) return;

    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120]);
    setIsBrewed(true);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
  };

  const handleResetCauldron = () => {
    playPop();
    triggerHaptic(10);
    setCauldron([]);
    setIsBrewed(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🪄 MAGIC WAND SPELL CASTER 🪄\n\nQueen Sanzu cast a magic love spell with ${cauldron.join(', ')}!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Magic Wand & Cauldron Arena 🪄✨"
      badgeIcon={<Wand2 className="w-3.5 h-3.5 text-purple-300" />}
      title={"Magic Wand Spell Caster"}
      subtitle={"Brew Magical Love Spells in the Cauldron Arena"}
      description={"Select magic ingredients, drop them into the glowing cauldron, and wave your wand to cast spells and unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* CAULDRON ARENA STAGE */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* CAULDRON & MAGIC MIRROR FRAME */}
          <div className="relative w-full h-56 rounded-2xl bg-purple-950/30 border-2 border-purple-400/40 p-4 shadow-inner flex flex-col items-center justify-center overflow-hidden">
            {isBrewed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full h-full space-y-2 flex flex-col items-center"
              >
                <div className="w-full h-40 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Sorceress Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                  <div className="absolute inset-0 bg-purple-500/10 pointer-events-none" />
                </div>
                <p className="text-xs font-bold text-purple-200">
                  ✨ SPELL CAST SUCCESSFULLY FOR QUEEN SANZU! ✨
                </p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                <motion.div
                  animate={{ y: [-4, 4, -4], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl"
                >
                  🧪
                </motion.div>
                <div className="text-xs font-mono font-bold text-purple-300">
                  CAULDRON MIX: {cauldron.length}/3 INGREDIENTS
                </div>
                <div className="flex gap-2 justify-center">
                  {cauldron.map((ing, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-purple-900 border border-purple-400 text-[10px] font-bold text-purple-200">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* INGREDIENT BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {INGREDIENTS.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleAddIngredient(item.name)}
                disabled={isBrewed}
                className="p-3 rounded-2xl bg-stone-900 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-extrabold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow disabled:opacity-50"
              >
                {item.icon}
                <span className="text-[11px] truncate w-full text-center">{item.name}</span>
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {!isBrewed ? (
              <button
                type="button"
                onClick={handleCastSpell}
                disabled={cauldron.length === 0}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Cast Magic Spell! 🪄</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetCauldron}
                className="py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-purple-200 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Brew Another Spell</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Spell</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
