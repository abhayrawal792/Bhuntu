import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Palette, Sparkles, Share2, Trash2, Stamp } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PALETTE = [
  { name: "Rose Red", hex: "#f43f5e" },
  { name: "Sakura Pink", hex: "#ec4899" },
  { name: "Gold", hex: "#fbbf24" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Violet", hex: "#a855f7" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Eraser", hex: "#1e293b" }
];

export default function LovePixelArtCreator() {
  const { triggerHaptic } = useAppStore();

  const [selectedColor, setSelectedColor] = useState('#f43f5e');
  const [grid, setGrid] = useState(
    Array(8).fill(null).map(() => Array(8).fill('#1e293b'))
  );
  const [pixelsPainted, setPixelsPainted] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCellClick = (r, c) => {
    playPop();
    triggerHaptic(5);

    const next = grid.map(row => [...row]);
    next[r][c] = selectedColor;
    setGrid(next);
    setPixelsPainted(p => p + 1);

    if ((pixelsPainted + 1) % 15 === 0) {
      playBloom();
      playSparkle();
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }
  };

  const handlePresetHeart = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60]);

    const heartGrid = [
      ['#1e293b', '#f43f5e', '#f43f5e', '#1e293b', '#1e293b', '#f43f5e', '#f43f5e', '#1e293b'],
      ['#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e'],
      ['#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e'],
      ['#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e'],
      ['#1e293b', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#1e293b'],
      ['#1e293b', '#1e293b', '#f43f5e', '#f43f5e', '#f43f5e', '#f43f5e', '#1e293b', '#1e293b'],
      ['#1e293b', '#1e293b', '#1e293b', '#f43f5e', '#f43f5e', '#1e293b', '#1e293b', '#1e293b'],
      ['#1e293b', '#1e293b', '#1e293b', '#1e293b', '#1e293b', '#1e293b', '#1e293b', '#1e293b']
    ];
    setGrid(heartGrid);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleClearGrid = () => {
    playPop();
    triggerHaptic(10);
    setGrid(Array(8).fill(null).map(() => Array(8).fill('#1e293b')));
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎨 8x8 PIXEL ART STUDIO 🎨\n\nQueen Sanzu created custom 8x8 pixel art!\nTotal Pixels Painted: ${pixelsPainted}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="8x8 Pixel Art Studio 🎨✨"
      badgeIcon={<Palette className="w-3.5 h-3.5 text-pink-400" />}
      title={"8x8 Pixel Art Studio"}
      subtitle={"Paint Retro Pixel Heart Art for Queen Sanzu"}
      description={"Tap grid cells to paint 8x8 retro pixel art, load preset heart stencils, and unlock memory photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* PIXEL STUDIO CABINET */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* COLOR PALETTE TOOLBAR */}
          <div className="flex items-center justify-between bg-stone-900/90 p-3 rounded-2xl border border-stone-800">
            <span className="text-xs font-mono font-bold text-pink-300">COLOR PALETTE:</span>
            <div className="flex items-center gap-1.5">
              {PALETTE.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColor === c.hex ? 'scale-125 border-white shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'border-transparent opacity-80'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* 8x8 INTERACTIVE PIXEL GRID */}
          <div className="grid grid-cols-8 gap-1 max-w-[260px] mx-auto p-3 bg-stone-900 rounded-2xl border-2 border-pink-400/60 shadow-inner">
            {grid.map((row, r) =>
              row.map((color, c) => (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => handleCellClick(r, c)}
                  className="aspect-square rounded-md border border-black/40 transition-transform active:scale-95 cursor-pointer shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))
            )}
          </div>

          {/* ARTIST PHOTO FRAME */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-pink-400/40 space-y-3">
            <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
              <img
                src={currentPhoto}
                alt="Pixel Artist Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
            </div>
            <p className="text-xs font-bold text-pink-300">
              ARTIST: QUEEN SANZU ({pixelsPainted} PIXELS PAINTED!)
            </p>
          </div>

          {/* PRESETS & CLEAR */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handlePresetHeart}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Stamp className="w-4 h-4" />
              <span>Load Pixel Heart 💕</span>
            </button>

            <button
              type="button"
              onClick={handleClearGrid}
              className="py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>

          {/* SHARE */}
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Pixel Artwork</span>
          </button>

        </div>
      </div>
    </WorldShell>
  );
}
