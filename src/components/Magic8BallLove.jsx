import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  HelpCircle,
  Share2,
  RefreshCw,
  Star
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PRESET_QUESTIONS = [
  'Will Sanzu & Abu stay together forever? 💖',
  'Does Sanzu miss me right now? 💭',
  'Will we meet again soon in Osaka, Japan? ✈️',
  'Is Sanzu the undisputed Queen of my Heart? 👑',
];

const ORACLE_PREDICTIONS = [
  {
    answer: 'DESTINED FOR ETERNITY — The cosmic stars confirm Sanzu is your forever soulmate! 💕✨',
    badge: '100% Cosmic Match',
    category: 'Destiny'
  },
  {
    answer: 'ABSOLUTELY YES — Bebo’s heart beats for you every single second of the day! 💖👑',
    badge: 'True Love Confirmed',
    category: 'Love'
  },
  {
    answer: 'ROMANTIC REUNION SOON — A magical flight & unforgettable hug in Japan is coming! ✈️🇯🇵',
    badge: 'Reunion Prophecy',
    category: 'Travel'
  },
  {
    answer: 'INFINITY LOVE — Your love story is written in the constellations above! 🌌💍',
    badge: 'Cosmic Promise',
    category: 'Eternity'
  },
  {
    answer: 'A BIRTHDAY SURPRISE AWAITS — Sanzu is thinking about you with a sweet smile right now! 🎂💗',
    badge: 'Sweet Sentiment',
    category: 'Surprise'
  },
  {
    answer: 'FOREVER QUEEN — No force in the universe can ever pull your two hearts apart! 🛡️❤️',
    badge: 'Unbreakable Bond',
    category: 'Protection'
  }
];

export default function Magic8BallLove() {
  const { triggerHaptic } = useAppStore();

  const [question, setQuestion] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleShakeOracle = () => {
    if (isShaking) return;

    playPop();
    triggerHaptic([40, 80, 40, 80, 120, 160]);
    setIsShaking(true);
    setCurrentPrediction(null);

    // Pick random photo & prediction
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (nextPhoto === photoIdx) nextPhoto = (nextPhoto + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(nextPhoto);

    setTimeout(() => {
      setIsShaking(false);
      const randPred = ORACLE_PREDICTIONS[Math.floor(Math.random() * ORACLE_PREDICTIONS.length)];
      setCurrentPrediction(randPred);
      setShakeCount((prev) => prev + 1);

      playSparkle();
      playBloom();
      confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
    }, 1600);
  };

  const handlePresetSelect = (q) => {
    setQuestion(q);
    handleShakeOracle();
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔮 MAGIC LOVE 8-BALL ORACLE PREDICTION 🔮\n\nQ: ${question || 'Is Sanzu my soulmate?'}\n\nProphecy: "${currentPrediction?.answer}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Magic Love 8-Ball Oracle 🔮8️⃣"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-purple-400" />}
      title={"जादुई प्रेम बल भविष्यवाणी"}
      subtitle={"Ask the Cosmic Love Oracle"}
      description={"Ask any question about your love, then tap or shake the cosmic Magic 8-Ball to reveal your prophecy and secret photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* PRESET QUESTION CHIPS */}
        <div className="mb-6">
          <p className="text-xs font-bold text-violet-300 mb-2 flex items-center justify-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
            Select a Love Question or Type Below:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {PRESET_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(q)}
                className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-violet-200 text-xs font-bold border border-violet-400/30 backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95 text-center"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* CUSTOM QUESTION INPUT */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your custom love question here..."
            className="w-full px-5 py-3.5 rounded-2xl bg-slate-900/90 border-2 border-violet-400/50 text-white text-sm text-center placeholder-gray-400 focus:outline-none focus:border-pink-400 shadow-xl"
          />
        </div>

        {/* 3D COSMIC MAGIC 8-BALL ORACLE SPHERE */}
        <div className="relative max-w-xs mx-auto mb-8 flex flex-col items-center">
          <motion.div
            onClick={handleShakeOracle}
            animate={
              isShaking
                ? {
                    rotate: [0, 20, -20, 15, -15, 10, -10, 0],
                    scale: [1, 1.15, 0.95, 1.1, 1],
                    y: [0, -15, 10, -10, 0]
                  }
                : { y: [0, -8, 0] }
            }
            transition={
              isShaking
                ? { duration: 1.4, ease: 'easeInOut' }
                : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 border-4 border-violet-400/80 shadow-[0_0_50px_rgba(168,85,247,0.7)] flex items-center justify-center cursor-pointer group select-none overflow-hidden"
          >
            {/* Outer Cosmic Glow Rings */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-violet-500/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Inner Window / 8 Ball Core */}
            <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black border-2 border-white/40 shadow-inner flex flex-col items-center justify-center p-3 text-center">
              {isShaking ? (
                <div className="flex flex-col items-center gap-1">
                  <Sparkles className="w-8 h-8 text-amber-300 animate-spin" />
                  <span className="text-[10px] font-mono font-bold text-amber-200 uppercase tracking-widest">
                    Consulting Stars...
                  </span>
                </div>
              ) : currentPrediction ? (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl mb-0.5">✨</span>
                  <span className="text-[10px] font-mono font-extrabold text-amber-300 uppercase tracking-wider">
                    {currentPrediction.category}
                  </span>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-white font-extrabold text-4xl sm:text-5xl drop-shadow-md">
                    8
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 font-bold mt-1">
                    TAP TO SHAKE
                  </span>
                </div>
              )}
            </div>

            {/* Hover Prompt */}
            <span className="absolute bottom-3 text-[10px] font-mono text-violet-300 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
              Tap Ball for Prophecy ✨
            </span>
          </motion.div>
        </div>

        {/* ORACLE PREDICTION & SECRET PHOTO REVEAL CARD */}
        <AnimatePresence>
          {currentPrediction && !isShaking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-pink-400 shadow-2xl text-center space-y-4 max-w-md mx-auto"
            >
              {/* Badge */}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                {currentPrediction.badge}
              </span>

              {/* Prediction Text */}
              <h4 className="text-base sm:text-lg font-extrabold font-nepali text-white leading-relaxed">
                "{currentPrediction.answer}"
              </h4>

              {question && (
                <p className="text-xs text-violet-300 italic bg-white/10 p-2.5 rounded-xl border border-white/15">
                  Q: {question}
                </p>
              )}

              {/* Secret Photo Reveal */}
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Prophecy Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                  Secret Oracle Photo Reveal 🔮📸
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleShakeOracle}
                  className="flex-1 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Ask Another Question</span>
                </button>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Prophecy</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
