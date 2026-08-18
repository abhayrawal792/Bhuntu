import WorldShell from './WorldShell';
import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function HeartFireworks() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.fireworks;
  const { triggerHaptic } = useAppStore();

  const handleLaunchFireworks = (e) => {
    playSparkle();
    triggerHaptic([30, 70, 30]);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { x, y },
      colors: ['#FF85A1', '#FFB703', '#F72585', '#7209B7', '#FFFFFF']
    });
  };

  return (
    <WorldShell
      theme="music"
      badge="Heart Fireworks Show 🎆"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div onClick={handleLaunchFireworks} className="w-full max-w-2xl h-80 mx-auto rounded-3xl bg-slate-950 border-2 border-indigo-700 shadow-2xl overflow-hidden cursor-pointer relative flex items-center justify-center">
        <span className="text-indigo-300 text-xs font-ui pointer-events-none">
          Click anywhere inside this night sky to launch fireworks! 🎆
        </span>
      </div>
    </WorldShell>
  );
}
