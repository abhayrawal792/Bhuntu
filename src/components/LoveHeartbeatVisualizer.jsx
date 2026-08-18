import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, Activity, Volume2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function LoveHeartbeatVisualizer() {
  const { triggerHaptic } = useAppStore();

  const [bpm, setBpm] = useState(88);
  const [pulse, setPulse] = useState(false);
  const [tapHistory, setTapHistory] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  useEffect(() => {
    const intervalMs = (60 / bpm) * 1000;
    const timer = setInterval(() => {
      setPulse(p => !p);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [bpm]);

  const handleHeartTap = () => {
    playPop();
    triggerHaptic(15);
    const now = Date.now();
    const newTaps = [...tapHistory, now].filter(t => now - t < 4000).slice(-5);
    setTapHistory(newTaps);

    if (newTaps.length > 1) {
      const intervals = newTaps.slice(1).map((t, i) => t - newTaps[i]);
      const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.min(180, Math.max(50, Math.round(60000 / avg)));
      setBpm(calculatedBpm);
    }

    if (newTaps.length >= 4) {
      playBloom();
      playSparkle();
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💓 MEDICAL ECG HEARTBEAT MONITOR 💓\n\nPatient: Queen Sanzu\nAbu's Heartbeat Pulse Rate: ${bpm} BPM!\nDiagnosed Status: 100% In Love Forever!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="ECG Heartbeat Monitor 💓✨"
      badgeIcon={<Activity className="w-3.5 h-3.5 text-rose-500" />}
      title={"ECG Heartbeat Monitor"}
      subtitle={"Real Medical Heart Rate Diagnostic Console"}
      description={"Tap the pulsing heart to sync Abu's heartbeat rate to Sanzu's presence and monitor live ECG pulses!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* ECG MEDICAL CONSOLE CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-emerald-500/70 shadow-[0_0_50px_rgba(16,185,129,0.25)] p-5 sm:p-6 space-y-6">
          
          {/* MEDICAL MONITOR DISPLAY HEADER */}
          <div className="flex items-center justify-between bg-emerald-950/40 p-3 rounded-2xl border border-emerald-400/40 text-xs font-mono font-bold text-emerald-300">
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              PATIENT: SANZU 👑
            </span>
            <span className="text-amber-300 text-sm font-extrabold">{bpm} BPM</span>
          </div>

          {/* GREEN CRT OSCILLOSCOPE WAVE DISPLAY */}
          <div className="relative w-full h-44 rounded-2xl bg-slate-950 border-2 border-emerald-400/50 p-4 shadow-inner flex items-center justify-center overflow-hidden">
            {/* Grid overlay background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, #10b981 1px, transparent 1px), linear-gradient(to bottom, #10b981 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}
            />

            {/* LIVE ECG PULSE LINE */}
            <svg className="w-full h-28 z-10">
              <motion.path
                d="M 0 50 Q 30 50, 60 50 L 70 20 L 80 80 L 90 10 L 100 50 Q 150 50, 200 50 L 210 20 L 220 80 L 230 10 L 240 50 Q 300 50, 350 50"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                animate={{ strokeDashoffset: pulse ? [0, -100] : [0, 0] }}
                transition={{ duration: 0.4 }}
                className="filter drop-shadow-[0_0_8px_#10b981]"
              />
            </svg>
          </div>

          {/* PULSING HEART TAP BUTTON & PATIENT PHOTO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* PULSING HEART BUTTON */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              animate={{ scale: pulse ? 1.15 : 1 }}
              transition={{ duration: 0.15 }}
              onClick={handleHeartTap}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 border-4 border-rose-300 flex flex-col items-center justify-center cursor-pointer shadow-[0_0_30px_#f43f5e] mx-auto"
            >
              <Heart className="w-12 h-12 fill-white text-white drop-shadow" />
              <span className="text-[10px] font-mono font-black text-white mt-1 uppercase">TAP TO SYNC</span>
            </motion.button>

            {/* PATIENT PHOTO FRAME */}
            <div className="w-full h-36 rounded-2xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
              <img
                src={currentPhoto}
                alt="Heartbeat Patient Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute bottom-1 inset-x-1 bg-black/80 text-[9px] font-mono font-bold text-emerald-300 text-center py-0.5 rounded">
                DIAGNOSIS: ETERNAL LOVE 💕
              </div>
            </div>
          </div>

          {/* BPM SLIDER CONTROL */}
          <div className="bg-stone-900/90 p-3 rounded-2xl border border-stone-800 space-y-1">
            <div className="flex justify-between text-xs font-mono font-bold text-emerald-300">
              <span>PULSE SPEED:</span>
              <span>{bpm} BEATS/MIN</span>
            </div>
            <input
              type="range"
              min="50"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share ECG Heartbeat</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
