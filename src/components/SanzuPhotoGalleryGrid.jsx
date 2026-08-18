import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, Sparkles, Share2, RefreshCw, Maximize2, ArrowLeft, X } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function SanzuPhotoGalleryGrid() {
  const { triggerHaptic } = useAppStore();

  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📸 QUEEN SANZU PHOTO GALLERY 📸\n\nViewing Photo Frame #${photoIdx + 1} of ${BHUNTU_PHOTOS.length}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Queen Sanzu Gallery 📸✨"
      badgeIcon={<Camera className="w-3.5 h-3.5 text-pink-400" />}
      title={"Queen Sanzu Photo Gallery"}
      subtitle={"200+ Real Memory Frames of Queen Sanzu"}
      description={"Tap the photo frame below to view full screen with Back and Close controls!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none font-ui">
        {/* GALLERY CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={photoIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center group cursor-pointer"
            onClick={() => setFullscreenPhoto(currentPhoto)}
          >
            {/* Photo Frame */}
            <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Gallery Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 bg-black/70 px-3 py-1 rounded-full text-xs font-mono text-amber-200 border border-amber-300/40 font-bold flex items-center gap-1 shadow-lg">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Frame #{photoIdx + 1} / {BHUNTU_PHOTOS.length}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPhoto}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border border-rose-400/30"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Random Photo 📸</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 border border-emerald-400/30"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Photo</span>
          </button>
        </div>

        {/* FULLSCREEN PHOTO MODAL WITH BACK & CLOSE */}
        <AnimatePresence>
          {fullscreenPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
              onClick={() => setFullscreenPhoto(null)}
            >
              {/* Sticky Top Bar */}
              <div 
                className="fixed top-0 left-0 right-0 z-[10000] px-4 py-3 bg-slate-900/90 border-b border-pink-500/30 backdrop-blur-md flex items-center justify-between" 
                onClick={(e) => e.stopPropagation()}
                style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
              >
                <button
                  type="button"
                  onClick={() => setFullscreenPhoto(null)}
                  className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-95 border border-rose-400/40"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <span className="text-amber-200 text-xs font-bold bg-amber-500/20 px-3.5 py-1.5 rounded-full border border-amber-300/30 hidden sm:block">
                  Frame #{photoIdx + 1} / {BHUNTU_PHOTOS.length}
                </span>

                <button
                  type="button"
                  onClick={() => setFullscreenPhoto(null)}
                  className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-95 border border-rose-400/40"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Photo Display */}
              <div className="max-w-2xl max-h-[75vh] w-full flex flex-col items-center justify-center mt-12" onClick={(e) => e.stopPropagation()}>
                <img
                  src={fullscreenPhoto}
                  alt="Fullscreen Gallery Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="max-h-[65vh] max-w-full rounded-2xl shadow-2xl border-4 border-amber-400/80 object-contain object-top"
                />
                
                <button
                  type="button"
                  onClick={() => setFullscreenPhoto(null)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-rose-500 text-white font-bold text-xs border border-white/20 shadow-md backdrop-blur-md transition-all cursor-pointer active:scale-95 flex items-center gap-1.5"
                >
                  <X className="w-4 h-4" />
                  <span>Close Fullscreen View</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </WorldShell>
  );
}