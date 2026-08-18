import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function SweetHeartBalloonAscent() {
  const { triggerHaptic } = useAppStore();

  const [altitude, setAltitude] = useState(1200);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const floatHigher = () => {
    playBloom();
    playSparkle();
    triggerHaptic(20);
    setAltitude((a) => a + 500);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎈 HOT AIR BALLOON FLIGHT 🎈\n\nAltitude: ${altitude.toLocaleString()} ft above sea level!\nFloating across mountain sunsets with Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Hot Air Balloon Flight 🎈✨"
      badgeIcon={<Flame className="w-3.5 h-3.5 text-amber-400" />}
      title={"Hot Air Balloon Flight"}
      subtitle={"Floating in Heart Balloon Over Sunset Mountains"}
      description={"Ignite burners and float higher across sunset clouds to unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* BALLOON SKY CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame Screen */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Balloon Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
          </div>

          <div className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-4 py-1.5 rounded-full border border-amber-400 font-bold">
            Altitude: {altitude.toLocaleString()} ft above sea level ☁️
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={floatHigher}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-200" />
            <span>Ignite Burner 🔥</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Altitude</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
