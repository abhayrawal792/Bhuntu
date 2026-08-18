import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Feather, Heart, Share2, Sparkles, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const EMOTIONS = [
  {
    name: 'Deeply Devoted 💖',
    opening: 'My Dearest Bebo,',
    body: 'My heart beats in perfect rhythm with your sweet laughter. Every late-night video call and every morning message you send fills my life with endless joy.',
    closing: 'Forever & Always Yours, Abu 💕',
  },
  {
    name: 'Long Distance Warmth 🌏',
    opening: 'My Dearest Sanzu,',
    body: 'From Nepalgunj to Osaka — across every timezone and ocean, my soul sits beside yours. Distance is just geography. What we share lives beyond maps.',
    closing: 'With all my love, Abu 🌸',
  },
  {
    name: 'Eternal Marriage Vows 💍',
    opening: 'My Queen Bhuntu,',
    body: 'The day I get to hold your hand forever without a screen between us will be the happiest day of my life. I love you more and more each day.',
    closing: 'Your future together, Abu 💍',
  },
];

export default function LoveLetterGenerator() {
  const { triggerHaptic } = useAppStore();

  const [selected, setSelected] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentEmotion = EMOTIONS[selected % EMOTIONS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectEmotion = (i) => {
    playPop();
    playBloom();
    triggerHaptic(15);
    setSelected(i);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📜 HANDWRITTEN LOVE LETTER 📜\n\n"${currentEmotion.opening}\n\n${currentEmotion.body}\n\n${currentEmotion.closing}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Poem & Letter Composer 📜✨"
      badgeIcon={<Feather className="w-3.5 h-3.5 text-amber-700" />}
      title={"Romantic Poem Composer"}
      subtitle={"Handwritten Letters Sealed for Queen Sanzu"}
      description={"Select a mood to unfold handwritten love letters written by Abu for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* EMOTION SELECTOR */}
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {EMOTIONS.map((e, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelectEmotion(i)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                selected === i
                  ? 'bg-amber-800 text-amber-50 border-amber-800 shadow-md'
                  : 'bg-white text-amber-800 border-amber-300 hover:border-amber-500'
              }`}
            >
              {e.name}
            </button>
          ))}
        </div>

        {/* HANDWRITTEN LETTER CANVAS */}
        <div className="max-w-md mx-auto mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="rounded-3xl bg-amber-50 border-4 border-amber-200 shadow-2xl p-6 text-left relative overflow-hidden space-y-4"
            >
              {/* Photo Frame */}
              <div className="w-full h-48 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Letter Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              {/* Letter Text */}
              <div className="space-y-3 font-nepali">
                <p className="text-sm font-bold text-amber-950">{currentEmotion.opening}</p>
                <p className="text-xs text-amber-900 leading-relaxed italic">{currentEmotion.body}</p>
                <p className="text-xs font-extrabold text-amber-950 text-right pt-2">{currentEmotion.closing}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Love Letter</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
