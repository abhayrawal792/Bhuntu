import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Heart } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const NEBULA_NOTES = [
  { id: 1, title: 'Your Laugh ✨', content: 'Your giggle is my favorite sound in the whole universe.' },
  { id: 2, title: 'Your Caring Soul 💖', content: 'The way you care for everyone shows how deeply beautiful your heart is.' },
  { id: 3, title: 'Midnight Talks 🌙', content: 'Our late-night conversations are the most sacred hours of my life.' },
  { id: 4, title: 'Our Future 🏠', content: 'I dream of building a warm, peaceful home with you filled with laughter and love.' }
];

export default function LoveHeartNebula3D() {
  const { triggerHaptic } = useAppStore();

  const [noteIdx, setNoteIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentNote = NEBULA_NOTES[noteIdx % NEBULA_NOTES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextNote = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setNoteIdx((prev) => (prev + 1) % NEBULA_NOTES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌌 LOVE HEART NEBULA 3D 🌌\n\nNebula Note [${currentNote.title}]:\n"${currentNote.content}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Love Heart Nebula 3D 🌌✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
      title={"Love Heart Nebula 3D"}
      subtitle={"Cosmic Galaxy Revolving Around Sanzu"}
      description={"Pulsating 3D galaxy core of infinite love revolving around Queen Sanzu with secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* NEBULA CANVAS & PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-500 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Nebula Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-rose-900/80 px-3 py-1 rounded-lg text-xs font-mono text-rose-200 border border-white/20 font-bold">
              ✨ 3D Galaxy Core
            </div>
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-extrabold text-pink-300 mb-1">{currentNote.title}</h3>
            <p className="text-xs text-gray-300 italic">"{currentNote.content}"</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextNote}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Cosmic Note</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Nebula</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
