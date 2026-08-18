import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Key, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const CORRECT_PIN = '2061'; // Sanzu's Bikram Sambat Birth Year!

export default function SecretVault() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.secretVault;
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const { triggerHaptic, unlockNextRoom } = useAppStore();

  const handleDigit = (digit) => {
    if (unlocked || pin.length >= 4) return;
    playSparkle();
    triggerHaptic(15);
    const newPin = pin + digit;
    setPin(newPin);
    setError(false);

    if (newPin.length === 4) {
      if (newPin === CORRECT_PIN) {
        setUnlocked(true);
        unlockNextRoom();
        playSparkle();
        triggerHaptic([40, 80, 40, 80]);
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      } else {
        playPop();
        triggerHaptic([40, 80]);
        setError(true);
        setTimeout(() => setPin(''), 800);
      }
    }
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Secret Vault 🔐"
      badgeIcon={<Key className="w-3.5 h-3.5 text-amber-400" />}
      title="Our Secret Vault & Passcode"
      subtitle="Unlock Abu & Bhuntu's Secret Vault!"
      description="Enter the 4-digit passcode to open the vault. (Hint: Abu's favorite person's birth year in BS 💖)"
    >
      {/* Vault Door */}
      <div className="w-72 mx-auto p-6 sm:p-8 rounded-3xl bg-slate-900 border-4 border-amber-400 shadow-2xl text-white mb-6 font-ui relative overflow-hidden">
        <div className="flex justify-center mb-3">
          {unlocked ? (
            <Unlock className="w-14 h-14 text-green-400 animate-bounce" />
          ) : (
            <Lock className="w-14 h-14 text-rose-400" />
          )}
        </div>

        <h3 className="text-sm font-bold text-amber-300 text-center mb-3">
          {unlocked ? "VAULT OPENED! 🔓" : "SECURITY COMBINATION LOCK"}
        </h3>

        {/* PIN Display */}
        <div
          className={`p-3 rounded-2xl bg-slate-800 border-2 font-mono text-2xl tracking-[0.5em] mb-3 text-center ${
            error ? 'border-rose-500 text-rose-400 animate-shake' : unlocked ? 'border-green-400 text-green-400' : 'border-amber-400/60 text-amber-300'
          }`}
        >
          {pin.padEnd(4, '•')}
        </div>

        <p className="text-[11px] font-bold text-amber-200/80 mb-4 text-center">
          💡 Hint: Abu's favorite person's birth year in BS
        </p>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫'].map((item, idx) => (
            <button
              key={idx}
              disabled={unlocked}
              onClick={() => {
                if (item === 'C') { setPin(''); setError(false); }
                else if (item === '⌫') { setPin(p => p.slice(0, -1)); setError(false); }
                else handleDigit(item);
              }}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 active:scale-95 font-black text-base text-amber-100 border border-slate-700 cursor-pointer transition-all disabled:opacity-40"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {unlocked && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-6 rounded-3xl bg-white border-2 border-green-300 shadow-2xl max-w-md mx-auto text-center font-ui"
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2 text-2xl">
            👑
          </div>
          <h3 className="text-lg font-extrabold font-nepali text-rose-600 mb-1">
            Vault Access Granted! 🔓💖
          </h3>
          <p className="text-xs font-bold text-emerald-700 mb-3">
            Your Secret Memories Vault is now unlocked!
          </p>

          <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-xs text-gray-800 text-left space-y-2 mb-4">
            <p className="font-semibold">✨ <strong>Unlocked Vault Secrets:</strong></p>
            <p>🛵 <strong>Light Blue Scooter:</strong> Driving to Bardiya together with Abu in the back seat!</p>
            <p>🏔️ <strong>Pokhara & Mustang Honeymoon:</strong> Romantic trip to the mountains & lakes!</p>
            <p>🍿 <strong>Movie Dates:</strong> Holding hands tight & hand-feeding Chau-Chau!</p>
            <p>👶 <strong>Future Family:</strong> Building our happy home with cute babies!</p>
          </div>

          <a
            href={`https://wa.me/9779708349123?text=${encodeURIComponent(`Hey Abu! 🔐 I unlocked our Secret Vault using my birth year 2061 BS!\n\nAll our secret promises are unlocked! ❤️✨`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer font-ui"
          >
            <span>📲 Send Vault Unlock to Abu on WhatsApp</span>
          </a>
        </motion.div>
      )}
    </WorldShell>
  );
}
