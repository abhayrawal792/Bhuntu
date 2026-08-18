import WorldShell from './WorldShell';
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Heart, Volume2, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { useAppStore } from '../store/useAppStore';

const SOUNDS = [
  {
    label: "Mero Bebo I Love You! ❤️",
    icon: "❤️",
    gradient: "from-rose-500 to-pink-600",
    message: "Temro naam sunera mero mutu dhadkirahanxa, Bebo! 💓",
    // Love chord: C-E-G arpeggiated softly
    notes: [261.63, 329.63, 392.00, 523.25],
    type: 'sine',
    speed: 0.3,
  },
  {
    label: "Happy Birthday Fuchhee! 🎂",
    icon: "🎂",
    gradient: "from-amber-500 to-orange-500",
    message: "Janma dhin ko dherai dherai subhakamana, mero Fuchhee! 🎉",
    // Birthday melody snippet: C-C-D-C-F-E
    notes: [261.63, 261.63, 293.66, 261.63, 349.23, 329.63],
    type: 'triangle',
    speed: 0.2,
  },
  {
    label: "Kiss Pass Muaaah! 💋",
    icon: "💋",
    gradient: "from-pink-500 to-fuchsia-600",
    message: "Yo virtual kiss Nepalgunj bata Osaka samma pugos! 💋✨",
    // Sparkle ascending: high pitch shimmer
    notes: [800, 1000, 1200, 1600, 2000],
    type: 'sine',
    speed: 0.08,
  },
  {
    label: "Forever Marriage Promise 💍",
    icon: "💍",
    gradient: "from-purple-500 to-indigo-600",
    message: "Hami bihe garxam ra sadhai sangai basnexam! Promise! 💍🌸",
    // Wedding march: G-G-G-Eb-Bb-G-Eb-Bb-G
    notes: [392.00, 392.00, 392.00, 311.13, 466.16, 392.00, 523.25],
    type: 'sine',
    speed: 0.35,
  },
];

function playMelody(sound) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    sound.notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = sound.type;
      const startTime = ctx.currentTime + i * sound.speed;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + sound.speed + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + sound.speed + 0.2);
    });
  } catch (_) {}
}

export default function VoiceSoundboard() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.voiceSoundboard;
  const { triggerHaptic } = useAppStore();
  const [activeIdx, setActiveIdx] = useState(null);
  const [showMessage, setShowMessage] = useState(null);
  const [playCount, setPlayCount] = useState(0);
  const timeoutRef = useRef(null);

  const handlePlaySound = useCallback((sound, idx) => {
    playMelody(sound);
    triggerHaptic([20, 40, 20]);
    setActiveIdx(idx);
    setShowMessage(sound.message);
    setPlayCount(p => p + 1);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveIdx(null);
      setShowMessage(null);
    }, 3000);
  }, [triggerHaptic]);

  return (
    <WorldShell
      theme="music"
      badge="Voice Soundboard 🎤"
      badgeIcon={<Mic className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Sound Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-6">
        {SOUNDS.map((s, i) => (
          <motion.button
            key={i}
            onClick={() => handlePlaySound(s, i)}
            whileTap={{ scale: 0.93 }}
            className={`relative p-5 rounded-2xl border-2 shadow-lg text-left font-bold text-xs sm:text-sm font-ui flex items-center justify-between cursor-pointer overflow-hidden transition-all duration-300 ${
              activeIdx === i
                ? `bg-gradient-to-r ${s.gradient} text-white border-white/30 shadow-2xl`
                : 'bg-white text-gray-800 border-pink-200 hover:border-pink-400'
            }`}
          >
            {/* Ripple effect when active */}
            {activeIdx === i && (
              <motion.div
                initial={{ scale: 0, opacity: 0.4 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 bg-white/30 rounded-full"
                style={{ transformOrigin: 'center' }}
              />
            )}

            <div className="flex items-center gap-3 relative z-10">
              <motion.span
                animate={activeIdx === i ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.6, repeat: activeIdx === i ? Infinity : 0 }}
                className="text-2xl"
              >
                {s.icon}
              </motion.span>
              <span>{s.label}</span>
            </div>

            <div className="relative z-10 flex items-center gap-1">
              {activeIdx === i ? (
                <div className="flex items-end gap-0.5 h-4">
                  {[0.6, 0.8, 0.5, 0.7, 0.4].map((d, j) => (
                    <motion.span
                      key={j}
                      animate={{ scaleY: [0.3, 1, 0.3] }}
                      transition={{ duration: d, repeat: Infinity, delay: j * 0.1 }}
                      className="w-0.5 h-full bg-white rounded-full origin-bottom"
                    />
                  ))}
                </div>
              ) : (
                <Volume2 className="w-5 h-5 text-rose-500" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Romantic Message Popup */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 max-w-md mx-auto shadow-xl mb-4"
          >
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-rose-700 font-nepali font-bold italic text-left">{showMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play Counter */}
      {playCount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 text-xs text-pink-500 font-bold font-ui"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{playCount} love sound{playCount > 1 ? 's' : ''} played! Keep tapping! 🎵</span>
        </motion.div>
      )}
    </WorldShell>
  );
}
