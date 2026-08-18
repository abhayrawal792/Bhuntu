import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Globe, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const DESTINATIONS = [
  { city: 'Nepalgunj 🇳🇵', desc: 'Where Abu & Sanzu\'s love journey began.' },
  { city: 'Osaka 🇯🇵', desc: 'Queen Sanzu\'s birthday celebration city.' },
  { city: 'Kyoto Sakura 🌸', desc: 'Walking hand-in-hand under cherry blossoms.' },
  { city: 'Tokyo Lights 🗼', desc: 'Midnight city strolls & ramen dates.' },
  { city: 'Paris Eiffel 🇫🇷', desc: 'Future anniversary proposal dream city.' }
];

export default function CoupleTravelPassportStamps() {
  const { triggerHaptic } = useAppStore();

  const [stamps, setStamps] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleStamp = (i) => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60]);
    if (!stamps.includes(i)) setStamps((prev) => [...prev, i]);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setStamps([]);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `✈️ COUPLE PASSPORT STAMP BOOK ✈️\n\nStamped ${stamps.length} Travel Destinations for Queen Sanzu & Abu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Passport Stamp Book ✈️✨"
      badgeIcon={<Globe className="w-3.5 h-3.5 text-blue-400" />}
      title={"Couple Passport Stamp Book"}
      subtitle={"Stamp Sanzu & Abu's Travel Passport"}
      description={"Stamp romantic travel destinations across Nepal, Japan, and the world to unlock secret photo stamps!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PASSPORT CANVAS & PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-blue-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Passport Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 border border-white/20 font-bold">
              🛂 Stamped Passport Photo
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 min-h-[40px] w-full">
            {stamps.map((idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-xl bg-blue-900/80 border border-blue-400 text-[10px] font-mono text-blue-200 font-bold">
                {DESTINATIONS[idx].city}
              </span>
            ))}
          </div>
        </div>

        {/* DESTINATIONS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-md mx-auto mb-6 text-left">
          {DESTINATIONS.map((d, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleStamp(i)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                stamps.includes(i) ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-800 border-blue-200 hover:border-blue-400'
              }`}
            >
              <div className="flex justify-between items-center mb-0.5">
                <span>{d.city}</span>
                {stamps.includes(i) && <span>✅</span>}
              </div>
              <p className={`text-[10px] ${stamps.includes(i) ? 'text-blue-100' : 'text-gray-500'}`}>{d.desc}</p>
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {stamps.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Stamps</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Passport</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
