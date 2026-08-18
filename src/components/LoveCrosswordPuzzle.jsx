import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Grid, Sparkles, Share2, Check, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

// 5x5 Crossword Grid data
const GRID_CELLS = [
  ['S', 'A', 'K', 'A', 'I'],
  ['A', '#', 'O', '#', 'N'],
  ['N', 'I', 'C', 'K', 'S'],
  ['Z', '#', 'O', '#', 'P'],
  ['U', 'A-[#]', 'S', 'A', 'K']
];

const CLUES = [
  { num: "1 Across", clue: "City in Osaka where Queen Sanzu lives & works 🇯🇵 (SAKAI)" },
  { num: "3 Across", clue: "Endearing nicknames Abu calls his girl 💕 (NICKS)" },
  { num: "1 Down", clue: "The royal name of Abu's wife 👑 (SANZU)" }
];

export default function LoveCrosswordPuzzle() {
  const { triggerHaptic } = useAppStore();

  const [inputs, setInputs] = useState(
    Array(5).fill(null).map(() => Array(5).fill(''))
  );
  const [isSolved, setIsSolved] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCellChange = (r, c, val) => {
    playPop();
    triggerHaptic(10);

    const next = inputs.map(row => [...row]);
    next[r][c] = val.toUpperCase().slice(-1);
    setInputs(next);
  };

  const handleAutoSolve = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);

    setInputs([
      ['S', 'A', 'K', 'A', 'I'],
      ['A', '#', 'O', '#', 'N'],
      ['N', 'I', 'C', 'K', 'S'],
      ['Z', '#', 'O', '#', 'P'],
      ['U', '#', 'S', 'A', 'K']
    ]);
    setIsSolved(true);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 110, spread: 90, origin: { y: 0.5 } });
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setInputs(Array(5).fill(null).map(() => Array(5).fill('')));
    setIsSolved(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧩 INTERACTIVE LOVE CROSSWORD PUZZLE 🧩\n\nCrossword Solved 100%! All relationship clues completed!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Interactive Crossword Grid 🧩✨"
      badgeIcon={<Grid className="w-3.5 h-3.5 text-pink-400" />}
      title={"Interactive Love Crossword Grid"}
      subtitle={"Solve 5x5 Relationship Crossword Grid for Queen Sanzu"}
      description={"Type letters into interactive crossword grid cells to solve relationship clues and unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* CROSSWORD BOARD CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* CLUES BANNER */}
          <div className="bg-pink-950/40 p-4 rounded-2xl border border-pink-400/40 text-left space-y-2">
            <span className="text-[10px] font-mono font-bold text-pink-300 uppercase tracking-wider block">
              🧩 CROSSWORD CLUES:
            </span>
            {CLUES.map((c, i) => (
              <div key={i} className="text-xs font-semibold text-gray-200">
                <span className="text-pink-400 font-bold">{c.num}:</span> {c.clue}
              </div>
            ))}
          </div>

          {/* 5x5 INTERACTIVE GRID */}
          <div className="grid grid-cols-5 gap-1.5 max-w-[260px] mx-auto p-3 bg-stone-900 rounded-2xl border-2 border-pink-400/60 shadow-inner">
            {GRID_CELLS.map((row, r) =>
              row.map((cell, c) => {
                const isBlocked = cell.includes('#');
                return isBlocked ? (
                  <div key={`${r}-${c}`} className="aspect-square bg-slate-950 rounded-xl border border-stone-800" />
                ) : (
                  <input
                    key={`${r}-${c}`}
                    type="text"
                    maxLength={1}
                    value={inputs[r][c]}
                    onChange={(e) => handleCellChange(r, c, e.target.value)}
                    className="aspect-square w-full rounded-xl bg-stone-800 border-2 border-pink-400/60 text-center font-mono font-black text-lg text-white uppercase focus:border-amber-400 focus:outline-none shadow"
                  />
                );
              })
            )}
          </div>

          {/* SOLVED PHOTO CARD STAGE */}
          <AnimatePresence>
            {isSolved && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 rounded-2xl bg-gradient-to-b from-pink-950 to-purple-950 border-2 border-pink-400 space-y-3"
              >
                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Crossword Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                </div>
                <p className="text-xs font-extrabold text-pink-300">
                  🎉 CROSSWORD SOLVED 100%! QUEEN SANZU WINS! 👑
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {!isSolved ? (
              <button
                type="button"
                onClick={handleAutoSolve}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Check & Complete Grid 🧩</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Grid</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Crossword</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
