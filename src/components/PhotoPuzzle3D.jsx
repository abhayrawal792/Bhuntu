import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Puzzle,
  RotateCcw,
  Sparkles,
  Share2,
  RefreshCw
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SOLVED = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function PhotoPuzzle3D() {
  const { triggerHaptic } = useAppStore();

  const [board, setBoard] = useState([0, 1, 2, 3, 4, 5, 6, 8, 7]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [isSolved, setIsSolved] = useState(false);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
    setBoard([0, 1, 2, 3, 4, 5, 6, 8, 7]);
    setIsSolved(false);
  };

  const moveTile = (idx) => {
    if (isSolved) return;

    const emptyIdx = board.indexOf(8); // 8 is empty tile
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const emptyRow = Math.floor(emptyIdx / 3);
    const emptyCol = emptyIdx % 3;

    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
    if (!isAdjacent) return;

    playPop();
    triggerHaptic(10);

    const next = [...board];
    [next[emptyIdx], next[idx]] = [next[idx], next[emptyIdx]];
    setBoard(next);

    if (JSON.stringify(next) === JSON.stringify(SOLVED)) {
      setIsSolved(true);
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90, 150]);
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧩 ROMANTIC PHOTO SLIDER PUZZLE 🧩\n\nI solved the photo puzzle of Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Romantic Photo Slider Puzzle 🧩✨"
      badgeIcon={<Puzzle className="w-3.5 h-3.5 text-pink-400" />}
      title={"रोमान्तिक फोटो पजल"}
      subtitle={"Slide Tiles to Uncover Sanzu's Photo"}
      description={"Tap adjacent tiles to slide them into the empty space and complete Sanzu's secret memory photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PUZZLE BOARD */}
        <div className="relative max-w-xs mx-auto aspect-square rounded-3xl p-3 bg-slate-950 border-4 border-pink-400/60 shadow-2xl overflow-hidden mb-6">
          <div className="w-full h-full grid grid-cols-3 gap-1 relative">
            {board.map((tileVal, idx) => {
              if (tileVal === 8 && !isSolved) {
                return (
                  <div
                    key={idx}
                    className="w-full h-full rounded-2xl bg-black/80 border-2 border-dashed border-pink-400/40 flex items-center justify-center text-xs font-mono text-pink-300 font-bold"
                  >
                    EMPTY
                  </div>
                );
              }

              // Original row & col for slice
              const origRow = Math.floor(tileVal / 3);
              const origCol = tileVal % 3;

              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => moveTile(idx)}
                  className="w-full h-full rounded-2xl overflow-hidden border-2 border-white/60 shadow-md relative cursor-pointer group"
                >
                  <div
                    className="w-full h-full bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url(${currentPhoto})`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${origCol * 50}% ${origRow * 50}%`
                    }}
                  />
                  <div className="absolute top-1 left-1 bg-black/60 text-white font-mono text-[9px] px-1.5 py-0.5 rounded font-bold">
                    #{tileVal + 1}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* SOLVED BANNER */}
        {isSolved && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-sm shadow-xl max-w-xs mx-auto mb-6"
          >
            🎉 PUZZLE SOLVED! QUEEN SANZU IS PERFECT! 🎉
          </motion.div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPhoto}
            className="flex-1 py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Random Next Photo</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Solved</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
