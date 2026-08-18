import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Bell, Music, Trophy, RotateCcw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const NOTES = [
  { name: 'C', color: 'from-cyan-400 to-cyan-600', emoji: '🎵', freq: 262 },
  { name: 'D', color: 'from-blue-400 to-blue-600', emoji: '🎶', freq: 294 },
  { name: 'E', color: 'from-indigo-400 to-indigo-600', emoji: '✨', freq: 330 },
  { name: 'G', color: 'from-purple-400 to-purple-600', emoji: '💫', freq: 392 },
  { name: 'A', color: 'from-pink-400 to-pink-600', emoji: '🌟', freq: 440 },
];

// melody sequences to play
const MELODIES = [
  { name: "Happy Birthday 🎂", notes: [0, 0, 1, 0, 3, 2, 0, 0, 1, 0, 4, 3] },
  { name: "Love Song 💕", notes: [0, 2, 4, 3, 2, 1, 0, 2, 3, 4] },
  { name: "Twinkle Star ⭐", notes: [0, 0, 3, 3, 4, 4, 3, 2, 2, 1, 1, 0] },
];

export default function LoveChimes() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveChimes;
  const { triggerHaptic } = useAppStore();
  const [activeNote, setActiveNote] = useState(null);
  const [recording, setRecording] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [playingMelody, setPlayingMelody] = useState(false);
  const [swingingChime, setSwingingChime] = useState(null);

  const playNote = (index) => {
    playSparkle();
    triggerHaptic(15);
    setActiveNote(index);
    setSwingingChime(index);
    setTimeout(() => { setActiveNote(null); setSwingingChime(null); }, 500);

    if (isRecording) {
      setRecording(prev => [...prev, index]);
    }

    // create oscillator for actual sound
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = NOTES[index].freq;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.connect(gain).connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.8);
    } catch (e) { /* audio not supported */ }
  };

  const playMelody = async (melody) => {
    if (playingMelody) return;
    setPlayingMelody(true);
    for (let i = 0; i < melody.notes.length; i++) {
      playNote(melody.notes[i]);
      await new Promise(r => setTimeout(r, 400));
    }
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    setPlayingMelody(false);
  };

  const playRecording = async () => {
    if (recording.length === 0 || playingMelody) return;
    setPlayingMelody(true);
    for (let i = 0; i < recording.length; i++) {
      playNote(recording[i]);
      await new Promise(r => setTimeout(r, 400));
    }
    setPlayingMelody(false);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Crystal Wind Chime Melody Studio 🎐"
      badgeIcon={<Bell className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Chime Display */}
      <div className="max-w-sm mx-auto p-4 rounded-3xl bg-gradient-to-b from-sky-100 to-sky-50 border-4 border-cyan-200 shadow-2xl mb-4 relative overflow-hidden">
        {/* Top bar */}
        <div className="w-32 h-3 rounded-full bg-amber-700 mx-auto mb-1 shadow-md" />

        {/* Strings & Chimes */}
        <div className="flex justify-center items-start gap-4 h-52">
          {NOTES.map((note, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* String */}
              <div className="w-px h-8 bg-gray-400" />

              {/* Chime tube */}
              <motion.button
                animate={{
                  rotate: swingingChime === i ? [-20, 20, -10, 10, 0] : 0,
                  y: activeNote === i ? [0, 5, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
                onClick={() => playNote(i)}
                className={`w-10 rounded-b-full bg-gradient-to-b ${note.color} border-2 border-white/50 shadow-xl cursor-pointer flex flex-col items-end justify-end pb-3 hover:brightness-110 transition-all`}
                style={{ height: 80 + i * 20 }}
              >
                <span className="text-xs text-white/80 font-bold mx-auto">{note.name}</span>
              </motion.button>

              {/* Active glow */}
              <AnimatePresence>
                {activeNote === i && (
                  <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 2, opacity: 0 }}
                    className="text-lg mt-1">{note.emoji}</motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Wind striker */}
        <div className="w-8 h-8 rounded-full bg-amber-600 border-2 border-amber-400 mx-auto shadow-lg flex items-center justify-center">
          <span className="text-xs">🎐</span>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <button onClick={() => { setIsRecording(!isRecording); if (!isRecording) setRecording([]); }}
          className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer shadow-md flex items-center gap-1 ${
            isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
          {isRecording ? '⏹ Stop Recording' : '⏺ Start Recording'}
        </button>
        {recording.length > 0 && (
          <>
            <button onClick={playRecording} disabled={playingMelody}
              className="px-4 py-2 rounded-full bg-cyan-500 text-white text-xs font-bold cursor-pointer shadow-md disabled:opacity-50">
              ▶ Play ({recording.length} notes)
            </button>
            <button onClick={() => setRecording([])}
              className="px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-xs font-bold cursor-pointer hover:bg-gray-200">
              <RotateCcw className="w-3 h-3" />
            </button>
          </>
        )}
      </div>

      {/* Preset Melodies */}
      <div className="max-w-sm mx-auto">
        <p className="text-xs font-bold text-gray-500 mb-2">🎵 Play a Melody for Sanzu:</p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {MELODIES.map((m, i) => (
            <button key={i} onClick={() => playMelody(m)} disabled={playingMelody}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 text-xs font-bold cursor-pointer hover:from-cyan-200 hover:to-blue-200 shadow-sm disabled:opacity-50">
              {m.name}
            </button>
          ))}
        </div>
      </div>
    </WorldShell>
  );
}
