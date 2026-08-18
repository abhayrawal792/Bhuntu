import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PAGES = [
  { title: "Chapter 1: The First Spark 💕", text: "The moment Abu first heard Queen Sanzu's voice and felt eternal love." },
  { title: "Chapter 2: Long Distance Bonds ✈️", text: "Connecting Nepalgunj 🇳🇵 to Osaka 🇯🇵 with late-night video calls and warm memories." },
  { title: "Chapter 3: The Forever Marriage Promise 💍", text: "Together forever, building our dream cozy home and living happily ever after!" }
];

export default function SweetMemoryScrapbook() {
  const { triggerHaptic } = useAppStore();

  const [page, setPage] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPage = PAGES[page % PAGES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const nextPage = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setPage((prev) => (prev + 1) % PAGES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📖 VINTAGE PHOTO SCRAPBOOK 📖\n\nScrapbook [${currentPage.title}]:\n"${currentPage.text}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Vintage Photo Scrapbook 📖✨"
      badgeIcon={<BookOpen className="w-3.5 h-3.5 text-amber-700" />}
      title={"Vintage Photo Scrapbook"}
      subtitle={"Flipping Pages of Sanzu's Memory Book"}
      description={"Flip through paper pages filled with couple notes, stickers, and Sanzu's memory photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* SCRAPBOOK PAGE & PHOTO CANVAS */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ rotateY: -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Scrapbook Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 left-2 bg-amber-200/80 px-2 py-0.5 rounded text-[10px] font-mono text-slate-950 font-bold border border-white/20">
                📌 Pinned Memory
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-400 font-bold inline-block mb-2">
                Page {page + 1} of {PAGES.length}
              </span>
              <h3 className="text-sm font-extrabold text-white mb-1">{currentPage.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">"{currentPage.text}"</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={nextPage}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-700 to-rose-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Flip Page 📖</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Scrapbook</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
