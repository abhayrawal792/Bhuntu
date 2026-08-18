import WorldShell from './WorldShell';
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Puzzle, Heart, Trophy, RotateCcw, Timer } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const SIZE = 4;
const TOTAL = SIZE * SIZE;
const HEART_TILES = ['💖','💗','💜','💛','🩷','💕','❤️','💓','🤍','💝','🧡','💙','🖤','💟','🤎'];

const createSolved = () => [...Array(TOTAL - 1)].map((_, i) => i + 1).concat([0]);

const isSolvable = (tiles) => {
  let inv = 0;
  const flat = tiles.filter(t => t !== 0);
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] > flat[j]) inv++;
    }
  }
  const blankRow = Math.floor(tiles.indexOf(0) / SIZE);
  return SIZE % 2 === 0 ? (inv + blankRow) % 2 !== 0 : inv % 2 === 0;
};

const shuffle = () => {
  let tiles;
  do {
    tiles = [...createSolved()];
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
  } while (!isSolvable(tiles) || JSON.stringify(tiles) === JSON.stringify(createSolved()));
  return tiles;
};

export default function LovePuzzleSlider() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.lovePuzzleSlider;
  const [tiles, setTiles] = useState(shuffle);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [startTime] = useState(Date.now());
  const { triggerHaptic } = useAppStore();

  const isSolved = useCallback((t) => {
    return JSON.stringify(t) === JSON.stringify(createSolved());
  }, []);

  const handleTileClick = (index) => {
    if (solved) return;
    const blankIdx = tiles.indexOf(0);
    const row = Math.floor(index / SIZE), col = index % SIZE;
    const bRow = Math.floor(blankIdx / SIZE), bCol = blankIdx % SIZE;

    // only adjacent tiles can move
    if ((Math.abs(row - bRow) === 1 && col === bCol) || (Math.abs(col - bCol) === 1 && row === bRow)) {
      playSparkle();
      triggerHaptic(10);
      const newTiles = [...tiles];
      [newTiles[index], newTiles[blankIdx]] = [newTiles[blankIdx], newTiles[index]];
      setTiles(newTiles);
      setMoves(m => m + 1);

      if (isSolved(newTiles)) {
        setSolved(true);
        confetti({ particleCount: 250, spread: 100, origin: { y: 0.5 } });
      }
    }
  };

  const resetPuzzle = () => {
    setTiles(shuffle());
    setMoves(0);
    setSolved(false);
  };

  const elapsed = solved ? Math.floor((Date.now() - startTime) / 1000) : Math.floor((Date.now() - startTime) / 1000);

  return (
    <WorldShell
      theme="arcade"
      badge="Sliding Heart Picture Puzzle 🧩"
      badgeIcon={<Puzzle className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Stats Bar */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-xs">
          Moves: {moves}
        </span>
        <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-extrabold text-xs flex items-center gap-1">
          <Timer className="w-3 h-3" /> Goal: Under 80 moves
        </span>
        <button onClick={resetPuzzle}
          className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-bold text-xs cursor-pointer hover:bg-gray-200 flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Puzzle Grid */}
      <div className="inline-block p-3 rounded-2xl bg-pink-50 border-4 border-pink-300 shadow-2xl mb-4">
        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
          {tiles.map((tile, idx) => (
            <motion.button key={idx}
              layout
              onClick={() => handleTileClick(idx)}
              whileTap={{ scale: 0.9 }}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl font-bold text-lg flex items-center justify-center cursor-pointer transition-all ${
                tile === 0
                  ? 'bg-pink-100 border-2 border-dashed border-pink-200'
                  : solved
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white border-2 border-green-300 shadow-md'
                    : 'bg-white border-2 border-pink-200 text-rose-600 shadow-md hover:bg-pink-50 hover:shadow-lg active:shadow-inner'
              }`}
            >
              {tile !== 0 && (
                <span className="flex flex-col items-center">
                  <span className="text-lg">{HEART_TILES[tile - 1]}</span>
                  <span className="text-[11px] font-mono opacity-60">{tile}</span>
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-gray-400 mb-4">Tap a tile next to the empty space to slide it</p>

      {/* Victory */}
      {solved && (
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto p-6 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl">
          <Trophy className="w-12 h-12 mx-auto mb-2 text-amber-200" />
          <h3 className="text-xl font-extrabold font-nepali mb-1">PUZZLE SOLVED! 🧩💖</h3>
          <p className="text-2xl font-extrabold font-mono mb-1">{moves} Moves</p>
          <p className="text-xs opacity-90 italic mb-2">
            "Like this puzzle, every piece of our love story fits perfectly, Sanzu! 💕"
          </p>
          <button onClick={resetPuzzle}
            className="px-6 py-2 rounded-full bg-white text-green-600 font-bold text-xs cursor-pointer hover:bg-green-50">
            Shuffle Again 🔄
          </button>
        </motion.div>
      )}
    </WorldShell>
  );
}
