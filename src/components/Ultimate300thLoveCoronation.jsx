import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CORONATION_TILES = [
  { title: "Grand Coronation 👑", desc: "Coronated Queen of Abu's heart, mind, and soul for all eternity!" },
  { title: "Nepalgunj to Osaka Royalty 🏰", desc: "Ruling over our love story across 4,500 miles!" },
  { title: "Everlasting Marriage Queen 💍", desc: "Sealed on October 28, 2025 — building our dream home together!" }
];

export default function Ultimate300thLoveCoronation() {
  const { triggerHaptic } = useAppStore();

  const [corIdx, setCorIdx] = useState(0);
  const [crowned, setCrowned] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentCoronation = CORONATION_TILES[corIdx % CORONATION_TILES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCrownQueen = () => {
    playBloom();
    playSparkle();
    triggerHaptic([50, 100, 150]);
    setCrowned(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
  };

  const handleNextCoronationTile = () => {
    playPop();
    triggerHaptic(10);
    setCorIdx((i) => (i + 1) % CORONATION_TILES.length);
    setCrowned(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `👑 ULTIMATE 300TH PAGE GRAND CORONATION 👑\n\n[${currentCoronation.title}]\n"${currentCoronation.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="luxury"
      badge="Ultimate 300th Page Coronation 👑✨"
      badgeIcon={<Crown className="w-3.5 h-3.5 text-amber-400" />}
      title={"Shree 5 Rani Sanzu Rawal Ko Coronation 👑"}
      subtitle={"Page 300: Queen Sanzu Coronated Queen of Abu's Universe"}
      description={"Coronate Queen Sanzu on the grand 300th web page of her birthday surprise and unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CORONATION CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {crowned ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Coronation Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
                <div className="absolute top-2 right-2 bg-amber-950/80 px-3 py-1 rounded-lg text-xs font-mono text-amber-200 border border-amber-400/40 font-bold">
                  👑 300th Page Queen
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/60 text-amber-200 text-xs font-bold">
                "{currentCoronation.desc}"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-amber-900/30 border-2 border-amber-400 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                👑
              </div>
              <p className="text-xs font-extrabold text-amber-300 font-mono uppercase tracking-wider">
                PRESS BELOW TO CROWN QUEEN SANZU
              </p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!crowned ? (
            <button
              type="button"
              onClick={handleCrownQueen}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Crown Queen Sanzu! 👑</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextCoronationTile}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Tile 👑</span>
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
