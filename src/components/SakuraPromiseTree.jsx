import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Flower2, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function SakuraPromiseTree() {
  const { promises, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.promiseTree;
  const [selectedPromise, setSelectedPromise] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handleLeafClick = (p, idx) => {
    playSparkle();
    triggerHaptic([30, 60]);
    setSelectedPromise({ text: p, index: idx + 1 });
  };

  return (
    <WorldShell
      theme="garden"
      badge="Sakura Promise Tree 🌸"
      badgeIcon={<Flower2 className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Sakura Tree Container */}
      <div className="relative w-full max-w-md h-80 mx-auto rounded-3xl bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 border-2 border-pink-300 shadow-2xl p-6 flex items-center justify-center mb-8">
        {/* Tree Trunk Graphic */}
        <div className="absolute bottom-0 w-12 h-36 bg-amber-800 rounded-t-full border-t-2 border-amber-900" />

        {/* Floating Glowing Leaves */}
        <div className="relative z-10 grid grid-cols-3 gap-6">
          {promises.map((p, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleLeafClick(p, idx)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white flex flex-col items-center justify-center shadow-lg border-2 border-white cursor-pointer group"
            >
              <Heart className="w-6 h-6 fill-white" />
              <span className="text-[11px] font-bold font-ui">#{idx + 1}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Promise Modal */}
      <AnimatePresence>
        {selectedPromise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
            onClick={() => setSelectedPromise(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-pink-300 shadow-2xl bg-white text-center relative"
            >
              <button
                onClick={() => setSelectedPromise(null)}
                className="absolute top-4 left-4 z-[60] p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 active:scale-95"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <Heart className="w-8 h-8 fill-white" />
              </div>

              <h3 className="text-xl font-bold font-nepali text-rose-600 mb-2">
                Lifetime Promise #{selectedPromise.index} 🌸
              </h3>

              <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-gray-800 font-nepali text-base leading-relaxed mb-6 font-semibold">
                "{selectedPromise.text}"
              </div>

              <button
                onClick={() => setSelectedPromise(null)}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-md cursor-pointer text-xs font-ui"
              >
                Keep Promise Forever 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WorldShell>
  );
}
