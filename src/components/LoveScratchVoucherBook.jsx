import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Ticket, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const VOUCHERS = [
  { title: "Unlimited Momo & Panipuri Date 🥟", desc: "Redeem for unlimited delicious food cooked by Abu!" },
  { title: "Magical Romantic Wish Granted ✨", desc: "Anything Bebo desires — no questions asked!" },
  { title: "Infinite Hugs & Kisses Pass 🫂", desc: "Lifetime validity for Queen Sanzu!" }
];

export default function LoveScratchVoucherBook() {
  const { triggerHaptic } = useAppStore();

  const [voucherIdx, setVoucherIdx] = useState(0);
  const [scratched, setScratched] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentVoucher = VOUCHERS[voucherIdx % VOUCHERS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleScratch = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setScratched(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleNextVoucher = () => {
    playPop();
    triggerHaptic(10);
    setVoucherIdx((i) => (i + 1) % VOUCHERS.length);
    setScratched(false);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎟️ LOVE SCRATCH VOUCHER BOOK 🎟️\n\n[${currentVoucher.title}]\n"${currentVoucher.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Love Scratch Voucher Book 🎟️✨"
      badgeIcon={<Ticket className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Scratch Voucher Book"}
      subtitle={"Scratch Romantic Love Vouchers for Queen Sanzu"}
      description={"Scratch gold foil vouchers to claim sweet romantic passes and unlock secret photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* VOUCHER CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-pink-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {scratched ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Voucher Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3 rounded-2xl bg-pink-500/20 border border-pink-300/60 text-pink-200 text-xs font-bold">
                "Voucher [{currentVoucher.title}] Claimed by Queen Sanzu! 🎟️💖"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-pink-900/30 border-2 border-pink-400 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                🎟️
              </div>
              <p className="text-xs font-extrabold text-pink-300 font-mono uppercase tracking-wider">
                SCRATCH FOIL TO REVEAL VOUCHER
              </p>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {!scratched ? (
            <button
              type="button"
              onClick={handleScratch}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Scratch Voucher 🪙</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextVoucher}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Next Voucher 🎟️</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Voucher</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}