import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const ICONS = ['💖', '🌹', '💍', '🎁', '🎂', '👑'];

export default function LoveSlots() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveSlots;
  const [reels, setReels] = useState(['💖', '💖', '💖']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isJackpot, setIsJackpot] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handlePullLever = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setIsJackpot(false);
    playSparkle();
    triggerHaptic([30, 60, 30, 60]);

    let counter = 0;
    const interval = setInterval(() => {
      setReels([
        ICONS[Math.floor(Math.random() * ICONS.length)],
        ICONS[Math.floor(Math.random() * ICONS.length)],
        ICONS[Math.floor(Math.random() * ICONS.length)]
      ]);
      counter++;
      if (counter > 20) {
        clearInterval(interval);
        // Force Jackpot for fun!
        setReels(['💖', '💖', '💖']);
        setIsSpinning(false);
        setIsJackpot(true);
        playSparkle();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
      }
    }, 100);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Love Slot Machine 🎰"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="glass-card rounded-3xl p-8 max-w-md mx-auto border-2 border-pink-300 shadow-2xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white mb-8">
        <div className="flex items-center justify-center gap-4 bg-slate-800 p-6 rounded-2xl border-2 border-pink-400 mb-6 text-4xl sm:text-5xl shadow-inner">
          {reels.map((icon, idx) => (
            <motion.div key={idx} animate={{ scale: isSpinning ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.2, repeat: isSpinning ? Infinity : 0 }}>
              {icon}
            </motion.div>
          ))}
        </div>
        <button onClick={handlePullLever} disabled={isSpinning} className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-base shadow-xl hover:scale-105 transition-transform cursor-pointer font-ui">
          {isSpinning ? 'Spinning Reels...' : 'PULL LEVER FOR JACKPOT 🎰'}
        </button>
      </div>

      {isJackpot && (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="p-6 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl max-w-md mx-auto">
          <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-2 animate-bounce" />
          <h3 className="text-xl font-bold font-nepali text-rose-600">777 TRIPLE HEART JACKPOT! 🏆</h3>
          <p className="text-xs font-ui text-gray-600">You won infinite love, kisses & lifetime happiness with Abhay (Abu)! ❤️</p>
        </motion.div>
      )}
    </WorldShell>
  );
}
