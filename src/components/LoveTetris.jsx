import WorldShell from './WorldShell';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Puzzle, Heart, Trophy, RotateCcw, Play, Pause, ArrowDown, ArrowLeft, ArrowRight, RotateCw, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const COLS = 7;
const ROWS = 12;
const HEARTS = ['💖', '💗', '💜', '💛', '🩷', '🩵', '🧡'];
const SPEEDS = [700, 500, 350];

const createPiece = () => {
  const shapes = [
    [[1, 1], [1, 1]], // square
    [[1, 1, 1, 1]],   // line
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
  ];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const heart = HEARTS[Math.floor(Math.random() * HEARTS.length)];
  return { shape, heart, x: Math.floor((COLS - shape[0].length) / 2), y: 0 };
};

const emptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(null));

export default function LoveTetris() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveTetris;
  const { triggerHaptic } = useAppStore();

  const [board, setBoard] = useState(emptyBoard());
  const [piece, setPiece] = useState(createPiece());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('bhuntu_tetris_hi') || '0', 10));
  const [lines, setLines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [level, setLevel] = useState(0);
  const [lineClearGlow, setLineClearGlow] = useState(false);

  const isValid = useCallback((p, brd) => {
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (!p.shape[r][c]) continue;
        const nr = p.y + r, nc = p.x + c;
        if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS) return false;
        if (brd[nr][nc]) return false;
      }
    }
    return true;
  }, []);

  const mergePiece = useCallback((p, brd) => {
    const nb = brd.map(r => [...r]);
    for (let r = 0; r < p.shape.length; r++) {
      for (let c = 0; c < p.shape[r].length; c++) {
        if (p.shape[r][c]) nb[p.y + r][p.x + c] = p.heart;
      }
    }
    return nb;
  }, []);

  const clearLines = useCallback((brd) => {
    const filtered = brd.filter(row => row.some(cell => !cell));
    const cleared = ROWS - filtered.length;
    while (filtered.length < ROWS) filtered.unshift(Array(COLS).fill(null));
    return { board: filtered, cleared };
  }, []);

  const drop = useCallback(() => {
    if (gameOver || paused) return;
    const next = { ...piece, y: piece.y + 1 };
    if (isValid(next, board)) {
      setPiece(next);
    } else {
      // Merge piece
      const merged = mergePiece(piece, board);
      const { board: cleared, cleared: count } = clearLines(merged);

      if (count > 0) {
        playSparkle();
        triggerHaptic(30);
        setLineClearGlow(true);
        setTimeout(() => setLineClearGlow(false), 500);

        const pts = count === 1 ? 120 : count === 2 ? 350 : count === 3 ? 600 : 1000;
        const addedScore = pts * (level + 1);

        setScore(s => {
          const ns = s + addedScore;
          if (ns > highScore) {
            setHighScore(ns);
            localStorage.setItem('bhuntu_tetris_hi', ns.toString());
          }
          return ns;
        });

        setLines(l => {
          const nl = l + count;
          if (nl >= (level + 1) * 4 && level < 2) setLevel(lv => lv + 1);
          return nl;
        });

        confetti({ particleCount: 40 * count, spread: 70, origin: { y: 0.6 } });
      }

      setBoard(cleared);
      const np = createPiece();
      if (!isValid(np, cleared)) {
        setGameOver(true);
        playBloom();
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      } else {
        setPiece(np);
      }
    }
  }, [gameOver, paused, piece, board, isValid, mergePiece, clearLines, level, highScore, triggerHaptic]);

  useEffect(() => {
    const speed = SPEEDS[Math.min(level, SPEEDS.length - 1)];
    const timer = setInterval(drop, speed);
    return () => clearInterval(timer);
  }, [drop, level]);

  const moveLeft = () => {
    if (gameOver || paused) return;
    const next = { ...piece, x: piece.x - 1 };
    if (isValid(next, board)) {
      playPop();
      triggerHaptic(10);
      setPiece(next);
    }
  };

  const moveRight = () => {
    if (gameOver || paused) return;
    const next = { ...piece, x: piece.x + 1 };
    if (isValid(next, board)) {
      playPop();
      triggerHaptic(10);
      setPiece(next);
    }
  };

  const rotate = () => {
    if (gameOver || paused) return;
    const s = piece.shape;
    const rotated = s[0].map((_, i) => s.map(row => row[i]).reverse());
    const next = { ...piece, shape: rotated };
    if (isValid(next, board)) {
      playPop();
      triggerHaptic(15);
      setPiece(next);
    }
  };

  const resetGame = () => {
    playPop();
    triggerHaptic(20);
    setBoard(emptyBoard());
    setPiece(createPiece());
    setScore(0);
    setLines(0);
    setLevel(0);
    setGameOver(false);
    setPaused(false);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
      if (e.key === 'ArrowUp') rotate();
      if (e.key === 'ArrowDown') drop();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight, rotate, drop]);

  // Render combined view
  const displayBoard = board.map(r => [...r]);
  if (!gameOver && piece) {
    for (let r = 0; r < piece.shape.length; r++) {
      for (let c = 0; c < piece.shape[r].length; c++) {
        if (piece.shape[r][c]) {
          const nr = piece.y + r, nc = piece.x + c;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            displayBoard[nr][nc] = piece.heart;
          }
        }
      }
    }
  }

  return (
    <WorldShell>
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6 font-ui">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-300 text-rose-600 font-bold text-xs uppercase tracking-wider">
            <Puzzle className="w-4 h-4 text-pink-500" />
            <span>Love Tetris Blocks</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-nepali tracking-tight">
            {nepaliTitle} 🧩
          </h1>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Stack romantic heart blocks and clear lines to build sweet memories together!
          </p>
        </div>

        {/* Game Console Frame */}
        <div className="relative rounded-3xl bg-slate-950 p-5 border-4 border-pink-500/80 shadow-[0_0_40px_rgba(244,63,94,0.3)]">
          {/* Header Stats */}
          <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 rounded-2xl border border-pink-500/30 text-white font-mono text-xs sm:text-sm mb-4">
            <div className="flex items-center gap-3">
              <div className="text-pink-400 font-bold flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>HI: {highScore}</span>
              </div>
              <div className="text-emerald-400 font-bold">
                SCORE: {score}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-rose-400 font-bold">LVL {level + 1}</div>
              <div className="text-purple-400 font-bold">LINES {lines}</div>
            </div>
          </div>

          {/* Grid Board */}
          <div className={`relative rounded-2xl bg-slate-900 border-2 ${
            lineClearGlow ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]' : 'border-slate-800'
          } p-3 grid grid-cols-7 gap-1.5 overflow-hidden transition-all duration-300`}>
            {displayBoard.map((row, rIdx) =>
              row.map((cell, cIdx) => (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-150 ${
                    cell ? 'bg-slate-800/90 border border-pink-500/40 shadow-inner' : 'bg-slate-950/60 border border-slate-900'
                  }`}
                >
                  {cell && <span className="animate-pulse">{cell}</span>}
                </div>
              ))
            )}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20 space-y-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl">
                  💖
                </motion.div>
                <div>
                  <h3 className="text-2xl font-black text-white">SWEET GAME OVER!</h3>
                  <p className="text-xs text-slate-400 mt-1">Final Score: {score} PTS | Lines Cleared: {lines}</p>
                </div>
                <button
                  onClick={resetGame}
                  className="btn-graphic-primary px-6 py-3 text-sm font-bold text-white shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again</span>
                </button>
              </div>
            )}
          </div>

          {/* Touch Controls for Mobile */}
          <div className="mt-5 grid grid-cols-4 gap-2">
            <button
              onClick={moveLeft}
              className="py-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-400 active:bg-pink-500 active:text-white flex items-center justify-center cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={rotate}
              className="py-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-400 active:bg-pink-500 active:text-white flex items-center justify-center cursor-pointer shadow-md"
            >
              <RotateCw className="w-6 h-6" />
            </button>
            <button
              onClick={drop}
              className="py-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-400 active:bg-pink-500 active:text-white flex items-center justify-center cursor-pointer shadow-md"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
            <button
              onClick={moveRight}
              className="py-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-400 active:bg-pink-500 active:text-white flex items-center justify-center cursor-pointer shadow-md"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </WorldShell>
  );
}
