import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function TypewriterQuotes() {
  const { quotes, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.quotesGenerator;
  const [index, setIndex] = useState(0);
  const { triggerHaptic } = useAppStore();

  const handleNextQuote = () => {
    playSparkle();
    triggerHaptic(20);
    setIndex((prev) => (prev + 1) % quotes.length);
  };

  const current = quotes[index];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-center">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs mb-3 shadow-sm font-ui">
        <Quote className="w-4 h-4 text-pink-500" />
        <span>Love Quotes Generator 📜</span>
      </div>
      <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2 drop-shadow-sm">
        {nepaliTitle}
      </h1>
      <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">
        {title}
      </h2>
      <p className="text-gray-600 text-xs sm:text-sm font-ui max-w-lg mx-auto mb-8">
        {nepaliSubtitle} — {subtitle}
      </p>

      {/* Quote Polaroid Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -15 }}
          className="glass-card rounded-3xl p-8 sm:p-10 max-w-xl mx-auto border-2 border-pink-300 shadow-2xl bg-white text-left relative overflow-hidden mb-8"
        >
          <div className="absolute top-4 right-4 opacity-10">
            <Heart className="w-24 h-24 text-pink-500 fill-pink-500" />
          </div>

          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider mb-4 font-ui">
            <Sparkles className="w-4 h-4" />
            <span>Daily Love Note #{index + 1}</span>
          </div>

          <p className="text-gray-900 font-nepali text-lg sm:text-xl font-bold leading-relaxed mb-4">
            "{current.nepali}"
          </p>

          <p className="text-gray-500 font-ui text-sm sm:text-base italic pt-4 border-t border-pink-100">
            "{current.english}"
          </p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handleNextQuote}
        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm shadow-xl flex items-center gap-2 mx-auto cursor-pointer hover:scale-105 transition-transform font-ui"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Generate Next Quote ✨</span>
      </button>
    </div>
  );
}
