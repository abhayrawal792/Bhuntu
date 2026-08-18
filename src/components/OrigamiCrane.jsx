import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Feather,
  Sparkles,
  Share2,
  RefreshCw,
  Heart,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PAPERS = [
  { name: 'Sakura Pink 🌸', color: 'from-pink-400 to-rose-500', text: 'text-pink-950' },
  { name: 'Royal Gold 👑', color: 'from-amber-400 to-yellow-500', text: 'text-amber-950' },
  { name: 'Midnight Blue 🌌', color: 'from-cyan-400 to-blue-600', text: 'text-blue-950' },
  { name: 'Jade Green 🍃', color: 'from-emerald-400 to-teal-600', text: 'text-emerald-950' }
];

export default function OrigamiCrane() {
  const { triggerHaptic } = useAppStore();

  const [cranes, setCranes] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeCraneModal, setActiveCraneModal] = useState(null);

  const currentPaper = PAPERS[selectedPaper];

  const foldCrane = () => {
    playSparkle();
    playBloom();
    triggerHaptic([30, 60, 90]);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    const newCrane = {
      id: Date.now(),
      paper: currentPaper,
      photoIdx: nextPhoto,
      photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
    };

    setCranes((prev) => [newCrane, ...prev]);

    if ((cranes.length + 1) % 3 === 0) {
      setActiveCraneModal(newCrane);
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🕊️ 1,000 ORIGAMI LOVE CRANES 🕊️\n\nI folded ${cranes.length} origami love cranes for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="1,000 Origami Love Cranes 🕊️✨"
      badgeIcon={<Feather className="w-3.5 h-3.5 text-pink-400" />}
      title={"शाही ओरिगामी सारस"}
      subtitle={"Fold 1,000 Origami Paper Cranes for Birthday Wishes"}
      description={"Fold origami paper cranes to send wishes across the distance and unlock Sanzu's secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PAPER SELECTOR */}
        <div className="p-4 rounded-3xl bg-white border-2 border-pink-200 shadow-xl mb-6 space-y-3">
          <p className="text-xs font-bold text-gray-700">Select Origami Paper Color:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PAPERS.map((p, idx) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  playPop();
                  setSelectedPaper(idx);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1 transition-all border cursor-pointer ${
                  selectedPaper === idx
                    ? 'bg-gradient-to-r ' + p.color + ' ' + p.text + ' border-amber-300 shadow-md scale-105'
                    : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                }`}
              >
                <span>{p.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={foldCrane}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-sm shadow-xl cursor-pointer hover:brightness-110 flex items-center justify-center gap-2"
          >
            <Feather className="w-4 h-4" />
            <span>FOLD ORIGAMI CRANE NOW! 🕊️✨</span>
          </motion.button>
        </div>

        {/* CRANES JAR STAGE */}
        <div className="relative max-w-xl mx-auto p-6 rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 border-4 border-pink-400/60 shadow-2xl min-h-[260px] overflow-hidden mb-6">
          <div className="text-center mb-4">
            <span className="text-xs font-mono font-bold text-pink-300 uppercase tracking-widest bg-pink-400/20 px-3 py-1 rounded-full border border-pink-300/30">
              Cranes Folded: {cranes.length} 🕊️
            </span>
          </div>

          {cranes.length === 0 ? (
            <p className="text-pink-300 text-xs py-12 font-bold">
              No cranes folded yet — click above to fold your first paper crane! 🕊️✨
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {cranes.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ scale: 0, y: -20 }}
                  animate={{ scale: 1, y: 0 }}
                  onClick={() => {
                    playSparkle();
                    setActiveCraneModal(c);
                  }}
                  className={`p-3 rounded-2xl bg-gradient-to-br ${c.paper.color} ${c.paper.text} shadow-lg border border-white/40 cursor-pointer flex flex-col items-center justify-center hover:scale-110 transition-transform`}
                >
                  <span className="text-3xl mb-1 filter drop-shadow">🕊️</span>
                  <span className="text-[10px] font-bold font-mono">#{cranes.length - i}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* SHARE BUTTON */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Origami Wish Jar on WhatsApp 💬</span>
        </button>

        {/* CRANE PHOTO MODAL */}
        <AnimatePresence>
          {activeCraneModal && (
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
                    setActiveCraneModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-400/20 border border-pink-300/40 text-pink-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  🕊️ Origami Crane Memory Wish!
                </span>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activeCraneModal.photoUrl}
                    alt="Crane Photo"
                    onError={(e) => handlePhotoError(e, activeCraneModal.photoIdx)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Origami Crane Photo Wish Unlocked! 🕊️📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Wish on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
