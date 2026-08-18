import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gamepad2, Heart, Trophy, RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function HeartCatcherGame() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.catcherGame || {
    title: "Catching Hearts Arcade Game 🎮",
    nepaliTitle: "Catching Hearts Arcade Game 🎮",
    subtitle: "Move your heart basket to catch falling glowing hearts & dodge rain clouds!",
    nepaliSubtitle: "Heart basket lai Left/Right sarera glowing hearts samjha!"
  };

  const [basketPos, setBasketPos] = useState(50); // % position across width
  const [score, setScore] = useState(0);
  const [fallingItem, setFallingItem] = useState({ x: 50, y: 0, type: 'heart' });
  const [gameOver, setGameOver] = useState(false);
  const { triggerHaptic } = useAppStore();

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setFallingItem((prev) => {
        if (prev.y >= 85) {
          // Check collision with basket (within 15% range)
          if (Math.abs(prev.x - basketPos) < 18) {
            if (prev.type === 'heart') {
              playSparkle();
              triggerHaptic(20);
              setScore((s) => s + 10);
            } else {
              triggerHaptic([50, 100]);
              setScore((s) => Math.max(0, s - 5));
            }
          }
          // Reset falling item at top
          return {
            x: Math.random() * 80 + 10,
            y: 0,
            type: Math.random() > 0.3 ? 'heart' : 'cloud'
          };
        }
        return { ...prev, y: prev.y + 5 };
      });
    }, 80);

    return () => clearInterval(interval);
  }, [basketPos, gameOver]);

  const handleMoveLeft = () => setBasketPos((p) => Math.max(10, p - 15));
  const handleMoveRight = () => setBasketPos((p) => Math.min(90, p + 15));

  const handleReset = () => {
    setScore(0);
    setBasketPos(50);
    setGameOver(false);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Arcade Heart Catcher 🎮"
      badgeIcon={<Gamepad2 className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="flex items-center justify-between max-w-md mx-auto mb-4 px-4 font-ui">
        <div className="text-sm font-bold text-gray-800">Score: <span className="text-rose-600">{score} pts</span></div>
        <button onClick={handleReset} className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"><RefreshCw className="w-4 h-4" /></button>
      </div>

      {/* Arcade Screen Canvas */}
      <div className="relative w-full max-w-md h-80 mx-auto rounded-3xl bg-gradient-to-b from-slate-900 to-indigo-950 border-4 border-pink-400 shadow-2xl overflow-hidden mb-6">
        {/* Falling Item */}
        <div className="absolute text-2xl" style={{ left: `${fallingItem.x}%`, top: `${fallingItem.y}%` }}>
          {fallingItem.type === 'heart' ? '💖' : '🌧️'}
        </div>

        {/* Movable Basket */}
        <div className="absolute bottom-3 text-3xl font-bold transition-all duration-100" style={{ left: `${basketPos}%`, transform: 'translateX(-50%)' }}>
          🧺
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-6 max-w-md mx-auto">
        <button onClick={handleMoveLeft} className="px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer hover:bg-rose-600 font-ui">
          <ChevronLeft className="w-5 h-5" />
          <span>Move Left</span>
        </button>
        <button onClick={handleMoveRight} className="px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer hover:bg-rose-600 font-ui">
          <span>Move Right</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </WorldShell>
  );
}
