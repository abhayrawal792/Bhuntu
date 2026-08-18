import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Globe, Sparkles, Share2, RefreshCw, Star, Compass, Award } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const GALAXIES = [
  { id: 1, galaxy: "Planet Abu Galaxy Orbit 🌌", desc: "A sparkling galaxy where Abu's heart orbits Queen Sanzu forever in deep space!", color: "from-purple-500 to-indigo-600" },
  { id: 2, galaxy: "Nepalgunj-Osaka Cosmic Bridge 🌉", desc: "4,500 miles connected by stellar starlight, love notes, and sakuras!", color: "from-pink-500 to-rose-600" },
  { id: 3, galaxy: "Everlasting Marriage Galaxy 💍", desc: "The brightest constellation in deep space shining over our 2026 dream home!", color: "from-amber-400 to-yellow-500" }
];

export default function GrandLoveGalaxy3D() {
  const { triggerHaptic } = useAppStore();

  const [galIdx, setGalIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [exploredGalaxies, setExploredGalaxies] = useState([1]);

  const currentGalaxy = GALAXIES[galIdx % GALAXIES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectGalaxy = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(18);
    setGalIdx(idx);

    const target = GALAXIES[idx];
    if (!exploredGalaxies.includes(target.id)) {
      setExploredGalaxies(prev => [...prev, target.id]);
    }

    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    triggerHaptic(15);
    const text = `🌌 *GRAND LOVE GALAXY 3D* 🌌\n\nActive Galaxy: *[${currentGalaxy.galaxy}]*\n"${currentGalaxy.desc}"\nExplored Galaxies: *${exploredGalaxies.length}/${GALAXIES.length}*\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Grand Love Galaxy 🌌✨"
      badgeIcon={<Globe className="w-3.5 h-3.5 text-purple-400 animate-spin" />}
      title={"Grand Love Galaxy 3D"}
      subtitle={"3D Cosmic Galaxy System dedicated to Queen Sanzu"}
      description={"Explore 3D cosmic galaxy systems and constellations dedicated to Queen Sanzu to unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none font-ui space-y-6">
        {/* Galaxy Stage Viewport */}
        <AnimatePresence mode="wait">
          <motion.div
            key={galIdx}
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -15 }}
            className="relative max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-500/80 shadow-[0_0_50px_rgba(168,85,247,0.4)] space-y-5 text-left"
          >
            {/* Galaxy Visual Header Frame */}
            <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-purple-400/60 shadow-xl relative bg-black/60">
              <img
                src={currentPhoto.url || currentPhoto}
                alt="Galaxy Memory Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105"
              />
              <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-purple-200 border border-purple-400/40 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Galaxy Orbit #{galIdx + 1}</span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>{currentGalaxy.galaxy}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                "{currentGalaxy.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Galaxy Selection Orbit Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-md mx-auto">
          {GALAXIES.map((g, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectGalaxy(idx)}
              className={`p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                galIdx === idx
                  ? 'bg-gradient-to-r ' + g.color + ' text-white border-white shadow-lg scale-105'
                  : 'bg-slate-900/80 text-purple-200 border-purple-500/40 hover:border-purple-400'
              }`}
            >
              🌌 Orbit #{idx + 1}
            </button>
          ))}
        </div>

        {/* Action Button */}
        <div className="max-w-md mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs sm:text-sm shadow-xl hover:from-emerald-600 hover:to-teal-700 cursor-pointer flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Galaxy Orbit on WhatsApp</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
