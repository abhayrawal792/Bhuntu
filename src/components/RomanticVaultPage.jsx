import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

const HIDDEN_VAULT_ANSWER = 'nepalgunj';

export default function RomanticVaultPage({ onUnlockNext }) {
  const [guess, setGuess] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (guess.trim().toLowerCase() === HIDDEN_VAULT_ANSWER) {
      setUnlocked(true);
      setError(false);
      confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
    } else {
      setError(true);
      setGuess('');
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-slate-900 text-white p-6 font-sans">
      <div className="w-full max-w-lg bg-slate-800/90 border border-pink-500/30 rounded-3xl p-8 shadow-2xl relative text-center">
        <div className="flex justify-center mb-4">
          {unlocked ? (
            <Unlock className="w-14 h-14 text-emerald-400 animate-bounce" />
          ) : (
            <Lock className="w-14 h-14 text-rose-400" />
          )}
        </div>

        <h2 className="text-2xl font-black text-pink-300 mb-2">
          {unlocked ? 'Vault Opened! 💖' : 'The First Date Vault 🔒'}
        </h2>

        <p className="text-sm text-slate-300 mb-6 bg-slate-900/60 p-4 rounded-2xl border border-slate-700 italic">
          "Where did Abu and Bhuntu share their very first unforgettable memory together?"
        </p>

        {!unlocked ? (
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type your secret answer..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-900 border border-rose-400/40 text-rose-100 placeholder-slate-500 text-center font-medium focus:outline-none focus:border-rose-400"
            />

            {error && (
              <p className="text-xs text-rose-400 font-semibold">
                Wrong answer! Think about our favorite city memory... 💭
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 font-bold text-white text-sm cursor-pointer transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Verify & Unlock Vault
            </button>
          </form>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
            <div className="p-5 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-200 text-sm">
              ✨ <strong>Vault Secret Unlocked:</strong> "You are my favorite place to go when my mind searches for peace. Happy Birthday Sanzu!"
            </div>

            {onUnlockNext && (
              <button
                onClick={onUnlockNext}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm cursor-pointer hover:from-emerald-400 hover:to-teal-500 transition-all shadow-xl"
              >
                Proceed to Next Memory Page ➡️
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
