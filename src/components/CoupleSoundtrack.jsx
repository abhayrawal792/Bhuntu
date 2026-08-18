import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Disc, Sparkles, Share2, Play, Pause } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const TRACKS = [
  { id: 1, title: "Pinjada Love Theme 🎵", artist: "Satish Ghalan", desc: "Abu & Sanzu's special romantic song playing in their hearts!" },
  { id: 2, title: "Nepalgunj to Osaka Symphony ✈️", artist: "Distance Love", desc: "The invisible thread of devotion across 4,500 miles!" },
  { id: 3, title: "Everlasting Marriage Vow 💍", artist: "Abu & Sanzu", desc: "Their sacred pledge to marry and build their dream home!" }
];

export default function CoupleSoundtrack() {
  const { triggerHaptic } = useAppStore();

  const [playingTrack, setPlayingTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentTrack = TRACKS[playingTrack % TRACKS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePlayTrack = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setPlayingTrack(idx);
    setIsPlaying(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💿 ABU & SANZU COUPLE SOUNDTRACK 💿\n\nPlaying: [${currentTrack.title}]\nArtist: ${currentTrack.artist}\n"${currentTrack.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Couple Love Soundtrack 💿✨"
      badgeIcon={<Disc className="w-3.5 h-3.5 text-pink-400" />}
      title={"Couple Love Soundtrack"}
      subtitle={"Abu & Sanzu's Official 3-Track Love Album"}
      description={"Listen to romantic love tracks and unlock secret photo cards for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* ALBUM CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Track Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-pink-900/80 px-3 py-1 rounded-lg text-xs font-mono text-pink-200 border border-white/20 font-bold">
              {isPlaying ? '▶ PLAYING' : '⏸ PAUSED'}
            </div>
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-extrabold text-pink-300 mb-1">{currentTrack.title}</h3>
            <p className="text-xs text-gray-300 italic">"{currentTrack.desc}"</p>
          </div>
        </div>

        {/* TRACK LIST */}
        <div className="space-y-2 max-w-md mx-auto mb-6">
          {TRACKS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => handlePlayTrack(idx)}
              className={`w-full p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                playingTrack === idx
                  ? 'bg-rose-500 text-white border-rose-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-pink-200 border-pink-500/40 hover:border-pink-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Disc className={`w-4 h-4 ${playingTrack === idx ? 'animate-spin' : ''}`} />
                <span>{t.title}</span>
              </div>
              <span className="text-[10px] text-pink-300 font-mono">{t.artist}</span>
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
            <span>Share Track</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
