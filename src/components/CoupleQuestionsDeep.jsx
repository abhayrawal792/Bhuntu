import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MessageSquare, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const QUESTIONS = [
  "What was the exact moment you realized I was your forever person? 💕",
  "If we could teleport right now to any place on Earth for 1 hour, where would we go? ✈️",
  "What is your absolute favorite memory of us from this past year? 📸",
  "How do you imagine our cozy home looking after we get married? 🏠💍",
  "What is 1 small thing I do that always makes your heart melt? 🥰"
];

export default function CoupleQuestionsDeep() {
  const { triggerHaptic } = useAppStore();

  const [activeIdx, setActiveIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentQuestion = QUESTIONS[activeIdx % QUESTIONS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const drawQuestion = () => {
    playBloom();
    playSparkle();
    triggerHaptic(20);
    setActiveIdx((prev) => (prev + 1) % QUESTIONS.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💬 100 LATE-NIGHT QUESTIONS 💬\n\nQuestion for Queen Sanzu:\n"${currentQuestion}"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="100 Late-Night Questions 💬✨"
      badgeIcon={<MessageSquare className="w-3.5 h-3.5 text-purple-500" />}
      title={"100 Late-Night Questions"}
      subtitle={"Deep Connection Questions for Sanzu & Abu"}
      description={"Draw a card deck question for late-night video call conversations and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* QUESTION DECK CARD & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Question Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            <div className="pt-2">
              <p className="text-sm font-extrabold text-white leading-relaxed mb-3">
                "{currentQuestion}"
              </p>
              <span className="text-[10px] font-mono text-purple-300 bg-purple-900/60 px-3 py-1 rounded-full border border-purple-400 font-bold">
                Card {activeIdx + 1} of {QUESTIONS.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={drawQuestion}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Draw Next Question</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Question</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
