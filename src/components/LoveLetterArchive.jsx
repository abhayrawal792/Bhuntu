import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Sparkles, Share2, Feather, Stamp, Lock } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const LETTERS = [
  {
    title: "1. The Ancient Parchment Scroll 📜",
    salutation: "To My Eternal Queen Sanzu...",
    body: "Across every era and every lifetime, my soul has always belonged to you. No distance between Nepalgunj & Osaka can ever stop me from loving you unconditionally.",
    closing: "Forever Yours, Abu"
  },
  {
    title: "2. The Victorian Feather Quill Letter 🪶",
    salutation: "Dearest Sanzu, My Greatest Affection,",
    body: "I write to you with a heart overflowing with devotion. Your grace, laugh, and beauty capture my thoughts every single moment.",
    closing: "With Undying Devotion, Abu"
  },
  {
    title: "3. The Modern Soulmate Letter 💌",
    salutation: "My Sweet Bebo 🥺💕",
    body: "October 28, 2025: the day you accepted my proposal! I promise to love you, cherish you, and build our warm dream home together!",
    closing: "Forever Loving You, Abu"
  }
];

export default function LoveLetterArchive() {
  const { triggerHaptic } = useAppStore();

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [unsealed, setUnsealed] = useState({});
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentLetter = selectedIdx !== null ? LETTERS[selectedIdx] : LETTERS[0];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleOpenLetter = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);

    setSelectedIdx(idx);
    setUnsealed(prev => ({ ...prev, [idx]: true }));
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💌 VINTAGE LOVE LETTER ARCHIVE 💌\n\n[${currentLetter.title}]\n${currentLetter.salutation}\n"${currentLetter.body}"\n— ${currentLetter.closing}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Vintage Letter Desk 💌✨"
      badgeIcon={<Feather className="w-3.5 h-3.5 text-rose-500" />}
      title={"Vintage Love Letter Desk"}
      subtitle={"Wax-Sealed Love Letters Written for Queen Sanzu"}
      description={"Break vintage wax seals, unfold parchment paper letters, and read handwritten love notes!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* PARCHMENT DESK CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-amber-950/40 border-4 border-amber-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* DESK HEADER */}
          <div className="flex items-center justify-between bg-black/80 px-4 py-2 rounded-2xl border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Stamp className="w-3.5 h-3.5 text-amber-400" />
              ABU'S WRITING DESK
            </span>
            <span>3 LETTERS ENCLOSED</span>
          </div>

          {/* PARCHMENT LETTER DISPLAY */}
          <AnimatePresence mode="wait">
            {selectedIdx !== null ? (
              <motion.div
                key={selectedIdx}
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                exit={{ rotateX: -90, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-amber-100 text-stone-900 rounded-2xl p-5 border-4 border-amber-600 shadow-2xl space-y-4 text-left font-serif"
              >
                {/* PHOTO INSIDE PARCHMENT */}
                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-amber-800 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Parchment Letter Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-black text-amber-950">{currentLetter.title}</h3>
                  <p className="text-xs font-bold text-rose-900 italic">{currentLetter.salutation}</p>
                  <p className="text-xs text-stone-800 leading-relaxed font-semibold">
                    "{currentLetter.body}"
                  </p>
                  <p className="text-right text-xs font-black text-rose-800 pt-2 border-t border-amber-400/50">
                    — {currentLetter.closing}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="py-8 bg-stone-900/80 rounded-2xl border border-amber-400/30 p-4 text-center space-y-3">
                <div className="text-5xl animate-bounce">💌</div>
                <p className="text-xs font-extrabold text-amber-300">
                  BREAK WAX SEALS BELOW TO READ HANDWRITTEN LETTERS!
                </p>
              </div>
            )}
          </AnimatePresence>

          {/* THREE WAX SEALED ENVELOPES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {LETTERS.map((letter, idx) => {
              const isOpened = !!unsealed[idx];
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOpenLetter(idx)}
                  className={`p-3 rounded-2xl border text-xs font-extrabold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    selectedIdx === idx
                      ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-xl scale-105'
                      : 'bg-stone-900 text-amber-300 border-amber-500/30 hover:border-amber-400'
                  }`}
                >
                  <div className="text-2xl">{isOpened ? '📖' : '📜'}</div>
                  <span className="text-[11px] truncate w-full text-center">Letter #{idx + 1}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Love Letter</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
