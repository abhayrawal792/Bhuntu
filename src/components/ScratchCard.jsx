import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Ticket, Gift, Sparkles, CheckCircle } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

function ScratchCardItem({ card }) {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const { triggerHaptic } = useAppStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Fill with metallic silver/gold gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#E2E8F0');
    gradient.addColorStop(0.5, '#94A3B8');
    gradient.addColorStop(1, '#CBD5E1');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add pattern text on foil
    ctx.fillStyle = '#64748B';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE ✨', canvas.width / 2, canvas.height / 2 + 5);
  }, []);

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    const percent = (transparentCount / (pixels.length / 4)) * 100;
    if (percent > 45 && !isScratched) {
      setIsScratched(true);
      playSparkle();
      triggerHaptic([50, 100, 50]);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const rect = canvasRef.current.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseUp = () => setIsDrawing(false);

  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    const rect = canvasRef.current.getBoundingClientRect();
    scratch(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 border-2 border-pink-200 shadow-xl relative overflow-hidden text-center bg-white"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold font-ui px-3 py-1 rounded-full bg-rose-100 text-rose-600">
          {card.title}
        </span>
        <Ticket className="w-5 h-5 text-pink-400" />
      </div>

      {/* Underneath Reward Content */}
      <div className="py-6 px-4 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-inner mb-4 relative min-h-[140px] flex flex-col items-center justify-center">
        <h4 className="text-lg font-bold font-nepali mb-1 drop-shadow">
          {card.nepaliReward}
        </h4>
        <p className="text-xs font-ui opacity-90 mb-3">
          "{card.reward}"
        </p>
        <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[11px] font-mono font-bold tracking-wider">
          CODE: {card.code}
        </span>

        {/* Canvas Scratch Foil Layer */}
        {!isScratched && (
          <canvas
            ref={canvasRef}
            width={280}
            height={140}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="absolute inset-0 w-full h-full rounded-2xl cursor-pointer touch-none"
          />
        )}
      </div>

      {isScratched ? (
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-green-600 font-ui">
          <CheckCircle className="w-4 h-4" />
          <span>Reward Unlocked & Claimed!</span>
        </div>
      ) : (
        <p className="text-xs text-gray-400 font-ui">
          Use finger or mouse to scratch foil ✨
        </p>
      )}
    </motion.div>
  );
}

export default function ScratchCard() {
  const { cards, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.scratchCards;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-amber-700 font-bold text-xs mb-3 shadow-sm">
          <Gift className="w-4 h-4 text-amber-500" />
          <span>Scratch & Reveal Coupons 🎟️</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2 drop-shadow-sm">
          {nepaliTitle}
        </h1>
        <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm font-ui max-w-lg mx-auto">
          {nepaliSubtitle} — {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card) => (
          <ScratchCardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
