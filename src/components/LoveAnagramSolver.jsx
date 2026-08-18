import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Check, Shuffle } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ANAGRAMS = [
  { word: "SANZU", scrambled: ['Z', 'A', 'N', 'S', 'U'], clue: "The royal name of Samjhana's special name 👑" },
  { word: "BEBO", scrambled: ['O', 'B', 'E', 'B'], clue: "Abu's sweetest nickname for Sanzu 🍯" },
  { word: "SAKAI", scrambled: ['I', 'A', 'K', 'A', 'S'], clue: "City in Osaka where Sanzu lives 🇯🇵" }
];

export default function LoveAnagramSolver() {
  const { triggerHaptic } = useAppStore();

  const [anaIdx, setAnaIdx] = useState(0);
  const [currentTiles, setCurrentTiles] = useState(ANAGRAMS[0].scrambled);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentAna = ANAGRAMS[anaIdx % ANAGRAMS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleTileClick = (idx) => {
    if (isSolved) return;

    playPop();
    triggerHaptic(5);

    if (selectedIndices.length === 0) {
      setSelectedIndices([idx]);
    } else if (selectedIndices.length === 1) {
      const firstIdx = selectedIndices[0];
      const secondIdx = idx;

      // Swap tiles
      const next = [...currentTiles];
      const temp = next[firstIdx];
      next[firstIdx] = next[secondIdx];
      next[secondIdx] = temp;

      setCurrentTiles(next);
      setSelectedIndices([]);

      // Check if solved
      if (next.join('') === currentAna.word) {
        playBloom();
        playSparkle();
        triggerHaptic([40, 80, 120]);
        setIsSolved(true);
        setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
        confetti({ particleCount: 110, spread: 90, origin: { y: 0.5 } });
      }
    }
  };

  const handleShuffleTiles = () => {
    playPop();
    triggerHaptic(10);
    const shuffled = [...currentTiles].sort(() => Math.random() - 0.5);
    setCurrentTiles(shuffled);
    setSelectedIndices([]);
    setIsSolved(false);
  };

  const handleNextAnagram = () => {
    playPop();
    triggerHaptic(10);
    const nextIdx = (anaIdx + 1) % ANAGRAMS.length;
    setAnaIdx(nextIdx);
    setCurrentTiles(ANAGRAMS[nextIdx].scrambled);
    setSelectedIndices([]);
    setIsSolved(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧩 ROMANTIC ANAGRAM UNSCRAMBLER 🧩\n\nUnscrambled Target: "${currentAna.word}"!\nClue: ${currentAna.clue}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Anagram Unscrambler 🧩✨"
      badgeIcon={<Shuffle className="w-3.5 h-3.5 text-pink-400" />}
      title={"Romantic Anagram Unscrambler"}
      subtitle={"Unscramble Letters for Queen Sanzu"}
      description={"Tap letter tiles to swap their positions and unscramble relationship words!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* ANAGRAM CABINET CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* CLUE BANNER */}
          <div className="bg-pink-950/40 p-3 rounded-2xl border border-pink-400/40 text-xs font-mono font-bold text-pink-300">
            CLUE: {currentAna.clue}
          </div>

          {/* INTERACTIVE SCRAMBLED TILES */}
          <div className="flex justify-center items-center gap-2 p-4 bg-stone-900 rounded-2xl border-2 border-pink-400/60 shadow-inner">
            {currentTiles.map((char, i) => {
              const isSelected = selectedIndices.includes(i);
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleTileClick(i)}
                  className={`w-12 h-14 rounded-xl font-mono font-black text-2xl flex items-center justify-center cursor-pointer transition-all border-2 shadow-lg ${
                    isSolved
                      ? 'bg-emerald-600 border-emerald-300 text-white'
                      : isSelected
                      ? 'bg-amber-400 border-white text-stone-950 scale-110 shadow-[0_0_15px_#fbbf24]'
                      : 'bg-stone-800 border-pink-400/60 text-white hover:border-pink-300'
                  }`}
                >
                  {char}
                </motion.button>
              );
            })}
          </div>

          {/* SOLVED PHOTO CARD REVEAL */}
          <AnimatePresence>
            {isSolved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-pink-950/60 border border-pink-400/60 space-y-3"
              >
                <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Anagram Champion Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                  />
                </div>
                <p className="text-xs font-bold text-amber-300">
                  🎉 ANAGRAM UNSCRAMBLED: "{currentAna.word}"! 👑
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {!isSolved ? (
              <button
                type="button"
                onClick={handleShuffleTiles}
                className="py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Shuffle className="w-4 h-4" />
                <span>Shuffle Tiles</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextAnagram}
                className="py-3 px-4 rounded-2xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Next Puzzle</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Unscrambler</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
