import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const BUCKET_ITEMS = [
  { item: "Drive Light Blue Scooter to Bardiya 🛵", desc: "Sanzu driving her light blue scooter to Bardiya with Abu in the back seat!" },
  { item: "Everlasting Wedding Ceremony 💍", desc: "Marry and build a warm, happy dream home together!" },
  { item: "Honeymoon in Pokhara & Mustang 🏔️", desc: "Explore snow mountains, Phewa lake boating, and romantic views!" }
];

export default function CoupleBucketList() {
  const { triggerHaptic } = useAppStore();

  const [itemIdx, setItemIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentItem = BUCKET_ITEMS[itemIdx % BUCKET_ITEMS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextBucketItem = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setItemIdx((i) => (i + 1) % BUCKET_ITEMS.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🗺️ COUPLE BUCKET LIST 🗺️\n\nBucket Goal: [${currentItem.item}]\n"${currentItem.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Couple Bucket List 🗺️✨"
      badgeIcon={<MapPin className="w-3.5 h-3.5 text-emerald-400" />}
      title={"Couple Bucket List"}
      subtitle={"Abu & Sanzu's Dream Lifetime Bucket List"}
      description={"Check off romantic travel dreams and lifetime goals to unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* BUCKET LIST CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-emerald-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Bucket Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-emerald-900/80 px-3 py-1 rounded-lg text-xs font-mono text-emerald-200 border border-white/20 font-bold">
              🗺️ Goal #{itemIdx + 1}
            </div>
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-extrabold text-emerald-300 mb-1">{currentItem.item}</h3>
            <p className="text-xs text-gray-300 italic">"{currentItem.desc}"</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextBucketItem}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Goal 🗺️</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Goal</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
