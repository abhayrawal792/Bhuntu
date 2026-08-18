import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Radio, Sparkles, Share2, Volume2, Disc, Play, Pause, FastForward } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STATIONS = [
  { freq: 88.5, name: '88.5 FM — Bebo Lullaby Radio 📻', track: 'Soft Midnight Violin & Rain Sounds', DJ: 'DJ Abu Live' },
  { freq: 94.2, name: '94.2 FM — Nepalgunj ↔ Osaka Beats ✈️', track: 'Long Distance Soulmate Acoustic Jam', DJ: 'DJ Bebo Live' },
  { freq: 101.5, name: '101.5 FM — Queen Sanzu Hits 🎂', track: 'Birthday Celebration Dance Mix', DJ: 'Cupid Radio' },
  { freq: 107.9, name: '107.9 FM — Marriage Vow Serenade 💍', track: 'Forever & Always Romantic Symphony', DJ: 'DJ Abu & Bebo' }
];

export default function CupidRadioDJStation() {
  const { triggerHaptic } = useAppStore();

  const [freq, setFreq] = useState(94.2);
  const [isPlaying, setIsPlaying] = useState(true);
  const [bassBoost, setBassBoost] = useState(true);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  // Find nearest station
  const currentStation = STATIONS.reduce((prev, curr) =>
    Math.abs(curr.freq - freq) < Math.abs(prev.freq - freq) ? curr : prev
  );

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleTuneFreq = (newFreq) => {
    playPop();
    triggerHaptic(10);
    setFreq(newFreq);

    if (STATIONS.some(s => s.freq === newFreq)) {
      playBloom();
      playSparkle();
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📻 CUPID RADIO FM TUNER 📻\n\nTuned Frequency: ${freq.toFixed(1)} MHz\nStation: "${currentStation.name}"\nTrack: "${currentStation.track}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Vintage FM Radio Studio 📻✨"
      badgeIcon={<Radio className="w-3.5 h-3.5 text-amber-400" />}
      title={"Cupid FM Radio Tuner"}
      subtitle={"Live Retro Radio Broadcast Console for Queen Sanzu"}
      description={"Slide the analog tuner dial across 88.0 - 108.0 MHz to discover live radio frequencies and broadcast love tracks!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none">
        {/* RETRO VINTAGE RADIO CABINET */}
        <div className="relative rounded-3xl bg-gradient-to-b from-amber-950 via-slate-950 to-stone-950 border-4 border-amber-500/60 shadow-[0_0_50px_rgba(245,158,11,0.25)] p-5 sm:p-6 space-y-6">
          
          {/* TOP DISPLAY PANEL (LED + TUNER DIAL) */}
          <div className="bg-black/90 rounded-2xl border-2 border-amber-400/40 p-4 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-[10px] font-mono font-black text-rose-400 uppercase tracking-widest">
                  LIVE BROADCAST
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-mono font-black text-amber-400 tracking-wider">
                {freq.toFixed(1)} <span className="text-xs text-amber-200">MHz</span>
              </div>
            </div>

            {/* ANALOG TUNER FREQUENCY SCALE BAR */}
            <div className="relative w-full h-8 bg-amber-950/40 border border-amber-500/30 rounded-xl overflow-hidden px-2 flex items-center">
              {/* Frequency tick marks */}
              <div className="w-full flex justify-between text-[9px] font-mono text-amber-300/70 font-bold px-1 z-10">
                <span>88.0</span>
                <span>92.0</span>
                <span>96.0</span>
                <span>100.0</span>
                <span>104.0</span>
                <span>108.0</span>
              </div>

              {/* Red Tuning Needle indicator */}
              <motion.div
                animate={{ left: `${((freq - 88) / 20) * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_12px_#ef4444] z-20"
              />
            </div>

            <p className="text-xs font-bold text-amber-200 text-center truncate">
              {currentStation.name}
            </p>
          </div>

          {/* DUAL DISPLAY: ALBUM / REEL + EQUALIZER & PHOTO SPEAKER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* RETRO SPEAKER & PHOTO FRAME */}
            <div className="relative h-48 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-xl bg-black/60">
              <img
                src={currentPhoto}
                alt="Radio Speaker Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                <span className="text-[10px] font-mono font-bold text-amber-300">
                  NOW PLAYING:
                </span>
                <span className="text-xs font-black text-white truncate">
                  "{currentStation.track}"
                </span>
              </div>
            </div>

            {/* ANIMATED CASSETTE REELS & EQUALIZER */}
            <div className="bg-stone-900/90 rounded-2xl border border-amber-500/30 p-4 flex flex-col justify-between items-center text-center space-y-3">
              {/* Spinning Reels */}
              <div className="flex items-center gap-6 py-1">
                <Disc className={`w-10 h-10 text-amber-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                <Disc className={`w-10 h-10 text-amber-400 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
              </div>

              {/* Live Dancing Equalizer Bars */}
              <div className="flex items-end justify-center gap-1.5 h-12 w-full px-4">
                {[60, 100, 40, 80, 50, 90, 70, 100, 45].map((height, i) => (
                  <div
                    key={i}
                    className={`w-2 rounded-t-sm bg-gradient-to-t from-amber-500 to-rose-400 transition-all duration-200 ${isPlaying ? 'animate-pulse' : 'h-2'}`}
                    style={{
                      height: isPlaying ? `${Math.max(15, (height * Math.random()).toFixed(0))}%` : '8px'
                    }}
                  />
                ))}
              </div>

              <div className="text-[10px] font-mono text-amber-300 font-bold">
                DJ HOST: {currentStation.DJ}
              </div>
            </div>
          </div>

          {/* SLIDER FREQUENCY CONTROLLER */}
          <div className="space-y-2 bg-black/40 p-4 rounded-2xl border border-amber-500/20">
            <div className="flex justify-between text-xs font-bold text-amber-300">
              <span>📻 Tune Frequency Slider:</span>
              <span className="font-mono text-amber-400">{freq.toFixed(1)} MHz</span>
            </div>
            <input
              type="range"
              min="88.0"
              max="108.0"
              step="0.1"
              value={freq}
              onChange={(e) => handleTuneFreq(parseFloat(e.target.value))}
              className="w-full h-3 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* PRESET FREQUENCY BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {STATIONS.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleTuneFreq(s.freq)}
                className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                  Math.abs(freq - s.freq) < 0.2
                    ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md scale-105'
                    : 'bg-stone-900 text-amber-300 border-amber-500/30 hover:border-amber-400'
                }`}
              >
                📻 {s.freq} MHz
              </button>
            ))}
          </div>

          {/* CONTROLS & SHARE */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              type="button"
              onClick={() => setBassBoost(!bassBoost)}
              className={`py-3 px-4 rounded-2xl font-extrabold text-xs shadow-lg cursor-pointer border transition-all ${
                bassBoost
                  ? 'bg-rose-600 text-white border-rose-400'
                  : 'bg-stone-900 text-amber-200 border-amber-500/30'
              }`}
            >
              🔊 Bass Boost {bassBoost ? 'ON' : 'OFF'}
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Radio</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
