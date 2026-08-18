import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cookie, Share2, RotateCcw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const COOKIES = [
  { id: 1, fortune: "Queen Sanzu holds the crown of everlasting happiness in Abu's heart! 💕", luckyNumbers: "10 · 28 · 99 · 100", emoji: '🥠', color: '#f59e0b' },
  { id: 2, fortune: "4,500 miles between Nepalgunj & Osaka disappear when you smile! ✈️", luckyNumbers: "05 · 14 · 25 · 88", emoji: '🥠', color: '#f97316' },
  { id: 3, fortune: "Infinite dates of panipuri & steamed momos await in our dream home! 🥟", luckyNumbers: "07 · 11 · 21 · 77", emoji: '🥠', color: '#eab308' },
  { id: 4, fortune: "Sacred proposal vow sealed on October 28, 2025 will bloom forever! 💍", luckyNumbers: "10 · 28 · 20 · 25", emoji: '🥠', color: '#ef4444' },
];

// Floating bob animation config per cookie position inside jar
const FLOAT_CONFIGS = [
  { y: [0, -8, 0], duration: 3.2, delay: 0, x: -28 },
  { y: [0, -6, 2, 0], duration: 2.8, delay: 0.6, x: 8 },
  { y: [2, -7, 0], duration: 3.6, delay: 1.1, x: -10 },
  { y: [0, -5, 3, 0], duration: 2.4, delay: 0.3, x: 26 },
];

function CrackParticles({ x, y }) {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    angle: (i / 10) * 360,
    dist: 20 + Math.random() * 25,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 30 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-400"
          style={{ left: '50%', top: '50%' }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
            y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
            scale: 0,
          }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export default function LoveFortuneCookieJar() {
  const { triggerHaptic } = useAppStore();

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [cracked, setCracked] = useState(false);
  const [showCrack, setShowCrack] = useState(false);
  const [paperUnrolled, setPaperUnrolled] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const selectedCookie = selectedIdx !== null ? COOKIES[selectedIdx] : null;
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePickCookie = (idx) => {
    if (cracked) return;
    playPop();
    triggerHaptic([20, 50]);
    setSelectedIdx(idx);
    setPaperUnrolled(false);
  };

  const handleCrackCookie = () => {
    if (selectedIdx === null || cracked) return;
    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120]);
    setShowCrack(true);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    setTimeout(() => {
      setCracked(true);
      setShowCrack(false);
      setTimeout(() => setPaperUnrolled(true), 200);
    }, 500);

    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 }, colors: ['#f59e0b', '#f97316', '#fcd34d', '#ef4444'] });
  };

  const handleReset = () => {
    playPop();
    setSelectedIdx(null);
    setCracked(false);
    setShowCrack(false);
    setPaperUnrolled(false);
  };

  const handleShare = () => {
    playSparkle();
    if (!selectedCookie) return;
    const text = `🥠 LOVE FORTUNE COOKIE JAR 🥠\n\nFortune: "${selectedCookie.fortune}"\nLucky Numbers: ${selectedCookie.luckyNumbers}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Glass Fortune Jar 🥠✨"
      badgeIcon={<Cookie className="w-3.5 h-3.5 text-amber-400" />}
      title="Love Fortune Cookie Jar"
      subtitle="Pick a cookie, crack it, read your fortune"
      description="Reach inside the glass jar, pick a golden fortune cookie, and crack it open!"
    >
      <div className="max-w-sm mx-auto pb-10 select-none">

        {/* ── Glass Jar ──────────────────────────────────────── */}
        <div className="relative mx-auto" style={{ width: '220px' }}>
          {/* Jar lid */}
          <div className="relative mx-4 h-5 rounded-t-xl" style={{ background: 'linear-gradient(180deg, #b45309 0%, #78350f 100%)', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            <div className="absolute inset-x-2 top-1 h-1 rounded-full bg-amber-600/40" />
          </div>

          {/* Jar body */}
          <div
            className="relative rounded-b-[3rem] overflow-hidden border-2 border-amber-300/30"
            style={{
              height: '200px',
              background: 'linear-gradient(135deg, rgba(251,191,36,0.18) 0%, rgba(245,158,11,0.08) 40%, rgba(251,191,36,0.15) 100%)',
              boxShadow: 'inset 4px 0 16px rgba(255,255,255,0.08), inset -4px 0 16px rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(2px)',
            }}
          >
            {/* Glass highlight stripe */}
            <div className="absolute left-3 top-4 bottom-8 w-4 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)' }} />

            {/* "JAR OF LOVE FORTUNES" label */}
            <div className="absolute top-3 inset-x-0 flex justify-center">
              <span className="text-[8px] font-mono font-bold text-amber-700/70 tracking-widest uppercase">Fortune Jar</span>
            </div>

            {/* Floating cookies inside jar */}
            <div className="absolute inset-0 flex items-center justify-around px-3 pt-6">
              {COOKIES.map((cookie, idx) => {
                const fc = FLOAT_CONFIGS[idx];
                const isSelected = selectedIdx === idx;
                return (
                  <motion.button
                    key={cookie.id}
                    onClick={() => handlePickCookie(idx)}
                    disabled={cracked}
                    animate={{ y: fc.y }}
                    transition={{ duration: fc.duration, delay: fc.delay, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: isSelected ? 1.2 : 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.88 }}
                    className={`relative text-3xl cursor-pointer rounded-2xl p-1 transition-all ${
                      isSelected
                        ? 'bg-amber-400/40 border-2 border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.6)] scale-110'
                        : 'opacity-80 hover:opacity-100'
                    } ${cracked && !isSelected ? 'opacity-30' : ''}`}
                    style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(251,191,36,0.8))' : 'none' }}
                  >
                    {cookie.emoji}
                    {isSelected && !cracked && (
                      <motion.div
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border border-white"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Liquid fill at bottom */}
            <div
              className="absolute bottom-0 inset-x-0 h-10 rounded-b-[3rem]"
              style={{ background: 'linear-gradient(0deg, rgba(245,158,11,0.25) 0%, transparent 100%)' }}
            />
          </div>

          {/* Jar base */}
          <div className="mx-2 h-3 rounded-b-xl" style={{ background: 'linear-gradient(180deg, #78350f 0%, #451a03 100%)', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }} />
        </div>

        {/* ── Pick prompt / Crack button ─────────────────────── */}
        <div className="mt-5">
          {!selectedCookie && (
            <p className="text-center text-sm text-amber-700 font-semibold animate-pulse">
              Tap a cookie to pick it 🥠
            </p>
          )}

          {selectedCookie && !cracked && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCrackCookie}
              className="relative w-full py-3.5 rounded-2xl font-extrabold text-sm text-white cursor-pointer overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${selectedCookie.color}, #b45309)`, boxShadow: `0 4px 24px ${selectedCookie.color}55` }}
            >
              {showCrack && <CrackParticles />}
              <span className="relative z-10">🔨 Crack Cookie #{selectedIdx + 1}!</span>
            </motion.button>
          )}
        </div>

        {/* ── Fortune Reveal ─────────────────────────────────── */}
        <AnimatePresence>
          {cracked && selectedCookie && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-3xl border-2 border-amber-300/40 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #fffbeb, #fef3c7)' }}
            >
              {/* Photo */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={currentPhoto}
                  alt="Fortune photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(255,251,235,0.95) 0%, transparent 50%)' }} />
              </div>

              {/* Fortune paper unroll */}
              <div className="px-5 pb-5">
                <motion.div
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={{ scaleY: paperUnrolled ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {/* Paper texture strip */}
                  <div className="w-full h-px bg-amber-300 mb-3" />
                  <p className="text-sm font-semibold text-amber-900 leading-relaxed text-center italic mb-3">
                    "{selectedCookie.fortune}"
                  </p>
                  <div className="flex items-center gap-2 justify-center mb-4">
                    <span className="text-[10px] font-mono text-amber-600 font-bold uppercase tracking-widest">Lucky Numbers</span>
                    <span className="bg-amber-200 text-amber-900 text-xs font-black px-3 py-0.5 rounded-full">{selectedCookie.luckyNumbers}</span>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReset}
                      className="flex-1 py-2.5 rounded-2xl border-2 border-amber-300 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-amber-50"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      New Cookie
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="flex-1 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share Fortune
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
