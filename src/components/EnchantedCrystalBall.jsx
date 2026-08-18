import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MESSAGES = [
  "Abu loves Queen Sanzu more than all the stars in the galaxy! ✨",
  "Distance between Nepal & Japan is temporary, but soul connection is eternal! 🌊",
  "Abu is counting down every second until your next warm embrace! 🔮"
];

export default function EnchantedCrystalBall() {
  const { triggerHaptic } = useAppStore();

  const [msgIdx, setMsgIdx] = useState(0);
  const [isGazing, setIsGazing] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMsg = MESSAGES[msgIdx % MESSAGES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleGazeCrystalBall = () => {
    playPop();
    triggerHaptic(15);
    setIsGazing(true);

    setTimeout(() => {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90]);
      setIsGazing(false);
      setMsgIdx((prev) => (prev + 1) % MESSAGES.length);

      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }, 1200);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔮 ENCHANTED CRYSTAL BALL 🔮\n\nOracle Prediction:\n"${currentMsg}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Enchanted Crystal Ball 🔮✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-300" />}
      title={"Enchanted Crystal Ball"}
      subtitle={"Gaze Into the Mystical Crystal Ball for Sanzu"}
      description={"Gaze into the glowing crystal ball to reveal future prophecies and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CRYSTAL BALL CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-indigo-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Crystal Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="pt-1">
            <p className="text-xs text-indigo-200 font-bold leading-relaxed">
              "{currentMsg}"
            </p>
          </div>
        </div>

        {/* GAZE BUTTON */}
        <div className="mb-6 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleGazeCrystalBall}
            disabled={isGazing}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span className={`text-2xl ${isGazing ? 'animate-spin' : ''}`}>🔮</span>
            <span>{isGazing ? 'Gazing into Crystal...' : 'Gaze into Crystal Ball 🔮'}</span>
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Prophecy</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
