import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Globe, Sparkles, Share2, RefreshCw, MapPin, Plane, CheckCircle2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const VACATIONS = [
  { id: 1, country: "Japan 🇯🇵", dest: "Osaka Cherry Blossom Tour 🌸", lat: 34.6937, lng: 135.5023, desc: "Walking hand in hand through glowing sakura gardens in Sakai & Namba, Osaka!" },
  { id: 2, country: "Nepal 🇳🇵", dest: "Pokhara Phewa Lake Boating 🏔️", lat: 28.2096, lng: 83.9856, desc: "Romantic sunset lake boating with breathtaking Annapurna mountain range reflection!" },
  { id: 3, country: "Nepal 🇳🇵", dest: "Bardiya Scooter Safari 🛵", lat: 28.4735, lng: 81.2858, desc: "Queen Sanzu driving her light blue scooter with Abu hugging her tightly!" },
  { id: 4, country: "France 🇫🇷", dest: "Paris Eiffel Tower Night Picnic 🗼", lat: 48.8584, lng: 2.2945, desc: "Sipping sparkling champagne under the glowing golden lights of the Eiffel Tower!" },
  { id: 5, country: "Japan 🇯🇵", dest: "Kyoto Fushimi Inari Shrine Walk ⛩️", lat: 34.9671, lng: 135.7727, desc: "Strolling under thousands of vermilion torii gates with sweet Japanese matcha treats!" },
  { id: 6, country: "Greece 🇬🇷", dest: "Santorini Caldera Sunset Villa 🏛️", lat: 36.3932, lng: 25.4615, desc: "Watching Mediterranean blue ocean sunsets from our private white infinity pool!" },
  { id: 7, country: "Italy 🇮🇹", dest: "Venice Grand Canal Gondola 🚣", lat: 45.4371, lng: 12.3326, desc: "Gliding on a private gondola while serenaded under ancient stone bridges!" },
  { id: 8, country: "Indonesia 🇮🇩", dest: "Bali Waterfalls & Treehouse 🌴", lat: -8.4095, lng: 115.1889, desc: "Relaxing in lush tropical rainforest villas surrounded by emerald rice terraces!" },
  { id: 9, country: "USA 🇺🇸", dest: "Hawaii Maui Beach Sunset 🌺", lat: 20.7984, lng: -156.3319, desc: "Barefoot walks along golden Pacific sands wearing flower leis under palm trees!" },
  { id: 10, country: "Japan 🇯🇵", dest: "Sakai Sunset Seaside Promenade 🌅", lat: 34.5733, lng: 135.483, desc: "Abu & Queen Sanzu enjoying late-evening ocean breeze after a delicious meal!" }
];

export default function CoupleBucketListGlobe() {
  const { triggerHaptic } = useAppStore();

  const [vacIdx, setVacIdx] = useState(0);
  const [visitedPins, setVisitedPins] = useState([1]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentVacation = VACATIONS[vacIdx % VACATIONS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectVacation = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setVacIdx(idx);

    const vacation = VACATIONS[idx];
    if (!visitedPins.includes(vacation.id)) {
      setVisitedPins(prev => [...prev, vacation.id]);
    }

    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.5 } });
  };

  const handleNextRandomTrip = () => {
    const nextIdx = (vacIdx + 1) % VACATIONS.length;
    handleSelectVacation(nextIdx);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌐 COUPLE BUCKET LIST GLOBE 🌐\n\nDestination #${currentVacation.id}: [${currentVacation.dest}]\nCountry: ${currentVacation.country}\nNotes: "${currentVacation.desc}"\nExplored Destinations: ${visitedPins.length}/${VACATIONS.length}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Couple Bucket List Globe 🌐✨"
      badgeIcon={<Globe className="w-3.5 h-3.5 text-sky-400" />}
      title={"Couple Bucket List Globe"}
      subtitle={"3D Interactive World Map for Abu & Queen Sanzu"}
      description={"Rotate and explore 10 worldwide getaway destinations pinned on Abu & Queen Sanzu's eternal travel globe!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        
        {/* TOP STATUS METER */}
        <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-300 bg-sky-950/40 p-3 rounded-2xl border border-sky-400/30 mb-4 max-w-md mx-auto">
          <span className="flex items-center gap-1.5">
            <Plane className="w-4 h-4 text-sky-400 animate-pulse" />
            DESTINATIONS UNLOCKED: {visitedPins.length}/{VACATIONS.length}
          </span>
          <span className="text-amber-300 font-extrabold">{currentVacation.country}</span>
        </div>

        {/* 3D GLOBE SPHERE PROJECTION */}
        <div className="relative w-72 h-72 rounded-full border-4 border-sky-400/80 mx-auto bg-gradient-to-b from-slate-950 via-sky-950 to-blue-950 p-4 shadow-[0_0_50px_rgba(56,189,248,0.35)] overflow-hidden flex items-center justify-center mb-6">
          
          {/* ATMOSPHERE HALO */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.2)_0%,transparent_75%)] animate-pulse pointer-events-none" />

          {/* LATITUDE & LONGITUDE GRID LINES */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-40">
            <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
            <ellipse cx="50%" cy="50%" rx="42%" ry="20%" fill="none" stroke="#38bdf8" strokeWidth="1" />
            <ellipse cx="50%" cy="50%" rx="42%" ry="32%" fill="none" stroke="#38bdf8" strokeWidth="1" />
            <line x1="50%" y1="8%" x2="50%" y2="92%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2" />
            <line x1="8%" y1="50%" x2="92%" y2="50%" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 2" />
          </svg>

          {/* DESTINATION PINS ON GLOBE */}
          {VACATIONS.map((v, idx) => {
            const isSelected = vacIdx === idx;
            const isVisited = visitedPins.includes(v.id);
            // Project lat/lng to 2D circle coordinates
            const radLng = (v.lng * Math.PI) / 180;
            const radLat = (v.lat * Math.PI) / 180;
            const x = 50 + 36 * Math.sin(radLng) * Math.cos(radLat);
            const y = 50 - 36 * Math.sin(radLat);

            return (
              <motion.button
                key={v.id}
                whileHover={{ scale: 1.3 }}
                onClick={() => handleSelectVacation(idx)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all z-20 ${
                  isSelected ? 'scale-125 z-30' : ''
                }`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <div className={`p-1.5 rounded-full border-2 transition-all ${
                  isSelected
                    ? 'bg-amber-400 border-white text-stone-950 shadow-[0_0_20px_#fbbf24] scale-110'
                    : isVisited
                    ? 'bg-sky-500 border-amber-300 text-white shadow-[0_0_10px_#38bdf8]'
                    : 'bg-slate-900 border-sky-400 text-sky-300'
                }`}>
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'fill-stone-950' : isVisited ? 'fill-white' : ''}`} />
                </div>
              </motion.button>
            );
          })}

          {/* CENTER GLOBE EMOJI ROTATOR */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="text-7xl opacity-80 pointer-events-none select-none filter drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]"
          >
            🌍
          </motion.div>
        </div>

        {/* GLOBE CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={vacIdx}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="relative max-w-md mx-auto p-5 rounded-3xl bg-slate-950 border-4 border-sky-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Globe Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-sky-950/90 px-3 py-1 rounded-lg text-xs font-mono text-sky-200 border border-sky-400/40 font-bold flex items-center gap-1">
                <Plane className="w-3.5 h-3.5 text-sky-400" />
                Trip #{currentVacation.id} of 10
              </div>
            </div>

            <div className="pt-1 text-left w-full space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold text-sky-300 uppercase tracking-wider">
                  {currentVacation.dest}
                </h3>
                <span className="text-[10px] font-mono text-amber-300 font-bold bg-sky-950 px-2 py-0.5 rounded border border-sky-500/30">
                  {currentVacation.country}
                </span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold italic">
                "{currentVacation.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DESTINATION SELECTION PILLS */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 max-w-md mx-auto mb-6">
          {VACATIONS.map((v, idx) => (
            <button
              key={v.id}
              type="button"
              onClick={() => handleSelectVacation(idx)}
              className={`p-2 rounded-xl border text-[10px] font-bold transition-all cursor-pointer truncate ${
                vacIdx === idx
                  ? 'bg-sky-500 text-white border-sky-300 shadow-md font-extrabold scale-105'
                  : visitedPins.includes(v.id)
                  ? 'bg-sky-950 text-sky-200 border-sky-500/40'
                  : 'bg-slate-900 text-gray-400 border-gray-800 hover:border-sky-400'
              }`}
            >
              #{v.id} {v.country.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
          <button
            type="button"
            onClick={handleNextRandomTrip}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-sky-300 hover:brightness-110 active:scale-98"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Fly To Next Destination ✈️</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-emerald-300"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Travel Getaway</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
