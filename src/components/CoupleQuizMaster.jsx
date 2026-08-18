import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HelpCircle, Sparkles, Share2, Award, CheckCircle2, XCircle } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const QUIZ_ROUNDS = [
  {
    q: "On what exact date did Queen Sanzu accept Abu's proposal? 💍",
    options: ["October 28, 2025", "November 12, 2025", "December 25, 2025", "January 1, 2026"],
    correct: 0,
    fact: "October 28, 2025 is sealed forever in our hearts!"
  },
  {
    q: "What is Queen Sanzu's favorite spicy street food combination? 🥟",
    options: ["Pizza & Burger", "Panipuri & Steamed Momos", "Sushi & Ramen", "Tacos & Burritos"],
    correct: 1,
    fact: "Panipuri & hot steamed momos are #1 in Sanzu's heart!"
  },
  {
    q: "What is Abu's sacred promise to Queen Sanzu? 🌸",
    options: ["Travel the world", "Marry & build our dream home", "Buy a big car", "Live in space"],
    correct: 1,
    fact: "Marrying Sanzu and building a warm, loving home!"
  }
];

export default function CoupleQuizMaster() {
  const { triggerHaptic } = useAppStore();

  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentRound = QUIZ_ROUNDS[roundIdx % QUIZ_ROUNDS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectOption = (idx) => {
    if (selectedOpt !== null) return;

    setSelectedOpt(idx);
    const isCorrect = idx === currentRound.correct;

    if (isCorrect) {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90]);
      setScore(s => s + 500);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    } else {
      playPop();
      triggerHaptic(10);
    }
  };

  const handleNextRound = () => {
    playPop();
    triggerHaptic(10);
    setSelectedOpt(null);
    setRoundIdx(r => (r + 1) % QUIZ_ROUNDS.length);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎯 RETRO TV QUIZ SHOW 🎯\n\nTotal Score: ${score} PTS!\nQueen Sanzu completed all quiz trivia rounds!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Retro TV Quiz Show 🎯✨"
      badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-purple-400" />}
      title={"Retro TV Quiz Show"}
      subtitle={"Live Relationship Game Show Stage for Queen Sanzu"}
      description={"Select correct multiple choice options on the game show stage to score points and unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* GAME SHOW CABINET */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* SCORE BOARD */}
          <div className="flex items-center justify-between bg-purple-950/40 p-3 rounded-2xl border border-purple-400/40 text-xs font-mono font-bold">
            <span className="text-purple-300">QUESTION #{roundIdx + 1}/{QUIZ_ROUNDS.length}</span>
            <span className="text-amber-300 font-extrabold text-sm">SCORE: {score} PTS</span>
          </div>

          {/* QUESTION BOX */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-purple-400/40 space-y-2">
            <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider">
              {currentRound.q}
            </h3>
          </div>

          {/* MULTIPLE CHOICE OPTIONS */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentRound.options.map((opt, i) => {
              const isSelected = selectedOpt === i;
              const isCorrect = i === currentRound.correct;
              const showResult = selectedOpt !== null;

              let btnStyle = "bg-stone-900 border-purple-500/40 text-gray-200 hover:border-purple-400";
              if (showResult) {
                if (isCorrect) btnStyle = "bg-emerald-600 text-white border-emerald-300 shadow-lg scale-102";
                else if (isSelected) btnStyle = "bg-rose-600 text-white border-rose-400";
              }

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectOption(i)}
                  className={`w-full p-3.5 rounded-2xl border text-xs font-extrabold flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                >
                  <span className="text-left">
                    <strong className="text-amber-300 mr-2">{['A', 'B', 'C', 'D'][i]}.</strong> {opt}
                  </span>
                  {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>

          {/* CONTESTANT SPOTLIGHT & FACT */}
          <AnimatePresence>
            {selectedOpt !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-purple-950/60 border border-purple-400/60 space-y-3"
              >
                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Quiz Champion Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                  />
                </div>
                <p className="text-xs font-bold text-amber-200">
                  "{currentRound.fact}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {selectedOpt !== null && (
              <button
                type="button"
                onClick={handleNextRound}
                className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Next Round 🎯</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Quiz Score</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
