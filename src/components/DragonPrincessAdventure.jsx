import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Shield, Sparkles, Share2, RefreshCw, Crown } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STAGES = [
  {
    title: "Stage 1: The Dragon Challenge 🐉",
    text: "A dragon guards the bridge! What is Queen Sanzu's favorite food feast?",
    options: ["Pizza", "Spicy Panipuri, Momo & Noodles! 🥟", "Salad"],
    correct: 1
  },
  {
    title: "Stage 2: The Ocean Crossing 🌊",
    text: "How do Abu & Sanzu bridge the 4,500 miles between Nepalgunj & Osaka?",
    options: ["By sailboat", "Daily video calls & eternal love! 📱", "Waiting silently"],
    correct: 1
  }
];

export default function DragonPrincessAdventure() {
  const { triggerHaptic } = useAppStore();

  const [stageIdx, setStageIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentStage = STAGES[stageIdx % STAGES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePickOption = (idx) => {
    if (idx === currentStage.correct) {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90]);
      setSelected(idx);

      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    } else {
      playPop();
      triggerHaptic(10);
    }
  };

  const handleNextStage = () => {
    playPop();
    triggerHaptic(10);
    setStageIdx((i) => (i + 1) % STAGES.length);
    setSelected(null);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🐉 DRAGON & PRINCESS QUEST 🐉\n\nQuest Stage: [${currentStage.title}]\n"${currentStage.text}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Dragon & Princess Quest 🐉✨"
      badgeIcon={<Crown className="w-3.5 h-3.5 text-amber-400" />}
      title={"Dragon & Princess Quest"}
      subtitle={"Abu's Quest to Reach Queen Sanzu"}
      description={"Solve quest challenges and overcome dragon obstacles to unlock secret photo cards for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* QUEST CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={stageIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Quest Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                {currentStage.title}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentStage.text}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* OPTIONS GRID */}
        <div className="space-y-2 max-w-md mx-auto mb-6">
          {currentStage.options.map((opt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePickOption(idx)}
              disabled={selected !== null}
              className={`w-full p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                selected === idx
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-amber-200 border-amber-500/40 hover:border-amber-400'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {selected !== null && (
            <button
              type="button"
              onClick={handleNextStage}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Stage ⚔️</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Quest</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
