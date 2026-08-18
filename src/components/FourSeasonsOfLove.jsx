import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sun, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SEASONS = [
  { name: "🌸 Spring", desc: "Abu's heart bloomed the moment he found Queen Sanzu. Like spring cherry blossoms in Osaka, their love started fresh, pure, and beautiful." },
  { name: "☀️ Summer", desc: "Long summer days and warm video calls! The heat of Nepalgunj matched the warmth of Sanzu's voice across the Pacific Ocean." },
  { name: "🍂 Autumn", desc: "As autumn leaves change color, so did their love — deepening, warming, becoming something permanent and unshakable." },
  { name: "❄️ Winter", desc: "Even in the coldest winter, Queen Sanzu's love is Abu's warmth. When Osaka gets cold, Abu's messages heat Sanzu's heart." }
];

export default function FourSeasonsOfLove() {
  const { triggerHaptic } = useAppStore();

  const [activeSeason, setActiveSeason] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentSeason = SEASONS[activeSeason % SEASONS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectSeason = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setActiveSeason(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌸 4 SEASONS OF LOVE 🌸\n\n[${currentSeason.name}]\n"${currentSeason.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="4 Seasons of Love 🌸✨"
      badgeIcon={<Sun className="w-3.5 h-3.5 text-amber-400" />}
      title={"4 Seasons of Love"}
      subtitle={"Abu & Sanzu's Love Through Every Season"}
      description={"Explore the 4 romantic seasons of Abu & Queen Sanzu's love story and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* SEASON CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Season Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-amber-950/80 px-3 py-1 rounded-lg text-xs font-mono text-amber-200 border border-amber-400/40 font-bold">
                {currentSeason.name}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                {currentSeason.name}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentSeason.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* SEASON BUTTONS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-md mx-auto mb-6">
          {SEASONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSeason(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                activeSeason === idx
                  ? 'bg-amber-500 text-white border-amber-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-amber-200 border-amber-500/40 hover:border-amber-400'
              }`}
            >
              {s.name}
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
            <span>Share Season Memory</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
