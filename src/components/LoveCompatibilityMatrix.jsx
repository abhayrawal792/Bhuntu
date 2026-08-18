import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, CheckCircle2, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const METRICS = [
  { category: "Emotional Soul Connection", score: "99.9%", status: "Soulmate Sync 💕", desc: "Sanzu & Abhay (Abu) share an unbreakable soul bond across Nepalgunj and Osaka." },
  { category: "Communication & Late Night Talks", score: "100%", status: "Endless Giggles 😂", desc: "Hours of video calls filled with sweet laughs, cute arguments, and warm memories." },
  { category: "Zodiac Celestial Harmony", score: "98.5%", status: "Cosmic Alignment 🔮", desc: "Leo warmth and Virgo devotion combining into an eternal protective flame." },
  { category: "Future Marriage Destiny", score: "100%", status: "Wedding Vows 💍", desc: "Destined to walk the aisle together, build a dream home, and live happily ever after." },
  { category: "Cuddle & Hug Compatibility", score: "1000%", status: "Infinite Hugs 🫂", desc: "Daily requirement: Unlimited forehead kisses, tight hugs, and hand-holding." },
];

export default function LoveCompatibilityMatrix() {
  const { triggerHaptic } = useAppStore();

  const [analyzed, setAnalyzed] = useState(false);
  const [activeMetric, setActiveMetric] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleScan = () => {
    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120]);
    setAnalyzed(true);
    confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
  };

  const handleResetScan = () => {
    playPop();
    triggerHaptic(10);
    setAnalyzed(false);
    setActiveMetric(null);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📊 COSMIC DESTINY COMPATIBILITY MATRIX 📊\n\nOverall Match: 100% PERFECT MATCH 💖\nSanzu & Abhay (Abu) - Eternal Soulmates!\n\nHappy Birthday Queen Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Cosmic Destiny Matrix 📊✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Compatibility Matrix"}
      subtitle={"Sanzu & Abu's Celestial Compatibility Scan"}
      description={"Scan star alignments and heart frequencies across 4,650 km between Nepalgunj and Osaka to reveal compatibility metrics and photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {!analyzed ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-3xl bg-slate-950 border-4 border-purple-400/60 shadow-2xl max-w-md mx-auto relative overflow-hidden"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-rose-500/50 animate-pulse border-4 border-white/20">
              <Heart className="w-12 h-12 fill-white" />
            </div>
            <h3 className="text-xl font-bold font-nepali text-white mb-2">
              Sanzu Rawal ❤️ Abhay (Abu)
            </h3>
            <p className="text-xs text-purple-200 mb-6 font-ui">
              Tap below to initiate the 100% Love Matrix Scanner!
            </p>
            <button
              type="button"
              onClick={handleScan}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:opacity-95 transition-all"
            >
              <Sparkles className="w-5 h-5" /> Start Compatibility Scan 🔍
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-xl mx-auto">
            {/* OVERALL MATCH BANNER */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 text-white shadow-2xl border-2 border-white/20 text-center relative overflow-hidden">
              <span className="text-xs font-bold uppercase tracking-widest block opacity-80 mb-1">
                Overall Destiny Match
              </span>
              <span className="text-3xl sm:text-4xl font-extrabold font-mono block my-2 drop-shadow">
                100% PERFECT MATCH 💖
              </span>
              <span className="text-xs italic text-rose-200">
                "Forever & Always United — Sanzu & Abhay (Abu)"
              </span>
            </div>

            {/* PHOTO CARD DISCOVERY */}
            <div className="w-full h-56 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Compatibility Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20 font-bold">
                100% Celestial Match Photo Unlocked! 📊📸
              </div>
            </div>

            {/* METRICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              {METRICS.map((m, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => {
                    playPop();
                    setActiveMetric(m);
                  }}
                  className="p-4 rounded-2xl bg-slate-900 border border-purple-300/40 cursor-pointer hover:border-pink-400 transition-all shadow-lg"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">{m.category}</span>
                    <span className="text-xs font-extrabold text-pink-300 font-mono">{m.score}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-rose-300 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                    <span>{m.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-center gap-2 pt-2 max-w-sm mx-auto">
              <button
                type="button"
                onClick={handleResetScan}
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-scan & Random Photo</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Matrix</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
