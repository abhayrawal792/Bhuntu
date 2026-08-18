import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Star } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CONSTELLATIONS = [
  { title: "The Heart Constellation 💖", desc: "Connecting 7 glowing stars forming an eternal heart over Osaka." },
  { title: "Queen Sanzu's Birthday Crown 👑", desc: "A shining star cluster crowning Sanzu Rawal on her special day." },
  { title: "Nepalgunj ↔ Osaka Star Bridge ✈️", desc: "Cosmic starlight bridging the distance between Abu and Sanzu." },
  { title: "Infinity Love Ring 💍", desc: "A celestial ring sparkling with everlasting devotion." }
];

export default function LoveConstellationPainter() {
  const { triggerHaptic } = useAppStore();

  const [constellationIdx, setConstellationIdx] = useState(0);
  const [drawn, setDrawn] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentConstellation = CONSTELLATIONS[constellationIdx % CONSTELLATIONS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleDrawStars = () => {
    playPop();
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setDrawn(true);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleNextConstellation = () => {
    playPop();
    triggerHaptic(10);
    setConstellationIdx((prev) => (prev + 1) % CONSTELLATIONS.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    setDrawn(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `✨ STARRY CONSTELLATION PAINTER ✨\n\nConstellation Drawn: "${currentConstellation.title}"\n"${currentConstellation.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Constellation Painter ✨"
      badgeIcon={<Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />}
      title={"Starry Constellation Painter"}
      subtitle={"Connect Stars to Paint Celestial Photo Projections"}
      description={"Tap to draw starlight constellations across the night sky and project Sanzu's memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* STARRY SKY CANVAS */}
        <div
          onClick={handleDrawStars}
          className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-300/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center cursor-pointer overflow-hidden"
        >
          {!drawn ? (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-amber-900/30 border-2 border-amber-300 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                ✨
              </div>
              <p className="text-xs font-extrabold text-amber-300 font-mono uppercase tracking-wider">
                {currentConstellation.title}
              </p>
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-300/40 text-xs font-bold inline-block">
                Tap to Connect Stars ✨
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-3"
            >
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Constellation Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/60 text-amber-200 text-xs font-bold leading-relaxed">
                "{currentConstellation.desc}"
              </div>
            </motion.div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!drawn ? (
            <button
              type="button"
              onClick={handleDrawStars}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Connect Stars</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextConstellation}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Constellation</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Sky</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
