import WorldShell from './WorldShell';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Sparkles, Share2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MEMORIES = [
  { id: 1, text: "First video call with Queen Sanzu 📱", x: 22, y: 28, label: "FIRST CALL" },
  { id: 2, text: "Proposal accepted on October 28 💍", x: 72, y: 42, label: "PROPOSAL" },
  { id: 3, text: "Late night talks connecting Nepalgunj & Osaka 🌙", x: 48, y: 70, label: "MIDNIGHT" },
  { id: 4, text: "Sharing dreams of our future home 🏠", x: 80, y: 20, label: "DREAMS" },
  { id: 5, text: "Every 'good morning' across 4,500 miles ✈️", x: 18, y: 62, label: "MORNINGS" },
];

// Constellation lines connecting certain stars (pairs of memory ids)
const LINES = [[0,1],[1,2],[2,4],[0,4],[1,3]];

// SVG background stars (decorative, non-interactive)
const BG_STARS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  cx: (i * 37 + 11) % 100,
  cy: (i * 53 + 7) % 100,
  r: i % 5 === 0 ? 0.6 : 0.35,
  opacity: 0.15 + (i % 4) * 0.07,
  duration: 2 + (i % 4),
  delay: (i * 0.15) % 3,
}));

export default function MemoryConstellationMap() {
  const { triggerHaptic } = useAppStore();

  const [activeStar, setActiveStar] = useState(null);
  const [revealedStars, setRevealedStars] = useState(new Set());
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [drawLines, setDrawLines] = useState([]);

  const currentMemory = activeStar !== null ? MEMORIES[activeStar] : null;
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const allRevealed = revealedStars.size === MEMORIES.length;

  const handleStarClick = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setActiveStar(idx);

    const next = new Set(revealedStars);
    next.add(idx);
    setRevealedStars(next);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    // Reveal constellation lines that connect to this star
    const newLines = LINES.filter(([a, b]) => next.has(a) && next.has(b)).map(l => l.join('-'));
    setDrawLines(newLines);

    confetti({ particleCount: 45, spread: 55, origin: { y: 0.4 }, colors: ['#818cf8', '#c084fc', '#e879f9', '#ffffff'] });

    if (next.size === MEMORIES.length) {
      setTimeout(() => {
        playBloom();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ['#818cf8', '#c084fc', '#fbbf24'] });
      }, 400);
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `⭐ MEMORY CONSTELLATION MAP ⭐\n\nStar Memory: "${currentMemory?.text || 'Our love story written in stars'}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Memory Constellation Map ⭐✨"
      badgeIcon={<Star className="w-3.5 h-3.5 text-purple-300" />}
      title="Memory Constellation Map"
      subtitle="Abu & Sanzu's Memories Written in Stars"
      description="Tap each star to reveal a memory and draw the constellation of your love."
    >
      <div className="max-w-md mx-auto pb-10 select-none">

        {/* ── SVG Star Map Canvas ───────────────────────────── */}
        <div
          className="relative rounded-3xl overflow-hidden border border-indigo-700/60 shadow-[0_0_60px_rgba(99,102,241,0.2)]"
          style={{ background: 'radial-gradient(ellipse at 30% 30%, #1e1b4b 0%, #0f0a2e 60%, #020617 100%)', paddingBottom: '75%' }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background decorative stars */}
            {BG_STARS.map(s => (
              <motion.circle
                key={s.id}
                cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r}
                fill="white"
                initial={{ opacity: s.opacity }}
                animate={{ opacity: [s.opacity, s.opacity * 3.5, s.opacity] }}
                transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
              />
            ))}

            {/* Constellation lines — draw with stroke-dashoffset animation */}
            {LINES.map(([a, b]) => {
              const key = `${a}-${b}`;
              const isVisible = drawLines.includes(key);
              const from = MEMORIES[a];
              const to = MEMORIES[b];
              const len = Math.hypot((to.x - from.x), (to.y - from.y));
              return (
                <motion.line
                  key={key}
                  x1={`${from.x}%`} y1={`${from.y}%`}
                  x2={`${to.x}%`} y2={`${to.y}%`}
                  stroke="#818cf8"
                  strokeWidth="0.4"
                  strokeDasharray={len}
                  strokeDashoffset={isVisible ? 0 : len}
                  strokeOpacity={isVisible ? 0.55 : 0}
                  animate={{ strokeDashoffset: isVisible ? 0 : len, strokeOpacity: isVisible ? 0.55 : 0 }}
                  transition={{ duration: 0.9, ease: 'easeInOut' }}
                />
              );
            })}

            {/* Interactive memory stars */}
            {MEMORIES.map((m, idx) => {
              const isRevealed = revealedStars.has(idx);
              const isActive = activeStar === idx;
              return (
                <g key={m.id} style={{ cursor: 'pointer' }} onClick={() => handleStarClick(idx)}>
                  {/* Glow ring when active */}
                  {isActive && (
                    <motion.circle
                      cx={`${m.x}%`} cy={`${m.y}%`} r={5}
                      fill="none" stroke="#c084fc" strokeWidth="0.5"
                      initial={{ opacity: 0, r: 2 }}
                      animate={{ opacity: [0.6, 0, 0.6], r: [3, 6, 3] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  {/* Star shape */}
                  <motion.circle
                    cx={`${m.x}%`} cy={`${m.y}%`}
                    r={isRevealed ? 2.2 : 1.6}
                    fill={isRevealed ? (isActive ? '#e879f9' : '#818cf8') : '#334155'}
                    stroke={isRevealed ? '#c084fc' : '#475569'}
                    strokeWidth="0.4"
                    animate={{
                      r: isActive ? [2.2, 2.8, 2.2] : (isRevealed ? 2.2 : 1.6),
                      fill: isRevealed ? (isActive ? '#e879f9' : '#818cf8') : '#334155',
                    }}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
                  />
                  {/* Star label */}
                  {isRevealed && (
                    <motion.text
                      x={`${m.x}%`} y={`${m.y + 5.5}%`}
                      textAnchor="middle"
                      fill="#a5b4fc"
                      fontSize="2.8"
                      fontWeight="bold"
                      fontFamily="monospace"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.85 }}
                      transition={{ delay: 0.3 }}
                    >
                      {m.label}
                    </motion.text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Tap hint overlay (only until first star tapped) */}
          {revealedStars.size === 0 && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-indigo-300 text-xs font-semibold tracking-widest uppercase">Tap a star ✦</span>
            </motion.div>
          )}

          {/* All-revealed celebration */}
          {allRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none"
            >
              <span className="bg-purple-900/80 border border-purple-400/40 text-purple-200 text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                ✦ Constellation Complete ✦
              </span>
            </motion.div>
          )}
        </div>

        {/* ── Memory Card ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {currentMemory ? (
            <motion.div
              key={activeStar}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-4 rounded-2xl border border-indigo-700/50 overflow-hidden"
              style={{ background: 'rgba(15,10,46,0.85)' }}
            >
              {/* Photo strip */}
              <div className="relative h-28 overflow-hidden">
                <img
                  src={currentPhoto}
                  alt="Memory photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center"
                  style={{ filter: 'brightness(0.75) saturate(1.2)' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,10,46,0.7) 0%, transparent 40%, transparent 60%, rgba(15,10,46,0.7) 100%)' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-indigo-900/70 border border-purple-400/40 text-purple-200 text-[10px] font-mono font-bold px-3 py-1 rounded-lg backdrop-blur-sm">
                    ⭐ STAR {activeStar + 1} — {currentMemory.label}
                  </span>
                </div>
              </div>
              {/* Memory text */}
              <div className="px-4 py-3 flex items-start justify-between gap-3">
                <p className="text-sm text-indigo-100 font-semibold leading-relaxed flex-1">
                  "{currentMemory.text}"
                </p>
                <button
                  onClick={handleShareWhatsApp}
                  className="flex-shrink-0 p-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white cursor-pointer transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Progress */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full bg-indigo-950 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-400"
              animate={{ width: `${(revealedStars.size / MEMORIES.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[10px] font-mono text-indigo-400">{revealedStars.size}/{MEMORIES.length}</span>
        </div>
      </div>
    </WorldShell>
  );
}
