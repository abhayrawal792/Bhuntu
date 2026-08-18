import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Grid3x3,
  Heart,
  RotateCcw,
  Sparkles,
  Share2,
  Wand2,
  Eye,
  RefreshCw
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const HEARTS = ['❤️', '💖', '💕', '💗', '💜', '💙', '💚', '💛', '🧡', '👑', '⭐', '✨'];
const SIZE = 14;

const PRESETS = [
  {
    name: 'Big Pixel Heart ❤️',
    emoji: '❤️',
    pattern: [
      0,0,1,1,0,0,0,1,1,0,0,0,0,0,
      0,1,1,1,1,0,1,1,1,1,0,0,0,0,
      1,1,1,1,1,1,1,1,1,1,1,0,0,0,
      1,1,1,1,1,1,1,1,1,1,1,0,0,0,
      1,1,1,1,1,1,1,1,1,1,1,0,0,0,
      0,1,1,1,1,1,1,1,1,1,0,0,0,0,
      0,0,1,1,1,1,1,1,1,0,0,0,0,0,
      0,0,0,1,1,1,1,1,0,0,0,0,0,0,
      0,0,0,0,1,1,1,0,0,0,0,0,0,0,
      0,0,0,0,0,1,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ]
  },
  {
    name: 'Queen Crown 👑',
    emoji: '👑',
    pattern: [
      1,0,0,0,1,0,0,1,0,0,0,1,0,0,
      1,1,0,0,1,1,1,1,0,0,1,1,0,0,
      1,1,1,0,1,1,1,1,0,1,1,1,0,0,
      1,1,1,1,1,1,1,1,1,1,1,1,0,0,
      0,1,1,1,1,1,1,1,1,1,1,0,0,0,
      0,0,1,1,1,1,1,1,1,1,0,0,0,0,
      0,0,1,1,1,1,1,1,1,1,0,0,0,0,
      0,0,0,1,1,1,1,1,1,0,0,0,0,0,
      0,0,0,0,1,1,1,1,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ]
  }
];

export default function PixelHeartPainter() {
  const { triggerHaptic } = useAppStore();

  const [color, setColor] = useState('❤️');
  const [grid, setGrid] = useState(Array(SIZE * SIZE).fill(''));
  const [painting, setPainting] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const filledCount = grid.filter(Boolean).length;
  const revealPct = Math.round((filledCount / (SIZE * SIZE)) * 100);
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handlePaint = (i) => {
    if (grid[i] === color) return;
    const next = [...grid];
    next[i] = color;
    setGrid(next);
    triggerHaptic(3);

    const count = next.filter(Boolean).length;
    if (count % 30 === 0 && count > 0) {
      playSparkle();
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    }
  };

  const handleMove = (i) => {
    if (painting && grid[i] !== color) {
      const next = [...grid];
      next[i] = color;
      setGrid(next);
    }
  };

  const handleApplyPreset = (preset) => {
    playSparkle();
    playBloom();
    triggerHaptic([30, 60, 90]);

    const newGrid = preset.pattern.map((val) => (val === 1 ? preset.emoji : ''));
    setGrid(newGrid);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
  };

  const handleClearGrid = () => {
    playPop();
    triggerHaptic(10);
    setGrid(Array(SIZE * SIZE).fill(''));
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎨 RETRO PIXEL HEART ARTWORK 🎨\n\nI painted a pixel heart artwork with ${filledCount} pixels and revealed a memory photo of Sanzu Rawal! Happy Birthday Bebo! 🎂✨`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Pixel Heart Art Studio 🎨✨"
      badgeIcon={<Grid3x3 className="w-3.5 h-3.5 text-pink-400" />}
      title={"पिक्सेल हृदय चित्रकला"}
      subtitle={"Paint Pixel Hearts & Reveal Sanzu's Photo"}
      description={"Select a pixel brush color, click or drag across the grid to paint pixel art, and reveal Sanzu's secret memory photo underneath!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* REVEAL METER */}
        <div className="mb-6 p-4 rounded-3xl bg-slate-900 border-2 border-pink-400/50 shadow-xl text-center">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
            <span className="text-gray-300 flex items-center gap-1 font-bold">
              <Eye className="w-4 h-4 text-pink-400" />
              Photo Reveal: <span className="text-pink-300 font-extrabold text-sm">{revealPct}%</span>
            </span>
            <span className="text-amber-300 font-bold">
              {revealPct >= 100 ? '100% Unlocked! 📸👑' : `Paint ${SIZE * SIZE - filledCount} More Pixels`}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/60 border border-white/20 overflow-hidden relative p-0.5">
            <motion.div
              animate={{ width: `${revealPct}%` }}
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            />
          </div>
        </div>

        {/* PHOTO & PRESETS TOOLBAR */}
        <div className="p-4 rounded-3xl bg-white border-2 border-pink-200 shadow-xl mb-6 space-y-4">
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-pink-50 border border-pink-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-pink-400 shadow-sm relative bg-black/20 flex-shrink-0">
                <img
                  src={currentPhoto}
                  alt="Hidden"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Hidden Memory Photo #{photoIdx + 1}</p>
                <p className="text-[11px] text-gray-500">Reveals as you paint pixel tiles!</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Photo</span>
            </button>
          </div>

          {/* Presets */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-purple-500" />
              Magic Preset Art Templates:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="py-2 px-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-900 font-extrabold text-xs border border-purple-200 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>{p.emoji}</span>
                  <span className="truncate">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BRUSH PALETTE */}
        <div className="mb-6 p-4 rounded-3xl bg-slate-900/90 border border-pink-400/40 text-center">
          <p className="text-xs font-bold text-gray-300 mb-2">Select Pixel Brush Color:</p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {HEARTS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => {
                  playPop();
                  setColor(h);
                }}
                className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center cursor-pointer border-2 transition-all ${
                  color === h
                    ? 'border-pink-300 bg-pink-500/40 scale-110 shadow-[0_0_15px_rgba(244,63,94,0.8)]'
                    : 'border-white/10 bg-white/10 hover:bg-white/20'
                }`}
              >
                {h}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClearGrid}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer ml-1"
              title="Clear Canvas"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PIXEL GRID CANVAS WITH UNDERLYING PHOTO */}
        <div className="relative max-w-sm mx-auto aspect-square rounded-3xl p-3 bg-slate-950 border-4 border-pink-400/60 shadow-2xl overflow-hidden select-none mb-6">
          <div className="absolute inset-3 rounded-2xl overflow-hidden z-0">
            <img
              src={currentPhoto}
              alt="Memory Reveal"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain brightness-115 contrast-105 transition-all duration-500"
            />
          </div>

          <div
            onMouseDown={() => setPainting(true)}
            onMouseUp={() => setPainting(false)}
            onMouseLeave={() => setPainting(false)}
            className="relative z-10 w-full h-full grid gap-0.5"
            style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
          >
            {grid.map((cell, i) => (
              <motion.button
                key={i}
                onMouseDown={() => handlePaint(i)}
                onMouseEnter={() => handleMove(i)}
                className={`w-full h-full rounded-xs flex items-center justify-center text-xs cursor-pointer transition-all border ${
                  cell
                    ? 'bg-transparent border-transparent filter drop-shadow opacity-60 hover:opacity-90'
                    : 'bg-slate-950/95 border-slate-800/80 hover:bg-slate-900/90'
                }`}
              >
                {cell || ''}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Pixel Artwork on WhatsApp 💬</span>
        </button>
      </div>
    </WorldShell>
  );
}
