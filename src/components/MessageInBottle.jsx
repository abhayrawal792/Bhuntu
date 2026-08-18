import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Heart, Sparkles, X, Mail, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function MessageInBottle() {
  const { letter, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.messageBottle;
  const [isOpen, setIsOpen] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleUncork = () => {
    playSparkle();
    triggerHaptic([40, 80]);
    setIsOpen(true);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Ocean Waves Letter 🍾"
      badgeIcon={<Waves className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Ocean Canvas Container */}
      <div className="relative w-full max-w-md h-72 mx-auto rounded-3xl bg-gradient-to-b from-cyan-900 via-blue-900 to-indigo-950 border-2 border-cyan-400 shadow-2xl overflow-hidden flex items-center justify-center mb-8">
        {/* Floating Wave Graphic */}
        <div className="absolute inset-0 opacity-40 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Waves className="w-64 h-64 text-cyan-300" />
          </motion.div>
        </div>

        {/* Floating Bottle */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          onClick={handleUncork}
          className="relative z-10 cursor-pointer group text-center"
        >
          <div className="w-20 h-36 bg-cyan-200/30 backdrop-blur-md rounded-b-3xl rounded-t-lg border-2 border-cyan-300 shadow-2xl flex flex-col items-center justify-center relative group-hover:scale-110 transition-transform">
            <div className="w-8 h-4 bg-amber-700 rounded-t-sm border-b border-amber-800 -top-4 absolute flex items-center justify-center text-[11px] text-white font-bold">
              CORK
            </div>
            <Mail className="w-8 h-8 text-pink-300 animate-pulse" />
          </div>
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-200 text-[11px] font-bold font-ui border border-cyan-700">
            Tap Bottle to Uncork 🍾
          </span>
        </motion.div>
      </div>

      {/* Parchment Letter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-amber-300 shadow-2xl bg-amber-50 text-gray-900 relative text-left"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 left-4 z-[60] p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 active:scale-95"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-2 mb-4 text-amber-800 font-bold text-xs uppercase tracking-wider font-ui">
                <Heart className="w-4 h-4 fill-amber-700 text-amber-700" />
                <span>Parchment Sea Letter</span>
              </div>

              <p className="font-nepali text-base sm:text-lg leading-relaxed text-amber-950 mb-6 font-semibold">
                "{letter}"
              </p>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-amber-800 text-white font-bold rounded-2xl shadow-md cursor-pointer hover:bg-amber-900 transition-colors text-xs font-ui"
              >
                Seal Bottle Again 💖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WorldShell>
  );
}
