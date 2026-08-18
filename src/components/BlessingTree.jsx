import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const BLESSINGS = [
  "May you always be blessed with good health, long life, and endless joy. 🕯️✨",
  "May all your dreams across Nepal and Japan come true with flying colors. 🌟",
  "May our love remain pure, unconditional, and protected by the divine forever. 🙏💖"
];

export default function BlessingTree() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.blessingTree;
  const [lit, setLit] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleLight = () => {
    if (lit) return;
    playSparkle();
    triggerHaptic([30, 90]);
    setLit(true);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
  };

  return (
    <WorldShell
      theme="garden"
      badge="Divine Prayer Candle & Blessing 🕯️"
      badgeIcon={<Flame className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Prayer Candle Visual */}
      <div className="w-32 h-44 mx-auto rounded-2xl bg-amber-50 border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-end pb-4 relative mb-6">
        <div className="w-6 h-12 bg-amber-200 rounded-b-md mb-1 relative flex items-center justify-center">
          {lit ? (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-3xl -mt-8">
              🔥
            </motion.div>
          ) : (
            <div className="w-1 h-3 bg-gray-600 -mt-6" />
          )}
        </div>
      </div>

      <button onClick={handleLight} disabled={lit}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs shadow-xl hover:scale-105 transition-transform cursor-pointer mb-6 disabled:opacity-50">
        {lit ? 'Prayer Candle Lit! 🕯️' : 'Light Prayer Candle 🙏'}
      </button>

      {lit && (
        <div className="space-y-3 max-w-md mx-auto">
          {BLESSINGS.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}
              className="p-4 rounded-2xl bg-white border-2 border-amber-200 shadow-md text-xs font-bold text-gray-800 font-nepali">
              {b}
            </motion.div>
          ))}
        </div>
      )}
    </WorldShell>
  );
}
