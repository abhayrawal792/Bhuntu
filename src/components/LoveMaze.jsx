import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw, Trophy, Timer, Compass, MapPin } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

// 8x8 expanded maze with collectibles (0: path, 1: wall, 2: start, 3: goal, 4: heart gem)
const MAZE_LEVELS = [
  {
    name: "Nepalgunj Market Maze 🌸",
    grid: [
      [2, 0, 4, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 4, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 1],
      [1, 4, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 4, 0, 1, 0, 1],
      [1, 1, 1, 0, 0, 1, 0, 1],
      [1, 1, 1, 1, 0, 0, 0, 3]
    ]
  },
  {
    name: "Osaka Castle Sky Bridge 🏯",
    grid: [
      [2, 0, 0, 0, 1, 4, 0, 1],
      [1, 1, 1, 0, 1, 0, 1, 1],
      [1, 4, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 4, 0, 1, 0, 1],
      [1, 1, 1, 0, 0, 1, 0, 1],
      [1, 4, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 0, 0, 0, 4, 3]
    ]
  }
];

export default function LoveMaze() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveMaze;
  const { triggerHaptic } = useAppStore();

  const [levelIdx, setLevelIdx] = useState(0);
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [steps, setSteps] = useState(0);
  const [gemsCollected, setGemsCollected] = useState(0);
  const [won, setWon] = useState(false);
  const [bestSteps, setBestSteps] = useState(() => parseInt(localStorage.getItem('bhuntu_maze_best') || '999', 10));

  const currentMaze = MAZE_LEVELS[levelIdx].grid;

  const move = (dr, dc) => {
    if (won) return;
    const nr = pos.r + dr;
    const nc = pos.c + dc;
    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) return;
    if (currentMaze[nr][nc] === 1) {
      triggerHaptic([30, 60]);
      return;
    }

    playPop();
    triggerHaptic(12);
    setPos({ r: nr, c: nc });
    setSteps(s => s + 1);

    if (currentMaze[nr][nc] === 4) {
      playSparkle();
      setGemsCollected(g => g + 1);
    }

    if (currentMaze[nr][nc] === 3) {
      setWon(true);
      playBloom();
      const finalSteps = steps + 1;
      if (finalSteps < bestSteps) {
        setBestSteps(finalSteps);
        localStorage.setItem('bhuntu_maze_best', finalSteps.toString());
      }
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
    }
  };

  const resetMaze = () => {
    playPop();
    triggerHaptic(15);
    setPos({ r: 0, c: 0 });
    setSteps(0);
    setGemsCollected(0);
    setWon(false);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Love Maze Puzzle 🧩"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >
      <div className="max-w-md mx-auto space-y-6 font-ui">
        {/* Maze Game Cabinet Frame */}
        <div className="rounded-3xl bg-slate-950 p-5 border-4 border-pink-500/80 shadow-[0_0_40px_rgba(244,63,94,0.3)]">
          {/* Header Bar */}
          <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 rounded-2xl border border-pink-500/30 text-white font-mono text-xs sm:text-sm mb-4">
            <div className="flex items-center gap-2 text-yellow-400 font-bold">
              <Trophy className="w-4 h-4" />
              <span>BEST: {bestSteps === 999 ? '--' : `${bestSteps} STEPS`}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-emerald-400 font-bold">STEPS: {steps}</div>
              <div className="text-rose-400 font-bold">💖 {gemsCollected}</div>
            </div>
          </div>

          {/* 8x8 Grid */}
          <div className="grid grid-cols-8 gap-1.5 p-3 rounded-2xl bg-slate-900 border border-slate-800">
            {currentMaze.map((row, r) =>
              row.map((cell, c) => {
                const isPlayer = pos.r === r && pos.c === c;
                const isGoal = cell === 3;
                const isGem = cell === 4;
                const isWall = cell === 1;

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`h-10 rounded-xl flex items-center justify-center text-lg font-bold transition-all ${
                      isPlayer
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 scale-105 border border-white'
                        : isWall
                        ? 'bg-slate-950 border border-slate-800'
                        : isGoal
                        ? 'bg-emerald-500/30 border border-emerald-400/80 text-emerald-300'
                        : 'bg-slate-800/60 border border-slate-700/40'
                    }`}
                  >
                    {isPlayer ? '😍' : isGoal ? '💒' : isGem ? '💖' : ''}
                  </div>
                );
              })
            )}
          </div>

          {/* D-Pad Arrow Controls */}
          <div className="mt-5 flex flex-col items-center gap-2">
            <button
              onClick={() => move(-1, 0)}
              className="p-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-400 active:bg-pink-500 active:text-white cursor-pointer shadow-md"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
            <div className="flex gap-4">
              <button
                onClick={() => move(0, -1)}
                className="p-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-400 active:bg-pink-500 active:text-white cursor-pointer shadow-md"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => move(0, 1)}
                className="p-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-400 active:bg-pink-500 active:text-white cursor-pointer shadow-md"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            <button
              onClick={() => move(1, 0)}
              className="p-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-400 active:bg-pink-500 active:text-white cursor-pointer shadow-md"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Win Modal Overlay */}
        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="p-6 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl text-center space-y-4"
            >
              <Heart className="w-12 h-12 text-rose-500 fill-rose-500 mx-auto animate-bounce" />
              <div>
                <h3 className="text-xl font-bold font-nepali text-slate-900">
                  Maze Solved! You Reached My Heart! 💖
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Completed in {steps} steps with {gemsCollected} heart gems collected!
                </p>
              </div>
              <button
                onClick={resetMaze}
                className="btn-graphic-primary px-6 py-3 text-sm font-bold text-white shadow-lg flex items-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
