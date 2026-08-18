import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Snowflake,
  Heart,
  Sparkles,
  Share2,
  RefreshCw
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function SnowGlobeShaker() {
  const { triggerHaptic } = useAppStore();

  const [shakes, setShakes] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [particles, setParticles] = useState([]);
  const [isShaking, setIsShaking] = useState(false);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextRandomPhoto = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
  };

  const handleShake = () => {
    if (isShaking) return;
    setIsShaking(true);
    playPop();
    triggerHaptic([30, 60, 30, 60, 100]);

    const newShakes = shakes + 1;
    setShakes(newShakes);

    const newP = Array.from({ length: 25 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 85 + 5,
      y: Math.random() * 25 + 5,
      size: Math.random() * 12 + 10,
      speed: Math.random() * 3 + 2,
      emoji: ['❄️', '⭐', '✨', '💕', '🌸', '💖'][Math.floor(Math.random() * 6)]
    }));

    setParticles((prev) => [...prev.slice(-30), ...newP]);

    // Random new photo on every 3 shakes
    if (newShakes % 3 === 0) {
      playBloom();
      playSparkle();
      let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
      setPhotoIdx(next);
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    }

    setTimeout(() => setIsShaking(false), 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, y: p.y + p.speed }))
          .filter((p) => p.y < 90)
      );
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔮 SANZU & ABU SNOW GLOBE 🔮\n\nI shook the love snow globe ${shakes} times and revealed Sanzu's portrait! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Snow Globe Shaker 🔮✨"
      badgeIcon={<Snowflake className="w-3.5 h-3.5 text-sky-400" />}
      title={"मायाको हिउँको गोला"}
      subtitle={"Shake Globe to Trigger Floating Sakura Snow & Photo Changes"}
      description={"Tap or shake the globe to float romantic snowflakes around Sanzu's portrait photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* GLOBE DISPLAY */}
        <div className="relative max-w-xs mx-auto mb-10 cursor-pointer" onClick={handleShake}>
          <motion.div
            animate={isShaking ? { rotate: [-8, 8, -6, 6, -3, 3, 0], y: [-6, 6, -4, 4, 0] } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glass Globe Outer Ring */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-full bg-gradient-to-br from-sky-400/30 via-purple-500/20 to-indigo-900/40 border-4 border-sky-300/70 shadow-[0_0_50px_rgba(56,189,248,0.4)] overflow-hidden flex items-center justify-center">
              {/* Photo Centerpiece */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white/60 shadow-2xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Globe Memory"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105 transition-all duration-300"
                />
              </div>

              {/* Falling Snowflakes & Sakura Particles */}
              {particles.map((p) => (
                <span
                  key={p.id}
                  className="absolute pointer-events-none transition-all duration-100"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: `${p.size}px` }}
                >
                  {p.emoji}
                </span>
              ))}

              {/* Glass Reflection Highlight */}
              <div className="absolute top-6 left-10 w-16 h-6 bg-white/40 rounded-full rotate-[-35deg] pointer-events-none" />
            </div>

            {/* Brass Base */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-48 h-12 rounded-b-3xl bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-2 border-amber-500 shadow-2xl flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 text-pink-300 fill-pink-300 animate-pulse" />
              <span className="text-xs font-extrabold font-nepali text-amber-200">
                Sanzu & Abu Forever
              </span>
            </div>
          </motion.div>
        </div>

        {/* TOOLBAR */}
        <div className="p-4 rounded-3xl bg-white border-2 border-sky-200 shadow-xl max-w-md mx-auto space-y-3">
          <p className="text-xs font-bold text-gray-700">
            Total Shakes: <span className="text-sky-600 font-extrabold text-sm">{shakes}</span>
          </p>

          <p className="text-xs text-gray-500">
            Every 3 shakes unlocks a new random secret photo inside the snow globe! ❄️✨
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleShake}
              className="flex-1 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Shake Globe Now</span>
            </button>

            <button
              type="button"
              onClick={handleNextRandomPhoto}
              className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Random Photo</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </WorldShell>
  );
}
