import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FlaskConical, Sparkles, Check, RotateCcw, Heart, Flame } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const INGREDIENTS = [
  { id: 'rose', name: ' Essence of Rose 🌹', color: '#f43f5e', icon: '🌹' },
  { id: 'stardust', name: ' Stardust Powder ✨', color: '#fbbf24', icon: '✨' },
  { id: 'passion', name: ' Passion Drops 💖', color: '#ec4899', icon: '💖' },
  { id: 'loyalty', name: ' Crystal Loyalty 💎', color: '#06b6d4', icon: '💎' },
  { id: 'flame', name: ' Eternal Flame 🔥', color: '#f97316', icon: '🔥' },
  { id: 'moon', name: ' Moonlight Dew 🌙', color: '#a855f7', icon: '🌙' },
];

export default function LovePotion() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.lovePotion;
  const { triggerHaptic } = useAppStore();

  const [addedIngredients, setAddedIngredients] = useState([]);
  const [isStirring, setIsStirring] = useState(false);
  const [brewedPotion, setBrewedPotion] = useState(null);

  const handlePour = (ing) => {
    if (addedIngredients.some((i) => i.id === ing.id) || brewedPotion) return;
    playSparkle();
    triggerHaptic(20);
    setAddedIngredients((prev) => [...prev, ing]);
  };

  const handleStirAndBrew = () => {
    if (addedIngredients.length < 3 || brewedPotion) return;
    setIsStirring(true);
    playSparkle();
    triggerHaptic([30, 80, 40, 90]);

    setTimeout(() => {
      setIsStirring(false);
      const potionNames = [
        '💖 Eternal Love Elixir (100% Cuteness Guarantee)',
        '✨ Infinite Happiness & Warm Hugs Draught',
        '👑 Queen Sanzu\'s Supreme Romance Serum',
      ];
      const randomPotion = potionNames[Math.floor(Math.random() * potionNames.length)];
      setBrewedPotion(randomPotion);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }, 2000);
  };

  const handleReset = () => {
    setAddedIngredients([]);
    setBrewedPotion(null);
    setIsStirring(false);
  };

  // Compute liquid gradient color based on added ingredients
  const fillHeight = Math.min(100, (addedIngredients.length / INGREDIENTS.length) * 100 + 15);
  const liquidColors = addedIngredients.length > 0
    ? addedIngredients.map((i) => i.color).join(', ')
    : '#db2777, #7e22ce';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center font-ui">
      {/* Header Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-bold text-xs mb-3 shadow-sm">
        <FlaskConical className="w-4 h-4 text-purple-600 animate-pulse" />
        <span>Love Potion Mixing Lab 🧪</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2">
        {nepaliTitle}
      </h1>
      <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">{title}</h2>
      <p className="text-gray-600 text-xs sm:text-sm max-w-lg mx-auto mb-8">
        {nepaliSubtitle} — {subtitle}
      </p>

      {/* Main Cauldron & Mixing Bench */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-3xl mx-auto mb-8">

        {/* Animated Bubbling Cauldron */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-48 h-60 mx-auto">
            {/* Steam bubbles */}
            <AnimatePresence>
              {addedIngredients.length > 0 && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-none">
                  {[1, 2, 3, 4].map((b) => (
                    <motion.span
                      key={b}
                      initial={{ y: 20, opacity: 0, scale: 0.5 }}
                      animate={{ y: -30, opacity: [0, 1, 0], scale: 1.2 }}
                      transition={{ duration: 1.5 + b * 0.4, repeat: Infinity, delay: b * 0.3 }}
                      className="text-lg"
                    >
                      ✨
                    </motion.span>
                  ))}
                </div>
              )}
            </AnimatePresence>

            {/* Flask Glass Frame */}
            <motion.div
              animate={{ rotate: isStirring ? [-5, 5, -5] : 0 }}
              transition={{ duration: 0.2, repeat: isStirring ? Infinity : 0 }}
              className="w-full h-full rounded-b-[60px] rounded-t-3xl bg-slate-900/10 backdrop-blur-sm border-4 border-purple-300 shadow-2xl relative overflow-hidden flex flex-col justify-end"
            >
              {/* Liquid fill */}
              <div
                className="w-full transition-all duration-700 ease-out relative"
                style={{
                  height: `${fillHeight}%`,
                  background: `linear-gradient(to top, ${liquidColors})`,
                }}
              >
                {/* Surface bubble waves */}
                <div className="w-full h-3 bg-white/30 animate-pulse" />
              </div>

              {/* Floating Icons inside Flask */}
              <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-2 p-4 pointer-events-none">
                {addedIngredients.map((ing) => (
                  <motion.span
                    key={ing.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, y: [0, -6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-2xl drop-shadow"
                  >
                    {ing.icon}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          <p className="text-xs font-bold text-purple-600 mt-4">
            Ingredients Added: {addedIngredients.length} / {INGREDIENTS.length}
          </p>
        </div>

        {/* Shelf of Interactive Ingredient Bottles */}
        <div className="bg-purple-50/80 p-5 rounded-3xl border border-purple-200 shadow-sm">
          <h3 className="text-sm font-bold text-purple-800 font-ui mb-3 text-left">
            🧪 Tap Bottles to Pour:
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {INGREDIENTS.map((ing) => {
              const isAdded = addedIngredients.some((i) => i.id === ing.id);
              return (
                <button
                  key={ing.id}
                  onClick={() => handlePour(ing)}
                  disabled={isAdded || !!brewedPotion}
                  className={`p-3 rounded-2xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-between ${
                    isAdded
                      ? 'bg-purple-200 text-purple-800 border-purple-300 opacity-60'
                      : 'bg-white text-gray-800 border-purple-200 hover:border-purple-400 hover:scale-105 shadow-xs'
                  }`}
                >
                  <span className="truncate">{ing.name}</span>
                  {isAdded ? <Check className="w-4 h-4 text-purple-600 flex-shrink-0" /> : <span>+</span>}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 mt-5">
            <button
              onClick={handleStirAndBrew}
              disabled={addedIngredients.length < 3 || isStirring || !!brewedPotion}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs shadow-md hover:scale-102 transition-transform cursor-pointer disabled:opacity-40"
            >
              {isStirring ? 'Stirring Cauldron... 🔮' : 'Stir & Brew Potion ✨'}
            </button>
            {addedIngredients.length > 0 && (
              <button
                onClick={handleReset}
                className="p-3.5 rounded-2xl bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Result Love Potion Spell Card */}
      <AnimatePresence>
        {brewedPotion && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl max-w-lg mx-auto border-4 border-white"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 text-2xl">
              🧪✨
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-purple-200 mb-1">
              Official Love Spell Created:
            </h3>
            <p className="text-lg font-extrabold font-nepali mb-3">{brewedPotion}</p>
            <p className="text-xs text-purple-100 italic leading-relaxed">
              "This spell guarantees 100% eternal happiness, endless giggles, and zero long-distance worries for Queen Sanzu!"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
