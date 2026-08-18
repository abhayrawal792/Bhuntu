import WorldShell from './WorldShell';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Palette, RotateCcw, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const KISS_COLORS = [
  { name: 'Classic Red', color: '#DC2626', emoji: '💋' },
  { name: 'Hot Pink', color: '#EC4899', emoji: '💗' },
  { name: 'Berry', color: '#9333EA', emoji: '💜' },
  { name: 'Coral', color: '#F97316', emoji: '🧡' },
  { name: 'Rose Gold', color: '#E11D48', emoji: '🩷' },
];

const MESSAGES = [
  "Mwah! Sanzu deserves all the kisses! 💋",
  "Every kiss is a promise of forever 💕",
  "Kiss #10: Bebo is blushing! 😊",
  "Kiss #20: Your lips are magic! ✨",
  "Kiss #30: Infinite kisses unlocked! 💖",
];

const KISS_SHAPES = ['💋', '😘', '💕', '❤️', '🩷'];

export default function KissCollector() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.kissCollector;
  const [kisses, setKisses] = useState([]);
  const [selectedColor, setSelectedColor] = useState(0);
  const [lastMsg, setLastMsg] = useState(null);
  const [stampSize, setStampSize] = useState(1);
  const canvasRef = useRef(null);
  const { triggerHaptic } = useAppStore();

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    playSparkle();
    triggerHaptic(15);

    const kiss = {
      id: Date.now() + Math.random(),
      x, y,
      color: KISS_COLORS[selectedColor].color,
      emoji: KISS_SHAPES[Math.floor(Math.random() * KISS_SHAPES.length)],
      rotation: -30 + Math.random() * 60,
      scale: 0.7 + stampSize * 0.4,
    };
    const next = [...kisses, kiss];
    setKisses(next);

    // milestone messages
    if (next.length === 10 || next.length === 20 || next.length === 30) {
      const idx = next.length === 10 ? 2 : next.length === 20 ? 3 : 4;
      setLastMsg(MESSAGES[idx]);
      confetti({ particleCount: 80 + next.length * 2, spread: 70, origin: { y: 0.6 } });
      setTimeout(() => setLastMsg(null), 2500);
    }
  };

  const clearCanvas = () => { setKisses([]); };

  return (
    <WorldShell
      theme="sweet"
      badge="Lipstick Kiss Stamping Canvas 💋"
      badgeIcon={<Heart className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Color Picker */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <Palette className="w-4 h-4 text-pink-400" />
        <span className="text-xs font-bold text-gray-500">Lipstick Color:</span>
        {KISS_COLORS.map((kc, i) => (
          <button key={i} onClick={() => setSelectedColor(i)}
            className={`w-8 h-8 rounded-full border-3 cursor-pointer shadow-md transition-all ${
              selectedColor === i ? 'ring-2 ring-offset-2 ring-pink-500 scale-110' : 'hover:scale-105'
            }`}
            style={{ backgroundColor: kc.color }}
            title={kc.name}
          />
        ))}
      </div>

      {/* Stamp Size */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-xs font-bold text-gray-500">Size:</span>
        {[0.5, 1, 1.5].map((s, i) => (
          <button key={i} onClick={() => setStampSize(s)}
            className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all ${
              stampSize === s ? 'bg-pink-500 text-white shadow-md' : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
            }`}>
            {s === 0.5 ? 'S' : s === 1 ? 'M' : 'L'}
          </button>
        ))}
      </div>

      {/* Kiss Counter */}
      <div className="flex items-center justify-center gap-4 mb-3">
        <span className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 font-extrabold text-xs shadow">
          💋 {kisses.length} Kisses Stamped
        </span>
        <button onClick={clearCanvas}
          className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 font-bold text-xs cursor-pointer hover:bg-gray-200 flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> Clear
        </button>
      </div>

      {/* Canvas */}
      <div ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasClick}
        className="w-full max-w-md h-80 mx-auto rounded-3xl bg-gradient-to-br from-pink-50 via-white to-rose-50 border-4 border-pink-300 shadow-2xl relative overflow-hidden cursor-crosshair"
        style={{ touchAction: 'none' }}
      >
        {/* Letter background watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <span className="text-[120px] font-extrabold text-rose-300 font-nepali">S ♥ A</span>
        </div>

        {kisses.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xs text-pink-400 italic px-4">✨ Tap anywhere to stamp kisses for Sanzu! Choose your lipstick color above ✨</span>
          </div>
        )}

        <AnimatePresence>
          {kisses.map((k) => (
            <motion.div key={k.id}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: k.scale, rotate: k.rotation }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              style={{ left: k.x - 15, top: k.y - 15, color: k.color }}
              className="absolute text-2xl pointer-events-none drop-shadow-lg"
            >
              {k.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Milestone Message */}
      <AnimatePresence>
        {lastMsg && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            className="mt-4 px-6 py-3 rounded-2xl bg-rose-600 text-white font-bold text-sm shadow-xl inline-flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> {lastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {kisses.length >= 15 && !lastMsg && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="mt-4 p-4 rounded-2xl bg-pink-50 border border-pink-200 max-w-sm mx-auto">
          <p className="text-xs text-pink-600 italic font-ui">
            "This canvas is covered in love! Every kiss mark is a moment I wish I was there with you, Bebo 💋"
          </p>
        </motion.div>
      )}
    </WorldShell>
  );
}
