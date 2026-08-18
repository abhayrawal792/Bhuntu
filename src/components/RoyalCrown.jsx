import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Crown,
  Sparkles,
  Share2,
  RefreshCw,
  Award
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function RoyalCrown() {
  const { triggerHaptic } = useAppStore();

  const [crowned, setCrowned] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCrown = () => {
    if (crowned) return;
    playPop();
    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120, 180]);
    setCrowned(true);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.4 } });
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
    setCrowned(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `👑 ROYAL CORONATION CEREMONY 👑\n\nQueen Sanzu Rawal was officially coronated as the Ruler of Abu's Heart! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Royal Birthday Coronation 👑✨"
      badgeIcon={<Crown className="w-3.5 h-3.5 text-amber-400" />}
      title={"शाही राज्याभिषेक"}
      subtitle={"Coronate Sanzu as the Royal Queen of Abu's Heart"}
      description={"Tap to perform the royal coronation ceremony and crown Sanzu's portrait with a golden royal tiara!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* GOLDEN ROYAL PORTRAIT FRAME */}
        <div className="max-w-xs mx-auto p-6 rounded-3xl bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 border-4 border-white shadow-2xl flex flex-col items-center justify-center mb-6 relative overflow-hidden">
          {/* Animated Descending Golden Crown */}
          {crowned && (
            <motion.div
              initial={{ y: -120, scale: 2, rotate: -15 }}
              animate={{ y: -10, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 10 }}
              className="text-6xl z-20 absolute top-4 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
            >
              👑
            </motion.div>
          )}

          {/* Sanzu's Portrait Photo */}
          <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl relative overflow-hidden bg-black/40 mt-6 mb-3">
            <img
              src={currentPhoto}
              alt="Royal Queen"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </div>

          <p className="text-xl font-extrabold text-amber-950 font-nepali">
            {crowned ? 'QUEEN SANZU RAWAL 👑' : 'Princess Sanzu'}
          </p>
          <span className="text-[10px] font-mono text-amber-900 font-bold">RULER OF ABU'S HEART • SINCE 2025</span>
        </div>

        {/* CORONATED BANNER */}
        {crowned && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-extrabold text-sm shadow-xl max-w-xs mx-auto mb-6 font-nepali border-2 border-white"
          >
            ✨ ALL HAIL QUEEN SANZU! THE UNQUESTIONED RULER OF MY HEART! ✨
          </motion.div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!crowned ? (
            <button
              type="button"
              onClick={handleCrown}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Crown className="w-4 h-4" />
              <span>Coronate Queen</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
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
            <span>Share Royal Decree</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
