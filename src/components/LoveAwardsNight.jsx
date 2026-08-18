import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, Share2, Crown, Award, Star } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const TROPHIES = [
  { id: 1, title: "World's Most Beautiful Girl 👑", winner: "Queen Sanzu", citation: "Unanimously awarded by Abu & all 8 billion people on Earth!" },
  { id: 2, title: "Best Smile of the Century 🌸", winner: "Queen Sanzu", citation: "Illuminating Nepalgunj, Osaka, & Abu's entire world daily!" },
  { id: 3, title: "Everlasting Soulmate Award 💖", winner: "Queen Sanzu", citation: "Bound together forever across 4,500 miles!" },
  { id: 4, title: "Golden Future Wifey Trophy 💍", creator: "Abu & Sanzu", citation: "Sealed on October 28, 2025 to build our dream home!" }
];

export default function LoveAwardsNight() {
  const { triggerHaptic } = useAppStore();

  const [selectedTrophy, setSelectedTrophy] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentTrophy = TROPHIES[selectedTrophy % TROPHIES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectTrophy = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setSelectedTrophy(idx);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🏆 RED CARPET LOVE AWARDS NIGHT 🏆\n\nAward Category: [${currentTrophy.title}]\nWinner: "${currentTrophy.winner || currentTrophy.creator}"\nCitation: "${currentTrophy.citation}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="luxury"
      badge="Red Carpet Awards Gala 🏆✨"
      badgeIcon={<Trophy className="w-3.5 h-3.5 text-amber-400" />}
      title={"Red Carpet Love Awards Gala"}
      subtitle={"Annual Hollywood Grand Awards Ceremony for Queen Sanzu"}
      description={"Step onto the golden red carpet stage, select trophy pedestals, and present relationship awards to Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none">
        {/* HOLLYWOOD STAGE CONTAINER */}
        <div className="relative rounded-3xl bg-gradient-to-b from-red-950 via-slate-950 to-stone-950 border-4 border-amber-500/70 shadow-[0_0_50px_rgba(245,158,11,0.3)] p-5 sm:p-6 space-y-6">
          
          {/* FLASHING CAMERA SPOTLIGHTS */}
          <div className="flex items-center justify-between bg-black/80 px-4 py-2 rounded-2xl border border-amber-400/40 text-amber-300 font-mono text-xs font-extrabold">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              ANNUAL AWARDS GALA
            </span>
            <span>CATEGORY #{selectedTrophy + 1} OF {TROPHIES.length}</span>
          </div>

          {/* RED CARPET STAGE & WINNER FRAME */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTrophy}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-sm mx-auto p-4 rounded-3xl bg-amber-950/40 border-2 border-amber-400/60 shadow-2xl space-y-4 flex flex-col items-center"
            >
              {/* Photo Frame */}
              <div className="w-full h-56 rounded-2xl overflow-hidden border-4 border-amber-400 shadow-2xl relative bg-black">
                <img
                  src={currentPhoto}
                  alt="Award Winner Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
                <div className="absolute top-2 right-2 bg-amber-950/90 px-3 py-1.5 rounded-xl text-xs font-mono font-black text-amber-200 border border-amber-400 shadow flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>WINNER</span>
                </div>
              </div>

              {/* PLAQUE CARD */}
              <div className="bg-black/90 p-4 rounded-2xl border border-amber-400/50 w-full text-center space-y-1">
                <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide">
                  {currentTrophy.title}
                </h3>
                <p className="text-xs font-bold text-white">
                  Winner: <span className="text-amber-400">{currentTrophy.winner || currentTrophy.creator}</span>
                </p>
                <p className="text-xs text-stone-300 italic pt-1">
                  "{currentTrophy.citation}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* PEDESTAL TROPHY SELECTORS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {TROPHIES.map((t, idx) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTrophy(idx)}
                className={`p-3 rounded-2xl border text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  selectedTrophy === idx
                    ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-xl scale-105'
                    : 'bg-stone-900 text-amber-300 border-amber-500/30 hover:border-amber-400'
                }`}
              >
                <Trophy className={`w-5 h-5 ${selectedTrophy === idx ? 'text-stone-950 fill-stone-950' : 'text-amber-400'}`} />
                <span className="truncate w-full text-center">Trophy #{t.id}</span>
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Award Presentation</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
