import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mic,
  Play,
  Pause,
  SkipForward,
  Sparkles,
  Share2,
  Music,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SONGS = [
  {
    title: "Tum Hi Ho (Sanzu's Birthday Special)",
    artist: "Arijit Singh • Abu's Love Song",
    lyrics: [
      "Hum tere bin ab reh nahi sakte 💖",
      "Tere bina kya wajood mera 🌸",
      "Tujhse juda agar ho jaayenge ✈️",
      "Toh khud se hi ho jaayenge judaa 💫",
      "Kyunki tum hi ho, ab tum hi ho 👑",
      "Zindagi ab tum hi ho! 🎂✨"
    ]
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran • For Sanzu",
    lyrics: [
      "I found a love for me 💕",
      "Oh darling, just dive right in 🌊",
      "Well, I found a girl, beautiful and sweet 👸",
      "I never knew you were the someone waiting for me ✨",
      "We were just kids when we fell in love 💖"
    ]
  }
];

export default function RomanticKaraoke() {
  const { triggerHaptic } = useAppStore();

  const [songIdx, setSongIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [lineIdx, setLineIdx] = useState(-1);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeStageModal, setActiveStageModal] = useState(null);

  const song = SONGS[songIdx];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  useEffect(() => {
    if (!playing || lineIdx >= song.lyrics.length - 1) {
      if (lineIdx >= song.lyrics.length - 1) {
        setPlaying(false);
        playBloom();
        playSparkle();

        let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
        setPhotoIdx(nextPhoto);

        setActiveStageModal({
          songTitle: song.title,
          photoIdx: nextPhoto,
          photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
        });

        confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
      }
      return;
    }

    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      playSparkle();
      triggerHaptic(10);
    }, 2200);

    return () => clearTimeout(t);
  }, [playing, lineIdx, song.lyrics.length]);

  const handlePlay = () => {
    setPlaying(true);
    setLineIdx(0);
    playSparkle();
  };

  const handleNext = () => {
    setSongIdx((songIdx + 1) % SONGS.length);
    setPlaying(false);
    setLineIdx(-1);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎤 ROMANTIC KARAOKE CONCERT 🎤\n\nI sang "${song.title}" for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Romantic Karaoke Stage 🎤✨"
      badgeIcon={<Mic className="w-3.5 h-3.5 text-pink-400" />}
      title={"रोमान्टिक कराओके"}
      subtitle={"Sing Along to Bouncing Karaoke Lyrics"}
      description={"Sing along to romantic songs with live bouncing karaoke lyrics. Completing a song unlocks Sanzu's concert stage photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* KARAOKE STAGE CARD */}
        <div className="relative max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white shadow-2xl border-4 border-pink-400/60 mb-6 space-y-4">
          <div className="flex items-center justify-between border-b border-purple-400/30 pb-3">
            <div className="text-left">
              <p className="text-sm font-extrabold text-amber-300 flex items-center gap-1">
                <Music className="w-4 h-4 text-pink-400" />
                {song.title}
              </p>
              <p className="text-xs text-purple-300 font-mono">{song.artist}</p>
            </div>

            <div className="flex gap-2">
              {!playing ? (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePlay}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center cursor-pointer shadow-lg"
                >
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPlaying(false)}
                  className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer shadow-md"
                >
                  <Pause className="w-5 h-5 text-white" />
                </motion.button>
              )}

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center cursor-pointer shadow-md"
              >
                <SkipForward className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* LYRICS CONTAINER */}
          <div className="space-y-3 min-h-[220px] flex flex-col justify-center py-4">
            {song.lyrics.map((line, i) => (
              <motion.p
                key={i}
                animate={{
                  scale: i === lineIdx ? 1.15 : 1,
                  color: i < lineIdx ? '#a78bfa' : i === lineIdx ? '#f472b6' : '#64748b',
                  opacity: i === lineIdx ? 1 : i < lineIdx ? 0.6 : 0.3
                }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-sm sm:text-base font-extrabold font-nepali leading-relaxed"
              >
                {i === lineIdx && <span className="inline-block mr-1.5 animate-bounce">🎤</span>}
                {line}
                {i === lineIdx && <span className="inline-block ml-1.5 animate-bounce">🎶</span>}
              </motion.p>
            ))}
          </div>

          {/* Song indicator dots */}
          <div className="flex justify-center gap-1.5 pt-2">
            {SONGS.map((_, i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === songIdx ? 'bg-pink-400 scale-125' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* SHARE BUTTON */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Karaoke Song on WhatsApp 💬</span>
        </button>

        {/* CONCERT STAGE MODAL */}
        <AnimatePresence>
          {activeStageModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-pink-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setActiveStageModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-400/20 border border-pink-300/40 text-pink-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  🎤 Karaoke Performance Complete!
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  "{activeStageModal.songTitle}"
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activeStageModal.photoUrl}
                    alt="Stage Photo"
                    onError={(e) => handlePhotoError(e, activeStageModal.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Concert Stage Photo Backdrop 🎶📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Song on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
