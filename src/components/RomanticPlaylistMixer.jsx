import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Music, Sparkles, Share2, RefreshCw, Disc, Heart } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const TRACKS = [
  { title: "Nepalgunj ↔ Osaka Sunset Beat 🌅", artist: "Abu feat. Queen Sanzu", quote: "Distance can't touch us, we got it all!" },
  { title: "Late Night Video Call Serenade 📱💖", artist: "Bhuntu's Lullaby", quote: "Falling asleep to your sweet voice every single night." },
  { title: "Panipuri & Momo Duet 🥟🎶", artist: "The Foodie Duo", quote: "Our favorite dates written in the stars!" },
  { title: "October 28 Proposal Anthem 💍✨", artist: "Forever Love", quote: "The day Sanzu said YES to Abu!" }
];

export default function RomanticPlaylistMixer() {
  const { triggerHaptic } = useAppStore();

  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentTrack = TRACKS[trackIdx % TRACKS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextTrack = () => {
    playPop();
    triggerHaptic(15);
    setTrackIdx((prev) => (prev + 1) % TRACKS.length);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    playBloom();
    playSparkle();
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎧 ROMANTIC MIXTAPE STUDIO 🎧\n\nNow Playing: "${currentTrack.title}"\nArtist: ${currentTrack.artist}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Love Mixtape Studio 🎧✨"
      badgeIcon={<Music className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Mixtape Studio"}
      subtitle={"Spin Romantic Vinyl Tracks for Sanzu"}
      description={"Mix custom romantic tracks and spin the vinyl album featuring Sanzu's portrait cover!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* VINYL ALBUM CANVAS */}
        <div className="relative max-w-sm sm:max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400/60 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Spinning Vinyl Record */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-pink-400/80 shadow-2xl relative flex items-center justify-center p-3"
          >
            {/* Center Photo Label */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Album Cover"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
            </div>
          </motion.div>

          <div className="pt-2">
            <h3 className="text-lg font-extrabold text-white mb-0.5">{currentTrack.title}</h3>
            <p className="text-xs text-pink-300 font-bold">{currentTrack.artist}</p>
            <p className="text-xs text-gray-400 italic mt-2">"{currentTrack.quote}"</p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextTrack}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Track & Photo</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Track</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
