import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Award, Heart, Sparkles, Send, Compass, Telescope, Eye, RefreshCw, ZoomIn } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CONSTELLATIONS = [
  { id: 'sanzu-crown', name: '👑 Constellation Sanzu-Major (The Queen\'s Crown)', desc: 'The brightest constellation in the northern hemisphere, dedicated to Queen Sanzu.' },
  { id: 'scooter-centauri', name: '🛵 Constellation Scooter-Centauri (The Blue Scooter)', desc: 'Guiding Sanzu & Abu on their road trips from Nepalgunj to Bardiya.' },
  { id: 'chiya-lyra', name: '☕ Constellation Chiya-Lyra (The Warm Tea Cup)', desc: 'Symbolizing late-night chiya dates and endless romantic talks.' },
  { id: 'ring-orion', name: '💍 Constellation Marriage-Orion (The Twin Rings)', desc: 'Two eternal stars bound by destiny & lifelong commitment.' },
];

const STAR_FACTS = [
  "This star is 847 light-years from Earth — shining 200x brighter than our Sun!",
  "Formed in the Sagittarius cluster, its warmth matches Sanzu's sweet smile.",
  "Astronomers confirm: This star radiates pure romantic energy across time and space!",
  "A rare Blue Supergiant star whose light has traveled 800 years just to meet Sanzu!",
  "The brightest star in Abu & Bhuntu's private galaxy!",
];

export default function StarNamer() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.starNamer;
  const { triggerHaptic } = useAppStore();

  const [stars, setStars] = useState([]);
  const [chosenStar, setChosenStar] = useState(null);
  const [selectedConstellation, setSelectedConstellation] = useState(CONSTELLATIONS[0]);
  const [dedication, setDedication] = useState('');
  const [registered, setRegistered] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Generate interactive starfield with photo attachments
  useEffect(() => {
    const s = [];
    for (let i = 0; i < 48; i++) {
      s.push({
        id: i,
        x: Math.random() * 88 + 6,
        y: Math.random() * 84 + 8,
        size: 2 + Math.random() * 4,
        brightness: 0.4 + Math.random() * 0.6,
        twinkle: 1.5 + Math.random() * 2.5,
        photoIdx: i % BHUNTU_PHOTOS.length,
        starName: `Sanzu Star #${100 + i}`,
      });
    }
    setStars(s);
  }, []);

  const handleStarClick = (star) => {
    playSparkle();
    triggerHaptic(20);
    setChosenStar(star);
  };

  const handleRegister = () => {
    if (!chosenStar) return;
    playBloom();
    triggerHaptic([40, 90, 40]);
    setRegistered(true);
    confetti({ particleCount: 220, spread: 110, origin: { y: 0.5 } });
    setTimeout(() => setShowCertificate(true), 800);
  };

  const currentFact = STAR_FACTS[chosenStar ? chosenStar.id % STAR_FACTS.length : 0];
  const starPhotoSrc = chosenStar ? BHUNTU_PHOTOS[chosenStar.photoIdx % BHUNTU_PHOTOS.length] : null;

  return (
    <WorldShell
      theme="celestial"
      badge="Deluxe Stargazer Observatory 🌌⭐"
      badgeIcon={<Star className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />}
      title="Bhuntu's Name-A-Star Observatory 🌌⭐"
      subtitle="Explore the cosmos, pick a glowing star with Sanzu's photo, and issue an official Universal Star Certificate!"
      description="100% official starlight registry certificate for princess Sanzu from Abu!"
    >

      <div className="max-w-3xl mx-auto space-y-5 font-ui">

        {!showCertificate ? (
          <>
            {/* Constellation Selector Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-indigo-950/80 backdrop-blur-md p-3 rounded-2xl border border-indigo-500/30 text-white shadow-xl">
              <div className="flex items-center gap-2">
                <Telescope className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                  Target Constellation:
                </span>
              </div>

              <select
                value={selectedConstellation.id}
                onChange={e => {
                  playPop();
                  const found = CONSTELLATIONS.find(c => c.id === e.target.value);
                  if (found) setSelectedConstellation(found);
                }}
                className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-indigo-900 border border-indigo-400 text-xs font-bold text-amber-200 outline-none cursor-pointer"
              >
                {CONSTELLATIONS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Interactive Stargazer Telescope Box */}
            <div className="w-full h-80 rounded-3xl bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 border-4 border-indigo-500/60 shadow-2xl relative overflow-hidden flex flex-col justify-between p-4">

              {/* Background Nebulae & Constellation Lines */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-600 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-600 rounded-full blur-3xl" />
              </div>

              {/* Instruction Banner */}
              <div className="relative z-10 flex items-center justify-between text-left">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300">
                    {selectedConstellation.name.split('(')[0]}
                  </span>
                  <p className="text-[11px] text-indigo-200 mt-0.5">
                    {chosenStar ? '✨ Star targeted! Inspect details below' : '👇 Tap any glowing star in the sky to target it!'}
                  </p>
                </div>

                {/* Zoom toggle button */}
                <button
                  onClick={() => setZoomLevel(prev => (prev === 1 ? 1.25 : 1))}
                  className="px-2.5 py-1 rounded-xl bg-indigo-900/80 hover:bg-indigo-800 border border-indigo-400/40 text-[11px] font-bold text-amber-300 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Zoom {zoomLevel}x</span>
                </button>
              </div>

              {/* Stars Canvas Grid */}
              <div
                className="absolute inset-0 transition-transform duration-500"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {stars.map(s => {
                  const isSelected = chosenStar?.id === s.id;

                  return (
                    <motion.button
                      key={s.id}
                      onClick={() => handleStarClick(s)}
                      animate={{
                        opacity: isSelected ? 1 : [s.brightness * 0.4, s.brightness, s.brightness * 0.4],
                        scale: isSelected ? [1, 1.3, 1] : 1,
                      }}
                      transition={{ duration: s.twinkle, repeat: Infinity }}
                      className={`absolute rounded-full cursor-pointer transition-all flex items-center justify-center ${
                        isSelected
                          ? 'bg-amber-400 ring-4 ring-amber-400/60 z-30 shadow-2xl scale-125'
                          : 'bg-white hover:bg-amber-200 hover:scale-125 z-10'
                      }`}
                      style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: isSelected ? 22 : s.size * 3,
                        height: isSelected ? 22 : s.size * 3,
                      }}
                    >
                      {isSelected ? (
                        <Star className="w-3.5 h-3.5 text-indigo-950 fill-indigo-950 animate-spin" style={{ animationDuration: '4s' }} />
                      ) : null}
                    </motion.button>
                  );
                })}
              </div>

              {/* Coordinate HUD Bar */}
              <div className="relative z-10 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-indigo-400/20 text-[10px] font-mono text-indigo-300">
                <span>OBSERVATORY: NEPALGUNJ ↔ OSAKA SKY</span>
                {chosenStar ? (
                  <span className="text-amber-300 font-bold">
                    TARGET: RA {(14 + chosenStar.x / 10).toFixed(2)}h / DEC +{(30 + chosenStar.y / 3).toFixed(1)}°
                  </span>
                ) : (
                  <span>STATUS: SCANNING GALAXIES</span>
                )}
              </div>
            </div>

            {/* Chosen Star Photo & Dedication Card */}
            {chosenStar && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-card p-5 rounded-3xl border-2 border-amber-300 bg-white/95 shadow-2xl text-left space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Embedded Bhuntu Photo inside Glowing Star Halo */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-pink-500 to-rose-500 shadow-xl animate-pulse">
                      <img
                        src={starPhotoSrc}
                        onError={e => handlePhotoError(e, chosenStar.photoIdx)}
                        alt="Target Star Photo"
                        className="w-full h-full object-cover rounded-full border-2 border-white"
                      />
                    </div>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
                      STAR PHOTO 📸
                    </span>
                  </div>

                  <div className="space-y-1 text-center sm:text-left flex-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                      ★ Class O Blue Supergiant
                    </span>
                    <h3 className="text-lg font-black text-gray-900">
                      SANZU RAWAL STAR (ID #{1000 + chosenStar.id})
                    </h3>
                    <p className="text-xs text-gray-600 italic">
                      "{currentFact}"
                    </p>
                  </div>
                </div>

                {/* Dedication Input */}
                <div className="space-y-1 pt-1">
                  <label className="text-xs font-bold text-gray-700">Write Custom Star Dedication Message:</label>
                  <textarea
                    value={dedication}
                    onChange={e => setDedication(e.target.value)}
                    placeholder="Write a sweet message for Sanzu... (e.g. 'For my forever queen Sanzu, shining brighter than 100 billion galaxies!')"
                    rows={2}
                    className="w-full p-3 rounded-2xl border-2 border-amber-200 text-xs font-medium text-gray-800 outline-none focus:border-amber-400 font-ui bg-amber-50/30 resize-none"
                  />
                </div>

                <button
                  onClick={handleRegister}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-xl cursor-pointer hover:scale-102 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" /> Issue Official "SANZU RAWAL STAR" Certificate ⭐
                </button>
              </motion.div>
            )}
          </>
        ) : (
          /* Official Gold-Leaf Certificate Display */
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl text-left"
          >
            <div className="p-7 bg-gradient-to-br from-amber-50 via-white to-amber-50 border-4 border-amber-400 relative">
              {/* Corner Gold Frame Accents */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500 rounded-br-lg" />

              <div className="text-center space-y-2">
                <Sparkles className="w-9 h-9 text-amber-500 mx-auto" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-800 block">
                  ★ Universal Celestial Star Registry ★
                </span>
                <div className="w-20 h-0.5 bg-amber-400 mx-auto" />

                {/* Embedded Photo in Certificate */}
                {starPhotoSrc && (
                  <div className="w-20 h-20 rounded-full mx-auto p-1 bg-gradient-to-r from-amber-400 to-rose-500 shadow-md">
                    <img
                      src={starPhotoSrc}
                      onError={e => handlePhotoError(e, chosenStar.photoIdx)}
                      alt="Star Owner Photo"
                      className="w-full h-full object-cover rounded-full border border-white"
                    />
                  </div>
                )}

                <h3 className="text-2xl font-black font-nepali text-rose-600">
                  SANZU RAWAL STAR ✨
                </h3>
                <p className="text-[11px] font-mono text-amber-900 font-bold">
                  Coordinates: RA {chosenStar ? (14 + chosenStar.x / 10).toFixed(2) : '14.29'}h / DEC +{chosenStar ? (30 + chosenStar.y / 3).toFixed(1) : '60.2'}°
                </p>
                <p className="text-[10px] font-bold text-indigo-700 font-mono">
                  Constellation: {selectedConstellation.name}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-100/60 border border-amber-300 my-4 text-center">
                <p className="text-xs text-amber-950 font-medium italic leading-relaxed">
                  "{dedication || 'Be it registered across the universe that the brightest star in the night sky is hereby named after Sanzu Rawal — shining for eternity in Abu\'s heart! 💕'}"
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-amber-900 pt-2 border-t border-amber-300">
                <div>
                  <span className="block font-bold">Registry Date</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1 text-rose-600 font-bold font-nepali">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span>Eternal Love Decree</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold">Certificate #</span>
                  <span>SR-2026-STAR-{Math.floor(Math.random() * 8000 + 1000)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  sendWhatsAppMessage(`⭐ Hey Abu! I just registered an official star in the sky:\n*SANZU RAWAL STAR ✨*\nConstellation: ${selectedConstellation.name}\nDedication: "${dedication || 'Shining bright for eternity in Abu\'s heart!'}"`, '⭐ Name-A-Star Registry Certificate');
                }}
                className="mt-4 w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 font-ui"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Star Certificate to Abu on WhatsApp 📲</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
