import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CARDS = [
  { caption: "Your Radiant Smile 🌸", quote: "The prettiest eyes in the whole world belong to my Bebo." },
  { caption: "Sunset Whispers 🌅", quote: "Every video call brings my Fuchhee right next to my heart." },
  { caption: "Forever Together 💍", quote: "My heart beats only for you, my sweet Bebo." }
];

export default function LoveScratchOffGallery() {
  const { triggerHaptic } = useAppStore();

  const [scratched, setScratched] = useState(new Set());
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleScratch = (i) => {
    if (scratched.has(i)) return;
    playBloom();
    playSparkle();
    triggerHaptic([30, 60]);
    const next = new Set(scratched);
    next.add(i);
    setScratched(next);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎟️ FOIL REVEAL GALLERY 🎟️\n\nScratched & Revealed Foil Cards for Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Foil Reveal Gallery 🎟️✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-400" />}
      title={"Foil Reveal Gallery"}
      subtitle={"Scratch Silver Foil to Uncover Photo Messages"}
      description={"Tap silver cards to reveal sweet couple memories and Sanzu's secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PHOTO DISPLAY */}
        <div className="w-full max-w-md mx-auto h-56 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl relative bg-black/40 mb-6">
          <img
            src={currentPhoto}
            alt="Foil Photo"
            onError={(e) => handlePhotoError(e, photoIdx)}
            className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
          />
        </div>

        {/* FOIL CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto mb-6">
          {CARDS.map((c, i) => (
            <div
              key={i}
              onClick={() => handleScratch(i)}
              className="rounded-2xl p-4 border-2 border-pink-300 shadow-xl relative min-h-[140px] flex flex-col justify-center items-center cursor-pointer overflow-hidden bg-white text-left"
            >
              {!scratched.has(i) ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute inset-0 bg-gradient-to-tr from-slate-300 via-gray-200 to-slate-400 flex flex-col items-center justify-center p-4 z-10 border-2 border-slate-300"
                >
                  <Sparkles className="w-6 h-6 text-slate-500 mb-2" />
                  <span className="text-xs font-bold text-slate-700">Tap to Scratch Foil 🪙</span>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Heart className="w-6 h-6 text-rose-500 fill-rose-500 mb-1" />
                  <h4 className="font-bold text-xs text-rose-700 mb-1">{c.caption}</h4>
                  <p className="text-[11px] text-gray-600 italic">"{c.quote}"</p>
                </motion.div>
              )}
            </div>
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
            <span>Share Gallery</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
