import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Star } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MESSAGES = [
  { text: "HAPPY BIRTHDAY QUEEN SANZU! 🎂💖", sub: "Written across the stars over Osaka" },
  { text: "ABU & BEBO FOREVER! 💍✨", sub: "Cosmic vow written in glowing starlight" },
  { text: "NEPALGUNJ ↔ OSAKA WITH LOVE ✈️", sub: "Bridging 4,650 km with starlight" }
];

export default function StarryNightSkywriter() {
  const { triggerHaptic } = useAppStore();

  const [msgIdx, setMsgIdx] = useState(0);
  const [written, setWritten] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMsg = MESSAGES[msgIdx % MESSAGES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSkywrite = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setWritten(true);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleNextMessage = () => {
    playPop();
    triggerHaptic(10);
    setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    setWritten(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `✨ NEON SKYWRITER CANVAS ✨\n\nWritten in the Stars:\n"${currentMsg.text}"\n(${currentMsg.sub})\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Neon Skywriter Canvas ✨"
      badgeIcon={<Star className="w-3.5 h-3.5 text-sky-400" />}
      title={"Neon Skywriter Canvas"}
      subtitle={"Write Starlight Messages for Queen Sanzu"}
      description={"Skywrite glowing neon messages across the night sky and project Sanzu's memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* SKYWRITER CANVAS */}
        <div
          onClick={handleSkywrite}
          className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-sky-400/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center cursor-pointer overflow-hidden"
        >
          {!written ? (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-sky-900/30 border-2 border-sky-300 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                🌌
              </div>
              <p className="text-xs font-extrabold text-sky-300 font-mono uppercase tracking-wider">
                COSMIC SKYWRITER JET
              </p>
              <div className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-200 border border-sky-300/40 text-xs font-bold inline-block">
                Tap to Launch Skywriter ✨
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full space-y-3"
            >
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Skywriter Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-sky-500/20 border border-sky-300/60 text-sky-200 text-xs font-extrabold leading-relaxed">
                "{currentMsg.text}"
                <span className="block text-[10px] font-normal text-sky-300 mt-1">{currentMsg.sub}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!written ? (
            <button
              type="button"
              onClick={handleSkywrite}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Skywrite Message</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextMessage}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Message</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Skywriter</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
