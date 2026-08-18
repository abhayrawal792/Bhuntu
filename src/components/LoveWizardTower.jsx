import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Castle } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FLOORS = [
  { floor: 1, title: "Floor 1: Welcome Hall", q: "What city is Abu waiting in for Queen Sanzu?", answer: "NEPALGUNJ" },
  { floor: 2, title: "Floor 2: Food Court", q: "What is Queen Sanzu's favorite spicy treat?", answer: "PANIPURI" },
  { floor: 3, title: "Floor 3: Sky Deck", q: "What date did Sanzu accept Abu's proposal (MMDD)?", answer: "1028" }
];

export default function LoveWizardTower() {
  const { triggerHaptic } = useAppStore();

  const [floorIdx, setFloorIdx] = useState(0);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentFloor = FLOORS[floorIdx % FLOORS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleClimbFloor = () => {
    if (input.trim().toUpperCase() === currentFloor.answer.toUpperCase()) {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90]);
      setUnlocked(true);
      setError('');

      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
    } else {
      playPop();
      triggerHaptic(10);
      setError('Wrong code! Try again...');
    }
  };

  const handleNextFloor = () => {
    playPop();
    triggerHaptic(10);
    setFloorIdx((i) => (i + 1) % FLOORS.length);
    setInput('');
    setUnlocked(false);
    setError('');
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🏰 LOVE WIZARD TOWER 🏰\n\nClimbed: [${currentFloor.title}]\n"${currentFloor.q}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Love Wizard Tower 🏰✨"
      badgeIcon={<Castle className="w-3.5 h-3.5 text-purple-300" />}
      title={"Love Wizard Tower"}
      subtitle={"Climb Tower Floors of Love Challenges"}
      description={"Solve romantic floor challenges to climb the wizard tower and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* TOWER CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {unlocked ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Tower Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-300/60 text-purple-200 text-xs font-bold">
                "Floor Unlocked Successfully for Queen Sanzu! 🏰✨"
              </div>
            </motion.div>
          ) : (
            <div className="py-6 space-y-3 w-full">
              <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-400 inline-block mb-1">
                {currentFloor.title}
              </span>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentFloor.q}"
              </p>

              <div className="pt-2 max-w-xs mx-auto">
                <input
                  type="text"
                  placeholder="Enter answer..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full p-2.5 bg-slate-900 border border-purple-400/40 rounded-xl text-xs font-bold text-white text-center focus:outline-none focus:border-purple-400 uppercase tracking-widest"
                />
                {error && <p className="text-[10px] text-rose-400 mt-1 font-bold">{error}</p>}
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!unlocked ? (
            <button
              type="button"
              onClick={handleClimbFloor}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Climb Floor 🏰</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextFloor}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Floor 🏰</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Floor</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
