import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Camera,
  Sparkles,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STICKERS = ['💖', '👑', '✨', '🌸', '🎀', '⭐', '🎂'];

export default function PolaroidDesigner() {
  const { triggerHaptic } = useAppStore();

  const [caption, setCaption] = useState('Birthday Queen Sanzu 👑');
  const [stickers, setStickers] = useState(['👑', '💖']);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleAddSticker = (s) => {
    playPop();
    triggerHaptic(10);
    setStickers((prev) => [...prev, s]);
  };

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
  };

  const handleFinish = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📸 RETRO POLAROID PHOTO STUDIO 📸\n\nDesigned a vintage Polaroid frame for Queen Sanzu Rawal!\nCaption: "${caption}"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Polaroid Photo Studio 📸✨"
      badgeIcon={<Camera className="w-3.5 h-3.5 text-rose-400" />}
      title={"पोलारोइड डिजाइनर"}
      subtitle={"Design Retro Polaroid Memory Snapshots"}
      description={"Customize captions, place stickers, and switch between Sanzu's secret memory photo snapshots!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* RETRO POLAROID FRAME */}
        <div className="max-w-xs mx-auto p-5 bg-white rounded-3xl shadow-2xl border-4 border-gray-100 mb-6 flex flex-col items-center relative">
          <div className="w-full aspect-square rounded-2xl border-2 border-gray-200 overflow-hidden relative bg-black/30 shadow-inner">
            <img
              src={currentPhoto}
              alt="Polaroid Snap"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            {stickers.map((s, i) => (
              <span
                key={i}
                className="absolute text-2xl filter drop-shadow-md select-none"
                style={{ top: `${(i * 28) % 70 + 8}%`, left: `${(i * 35) % 70 + 10}%` }}
              >
                {s}
              </span>
            ))}
          </div>

          <p className="text-base font-script text-gray-800 font-bold mt-4 font-nepali">
            {caption || 'Write caption...'}
          </p>

          <span className="text-[10px] font-mono text-gray-400 mt-1">OCTOBER 28, 2025 • PROPOSAL DAY</span>
        </div>

        {/* INPUT & STICKER TOOLBAR */}
        <div className="space-y-4 max-w-sm mx-auto mb-6">
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write caption..."
            maxLength={30}
            className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-pink-200 text-xs font-bold text-gray-800 text-center focus:outline-none focus:border-pink-400 shadow-sm"
          />

          <div className="flex justify-center gap-2">
            {STICKERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleAddSticker(s)}
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-lg flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPhoto}
            className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Random Photo</span>
          </button>

          <button
            type="button"
            onClick={handleFinish}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Save Frame</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
