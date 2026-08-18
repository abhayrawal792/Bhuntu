import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HelpCircle, Award, Sparkles, Share2, CheckCircle2, XCircle } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const QUESTIONS = [
  {
    q: "Where did Abu & Queen Sanzu first meet?",
    options: ["At a coffee shop", "At Abu's home when Sanzu came searching for a room to rent", "At school", "Online"],
    correct: 1,
    fact: "At Abu's home! Sanzu came looking for a room to rent, stayed as a tenant, and their romance began! 🏠💕"
  },
  {
    q: "What color scooter does Bebo want to buy after marriage?",
    options: ["Red", "Black", "Light Blue", "Pink"],
    correct: 2,
    fact: "Light Blue Scooter! She wants to drive it all the way to Bardiya with Abu in the back seat! 🛵💙"
  },
  {
    q: "Which famous local temple & park did they visit on dates in Nepalgunj?",
    options: ["Pashupatinath & Garden of Dreams", "Bageshwori Temple & Water Park", "Muktinath & Phewa Lake", "Janaki Mandir"],
    correct: 1,
    fact: "Bageshwori Temple & Nepalgunj Water Park! Praying together and creating sweet date memories! 🛕🌊"
  }
];

export default function BhuntuTriviaShowdown() {
  const { triggerHaptic } = useAppStore();

  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentQ = QUESTIONS[qIdx % QUESTIONS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectOpt = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);

    if (idx === currentQ.correct) {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90]);
      setScore(s => s + 500);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 95, spread: 85, origin: { y: 0.5 } });
    } else {
      playPop();
      triggerHaptic(10);
    }
  };

  const handleNextQ = () => {
    playPop();
    triggerHaptic(10);
    setQIdx(q => (q + 1) % QUESTIONS.length);
    setSelectedOpt(null);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🏆 RELATIONSHIP TRIVIA SHOWDOWN 🏆\n\nTotal Score: ${score} PTS!\nQueen Sanzu & Abu 100% Memory Champions!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Game Show Trivia 🏆✨"
      badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-amber-400" />}
      title={"Game Show Trivia Arena"}
      subtitle={"Live Relationship Memory Challenge for Queen Sanzu"}
      description={"Select option buttons on the game show podium to score points and unlock memory photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* GAME SHOW CABINET */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-amber-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* LED SCOREBOARD */}
          <div className="flex items-center justify-between bg-amber-950/40 p-3 rounded-2xl border border-amber-400/40 text-xs font-mono font-bold">
            <span className="text-amber-300">QUESTION #{qIdx + 1}/{QUESTIONS.length}</span>
            <span className="text-amber-300 font-extrabold text-sm flex items-center gap-1">
              <Award className="w-4 h-4 text-amber-400" />
              SCORE: {score} PTS
            </span>
          </div>

          {/* QUESTION BOX */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-amber-400/40 space-y-2">
            <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
              {currentQ.q}
            </h3>
          </div>

          {/* MULTIPLE CHOICE OPTIONS */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((opt, i) => {
              const isSelected = selectedOpt === i;
              const isCorrect = i === currentQ.correct;
              const showResult = selectedOpt !== null;

              let btnStyle = "bg-stone-900 border-amber-500/40 text-gray-200 hover:border-amber-400";
              if (showResult) {
                if (isCorrect) btnStyle = "bg-emerald-600 text-white border-emerald-300 shadow-lg scale-102";
                else if (isSelected) btnStyle = "bg-rose-600 text-white border-rose-400";
              }

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectOpt(i)}
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

          {/* CHAMPION PHOTO STAGE & FACT */}
          <AnimatePresence>
            {selectedOpt !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-amber-950/60 border border-amber-400/60 space-y-3"
              >
                <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Trivia Champion Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                </div>
                <p className="text-xs font-bold text-amber-200">
                  "{currentQ.fact}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {selectedOpt !== null && (
              <button
                type="button"
                onClick={handleNextQ}
                className="flex-1 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-stone-950 font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Next Question 🏆</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Trivia Score</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
