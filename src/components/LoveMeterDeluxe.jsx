import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const LOVE_FACTS = [
  "Your hearts are beating in sync! 💕",
  "Your love wavelength matches perfectly! 📡",
  "Both hearts resonating at 143bpm (I ❤ U)! 💖",
  "Cardiac coherence achieved — you're soulmates! ✨",
  "The universe confirms: 100% eternal match! 🌟",
];

export default function LoveMeterDeluxe() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveMeterDeluxe;
  const [sync, setSync] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [heartRate, setHeartRate] = useState(60);
  const [ecgPoints, setEcgPoints] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [pulseSize, setPulseSize] = useState(1);
  const holdTimer = useRef(null);
  const { triggerHaptic } = useAppStore();

  // ECG line animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEcgPoints(prev => {
        const next = [...prev];
        // generate ECG-like waveform
        const t = Date.now() / 200;
        const beat = Math.sin(t) > 0.8 ? 40 : Math.sin(t * 3) > 0.7 ? -15 : Math.sin(t * 0.5) * 3;
        next.push(50 + beat * (isHolding ? 1.5 : 0.3));
        if (next.length > 60) next.shift();
        return next;
      });
      if (isHolding) {
        setHeartRate(h => Math.min(143, h + 2));
        setPulseSize(s => 1 + Math.sin(Date.now() / 300) * 0.2);
      } else {
        setHeartRate(h => Math.max(60, h - 1));
      }
    }, 80);
    return () => clearInterval(interval);
  }, [isHolding]);

  // hold-to-sync mechanic
  useEffect(() => {
    if (isHolding && !showResult) {
      holdTimer.current = setInterval(() => {
        setSync(s => {
          const next = Math.min(100, s + 2);
          if (next >= 100) {
            setShowResult(true);
            confetti({ particleCount: 250, spread: 100, origin: { y: 0.5 } });
            triggerHaptic([40, 80, 40, 80, 40]);
            clearInterval(holdTimer.current);
          }
          return next;
        });
      }, 100);
    } else {
      clearInterval(holdTimer.current);
    }
    return () => clearInterval(holdTimer.current);
  }, [isHolding, showResult, triggerHaptic]);

  const ecgPath = ecgPoints.map((y, i) => `${i === 0 ? 'M' : 'L'} ${i * 5} ${y}`).join(' ');

  return (
    <WorldShell
      theme="journey"
      badge="Heartbeat Rhythm Synchronizer 💓"
      badgeIcon={<Heart className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {!showResult ? (
        <>
          {/* Sync Percentage */}
          <motion.div animate={{ scale: isHolding ? 1.1 : 1 }}
            className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 font-mono mb-2">
            {sync}%
          </motion.div>
          <p className="text-xs text-gray-500 mb-4">HEART SYNC LEVEL</p>

          {/* ECG Monitor */}
          <div className="max-w-sm mx-auto p-3 rounded-2xl bg-slate-900 border-2 border-green-500/30 shadow-2xl mb-4 overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono text-green-400">ECG MONITOR</span>
              <span className="text-[11px] font-mono text-rose-400 animate-pulse">
                ❤️ {heartRate} BPM
              </span>
            </div>
            <svg viewBox="0 0 300 100" className="w-full h-16">
              <path d={ecgPath} fill="none" stroke="#22c55e" strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 4px #22c55e80)' }} />
            </svg>
          </div>

          {/* Sync Progress Bar */}
          <div className="max-w-xs mx-auto mb-4">
            <div className="h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner">
              <motion.div animate={{ width: `${sync}%` }} transition={{ duration: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400"
                style={{ boxShadow: `0 0 ${sync / 5}px #ec4899` }}
              />
            </div>
          </div>

          {/* Heart Button */}
          <motion.button
            animate={{ scale: [pulseSize, pulseSize * 1.1, pulseSize] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            onMouseDown={() => { setIsHolding(true); playSparkle(); }}
            onMouseUp={() => setIsHolding(false)}
            onMouseLeave={() => setIsHolding(false)}
            onTouchStart={() => { setIsHolding(true); playSparkle(); }}
            onTouchEnd={() => setIsHolding(false)}
            className={`w-36 h-36 rounded-full font-bold shadow-2xl flex flex-col items-center justify-center mx-auto cursor-pointer border-4 border-white mb-4 transition-all ${
              isHolding
                ? 'bg-gradient-to-tr from-rose-600 via-pink-600 to-red-600 text-white'
                : 'bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-500 text-white'
            }`}
            style={{ boxShadow: isHolding ? '0 0 40px #ec4899, 0 0 80px #ec489950' : '0 10px 30px rgba(0,0,0,0.2)' }}
          >
            <Heart className={`w-14 h-14 fill-white ${isHolding ? 'animate-pulse' : ''}`} />
            <span className="text-[11px] font-bold mt-1">
              {isHolding ? 'SYNCING...' : 'HOLD TO SYNC'}
            </span>
          </motion.button>

          <p className="text-xs text-pink-400 italic">👆 Press and hold the heart to sync your heartbeats!</p>
        </>
      ) : (
        /* Result Screen */
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto p-8 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white shadow-2xl">
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <Heart className="w-20 h-20 mx-auto fill-white mb-3" />
          </motion.div>
          <h3 className="text-2xl font-extrabold font-nepali mb-2">100% HEARTS IN SYNC! 💖</h3>
          <p className="text-4xl font-extrabold font-mono mb-3">143 BPM</p>
          <p className="text-xs opacity-90 mb-1 italic">
            (143 = I ❤ U — the number of characters in "I Love You")
          </p>
          <div className="p-3 rounded-xl bg-white/15 backdrop-blur-sm mb-4">
            <p className="text-xs leading-relaxed">
              "{LOVE_FACTS[Math.floor(Math.random() * LOVE_FACTS.length)]}"
            </p>
          </div>
          <p className="text-xs opacity-80 italic">
            "Our hearts beat as one, Sanzu. Across every distance, through every second — they always find each other. 💕"
          </p>
        </motion.div>
      )}
    </WorldShell>
  );
}
