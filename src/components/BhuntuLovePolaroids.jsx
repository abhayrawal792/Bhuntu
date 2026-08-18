import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const POLAROIDS = [
  { title: "Instant Polaroid Frame #1 📸", caption: "Developing sweet memories of Queen Sanzu!" },
  { title: "Instant Polaroid Frame #2 🌸", caption: "Clear, beautiful face of Queen Sanzu captured!" },
  { title: "Instant Polaroid Frame #3 💍", caption: "Eternal marriage vows preserved forever!" }
];

export default function BhuntuLovePolaroids() {
  const { triggerHaptic } = useAppStore();

  const [polIdx, setPolIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPolaroid = POLAROIDS[polIdx % POLAROIDS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPolaroid = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setPolIdx((i) => (i + 1) % POLAROIDS.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📸 BHUNTU LOVE POLAROIDS 📸\n\n[${currentPolaroid.title}]\n"${currentPolaroid.caption}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Love Polaroids 📸✨"
      badgeIcon={<Camera className="w-3.5 h-3.5 text-pink-400" />}
      title={"Bhuntu Love Polaroids"}
      subtitle={"Instant Polaroid Photo Development for Queen Sanzu"}
      description={"Develop instant retro polaroid photos of Queen Sanzu and unlock secret memory cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* POLAROID CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={polIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Polaroid Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-pink-900/80 px-3 py-1 rounded-lg text-xs font-mono text-pink-200 border border-white/20 font-bold">
                📸 Frame #{polIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-pink-300 uppercase tracking-wider mb-1">
                {currentPolaroid.title}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentPolaroid.caption}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPolaroid}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Develop Polaroid 📸</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Polaroid</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
