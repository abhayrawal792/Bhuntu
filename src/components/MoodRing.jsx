import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Fingerprint, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const MOODS = [
  { color: 'bg-rose-500', name: 'Madly In Love 💕', desc: '100% devotion and warmth radiating from your heart!' },
  { color: 'bg-purple-500', name: 'Deeply Romantic 🔮', desc: 'Thinking about moonlight walks and late night talks.' },
  { color: 'bg-amber-400', name: 'Super Playful 😸', desc: 'Ready for silly jokes, giggles, and sweet dares!' }
];

export default function MoodRing() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.moodRing;
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handleScan = () => {
    if (scanning) return;
    setScanning(true);
    setResult(null);
    playSparkle();
    triggerHaptic([30, 60, 90]);

    setTimeout(() => {
      setScanning(false);
      const res = MOODS[Math.floor(Math.random() * MOODS.length)];
      setResult(res);
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
    }, 2000);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Digital Love Mood Ring Scanner 💍"
      badgeIcon={<Fingerprint className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Scanner Pad */}
      <motion.button whileTap={{ scale: 0.9 }} onClick={handleScan} disabled={scanning}
        className="w-40 h-40 rounded-full bg-slate-900 border-4 border-pink-400 shadow-2xl flex flex-col items-center justify-center mx-auto cursor-pointer mb-6 relative overflow-hidden text-white">
        <Fingerprint className={`w-20 h-20 ${scanning ? 'text-pink-400 animate-pulse' : 'text-slate-400'}`} />
        <span className="text-[11px] font-bold uppercase tracking-widest mt-2">{scanning ? 'Scanning Aura...' : 'Press Finger'}</span>
      </motion.button>

      {result && (
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="p-6 rounded-3xl bg-white border-2 border-pink-300 shadow-xl max-w-sm mx-auto">
          <div className={`w-12 h-12 rounded-full ${result.color} mx-auto mb-3 shadow-md flex items-center justify-center text-xl`}>
            💖
          </div>
          <h3 className="text-base font-extrabold font-nepali text-gray-800 mb-1">{result.name}</h3>
          <p className="text-xs text-gray-600 font-ui leading-relaxed">{result.desc}</p>
        </motion.div>
      )}
    </WorldShell>
  );
}
