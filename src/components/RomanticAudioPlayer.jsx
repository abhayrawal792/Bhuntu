import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Play, Pause, Disc, SkipForward, Volume2, Share2, Sparkles, Heart } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const VINYL_TRACKS = [
  { title: "Sakai Sakura Serenade 🌸", artist: "Abu & Sanzu", duration: "03:45", RPM: 33 },
  { title: "Nepalgunj Midnight Waltz 🌙", artist: "Abu Acoustic", duration: "04:12", RPM: 45 },
  { title: "Proposal Vow Melody 💍", artist: "Everlasting Symphony", duration: "05:00", RPM: 33 }
];

export default function RomanticAudioPlayer() {
  const { triggerHaptic } = useAppStore();

  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [rpm, setRpm] = useState(33);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentTrack = VINYL_TRACKS[trackIdx % VINYL_TRACKS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextTrack = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setTrackIdx((i) => (i + 1) % VINYL_TRACKS.length);
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎶 RETRO VINYL TURNTABLE PLAYER 🎶\n\nPlaying Track: "${currentTrack.title}" by ${currentTrack.artist}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Retro Vinyl Turntable 🎶✨"
      badgeIcon={<Disc className="w-3.5 h-3.5 text-pink-400" />}
      title={"Retro Vinyl Turntable"}
      subtitle={"High-Fidelity Audiophile Record Deck for Queen Sanzu"}
      description={"Spin vintage vinyl records, pivot the tone-arm needle onto vinyl tracks, and listen to soulmate melodies!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none">
        {/* TURNTABLE DECK BASE */}
        <div className="relative rounded-3xl bg-gradient-to-b from-stone-900 via-slate-950 to-stone-950 border-4 border-pink-500/50 shadow-[0_0_50px_rgba(244,63,94,0.25)] p-6 space-y-6">
          
          {/* TURNTABLE PLATTER & TONEARM AREA */}
          <div className="relative w-full aspect-square max-w-sm mx-auto bg-stone-900 rounded-3xl border-2 border-stone-800 p-4 shadow-inner flex items-center justify-center overflow-hidden">
            
            {/* ROTATING VINYL RECORD DISC */}
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: rpm === 33 ? 8 : 5, repeat: Infinity, ease: 'linear' }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-slate-950 border-8 border-stone-900 shadow-2xl flex items-center justify-center"
              style={{
                backgroundImage: 'radial-gradient(circle, #090d16 10%, #1e293b 25%, #090d16 40%, #1e293b 60%, #090d16 80%)'
              }}
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute inset-12 rounded-full border border-white/5" />

              {/* CENTER ALBUM ART PHOTO STICKER */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-amber-400 overflow-hidden relative shadow-lg bg-black">
                <img
                  src={currentPhoto}
                  alt="Vinyl Album Cover"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute center inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-slate-950 border-2 border-white" />
                </div>
              </div>
            </motion.div>

            {/* PIVOTING TONEARM ARM WITH NEEDLE */}
            <motion.div
              animate={{ rotate: isPlaying ? 22 : 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              className="absolute top-4 right-6 w-8 h-44 pointer-events-none origin-top-right z-20 flex flex-col items-center"
            >
              <div className="w-6 h-6 rounded-full bg-stone-400 border-2 border-stone-600 shadow-md" />
              <div className="w-1.5 h-32 bg-gradient-to-b from-stone-300 to-stone-500 rounded-full shadow" />
              <div className="w-3 h-5 bg-rose-500 rounded-sm shadow-md" />
            </motion.div>

          </div>

          {/* NOW PLAYING TRACK BANNER */}
          <div className="bg-black/60 rounded-2xl border border-pink-500/30 p-4 text-center space-y-1">
            <span className="text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest">
              NOW SPINNING ON TURNTABLE
            </span>
            <h3 className="text-sm font-extrabold text-white">{currentTrack.title}</h3>
            <p className="text-xs font-bold text-gray-400">{currentTrack.artist} • {currentTrack.duration}</p>
          </div>

          {/* CONTROLS BAR: PLAY/PAUSE, NEXT TRACK, RPM, SHARE */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play Vinyl'}</span>
            </button>

            <button
              type="button"
              onClick={handleNextTrack}
              className="py-3.5 rounded-2xl bg-slate-900 border border-pink-500/40 text-pink-200 font-extrabold text-xs shadow-md cursor-pointer hover:border-pink-400 flex items-center justify-center gap-1.5"
            >
              <SkipForward className="w-4 h-4" />
              <span>Next Track</span>
            </button>

            <button
              type="button"
              onClick={() => setRpm(rpm === 33 ? 45 : 33)}
              className="py-3.5 rounded-2xl bg-stone-900 border border-amber-400/40 text-amber-300 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>{rpm} RPM</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Record</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}