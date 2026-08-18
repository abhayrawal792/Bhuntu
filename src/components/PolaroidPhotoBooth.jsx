import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles, RefreshCw, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const STICKERS = ['💖', '👑', '🎀', '🌸', '✨', '💐', '💍', '💕', '🌷', '🎂', '⭐', '🎈'];

export default function PolaroidPhotoBooth() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [activeStickers, setActiveStickers] = useState([]);
  const { triggerHaptic } = useAppStore();

  const totalPhotos = BHUNTU_PHOTOS.length;
  const currentPhotoSrc = BHUNTU_PHOTOS[photoIndex];

  const handleNextPhoto = () => {
    playSparkle();
    triggerHaptic(15);
    setPhotoIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handlePrevPhoto = () => {
    playSparkle();
    triggerHaptic(15);
    setPhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleAddSticker = (stk) => {
    playPop();
    triggerHaptic(20);
    setActiveStickers((prev) => [...prev, { id: Date.now(), symbol: stk, x: Math.random() * 60 + 20, y: Math.random() * 60 + 20 }]);
  };

  const handleClearStickers = () => {
    setActiveStickers([]);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Polaroid Photo Studio 📸"
      badgeIcon={<Camera className="w-3.5 h-3.5" />}
      title={"Hamro Vintage Polaroid Studio 📸"}
      description={`Decorate all ${totalPhotos} beautiful photos of Bhuntu with cute stickers & vintage frames!`}
    >

      {/* Polaroid Print Container */}
      <motion.div
        whileHover={{ rotate: 1 }}
        className="w-72 sm:w-80 mx-auto p-4 pb-8 bg-white border-2 border-pink-200 rounded-2xl shadow-2xl relative text-left mb-6"
      >
        {/* Photo Image Frame */}
        <div className="w-full h-72 sm:h-80 relative rounded-xl overflow-hidden bg-pink-50 border border-gray-200">
          <img
            key={photoIndex}
            src={currentPhotoSrc}
            onError={e => handlePhotoError(e, photoIndex)}
            alt={`Bhuntu Polaroid #${photoIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Render Active Stickers */}
          {activeStickers.map((stk) => (
            <motion.div
              key={stk.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.3 }}
              className="absolute text-3xl cursor-pointer select-none drop-shadow-md"
              style={{ top: `${stk.y}%`, left: `${stk.x}%` }}
            >
              {stk.symbol}
            </motion.div>
          ))}

          {/* Photo Number Badge */}
          <span className="absolute top-2 right-2 bg-pink-600/90 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow backdrop-blur-sm">
            #{photoIndex + 1} of {totalPhotos}
          </span>
        </div>

        {/* Polaroid Handwriting Text */}
        <div className="mt-4 text-center">
          <p className="font-handwriting text-lg font-bold text-gray-900 font-nepali truncate">
            Mero Pyaro Bhuntu • Photo #{photoIndex + 1} 💕
          </p>
          <p className="text-[11px] text-pink-500 font-ui font-semibold uppercase tracking-wider">
            Abu & Sanzu • Eternal Memories ❤️
          </p>
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-center gap-3 mb-6 font-ui">
        <button
          onClick={handlePrevPhoto}
          className="px-4 py-2.5 rounded-full bg-white text-rose-600 border border-pink-300 font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md hover:bg-rose-50 transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev Photo</span>
        </button>

        <button
          onClick={handleNextPhoto}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4 animate-spin-slow" />
          <span>Next Photo (#{photoIndex + 1})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Sticker Tray */}
      <div className="mb-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-pink-200 shadow-sm max-w-md mx-auto">
        <span className="text-xs font-bold text-gray-600 font-ui block mb-2 text-center">
          Tap cute stickers to place on Bhuntu's Polaroid:
        </span>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {STICKERS.map((stk, i) => (
            <button
              key={i}
              onClick={() => handleAddSticker(stk)}
              className="p-2 rounded-xl bg-pink-50 hover:bg-pink-200 text-xl border border-pink-200 shadow-xs cursor-pointer hover:scale-110 transition-transform active:scale-90"
            >
              {stk}
            </button>
          ))}
          {activeStickers.length > 0 && (
            <button
              onClick={handleClearStickers}
              className="p-2 px-3 rounded-xl bg-gray-100 text-xs font-bold text-rose-600 border border-gray-300 hover:bg-rose-100 cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </WorldShell>
  );
}
