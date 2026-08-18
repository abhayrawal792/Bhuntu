import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Trophy } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const LOVE_MSGS = [
  "✨ A wish of joy for Sanzu!", "💛 Golden dreams for Bebo!",
  "🌟 Starlight whispers your name!", "💫 Magic in every flutter!",
  "🧚 Fairy blessings for you!", "🌙 Moonlight love for Sanzu!",
  "✨ You glow brighter than any firefly!", "💖 Each light is a kiss for you!",
];

export default function LoveFireflies() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveFireflies;
  const [caught, setCaught] = useState(0);
  const [jar, setJar] = useState([]);
  const [flies, setFlies] = useState([]);
  const [message, setMessage] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const fieldRef = useRef(null);
  const { triggerHaptic } = useAppStore();
  const nextId = useRef(0);

  const GOAL = 10;

  // spawn fireflies with random movement
  useEffect(() => {
    const initial = [];
    for (let i = 0; i < 15; i++) {
      initial.push({
        id: nextId.current++,
        x: 20 + Math.random() * 260,
        y: 20 + Math.random() * 220,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        glow: 0.4 + Math.random() * 0.6,
        alive: true,
        size: 20 + Math.random() * 14,
        color: ['#FBBF24', '#F59E0B', '#FCD34D', '#FFFBEB', '#FDE68A'][Math.floor(Math.random() * 5)],
      });
    }
    setFlies(initial);
  }, []);

  // animate fireflies
  useEffect(() => {
    if (gameWon) return;
    const frame = setInterval(() => {
      setFlies(prev => prev.map(f => {
        if (!f.alive) return f;
        // random direction changes
        let dx = f.dx + (Math.random() - 0.5) * 0.3;
        let dy = f.dy + (Math.random() - 0.5) * 0.3;
        dx = Math.max(-2, Math.min(2, dx));
        dy = Math.max(-2, Math.min(2, dy));
        let x = f.x + dx;
        let y = f.y + dy;
        if (x < 10 || x > 280) dx = -dx;
        if (y < 10 || y > 230) dy = -dy;
        x = Math.max(10, Math.min(280, x));
        y = Math.max(10, Math.min(230, y));
        return { ...f, x, y, dx, dy, glow: 0.3 + Math.random() * 0.7 };
      }));
    }, 60);
    return () => clearInterval(frame);
  }, [gameWon]);

  const handleCatch = useCallback((fly) => {
    if (!fly.alive || gameWon) return;
    playSparkle();
    triggerHaptic(20);

    setFlies(prev => prev.map(f => f.id === fly.id ? { ...f, alive: false } : f));

    const newCaught = caught + 1;
    setCaught(newCaught);
    setJar(prev => [...prev, { id: fly.id, color: fly.color }]);

    // show message every 3 catches
    if (newCaught % 3 === 0) {
      setMessage(LOVE_MSGS[Math.floor(Math.random() * LOVE_MSGS.length)]);
      setTimeout(() => setMessage(null), 2000);
    }

    if (newCaught >= GOAL) {
      setGameWon(true);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
    }
  }, [caught, gameWon, triggerHaptic]);

  const resetGame = () => {
    setCaught(0); setJar([]); setGameWon(false); setMessage(null);
    const initial = [];
    for (let i = 0; i < 15; i++) {
      initial.push({
        id: nextId.current++,
        x: 20 + Math.random() * 260, y: 20 + Math.random() * 220,
        dx: (Math.random() - 0.5) * 1.5, dy: (Math.random() - 0.5) * 1.5,
        glow: 0.4 + Math.random() * 0.6, alive: true,
        size: 20 + Math.random() * 14,
        color: ['#FBBF24', '#F59E0B', '#FCD34D', '#FFFBEB', '#FDE68A'][Math.floor(Math.random() * 5)],
      });
    }
    setFlies(initial);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Catch Glowing Fireflies in a Jar 🫙"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Progress */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs shadow">
          🫙 {caught} / {GOAL} Caught
        </span>
        <div className="w-32 h-2 rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all"
            style={{ width: `${(caught / GOAL) * 100}%` }} />
        </div>
      </div>

      {!gameWon ? (
        <>
          {/* Night Sky Field */}
          <div ref={fieldRef}
            className="w-full max-w-sm h-64 mx-auto rounded-3xl bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 border-4 border-indigo-700 shadow-2xl relative overflow-hidden mb-4"
            style={{ touchAction: 'none' }}>
            {/* Background stars */}
            {[...Array(30)].map((_, i) => (
              <motion.div key={`s-${i}`}
                animate={{ opacity: [0.1, 0.6, 0.1] }}
                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                className="absolute w-0.5 h-0.5 rounded-full bg-white"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}

            {/* Moon */}
            <div className="absolute top-4 right-6 w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-lg shadow-amber-200/30" />

            {/* Fireflies */}
            {flies.map(f => f.alive && (
              <motion.button key={f.id}
                onClick={() => handleCatch(f)}
                className="absolute rounded-full cursor-pointer z-10"
                style={{
                  left: f.x - f.size / 2, top: f.y - f.size / 2,
                  width: f.size, height: f.size,
                }}
              >
                <motion.div
                  animate={{ opacity: [f.glow * 0.4, f.glow, f.glow * 0.4], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 0.8 + Math.random(), repeat: Infinity }}
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${f.color}90, ${f.color}20, transparent)`,
                    boxShadow: `0 0 ${f.size}px ${f.color}80`,
                  }}
                >
                  <span className="text-xs">✨</span>
                </motion.div>
              </motion.button>
            ))}

            {/* Grass at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-green-900 to-transparent" />
          </div>

          <p className="text-xs text-indigo-400 italic mb-2">👆 Tap the glowing fireflies to catch them!</p>

          {/* Jar Display */}
          <div className="max-w-xs mx-auto p-3 rounded-2xl bg-slate-900/50 border border-indigo-500/30 flex items-center justify-center gap-1 flex-wrap">
            <span className="text-xl mr-2">🫙</span>
            {jar.map((j, i) => (
              <motion.span key={j.id} initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="text-sm" style={{ textShadow: `0 0 8px ${j.color}` }}>
                ✨
              </motion.span>
            ))}
            {jar.length === 0 && <span className="text-xs text-indigo-400 italic">Empty jar...</span>}
          </div>
        </>
      ) : (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-purple-900 to-amber-900 text-white shadow-2xl border-2 border-amber-400">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-3">🫙✨</motion.div>
          <h3 className="text-xl font-extrabold font-nepali mb-2">JAR FILLED WITH GOLDEN WISHES! ✨💖</h3>
          <p className="text-xs opacity-90 italic mb-4 leading-relaxed">
            "Each firefly carries a wish for you, Sanzu. {GOAL} glowing wishes sealed in this jar — forever lighting up your life like you light up mine! 🌟"
          </p>
          <button onClick={resetGame}
            className="px-6 py-2.5 rounded-full bg-amber-400 text-amber-950 font-bold text-xs cursor-pointer hover:bg-amber-300">
            Catch More Fireflies 🌟
          </button>
        </motion.div>
      )}

      {/* Message Popup */}
      <AnimatePresence>
        {message && (
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-amber-500 text-amber-950 font-bold text-sm shadow-2xl z-50">
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </WorldShell>
  );
}
