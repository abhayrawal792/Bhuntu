import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Coins, Heart, Droplets, Send } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const DEFAULT_WISHES = [
  "Our eternal love & happiness 💕",
  "Always being together forever ❤️",
  "Osaka & Nepalgunj meeting soon ✈️",
  "Having 30 to 40 cute kiddos 👶",
  "Good health & success for Abu & Bhuntu 🌸",
  "Never ending smiles & tight hugs 🫂"
];

const MILESTONE_MSGS = [
  "Bhuntu's first wish is already on its way! ✨",
  "The wishing well glows brighter with your love! 💖",
  "Every coin carries a piece of your heart! 🪙",
  "The magical waters grant wishes made in true love! 🌊",
  "Sanzu, the universe is listening to every wish! 🌌",
  "Love makes every wish come true — keep tossing! 💕",
  "The golden coin sparkles like your beautiful smile! ✨",
  "Your wishes echo across Nepalgunj to Osaka! 🌏",
];

export default function WishingWell() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.wishingWell;
  const [coinsDropped, setCoinsDropped] = useState(0);
  const [wishText, setWishText] = useState('');
  const [wishes, setWishes] = useState([]);
  const [showSplash, setShowSplash] = useState(false);
  const [coinFlying, setCoinFlying] = useState(false);
  const [milestoneMsg, setMilestoneMsg] = useState(null);
  const { triggerHaptic } = useAppStore();

  const handleDropCoin = (customText = null) => {
    playBloom();
    triggerHaptic([40, 80]);
    setCoinFlying(true);

    const activeWish = (typeof customText === 'string' && customText.trim())
      ? customText.trim()
      : (wishText.trim() || DEFAULT_WISHES[coinsDropped % DEFAULT_WISHES.length]);

    setTimeout(() => {
      setCoinFlying(false);
      setShowSplash(true);
      const newCount = coinsDropped + 1;
      setCoinsDropped(newCount);

      setWishes(prev => [{ text: activeWish, id: Date.now() }, ...prev].slice(0, 10));
      sendWhatsAppMessage(`🌟 Sanzu's Birthday Wish: "${activeWish}"`, '⛲ Wishing Well Wish');
      setWishText('');

      confetti({
        particleCount: 60 + newCount * 5,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FFB703', '#FFFFFF', '#FF69B4']
      });

      if (newCount % 2 === 0) {
        const msgIdx = (Math.floor(newCount / 2)) % MILESTONE_MSGS.length;
        setMilestoneMsg(MILESTONE_MSGS[msgIdx]);
        triggerHaptic([20, 60, 20, 100]);
        setTimeout(() => setMilestoneMsg(null), 3500);
      }

      setTimeout(() => setShowSplash(false), 800);
    }, 500);
  };

  return (
    <WorldShell
      theme="garden"
      badge="Enchanted Wishing Well ⛲"
      badgeIcon={<Coins className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="max-w-md mx-auto space-y-4 font-ui">

        {/* Wish Input Box */}
        <div className="bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-pink-200 shadow-sm text-left">
          <label className="text-xs font-bold text-gray-700 block mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Type Your Secret Wish (or pick a preset below):</span>
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDropCoin()}
              placeholder="E.g., Osaka trip together soon! ✈️"
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-pink-300 bg-pink-50/50 text-xs font-semibold text-gray-800 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
              maxLength={100}
            />
            <button
              onClick={() => handleDropCoin()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-extrabold text-xs flex items-center gap-1 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <span>Toss</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Wish Preset Pills */}
          <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
            <span className="text-[10px] text-gray-500 font-bold uppercase">Quick Wishes:</span>
            {DEFAULT_WISHES.slice(0, 4).map((w, idx) => (
              <button
                key={idx}
                onClick={() => handleDropCoin(w)}
                className="px-2.5 py-1 rounded-full bg-pink-100/80 hover:bg-rose-200 text-rose-700 text-[11px] font-bold border border-pink-200 cursor-pointer transition-colors"
              >
                + {w}
              </button>
            ))}
          </div>
        </div>

        {/* The Magical Well Circle */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleDropCoin()}
          className="w-64 h-64 mx-auto rounded-full relative cursor-pointer shadow-2xl border-4 border-amber-400 overflow-hidden bg-gradient-to-b from-sky-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center text-center p-4"
        >
          {/* Glowing water surface */}
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-2 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(56,189,248,0.3) 0%, rgba(14,165,233,0.1) 70%, transparent 100%)',
            }}
          />

          {/* Splash ripples */}
          <AnimatePresence>
            {showSplash && [1, 2, 3].map((_, i) => (
              <motion.div
                key={`splash-${i}`}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 2.2 + i * 0.4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-cyan-300 pointer-events-none"
              />
            ))}
          </AnimatePresence>

          {/* Flying coin */}
          <AnimatePresence>
            {coinFlying && (
              <motion.span
                initial={{ y: -80, scale: 1.5, opacity: 1 }}
                animate={{ y: 20, scale: 0.5, opacity: 0.8, rotate: 720 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeIn' }}
                className="absolute top-2 text-4xl z-30 pointer-events-none"
              >
                🪙
              </motion.span>
            )}
          </AnimatePresence>

          {/* Settled coins at bottom */}
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-0.5 flex-wrap px-6 pointer-events-none">
            {Array.from({ length: Math.min(coinsDropped, 14) }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs opacity-80"
              >
                🪙
              </motion.span>
            ))}
          </div>

          {/* Center Content */}
          <div className="relative z-10 space-y-1">
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-5xl block drop-shadow-lg"
            >
              ⛲
            </motion.span>
            <p className="text-xs font-black text-amber-300 drop-shadow-sm font-nepali">
              {coinsDropped === 0 ? 'Tap Here to Toss Coin! 🪙' : `${coinsDropped} Golden Coin${coinsDropped > 1 ? 's' : ''} Tossed ✨`}
            </p>
            <p className="text-[10px] text-cyan-200 font-semibold">
              (Tap anywhere on the well to toss)
            </p>
          </div>
        </motion.div>

        {/* Toss Button */}
        <button
          onClick={() => handleDropCoin()}
          className="w-full max-w-sm py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-white font-black text-xs sm:text-sm shadow-xl cursor-pointer hover:scale-102 transition-transform flex items-center justify-center gap-2 mx-auto"
        >
          <Coins className="w-4 h-4" />
          <span>Toss a Golden Coin! 🪙✨</span>
        </button>

        {/* Milestone Message Banner */}
        <AnimatePresence>
          {milestoneMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 max-w-sm mx-auto shadow-md text-center"
            >
              <Sparkles className="w-4 h-4 text-amber-600 mx-auto mb-1 animate-bounce" />
              <p className="text-xs font-extrabold text-amber-900">{milestoneMsg}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Wishes List */}
        {wishes.length > 0 && (
          <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-pink-200 shadow-sm text-left">
            <p className="text-xs font-bold text-gray-700 mb-2.5 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Floating Wishes in the Well ({wishes.length})</span>
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-2.5 rounded-xl bg-pink-50/80 border border-pink-200 text-xs font-semibold text-gray-800 flex items-center justify-between gap-2 shadow-xs"
                >
                  <span className="truncate">🌟 {w.text}</span>
                  <a
                    href={`https://wa.me/9779708349123?text=${encodeURIComponent(`Hey Abu! 🪙 I tossed a coin in the Wishing Well for us:\n\n"${w.text}"\n\n- With Love ❤️`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold hover:bg-emerald-600 cursor-pointer flex-shrink-0"
                  >
                    Send to Abu 📲
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </WorldShell>
  );
}
