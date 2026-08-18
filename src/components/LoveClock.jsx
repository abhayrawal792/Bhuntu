import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Heart, Sparkles, Share2, RefreshCw, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import confetti from 'canvas-confetti';
import { playSparkle, playPop, playBloom } from './AudioController';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

// Proposal accepted on October 28, 2025! 💕
const START_DATE = new Date('2025-10-28T00:00:00');

const MILESTONES = [
  { days: 30, msg: "1 Month Together! 🌙", emoji: "🌙" },
  { days: 100, msg: "100 Days of Pure Love! 💯", emoji: "💯" },
  { days: 180, msg: "6 Months of Magic! ✨", emoji: "✨" },
  { days: 200, msg: "200 Days Strong! 💪", emoji: "💪" },
  { days: 300, msg: "300 Days of Maya! 🌸", emoji: "🌸" },
  { days: 365, msg: "1 YEAR ANNIVERSARY! 🎉💍", emoji: "🎉" },
];

const LOVE_STATUSES = [
  "Growing stronger with every heartbeat 💓",
  "Nepalgunj ↔ Osaka — zero distance in the heart 🌏",
  "Every second brings us closer to forever 💍",
  "Bhuntu's heart synced with yours across oceans 💕",
  "Love level: Infinity × Infinity ∞",
  "Status: Hopelessly, madly, deeply in love 🥰"
];

export default function LoveClock() {
  const { triggerHaptic } = useAppStore();

  const [diff, setDiff] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [heartbeats, setHeartbeats] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [showMilestone, setShowMilestone] = useState(null);
  const [pulse, setPulse] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const delta = Math.max(0, Math.floor((now - START_DATE) / 1000));
      const days = Math.floor(delta / (3600 * 24));
      const hours = Math.floor((delta % (3600 * 24)) / 3600);
      const mins = Math.floor((delta % 3600) / 60);
      const secs = delta % 60;
      setDiff({ days, hours, mins, secs });
      setHeartbeats(Math.floor(delta * 1.2));
      setPulse((p) => !p);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % LOVE_STATUSES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
  };

  const handleMilestoneCheck = () => {
    triggerHaptic([20, 40, 20]);
    const milestone = MILESTONES.find((m) => diff.days >= m.days);
    if (milestone) {
      playBloom();
      setShowMilestone(milestone);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
      setTimeout(() => setShowMilestone(null), 4000);
    }
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `⏰ LIVE TICKING LOVE COUNTER ⏰\n\n${diff.days} Days, ${diff.hours} Hours, ${diff.mins} Minutes Together! Shared ${heartbeats.toLocaleString()} heartbeats! Happy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  const formatNumber = (n) => String(n).padStart(2, '0');

  return (
    <WorldShell
      theme="journey"
      badge="Live Ticking Love Counter ⏰✨"
      badgeIcon={<Clock className="w-3.5 h-3.5 text-pink-400" />}
      title={"Our Eternal Love Clock"}
      subtitle={"Time Elapsed Since Proposal Day"}
      description={"Since October 28, 2025 — when Bhuntu accepted Abu's proposal! Live heartbeats & ticking seconds."}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PHOTO FRAME STAGE */}
        <div className="relative max-w-xs mx-auto mb-6">
          <div className="w-44 h-44 sm:w-48 sm:h-48 mx-auto rounded-full overflow-hidden border-4 border-amber-300 shadow-2xl relative bg-black/40">
            <img
              src={currentPhoto}
              alt="Love Clock Photo"
              className="w-full h-full object-cover object-top"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
            />
          </div>

          <button
            type="button"
            onClick={handleNextPhoto}
            className="mt-2 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold border border-white/30 cursor-pointer inline-flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Random Next Photo</span>
          </button>
        </div>

        {/* Main Timer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto mb-6">
          {[
            { label: 'Days', val: diff.days, color: 'from-rose-500 to-pink-600' },
            { label: 'Hours', val: formatNumber(diff.hours), color: 'from-purple-500 to-indigo-600' },
            { label: 'Minutes', val: formatNumber(diff.mins), color: 'from-sky-500 to-blue-600' },
            { label: 'Seconds', val: formatNumber(diff.secs), color: 'from-amber-500 to-orange-600' }
          ].map((item) => (
            <motion.div
              key={item.label}
              animate={{ scale: item.label === 'Seconds' ? [1, 1.04, 1] : 1 }}
              transition={{ duration: 1, repeat: item.label === 'Seconds' ? Infinity : 0 }}
              className={`p-4 rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-xl text-center border-2 border-white/20 relative overflow-hidden`}
            >
              <span className="text-3xl font-extrabold font-mono block relative z-10">{item.val}</span>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-80 relative z-10">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Heartbeat Counter */}
        <motion.div
          animate={{ scale: pulse ? 1.02 : 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-rose-950 via-slate-900 to-pink-950 border border-rose-400/40 max-w-md mx-auto mb-4 text-white shadow-xl"
        >
          <div className="flex items-center justify-center gap-3">
            <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </motion.div>
            <div className="text-left">
              <span className="text-2xl font-extrabold font-mono text-pink-300 block">
                {heartbeats.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                Heartbeats shared together 💓
              </span>
            </div>
          </div>
        </motion.div>

        {/* Rotating Love Status */}
        <AnimatePresence mode="wait">
          <motion.div
            key={statusIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="p-3 rounded-2xl bg-slate-900 border border-pink-400/40 max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-bold text-pink-300 mb-6"
          >
            <Sparkles className="w-4 h-4 text-pink-400 flex-shrink-0" />
            <span>{LOVE_STATUSES[statusIdx]}</span>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleMilestoneCheck}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Milestones 🏆</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Counter</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
