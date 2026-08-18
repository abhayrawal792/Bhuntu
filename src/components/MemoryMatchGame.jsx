import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const PAIRS = [
  { id: 1, symbol: '💖', name: "Love" },
  { id: 2, symbol: '👑', name: "Queen" },
  { id: 3, symbol: '💍', name: "Marriage" },
  { id: 4, symbol: '🌹', name: "Rose" },
  { id: 5, symbol: '✈️', name: "Travel" },
  { id: 6, symbol: '🎂', name: "Birthday" }
];

export default function MemoryMatchGame() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.memoryMatch || {
    title: "Couple Memory Card Match 🃏",
    nepaliTitle: "Couple Memory Card Match 🃏",
    subtitle: "Flip cards to find matching pairs of love icons!",
    nepaliSubtitle: "Cards farkayera exact matching pairs khojnus!"
  };

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const { triggerHaptic } = useAppStore();

  const initGame = () => {
    const deck = [...PAIRS, ...PAIRS]
      .map((item, idx) => ({ ...item, uniqueId: idx }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;

    playSparkle();
    triggerHaptic(15);
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].id === cards[secondIdx].id) {
        playSparkle();
        triggerHaptic([30, 80]);
        const newMatched = [...matched, firstIdx, secondIdx];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <WorldShell
      theme="arcade"
      badge="12-Card Memory Match 🃏"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="flex items-center justify-between max-w-xs mx-auto mb-4 px-4 font-ui">
        <div className="text-xs font-bold text-gray-700">Moves: <span className="text-rose-600">{moves}</span></div>
        <div className="text-xs font-bold text-gray-700">Pairs Found: <span className="text-green-600">{matched.length / 2} / 6</span></div>
        <button onClick={initGame} className="p-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"><RefreshCw className="w-3.5 h-3.5" /></button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-xs sm:max-w-sm mx-auto mb-8">
        {cards.map((card, idx) => {
          const isOpen = flipped.includes(idx) || matched.includes(idx);
          return (
            <motion.button
              key={card.uniqueId}
              onClick={() => handleCardClick(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-20 h-24 rounded-2xl text-3xl font-bold flex items-center justify-center cursor-pointer transition-all shadow-md border-2 ${
                isOpen ? 'bg-white border-pink-400 text-gray-800' : 'bg-gradient-to-tr from-pink-500 to-rose-500 border-white text-white'
              }`}
            >
              {isOpen ? card.symbol : '❓'}
            </motion.button>
          );
        })}
      </div>
    </WorldShell>
  );
}
