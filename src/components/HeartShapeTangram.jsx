import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, RefreshCw, Share2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PIECES = [
  { id: 1, color: 'bg-rose-500', name: 'Left Heart Arch' },
  { id: 2, color: 'bg-pink-500', name: 'Right Heart Arch' },
  { id: 3, color: 'bg-amber-400', name: 'Center Core' },
  { id: 4, color: 'bg-purple-500', name: 'Bottom Tip' },
];

export default function HeartShapeTangram() {
  const { triggerHaptic } = useAppStore();

  const [assembled, setAssembled] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePlacePiece = (id) => {
    playPop();
    triggerHaptic(15);
    if (!assembled.includes(id)) {
      const next = [...assembled, id];
      setAssembled(next);
      if (next.length === PIECES.length) {
        playBloom();
        playSparkle();
        triggerHaptic([40, 80, 120]);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      }
    }
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setAssembled([]);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧩 WOODEN TANGRAM HEART PUZZLE 🧩\n\nCompleted Tangram Puzzle for Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Wooden Tangram Puzzle 🧩✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
      title={"Wooden Tangram Puzzle"}
      subtitle={"Assemble Geometric Puzzle to Form Heart"}
      description={"Tap puzzle blocks to construct our glowing heart and reveal Sanzu's secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* ASSEMBLY CANVAS & PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {assembled.length === PIECES.length ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              {/* Photo Reveal */}
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Tangram Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/60 text-amber-200 text-xs font-bold">
                "Perfect Tangram Heart Assembled for Bebo! 🧩💖"
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-44 border-2 border-dashed border-amber-300/40 rounded-2xl flex items-center justify-center p-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {assembled.map((id) => (
                  <motion.div
                    key={id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-12 h-12 rounded-xl ${PIECES.find((p) => p.id === id).color} shadow-md`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PIECE SELECTOR */}
        <div className="flex justify-center gap-2 flex-wrap mb-6 max-w-md mx-auto">
          {PIECES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePlacePiece(p.id)}
              disabled={assembled.includes(p.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                assembled.includes(p.id)
                  ? 'bg-gray-200 text-gray-400 border-gray-200'
                  : 'bg-white text-gray-800 border-pink-300 hover:border-pink-500'
              }`}
            >
              + Add {p.name}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {assembled.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset & New Photo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Tangram</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
