import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Moon } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const HOROSCOPES = [
  { sign: "Leo ♌ & Virgo ♍ Harmony", prediction: "Venus shines brightly today! A surprise message from Abu will bring the biggest smile to Sanzu's face." },
  { sign: "Nepalgunj ↔ Osaka Cosmic Alignment 🌌", prediction: "The stars align to shorten the distance! Expect warmth, sweet chuckles, and happy news today." },
  { sign: "Eternal Soulmate Transit ✨", prediction: "Your heartbeats are synchronized across 4,650 km. Pure love and blessings envelope Queen Sanzu today!" }
];

export default function CoupleDailyHoroscope() {
  const { triggerHaptic } = useAppStore();

  const [horoIdx, setHoroIdx] = useState(0);
  const [read, setRead] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentHoro = HOROSCOPES[horoIdx % HOROSCOPES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleReadHoroscope = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setRead(true);
    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleNextHoroscope = () => {
    playPop();
    triggerHaptic(10);
    setHoroIdx((prev) => (prev + 1) % HOROSCOPES.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    setRead(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔮 COSMIC DAILY HOROSCOPE 🔮\n\nSign: ${currentHoro.sign}\n"${currentHoro.prediction}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Cosmic Daily Horoscope 🔮✨"
      badgeIcon={<Moon className="w-3.5 h-3.5 text-purple-300" />}
      title={"Cosmic Daily Horoscope"}
      subtitle={"Star Predictions for Sanzu & Abu"}
      description={"Read daily celestial horoscope predictions and unlock secret memory photo projections!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* HOROSCOPE CRYSTAL BALL CANVAS */}
        <div
          onClick={handleReadHoroscope}
          className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-400/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center cursor-pointer overflow-hidden"
        >
          {!read ? (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-purple-900/40 border-2 border-purple-300 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                🔮
              </div>
              <p className="text-xs font-extrabold text-purple-300 font-mono uppercase tracking-wider">
                CELESTIAL CRYSTAL BALL
              </p>
              <div className="px-4 py-2 rounded-xl bg-purple-600/30 text-purple-200 border border-purple-400/40 text-xs font-bold inline-block">
                Tap to Read Horoscope ✨
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-3"
            >
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Horoscope Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-600/30 border border-purple-400/60 text-purple-200 text-xs font-bold leading-relaxed">
                <span className="block font-extrabold text-amber-300 mb-1">{currentHoro.sign}</span>
                "{currentHoro.prediction}"
              </div>
            </motion.div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!read ? (
            <button
              type="button"
              onClick={handleReadHoroscope}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Read Horoscope</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextHoroscope}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Horoscope</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Reading</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
