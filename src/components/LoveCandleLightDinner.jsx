import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const COURSES = [
  { course: "Starter 🥟", item: "Spicy Panipuri Delight", desc: "Bhuntu's absolute favorite treat!" },
  { course: "Main Course 🥟", item: "Steamed Momos with Special Chutney", desc: "Fresh, hot dumplings prepared with love!" },
  { course: "Dessert 🎂", item: "Strawberry Birthday Cake", desc: "Birthday cake reserved for Queen Sanzu!" }
];

export default function LoveCandleLightDinner() {
  const { triggerHaptic } = useAppStore();

  const [courseIdx, setCourseIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentCourse = COURSES[courseIdx % COURSES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectCourse = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setCourseIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🕯️ LOVE CANDLELIGHT DINNER 🕯️\n\n[${currentCourse.course} - ${currentCourse.item}]\n"${currentCourse.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Candlelight Dinner Date 🕯️✨"
      badgeIcon={<Flame className="w-3.5 h-3.5 text-amber-400" />}
      title={"Love Candlelight Dinner"}
      subtitle={"Virtual Romantic Candlelight Dinner Table for Two"}
      description={"Light romantic candles and enjoy dinner course meals with Queen Sanzu to unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* DINNER CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={courseIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Dinner Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-amber-950/80 px-3 py-1 rounded-lg text-xs font-mono text-amber-200 border border-white/20 font-bold">
                🕯️ {currentCourse.course}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                {currentCourse.item}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentCourse.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DINNER BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {COURSES.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectCourse(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                courseIdx === idx
                  ? 'bg-amber-500 text-white border-amber-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-amber-200 border-amber-500/40 hover:border-amber-400'
              }`}
            >
              🍽️ {c.course}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Dinner Menu</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
