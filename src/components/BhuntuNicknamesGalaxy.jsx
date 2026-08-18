import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Sparkles, Share2, Globe2, CheckCircle2, RotateCcw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const NICKNAME_STARS = [
  { id: 1, name: "Queen Sanzu 👑", x: 50, y: 18, meaning: "The irreplaceable queen who rules Abu's universe and entire heart!" },
  { id: 2, name: "Bhuntu 💕", x: 22, y: 35, meaning: "The original sacred nickname — cute, precious, and eternal!" },
  { id: 3, name: "Bebo 🍯", x: 78, y: 35, meaning: "Abu's sweet Bebo who brings sweetness to every single day!" },
  { id: 4, name: "Abu's Safe Place 🏠", x: 18, y: 65, meaning: "The person Abu imagines coming home to, wherever the future takes us." },
  { id: 5, name: "Fuchee 🌸", x: 82, y: 65, meaning: "Endearing cute nickname reserved exclusively for Sanzu!" },
  { id: 6, name: "Mayalu 💖", x: 50, y: 82, meaning: "Deeply beloved one — beloved beyond all measure!" },
  { id: 7, name: "Sano Kanchhi ✨", x: 35, y: 48, meaning: "Precious little star who lights up Abu's world!" },
  { id: 8, name: "Heartbeat 💓", x: 65, y: 48, meaning: "The exact rhythm that keeps Abu's heart beating!" },
  { id: 9, name: "Osaka Queen 🌸", x: 35, y: 75, meaning: "Ruler of Sakai, Osaka and queen of distant airmail letters!" },
  { id: 10, name: "Abu's Universe 🌍", x: 65, y: 75, meaning: "Everything begins and ends with Sanzu's happiness!" }
];

export default function BhuntuNicknamesGalaxy() {
  const { triggerHaptic } = useAppStore();

  const [activeStar, setActiveStar] = useState(0);
  const [connectedStars, setConnectedStars] = useState([0]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentStar = NICKNAME_STARS[activeStar];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectStar = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic([20, 50]);

    setActiveStar(idx);
    if (!connectedStars.includes(idx)) {
      const nextConnected = [...connectedStars, idx];
      setConnectedStars(nextConnected);

      if (nextConnected.length === NICKNAME_STARS.length) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      }
    }
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  };

  const handleResetConstellation = () => {
    playPop();
    triggerHaptic(10);
    setActiveStar(0);
    setConnectedStars([0]);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌌 NICKNAME CONSTELLATION GALAXY 🌌\n\nActive Nickname Star: [${currentStar.name}]\nMeaning: "${currentStar.meaning}"\nConnected Stars: ${connectedStars.length}/${NICKNAME_STARS.length}\nConstellation Completed: ${connectedStars.length === NICKNAME_STARS.length ? 'YES! 👑✨' : 'In Progress'}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Nicknames Constellation Map 🌌✨"
      badgeIcon={<Star className="w-3.5 h-3.5 text-purple-300" />}
      title={"Nicknames Galaxy Map"}
      subtitle={"Connect Starlight Nickname Constellations in Deep Space"}
      description={"Tap star nodes in deep space to draw glowing constellation lines connecting Abu's 10 sacred nicknames for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* DEEP SPACE CONSTELLATION CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-[0_0_50px_rgba(168,85,247,0.35)] p-5 sm:p-6 space-y-6">
          
          {/* HEADER PROGRESS METER */}
          <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-300 bg-purple-950/40 p-3 rounded-2xl border border-purple-400/30">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              CONSTELLATION: {connectedStars.length}/{NICKNAME_STARS.length}
            </span>
            {connectedStars.length === NICKNAME_STARS.length ? (
              <span className="text-emerald-300 font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> MASTERED!
              </span>
            ) : (
              <span className="text-amber-300">Tap Stars to Connect!</span>
            )}
          </div>

          {/* STAR MAP CANVAS AREA */}
          <div className="relative w-full h-80 rounded-2xl bg-gradient-to-b from-purple-950/60 via-slate-950 to-indigo-950 border-2 border-purple-400/40 p-4 shadow-inner overflow-hidden">
            
            {/* AMBIENT GLOW NEBULA */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)] animate-pulse" />

            {/* SVG CONSTELLATION CONNECTING LINES */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              {connectedStars.map((starIdx, i) => {
                if (i === 0) return null;
                const prev = NICKNAME_STARS[connectedStars[i - 1]];
                const curr = NICKNAME_STARS[starIdx];
                return (
                  <g key={i}>
                    <line
                      x1={`${prev.x}%`}
                      y1={`${prev.y}%`}
                      x2={`${curr.x}%`}
                      y2={`${curr.y}%`}
                      stroke="#fbbf24"
                      strokeWidth="2.5"
                      strokeDasharray="4 2"
                      className="animate-pulse filter drop-shadow-[0_0_8px_#fbbf24]"
                    />
                  </g>
                );
              })}
            </svg>

            {/* FLOATING NICKNAME STARS */}
            {NICKNAME_STARS.map((star, idx) => {
              const isSelected = activeStar === idx;
              const isConnected = connectedStars.includes(idx);
              return (
                <motion.button
                  key={star.name}
                  whileHover={{ scale: 1.3 }}
                  onClick={() => handleSelectStar(idx)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all z-20 ${
                    isSelected ? 'scale-125 z-30' : ''
                  }`}
                  style={{ left: `${star.x}%`, top: `${star.y}%` }}
                >
                  <div className={`p-2 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'bg-amber-400 border-white text-stone-950 shadow-[0_0_25px_#fbbf24] scale-110'
                      : isConnected
                      ? 'bg-purple-600 border-amber-300 text-white shadow-[0_0_12px_#a855f7]'
                      : 'bg-slate-900/90 border-purple-400/60 text-purple-300 hover:border-amber-300'
                  }`}>
                    <Star className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'fill-stone-950' : isConnected ? 'fill-amber-300' : 'fill-purple-400'}`} />
                  </div>
                  <span className={`text-[9px] sm:text-[10px] font-mono font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] whitespace-nowrap mt-1 ${
                    isSelected ? 'text-amber-300 scale-110' : isConnected ? 'text-purple-200' : 'text-gray-400'
                  }`}>
                    {star.name.split(' ')[0]}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* ACTIVE STAR PHOTO PORTAL & MEANING */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-purple-950/60 p-4 rounded-2xl border-2 border-purple-400/50 space-y-3 shadow-xl"
            >
              <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                <img
                  src={currentPhoto}
                  alt="Nickname Star Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
                <div className="absolute top-2 right-2 bg-purple-950/90 px-3 py-1 rounded-lg text-xs font-mono text-amber-300 border border-amber-400/40 font-bold">
                  Star #{currentStar.id} of 10
                </div>
              </div>

              <div className="space-y-1 text-left">
                <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide flex items-center justify-between">
                  <span>{currentStar.name}</span>
                  <span className="text-[10px] font-mono text-purple-300">Constellation Node #{currentStar.id}</span>
                </h3>
                <p className="text-xs text-gray-100 italic font-semibold leading-relaxed">
                  "{currentStar.meaning}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleResetConstellation}
              className="py-3.5 px-4 rounded-2xl bg-slate-900 border border-purple-400/40 text-purple-300 font-extrabold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Map</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-300"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Constellation Map</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}

