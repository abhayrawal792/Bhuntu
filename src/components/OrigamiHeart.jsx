import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, FileText, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import confetti from 'canvas-confetti';

const FOLD_STEPS = [
  {
    label: "Step 1: Unfold the Paper",
    emoji: "📄",
    message: "Every love story starts with a blank page...",
    nepaliMsg: "Prem kahani sadhai ek kora kagaj bata suru hunxa...",
    rotate: 0, skewX: 0, scale: 1,
    bg: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
  },
  {
    label: "Step 2: First Fold — Your Name",
    emoji: "📃",
    message: "S-A-N-Z-U written across every fold...",
    nepaliMsg: "Sanzu — temro naam yo kagaj ko har mod ma lekhieko xa...",
    rotate: 8, skewX: -5, scale: 0.92,
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-200",
  },
  {
    label: "Step 3: Second Fold — My Promise",
    emoji: "💌",
    message: "I fold my promises into every crease...",
    nepaliMsg: "Mero har bacha yo kagaj ko har mod ma lukaayeko xu...",
    rotate: -5, skewX: 8, scale: 0.85,
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-300",
  },
  {
    label: "Step 4: Final Fold — A Heart!",
    emoji: "💗",
    message: "Every fold was leading to this... my heart for you!",
    nepaliMsg: "Har mod le yehi banauna khojeko thiyo — mero mutu temi lai!",
    rotate: 0, skewX: 0, scale: 1,
    bg: "from-rose-100 to-pink-100",
    border: "border-rose-400",
  },
];

export default function OrigamiHeart() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.origami;
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleFold = () => {
    playSparkle();
    triggerHaptic([30, 60]);

    if (step < FOLD_STEPS.length - 1) {
      setStep(s => s + 1);
    } else if (!completed) {
      setCompleted(true);
      triggerHaptic([40, 80, 40, 120]);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#FF85A1', '#FFB703', '#F72585', '#FF006E', '#FFFFFF'],
      });
    }
  };

  const handleReset = () => {
    setStep(0);
    setCompleted(false);
    playSparkle();
  };

  const currentStep = FOLD_STEPS[step];

  return (
    <WorldShell
      theme="paper"
      badge="3D Origami Heart 📄"
      badgeIcon={<FileText className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1 mb-5">
        {FOLD_STEPS.map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
              step > i || completed ? 'bg-green-500 text-white scale-100' :
              step === i ? 'bg-pink-500 text-white animate-pulse scale-110' :
              'bg-gray-200 text-gray-500'
            }`}>
              {step > i || completed ? '✓' : i + 1}
            </div>
            {i < FOLD_STEPS.length - 1 && (
              <div className={`w-6 h-0.5 transition-all ${step > i ? 'bg-green-400' : 'bg-gray-200'}`} />
            )}
          </div>
        ))}
      </div>

      {/* The Origami Paper / Heart */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        onClick={handleFold}
        className={`w-64 h-64 mx-auto rounded-3xl bg-gradient-to-br ${currentStep.bg} border-4 ${currentStep.border} shadow-2xl flex flex-col items-center justify-center cursor-pointer relative mb-4 overflow-hidden`}
        style={{ perspective: '800px' }}
      >
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="completed"
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              className="text-center p-4 relative z-10"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-24 h-24 text-rose-500 fill-rose-500 mx-auto mb-3 drop-shadow-lg" />
              </motion.div>
              <p className="text-xs font-extrabold font-nepali text-rose-700 leading-relaxed">
                I Love You Bebo Forever!
              </p>
              <p className="text-[11px] text-pink-500 mt-1 font-ui">
                Sadhai sadhai ko lagi — Temro Bebo 💕
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{
                rotateY: 0,
                opacity: 1,
                rotate: currentStep.rotate,
                skewX: currentStep.skewX,
                scale: currentStep.scale,
              }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              className="text-center p-4 relative z-10"
            >
              <motion.span
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-3 block"
              >
                {currentStep.emoji}
              </motion.span>
              <p className="text-[11px] font-bold font-ui text-rose-600 mb-1">{currentStep.label}</p>
              <p className="text-[11px] text-gray-600 font-ui italic">Tap to continue folding →</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fold crease lines */}
        {step > 0 && !completed && (
          <>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-pink-300/50" style={{ transform: `rotate(${step * 15}deg)` }} />
            {step > 1 && <div className="absolute top-0 bottom-0 left-1/2 w-px bg-pink-300/50" style={{ transform: `rotate(${step * -10}deg)` }} />}
          </>
        )}
      </motion.div>

      {/* Message Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 rounded-2xl bg-white border border-pink-200 shadow-lg max-w-sm mx-auto mb-4"
        >
          <p className="text-xs font-bold text-gray-800 font-ui mb-1">
            "{completed ? 'Every fold was made with love — just for you, my Bhuntu!' : currentStep.message}"
          </p>
          <p className="text-[11px] text-pink-500 font-nepali italic">
            {completed ? 'Har mod le maya bokeko thiyo — temro lagi matra, mero Bhuntu!' : currentStep.nepaliMsg}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-3">
        {!completed ? (
          <button
            onClick={handleFold}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
          >
            <Sparkles className="w-4 h-4" />
            <span>{step === FOLD_STEPS.length - 1 ? 'Complete the Heart! 💗' : `Fold Step ${step + 2} →`}</span>
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
          >
            <span>Fold Again! 📄💖</span>
          </button>
        )}
      </div>
    </WorldShell>
  );
}
