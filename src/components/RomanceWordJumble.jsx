import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RefreshCw, Share2, Check, X } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WORDS = [
  { scrambled: 'Z U N A S', answer: 'SANZU', hint: 'The Queen of Abu\'s Heart 👑' },
  { scrambled: 'O E B B', answer: 'BEBO', hint: 'Abu\'s favorite sweet nickname 💕' },
  { scrambled: 'G U N J A P E L N A', answer: 'NEPALGUNJ', hint: 'Where Abu\'s love journey began 🇳🇵' },
  { scrambled: 'A K A S O', answer: 'OSAKA', hint: 'Where Queen Sanzu is celebrating in Japan 🇯🇵' },
  { scrambled: 'M A T E S O U L', answer: 'SOULMATE', hint: 'Destined for each other in every timeline ⭐' },
  { scrambled: 'D A Y T H R I B', answer: 'BIRTHDAY', hint: 'Special celebration for Queen Bebo 🎂' }
];

export default function RomanceWordJumble() {
  const { triggerHaptic } = useAppStore();

  const [wordIdx, setWordIdx] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [solved, setSolved] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentWord = WORDS[wordIdx % WORDS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCheckAnswer = (e) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    if (inputVal.trim().toUpperCase() === currentWord.answer) {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90, 150]);
      setSolved(true);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    } else {
      playPop();
      triggerHaptic(20);
    }
  };

  const handleNextWord = () => {
    playPop();
    triggerHaptic(10);
    setWordIdx((prev) => (prev + 1) % WORDS.length);
    setInputVal('');
    setSolved(false);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔤 ROMANTIC WORD JUMBLE 🔤\n\nSolved Word: "${currentWord.answer}"!\n"${currentWord.hint}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Romantic Word Jumble 🔤✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Romantic Word Jumble"}
      subtitle={"Unscramble Love Words to Unlock Photo Cards"}
      description={"Unscramble jumbled romantic words to reveal Sanzu's secret memory photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* JUMBLE CARD STAGE */}
        <div className="relative max-w-sm sm:max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400/60 shadow-2xl space-y-4 mb-6">
          <span className="text-xs font-mono text-pink-300 font-bold uppercase tracking-wider">
            WORD #{wordIdx + 1} OF {WORDS.length}
          </span>

          {/* Scrambled Word Display */}
          <div className="py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-mono text-2xl sm:text-3xl font-black tracking-widest shadow-lg">
            {currentWord.scrambled}
          </div>

          <p className="text-xs text-gray-300 font-bold italic">
            Hint: "{currentWord.hint}"
          </p>

          {!solved ? (
            <form onSubmit={handleCheckAnswer} className="flex gap-2 pt-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type unscrambled word..."
                className="flex-1 px-4 py-3 rounded-2xl bg-white text-gray-800 font-extrabold text-sm border-2 border-pink-300 focus:outline-none focus:border-rose-500 uppercase"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                <span>Submit</span>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="space-y-4 pt-2"
            >
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-extrabold text-sm">
                🎉 CORRECT! WORD IS: {currentWord.answer}!
              </div>

              {/* Photo Reveal Card */}
              <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Word Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextWord}
            className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Jumble</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Jumble</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
