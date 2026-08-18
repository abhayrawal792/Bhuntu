import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Share2,
  RefreshCw,
  Eye,
  Zap
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const COLOR_MODES = [
  { name: 'Nebula Pink 🌸', gradient: 'from-pink-500/40 via-purple-600/30 to-indigo-950', glow: 'rgba(244,114,182,0.8)' },
  { name: 'Cosmic Gold 👑', gradient: 'from-amber-400/40 via-yellow-500/30 to-slate-950', glow: 'rgba(251,191,36,0.8)' },
  { name: 'Starlight Aqua 🌌', gradient: 'from-cyan-400/40 via-blue-600/30 to-slate-950', glow: 'rgba(56,189,248,0.8)' },
  { name: 'Deep Aurora 🍃', gradient: 'from-emerald-400/40 via-teal-600/30 to-slate-950', glow: 'rgba(52,211,153,0.8)' }
];

export default function StarProjector() {
  const { triggerHaptic } = useAppStore();

  const [colorIdx, setColorIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [isProjecting, setIsProjecting] = useState(true);

  const currentMode = COLOR_MODES[colorIdx];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌌 COSMIC STAR PROJECTOR 🌌\n\nI projected Sanzu's photo across the galaxy with ${currentMode.name}! Happy Birthday Queen Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Cosmic Star Projector 🌌✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
      title={"तारा प्रक्षेपयन्त्र"}
      subtitle={"Project Sanzu's Photo Across Deep Space"}
      description={"Select a cosmic aurora color mode to project Sanzu's photo and starlight constellations onto the galaxy ceiling!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* COLOR MODE SELECTOR */}
        <div className="p-4 rounded-3xl bg-white border-2 border-purple-200 shadow-xl mb-6 space-y-3">
          <p className="text-xs font-bold text-gray-700">Select Galaxy Projection Mode:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {COLOR_MODES.map((mode, idx) => (
              <button
                key={mode.name}
                type="button"
                onClick={() => {
                  playPop();
                  setColorIdx(idx);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition-all border cursor-pointer ${
                  colorIdx === idx
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                }`}
              >
                <span>{mode.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* GALAXY CEILING PROJECTION STAGE */}
        <div className="relative max-w-sm sm:max-w-md mx-auto aspect-square rounded-3xl p-4 bg-slate-950 border-4 border-purple-400/60 shadow-2xl overflow-hidden mb-6">
          {/* Animated Nebula Aura */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentMode.gradient} pointer-events-none transition-all duration-700`}
          />

          {/* Floating Stars */}
          <div className="absolute top-6 left-8 text-2xl text-amber-200 opacity-80 animate-pulse">⭐</div>
          <div className="absolute top-16 right-10 text-xl text-pink-300 opacity-60 animate-pulse">✨</div>
          <div className="absolute bottom-10 left-12 text-2xl text-cyan-300 opacity-70 animate-pulse">🌟</div>

          {/* Projector Glass Core Photo */}
          <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border-2 border-white/50 shadow-2xl bg-black/40 flex items-center justify-center">
            <img
              src={currentPhoto}
              alt="Star Projection"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105 transition-all duration-500"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono text-amber-200 text-center border border-white/20 font-bold">
              Galaxy Starlight Projection 🌌📸
            </div>
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
            <span>Random Next Photo</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Galaxy</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
