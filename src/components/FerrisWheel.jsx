import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';

export default function FerrisWheel() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.ferrisWheel;
  const [activeCabin, setActiveCabin] = useState(null);

  const CABINS = [
    { id: 1, name: "Cabin 1: Nepalgunj First Memories", text: "Remembering where our hearts first connected in Nepal! 🇳🇵" },
    { id: 2, name: "Cabin 2: Osaka Night Lights", text: "Under Osaka's night sky, thinking of you every second! 🇯🇵" },
    { id: 3, name: "Cabin 3: Long Video Call Nights", text: "Hours of talking late at night until morning comes!" },
    { id: 4, name: "Cabin 4: Forever Marriage Dreams", text: "Riding high into our future wedding day together! 💍" }
  ];

  const handleCabinClick = (c) => {
    playSparkle();
    setActiveCabin(c);
  };

  return (
    <WorldShell
      theme="garden"
      badge="3D Night Ferris Wheel 🎡"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto rounded-full border-4 border-pink-400/40 bg-slate-950 flex items-center justify-center shadow-2xl mb-8">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="w-full h-full relative flex items-center justify-center">
          {CABINS.map((c, idx) => {
            const angle = (360 / CABINS.length) * idx;
            return (
              <button key={c.id} onClick={() => handleCabinClick(c)} className="absolute w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-125 transition-transform" style={{ transform: `rotate(${angle}deg) translate(110px) rotate(-${angle}deg)` }}>
                🎡
              </button>
            );
          })}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeCabin && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }} onClick={() => setActiveCabin(null)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="glass-card rounded-3xl p-6 max-w-md w-full border border-pink-300 bg-slate-900 text-white text-center relative">
              <button
                onClick={() => setActiveCabin(null)}
                className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-rose-500 hover:text-white text-rose-600 font-bold text-xs sm:text-sm font-ui border border-pink-200 shadow-md backdrop-blur-md transition-all cursor-pointer active:scale-95 z-[60]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setActiveCabin(null)}
                className="absolute top-4 right-4 flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/90 hover:bg-rose-500 hover:text-white text-rose-600 font-bold text-xs sm:text-sm font-ui border border-pink-200 shadow-md backdrop-blur-md transition-all cursor-pointer active:scale-95 z-[60]"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
              <Heart className="w-10 h-10 text-pink-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold font-nepali text-rose-400 mb-2">{activeCabin.name}</h3>
              <p className="text-xs font-ui text-indigo-200 leading-relaxed">{activeCabin.text}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WorldShell>
  );
}
