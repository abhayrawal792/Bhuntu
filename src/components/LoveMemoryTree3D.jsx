import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { TreePine, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MEMORY_BRANCHES = [
  "Branch 1: The First Confession ✨",
  "Branch 2: Proposal Accepted Day 💍",
  "Branch 3: Everlasting Marriage Promise 🌸"
];

export default function LoveMemoryTree3D() {
  const { triggerHaptic } = useAppStore();

  const [branchIdx, setBranchIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentBranch = MEMORY_BRANCHES[branchIdx % MEMORY_BRANCHES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleGrowBranch = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setBranchIdx((i) => (i + 1) % MEMORY_BRANCHES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌲 3D LOVE MEMORY TREE 🌲\n\nGrew Memory: [${currentBranch}]\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="3D Love Memory Tree 🌲✨"
      badgeIcon={<TreePine className="w-3.5 h-3.5 text-emerald-400" />}
      title={"3D Love Memory Tree"}
      subtitle={"Growing Everlasting Memory Branches for Sanzu"}
      description={"Grow 3D memory branches on the tree of love to unlock secret photo cards for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* TREE CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-emerald-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Tree Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-emerald-900/80 px-3 py-1 rounded-lg text-xs font-mono text-emerald-200 border border-white/20 font-bold">
              🌲 {currentBranch}
            </div>
          </div>
        </div>

        {/* GROW BUTTON */}
        <div className="mb-6 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleGrowBranch}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Grow Memory Branch 🌲</span>
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Memory Tree</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}