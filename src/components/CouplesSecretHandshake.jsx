import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MOVES = [
  { name: "Fist Bump 👊", icon: "👊" },
  { name: "Heart Hands 🫶", icon: "🫶" },
  { name: "High Five ✋", icon: "✋" },
  { name: "Finger Snap 👌", icon: "👌" },
  { name: "Kiss Pass 💋", icon: "💋" }
];

export default function CouplesSecretHandshake() {
  const { triggerHaptic } = useAppStore();

  const [sequence, setSequence] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const addMove = (m) => {
    playPop();
    triggerHaptic(15);
    if (sequence.length < 5) {
      setSequence((prev) => [...prev, m]);
    }
  };

  const handlePerform = () => {
    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120]);
    setCompleted(true);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setSequence([]);
    setCompleted(false);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🤝 SECRET COUPLE HANDSHAKE 🤝\n\nSignature 5-Step Handshake Created for Queen Sanzu & Abu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Secret Couple Handshake 🤝✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
      title={"Secret Couple Handshake"}
      subtitle={"Creating Sanzu & Abu's Signature Handshake"}
      description={"Tap moves below to construct our 5-step secret handshake and unlock photo trophies!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* SEQUENCE CANVAS & PHOTO DISCOVERY */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {completed && (
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40 mb-2">
              <img
                src={currentPhoto}
                alt="Handshake Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
            </div>
          )}

          <div className="flex justify-center items-center gap-2 min-h-[70px] w-full bg-black/50 p-3 rounded-2xl border border-white/20">
            {sequence.length === 0 ? (
              <span className="text-xs text-gray-400 font-bold">Tap moves below to build sequence...</span>
            ) : (
              sequence.map((m, i) => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                  <span className="text-2xl sm:text-3xl">{m.icon}</span>
                  <span className="text-[9px] font-mono text-pink-300 font-bold">Step {i + 1}</span>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* MOVE BUTTONS */}
        <div className="flex justify-center gap-2 flex-wrap max-w-md mx-auto mb-6">
          {MOVES.map((m, i) => (
            <button
              key={i}
              type="button"
              onClick={() => addMove(m)}
              disabled={sequence.length >= 5 || completed}
              className="px-3.5 py-2 bg-white border border-pink-200 rounded-2xl text-xs font-bold text-gray-800 hover:border-pink-500 cursor-pointer shadow-sm disabled:opacity-40"
            >
              {m.icon} {m.name}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {sequence.length === 5 && !completed && (
            <button
              type="button"
              onClick={handlePerform}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Perform Handshake</span>
            </button>
          )}

          {sequence.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset & New Photo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Handshake</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
