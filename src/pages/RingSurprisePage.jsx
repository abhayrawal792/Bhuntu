import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSparkle } from '../components/AudioController';
import { useAppStore } from '../store/useAppStore';

/* ─── Floating sparkle particles — randomised once at module level ─── */
const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 3,
  size: 8 + Math.random() * 14,
}));

/* ─── Ring reveal component ─── */
function RingModel() {
  return (
    <div className="relative w-52 h-52 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
      {/* Glow beneath ring */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-8 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(ellipse, rgba(255,133,161,0.8) 0%, transparent 70%)' }}
        animate={{ scaleX: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Ring photo */}
      <motion.div
        className="relative"
        initial={{ scale: 0, rotateY: 180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 14, delay: 0.1 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Outer pulse ring */}
        <motion.div
          className="absolute -inset-5 rounded-full border-4 border-pink-400/40"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <motion.img
          src="/ring.png"
          alt="A very special surprise"
          className="w-44 h-44 sm:w-60 sm:h-60 object-contain drop-shadow-2xl"
          animate={{ rotate: [0, -4, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          draggable={false}
        />

        {/* Sparkle overlays */}
        {[
          { pos: 'top-0 right-0',   delay: 0 },
          { pos: 'bottom-2 left-2', delay: 0.5 },
          { pos: 'top-1/3 right-0', delay: 1 },
          { pos: 'bottom-8 right-4', delay: 1.5 },
        ].map(({ pos, delay }, i) => (
          <motion.div
            key={i}
            className={`absolute ${pos} text-yellow-300 text-base pointer-events-none select-none`}
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4] }}
            transition={{ duration: 1.6, delay, repeat: Infinity }}
          >
            ✦
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Animated Gift Box ─── */
function GiftBox({ onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative w-44 h-44 sm:w-60 sm:h-60 mx-auto cursor-pointer select-none"
      onClick={onOpen}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.92 }}
      animate={{ y: [0, -12, 0] }}
      transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
    >
      {/* Lid */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[35%] rounded-t-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg z-10 flex items-center justify-center"
        animate={hovered ? { y: -10, rotate: -4 } : { y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180 }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-5 bg-yellow-300/80" />
        {/* Bow */}
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-0.5 z-20">
          <div className="w-8 h-8 rounded-full bg-yellow-300 -rotate-12 shadow" />
          <div className="w-8 h-8 rounded-full bg-yellow-400 rotate-12 shadow" />
        </div>
      </motion.div>

      {/* Body */}
      <div className="absolute bottom-0 left-0 right-0 top-[30%] rounded-b-xl bg-gradient-to-br from-rose-600 to-pink-700 shadow-2xl overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-5 bg-yellow-300/60" />
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-white/10"
            style={{ left: `${15 + (i % 3) * 30}%`, top: `${20 + Math.floor(i / 3) * 45}%` }}
          />
        ))}
      </div>

      {/* Glow */}
      <motion.div
        className="absolute -inset-6 rounded-3xl blur-2xl -z-10"
        style={{ background: 'radial-gradient(ellipse, rgba(255,133,161,0.35) 0%, transparent 70%)' }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />

      {/* Pulse hint */}
      <motion.p
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-pink-400 font-ui"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        👆 Tap to open...
      </motion.p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════ */
export default function RingSurprisePage() {
  const [phase, setPhase] = useState('intro'); // intro → opening → revealed → message
  const { triggerHaptic } = useAppStore();

  const fireConfetti = () => {
    const colors = ['#FF85A1', '#FFD700', '#F72585', '#FFFFFF', '#FFC0CB'];
    const count  = 280;
    const fire   = (pR, opts) => confetti({ particleCount: Math.floor(count * pR), colors, ...opts });

    fire(0.25, { spread: 26, startVelocity: 55, origin: { y: 0.6 } });
    fire(0.2,  { spread: 60,  origin: { y: 0.6 } });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8,  origin: { y: 0.55 } });
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, origin: { y: 0.5 } });
    fire(0.1,  { spread: 120, startVelocity: 45, origin: { y: 0.65 } });
  };

  const handleOpenBox = () => {
    playSparkle();
    triggerHaptic([30, 50, 30, 80, 120]);
    setPhase('opening');

    setTimeout(() => {
      setPhase('revealed');
      fireConfetti();
      triggerHaptic([20, 40, 20, 40, 100]);
    }, 900);

    setTimeout(() => setPhase('message'), 2800);
  };

  return (
    <div
      className="relative min-h-dvh overflow-x-hidden flex flex-col"
      style={{
        background: 'linear-gradient(160deg, #1a0510 0%, #2d0a1f 30%, #0f0b1a 65%, #1a0510 100%)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 80px)',
      }}
    >
      {/* ── Background ambient sparkles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {SPARKLES.map(s => (
          <motion.div
            key={s.id}
            className="absolute text-pink-300/30 select-none"
            style={{ left: s.left, top: s.top, fontSize: s.size }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.4, 1.2, 0.4] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity }}
          >
            ✦
          </motion.div>
        ))}
        {/* Centre glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #ff85a1 0%, #e05297 40%, transparent 70%)' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex flex-col items-center px-4 sm:px-6 pt-8 pb-10 min-h-dvh">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-4 rounded-full border border-pink-500/30 bg-white/8 backdrop-blur-md text-pink-300 text-xs font-bold uppercase tracking-wider">
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
              💕
            </motion.span>
            <span>A Very Special Surprise for Bebo</span>
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}>
              💕
            </motion.span>
          </div>

          <motion.h1
            className="text-3xl sm:text-5xl font-extrabold font-nepali text-center leading-tight mb-2"
            style={{
              background: 'linear-gradient(135deg, #ff85a1 0%, #ffd6e7 40%, #ff85a1 75%, #ffc0cb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            Mero Bebo Ko Lagi<br />
            <span className="text-xl sm:text-3xl">Ekdam Vishesh Surprise ✨</span>
          </motion.h1>

          <motion.p
            className="text-pink-200/60 font-ui text-sm text-center max-w-xs mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Because I love you more than words can say...
          </motion.p>
        </motion.div>

        {/* ─── Phase switcher ─── */}
        <AnimatePresence mode="wait">

          {/* INTRO — show gift box */}
          {phase === 'intro' && (
            <motion.div
              key="box"
              className="flex flex-col items-center gap-16 w-full mt-8"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.45 }}
            >
              <GiftBox onOpen={handleOpenBox} />
            </motion.div>
          )}

          {/* OPENING — burst animation */}
          {phase === 'opening' && (
            <motion.div
              key="opening"
              className="flex flex-col items-center gap-5 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-7xl sm:text-8xl select-none"
                animate={{ scale: [1, 1.6, 0.9, 1.4, 1], rotate: [0, -12, 12, -5, 0] }}
                transition={{ duration: 0.9 }}
              >
                🎀
              </motion.div>
              <motion.p
                className="text-pink-300 font-bold font-nepali text-lg"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.9, repeat: 1 }}
              >
                Opening your surprise...
              </motion.p>
            </motion.div>
          )}

          {/* REVEALED + MESSAGE — ring + love note */}
          {(phase === 'revealed' || phase === 'message') && (
            <motion.div
              key="revealed"
              className="flex flex-col items-center w-full gap-5 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Ring photo */}
              <RingModel />

              {/* Details card */}
              <motion.div
                className="w-full max-w-sm"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 180 }}
              >
                <div
                  className="rounded-3xl p-5 sm:p-6 border border-pink-500/25 text-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,133,161,0.12) 0%, rgba(224,82,151,0.07) 100%)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <h2 className="text-lg sm:text-xl font-extrabold font-nepali text-white mb-1">
                    Mero Bebo Ko Promise
                  </h2>
                  <p className="text-pink-300 font-ui text-xs uppercase tracking-wider font-bold mb-4">
                    A Promise of Forever & Always ✨
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { icon: '💎', label: 'Pure Love',  sub: 'Eternally Yours' },
                      { icon: '🌹', label: 'Promise',    sub: 'Forever & Always' },
                      { icon: '✈️', label: 'Distance',   sub: 'Cannot Break Us' },
                    ].map(item => (
                      <div key={item.label} className="bg-white/8 rounded-2xl p-2.5 border border-white/10">
                        <span className="text-xl block mb-1">{item.icon}</span>
                        <span className="block text-[11px] font-bold text-white font-ui">{item.label}</span>
                        <span className="block text-[11px] text-pink-300/60 font-ui">{item.sub}</span>
                      </div>
                    ))}
                  </div>

                  {/* Read heart button — only in revealed phase */}
                  {phase === 'revealed' && (
                    <motion.button
                      onClick={() => { playSparkle(); triggerHaptic(20); setPhase('message'); }}
                      className="btn-romantic w-full py-3.5 rounded-2xl font-bold text-sm cursor-pointer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read My Heart ❤️
                    </motion.button>
                  )}
                </div>
              </motion.div>

              {/* Love message — only in message phase */}
              <AnimatePresence>
                {phase === 'message' && (
                  <motion.div
                    key="msg"
                    className="w-full max-w-sm"
                    initial={{ opacity: 0, y: 35 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 140, damping: 18 }}
                  >
                    <div
                      className="rounded-3xl p-5 sm:p-6 border border-pink-400/20 text-left"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,240,243,0.09) 0%, rgba(255,133,161,0.05) 100%)',
                        backdropFilter: 'blur(24px)',
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-pink-500/15">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Heart className="w-4 h-4 text-white fill-white" />
                        </div>
                        <div>
                          <p className="text-white font-bold font-nepali text-sm leading-tight">My Dearest Bebo</p>
                          <p className="text-pink-300/50 text-[11px] font-ui">From the bottom of my heart</p>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="space-y-3.5 text-pink-100/85 font-ui text-sm leading-relaxed">
                        <p>
                          Bebo, timilai thaha xa malai ring ko kura sanga kati dherai maan lagxa...
                          That's why this is not just any ring —{' '}
                          <strong className="text-pink-300">it is my promise to you.</strong>
                        </p>
                        <p className="font-nepali text-rose-200 text-sm">
                          "Yo ring le hamro maya ko promise garxa —
                          Nepalgunj bata Osaka, hazaarau miles duri bhaye pani,
                          mero mutu sadhai temlai nai dhundxa. ❤️"
                        </p>
                        <p>
                          Ma timilai sadhai maya garidai rahansuk, no matter what.
                          Yo ring dekhapari na dekhapari —{' '}
                          <strong className="text-pink-300">mero heart ma timi nai xa, sadhai.</strong>
                        </p>
                        <p className="font-nepali text-rose-200 text-sm">
                          "Bebo, yo ring lai dekhera yaad rakhnu:
                          Ma temlai marry garna chahanchhu.
                          Timi mero future ho, mero sab thok hou. 💍"
                        </p>
                        <p>
                          One day, very soon — I will put a real ring on your finger,
                          look into your beautiful eyes, and say it in person.{' '}
                          <strong className="text-yellow-300">I promise. ✨</strong>
                        </p>
                      </div>

                      {/* Signature */}
                      <div className="mt-5 pt-4 border-t border-pink-500/15 text-right">
                        <p className="font-handwriting text-lg text-rose-300 font-bold">
                          I love you sooo much Bebo...
                        </p>
                        <p className="font-script text-2xl text-white">
                          — Mero Kanxu ❤️
                        </p>
                      </div>

                      {/* Celebrate again */}
                      <motion.button
                        onClick={() => { fireConfetti(); playSparkle(); triggerHaptic([20, 40, 80]); }}
                        className="mt-5 w-full py-3 rounded-2xl bg-white/8 border border-pink-400/25 text-pink-300 font-bold text-sm active:scale-95 transition-transform cursor-pointer"
                        whileTap={{ scale: 0.95 }}
                      >
                        🎊 Celebrate Again!
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Floating emojis decoration */}
              <div className="flex items-center justify-center gap-4 py-3">
                {['❤️', '💕', '✨', '💗', '🌹'].map((e, i) => (
                  <motion.span
                    key={i}
                    className="text-xl sm:text-2xl select-none"
                    animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.2, delay: i * 0.35, repeat: Infinity }}
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
