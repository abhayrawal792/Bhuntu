import WorldShell from './WorldShell';
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Radio, Share2, Volume2, Zap } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STATIONS = [
  { freq: 88.5,  name: "Nepalgunj Beats FM", flag: "🇳🇵", msg: "Playing live love tunes across Nepalgunj to Osaka...", color: '#60a5fa', signal: 3 },
  { freq: 94.2,  name: "Osaka Sunset Chill", flag: "🇯🇵", msg: "Calm melodies for Bebo floating over Sakai bay...", color: '#a78bfa', signal: 2 },
  { freq: 100.4, name: "BEBO LOVE FM", flag: "💖", msg: "SECRET STATION: 'Sanzu, you are my whole heart — forever and ever!'", color: '#f43f5e', signal: 5, secret: true },
  { freq: 106.8, name: "Midnight Romance", flag: "🌙", msg: "Acoustic chords drifting through late-night hours...", color: '#f59e0b', signal: 4 },
];

const MIN_FREQ = 87;
const MAX_FREQ = 108;

// Compute needle angle (in degrees) from freq — maps 87–108 → -65° to +65°
function freqToAngle(freq) {
  const t = (freq - MIN_FREQ) / (MAX_FREQ - MIN_FREQ);
  return -65 + t * 130;
}

function SignalBars({ level, color }) {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {[1, 2, 3, 4, 5].map(n => (
        <motion.div
          key={n}
          animate={{ opacity: n <= level ? 1 : 0.2, scaleY: n <= level ? 1 : 0.4 }}
          className="w-1.5 rounded-sm"
          style={{
            height: `${(n / 5) * 100}%`,
            background: n <= level ? color : '#334155',
            originY: 1,
          }}
        />
      ))}
    </div>
  );
}

export default function LoveFrequencyTuner() {
  const { triggerHaptic } = useAppStore();

  const [freqIdx, setFreqIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [scanning, setScanning] = useState(false);
  const [scanFreq, setScanFreq] = useState(STATIONS[0].freq);
  const scanIntervalRef = useRef(null);

  const station = STATIONS[freqIdx];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const needleAngle = freqToAngle(station.freq);

  const goToStation = (idx) => {
    if (scanning) return;
    playPop();
    triggerHaptic(15);
    setFreqIdx(idx);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    if (STATIONS[idx].secret) {
      setTimeout(() => {
        playBloom();
        playSparkle();
        confetti({ particleCount: 110, spread: 85, origin: { y: 0.45 }, colors: ['#f43f5e', '#ec4899', '#fbbf24', '#ffffff'] });
      }, 400);
    }
  };

  const handleScan = () => {
    if (scanning) {
      clearInterval(scanIntervalRef.current);
      setScanning(false);
      return;
    }
    setScanning(true);
    playPop();
    let currentFreq = MIN_FREQ;
    let stationLanded = false;
    scanIntervalRef.current = setInterval(() => {
      currentFreq += 0.15;
      setScanFreq(parseFloat(currentFreq.toFixed(1)));

      // Check if we hit a station
      const hitIdx = STATIONS.findIndex(s => Math.abs(s.freq - currentFreq) < 0.2);
      if (hitIdx !== -1 && !stationLanded) {
        stationLanded = true;
        clearInterval(scanIntervalRef.current);
        setScanning(false);
        setFreqIdx(hitIdx);
        setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
        if (STATIONS[hitIdx].secret) {
          setTimeout(() => { playBloom(); playSparkle(); confetti({ particleCount: 110, spread: 85, origin: { y: 0.45 } }); }, 200);
        } else {
          playPop();
        }
      }

      if (currentFreq >= MAX_FREQ) {
        clearInterval(scanIntervalRef.current);
        setScanning(false);
      }
    }, 30);
  };

  const handleShare = () => {
    playSparkle();
    const text = `📻 LOVE FREQUENCY TUNER 📻\n\nTuned to: ${station.freq} MHz — ${station.name} ${station.flag}\n"${station.msg}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  const displayFreq = scanning ? scanFreq : station.freq;
  const displayAngle = scanning ? freqToAngle(displayFreq) : needleAngle;

  return (
    <WorldShell
      theme="music"
      badge="Love Frequency Tuner 📻✨"
      badgeIcon={<Radio className="w-3.5 h-3.5 text-amber-400" />}
      title="Love Frequency Tuner"
      subtitle="Tune into 100.4 MHz — BEBO LOVE FM"
      description="Rotate the dial through the airwaves to find the secret love broadcast."
    >
      <div className="max-w-sm mx-auto pb-10 select-none">

        {/* ── Radio Cabinet ──────────────────────────────────── */}
        <div
          className="rounded-3xl border-2 border-stone-600 overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)', boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)' }}
        >
          {/* Cabinet top chrome strip */}
          <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #57534e, #a8a29e, #57534e)' }} />

          {/* Speaker grille */}
          <div className="mx-4 mt-3 flex gap-px h-6 items-stretch opacity-30">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="flex-1 bg-stone-500 rounded-sm" />
            ))}
          </div>

          {/* Screen / Photo window */}
          <div className="mx-4 mt-3 rounded-2xl overflow-hidden border border-stone-700 relative" style={{ height: '155px' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={photoIdx}
                src={currentPhoto}
                alt="Broadcast"
                onError={(e) => handlePhotoError(e, photoIdx)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover object-[center_20%]"
                style={{ filter: scanning ? 'brightness(0.4) saturate(0.2) contrast(1.4)' : 'brightness(0.85) saturate(1.15)' }}
              />
            </AnimatePresence>

            {/* Static noise overlay when scanning */}
            <AnimatePresence>
              {scanning && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 64 64\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.35\'/%3E%3C/svg%3E")',
                  }}
                >
                  <span className="text-white text-xs font-mono font-bold tracking-[0.4em] uppercase drop-shadow">SCANNING...</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Station badge overlay */}
            {!scanning && (
              <motion.div
                key={freqIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-0 inset-x-0 px-3 py-2"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
              >
                <div className="flex items-center gap-1.5">
                  {station.secret && <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }} className="text-red-400 text-[9px] font-mono font-bold uppercase">● ON AIR</motion.span>}
                  <span className="text-xs font-bold text-white">{station.flag} {station.name}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Frequency display */}
          <div className="mx-4 mt-3 bg-black/60 rounded-2xl border border-stone-700 px-4 py-3 flex items-center justify-between">
            <div>
              <motion.span
                key={displayFreq}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-black font-mono tracking-tight"
                style={{ color: scanning ? '#f59e0b' : (station.secret ? '#f43f5e' : station.color), textShadow: `0 0 20px ${station.color}66` }}
              >
                {displayFreq.toFixed(1)}
              </motion.span>
              <span className="text-stone-500 text-sm font-mono ml-1">MHz</span>
            </div>
            <SignalBars level={scanning ? 1 : station.signal} color={station.color} />
          </div>

          {/* ── Dial ──────────────────────────────────────────── */}
          <div className="mx-4 mt-4 mb-2">
            {/* Frequency scale */}
            <div className="relative h-5 mb-1">
              <div className="absolute inset-y-0 inset-x-2 flex items-end justify-between px-0.5">
                {[88, 92, 96, 100, 104, 108].map(f => (
                  <span key={f} className="text-[8px] font-mono text-stone-500">{f}</span>
                ))}
              </div>
            </div>
            {/* Dial track */}
            <div className="relative h-3 rounded-full bg-stone-800 border border-stone-700 mx-2 overflow-hidden">
              {/* Station markers */}
              {STATIONS.map(s => {
                const pct = ((s.freq - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 100;
                return (
                  <div
                    key={s.freq}
                    className="absolute top-0 bottom-0 w-0.5"
                    style={{ left: `${pct}%`, background: s.secret ? '#f43f5e' : s.color, opacity: 0.7 }}
                  />
                );
              })}
              {/* Needle */}
              <motion.div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_4px_white]"
                animate={{ left: `${((displayFreq - MIN_FREQ) / (MAX_FREQ - MIN_FREQ)) * 100}%` }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
              />
            </div>
          </div>

          {/* Station buttons */}
          <div className="mx-4 mb-4 grid grid-cols-4 gap-1.5">
            {STATIONS.map((s, idx) => (
              <motion.button
                key={s.freq}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => goToStation(idx)}
                className={`py-2 rounded-xl text-[9px] font-bold font-mono transition-all cursor-pointer border ${
                  freqIdx === idx
                    ? 'border-current text-white shadow-lg'
                    : 'border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500'
                }`}
                style={{
                  background: freqIdx === idx ? `${s.color}22` : 'transparent',
                  color: freqIdx === idx ? s.color : undefined,
                  boxShadow: freqIdx === idx ? `0 0 12px ${s.color}44` : 'none',
                }}
              >
                <div>{s.flag}</div>
                <div>{s.freq}</div>
              </motion.button>
            ))}
          </div>

          {/* Controls row */}
          <div className="mx-4 mb-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScan}
              className={`flex-1 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border transition-all ${
                scanning
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                  : 'bg-stone-800 border-stone-600 text-stone-300 hover:border-stone-400'
              }`}
            >
              <motion.div
                animate={{ rotate: scanning ? 360 : 0 }}
                transition={{ duration: 0.8, repeat: scanning ? Infinity : 0, ease: 'linear' }}
              >
                <Zap className="w-3.5 h-3.5" />
              </motion.div>
              {scanning ? 'Stop Scan' : 'Auto Scan'}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="flex-1 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Broadcast
            </motion.button>
          </div>

          {/* Station message ticker */}
          <AnimatePresence mode="wait">
            <motion.div
              key={freqIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-t border-stone-800 px-4 py-2.5 flex items-center gap-2 overflow-hidden"
            >
              <Volume2 className="w-3 h-3 flex-shrink-0" style={{ color: station.color }} />
              <div className="overflow-hidden flex-1">
                <motion.p
                  initial={{ x: '100%' }}
                  animate={{ x: '-100%' }}
                  transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
                  className="text-[10px] font-mono whitespace-nowrap"
                  style={{ color: station.color }}
                >
                  {station.msg}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Cabinet bottom chrome */}
          <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #57534e, #a8a29e, #57534e)' }} />
        </div>
      </div>
    </WorldShell>
  );
}
