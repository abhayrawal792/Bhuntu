import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, RefreshCw, Trophy, Send, Zap, Award, Star, Timer, Dices } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MEMORY_THEMES = [
  { id: 0, title: 'Light Blue Scooter Ride 🛵', nepali: 'Bardiya tira ghumna gako mitho samjhana!', photoIdx: 1 },
  { id: 1, title: 'Nepalgunj Chiya & Momo ☕', nepali: 'Chiya ra momo khada ko cute moment!', photoIdx: 12 },
  { id: 2, title: 'Osaka ↔ Nepalgunj Video Call ✈️', nepali: 'Dherai duri bhaye pani aakash ko sanzu!', photoIdx: 25 },
  { id: 3, title: 'Panipuri & Current Noodles 🍜', nepali: 'Pyari baby ko khana cravings!', photoIdx: 38 },
  { id: 4, title: 'Natural Smile & Beauty 🌸', nepali: 'Without makeup pani sabai bhanda pyari!', photoIdx: 52 },
  { id: 5, title: 'Sanzu Rawal Queen Worship 👑', nepali: 'Mero Bebo, Bhuntu, Sanu ko rajkumari look!', photoIdx: 64 },
  { id: 6, title: '30-40 Kiddos Future Dream 💒', nepali: 'Paxi haami sangai hune pyaro sapana!', photoIdx: 78 },
  { id: 7, title: 'First Birthday Cake Wish 🎂', nepali: 'Sanzu ko birthday special celebration!', photoIdx: 90 }
];

const DIFFICULTY_MODES = [
  { id: 'easy', name: '🌸 Easy (8 Cards)', pairsCount: 4, gridCols: 'grid-cols-4' },
  { id: 'medium', name: '💖 Romantic (12 Cards)', pairsCount: 6, gridCols: 'grid-cols-3 sm:grid-cols-4' },
  { id: 'hard', name: '👑 Queen Master (16 Cards)', pairsCount: 8, gridCols: 'grid-cols-4' }
];

export default function LoveMemoryFlip() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveMemoryFlip;
  const { triggerHaptic } = useAppStore();

  const [difficulty, setDifficulty] = useState('medium');
  const [cards, setCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [combo, setCombo] = useState(1);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [lastMatchedMemory, setLastMatchedMemory] = useState(null);

  // Initialize Game Board
  const startNewGame = (diffKey = difficulty) => {
    playPop();
    const config = DIFFICULTY_MODES.find(m => m.id === diffKey) || DIFFICULTY_MODES[1];
    const selectedThemes = MEMORY_THEMES.slice(0, config.pairsCount);
    
    // Duplicate themes to form pairs and shuffle
    const deck = [...selectedThemes, ...selectedThemes]
      .map((item, idx) => ({ ...item, uniqueId: idx }))
      .sort(() => Math.random() - 0.5);

    setCards(deck);
    setFlippedIndex([]);
    setMatchedPairs([]);
    setMoves(0);
    setCombo(1);
    setScore(0);
    setTimer(0);
    setIsGameActive(true);
    setLastMatchedMemory(null);
  };

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  // Timer Tick
  useEffect(() => {
    let interval = null;
    if (isGameActive && matchedPairs.length < cards.length / 2) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, matchedPairs, cards]);

  const handleCardClick = (index) => {
    if (!isGameActive) return;
    if (flippedIndex.includes(index) || matchedPairs.includes(cards[index].id)) return;
    if (flippedIndex.length === 2) return;

    playSparkle();
    triggerHaptic(15);
    const newFlipped = [...flippedIndex, index];
    setFlippedIndex(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].id === cards[secondIdx].id) {
        // MATCH FOUND!
        playBloom();
        triggerHaptic([30, 80]);
        const themeMatched = cards[firstIdx];
        setMatchedPairs(prev => [...prev, themeMatched.id]);
        setLastMatchedMemory(themeMatched);
        setFlippedIndex([]);
        
        // Bonus Points Calculation
        const bonus = 100 * combo;
        setScore(s => s + bonus);
        setCombo(c => c + 1);

        // Check Victory
        if (matchedPairs.length + 1 === cards.length / 2) {
          setIsGameActive(false);
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        }
      } else {
        // NO MATCH
        setCombo(1);
        setTimeout(() => {
          setFlippedIndex([]);
        }, 900);
      }
    }
  };

  const isVictory = cards.length > 0 && matchedPairs.length === cards.length / 2;
  const currentConfig = DIFFICULTY_MODES.find(m => m.id === difficulty);

  return (
    <WorldShell
      theme="arcade"
      badge="Bhuntu's Photo Memory Flip 🃏"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-500 animate-bounce" />}
      title="Bhuntu's 3D Photo Memory Matching Game 🃏"
      subtitle="Flip 3D cards to find matching pairs of Bhuntu's real photos & unlock romantic memories!"
      description="100% interactive photo memory game with combo streaks and victory trophies!"
    >

      <div className="max-w-3xl mx-auto space-y-5 font-ui">

        {/* Mode Selector & Dashboard Header */}
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border-2 border-pink-300 shadow-md space-y-3">
          
          {/* Difficulty Chips */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {DIFFICULTY_MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => setDifficulty(mode.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer border ${
                  difficulty === mode.id
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md scale-105'
                    : 'bg-pink-50 text-gray-700 border-pink-200 hover:bg-pink-100'
                }`}
              >
                <span>{mode.name}</span>
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-pink-100 text-center">
            <div className="bg-pink-50 p-2 rounded-2xl border border-pink-200">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Moves</span>
              <span className="text-sm font-black text-rose-600 font-mono">{moves}</span>
            </div>

            <div className="bg-amber-50 p-2 rounded-2xl border border-amber-200">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Combo</span>
              <span className="text-sm font-black text-amber-600 font-mono">{combo}x 🔥</span>
            </div>

            <div className="bg-purple-50 p-2 rounded-2xl border border-purple-200">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Score</span>
              <span className="text-sm font-black text-purple-600 font-mono">{score}</span>
            </div>

            <div className="bg-emerald-50 p-2 rounded-2xl border border-emerald-200">
              <span className="text-[10px] text-gray-500 font-bold uppercase block">Time</span>
              <span className="text-sm font-black text-emerald-600 font-mono">{timer}s</span>
            </div>
          </div>
        </div>

        {/* 3D Photo Memory Cards Grid */}
        <div className={`grid ${currentConfig.gridCols} gap-3 max-w-xl mx-auto`}>
          {cards.map((card, index) => {
            const isFlipped = flippedIndex.includes(index) || matchedPairs.includes(card.id);
            const isMatched = matchedPairs.includes(card.id);
            const photoSrc = BHUNTU_PHOTOS[card.photoIdx % BHUNTU_PHOTOS.length];

            return (
              <motion.div
                key={card.uniqueId}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleCardClick(index)}
                className="h-28 sm:h-32 rounded-2xl cursor-pointer perspective-1000 relative"
              >
                <div
                  className={`w-full h-full rounded-2xl transition-all duration-500 transform-style-3d border-2 shadow-lg ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Card Back (Unflipped) */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 border-2 border-white flex flex-col items-center justify-center text-white p-2 shadow-inner"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Heart className="w-6 h-6 fill-white text-white mb-1 animate-pulse" />
                    <span className="text-[10px] font-black tracking-widest uppercase font-mono">A ❤️ S</span>
                  </div>

                  {/* Card Front (Flipped Photo) */}
                  <div
                    className={`absolute inset-0 w-full h-full rounded-2xl overflow-hidden border-2 bg-white flex flex-col items-center justify-between p-1 shadow-xl ${
                      isMatched ? 'border-emerald-400 ring-2 ring-emerald-300' : 'border-rose-400'
                    }`}
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="w-full h-16 sm:h-20 rounded-xl overflow-hidden relative">
                      <img
                        src={photoSrc}
                        onError={e => handlePhotoError(e, card.photoIdx)}
                        alt="Bhuntu Photo Memory"
                        className="w-full h-full object-contain"
                      />
                      {isMatched && (
                        <div className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-md">
                          <Star className="w-3 h-3 fill-white" />
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] font-extrabold text-gray-900 truncate w-full text-center px-1 font-nepali">
                      {card.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Last Matched Memory Alert Banner */}
        <AnimatePresence>
          {lastMatchedMemory && !isVictory && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="p-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xl text-center space-y-1 max-w-lg mx-auto"
            >
              <span className="text-[10px] font-extrabold tracking-wider uppercase bg-black/20 px-2 py-0.5 rounded-full">
                ✨ Memory Unlocked ✨
              </span>
              <h4 className="text-sm font-black font-nepali">{lastMatchedMemory.title}</h4>
              <p className="text-xs text-pink-100 italic">{lastMatchedMemory.nepali}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VICTORY MODAL & SCORE CARD */}
        {isVictory && (
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-6 sm:p-7 rounded-3xl border-2 border-emerald-400 bg-white shadow-2xl text-center space-y-4 max-w-lg mx-auto"
          >
            <Trophy className="w-12 h-12 text-amber-500 fill-amber-400 mx-auto animate-bounce" />
            
            <div className="space-y-1">
              <h3 className="text-xl font-black text-rose-600 uppercase tracking-tight">
                ALL MATCHES UNLOCKED! 💖👑
              </h3>
              <p className="text-xs text-gray-600 font-medium">
                You matched all photos in {moves} moves & {timer} seconds!
              </p>
            </div>

            <div className="p-3 bg-pink-50 rounded-2xl border border-pink-200 flex justify-around text-center">
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase block">Final Score</span>
                <span className="text-lg font-black text-rose-600 font-mono">{score} PTS</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase block">Time Spent</span>
                <span className="text-lg font-black text-purple-600 font-mono">{timer}s</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                onClick={() => startNewGame()}
                className="w-full sm:flex-1 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Play Again 🎮
              </button>

              <button
                onClick={() => {
                  sendWhatsAppMessage(`🃏 Hey Abu! I just unlocked all photo memory cards in Bhuntu's Photo Memory Flip!\n\n🏆 Score: ${score} PTS\n⏱️ Time: ${timer}s\n🎯 Moves: ${moves}! ❤️✨`, '🃏 Memory Flip Victory');
                }}
                className="w-full sm:flex-1 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" /> Share Score 📲
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
