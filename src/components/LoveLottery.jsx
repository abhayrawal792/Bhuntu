import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const CARDS = [
  { prize: '👑 Queen of My Heart', text: 'You win endless royal treatment forever!' },
  { prize: '✈️ Japan & Nepal Trip', text: 'Free ticket to endless vacations together!' },
  { prize: '💍 Lifetime Commitment', text: 'Guaranteed 100% eternal love and devotion!' }
];

export default function LoveLottery() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveLottery;
  const [scratched, setScratched] = useState([false, false, false]);
  const [won, setWon] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleScratch = (idx) => {
    if (scratched[idx]) return;
    playSparkle();
    triggerHaptic([30, 60]);
    const next = [...scratched];
    next[idx] = true;
    setScratched(next);
    if (next.every(Boolean)) {
      setWon(true);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Golden Love Lottery Scratch Card 🎰"
      badgeIcon={<Trophy className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto mb-6">
        {CARDS.map((card, idx) => (
          <motion.div key={idx} whileTap={{ scale: 0.95 }} onClick={() => handleScratch(idx)}
            className={`p-6 rounded-3xl border-2 cursor-pointer shadow-lg transition-all flex flex-col items-center justify-center min-h-[160px] ${
              scratched[idx] ? 'bg-amber-50 border-amber-300' : 'bg-gradient-to-br from-amber-400 to-yellow-500 border-amber-300 text-amber-950'
            }`}>
            {scratched[idx] ? (
              <>
                <span className="text-3xl mb-2">🎉</span>
                <h4 className="font-bold text-xs text-rose-600 font-nepali mb-1">{card.prize}</h4>
                <p className="text-[11px] text-gray-600 text-center">{card.text}</p>
              </>
            ) : (
              <>
                <Sparkles className="w-8 h-8 mb-2 animate-spin text-amber-900" />
                <span className="text-xs font-extrabold uppercase tracking-wider">Scratch Here 🪙</span>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {won && (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="p-5 rounded-3xl bg-white border-2 border-amber-300 shadow-xl max-w-sm mx-auto">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
          <h3 className="text-base font-extrabold font-nepali text-rose-600">LOTTERY JACKPOT WINNER! 👑</h3>
          <p className="text-xs text-gray-600 mt-1">You won 100% of my heart forever!</p>
        </motion.div>
      )}
    </WorldShell>
  );
}
