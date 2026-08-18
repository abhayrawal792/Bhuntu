import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FIREWORKS = [
  { title: "Golden Heart Sparkler 🎆", desc: "Golden sparks forming a huge heart over Osaka." },
  { title: "Pink Sakura Fireworks 🌸", desc: "Cherry blossom pink explosions celebrating Sanzu's birthday." },
  { title: "Nepalgunj Midnight Starburst ✨", desc: "Shining starlight fireworks celebrating 100% eternal love." }
];

export default function LoveFireworkPainter() {
  const { triggerHaptic } = useAppStore();

  const [fireworkIdx, setFireworkIdx] = useState(0);
  const [launched, setLaunched] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFirework = FIREWORKS[fireworkIdx % FIREWORKS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleLaunch = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setLaunched(true);
    confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
  };

  const handleNextFirework = () => {
    playPop();
    triggerHaptic(10);
    setFireworkIdx((prev) => (prev + 1) % FIREWORKS.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    setLaunched(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎆 HEART FIREWORKS PAINTER 🎆\n\nLaunched Firework: "${currentFirework.title}"\n"${currentFirework.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Heart Fireworks Painter 🎆✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
      title={"Heart Fireworks Painter"}
      subtitle={"Launch Fireworks for Queen Sanzu"}
      description={"Tap to launch romantic heart fireworks across the night sky and project secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* FIREWORKS CANVAS & PHOTO DISCOVERY */}
        <div
          onClick={handleLaunch}
          className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center cursor-pointer overflow-hidden"
        >
          {!launched ? (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-amber-900/30 border-2 border-amber-300 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                🎆
              </div>
              <p className="text-xs font-extrabold text-amber-300 font-mono uppercase tracking-wider">
                {currentFirework.title}
              </p>
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-300/40 text-xs font-bold inline-block">
                Tap to Launch Fireworks 🎆
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-3"
            >
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Fireworks Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/60 text-amber-200 text-xs font-bold leading-relaxed">
                "{currentFirework.desc}"
              </div>
            </motion.div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!launched ? (
            <button
              type="button"
              onClick={handleLaunch}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Fireworks</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextFirework}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Fireworks</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Fireworks</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
