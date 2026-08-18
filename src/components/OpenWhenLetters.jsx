import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, PartyPopper, Sun, X, Lock, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const ICON_MAP = {
  Heart: Heart,
  Sparkles: Sparkles,
  PartyPopper: PartyPopper,
  Sun: Sun
};

export default function OpenWhenLetters() {
  const { letters, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.timeCapsule;
  const [selectedLetter, setSelectedLetter] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handleOpenEnvelope = (letter) => {
    playSparkle();
    triggerHaptic([30, 70, 30]);
    setSelectedLetter(letter);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs mb-3 shadow-sm">
          <Mail className="w-4 h-4 text-pink-500" />
          <span>Love Letters Capsule 💌</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2 drop-shadow-sm">
          {nepaliTitle}
        </h1>
        <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm font-ui max-w-lg mx-auto">
          {nepaliSubtitle} — {subtitle}
        </p>
      </div>

      {/* Grid of Virtual Envelopes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {letters.map((letter) => {
          const IconComponent = ICON_MAP[letter.icon] || Heart;

          return (
            <motion.div
              key={letter.id}
              onClick={() => handleOpenEnvelope(letter)}
              className="glass-card rounded-3xl p-6 border-2 border-pink-200/80 shadow-lg hover:shadow-2xl cursor-pointer relative overflow-hidden group transition-all duration-300 bg-gradient-to-br from-white via-rose-50/30 to-pink-50/50"
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Decorative Wax Seal Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${letter.bg} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 fill-white/20" />
                </div>
                <span className="text-[11px] font-bold font-ui px-3 py-1 rounded-full bg-pink-100 text-pink-600 border border-pink-200">
                  Tap to Seal Break ✉️
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold font-nepali text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                {letter.nepaliTitle}
              </h3>
              <p className="text-xs text-gray-500 font-ui italic">
                "{letter.title}"
              </p>

              {/* Envelope flap visual line */}
              <div className="mt-4 pt-3 border-t border-dashed border-pink-200 flex items-center justify-between text-xs text-rose-500 font-semibold font-ui">
                <span>Read Message</span>
                <Mail className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Envelope Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-pink-300 shadow-2xl relative bg-white"
            >
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 left-4 z-[60] p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 active:scale-95"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${selectedLetter.bg} text-white flex items-center justify-center mx-auto mb-3 shadow-xl animate-bounce`}>
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-nepali text-rose-600">
                  {selectedLetter.nepaliTitle}
                </h3>
                <p className="text-xs text-pink-500 font-script text-base">
                  {selectedLetter.title}
                </p>
              </div>

              {/* Letter Parchment Box */}
              <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 text-gray-800 font-nepali text-sm sm:text-base leading-relaxed mb-6 shadow-inner">
                "{selectedLetter.content}"
              </div>

              <div className="text-center">
                <p className="text-xs font-bold text-gray-400 font-ui mb-4">
                  Forever Sealed With Love For Sanzu Rawal (Bhuntu) ❤️
                </p>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-shadow font-ui text-sm"
                >
                  Close Envelope
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
