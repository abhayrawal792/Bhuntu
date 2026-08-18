import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Flame } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const MILESTONES = [
  { count: 10, msg: "Warm fuzzy feeling! 🤗", color: "text-yellow-500" },
  { count: 25, msg: "Getting cozy with Bebo! 🧸", color: "text-orange-500" },
  { count: 50, msg: "Heart is on fire for Bhuntu! 🔥", color: "text-rose-500" },
  { count: 75, msg: "Unstoppable love energy! ⚡", color: "text-purple-500" },
  { count: 100, msg: "INFINITE LOVE UNLOCKED! 💖✨", color: "text-pink-600" },
];

const HUG_TYPES = [
  { emoji: "🤗", name: "Warm Hug", points: 1 },
  { emoji: "🐻", name: "Bear Hug", points: 3 },
  { emoji: "🫂", name: "Tight Squeeze", points: 2 },
  { emoji: "💕", name: "Heart Hug", points: 2 },
  { emoji: "🌸", name: "Gentle Embrace", points: 1 },
];

export default function HugCounter() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.hugCounter;
  const [hugs, setHugs] = useState(0);
  const [warmth, setWarmth] = useState(0);
  const [currentHug, setCurrentHug] = useState(null);
  const [milestone, setMilestone] = useState(null);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const { triggerHaptic } = useAppStore();

  // warmth decay
  useEffect(() => {
    const timer = setInterval(() => {
      setWarmth(w => Math.max(0, w - 0.5));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  // hold-to-hug mechanic
  useEffect(() => {
    if (!isHolding) { setHoldProgress(0); return; }
    const timer = setInterval(() => {
      setHoldProgress(p => {
        if (p >= 100) {
          // bear hug bonus!
          const hugType = HUG_TYPES[1]; // bear hug
          handleHugComplete(hugType, true);
          setIsHolding(false);
          return 0;
        }
        return p + 4;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [isHolding]);

  const handleHugComplete = (hugType, isBear = false) => {
    playSparkle();
    triggerHaptic(isBear ? [40, 80, 40] : 20);
    const newHugs = hugs + hugType.points;
    setHugs(newHugs);
    setWarmth(w => Math.min(100, w + hugType.points * 10));
    setCurrentHug(hugType);
    setTimeout(() => setCurrentHug(null), 1200);

    // floating hearts
    const hearts = [];
    for (let i = 0; i < (isBear ? 8 : 3); i++) {
      hearts.push({
        id: Date.now() + i,
        x: 40 + Math.random() * 20,
        emoji: ['❤️', '💕', '💖', '💗', '🩷'][Math.floor(Math.random() * 5)],
      });
    }
    setFloatingHearts(prev => [...prev, ...hearts]);
    setTimeout(() => setFloatingHearts(prev => prev.filter(h => !hearts.includes(h))), 2000);

    // milestones
    const ms = MILESTONES.find(m => m.count === newHugs);
    if (ms) {
      setMilestone(ms);
      confetti({ particleCount: 120 + newHugs, spread: 80, origin: { y: 0.5 } });
      setTimeout(() => setMilestone(null), 3000);
    }
  };

  const quickHug = () => {
    const hugType = HUG_TYPES[Math.floor(Math.random() * HUG_TYPES.length)];
    handleHugComplete(hugType);
  };

  const warmthColor = warmth > 75 ? 'from-rose-500 to-orange-500' : warmth > 40 ? 'from-pink-500 to-rose-500' : 'from-blue-400 to-pink-400';

  return (
    <WorldShell
      theme="sweet"
      badge="Infinite Virtual Hug Generator 🫂"
      badgeIcon={<Heart className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Warmth Meter */}
      <div className="max-w-xs mx-auto mb-4">
        <div className="flex justify-between text-[11px] font-bold text-gray-500 mb-1">
          <span>🧊 Cold</span>
          <span>Warmth Level: {Math.round(warmth)}%</span>
          <span>🔥 Hot</span>
        </div>
        <div className="h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner">
          <motion.div animate={{ width: `${warmth}%` }} transition={{ duration: 0.3 }}
            className={`h-full rounded-full bg-gradient-to-r ${warmthColor}`}
          />
        </div>
      </div>

      {/* Hug Counter Display */}
      <motion.div animate={{ scale: currentHug ? 1.1 : 1 }} transition={{ type: 'spring', stiffness: 300 }}
        className="text-6xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 font-mono mb-2">
        {hugs.toLocaleString()}
      </motion.div>
      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Virtual Warm Hugs Sent to Bebo 💖</p>

      {/* Main Hug Button (tap or hold) */}
      <div className="relative inline-block mb-6">
        {/* Hold progress ring */}
        {isHolding && (
          <svg className="absolute inset-0 w-40 h-40 -m-2 mx-auto" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="3" />
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke="#ec4899" strokeWidth="4" strokeLinecap="round"
              strokeDasharray={`${holdProgress * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
        )}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={quickHug}
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          className="w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-bold shadow-2xl flex flex-col items-center justify-center mx-auto cursor-pointer border-4 border-white relative z-10"
        >
          <span className="text-4xl mb-1">{isHolding ? '🐻' : '🫂'}</span>
          <span className="text-[11px] font-extrabold font-ui">
            {isHolding ? 'Bear Hug Loading...' : 'Tap or Hold!'}
          </span>
        </motion.button>
      </div>

      {/* Hug Type Buttons */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
        {HUG_TYPES.map((ht, i) => (
          <button key={i} onClick={() => handleHugComplete(ht)}
            className="px-3 py-2 rounded-2xl bg-white border-2 border-pink-200 text-xs font-bold cursor-pointer hover:bg-pink-50 shadow-sm transition-all active:scale-95">
            {ht.emoji} {ht.name} (+{ht.points})
          </button>
        ))}
      </div>

      {/* Current Hug Animation */}
      <AnimatePresence>
        {currentHug && (
          <motion.div initial={{ y: 20, opacity: 0, scale: 0.5 }} animate={{ y: -30, opacity: 1, scale: 1.2 }} exit={{ y: -60, opacity: 0 }}
            className="text-3xl font-bold text-pink-600 pointer-events-none">
            {currentHug.emoji} {currentHug.name}!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts */}
      <AnimatePresence>
        {floatingHearts.map(h => (
          <motion.div key={h.id}
            initial={{ opacity: 1, y: 0, x: `${h.x}%` }}
            animate={{ opacity: 0, y: -150 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute text-2xl pointer-events-none" style={{ left: `${h.x}%`, bottom: '40%' }}>
            {h.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Milestone Popup */}
      <AnimatePresence>
        {milestone && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}>
            <div className="p-8 rounded-3xl bg-white shadow-2xl text-center max-w-xs">
              <Flame className="w-12 h-12 mx-auto mb-2 text-orange-500" />
              <h3 className={`text-xl font-extrabold font-nepali mb-2 ${milestone.color}`}>{milestone.msg}</h3>
              <p className="text-3xl font-extrabold font-mono text-gray-800 mb-2">{hugs} Hugs!</p>
              <p className="text-xs text-gray-500 italic">"Every hug brings us closer, Bebo 💕"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WorldShell>
  );
}
