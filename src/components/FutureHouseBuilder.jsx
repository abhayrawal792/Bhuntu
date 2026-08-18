import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Home, Sparkles, Share2, RefreshCw, Flower2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ROOM_OPTIONS = {
  wallColors: [
    { name: 'Warm Cream 🍦', color: '#FFFDF0', border: '#E6DCB8' },
    { name: 'Blush Pink 🌸', color: '#FFF0F3', border: '#F2B6C1' },
    { name: 'Cozy Sage 🌿', color: '#F0FFF4', border: '#B4E2C2' },
    { name: 'Sunset Peach 🌅', color: '#FFF5F0', border: '#F7C6B3' },
  ],
  sofas: ['Luxury Velvet Loveseat 🛋️', 'Cozy Recliner Couch 🛋️', 'Giant Cuddle Sofa 💕'],
  gardens: ['Sakura Cherry Blossom Trees 🌸', 'Red Velvet Roses 🌹', 'Sunflowers & Lavender 🌻'],
  extras: ['Fireplace for Winter Nights 🪵', 'Sunset Balcony View 🌅', 'Cozy Reading Nook 📚', 'Giant Teddy Bear Corner 🧸']
};

export default function FutureHouseBuilder() {
  const { triggerHaptic } = useAppStore();

  const [wall, setWall] = useState(0);
  const [sofa, setSofa] = useState(0);
  const [garden, setGarden] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([0]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const toggleExtra = (i) => {
    playPop();
    triggerHaptic(15);
    setSelectedExtras((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const handleFinishHouse = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
  };

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (nextPhoto === photoIdx) nextPhoto = (nextPhoto + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🏠 OUR FUTURE DREAM HOME 🏠\n\nDesigned Villa De Bebo & Abu!\nSofa: ${ROOM_OPTIONS.sofas[sofa]}\nGarden: ${ROOM_OPTIONS.gardens[garden]}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Our Future Dream Home 🏠✨"
      badgeIcon={<Home className="w-3.5 h-3.5 text-amber-600" />}
      title={"Our Future Dream Home"}
      subtitle={"Design Sanzu & Abu's Cozy Nest"}
      description={"Customize the wall colors, living room sofa, sakura garden, and framed photos for Sanzu & Abu's future dream home!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* HOUSE PREVIEW CANVAS */}
        <motion.div
          style={{
            backgroundColor: ROOM_OPTIONS.wallColors[wall].color,
            borderColor: ROOM_OPTIONS.wallColors[wall].border,
          }}
          className="max-w-md mx-auto p-6 rounded-3xl border-4 shadow-2xl transition-all duration-500 relative overflow-hidden mb-6 text-left"
        >
          <div className="flex justify-between items-center mb-4 border-b border-amber-900/10 pb-3">
            <span className="text-sm font-extrabold text-amber-950 font-nepali flex items-center gap-1.5">
              <Home className="w-4 h-4 text-amber-700" /> Villa De Bebo & Abu
            </span>
            <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
              <Flower2 className="w-3.5 h-3.5" /> Dream Nest
            </span>
          </div>

          {/* Living Room Framed Photo of Sanzu */}
          <div className="w-full h-44 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md relative bg-black/40 mb-4">
            <img
              src={currentPhoto}
              alt="Framed Living Room Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20 font-bold">
              Framed Living Room Portrait 🖼️📸
            </div>
          </div>

          <div className="space-y-3 text-xs text-amber-950">
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200/60 font-bold flex items-center justify-between shadow-xs">
              <span>🛋️ Main Sofa:</span>
              <span className="text-rose-700">{ROOM_OPTIONS.sofas[sofa]}</span>
            </div>
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200/60 font-bold flex items-center justify-between shadow-xs">
              <span>🌸 Garden View:</span>
              <span className="text-rose-700">{ROOM_OPTIONS.gardens[garden]}</span>
            </div>
            <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200/60 font-bold shadow-xs">
              <span className="block mb-1.5">✨ Special Additions:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedExtras.map((idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-[11px] border border-amber-300 font-bold">
                    {ROOM_OPTIONS.extras[idx]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CONTROLS */}
        <div className="max-w-md mx-auto space-y-4 text-left p-5 rounded-3xl bg-white border border-amber-200 shadow-xl mb-6">
          <div>
            <label className="text-xs font-bold text-amber-950 block mb-2">1. Select Wall Color:</label>
            <div className="grid grid-cols-2 gap-2">
              {ROOM_OPTIONS.wallColors.map((w, i) => (
                <button
                  key={w.name}
                  type="button"
                  onClick={() => {
                    playPop();
                    setWall(i);
                  }}
                  className={`p-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all cursor-pointer ${
                    wall === i ? 'border-amber-600 bg-amber-50 shadow-xs' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <span>{w.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-amber-950 block mb-2">2. Select Sofa Style:</label>
            <div className="space-y-1.5">
              {ROOM_OPTIONS.sofas.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    playPop();
                    setSofa(i);
                  }}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                    sofa === i ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-xs' : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPhoto}
            className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Random Photo</span>
          </button>

          <button
            type="button"
            onClick={handleFinishHouse}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Save House</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Home</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
