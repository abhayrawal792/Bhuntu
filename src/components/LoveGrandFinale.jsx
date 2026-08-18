import WorldShell from './WorldShell';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Crown,
  Heart,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Share2,
  Move,
  CheckCircle2,
  Music,
  Award
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CROWN_TYPES = [
  { id: 'gold', name: 'Imperial Gold 👑', emoji: '👑', color: 'from-amber-300 via-yellow-400 to-amber-500' },
  { id: 'tiara', name: 'Diamond Tiara 💎', emoji: '💎', color: 'from-sky-300 via-blue-400 to-indigo-500' },
  { id: 'floral', name: 'Sakura Tiara 🌸', emoji: '🌸', color: 'from-pink-300 via-rose-400 to-pink-500' },
  { id: 'royal', name: 'Queen Tiara 👸', emoji: '👸', color: 'from-purple-300 via-fuchsia-400 to-purple-600' },
];

export default function LoveGrandFinale() {
  const { triggerHaptic } = useAppStore();
  const photoContainerRef = useRef(null);

  const [crowned, setCrowned] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [crownStyleIdx, setCrownStyleIdx] = useState(0);
  const [crownPos, setCrownPos] = useState({ x: 0, y: -20 });
  const [isDragging, setIsDragging] = useState(false);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const currentCrown = CROWN_TYPES[crownStyleIdx];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handlePrevPhoto = () => {
    playPop();
    triggerHaptic(10);
    setPhotoIdx((prev) => (prev - 1 + BHUNTU_PHOTOS.length) % BHUNTU_PHOTOS.length);
  };

  const handleRandomPhoto = () => {
    playPop();
    triggerHaptic(15);
    let rand = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (rand === photoIdx) rand = (rand + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(rand);
  };

  const handleCrownQueen = () => {
    playSparkle();
    playBloom();
    triggerHaptic([50, 100, 50, 100, 50, 200]);
    setCrowned(true);

    // Continuous Royal Fireworks Burst
    const end = Date.now() + 5000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
      });
    }, 250);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `👑 OFFICIAL BIRTHDAY QUEEN CORONATION 👑\n\nBe it known across the entire universe that Sanzu Rawal (Bhuntu / Bebo) has been officially crowned Queen of My Heart! 💖✨\n\nHappy Birthday Sanzu! 🎂🎉`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Grand Birthday Queen Coronation 👑"
      badgeIcon={<Crown className="w-3.5 h-3.5 text-amber-500" />}
      title={"Shree 5 Rani Sanzu Rawal Ko Coronation 👑"}
      subtitle={"The Grand Finale & Queen Coronation"}
      description={"Drag the royal crown directly onto Sanzu's photo head, pick your favorite crown style, and crown her as the undisputed Queen of your Heart!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* MAIN ROYAL PALACE STAGE */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-rose-950 text-white shadow-2xl border-4 border-amber-400/80 overflow-hidden mb-8">
          {/* Spotlight & Palace Glow Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/25 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-300/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* Royal Proclamation Banner */}
          <div className="text-center relative z-10 mb-8">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-mono font-bold uppercase tracking-widest mb-2 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              Official Birthday Decree
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-nepali text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-md">
              QUEEN SANZU RAWAL
            </h3>
            <p className="text-xs sm:text-sm text-amber-200 font-script tracking-wide mt-1">
              Ruler of My Heart & Soulmate For Eternity 💕
            </p>
          </div>

          {/* INTERACTIVE PHOTO STAGE WITH DRAGGABLE CROWN */}
          <div className="relative max-w-xs mx-auto mb-8 flex flex-col items-center">
            {/* Drag Instruction Indicator */}
            <div className="mb-2 px-3 py-1 rounded-full bg-amber-300/20 border border-amber-300/40 text-amber-200 text-[11px] font-bold flex items-center gap-1.5 animate-bounce">
              <Move className="w-3 h-3 text-amber-300" />
              <span>Drag crown to fit on Sanzu's head!</span>
            </div>

            {/* DRAGGABLE CROWN OVERLAY */}
            <div className="relative z-30 flex justify-center w-full min-h-[70px]">
              <motion.div
                drag
                dragConstraints={photoContainerRef}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(e, info) => {
                  setIsDragging(false);
                  triggerHaptic(15);
                  setCrownPos({ x: info.offset.x, y: info.offset.y });
                }}
                animate={
                  crowned
                    ? {
                        scale: [1.3, 1.05, 1],
                        rotate: [0, -6, 6, 0],
                      }
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={
                  crowned
                    ? { type: 'spring', stiffness: 120, damping: 10 }
                    : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                }
                className="cursor-grab active:cursor-grabbing select-none drop-shadow-[0_12px_24px_rgba(251,191,36,0.9)] filter"
              >
                <div className="relative flex flex-col items-center">
                  <span className="text-6xl sm:text-7xl block">
                    {currentCrown.emoji}
                  </span>

                  {isDragging && (
                    <span className="text-[10px] bg-black/70 text-amber-200 px-2 py-0.5 rounded-full font-mono mt-1">
                      Adjusting...
                    </span>
                  )}

                  {crowned && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-3 -right-3 bg-amber-400 text-amber-950 p-1 rounded-full text-xs shadow-lg"
                    >
                      <Sparkles className="w-4 h-4 fill-amber-600 animate-spin" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* PORTRAIT PHOTO CONTAINER */}
            <div
              ref={photoContainerRef}
              className="relative w-60 h-76 sm:w-68 sm:h-84 rounded-3xl p-3 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_35px_rgba(251,191,36,0.5)] border-4 border-amber-200/90 overflow-hidden group"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Queen Sanzu"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Golden Sparkle Aura Overlay when crowned */}
                {crowned && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-t from-amber-500/50 via-transparent to-purple-500/30 pointer-events-none"
                  />
                )}
              </div>

              {/* Photo Counter Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono text-amber-200 text-center border border-amber-300/30 shadow-md">
                Photo #{photoIdx + 1} of {BHUNTU_PHOTOS.length} 📸
              </div>
            </div>

            {/* Photo Switcher Toolbar */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={handlePrevPhoto}
                className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer border border-white/20"
                title="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={handleRandomPhoto}
                className="px-4 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 text-xs font-bold backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border border-amber-300/40"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Shuffle Photo</span>
              </button>

              <button
                type="button"
                onClick={handleNextPhoto}
                className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer border border-white/20"
                title="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CROWN STYLE SELECTOR STRIP */}
          <div className="mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
            <p className="text-xs font-bold text-amber-200 mb-2.5 flex items-center gap-1.5">
              <Crown className="w-4 h-4 text-amber-300" />
              Select Crown Style for Queen Sanzu:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CROWN_TYPES.map((type, idx) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    playPop();
                    triggerHaptic(10);
                    setCrownStyleIdx(idx);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                    crownStyleIdx === idx
                      ? 'bg-gradient-to-r ' + type.color + ' text-amber-950 border-amber-100 shadow-lg scale-105 font-extrabold'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                  }`}
                >
                  <span className="text-base">{type.emoji}</span>
                  <span className="truncate">{type.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Decree Scroll Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-400/10 backdrop-blur-md border border-amber-300/30 mb-6 text-center">
            <p className="text-xs sm:text-sm italic leading-relaxed text-amber-100 font-serif">
              "Be it known across every galaxy that Sanzu Rawal (Bhuntu / Bebo / Fuchee) is hereby crowned the undisputed Queen of my Heart. May her life be filled with boundless joy, peace, and eternal love!"
            </p>
          </div>

          {/* CROWN QUEEN BUTTON ACTION */}
          {!crowned ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCrownQueen}
              className="w-full py-4 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-amber-950 font-extrabold text-sm sm:text-base shadow-2xl cursor-pointer hover:brightness-110 flex items-center justify-center gap-2 border-2 border-yellow-200 animate-pulse"
            >
              <Crown className="w-5 h-5 text-amber-950 fill-amber-950" />
              <span>CROWN SANZU AS THE QUEEN NOW! 👑</span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-amber-400 text-amber-950 font-extrabold text-xs sm:text-sm shadow-xl text-center space-y-3"
            >
              <div className="flex items-center justify-center gap-2 text-sm sm:text-base">
                <CheckCircle2 className="w-5 h-5 text-amber-900 fill-amber-300" />
                <span>OFFICIAL QUEEN CORONATION COMPLETE! 💖✨</span>
              </div>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Queen Proclamation on WhatsApp 💬</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Post-Coronation Birthday Love Message */}
        {crowned && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-pink-50 via-rose-100 to-amber-50 border-2 border-pink-300 shadow-xl text-center"
          >
            <Heart className="w-10 h-10 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
            <h4 className="text-xl font-extrabold font-nepali text-rose-600 mb-2">
              HAPPY BIRTHDAY BEBO! 🎂💖
            </h4>
            <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed max-w-md mx-auto">
              "From Page 1 to Page 300 — every single line of code, photo, game, animation, quote, and surprise in this app was built with deep love just for you. Happy Birthday, Sanzu. You are my today, my tomorrow, and my forever."
            </p>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
