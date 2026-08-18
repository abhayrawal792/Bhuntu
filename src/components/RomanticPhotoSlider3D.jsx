import WorldShell from './WorldShell';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, Sparkles, Share2, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SLIDES = [
  { title: "Pure & Beautiful Moment #1 🌸", sub: "Queen Sanzu's face is Abu's absolute favorite sight!", date: "OCT 2025", reel: "REEL 01" },
  { title: "Pure & Beautiful Moment #2 💍", sub: "Forever marriage promise to build our dream home!", date: "OCT 28", reel: "REEL 02" },
  { title: "Pure & Beautiful Moment #3 ✈️", sub: "Connecting 4,500 miles between Nepalgunj & Osaka!", date: "ALWAYS", reel: "REEL 03" },
];

/** Film sprocket hole strip */
function SprocketStrip({ side = 'left' }) {
  return (
    <div className={`absolute top-0 bottom-0 ${side === 'left' ? 'left-0' : 'right-0'} w-7 flex flex-col justify-around items-center py-2 bg-stone-900 z-10`}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-3.5 h-3 rounded-sm bg-stone-950 border border-stone-700 shadow-inner" />
      ))}
    </div>
  );
}

export default function RomanticPhotoSlider3D() {
  const { triggerHaptic } = useAppStore();
  const [slideIdx, setSlideIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isWinding, setIsWinding] = useState(false);

  const currentSlide = SLIDES[slideIdx % SLIDES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const goTo = (dir) => {
    if (isWinding) return;
    setIsWinding(true);
    setDirection(dir);
    playPop();
    triggerHaptic(15);

    setTimeout(() => {
      const nextSlide = (slideIdx + dir + SLIDES.length) % SLIDES.length;
      setSlideIdx(nextSlide);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      setIsWinding(false);
      if (nextSlide === 1) {
        playBloom();
        playSparkle();
        confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 }, colors: ['#f59e0b', '#f97316', '#fcd34d'] });
      }
    }, 320);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎞️ 3D PHOTO CAROUSEL 🎞️\n\n[${currentSlide.title}]\n"${currentSlide.sub}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0, rotateY: dir > 0 ? 25 : -25, scale: 0.85 }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, rotateY: dir > 0 ? -25 : 25, scale: 0.85 }),
  };

  return (
    <WorldShell
      theme="retro"
      badge="Cinematic Film Carousel 🎞️"
      badgeIcon={<Film className="w-3.5 h-3.5 text-amber-300" />}
      title="3D Photo Carousel"
      subtitle="Queen Sanzu's Memories on Film"
      description="Reel through cinematic memory frames — each slide is a chapter of our love story."
    >
      <div className="max-w-md mx-auto px-2 pb-10 select-none">

        {/* ── Film Reel Counter ─────────────────────────────── */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-mono text-[10px] text-amber-500/80 tracking-widest uppercase">
            {currentSlide.reel}
          </span>
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > slideIdx ? 1 : -1); setSlideIdx(i); setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length)); playPop(); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === slideIdx ? 'bg-amber-400 scale-125' : 'bg-stone-600 hover:bg-stone-500'}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-amber-500/80 tracking-widest uppercase">
            {currentSlide.date}
          </span>
        </div>

        {/* ── Main Film Frame ───────────────────────────────── */}
        <div
          className="relative rounded-lg overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] border-2 border-stone-700"
          style={{ perspective: '900px' }}
        >
          {/* Sprocket holes */}
          <SprocketStrip side="left" />
          <SprocketStrip side="right" />

          {/* Photo area */}
          <div className="mx-7 relative overflow-hidden bg-stone-950" style={{ height: '260px' }}>
            <AnimatePresence custom={direction} mode="popLayout">
              <motion.div
                key={slideIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={currentPhoto}
                  alt="Film frame"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center"
                  style={{ filter: 'sepia(0.15) contrast(1.08) brightness(0.92)' }}
                />

                {/* Film grain overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
                    mixBlendMode: 'overlay',
                    opacity: 0.35,
                  }}
                />

                {/* Vignette */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)' }} />

                {/* Kodak date stamp */}
                <div className="absolute bottom-2 right-3 font-mono text-[11px] font-bold text-amber-400 drop-shadow-lg tracking-wide" style={{ textShadow: '0 0 8px rgba(251,191,36,0.8)' }}>
                  {currentSlide.date}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Film bottom strip with info */}
          <div className="mx-7 bg-stone-900 border-t border-stone-700 px-4 py-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-0.5">
                  {currentSlide.title}
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {currentSlide.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Winding Indicator ─────────────────────────────── */}
        <div className="flex items-center justify-center gap-1 mt-3 mb-4">
          {isWinding && (
            <motion.div
              animate={{ rotate: direction > 0 ? 360 : -360 }}
              transition={{ duration: 0.32, ease: 'linear' }}
              className="text-amber-500 text-xs font-mono"
            >
              ◎
            </motion.div>
          )}
          <span className="text-stone-500 text-[10px] font-mono tracking-widest">
            {isWinding ? 'WINDING...' : 'KODAK ULTRA 400'}
          </span>
        </div>

        {/* ── Controls ──────────────────────────────────────── */}
        <div className="flex items-center justify-between gap-3">
          {/* Prev */}
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goTo(-1)}
            disabled={isWinding}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-amber-300 font-bold text-xs transition-all cursor-pointer disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </motion.button>

          {/* Share */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Frame
          </motion.button>

          {/* Next */}
          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => goTo(1)}
            disabled={isWinding}
            className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs transition-all cursor-pointer disabled:opacity-40 shadow-lg"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </WorldShell>
  );
}
