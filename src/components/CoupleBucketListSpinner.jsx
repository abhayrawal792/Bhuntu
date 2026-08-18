import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Compass } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const DATES = [
  "Candlelight Dinner in Osaka 🕯️🍣",
  "Midnight Stargazing in Nepal 🌌✨",
  "Romantic Movie Marathon 🎬🍿",
  "Boba Tea Cafe & Hand-in-Hand Walk 🧋🚶‍♀️",
  "Sakura Cherry Blossom Picnic 🌸🍱",
  "Late Night Long Distance Video Date 📱💖"
];

export default function CoupleBucketListSpinner() {
  const { triggerHaptic } = useAppStore();

  const [dateIdx, setDateIdx] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentDate = DATES[dateIdx % DATES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSpinWheel = () => {
    if (spinning) return;
    playPop();
    triggerHaptic([15, 30, 15]);
    setSpinning(true);

    const extraSpins = (3 + Math.floor(Math.random() * 3)) * 360;
    const targetRot = rotation + extraSpins + Math.floor(Math.random() * 60);
    setRotation(targetRot);

    setTimeout(() => {
      setSpinning(false);
      const nextIdx = (dateIdx + 1) % DATES.length;
      setDateIdx(nextIdx);
      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);

      playBloom();
      playSparkle();
      confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
    }, 1800);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎡 DATE NIGHT RANDOMIZER 🎡\n\nSelected Date Night Idea:\n"${currentDate}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Date Night Randomizer 🎡✨"
      badgeIcon={<Compass className="w-3.5 h-3.5 text-amber-500" />}
      title={"Date Night Wheel Randomizer"}
      subtitle={"Spin for Sanzu & Abu's Next Romantic Adventure"}
      description={"Spin the date night wheel to pick cute activity ideas for Sanzu & Abu and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* WHEEL STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Wheel Disc */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-amber-500 via-rose-500 to-purple-600 border-4 border-amber-300 shadow-2xl relative flex items-center justify-center p-3"
          >
            {/* Center Photo */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Date Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
            </div>
          </motion.div>

          <div className="pt-2">
            <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider block mb-1">
              SELECTED DATE NIGHT IDEA
            </span>
            <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/60 text-amber-200 text-sm font-extrabold">
              "{currentDate}"
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleSpinWheel}
            disabled={spinning}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${spinning ? 'animate-spin' : ''}`} />
            <span>Spin Date Wheel</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Date</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
