import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Tv, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MOVIES = [
  { title: "Romantic Anime Marathon 🎌", genre: "Your Name / Weathering With You", popcorn: "Butter & Caramel" },
  { title: "Classic Love Story 🎬", desc: "The Notebook & Titanic", popcorn: "Extra Cheese" },
  { title: "Nepali Musical Blockbuster 🍿", desc: "Kabaddi & Jerryy", popcorn: "Crispy Spicy" }
];

export default function CoupleMovieNight() {
  const { triggerHaptic } = useAppStore();

  const [movie, setMovie] = useState(0);
  const [lightsOff, setLightsOff] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMovie = MOVIES[movie % MOVIES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const toggleLights = () => {
    playPop();
    triggerHaptic(15);
    setLightsOff(!lightsOff);

    if (!lightsOff) {
      playBloom();
      playSparkle();
      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    }
  };

  const handleNextMovie = () => {
    playPop();
    triggerHaptic(10);
    setMovie((prev) => (prev + 1) % MOVIES.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎬 PRIVATE CINEMA DATE 🎬\n\nNow Playing: "${currentMovie.title}"\nPopcorn: ${currentMovie.popcorn}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Private Cinema Date 🎬✨"
      badgeIcon={<Tv className="w-3.5 h-3.5 text-rose-500" />}
      title={"Private Cinema Date"}
      subtitle={"Virtual Cinema Theater for Sanzu & Abu"}
      description={"Grab popcorn and dim the cinema lights for a private movie date with secret photo screen reveals!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CINEMA SCREEN & PHOTO STAGE */}
        <div className={`relative max-w-sm mx-auto p-6 rounded-3xl border-4 transition-colors duration-500 shadow-2xl space-y-4 mb-6 flex flex-col items-center ${lightsOff ? 'bg-slate-950 border-rose-500' : 'bg-slate-900 border-slate-700'}`}>
          {/* Photo Frame Screen */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Cinema Screen Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-pink-200 border border-white/20 font-bold">
              Now Playing: {currentMovie.title} 🍿
            </div>
          </div>

          <p className="text-xs text-gray-300 italic">
            "{currentMovie.genre || currentMovie.desc}"
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={toggleLights}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{lightsOff ? 'Turn Lights On 💡' : 'Dim Cinema Lights 🍿'}</span>
          </button>

          <button
            type="button"
            onClick={handleNextMovie}
            className="py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Movie</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Cinema</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
