import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Utensils, Smile } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function VirtualLovePet() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.lovePet;
  const [happiness, setHappiness] = useState(80);
  const [status, setStatus] = useState("Meow! Stroke me for heart purrs 🐱");
  const { triggerHaptic } = useAppStore();

  const handlePet = () => {
    playSparkle();
    triggerHaptic(20);
    setHappiness((prev) => Math.min(100, prev + 10));
    setStatus("Purrrrr! I love you, Sanzu Bebo! 💖");
  };

  const handleFeed = () => {
    playSparkle();
    triggerHaptic(20);
    setHappiness((prev) => Math.min(100, prev + 15));
    setStatus("Yummy treats! Birthday cat is full & happy! 🐟");
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Virtual Birthday Pet 🐱"
      badgeIcon={<Smile className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="glass-card rounded-3xl p-8 max-w-md mx-auto border-2 border-pink-300 shadow-2xl bg-white mb-8">
        <motion.div whileHover={{ scale: 1.1 }} onClick={handlePet} className="w-40 h-40 mx-auto rounded-full bg-pink-100 flex items-center justify-center text-7xl shadow-inner border-4 border-pink-300 mb-4 cursor-pointer">
          🐱
        </motion.div>

        <p className="text-xs font-bold text-rose-600 font-ui mb-4">{status}</p>

        <div className="w-full bg-pink-100 h-3 rounded-full overflow-hidden mb-6">
          <div className="bg-rose-500 h-full transition-all duration-300" style={{ width: `${happiness}%` }} />
        </div>

        <div className="flex justify-center gap-3">
          <button onClick={handlePet} className="px-5 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 cursor-pointer font-ui">
            <Heart className="w-4 h-4 fill-white" />
            <span>Stroke Pet</span>
          </button>
          <button onClick={handleFeed} className="px-5 py-2.5 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 shadow hover:scale-105 cursor-pointer font-ui">
            <Utensils className="w-4 h-4" />
            <span>Feed Treat</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
