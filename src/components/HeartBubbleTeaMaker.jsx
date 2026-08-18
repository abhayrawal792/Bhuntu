import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Coffee, Sparkles, Heart, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FLAVORS = [
  { name: 'Pink Strawberry 🍓', color: '#FF85A1' },
  { name: 'Taro Purple 🧋', color: '#B388FF' },
  { name: 'Matcha Green 🍵', color: '#A8E6CF' },
  { name: 'Mango Sunset 🥭', color: '#FFD166' }
];

export default function HeartBubbleTeaMaker() {
  const { triggerHaptic } = useAppStore();

  const [flavor, setFlavor] = useState(0);
  const [bobaCount, setBobaCount] = useState(5);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const addBoba = () => {
    playPop();
    triggerHaptic(15);
    setBobaCount((prev) => Math.min(prev + 3, 15));
  };

  const handleFinishTea = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
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
    const text = `🧋 BEBO'S BOBA TEA CAFE 🧋\n\nFlavor: ${FLAVORS[flavor].name}\nBoba Pearls: ${bobaCount} Heart Pearls!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Bebo's Boba Tea Cafe 🧋✨"
      badgeIcon={<Coffee className="w-3.5 h-3.5 text-pink-500" />}
      title={"Bebo's Boba Tea Cafe"}
      subtitle={"Brewing Sweet Bubble Tea for Sanzu"}
      description={"Customize Bebo's favorite drink with heart-shaped boba pearls and photo cup labels!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* BOBA TEA CUP & PHOTO CONTAINER */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Label on Cup */}
          <div className="w-full h-44 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Boba Cup Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20 font-bold">
              Special Cafe Portrait 🧋📸
            </div>
          </div>

          {/* Boba Cup Visualizer */}
          <div className="w-40 h-40 border-4 border-white rounded-b-3xl rounded-t-xl shadow-xl relative bg-white/20 backdrop-blur-md overflow-hidden flex flex-col justify-end p-2 border-pink-200">
            <motion.div
              style={{ backgroundColor: FLAVORS[flavor].color }}
              className="w-full rounded-b-2xl transition-colors duration-500 relative flex items-end justify-center pb-3 shadow-inner h-3/4"
            >
              <div className="flex flex-wrap gap-1.5 justify-center px-2">
                {Array.from({ length: bobaCount }).map((_, i) => (
                  <span key={i} className="text-xs animate-bounce">
                    🖤
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="max-w-md mx-auto space-y-4 p-5 rounded-3xl bg-white border border-pink-200 shadow-xl mb-6 text-left">
          <div>
            <label className="text-xs font-bold text-gray-700 block mb-2 font-ui">Select Tea Flavor:</label>
            <div className="flex gap-2 justify-center flex-wrap">
              {FLAVORS.map((f, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    playSparkle();
                    setFlavor(i);
                  }}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                    flavor === i ? 'bg-rose-500 text-white border-rose-500 shadow' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={addBoba}
              className="flex-1 py-3 bg-rose-500 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer hover:bg-rose-600"
            >
              + Add Boba Pearls ({bobaCount}) 🖤
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPhoto}
            className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Random Photo</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Tea</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
