import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Grid, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MOSAICS = [
  { mosaic: "Watercolor Mosaic 🎨", desc: "Thousands of tiny heart tiles forming Queen Sanzu's beautiful smile!" },
  { mosaic: "Golden Starlight Mosaic 🌟", desc: "Sparkling starlight mosaic depicting our proposal on Oct 28, 2025!" },
  { mosaic: "Sakura Blossom Mosaic 🌸", desc: "Cherry blossom mosaic celebrating Queen Sanzu in Sakai, Osaka!" }
];

export default function BhuntuPhotoMosaic2() {
  const { triggerHaptic } = useAppStore();

  const [mosIdx, setMosIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMosaic = MOSAICS[mosIdx % MOSAICS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectMosaic = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setMosIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎨 BHUNTU PHOTO MOSAIC VOL 2 🎨\n\n[${currentMosaic.mosaic}]\n"${currentMosaic.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Photo Mosaic Vol. 2 🎨✨"
      badgeIcon={<Grid className="w-3.5 h-3.5 text-purple-400" />}
      title={"Bhuntu Photo Mosaic Vol. 2"}
      subtitle={"Composite Photo Mosaic Art of Queen Sanzu"}
      description={"Assemble composite heart photo mosaic art of Queen Sanzu to unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* MOSAIC CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mosIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Mosaic Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-purple-900/80 px-3 py-1 rounded-lg text-xs font-mono text-purple-200 border border-white/20 font-bold">
                🎨 Mosaic #{mosIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider mb-1">
                {currentMosaic.mosaic}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentMosaic.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* MOSAIC BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {MOSAICS.map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectMosaic(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                mosIdx === idx
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-purple-200 border-purple-500/40 hover:border-purple-400'
              }`}
            >
              🎨 Mosaic #{idx + 1}
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
            <span>Share Photo Mosaic</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
