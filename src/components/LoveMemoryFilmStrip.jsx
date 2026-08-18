import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Film, Sparkles, Share2, RefreshCw, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MEMORIES = [
  { id: 1, title: "Vintage Memory Reel #1 🎞️", date: "FIRST SMILE", caption: "The unforgettable radiant smile of Queen Sanzu captured on 35mm silver bromide film!" },
  { id: 2, title: "Vintage Memory Reel #2 🌸", date: "SAKAI SAKURA", caption: "Endless devotion floating across distance from Nepalgunj to Sakai, Osaka!" },
  { id: 3, title: "Vintage Memory Reel #3 💍", date: "PROPOSAL VOW", caption: "October 28th — Abu & Sanzu's eternal marriage agreement sealed forever!" },
  { id: 4, title: "Vintage Memory Reel #4 🌙", date: "MIDNIGHT CALLS", caption: "Whispering late-night promises until 3 AM under starry midnight skies!" },
  { id: 5, title: "Vintage Memory Reel #5 🥟", date: "PANIPURI FEAST", caption: "Dreaming of our epic panipuri & momo date feast in our future home!" },
  { id: 6, title: "Vintage Memory Reel #6 🛵", date: "SCOOTER SAFARI", caption: "Queen Sanzu driving her light blue scooter with Abu holding on tightly!" },
  { id: 7, title: "Vintage Memory Reel #7 👑", date: "ROYAL CORONATION", caption: "Crowning Queen Sanzu as the sole ruler and monarch of Abu's heart!" },
  { id: 8, title: "Vintage Memory Reel #8 🏡", date: "DREAM SANCTUARY", caption: "Designing our 2026 home with flower gardens, cozy balconies & cat corners!" }
];

export default function LoveMemoryFilmStrip() {
  const { triggerHaptic } = useAppStore();

  const [filmIdx, setFilmIdx] = useState(0);
  const [filterMode, setFilterMode] = useState('vintage'); // vintage | sepia | monochrome | vivid
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFilm = MEMORIES[filmIdx % MEMORIES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectFrame = (nextIdx) => {
    playPop();
    triggerHaptic(12);
    setFilmIdx((nextIdx + MEMORIES.length) % MEMORIES.length);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  };

  const handleNextFrame = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setFilmIdx((i) => (i + 1) % MEMORIES.length);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎞️ 35MM LOVE MEMORY FILM STRIP 🎞️\n\n[Reel #${currentFilm.id}: ${currentFilm.title}]\nDate Tag: ${currentFilm.date}\nCaption: "${currentFilm.caption}"\nReel Progress: ${filmIdx + 1}/${MEMORIES.length}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  const getFilterStyle = () => {
    switch (filterMode) {
      case 'sepia': return 'sepia contrast-110 brightness-95';
      case 'monochrome': return 'grayscale contrast-125 brightness-105';
      case 'vivid': return 'saturate-150 contrast-110 brightness-105';
      default: return 'brightness-110 contrast-105 saturate-105';
    }
  };

  return (
    <WorldShell
      theme="retro"
      badge="Love Memory Film Strip 🎞️✨"
      badgeIcon={<Film className="w-3.5 h-3.5 text-amber-400" />}
      title={"Love Memory Film Strip"}
      subtitle={"35mm Moving Film Reel Carousel for Queen Sanzu"}
      description={"Scroll through 35mm film reel memory strips with retro sprocket holes and vintage photo filters!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        
        {/* FILTER TOGGLE BUTTONS */}
        <div className="flex items-center justify-center gap-1.5 mb-4">
          {[
            { id: 'vintage', label: 'Vintage 🎞️' },
            { id: 'sepia', label: 'Golden Sepia 📜' },
            { id: 'monochrome', label: 'Classic Noir 🎥' },
            { id: 'vivid', label: 'Vivid Romance 💖' }
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterMode(f.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                filterMode === f.id
                  ? 'bg-amber-500 text-black border-amber-300 font-extrabold scale-105'
                  : 'bg-stone-900 text-amber-300 border-amber-500/30 hover:border-amber-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 35MM FILM REEL STRIP CONTAINER */}
        <div className="relative max-w-md mx-auto bg-stone-950 border-4 border-amber-500/80 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4">
          
          {/* TOP 35MM SPROCKET HOLES */}
          <div className="flex items-center justify-between px-2 py-1 bg-stone-900 rounded-xl border border-stone-800">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-4 bg-black rounded-sm border border-stone-700 shadow-inner" />
            ))}
          </div>

          {/* MAIN FILM FRAME CAMERA STAGE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filmIdx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="relative p-4 rounded-2xl bg-black border-2 border-amber-400/60 shadow-inner space-y-3"
            >
              {/* FILM FRAME PHOTO */}
              <div className="w-full h-56 rounded-xl overflow-hidden border-2 border-stone-700 relative bg-black">
                <img
                  src={currentPhoto}
                  alt="Film Reel Frame"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className={`w-full h-full object-contain object-center transition-all ${getFilterStyle()}`}
                />
                
                {/* REEL COUNTER BADGE */}
                <div className="absolute top-2 left-2 bg-stone-950/90 px-2.5 py-1 rounded text-[10px] font-mono text-amber-300 border border-amber-400/40 font-black">
                  EASTMAN 35MM • FRAME #{currentFilm.id}
                </div>
                <div className="absolute top-2 right-2 bg-amber-500 text-black px-2.5 py-1 rounded text-[10px] font-mono font-black uppercase">
                  {currentFilm.date}
                </div>
              </div>

              {/* CAPTION BOX */}
              <div className="text-left bg-stone-900/80 p-3 rounded-xl border border-amber-500/30 space-y-1">
                <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center justify-between">
                  <span>{currentFilm.title}</span>
                  <span className="text-[10px] font-mono text-stone-400">FILM #{currentFilm.id}</span>
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed font-semibold italic">
                  "{currentFilm.caption}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* BOTTOM 35MM SPROCKET HOLES */}
          <div className="flex items-center justify-between px-2 py-1 bg-stone-900 rounded-xl border border-stone-800">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 h-4 bg-black rounded-sm border border-stone-700 shadow-inner" />
            ))}
          </div>

          {/* MINI FILM REEL CAROUSEL STRIP */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto py-1">
            {MEMORIES.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleSelectFrame(idx)}
                className={`w-8 h-8 rounded-lg font-mono text-xs font-black flex items-center justify-center transition-all cursor-pointer border ${
                  filmIdx === idx
                    ? 'bg-amber-400 text-black border-white scale-110 shadow-lg'
                    : 'bg-stone-900 text-stone-400 border-stone-700 hover:border-amber-400'
                }`}
              >
                #{m.id}
              </button>
            ))}
          </div>

          {/* NAVIGATION CONTROLS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectFrame(filmIdx - 1)}
              className="py-3.5 px-4 rounded-2xl bg-stone-900 border border-amber-400/40 text-amber-300 font-extrabold text-xs hover:bg-stone-800 transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev Frame</span>
            </button>

            <button
              type="button"
              onClick={handleNextFrame}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-amber-300"
            >
              <Camera className="w-4 h-4" />
              <span>Snap Next Reel 🎞️</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-300"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
