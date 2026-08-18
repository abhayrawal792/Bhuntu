import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RotateCcw, Shuffle, Trophy, HelpCircle, ArrowRight, Share2, Award, Star } from 'lucide-react';
import WorldShell from './WorldShell';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const LETTER_SCORES = {
  A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
  N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

const LEVEL_DATA = [
  {
    level: 1,
    title: "Level 1: Sweet Nicknames & Romance 💕",
    words: ['BHUNTU', 'SANZU', 'ABU', 'BEBO', 'MAYALU'],
    extraLetters: ['X', 'K', 'M', 'R', 'P', 'Q', 'W', 'Y', 'G', 'I', 'C', 'D']
  },
  {
    level: 2,
    title: "Level 2: Special Places & Dreams ✈️",
    words: ['POKHARA', 'OSAKA', 'SAKURA', 'BARDIYA', 'DHAMBOJI'],
    extraLetters: ['F', 'J', 'V', 'X', 'Z', 'W', 'L', 'T', 'G', 'N', 'C', 'M']
  },
  {
    level: 3,
    title: "Level 3: Forever Love & Promises 💍",
    words: ['HONEYMOON', 'FOREVER', 'PASSPORT', 'PANIPURI', 'PROMISE'],
    extraLetters: ['Q', 'Z', 'X', 'K', 'J', 'W', 'C', 'D', 'G', 'V', 'B', 'H']
  }
];

export default function LoveScrabble() {
  const { triggerHaptic } = useAppStore();
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [selected, setSelected] = useState([]);
  const [foundWords, setFoundWords] = useState([]);
  const [rackLetters, setRackLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('bhuntu_scrabble_hi') || '0', 10));
  const [hint, setHint] = useState(null);

  const currentLevel = LEVEL_DATA[currentLevelIdx];

  useEffect(() => {
    loadLevel(currentLevelIdx);
  }, [currentLevelIdx]);

  const loadLevel = (levelIdx) => {
    const lvl = LEVEL_DATA[levelIdx];
    const targetChars = lvl.words.join('').split('');
    const allChars = [...targetChars, ...lvl.extraLetters];
    const shuffled = allChars.sort(() => Math.random() - 0.5);
    setRackLetters(shuffled.map((letter, idx) => ({ id: `${letter}-${idx}-${Math.random()}`, letter })));
    setFoundWords([]);
    setSelected([]);
    setHint(null);
  };

  const handleShuffleRack = () => {
    playSparkle();
    triggerHaptic(15);
    setRackLetters(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  const handleTileClick = (item) => {
    if (selected.some(s => s.id === item.id)) return;
    playPop();
    triggerHaptic(15);
    const newSel = [...selected, item];
    setSelected(newSel);

    const currentWord = newSel.map(s => s.letter).join('');
    if (currentLevel.words.includes(currentWord) && !foundWords.includes(currentWord)) {
      playBloom();
      triggerHaptic([30, 60]);

      const wordScore = currentWord.split('').reduce((acc, char) => acc + (LETTER_SCORES[char] || 1), 0) * 15;
      
      setScore(prev => {
        const ns = prev + wordScore;
        if (ns > highScore) {
          setHighScore(ns);
          localStorage.setItem('bhuntu_scrabble_hi', ns.toString());
        }
        return ns;
      });

      const newFound = [...foundWords, currentWord];
      setFoundWords(newFound);
      setSelected([]);
      setHint(null);

      if (newFound.length === currentLevel.words.length) {
        confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } });
      }
    }
  };

  const handleClear = () => {
    playPop();
    triggerHaptic(10);
    setSelected([]);
  };

  const handleShowHint = () => {
    playSparkle();
    triggerHaptic(15);
    const missingWords = currentLevel.words.filter(w => !foundWords.includes(w));
    if (missingWords.length > 0) {
      const target = missingWords[0];
      setHint(`Hint: Starts with "${target[0]}" (${target.length} letters)`);
    }
  };

  const handleNextLevel = () => {
    playPop();
    triggerHaptic(20);
    if (currentLevelIdx < LEVEL_DATA.length - 1) {
      setCurrentLevelIdx(prev => prev + 1);
    }
  };

  const handleShare = () => {
    triggerHaptic(15);
    sendWhatsAppMessage(`🔤 *Bhuntu Love Scrabble!* 🔤\nI solved Level ${currentLevelIdx + 1} with a score of *${score} PTS*! High Score: *${highScore} PTS* ❤️`);
  };

  const currentSelectionWord = selected.map(s => s.letter).join('');
  const isLevelComplete = foundWords.length === currentLevel.words.length;

  return (
    <WorldShell>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 font-ui">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 border border-amber-300 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Love Scrabble Master</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 font-nepali tracking-tight">
            भुन्तु LOVE SCRABBLE 🔤
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Spell romantic Nepalgunj-Osaka memories, nicknames & special places!
          </p>
        </div>

        {/* Game Board Container */}
        <div className="relative rounded-3xl bg-amber-950/90 p-5 sm:p-8 border-4 border-amber-700/80 shadow-2xl space-y-6">
          {/* Level Header Bar */}
          <div className="flex flex-wrap items-center justify-between bg-amber-900/80 px-4 py-3 rounded-2xl border border-amber-600/50 text-amber-100 font-bold text-xs sm:text-sm gap-2">
            <div>{currentLevel.title}</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-300">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>HI: {highScore}</span>
              </div>
              <div className="text-emerald-300">SCORE: {score}</div>
            </div>
          </div>

          {/* Target Words Rack */}
          <div className="p-5 rounded-2xl bg-amber-900/40 border border-amber-700/50 space-y-3">
            <div className="text-xs uppercase font-bold text-amber-200/80 tracking-wider">Target Words ({foundWords.length}/{currentLevel.words.length}):</div>
            <div className="flex flex-wrap gap-3">
              {currentLevel.words.map(word => {
                const isFound = foundWords.includes(word);
                return (
                  <div
                    key={word}
                    className={`px-4 py-2 rounded-xl font-mono text-sm font-bold border transition-all ${
                      isFound
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-amber-950/60 text-amber-300/40 border-amber-800/80 stroke-dash'
                    }`}
                  >
                    {isFound ? word : '• '.repeat(word.length).trim()}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Current Selection Construction Rack */}
          <div className="min-h-[70px] p-4 rounded-2xl bg-amber-900/60 border-2 border-amber-600/60 flex items-center justify-center gap-2 flex-wrap">
            {selected.length === 0 ? (
              <span className="text-xs font-semibold text-amber-300/50">Tap letter tiles below to construct words...</span>
            ) : (
              selected.map(item => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  className="w-11 h-12 rounded-xl bg-gradient-to-b from-amber-100 to-amber-200 text-amber-950 font-black text-xl flex items-center justify-center shadow-lg border border-amber-300 relative"
                >
                  <span>{item.letter}</span>
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono text-amber-700">
                    {LETTER_SCORES[item.letter] || 1}
                  </span>
                </motion.div>
              ))
            )}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                disabled={selected.length === 0}
                className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={handleShuffleRack}
                className="px-4 py-2 rounded-xl bg-amber-700/80 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
              <button
                onClick={handleShowHint}
                className="px-4 py-2 rounded-xl bg-amber-800/80 hover:bg-amber-800 text-amber-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-yellow-300" />
                <span>Hint</span>
              </button>
            </div>

            {isLevelComplete && currentLevelIdx < LEVEL_DATA.length - 1 && (
              <button
                onClick={handleNextLevel}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black shadow-lg flex items-center gap-1.5 cursor-pointer animate-bounce"
              >
                <span>NEXT LEVEL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {hint && (
            <div className="p-3 rounded-xl bg-yellow-400/20 border border-yellow-400/40 text-yellow-200 text-xs font-bold text-center">
              {hint}
            </div>
          )}

          {/* Letter Tiles Rack */}
          <div className="grid grid-cols-6 sm:grid-cols-8 gap-2.5 pt-2">
            {rackLetters.map(item => {
              const isUsed = selected.some(s => s.id === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleTileClick(item)}
                  disabled={isUsed}
                  className={`h-14 rounded-2xl font-black text-xl flex items-center justify-center relative shadow-md transition-all ${
                    isUsed
                      ? 'bg-amber-950/40 text-amber-900 border border-amber-900/40 opacity-30 cursor-not-allowed'
                      : 'bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 text-amber-950 border-2 border-amber-300 hover:scale-105 active:scale-95 cursor-pointer shadow-amber-950/50'
                  }`}
                >
                  <span>{item.letter}</span>
                  <span className="absolute bottom-1 right-1.5 text-[10px] font-mono text-amber-800 font-bold">
                    {LETTER_SCORES[item.letter] || 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </WorldShell>
  );
}
