import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const METEOR_WISHES = [
  "Wish #1: Sanzu's happiness & peaceful sleep tonight 🌙",
  "Wish #2: Quick passing of distance between Nepal & Japan ✈️",
  "Wish #3: Forever marriage & endless happiness! 💍💖",
  "Wish #4: Infinite hugs, smiles, and laughter together 💕"
];

export default function LoveMeteorShower() {
  const { triggerHaptic } = useAppStore();

  const [catches, setCatches] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentWish = METEOR_WISHES[(catches - 1 + METEOR_WISHES.length) % METEOR_WISHES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCatch = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60]);
    setCatches((c) => c + 1);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌠 SHOOTING STAR METEOR SHOWER 🌠\n\nMeteors Caught: ${catches}\nLatest Wish: "${catches > 0 ? currentWish : METEOR_WISHES[0]}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Shooting Star Meteor Shower ✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Shooting Star Meteor Shower"}
      subtitle={"Catch Falling Meteors for Instant Wishes"}
      description={"Tap the falling meteors on the dark galaxy sky to reveal Sanzu's memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* SKY CANVAS & PHOTO REVEAL */}
        <div
          onClick={handleCatch}
          className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center cursor-pointer overflow-hidden"
        >
          {catches > 0 ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Meteor Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-pink-600/30 border border-pink-400/60 text-pink-200 text-xs font-bold leading-relaxed">
                "{currentWish}"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-pink-900/30 border-2 border-pink-300 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                🌠
              </div>
              <p className="text-xs font-extrabold text-pink-300 font-mono uppercase tracking-wider">
                SHOOTING STAR GALAXY
              </p>
              <div className="px-4 py-2 rounded-xl bg-pink-500/20 text-pink-200 border border-pink-300/40 text-xs font-bold inline-block">
                Tap Sky to Catch Meteor! 🌠
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleCatch}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Catch Meteor ({catches})</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Wishes</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
