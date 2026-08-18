import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { BookOpen, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const COMICS = [
  { episode: "Comic Episode #1 📻", caption: "Abu: 'Can you hear the rain outside my window in Sakai, Osaka?' / Sanzu: 'Yes, it sounds like a lullaby...'" },
  { episode: "Comic Episode #2 ✈️", caption: "Abu: 'I just booked our reunion flight!' / Sanzu: '*Happy tears & joy!*'" },
  { episode: "Comic Episode #3 💍", caption: "Abu: 'We will marry and build our dream home!' / Sanzu: 'Forever yes!'" }
];

export default function BhuntuComicStrip2() {
  const { triggerHaptic } = useAppStore();

  const [comicIdx, setComicIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentComic = COMICS[comicIdx % COMICS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectComic = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setComicIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📖 LOVE COMIC STRIP VOL 2 📖\n\n[${currentComic.episode}]\n"${currentComic.caption}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Love Comic Strip Vol. 2 📖✨"
      badgeIcon={<BookOpen className="w-3.5 h-3.5 text-purple-400" />}
      title={"Love Comic Strip Vol. 2"}
      subtitle={"Hand-Drawn Comic Story Panels for Queen Sanzu"}
      description={"Read interactive romantic comic panels depicting Abu & Queen Sanzu's love story to unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* COMIC CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={comicIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Comic Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-purple-900/80 px-3 py-1 rounded-lg text-xs font-mono text-purple-200 border border-white/20 font-bold">
                📖 Episode #{comicIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-wider mb-1">
                {currentComic.episode}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentComic.caption}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* COMIC BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {COMICS.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectComic(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                comicIdx === idx
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-purple-200 border-purple-500/40 hover:border-purple-400'
              }`}
            >
              📖 Ep #{idx + 1}
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
            <span>Share Comic Panel</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
