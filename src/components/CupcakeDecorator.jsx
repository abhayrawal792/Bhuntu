import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Cake,
  Sparkles,
  Share2,
  RefreshCw,
  Heart,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FROSTINGS = [
  { name: 'Strawberry Pink 🌸', color: 'from-pink-400 to-rose-500', text: 'text-pink-950' },
  { name: 'Belgian Chocolate 🍫', color: 'from-amber-700 to-amber-900', text: 'text-amber-100' },
  { name: 'Vanilla Gold ✨', color: 'from-amber-300 to-yellow-400', text: 'text-amber-950' },
  { name: 'Ocean Blueberry 🫐', color: 'from-cyan-400 to-blue-600', text: 'text-blue-950' }
];

const TOPPINGS = ['🍓', '🍫', '🌈', '⭐', '💖', '👑', '🍒'];

export default function CupcakeDecorator() {
  const { triggerHaptic } = useAppStore();

  const [frostingIdx, setFrostingIdx] = useState(0);
  const [toppings, setToppings] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [isBaked, setIsBaked] = useState(false);

  const currentFrosting = FROSTINGS[frostingIdx];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const toggleTopping = (emoji) => {
    playPop();
    triggerHaptic(10);
    setToppings((prev) => (prev.includes(emoji) ? prev.filter((x) => x !== emoji) : [...prev, emoji]));
  };

  const handleBakeCupcake = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setIsBaked(true);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧁 BIRTHDAY CUPCAKE BAKERY 🧁\n\nI baked a custom birthday cupcake for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Birthday Cupcake Bakery 🧁✨"
      badgeIcon={<Cake className="w-3.5 h-3.5 text-pink-400" />}
      title={"Birthday Cupcake Bakery"}
      subtitle={"Design & Bake Custom Birthday Cupcakes for Sanzu"}
      description={"Select delicious frosting flavors, add toppings, and place Sanzu's memory photo candle topper on the cupcake!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* FROSTING & TOPPINGS TOOLBAR */}
        <div className="p-4 rounded-3xl bg-white border-2 border-pink-200 shadow-xl mb-6 space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2">Select Cupcake Frosting Flavor:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FROSTINGS.map((f, idx) => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => {
                    playPop();
                    setFrostingIdx(idx);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition-all border cursor-pointer ${
                    frostingIdx === idx
                      ? 'bg-gradient-to-r ' + f.color + ' ' + f.text + ' border-amber-300 shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <span>{f.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-700 mb-2">Add Delicious Toppings:</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {TOPPINGS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTopping(t)}
                  className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center cursor-pointer border-2 transition-all ${
                    toppings.includes(t)
                      ? 'border-pink-400 bg-pink-100 scale-110 shadow-sm'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CUPCAKE STAGE WITH PHOTO CANDLE TOPPER */}
        <div className="relative max-w-xs mx-auto aspect-square rounded-3xl p-4 bg-slate-950 border-4 border-pink-400/60 shadow-2xl overflow-hidden mb-6 flex flex-col items-center justify-center">
          {/* Photo Candle Topper */}
          <div className="w-20 h-20 rounded-full border-4 border-amber-300 shadow-2xl relative overflow-hidden bg-black/40 z-20 mb-2">
            <img
              src={currentPhoto}
              alt="Topper Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </div>

          {/* Cupcake Base */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Frosting Blob */}
            <div
              className={`w-32 h-14 rounded-t-full bg-gradient-to-r ${currentFrosting.color} shadow-lg border-2 border-white/40 flex items-center justify-center gap-1 text-xl`}
            >
              {toppings.slice(0, 4).map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
            {/* Wrapper */}
            <div className="w-28 h-16 bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-amber-500 rounded-b-2xl shadow-inner flex items-center justify-center text-xs font-bold font-nepali text-amber-200">
              Happy Birthday 🎂
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPhoto}
            className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Random Next Photo</span>
          </button>

          <button
            type="button"
            onClick={handleBakeCupcake}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bake Cupcake!</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
