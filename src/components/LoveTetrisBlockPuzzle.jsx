import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Grid, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const BLOCKS = [
  { block: "Block #1: Eternal Devotion 🧱", desc: "Solid rock foundation of Abu & Queen Sanzu's love!" },
  { block: "Block #2: Long-Distance Bridge ✈️", desc: "Connecting Nepalgunj & Sakai, Osaka across 4,500 miles!" },
  { block: "Block #3: Marriage & Home 💍", desc: "Everlasting promise to build our future dream home!" }
];

export default function LoveTetrisBlockPuzzle() {
  const { triggerHaptic } = useAppStore();

  const [blkIdx, setBlkIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentBlock = BLOCKS[blkIdx % BLOCKS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleStackBlock = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setBlkIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧱 LOVE TETRIS BLOCK PUZZLE 🧱\n\n[${currentBlock.block}]\n"${currentBlock.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Tetris Block Puzzle 🧱✨"
      badgeIcon={<Grid className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Tetris Block Puzzle"}
      subtitle={"Stack Romantic Love Blocks for Queen Sanzu"}
      description={"Stack romantic tetris love blocks to build an unbreakable relationship foundation and unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* BLOCK CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={blkIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Block Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-pink-900/80 px-3 py-1 rounded-lg text-xs font-mono text-pink-200 border border-white/20 font-bold">
                🧱 Block #{blkIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-pink-300 uppercase tracking-wider mb-1">
                {currentBlock.block}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentBlock.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* BLOCK BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {BLOCKS.map((b, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleStackBlock(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                blkIdx === idx
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-pink-200 border-pink-500/40 hover:border-pink-400'
              }`}
            >
              🧱 Block #{idx + 1}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Block Foundation</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
