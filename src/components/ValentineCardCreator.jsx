import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CARDS = [
  { id: 1, title: "Happy Birthday Queen Sanzu! 🎂", msg: "May you always be this happy, beautiful, and loved! Abu loves you so much!" },
  { id: 2, title: "My Forever Marriage Promise 💍", msg: "Abu's unbreakable promise: We will marry and build our dream home together!" },
  { id: 3, title: "Sakai, Osaka 🇯🇵", msg: "While sakura blossoms fall in Japan, Abu in Nepalgunj is counting every single petal for you!" }
];

export default function ValentineCardCreator() {
  const { triggerHaptic } = useAppStore();

  const [activeCard, setActiveCard] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentCard = CARDS[activeCard % CARDS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectCard = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setActiveCard(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💌 VALENTINE LOVE CARD 💌\n\n[${currentCard.title}]\n"${currentCard.msg}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Valentine Love Cards 💌✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500" />}
      title={"Valentine Love Cards"}
      subtitle={"Handcrafted Birthday Love Cards for Sanzu"}
      description={"Open romantic handcrafted love cards written by Abu to unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CARD CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Card Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-rose-300 uppercase tracking-wider mb-1">
                {currentCard.title}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentCard.msg}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CARD BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {CARDS.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelectCard(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                activeCard === idx
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-rose-200 border-rose-500/40 hover:border-rose-400'
              }`}
            >
              💌 Card #{c.id}
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
            <span>Share Love Card</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
