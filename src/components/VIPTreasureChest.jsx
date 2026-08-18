import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Key, Sparkles, Award, Heart, CheckCircle2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function VIPTreasureChest() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.treasureChest;
  const [isOpen, setIsOpen] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleOpenChest = () => {
    playSparkle();
    triggerHaptic([50, 100, 50, 100]);
    setIsOpen(true);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Golden Treasure Chest 🗝️"
      badgeIcon={<Key className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Treasure Chest Graphic */}
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleOpenChest}
        className="w-72 h-56 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center cursor-pointer relative overflow-hidden mb-8 group"
      >
        <div className="w-16 h-16 rounded-full bg-amber-900 border-4 border-amber-300 flex items-center justify-center text-amber-300 shadow-inner mb-2 group-hover:scale-110 transition-transform">
          <Key className="w-8 h-8 animate-bounce" />
        </div>

        <span className="text-xs font-bold text-amber-950 font-ui uppercase tracking-wider bg-amber-200/90 px-4 py-1 rounded-full shadow">
          {isOpen ? 'Chest Unlocked! 💎' : 'Insert Key to Unlock 🗝️'}
        </span>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-8 max-w-xl mx-auto border-2 border-amber-300 shadow-2xl bg-gradient-to-br from-amber-50 via-white to-pink-50 text-center"
        >
          <Award className="w-16 h-16 text-amber-500 mx-auto mb-3 animate-bounce" />
          <h3 className="text-2xl font-extrabold font-nepali text-rose-600 mb-2">
            Official Birthday Crown Unlocked! 👑
          </h3>
          <p className="text-sm text-gray-700 font-ui mb-4">
            Certified VIP Queen of My Heart: <strong>Sanzu Rawal (Bhuntu / Bebo)</strong> ❤️
          </p>

          <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300 text-xs font-ui text-amber-900 text-left space-y-1">
            <p className="font-bold flex items-center gap-1 text-amber-700">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Royal Lifetime Perks Included:</span>
            </p>
            <p>• Unlimited cuddles & priority video calls across all miles.</p>
            <p>• Forever marriage promise & happy family dreams together.</p>
          </div>
        </motion.div>
      )}
    </WorldShell>
  );
}
