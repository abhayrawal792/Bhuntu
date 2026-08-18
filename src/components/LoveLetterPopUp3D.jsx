import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const LETTERS = [
  { title: "3D Envelope #1: Forever Love 💌", text: "Abu promises to love Queen Sanzu more and more with each passing day!" },
  { title: "3D Envelope #2: Eternal Marriage Vow 💍", text: "We will build our dream house together in happiness and peace!" },
  { title: "3D Envelope #3: Osaka Sakura Dreams 🌸", text: "Walking under sakura blossoms hand in hand in Osaka!" }
];

export default function LoveLetterPopUp3D() {
  const { triggerHaptic } = useAppStore();

  const [letterIdx, setLetterIdx] = useState(0);
  const [opened, setOpened] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentLetter = LETTERS[letterIdx % LETTERS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleOpenLetter = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setOpened(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleNextLetter = () => {
    playPop();
    triggerHaptic(10);
    setLetterIdx((i) => (i + 1) % LETTERS.length);
    setOpened(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💌 3D LOVE LETTER POP-UP 💌\n\n[${currentLetter.title}]\n"${currentLetter.text}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="3D Love Letter Pop-Up 💌✨"
      badgeIcon={<Mail className="w-3.5 h-3.5 text-rose-400" />}
      title={"3D Love Letter Pop-Up"}
      subtitle={"Unfold 3D Handcrafted Love Letters for Sanzu"}
      description={"Unfold 3D pop-up love envelopes written by Abu to reveal secret photo cards for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* LETTER CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {opened ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Letter Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-300/60 text-rose-200 text-xs font-bold">
                "{currentLetter.text}"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-rose-900/30 border-2 border-rose-400 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                ✉️
              </div>
              <p className="text-xs font-extrabold text-rose-300 font-mono uppercase tracking-wider">
                TAP TO OPEN 3D POP-UP LETTER
              </p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!opened ? (
            <button
              type="button"
              onClick={handleOpenLetter}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open 3D Letter ✉️</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextLetter}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Letter 💌</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Letter</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}