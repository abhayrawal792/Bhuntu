import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Heart, CheckCircle, Mic } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { playSparkle, playPop } from './AudioController';

export default function InteractiveCake() {
  const { candlesBlown, setCandlesBlown, triggerHaptic } = useAppStore();
  const [isListening, setIsListening] = useState(false);

  const handleCandleExtinguish = () => {
    playSparkle();
    triggerHaptic([50, 100, 50, 100, 150]);
    setCandlesBlown(true);

    // Multi-burst celebration confetti
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FF85A1', '#FFB703', '#F72585', '#FFFFFF', '#7209B7']
    });
  };

  return (
    <div className="glass-card rounded-3xl p-8 border-2 border-pink-300 shadow-2xl text-center max-w-md mx-auto my-8 relative overflow-hidden bg-white/90 backdrop-blur-md">
      {/* Visual Birthday Cake */}
      <div className="relative w-40 h-40 mx-auto mb-6 flex flex-col items-center justify-center">
        {/* Floating Candles & Flame */}
        {!candlesBlown ? (
          <div className="relative mb-2 flex items-center justify-center gap-3">
            <div className="relative">
              <div className="w-5 h-7 bg-gradient-to-t from-yellow-500 via-orange-400 to-yellow-200 rounded-full animate-bounce mx-auto shadow-lg shadow-yellow-400/60 flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 text-white fill-yellow-200" />
              </div>
              <div className="w-1.5 h-5 bg-amber-800 mx-auto rounded-t-sm"></div>
            </div>

            <div className="relative -mt-2">
              <div className="w-6 h-8 bg-gradient-to-t from-yellow-500 via-orange-400 to-yellow-200 rounded-full animate-bounce mx-auto shadow-lg shadow-yellow-400/60 flex items-center justify-center" style={{ animationDelay: '0.2s' }}>
                <Flame className="w-4 h-4 text-white fill-yellow-200" />
              </div>
              <div className="w-1.5 h-6 bg-amber-800 mx-auto rounded-t-sm"></div>
            </div>

            <div className="relative">
              <div className="w-5 h-7 bg-gradient-to-t from-yellow-500 via-orange-400 to-yellow-200 rounded-full animate-bounce mx-auto shadow-lg shadow-yellow-400/60 flex items-center justify-center" style={{ animationDelay: '0.4s' }}>
                <Flame className="w-3.5 h-3.5 text-white fill-yellow-200" />
              </div>
              <div className="w-1.5 h-5 bg-amber-800 mx-auto rounded-t-sm"></div>
            </div>
          </div>
        ) : (
          <div className="relative mb-2">
            <div className="text-xs text-rose-500 font-bold animate-pulse italic">✨ Wishes Sent to Heaven ✨</div>
            <div className="w-1.5 h-5 bg-gray-300 mx-auto rounded-t-sm"></div>
          </div>
        )}

        {/* Cake Layer 1 (Top Frosting) */}
        <div className="w-32 h-10 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 rounded-t-2xl border-b-4 border-pink-200 shadow-md flex items-center justify-center">
          <span className="text-white text-xs font-bold font-nepali">For Bebo ❤️</span>
        </div>
        {/* Cake Layer 2 (Bottom Base) */}
        <div className="w-40 h-14 bg-gradient-to-r from-rose-400 via-pink-500 to-rose-500 rounded-b-2xl shadow-xl flex items-center justify-center border-t-2 border-white/40">
          <span className="text-white text-xs font-bold">2061/05/04 • Bhuntu</span>
        </div>
      </div>

      {/* Action Buttons */}
      {!candlesBlown ? (
        <div className="space-y-3">
          <h4 className="text-xl font-bold font-nepali text-gray-900 mb-1">
            Make A Birthday Wish, Bebo! 🎂✨
          </h4>
          <p className="text-xs text-gray-600 font-ui mb-4">
            Tap the button below to blow out your birthday candles and unlock your grand gift!
          </p>

          <button
            onClick={handleCandleExtinguish}
            className="w-full py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 text-white font-bold text-base rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/40"
          >
            <Sparkles className="w-5 h-5" />
            <span>Tap to Blow Out Candles 🎂</span>
          </button>
        </div>
      ) : (
        <div className="space-y-2 animate-fade-in">
          <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-bold font-nepali text-gray-900">
            Candles Blown & Wish Made! 🎉
          </h4>
          <p className="text-xs text-gray-600 font-ui">
            May all your dreams come true, my sweet Bebo!
          </p>
        </div>
      )}
    </div>
  );
}
