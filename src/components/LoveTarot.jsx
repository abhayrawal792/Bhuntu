import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const CARDS = [
  { era: 'Past 📜', title: 'The Destiny Spark', text: 'The universe aligned to bring us together across distance.' },
  { era: 'Present 💖', title: 'The Lovers', text: 'Unbreakable bond, deep devotion, and endless joy.' },
  { era: 'Future 🌅', title: 'Eternal Sunset', text: 'Marriage, travels across the globe, and a happy home together.' }
];

export default function LoveTarot() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveTarot;
  const [flipped, setFlipped] = useState([false, false, false]);
  const { triggerHaptic } = useAppStore();

  const handleFlip = (idx) => {
    if (flipped[idx]) return;
    playSparkle();
    triggerHaptic([30, 70]);
    const next = [...flipped];
    next[idx] = true;
    setFlipped(next);
    if (next.every(Boolean)) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Romantic 3-Card Tarot Reading 🔮"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto mb-6">
        {CARDS.map((card, idx) => (
          <motion.div key={idx} whileTap={{ scale: 0.95 }} onClick={() => handleFlip(idx)}
            className={`p-6 rounded-3xl border-2 cursor-pointer shadow-lg transition-all flex flex-col items-center justify-center min-h-[200px] relative ${
              flipped[idx] ? 'bg-purple-50 border-purple-300' : 'bg-gradient-to-br from-indigo-900 to-purple-900 border-purple-500 text-purple-200'
            }`}>
            {flipped[idx] ? (
              <>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-widest mb-1">{card.era}</span>
                <h4 className="font-extrabold text-sm text-purple-900 font-nepali mb-2">{card.title}</h4>
                <p className="text-[11px] text-gray-700 leading-relaxed font-ui">{card.text}</p>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mt-3" />
              </>
            ) : (
              <>
                <span className="text-4xl mb-3">🔮</span>
                <span className="text-xs font-bold uppercase tracking-wider">{card.era}</span>
                <span className="text-[11px] text-purple-300 mt-1">Tap to reveal card</span>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </WorldShell>
  );
}
