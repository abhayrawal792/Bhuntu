import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PartyPopper, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const MESSAGES = [
  "Happy Birthday to the most beautiful soul I know! 🎂",
  "Every day with you feels like a celebration, Bebo! 🥳",
  "You make my world spin with joy and laughter! 🌍",
  "Here's to another year of loving you endlessly! ❤️",
  "May all your birthday wishes come true, my queen! 👑",
  "You're not just my partner — you're my whole universe! 🌌",
  "The best gift I ever received was your love! 🎁",
  "Distance means nothing when love is this strong! ✈️",
  "I'm counting the days until I hold you again! 🤗",
  "This birthday is special because YOU are special! ⭐"
];

const COLORS = ['#ff6b8a', '#c084fc', '#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#a78bfa', '#fb923c', '#2dd4bf', '#f43f5e'];

export default function BalloonPop() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.balloonPop;
  const [popped, setPopped] = useState(new Set());
  const [openMsg, setOpenMsg] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handlePop = (idx) => {
    if (popped.has(idx)) return;
    playSparkle();
    triggerHaptic([30, 80]);
    setPopped(new Set([...popped, idx]));
    setOpenMsg({ idx, msg: MESSAGES[idx] });
    if (popped.size === 9) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Balloon Pop Countdown 🎈"
      badgeIcon={<PartyPopper className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <p className="text-xs text-gray-400 font-ui mb-4">{popped.size}/{MESSAGES.length} balloons popped 🎈</p>

      <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto mb-6">
        {MESSAGES.map((_, idx) => (
          <motion.button key={idx} whileTap={{ scale: 1.2 }} onClick={() => handlePop(idx)}
            className="cursor-pointer"
            animate={popped.has(idx) ? { scale: [1, 1.4, 0], opacity: [1, 1, 0] } : {}}
            transition={{ duration: 0.4 }}>
            {popped.has(idx) ? (
              <span className="text-2xl">💥</span>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-4xl" style={{ filter: `hue-rotate(${idx * 36}deg)` }}>🎈</span>
                <span className="text-[11px] font-bold text-gray-500 -mt-1">{idx + 1}</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {openMsg && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="p-5 rounded-3xl bg-white border-2 shadow-xl max-w-md mx-auto cursor-pointer" style={{ borderColor: COLORS[openMsg.idx] }}
            onClick={() => setOpenMsg(null)}>
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
            <p className="font-nepali text-sm font-bold text-gray-800">🎈 Balloon #{openMsg.idx + 1}</p>
            <p className="text-sm text-gray-700 mt-1 font-ui">{openMsg.msg}</p>
            <p className="text-[11px] text-gray-400 mt-2 font-ui">Tap to close</p>
          </motion.div>
        )}
      </AnimatePresence>
    </WorldShell>
  );
}
