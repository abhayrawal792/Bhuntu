import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Globe, Sparkles, Share2, RefreshCw, Sun, Compass, Star, Zap, Award, Heart } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PLANETS = [
  { id: 1, icon: '☀️', name: "Sun of Queen Sanzu 👑", orbitRadius: 0, color: 'from-amber-400 to-yellow-500', desc: "The radiant golden central sun that powers Abu's entire universe and life!" },
  { id: 2, icon: '💙', name: "Planet Abu's Devotion 💙", orbitRadius: 40, color: 'from-blue-400 to-indigo-600', desc: "Orbiting in perfect gravitational lock around Queen Sanzu forever!" },
  { id: 3, icon: '💍', name: "Marriage Ring Orbit 💍", orbitRadius: 65, color: 'from-yellow-300 to-amber-500', desc: "The sacred golden ring orbit of our October 28 proposal vow!" },
  { id: 4, icon: '✈️', name: "Osaka Airmail Star 🌸", orbitRadius: 90, color: 'from-pink-400 to-rose-500', desc: "Connecting Nepalgunj to Sakai, Osaka across 4,500 miles with love!" },
  { id: 5, icon: '🥟', name: "Panipuri & Momo Nebula 🥟", orbitRadius: 115, color: 'from-orange-400 to-amber-600', desc: "A cozy gourmet galaxy of endless panipuri & momo date nights!" },
  { id: 6, icon: '🏡', name: "Dream Sanctuary World 🏡", orbitRadius: 140, color: 'from-emerald-400 to-teal-600', desc: "Our 2026 home world with flower gardens, cat balconies & golden lights!" },
  { id: 7, icon: '👑', name: "Royal Coronation Throne 👑", orbitRadius: 165, color: 'from-purple-400 to-indigo-600', desc: "The supreme royal throne world crowning Queen Sanzu ruler of all galaxies!" },
  { id: 8, icon: '💓', name: "Eternal Heartbeat Supernova 💓", orbitRadius: 190, color: 'from-rose-500 to-red-600', desc: "Pulsing with eternal energy across all space and time!" }
];

export default function GrandLoveUniverse() {
  const { triggerHaptic } = useAppStore();

  const [planetIdx, setPlanetIdx] = useState(0);
  const [visitedPlanets, setVisitedPlanets] = useState([1]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [rotation, setRotation] = useState(0);

  const currentPlanet = PLANETS[planetIdx % PLANETS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  // Auto rotation of orbits
  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(r => (r + 0.8) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleSelectPlanet = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(20);
    setPlanetIdx(idx);

    const target = PLANETS[idx];
    if (!visitedPlanets.includes(target.id)) {
      setVisitedPlanets(prev => [...prev, target.id]);
    }

    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    triggerHaptic(15);
    const text = `🌌 *GRAND LOVE UNIVERSE* 🌌\n\nActive Planet #${currentPlanet.id}: *[${currentPlanet.name}]*\nDescription: "${currentPlanet.desc}"\nExplored Orbits: *${visitedPlanets.length}/${PLANETS.length}*\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Grand Love Universe 🌌✨"
      badgeIcon={<Globe className="w-3.5 h-3.5 text-purple-300 animate-spin" />}
      title={"Grand Love Universe"}
      subtitle={"Abu & Sanzu's 3D Solar System of Infinite Devotion"}
      description={"Navigate the 8 orbiting love planets in Queen Sanzu's celestial solar system to unlock memory photos!"}
    >
      <div className="max-w-3xl mx-auto px-4 pb-16 text-center select-none font-ui space-y-6">
        {/* Top Orbit Progress Header */}
        <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-200 bg-purple-950/70 p-4 rounded-2xl border border-purple-500/40 shadow-xl max-w-lg mx-auto backdrop-blur-md">
          <span className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-400 fill-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
            ORBITS EXPLORED: {visitedPlanets.length}/{PLANETS.length}
          </span>
          <span className="text-amber-300 font-extrabold px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40">
            {currentPlanet.name.split(' ')[0]}
          </span>
        </div>

        {/* 3D Solar System Stage */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border-4 border-purple-500/70 mx-auto bg-gradient-to-b from-purple-950 via-slate-950 to-indigo-950 p-4 shadow-[0_0_60px_rgba(168,85,247,0.45)] overflow-hidden flex items-center justify-center">
          {/* Orbit rings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40">
            <circle cx="50%" cy="50%" r="22%" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="50%" cy="50%" r="44%" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Central Sun Planet */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: 360 }}
            transition={{ scale: { duration: 2, repeat: Infinity }, rotate: { duration: 20, repeat: Infinity, ease: 'linear' } }}
            onClick={() => handleSelectPlanet(0)}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_40px_rgba(251,191,36,0.9)] border-2 border-white flex items-center justify-center text-3xl sm:text-4xl cursor-pointer z-30"
          >
            ☀️
          </motion.div>

          {/* Orbiting Planets */}
          {PLANETS.slice(1).map((p, idx) => {
            const actualIdx = idx + 1;
            const isSelected = planetIdx === actualIdx;
            const isVisited = visitedPlanets.includes(p.id);

            const baseAngle = ((idx * (360 / (PLANETS.length - 1)) + rotation) * Math.PI) / 180;
            const rPercent = 25 + idx * 6.5;
            const x = 50 + rPercent * Math.cos(baseAngle);
            const y = 50 + rPercent * Math.sin(baseAngle);

            return (
              <motion.button
                key={p.id}
                whileHover={{ scale: 1.4 }}
                onClick={() => handleSelectPlanet(actualIdx)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center cursor-pointer transition-all z-20 ${
                  isSelected
                    ? 'w-12 h-12 text-2xl bg-gradient-to-br ' + p.color + ' shadow-[0_0_25px_rgba(244,63,94,0.8)] border-2 border-white scale-125'
                    : 'w-9 h-9 text-base bg-slate-900/90 border border-purple-400/50 shadow-md'
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span>{p.icon}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Planet Info Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlanet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 rounded-3xl bg-slate-900/90 border-2 border-purple-500/50 shadow-2xl backdrop-blur-md text-left space-y-4 max-w-lg mx-auto"
          >
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentPlanet.icon}</span>
                <div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
                    {currentPlanet.name}
                  </h3>
                  <p className="text-xs text-purple-300">Planet Orbit #{currentPlanet.id} of 8</p>
                </div>
              </div>
              <button
                onClick={handleShareWhatsApp}
                className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/40 hover:bg-purple-500/30 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed italic">
              "{currentPlanet.desc}"
            </p>

            {/* Keepsake Memory Photo */}
            {currentPhoto && (
              <div className="pt-2 flex items-center gap-4 bg-slate-950/70 p-3 rounded-2xl border border-purple-500/30">
                <img
                  src={currentPhoto.url}
                  alt="Celestial Memory"
                  onError={handlePhotoError}
                  className="w-16 h-16 rounded-xl object-cover border border-purple-400/50 shadow-md shrink-0"
                />
                <div>
                  <div className="font-bold text-xs text-amber-300">{currentPhoto.title || 'Celestial Memory'}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{currentPhoto.caption || 'Special Universe Keepsake Unlocked'}</div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
