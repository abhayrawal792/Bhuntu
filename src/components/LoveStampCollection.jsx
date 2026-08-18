import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Stamp, Sparkles, Share2, Award, Check } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STAMP_ALBUM = [
  { id: 1, title: "Nepalgunj Airmail 🇳🇵", denom: "Rs. 100", origin: "Nepalgunj, Nepal", desc: "Mailed from Abu's heart in Nepalgunj!" },
  { id: 2, title: "Sakai Sakura Special 🇯🇵", denom: "¥500", origin: "Sakai, Osaka, Japan", desc: "Cherry blossom commemorative stamp for Queen Sanzu!" },
  { id: 3, title: "Proposal Anniversary 💍", denom: "OCT 28", origin: "Eternal Kingdom", desc: "Sealed on October 28, 2025 proposal accepted day!" }
];

export default function LoveStampCollection() {
  const { triggerHaptic } = useAppStore();

  const [activeStamp, setActiveStamp] = useState(0);
  const [stampedList, setStampedList] = useState([0]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentStamp = STAMP_ALBUM[activeStamp % STAMP_ALBUM.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleApplyPostmark = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);

    setActiveStamp(idx);
    if (!stampedList.includes(idx)) {
      setStampedList(prev => [...prev, idx]);
    }
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📮 PHILATELY STAMP ALBUM 📮\n\nActive Stamp: [${currentStamp.title}]\nDenomination: ${currentStamp.denom}\nOrigin: ${currentStamp.origin}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Philately Stamp Album 📮✨"
      badgeIcon={<Stamp className="w-3.5 h-3.5 text-rose-500" />}
      title={"Philately Stamp Collector Album"}
      subtitle={"Vintage Postage Stamps Sent Across Nepalgunj & Osaka"}
      description={"Select rare postage stamps, apply circular postmark ink seals, and collect commemorative stamps!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* VINTAGE ALBUM CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-amber-950/40 border-4 border-amber-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* ALBUM HEADER */}
          <div className="flex items-center justify-between bg-black/80 px-4 py-2 rounded-2xl border border-amber-400/40 text-amber-300 font-mono text-xs font-bold">
            <span>OFFICIAL STAMP ALBUM</span>
            <span>COLLECTED: {stampedList.length}/{STAMP_ALBUM.length}</span>
          </div>

          {/* PERFORATED STAMP DISPLAY */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStamp}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative p-5 rounded-2xl bg-amber-100 border-4 border-dashed border-amber-700 shadow-2xl space-y-3 text-stone-950 font-serif"
            >
              {/* CIRCULAR POSTMARK INK SEAL OVERLAY */}
              <div className="absolute top-3 right-3 w-16 h-16 rounded-full border-2 border-dashed border-rose-700 flex flex-col items-center justify-center text-[8px] font-mono font-bold text-rose-800 rotate-[-15deg] pointer-events-none z-20">
                <span>PASSED</span>
                <span>AIRMAIL</span>
                <span>★ ★ ★</span>
              </div>

              {/* STAMP PORTRAIT PHOTO */}
              <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-amber-900 shadow relative bg-black">
                <img
                  src={currentPhoto}
                  alt="Postage Stamp Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                />
                <div className="absolute bottom-2 left-2 bg-amber-950/90 text-amber-200 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                  {currentStamp.denom}
                </div>
              </div>

              <div className="space-y-1 text-left">
                <h3 className="text-sm font-black text-amber-950">{currentStamp.title}</h3>
                <p className="text-[11px] font-mono font-bold text-rose-800">ORIGIN: {currentStamp.origin}</p>
                <p className="text-xs text-stone-800 italic">"{currentStamp.desc}"</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* STAMP SELECTION GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {STAMP_ALBUM.map((stamp, idx) => {
              const isStamped = stampedList.includes(idx);
              return (
                <button
                  key={stamp.id}
                  type="button"
                  onClick={() => handleApplyPostmark(idx)}
                  className={`p-3 rounded-2xl border text-xs font-extrabold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeStamp === idx
                      ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-xl scale-105'
                      : 'bg-stone-900 text-amber-300 border-amber-500/30 hover:border-amber-400'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span>📮 {stamp.denom}</span>
                    {isStamped && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <span className="text-[10px] truncate w-full text-center">{stamp.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Stamp Collection</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}
