import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  Share2,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const TILES = [
  { id: 1, title: "Cutest Smile 👑", secret: "Your smile brightens up my worst days!", offset: 0 },
  { id: 2, title: "Kindest Heart 💕", secret: "You always care for everyone around you!", offset: 5 },
  { id: 3, title: "Best Laugh 😂", secret: "Your giggle is my favorite sound in the world!", offset: 12 },
  { id: 4, title: "Style Queen 👗", secret: "You look stunning in every single outfit!", offset: 18 },
  { id: 5, title: "Soulmate ⭐", secret: "We were made for each other in every timeline!", offset: 25 },
  { id: 6, title: "My Everything 🎁", secret: "You are the best gift life ever gave me!", offset: 32 },
];

export default function ScratchMemory() {
  const { triggerHaptic } = useAppStore();

  const [scratched, setScratched] = useState([]);
  const [randomSeed] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeCardModal, setActiveCardModal] = useState(null);

  const handleScratch = (tile) => {
    if (scratched.includes(tile.id)) {
      playSparkle();
      setActiveCardModal(tile);
      return;
    }

    playPop();
    triggerHaptic(15);

    const next = [...scratched, tile.id];
    setScratched(next);

    if (next.length === TILES.length) {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90, 150]);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleReset = () => {
    playPop();
    setScratched([]);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `✨ GOLD FOIL SCRATCH CARDS ✨\n\nI scratched all ${scratched.length}/${TILES.length} gold cards and revealed Sanzu's secret photos! Happy Birthday Queen Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Gold Foil Scratch Compliments ✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-amber-400" />}
      title={"सुनौलो कोर्ने कार्ड"}
      subtitle={"Scratch Off Gold Cards to Reveal Secret Compliments & Photos"}
      description={"Tap the gold foil tiles to scratch them off and reveal secret love compliments with Sanzu's memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto mb-6">
          {TILES.map((t) => {
            const isScr = scratched.includes(t.id);
            const photoForTile = BHUNTU_PHOTOS[(randomSeed + t.offset) % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

            return (
              <motion.button
                key={t.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScratch(t)}
                className={`h-36 rounded-3xl p-3 cursor-pointer border-2 transition-all flex flex-col items-center justify-between text-center shadow-lg relative overflow-hidden ${
                  isScr
                    ? 'bg-slate-900 border-amber-400 text-white'
                    : 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 border-amber-200 text-amber-950 font-bold'
                }`}
              >
                {isScr ? (
                  <div className="w-full h-full relative flex flex-col justify-between">
                    <div className="w-full h-16 rounded-xl overflow-hidden border border-amber-300 shadow-sm relative bg-black/40">
                      <img
                        src={photoForTile}
                        alt="Scratched Photo"
                        onError={(e) => handlePhotoError(e, randomSeed + t.offset)}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-[11px] font-extrabold text-amber-300 font-nepali">{t.title}</span>
                    <p className="text-[9px] text-gray-300 leading-tight line-clamp-2">{t.secret}</p>
                  </div>
                ) : (
                  <div className="my-auto">
                    <span className="text-3xl block mb-1">🪙</span>
                    <span className="text-xs font-extrabold">Tap to Scratch</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Cards</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Cards</span>
          </button>
        </div>

        {/* CARD MODAL POPUP */}
        <AnimatePresence>
          {activeCardModal && (
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
                    setActiveCardModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  ✨ Gold Card Unlocked!
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-1">
                  {activeCardModal.title}
                </h3>
                <p className="text-xs text-amber-200 italic mb-4 font-nepali">
                  "{activeCardModal.secret}"
                </p>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={BHUNTU_PHOTOS[(randomSeed + activeCardModal.offset) % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]}
                    alt="Card Photo"
                    onError={(e) => handlePhotoError(e, randomSeed + activeCardModal.offset)}
                    className="w-full h-full object-contain"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Card on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
