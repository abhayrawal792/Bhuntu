import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cake, Sparkles, Check, Flame } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const STEPS = ['1. Mix Batter & Bake', '2. Frosting & Design', '3. Blow Candles & Celebrate 🎉'];
const FROSTINGS = ['💗 Pink Strawberry', '🍫 Chocolate Velvet', '🍦 Vanilla Cream', '💜 Lavender Bliss'];
const TOPPINGS = ['🍓 Fresh Berries', '💖 Sugar Hearts', '👑 Golden Crown'];

export default function CakeBakingGame() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.cookingGame;
  const [step, setStep] = useState(0);
  const [selectedFrosting, setSelectedFrosting] = useState(FROSTINGS[0]);
  const [selectedToppings, setSelectedToppings] = useState([TOPPINGS[0]]);
  const [candlesLit, setCandlesLit] = useState(true);
  const { triggerHaptic } = useAppStore();

  const toggleTopping = (top) => {
    playSparkle();
    triggerHaptic(15);
    if (selectedToppings.includes(top)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== top));
    } else {
      setSelectedToppings([...selectedToppings, top]);
    }
  };

  const handleBlowCandles = () => {
    playSparkle();
    triggerHaptic([40, 80, 40]);
    setCandlesLit(false);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Baking & Candle Blowing Studio 🎂"
      badgeIcon={<Cake className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Step Indicator */}
      <div className="flex justify-center gap-2 max-w-md mx-auto mb-6">
        {STEPS.map((s, idx) => (
          <div key={idx} className={`px-3 py-1 rounded-full text-[11px] font-bold font-ui border ${step === idx ? 'bg-rose-500 text-white border-rose-500' : 'bg-gray-100 text-gray-600'}`}>
            {s}
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-6 max-w-md mx-auto border-2 border-pink-300 shadow-2xl bg-white mb-6">
        {/* Cake Container */}
        <div className="w-44 h-44 mx-auto rounded-3xl bg-pink-100 flex flex-col items-center justify-center border-4 border-pink-300 shadow-inner mb-6 relative">
          {step === 2 && candlesLit && (
            <div className="flex gap-2 absolute -top-5">
              <Flame className="w-6 h-6 text-amber-500 animate-bounce" />
              <Flame className="w-6 h-6 text-amber-500 animate-bounce delay-100" />
              <Flame className="w-6 h-6 text-amber-500 animate-bounce delay-200" />
            </div>
          )}
          <Cake className="w-24 h-24 text-rose-500" />
          <span className="text-xs font-bold font-ui text-rose-600 mt-2">{selectedFrosting}</span>
        </div>

        {step === 0 && (
          <button onClick={() => setStep(1)} className="w-full py-3 rounded-full bg-rose-500 text-white font-bold text-xs shadow-lg hover:bg-rose-600 font-ui cursor-pointer">
            Mix Ingredients & Bake Cake 🥣
          </button>
        )}

        {step === 1 && (
          <div className="space-y-4 text-left text-xs font-ui">
            <div>
              <span className="font-bold text-gray-700 block mb-2">Pick Frosting:</span>
              <div className="flex flex-wrap gap-1.5">
                {FROSTINGS.map((f) => (
                  <button key={f} onClick={() => setSelectedFrosting(f)} className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer ${selectedFrosting === f ? 'bg-rose-500 text-white border-rose-500' : 'bg-gray-100 text-gray-700'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep(2)} className="w-full mt-4 py-3 rounded-full bg-rose-500 text-white font-bold text-xs shadow-lg hover:bg-rose-600 font-ui cursor-pointer">
              Next: Light Candles & Celebrate 🕯️
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={handleBlowCandles} className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-transform cursor-pointer font-ui">
              {candlesLit ? 'Blow Out Birthday Candles! 🎂' : 'Candles Blown! Happy Birthday Bebo! 🎉'}
            </button>
          </div>
        )}
      </div>
    </WorldShell>
  );
}
