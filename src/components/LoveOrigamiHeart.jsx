import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Check, RotateCcw, Send, Volume2, Lock, Unlock, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PRESET_MESSAGES = [
  "Abu, you are my absolute safest place in the whole wide world! 💖",
  "Abu, let's take our light blue scooter to Bardiya and eat momos together! 🛵🥟",
  "Abu, distance between Nepalgunj & Osaka is nothing because my heart belongs to you! 🌏💓",
  "Abu, thank you for making my birthday so insanely magical with 100 rooms! 🎂✨"
];

const STEPS = [
  { title: "Fold Diagonal Crease", desc: "Fold the paper diagonally to form the guided line", instruction: "Tap to make the first diagonal fold 📄" },
  { title: "Fold Top Corners Inward", desc: "Fold both top corners inward to create the upper heart curves", instruction: "Tap to fold top corners inward 📐" },
  { title: "Shape the Heart Peak", desc: "Fold the top point down to form the cleft", instruction: "Tap to shape the peak of the heart 💖" },
  { title: "Tuck Side Edges", desc: "Tuck the edges inward for a smooth origami heart shape", instruction: "Tap to round the edges ✨" },
  { title: "Origami Heart Complete!", desc: "Hand-folded with love by Sanzu for Abu!", instruction: "✨ Your 3D Origami Heart is folded!" },
];

export default function LoveOrigamiHeart() {
  const [step, setStep] = useState(0);
  const [paperColor, setPaperColor] = useState('#ec4899');
  const [letterWritten, setLetterWritten] = useState(PRESET_MESSAGES[0]);
  const [sealedNote, setSealedNote] = useState(false);
  const [unlockedSecret, setUnlockedSecret] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleNextStep = () => {
    if (step >= STEPS.length - 1) return;
    playSparkle();
    triggerHaptic(20);
    const next = step + 1;
    setStep(next);
    if (next === STEPS.length - 1) {
      confetti({ particleCount: 220, spread: 110, origin: { y: 0.5 } });
    }
  };

  const handleSeal = () => {
    if (!letterWritten.trim()) return;
    playBloom();
    triggerHaptic([40, 80, 40]);
    setSealedNote(true);
    setUnlockedSecret(false);
    confetti({ particleCount: 180, spread: 90, origin: { y: 0.5 } });
  };

  const handleSpeakVoice = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    playSparkle();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleReset = () => {
    playPop();
    setStep(0);
    setSealedNote(false);
    setUnlockedSecret(false);
  };

  return (
    <WorldShell
      theme="paper"
      badge="3D Origami Heart Secret Studio 📄💖"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
      title="Sanzu's 3D Origami Secret Note for Abu 💌"
      subtitle="Fold a 3D paper heart step-by-step, write a secret love message for Abhay (Abu) inside, seal it & send it to Abu on WhatsApp!"
      description="100% interactive 3D origami folding studio with voice reader & WhatsApp message delivery!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* Step Progress Bar */}
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-md ${
                step > i ? 'bg-emerald-500 text-white' : step === i ? 'bg-pink-500 text-white animate-pulse ring-4 ring-pink-200' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > i ? '✓' : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={`w-4 h-0.5 ${step > i ? 'bg-emerald-400' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {/* Origami 3D View Container */}
        <div className="w-64 h-64 mx-auto rounded-3xl bg-slate-900 border-4 border-pink-300 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
          <motion.div
            animate={{
              rotate: step * 45,
              scale: step === 4 ? [1, 1.15, 1] : 1,
              borderRadius: step === 0 ? '12px' : step === 1 ? '24px 24px 12px 12px' : step === 2 ? '36px 36px 16px 16px' : step === 3 ? '40% 40% 10% 10%' : '50%',
            }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-44 h-44 shadow-2xl relative flex flex-col items-center justify-center cursor-pointer p-4 text-center"
            style={{ backgroundColor: paperColor }}
            onClick={handleNextStep}
          >
            <div className="absolute inset-0 opacity-20 border-r border-b border-white border-dashed" />
            <span className="text-5xl text-white drop-shadow-md">
              {step === 4 ? (sealedNote ? '💌' : '💖') : '📄'}
            </span>

            {step === 4 && sealedNote && (
              <span className="text-[10px] font-black text-white bg-black/40 px-2 py-0.5 rounded-full mt-2 backdrop-blur-xs uppercase tracking-wider">
                SEALED FOR ABU
              </span>
            )}
          </motion.div>

          {step === 4 && (
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none flex items-center justify-center"
            >
              <Sparkles className="w-48 h-48 text-amber-300/30" />
            </motion.div>
          )}
        </div>

        <p className="text-xs text-rose-600 font-extrabold text-center">{STEPS[step].instruction}</p>

        {/* FOLDING CONTROLS & LETTER WRITING */}
        {step < STEPS.length - 1 ? (
          <div className="text-center">
            <button
              onClick={handleNextStep}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-black text-xs shadow-xl cursor-pointer hover:scale-103 transition-all font-ui"
            >
              Fold Step {step + 1} 📄 ➔
            </button>
          </div>
        ) : !sealedNote ? (
          <div className="glass-card p-5 sm:p-6 rounded-3xl border-2 border-pink-300 bg-white shadow-xl max-w-md mx-auto space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-black text-gray-800 flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Write Sanzu's Secret Message for Abhay (Abu):</span>
              </label>
              <p className="text-[11px] text-gray-500 font-medium">
                Choose a preset message or type your own hidden note to tuck inside the origami heart!
              </p>
            </div>

            {/* PRESET PROMPTS */}
            <div className="flex flex-wrap gap-1.5">
              {PRESET_MESSAGES.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => { playPop(); setLetterWritten(msg); }}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all text-left cursor-pointer ${
                    letterWritten === msg ? 'bg-pink-500 text-white border-pink-600 shadow-sm' : 'bg-pink-50 text-pink-800 border-pink-200 hover:bg-pink-100'
                  }`}
                >
                  Prompt #{idx + 1} 💬
                </button>
              ))}
            </div>

            <textarea
              value={letterWritten}
              onChange={(e) => setLetterWritten(e.target.value)}
              placeholder="Write your secret love message for Abhay (Abu)... 💌"
              rows={3}
              className="w-full p-3.5 rounded-2xl border-2 border-pink-200 text-xs font-bold text-gray-800 outline-none focus:border-rose-400 bg-pink-50/30 resize-none"
            />

            <button
              onClick={handleSeal}
              disabled={!letterWritten.trim()}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-xl disabled:opacity-40 hover:scale-102 transition-all cursor-pointer font-ui flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Seal Secret Note Inside Origami Heart 💌</span>
            </button>
          </div>
        ) : (
          /* SEALED HEART VIEW */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-6 rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 shadow-xl max-w-md mx-auto text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
              <Heart className="w-7 h-7 fill-white" />
            </div>

            <div>
              <h3 className="text-lg font-black text-rose-900">
                Origami Heart Sealed for Abu! 💌
              </h3>
              <p className="text-xs text-rose-700 mt-1 font-medium italic">
                "Your secret note is folded safely inside this 3D paper heart for Abhay!"
              </p>
            </div>

            {/* UNLOCK / VOICE READ BUTTON */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <button
                onClick={() => setUnlockedSecret(!unlockedSecret)}
                className="px-4 py-2 rounded-full bg-pink-200 text-pink-900 font-extrabold text-xs hover:bg-pink-300 cursor-pointer flex items-center gap-1.5"
              >
                {unlockedSecret ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                <span>{unlockedSecret ? "Hide Secret" : "Peek Secret Note 👁️"}</span>
              </button>

              <button
                onClick={() => handleSpeakVoice(letterWritten)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all ${
                  isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Voice Read 🎙️</span>
              </button>
            </div>

            {unlockedSecret && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-white border border-rose-200 text-xs font-bold text-gray-800 text-left italic shadow-inner"
              >
                "{letterWritten}"
              </motion.div>
            )}

            <button
              onClick={handleReset}
              className="text-xs font-bold text-gray-500 hover:text-gray-700 underline cursor-pointer flex items-center justify-center gap-1 mx-auto"
            >
              <RotateCcw className="w-3 h-3" /> Fold Another Origami Heart 📄
            </button>
          </motion.div>
        )}

        {/* ALWAYS VISIBLE WHATSAPP SENDER */}
        <div className="max-w-md mx-auto pt-2">
          <button
            onClick={() => {
              const secretText = letterWritten.trim() ? letterWritten.trim() : PRESET_MESSAGES[0];
              sendWhatsAppMessage(`📄 Hey Abu! I folded a 3D Origami Heart for you with a secret message inside:\n\n"${secretText}"\n\n💌 Folded with infinite love by your Sanzu! 💖`, '📄 3D Origami Secret Note for Abu');
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 font-ui"
          >
            <Send className="w-4 h-4 fill-white animate-bounce" />
            <span>Send Sealed Origami Secret Note to Abu on WhatsApp 📲</span>
          </button>
        </div>

      </div>
    </WorldShell>
  );
}
