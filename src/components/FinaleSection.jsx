import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GiftBox3D from '../3d/GiftBox3D';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import InteractiveCake from './InteractiveCake';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function FinaleSection() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [showSecretButton, setShowSecretButton] = useState(false);
  const { triggerHaptic } = useAppStore();
  const navigate = useNavigate();

  const triggerGrandConfetti = () => {
    playSparkle();
    triggerHaptic([40, 80, 40, 80, 120]);
    setIsBoxOpen(true);

    const count = 250;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#FF85A1', '#FFB703', '#F72585', '#7209B7', '#4CC9F0', '#FFFFFF']
    };

    function fire(particleRatio, opts) {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2,  { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1,  { spread: 120, startVelocity: 45 });

    // Show secret button after a delay — once the confetti settles
    setTimeout(() => setShowSecretButton(true), 3000);
  };

  const handleSecretReveal = () => {
    playSparkle();
    triggerHaptic([20, 60, 20, 100, 200]);
    navigate('/ring');
  };

  return (
    <section id="finale" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#FAF8F8] via-[#FFE5EC] to-[#FFF0F3] relative overflow-hidden min-h-dvh flex flex-col justify-center">
      {/* Floating Sparkle Elements */}
      <div className="absolute top-1/4 left-6 text-pink-300 animate-float pointer-events-none">
        <Heart className="w-10 h-10 fill-pink-300/40" />
      </div>
      <div className="absolute bottom-1/4 right-6 text-rose-400 animate-float pointer-events-none" style={{ animationDelay: '2s' }}>
        <Heart className="w-14 h-14 fill-rose-300/30" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-200 shadow-md text-xs font-bold text-rose-600 mb-6 animate-pulse">
          <PartyPopper className="w-4 h-4 text-pink-500" />
          <span>The Grand Finale Surprise 🎊</span>
        </div>

        {/* Interactive Cake */}
        <InteractiveCake />

        {/* Ultra-smooth Animated Gift Box */}
        <div className="w-full py-8 relative mb-4 flex flex-col items-center justify-center">
          <button
            onClick={() => { playSparkle(); setIsBoxOpen(!isBoxOpen); }}
            className="w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-tr from-rose-500 via-pink-500 to-rose-400 rounded-3xl shadow-[0_0_40px_rgba(244,63,94,0.5)] border-4 border-yellow-300 flex flex-col items-center justify-center text-white cursor-pointer transition-transform hover:scale-105 active:scale-95 group relative"
          >
            <Gift className={`w-16 h-16 text-yellow-200 transition-transform duration-500 ${isBoxOpen ? 'rotate-12 scale-110' : 'group-hover:bounce'}`} />
            <span className="text-xs font-black uppercase mt-2 tracking-wider">
              {isBoxOpen ? '🎁 Open Surprise!' : '🎁 Tap To Open Gift!'}
            </span>
          </button>
        </div>

        {/* Open Gift Button */}
        {!isBoxOpen && (
          <motion.button
            onClick={triggerGrandConfetti}
            className="btn-romantic px-8 py-4 font-semibold text-lg rounded-full shadow-xl flex items-center gap-2 mx-auto cursor-pointer mb-8"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Gift className="w-5 h-5" />
            <span>Unwrap Your Birthday Gift 🎉</span>
          </motion.button>
        )}

        {/* Celebratory Message Card */}
        {isBoxOpen && (
          <motion.div
            className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-pink-300 shadow-2xl max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold font-nepali text-rose-600 mb-3 drop-shadow-sm leading-tight">
              {birthdayData.finale.nepaliTitle}
            </h2>
            <h3 className="text-xl sm:text-3xl font-script text-pink-500 mb-5">
              {birthdayData.finale.title}
            </h3>

            <p className="text-gray-800 font-nepali text-base sm:text-lg leading-relaxed mb-3">
              "{birthdayData.finale.nepaliGiftBoxMessage}"
            </p>
            <p className="text-gray-500 font-ui text-sm sm:text-base italic mb-7">
              "{birthdayData.finale.giftBoxMessage}"
            </p>

            <div className="pt-5 border-t border-pink-200 flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg animate-heartbeat">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <span className="font-handwriting text-xl font-bold text-gray-900">
                Forever Yours, {birthdayData.partner.name}
              </span>
            </div>

            {/* ── SECRET SURPRISE BUTTON — appears 3s after confetti ── */}
            {/* Labeled as "wait there's more" — NOT mentioning ring at all */}
            <AnimatePresence>
              {showSecretButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 180, delay: 0.2 }}
                  className="mt-6 pt-5 border-t border-pink-200"
                >
                  <motion.p
                    className="text-xs font-bold text-rose-500 uppercase tracking-widest font-ui mb-3"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨ Wait... there's one more thing ✨
                  </motion.p>
                  <motion.button
                    onClick={handleSecretReveal}
                    className="w-full py-4 rounded-2xl font-bold text-base cursor-pointer border-2 border-dashed border-rose-400 text-rose-600 bg-rose-50 active:scale-95 transition-transform"
                    animate={{
                      boxShadow: [
                        '0 0 0px rgba(255,133,161,0)',
                        '0 0 20px rgba(255,133,161,0.6)',
                        '0 0 0px rgba(255,133,161,0)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    whileTap={{ scale: 0.95 }}
                  >
                    🎁 Open Your Final Surprise...
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
