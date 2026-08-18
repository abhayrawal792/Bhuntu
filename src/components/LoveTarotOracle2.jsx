import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Eye, Wand2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SPREAD = [
  { position: "Card I: Past Spark ✨", arcana: "The Lovers Arcana 💖", reading: "October 28, 2025: Proposal accepted, sealing our fate forever!" },
  { position: "Card II: Present Connection 🌐", arcana: "The Star & Sun 🌟", reading: "Connecting Nepalgunj & Sakai, Osaka across 4,500 miles with daily video call warmth!" },
  { position: "Card III: Future Destiny 💍", arcana: "The Empress & Crown 👑", reading: "Marriage, building our dream home, and lifelong happiness!" }
];

export default function LoveTarotOracle2() {
  const { triggerHaptic } = useAppStore();

  const [flippedCards, setFlippedCards] = useState({});
  const [photoSeeds, setPhotoSeeds] = useState([
    Math.floor(Math.random() * BHUNTU_PHOTOS.length),
    Math.floor(Math.random() * BHUNTU_PHOTOS.length),
    Math.floor(Math.random() * BHUNTU_PHOTOS.length)
  ]);

  const handleFlipCard = (index) => {
    if (flippedCards[index]) return;

    playBloom();
    playSparkle();
    triggerHaptic([20, 50]);

    setFlippedCards((prev) => ({ ...prev, [index]: true }));

    if (Object.keys(flippedCards).length === 2) {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleResetSpread = () => {
    playPop();
    triggerHaptic(10);
    setFlippedCards({});
    setPhotoSeeds([
      Math.floor(Math.random() * BHUNTU_PHOTOS.length),
      Math.floor(Math.random() * BHUNTU_PHOTOS.length),
      Math.floor(Math.random() * BHUNTU_PHOTOS.length)
    ]);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🔮 MYSTIC THREE-CARD TAROT SPREAD 🔮\n\nPast: ${SPREAD[0].arcana}\nPresent: ${SPREAD[1].arcana}\nFuture: ${SPREAD[2].arcana}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Three-Card Tarot Spread 🔮✨"
      badgeIcon={<Wand2 className="w-3.5 h-3.5 text-purple-300" />}
      title={"Mystic Love Tarot Spread"}
      subtitle={"3-Card Past, Present, & Future Destiny Reading"}
      description={"Tap facedown mystical tarot cards to physically flip them, reveal destiny arcana readings, and unlock photo cards!"}
    >
      <div className="max-w-2xl mx-auto px-4 pb-16 select-none">
        {/* TAROT CARDS SPREAD STAGE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {SPREAD.map((card, idx) => {
            const isFlipped = !!flippedCards[idx];
            const pIdx = photoSeeds[idx] % BHUNTU_PHOTOS.length;
            const photoUrl = BHUNTU_PHOTOS[pIdx] || BHUNTU_PHOTOS[0];

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                onClick={() => handleFlipCard(idx)}
                className="cursor-pointer perspective-1000 min-h-[280px]"
              >
                <div className={`relative w-full h-full transition-transform duration-700 rounded-3xl border-2 shadow-2xl p-4 flex flex-col items-center justify-between ${
                  isFlipped
                    ? 'bg-slate-950 border-purple-400/80 shadow-[0_0_30px_rgba(168,85,247,0.3)]'
                    : 'bg-gradient-to-b from-purple-950 via-slate-950 to-indigo-950 border-amber-400/50 hover:border-amber-300'
                }`}>
                  {isFlipped ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full space-y-3 flex flex-col items-center text-center">
                      <span className="text-[10px] font-mono font-black text-purple-300 uppercase tracking-wider">
                        {card.position}
                      </span>

                      {/* PHOTO CARD COVER */}
                      <div className="w-full h-36 rounded-2xl overflow-hidden border border-amber-300 shadow-md relative bg-black">
                        <img
                          src={photoUrl}
                          alt="Tarot Card Photo"
                          onError={(e) => handlePhotoError(e, pIdx)}
                          className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                        />
                      </div>

                      <h4 className="text-xs font-black text-amber-300">{card.arcana}</h4>
                      <p className="text-[11px] font-semibold text-gray-200 leading-relaxed italic">
                        "{card.reading}"
                      </p>
                    </motion.div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center space-y-4 py-8">
                      <div className="w-16 h-16 rounded-full bg-purple-900/40 border-2 border-amber-400/60 flex items-center justify-center text-3xl shadow-inner animate-pulse">
                        🔮
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-bold text-amber-300 block">
                          {card.position}
                        </span>
                        <span className="text-[11px] font-bold text-purple-200/80 block">
                          TAP TO FLIP CARD
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
          <button
            type="button"
            onClick={handleResetSpread}
            className="py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Shuffle & New Spread</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Tarot Spread</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
