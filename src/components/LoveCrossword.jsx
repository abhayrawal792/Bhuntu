import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Puzzle, Check, Heart, Sparkles, HelpCircle, RotateCcw, Send } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const CROSSWORD_CLUES = [
  { id: 'A1', dir: 'Across', num: 1, text: 'Cutest nickname of Sanzu (6 letters)', answer: 'BHUNTU' },
  { id: 'A2', dir: 'Across', num: 2, text: 'City in Japan where Abu lives (5 letters)', answer: 'OSAKA' },
  { id: 'D1', dir: 'Down', num: 1, text: 'Sweetest nickname for Sanzu (4 letters)', answer: 'BEBO' },
  { id: 'D2', dir: 'Down', num: 2, text: 'Honeymoon destination in Nepal (7 letters)', answer: 'POKHARA' },
  { id: 'D3', dir: 'Down', num: 3, text: 'Nepali word for beloved person (6 letters)', answer: 'MAYALU' }
];

export default function LoveCrossword() {
  const [userAnswers, setUserAnswers] = useState({
    A1: '', A2: '', D1: '', D2: '', D3: ''
  });
  const [feedback, setFeedback] = useState({}); // { A1: 'correct' | 'incorrect' }
  const [submitted, setSubmitted] = useState(false);
  const [hint, setHint] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handleInputChange = (id, val) => {
    const clean = val.toUpperCase().trim();
    const updatedAnswers = { ...userAnswers, [id]: clean };
    setUserAnswers(updatedAnswers);

    // Live check this specific input
    const clue = CROSSWORD_CLUES.find(c => c.id === id);
    if (clue && clean === clue.answer) {
      playSparkle();
      triggerHaptic(15);
      setFeedback(prev => ({ ...prev, [id]: 'correct' }));
    } else if (clean.length > 0) {
      setFeedback(prev => ({ ...prev, [id]: 'incorrect' }));
    } else {
      setFeedback(prev => ({ ...prev, [id]: null }));
    }
  };

  const handleCheckAnswers = () => {
    playPop();
    triggerHaptic(20);

    const newFeedback = {};
    let correctCount = 0;

    CROSSWORD_CLUES.forEach(clue => {
      const input = (userAnswers[clue.id] || '').toUpperCase().trim();
      if (input === clue.answer) {
        newFeedback[clue.id] = 'correct';
        correctCount++;
      } else if (input.length > 0) {
        newFeedback[clue.id] = 'incorrect';
      } else {
        newFeedback[clue.id] = 'empty';
      }
    });

    setFeedback(newFeedback);

    if (correctCount === CROSSWORD_CLUES.length) {
      playBloom();
      setSubmitted(true);
      setHint("🎉 Perfect! All 5 love clues are 100% correct!");
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
    } else {
      setHint(`🔍 Result: ${correctCount} of ${CROSSWORD_CLUES.length} clues correct. Check the highlighted inputs!`);
    }
  };

  const handleSubmitCrossword = () => {
    handleCheckAnswers();
  };

  const handleGiveHint = () => {
    playSparkle();
    triggerHaptic(15);
    const unsolved = CROSSWORD_CLUES.find(c => (userAnswers[c.id] || '') !== c.answer);
    if (unsolved) {
      setHint(`Hint for ${unsolved.dir} #${unsolved.num}: Starts with "${unsolved.answer[0]}" and ends with "${unsolved.answer[unsolved.answer.length - 1]}"`);
    } else {
      setHint("All clues are already answered correctly! 🎉");
    }
  };

  const handleReset = () => {
    playSparkle();
    setUserAnswers({ A1: '', A2: '', D1: '', D2: '', D3: '' });
    setFeedback({});
    setSubmitted(false);
    setHint(null);
  };

  const totalCorrect = Object.values(feedback).filter(v => v === 'correct').length;

  return (
    <WorldShell
      theme="arcade"
      badge="Love Crossword Challenge 🧩"
      badgeIcon={<Puzzle className="w-3.5 h-3.5 text-rose-500" />}
      title="Abu & Bhuntu's Love Crossword 🧩"
      subtitle="Fill in the love clues & tap 'Check Answers' to verify your answers!"
      description="Read the Across and Down clues below, type your answers, and submit!"
    >

      <div className="max-w-md mx-auto space-y-4 font-ui text-left">

        {/* Action Header Controls */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-pink-200 shadow-sm text-xs font-bold text-gray-800">
          <span className="text-rose-600 font-extrabold flex items-center gap-1">
            Progress: {totalCorrect} / {CROSSWORD_CLUES.length} Correct 🏆
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleGiveHint}
              className="px-3 py-1 rounded-full bg-pink-100 hover:bg-rose-200 text-rose-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Hint 💡</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset 🔄</span>
            </button>
          </div>
        </div>

        {/* Hint Banner */}
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-xs font-bold text-amber-900 text-center"
          >
            💡 {hint}
          </motion.div>
        )}

        {/* Crossword Clues Form List */}
        <div className="space-y-3">
          {CROSSWORD_CLUES.map((clue) => {
            const status = feedback[clue.id];
            const isCorrect = status === 'correct';
            const isIncorrect = status === 'incorrect';
            const showAnswer = status === 'incorrect' || status === 'empty' || status === 'revealed';

            return (
              <div
                key={clue.id}
                className={`p-4 rounded-3xl border-2 transition-all shadow-md bg-white ${
                  isCorrect
                    ? 'border-green-400 bg-green-50/70'
                    : isIncorrect
                    ? 'border-rose-400 bg-rose-50/70'
                    : 'border-pink-200 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-extrabold text-rose-600 font-ui flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-pink-100 text-rose-700 text-[10px] uppercase tracking-wider">
                      {clue.dir} #{clue.num}
                    </span>
                    <span>{clue.text}</span>
                  </span>

                  {isCorrect && (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Correct!</span>
                    </span>
                  )}
                  {isIncorrect && (
                    <span className="text-xs font-bold text-rose-600">
                      ✕ Try Again
                    </span>
                  )}
                </div>

                <div className="relative space-y-1.5">
                  <input
                    type="text"
                    value={userAnswers[clue.id] || ''}
                    onChange={(e) => handleInputChange(clue.id, e.target.value)}
                    placeholder={`Type ${clue.answer.length}-letter answer...`}
                    disabled={isCorrect}
                    className={`w-full px-4 py-2.5 rounded-2xl border-2 font-mono font-bold text-xs sm:text-sm uppercase tracking-wider outline-none transition-all ${
                      isCorrect
                        ? 'bg-green-100 border-green-400 text-green-900 shadow-inner'
                        : isIncorrect
                        ? 'bg-rose-100 border-rose-400 text-rose-900'
                        : 'bg-pink-50/50 border-pink-200 text-gray-900 focus:border-rose-500 focus:bg-white'
                    }`}
                  />

                  {/* Correct Answer Revelation Badge */}
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-[11px] font-extrabold text-amber-900 flex items-center justify-between"
                    >
                      <span>💡 Correct Answer: <span className="font-mono text-xs text-rose-700 underline tracking-wider">{clue.answer}</span></span>
                      <button
                        type="button"
                        onClick={() => handleInputChange(clue.id, clue.answer)}
                        className="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-md font-bold hover:bg-rose-600 cursor-pointer"
                      >
                        Auto-Fill ✨
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit & Check Answers Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={handleCheckAnswers}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-ui active:scale-98"
          >
            <Check className="w-4 h-4" />
            <span>Check Answers ✅</span>
          </button>

          <button
            onClick={handleSubmitCrossword}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer font-ui active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Submit Crossword 🚀</span>
          </button>
        </div>

        {/* All Correct Victory Celebration Card */}
        {submitted && totalCorrect === CROSSWORD_CLUES.length && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-3xl bg-white border-2 border-emerald-400 shadow-2xl text-center space-y-3 mt-4"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-400 to-green-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Heart className="w-7 h-7 fill-white animate-bounce" />
            </div>
            <h3 className="text-lg font-black text-emerald-600 font-nepali">
              Crossword Solved 100% Perfectly! 🎉
            </h3>
            <p className="text-xs text-gray-700 font-bold">
              You know every little detail of our love story! Abu loves you so much! ❤️
            </p>

            <a
              href={`https://wa.me/9779708349123?text=${encodeURIComponent(`Hey Abu! 🧩 I solved 100% of the Love Crossword perfectly!\n\nAll 5 clues correct! ❤️`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer font-ui"
            >
              <span>📲 Send Crossword Score to Abu on WhatsApp</span>
            </a>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
