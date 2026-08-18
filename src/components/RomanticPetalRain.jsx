import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flower, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MESSAGES = [
  "Every falling petal represents one reason Abu loves Queen Sanzu! 🌸",
  "You are the most beautiful flower in Abu's entire world! 💕",
  "Abu's love blooms eternally across 4,500 miles between Nepalgunj & Osaka! ✈️"
];

export default function RomanticPetalRain() {
  const { triggerHaptic } = useAppStore();

  const [msgIdx, setMsgIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMessage = MESSAGES[msgIdx % MESSAGES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPetal = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setMsgIdx((i) => (i + 1) % MESSAGES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌸 ROMANTIC PETAL RAIN 🌸\n\n"${currentMessage}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Romantic Petal Rain 🌸✨"
      badgeIcon={<Flower className="w-3.5 h-3.5 text-rose-400" />}
      title={"Romantic Petal Rain"}
      subtitle={"Shower Queen Sanzu in Floating Sakura Petals"}
      description={"Shower Queen Sanzu in romantic sakura petals and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PETAL CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Petal Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-rose-900/80 px-3 py-1 rounded-lg text-xs font-mono text-rose-200 border border-white/20 font-bold">
                🌸 Petal Rain #{msgIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentMessage}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPetal}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Shower Petals 🌸</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Petal Rain</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}