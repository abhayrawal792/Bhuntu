import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Compass, Heart, MapPin, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const DISTANCE_KM = 4650;
const DISTANCE_MILES = 2889;

const ROMANTIC_QUOTES = [
  "No matter where you are, my heart's compass always points to you, Bebo 💕",
  "4,650 km apart — but our hearts beat as one 💓",
  "From Nepalgunj to Osaka — love knows no borders 🌏",
  "Even GPS can't calculate how close you are to my heart ❤️",
  "The shortest distance between us? Our love 💗",
  "North, South, East, West — my heart only goes YOUR-est! 🧭",
  "You are my true north — forever and always, Bhuntu 🌟",
  "Across every ocean, through every timezone — I'm yours 🌊"
];

export default function LoveCompass() {
  const { triggerHaptic } = useAppStore();

  const [angle, setAngle] = useState(45);
  const [spinning, setSpinning] = useState(false);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleRotate = () => {
    if (spinning) return;
    playPop();
    triggerHaptic([15, 30, 15]);
    setSpinning(true);

    const fullSpins = (2 + Math.random()) * 360;
    const targetAngle = angle + fullSpins;
    setAngle(targetAngle);
    setSpinCount((p) => p + 1);

    setTimeout(() => {
      setSpinning(false);
      setQuoteIdx((prev) => (prev + 1) % ROMANTIC_QUOTES.length);
      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);
      playBloom();
      playSparkle();
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }, 1800);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧭 HEART COMPASS 🧭\n\nDistance: 4,650 km (Nepalgunj ↔ Osaka)\n"${ROMANTIC_QUOTES[quoteIdx]}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Heart Compass 🧭✨"
      badgeIcon={<Compass className="w-3.5 h-3.5 text-pink-400" />}
      title={"Heart Compass"}
      subtitle={"Always Points to Sanzu's Heart"}
      description={"No matter where you are on Earth, this compass always points straight to Sanzu's heart!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* DISTANCE BADGES */}
        <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-gray-700">Nepalgunj 🇳🇵</span>
          </div>
          <span className="text-lg animate-bounce">✈️</span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm text-xs font-bold">
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-gray-700">Osaka 🇯🇵</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6 text-[11px] font-bold">
          <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
            🛤️ {DISTANCE_KM.toLocaleString()} km
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700">
            🌏 {DISTANCE_MILES.toLocaleString()} miles
          </span>
          <span className="px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700">
            💓 0 km in heart
          </span>
        </div>

        {/* 3D COMPASS WITH PHOTO CENTERPIECE */}
        <div
          onClick={handleRotate}
          className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-full flex items-center justify-center cursor-pointer mb-6 border-4 border-amber-300 shadow-2xl overflow-hidden bg-slate-950"
        >
          {/* Photo Centerpiece */}
          <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-white shadow-xl relative bg-black/40 z-10">
            <img
              src={currentPhoto}
              alt="Compass Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
          </div>

          {/* Compass Needle */}
          <motion.div
            animate={{ rotate: angle }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
          >
            <div className="w-2 h-28 bg-gradient-to-t from-pink-500 via-rose-500 to-amber-300 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.9)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">❤️</div>
            </div>
          </motion.div>
        </div>

        {/* ROMANTIC QUOTE BANNER */}
        <div className="p-4 rounded-2xl bg-white border-2 border-pink-200 shadow-lg max-w-md mx-auto mb-6">
          <p className="text-xs text-rose-600 font-bold leading-relaxed">
            "{ROMANTIC_QUOTES[quoteIdx]}"
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleRotate}
            disabled={spinning}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${spinning ? 'animate-spin' : ''}`} />
            <span>Spin Compass</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Compass</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
