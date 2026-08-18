import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function LoveCoronationCeremony() {
  const { triggerHaptic } = useAppStore();

  const [crowned, setCrowned] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCrowning = () => {
    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120, 160, 200]);
    setCrowned(true);
    confetti({
      particleCount: 250,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FF85A1', '#FF006E', '#FFFFFF']
    });
  };

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    setCrowned(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `👑 ALL HAIL QUEEN SANZU! 👑\n\nCrowned Queen Sanzu as the absolute ruler of Abu's heart forever!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Royal Coronation Ceremony 👑✨"
      badgeIcon={<Crown className="w-3.5 h-3.5 text-amber-400" />}
      title={"Shree 5 Rani Sanzu Rawal Ko Coronation 👑"}
      subtitle={"Grand Coronation of Queen Sanzu Rawal"}
      description={"Crown Queen Sanzu as the absolute ruler of Abu's heart forever!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CROWNING STAGE CARD */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame with Crown Placement */}
          <div className="relative w-full h-56 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl bg-black/40">
            <AnimatePresence>
              {crowned ? (
                <motion.div
                  initial={{ y: -60, scale: 1.5, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 120 }}
                  className="absolute top-1 left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_0_20px_rgba(255,215,0,0.9)]"
                >
                  <Crown className="w-16 h-16 text-amber-300 fill-amber-400" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none opacity-80"
                >
                  <Crown className="w-12 h-12 text-amber-400/80" />
                </motion.div>
              )}
            </AnimatePresence>

            <img
              src={currentPhoto}
              alt="Queen Sanzu"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-amber-300 mb-1">
              {crowned ? '👑 OFFICIAL QUEEN SANZU RAWAL 👑' : 'Princess Sanzu Rawal (Bebo)'}
            </h3>
            <p className="text-xs text-gray-300 italic">
              {crowned
                ? '"All hail Queen Sanzu! Forever crowned in Abu\'s heart & soul!" 💕'
                : 'Click below to place the golden royal crown on Bebo!'}
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!crowned ? (
            <button
              type="button"
              onClick={handleCrowning}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Crown className="w-4 h-4 fill-slate-950" />
              <span>Place Royal Crown 👑</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextPhoto}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Crown Next Photo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Coronation</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
