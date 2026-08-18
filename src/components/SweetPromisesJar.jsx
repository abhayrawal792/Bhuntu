import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PROMISES = [
  "I promise to always bring you hot Momo and tea when you're tired 🥟☕",
  "I promise to hug you tight at the airport every single time we meet 🫂✈️",
  "I promise to listen to all your stories with full love and attention 💖",
  "I promise to hold your hand through every season of our lives 🌸🍂",
  "I promise to protect your smile and make you laugh every day 😊✨",
  "I promise to stand by your side forever and always, my Queen Sanzu 👑"
];

export default function SweetPromisesJar() {
  const { triggerHaptic } = useAppStore();

  const [promiseIdx, setPromiseIdx] = useState(0);
  const [pulled, setPulled] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPromise = PROMISES[promiseIdx % PROMISES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePullPromise = () => {
    playPop();
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setPulled(true);
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.5 } });
  };

  const handleNextPromise = () => {
    playPop();
    triggerHaptic(10);
    setPromiseIdx((prev) => (prev + 1) % PROMISES.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    setPulled(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🏺 100 LIFETIME PROMISES JAR 🏺\n\nPromise for Queen Sanzu:\n"${currentPromise}"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="100 Promises Jar 🏺✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500" />}
      title={"100 Lifetime Promises Jar"}
      subtitle={"Pull a Sealed Promise Note for Sanzu"}
      description={"Reach inside Abu's glass jar of promises to unlock sweet love notes and Sanzu's portrait photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* GLASS JAR STAGE */}
        <div
          onClick={handlePullPromise}
          className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center cursor-pointer"
        >
          {!pulled ? (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-rose-900/40 border-2 border-rose-400 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                🏺
              </div>
              <p className="text-xs font-extrabold text-rose-300 font-mono uppercase tracking-wider">
                GLASS JAR OF 100 PROMISES
              </p>
              <div className="px-4 py-2 rounded-xl bg-rose-600/30 text-rose-200 border border-rose-400/40 text-xs font-bold inline-block">
                Tap to Draw a Promise Note 📜
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-4"
            >
              {/* Photo Reveal */}
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Promise Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              {/* Promise Text */}
              <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-400/60 text-rose-200 text-xs sm:text-sm font-extrabold leading-relaxed">
                "{currentPromise}"
              </div>
            </motion.div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!pulled ? (
            <button
              type="button"
              onClick={handlePullPromise}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Draw Promise Note</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextPromise}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Promise & Photo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Promise</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
