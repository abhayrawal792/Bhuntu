import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Send, Heart, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PRESET_WISHES_FOR_ABHAY = [
  "Abu, take me on a light blue scooter trip to Bardiya! 🛵",
  "Abu, make hot chiya & momo for us in Nepalgunj! ☕",
  "Abu, give me 100 tight hugs the moment we meet in Osaka! 🫂",
  "Abu, build our dream house & 30-40 kiddos future together! 💒",
  "Abu, always call me Bebo & Fuchee every morning! 👑",
  "Abu, cook a romantic dinner date for me! 🍳"
];

const LANTERN_COLORS = ['#FFA500', '#FF6B35', '#FFD700', '#FF4500', '#FF8C00', '#EC4899'];

export default function LoveWishesSky() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveWishesSky;
  const { triggerHaptic } = useAppStore();

  const [wish, setWish] = useState('');
  const [lanterns, setLanterns] = useState([]);

  const releaseLantern = (text) => {
    if (!text.trim()) return;
    playBloom();
    triggerHaptic([30, 70]);

    const lantern = {
      id: Date.now(),
      text: text.trim(),
      x: 20 + Math.random() * 60,
      color: LANTERN_COLORS[Math.floor(Math.random() * LANTERN_COLORS.length)],
      delay: Math.random() * 0.3,
      size: 0.8 + Math.random() * 0.4,
    };

    setLanterns(prev => [...prev, lantern]);
    setWish('');
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.7 } });
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Sanzu's Sky Lantern Wish Launcher 🏮"
      badgeIcon={<Send className="w-3.5 h-3.5 text-amber-400 animate-bounce" />}
      title="Sanzu's Sky Wishes for Abhay (Abu) 🏮"
      subtitle="Write what you want Abhay (Abu) to do for you, release floating lanterns into the night sky & send your wishes directly to Abu!"
      description="100% interactive sky lantern launcher with WhatsApp wish transmission to Abu!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* Night Sky Canvas */}
        <div className="w-full max-w-md h-80 mx-auto rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-black border-4 border-amber-400 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          {/* Animated Stars */}
          {[...Array(35)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              animate={{ opacity: [0.1, 0.9, 0.1] }}
              transition={{ duration: 1.5 + (i % 3), repeat: Infinity, delay: (i % 5) * 0.4 }}
              className="absolute rounded-full bg-amber-100"
              style={{
                left: `${(i * 19) % 96}%`,
                top: `${(i * 29) % 70}%`,
                width: 1.5 + (i % 2),
                height: 1.5 + (i % 2),
              }}
            />
          ))}

          {/* Moon Glow */}
          <div className="absolute top-5 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-300 shadow-lg shadow-amber-300/30" />

          {/* Mountain Silhouette */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 400 60" className="w-full h-12">
              <path d="M0,60 L30,30 L80,45 L120,20 L170,40 L220,15 L260,35 L310,25 L350,38 L400,20 L400,60 Z" fill="#090d16" opacity="0.8" />
              <path d="M0,60 L50,40 L100,50 L150,30 L200,45 L250,25 L300,40 L350,30 L400,35 L400,60 Z" fill="#04060a" />
            </svg>
          </div>

          {/* Released Sky Lanterns */}
          <AnimatePresence>
            {lanterns.map(l => (
              <motion.div
                key={l.id}
                initial={{ y: 280, x: `${l.x}%`, opacity: 1, scale: l.size }}
                animate={{ y: -120, opacity: [1, 1, 0.8, 0.2], scale: l.size * 0.5 }}
                transition={{ duration: 7 + Math.random() * 3, delay: l.delay, ease: 'easeOut' }}
                className="absolute pointer-events-none flex flex-col items-center z-10"
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className="w-10 h-12 rounded-t-full rounded-b-lg flex items-center justify-center shadow-xl"
                    style={{
                      background: `linear-gradient(to bottom, ${l.color}50, ${l.color})`,
                      boxShadow: `0 0 25px ${l.color}80, 0 0 50px ${l.color}40`,
                    }}
                  >
                    <span className="text-lg animate-pulse">🏮</span>
                  </div>
                  <span className="text-[8px] font-black text-amber-200 bg-black/60 px-1.5 py-0.5 rounded-full mt-1 max-w-24 truncate">
                    {l.text}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Lantern Counter Header */}
          <div className="relative z-20 flex items-center justify-between p-4">
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-amber-300 text-xs font-black border border-amber-400/30">
              🏮 {lanterns.length} Wishes Floating
            </span>
          </div>

        </div>

        {/* Wish Form Box */}
        <div className="glass-card p-5 rounded-3xl border-2 border-amber-400 bg-slate-900/90 text-white shadow-xl space-y-4 max-w-md mx-auto text-left">
          <label className="text-xs font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Write your Wish for Abhay (Abu) to fulfill:</span>
          </label>

          <textarea
            value={wish}
            onChange={e => setWish(e.target.value)}
            placeholder="Type what you want Abu to do for you... ✨"
            rows={2}
            className="w-full p-3 rounded-2xl border border-amber-400/50 text-xs font-bold text-amber-100 outline-none focus:border-amber-400 bg-black/40 resize-none font-ui"
          />

          <button
            onClick={() => releaseLantern(wish)}
            disabled={!wish.trim()}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg cursor-pointer hover:scale-102 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Release Sky Lantern 🏮
          </button>

          {/* Quick Preset Wishes Chips */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-extrabold text-amber-200/80 block">
              Quick Preset Wishes for Abu:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_WISHES_FOR_ABHAY.map((pw, i) => (
                <button
                  key={i}
                  onClick={() => { playPop(); releaseLantern(pw); }}
                  className="px-3 py-1.5 rounded-full bg-slate-800 border border-amber-400/30 text-[11px] font-bold text-amber-200 hover:bg-amber-400 hover:text-slate-950 transition-all cursor-pointer text-left"
                >
                  {pw}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ALWAYS VISIBLE SEND WISHES TO ABU ON WHATSAPP BUTTON */}
        <div className="max-w-md mx-auto">
          <button
            onClick={() => {
              const wishesList = lanterns.length > 0
                ? lanterns.map((l, idx) => `${idx + 1}. "${l.text}"`).join('\n')
                : (wish.trim() ? `1. "${wish.trim()}"` : `1. "Abu, take me on a light blue scooter trip to Bardiya! 🛵"`);

              sendWhatsAppMessage(`🏮 Hey Abu! Here are my birthday sky wishes for you to fulfill for me:\n\n${wishesList}\n\n❤️ Floating with love in our night sky! ✨`, '🏮 Sanzu\'s Sky Wishes');
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-ui"
          >
            <Send className="w-4 h-4 fill-white animate-bounce" />
            <span>Send Sanzu's Sky Wishes to Abu on WhatsApp 📲</span>
          </button>
        </div>

      </div>
    </WorldShell>
  );
}
