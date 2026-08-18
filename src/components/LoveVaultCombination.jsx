import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CODE = [5, 0, 4]; // 05/04 birthday code!

export default function LoveVaultCombination() {
  const { triggerHaptic } = useAppStore();

  const [entered, setEntered] = useState([0, 0, 0]);
  const [unlocked, setUnlocked] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const rotateNum = (idx) => {
    playPop();
    triggerHaptic(15);
    const next = [...entered];
    next[idx] = (next[idx] + 1) % 10;
    setEntered(next);

    if (next.join('') === CODE.join('')) {
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setUnlocked(true);
      confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
    }
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setEntered([0, 0, 0]);
    setUnlocked(false);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔑 GOLDEN SAFE VAULT 🔑\n\nUnlocked with Secret Code [5-0-4]!\n"Inside this vault is Abu's entire heart, locked forever for Queen Sanzu!"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Golden Safe Vault 🗝️✨"
      badgeIcon={<Lock className="w-3.5 h-3.5 text-amber-400" />}
      title={"Golden Safe Vault"}
      subtitle={"Unlock Sanzu's Golden Vault"}
      description={"Turn the 3 combination lock dials to your special birthday code [5 - 0 - 4] to reveal Sanzu's secret photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* VAULT STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-500 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 text-white flex items-center justify-center mx-auto shadow-xl border-2 border-amber-300">
            {unlocked ? <Unlock className="w-8 h-8 text-amber-200" /> : <Lock className="w-8 h-8 text-amber-200" />}
          </div>

          {!unlocked ? (
            <div className="w-full">
              <div className="flex justify-center gap-3 mb-4">
                {entered.map((num, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => rotateNum(i)}
                    className="w-14 h-20 rounded-2xl bg-black/80 border-2 border-amber-400 text-3xl font-mono font-extrabold text-amber-400 flex items-center justify-center shadow-inner cursor-pointer hover:border-pink-400 hover:scale-105 transition-all"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <p className="text-xs text-amber-300 font-mono">Tap each dial to change number</p>
            </div>
          ) : (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              {/* Photo Reveal */}
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Vault Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
              </div>

              <h3 className="text-xl font-extrabold text-amber-300">VAULT UNLOCKED! 🔓</h3>
              <p className="text-xs text-gray-300 italic">
                "Inside this vault is Abu's entire heart, locked forever only for my Bebo!"
              </p>
            </motion.div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {unlocked && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Lock Vault & New Photo</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Vault</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
