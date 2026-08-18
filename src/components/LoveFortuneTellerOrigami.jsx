import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Wand2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CARDS = [
  { rank: '🂡 King of Hearts', title: 'Abu\'s Royal Promise', text: 'Abu promises to adore Queen Sanzu forever and ever.' },
  { rank: '🂾 Queen of Hearts', title: 'Sanzu\'s Golden Crown', text: 'You are the supreme queen of Abu\'s heart, ruling with love & grace.' },
  { rank: '🃏 The Joker', title: 'Playful Joy', text: 'Life with Abu is 100% full of laughs, chuckles, and cute silliness!' },
  { rank: '🃁 Ace of Spades', title: 'Unbreakable Bond', text: 'No distance between Nepal & Japan can ever break your celestial connection.' }
];

export default function LoveFortuneTellerOrigami() {
  const { triggerHaptic } = useAppStore();

  const [selectedCard, setSelectedCard] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePickCard = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    setSelectedCard(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setSelectedCard(null);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const card = selectedCard !== null ? CARDS[selectedCard] : CARDS[0];
    const text = `🪄 ABU'S MAGIC FORTUNE TELLER 🪄\n\nCard Picked: ${card.rank}\n"${card.title}" - ${card.text}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Magic Fortune Teller 🪄✨"
      badgeIcon={<Wand2 className="w-3.5 h-3.5 text-purple-400" />}
      title={"Magic Fortune Teller"}
      subtitle={"Abu's Magical Card Predictions for Sanzu"}
      description={"Pick a card to perform a magical love transformation and unlock secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* MAGIC CANVAS & PHOTO STAGE */}
        <div className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-purple-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center">
          {selectedCard !== null ? (
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full space-y-3">
              <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
                <img
                  src={currentPhoto}
                  alt="Fortune Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-600/30 border border-purple-400/60 text-purple-200 text-xs font-bold leading-relaxed">
                <span className="block font-extrabold text-amber-300 mb-1">{CARDS[selectedCard].rank} - {CARDS[selectedCard].title}</span>
                "{CARDS[selectedCard].text}"
              </div>
            </motion.div>
          ) : (
            <div className="py-8 space-y-3">
              <div className="w-24 h-24 rounded-full bg-purple-900/30 border-2 border-purple-300 mx-auto flex items-center justify-center text-4xl shadow-inner animate-pulse">
                🪄
              </div>
              <p className="text-xs font-extrabold text-purple-300 font-mono uppercase tracking-wider">
                PICK A MAGIC CARD
              </p>
              <div className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-300/40 text-xs font-bold inline-block">
                Choose a card deck below 🃏
              </div>
            </div>
          )}
        </div>

        {/* CARD GRID */}
        {selectedCard === null && (
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto mb-6">
            {CARDS.map((c, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePickCard(idx)}
                className="py-4 px-3 rounded-2xl bg-purple-900/40 border-2 border-purple-400 text-purple-200 font-extrabold text-xs shadow-md hover:bg-purple-800/60 cursor-pointer"
              >
                🂠 Card #{idx + 1}
              </button>
            ))}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          {selectedCard !== null && (
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Pick Another Card</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Fortune</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
