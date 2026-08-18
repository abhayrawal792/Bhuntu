import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Heart, Sparkles, RefreshCw, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const FORTUNES = [
  { text: 'A great journey across oceans will unite two loving hearts forever. 💕✈️', numbers: [7, 14, 21, 99] },
  { text: 'Your patience in long distance will be rewarded with a lifetime of togetherness. 🌏', numbers: [3, 11, 24, 88] },
  { text: 'The one who waits for you in Nepalgunj thinks about you every single minute. 💭', numbers: [1, 5, 18, 100] },
  { text: 'Marriage bells are closer than you think — trust the cosmic stars. 💍✨', numbers: [2, 9, 27, 77] },
  { text: 'Your kindness is your superpower — it\'s why everyone loves you, Bebo. 👑', numbers: [4, 12, 33, 95] },
  { text: 'A surprise video call at midnight will make your heart burst with joy. 🌙', numbers: [6, 16, 29, 66] },
];

export default function FortuneCookie() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.fortuneCookie;
  const { triggerHaptic } = useAppStore();

  const [cracking, setCracking] = useState(false);
  const [cracked, setCracked] = useState(false);
  const [activeFortune, setActiveFortune] = useState(null);

  const handleCrackCookie = () => {
    if (cracking || cracked) return;
    setCracking(true);
    playPop();
    triggerHaptic([40, 80, 40]);

    setTimeout(() => {
      setCracking(false);
      setCracked(true);
      const randomFortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      setActiveFortune(randomFortune);
      playSparkle();
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }, 1200);
  };

  const handleReset = () => {
    setCracked(false);
    setActiveFortune(null);
    setCracking(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center font-ui">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 font-bold text-xs mb-3 shadow-sm">
        <Cookie className="w-4 h-4 text-amber-600 animate-pulse" />
        <span>Physical Fortune Cookie Cracker 🥠</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2">
        {nepaliTitle}
      </h1>
      <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">{title}</h2>
      <p className="text-gray-600 text-xs sm:text-sm max-w-lg mx-auto mb-8">
        {nepaliSubtitle} — {subtitle}
      </p>

      {/* Interactive Physical Cookie Container */}
      <div className="max-w-md mx-auto min-h-[320px] flex flex-col items-center justify-center mb-6">
        {!cracked ? (
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.9, rotate: 10 }}
            animate={cracking ? { scale: [1, 1.2, 0.8], rotate: [-10, 10, -20, 20, 0] } : {}}
            transition={{ duration: 0.4 }}
            onClick={handleCrackCookie}
            className="w-52 h-52 rounded-full bg-gradient-to-tr from-amber-300 via-amber-200 to-amber-100 border-4 border-amber-400 shadow-2xl flex flex-col items-center justify-center cursor-pointer select-none relative group overflow-hidden"
          >
            <span className="text-7xl mb-2 group-hover:scale-110 transition-transform">🥠</span>
            <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded-full font-ui">
              {cracking ? 'Snapping Open...' : 'Tap to Snap Open! ✨'}
            </span>
          </motion.div>
        ) : (
          /* Unrolled Parchment Scroll */
          <AnimatePresence>
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="w-full bg-gradient-to-b from-amber-50 to-amber-100 p-6 rounded-3xl border-4 border-amber-300 shadow-2xl text-center relative"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl">📜</span>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-widest bg-amber-200 px-3 py-1 rounded-full">
                  Cosmic Fortune Slip
                </span>
                <span className="text-2xl">📜</span>
              </div>

              <Heart className="w-8 h-8 text-rose-500 fill-rose-500 mx-auto mb-3 animate-bounce" />

              <p className="font-nepali text-lg font-bold text-amber-950 leading-relaxed mb-4">
                "{activeFortune?.text}"
              </p>

              {/* Lucky Love Numbers */}
              <div className="pt-3 border-t border-amber-200 flex items-center justify-between text-xs text-amber-800">
                <span className="font-semibold">Lucky Love Numbers:</span>
                <div className="flex gap-1.5">
                  {activeFortune?.numbers.map((num, i) => (
                    <span key={i} className="w-6 h-6 rounded-full bg-amber-300 text-amber-950 font-bold flex items-center justify-center text-[11px]">
                      {num}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {cracked && (
        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-full bg-amber-500 text-white font-bold text-xs shadow-md hover:bg-amber-600 transition-colors cursor-pointer flex items-center gap-1.5 mx-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Crack Another Cookie 🥠</span>
        </button>
      )}
    </div>
  );
}
