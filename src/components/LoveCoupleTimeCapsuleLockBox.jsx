import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShieldCheck, Sparkles, Share2, Fingerprint, Lock, Unlock } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CAPSULE_DATES = [
  { title: "30th Birthday Capsule 🎂", vow: "Sealed until Queen Sanzu's next milestone birthday!" },
  { title: "Wedding Day Capsule 💒", vow: "Sealed with eternal vows to be opened on our wedding night!" },
  { title: "Dream Home Capsule 🏡", vow: "Sealed for the day we step into our cozy dream home!" }
];

export default function LoveCoupleTimeCapsuleLockBox() {
  const { triggerHaptic } = useAppStore();

  const [dateIdx, setDateIdx] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentCapsule = CAPSULE_DATES[dateIdx % CAPSULE_DATES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleScanThumbprint = () => {
    if (scanning || unlocked) return;

    playPop();
    triggerHaptic(15);
    setScanning(true);

    setTimeout(() => {
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setScanning(false);
      setUnlocked(true);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

      confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
    }, 1800);
  };

  const handleSelectDate = (idx) => {
    playPop();
    triggerHaptic(10);
    setDateIdx(idx);
    setUnlocked(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💎 DIGITAL TIME CAPSULE LOCKBOX 💎\n\nCapsule: [${currentCapsule.title}]\nVow: "${currentCapsule.vow}"\nBiometric Scanner: PASSED ✅\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Digital Time Capsule 💎✨"
      badgeIcon={<ShieldCheck className="w-3.5 h-3.5 text-sky-400" />}
      title={"Digital Time Capsule Lockbox"}
      subtitle={"Biometric Thumbprint Time Vault for Sanzu & Abu"}
      description={"Press & hold the cyan thumbprint scanner to pass biometric auth and open futuristic time capsules!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* TIME CAPSULE CABINET */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-sky-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* CAPSULE SELECTOR */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CAPSULE_DATES.map((cap, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectDate(idx)}
                className={`p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer ${
                  dateIdx === idx
                    ? 'bg-sky-500 text-slate-950 border-sky-300 shadow-md scale-105'
                    : 'bg-slate-900 text-sky-300 border-sky-500/30 hover:border-sky-400'
                }`}
              >
                {cap.title.split(' ')[0]} {cap.title.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* BIOMETRIC SCANNER STAGE */}
          <div className="relative w-full h-64 rounded-2xl bg-gradient-to-b from-sky-950/40 via-slate-950 to-indigo-950 border-2 border-sky-400/40 p-4 shadow-inner flex flex-col items-center justify-center overflow-hidden">
            {unlocked ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full h-full space-y-3 flex flex-col items-center"
              >
                <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Capsule Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                  <div className="absolute top-2 right-2 bg-sky-950/90 text-sky-200 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold">
                    BIOMETRIC AUTH PASSED
                  </div>
                </div>
                <p className="text-xs font-black text-sky-200">
                  " {currentCapsule.vow} "
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleScanThumbprint}
                  disabled={scanning}
                  className={`w-24 h-24 rounded-full border-4 flex items-center justify-center cursor-pointer transition-all mx-auto shadow-2xl ${
                    scanning
                      ? 'bg-sky-500/40 border-sky-300 text-sky-200 shadow-[0_0_30px_#38bdf8] animate-pulse'
                      : 'bg-slate-900 border-sky-400 text-sky-400 hover:border-sky-300'
                  }`}
                >
                  <Fingerprint className="w-12 h-12" />
                </motion.button>
                <p className="text-xs font-mono font-bold text-sky-300">
                  {scanning ? 'SCANNING THUMBPRINT... KEEP HOLDING' : 'TAP THUMBPRINT TO PASS BIOMETRIC AUTH'}
                </p>
              </div>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Time Capsule</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
