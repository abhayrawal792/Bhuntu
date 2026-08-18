import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Key, Sparkles, Share2, Unlock, Lock, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ROOM_VAULTS = [
  {
    id: 1,
    title: "1. The Proposal Vault 💍",
    clue: "Enter the proposal date code (Oct 28 -> MMDD): 1 0 2 8!",
    code: [1, 0, 2, 8],
    reward: "Proposal Vow Sealed: October 28th — Queen Sanzu said YES forever!",
    bgGradient: "from-amber-950 via-slate-950 to-stone-950"
  },
  {
    id: 2,
    title: "2. The Osaka Airmail Vault ✈️",
    clue: "Distance from Nepalgunj to Osaka in miles: 4 5 0 0!",
    code: [4, 5, 0, 0],
    reward: "Airmail Clearance: Distance between Nepalgunj & Osaka vanishes into love!",
    bgGradient: "from-blue-950 via-slate-950 to-indigo-950"
  },
  {
    id: 3,
    title: "3. The Secret Panipuri Vault 🥟",
    clue: "Count of Panipuri balls Abu promised Sanzu: 1 0 0 0!",
    code: [1, 0, 0, 0],
    reward: "Golden Feast Unlocked: Unlimited Panipuri & Momos served in bed!",
    bgGradient: "from-rose-950 via-slate-950 to-pink-950"
  },
  {
    id: 4,
    title: "4. The Royal Coronation Vault 👑",
    clue: "Queen Sanzu's eternal royal rank number: 0 0 0 1!",
    code: [0, 0, 0, 1],
    reward: "Throne Certified: Queen Sanzu crowned sole Ruler of Abu's Universe!",
    bgGradient: "from-purple-950 via-slate-950 to-amber-950"
  },
  {
    id: 5,
    title: "5. The 100-Year Dream Home Vault 🏡",
    clue: "Year Abu & Sanzu start their forever sanctuary: 2 0 2 6!",
    code: [2, 0, 2, 6],
    reward: "Sanctuary Keys Granted: Dream home with garden, cat room & balcony views!",
    bgGradient: "from-emerald-950 via-slate-950 to-teal-950"
  }
];

export default function CoupleEscapeRoom() {
  const { triggerHaptic } = useAppStore();

  const [vaultIdx, setVaultIdx] = useState(0);
  const [dials, setDials] = useState([0, 0, 0, 0]);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [unlockedVaults, setUnlockedVaults] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentVault = ROOM_VAULTS[vaultIdx % ROOM_VAULTS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleAdjustDial = (idx, delta) => {
    if (isUnlocked) return;

    playPop();
    triggerHaptic(10);
    setShowError(false);
    const next = [...dials];
    next[idx] = (next[idx] + delta + 10) % 10;
    setDials(next);
  };

  const handleUnlockVault = () => {
    const isCorrect = dials.every((val, i) => val === currentVault.code[i]);

    if (isCorrect) {
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setIsUnlocked(true);
      setShowError(false);
      if (!unlockedVaults.includes(currentVault.id)) {
        setUnlockedVaults(prev => [...prev, currentVault.id]);
      }
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    } else {
      playPop();
      triggerHaptic([10, 10, 10]);
      setShowError(true);
      setTimeout(() => setShowError(false), 1200);
    }
  };

  const handleNextVault = () => {
    playPop();
    triggerHaptic(10);
    setVaultIdx(v => (v + 1) % ROOM_VAULTS.length);
    setDials([0, 0, 0, 0]);
    setIsUnlocked(false);
    setShowError(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🗝️ 3D COMBINATION ESCAPE VAULT 🗝️\n\n[${currentVault.title}]\nEntered Code: ${dials.join(' ')}\nStatus: UNLOCKED! 🎉\nReward: "${currentVault.reward}"\nUnlocked Vaults: ${unlockedVaults.length}/${ROOM_VAULTS.length}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="3D Combination Vault 🗝️✨"
      badgeIcon={<Key className="w-3.5 h-3.5 text-amber-400" />}
      title={"3D Combination Escape Vault"}
      subtitle={"Rotate Number Tumbler Dials to Unlock Secret Vaults"}
      description={"Adjust the rotatable tumbler dials to enter secret codes and unlock Queen Sanzu's golden escape vaults!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* VAULT SELECTION PILLS */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-4">
          {ROOM_VAULTS.map((v, i) => {
            const isDone = unlockedVaults.includes(v.id);
            const isActive = vaultIdx === i;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setVaultIdx(i);
                  setDials([0, 0, 0, 0]);
                  setIsUnlocked(false);
                  setShowError(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border ${
                  isActive
                    ? 'bg-amber-500 text-black border-amber-300 shadow-md font-extrabold scale-105'
                    : isDone
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                    : 'bg-stone-900 text-stone-300 border-stone-700 hover:border-amber-400'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3" />}
                <span>Vault #{v.id}</span>
              </button>
            );
          })}
        </div>

        {/* MAIN CABINET CONTAINER */}
        <motion.div
          animate={showError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 ${
            isUnlocked
              ? 'border-emerald-500 shadow-[0_0_50px_rgba(16,185,129,0.3)]'
              : showError
              ? 'border-rose-500 shadow-[0_0_50px_rgba(244,63,94,0.4)]'
              : 'border-amber-500/70 shadow-2xl'
          } p-5 sm:p-6 space-y-6 transition-colors duration-300`}
        >
          {/* VAULT TITLE & CLUE */}
          <div className="bg-stone-900/90 p-4 rounded-2xl border border-amber-400/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                {isUnlocked ? <Unlock className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
                {currentVault.title}
              </h3>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                isUnlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {isUnlocked ? 'UNLOCKED' : 'LOCKED'}
              </span>
            </div>
            <p className="text-xs text-gray-300 font-semibold italic">
              "{currentVault.clue}"
            </p>
          </div>

          {/* 4 ROTATABLE COMBINATION DIALS */}
          <div className="bg-stone-900/60 p-4 rounded-2xl border border-amber-500/30">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber-400/80 mb-3 font-extrabold">
              Tumbler Security Code
            </p>

            <div className="flex items-center justify-center gap-2.5">
              {dials.map((digit, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <button
                    type="button"
                    disabled={isUnlocked}
                    onClick={() => handleAdjustDial(idx, 1)}
                    className="p-1 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-black text-amber-300 transition-all active:scale-90 disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>

                  <div className={`w-13 h-16 sm:w-14 sm:h-18 rounded-xl flex items-center justify-center font-mono text-2xl sm:text-3xl font-black border-2 shadow-inner transition-all ${
                    isUnlocked
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : showError
                      ? 'bg-rose-950 text-rose-300 border-rose-400'
                      : 'bg-gradient-to-b from-stone-950 via-slate-900 to-stone-950 text-amber-300 border-amber-400/70 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  }`}>
                    {digit}
                  </div>

                  <button
                    type="button"
                    disabled={isUnlocked}
                    onClick={() => handleAdjustDial(idx, -1)}
                    className="p-1 rounded-lg bg-stone-800 hover:bg-amber-500 hover:text-black text-amber-300 transition-all active:scale-90 disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* UNLOCK ACTION / REWARD DISPLAY */}
          {!isUnlocked ? (
            <button
              type="button"
              onClick={handleUnlockVault}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-black font-extrabold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
            >
              <Unlock className="w-5 h-5" />
              <span>Unlock Vault #{currentVault.id}</span>
            </button>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="space-y-4"
              >
                {/* PHOTO REWARD FRAME */}
                <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-xl relative bg-black/40">
                  <img
                    src={currentPhoto}
                    alt="Vault Reward"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-950/90 px-3 py-1 rounded-lg text-xs font-mono text-emerald-200 border border-emerald-400/40 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    Vault #{currentVault.id} Mastered!
                  </div>
                </div>

                <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-400/40 text-left">
                  <p className="text-xs text-emerald-200 font-bold leading-relaxed">
                    ✨ {currentVault.reward}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleNextVault}
                    className="flex-1 py-3.5 rounded-2xl bg-stone-900 border border-amber-400 text-amber-300 font-extrabold text-xs hover:bg-stone-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Next Vault 🗝️</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareWhatsApp}
                    className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share WhatsApp</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </WorldShell>
  );
}
