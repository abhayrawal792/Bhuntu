import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  KeyRound,
  Copy,
  Lock,
  Unlock,
  Sparkles,
  Share2,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const PRESET_SECRET_MESSAGES = [
  { text: 'SANZU IS THE QUEEN OF MY HEART', shift: 3 },
  { text: 'HAPPY BIRTHDAY BEBO I LOVE YOU', shift: 5 },
  { text: 'FOREVER SOULMATES NEPALGUNJ TO OSAKA', shift: 7 }
];

export default function SecretCipherWheel() {
  const { triggerHaptic } = useAppStore();

  const [shift, setShift] = useState(3);
  const [inputText, setInputText] = useState('SANZU IS THE QUEEN OF MY HEART');
  const [mode, setMode] = useState('encode');
  const [unlockedPhoto, setUnlockedPhoto] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const cipher = (text, s) =>
    text
      .split('')
      .map((c) => {
        const i = ALPHABET.indexOf(c.toUpperCase());
        if (i === -1) return c;
        const shifted = mode === 'encode' ? (i + s) % 26 : (i - s + 26) % 26;
        return c === c.toUpperCase() ? ALPHABET[shifted] : ALPHABET[shifted].toLowerCase();
      })
      .join('');

  const resultText = cipher(inputText, shift);

  const handleShiftChange = (newShift) => {
    playPop();
    triggerHaptic(5);
    setShift(newShift);
  };

  const handleDecodeSurprise = () => {
    playSparkle();
    playBloom();
    triggerHaptic([40, 80, 120]);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (nextPhoto === photoIdx) nextPhoto = (nextPhoto + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(nextPhoto);

    setUnlockedPhoto({
      photoIdx: nextPhoto,
      text: mode === 'encode' ? resultText : inputText
    });

    confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔐 SECRET LOVE CIPHER MESSAGE 🔐\n\nShift Key: +${shift}\nEncrypted: "${resultText}"\n\nDecode it to reveal my secret love note for Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Steampunk Cipher Wheel & Vault 🔐✨"
      badgeIcon={<KeyRound className="w-3.5 h-3.5 text-amber-400" />}
      title={"शाही गोप्य प्रेम कोड मेसिन"}
      subtitle={"Rotate the Brass Gear Wheel to Encode Secret Messages"}
      description={"Rotate the golden cipher wheel to encrypt or decrypt secret love messages. Unlocking messages reveals secret memory photos of Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* 3D BRASS GEAR CIPHER WHEEL */}
        <div className="relative max-w-xs mx-auto mb-8 flex flex-col items-center select-none">
          <motion.div
            animate={{ rotate: shift * 13.84 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
            className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700 p-2 shadow-[0_0_40px_rgba(245,158,11,0.6)] border-4 border-yellow-200 flex items-center justify-center cursor-pointer"
          >
            {/* Outer Brass Ring with Alphabet ticks */}
            <div className="w-full h-full rounded-full border-2 border-dashed border-amber-950/40 flex items-center justify-center relative">
              {/* Inner Core */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center text-amber-300">
                <span className="text-2xl sm:text-3xl font-extrabold font-mono drop-shadow">
                  +{shift}
                </span>
                <span className="text-[10px] font-mono uppercase text-amber-200 font-bold tracking-widest mt-0.5">
                  Shift Key
                </span>
              </div>
            </div>
          </motion.div>

          {/* Shift Slider */}
          <div className="mt-4 flex items-center justify-center gap-3 w-full bg-slate-900/80 p-3 rounded-2xl border border-amber-400/40">
            <span className="text-xs font-bold text-amber-300 font-mono">Shift Offset:</span>
            <input
              type="range"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => handleShiftChange(Number(e.target.value))}
              className="w-36 accent-amber-400 cursor-pointer"
            />
            <span className="text-sm font-extrabold text-amber-400 font-mono">+{shift}</span>
          </div>
        </div>

        {/* MODE SWITCHER & PRESETS */}
        <div className="p-5 rounded-3xl bg-white border-2 border-amber-300 shadow-xl mb-6 space-y-4">
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                playPop();
                setMode('encode');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                mode === 'encode'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-amber-950 shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Encode Secret</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playPop();
                setMode('decode');
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all flex items-center justify-center gap-1.5 ${
                mode === 'decode'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>Decode Secret</span>
            </button>
          </div>

          {/* Input text */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {mode === 'encode' ? 'Type Message to Encrypt:' : 'Paste Encrypted Cipher:'}
            </label>
            <textarea
              rows="2"
              value={inputText}
              onChange={(e) => setInputText(e.target.value.toUpperCase())}
              placeholder={mode === 'encode' ? 'Type secret love message...' : 'Paste cipher text...'}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-2 border-amber-200 text-sm font-mono font-bold text-gray-800 focus:outline-none focus:border-amber-500 focus:bg-white resize-none"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-[11px] font-bold text-gray-400 flex-shrink-0">Presets:</span>
            {PRESET_SECRET_MESSAGES.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInputText(p.text);
                  setShift(p.shift);
                }}
                className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                "{p.text.slice(0, 16)}..."
              </button>
            ))}
          </div>
        </div>

        {/* OUTPUT RESULT CARD & UNLOCK VAULT */}
        {resultText && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 text-white border-2 border-amber-400 shadow-2xl space-y-3 text-center mb-6"
          >
            <p className="text-xs font-mono font-bold text-amber-300 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {mode === 'encode' ? '🔒 Encrypted Secret Cipher' : '🔓 Decrypted Love Message'}
            </p>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-amber-300/30">
              <p className="font-mono text-base font-extrabold text-amber-200 break-all tracking-wider">
                "{resultText}"
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(resultText);
                  playSparkle();
                  triggerHaptic(10);
                }}
                className="flex-1 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Cipher</span>
              </button>

              <button
                type="button"
                onClick={handleDecodeSurprise}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Unlock Photo Vault 📸</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* UNLOCKED PHOTO VAULT MODAL */}
        <AnimatePresence>
          {unlockedPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-amber-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setUnlockedPhoto(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Unlock className="w-3.5 h-3.5 text-amber-300" />
                  Secret Love Vault Unlocked!
                </span>

                <h3 className="text-lg font-extrabold font-nepali text-white mb-3">
                  "{unlockedPhoto.text}"
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={BHUNTU_PHOTOS[unlockedPhoto.photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]}
                    alt="Unlocked Photo"
                    onError={(e) => handlePhotoError(e, unlockedPhoto.photoIdx)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Vault Secret Photo Reveal 🔐📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Encrypted Code on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
