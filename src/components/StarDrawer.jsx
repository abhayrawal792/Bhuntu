import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Star,
  RotateCcw,
  Sparkles,
  Share2,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STARS = [
  { id: 1, x: 20, y: 25, label: 'Sanzu' },
  { id: 2, x: 50, y: 15, label: 'Beauty' },
  { id: 3, x: 80, y: 25, label: 'Kindness' },
  { id: 4, x: 70, y: 65, label: 'Love' },
  { id: 5, x: 50, y: 85, label: 'Forever' },
  { id: 6, x: 30, y: 65, label: 'Soulmates' }
];

export default function StarDrawer() {
  const { triggerHaptic } = useAppStore();

  const [selected, setSelected] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeConstellationModal, setActiveConstellationModal] = useState(null);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelect = (id) => {
    if (selected.includes(id)) return;
    playPop();
    triggerHaptic(15);

    const next = [...selected, id];
    setSelected(next);

    if (next.length === STARS.length) {
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90, 150]);
      setCompleted(true);

      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);

      setActiveConstellationModal({
        photoIdx: nextPhoto,
        photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
      });

      confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleReset = () => {
    playPop();
    setSelected([]);
    setCompleted(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `✨ COSMIC STAR CONSTELLATION ✨\n\nI connected the stars to draw Sanzu's Heart Constellation in deep space! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Constellation Star Drawer ✨🌌"
      badgeIcon={<Star className="w-3.5 h-3.5 text-amber-300" />}
      title={"तारा नक्षत्र चित्रक"}
      subtitle={"Connect Stars to Form Sanzu's Heart Constellation"}
      description={"Tap stars in order to draw glowing constellation stardust lines. Completing the heart unlocks Sanzu's cosmic photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CONSTELLATION STAGE */}
        <div className="relative w-full max-w-md mx-auto h-72 sm:h-80 rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 border-4 border-pink-400/60 shadow-2xl overflow-hidden mb-6">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {selected.map((st, i) => {
              if (i === 0) return null;
              const prev = STARS.find((s) => s.id === selected[i - 1]);
              const curr = STARS.find((s) => s.id === st);
              return (
                <line
                  key={i}
                  x1={`${prev.x}%`}
                  y1={`${prev.y}%`}
                  x2={`${curr.x}%`}
                  y2={`${curr.y}%`}
                  stroke="#f472b6"
                  strokeWidth="3"
                  strokeDasharray="6 3"
                  className="filter drop-shadow-[0_0_8px_rgba(244,114,182,0.9)] animate-pulse"
                />
              );
            })}
          </svg>

          {STARS.map((st) => {
            const isSel = selected.includes(st.id);
            return (
              <motion.button
                key={st.id}
                whileTap={{ scale: 1.3 }}
                onClick={() => handleSelect(st.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer text-center group z-10`}
                style={{ left: `${st.x}%`, top: `${st.y}%` }}
              >
                <span
                  className={`text-2xl sm:text-3xl block transition-transform filter ${
                    isSel ? 'scale-125 text-pink-300 drop-shadow-[0_0_15px_rgba(244,114,182,1)]' : 'text-amber-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  ⭐
                </span>
                <span className="text-[10px] bg-black/70 text-pink-200 px-2 py-0.5 rounded-full font-bold border border-white/20">
                  {st.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Lines</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Constellation</span>
          </button>
        </div>

        {/* CONSTELLATION REWARD MODAL */}
        <AnimatePresence>
          {activeConstellationModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-pink-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setActiveConstellationModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-400/20 border border-pink-300/40 text-pink-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  ✨ Constellation Complete!
                </span>

                <h3 className="text-lg font-extrabold font-nepali text-white mb-3">
                  Sanzu's Heart Constellation Drawn!
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activeConstellationModal.photoUrl}
                    alt="Constellation Photo"
                    onError={(e) => handlePhotoError(e, activeConstellationModal.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Cosmic Starlight Photo Unlocked! ✨📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Constellation on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
