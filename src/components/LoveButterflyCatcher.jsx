import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Share2,
  Heart,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MESSAGES = [
  "You're my sunshine ☀️", "I love your smile 😊", "Forever yours 💕", "My heart beats for you 💓",
  "You make me happy 🥰", "Dream come true 🌟", "My soulmate 💖", "Best thing ever 🎁",
  "You're beautiful 🌹", "My everything 💗", "Always & forever 💍", "Heart & soul 🦋"
];

export default function LoveButterflyCatcher() {
  const { triggerHaptic } = useAppStore();

  const [butterflies, setButterflies] = useState([]);
  const [caught, setCaught] = useState([]);
  const [score, setScore] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeCatchModal, setActiveCatchModal] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (butterflies.length < 6) {
        setButterflies((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 60 + 10,
            msg: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
            emoji: ['🦋', '🦋', '🦋', '🌸', '✨'][Math.floor(Math.random() * 5)],
            dx: (Math.random() - 0.5) * 2.5,
            dy: (Math.random() - 0.5) * 2.5
          }
        ]);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [butterflies.length]);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setButterflies((prev) =>
        prev.map((b) => ({
          ...b,
          x: Math.max(5, Math.min(90, b.x + b.dx)),
          y: Math.max(5, Math.min(75, b.y + b.dy)),
          dx: b.x <= 5 || b.x >= 90 ? -b.dx : b.dx + (Math.random() - 0.5) * 0.5,
          dy: b.y <= 5 || b.y >= 75 ? -b.dy : b.dy + (Math.random() - 0.5) * 0.5
        }))
      );
    }, 100);
    return () => clearInterval(moveInterval);
  }, []);

  const catchButterfly = (id) => {
    const b = butterflies.find((item) => item.id === id);
    if (!b) return;

    playPop();
    triggerHaptic(20);

    setButterflies((prev) => prev.filter((item) => item.id !== id));
    setCaught((prev) => [...prev.slice(-7), b]);

    const newScore = score + 1;
    setScore(newScore);

    if (newScore % 3 === 0) {
      playBloom();
      playSparkle();

      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);

      setActiveCatchModal({
        msg: b.msg,
        photoIdx: nextPhoto,
        photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
      });

      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🦋 LOVE BUTTERFLY CATCHER 🦋\n\nI caught ${score} love butterflies for Queen Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Love Butterfly Catcher 🦋✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />}
      title={"प्रेम पुतली समातौ"}
      subtitle={"Tap Flying Butterflies to Catch Secret Messages"}
      description={"Tap the flying butterflies fluttering in the enchanted meadow to catch them and unlock Sanzu's secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* ENCHANTED MEADOW STAGE */}
        <div className="relative w-full h-72 sm:h-80 rounded-3xl bg-gradient-to-b from-purple-950 via-emerald-950 to-slate-950 border-4 border-fuchsia-400/60 shadow-2xl overflow-hidden mb-6">
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-emerald-800/40 to-transparent" />
          <div className="absolute bottom-4 left-8 text-2xl">🌻</div>
          <div className="absolute bottom-4 right-10 text-2xl">🌷</div>
          <div className="absolute bottom-4 left-1/2 text-2xl">🌺</div>

          {butterflies.map((b) => (
            <motion.button
              key={b.id}
              onClick={() => catchButterfly(b.id)}
              animate={{ x: `${b.x}%`, y: `${b.y}%` }}
              transition={{ duration: 0.1 }}
              className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform z-10 filter drop-shadow-[0_0_12px_rgba(232,121,249,0.8)]"
              style={{ left: 0, top: 0 }}
            >
              {b.emoji}
            </motion.button>
          ))}
        </div>

        {/* CAUGHT MESSAGES LIST */}
        <div className="p-4 rounded-3xl bg-white border-2 border-fuchsia-200 shadow-xl max-w-md mx-auto space-y-3 mb-6">
          <p className="text-xs font-bold text-gray-700">
            Butterflies Caught: <span className="text-fuchsia-600 font-extrabold text-sm">{score}</span> 🦋
          </p>

          {caught.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5">
              <AnimatePresence>
                {caught.map((c) => (
                  <motion.div
                    key={c.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-800 text-[11px] font-bold border border-fuchsia-200"
                  >
                    🦋 {c.msg}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Catch Score on WhatsApp 💬</span>
          </button>
        </div>

        {/* CATCH REWARD MODAL */}
        <AnimatePresence>
          {activeCatchModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-fuchsia-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setActiveCatchModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-fuchsia-400/20 border border-fuchsia-300/40 text-fuchsia-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  🦋 Butterfly Photo Reward!
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  "{activeCatchModal.msg}"
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activeCatchModal.photoUrl}
                    alt="Catch Photo"
                    onError={(e) => handlePhotoError(e, activeCatchModal.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Butterfly Memory Photo Unlocked! 🦋📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Reward on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
