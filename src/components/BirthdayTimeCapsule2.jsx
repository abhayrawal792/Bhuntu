import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Hourglass,
  Sparkles,
  Share2,
  RefreshCw,
  Lock,
  Unlock
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function BirthdayTimeCapsule2() {
  const { triggerHaptic } = useAppStore();

  const [unlocked, setUnlocked] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleUnlockCapsule = () => {
    if (unlocked) return;
    playPop();
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setUnlocked(true);
    confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
  };

  const handleNextCapsule = () => {
    playPop();
    triggerHaptic(10);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (nextPhoto === photoIdx) nextPhoto = (nextPhoto + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(nextPhoto);
    setUnlocked(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `⏳ FUTURE BIRTHDAY TIME CAPSULE ⏳\n\nI opened our secret birthday time capsule for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Future Time Capsule ⏳✨"
      badgeIcon={<Hourglass className="w-3.5 h-3.5 text-purple-400" />}
      title={"Future Birthday Time Capsule"}
      subtitle={"Open the Time Sealed Vault for Sanzu"}
      description={"Tap to break the time seal and uncover Sanzu's secret memory photo stored for the future!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* 3D VAULT STAGE */}
        <div
          onClick={handleUnlockCapsule}
          className="relative max-w-xs mx-auto aspect-square rounded-3xl p-5 bg-slate-950 border-4 border-purple-400/60 shadow-2xl overflow-hidden mb-6 flex flex-col items-center justify-center cursor-pointer"
        >
          {!unlocked ? (
            <div className="space-y-3">
              <div className="w-20 h-20 rounded-full bg-purple-900/60 border-2 border-purple-400 mx-auto flex items-center justify-center text-3xl shadow-inner animate-pulse">
                ⏳
              </div>
              <p className="text-xs font-extrabold text-purple-300 font-mono uppercase tracking-wider">
                SEALED FOR SANZU'S BIRTHDAY
              </p>
              <div className="px-4 py-2 rounded-xl bg-purple-600/30 text-purple-200 border border-purple-400/40 text-[11px] font-bold">
                Tap to Break Time Seal ✨
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full h-full relative flex flex-col items-center justify-center space-y-2"
            >
              <div className="w-full h-48 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Capsule Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
              </div>

              <span className="text-[10px] font-mono text-amber-200 bg-black/70 px-3 py-1 rounded-full border border-white/20 font-bold">
                Future Memory Photo Unlocked! ⏳📸
              </span>
            </motion.div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!unlocked ? (
            <button
              type="button"
              onClick={handleUnlockCapsule}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Unlock className="w-4 h-4" />
              <span>Break Time Seal</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextCapsule}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Random Photo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Capsule</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
