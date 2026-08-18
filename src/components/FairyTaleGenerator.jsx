import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, BookOpen } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CHAPTERS = [
  {
    title: "Chapter 1: The First Encounter 🏰",
    text: "In the land of Nepalgunj, Nepal 🇳🇵, young Abu met Queen Sanzu. Her kindness and beauty instantly captured his heart!"
  },
  {
    title: "Chapter 2: Across the Ocean 🌸",
    text: "In Sakai, Osaka, Japan 🇯🇵, Queen Sanzu's smile shone like cherry blossoms. Distance could never diminish their love!"
  },
  {
    title: "Chapter 3: The Forever Promise 💍",
    text: "Abu promised: 'We will build our dream home together!' And they lived happily ever after!"
  }
];

export default function FairyTaleGenerator() {
  const { triggerHaptic } = useAppStore();

  const [chapterIdx, setChapterIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentChapter = CHAPTERS[chapterIdx % CHAPTERS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextChapter = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setChapterIdx((i) => (i + 1) % CHAPTERS.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📖 THE FAIRY TALE OF ABU & SANZU 📖\n\n[${currentChapter.title}]\n"${currentChapter.text}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Fairy Tale Storybook 📖✨"
      badgeIcon={<BookOpen className="w-3.5 h-3.5 text-amber-400" />}
      title={"Fairy Tale Storybook"}
      subtitle={"The Blockbuster Romance of Abu & Queen Sanzu"}
      description={"Read the romantic fairy tale storybook of Abu & Queen Sanzu and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* STORY CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={chapterIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Story Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                {currentChapter.title}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-serif">
                "{currentChapter.text}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextChapter}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Chapter 📖</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Story</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
