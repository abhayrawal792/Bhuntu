import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  RefreshCw,
  Sparkles,
  Share2,
  Heart
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STORIES = [
  {
    title: 'The Queen of Osaka 👑',
    template: 'Once upon a time, in the magical city of {place}, lived a {adj1} Queen named Sanzu. Every morning, she would eat {food} with her {adj2} partner Abu. One sunny {time}, they jumped on a {vehicle} and flew all the way to {country}! Sanzu smiled so {adj3} that the sky rained {noun1}. Their love is 100% {adj4} forever! 💕',
    blanks: [
      { key: 'place', label: 'Magical City 🏰' },
      { key: 'adj1', label: 'Adjective ✨' },
      { key: 'food', label: 'Favorite Snack 🍕' },
      { key: 'adj2', label: 'Adjective 💖' },
      { key: 'time', label: 'Time of Day 🌙' },
      { key: 'vehicle', label: 'Vehicle / Plane ✈️' },
      { key: 'country', label: 'Dream Country 🇯🇵' },
      { key: 'adj3', label: 'Adjective 🌟' },
      { key: 'noun1', label: 'Cute Noun 🌸' },
      { key: 'adj4', label: 'Adjective 💕' }
    ]
  }
];

export default function LoveMadLibs() {
  const { triggerHaptic } = useAppStore();

  const [storyIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const story = STORIES[storyIdx];
  const filled = Object.keys(answers).length;
  const total = story.blanks.length;
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filled < total) return;

    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setDone(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const getResult = () => {
    let s = story.template;
    story.blanks.forEach((b) => {
      s = s.replace(`{${b.key}}`, `**${answers[b.key] || '___'}**`);
    });
    return s;
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const cleanText = getResult().replace(/\*\*/g, '');
    const text = `📖 SILLY LOVE STORY MAD LIBS 📖\n\n"${cleanText}"\n\n- Happy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Love Mad Libs Storybook 📖✨"
      badgeIcon={<BookOpen className="w-3.5 h-3.5 text-pink-500" />}
      title={"प्रेम कथा निर्माता"}
      subtitle={"Fill in Blanks for a Custom Love Story"}
      description={"Fill in the blanks to generate a funny & sweet love story featuring Sanzu & Abu, complete with a secret photo illustration!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none">
        {!done ? (
          /* FORM FILLER */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl space-y-3">
            <h4 className="text-sm font-extrabold font-nepali text-gray-800 mb-2">
              Fill in the Blanks for: "{story.title}"
            </h4>

            {story.blanks.map((b, i) => (
              <div key={b.key} className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-pink-500 w-5">{i + 1}.</span>
                <input
                  value={answers[b.key] || ''}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [b.key]: e.target.value }))}
                  placeholder={b.label}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border-2 border-pink-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-pink-500"
                />
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={filled < total}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-sm shadow-xl cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>GENERATE STORYBOOK NOW! ({filled}/{total})</span>
            </motion.button>
          </form>
        ) : (
          /* COMPLETED STORYBOOK CARD */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 border-4 border-pink-300 shadow-2xl space-y-4 text-left"
          >
            <div className="flex items-center justify-between border-b border-pink-200 pb-3">
              <span className="text-xs font-mono font-bold text-pink-700 uppercase tracking-wider">
                {story.title}
              </span>
              <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
            </div>

            {/* Story text */}
            <p
              className="text-sm sm:text-base text-gray-800 leading-relaxed font-nepali"
              dangerouslySetInnerHTML={{
                __html: getResult().replace(
                  /\*\*(.*?)\*\*/g,
                  '<span class="bg-pink-200 text-pink-900 font-extrabold px-1.5 py-0.5 rounded border border-pink-300">$1</span>'
                )
              }}
            />

            {/* Photo Illustration */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-md relative bg-black/30">
              <img
                src={currentPhoto}
                alt="Illustration"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                Storybook Photo Illustration 📖📸
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  playPop();
                  setDone(false);
                  setAnswers({});
                }}
                className="flex-1 py-3 rounded-2xl bg-white/80 hover:bg-white text-pink-700 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-pink-300"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Create Another</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Story</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
