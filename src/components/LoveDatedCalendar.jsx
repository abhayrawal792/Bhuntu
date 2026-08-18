import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const EVENTS = [
  { date: "October 28, 2025 💍", title: "Official Proposal Acceptance Day!", desc: "The unforgettable day Queen Sanzu accepted Abu's proposal!" },
  { date: "August 20 🎂", title: "Queen Sanzu's Birthday!", desc: "The day Queen Sanzu came into the world and made it brighter!" },
  { date: "Forever Ahead 🥂", title: "Everlasting Marriage Day!", desc: "The future day Abu and Sanzu marry and build their dream home!" }
];

export default function LoveDatedCalendar() {
  const { triggerHaptic } = useAppStore();

  const [eventIdx, setEventIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentEvent = EVENTS[eventIdx % EVENTS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectEvent = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setEventIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📅 LOVE DATED CALENDAR 📅\n\n[${currentEvent.date} - ${currentEvent.title}]\n"${currentEvent.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Love Dated Calendar 📅✨"
      badgeIcon={<Calendar className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Dated Calendar"}
      subtitle={"Abu & Sanzu's Special Relationship Calendar"}
      description={"Browse milestone dates marked with eternal devotion to unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CALENDAR CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={eventIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Calendar Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-pink-900/80 px-3 py-1 rounded-lg text-xs font-mono text-pink-200 border border-white/20 font-bold">
                📅 {currentEvent.date}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-pink-300 uppercase tracking-wider mb-1">
                {currentEvent.title}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentEvent.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* EVENT BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {EVENTS.map((e, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectEvent(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                eventIdx === idx
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-pink-200 border-pink-500/40 hover:border-pink-400'
              }`}
            >
              📅 {e.date.split(' ')[0]}
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
            <span>Share Dated Milestone</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
