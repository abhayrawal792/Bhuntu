import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Wind,
  Heart,
  Sparkles,
  Share2,
  RefreshCw,
  Send,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WISH_PRESETS = [
  'May Sanzu’s every birthday dream come true in Japan! 🎂🌸',
  'Eternal health, love & endless smiles for my Bebo! 💖✨',
  'Safe travels & a sweet reunion hug soon! ✈️🇳🇵🇯🇵',
  'Sanzu & Abu happily together forever! 💍👑',
];

export default function WishDandelion() {
  const { triggerHaptic } = useAppStore();

  const [wish, setWish] = useState('');
  const [seeds, setSeeds] = useState([]);
  const [blownCount, setBlownCount] = useState(0);
  const [isBlowing, setIsBlowing] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeWishModal, setActiveWishModal] = useState(null);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handleBlowWish = (e) => {
    if (e) e.preventDefault();
    const wishText = wish.trim() || WISH_PRESETS[blownCount % WISH_PRESETS.length];
    if (isBlowing) return;

    setIsBlowing(true);
    playSparkle();
    playBloom();
    triggerHaptic([20, 50, 80, 120]);

    const newSeeds = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      text: wishText,
      x: (Math.random() - 0.5) * 260,
      y: -(Math.random() * 320 + 120),
      rotate: Math.random() * 180 - 90,
      photoUrl: currentPhoto,
      photoIdx: photoIdx
    }));

    setSeeds((prev) => [...prev.slice(-28), ...newSeeds]);
    setWish('');
    setBlownCount((b) => b + 1);

    confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });

    setTimeout(() => {
      setIsBlowing(false);
    }, 1200);
  };

  const handleShareWhatsApp = (seedObj) => {
    playSparkle();
    const text = `🌬️ DANDELION BIRTHDAY WISH 🌬️\n\nWish: "${seedObj?.text || 'May Sanzu be happy forever!'}"\n\n- Blown on the breeze for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Wish Dandelion Blower 🌬️✨"
      badgeIcon={<Wind className="w-3.5 h-3.5 text-lime-400" />}
      title={"इच्छा कुसुम उडान"}
      subtitle={"Blow Birthday Wishes Across the Breeze"}
      description={"Write a birthday wish, attach Sanzu's photo, and blow the dandelion to send your wish floating across the sky!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* SKY STAGE WITH FLOATING DANDELION SEEDS & PHOTOS */}
        <div className="relative w-full h-72 sm:h-80 rounded-3xl bg-gradient-to-b from-sky-950 via-teal-950 to-emerald-950 border-4 border-lime-400/60 shadow-2xl overflow-hidden select-none mb-6 flex items-end justify-center">
          {/* Background Stars & Aurora */}
          <div className="absolute top-4 left-6 text-xl text-amber-200 opacity-60">✨</div>
          <div className="absolute top-10 right-10 text-lg text-lime-200 opacity-40">🌟</div>

          {/* Floating Seeds Animation */}
          <AnimatePresence>
            {seeds.map((s) => (
              <motion.div
                key={s.id}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{ x: s.x, y: s.y, opacity: [1, 1, 0], rotate: s.rotate }}
                transition={{ duration: 3.5, ease: 'easeOut' }}
                onClick={() => {
                  playSparkle();
                  setActiveWishModal(s);
                }}
                className="absolute bottom-28 z-20 flex flex-col items-center cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-lime-300 shadow-md bg-black/40 group-hover:scale-125 transition-transform">
                  <img
                    src={s.photoUrl}
                    alt="Wish"
                    onError={(e) => handlePhotoError(e, s.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs">🌾</span>
                <span className="text-[9px] font-bold text-lime-200 bg-black/60 px-1.5 py-0.5 rounded font-mono truncate max-w-[80px]">
                  {s.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Dandelion Head & Stem */}
          <motion.div
            animate={isBlowing ? { rotate: [-8, 8, -5, 5, 0], scale: [1, 1.1, 1] } : { y: [0, -4, 0] }}
            transition={isBlowing ? { duration: 0.9 } : { duration: 2.5, repeat: Infinity }}
            className="relative z-10 flex flex-col items-center mb-2"
          >
            <span className="text-6xl sm:text-7xl filter drop-shadow-[0_0_20px_rgba(163,230,53,0.8)]">
              {isBlowing ? '🌬️' : '🌼'}
            </span>
            <div className="w-1.5 h-28 bg-gradient-to-b from-lime-400 via-emerald-500 to-green-800 rounded-full shadow-md" />
            <span className="text-2xl -mt-2">🌱</span>
          </motion.div>
        </div>

        {/* WISH INPUT FORM */}
        <div className="p-5 rounded-3xl bg-white border-2 border-lime-200 shadow-xl space-y-4">
          {/* Attached Photo Selector */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-lime-50 border border-lime-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-lime-400 shadow-sm relative bg-black/20 flex-shrink-0">
                <img
                  src={currentPhoto}
                  alt="Wish Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Attached Memory Photo #{photoIdx + 1}</p>
                <p className="text-[11px] text-gray-500">Flies on dandelion seed parachutes!</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="px-3 py-1.5 rounded-xl bg-lime-600 hover:bg-lime-700 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>

          <form onSubmit={handleBlowWish} className="space-y-3">
            <input
              type="text"
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              placeholder="Make a birthday wish for Sanzu..."
              maxLength={60}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-2 border-lime-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-lime-500"
            />

            {/* Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[11px] font-bold text-gray-400 flex-shrink-0">Presets:</span>
              {WISH_PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setWish(p)}
                  className="px-2.5 py-1 rounded-full bg-lime-50 hover:bg-lime-100 text-lime-800 text-[11px] font-bold border border-lime-200 whitespace-nowrap cursor-pointer flex-shrink-0"
                >
                  "{p.slice(0, 18)}..."
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isBlowing}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-lime-500 via-emerald-500 to-green-600 text-white font-extrabold text-sm shadow-xl cursor-pointer hover:brightness-110 flex items-center justify-center gap-2"
            >
              <Wind className="w-4 h-4" />
              <span>BLOW DANDELION WISH NOW! 🌬️✨</span>
            </motion.button>
          </form>
        </div>

        {/* WISH SEED MODAL DETAILS */}
        <AnimatePresence>
          {activeWishModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-lime-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setActiveWishModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lime-400/20 border border-lime-300/40 text-lime-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Wind className="w-3.5 h-3.5 text-lime-300" />
                  Dandelion Wish Parachute
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  "{activeWishModal.text}"
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activeWishModal.photoUrl}
                    alt="Wish Photo"
                    onError={(e) => handlePhotoError(e, activeWishModal.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Wish Seed Photo Parachute 🌾📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(activeWishModal)}
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
