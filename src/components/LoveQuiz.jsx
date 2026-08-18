import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2, Award, ArrowRight, RotateCcw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function LoveQuiz() {
  const { questions, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.quiz;
  const { triggerHaptic } = useAppStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);
    triggerHaptic([30, 50]);

    if (index === currentQ.correctIndex) {
      playSparkle();
      setScore((prev) => prev + 1);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF85A1', '#FFB703', '#F72585']
      });
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsComplete(true);
      playSparkle();
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsComplete(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-rose-600 font-bold text-xs mb-3 shadow-sm">
          <Sparkles className="w-4 h-4 text-pink-500" />
          <span>Interactive Romantic Game 🎮</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2 drop-shadow-sm">
          {nepaliTitle}
        </h1>
        <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm font-ui max-w-lg mx-auto">
          {nepaliSubtitle} — {subtitle}
        </p>
      </div>

      {!isComplete ? (
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-xl relative overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-4 font-ui">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-rose-500 font-bold">Score: {score}</span>
          </div>
          <div className="w-full bg-pink-100 h-2 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-400 to-rose-500 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <h3 className="text-lg sm:text-xl font-bold font-nepali text-gray-900 mb-2">
            {currentQ.nepaliQuestion}
          </h3>
          <p className="text-sm text-gray-500 font-ui mb-6 italic">
            "{currentQ.question}"
          </p>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "bg-white/80 border-gray-200 text-gray-800 hover:border-pink-300 hover:bg-pink-50/50";
              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  btnStyle = "bg-green-500 text-white border-green-500 font-bold shadow-md";
                } else if (idx === selectedOption) {
                  btnStyle = "bg-rose-500 text-white border-rose-500 font-bold opacity-80";
                } else {
                  btnStyle = "bg-gray-100 text-gray-400 border-gray-200 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all duration-200 flex items-center justify-between cursor-pointer ${btnStyle}`}
                >
                  <span className="font-ui">{opt}</span>
                  {isAnswered && idx === currentQ.correctIndex && (
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation reveal */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-ui mb-6 leading-relaxed"
            >
              💖 <strong>Explanation:</strong> {currentQ.explanation}
            </motion.div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <motion.button
              onClick={handleNext}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:shadow-xl transition-all"
            >
              <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'See Your Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-8 sm:p-10 border-2 border-pink-300 shadow-2xl text-center max-w-xl mx-auto"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce">
            <Award className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold font-nepali text-rose-600 mb-2">
            Perfect Love Score! 🏆
          </h3>
          <p className="text-gray-700 font-ui text-sm sm:text-base mb-6">
            You scored <strong>{score} out of {questions.length}</strong>! You know our love and sweet memories so deeply, my cute Bebo! ❤️
          </p>

          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 mb-8 text-left text-xs sm:text-sm font-ui text-gray-700 space-y-2">
            <p className="flex items-center gap-2 font-bold text-rose-600">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>Official Certificate of Eternal Compatibility</span>
            </p>
            <p>
              Awarded to <strong>Sanzu Rawal (Bhuntu/Bebo)</strong> for having 100% pure heart and understanding of our long distance bond! 🇳🇵✈️🇯🇵
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-3 rounded-full border-2 border-rose-400 text-rose-600 font-bold text-sm flex items-center gap-2 mx-auto cursor-pointer hover:bg-rose-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Quiz Again</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
