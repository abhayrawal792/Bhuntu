import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Grid, Sparkles, Share2, RefreshCw, ZoomIn } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function LovePhotoMosaicBuilder() {
  const { triggerHaptic } = useAppStore();

  const [revealedTiles, setRevealedTiles] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [zoomLevel, setZoomLevel] = useState(1);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleTileClick = (idx) => {
    if (revealedTiles.includes(idx)) return;

    playPop();
    triggerHaptic(5);
    const next = [...revealedTiles, idx];
    setRevealedTiles(next);

    if (next.length === 16) {
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      confetti({ particleCount: 110, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleAutoReveal = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60]);
    setRevealedTiles(Array.from({ length: 16 }, (_, i) => i));
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleResetMosaic = () => {
    playPop();
    triggerHaptic(10);
    setRevealedTiles([]);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎨 PHOTO MOSAIC MASTERPIECE BUILDER 🎨\n\nQueen Sanzu completed 16/16 photo mosaic tiles!\nMasterpiece Photo Revealed!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Photo Mosaic Builder 🎨✨"
      badgeIcon={<Grid className="w-3.5 h-3.5 text-amber-400" />}
      title={"Interactive Photo Mosaic Builder"}
      subtitle={"Assemble 16 Micro Photo Tiles to Reveal Masterpiece"}
      description={"Tap hidden grid tiles to assemble individual photo fragments and reveal Queen Sanzu's face photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* MOSAIC CABINET CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-amber-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* MOSAIC STATUS HEADER */}
          <div className="flex items-center justify-between bg-amber-950/40 p-3 rounded-2xl border border-amber-400/40 text-xs font-mono font-bold text-amber-300">
            <span>MOSAIC TILES: {revealedTiles.length}/16</span>
            <span className="flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
              ZOOM: {Math.round(zoomLevel * 100)}%
            </span>
          </div>

          {/* 4x4 MOSAIC GRID CANVAS */}
          <div className="relative w-full h-72 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-black">
            {/* FULL PHOTO UNDERNEATH */}
            <div
              className="w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src={currentPhoto}
                alt="Mosaic Masterpiece Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            {/* 4x4 COVER TILES GRID */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0.5 pointer-events-auto">
              {Array.from({ length: 16 }).map((_, idx) => {
                const isRevealed = revealedTiles.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTileClick(idx)}
                    className={`w-full h-full transition-opacity duration-500 cursor-pointer ${
                      isRevealed ? 'opacity-0 pointer-events-none' : 'bg-slate-900 border border-amber-400/30 hover:bg-amber-900/80 flex items-center justify-center text-xs font-mono font-bold text-amber-300'
                    }`}
                  >
                    #{idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ZOOM SLIDER & AUTO REVEAL */}
          <div className="flex items-center justify-between gap-3 bg-stone-900/90 p-3 rounded-2xl border border-stone-800">
            <span className="text-xs font-bold text-amber-300 font-mono">ZOOM LENS:</span>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.1"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="flex-1 accent-amber-400 cursor-pointer"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {revealedTiles.length < 16 ? (
              <button
                type="button"
                onClick={handleAutoReveal}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reveal All Tiles 🎨</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetMosaic}
                className="py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-200 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Next Mosaic</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Mosaic</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
