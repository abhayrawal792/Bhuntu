import WorldShell from './WorldShell';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Music, Heart, Trophy, RotateCcw, Sparkles, Shuffle } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const generateSequence = (len) => {
  return Array.from({ length: len }, () => Math.floor(Math.random() * 4));
};

const getRandomPhotoIndices = () => {
  const indices = new Set();
  while (indices.size < 4) {
    indices.add(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  }
  return Array.from(indices);
};

export default function LoveVibe() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveVibe;
  const { triggerHaptic } = useAppStore();
  const [photoIndices, setPhotoIndices] = useState(() => getRandomPhotoIndices());
  const [sequence, setSequence] = useState([]);
  const [playerInput, setPlayerInput] = useState([]);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isShowingPattern, setIsShowingPattern] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [gameState, setGameState] = useState('ready'); // ready, showing, input, win, lose
  const [highScore, setHighScore] = useState(0);

  const handleShufflePhotos = () => {
    playSparkle();
    triggerHaptic(20);
    setPhotoIndices(getRandomPhotoIndices());
  };

  const startRound = useCallback(() => {
    const seq = generateSequence(level + 2);
    setSequence(seq);
    setPlayerInput([]);
    setGameState('showing');

    // show pattern
    setIsShowingPattern(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < seq.length) {
        setActiveButton(seq[i]);
        playPop();
        setTimeout(() => setActiveButton(null), 400);
        i++;
      } else {
        clearInterval(timer);
        setIsShowingPattern(false);
        setGameState('input');
      }
    }, 700);
  }, [level]);

  const handleButtonPress = (idx) => {
    if (gameState !== 'input') return;
    playPop();
    triggerHaptic(15);
    setActiveButton(idx);
    setTimeout(() => setActiveButton(null), 200);

    const newInput = [...playerInput, idx];
    setPlayerInput(newInput);

    // check correctness
    const currentIdx = newInput.length - 1;
    if (sequence[currentIdx] !== idx) {
      // wrong!
      triggerHaptic([50, 100, 50]);
      setGameState('lose');
      setHighScore(h => Math.max(h, score));
      return;
    }

    // completed sequence
    if (newInput.length === sequence.length) {
      const points = level * 10;
      setScore(s => s + points);
      triggerHaptic([30, 60, 30]);

      if (level >= 8) {
        playBloom();
        setGameState('win');
        confetti({ particleCount: 300, spread: 120, origin: { y: 0.5 } });
        setHighScore(h => Math.max(h, score + points));
      } else {
        playSparkle();
        setLevel(l => l + 1);
        confetti({ particleCount: 50, spread: 40, origin: { y: 0.6 } });
        setTimeout(() => startRound(), 1000);
      }
    }
  };

  const resetGame = () => {
    setLevel(1); setScore(0); setGameState('ready');
    setSequence([]); setPlayerInput([]);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Love Vibe Photo Rhythm 🎵"
      badgeIcon={<Music className="w-3.5 h-3.5" />}
      title="Bhuntu's Love Vibe Memory Game 🎵"
      subtitle="Watch the photo sequence glow, then tap Bhuntu's photos in the exact same order!"
      description="Memorize which of Bhuntu's 4 photos flash in sequence, then repeat the rhythm!"
    >

      <div className="max-w-md mx-auto space-y-4 font-ui">

        {/* Score & Level Status Bar */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-pink-200 shadow-sm text-xs font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[11px]">Score: {score}</span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-[11px]">Level {level}/8</span>
            <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-extrabold text-[11px]">Best: {highScore}</span>
          </div>

          <button
            onClick={handleShufflePhotos}
            className="px-2.5 py-1 rounded-full bg-pink-100 hover:bg-rose-200 text-rose-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
            title="Shuffle 4 new photos of Bhuntu"
          >
            <Shuffle className="w-3 h-3" />
            <span>Shuffle 🔀</span>
          </button>
        </div>

        {gameState === 'ready' && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startRound()}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-xl cursor-pointer hover:from-purple-600 hover:to-rose-600 mx-auto flex items-center gap-2"
          >
            <Music className="w-4 h-4" /> Start Photo Rhythm Game! 🎵
          </motion.button>
        )}

        {(gameState === 'showing' || gameState === 'input') && (
          <>
            <p className={`text-xs font-bold text-center ${gameState === 'showing' ? 'text-amber-600 animate-pulse' : 'text-green-600'}`}>
              {gameState === 'showing' ? '👀 Watch Bhuntu\'s photos glow in sequence...' : '🎯 Now tap Bhuntu\'s photos in the exact same order!'}
            </p>

            {/* 4 Bhuntu Photo Buttons Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              {photoIndices.map((pIdx, i) => {
                const isActive = activeButton === i;
                const photoSrc = BHUNTU_PHOTOS[pIdx % BHUNTU_PHOTOS.length];

                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: gameState === 'input' ? 1.04 : 1 }}
                    whileTap={{ scale: gameState === 'input' ? 0.92 : 1 }}
                    onClick={() => handleButtonPress(i)}
                    disabled={gameState !== 'input'}
                    className={`relative w-full h-32 rounded-3xl overflow-hidden cursor-pointer transition-all border-4 shadow-lg ${
                      isActive
                        ? 'border-rose-500 ring-4 ring-rose-400 scale-105 z-20 shadow-2xl brightness-125'
                        : 'border-white hover:border-pink-300 opacity-90'
                    } disabled:cursor-not-allowed`}
                  >
                    <img
                      src={photoSrc}
                      onError={e => handlePhotoError(e, pIdx)}
                      alt={`Bhuntu Card #${i + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Active Flash Overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-rose-500/30 backdrop-blur-xs flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white animate-ping" />
                      </div>
                    )}

                    {/* Badge Indicator */}
                    <span className="absolute top-2 left-2 bg-black/60 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                      #{i + 1}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Input Progress Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-2">
              {sequence.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i < playerInput.length ? 'bg-green-500 scale-110 shadow-sm' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {gameState === 'lose' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-sm mx-auto p-6 rounded-3xl bg-white border-2 border-rose-300 text-gray-800 shadow-2xl text-center space-y-3"
          >
            <span className="text-4xl block mb-1">💔</span>
            <h3 className="text-lg font-extrabold font-nepali text-rose-600">Oops! Missed a Beat!</h3>
            <p className="text-2xl font-extrabold font-mono text-gray-800">{score} Points</p>
            <p className="text-xs text-gray-600 italic">"It's okay my love! Our rhythm is always in sync even when we miss a beat 💕"</p>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs cursor-pointer hover:scale-105 transition-all flex items-center gap-2 mx-auto shadow-md"
            >
              <RotateCcw className="w-4 h-4" /> Try Again 🔄
            </button>
          </motion.div>
        )}

        {gameState === 'win' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-sm mx-auto p-6 rounded-3xl bg-white border-2 border-emerald-400 text-gray-800 shadow-2xl text-center space-y-3"
          >
            <Trophy className="w-14 h-14 mx-auto text-amber-500 animate-bounce" />
            <h3 className="text-xl font-black font-nepali text-emerald-600">RHYTHM QUEEN! 🎵💖</h3>
            <p className="text-2xl font-extrabold font-mono text-gray-800">{score} POINTS</p>
            <p className="text-xs text-gray-600 italic">
              "You and Abu vibrate at the same frequency — a love frequency so powerful, the whole universe dances to your beat! 🎶💕"
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold text-xs cursor-pointer hover:scale-105 transition-all mx-auto shadow-md"
            >
              Play Again 🎵
            </button>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
