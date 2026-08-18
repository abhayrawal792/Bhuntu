import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Sparkles, Volume2, BookOpen, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';
import { useAppStore } from '../store/useAppStore';

const PIANO_KEYS = [
  { note: 'C4', freq: 261.63, key: 'C', color: 'from-pink-500 to-rose-400' },
  { note: 'D4', freq: 293.66, key: 'D', color: 'from-rose-400 to-pink-400' },
  { note: 'E4', freq: 329.63, key: 'E', color: 'from-purple-400 to-pink-500' },
  { note: 'F4', freq: 349.23, key: 'F', color: 'from-indigo-400 to-purple-400' },
  { note: 'G4', freq: 392.00, key: 'G', color: 'from-sky-400 to-indigo-400' },
  { note: 'A4', freq: 440.00, key: 'A', color: 'from-teal-400 to-sky-400' },
  { note: 'B4', freq: 493.88, key: 'B', color: 'from-emerald-400 to-teal-400' },
  { note: 'C5', freq: 523.25, key: 'C5', color: 'from-amber-400 to-rose-400' },
];

const SONGS = [
  {
    title: '🎂 Happy Birthday Bebo',
    notes: [0, 0, 1, 0, 3, 2, 0, 0, 1, 0, 4, 3], // C C D C F E, C C D C G F
  },
  {
    title: '💖 Romantic Melody',
    notes: [0, 2, 4, 3, 2, 0, 1, 3, 5, 4, 7],
  },
];

export default function LovePiano() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.lovePiano;
  const { triggerHaptic } = useAppStore();

  const [activeKey, setActiveKey] = useState(null);
  const [floatingNotes, setFloatingNotes] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [songStep, setSongStep] = useState(0);
  const [playedCount, setPlayedCount] = useState(0);

  // Web Audio synth for real piano pitch
  const playTone = (freq) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.85);
    } catch (_) {}
  };

  const handleKeyPress = (index) => {
    const k = PIANO_KEYS[index];
    setActiveKey(index);
    playTone(k.freq);
    triggerHaptic(15);
    setPlayedCount((prev) => prev + 1);

    // Floating note effect
    const newNote = {
      id: Date.now() + Math.random(),
      symbol: ['🎵', '🎶', '🎼', '✨', '💖'][Math.floor(Math.random() * 5)],
      left: `${10 + index * 11}%`,
    };
    setFloatingNotes((prev) => [...prev.slice(-8), newNote]);

    setTimeout(() => setActiveKey(null), 250);

    // Check songbook progress
    if (selectedSong) {
      if (k.key === PIANO_KEYS[selectedSong.notes[songStep]].key) {
        const nextStep = songStep + 1;
        if (nextStep >= selectedSong.notes.length) {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          setSongStep(0);
        } else {
          setSongStep(nextStep);
        }
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center font-ui relative min-h-[550px]">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-bold text-xs mb-3 shadow-sm">
        <Music className="w-4 h-4 text-purple-600 animate-spin" style={{ animationDuration: '6s' }} />
        <span>Interactive Heart Piano Keyboard 🎹</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2 drop-shadow-sm">
        {nepaliTitle}
      </h1>
      <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">{title}</h2>
      <p className="text-gray-600 text-xs sm:text-sm max-w-lg mx-auto mb-6">
        {nepaliSubtitle} — {subtitle}
      </p>

      {/* Songbook Mode Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-pink-500" /> Song Guide:
        </span>
        {SONGS.map((song, sIdx) => {
          const isActive = selectedSong?.title === song.title;
          return (
            <button
              key={sIdx}
              onClick={() => {
                setSelectedSong(isActive ? null : song);
                setSongStep(0);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-md scale-105'
                  : 'bg-white text-gray-700 border-pink-200 hover:bg-pink-50'
              }`}
            >
              {song.title}
            </button>
          );
        })}
        {selectedSong && (
          <button
            onClick={() => {
              setSelectedSong(null);
              setSongStep(0);
            }}
            className="p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 text-xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Song Guide Target Hint */}
      {selectedSong && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-pink-50 border border-pink-200 p-3 rounded-2xl max-w-md mx-auto flex items-center justify-between text-xs"
        >
          <span className="font-bold text-pink-700">Next Note to Play:</span>
          <span className="bg-rose-500 text-white px-3 py-1 rounded-full font-mono font-bold animate-pulse">
            Key {PIANO_KEYS[selectedSong.notes[songStep]].key}
          </span>
          <span className="text-gray-400 text-[11px]">
            {songStep + 1} / {selectedSong.notes.length}
          </span>
        </motion.div>
      )}

      {/* Floating Notes Animation Container */}
      <div className="relative h-24 max-w-lg mx-auto overflow-hidden pointer-events-none mb-2">
        <AnimatePresence>
          {floatingNotes.map((note) => (
            <motion.span
              key={note.id}
              initial={{ opacity: 1, y: 40, scale: 0.8 }}
              animate={{ opacity: 0, y: -40, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute text-2xl"
              style={{ left: note.left }}
            >
              {note.symbol}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* 8-Key Piano Keyboard */}
      <div className="flex justify-center gap-1.5 sm:gap-2 max-w-xl mx-auto mb-6 p-4 rounded-3xl bg-slate-900 border-4 border-pink-300 shadow-2xl relative">
        {PIANO_KEYS.map((k, i) => {
          const isTarget = selectedSong && selectedSong.notes[songStep] === i;
          const isActive = activeKey === i;
          return (
            <motion.button
              key={i}
              whileTap={{ y: 12, scaleY: 0.95 }}
              onClick={() => handleKeyPress(i)}
              className={`w-11 sm:w-14 h-48 rounded-b-2xl shadow-xl flex flex-col items-center justify-end pb-4 font-bold text-xs sm:text-sm font-mono cursor-pointer relative overflow-hidden transition-all border-2 ${
                isTarget
                  ? 'border-amber-400 bg-amber-100 text-amber-900 ring-4 ring-amber-400/50 animate-bounce'
                  : isActive
                  ? 'bg-pink-300 border-white text-white'
                  : 'bg-white hover:bg-pink-50 text-gray-800 border-gray-200'
              }`}
            >
              {/* Key gradient strip */}
              <div className={`w-full h-3 bg-gradient-to-r ${k.color} absolute top-0 left-0`} />

              <span className="text-lg mb-1">{isTarget ? '✨' : '💖'}</span>
              <span className="font-extrabold text-xs text-rose-600">{k.note}</span>
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-gray-400">
        Notes Played: <span className="font-bold text-pink-600">{playedCount}</span> • Real Web Audio Synthesizer 🎵
      </p>
    </div>
  );
}
