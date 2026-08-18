import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Key, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CHARMS = ['🌸 Sakura Blossom', '💎 Heart Gem', '🧸 Teddy Bear', '💍 Ring Charm'];

export default function LoveKeychainCustomizer() {
  const { triggerHaptic } = useAppStore();

  const [charm, setCharm] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const selectCharm = (i) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setCharm(i);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🗝️ ACRYLIC KEYCHAIN STUDIO 🗝️\n\nCustom Keychain Charm for Queen Sanzu: "${CHARMS[charm]}"\n"Sanzu & Abu's Key to the Heart"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Acrylic Keychain Studio 🗝️✨"
      badgeIcon={<Key className="w-3.5 h-3.5 text-pink-400" />}
      title={"Acrylic Keychain Studio"}
      subtitle={"Custom Matching Keychains for Sanzu"}
      description={"Design matching acrylic keychains with custom initials & charms around Sanzu's photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* KEYCHAIN ACRYLIC STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-300 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          <div className="w-full h-56 rounded-2xl overflow-hidden border-4 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Keychain Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-200 border border-white/20">
              {CHARMS[charm]}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-300/60 text-rose-200 text-xs font-bold">
            "Sanzu & Abu's Key to the Heart 💕"
          </div>
        </div>

        {/* CHARM SELECTOR */}
        <div className="flex justify-center gap-2 flex-wrap max-w-md mx-auto mb-6">
          {CHARMS.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectCharm(i)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                charm === i ? 'bg-rose-500 text-white border-rose-500 shadow-md' : 'bg-white text-gray-800 border-pink-200 hover:border-pink-400'
              }`}
            >
              {c}
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
            <span>Share Keychain</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
