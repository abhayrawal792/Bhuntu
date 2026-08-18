import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Puzzle, RefreshCw, Heart, Eye, Check, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const CORRECT_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8];

export default function JigsawPuzzle() {
  const [photoIndex, setPhotoIndex] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [tiles, setTiles] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [solved, setSolved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { triggerHaptic } = useAppStore();

  const currentPhotoSrc = BHUNTU_PHOTOS[photoIndex % BHUNTU_PHOTOS.length];

  useEffect(() => {
    shuffle();
  }, [photoIndex]);

  const shuffle = () => {
    playSparkle();
    let shuffled = [...CORRECT_ORDER].sort(() => Math.random() - 0.5);
    // Ensure it's not already solved
    if (shuffled.every((val, idx) => val === idx)) {
      shuffled = [1, 0, 2, 3, 4, 5, 6, 7, 8];
    }
    setTiles(shuffled);
    setSelectedIdx(null);
    setSolved(false);
  };

  const handleTileClick = (idx) => {
    if (solved) return;
    triggerHaptic(15);

    if (selectedIdx === null) {
      // Step 1: Select first tile
      playPop();
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      // Deselect if tapping same tile
      setSelectedIdx(null);
    } else {
      // Step 2: Swap selected tile with tapped tile
      playPop();
      const newTiles = [...tiles];
      [newTiles[selectedIdx], newTiles[idx]] = [newTiles[idx], newTiles[selectedIdx]];
      setTiles(newTiles);
      setSelectedIdx(null);

      // Check win condition
      if (newTiles.every((val, i) => val === i)) {
        playBloom();
        setSolved(true);
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
      }
    }
  };

  const handleNextPhoto = () => {
    playSparkle();
    setPhotoIndex(prev => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handleShufflePhoto = () => {
    playSparkle();
    triggerHaptic(20);
    const randomIdx = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIndex(randomIdx);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Photo Jigsaw Puzzle 🧩"
      badgeIcon={<Puzzle className="w-3.5 h-3.5" />}
      title="Bhuntu's Photo Jigsaw Puzzle 🧩"
      subtitle="Swap the 9 picture pieces to reveal Bhuntu's full photo!"
      description="Tap any piece to select it, then tap another piece to swap them!"
    >

      <div className="max-w-md mx-auto space-y-4 font-ui">

        {/* Controls & Preview Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-pink-200 shadow-sm text-xs font-bold text-gray-800">
          <span className="text-rose-600 font-extrabold flex items-center gap-1">
            Photo #{ (photoIndex % BHUNTU_PHOTOS.length) + 1 } / {BHUNTU_PHOTOS.length} 📸
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={handleShufflePhoto}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all shadow-xs"
              title="Pick a random photo from all 167 photos"
            >
              <Sparkles className="w-3 h-3" />
              <span>Shuffle Photo 🔀</span>
            </button>

            <button
              onClick={() => setShowPreview(prev => !prev)}
              className="px-2.5 py-1 rounded-full bg-pink-100 hover:bg-rose-200 text-rose-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Eye className="w-3 h-3" />
              <span>{showPreview ? 'Hide' : 'Preview'}</span>
            </button>

            <button
              onClick={shuffle}
              className="px-2.5 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reshuffle 🎲</span>
            </button>
          </div>
        </div>

        {/* Full Image Preview Modal / Banner */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-2xl bg-white border-2 border-pink-300 shadow-lg text-center"
            >
              <p className="text-[11px] font-bold text-gray-600 mb-2">Original Target Picture:</p>
              <img
                src={currentPhotoSrc}
                onError={e => handlePhotoError(e, photoIndex)}
                alt="Target Preview"
                className="w-40 h-40 object-contain rounded-xl mx-auto border-2 border-pink-400 shadow-md"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3x3 Photo Jigsaw Board */}
        <div className="glass-card rounded-3xl p-3 sm:p-5 max-w-xs mx-auto border-2 border-pink-300 shadow-2xl bg-white text-center">
          <div className="grid grid-cols-3 gap-1.5 w-64 h-64 sm:w-72 sm:h-72 mx-auto bg-pink-100 p-1.5 rounded-2xl border-2 border-pink-200 shadow-inner">
            {tiles.map((piecePos, idx) => {
              // Calculate background offset for 3x3 grid
              const row = Math.floor(piecePos / 3);
              const col = piecePos % 3;
              const isSelected = selectedIdx === idx;
              const isCorrect = piecePos === idx;

              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: solved ? 1 : 1.03 }}
                  whileTap={{ scale: solved ? 1 : 0.95 }}
                  onClick={() => handleTileClick(idx)}
                  className={`relative w-full h-full rounded-xl overflow-hidden cursor-pointer transition-all shadow-sm border-2 ${
                    isSelected
                      ? 'border-rose-600 ring-4 ring-rose-400 scale-105 z-20 shadow-xl'
                      : isCorrect && !solved
                      ? 'border-green-400'
                      : 'border-white hover:border-pink-300'
                  }`}
                >
                  <div
                    className="w-full h-full bg-no-repeat"
                    style={{
                      backgroundImage: `url(${currentPhotoSrc})`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${(col / 2) * 100}% ${(row / 2) * 100}%`
                    }}
                  />

                  {/* Tile Number Indicator */}
                  {!solved && (
                    <span className="absolute top-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                      #{idx + 1}
                    </span>
                  )}

                  {/* Correct Position Badge */}
                  {isCorrect && !solved && (
                    <span className="absolute bottom-1 right-1 bg-green-500 text-white rounded-full p-0.5 shadow-xs">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          <p className="text-[11px] text-gray-500 font-semibold mt-3 font-ui">
            💡 Tap <span className="text-rose-600 font-bold">Piece A</span>, then tap <span className="text-rose-600 font-bold">Piece B</span> to swap their positions!
          </p>
        </div>

        {/* Victory Screen Banner */}
        {solved && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 rounded-3xl bg-white border-2 border-rose-400 shadow-2xl text-center space-y-3"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Heart className="w-6 h-6 fill-white animate-bounce" />
            </div>
            <h3 className="text-lg font-black text-rose-600 font-nepali">
              Puzzle Completed Perfectly! 🎉
            </h3>
            <p className="text-xs text-gray-700 font-bold">
              Bhuntu's picture is restored! You are amazing my love! ❤️
            </p>
            <button
              onClick={handleNextPhoto}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer font-ui"
            >
              Next Photo Puzzle 🖼️ ▶
            </button>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
