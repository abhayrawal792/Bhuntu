import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Grid, Check, Sparkles, RefreshCw, Trophy, Layers } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const PUZZLE_LEVELS = [
  {
    id: 1,
    name: "Cute Nicknames 👑",
    words: ['BHUNTU', 'BEBO', 'SANZU', 'KANXU', 'MAYALU', 'FUCHHU', 'BABE']
  },
  {
    id: 2,
    name: "Love Travels ✈️",
    words: ['NEPALGUNJ', 'OSAKA', 'DHAMBOJI', 'SAKAI', 'FUJI', 'KYOTO']
  },
  {
    id: 3,
    name: "Favorite Cravings 🍜",
    words: ['PANIPURI', 'MOMO', 'CHIYA', 'CHOCOLATE', 'NOODLES', 'CHAUCHAU']
  },
  {
    id: 4,
    name: "Eternal Promises 💍",
    words: ['FOREVER', 'MARRIAGE', 'TOGETHER', 'KIDDOS', 'LOVE', 'PROMISE']
  }
];

const GRID_SIZE = 10;
// All 8 Directions: Horizontal, Vertical (Sidewise), and Diagonals
const DIRECTIONS = [
  [0, 1],   // Horizontal right ➡️
  [0, -1],  // Horizontal left ⬅️
  [1, 0],   // Vertical down (Sidewise) ⬇️
  [-1, 0],  // Vertical up (Sidewise) ⬆️
  [1, 1],   // Diagonal down-right ↘️
  [-1, -1], // Diagonal up-left ↖️
  [1, -1],  // Diagonal down-left ↙️
  [-1, 1]   // Diagonal up-right ↗️
];

function generateWordSearchGrid(wordList) {
  const grid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  const wordLocations = [];

  const sortedWords = [...wordList].sort((a, b) => b.length - a.length);

  for (const word of sortedWords) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 300) {
      attempts++;
      const dir = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const startRow = Math.floor(Math.random() * GRID_SIZE);
      const startCol = Math.floor(Math.random() * GRID_SIZE);

      let canPlace = true;
      const coords = [];

      for (let i = 0; i < word.length; i++) {
        const r = startRow + dir[0] * i;
        const c = startCol + dir[1] * i;

        if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
          canPlace = false;
          break;
        }

        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
          canPlace = false;
          break;
        }

        coords.push([r, c]);
      }

      if (canPlace) {
        coords.forEach(([r, c], idx) => {
          grid[r][c] = word[idx];
        });
        wordLocations.push({ word, coords });
        placed = true;
      }
    }
  }

  // Fill empty cells with random letters
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
      }
    }
  }

  return { grid, wordLocations };
}

export default function LoveWordSearch() {
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);
  const currentLevel = PUZZLE_LEVELS[activeLevelIdx];

  const [{ grid, wordLocations }, setPuzzle] = useState(() => generateWordSearchGrid(currentLevel.words));
  const [selectedCells, setSelectedCells] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [startCell, setStartCell] = useState(null);
  const { triggerHaptic } = useAppStore();

  const loadLevel = (levelIdx) => {
    playSparkle();
    triggerHaptic(20);
    setActiveLevelIdx(levelIdx);
    setPuzzle(generateWordSearchGrid(PUZZLE_LEVELS[levelIdx].words));
    setSelectedCells([]);
    setFoundWords([]);
    setStartCell(null);
  };

  const handleShuffleCurrentGrid = () => {
    loadLevel(activeLevelIdx);
  };

  const isCellSelected = (r, c) => selectedCells.some(([row, col]) => row === r && col === c);

  const isCellFound = (r, c) => {
    return wordLocations.some(t =>
      foundWords.includes(t.word) && t.coords.some(([row, col]) => row === r && col === c)
    );
  };

  const handleCellClick = (r, c) => {
    triggerHaptic(15);

    if (!startCell) {
      playPop();
      setStartCell([r, c]);
      setSelectedCells([[r, c]]);
    } else {
      const [sr, sc] = startCell;
      const dr = Math.sign(r - sr);
      const dc = Math.sign(c - sc);

      const isHorizontal = sr === r;
      const isVertical = sc === c;
      const isDiagonal = Math.abs(r - sr) === Math.abs(c - sc);

      if (isHorizontal || isVertical || isDiagonal) {
        playBloom();
        const line = [];
        let curR = sr;
        let curC = sc;
        const steps = Math.max(Math.abs(r - sr), Math.abs(c - sc));

        for (let i = 0; i <= steps; i++) {
          line.push([curR, curC]);
          curR += dr;
          curC += dc;
        }

        setSelectedCells(line);

        const selectedStr = line.map(([lr, lc]) => grid[lr][lc]).join('');
        const reversedStr = selectedStr.split('').reverse().join('');

        let newlyFound = false;
        wordLocations.forEach(({ word }) => {
          if (!foundWords.includes(word) && (selectedStr === word || reversedStr === word)) {
            newlyFound = true;
            const updated = [...foundWords, word];
            setFoundWords(updated);
            confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
            triggerHaptic([30, 80]);

            if (updated.length === wordLocations.length) {
              confetti({ particleCount: 220, spread: 110, origin: { y: 0.5 } });
            }
          }
        });

        if (!newlyFound) {
          setTimeout(() => setSelectedCells([]), 600);
        }
      } else {
        playPop();
        setStartCell([r, c]);
        setSelectedCells([[r, c]]);
      }
    }
  };

  return (
    <WorldShell
      theme="arcade"
      badge="10x10 Love Word Search 🔤"
      badgeIcon={<Grid className="w-3.5 h-3.5" />}
      title="Hamro Love Word Search Puzzle 🔤"
      subtitle="Words hidden Sidewise (Up/Down), Lengthwise (Left/Right) & Diagonally!"
      description="Tap start letter & end letter of any hidden word!"
    >

      <div className="max-w-md mx-auto space-y-4 font-ui">

        {/* Level Category Switcher Tabs */}
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl border border-pink-200 shadow-sm text-xs font-bold text-gray-800">
          <div className="flex items-center gap-1 mb-1.5 px-2 text-rose-600">
            <Layers className="w-3.5 h-3.5" />
            <span className="uppercase text-[10px] tracking-wider">Select Category:</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {PUZZLE_LEVELS.map((lvl, idx) => (
              <button
                key={lvl.id}
                onClick={() => loadLevel(idx)}
                className={`p-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                  activeLevelIdx === idx
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-102'
                    : 'bg-pink-50 text-gray-700 border-pink-200 hover:bg-pink-100'
                }`}
              >
                {lvl.name}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar & Shuffle */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-pink-200 shadow-sm text-xs font-bold text-gray-800">
          <span className="text-rose-600 font-extrabold flex items-center gap-1">
            <Trophy className="w-4 h-4 text-amber-500" />
            Found {foundWords.length} of {wordLocations.length} Words
          </span>
          <button
            onClick={handleShuffleCurrentGrid}
            className="px-3 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Shuffle Grid 🎲</span>
          </button>
        </div>

        {/* Target Words Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-pink-200 shadow-xs">
          {wordLocations.map(({ word }) => {
            const isFound = foundWords.includes(word);
            return (
              <span
                key={word}
                className={`px-2.5 py-1 rounded-lg text-xs font-extrabold font-mono border flex items-center gap-1 transition-all ${
                  isFound
                    ? 'bg-green-500 text-white border-green-600 shadow-xs scale-105'
                    : 'bg-pink-50 text-gray-700 border-pink-200'
                }`}
              >
                <span>{word}</span>
                {isFound && <Check className="w-3 h-3 text-white" />}
              </span>
            );
          })}
        </div>

        {/* 10x10 Grid */}
        <div className="glass-card rounded-3xl p-3 sm:p-5 max-w-sm sm:max-w-md mx-auto border-2 border-pink-300 shadow-2xl bg-white text-center">
          <div className="grid grid-cols-10 gap-1 sm:gap-1.5 justify-center mx-auto">
            {grid.map((row, r) =>
              row.map((char, c) => {
                const selected = isCellSelected(r, c);
                const found = isCellFound(r, c);

                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg font-mono font-black text-xs sm:text-sm flex items-center justify-center cursor-pointer transition-all ${
                      found
                        ? 'bg-green-500 text-white border border-green-600 font-black scale-105 shadow-xs'
                        : selected
                        ? 'bg-rose-500 text-white border border-rose-600 animate-pulse scale-105 shadow-md'
                        : 'bg-pink-50/80 text-gray-800 hover:bg-rose-100 border border-pink-200'
                    }`}
                  >
                    {char}
                  </button>
                );
              })
            )}
          </div>

          <p className="text-[11px] text-gray-500 font-semibold mt-3 font-ui">
            💡 Words can run <span className="text-rose-600 font-bold">Sidewise (Up/Down)</span>, <span className="text-rose-600 font-bold">Lengthwise (Left/Right)</span>, or <span className="text-rose-600 font-bold">Diagonally</span>!
          </p>
        </div>

        {/* Victory Card */}
        {foundWords.length === wordLocations.length && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl border-2 border-rose-500 shadow-2xl text-center space-y-3"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-white flex items-center justify-center mx-auto shadow-lg">
              <Sparkles className="w-7 h-7 animate-bounce" />
            </div>
            <h3 className="text-xl font-black text-rose-600 font-nepali">
              Category Cleared! 🎉
            </h3>
            <p className="text-xs text-gray-700 font-bold">
              You found all words in <span className="text-rose-600 font-extrabold">{currentLevel.name}</span>!
            </p>
            <button
              onClick={() => loadLevel((activeLevelIdx + 1) % PUZZLE_LEVELS.length)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs flex items-center gap-1.5 mx-auto shadow-lg hover:scale-105 transition-all cursor-pointer font-ui"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Next Category ➡️</span>
            </button>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
