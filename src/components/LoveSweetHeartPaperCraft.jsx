import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Scissors, Sparkles, Share2, RefreshCw, Stamp, Heart } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WAX_SEALS = [
  { id: 'crimson', name: 'Crimson Rose 🌹', color: 'bg-rose-700 border-rose-400' },
  { id: 'gold', name: 'Royal Gold 👑', color: 'bg-amber-600 border-amber-300' },
  { id: 'lavender', name: 'Velvet Lavender 💜', color: 'bg-purple-700 border-purple-400' }
];

export default function LoveSweetHeartPaperCraft() {
  const { triggerHaptic } = useAppStore();

  const [step, setStep] = useState(1); // 1: Fold, 2: Ribbon, 3: Seal, 4: Pop Open
  const [selectedSeal, setSelectedSeal] = useState(WAX_SEALS[0]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextStep = () => {
    playPop();
    triggerHaptic(10);

    if (step < 3) {
      setStep(s => s + 1);
    } else if (step === 3) {
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setStep(4);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
    }
  };

  const handleResetCraft = () => {
    playPop();
    triggerHaptic(10);
    setStep(1);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💌 3D POP-UP PAPER CRAFT CARD 💌\n\nCrafted 3D Pop-Up Heart Card for Queen Sanzu!\nSealed with ${selectedSeal.name}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="3D Pop-Up Paper Crafter 💌✨"
      badgeIcon={<Scissors className="w-3.5 h-3.5 text-rose-500" />}
      title={"3D Pop-Up Paper Craft Studio"}
      subtitle={"Craft 3D Folded Origami Cards for Queen Sanzu"}
      description={"Fold paper hearts, tie silk ribbons, stamp hot wax seals, and pop open 3D paper craft cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* PAPER CRAFT CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-amber-950/40 border-4 border-amber-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* STEP PROGRESS BAR */}
          <div className="flex items-center justify-between bg-black/80 px-4 py-2 rounded-2xl border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
            <span>STEP {step}/4: {['FOLD PAPER', 'TIE RIBBON', 'HOT WAX SEAL', 'POP OPEN!'][step - 1]}</span>
            <span>{step === 4 ? 'CARD COMPLETE! 🎉' : 'CRAFTING IN PROGRESS'}</span>
          </div>

          {/* 3D POP-UP CARD DISPLAY */}
          <div className="relative w-full h-64 rounded-2xl bg-amber-100 border-4 border-amber-700 p-4 shadow-inner flex flex-col items-center justify-center overflow-hidden">
            {step === 4 ? (
              <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full space-y-3 flex flex-col items-center justify-center text-stone-950 font-serif"
              >
                <div className="w-full h-44 rounded-xl overflow-hidden border-2 border-amber-900 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Pop Up Card Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                  />
                </div>
                <p className="text-xs font-black text-rose-900">
                  💌 "3D POP-UP ORIGAMI HEART CARD FOR QUEEN SANZU!"
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4 text-stone-900">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl"
                >
                  {step === 1 && '✂️'}
                  {step === 2 && '🎀'}
                  {step === 3 && '🕯️'}
                </motion.div>
                <p className="text-xs font-black text-amber-950 uppercase tracking-wide">
                  {step === 1 && 'TAP BELOW TO FOLD ORIGAMI HEART PAPER'}
                  {step === 2 && 'TAP BELOW TO TIE SILK SATIN RIBBON'}
                  {step === 3 && 'TAP BELOW TO STAMP HOT WAX SEAL'}
                </p>
              </div>
            )}
          </div>

          {/* WAX SEAL SELECTION (FOR STEP 3) */}
          {step === 3 && (
            <div className="flex justify-center gap-2">
              {WAX_SEALS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSeal(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all ${
                    selectedSeal.id === s.id
                      ? `${s.color} text-white shadow-lg scale-105`
                      : 'bg-stone-900 text-amber-200 border-amber-500/30'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>{step === 3 ? 'Stamp Hot Wax Seal!' : 'Next Crafting Step'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetCraft}
                className="py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-amber-200 font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Craft Another Card</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Paper Craft</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
