import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Drama,
  RefreshCw,
  Timer,
  Sparkles,
  Share2,
  CheckCircle2,
  Lightbulb,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PROMPTS = [
  {
    prompt: "Act out: Abu's reaction when Sanzu calls him on video call 📱💖",
    answer: "Abu gets the biggest smile on his face, waves frantically, and says 'Bebo!' 💖"
  },
  {
    prompt: "Mime: First time you both said 'I Love You' across long distance 💕",
    answer: "Placing hands over heart, blowing a kiss across the screen, and whispering 'I love you so much Sanzu!' 💋"
  },
  {
    prompt: "Charade: Planning Sanzu's surprise birthday in Osaka 🎂✨",
    answer: "Whispering secret plans, blowing up party balloons, and carrying a birthday cake! 🎂"
  },
  {
    prompt: "Act out: Sanzu's cutest signature pose in photos 📸👑",
    answer: "Making double heart hands 🫶 or cute peace signs ✌️ with her famous sweet smile! 👑"
  },
  {
    prompt: "Mime: A dramatic Bollywood romance scene in the rain 🎭🌧️",
    answer: "Running toward each other in slow motion, holding an imaginary umbrella ☂️, and dancing!"
  },
  {
    prompt: "Act out: Abu cooking a romantic dinner for Sanzu 👨‍🍳🍛",
    answer: "Stirring a big pot of spicy Momo & Panipuri 🥟 with a chef hat and offering the first taste to Sanzu!"
  },
  {
    prompt: "Charade: Trying to speak Japanese together in Japan 🇯🇵🗣️",
    answer: "Bowing politely, saying 'Arigato gozaimasu!' 🙏, and pointing at Japanese menu items!"
  },
  {
    prompt: "Mime: Hugging tight after a long flight from Nepalgunj ✈️🫂",
    answer: "Running with open arms at Osaka airport ✈️ and wrapping both arms into a tight, warm hug! 🫂"
  }
];

export default function RomanticCharades() {
  const { triggerHaptic } = useAppStore();

  const [promptIdx, setPromptIdx] = useState(0);
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [unlockedPhoto, setUnlockedPhoto] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentItem = PROMPTS[promptIdx % PROMPTS.length];

  const handleNextCharade = () => {
    playPop();
    triggerHaptic(15);

    const nextIdx = (promptIdx + 1) % PROMPTS.length;
    setPromptIdx(nextIdx);

    setTimer(30);
    setTimerActive(true);
    setUnlockedPhoto(null);
    setShowAnswer(false);
  };

  const handleGuessSuccess = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);
    setTimerActive(false);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (nextPhoto === photoIdx) nextPhoto = (nextPhoto + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(nextPhoto);

    setUnlockedPhoto({
      photoIdx: nextPhoto,
      promptText: currentItem.prompt
    });

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  useEffect(() => {
    if (!timerActive || timer <= 0) return;
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerActive]);

  useEffect(() => {
    if (timer === 0 && timerActive) {
      setTimerActive(false);
      playSparkle();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    }
  }, [timer, timerActive]);

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎭 ROMANTIC CHARADES GAME 🎭\n\nPrompt: "${currentItem.prompt}"\nAnswer: "${currentItem.answer}"\n\n- Acted out for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Romantic Charades Stage 🎭✨"
      badgeIcon={<Drama className="w-3.5 h-3.5 text-orange-400" />}
      title={"Romantic Charades"}
      subtitle={"Act It Out & Reveal Secret Answers"}
      description={"Get a charade prompt, tap 'Reveal Answer' to check the hint, start the timer, and unlock photo rewards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* THEATER STAGE CARD */}
        <div className="relative max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-600 via-rose-600 to-purple-900 text-white shadow-2xl border-4 border-amber-300/80 mb-6 space-y-4 overflow-hidden">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-300/20 rounded-full blur-2xl pointer-events-none" />

          <Drama className="w-12 h-12 mx-auto text-amber-300 drop-shadow-md" />

          <h3 className="text-lg sm:text-xl font-extrabold font-nepali leading-relaxed text-white">
            "{currentItem.prompt}"
          </h3>

          {/* ANSWER HINT BOX */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                playPop();
                setShowAnswer((prev) => !prev);
              }}
              className="px-4 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-300/40 text-xs font-extrabold cursor-pointer inline-flex items-center gap-1.5 transition-all"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>{showAnswer ? 'Hide Answer Hint' : '💡 Reveal Secret Answer'}</span>
            </button>

            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 p-3.5 rounded-2xl bg-black/60 border border-amber-300/60 text-xs text-amber-200 font-bold font-nepali text-center leading-relaxed"
              >
                ✨ <strong>Answer Hint:</strong> {currentItem.answer}
              </motion.div>
            )}
          </div>

          {/* TIMER READOUT */}
          {timerActive && (
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border border-white/30 backdrop-blur-md">
              <Timer className="w-4 h-4 text-amber-300" />
              <span className={`text-2xl font-mono font-extrabold ${timer <= 5 ? 'text-amber-300 animate-pulse' : 'text-white'}`}>
                {timer}s
              </span>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleGuessSuccess}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Guessed Correctly! 🏆</span>
            </button>

            <button
              type="button"
              onClick={handleNextCharade}
              className="flex-1 py-3 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Prompt</span>
            </button>
          </div>
        </div>

        {/* UNLOCKED PHOTO REWARD */}
        <AnimatePresence>
          {unlockedPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 15 }}
              className="max-w-md mx-auto p-5 rounded-3xl bg-slate-950 text-white border-2 border-amber-300 shadow-2xl space-y-3 mb-6"
            >
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Charade Guessed! Photo Reward
              </span>

              <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-lg relative bg-black/40">
                <img
                  src={BHUNTU_PHOTOS[unlockedPhoto.photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]}
                  alt="Reward Photo"
                  onError={(e) => handlePhotoError(e, unlockedPhoto.photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Performance on WhatsApp 💬</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
