import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Utensils, Check, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const ITEMS = ['🍱 Heart Sushi', '🍓 Sweet Strawberries', '🍙 Tamago Rice', '🍡 Dango Sweets', '🌸 Cherry Blossoms'];

export default function BentoBox() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.bentoBox;
  const [bento, setBento] = useState([]);
  const [done, setDone] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleAdd = (item) => {
    if (bento.includes(item) || done) return;
    playSparkle();
    triggerHaptic(15);
    const next = [...bento, item];
    setBento(next);
    if (next.length === ITEMS.length) {
      setDone(true);
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    }
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Romantic Bento Box Studio 🍱"
      badgeIcon={<Utensils className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Bento Container Grid */}
      <div className="max-w-xs mx-auto p-4 rounded-3xl bg-rose-900 border-4 border-rose-700 shadow-2xl min-h-[200px] grid grid-cols-3 gap-2 mb-6">
        {bento.map((it, i) => (
          <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="p-3 rounded-2xl bg-rose-100 text-rose-950 font-bold text-xs flex flex-col items-center justify-center text-center shadow">
            <span>{it}</span>
          </motion.div>
        ))}
        {Array.from({ length: 6 - bento.length }).map((_, i) => (
          <div key={i} className="rounded-2xl border-2 border-dashed border-rose-700 bg-rose-950/40 flex items-center justify-center text-xs text-rose-400">
            Empty
          </div>
        ))}
      </div>

      {/* Ingredient Selector */}
      <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto mb-6">
        {ITEMS.map((item, i) => (
          <button key={i} onClick={() => handleAdd(item)} disabled={bento.includes(item) || done}
            className={`px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer ${bento.includes(item) ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-800 border-pink-200 hover:bg-pink-50'}`}>
            {bento.includes(item) ? `✓ ${item}` : `+ ${item}`}
          </button>
        ))}
      </div>

      {done && (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="p-5 rounded-3xl bg-white border-2 border-green-300 shadow-xl max-w-sm mx-auto">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
          <h3 className="text-base font-extrabold font-nepali text-rose-600">DELICIOUS LOVE BENTO READY! 🍱</h3>
        </motion.div>
      )}
    </WorldShell>
  );
}
