import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Music, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MUSIC_BOX_MELODIES = [
  { song: "Sakura Music Box Waltz 🌸", melody: "Sweet Japanese music box melody celebrating Queen Sanzu in Sakai, Osaka!" },
  { song: "Proposal Lullaby 💍", melody: "Soft romantic lullaby remembering October 28, 2025!" },
  { song: "Everlasting Love Serenade 💖", melody: "Heartfelt melody of Abu's eternal devotion!" }
];

export default function RomanticMusicBox2() {
  const { triggerHaptic } = useAppStore();

  const [musicIdx, setMusicIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMelody = MUSIC_BOX_MELODIES[musicIdx % MUSIC_BOX_MELODIES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleWindMusicBox = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setPlaying(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleNextMelody = () => {
    playPop();
    triggerHaptic(10);
    setMusicIdx((i) => (i + 1) % MUSIC_BOX_MELODIES.length);
    setPlaying(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎵 ROMANTIC MUSIC BOX VOL 2 🎵\n\n[${currentMelody.song}]\n"${currentMelody.melody}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Romantic Music Box 🎵✨"
      badgeIcon={<Music className="w-3.5 h-3.5 text-amber-400" />}
      title={"Romantic Music Box Vol. 2"}
      subtitle={"Wind the Golden Music Box for Queen Sanzu"}
      description={"Wind up the vintage romantic music box to play sweet melodies and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* MUSIC BOX CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {playing ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Music Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-300/60 text-amber-200 text-xs font-bold">
                "{currentMelody.melody}"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-amber-900/30 border-2 border-amber-400 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                📻
              </div>
              <p className="text-xs font-extrabold text-amber-300 font-mono uppercase tracking-wider">
                WIND THE GOLDEN MUSIC BOX
              </p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!playing ? (
            <button
              type="button"
              onClick={handleWindMusicBox}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Wind Music Box 🎵</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextMelody}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Melody 🎵</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Melody</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
