import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Star } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const RIDES = [
  { name: 'Ferris Wheel of Love 🎡', desc: 'At the very top, Abu whispers: "I can see our whole future from here."' },
  { name: 'Roller Coaster Rush 🎢', desc: 'Sanzu screams, Abu laughs! At the bottom they high-five. Perfect duo! 🎉' },
  { name: 'Tunnel of Love ❤️', desc: 'Slow boat through a pink tunnel. Abu says: "I\'d ride this forever with you."' }
];

export default function CoupleStarryPlanetarium() {
  const { triggerHaptic } = useAppStore();

  const [visited, setVisited] = useState([]);
  const [current, setCurrent] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentRide = RIDES[current % RIDES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const visitRide = (i) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setCurrent(i);
    if (!visited.includes(i)) setVisited((v) => [...v, i]);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌌 STARRY PLANETARIUM & AMUSEMENT PARK 🌌\n\nEnjoyed: "${currentRide.name}"\n"${currentRide.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Starry Planetarium 🌌✨"
      badgeIcon={<Star className="w-3.5 h-3.5 text-amber-300" />}
      title={"Starry Planetarium & Park"}
      subtitle={"Abu & Sanzu's Dream Date at the Carnival"}
      description={"Enjoy carnival rides, gaze at starlight planetarium projections, and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PLANETARIUM CANVAS & PHOTO REVEAL */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Planetarium Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-extrabold text-amber-300 mb-1">{currentRide.name}</h3>
            <p className="text-xs text-gray-300 italic mb-2">"{currentRide.desc}"</p>
            <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-400 font-bold">
              {visited.length}/{RIDES.length} Rides Enjoyed 🎟️
            </span>
          </div>
        </div>

        {/* RIDE BUTTONS */}
        <div className="flex justify-center gap-2 flex-wrap max-w-md mx-auto mb-6">
          {RIDES.map((ride, i) => (
            <button
              key={i}
              type="button"
              onClick={() => visitRide(i)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                current === i ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-md' : 'bg-slate-900 text-amber-200 border-amber-500/40 hover:border-amber-400'
              }`}
            >
              {ride.name.split(' ')[0]} {ride.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Planetarium</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
