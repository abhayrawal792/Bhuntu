import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Check, Delete } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const TARGET_WORDS = [
  { word: "SANZU", hint: "The royal name of Abu's wife 👑" },
  { word: "SAKAI", hint: "The city in Osaka where Sanzu lives 🇯🇵" },
  { word: "MOMOS", hint: "Sanzu's favorite spicy steamed food 🥟" }
];

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export default function LoveWordle() {
  const { triggerHaptic } = useAppStore();

  const [wordIdx, setWordIdx] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isWon, setIsWon] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const targetObj = TARGET_WORDS[wordIdx % TARGET_WORDS.length];
  const targetWord = targetObj.word;
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleKeyPress = (key) => {
    if (isWon) return;

    if (key === 'DEL') {
      playPop();
      triggerHaptic(5);
      setCurrentGuess(g => g.slice(0, -1));
      return;
    }

    if (key === 'ENTER') {
      if (currentGuess.length !== 5) return;
      playBloom();
      triggerHaptic([20, 50]);

      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);

      if (currentGuess === targetWord) {
        playSparkle();
        triggerHaptic([40, 80, 120]);
        setIsWon(true);
        setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
        confetti({ particleCount: 110, spread: 90, origin: { y: 0.5 } });
      }

      setCurrentGuess("");
      return;
    }

    if (currentGuess.length < 5) {
      playPop();
      triggerHaptic(5);
      setCurrentGuess(g => g + key);
    }
  };

  const handleNextWord = () => {
    playPop();
    triggerHaptic(10);
    setWordIdx(w => (w + 1) % TARGET_WORDS.length);
    setGuesses([]);
    setCurrentGuess("");
    setIsWon(false);
  };

  const getTileColor = (letter, index, guessStr) => {
    if (guessStr[index] === targetWord[index]) return "bg-emerald-600 border-emerald-400 text-white";
    if (targetWord.includes(letter)) return "bg-amber-500 border-amber-300 text-stone-950";
    return "bg-stone-800 border-stone-700 text-stone-400";
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🧩 5-LETTER LOVE WORDLE 🧩\n\nWordle Target: "${targetWord}" SOLVED IN ${guesses.length} GUESSES!\nHint: ${targetObj.hint}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="5-Letter Love Wordle 🧩✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-400" />}
      title={"5-Letter Love Wordle"}
      subtitle={"Solve 5-Letter Romantic Relationship Wordle"}
      description={"Type 5-letter words on the QWERTY keyboard to solve romantic Wordle puzzles and unlock memory photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* WORDLE CABINET */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-emerald-500/70 shadow-2xl p-5 sm:p-6 space-y-5">
          
          {/* HINT BANNER */}
          <div className="bg-emerald-950/40 p-3 rounded-2xl border border-emerald-400/40 text-xs font-mono font-bold text-emerald-300">
            HINT: {targetObj.hint}
          </div>

          {/* 6 GUESS ROWS */}
          <div className="grid grid-rows-6 gap-1.5 max-w-[260px] mx-auto">
            {Array(6).fill(null).map((_, rIdx) => {
              const guessStr = guesses[rIdx] || (rIdx === guesses.length ? currentGuess : "");
              const isSubmitted = rIdx < guesses.length;

              return (
                <div key={rIdx} className="grid grid-cols-5 gap-1.5">
                  {Array(5).fill(null).map((_, cIdx) => {
                    const char = guessStr[cIdx] || "";
                    let tileStyle = "bg-stone-900 border-stone-800 text-white";
                    if (isSubmitted && char) {
                      tileStyle = getTileColor(char, cIdx, guessStr);
                    }

                    return (
                      <div
                        key={cIdx}
                        className={`aspect-square rounded-xl border-2 font-mono font-black text-lg flex items-center justify-center transition-all ${tileStyle}`}
                      >
                        {char}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* SOLVED PHOTO CARD REVEAL */}
          <AnimatePresence>
            {isWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-400/60 space-y-3"
              >
                <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Wordle Champion Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                </div>
                <p className="text-xs font-bold text-amber-300">
                  🎉 WORDLE SOLVED! TARGET WORD: "{targetWord}" 👑
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QWERTY KEYBOARD */}
          <div className="space-y-1.5 pt-2">
            {KEYBOARD_ROWS.map((row, r) => (
              <div key={r} className="flex justify-center gap-1">
                {row.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleKeyPress(key)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-mono font-black border transition-all cursor-pointer shadow ${
                      key === 'ENTER' || key === 'DEL'
                        ? 'bg-amber-500 text-stone-950 border-amber-300 px-3'
                        : 'bg-stone-900 text-white border-stone-700 hover:border-emerald-400'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {isWon && (
              <button
                type="button"
                onClick={handleNextWord}
                className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Next Word</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Wordle Score</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
