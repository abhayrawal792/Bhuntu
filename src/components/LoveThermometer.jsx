import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Thermometer,
  Heart,
  Sparkles,
  Flame,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const HEAT_ACTIONS = [
  { label: 'Send Good Morning Hug ☀️', heat: 12, icon: '🤗' },
  { label: 'Say "I Love You Bebo" 💕', heat: 15, icon: '💖' },
  { label: 'Plan Japan Reunion Date ✈️', heat: 20, icon: '🇯🇵' },
  { label: 'Sing Nepali Love Song 🎶', heat: 14, icon: '🇳🇵' },
  { label: 'Send Birthday Kisses 💋', heat: 18, icon: '🎂' },
  { label: 'Crown Her My Forever Queen 👑', heat: 25, icon: '👸' }
];

const MILESTONES = [
  { temp: 35, title: 'Warm Hug Milestone 💗', photoIdx: 1, desc: 'Your hearts are glowing with warmth and happiness!' },
  { temp: 70, title: 'Hot Romance Milestone 🔥', photoIdx: 8, desc: 'Love temperature is sizzling! Pure passion!' },
  { temp: 100, title: 'SUPERNOVA LOVE MAXIMUM 💥👑', photoIdx: 15, desc: '100% MAXIMUM LOVE HEAT! Soulmates forever!' }
];

export default function LoveThermometer() {
  const { triggerHaptic } = useAppStore();

  const [temp, setTemp] = useState(25);
  const [completedActions, setCompletedActions] = useState([]);
  const [unlockedMilestone, setUnlockedMilestone] = useState(null);

  const handleAction = (act) => {
    if (completedActions.includes(act.label)) return;

    playSparkle();
    triggerHaptic(20);

    const newTemp = Math.min(100, temp + act.heat);
    setCompletedActions((prev) => [...prev, act.label]);
    setTemp(newTemp);

    // Check milestone trigger
    const m = MILESTONES.find((m) => newTemp >= m.temp && temp < m.temp);
    if (m) {
      playBloom();
      setUnlockedMilestone(m);
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleTapHeartBulb = () => {
    playPop();
    triggerHaptic(10);
    const newTemp = Math.min(100, temp + 3);
    setTemp(newTemp);

    const m = MILESTONES.find((m) => newTemp >= m.temp && temp < m.temp);
    if (m) {
      playBloom();
      setUnlockedMilestone(m);
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleReset = () => {
    playPop();
    setTemp(25);
    setCompletedActions([]);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔥 LOVE WARMTH THERMOMETER 🔥\n\nLove Temperature reached ${temp}° (MAXIMUM HEAT)! Sanzu & Abu's love is burning forever! Happy Birthday Queen Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  const fillColor =
    temp < 40
      ? 'from-sky-400 via-cyan-400 to-blue-500'
      : temp < 75
      ? 'from-amber-400 via-orange-500 to-rose-500'
      : 'from-rose-500 via-red-500 to-amber-400';

  return (
    <WorldShell
      theme="journey"
      badge="Liquid Neon Love Thermometer 🌡️🔥"
      badgeIcon={<Thermometer className="w-3.5 h-3.5 text-rose-500" />}
      title={"शाही प्रेम तापमापक"}
      subtitle={"Heat Up the Love Temperature to 100°"}
      description={"Complete romantic actions or tap the pulsing heart bulb to raise the liquid neon temperature and unlock secret photo milestones!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* MAIN STAGE: THERMOMETER & READOUT */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8 p-6 rounded-3xl bg-slate-950/80 border-2 border-rose-400/50 shadow-2xl backdrop-blur-md">
          {/* 3D NEON GLASS THERMOMETER */}
          <div className="flex flex-col items-center select-none">
            {/* Heat Percentage Readout */}
            <div className="flex items-center gap-1 mb-2">
              <Flame className={`w-5 h-5 ${temp >= 75 ? 'text-amber-400 animate-bounce' : 'text-rose-400'}`} />
              <span className="text-3xl font-extrabold font-mono text-white drop-shadow-[0_0_15px_rgba(244,63,94,0.8)]">
                {temp}°
              </span>
            </div>

            {/* Glass Tube */}
            <div className="w-14 h-64 rounded-full bg-slate-900 border-4 border-rose-300/60 shadow-[0_0_30px_rgba(244,63,94,0.3)] relative overflow-hidden flex flex-col justify-end p-1">
              <motion.div
                animate={{ height: `${temp}%` }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                className={`w-full bg-gradient-to-t ${fillColor} rounded-full relative shadow-[0_0_20px_rgba(244,63,94,0.9)]`}
              >
                {temp >= 100 && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
                    🔥
                  </span>
                )}
              </motion.div>
            </div>

            {/* Pulsing Heart Bulb */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleTapHeartBulb}
              className="w-18 h-18 rounded-full bg-gradient-to-br from-rose-500 via-red-500 to-amber-500 -mt-4 border-4 border-white shadow-[0_0_30px_rgba(244,63,94,0.8)] flex items-center justify-center cursor-pointer relative z-10"
              title="Tap to Boost Heat!"
            >
              <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
            </motion.button>
            <span className="text-[10px] font-mono text-rose-300 font-bold mt-1">TAP HEART TO HEAT UP!</span>
          </div>

          {/* ACTIONS & BOOSTERS LIST */}
          <div className="flex-1 w-full space-y-3">
            <h4 className="text-xs font-bold text-gray-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Complete Romantic Actions to Heat Up:
            </h4>

            <div className="grid grid-cols-1 gap-2">
              {HEAT_ACTIONS.map((act) => {
                const isDone = completedActions.includes(act.label);
                return (
                  <motion.button
                    key={act.label}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAction(act)}
                    disabled={isDone}
                    className={`p-3 rounded-2xl text-xs font-bold text-left border-2 cursor-pointer transition-all flex items-center justify-between gap-2 ${
                      isDone
                        ? 'bg-emerald-950/60 border-emerald-400/50 text-emerald-300 opacity-60'
                        : 'bg-slate-900/90 border-rose-300/40 text-white hover:border-rose-400 hover:bg-slate-800 shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{isDone ? '✅' : act.icon}</span>
                      <span className="truncate">{act.label}</span>
                    </div>
                    <span className="text-xs font-mono font-extrabold text-amber-300 flex-shrink-0">
                      +{act.heat}°
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-2 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Heat</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Temp</span>
              </button>
            </div>
          </div>
        </div>

        {/* MILESTONE UNLOCK MODAL POPUP */}
        <AnimatePresence>
          {unlockedMilestone && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-rose-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setUnlockedMilestone(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-400/20 border border-rose-300/40 text-rose-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  {unlockedMilestone.title}
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-2">
                  {unlockedMilestone.desc}
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={BHUNTU_PHOTOS[unlockedMilestone.photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]}
                    alt="Milestone Photo"
                    onError={(e) => handlePhotoError(e, unlockedMilestone.photoIdx)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Heat Milestone Photo Unlocked! 🌡️📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Heat Milestone on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
