import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Trophy, User, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export default function LoveTicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [bhuntuPhotoIdx, setBhuntuPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [score, setScore] = useState({ bhuntu: 0, abu: 0, ties: 0 });
  const { triggerHaptic } = useAppStore();

  const bhuntuAvatarSrc = BHUNTU_PHOTOS[bhuntuPhotoIdx % BHUNTU_PHOTOS.length];
  const abuAvatarSrc = BHUNTU_PHOTOS[(bhuntuPhotoIdx + 7) % BHUNTU_PHOTOS.length];

  const checkWinner = (b) => {
    for (let combo of WINNING_COMBOS) {
      const [a, bIdx, c] = combo;
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        return b[a];
      }
    }
    if (b.every((cell) => cell !== null)) return 'TIE';
    return null;
  };

  const handleCellClick = (idx) => {
    if (board[idx] || winner) return;

    playPop();
    triggerHaptic(15);
    const newBoard = [...board];
    newBoard[idx] = 'BHUNTU';

    const w = checkWinner(newBoard);
    if (w) {
      setBoard(newBoard);
      setWinner(w);
      if (w === 'BHUNTU') {
        playBloom();
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
        setScore(prev => ({ ...prev, bhuntu: prev.bhuntu + 1 }));
      } else if (w === 'TIE') {
        setScore(prev => ({ ...prev, ties: prev.ties + 1 }));
      }
      return;
    }

    // AI Move for Abu
    const emptyIndices = newBoard.map((val, i) => (val === null ? i : null)).filter((val) => val !== null);
    if (emptyIndices.length > 0) {
      let aiChoice = emptyIndices[0];

      // 1. Try to win if AI has 2 in a row
      for (let i of emptyIndices) {
        const testBoard = [...newBoard];
        testBoard[i] = 'ABU';
        if (checkWinner(testBoard) === 'ABU') {
          aiChoice = i;
          break;
        }
      }

      // 2. Otherwise block Bhuntu if Bhuntu has 2 in a row
      if (aiChoice === emptyIndices[0]) {
        for (let i of emptyIndices) {
          const testBoard = [...newBoard];
          testBoard[i] = 'BHUNTU';
          if (checkWinner(testBoard) === 'BHUNTU') {
            aiChoice = i;
            break;
          }
        }
      }

      newBoard[aiChoice] = 'ABU';
      setBoard(newBoard);

      const aiW = checkWinner(newBoard);
      if (aiW) {
        setWinner(aiW);
        if (aiW === 'ABU') {
          setScore(prev => ({ ...prev, abu: prev.abu + 1 }));
        } else if (aiW === 'TIE') {
          setScore(prev => ({ ...prev, ties: prev.ties + 1 }));
        }
      }
    }
  };

  const handleReset = () => {
    playSparkle();
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  const handleNextPhoto = () => {
    playSparkle();
    triggerHaptic(10);
    setBhuntuPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Photo Tic-Tac-Toe 📸"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title="Hamro Photo Tic-Tac-Toe 📸"
      subtitle="Play Tic-Tac-Toe with Bhuntu's real photos instead of plain symbols!"
      description="Tap any grid cell to place Bhuntu's photo symbol!"
    >

      <div className="max-w-md mx-auto space-y-4 font-ui">

        {/* Players Avatar Bar */}
        <div className="flex items-center justify-around bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-pink-200 shadow-sm text-xs font-bold text-gray-800">
          {/* Player 1: Bhuntu */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={bhuntuAvatarSrc}
                onError={e => handlePhotoError(e, bhuntuPhotoIdx)}
                alt="Bhuntu"
                className="w-10 h-10 rounded-full object-cover border-2 border-rose-500 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 text-[10px] bg-rose-500 text-white rounded-full px-1 font-bold">
                X
              </span>
            </div>
            <div className="text-left">
              <div className="font-extrabold text-rose-600">Bhuntu (You) 💖</div>
              <div className="text-[11px] text-gray-500">Wins: {score.bhuntu}</div>
            </div>
          </div>

          <div className="text-pink-300 font-black text-sm">VS</div>

          {/* Player 2: Abu */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="font-extrabold text-purple-600">Abu (AI) 🤴</div>
              <div className="text-[11px] text-gray-500">Wins: {score.abu}</div>
            </div>
            <div className="relative">
              <img
                src={abuAvatarSrc}
                onError={e => handlePhotoError(e, (bhuntuPhotoIdx + 5) % BHUNTU_PHOTOS.length)}
                alt="Abu"
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 text-[10px] bg-purple-500 text-white rounded-full px-1 font-bold">
                O
              </span>
            </div>
          </div>
        </div>

        {/* Change Bhuntu Photo Avatar Button */}
        <div className="flex items-center justify-between px-2">
          <span className="text-[11px] font-semibold text-gray-600">
            Current Photo Symbol: <span className="font-bold text-rose-600">Bhuntu #{bhuntuPhotoIdx + 1}</span>
          </span>
          <button
            onClick={handleNextPhoto}
            className="px-3 py-1 rounded-full bg-pink-100 hover:bg-rose-200 text-rose-600 font-bold text-[11px] border border-pink-200 cursor-pointer transition-colors"
          >
            Change Photo Symbol 📸
          </button>
        </div>

        {/* Tic-Tac-Toe 3x3 Grid */}
        <div className="glass-card rounded-3xl p-4 sm:p-6 max-w-xs mx-auto border-2 border-pink-300 shadow-2xl bg-white">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full aspect-square">
            {board.map((val, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: val ? 1 : 1.05 }}
                whileTap={{ scale: val ? 1 : 0.95 }}
                onClick={() => handleCellClick(idx)}
                className="w-full h-full bg-pink-50/70 border-2 border-pink-200 rounded-2xl flex items-center justify-center shadow-inner cursor-pointer hover:bg-rose-100 transition-all overflow-hidden p-1"
              >
                {val === 'BHUNTU' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={bhuntuAvatarSrc}
                      onError={e => handlePhotoError(e, bhuntuPhotoIdx)}
                      alt="Bhuntu Symbol"
                      className="w-full h-full object-cover rounded-xl border-2 border-rose-500 shadow-md"
                    />
                    <Heart className="absolute -bottom-1 -right-1 w-4 h-4 text-rose-500 fill-rose-500 drop-shadow" />
                  </motion.div>
                )}

                {val === 'ABU' && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={abuAvatarSrc}
                      onError={e => handlePhotoError(e, (bhuntuPhotoIdx + 5) % BHUNTU_PHOTOS.length)}
                      alt="Abu Symbol"
                      className="w-full h-full object-cover rounded-xl border-2 border-purple-500 shadow-md"
                    />
                    <Sparkles className="absolute -bottom-1 -right-1 w-4 h-4 text-purple-500 fill-purple-500 drop-shadow" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Winner Banner Card */}
        {winner && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 rounded-3xl bg-white border-2 border-pink-300 shadow-xl max-w-xs mx-auto text-center space-y-2"
          >
            <Trophy className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
            <h3 className="text-base font-extrabold font-nepali text-rose-600">
              {winner === 'BHUNTU'
                ? 'Bhuntu Won! Champion Sanzu! 🎉💖'
                : winner === 'TIE'
                ? "It's a Tie! Both Winners 💕"
                : 'Abu Won This Round! Try Again! 🤴'}
            </h3>
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow hover:scale-105 transition-all cursor-pointer font-ui"
            >
              Play Next Match 🔄
            </button>
          </motion.div>
        )}

        {/* Reset Button */}
        {!winner && (
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-2 mx-auto shadow-md transition-colors font-ui cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Game Board</span>
          </button>
        )}

      </div>
    </WorldShell>
  );
}
