import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Heart, X, Compass, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function ConstellationSky() {
  const { constellations, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.stars;
  const [activeStar, setActiveStar] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handleStarClick = (star) => {
    playSparkle();
    triggerHaptic([40, 60]);
    setActiveStar(star);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-500/40 text-indigo-200 font-bold text-xs mb-3 shadow-md backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Interactive Stargazer 🌌</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-indigo-200 to-rose-300 font-nepali mb-2 drop-shadow-sm">
          {nepaliTitle}
        </h1>
        <h2 className="text-lg sm:text-2xl font-script text-pink-400 mb-3">
          {title}
        </h2>
        <p className="text-indigo-200/80 text-xs sm:text-sm font-ui max-w-lg mx-auto">
          {nepaliSubtitle} — {subtitle}
        </p>
      </div>

      {/* Interactive Stargazing Canvas Container */}
      <div className="relative w-full h-[420px] sm:h-[500px] rounded-3xl bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#1E1B4B] border border-indigo-900 shadow-2xl overflow-hidden flex items-center justify-center">
        {/* Background Twinkling Static Stars */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* SVG Constellation Lines Connecting Stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {constellations.map((star, index) => {
            if (index === 0) return null;
            const prev = constellations[index - 1];
            return (
              <line
                key={`line-${index}`}
                x1={`${prev.x}%`}
                y1={`${prev.y}%`}
                x2={`${star.x}%`}
                y2={`${star.y}%`}
                stroke="rgba(165, 180, 252, 0.3)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Interactive Glowing Constellation Stars */}
        {constellations.map((star) => {
          const isActive = activeStar?.id === star.id;
          return (
            <motion.button
              key={star.id}
              onClick={() => handleStarClick(star)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group focus:outline-none"
              style={{ top: `${star.y}%`, left: `${star.x}%` }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Star Glow Halo */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? 'bg-rose-500/40 ring-4 ring-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.8)]'
                    : 'bg-indigo-500/20 group-hover:bg-pink-500/30 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.6)]'
                }`}
              >
                <Star
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isActive
                      ? 'fill-rose-400 text-rose-300 scale-125 rotate-12'
                      : 'fill-indigo-200 text-indigo-100 group-hover:fill-pink-300 group-hover:text-pink-200'
                  }`}
                />
              </div>

              {/* Star Label */}
              <span className="absolute left-1/2 -translate-x-1/2 top-11 whitespace-nowrap text-[11px] font-bold font-ui px-2 py-0.5 rounded-full bg-slate-900/80 border border-indigo-800 text-indigo-200 opacity-90 group-hover:opacity-100 group-hover:border-pink-500 transition-all">
                {star.name}
              </span>
            </motion.button>
          );
        })}

        {/* Floating Instruction overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-700/50 backdrop-blur-md text-[11px] font-ui text-indigo-300 flex items-center gap-1.5 shadow-lg">
          <Compass className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Tap any glowing star to unveil written fate ✨</span>
        </div>
      </div>

      {/* Modal Popup for Selected Star */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
            onClick={() => setActiveStar(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-pink-300/40 shadow-2xl relative text-center bg-slate-900/90 text-white"
            >
              <button
                onClick={() => setActiveStar(null)}
                className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-rose-500 hover:text-white text-rose-600 font-bold text-xs sm:text-sm font-ui border border-pink-200 shadow-md backdrop-blur-md transition-all cursor-pointer active:scale-95 z-[60]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setActiveStar(null)}
                className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-rose-500 hover:text-white text-rose-600 font-bold text-xs sm:text-sm font-ui border border-pink-200 shadow-md backdrop-blur-md transition-all cursor-pointer active:scale-95 z-[60]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>

              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                <Heart className="w-7 h-7 fill-white text-white" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-nepali text-rose-400 mb-1">
                {activeStar.name}
              </h3>
              <p className="text-xs text-indigo-300 font-ui mb-4 tracking-wide uppercase">
                Constellation Note #{activeStar.id}
              </p>

              <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-800 text-left mb-6 space-y-2">
                <p className="text-gray-100 font-nepali text-sm sm:text-base leading-relaxed">
                  "{activeStar.nepaliNote}"
                </p>
                <p className="text-indigo-300 font-ui text-xs italic">
                  "{activeStar.note}"
                </p>
              </div>

              <button
                onClick={() => setActiveStar(null)}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-lg cursor-pointer hover:opacity-95 transition-opacity font-ui text-sm"
              >
                Close Note ✨
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
