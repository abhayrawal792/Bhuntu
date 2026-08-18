import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ARCHETYPES = [
  { title: "The Inseparable Soulmates 💕", desc: "Talking for 6 hours straight on video calls without noticing the time pass!" },
  { title: "The Dynamic Power Couple 👑", desc: "Supporting each other's career & future dreams between Nepal & Japan!" },
  { title: "The Cute Fluffy Lovers 🐱", desc: "Endless teasing, cute nicknames (Bebo, Bhuntu, Fuchee), and non-stop cuddles!" }
];

export default function LoveQuizPersonality() {
  const { triggerHaptic } = useAppStore();

  const [selected, setSelected] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentArchetype = ARCHETYPES[selected % ARCHETYPES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelect = (i) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setSelected(i);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `👑 COUPLE ARCHETYPE ANALYZER 👑\n\nArchetype: "${currentArchetype.title}"\n"${currentArchetype.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Couple Archetype Analyzer 👑✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Couple Archetype Analyzer"}
      subtitle={"Which Dynamic Couple Duo Are Sanzu & Abu?"}
      description={"Select an archetype to view our relationship personality profile and secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PHOTO CARD DISCOVERY */}
        <div className="w-full max-w-md mx-auto h-56 rounded-3xl overflow-hidden border-4 border-rose-300 shadow-2xl relative bg-black/40 mb-6">
          <img
            src={currentPhoto}
            alt="Archetype Photo"
            onError={(e) => handlePhotoError(e, photoIdx)}
            className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
          />
          <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono text-pink-200 text-center border border-white/20 font-bold">
            {currentArchetype.title} 👑
          </div>
        </div>

        {/* ARCHETYPES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-6 text-left">
          {ARCHETYPES.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selected === i
                  ? 'bg-rose-500 text-white border-rose-500 shadow-xl scale-102 font-bold'
                  : 'bg-white text-gray-800 border-pink-200 hover:border-pink-400 shadow-xs'
              }`}
            >
              <span className="font-bold text-xs block mb-1">{a.title}</span>
              <p className={`text-[11px] ${selected === i ? 'text-white/90' : 'text-gray-500'}`}>{a.desc}</p>
            </button>
          ))}
        </div>

        {/* VERDICT BADGE */}
        <div className="p-4 rounded-2xl bg-white border-2 border-pink-300 max-w-md mx-auto text-xs font-bold text-rose-800 shadow-lg mb-6">
          💖 Official Verdict: Sanzu & Abu embody ALL 3 Archetypes perfectly!
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Archetype</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
