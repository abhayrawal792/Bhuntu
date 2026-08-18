import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ADJECTIVES = ['Sweetest', 'Most Adorable', 'Royal Queen', 'Cutest', 'Forever'];
const NAMES = ['Bhuntu 💕', 'Bebo ❤️', 'Sanzu Rawal 🌸', 'Fuchee 👑', 'Sanuu 💖'];

export default function CoupleNicknameGenerator() {
  const { triggerHaptic } = useAppStore();

  const [adj, setAdj] = useState(0);
  const [name, setName] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const combinedNickname = `${ADJECTIVES[adj]} ${NAMES[name]}`;

  const spinSlots = () => {
    playPop();
    playBloom();
    triggerHaptic(20);
    setAdj(Math.floor(Math.random() * ADJECTIVES.length));
    setName(Math.floor(Math.random() * NAMES.length));

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎰 CUTE NICKNAME SLOT MACHINE 🎰\n\nGenerated Nickname for Queen Sanzu:\n"${combinedNickname}"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Cute Nickname Slot Machine 🎰✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Cute Nickname Slot Machine"}
      subtitle={"Spin Slots for Custom Pet Nicknames"}
      description={"Spin the slots to discover a custom nickname combination for Bebo and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* SLOT MACHINE & PHOTO DISPLAY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Nickname Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="flex justify-center items-center gap-2 pt-1">
            <motion.div
              key={adj}
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="px-3.5 py-2 rounded-xl bg-pink-900/60 border border-pink-300 font-extrabold text-xs text-pink-200 shadow"
            >
              {ADJECTIVES[adj]}
            </motion.div>
            <span className="text-sm font-bold text-pink-400">+</span>
            <motion.div
              key={name}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="px-3.5 py-2 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow"
            >
              {NAMES[name]}
            </motion.div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={spinSlots}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Spin Slots</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Nickname</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
