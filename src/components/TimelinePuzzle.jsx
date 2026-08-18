import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Clock, CheckCircle } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function TimelinePuzzle() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.timelineQuiz;
  const [completed, setCompleted] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleSolve = () => {
    playSparkle();
    triggerHaptic([30, 80]);
    setCompleted(true);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Timeline Order Puzzle ⏳"
      badgeIcon={<Clock className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="glass-card rounded-3xl p-6 max-w-md mx-auto border-2 border-pink-300 shadow-2xl bg-white mb-8 text-left space-y-3">
        <div className="p-3 rounded-xl bg-pink-50 text-xs font-bold text-gray-800 font-ui">1. First Connection & Voice Love 💖</div>
        <div className="p-3 rounded-xl bg-pink-50 text-xs font-bold text-gray-800 font-ui">2. Nepalgunj ✈️ Osaka Long Distance Bond</div>
        <div className="p-3 rounded-xl bg-pink-50 text-xs font-bold text-gray-800 font-ui">3. Approaching 1 Year Anniversary</div>
        <div className="p-3 rounded-xl bg-pink-50 text-xs font-bold text-gray-800 font-ui">4. Forever Marriage & Happy Family 💍</div>

        <button onClick={handleSolve} className="w-full mt-4 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-lg cursor-pointer font-ui">
          Confirm Timeline Order ✨
        </button>
      </div>

      {completed && (
        <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-sm font-ui">
          <CheckCircle className="w-5 h-5" />
          <span>Timeline Verified Perfectly!</span>
        </div>
      )}
    </WorldShell>
  );
}
