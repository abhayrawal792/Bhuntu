import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Pin, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const NOTES = [
  { title: 'The First Text 📱', desc: 'The historic first message that sparked everything.', color: 'bg-pink-100 border-pink-300 text-pink-900' },
  { title: 'Nepalgunj Tea Date ☕', desc: 'Sipping hot matka chiya together on a cozy afternoon.', color: 'bg-amber-100 border-amber-300 text-amber-900' },
  { title: 'Osaka Star Night 🌌', desc: 'Stargazing across continents, matching heartbeats.', color: 'bg-purple-100 border-purple-300 text-purple-900' },
  { title: 'October 28 Vow 💍', desc: 'The moment Sanzu became Abu\'s forever queen.', color: 'bg-rose-100 border-rose-300 text-rose-900' }
];

export default function LoveNotesWall() {
  const { triggerHaptic } = useAppStore();

  const [noteIdx, setNoteIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentNote = NOTES[noteIdx % NOTES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextNote = () => {
    playPop();
    playBloom();
    triggerHaptic(15);
    setNoteIdx((prev) => (prev + 1) % NOTES.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📌 STICKY LOVE NOTES WALL 📌\n\nNote: "${currentNote.title}"\n"${currentNote.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Sticky Love Notes Wall 📌✨"
      badgeIcon={<Pin className="w-3.5 h-3.5 text-rose-500" />}
      title={"Sticky Love Notes Wall"}
      subtitle={"Pinned Love Milestones for Queen Sanzu"}
      description={"Browse pinned sticky love notes and secret memory photos on Sanzu's romantic corkboard wall!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CORKBOARD STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-amber-950/90 border-4 border-amber-500 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame pinned on board */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Pinned Note Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 text-xl drop-shadow-md">📌</div>
          </div>

          {/* Sticky Note */}
          <motion.div
            key={noteIdx}
            initial={{ scale: 0.9, rotate: -2 }}
            animate={{ scale: 1, rotate: 1 }}
            className={`w-full p-4 rounded-2xl border-2 shadow-lg text-left ${currentNote.color}`}
          >
            <h4 className="font-extrabold text-sm mb-1">{currentNote.title}</h4>
            <p className="text-xs leading-relaxed italic">{currentNote.desc}</p>
          </motion.div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextNote}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Note & Photo</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Note</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
