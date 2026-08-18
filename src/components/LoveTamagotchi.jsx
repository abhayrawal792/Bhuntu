import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Utensils, Smile, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function LoveTamagotchi() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveTamagotchi;
  const [happiness, setHappiness] = useState(50);
  const [fullness, setFullness] = useState(50);
  const [statusText, setStatusText] = useState("I'm happy to see you, Bebo! 💕");
  const { triggerHaptic } = useAppStore();

  const handleFeed = () => {
    playSparkle();
    triggerHaptic(20);
    setFullness(f => Math.min(100, f + 20));
    setHappiness(h => Math.min(100, h + 10));
    setStatusText("Yum! Yummy sweet heart treats! 🍰");
  };

  const handlePet = () => {
    playSparkle();
    triggerHaptic([20, 40]);
    setHappiness(h => Math.min(100, h + 25));
    setStatusText("Purrrr... I love your gentle head pats! 🥰");
  };

  const handlePlay = () => {
    playSparkle();
    triggerHaptic(15);
    setHappiness(h => Math.min(100, h + 20));
    setFullness(f => Math.max(0, f - 10));
    setStatusText("Yay! Catching love bubbles together! 🫧");
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Virtual Heart Pet Care 🐱"
      badgeIcon={<Heart className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Pet Display Window */}
      <div className="w-48 h-48 mx-auto rounded-3xl bg-pink-50 border-4 border-pink-300 shadow-2xl flex flex-col items-center justify-center relative mb-6">
        <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-6xl mb-2">
          {happiness > 80 ? '😻' : happiness > 40 ? '🐱' : '😿'}
        </motion.div>
        <span className="text-xs font-bold text-rose-600 bg-white px-3 py-1 rounded-full border border-pink-200 shadow-sm">
          {statusText}
        </span>
      </div>

      {/* Meter Stats */}
      <div className="max-w-xs mx-auto space-y-2 mb-6 text-left">
        <div>
          <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
            <span>Happiness</span><span>{happiness}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-pink-500 transition-all duration-300" style={{ width: `${happiness}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
            <span>Fullness</span><span>{fullness}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${fullness}%` }} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-3">
        <button onClick={handleFeed} className="px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer">
          <Utensils className="w-4 h-4" /><span>Feed Treats</span>
        </button>
        <button onClick={handlePet} className="px-4 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer">
          <Smile className="w-4 h-4" /><span>Pet Head</span>
        </button>
        <button onClick={handlePlay} className="px-4 py-2.5 rounded-full bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer">
          <Sparkles className="w-4 h-4" /><span>Play Game</span>
        </button>
      </div>
    </WorldShell>
  );
}
