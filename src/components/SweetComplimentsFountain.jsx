import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Heart } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const COMPLIMENTS = [
  "You have the warmest, sweetest smile that lights up Abu's world 🌸",
  "Your kindness, elegance, and pure heart inspire me every day 💕",
  "You are the most precious queen in the whole universe! 👑✨"
];

export default function SweetComplimentsFountain() {
  const { triggerHaptic } = useAppStore();

  const [coins, setCoins] = useState(0);
  const [complimentIdx, setComplimentIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentCompliment = COMPLIMENTS[complimentIdx % COMPLIMENTS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleTossCoin = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setCoins((c) => c + 1);
    setComplimentIdx((prev) => (prev + 1) % COMPLIMENTS.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `⛲ FOUNTAIN OF COMPLIMENTS ⛲\n\nTossed ${coins} Coins into the Wishing Fountain!\nCompliment: "${currentCompliment}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Fountain of Compliments ⛲✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-sky-400" />}
      title={"Fountain of Compliments"}
      subtitle={"Toss Coins for Sweet Compliments"}
      description={"Toss golden coins into the wishing fountain to reveal sweet compliments and Sanzu's memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* FOUNTAIN CANVAS & PHOTO DISCOVERY */}
        <div
          onClick={handleTossCoin}
          className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-sky-400/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center cursor-pointer overflow-hidden"
        >
          {coins > 0 ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Compliment Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-500/20 border border-sky-300/60 text-sky-200 text-xs font-extrabold leading-relaxed">
                "{currentCompliment}"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-sky-900/30 border-2 border-sky-300 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                ⛲
              </div>
              <p className="text-xs font-extrabold text-sky-300 font-mono uppercase tracking-wider">
                FOUNTAIN OF COMPLIMENTS
              </p>
              <div className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-200 border border-sky-300/40 text-xs font-bold inline-block">
                Tap Fountain to Toss a Coin! 🪙
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleTossCoin}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Toss Coin ({coins}) 🪙</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Compliment</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
