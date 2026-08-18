import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Clock, Heart, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const MILESTONES = [
  { year: 'Year 1', emoji: '💕', title: 'First Anniversary', desc: 'Our first year — filled with late night calls, surprise messages, and learning each other\'s hearts across 4,800km.', promise: 'I promise to never stop making you smile, Bebo.' },
  { year: 'Year 5', emoji: '🏠', title: 'Building Our Home', desc: 'By now we\'ve closed the distance. Our home is filled with laughter, cooking together, and lazy Sunday mornings.', promise: 'I promise to build a life that makes you feel safe and loved.' },
  { year: 'Year 10', emoji: '🌸', title: 'Growing Together', desc: 'A decade of love! We\'ve traveled the world, grown stronger through every challenge, and our love only deepens.', promise: 'I promise to keep falling in love with you every single day.' },
  { year: 'Year 25', emoji: '👑', title: 'Silver Jubilee', desc: '25 years! Our love story is legendary. We look back at old photos and laugh at how young we were when it all began.', promise: 'I promise that even after 25 years, I\'ll hold your hand like it\'s the first time.' },
  { year: 'Year 50', emoji: '💎', title: 'Golden Anniversary', desc: 'Half a century of love. We\'re sitting on a porch watching the sunset, still making each other laugh, still madly in love.', promise: 'I promise to love you until the very last beat of my heart and beyond.' },
];

export default function LoveTimeMachine() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [revealed, setRevealed] = useState([false, false, false, false, false]);
  const { triggerHaptic } = useAppStore();

  const milestone = MILESTONES[currentIdx];

  const navigate = (dir) => {
    playSparkle();
    triggerHaptic(15);
    setDirection(dir);
    setCurrentIdx(i => Math.max(0, Math.min(MILESTONES.length - 1, i + dir)));
  };

  const revealPromise = () => {
    playSparkle();
    triggerHaptic([30, 60]);
    const next = [...revealed];
    next[currentIdx] = true;
    setRevealed(next);
    if (next.every(Boolean)) confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
  };

  return (
    <WorldShell
      theme="journey"
      badge="Love Time Machine — Future Promises ⏰"
      badgeIcon={<Clock className="w-3.5 h-3.5" />}
      title={"समयको यात्रा"}
      subtitle={"Our Love Time Machine"}
      description={"Travel through time and see our love story unfold — with a promise at every milestone!"}
    >

      {/* Timeline dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {MILESTONES.map((m, i) => (
          <div key={i} className="flex items-center gap-1">
            <button onClick={() => { setCurrentIdx(i); playSparkle(); }}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold cursor-pointer transition-all ${
                i === currentIdx ? 'bg-indigo-600 text-white scale-110 shadow-lg' :
                revealed[i] ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
              }`}>
              {revealed[i] ? '✓' : m.emoji}
            </button>
            {i < MILESTONES.length - 1 && (
              <div className={`w-6 h-0.5 ${i < currentIdx ? 'bg-indigo-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Time Machine Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div key={currentIdx}
          custom={direction}
          initial={{ x: direction * 200, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: direction * -200, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className="max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-rose-900 text-white shadow-2xl border-2 border-indigo-400 mb-4"
        >
          <span className="text-5xl block mb-3">{milestone.emoji}</span>
          <span className="px-4 py-1 rounded-full bg-white/20 text-xs font-extrabold tracking-widest">{milestone.year}</span>
          <h3 className="text-2xl font-extrabold font-nepali mt-3 mb-2">{milestone.title}</h3>
          <p className="text-xs opacity-90 leading-relaxed mb-4">{milestone.desc}</p>

          {/* Promise reveal */}
          {!revealed[currentIdx] ? (
            <motion.button whileTap={{ scale: 0.9 }} onClick={revealPromise}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-bold text-xs shadow-lg cursor-pointer hover:from-amber-500 hover:to-amber-600 flex items-center gap-2 mx-auto">
              <Sparkles className="w-4 h-4" /> Reveal My Promise 💌
            </motion.button>
          ) : (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 mx-auto mb-2" />
              <p className="text-sm italic leading-relaxed">"{milestone.promise}"</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={() => navigate(-1)} disabled={currentIdx === 0}
          className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs cursor-pointer hover:bg-indigo-200 disabled:opacity-30 flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" /> Past
        </button>
        <span className="text-xs text-gray-500">{currentIdx + 1} / {MILESTONES.length}</span>
        <button onClick={() => navigate(1)} disabled={currentIdx === MILESTONES.length - 1}
          className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs cursor-pointer hover:bg-indigo-200 disabled:opacity-30 flex items-center gap-1">
          Future <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {revealed.every(Boolean) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 max-w-sm mx-auto">
          <p className="text-xs text-indigo-700 italic">
            "Every promise revealed! From Year 1 to Year 50, my love for you only grows, Sanzu. These aren't just words — they're my life's mission. 💖"
          </p>
        </motion.div>
      )}
    </WorldShell>
  );
}
