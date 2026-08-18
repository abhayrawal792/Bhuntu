import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Music, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const RHYTHMS = [
  { name: "Love Heartbeat Pad 🥁", desc: "Tapping the heartbeat rhythm of Abu's everlasting devotion!" },
  { name: "Sakura Dance Beat 🌸", desc: "Cherry blossom festival beat for Queen Sanzu!" },
  { name: "Marriage Celebration Drum 💍", desc: "Celebration drum beat for our future dream home!" }
];

export default function LoveRhythmDrumPad() {
  const { triggerHaptic } = useAppStore();

  const [rhythmIdx, setRhythmIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentRhythm = RHYTHMS[rhythmIdx % RHYTHMS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleTapDrumPad = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setRhythmIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🥁 LOVE RHYTHM DRUM PAD 🥁\n\n[${currentRhythm.name}]\n"${currentRhythm.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Love Rhythm Drum Pad 🥁✨"
      badgeIcon={<Music className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Rhythm Drum Pad"}
      subtitle={"Play Rhythm Drum Beats for Queen Sanzu"}
      description={"Tap interactive drum pads to create romantic music rhythms and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* DRUM CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={rhythmIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Drum Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-pink-900/80 px-3 py-1 rounded-lg text-xs font-mono text-pink-200 border border-white/20 font-bold">
                🥁 Rhythm #{rhythmIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-pink-300 uppercase tracking-wider mb-1">
                {currentRhythm.name}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentRhythm.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* DRUM BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {RHYTHMS.map((r, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleTapDrumPad(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                rhythmIdx === idx
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-pink-200 border-pink-500/40 hover:border-pink-400'
              }`}
            >
              🥁 Rhythm #{idx + 1}
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
            <span>Share Rhythm Beat</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
