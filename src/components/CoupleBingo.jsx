import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Target, Heart, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const BINGO_ITEMS = [
  'First "I love you" 💕', 'Midnight call 🌙', 'Matching outfits 👫', 'Cook together 🍳', 'Watch sunrise 🌅',
  'Silly nicknames 🤭', 'Long distance 🌏', 'First gift 🎁', 'Jealousy moment 😤', 'Surprise visit ✈️',
  'Inside joke 😂', 'Argue & makeup 💋', '💖 FREE 💖', 'Photo together 📸', 'Plan future 🏠',
  'Meet family 👨‍👩‍👧', 'Late night talk 💬', 'Miss each other 😢', 'Dream shared 💭', 'Dance together 💃',
  'Song for us 🎵', 'Write letter ✉️', 'Promise ring 💍', 'Cry happy tears 😭', 'Say forever ∞'
];

export default function CoupleBingo() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.coupleBingo;
  const [marked, setMarked] = useState(new Set([12])); // Center is free
  const [bingo, setBingo] = useState(false);
  const { triggerHaptic } = useAppStore();

  const checkBingo = (m) => {
    const lines = [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
      [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
      [0,6,12,18,24],[4,8,12,16,20]
    ];
    return lines.some(line => line.every(i => m.has(i)));
  };

  const handleMark = (idx) => {
    if (idx === 12 || bingo) return;
    playSparkle();
    triggerHaptic(15);
    const newMarked = new Set([...marked, idx]);
    setMarked(newMarked);
    if (checkBingo(newMarked)) {
      setBingo(true);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Couple Bingo Card 🎯"
      badgeIcon={<Target className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="grid grid-cols-5 gap-1.5 max-w-sm mx-auto mb-6">
        {BINGO_ITEMS.map((item, idx) => (
          <motion.button key={idx} whileTap={{ scale: 0.9 }} onClick={() => handleMark(idx)}
            className={`p-1.5 rounded-xl text-[11px] sm:text-[11px] font-bold h-16 flex items-center justify-center text-center border-2 cursor-pointer font-ui transition-all ${
              marked.has(idx) ? 'bg-rose-500 text-white border-rose-500 shadow-lg' : 'bg-white text-gray-700 border-teal-200 hover:bg-teal-50'
            }`}>
            {item}
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-gray-400 font-ui mb-4">{marked.size}/25 marked — Get 5 in a row for BINGO!</p>

      {bingo && (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="p-5 rounded-3xl bg-white border-2 border-green-300 shadow-xl max-w-sm mx-auto">
          <Star className="w-8 h-8 text-amber-500 fill-amber-500 mx-auto mb-2 animate-bounce" />
          <h3 className="text-lg font-extrabold font-nepali text-rose-600">BINGO! 🎉 You & Bebo have done it all!</h3>
        </motion.div>
      )}
    </WorldShell>
  );
}
