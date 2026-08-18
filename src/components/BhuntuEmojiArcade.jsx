import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gamepad2, Sparkles, Share2, RefreshCw, Trophy, Flame, Timer, Zap, Volume2, Star } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const EMOJI_TYPES = [
  { char: '💕', pts: 100, label: 'Love', color: 'from-pink-500 to-rose-500' },
  { char: '💖', pts: 150, label: 'Sparkle Heart', color: 'from-rose-500 to-red-500' },
  { char: '🌸', pts: 200, label: 'Sakura Bloom', color: 'from-pink-400 to-purple-400' },
  { char: '💍', pts: 250, label: 'Diamond Ring', color: 'from-cyan-400 to-blue-500' },
  { char: '👑', pts: 500, label: 'Royal Crown', color: 'from-amber-400 to-yellow-500' },
  { char: '🥟', pts: 300, label: 'Nepali Momo', color: 'from-orange-400 to-amber-500' },
  { char: '⚡', pts: 400, label: 'Frenzy +5s!', bonusTime: 5, color: 'from-yellow-300 to-amber-400' },
  { char: '🌈', pts: 600, label: 'Rainbow Bomb', isBomb: true, color: 'from-purple-500 via-pink-500 to-cyan-400' },
];

export default function BhuntuEmojiArcade() {
  const { triggerHaptic } = useAppStore();

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('bhuntu_arcade_hi') || '0', 10));
  const [combo, setCombo] = useState(1);
  const [poppedCount, setPoppedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEmojis, setActiveEmojis] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [unlockedPhotos, setUnlockedPhotos] = useState([]);
  const [multiplierGlow, setMultiplierGlow] = useState(false);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  // Game loop timer
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      playBloom();
      playSparkle();
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('bhuntu_arcade_hi', score.toString());
      }
      // Unlock new photo on completion
      setUnlockedPhotos(prev => [...new Set([...prev, photoIdx])]);
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore, photoIdx]);

  // Emoji Spawner
  useEffect(() => {
    if (!isPlaying) return;

    const spawnRate = Math.max(350, 650 - combo * 50);
    const timer = setInterval(() => {
      if (activeEmojis.length < 11) {
        const item = EMOJI_TYPES[Math.floor(Math.random() * EMOJI_TYPES.length)];
        const newEmoji = {
          id: Date.now() + Math.random(),
          ...item,
          x: Math.random() * 80 + 8,
          y: -10,
          speed: Math.random() * 1.8 + 1.8 + combo * 0.2,
          rotation: Math.random() * 360,
        };
        setActiveEmojis(prev => [...prev, newEmoji]);
      }
    }, spawnRate);

    return () => clearInterval(timer);
  }, [isPlaying, activeEmojis.length, combo]);

  const handleStartGame = () => {
    playPop();
    triggerHaptic(20);
    setScore(0);
    setCombo(1);
    setPoppedCount(0);
    setTimeLeft(30);
    setActiveEmojis([]);
    setFloatingTexts([]);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    setIsPlaying(true);
  };

  const handlePopEmoji = (emoji, e) => {
    if (!isPlaying) return;

    playPop();
    triggerHaptic(12);

    // Handle special emoji traits
    if (emoji.bonusTime) {
      setTimeLeft(t => t + emoji.bonusTime);
    }

    if (emoji.isBomb) {
      // Clear all active emojis
      confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
      setActiveEmojis([]);
    } else {
      setActiveEmojis(prev => prev.filter(item => item.id !== emoji.id));
    }

    const gained = emoji.pts * combo;
    const nextScore = score + gained;
    setScore(nextScore);
    const newPopped = poppedCount + 1;
    setPoppedCount(newPopped);

    // Combo streak updates
    const nextCombo = Math.min(6, Math.floor(newPopped / 4) + 1);
    if (nextCombo > combo) {
      setMultiplierGlow(true);
      setTimeout(() => setMultiplierGlow(false), 600);
      playSparkle();
    }
    setCombo(nextCombo);

    // Render Floating score popup
    const rect = e.currentTarget.getBoundingClientRect();
    const floatId = Date.now() + Math.random();
    setFloatingTexts(prev => [
      ...prev,
      {
        id: floatId,
        x: e.clientX || rect.left + rect.width / 2,
        y: e.clientY || rect.top,
        text: `+${gained} ${emoji.label}!`,
        color: emoji.color,
      }
    ]);

    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(f => f.id !== floatId));
    }, 900);
  };

  const handleShareScore = () => {
    triggerHaptic(15);
    sendWhatsAppMessage(`🎮 *Bhuntu Emoji Arcade Score!* 🎮\nI scored *${score} PTS* (Combo x${combo}) in our Love Arcade! High Score: *${highScore} PTS* ❤️`);
  };

  return (
    <WorldShell>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 font-ui">
        {/* Header Title */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-300 text-rose-600 font-bold text-xs uppercase tracking-wider"
          >
            <Gamepad2 className="w-4 h-4 text-pink-500 animate-pulse" />
            <span>Bhuntu Love Arcade</span>
          </motion.div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 font-nepali tracking-tight">
            भुन्तु EMOJI ARCADE 🕹️
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            Pop floating romantic emojis, build combo streaks & unlock secret memories!
          </p>
        </div>

        {/* Retro Neon Arcade Cabinet Viewport */}
        <div className="relative rounded-3xl bg-slate-950 p-4 sm:p-6 border-4 border-pink-500/80 shadow-[0_0_50px_rgba(244,63,94,0.3)] overflow-hidden">
          {/* LED Arcade Bezel Bar */}
          <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-2xl border border-pink-500/30 text-white font-mono text-xs sm:text-sm mb-4 shadow-inner">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-pink-400 font-bold">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>HI: {highScore}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>SCORE: {score}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                multiplierGlow ? 'bg-yellow-400 text-slate-950 scale-110 shadow-lg shadow-yellow-400/50' : 'bg-pink-500/30 text-pink-300 border border-pink-400/50'
              }`}>
                {combo}X COMBO 🔥
              </div>
              <div className="flex items-center gap-1 text-rose-400 font-bold">
                <Timer className="w-4 h-4 text-rose-400" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Interactive Play Arena */}
          <div className="relative h-[420px] rounded-2xl bg-gradient-to-b from-slate-900 via-purple-950/80 to-slate-950 border border-slate-800 overflow-hidden select-none">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1b2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1b2e_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />

            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 bg-slate-950/85 backdrop-blur-sm space-y-5">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center shadow-xl shadow-pink-500/40"
                >
                  <Gamepad2 className="w-10 h-10 text-white" />
                </motion.div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">READY TO PLAY?</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xs">
                    Pop as many emojis as you can in 30 seconds to unlock high scores and sweet photos!
                  </p>
                </div>
                <button
                  onClick={handleStartGame}
                  className="btn-graphic-primary px-8 py-3.5 text-base font-bold text-white shadow-xl shadow-rose-500/40 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 fill-white" />
                  <span>START ARCADE GAME</span>
                </button>
              </div>
            ) : (
              <>
                {/* Active Floating Emojis */}
                <AnimatePresence>
                  {activeEmojis.map(item => (
                    <motion.button
                      key={item.id}
                      onClick={(e) => handlePopEmoji(item, e)}
                      initial={{ y: 440, opacity: 0, scale: 0.5 }}
                      animate={{ y: 20, opacity: 1, scale: 1, rotate: item.rotation }}
                      exit={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 4.5 / item.speed, ease: 'linear' }}
                      className={`absolute px-4 py-3 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg border border-white/40 cursor-pointer flex items-center gap-1.5 text-xl sm:text-2xl active:scale-95`}
                      style={{ left: `${item.x}%` }}
                    >
                      <span>{item.char}</span>
                    </motion.button>
                  ))}
                </AnimatePresence>

                {/* Floating Score Popups */}
                <AnimatePresence>
                  {floatingTexts.map(f => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 1, y: f.y - 40, scale: 0.8 }}
                      animate={{ opacity: 0, y: f.y - 100, scale: 1.3 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className={`fixed pointer-events-none z-50 font-black text-sm sm:text-base px-3 py-1 rounded-full bg-slate-900/90 text-yellow-300 border border-yellow-400/50 shadow-xl`}
                      style={{ left: f.x, top: f.y }}
                    >
                      {f.text}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </>
            )}
          </div>

          {/* Unlocked Photo Keepsake Frame */}
          {currentPhoto && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-white text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title || 'Arcade Photo'}
                  onError={handlePhotoError}
                  className="w-12 h-12 rounded-xl object-cover border border-pink-500/50"
                />
                <div>
                  <div className="font-bold text-pink-300">{currentPhoto.title || 'Bhuntu Memory Photo'}</div>
                  <div className="text-slate-400 text-xs">{currentPhoto.caption || 'Special Arcade Memory Unlocked'}</div>
                </div>
              </div>
              <button
                onClick={handleShareScore}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold hover:bg-emerald-500/30 flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </WorldShell>
  );
}
