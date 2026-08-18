import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Sparkles, Share2, RefreshCw, Eye } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SHAPES = [
  {
    name: "Golden Heart Shape 💕",
    stars: [{ x: 30, y: 25 }, { x: 50, y: 15 }, { x: 70, y: 25 }, { x: 80, y: 45 }, { x: 50, y: 80 }, { x: 20, y: 45 }],
    desc: "Connected stars forming Abu's eternal heart!"
  },
  {
    name: "Royal Crown Shape 👑",
    stars: [{ x: 20, y: 70 }, { x: 20, y: 30 }, { x: 35, y: 50 }, { x: 50, y: 20 }, { x: 65, y: 50 }, { x: 80, y: 30 }, { x: 80, y: 70 }],
    desc: "Stars crowning Queen Sanzu in deep space!"
  },
  {
    name: "Marriage Ring Shape 💍",
    stars: [{ x: 50, y: 20 }, { x: 75, y: 45 }, { x: 65, y: 75 }, { x: 35, y: 75 }, { x: 25, y: 45 }],
    desc: "Sacred proposal vow ring written in starlight!"
  }
];

export default function LoveConstellationMaker() {
  const { triggerHaptic } = useAppStore();

  const [shapeIdx, setShapeIdx] = useState(0);
  const [clickedStars, setClickedStars] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentShape = SHAPES[shapeIdx % SHAPES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleStarClick = (idx) => {
    if (clickedStars.includes(idx)) return;

    playPop();
    triggerHaptic(10);
    const next = [...clickedStars, idx];
    setClickedStars(next);

    if (next.length === currentShape.stars.length) {
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setIsCompleted(true);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 95, spread: 85, origin: { y: 0.5 } });
    }
  };

  const handleSelectShape = (idx) => {
    playPop();
    triggerHaptic(10);
    setShapeIdx(idx);
    setClickedStars([]);
    setIsCompleted(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `✨ TELESCOPE CONSTELLATION DRAWING STUDIO ✨\n\nCompleted Shape: [${currentShape.name}]\n"${currentShape.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Telescope Stargazer ✨🌌"
      badgeIcon={<Eye className="w-3.5 h-3.5 text-purple-300" />}
      title={"Telescope Constellation Studio"}
      subtitle={"Draw Custom Star Shapes Through the Telescope Lens"}
      description={"Look through the telescope lens, click stars in order to draw glowing constellation shapes, and unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* TELESCOPE LENS CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-[0_0_50px_rgba(168,85,247,0.3)] p-5 sm:p-6 space-y-6">
          
          {/* TELESCOPE LENS CANVAS */}
          <div className="relative w-72 h-72 rounded-full border-4 border-amber-400/80 mx-auto bg-gradient-to-b from-purple-950/60 via-slate-950 to-stone-950 p-4 shadow-2xl overflow-hidden flex items-center justify-center">
            {/* SVG CONNECTING LASER LINES */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {clickedStars.map((sIdx, i) => {
                if (i === 0) return null;
                const p1 = currentShape.stars[clickedStars[i - 1]];
                const p2 = currentShape.stars[sIdx];
                return (
                  <line
                    key={i}
                    x1={`${p1.x}%`}
                    y1={`${p1.y}%`}
                    x2={`${p2.x}%`}
                    y2={`${p2.y}%`}
                    stroke="#fbbf24"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>

            {/* CLICKABLE STARS IN SHAPE */}
            {currentShape.stars.map((star, i) => {
              const isClicked = clickedStars.includes(i);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStarClick(i)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full cursor-pointer transition-all z-20 ${
                    isClicked
                      ? 'bg-amber-400 text-stone-950 scale-125 shadow-[0_0_15px_#fbbf24]'
                      : 'bg-purple-950/80 text-purple-300 border border-purple-400 hover:scale-110'
                  }`}
                  style={{ left: `${star.x}%`, top: `${star.y}%` }}
                >
                  <Star className={`w-3.5 h-3.5 ${isClicked ? 'fill-stone-950' : ''}`} />
                </button>
              );
            })}

            {/* TELESCOPE CROSSHAIR WATERMARK */}
            <div className="absolute inset-0 border border-purple-400/20 rounded-full pointer-events-none flex items-center justify-center">
              <div className="w-full h-px bg-purple-400/20" />
              <div className="h-full w-px bg-purple-400/20 absolute" />
            </div>
          </div>

          {/* COMPLETED PHOTO CARD REVEAL */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-purple-950/60 border border-purple-400/60 space-y-3"
              >
                <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Constellation Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                </div>
                <p className="text-xs font-bold text-amber-200">
                  ✨ CONSTELLATION "{currentShape.name}" COMPLETED! ✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CONSTELLATION SHAPE SELECTOR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {SHAPES.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectShape(idx)}
                className={`p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer ${
                  shapeIdx === idx
                    ? 'bg-purple-600 text-white border-purple-400 shadow-md scale-105'
                    : 'bg-stone-900 text-purple-200 border-purple-500/30 hover:border-purple-400'
                }`}
              >
                ✨ Shape #{idx + 1}
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Constellation</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
