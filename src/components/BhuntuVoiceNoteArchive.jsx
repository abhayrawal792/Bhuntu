import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mic, Sparkles, Share2, RefreshCw, Volume2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const VOICE_NOTES = [
  { title: "Good Morning Queen Sanzu 🌅", desc: "Good morning Bebo! You're the first thought in Abu's mind every single day!" },
  { title: "I Miss You So Much 💕", desc: "Thinking of your sweet smile across 4,500 miles between Nepalgunj & Osaka!" },
  { title: "Our Forever Marriage Vow 💍", desc: "We will build our dream home together! Abu's eternal promise!" }
];

export default function BhuntuVoiceNoteArchive() {
  const { triggerHaptic } = useAppStore();

  const [noteIdx, setNoteIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentNote = VOICE_NOTES[noteIdx % VOICE_NOTES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePlayVoiceNote = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setNoteIdx(idx);
    setIsPlaying(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎙️ VOICE NOTE ARCHIVE 🎙️\n\nPlaying Voice Note: [${currentNote.title}]\n"${currentNote.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Voice Note Archive 🎙️✨"
      badgeIcon={<Mic className="w-3.5 h-3.5 text-purple-300" />}
      title={"Voice Note Archive"}
      subtitle={"Abu's Saved Voice Memos for Queen Sanzu"}
      description={"Listen to heartfelt saved voice notes recorded by Abu for Queen Sanzu and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* VOICE NOTE CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {/* Photo Frame */}
          <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Voice Note Photo"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
            />
            <div className="absolute top-2 right-2 bg-purple-900/80 px-3 py-1 rounded-lg text-xs font-mono text-purple-200 border border-white/20 font-bold">
              🎙️ {isPlaying ? 'PLAYING' : 'PAUSED'}
            </div>
          </div>

          <div className="pt-1">
            <h3 className="text-sm font-extrabold text-purple-300 mb-1">{currentNote.title}</h3>
            <p className="text-xs text-gray-300 italic">"{currentNote.desc}"</p>
          </div>
        </div>

        {/* VOICE NOTE BUTTONS */}
        <div className="space-y-2 max-w-md mx-auto mb-6">
          {VOICE_NOTES.map((n, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePlayVoiceNote(idx)}
              className={`w-full p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                noteIdx === idx
                  ? 'bg-purple-600 text-white border-purple-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-purple-200 border-purple-500/40 hover:border-purple-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Volume2 className={`w-4 h-4 ${noteIdx === idx ? 'animate-bounce' : ''}`} />
                <span>{n.title}</span>
              </div>
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
            <span>Share Voice Note</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}