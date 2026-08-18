import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Waves,
  Heart,
  Sparkles,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FISH_TYPES = ['🐠', '🐟', '🐡', '🐬', '💖', '🌸'];

export default function LoveAquarium() {
  const { triggerHaptic } = useAppStore();

  const [fishes, setFishes] = useState([
    { id: 1, emoji: '🐠', x: 20, y: 30, name: 'Abu Fish' },
    { id: 2, emoji: '🐟', x: 70, y: 60, name: 'Bebo Fish' },
    { id: 3, emoji: '🐬', x: 40, y: 40, name: 'Love Dolphin' }
  ]);

  const [fedCount, setFedCount] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  const handleFeed = () => {
    playPop();
    triggerHaptic(15);

    const newFed = fedCount + 1;
    setFedCount(newFed);

    setFishes((prev) =>
      prev.map((f) => ({
        ...f,
        x: Math.max(10, Math.min(85, f.x + (Math.random() - 0.5) * 35)),
        y: Math.max(10, Math.min(75, f.y + (Math.random() - 0.5) * 35))
      }))
    );

    if (newFed % 5 === 0) {
      playBloom();
      playSparkle();

      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);

      setActivePhotoModal({
        fedCount: newFed,
        photoIdx: nextPhoto,
        photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
      });

      confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
    }
  };

  const handleAddFish = () => {
    playSparkle();
    triggerHaptic(20);
    const newF = {
      id: Date.now(),
      emoji: FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)],
      x: Math.random() * 70 + 15,
      y: Math.random() * 60 + 15,
      name: 'Sweet Fish'
    };
    setFishes((prev) => [...prev, newF]);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🐠 PEACEFUL LOVE AQUARIUM 🐠\n\nI fed our love fish ${fedCount} times and cared for ${fishes.length} aquarium sea friends! Happy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Peaceful Love Aquarium 🐠✨"
      badgeIcon={<Waves className="w-3.5 h-3.5 text-cyan-400" />}
      title={"शान्त मायाको अक्वारियम"}
      subtitle={"Feed & Care for Swimming Heart Fish"}
      description={"Feed your love fish and add swimming ocean friends to unlock Sanzu's underwater photo discoveries!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* AQUARIUM STAGE */}
        <div className="relative w-full max-w-md mx-auto h-72 sm:h-80 rounded-3xl bg-gradient-to-b from-sky-950 via-cyan-950 to-blue-950 border-4 border-cyan-400/60 shadow-2xl overflow-hidden mb-6">
          <div className="absolute bottom-2 left-6 text-2xl">🌿</div>
          <div className="absolute bottom-2 right-8 text-2xl">🪸</div>
          <div className="absolute bottom-2 left-1/2 text-2xl">🪨</div>

          <AnimatePresence>
            {fishes.map((f) => (
              <motion.div
                key={f.id}
                animate={{ x: `${f.x}%`, y: `${f.y}%` }}
                transition={{ type: 'spring', stiffness: 40, damping: 12 }}
                className="absolute text-3xl sm:text-4xl cursor-pointer flex flex-col items-center filter drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]"
              >
                <span>{f.emoji}</span>
                <span className="text-[9px] bg-black/70 text-cyan-200 px-1.5 py-0.5 rounded-full font-bold border border-white/20">
                  {f.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="absolute top-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-cyan-200 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <span>Times Fed: {fedCount} 🍿</span>
            <span>Total Fish: {fishes.length} 🐠</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto mb-4">
          <button
            type="button"
            onClick={handleFeed}
            className="flex-1 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>🍿 Feed Fish</span>
          </button>

          <button
            type="button"
            onClick={handleAddFish}
            className="flex-1 py-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <span>✨ Add New Fish</span>
          </button>
        </div>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full max-w-sm py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Aquarium on WhatsApp 💬</span>
        </button>

        {/* PHOTO REWARD MODAL */}
        <AnimatePresence>
          {activePhotoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-cyan-400 shadow-2xl text-center"
              >
                {/* Top Left Close Icon Button */}
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setActivePhotoModal(null);
                  }}
                  className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 active:scale-95"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/40 text-cyan-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  🐠 Aquarium Photo Discovery!
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  Fish Fed {activePhotoModal.fedCount} Times!
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activePhotoModal.photoUrl}
                    alt="Aquarium Photo"
                    onError={(e) => handlePhotoError(e, activePhotoModal.photoIdx)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Underwater Photo Discovery 🐠📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Discovery on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
