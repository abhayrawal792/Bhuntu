import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Target, Heart, Trophy } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const LOVE_MSGS = [
  "You stole my heart! 💘", "Bullseye of love! 🎯", "Cupid approves! 💝",
  "Heart captured! 💖", "Perfect shot, babe! 🏹", "My aim is true for you! 💗",
  "Love arrow landed! 💕", "You're my target always! 🎯", "Shot through the heart! 💘",
  "Bebo, you're hit! 😍",
];

const LEVELS = [
  { name: 'Easy', speed: 1.5, targets: 5, size: 56 },
  { name: 'Medium', speed: 2.2, targets: 7, size: 44 },
  { name: 'Hard', speed: 3, targets: 10, size: 36 },
];

export default function CupidArchery() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.cupidArchery;
  const { triggerHaptic } = useAppStore();
  const fieldRef = useRef(null);

  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [hitMsg, setHitMsg] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [aim, setAim] = useState({ active: false, startY: 0, angle: 0, power: 0 });
  const nextId = useRef(1);
  const animFrame = useRef(null);

  const cfg = LEVELS[level];

  // spawn heart targets that bounce around
  useEffect(() => {
    if (gameOver) return;
    const spawnTargets = () => {
      const newHearts = [];
      for (let i = 0; i < cfg.targets; i++) {
        newHearts.push({
          id: nextId.current++,
          x: 80 + Math.random() * 200,
          y: 30 + Math.random() * 200,
          dx: (Math.random() - 0.5) * cfg.speed,
          dy: (Math.random() - 0.5) * cfg.speed,
          alive: true, size: cfg.size,
        });
      }
      setHearts(newHearts);
    };
    spawnTargets();
  }, [level, gameOver, cfg.targets, cfg.speed, cfg.size]);

  // animate targets
  useEffect(() => {
    if (gameOver) return;
    const tick = () => {
      setHearts(prev => prev.map(h => {
        if (!h.alive) return h;
        let nx = h.x + h.dx;
        let ny = h.y + h.dy;
        let ndx = h.dx, ndy = h.dy;
        if (nx < 0 || nx > 280) ndx = -ndx;
        if (ny < 0 || ny > 240) ndy = -ndy;
        return { ...h, x: Math.max(0, Math.min(280, nx)), y: Math.max(0, Math.min(240, ny)), dx: ndx, dy: ndy };
      }));
      animFrame.current = requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame.current);
  }, [gameOver]);

  // handle shooting
  const handleShoot = useCallback((clientX, clientY) => {
    if (gameOver) return;
    const rect = fieldRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // check hit
    setHearts(prev => {
      const updated = prev.map(h => {
        if (!h.alive) return h;
        const dist = Math.sqrt((h.x + h.size / 2 - x) ** 2 + (h.y + h.size / 2 - y) ** 2);
        if (dist < h.size / 2 + 10) {
          playSparkle();
          triggerHaptic(30);
          setScore(s => s + 10 * (level + 1));
          setHitMsg(LOVE_MSGS[Math.floor(Math.random() * LOVE_MSGS.length)]);
          setTimeout(() => setHitMsg(null), 1500);
          setArrows(a => [...a, { id: Date.now(), x, y }]);
          return { ...h, alive: false };
        }
        return h;
      });
      // check if all dead
      if (updated.every(h => !h.alive)) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
        if (level < LEVELS.length - 1) {
          setTimeout(() => setLevel(l => l + 1), 1200);
        } else {
          setTimeout(() => setGameOver(true), 1200);
        }
      }
      return updated;
    });
  }, [gameOver, level, triggerHaptic]);

  const handleFieldClick = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    handleShoot(touch.clientX, touch.clientY);
  };

  const resetGame = () => {
    setLevel(0); setScore(0); setGameOver(false);
    setArrows([]); setHitMsg(null);
  };

  const aliveCount = hearts.filter(h => h.alive).length;

  return (
    <WorldShell
      theme="arcade"
      badge="Cupid's Archery Challenge 🏹"
      badgeIcon={<Target className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Score & Level Bar */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs shadow">
          Score: {score} 🏆
        </div>
        <div className="px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs shadow">
          Level {level + 1}: {cfg.name} 🎯
        </div>
        <div className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 font-extrabold text-xs shadow">
          ❤️ {aliveCount} left
        </div>
      </div>

      {!gameOver ? (
        <>
          {/* Game Field */}
          <div
            ref={fieldRef}
            onClick={handleFieldClick}
            onTouchStart={handleFieldClick}
            className="w-full max-w-sm h-72 mx-auto rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 border-4 border-rose-400 shadow-2xl relative overflow-hidden cursor-crosshair mb-4"
            style={{ touchAction: 'none' }}
          >
            {/* Twinkling stars background */}
            {[...Array(20)].map((_, i) => (
              <motion.div key={`star-${i}`}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute w-1 h-1 rounded-full bg-white"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}

            {/* Heart targets */}
            {hearts.map(h => h.alive && (
              <motion.div key={h.id}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="absolute flex items-center justify-center cursor-pointer"
                style={{ left: h.x, top: h.y, width: h.size, height: h.size }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-500 to-pink-600 border-2 border-white shadow-lg flex items-center justify-center text-white">
                  <Heart className="w-5 h-5 fill-white" />
                </div>
              </motion.div>
            ))}

            {/* Arrow impact markers */}
            <AnimatePresence>
              {arrows.map(a => (
                <motion.div key={a.id}
                  initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-6 h-6 rounded-full border-2 border-amber-400"
                  style={{ left: a.x - 12, top: a.y - 12 }}
                />
              ))}
            </AnimatePresence>

            {/* Crosshair center hint */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <div className="w-8 h-8 border-2 border-white rounded-full" />
              <div className="absolute w-px h-6 bg-white" />
              <div className="absolute w-6 h-px bg-white" />
            </div>
          </div>

          <p className="text-xs text-pink-400 italic mb-2">👆 Tap on the bouncing hearts to shoot Cupid's arrows!</p>
        </>
      ) : (
        /* Victory Screen */
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto p-8 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-amber-500 text-white shadow-2xl">
          <Trophy className="w-16 h-16 mx-auto mb-3 text-amber-200" />
          <h3 className="text-2xl font-extrabold font-nepali mb-2">CUPID MASTER CHAMPION! 🏹💖</h3>
          <p className="text-3xl font-extrabold font-mono mb-3">{score} POINTS</p>
          <p className="text-xs opacity-90 mb-4 italic">
            "Every arrow I shoot carries my love for you, Sanzu. Every heart hit is a promise I'll keep forever."
          </p>
          <button onClick={resetGame}
            className="px-6 py-2.5 rounded-full bg-white text-rose-600 font-bold text-xs shadow-lg cursor-pointer hover:bg-rose-50">
            Play Again 🏹
          </button>
        </motion.div>
      )}

      {/* Hit Message Popup */}
      <AnimatePresence>
        {hitMsg && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-rose-600 text-white font-bold text-sm shadow-2xl z-50">
            {hitMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </WorldShell>
  );
}
