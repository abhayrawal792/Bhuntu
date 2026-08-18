import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ChefHat, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STEPS = [
  { label: "1. Roll Dough into Heart Shape 🫓", icon: "🫓" },
  { label: "2. Spread Sweet Tomato Sauce 🍅", icon: "🍅" },
  { label: "3. Sprinkle Extra Mozzarella Cheese 🧀", icon: "🧀" },
  { label: "4. Place Heart Pepperonis 💕", icon: "🍕" },
  { label: "5. Bake in Brick Oven! 🔥", icon: "🔥" }
];

export default function RomanticCookingRecipe() {
  const { triggerHaptic } = useAppStore();

  const [step, setStep] = useState(0);
  const [baked, setBaked] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextStep = () => {
    playPop();
    triggerHaptic(20);
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setBaked(true);
      confetti({ particleCount: 95, spread: 85, origin: { y: 0.5 } });
    }
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setStep(0);
    setBaked(false);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🍕 HEART PIZZA BAKERY 🍕\n\nBaked fresh hot heart-shaped pizza for Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Heart Pizza Bakery 🍕✨"
      badgeIcon={<ChefHat className="w-3.5 h-3.5 text-amber-500" />}
      title={"Heart Pizza Bakery"}
      subtitle={"Baking Heart-Shaped Pizza for Queen Sanzu"}
      description={"Follow the baking steps to create Bebo's favorite romantic meal and unlock bakery photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {!baked ? (
          <motion.div
            key={step}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-3xl bg-white border-4 border-amber-400 shadow-2xl max-w-md mx-auto mb-6 text-center space-y-4"
          >
            <span className="text-6xl block animate-bounce">{STEPS[step].icon}</span>
            <h3 className="text-base font-extrabold text-amber-950">{STEPS[step].label}</h3>
            <p className="text-xs text-amber-800">Tap button below to complete this ingredient step!</p>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-rose-500 to-amber-600 text-white font-bold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:opacity-95"
            >
              <Sparkles className="w-4 h-4" /> Next Step →
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6"
          >
            {/* Photo Card */}
            <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Chef Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
            </div>

            <div className="pt-1">
              <h3 className="text-xl font-extrabold text-amber-300 mb-1">
                "Fresh Hot Heart Pizza for Bebo! 🍕"
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Made with 100% love, extra mozzarella cheese, and sweet hugs 💕
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Bake Another Pizza</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Pizza</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
