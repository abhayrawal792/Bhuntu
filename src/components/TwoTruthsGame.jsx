import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle, XCircle, Trophy, Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const GAME_ROUNDS = [
  {
    id: 1,
    question: "Round 1: Which of these 3 statements is a LIE? 🕵️‍♀️",
    options: [
      { text: "1. I fell in love with your pure voice and sweet character first.", isLie: false, explanation: "Sachho ho! Temro boli ra bani ma pahaile parda gayeko ma! 💕" },
      { text: "2. Our long distance connection spans between Nepalgunj and Osaka.", isLie: false, explanation: "Sachho ho! Nepalgunj 🇳🇵 ✈️ Osaka 🇯🇵 connection forever!" },
      { text: "3. I will forget your birthday next year.", isLie: true, explanation: "Jhootho (LIE)! ❌ Abu le kailai mero Sanu ko birthday birsidaina! 🎂❤️" }
    ]
  },
  {
    id: 2,
    question: "Round 2: Which food claim is a LIE about Bhuntu? 🍜",
    options: [
      { text: "1. Bhuntu loves spicy Current Noodles & Panipuri.", isLie: false, explanation: "Sachho ho! Panipuri & Current Noodles temro favorite ho! 🥟" },
      { text: "2. Bhuntu hates eating Chocolates & Chiya.", isLie: true, explanation: "Jhootho (LIE)! ❌ Bhuntu loves Chocolates 🍫 & Chiya ☕ so much!" },
      { text: "3. Chau-Chau & Momo are always on Bhuntu's craving list.", isLie: false, explanation: "Sachho ho! Momo & Chau-Chau is life! 🍜" }
    ]
  },
  {
    id: 3,
    question: "Round 3: Which nickname claim is a LIE? 👑",
    options: [
      { text: "1. Abu's favorite cute nickname for you is 'Bhuntu..!!👀🤍✨'", isLie: false, explanation: "Sachho ho! Bhuntu..!!👀🤍✨ is the cutest name!" },
      { text: "2. Abu calls you 'Bhuntu', 'Sanuu', and 'Runchee'.", isLie: false, explanation: "Sachho ho! Maya le sabai naam le bolauxu!" },
      { text: "3. Abu prefers calling you 'Stranger'.", isLie: true, explanation: "Jhootho (LIE)! ❌ Temi mero aafno life ko partner ho, stranger haina! 💖" }
    ]
  },
  {
    id: 4,
    question: "Round 4: Which distance & marriage claim is a LIE? 💍",
    options: [
      { text: "1. We are going to get married and live together happily.", isLie: false, explanation: "Sachho ho! Bihe garera sangai basne ho! 💍" },
      { text: "2. Distance can erase our love and make us strangers.", isLie: true, explanation: "Jhootho (LIE)! ❌ Jati duri bhaye pani mero maya jhan jhan badhxa! 💕" },
      { text: "3. Abu gets emotional whenever Bhuntu gets hurt.", isLie: false, explanation: "Sachho ho! Temlai hurt hunda mero aakha ma aasu aauxa." }
    ]
  },
  {
    id: 5,
    question: "Round 5: Which future plan is a LIE? ✈️",
    options: [
      { text: "1. We will travel to Osaka, Kyoto, & Mount Fuji together.", isLie: false, explanation: "Sachho ho! Japan ma sangai ghoomne dream ho! 🌸" },
      { text: "2. We are going to have 30 to 40 cute kiddos.", isLie: false, explanation: "Sachho ho! As written in our love letter! 👶" },
      { text: "3. Abu will leave Bhuntu if things get difficult.", isLie: true, explanation: "Jhootho (LIE)! ❌ Kailai xadara jadaina mero Bebo! Forever together! ❤️" }
    ]
  }
];

export default function TwoTruthsGame() {
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const { triggerHaptic } = useAppStore();

  const round = GAME_ROUNDS[currentRoundIdx];

  const handleSelectOption = (idx) => {
    if (selectedIndex !== null) return; // Prevent double clicking same round
    setSelectedIndex(idx);
    const chosen = round.options[idx];

    if (chosen.isLie) {
      playBloom();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      triggerHaptic([30, 60, 30]);
      setScore(prev => prev + 1);
    } else {
      playPop();
      triggerHaptic(20);
    }
  };

  const handleNextRound = () => {
    playSparkle();
    setSelectedIndex(null);
    if (currentRoundIdx < GAME_ROUNDS.length - 1) {
      setCurrentRoundIdx(prev => prev + 1);
    } else {
      setIsGameOver(true);
      confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } });
    }
  };

  const handleRestartGame = () => {
    playSparkle();
    setCurrentRoundIdx(0);
    setSelectedIndex(null);
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Two Truths & One Lie ❓"
      badgeIcon={<HelpCircle className="w-3.5 h-3.5" />}
      title="Two Truths & One Lie Quiz ❓"
      subtitle="Can you spot the LIE in each round, my love?"
      description="Tap the option you think is the LIE! No hints given until you guess! 🤫"
    >

      <div className="max-w-md mx-auto space-y-4 font-ui">

        {/* Score & Progress Badge */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-pink-200 shadow-sm text-xs font-bold text-gray-800">
          <span className="text-rose-600 font-extrabold">
            Round {currentRoundIdx + 1} of {GAME_ROUNDS.length} 🎯
          </span>
          <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            <Trophy className="w-3.5 h-3.5" /> Score: {score} / {GAME_ROUNDS.length}
          </span>
        </div>

        {!isGameOver ? (
          <div className="bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-pink-200 shadow-xl space-y-4 text-left">
            <h3 className="text-base sm:text-lg font-black text-gray-900 font-nepali">
              {round.question}
            </h3>

            {/* Options List */}
            <div className="space-y-2.5">
              {round.options.map((opt, idx) => {
                const isSelected = selectedIndex === idx;
                const isRevealed = selectedIndex !== null;

                let cardStyle = "bg-pink-50/70 border-pink-200 text-gray-800 hover:bg-rose-100 hover:border-rose-300";
                if (isRevealed) {
                  if (opt.isLie) {
                    cardStyle = "bg-green-500 text-white border-green-600 font-extrabold shadow-lg";
                  } else if (isSelected && !opt.isLie) {
                    cardStyle = "bg-rose-500 text-white border-rose-600 font-bold opacity-90";
                  } else {
                    cardStyle = "bg-gray-100 text-gray-400 border-gray-200 opacity-50";
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: isRevealed ? 1 : 1.01 }}
                    whileTap={{ scale: isRevealed ? 1 : 0.98 }}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex flex-col gap-1.5 ${cardStyle}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{opt.text}</span>
                      {isRevealed && opt.isLie && (
                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                      )}
                      {isRevealed && isSelected && !opt.isLie && (
                        <XCircle className="w-5 h-5 text-white flex-shrink-0" />
                      )}
                    </div>

                    {/* Explanation after selection */}
                    {isRevealed && (isSelected || opt.isLie) && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`text-[11px] mt-1 pt-1 border-t ${opt.isLie ? 'border-white/30 text-green-100' : 'border-white/30 text-rose-100'}`}
                      >
                        {opt.explanation}
                      </motion.p>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Next Round Button */}
            {selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-2"
              >
                <button
                  onClick={handleNextRound}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all cursor-pointer"
                >
                  <span>{currentRoundIdx < GAME_ROUNDS.length - 1 ? 'Next Round ▶' : 'See Final Score 🏆'}</span>
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          /* Game Over Victory Screen */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border-2 border-rose-400 shadow-2xl text-center space-y-4"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center mx-auto shadow-xl">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-rose-600 font-nepali">
              Congratulations Bhuntu! 🎉
            </h3>

            <p className="text-sm font-bold text-gray-800">
              You scored <span className="text-rose-600 font-black text-lg">{score} / {GAME_ROUNDS.length}</span>!
            </p>

            <p className="text-xs text-gray-600 leading-relaxed font-ui">
              {score === GAME_ROUNDS.length
                ? "Perfect 100%! You know Abu's heart inside out! Abu le kailai temlai birsidaina & xadaina! ❤️"
                : "Great job my love! Abu loves you infinitely forever & always! 💕"}
            </p>

            <button
              onClick={handleRestartGame}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs flex items-center gap-2 mx-auto shadow-lg hover:scale-105 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Play Quiz Again 🔄</span>
            </button>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
