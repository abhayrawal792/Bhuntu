import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Box, Sparkles, Share2, RefreshCw, RotateCcw, Heart, Star, Compass } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CUBE_FACES = [
  { face: "Front Face 💎", title: "First Spark ✨", desc: "October 28, 2025: Abu confessed & Queen Sanzu accepted his proposal!", color: "from-cyan-500 to-blue-600" },
  { face: "Right Face ✈️", title: "Nepalgunj-Osaka Bridge 🌉", desc: "4,500 miles between Nepal & Japan, connected by pure love!", color: "from-rose-500 to-pink-600" },
  { face: "Back Face 💍", title: "Everlasting Future 💒", desc: "Marriage, building our dream home, and lifetime togetherness!", color: "from-amber-400 to-yellow-500" },
  { face: "Left Face 🥟", title: "Momo & Panipuri Nights 🥟", desc: "Endless food dates, laughter, and cozy evening memories!", color: "from-orange-400 to-amber-500" },
  { face: "Top Face 👑", title: "Royal Coronation 👑", desc: "Crowning Queen Sanzu ruler of Abu's heart and world!", color: "from-purple-500 to-indigo-600" },
  { face: "Bottom Face 💓", title: "Eternal Pulse 💓", desc: "Pulsing with love every single second, forever and always!", color: "from-red-500 to-rose-600" }
];

export default function LoveMemoryCube3D() {
  const { triggerHaptic } = useAppStore();

  const [cubeIdx, setCubeIdx] = useState(0);
  const [rotation, setRotation] = useState({ x: -15, y: 25 });
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFace = CUBE_FACES[cubeIdx % CUBE_FACES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleRotateCube = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(18);
    setCubeIdx(idx);

    // Rotate angles corresponding to index
    const angles = [
      { x: 0, y: 0 },
      { x: 0, y: -90 },
      { x: 0, y: -180 },
      { x: 0, y: 90 },
      { x: -90, y: 0 },
      { x: 90, y: 0 }
    ];
    setRotation(angles[idx % angles.length]);

    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    confetti({ particleCount: 85, spread: 75, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    triggerHaptic(15);
    const text = `🧊 *3D LOVE MEMORY CUBE* 🧊\n\nActive Side #${cubeIdx + 1}: *[${currentFace.face} - ${currentFace.title}]*\n"${currentFace.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="3D Memory Cube 🧊✨"
      badgeIcon={<Box className="w-3.5 h-3.5 text-cyan-400" />}
      title={"3D Love Memory Cube"}
      subtitle={"Rotate 3D Memory Cube Sides for Queen Sanzu"}
      description={"Rotate interactive 3D memory cube faces to reveal special relationship milestones and unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none font-ui space-y-6">
        {/* 3D Interactive Rotating Cube Container */}
        <div className="py-8 flex items-center justify-center perspective-[1000px]">
          <motion.div
            animate={{ rotateX: rotation.x, rotateY: rotation.y }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-48 h-48 sm:w-56 sm:h-56 relative transform-style-3d cursor-pointer"
          >
            {/* Front Face */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 p-4 text-white border-2 border-white/80 shadow-2xl flex flex-col items-center justify-center translate-z-[96px] sm:translate-z-[112px]">
              <span className="text-3xl">💎</span>
              <h4 className="font-black text-sm mt-2">{CUBE_FACES[0].title}</h4>
            </div>

            {/* Back Face */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-500 p-4 text-white border-2 border-white/80 shadow-2xl flex flex-col items-center justify-center rotate-y-180 translate-z-[96px] sm:translate-z-[112px]">
              <span className="text-3xl">💍</span>
              <h4 className="font-black text-sm mt-2">{CUBE_FACES[2].title}</h4>
            </div>

            {/* Right Face */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500 to-pink-600 p-4 text-white border-2 border-white/80 shadow-2xl flex flex-col items-center justify-center rotate-y-90 translate-z-[96px] sm:translate-z-[112px]">
              <span className="text-3xl">✈️</span>
              <h4 className="font-black text-sm mt-2">{CUBE_FACES[1].title}</h4>
            </div>

            {/* Left Face */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 p-4 text-white border-2 border-white/80 shadow-2xl flex flex-col items-center justify-center -rotate-y-90 translate-z-[96px] sm:translate-z-[112px]">
              <span className="text-3xl">🥟</span>
              <h4 className="font-black text-sm mt-2">{CUBE_FACES[3].title}</h4>
            </div>

            {/* Top Face */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500 to-indigo-600 p-4 text-white border-2 border-white/80 shadow-2xl flex flex-col items-center justify-center rotate-x-90 translate-z-[96px] sm:translate-z-[112px]">
              <span className="text-3xl">👑</span>
              <h4 className="font-black text-sm mt-2">{CUBE_FACES[4].title}</h4>
            </div>

            {/* Bottom Face */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 p-4 text-white border-2 border-white/80 shadow-2xl flex flex-col items-center justify-center -rotate-x-90 translate-z-[96px] sm:translate-z-[112px]">
              <span className="text-3xl">💓</span>
              <h4 className="font-black text-sm mt-2">{CUBE_FACES[5].title}</h4>
            </div>
          </motion.div>
        </div>

        {/* Selected Face Info Card & Photo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cubeIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 rounded-3xl bg-slate-950 border-4 border-cyan-400/80 shadow-2xl text-left space-y-4 max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
              <div>
                <h3 className="font-black text-lg text-white">{currentFace.face}</h3>
                <p className="text-xs text-cyan-300 font-bold">{currentFace.title}</p>
              </div>
              <button
                onClick={handleShareWhatsApp}
                className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 hover:bg-cyan-500/30 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              "{currentFace.desc}"
            </p>

            {/* Photo Keepsake */}
            {currentPhoto && (
              <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-2xl border border-cyan-500/30">
                <img
                  src={currentPhoto.url || currentPhoto}
                  alt="Cube Memory Photo"
                  onError={handlePhotoError}
                  className="w-14 h-14 rounded-xl object-contain border border-cyan-400/50"
                />
                <div>
                  <div className="font-bold text-xs text-cyan-300">{currentPhoto.title || 'Cube Memory'}</div>
                  <div className="text-[11px] text-slate-400">{currentPhoto.caption || 'Special Memory Unlocked'}</div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Face Selectors Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-w-lg mx-auto">
          {CUBE_FACES.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleRotateCube(idx)}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                cubeIdx === idx
                  ? 'bg-cyan-500 text-white border-white shadow-md scale-105'
                  : 'bg-slate-900 text-cyan-200 border-cyan-500/40 hover:border-cyan-400'
              }`}
            >
              Side #{idx + 1}
            </button>
          ))}
        </div>
      </div>
    </WorldShell>
  );
}
