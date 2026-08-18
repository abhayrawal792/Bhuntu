import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, CircleDollarSign } from 'lucide-react';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const COIN_WISHES = [
  "🪙 Coin 1 Tossed: May Sanzu always feel cherish, safe, and wildly loved!",
  "🪙 Coin 2 Tossed: May every single dream in Bebo's heart come true this year!",
  "🪙 Coin 3 Tossed: May our reunion in Japan be the most magical day of our lives!",
  "🪙 Coin 4 Tossed: May Sanzu's smile shine brighter than all the stars combined!",
  "🪙 Coin 5 Tossed: May our love story inspire everyone around us for eternity!",
];

export default function LoveWishWell() {
  const { triggerHaptic } = useAppStore();
  const [coinsTossed, setCoinsTossed] = useState(0);
  const [tossing, setTossing] = useState(false);
  const [lastWish, setLastWish] = useState(null);

  const handleTossCoin = () => {
    if (tossing) return;
    playSparkle();
    triggerHaptic([30, 60]);
    setTossing(true);

    const next = coinsTossed + 1;
    const wish = COIN_WISHES[Math.min(coinsTossed, COIN_WISHES.length - 1)];

    setTimeout(() => {
      setCoinsTossed(next);
      setTossing(false);
      setLastWish(wish);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }, 1200);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Enchanted Birthday Wishing Well 🪙"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={"चमत्कारी इनार"}
      subtitle={"Love Wishing Well"}
      description={"Toss golden coins into the magical glowing well to seal birthday blessings for Sanzu!"}
    >

      {/* Wishing Well Graphic Container */}
      <div className="w-64 h-64 mx-auto rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-cyan-950 border-4 border-cyan-400 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center mb-4">
        {/* Glowing water ripples */}
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
          className="w-48 h-48 rounded-full bg-cyan-500/20 border-2 border-cyan-300/40 absolute" />

        {/* Well rim */}
        <div className="w-40 h-28 rounded-b-3xl border-4 border-cyan-300 bg-slate-800/80 z-10 flex items-center justify-center relative shadow-inner">
          <span className="text-4xl">⛲</span>
          <div className="absolute bottom-2 text-[11px] font-mono text-cyan-300 font-bold">
            🪙 {coinsTossed} Coins Tossed
          </div>
        </div>

        {/* Coin tossing animation */}
        <AnimatePresence>
          {tossing && (
            <motion.div
              initial={{ y: -100, x: -30, rotate: 0, scale: 1 }}
              animate={{ y: 20, x: 0, rotate: 720, scale: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeIn' }}
              className="absolute z-20 text-3xl"
            >
              🪙
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toss Button */}
      <motion.button whileTap={{ scale: 0.9 }} onClick={handleTossCoin} disabled={tossing}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 font-bold text-xs shadow-xl cursor-pointer hover:from-amber-500 hover:to-amber-600 disabled:opacity-40 flex items-center justify-center gap-2 mx-auto mb-4">
        <CircleDollarSign className="w-4 h-4" />
        <span>{tossing ? 'Tossing Coin into Well...' : 'Toss Golden Coin into Well 🪙'}</span>
      </motion.button>

      {/* Wish display */}
      {lastWish && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 max-w-sm mx-auto">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mx-auto mb-1 animate-pulse" />
          <p className="text-xs text-cyan-800 italic font-bold">{lastWish}</p>
        </motion.div>
      )}
    </WorldShell>
  );
}
