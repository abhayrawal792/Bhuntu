import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Sparkles, X, Check, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function MysteryGiftBoxes() {
  const { boxes, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.mysteryGifts;
  const [openedBoxes, setOpenedBoxes] = useState([]);
  const [activeBox, setActiveBox] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handleOpenBox = (box) => {
    playSparkle();
    triggerHaptic([40, 80, 40]);
    if (!openedBoxes.includes(box.id)) {
      setOpenedBoxes((prev) => [...prev, box.id]);
    }
    setActiveBox(box);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-600 font-bold text-xs mb-3 shadow-sm font-ui">
        <Gift className="w-4 h-4 text-pink-500" />
        <span>Virtual Gift Unboxing 🎁</span>
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

      {/* Grid of 4 Mystery Gift Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {boxes.map((box) => {
          const isOpened = openedBoxes.includes(box.id);

          return (
            <motion.div
              key={box.id}
              onClick={() => handleOpenBox(box)}
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.96 }}
              className="glass-card rounded-3xl p-6 border-2 border-pink-200 shadow-xl cursor-pointer text-center relative overflow-hidden bg-white group flex flex-col items-center justify-between min-h-[220px]"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <span className="text-xs font-bold font-ui px-3 py-1 rounded-full bg-pink-100 text-rose-600">
                  {box.title}
                </span>
                {isOpened && <Check className="w-5 h-5 text-green-500" />}
              </div>

              {/* Gift Icon / Box Graphic */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${box.bg} text-white flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                <Gift className={`w-10 h-10 ${isOpened ? 'scale-110' : 'animate-bounce'}`} />
              </div>

              <div className="w-full mt-4">
                <p className="text-xs font-bold text-gray-800 font-ui mb-1">
                  {isOpened ? box.name : 'Wrapped Birthday Box'}
                </p>
                <span className="block text-[11px] text-rose-500 font-bold font-ui uppercase">
                  {isOpened ? 'Unwrapped ✨' : 'Tap to Unwrap 🎁'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Gift Detail Modal */}
      <AnimatePresence>
        {activeBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
            onClick={() => setActiveBox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-pink-300 shadow-2xl relative bg-white text-center"
            >
              <button
                onClick={() => setActiveBox(null)}
                className="absolute top-4 left-4 z-[60] p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 active:scale-95"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${activeBox.bg} text-white flex items-center justify-center mx-auto mb-4 shadow-xl animate-bounce`}>
                <Gift className="w-10 h-10" />
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold font-nepali text-rose-600 mb-1">
                {activeBox.nepaliName}
              </h3>
              <p className="text-xs text-pink-500 font-ui font-bold mb-4">
                "{activeBox.name}"
              </p>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-gray-800 font-nepali text-sm leading-relaxed mb-6">
                <p className="font-bold text-rose-700 mb-1">"{activeBox.nepaliDesc}"</p>
                <p className="text-xs text-gray-500 font-ui italic">"{activeBox.desc}"</p>
              </div>

              <button
                onClick={() => {
                  sendWhatsAppMessage(`🎁 Hey Abu! I am claiming my birthday gift: *${activeBox.name}* (${activeBox.nepaliName})!`, '🎁 Birthday Mystery Gift Claim');
                  setActiveBox(null);
                }}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-shadow text-xs font-ui flex items-center justify-center gap-2"
              >
                Claim Gift on WhatsApp 📲
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
