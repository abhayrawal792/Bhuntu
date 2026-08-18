import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Eye, Sparkles, Share2, Compass, Star } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CELESTIAL_CONSTELLATIONS = [
  { name: "Queen Sanzu Constellation 👑", coords: "RA 14h 28m / DEC +28°", desc: "The brightest star in the entire northern sky, guiding Abu's heart forever!" },
  { name: "Proposal Ring Constellation 💍", coords: "RA 10h 28m / DEC +25°", desc: "Sealed on October 28, 2025: our marriage promise written in the stars!" },
  { name: "Nepal-Japan Starlight Bridge ✈️", coords: "RA 04h 50m / DEC +12°", desc: "Constellation bridging Nepalgunj 🇳🇵 to Sakai, Osaka 🇯🇵 across oceans!" }
];

export default function LoveConstellationStargazer() {
  const { triggerHaptic } = useAppStore();

  const [activeConst, setActiveConst] = useState(0);
  const [focused, setFocused] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentConst = CELESTIAL_CONSTELLATIONS[activeConst % CELESTIAL_CONSTELLATIONS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleFocusTelescope = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);

    setActiveConst(idx);
    setFocused(true);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔭 ASTRONOMICAL TELESCOPE STARGAZER 🔭\n\nConstellation: [${currentConst.name}]\nCoordinates: ${currentConst.coords}\n"${currentConst.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Astronomical Telescope 🔭✨"
      badgeIcon={<Eye className="w-3.5 h-3.5 text-purple-300" />}
      title={"Astronomical Telescope Stargazer"}
      subtitle={"Pan & Focus Telescope Viewfinder Across Deep Space"}
      description={"Focus the brass astronomical telescope lens onto deep space star formations to unlock starlight photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* TELESCOPE CABINET CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-[0_0_50px_rgba(168,85,247,0.3)] p-5 sm:p-6 space-y-6">
          
          {/* TELESCOPE STATUS BANNER */}
          <div className="flex items-center justify-between bg-purple-950/40 p-3 rounded-2xl border border-purple-400/40 text-xs font-mono font-bold text-purple-300">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              {currentConst.coords}
            </span>
            <span className="text-amber-300">{focused ? 'LENS FOCUSED 🔭' : 'PANNING SKY'}</span>
          </div>

          {/* BRASS TELESCOPE VIEWFINDER LENS */}
          <div className="relative w-72 h-72 rounded-full border-4 border-amber-400/90 mx-auto bg-gradient-to-b from-purple-950 via-slate-950 to-indigo-950 p-4 shadow-2xl overflow-hidden flex items-center justify-center">
            {focused ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full h-full space-y-2 flex flex-col items-center justify-center z-20"
              >
                <div className="w-full h-48 rounded-full overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Stargazer Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                  />
                  <div className="absolute inset-0 bg-purple-500/10 pointer-events-none" />
                </div>
              </motion.div>
            ) : (
              <div className="space-y-3 z-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                  className="text-6xl text-amber-300"
                >
                  ✨
                </motion.div>
                <p className="text-xs font-mono font-bold text-purple-300">
                  SELECT CONSTELLATION BELOW TO FOCUS LENS
                </p>
              </div>
            )}

            {/* TELESCOPE CROSSHAIRS */}
            <div className="absolute inset-0 border-2 border-amber-400/20 rounded-full pointer-events-none flex items-center justify-center z-30">
              <div className="w-full h-px bg-amber-400/30" />
              <div className="h-full w-px bg-amber-400/30 absolute" />
            </div>
          </div>

          {/* CONSTELLATION DESCRIPTION */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-purple-400/40 space-y-1">
            <h3 className="text-xs font-black text-amber-300 uppercase tracking-wide">
              {currentConst.name}
            </h3>
            <p className="text-xs text-gray-200 italic font-semibold">
              "{currentConst.desc}"
            </p>
          </div>

          {/* CONSTELLATION FOCUS BUTTONS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CELESTIAL_CONSTELLATIONS.map((c, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleFocusTelescope(idx)}
                className={`p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer ${
                  activeConst === idx && focused
                    ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-lg scale-105'
                    : 'bg-stone-900 text-purple-200 border-purple-500/30 hover:border-purple-400'
                }`}
              >
                🔭 Star #{idx + 1}
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
              <span>Share Telescope Finding</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
