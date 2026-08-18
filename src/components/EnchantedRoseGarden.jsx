import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Flower2,
  Droplets,
  Sparkles,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ROSES = [
  { name: 'Red Velvet Rose 🌹', emoji: '🌹', meaning: 'True Eternal Love', color: 'border-rose-400 bg-rose-50' },
  { name: 'Sakura Blossom 🌸', emoji: '🌸', meaning: 'Sweet Japanese Romance', color: 'border-pink-400 bg-pink-50' },
  { name: 'Royal Gold Rose ✨', emoji: '✨', meaning: 'Birthday Royalty', color: 'border-amber-400 bg-amber-50' },
  { name: 'Diamond Sparkle Rose 💎', emoji: '💎', meaning: 'Unbreakable Bond', color: 'border-cyan-400 bg-cyan-50' }
];

export default function EnchantedRoseGarden() {
  const { triggerHaptic } = useAppStore();

  const [garden, setGarden] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeBloomModal, setActiveBloomModal] = useState(null);

  const plantRose = (rose) => {
    playSparkle();
    triggerHaptic([10, 20, 30]);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    setGarden((prev) => [
      ...prev,
      {
        ...rose,
        id: Date.now(),
        growth: 25,
        photoIdx: nextPhoto,
        photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
      }
    ]);
  };

  const waterRose = (id) => {
    playPop();
    triggerHaptic(15);

    setGarden((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const newGrowth = Math.min(100, r.growth + 25);
        if (newGrowth >= 100 && r.growth < 100) {
          playBloom();
          playSparkle();
          setActiveBloomModal(r);
          confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
        }
        return { ...r, growth: newGrowth };
      })
    );
  };

  const bloomedCount = garden.filter((r) => r.growth >= 100).length;

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🌹 ENCHANTED ROSE GARDEN 🌹\n\nI bloomed ${bloomedCount} enchanted roses for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Enchanted Rose Garden 🌹✨"
      badgeIcon={<Flower2 className="w-3.5 h-3.5 text-rose-500" />}
      title={"Enchanted Rose Garden"}
      subtitle={"Plant & Water Roses to Reveal Secret Photos"}
      description={"Plant romantic roses in your garden, water them to 100% full bloom, and unlock Sanzu's secret memory photo inside each flower!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PALETTE */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {ROSES.map((r) => (
            <motion.button
              key={r.name}
              whileTap={{ scale: 0.95 }}
              onClick={() => plantRose(r)}
              className={`px-3.5 py-2 rounded-2xl border-2 shadow-sm text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${r.color} hover:scale-105`}
            >
              <span className="text-xl">{r.emoji}</span>
              <span>Plant {r.name.split(' ')[0]}</span>
            </motion.button>
          ))}
        </div>

        {/* GARDEN PLOT STAGE */}
        <div className="relative max-w-xl mx-auto p-6 rounded-3xl bg-gradient-to-b from-emerald-950 via-green-950 to-slate-950 border-4 border-emerald-400/60 shadow-2xl min-h-[260px] overflow-hidden mb-6">
          <div className="text-center mb-4">
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest bg-emerald-400/20 px-3 py-1 rounded-full border border-emerald-300/30">
              Roses Bloomed: {bloomedCount} / {garden.length}
            </span>
          </div>

          {garden.length === 0 ? (
            <p className="text-emerald-300 text-xs py-12 font-bold">
              Your garden is empty — plant your first rose above! 🌱🌹
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {garden.map((r) => (
                <motion.div
                  key={r.id}
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="flex flex-col items-center p-3 rounded-2xl bg-black/40 border border-emerald-400/30 shadow-lg relative"
                >
                  {/* Flower Icon */}
                  <span className="text-4xl mb-1 filter drop-shadow">
                    {r.growth >= 100 ? r.emoji : '🌱'}
                  </span>

                  <p className="text-xs font-extrabold text-amber-200">{r.name.split(' ')[0]}</p>
                  <p className="text-[10px] text-emerald-300 font-mono mb-2">{r.growth}% Bloomed</p>

                  <div className="w-full h-2 rounded-full bg-black/60 border border-white/20 overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-rose-400 transition-all duration-300"
                      style={{ width: `${r.growth}%` }}
                    />
                  </div>

                  {r.growth < 100 ? (
                    <button
                      type="button"
                      onClick={() => waterRose(r.id)}
                      className="px-3 py-1 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-[11px] font-bold shadow-md cursor-pointer flex items-center gap-1"
                    >
                      <Droplets className="w-3 h-3" />
                      <span>Water Rose</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        playSparkle();
                        setActiveBloomModal(r);
                      }}
                      className="px-3 py-1 rounded-xl bg-amber-400 text-amber-950 text-[11px] font-extrabold shadow-md cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>View Photo</span>
                    </button>
                  )}
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
          <span>Share Garden on WhatsApp 💬</span>
        </button>

        {/* BLOOMED PHOTO MODAL */}
        <AnimatePresence>
          {activeBloomModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-rose-400 shadow-2xl text-center"
              >
                {/* Modal Header Controls */}
                <div className="flex items-center justify-between mb-2 z-10 relative">
                  <button
                    type="button"
                    onClick={() => {
                      playPop();
                      setActiveBloomModal(null);
                    }}
                    className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer active:scale-95 border border-rose-400/40"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPop();
                      setActiveBloomModal(null);
                    }}
                    className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer active:scale-95 border border-rose-400/40"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-400/20 border border-rose-300/40 text-rose-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Flower2 className="w-3.5 h-3.5 text-rose-300" />
                  {activeBloomModal.name} - Bloomed!
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  "{activeBloomModal.meaning}"
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activeBloomModal.photoUrl}
                    alt="Rose Photo"
                    onError={(e) => handlePhotoError(e, activeBloomModal.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Bloomed Rose Memory Photo 🌹📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Rose on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
