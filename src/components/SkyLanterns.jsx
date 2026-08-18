import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function SkyLanterns() {
  const { wishes, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.lanterns;
  const [litLanterns, setLitLanterns] = useState([]);
  const { triggerHaptic } = useAppStore();

  const handleLightLantern = (idx) => {
    playSparkle();
    triggerHaptic([30, 60]);
    if (!litLanterns.includes(idx)) {
      setLitLanterns((prev) => [...prev, idx]);
    }
  };

  return (
    <WorldShell
      theme="garden"
      badge="Sky Lantern Wish Night 🏮"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Night Sky Canvas */}
      <div className="relative w-full max-w-2xl h-[420px] mx-auto rounded-3xl bg-gradient-to-b from-[#090D16] via-[#1A1423] to-[#2B1B34] border border-amber-700/50 shadow-2xl overflow-hidden p-6 flex flex-wrap items-center justify-center gap-6">
        {wishes.map((wish, idx) => {
          const isLit = litLanterns.includes(idx);

          return (
            <motion.div
              key={idx}
              onClick={() => handleLightLantern(idx)}
              animate={{ y: isLit ? [-10, -40, -10] : [0, -5, 0] }}
              transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer group flex flex-col items-center max-w-[130px]"
            >
              {/* Lantern Body */}
              <div className={`w-16 h-24 rounded-t-2xl rounded-b-lg border-2 flex flex-col items-center justify-center p-2 relative shadow-2xl transition-all duration-500 ${
                isLit
                  ? 'bg-gradient-to-t from-amber-500 via-rose-500 to-pink-400 border-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.8)]'
                  : 'bg-amber-950/60 border-amber-800 opacity-60'
              }`}>
                <Flame className={`w-6 h-6 ${isLit ? 'text-amber-200 animate-pulse' : 'text-amber-700'}`} />
                <span className="text-[11px] font-bold text-white font-ui mt-1">
                  Wish #{idx + 1}
                </span>
              </div>

              <span className="text-[11px] text-amber-200 font-ui mt-2 text-center bg-slate-900/80 px-2 py-0.5 rounded-full border border-amber-800">
                {isLit ? 'Glowing ✨' : 'Tap to Light 🏮'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Lit Wishes List */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {litLanterns.map((idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-amber-950/40 border border-amber-700/50 text-amber-200 text-xs sm:text-sm font-ui text-left flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400 flex-shrink-0" />
            <span>"{wishes[idx]}"</span>
          </motion.div>
        ))}
      </div>
    </WorldShell>
  );
}
