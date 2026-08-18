import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

const CORRECT_ENTRY_CODE = 'bhuntu2061';
const HINT_MESSAGE = "💡 Hint: Abu's sweetest nickname for you + your Bikram Sambat birth year (e.g., bhuntu2061) 💖";

export default function PasswordEntryPage({ onAccessGranted }) {
  const [inputCode, setInputCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHintModal, setShowHintModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanInput = inputCode.trim().toLowerCase();

    if (cleanInput === CORRECT_ENTRY_CODE) {
      confetti({ particleCount: 180, spread: 90, origin: { y: 0.6 } });
      if (onAccessGranted) onAccessGranted();
    } else {
      const newCount = attempts + 1;
      setAttempts(newCount);
      setErrorMsg('Incorrect passcode! Please try again ❤️');
      setInputCode('');

      if (newCount >= 3) {
        setShowHintModal(true);
      }
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-slate-950 p-4 font-sans relative overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-slate-950 pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-rose-500/30 rounded-3xl p-8 shadow-2xl text-center"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
          <Lock className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-amber-200 mb-2">
          Sanzo's Secret Birthday Realm 🔐
        </h1>
        <p className="text-xs text-rose-200/70 mb-6">
          Enter the secret key to unlock your 300-page birthday surprise!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter secret word..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-800/80 border border-rose-500/40 text-rose-100 placeholder-rose-300/40 text-center font-mono text-lg focus:outline-none focus:border-rose-400 transition-all"
            />
          </div>

          {errorMsg && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-rose-400 font-medium">
              {errorMsg} (Attempt {attempts}/3)
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-950/50 cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4" /> Unlock My Surprise ✨
          </button>
        </form>

        <AnimatePresence>
          {showHintModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mt-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs text-left relative"
            >
              <div className="flex items-center gap-2 font-bold mb-1 text-amber-300">
                <HelpCircle className="w-4 h-4" /> Need a little help, my love?
              </div>
              <p className="leading-relaxed">{HINT_MESSAGE}</p>
              <button
                onClick={() => setShowHintModal(false)}
                className="mt-3 px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-[11px] cursor-pointer hover:bg-amber-300 transition-all"
              >
                Got it, let me try!
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
