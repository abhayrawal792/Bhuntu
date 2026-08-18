import WorldShell from './WorldShell';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Share2, Zap } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

// Each reel has independent segments — they combine to form the full reason
const REEL_1 = ['Your kindness', 'Your laughter', 'Your patience', 'Your warmth', 'Your courage', 'Your sweet smile'];
const REEL_2 = ['& gentle heart', '& sparkling eyes', '& caring soul', '& playful spirit', '& quiet strength', '& infectious joy'];
const REEL_3 = ['lights up my world 🌸', 'captures Abu forever 💕', 'crosses 4,500 miles ✈️', 'fills every silence 🌙', 'is Abu\'s everything 💍', 'makes life beautiful 🌟'];

const JACKPOT_COMBOS = [[0, 0, 0], [1, 1, 1], [2, 2, 2]]; // indices that match = jackpot

function Reel({ items, targetIdx, isSpinning, delay = 0 }) {
  const [displayIdx, setDisplayIdx] = useState(targetIdx);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      setSpinning(true);
      const timer = setTimeout(() => {
        setSpinning(false);
        setDisplayIdx(targetIdx);
      }, 700 + delay);
      return () => clearTimeout(timer);
    }
  }, [isSpinning, targetIdx, delay]);

  return (
    <div className="relative h-14 overflow-hidden rounded-xl border-2 border-rose-400/40 bg-slate-950/80 flex-1" style={{ minWidth: 0 }}>
      {/* Highlight stripe in the center */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-rose-500/10 border-y border-rose-400/30 pointer-events-none z-10" />

      <AnimatePresence mode="wait">
        {spinning ? (
          <motion.div
            key="spin"
            initial={{ y: 0 }}
            animate={{ y: [0, -120, 0, -80, 0] }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
            className="absolute inset-0 flex flex-col items-center justify-around py-1"
          >
            {items.map((item, i) => (
              <span key={i} className="text-[9px] font-bold text-rose-200/60 text-center px-1 leading-tight truncate w-full">
                {item}
              </span>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`settled-${displayIdx}`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: delay / 1000 + 0.05 }}
            className="absolute inset-0 flex items-center justify-center px-1.5"
          >
            <span className="text-[10px] font-extrabold text-white text-center leading-tight">
              {items[displayIdx % items.length]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InfiniteReasonsMachine() {
  const { triggerHaptic } = useAppStore();

  const [reelTargets, setReelTargets] = useState([0, 0, 0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [isJackpot, setIsJackpot] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];
  const fullReason = `${REEL_1[reelTargets[0] % REEL_1.length]} ${REEL_2[reelTargets[1] % REEL_2.length]} ${REEL_3[reelTargets[2] % REEL_3.length]}`;

  const handlePullLever = () => {
    if (isSpinning) return;

    // Lever animation
    setLeverPulled(true);
    setTimeout(() => setLeverPulled(false), 350);

    playPop();
    triggerHaptic([20, 60, 20]);
    setIsSpinning(true);
    setIsJackpot(false);

    const newTargets = [
      Math.floor(Math.random() * REEL_1.length),
      Math.floor(Math.random() * REEL_2.length),
      Math.floor(Math.random() * REEL_3.length),
    ];

    // Every 5th spin = jackpot
    const nextCount = spinCount + 1;
    const jackpot = nextCount % 5 === 0;
    if (jackpot) {
      newTargets[0] = 0; newTargets[1] = 0; newTargets[2] = 0;
    }

    setTimeout(() => {
      setReelTargets(newTargets);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
      setIsSpinning(false);
      setSpinCount(nextCount);

      if (jackpot) {
        setIsJackpot(true);
        playBloom();
        playSparkle();
        confetti({ particleCount: 140, spread: 90, origin: { y: 0.5 }, colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24'] });
      }
    }, 900);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎰 INFINITE REASONS MACHINE 🎰\n\nReason #${spinCount}:\n"${fullReason}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Infinite Reasons Machine 💕✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500" />}
      title="Infinite Reasons Machine"
      subtitle="Pull the lever to reveal why Abu loves Sanzu"
      description="Every spin generates a new reason — jackpot every 5 pulls!"
    >
      <div className="max-w-sm mx-auto pb-10 select-none">

        {/* ── Slot Machine Cabinet ───────────────────────────── */}
        <div
          className="relative rounded-3xl border-4 border-rose-400 shadow-[0_0_60px_rgba(244,63,94,0.25)] overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #1e0a14 0%, #0f0a1e 60%, #0a0a0a 100%)' }}
        >
          {/* Cabinet top LED strip */}
          <div className="flex justify-center gap-1.5 py-2 bg-black/40">
            {Array.from({ length: 7 }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ opacity: isJackpot ? [1, 0.2, 1] : [0.3, 0.8, 0.3] }}
                transition={{ duration: isJackpot ? 0.2 : 1.5, repeat: Infinity, delay: i * 0.1 }}
                className={`w-2 h-2 rounded-full ${isJackpot ? 'bg-yellow-400' : 'bg-rose-400/60'}`}
              />
            ))}
          </div>

          {/* JACKPOT banner */}
          <AnimatePresence>
            {isJackpot && (
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                className="bg-yellow-400 text-black font-black text-sm text-center py-1.5 tracking-[0.3em] uppercase"
              >
                💕 JACKPOT! 💕
              </motion.div>
            )}
          </AnimatePresence>

          {/* Photo window */}
          <div className="mx-4 mt-4 rounded-2xl overflow-hidden border-2 border-rose-400/40 shadow-inner relative" style={{ height: '180px' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={photoIdx}
                src={currentPhoto}
                alt="Reason photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover object-[center_20%]"
              />
            </AnimatePresence>
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
            }} />
            <div className="absolute top-2 left-2 bg-rose-900/80 text-rose-200 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border border-rose-400/30">
              SPIN #{spinCount}
            </div>
          </div>

          {/* Slot Reels */}
          <div className="mx-4 mt-4 flex gap-1.5">
            <Reel items={REEL_1} targetIdx={reelTargets[0]} isSpinning={isSpinning} delay={0} />
            <Reel items={REEL_2} targetIdx={reelTargets[1]} isSpinning={isSpinning} delay={120} />
            <Reel items={REEL_3} targetIdx={reelTargets[2]} isSpinning={isSpinning} delay={240} />
          </div>

          {/* Divider */}
          <div className="mx-4 mt-3 border-t border-rose-400/20" />

          {/* Pull lever + share */}
          <div className="mx-4 my-4 flex gap-3 items-stretch">
            {/* Lever button */}
            <div className="relative flex flex-col items-center gap-1">
              {/* Lever pole */}
              <motion.div
                animate={{ rotate: leverPulled ? 25 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                style={{ transformOrigin: 'bottom center' }}
                className="w-2.5 h-16 bg-gradient-to-b from-rose-300 to-rose-600 rounded-full shadow-lg border border-rose-300/40"
              />
              {/* Lever ball */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={handlePullLever}
                disabled={isSpinning}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 border-2 border-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.5)] cursor-pointer disabled:opacity-50 flex items-center justify-center"
              >
                <Zap className="w-4 h-4 text-white" />
              </motion.button>
              <span className="text-[8px] font-mono text-rose-400 uppercase tracking-widest">PULL</span>
            </div>

            {/* Right side */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Reason readout */}
              <div className="flex-1 rounded-xl bg-black/60 border border-rose-400/20 p-2.5 text-left">
                <p className="text-[10px] font-mono text-rose-300/60 mb-1 uppercase tracking-widest">REASON OUTPUT</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${reelTargets[0]}-${reelTargets[1]}-${reelTargets[2]}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-white font-semibold leading-relaxed"
                  >
                    "{fullReason}"
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Share button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShareWhatsApp}
                className="py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Reason
              </motion.button>
            </div>
          </div>

          {/* Cabinet bottom */}
          <div className="bg-black/30 py-2 text-center">
            <span className="text-[9px] font-mono text-rose-400/50 tracking-widest uppercase">ABU ❤ SANZU SLOT CO. • {spinCount} SPINS</span>
          </div>
        </div>
      </div>
    </WorldShell>
  );
}
