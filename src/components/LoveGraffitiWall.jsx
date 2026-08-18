import WorldShell from './WorldShell';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Palette, Sparkles, Share2, Trash2, Stamp } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SPRAY_COLORS = [
  { name: "Neon Pink", hex: "#f43f5e" },
  { name: "Electric Cyan", hex: "#06b6d4" },
  { name: "Glowing Gold", hex: "#fbbf24" },
  { name: "Vibrant Violet", hex: "#a855f7" },
  { name: "Bright White", hex: "#ffffff" }
];

export default function LoveGraffitiWall() {
  const { triggerHaptic } = useAppStore();
  const canvasRef = useRef(null);

  const [isSpraying, setIsSpraying] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#f43f5e");
  const [sprayRadius, setSprayRadius] = useState(15);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const getCanvasPos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const sprayPaint = (e) => {
    if (!isSpraying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCanvasPos(e);

    // Particle spray effect
    ctx.fillStyle = selectedColor;
    for (let i = 0; i < 25; i++) {
      const offsetR = Math.random() * sprayRadius;
      const angle = Math.random() * Math.PI * 2;
      const px = x + offsetR * Math.cos(angle);
      const py = y + offsetR * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(px, py, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleStartSpray = (e) => {
    setIsSpraying(true);
    playPop();
    triggerHaptic(5);
    sprayPaint(e);
  };

  const handleStopSpray = () => {
    setIsSpraying(false);
  };

  const handleStampStencil = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    playBloom();
    playSparkle();
    triggerHaptic([20, 50]);

    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = selectedColor;
    ctx.shadowColor = selectedColor;
    ctx.shadowBlur = 15;

    const rx = Math.random() * (canvas.width - 150) + 20;
    const ry = Math.random() * (canvas.height - 60) + 40;
    ctx.fillText(text, rx, ry);
    ctx.shadowBlur = 0;

    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const handleClearWall = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playPop();
    triggerHaptic(10);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎨 REAL NEON GRAFFITI WALL 🎨\n\nQueen Sanzu sprayed custom neon love artwork for Abu!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Interactive Spray Can Studio 🎨✨"
      badgeIcon={<Palette className="w-3.5 h-3.5 text-pink-400" />}
      title={"Interactive Graffiti Wall Studio"}
      subtitle={"Real HTML5 Spray Paint & Stencil Studio for Queen Sanzu"}
      description={"Drag mouse or touch screen to spray paint neon graffiti, stamp love stencils, and paint custom artwork!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* GRAFFITI WALL STUDIO CONTAINER */}
        <div className="relative rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl p-4 sm:p-6 space-y-5">
          
          {/* BRICK WALL CANVAS & INTEGRATED PHOTO FRAME */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl border-4 border-stone-700 overflow-hidden shadow-2xl bg-stone-900 touch-none">
            {/* Brick pattern texture background */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(335deg, rgba(0,0,0,0.8) 0%, transparent 100%), repeating-linear-gradient(0deg, #1c1917 0px, #1c1917 25px, #292524 25px, #292524 28px)`
              }}
            />

            {/* ARTIST PHOTO FRAME ON WALL */}
            <div className="absolute top-3 right-3 w-28 h-36 rounded-xl border-2 border-amber-300 shadow-xl overflow-hidden z-10 bg-black">
              <img
                src={currentPhoto}
                alt="Graffiti Artist Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-mono font-bold text-pink-300 py-0.5">
                ARTIST: SANZU 👑
              </div>
            </div>

            {/* DRAWING CANVAS */}
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              onMouseDown={handleStartSpray}
              onMouseMove={sprayPaint}
              onMouseUp={handleStopSpray}
              onMouseLeave={handleStopSpray}
              onTouchStart={handleStartSpray}
              onTouchMove={sprayPaint}
              onTouchEnd={handleStopSpray}
              className="absolute inset-0 w-full h-full cursor-crosshair z-20"
            />
          </div>

          {/* SPRAY CAN PALETTE */}
          <div className="flex items-center justify-between bg-stone-900/90 p-3 rounded-2xl border border-stone-800">
            <span className="text-xs font-bold text-pink-300 font-mono">SPRAY CANS:</span>
            <div className="flex items-center gap-2">
              {SPRAY_COLORS.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setSelectedColor(c.hex)}
                  className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColor === c.hex ? 'scale-125 border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'border-transparent opacity-80'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* STENCIL STAMPS TOOLBAR */}
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {['Abu ❤️ Sanzu', 'Bebo 💕', 'Nepalgunj → Osaka ✈️', 'FOREVER MARRIED 💍'].map((stencil) => (
              <button
                key={stencil}
                type="button"
                onClick={() => handleStampStencil(stencil)}
                className="py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-pink-500/30 text-pink-200 font-extrabold text-[11px] flex items-center gap-1 transition-all cursor-pointer"
              >
                <Stamp className="w-3 h-3 text-pink-400" />
                <span>{stencil}</span>
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleClearWall}
              className="py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Wall</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Graffiti Art</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
