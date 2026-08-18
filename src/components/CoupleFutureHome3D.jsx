import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Home, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ROOMS = [
  { room: "Cozy Living Room 🛋️", desc: "Plush sofas, warm fairy lights, and Momo feasts cooked by Abu!" },
  { room: "Dream Kitchen 🍳", desc: "Panipuri station and fresh tea brewed every morning!" },
  { room: "Sakura Roof Garden 🌸", desc: "Overlooking skyline views, stargazing together every evening!" }
];

export default function CoupleFutureHome3D() {
  const { triggerHaptic } = useAppStore();

  const [roomIdx, setRoomIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentRoom = ROOMS[roomIdx % ROOMS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectRoom = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setRoomIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🏠 COUPLE FUTURE HOME 3D 🏠\n\n[${currentRoom.room}]\n"${currentRoom.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Future Home 3D 🏠✨"
      badgeIcon={<Home className="w-3.5 h-3.5 text-blue-400" />}
      title={"Couple Future Home 3D"}
      subtitle={"3D Architectural Room Blueprint for Abu & Queen Sanzu"}
      description={"Explore 3D architectural room designs for Abu & Queen Sanzu's future dream home to unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* ROOM CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={roomIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-blue-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Room Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-blue-900/80 px-3 py-1 rounded-lg text-xs font-mono text-blue-200 border border-white/20 font-bold">
                🏠 Room #{roomIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-blue-300 uppercase tracking-wider mb-1">
                {currentRoom.room}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentRoom.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ROOM BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {ROOMS.map((r, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectRoom(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                roomIdx === idx
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-blue-200 border-blue-500/40 hover:border-blue-400'
              }`}
            >
              🏠 Room #{idx + 1}
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
            <span>Share Home Blueprint</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
