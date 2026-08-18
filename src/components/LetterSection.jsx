import React, { useState } from 'react';
import { Mail, Heart, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop } from './AudioController';

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleEnvelope = () => {
    if (!isOpen) playSparkle();
    else playPop();
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="py-10 sm:py-20 px-3 sm:px-4 bg-gradient-to-b from-[#061D17] via-[#0C3329] to-[#04120E] text-emerald-100 relative overflow-hidden min-h-dvh flex flex-col justify-center">
      <div className="max-w-4xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Heartwritten Letter • Sanzu..!!👀🤍✨</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-nepali text-white mb-2 leading-tight">
            {birthdayData.loveLetter.nepaliTitle}
          </h2>
          <p className="text-emerald-300 font-ui text-sm sm:text-base">
            Tap the envelope seal to unseal my feelings for Bebo...
          </p>
        </div>


        <div className="relative max-w-2xl mx-auto">

          {/* Envelope Cover */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                onClick={handleToggleEnvelope}
                className="glass-card rounded-3xl p-7 sm:p-12 shadow-2xl border-2 border-pink-300 text-center cursor-pointer group overflow-hidden relative active:scale-98 transition-transform"
              >
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pink-400 via-rose-500 to-red-400 rounded-t-3xl" />

                <motion.div
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 rounded-full bg-pink-100 border-2 border-pink-300 flex items-center justify-center shadow-inner"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 fill-rose-500" />
                </motion.div>

                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-rose-500 mb-2 font-ui">
                  Sealed with Endless Love
                </span>
                <h3 className="text-xl sm:text-3xl font-bold font-nepali text-gray-900 mb-5 leading-snug">
                  Mero Bhuntu / Bebo ko lagi vishesh letter
                </h3>

                <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  <span>Tap to Open Envelope</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unfolded Love Letter — slides up like iOS modal */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                className="bg-[#FFFDF9] rounded-3xl shadow-2xl border border-amber-200 relative font-serif overflow-hidden"
              >
                {/* Top ribbon */}
                <div className="h-2 bg-gradient-to-r from-amber-400 via-rose-400 to-pink-400 rounded-t-3xl" />

                <div className="p-6 sm:p-10">
                  {/* Header row */}
                  <div className="flex items-start justify-between border-b border-amber-200/80 pb-5 mb-6">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-rose-500 fill-rose-500 flex-shrink-0" />
                      <span className="font-handwriting text-lg text-rose-600 font-bold leading-snug">
                        For My Dearest Bhuntu & Bebo
                      </span>
                    </div>
                    <button
                      onClick={handleToggleEnvelope}
                      className="ml-3 flex-shrink-0 text-xs font-bold text-gray-400 px-3 py-2 rounded-full bg-amber-50 border border-amber-200 cursor-pointer active:scale-95 transition-transform"
                    >
                      Close
                    </button>
                  </div>

                  {/* Salutation */}
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-5 font-nepali leading-snug">
                    {birthdayData.loveLetter.salutation}
                  </h3>

                  {/* Letter body */}
                  <div className="space-y-5 text-gray-800">
                    {birthdayData.loveLetter.paragraphs.map((para, idx) => (
                      <p
                        key={idx}
                        className={`leading-relaxed ${
                          idx % 2 === 1
                            ? 'font-nepali text-rose-900 font-medium text-sm sm:text-base'
                            : 'font-handwriting text-lg sm:text-xl text-gray-900'
                        }`}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Signature */}
                  <div className="mt-8 pt-5 border-t border-amber-200/80 text-right">
                    <p className="font-handwriting text-xl sm:text-2xl text-rose-600 font-bold mb-1">
                      {birthdayData.loveLetter.closing}
                    </p>
                    <p className="font-script text-2xl sm:text-3xl text-gray-800">
                      {birthdayData.loveLetter.signature}
                    </p>
                  </div>

                  {/* Close button at bottom — easy one-thumb reach on iPhone */}
                  <button
                    onClick={handleToggleEnvelope}
                    className="mt-6 w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-100 to-rose-100 text-rose-600 font-bold text-sm border border-rose-200 active:scale-95 transition-transform cursor-pointer"
                  >
                    Seal the Envelope 💌
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
