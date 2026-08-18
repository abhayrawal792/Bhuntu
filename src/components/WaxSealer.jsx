import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Heart, Flame, Check } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const WAX_COLORS = [
  { name: 'Ruby Red', color: '#DC2626', bg: 'bg-red-600' },
  { name: 'Rose Pink', color: '#EC4899', bg: 'bg-pink-500' },
  { name: 'Royal Purple', color: '#7C3AED', bg: 'bg-purple-600' },
  { name: 'Golden', color: '#D97706', bg: 'bg-amber-600' },
];

const STAMP_DESIGNS = ['S♥A', 'S♥A', '♡', '∞'];

export default function WaxSealer() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.waxSealer;
  const [step, setStep] = useState(0); // 0: choose color, 1: pouring wax, 2: hold to stamp, 3: cooling, 4: done
  const [waxColor, setWaxColor] = useState(0);
  const [stampDesign, setStampDesign] = useState(0);
  const [pourProgress, setPourProgress] = useState(0);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [coolingProgress, setCoolingProgress] = useState(0);
  const { triggerHaptic } = useAppStore();

  const handlePour = () => {
    if (step !== 1) return;
    playSparkle();
    const next = pourProgress + 20;
    setPourProgress(next);
    if (next >= 100) {
      triggerHaptic([30, 60]);
      setTimeout(() => setStep(2), 500);
    }
  };

  // hold to stamp
  React.useEffect(() => {
    if (step !== 2 || !isHolding) { return; }
    const timer = setInterval(() => {
      setHoldProgress(p => {
        if (p >= 100) {
          setStep(3);
          triggerHaptic([40, 80, 40, 80]);
          playSparkle();
          clearInterval(timer);
          // start cooling
          let cool = 0;
          const coolTimer = setInterval(() => {
            cool += 5;
            setCoolingProgress(cool);
            if (cool >= 100) {
              clearInterval(coolTimer);
              setStep(4);
              confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
            }
          }, 100);
          return 100;
        }
        return p + 3;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [step, isHolding, triggerHaptic]);

  const selectedColor = WAX_COLORS[waxColor];

  return (
    <WorldShell
      theme="paper"
      badge="Wax Sealing Studio ✉️"
      badgeIcon={<Mail className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Step Progress */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {['Choose Color', 'Pour Wax', 'Stamp Seal', 'Cool Down', 'Done!'].map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
              step > i ? 'bg-green-500 text-white' : step === i ? 'bg-pink-500 text-white animate-pulse' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > i ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            {i < 4 && <div className={`w-4 h-0.5 ${step > i ? 'bg-green-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {/* Envelope */}
      <div className="w-72 h-48 mx-auto rounded-3xl bg-amber-100 border-4 border-amber-300 shadow-2xl relative mb-6 overflow-hidden">
        {/* Envelope pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #d97706 10px, #d97706 11px)' }} />
        </div>

        {/* Wax pool - grows with pour progress */}
        {step >= 1 && (
          <motion.div
            animate={{ scale: step >= 1 ? pourProgress / 100 : 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full z-10"
            style={{
              background: step >= 3
                ? `radial-gradient(circle, ${selectedColor.color}dd, ${selectedColor.color})`
                : `radial-gradient(circle, ${selectedColor.color}90, ${selectedColor.color}cc)`,
              boxShadow: step < 3 ? `0 0 20px ${selectedColor.color}60` : 'none',
            }}
          />
        )}

        {/* Stamp impression */}
        {step >= 3 && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: step === 4 ? 1 : 0.7 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full border-3 border-amber-200/50 flex items-center justify-center"
              style={{ background: step === 4 ? `${selectedColor.color}` : 'transparent' }}>
              <span className="text-amber-100 text-lg font-extrabold font-serif drop-shadow-lg">
                {STAMP_DESIGNS[stampDesign]}
              </span>
            </div>
          </motion.div>
        )}

        {/* Dripping wax animation */}
        <AnimatePresence>
          {step === 1 && (
            <motion.div initial={{ y: -20 }} animate={{ y: 60 }} transition={{ duration: 0.5 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <Flame className="w-6 h-6" style={{ color: selectedColor.color }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Labels */}
        <div className="absolute bottom-2 left-0 right-0 text-center z-10">
          <span className="text-[11px] font-bold text-amber-800/60 font-nepali">
            {step === 0 ? 'Choose wax color below ↓' :
             step === 1 ? `Tap to pour wax (${pourProgress}%)` :
             step === 2 ? 'Hold to press stamp seal ↓' :
             step === 3 ? `Cooling... ${coolingProgress}%` :
             '✨ Perfectly sealed!'}
          </span>
        </div>
      </div>

      {/* Step-specific controls */}
      {step === 0 && (
        <div className="max-w-sm mx-auto space-y-3">
          <p className="text-xs font-bold text-gray-600 mb-2">Choose Wax Color:</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            {WAX_COLORS.map((wc, i) => (
              <button key={i} onClick={() => { setWaxColor(i); playSparkle(); }}
                className={`w-10 h-10 rounded-full cursor-pointer shadow-md transition-all border-2 ${
                  waxColor === i ? 'ring-2 ring-offset-2 ring-pink-500 scale-110 border-white' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: wc.color }}
              />
            ))}
          </div>
          <p className="text-xs font-bold text-gray-600 mb-2">Choose Stamp Design:</p>
          <div className="flex items-center justify-center gap-3 mb-4">
            {STAMP_DESIGNS.map((sd, i) => (
              <button key={i} onClick={() => { setStampDesign(i); playSparkle(); }}
                className={`w-10 h-10 rounded-full border-2 cursor-pointer font-bold text-sm shadow-md transition-all ${
                  stampDesign === i ? 'bg-pink-500 text-white border-pink-500 scale-110' : 'bg-white text-gray-700 border-gray-300 hover:bg-pink-50'
                }`}>
                {sd}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-lg cursor-pointer hover:from-rose-600 hover:to-pink-600">
            Start Sealing Process ✉️
          </button>
        </div>
      )}

      {step === 1 && (
        <motion.button whileTap={{ scale: 0.9 }} onClick={handlePour}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-2 mx-auto">
          <Flame className="w-4 h-4" /> Pour Hot Wax ({pourProgress}%) 🕯️
        </motion.button>
      )}

      {step === 2 && (
        <div className="relative inline-block">
          {/* Hold progress ring */}
          <svg className="absolute inset-0 w-24 h-24 -m-1 mx-auto" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="4" />
            <motion.circle cx="50" cy="50" r="45" fill="none" stroke={selectedColor.color} strokeWidth="5" strokeLinecap="round"
              strokeDasharray={`${holdProgress * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <motion.button
            onMouseDown={() => setIsHolding(true)} onMouseUp={() => setIsHolding(false)} onMouseLeave={() => setIsHolding(false)}
            onTouchStart={() => setIsHolding(true)} onTouchEnd={() => setIsHolding(false)}
            className="w-22 h-22 rounded-full bg-slate-800 text-white font-bold text-lg shadow-2xl flex items-center justify-center mx-auto cursor-pointer border-4 border-amber-300 p-5"
          >
            <span className="text-2xl font-serif">{STAMP_DESIGNS[stampDesign]}</span>
          </motion.button>
          <p className="text-xs text-pink-400 mt-3 italic">👆 Press and hold to stamp the wax seal!</p>
        </div>
      )}

      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="p-4 rounded-2xl bg-pink-50 border border-pink-200 max-w-sm mx-auto">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
          <p className="text-xs text-pink-600 italic">
            "This envelope is sealed with wax, love, and a promise that will never break. For Sanzu, forever. ✉️💖"
          </p>
        </motion.div>
      )}
    </WorldShell>
  );
}
