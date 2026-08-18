import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, Sparkles, Heart, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MEMORIES = [
  { title: "First Video Call Smile 📸", desc: "The sweet smile that stole Abu's heart forever." },
  { title: "Nepalgunj Sunset Chat 🌅", desc: "Talking about our future dream home until 3 AM..." },
  { title: "Osaka Sakura Blossom Date 🌸", desc: "Dreaming of holding hands under Japanese cherry trees..." },
  { title: "The Unbreakable Vow 💍", desc: "Promising to stay together forever no matter how many miles separate us." }
];

export default function RomanticMemoryWheel() {
  const { triggerHaptic } = useAppStore();

  const [activeIdx, setActiveIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMemory = MEMORIES[activeIdx % MEMORIES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNext = () => {
    playBloom();
    playSparkle();
    triggerHaptic(20);
    setActiveIdx((prev) => (prev + 1) % MEMORIES.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎞️ ROMANTIC MEMORY REEL 🎞️\n\nMemory: "${currentMemory.title}"\n"${currentMemory.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Memory Film Reel 🎞️✨"
      badgeIcon={<Camera className="w-3.5 h-3.5 text-rose-500" />}
      title={"Romantic Memory Film Reel"}
      subtitle={"Sanzu & Abu's Golden Highlight Reel"}
      description={"Spin through golden couple memories and secret photo frames!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* FILM REEL FRAME */}
        <motion.div
          key={activeIdx}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-300 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
        >
          {/* Photo Frame */}
          <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Memory Reel Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="pt-2">
            <h3 className="text-lg font-extrabold text-white mb-1">{currentMemory.title}</h3>
            <p className="text-xs text-gray-300 italic mb-3">"{currentMemory.desc}"</p>
            <span className="text-[10px] font-mono text-pink-300 bg-pink-900/60 px-3 py-1 rounded-full border border-pink-400 font-bold">
              Memory Reel {activeIdx + 1} of {MEMORIES.length}
            </span>
          </div>
        </motion.div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Reel Frame</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Memory</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
