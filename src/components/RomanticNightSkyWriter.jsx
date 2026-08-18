import WorldShell from './WorldShell';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Sparkles, Share2, Plane, Trash2, Send } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PRESET_SKYWRITES = [
  "Abu ❤️ Queen Sanzu",
  "Nepalgunj ✈️ Sakai, Osaka",
  "Forever Married 💍",
  "Happy Birthday Bebo 🎂"
];

export default function RomanticNightSkyWriter() {
  const { triggerHaptic } = useAppStore();
  const canvasRef = useRef(null);

  const [typedMessage, setTypedMessage] = useState("");
  const [activeText, setActiveText] = useState("Abu ❤️ Queen Sanzu");
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleFlySkywriter = (textToFly) => {
    const text = textToFly || typedMessage || "Queen Sanzu 👑";
    setActiveText(text);

    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);

    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    // Render smoke text on canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = 'bold 24px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowColor = '#f43f5e';
      ctx.shadowBlur = 20;

      const rx = 30;
      const ry = 180;
      ctx.fillText(text, rx, ry);
    }

    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleClearSky = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setActiveText("");
    playPop();
    triggerHaptic(10);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `✨ ROMANTIC NIGHT SKYWRITER ✨\n\nAirplane Skywriting in Night Sky:\n"${activeText}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Airplane Skywriter ✈️✨"
      badgeIcon={<Star className="w-3.5 h-3.5 text-purple-300" />}
      title={"Airplane Night Skywriter"}
      subtitle={"Fly Prop Plane Skywriter Messages Across Deep Space"}
      description={"Type custom love messages to fly an airplane across the starry night sky leaving glowing smoke trails!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* NIGHT SKY CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-purple-500/70 shadow-[0_0_50px_rgba(168,85,247,0.3)] p-5 sm:p-6 space-y-6">
          
          {/* NIGHT SKY CANVAS & MOON PHOTO PORTAL */}
          <div className="relative w-full h-72 rounded-2xl bg-gradient-to-b from-slate-950 via-purple-950 to-indigo-950 border-2 border-purple-400/40 p-4 shadow-inner overflow-hidden">
            {/* FLOATING STarlight & MOON PORTAL */}
            <div className="absolute top-3 right-3 w-28 h-36 rounded-2xl border-2 border-amber-300 shadow-xl overflow-hidden z-10 bg-black">
              <img
                src={currentPhoto}
                alt="Night Sky Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute inset-0 bg-purple-500/10 pointer-events-none" />
            </div>

            {/* FLYING AIRPLANE ANIMATION */}
            <motion.div
              animate={{ x: [-50, 320], y: [120, 40] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute z-20 text-3xl"
            >
              ✈️
            </motion.div>

            {/* CANVAS FOR SMOKE TRAILS */}
            <canvas
              ref={canvasRef}
              width={500}
              height={300}
              className="absolute inset-0 w-full h-full pointer-events-none z-15"
            />

            {/* SKYWRITING ACTIVE BANNER */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/80 p-2.5 rounded-xl border border-purple-400/40 text-xs font-bold text-amber-300 truncate">
              ✨ "{activeText || 'Type below to write in night sky...'}"
            </div>
          </div>

          {/* CUSTOM INPUT BOX */}
          <div className="flex gap-2">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder="Type message for skywriter plane..."
              className="flex-1 bg-stone-900 border border-purple-500/40 text-white rounded-2xl px-4 py-3 text-xs font-semibold focus:border-amber-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleFlySkywriter(typedMessage)}
              className="py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1"
            >
              <Send className="w-4 h-4" />
              <span>Fly!</span>
            </button>
          </div>

          {/* PRESET SKYWRITES */}
          <div className="grid grid-cols-2 gap-2">
            {PRESET_SKYWRITES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleFlySkywriter(preset)}
                className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-purple-500/30 text-purple-200 font-extrabold text-[11px] truncate cursor-pointer transition-all"
              >
                ✈️ {preset}
              </button>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleClearSky}
              className="py-3 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Sky</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Sky Message</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
