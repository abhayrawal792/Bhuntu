import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Palette,
  RotateCcw,
  Share2,
  Wand2,
  Eye,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const EMOJI_BRUSHES = ['💖', '🌹', '✨', '🌸', '💕', '🦋', '🌺', '💗', '⭐', '🔥', '💎', '👑', '🎂', '🇳🇵', '🇯🇵'];
const GRID_SIZE = 12;

// Romantic Preset Art Matrices (12x12 = 144 cells)
const PRESETS = [
  {
    name: 'Big Heart 💖',
    emoji: '💖',
    pattern: [
      0,0,1,1,0,0,0,1,1,0,0,0,
      0,1,1,1,1,0,1,1,1,1,0,0,
      1,1,1,1,1,1,1,1,1,1,1,0,
      1,1,1,1,1,1,1,1,1,1,1,0,
      1,1,1,1,1,1,1,1,1,1,1,0,
      0,1,1,1,1,1,1,1,1,1,0,0,
      0,0,1,1,1,1,1,1,1,0,0,0,
      0,0,0,1,1,1,1,1,0,0,0,0,
      0,0,0,0,1,1,1,0,0,0,0,0,
      0,0,0,0,0,1,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
    ]
  },
  {
    name: 'Queen Crown 👑',
    emoji: '👑',
    pattern: [
      1,0,0,0,1,0,0,1,0,0,0,1,
      1,1,0,0,1,1,1,1,0,0,1,1,
      1,1,1,0,1,1,1,1,0,1,1,1,
      1,1,1,1,1,1,1,1,1,1,1,1,
      0,1,1,1,1,1,1,1,1,1,1,0,
      0,0,1,1,1,1,1,1,1,1,0,0,
      0,0,1,1,1,1,1,1,1,1,0,0,
      0,0,0,1,1,1,1,1,1,0,0,0,
      0,0,0,0,1,1,1,1,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
    ]
  },
  {
    name: 'Birthday Cake 🎂',
    emoji: '🎂',
    pattern: [
      0,0,0,0,0,1,1,0,0,0,0,0,
      0,0,0,0,1,1,1,1,0,0,0,0,
      0,0,0,0,0,1,1,0,0,0,0,0,
      0,0,0,1,1,1,1,1,1,0,0,0,
      0,0,0,1,1,1,1,1,1,0,0,0,
      0,0,1,1,1,1,1,1,1,1,0,0,
      0,0,1,1,1,1,1,1,1,1,0,0,
      0,1,1,1,1,1,1,1,1,1,1,0,
      0,1,1,1,1,1,1,1,1,1,1,0,
      1,1,1,1,1,1,1,1,1,1,1,1,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
    ]
  }
];

export default function EmojiArtCanvas() {
  const { triggerHaptic } = useAppStore();

  const [selectedBrush, setSelectedBrush] = useState('💖');
  const [grid, setGrid] = useState(Array(GRID_SIZE * GRID_SIZE).fill(''));
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isAutoTransitioning, setIsAutoTransitioning] = useState(false);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const filledCount = grid.filter(Boolean).length;
  const revealPct = Math.round((filledCount / (GRID_SIZE * GRID_SIZE)) * 100);

  const handleShufflePhoto = () => {
    playPop();
    triggerHaptic(10);
    let rand = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (rand === photoIdx) rand = (rand + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(rand);
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill(''));
  };

  const triggerNextRandomPhoto = () => {
    if (isAutoTransitioning) return;
    setIsAutoTransitioning(true);
    playBloom();
    playSparkle();
    triggerHaptic([50, 100, 150, 200]);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });

    // Automatically switch to a random photo after 1.8s celebration
    setTimeout(() => {
      let rand = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      if (rand === photoIdx) rand = (rand + 1) % BHUNTU_PHOTOS.length;
      setPhotoIdx(rand);
      setGrid(Array(GRID_SIZE * GRID_SIZE).fill(''));
      setIsAutoTransitioning(false);
    }, 1800);
  };

  const handlePaintTile = (index) => {
    if (grid[index] === selectedBrush || isAutoTransitioning) return;
    const nextGrid = [...grid];
    nextGrid[index] = selectedBrush;
    setGrid(nextGrid);
    triggerHaptic(5);

    const count = nextGrid.filter(Boolean).length;
    if (count >= 144) {
      triggerNextRandomPhoto();
    } else if (count % 25 === 0 && count > 0) {
      playSparkle();
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  const handleApplyPreset = (preset) => {
    if (isAutoTransitioning) return;
    playSparkle();
    playBloom();
    triggerHaptic([30, 60, 90]);

    const newGrid = preset.pattern.map((val) => (val === 1 ? preset.emoji : ''));
    setGrid(newGrid);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });

    const count = newGrid.filter(Boolean).length;
    if (count >= 144) {
      triggerNextRandomPhoto();
    }
  };

  const handleClearGrid = () => {
    playPop();
    triggerHaptic(10);
    setGrid(Array(GRID_SIZE * GRID_SIZE).fill(''));
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎨 EMOJI LOVE ART CANVAS 💖\n\nI painted a romantic emoji artwork with ${filledCount} tiles and revealed a memory photo of Sanzu Rawal! Happy Birthday Bebo! 🎂✨`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Emoji Photo Mosaic Art Studio 🎨💖"
      badgeIcon={<Palette className="w-3.5 h-3.5 text-pink-500" />}
      title={"Emoji Art Canvas"}
      subtitle={"Paint with Emojis to Reveal Secret Photo of Sanzu!"}
      description={"Paint emoji tiles to reveal Sanzu's hidden memory photo underneath. When 100% complete, it automatically switches to a new random photo surprise! 🎲📸"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* TOP STATUS BAR & REVEAL METER */}
        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950 border-2 border-pink-400/40 shadow-xl text-center">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
            <span className="text-gray-300 flex items-center gap-1 font-bold">
              <Eye className="w-4 h-4 text-pink-400" />
              Photo Reveal: <span className="text-pink-300 font-extrabold text-sm">{revealPct}%</span>
            </span>
            <span className="text-amber-300 font-bold">
              {isAutoTransitioning ? '✨ 100% Complete! Next Photo Loading...' : `Paint ${144 - filledCount} More Tiles`}
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/60 border border-white/20 overflow-hidden relative p-0.5">
            <motion.div
              animate={{ width: `${revealPct}%` }}
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            />
          </div>
        </div>

        {/* PHOTO INFO & PRESET SELECTION TOOLBAR */}
        <div className="mb-6 p-4 rounded-3xl bg-white border-2 border-pink-200 shadow-xl space-y-4">
          {/* Photo Underneath Info (Mystery Icon - No photo spoiled!) */}
          <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-pink-50 border border-pink-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-400 to-rose-500 text-white font-bold text-2xl flex items-center justify-center border-2 border-pink-300 shadow-sm flex-shrink-0">
                🎁
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800 flex items-center gap-1">
                  <span>Secret Mystery Photo #{photoIdx + 1}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                </p>
                <p className="text-[11px] text-pink-600 font-bold">
                  Paint emoji tiles below to reveal the secret photo! 🎲
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShufflePhoto}
              className="px-3.5 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-extrabold shadow-md transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Shuffle Photo</span>
            </button>
          </div>

          {/* Preset Magic Templates */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5 text-purple-500" />
              Magic Preset Art Templates:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="py-2 px-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-900 font-extrabold text-xs border border-purple-200 shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>{p.emoji}</span>
                  <span className="truncate">{p.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* EMOJI BRUSH PICKER */}
        <div className="mb-6 p-4 rounded-3xl bg-indigo-950/70 backdrop-blur-md border border-indigo-400/30 text-center">
          <p className="text-xs font-bold text-gray-300 mb-3">Select Emoji Brush:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {EMOJI_BRUSHES.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  playPop();
                  setSelectedBrush(emoji);
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl text-xl sm:text-2xl flex items-center justify-center cursor-pointer border-2 transition-all ${
                  selectedBrush === emoji
                    ? 'border-pink-300 bg-pink-500/40 scale-125 shadow-[0_0_15px_rgba(244,63,94,0.8)]'
                    : 'border-white/10 bg-white/10 hover:bg-white/20'
                }`}
              >
                {emoji}
              </button>
            ))}

            <button
              type="button"
              onClick={handleClearGrid}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer ml-1"
              title="Clear Canvas"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MAIN EMOJI MOSAIC GRID CANVAS WITH HIDDEN PHOTO UNDERNEATH */}
        <div className="relative max-w-sm sm:max-w-md mx-auto aspect-square rounded-3xl p-3 bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950 border-4 border-pink-400/60 shadow-2xl overflow-hidden select-none mb-6">
          {/* UNDERLYING MEMORY PHOTO REVEAL LAYER */}
          <div className="absolute inset-3 rounded-2xl overflow-hidden z-0">
            <img
              src={currentPhoto}
              alt="Memory Reveal"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover brightness-115 contrast-105 transition-all duration-500"
            />
          </div>

          {/* EMOJI TILE GRID OVERLAY */}
          <div
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            onMouseLeave={() => setIsMouseDown(false)}
            className="relative z-10 w-full h-full grid gap-0.5"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
          >
            {grid.map((cell, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.8 }}
                onMouseEnter={() => {
                  if (isMouseDown) handlePaintTile(idx);
                }}
                onClick={() => handlePaintTile(idx)}
                className={`w-full h-full rounded-sm flex items-center justify-center text-xs sm:text-base cursor-pointer transition-all border ${
                  cell
                    ? 'bg-transparent border-transparent filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] opacity-55 hover:opacity-90'
                    : 'bg-slate-950/95 border-slate-800/80 hover:bg-slate-900/90'
                }`}
              >
                {cell || ''}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Emoji Artwork on WhatsApp 💬</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
