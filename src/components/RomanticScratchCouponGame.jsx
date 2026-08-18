import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Send } from 'lucide-react';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const DATE_COUPONS = [
  { id: 1, title: '👑 Queen Bebo Dinner Date', reward: 'Abu cooks your favorite Momo & Panipuri on demand!' },
  { id: 2, title: '🎬 Late Night Movie Marathon', reward: 'Unlimited snacks + you choose every single movie!' },
  { id: 3, title: '✈️ Future Osaka Trip Promise', reward: 'A full day exploring Japan together hand in hand!' },
];

export default function RomanticScratchCouponGame() {
  const [claimedCoupon, setClaimedCoupon] = useState(null);
  const [customRequest, setCustomRequest] = useState('');

  const handleRedeemWhatsApp = (couponTitle, textDetail) => {
    const msg = `Hey Abu! I am redeeming my birthday coupon:\n🎟️ *${couponTitle}*\nNote: ${textDetail || 'Can we do this soon?'}`;
    sendWhatsAppMessage(msg, '🎟️ Birthday Coupon Redemption');
  };

  return (
    <div className="min-h-dvh bg-slate-950 text-white p-6 font-sans flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-pink-500/30 rounded-3xl p-6 shadow-2xl text-center">
        <h2 className="text-2xl font-black text-rose-300 mb-2 flex items-center justify-center gap-2">
          <Gift className="w-6 h-6 text-rose-400" /> Romantic Birthday Vouchers
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Pick a coupon to claim, or type your own custom wish and send it directly to Abu via WhatsApp!
        </p>

        <div className="space-y-3 mb-6">
          {DATE_COUPONS.map((coupon) => (
            <div
              key={coupon.id}
              onClick={() => setClaimedCoupon(coupon)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                claimedCoupon?.id === coupon.id
                  ? 'bg-rose-500/20 border-rose-400 shadow-md'
                  : 'bg-slate-800/80 border-slate-700 hover:border-rose-400/50'
              }`}
            >
              <h3 className="text-sm font-bold text-rose-200">{coupon.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{coupon.reward}</p>
            </div>
          ))}
        </div>

        {claimedCoupon && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <input
              type="text"
              value={customRequest}
              onChange={(e) => setCustomRequest(e.target.value)}
              placeholder="Add a custom note/date preference..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-rose-400/40 text-xs text-white placeholder-slate-500 focus:outline-none"
            />

            <button
              onClick={() => handleRedeemWhatsApp(claimedCoupon.title, customRequest)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 font-bold text-white text-xs cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Coupon to Abu on WhatsApp 📲
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
