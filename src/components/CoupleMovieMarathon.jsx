import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Film, Sparkles, Share2, Clapperboard, Tv, Popcorn } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CINEMA_FILMS = [
  { title: "Your Name (Kimi no Na wa) 🌌", genre: "Anime Romance", desc: "Two hearts connected across 4,500 miles between Nepalgunj & Osaka — just like Abu & Sanzu!" },
  { title: "Barfi! 🎭", genre: "Bollywood Masterpiece", desc: "Pure, unconditional love that conquers all distance and speech!" },
  { title: "The Notebook 📓", genre: "Classic Romance", desc: "A lifelong love story sealed with a promise that never ends!" }
];

export default function CoupleMovieMarathon() {
  const { triggerHaptic } = useAppStore();

  const [filmIdx, setFilmIdx] = useState(0);
  const [curtainsOpen, setCurtainsOpen] = useState(true);
  const [popcornCount, setPopcornCount] = useState(1);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFilm = CINEMA_FILMS[filmIdx % CINEMA_FILMS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectFilm = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic([20, 50]);
    setCurtainsOpen(false);

    setTimeout(() => {
      setFilmIdx(idx);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      setCurtainsOpen(true);
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }, 400);
  };

  const handleEatPopcorn = () => {
    playPop();
    triggerHaptic(10);
    setPopcornCount(p => p + 1);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎬 RETRO CINEMA MOVIE THEATER 🎬\n\nFeatured Film: [${currentFilm.title}]\nGenre: ${currentFilm.genre}\n"${currentFilm.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Retro Cinema Theater 🎬✨"
      badgeIcon={<Film className="w-3.5 h-3.5 text-amber-400" />}
      title={"Retro Cinema Movie Theater"}
      subtitle={"Private Movie Marathon Screenings for Abu & Queen Sanzu"}
      description={"Dim the theater lights, open velvet curtains, grab popcorn, and watch private cinema screenings with Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none">
        {/* RETRO CINEMA MARQUEE & THEATER CABINET */}
        <div className="relative rounded-3xl bg-gradient-to-b from-red-950 via-slate-950 to-stone-950 border-4 border-amber-500/70 shadow-[0_0_50px_rgba(245,158,11,0.3)] p-5 sm:p-6 space-y-6">
          
          {/* FLASHING CINEMA MARQUEE SIGN */}
          <div className="bg-black/90 p-3 rounded-2xl border-2 border-amber-400/50 text-center space-y-1 shadow-inner">
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono font-black text-amber-400 tracking-widest uppercase">
              <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
              NOW SHOWING IN CINEMA HALL #1
            </div>
            <h2 className="text-base sm:text-lg font-black text-white truncate">
              {currentFilm.title}
            </h2>
          </div>

          {/* MOVIE THEATER SCREEN WITH VELVET CURTAINS */}
          <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-black flex items-center justify-center">
            {/* PROJECTOR LIGHT BEAM */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 via-transparent to-black/60 z-10 pointer-events-none" />

            {/* SCREEN STILL PHOTO */}
            <img
              src={currentPhoto}
              alt="Cinema Screen Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />

            {/* RED VELVET SLIDING CURTAINS */}
            <motion.div
              animate={{ x: curtainsOpen ? '-100%' : '0%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-y-0 left-0 w-1/2 bg-red-900 border-r-2 border-amber-400/40 z-20"
            />
            <motion.div
              animate={{ x: curtainsOpen ? '100%' : '0%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-y-0 right-0 w-1/2 bg-red-900 border-l-2 border-amber-400/40 z-20"
            />

            {/* FILM BADGE */}
            <div className="absolute top-2 right-2 z-30 bg-black/80 px-3 py-1 rounded-lg text-xs font-mono font-bold text-amber-300 border border-amber-400/40">
              🎞️ {currentFilm.genre}
            </div>
          </div>

          {/* FILM SYNOPSIS PLAQUE */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-amber-500/30 text-center space-y-1">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wide">
              Movie Marathon Synopsis
            </h3>
            <p className="text-xs text-gray-200 leading-relaxed font-semibold">
              "{currentFilm.desc}"
            </p>
          </div>

          {/* MOVIE SELECTION BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CINEMA_FILMS.map((f, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectFilm(idx)}
                className={`p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer ${
                  filmIdx === idx
                    ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md scale-105'
                    : 'bg-stone-900 text-amber-300 border-amber-500/30 hover:border-amber-400'
                }`}
              >
                🎬 Film #{idx + 1}
              </button>
            ))}
          </div>

          {/* POPCORN BUCKET & SHARE */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleEatPopcorn}
              className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Popcorn className="w-4 h-4" />
              <span>Popcorn ({popcornCount})</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Movie Choice</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
