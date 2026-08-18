import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Drum,
  Heart,
  Sparkles,
  Play,
  Share2,
  Unlock,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

// Romantic Pentatonic Sound Synth Notes (Hz frequencies)
const PADS = [
  { id: 0, label: '💓 Heartbeat', note: 'C4', freq: 261.63, dur: 0.25, type: 'sine', color: 'from-rose-500 to-pink-600', emoji: '💓' },
  { id: 1, label: '💗 Passion', note: 'E4', freq: 329.63, dur: 0.22, type: 'triangle', color: 'from-pink-500 to-fuchsia-600', emoji: '💗' },
  { id: 2, label: '💖 Sweetness', note: 'G4', freq: 392.00, dur: 0.20, type: 'sine', color: 'from-purple-500 to-indigo-600', emoji: '💖' },
  { id: 3, label: '✨ Sparkle', note: 'A4', freq: 440.00, dur: 0.18, type: 'sine', color: 'from-amber-400 to-yellow-500', emoji: '✨' },
  { id: 4, label: '🔥 Warmth', note: 'C5', freq: 523.25, dur: 0.22, type: 'triangle', color: 'from-red-500 to-orange-600', emoji: '🔥' },
  { id: 5, label: '🌸 Blossom', note: 'D5', freq: 587.33, dur: 0.20, type: 'sine', color: 'from-pink-400 to-rose-500', emoji: '🌸' },
  { id: 6, label: '💎 Eternity', note: 'E5', freq: 659.25, dur: 0.18, type: 'sine', color: 'from-cyan-400 to-blue-500', emoji: '💎' },
  { id: 7, label: '👑 Queen Beat', note: 'G5', freq: 783.99, dur: 0.25, type: 'triangle', color: 'from-amber-300 to-yellow-600', emoji: '👑' },
];

const SURPRISE_MILESTONES = [
  {
    hits: 10,
    title: 'Secret Photo Surprise #1 📸',
    badge: 'First Rhythm Unlocked',
    photoIdx: 2,
    quote: '"Every heartbeat of mine sings Sanzu’s name..." 💕'
  },
  {
    hits: 25,
    title: 'Secret Love Letter #2 💌',
    badge: 'Deep Connection Unlocked',
    photoIdx: 7,
    quote: '"You are the melody that plays softly in my heart every second of the day." 🌸'
  },
  {
    hits: 40,
    title: 'Royal Birthday Serenade #3 👑',
    badge: 'Master Rhythm Unlocked',
    photoIdx: 15,
    quote: '"Happy Birthday Queen Sanzu! You make my entire world light up with love." 🎆✨'
  }
];

export default function HeartbeatDrumPad() {
  const { triggerHaptic } = useAppStore();

  const [activeId, setActiveId] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [beatsHistory, setBeatsHistory] = useState([]);
  const [isPlayingAutoLoop, setIsPlayingAutoLoop] = useState(false);
  const [unlockedSurprise, setUnlockedSurprise] = useState(null);

  // Sound Synth Generator
  const playSynthesizerNote = (pad) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = pad.type;
      osc.frequency.setValueAtTime(pad.freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pad.freq * 0.7, ctx.currentTime + pad.dur);

      gain.gain.setValueAtTime(0.5, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + pad.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + pad.dur + 0.05);
    } catch (_) {}
  };

  const handleHitPad = (pad) => {
    playSynthesizerNote(pad);
    triggerHaptic(15);
    setActiveId(pad.id);

    setBeatsHistory((prev) => [...prev.slice(-12), { id: Date.now(), emoji: pad.emoji, color: pad.color }]);
    const newHits = totalHits + 1;
    setTotalHits(newHits);

    setTimeout(() => setActiveId(null), 140);

    // Check for surprise milestone unlocks!
    const surprise = SURPRISE_MILESTONES.find((s) => s.hits === newHits);
    if (surprise) {
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120, 160]);
      setUnlockedSurprise(surprise);
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    } else if (newHits % 15 === 0) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
  };

  // Play Romantic Auto-Melody Sequence
  const handlePlayAutoMelody = () => {
    if (isPlayingAutoLoop) return;
    setIsPlayingAutoLoop(true);
    playSparkle();

    const sequence = [0, 2, 4, 7, 5, 3, 1, 0, 4, 7];
    sequence.forEach((padId, index) => {
      setTimeout(() => {
        const pad = PADS[padId];
        handleHitPad(pad);
        if (index === sequence.length - 1) {
          setIsPlayingAutoLoop(false);
        }
      }, index * 320);
    });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🥁 HEARTBEAT RHYTHM STUDIO 💓\n\nI composed a romantic heartbeat rhythm with ${totalHits} beats for my Birthday Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Heartbeat Rhythm Music Studio 🥁💓"
      badgeIcon={<Drum className="w-3.5 h-3.5 text-pink-400" />}
      title={"Heartbeat Drum Pad"}
      subtitle={"Play Beats to Unlock Secret Birthday Photo Surprises!"}
      description={"Tap the romantic sound pads to play sweet heartbeat notes. Unlock hidden photos and secret love quotes as your beats increase!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* TOP STATUS BAR & LOVE METER */}
        <div className="mb-6 p-4 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-pink-400/40 shadow-xl text-center">
          <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
            <span className="text-gray-300 flex items-center gap-1 font-bold">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              Heartbeat Hits: <span className="text-pink-400 text-sm font-extrabold">{totalHits}</span>
            </span>
            <span className="text-amber-300 font-bold">
              {totalHits < 40 ? `Next Surprise at ${totalHits < 10 ? 10 : totalHits < 25 ? 25 : 40} Hits 🎁` : 'All Surprises Unlocked! 👑'}
            </span>
          </div>

          {/* Love Meter Progress Bar */}
          <div className="w-full h-3 rounded-full bg-black/60 border border-white/20 overflow-hidden relative p-0.5">
            <motion.div
              animate={{ width: `${Math.min(100, (totalHits / 40) * 100)}%` }}
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            />
          </div>
        </div>

        {/* PULSING 3D HEART VISUALIZER */}
        <div className="relative max-w-xs mx-auto mb-8 flex flex-col items-center">
          <motion.div
            animate={
              activeId !== null
                ? { scale: [1, 1.35, 1], rotate: [0, -5, 5, 0] }
                : { scale: [1, 1.06, 1] }
            }
            transition={
              activeId !== null
                ? { duration: 0.2 }
                : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative cursor-pointer select-none text-7xl sm:text-8xl drop-shadow-[0_10px_25px_rgba(244,63,94,0.8)]"
          >
            💓
            {activeId !== null && (
              <motion.div
                initial={{ opacity: 1, scale: 0.5, y: 0 }}
                animate={{ opacity: 0, scale: 1.8, y: -40 }}
                className="absolute inset-0 flex items-center justify-center text-rose-400 pointer-events-none"
              >
                ✨
              </motion.div>
            )}
          </motion.div>

          <p className="text-xs text-pink-300 font-bold mt-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            Heartbeat Sound Synth Ready
          </p>
        </div>

        {/* 8 ROMANTIC DRUM PADS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto mb-8">
          {PADS.map((pad) => {
            const isActive = activeId === pad.id;
            return (
              <motion.button
                key={pad.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.88 }}
                onClick={() => handleHitPad(pad)}
                className={`py-4 px-3 rounded-2xl bg-gradient-to-br ${pad.color} text-white shadow-xl cursor-pointer border-2 transition-all flex flex-col items-center justify-center gap-1 relative overflow-hidden ${
                  isActive
                    ? 'border-white scale-110 shadow-[0_0_25px_rgba(255,255,255,0.9)] ring-4 ring-white/50'
                    : 'border-white/30 hover:border-white/60'
                }`}
              >
                <span className="text-2xl">{pad.emoji}</span>
                <span className="text-xs font-extrabold truncate">{pad.label.split(' ')[1] || pad.label}</span>
                <span className="text-[10px] font-mono text-white/80 uppercase">{pad.note}</span>
              </motion.button>
            );
          })}
        </div>

        {/* TOOLBAR ACTIONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={handlePlayAutoMelody}
            disabled={isPlayingAutoLoop}
            className={`px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
              isPlayingAutoLoop ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isPlayingAutoLoop ? 'Playing Melody...' : 'Play Auto Love Song 🎶'}</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Beat Score 💬</span>
          </button>
        </div>

        {/* BEATS RHYTHM STREAM */}
        {beatsHistory.length > 0 && (
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <p className="text-[11px] font-mono text-gray-300 mb-2">Live Rhythm Stream:</p>
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
              <AnimatePresence>
                {beatsHistory.map((b) => (
                  <motion.span
                    key={b.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="text-xl inline-block"
                  >
                    {b.emoji}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* SURPRISE UNLOCK MODAL */}
        <AnimatePresence>
          {unlockedSurprise && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-pink-400 shadow-2xl overflow-hidden text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setUnlockedSurprise(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Unlock className="w-3.5 h-3.5 text-amber-300" />
                  {unlockedSurprise.badge}
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  {unlockedSurprise.title}
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={BHUNTU_PHOTOS[unlockedSurprise.photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]}
                    alt="Surprise Photo"
                    onError={(e) => handlePhotoError(e, unlockedSurprise.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                </div>

                <p className="text-xs text-amber-100 italic leading-relaxed bg-white/10 p-3.5 rounded-2xl border border-white/15 mb-4 font-serif">
                  {unlockedSurprise.quote}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    playSparkle();
                    setUnlockedSurprise(null);
                  }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-lg cursor-pointer hover:brightness-110 flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Keep Playing Beats! 🥁💖</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
