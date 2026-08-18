import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Heart, RefreshCw, Smile, Volume2 } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playPop, playSparkle, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const LOVE_MESSAGES = [
  "You are the most beautiful girl in the world, Bhuntu! 💕",
  "Abu is so infinitely proud of you, my Bebo! 🌟",
  "No matter how hard today was, Abu loves you forever! ❤️",
  "Your smile instantly brightens up my whole day! 😊",
  "You are Abu's forever dream & favorite person! 💍",
  "Sending you 1,000 tight, warm virtual hugs! 🫂",
  "Dhamboji ↔️ Sakai love is unbreakable! ✈️",
  "You make my heart beat faster every single day! 💓",
  "Don't stress my love, Abu is always right beside you! 🌸",
  "You deserve all the happiness in the universe! 🌌",
  "Bhuntu..!!👀🤍✨ is the cutest name ever created!",
  "We are going to have 30 to 40 cute kiddos! 👶",
  "Chiya & Panipuri date in Osaka coming very soon! ☕",
  "You have the sweetest, purest heart, Sanzu! 💖",
  "Abu loves you more than words could ever describe! 📜",
  "Take a deep breath my love, everything will be okay! 🍃",
  "You are my queen, my Bebo, my forever Mayalu! 👑",
  "Distance means nothing when someone means everything! 🌏",
  "I fall deeper in love with you every morning! 🌅",
  "Your pure voice brings peace to my soul! 🎵",
  "Never forget how special & precious you are! 💎",
  "Abu's heart belongs 100% only to Bhuntu! 🔐",
  "Together forever & always, no matter what! 💕",
  "You are my absolute world & favorite human! 🌍",
  "Smile Bebo, Abu loves you so so so much! 🥰"
];

export default function BubblePopGame() {
  const [poppedStates, setPoppedStates] = useState(Array(25).fill(false));
  const [latestMessage, setLatestMessage] = useState(null);
  const { triggerHaptic } = useAppStore();

  const poppedCount = poppedStates.filter(Boolean).length;
  const totalBubbles = 25;

  const handlePop = (index) => {
    if (poppedStates[index]) return;

    playPop();
    triggerHaptic(25);

    const nextStates = [...poppedStates];
    nextStates[index] = true;
    setPoppedStates(nextStates);

    const messageRevealed = LOVE_MESSAGES[index % LOVE_MESSAGES.length];
    setLatestMessage(messageRevealed);

    const newCount = poppedCount + 1;
    if (newCount === totalBubbles) {
      playBloom();
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
    }
  };

  const handleResetSheet = () => {
    playSparkle();
    triggerHaptic(15);
    setPoppedStates(Array(25).fill(false));
    setLatestMessage(null);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Anti-Stress Love Bubble Wrap 🫧"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title="Love Stress-Relief Bubble Wrap 🫧"
      subtitle="Pop bubbles to relieve stress & unlock secret love notes from Abu!"
      description="Feeling stressed or tired? Pop any bubble to hear a satisfying POP sound & read a love note! 💕"
    >

      <div className="max-w-md mx-auto space-y-4 font-ui">

        {/* Progress & Counter Bar */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-pink-200 shadow-sm text-xs font-bold text-gray-800">
          <span className="text-rose-600 font-extrabold flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            Popped: {poppedCount} / {totalBubbles} Bubbles 🫧
          </span>
          <button
            onClick={handleResetSheet}
            className="px-3 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Fresh Sheet 🔄</span>
          </button>
        </div>

        {/* Revealing Message Card Banner */}
        <AnimatePresence mode="wait">
          {latestMessage ? (
            <motion.div
              key={latestMessage}
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white text-xs sm:text-sm font-bold shadow-xl text-center border-2 border-white/40"
            >
              <div className="text-[10px] text-pink-200 uppercase tracking-wider font-extrabold mb-0.5">
                💌 Secret Note Revealed:
              </div>
              <p className="font-nepali leading-relaxed">{latestMessage}</p>
            </motion.div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-pink-50/80 border border-pink-200 text-xs font-semibold text-rose-600 text-center">
              💡 Tap any bubble below to pop it and reveal Abu's secret message!
            </div>
          )}
        </AnimatePresence>

        {/* 5x5 Glossy Bubble Wrap Grid */}
        <div className="glass-card rounded-3xl p-4 sm:p-5 max-w-xs sm:max-w-sm mx-auto border-2 border-pink-300 shadow-2xl bg-gradient-to-b from-pink-100/70 via-rose-50/50 to-pink-100/70 text-center">
          <div className="grid grid-cols-5 gap-2.5 sm:gap-3 justify-center mx-auto">
            {poppedStates.map((isPopped, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: isPopped ? 1 : 1.1 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => handlePop(idx)}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 shadow-md border-2 ${
                  isPopped
                    ? 'bg-rose-200/60 border-rose-300 scale-90 shadow-inner'
                    : 'bg-gradient-to-tr from-pink-400 via-rose-400 to-pink-300 border-white text-white shadow-lg animate-pulse'
                }`}
                style={{
                  boxShadow: isPopped
                    ? 'inset 2px 2px 4px rgba(0,0,0,0.15)'
                    : '0 4px 10px rgba(244,63,94,0.35), inset -2px -2px 6px rgba(0,0,0,0.1), inset 2px 2px 6px rgba(255,255,255,0.6)'
                }}
              >
                {isPopped ? (
                  <span className="text-xs text-rose-400 font-black">💥</span>
                ) : (
                  <span className="text-sm font-bold opacity-95">🫧</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* All Popped Victory Celebration Card */}
        {poppedCount === totalBubbles && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl border-2 border-rose-500 shadow-2xl text-center space-y-3"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center mx-auto shadow-lg">
              <Smile className="w-7 h-7 animate-bounce" />
            </div>
            <h3 className="text-xl font-black text-rose-600 font-nepali">
              All 25 Bubbles Popped! 🎉
            </h3>
            <p className="text-xs text-gray-700 font-bold">
              Hope your stress disappeared my love! Abu loves you infinitely forever! ❤️
            </p>
            <button
              onClick={handleResetSheet}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs flex items-center gap-1.5 mx-auto shadow-lg hover:scale-105 transition-all cursor-pointer font-ui"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Get Another Bubble Sheet 🔄</span>
            </button>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
