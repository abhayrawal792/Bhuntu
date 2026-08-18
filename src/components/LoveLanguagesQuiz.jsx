import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, Award, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const LANGUAGES = [
  { title: "Words of Affirmation 💬", score: 98, desc: "Late night calls, 'I love you Bebo' texts, and sweet compliments!" },
  { title: "Quality Time ⌛", score: 100, desc: "Hours of video calls, playing games, and sharing daily stories." },
  { title: "Physical Touch 🫂", score: 99, desc: "Infinite hugs, forehead kisses, and holding hands across distance." },
  { title: "Acts of Service 🍳", score: 95, desc: "Cooking delicious food, helping out, and supporting future dreams." },
  { title: "Receiving Gifts 🎁", score: 96, desc: "Surprise packages, flowers, rings, and personalized websites!" }
];

export default function LoveLanguagesQuiz() {
  const { triggerHaptic } = useAppStore();

  const [selected, setSelected] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelect = (i) => {
    playBloom();
    playSparkle();
    triggerHaptic(20);
    setSelected(i);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💖 OUR 5 LOVE LANGUAGES 💖\n\nTop Language: "${LANGUAGES[selected].title}" (${LANGUAGES[selected].score}%)\n"${LANGUAGES[selected].desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Our 5 Love Languages 💖✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
      title={"Our 5 Love Languages"}
      subtitle={"How Sanzu & Abu Express Their Eternal Bond"}
      description={"Tap each love language to reveal Sanzu's compatibility scores and secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PHOTO CARD STAGE */}
        <div className="w-full max-w-md mx-auto h-56 rounded-3xl overflow-hidden border-4 border-rose-300 shadow-2xl relative bg-black/40 mb-6">
          <img
            src={currentPhoto}
            alt="Love Language Photo"
            onError={(e) => handlePhotoError(e, photoIdx)}
            className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
          />
          <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono text-rose-200 text-center border border-white/20 font-bold">
            {LANGUAGES[selected].title} - {LANGUAGES[selected].score}% Match 💖
          </div>
        </div>

        {/* LANGUAGES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-6 text-left">
          {LANGUAGES.map((l, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                selected === i
                  ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600 text-white border-white shadow-xl scale-102'
                  : 'bg-white text-rose-950 border-rose-200 hover:border-rose-400 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-xs">{l.title}</span>
                <span className={`text-xs font-extrabold font-mono ${selected === i ? 'text-white' : 'text-rose-600'}`}>
                  {l.score}%
                </span>
              </div>
              <p className={`text-[11px] ${selected === i ? 'text-white/90' : 'text-rose-700/80'}`}>{l.desc}</p>
            </button>
          ))}
        </div>

        {/* RESULT BADGE */}
        <div className="p-4 rounded-2xl bg-white border-2 border-rose-300 max-w-md mx-auto text-xs font-bold text-rose-800 shadow-lg flex items-center justify-center gap-2 mb-6">
          <Award className="w-5 h-5 text-rose-500 flex-shrink-0" />
          <span>Result: Sanzu & Abu score #1 in ALL 5 Love Languages! 🎉</span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Love Languages</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
