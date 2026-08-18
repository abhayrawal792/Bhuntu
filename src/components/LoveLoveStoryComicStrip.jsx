import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Film, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SCENES = [
  { scene: 'Scene 1: The First Spark ✨', text: 'In a world of 8 billion people, two hearts crossed paths across borders...' },
  { scene: 'Scene 2: Overcoming Distance 🌊', text: 'Separated by miles between Nepal & Japan, but united by an unbreakable bond...' },
  { scene: 'Scene 3: The Forever Marriage Promise 💍', text: 'Coming soon: The moment they build their dream home and live together happily ever after!' }
];

export default function LoveLoveStoryComicStrip() {
  const { triggerHaptic } = useAppStore();

  const [sIdx, setSIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentScene = SCENES[sIdx % SCENES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextScene = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setSIdx((i) => (i + 1) % SCENES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎬 LOVE STORY COMIC STRIP & MOVIE 🎬\n\nScene: [${currentScene.scene}]\n"${currentScene.text}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Love Story Comic Strip 🎬✨"
      badgeIcon={<Film className="w-3.5 h-3.5 text-rose-500" />}
      title={"Love Story Comic Strip"}
      subtitle={"The Blockbuster Romance of Sanzu & Abu"}
      description={"Watch the epic movie trailer and comic strip of Sanzu & Abu's love story with secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* MOVIE SCREEN & PHOTO DISCOVERY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-500 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Comic Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-rose-900/80 px-3 py-1 rounded-lg text-[10px] font-mono text-rose-200 border border-white/20 font-bold">
                🎬 {currentScene.scene.split(':')[0]}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-rose-300 uppercase tracking-wider mb-1">
                {currentScene.scene}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed italic font-serif">
                "{currentScene.text}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextScene}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Scene 🎬</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Trailer</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
