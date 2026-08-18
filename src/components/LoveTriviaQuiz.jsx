import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HelpCircle, Heart, Trophy, Check, X } from 'lucide-react';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const QUESTIONS = [
  { q: "What is Bebo's favorite nickname?", options: ["Sanzu", "Bhuntu", "Fuchee", "All of the above ❤️"], correct: 3 },
  { q: "Which city is Sanzu currently living in?", options: ["Tokyo", "Osaka 🎌", "Kyoto", "Nagoya"], correct: 1 },
  { q: "What is Sanzu's hometown in Nepal?", options: ["Kathmandu", "Pokhara", "Nepalgunj 🇳🇵", "Chitwan"], correct: 2 },
  { q: "How much does her love care about her?", options: ["A little", "100%", "3000%", "More than infinity! 💖"], correct: 3 },
  { q: "What happens when Sanzu smiles?", options: ["The sun gets jealous", "Flowers bloom", "My day instantly becomes perfect", "All of the above! ✨"], correct: 3 },
];

export default function LoveTriviaQuiz() {
  const { triggerHaptic } = useAppStore();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [completed, setCompleted] = useState(false);

  const q = QUESTIONS[currentQ];

  const handleOptionSelect = (idx) => {
    if (selectedOption !== null) return;
    playSparkle();
    triggerHaptic(15);
    setSelectedOption(idx);

    const isCorrect = idx === q.correct;
    if (isCorrect) setScore(s => s + 1);

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(cq => cq + 1);
        setSelectedOption(null);
      } else {
        setCompleted(true);
        confetti({ particleCount: 250, spread: 100, origin: { y: 0.5 } });
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setCurrentQ(0); setScore(0); setSelectedOption(null); setCompleted(false);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="How Well Do You Know Bebo? Trivia 🧠"
      badgeIcon={<HelpCircle className="w-3.5 h-3.5" />}
      title={"सञ्जु सम्बन्धी प्रश्नोत्तरी"}
      subtitle={"Sanzu Trivia Challenge"}
      description={"Answer these 5 romantic trivia questions about Sanzu Rawal to prove your ultimate love expertise!"}
    >

      {!completed ? (
        <div className="max-w-md mx-auto p-6 rounded-3xl bg-white border-4 border-pink-300 shadow-2xl">
          {/* Progress */}
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 mb-4">
            <span>Question {currentQ + 1} / {QUESTIONS.length}</span>
            <span>Score: {score}</span>
          </div>

          <h3 className="text-base font-extrabold text-gray-800 mb-6 leading-relaxed font-nepali">
            "{q.q}"
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button key={i}
                onClick={() => handleOptionSelect(i)}
                disabled={selectedOption !== null}
                className={`w-full p-3.5 rounded-2xl text-xs font-bold text-left cursor-pointer transition-all border-2 flex items-center justify-between ${
                  selectedOption === null
                    ? 'bg-pink-50 border-pink-200 text-gray-800 hover:bg-pink-100 hover:border-pink-300'
                    : i === q.correct
                      ? 'bg-green-500 text-white border-green-500 shadow-md'
                      : i === selectedOption
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}
              >
                <span>{opt}</span>
                {selectedOption !== null && i === q.correct && <Check className="w-4 h-4 text-white" />}
                {selectedOption === i && i !== q.correct && <X className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Victory Screen */
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto p-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl">
          <Trophy className="w-16 h-16 mx-auto mb-3 text-amber-200" />
          <h3 className="text-2xl font-extrabold font-nepali mb-2">TRIVIA SCORE: {score} / 5! 💖</h3>
          <p className="text-xs opacity-90 italic mb-4 leading-relaxed">
            "You passed with flying colors! No one knows Sanzu Rawal better than you — because your heart is completely synchronized with hers! 💕"
          </p>
          <button onClick={restartQuiz}
            className="px-6 py-2.5 rounded-full bg-white text-indigo-600 font-bold text-xs cursor-pointer hover:bg-indigo-50">
            Retake Quiz 🧠
          </button>
        </motion.div>
      )}
    </WorldShell>
  );
}
