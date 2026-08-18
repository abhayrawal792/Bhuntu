import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HelpCircle, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const TRIVIA = [
  { question: "Trivia Question #1: What is Queen Sanzu's favorite spicy dish? 🥟", answer: "Spicy panipuri & steamed momos!" },
  { question: "Trivia Question #2: Where are Abu & Sanzu currently located? 🌐", answer: "Abu in Nepalgunj, Nepal 🇳🇵 & Sanzu in Sakai, Osaka, Japan 🇯🇵!" },
  { question: "Trivia Question #3: When did Sanzu accept Abu's proposal? 💍", answer: "October 28, 2025!" }
];

export default function BhuntuTriviaWheel() {
  const { triggerHaptic } = useAppStore();

  const [trivIdx, setTrivIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentTrivia = TRIVIA[trivIdx % TRIVIA.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSpinTrivia = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setTrivIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎡 BHUNTU TRIVIA WHEEL 🎡\n\n[${currentTrivia.question}]\nAnswer: "${currentTrivia.answer}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Bhuntu Trivia Wheel 🎡✨"
      badgeIcon={<HelpCircle className="w-3.5 h-3.5 text-cyan-400" />}
      title={"Bhuntu Trivia Wheel"}
      subtitle={"Spin Romantic Trivia Wheel Questions"}
      description={"Spin the interactive relationship trivia wheel to test how well you know Abu & Sanzu's love story!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* TRIVIA CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={trivIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-cyan-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Trivia Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-cyan-900/80 px-3 py-1 rounded-lg text-xs font-mono text-cyan-200 border border-white/20 font-bold">
                🎡 Question #{trivIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider mb-1">
                {currentTrivia.question}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentTrivia.answer}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* TRIVIA BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {TRIVIA.map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSpinTrivia(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                trivIdx === idx
                  ? 'bg-cyan-500 text-white border-cyan-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-cyan-200 border-cyan-500/40 hover:border-cyan-400'
              }`}
            >
              🎡 Q #{idx + 1}
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
            <span>Share Trivia Question</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
