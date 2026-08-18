import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const LANGUAGES = [
  { name: "Words of Affirmation 💬", desc: "Hearing 'I love you Queen Sanzu' fills your heart with joy!" },
  { name: "Quality Time ⏰", desc: "Undivided attention during late-night video calls across the miles!" },
  { name: "Acts of Service 🤝", desc: "Abu cooking delicious momos and building this 300-page website for you!" }
];

export default function LoveLanguageTest() {
  const { triggerHaptic } = useAppStore();

  const [langIdx, setLangIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentLanguage = LANGUAGES[langIdx % LANGUAGES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectLanguage = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setLangIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💬 LOVE LANGUAGE TEST 💬\n\n[${currentLanguage.name}]\n"${currentLanguage.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Love Language Test 💬✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-400" />}
      title={"Love Language Test"}
      subtitle={"Discover Queen Sanzu's Primary Love Language"}
      description={"Take the interactive love language quiz to discover your primary love language and unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* LANGUAGE CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={langIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Language Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-rose-900/80 px-3 py-1 rounded-lg text-xs font-mono text-rose-200 border border-white/20 font-bold">
                💬 {currentLanguage.name.split(' ')[0]}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-rose-300 uppercase tracking-wider mb-1">
                {currentLanguage.name}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentLanguage.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* LANGUAGE BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {LANGUAGES.map((l, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectLanguage(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                langIdx === idx
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-rose-200 border-rose-500/40 hover:border-rose-400'
              }`}
            >
              💬 Language #{idx + 1}
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
            <span>Share Love Language</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
