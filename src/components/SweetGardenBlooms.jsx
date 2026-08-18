import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Flower2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function SweetGardenBlooms() {
  const { triggerHaptic } = useAppStore();

  const [paintedCount, setPaintedCount] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePaintArch = () => {
    playPop();
    triggerHaptic(15);
    if (paintedCount < COLORS.length) {
      const next = paintedCount + 1;
      setPaintedCount(next);
      if (next === COLORS.length) {
        playBloom();
        playSparkle();
        triggerHaptic([40, 80, 120]);
        let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
        setPhotoIdx(nextPhoto);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      }
    }
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setPaintedCount(0);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌸 SWEET GARDEN BLOOMS & RAINBOW BRIDGE 🌸\n\nCompleted Rainbow Promise Bridge between Nepalgunj & Osaka for Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Rainbow Promise Bridge 🌈✨"
      badgeIcon={<Flower2 className="w-3.5 h-3.5 text-pink-400" />}
      title={"Rainbow Promise Bridge"}
      subtitle={"Connect Nepalgunj 🇳🇵 & Osaka 🇯🇵 with Rainbows"}
      description={"Paint colorful rainbow arches across oceans to connect Abu & Sanzu and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* BRIDGE CANVAS & PHOTO REVEAL */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {paintedCount === COLORS.length ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Garden Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-pink-500/20 border border-pink-300/60 text-pink-200 text-xs font-bold">
                "Rainbow Bridge Complete! Two hearts connected forever 💕"
              </div>
            </motion.div>
          ) : (
            <div className="py-6 space-y-3 w-full">
              <div className="flex justify-between w-full px-4 text-xs font-bold text-pink-300">
                <span>📍 Nepalgunj 🇳🇵</span>
                <span>Osaka 🇯🇵 📍</span>
              </div>
              <div className="w-full h-32 border-2 border-dashed border-pink-400/40 rounded-2xl flex items-center justify-center">
                <span className="text-xs font-mono text-pink-200">
                  Arches Painted: {paintedCount} / {COLORS.length}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {paintedCount < COLORS.length ? (
            <button
              type="button"
              onClick={handlePaintArch}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Paint Rainbow Arch ({paintedCount}/{COLORS.length})</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Paint Again</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Bridge</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
