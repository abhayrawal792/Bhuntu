import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Heart, RefreshCw, Save, ChevronLeft, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PROMPTS = [
  { q: "What is 1 tiny thing Abhay (Abu) does that always melts your heart?", emoji: "💕" },
  { q: "What is your favorite picture of you & Abhay (Abu) together and why?", emoji: "📸" },
  { q: "How do you feel when you take Abhay (Abu) on our light blue scooter to Bardiya?", emoji: "🛵" },
  { q: "Describe Abhay (Abu) in exactly 3 cute words.", emoji: "✨" },
  { q: "What song or memory reminds you most of Abhay (Abu)?", emoji: "🎵" },
  { q: "If you could teleport to Abhay (Abu) right now in Nepalgunj, what would you do first?", emoji: "✈️" },
  { q: "What is Abhay's (Abu's) most attractive & loving quality?", emoji: "💖" },
  { q: "Write a one-sentence love message for Abhay (Abu).", emoji: "📝" },
  { q: "What is the sweetest thing Abhay (Abu) has ever done for you?", emoji: "🌸" },
  { q: "What does 'home' mean to you when you think of Abhay (Abu)?", emoji: "🏠" },
  { q: "What is one promise you want to make to Abhay (Abu) for your future together?", emoji: "🤝" },
  { q: "Describe your dream chiya & momo date with Abhay (Abu) in Nepalgunj.", emoji: "☕" },
  { q: "What is the funniest thing that happened between you and Abhay (Abu)?", emoji: "😂" },
  { q: "If Abhay (Abu) cooked a special meal for you, what would you ask him to make?", emoji: "🍳" },
  { q: "What is your favorite nickname that Abhay (Abu) calls you (Bebo, Fuchee, Sanzu)?", emoji: "👑" },
  { q: "Write a message for Abhay (Abu) to put in a time capsule for 10 years from now.", emoji: "💌" },
  { q: "What is your dream house & 30-40 kiddos future with Abhay (Abu)?", emoji: "💒" },
  { q: "Complete this: 'Loving Abhay (Abu) is like...'", emoji: "❤️" }
];

export default function LoveJournalPrompt() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveJournalPrompt;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showSaved, setShowSaved] = useState(false);
  const [direction, setDirection] = useState(1);

  const prompt = PROMPTS[idx];
  const answeredCount = Object.keys(answers).length;

  const handleNext = () => {
    playSparkle();
    setDirection(1);
    setIdx(i => (i + 1) % PROMPTS.length);
    setCurrentAnswer(answers[(idx + 1) % PROMPTS.length] || '');
  };

  const handlePrev = () => {
    playSparkle();
    setDirection(-1);
    setIdx(i => (i - 1 + PROMPTS.length) % PROMPTS.length);
    setCurrentAnswer(answers[(idx - 1 + PROMPTS.length) % PROMPTS.length] || '');
  };

  const handleSave = () => {
    if (!currentAnswer.trim()) return;
    playSparkle();
    const newAnswers = { ...answers, [idx]: currentAnswer.trim() };
    setAnswers(newAnswers);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1500);
    if (Object.keys(newAnswers).length === PROMPTS.length) {
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
    }
  };

  return (
    <WorldShell
      theme="paper"
      badge="Love Journal — 20 Deep Prompts 📜"
      badgeIcon={<BookOpen className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Progress */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-extrabold text-xs">
          ✅ {answeredCount} / {PROMPTS.length} answered
        </span>
        <div className="w-32 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full rounded-full bg-green-500 transition-all"
            style={{ width: `${(answeredCount / PROMPTS.length) * 100}%` }} />
        </div>
      </div>

      {/* Journal Book */}
      <div className="max-w-md mx-auto relative">
        {/* Book spine */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-amber-800 rounded-l-xl shadow-inner z-10" />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={idx}
            custom={direction}
            initial={{ x: direction * 100, opacity: 0, rotateY: direction * 30 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            exit={{ x: direction * -100, opacity: 0, rotateY: direction * -30 }}
            transition={{ duration: 0.4 }}
            className="p-8 rounded-r-3xl rounded-l-lg bg-amber-50 border-2 border-amber-300 shadow-xl ml-3"
          >
            {/* Page number */}
            <div className="flex justify-between text-[11px] text-amber-600 font-mono mb-4">
              <span>Page {idx + 1}</span>
              <span>{prompt.emoji}</span>
            </div>

            {/* Red margin line */}
            <div className="absolute left-10 top-0 bottom-0 w-px bg-rose-300/40" />

            {/* Question */}
            <div className="min-h-[60px] flex items-center justify-center mb-4">
              <h3 className="text-sm font-extrabold text-gray-800 leading-relaxed italic">
                "{prompt.q}"
              </h3>
            </div>

            {/* Answer area */}
            <textarea value={currentAnswer} onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Write your answer here... Let your heart speak 💕"
              rows={4}
              className="w-full p-3 rounded-xl border-2 border-amber-200 text-xs text-gray-800 outline-none resize-none focus:border-amber-400 font-ui bg-white/80 mb-3"
            />
            <button onClick={handleSave} disabled={!currentAnswer.trim()}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-md cursor-pointer hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 flex items-center justify-center gap-2 mb-2">
              <Save className="w-3 h-3" /> Save Entry 📝
            </button>

            {currentAnswer.trim() && (
              <button
                onClick={() => {
                  sendWhatsAppMessage(`📖 Journal Prompt #${idx + 1}:\n"${prompt.q}"\n\nMy Answer:\n"${currentAnswer.trim()}"`, '📖 Birthday Journal Answer');
                }}
                className="w-full py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5 font-ui"
              >
                <span>📲 Send Answer to Abu on WhatsApp</span>
              </button>
            )}

            {/* Saved indicator */}
            {answers[idx] && (
              <p className="text-[11px] text-green-600 font-bold mt-2">✅ Your answer is saved for this prompt!</p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button onClick={handlePrev}
            className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-bold text-xs cursor-pointer hover:bg-amber-200 flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-xs font-bold text-gray-500">{idx + 1} / {PROMPTS.length}</span>
          <button onClick={handleNext}
            className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-bold text-xs cursor-pointer hover:bg-amber-200 flex items-center gap-1">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Saved Toast */}
      <AnimatePresence>
        {showSaved && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-green-600 text-white font-bold text-sm shadow-2xl z-50">
            ✅ Journal entry saved! 📝
          </motion.div>
        )}
      </AnimatePresence>

      {answeredCount >= PROMPTS.length && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mt-4 p-4 rounded-2xl bg-green-50 border border-green-200 max-w-sm mx-auto">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
          <p className="text-xs text-green-700 italic">
            "All 20 journal prompts completed! This is the most heartfelt love journal ever written for Sanzu! 📖💕"
          </p>
        </motion.div>
      )}
    </WorldShell>
  );
}
