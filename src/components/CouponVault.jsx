import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  KeyRound,
  Lock,
  Unlock,
  Sparkles,
  Share2,
  Ticket
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CODE = '0524';

const COUPONS = [
  { id: 1, title: '1x Momo & Panipuri Date 🥟', desc: 'Valid for unlimited delicious food dates!' },
  { id: 2, title: '1x Unlimited Hugs & Kisses Pass 💖', desc: 'Non-expiring coupon for endless affection!' },
  { id: 3, title: '1x Japan Reunion Flight Wish ✈️', desc: 'Valid for a romantic reunion in Osaka!' }
];

export default function CouponVault() {
  const { triggerHaptic } = useAppStore();

  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const handleNum = (n) => {
    if (pin.length >= 4) return;
    playPop();
    triggerHaptic(10);

    const next = pin + String(n);
    setPin(next);

    if (next === CODE || next.length === 4) {
      setUnlocked(true);
      playBloom();
      playSparkle();
      triggerHaptic([30, 60, 90, 150]);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleRedeem = (couponName) => {
    playSparkle();
    sendWhatsAppMessage(`🎟️ Hey Abu! I unlocked the VIP Coupon Vault and want to redeem:\n*${couponName}*! Happy Birthday Queen Sanzu! 🎂💖`, '🎟️ VIP Coupon Redemption');
  };

  return (
    <WorldShell
      theme="sweet"
      badge="VIP Birthday Coupon Vault 🔐✨"
      badgeIcon={<KeyRound className="w-3.5 h-3.5 text-amber-400" />}
      title={"Birthday Coupon Vault"}
      subtitle={"Enter PIN Code to Unlock VIP Coupons"}
      description={"Riddle: Enter Sanzu & Abu's special date code (or any 4 digits) to unlock your VIP vault and reveal secret photo coupons!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {!unlocked ? (
          <div className="max-w-xs mx-auto p-6 rounded-3xl bg-slate-950 text-white border-4 border-amber-400 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-amber-400 mx-auto flex items-center justify-center mb-4 shadow-inner">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>

            <div className="h-12 bg-slate-900 rounded-2xl mb-4 flex items-center justify-center font-mono text-2xl tracking-widest text-amber-300 border border-slate-700 shadow-inner">
              {pin.padEnd(4, '•')}
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => (
                <button
                  key={n}
                  onClick={() => handleNum(n)}
                  className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 font-extrabold text-lg cursor-pointer border border-amber-400/40 text-amber-200 active:scale-95 transition"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-4 border-amber-400 shadow-2xl space-y-4"
          >
            <Unlock className="w-12 h-12 mx-auto text-amber-300 animate-bounce" />

            <h3 className="text-2xl font-extrabold font-nepali text-white">
              VIP VAULT UNLOCKED! 🎉
            </h3>

            <div className="space-y-3">
              {COUPONS.map((c, i) => {
                const photoForCoupon = BHUNTU_PHOTOS[(photoIdx + i * 7) % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

                return (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-2xl bg-black/60 border border-amber-400/40 flex items-center gap-3 text-left shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden border border-amber-300 shadow-sm relative bg-black/30 flex-shrink-0">
                      <img
                        src={photoForCoupon}
                        alt="Coupon Photo"
                        onError={(e) => handlePhotoError(e, photoIdx + i * 7)}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-amber-200 truncate">{c.title}</p>
                      <p className="text-[10px] text-gray-300 leading-tight truncate">{c.desc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRedeem(c.title)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold shadow-md cursor-pointer flex-shrink-0"
                    >
                      Redeem 📲
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
