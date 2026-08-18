import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Music, Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function LoveRhythmGame() {
  const { triggerHaptic } = useAppStore();

  const [score, setScore] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleTap = () => {
    playSparkle();
    triggerHaptic(15);
    setScore((s) => s + 10);

    if ((score + 10) % 50 === 0) {
      playBloom();
      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎵 RHYTHM HEART TAPPER 🎵\n\nHigh Score: ${score} pts!\nQueen Sanzu & Abu Rhythm Master!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Rhythm Heart Tapper 🎵✨"
      badgeIcon={<Music className="w-3.5 h-3.5 text-pink-400" />}
      title={"Rhythm Heart Tapper"}
      subtitle={"Tap Hearts to the Rhythm of Love"}
      description={"Tap the pulsing heart in rhythm to score love points and unlock Sanzu's concert photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* RHYTHM CANVAS & PHOTO REVEAL */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Rhythm Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="text-xl font-extrabold text-pink-300 font-mono">
            Love Score: {score} pts 💖
          </div>
        </div>

        {/* PULSING BUTTON */}
        <div className="mb-6">
          <motion.button
            type="button"
            onClick={handleTap}
            whileTap={{ scale: 0.85 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white shadow-2xl flex items-center justify-center mx-auto cursor-pointer border-4 border-white"
          >
            <Heart className="w-16 h-16 fill-white" />
          </motion.button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Score</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
