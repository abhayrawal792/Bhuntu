import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function SpinWheel() {
  const { prizes, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.spinWheel;
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonPrize, setWonPrize] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);
    playSparkle();
    triggerHaptic([30, 80, 30, 80]);

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const degreesPerPrize = 360 / prizes.length;
    const extraRounds = 5 * 360; // 5 full spins
    const targetDegree = rotation + extraRounds + (prizes.length - prizeIndex) * degreesPerPrize;

    setRotation(targetDegree);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(prizes[prizeIndex]);
      playSparkle();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    }, 4000);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Lucky Romantic Wheel 🎡"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Wheel Graphic Container */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto mb-8">
        {/* Pointer Arrow */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 text-rose-600 text-3xl font-bold">
          🔻
        </div>

        {/* Animated Wheel */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 4, ease: [0.15, 0.9, 0.2, 1] }}
          className="w-full h-full rounded-full border-4 border-pink-300 shadow-2xl relative overflow-hidden bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center"
        >
          {prizes.map((prize, idx) => {
            const segCount = prizes.length;
            const angle = (360 / segCount) * idx + (360 / segCount) / 2;
            const rad = (angle * Math.PI) / 180;
            const r = 100; // % from center, adjust based on wheel size
            return (
              <div
                key={idx}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <span
                  className="text-[11px] sm:text-[11px] font-bold text-white font-ui drop-shadow-md"
                  style={{
                    position: 'absolute',
                    top: '8%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    maxWidth: '72px',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    wordBreak: 'break-word',
                  }}
                >
                  {prize}
                </span>
              </div>
            );
          })}

          {/* Center Hub */}
          <div className="w-16 h-16 rounded-full bg-white border-4 border-pink-300 shadow-xl flex items-center justify-center z-10 text-rose-600 font-bold text-xs">
            💖
          </div>
        </motion.div>
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className={`px-8 py-3.5 rounded-full font-bold text-sm text-white shadow-xl transition-all cursor-pointer font-ui ${
          isSpinning ? 'bg-gray-400 opacity-60 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:scale-105'
        }`}
      >
        {isSpinning ? 'Spinning Wheel...' : 'SPIN THE WHEEL 🎡'}
      </button>

      {wonPrize && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-6 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl max-w-md mx-auto"
        >
          <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2 animate-bounce" />
          <h3 className="text-xl font-bold font-nepali text-gray-900 mb-1">
            Congratulations, Bebo! 🎉
          </h3>
          <p className="text-sm font-bold text-rose-600 font-ui mb-2">
            You won: {wonPrize}
          </p>
        </motion.div>
      )}
    </WorldShell>
  );
}
