import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const BALLOON_NOTES = [
  "Note 1: You are my greatest blessing in life, Queen Sanzu 💕",
  "Note 2: Every video call with you makes my day 100x brighter ☀️",
  "Note 3: I promise to love you unconditionally forever, Bebo 💍"
];

export default function LoveLetterInBalloon() {
  const { triggerHaptic } = useAppStore();

  const [poppedIdx, setPoppedIdx] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const popBalloon = (i) => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60]);
    setPoppedIdx(i);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎈 LOVE LETTER BALLOONS 🎈\n\nPopped Balloon Note:\n"${poppedIdx !== null ? BALLOON_NOTES[poppedIdx] : BALLOON_NOTES[0]}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Love Letter Balloons 🎈✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Letter Balloons"}
      subtitle={"Pop Balloons to Reveal Secret Love Notes"}
      description={"Click pink party balloons to catch hidden love letters inside and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* BALLOON CANVAS & PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {poppedIdx !== null ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Balloon Note Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-300/60 text-rose-200 text-xs font-bold">
                "{BALLOON_NOTES[poppedIdx]}"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-pink-900/30 border-2 border-pink-300 mx-auto flex items-center justify-center text-4xl shadow-inner animate-bounce">
                🎈
              </div>
              <p className="text-xs font-extrabold text-pink-300 font-mono uppercase tracking-wider">
                POP A PARTY BALLOON
              </p>
              <div className="px-4 py-2 rounded-xl bg-pink-500/20 text-pink-200 border border-pink-300/40 text-xs font-bold inline-block">
                Tap balloons below 🎈
              </div>
            </div>
          )}
        </div>

        {/* BALLOON SELECTION */}
        <div className="flex justify-center gap-3 mb-6 max-w-sm mx-auto">
          {BALLOON_NOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => popBalloon(i)}
              className="w-16 h-20 rounded-full bg-gradient-to-t from-rose-500 to-pink-400 text-white flex items-center justify-center shadow-xl cursor-pointer border-2 border-white hover:scale-105 transition-all"
            >
              <span className="text-2xl">🎈</span>
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
            <span>Share Balloon Note</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
