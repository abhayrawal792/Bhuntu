import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gamepad2, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const DANCE_MOVES = ['⬅️ LEFT STEP', '⬆️ UP JUMP', '⬇️ DOWN GROOVE', '➡️ RIGHT SLIDE'];

export default function LoveArcadeDanceMachine() {
  const { triggerHaptic } = useAppStore();

  const [score, setScore] = useState(0);
  const [moveIdx, setMoveIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMove = DANCE_MOVES[moveIdx % DANCE_MOVES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleDanceStep = () => {
    playSparkle();
    triggerHaptic(15);
    setScore((s) => s + 100);
    setMoveIdx((prev) => (prev + 1) % DANCE_MOVES.length);

    if ((score + 100) % 500 === 0) {
      playBloom();
      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);
      confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💃 LOVE DANCE REVOLUTION ARCADE 💃\n\nHigh Score: ${score} pts!\nQueen Sanzu & Abu Dance Stage Champions!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Love Dance Revolution Arcade 💃✨"
      badgeIcon={<Gamepad2 className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Dance Revolution Arcade"}
      subtitle={"Rhythm Dance Pad Stage for Sanzu & Abu"}
      description={"Sync your dance steps on the rhythm pads, score high points, and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* ARCADE STAGE & PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-500 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Dance Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="pt-1">
            <div className="text-xl font-extrabold text-pink-300 font-mono mb-1">
              Dance Score: {score} pts 💖
            </div>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-400 font-bold">
              Current Move: {currentMove}
            </span>
          </div>
        </div>

        {/* DANCE STEP BUTTON */}
        <div className="mb-6 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleDanceStep}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tap Dance Step ({currentMove}) 💃</span>
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
            <span>Share Dance Score</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
