import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Lock,
  Heart,
  Share2,
  Key,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const LOCK_TYPES = [
  { id: 'gold', name: 'Royal Gold 👑', gradient: 'from-amber-400 via-yellow-400 to-amber-600', text: 'text-amber-950', border: 'border-yellow-200' },
  { id: 'rosegold', name: 'Rose Gold 🌸', gradient: 'from-pink-400 via-rose-400 to-pink-600', text: 'text-rose-950', border: 'border-pink-200' },
  { id: 'diamond', name: 'Diamond Sparkle 💎', gradient: 'from-cyan-400 via-blue-400 to-indigo-600', text: 'text-indigo-950', border: 'border-cyan-200' },
  { id: 'platinum', name: 'Queen Platinum 👸', gradient: 'from-purple-400 via-fuchsia-400 to-purple-700', text: 'text-purple-950', border: 'border-purple-200' },
];

export default function LoveLockBridge() {
  const { triggerHaptic } = useAppStore();

  const [name1, setName1] = useState('Abu');
  const [name2, setName2] = useState('Sanzu');
  const [lockStyleIdx, setLockStyleIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const [locks, setLocks] = useState([
    {
      id: 1,
      name1: 'Abu',
      name2: 'Sanzu',
      style: LOCK_TYPES[0],
      photoIdx: 0,
      date: 'Forever Locked'
    },
    {
      id: 2,
      name1: 'Abu',
      name2: 'Bhuntu / Bebo',
      style: LOCK_TYPES[1],
      photoIdx: 5,
      date: 'Soulmate Bond'
    }
  ]);

  const [selectedLockModal, setSelectedLockModal] = useState(null);

  const currentStyle = LOCK_TYPES[lockStyleIdx];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handleAddLock = (e) => {
    if (e) e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    playSparkle();
    playBloom();
    triggerHaptic([30, 60, 90, 150]);

    const newLock = {
      id: Date.now(),
      name1: name1.trim(),
      name2: name2.trim(),
      style: currentStyle,
      photoIdx: photoIdx,
      date: new Date().toLocaleDateString()
    };

    setLocks((prev) => [newLock, ...prev]);
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
  };

  const handleShareWhatsApp = (lock) => {
    playSparkle();
    const text = `🔒 PARISIAN LOVE LOCK BRIDGE 🔐\n\n"${lock.name1} 💖 ${lock.name2}" - Our love lock is permanently sealed on the bridge for eternity! Happy Birthday Queen Sanzu! 🎂✨`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Parisian Love Lock Bridge 🔒✨"
      badgeIcon={<Lock className="w-3.5 h-3.5 text-amber-400" />}
      title={"शाही प्रेम ताला पुल"}
      subtitle={"Engrave Your Names & Lock Your Love Forever"}
      description={"Engrave your names on a golden padlock, attach Sanzu's photo, and lock your souls together on the eternal Love Bridge!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* ENGRAVE LOCK FORM */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-amber-300/80 shadow-2xl mb-8 space-y-4">
          <h4 className="text-sm font-extrabold font-nepali text-amber-950 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-amber-600" />
            Engrave Padlock & Attach Photo:
          </h4>

          {/* Names input */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Your Name"
              className="px-3.5 py-2.5 rounded-xl border-2 border-amber-200 text-sm font-bold w-32 sm:w-36 text-center focus:outline-none focus:border-amber-500"
            />
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse flex-shrink-0" />
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Partner's Name"
              className="px-3.5 py-2.5 rounded-xl border-2 border-amber-200 text-sm font-bold w-32 sm:w-36 text-center focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Photo attachment selector */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400 shadow-sm relative bg-black/20 flex-shrink-0">
                <img
                  src={currentPhoto}
                  alt="Lock Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Attached Memory Photo #{photoIdx + 1}</p>
                <p className="text-[11px] text-gray-500">Sealed inside your love padlock!</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>

          {/* Lock Style Picker */}
          <div>
            <p className="text-xs font-bold text-gray-700 mb-2">Select Lock Metal Finish:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {LOCK_TYPES.map((st, idx) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    playPop();
                    triggerHaptic(10);
                    setLockStyleIdx(idx);
                  }}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                    lockStyleIdx === idx
                      ? 'bg-gradient-to-r ' + st.gradient + ' ' + st.text + ' border-amber-300 shadow-md scale-105 font-extrabold'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <span className="truncate">{st.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Lock Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddLock}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 text-amber-950 font-extrabold text-sm shadow-xl cursor-pointer hover:brightness-110 flex items-center justify-center gap-2 border border-yellow-200"
          >
            <Lock className="w-4 h-4 fill-amber-950" />
            <span>SEAL LOVE LOCK ON BRIDGE NOW! 🔒✨</span>
          </motion.button>
        </div>

        {/* PARISIAN BRIDGE STAGE WITH ATTACHED LOCKS */}
        <div className="relative max-w-xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-amber-950 via-slate-900 to-indigo-950 border-4 border-amber-400/80 shadow-2xl min-h-[300px] overflow-hidden select-none mb-6">
          {/* River Water Glow Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-600/20 via-transparent to-transparent pointer-events-none" />

          {/* Golden Bridge Railings */}
          <div className="absolute top-4 left-0 right-0 h-4 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 border-y border-yellow-200 shadow-md" />
          <div className="absolute bottom-4 left-0 right-0 h-4 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 border-y border-yellow-200 shadow-md" />

          <div className="text-center relative z-10 mb-4 pt-2">
            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/30">
              Pont des Arts • Love Lock Bridge 🌉
            </span>
          </div>

          {/* Attached Locks Grid */}
          <div className="flex flex-wrap gap-3.5 justify-center py-6 relative z-10">
            <AnimatePresence>
              {locks.map((lock) => (
                <motion.div
                  key={lock.id}
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  onClick={() => {
                    playSparkle();
                    triggerHaptic(15);
                    setSelectedLockModal(lock);
                  }}
                  className={`relative p-3 rounded-2xl bg-gradient-to-br ${lock.style.gradient} ${lock.style.text} shadow-2xl border-2 ${lock.style.border} cursor-pointer min-w-[120px] sm:min-w-[130px] flex flex-col items-center text-center`}
                >
                  <Lock className="w-6 h-6 mb-1 filter drop-shadow" />
                  <p className="text-xs font-extrabold leading-tight">
                    {lock.name1} 💖 {lock.name2}
                  </p>
                  <span className="text-[10px] opacity-80 mt-1 font-mono font-bold">
                    Sealed 🔐
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>

            {locks.length === 0 && (
              <p className="text-amber-300 text-xs py-10 font-bold">
                No love locks placed yet — engrave your names above to lock your love! 🔒
              </p>
            )}
          </div>
        </div>

        {/* LOCK MODAL DETAILS POPUP */}
        <AnimatePresence>
          {selectedLockModal && (
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
                    setSelectedLockModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Lock className="w-3.5 h-3.5 text-amber-300" />
                  {selectedLockModal.style.name}
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  {selectedLockModal.name1} 💖 {selectedLockModal.name2}
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={BHUNTU_PHOTOS[selectedLockModal.photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]}
                    alt="Sealed Photo"
                    onError={(e) => handlePhotoError(e, selectedLockModal.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Sealed Love Memory Photo 🔐
                  </div>
                </div>

                <p className="text-xs text-amber-100 italic leading-relaxed bg-white/10 p-3 rounded-xl border border-white/15 mb-4">
                  "Our love is locked on the bridge for eternity. Key thrown deep into the river of love!"
                </p>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(selectedLockModal)}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Lock on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
