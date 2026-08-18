import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Activity, Fingerprint, Sparkles, CheckCircle2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function LoveCalculator() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveCalculator;
  const { triggerHaptic } = useAppStore();

  const [touchSanzu, setTouchSanzu] = useState(false);
  const [touchBebo, setTouchBebo] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleStartScan = () => {
    if (scanning || scanResult) return;
    setScanning(true);
    setTouchSanzu(true);
    setTouchBebo(true);
    playSparkle();
    triggerHaptic([40, 80, 40, 80, 120]);

    let pulseCount = 0;
    const interval = setInterval(() => {
      playPop();
      pulseCount++;
      if (pulseCount > 8) {
        clearInterval(interval);
        setScanning(false);
        setScanResult({
          matchScore: 100,
          romance: '100% Eternal',
          loyalty: '100% Supreme',
          cuteness: '1000% Overload',
          verdict: 'Cosmic Soulmates Confirmed for Eternity! 💕👑',
        });
        playSparkle();
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
      }
    }, 300);
  };

  const handleReset = () => {
    setTouchSanzu(false);
    setTouchBebo(false);
    setScanning(false);
    setScanResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center font-ui">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 font-bold text-xs mb-3 shadow-sm">
        <Activity className="w-4 h-4 text-pink-500 animate-pulse" />
        <span>Dual Biometric Pulse Scanner 💓</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2">
        {nepaliTitle}
      </h1>
      <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">{title}</h2>
      <p className="text-gray-600 text-xs sm:text-sm max-w-lg mx-auto mb-8">
        {nepaliSubtitle} — {subtitle}
      </p>

      {/* Dual Fingerprint Scanner Pads */}
      <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl mb-8 relative overflow-hidden text-white">
        {/* Laser beam scan overlay */}
        {scanning && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 220 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 shadow-[0_0_15px_#ec4899] z-20 pointer-events-none"
          />
        )}

        <div className="flex justify-around items-center mb-6">
          {/* Sanzu Fingerprint Pad */}
          <div className="flex flex-col items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTouchSanzu(!touchSanzu)}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                touchSanzu
                  ? 'border-pink-500 bg-pink-900/40 text-pink-400 shadow-[0_0_20px_#ec4899]'
                  : 'border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-500'
              }`}
            >
              <Fingerprint className={`w-14 h-14 ${touchSanzu ? 'animate-pulse' : ''}`} />
              <span className="text-[11px] font-bold uppercase tracking-wider mt-1">
                {touchSanzu ? 'Touch Ready' : 'Sanzu Pad'}
              </span>
            </motion.button>
            <span className="text-xs font-extrabold font-nepali text-pink-300">Sanzu 💕</span>
          </div>

          <Heart className={`w-8 h-8 text-rose-500 fill-rose-500 ${scanning ? 'animate-ping' : ''}`} />

          {/* Partner Fingerprint Pad */}
          <div className="flex flex-col items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTouchBebo(!touchBebo)}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
                touchBebo
                  ? 'border-pink-500 bg-pink-900/40 text-pink-400 shadow-[0_0_20px_#ec4899]'
                  : 'border-slate-700 bg-slate-900 text-slate-500 hover:border-slate-500'
              }`}
            >
              <Fingerprint className={`w-14 h-14 ${touchBebo ? 'animate-pulse' : ''}`} />
              <span className="text-[11px] font-bold uppercase tracking-wider mt-1">
                {touchBebo ? 'Touch Ready' : 'Bebo Pad'}
              </span>
            </motion.button>
            <span className="text-xs font-extrabold font-nepali text-pink-300">Partner 💖</span>
          </div>
        </div>

        {/* Scan Button */}
        <button
          onClick={handleStartScan}
          disabled={scanning || !!scanResult}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 font-bold text-xs shadow-lg hover:scale-102 transition-transform cursor-pointer disabled:opacity-50"
        >
          {scanning ? 'Syncing Heartbeats... 💓' : scanResult ? 'Scan Complete! ✅' : 'Hold Pads & Scan Match 💓'}
        </button>
      </div>

      {/* Result Cards & Detailed Breakdown */}
      <AnimatePresence>
        {scanResult && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl max-w-md mx-auto text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold mb-3">
              <CheckCircle2 className="w-4 h-4" /> 100% Certified Match
            </div>

            <h3 className="text-4xl font-extrabold text-rose-600 font-ui mb-1">
              {scanResult.matchScore}% MATCH! 💕
            </h3>
            <p className="text-sm font-bold text-gray-800 font-nepali mb-4">
              "{scanResult.verdict}"
            </p>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-ui bg-pink-50 p-3 rounded-2xl border border-pink-100 mb-4">
              <div>
                <span className="block text-[11px] text-gray-500">Romance</span>
                <span className="font-extrabold text-rose-600">{scanResult.romance}</span>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500">Loyalty</span>
                <span className="font-extrabold text-purple-600">{scanResult.loyalty}</span>
              </div>
              <div>
                <span className="block text-[11px] text-gray-500">Cuteness</span>
                <span className="font-extrabold text-pink-600">{scanResult.cuteness}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-pink-500 font-bold hover:underline cursor-pointer"
            >
              Scan Again 🔄
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
