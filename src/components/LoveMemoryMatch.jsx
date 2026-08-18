import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Trophy, RotateCcw, Volume2, Send, Sparkles, Image as ImageIcon, BookOpen } from 'lucide-react';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MEMORY_PAIRS = [
  {
    id: 1,
    title: "Light Blue Scooter Ride 🛵",
    photoIdx: 0,
    story: "Riding through Bardiya on our light blue scooter, feeling the cool breeze and laughing together!"
  },
  {
    id: 2,
    title: "Hot Chiya & Momo Date ☕",
    photoIdx: 25,
    story: "Late night sweet tea and hot momos in Nepalgunj with my favorite person in the world."
  },
  {
    id: 3,
    title: "Nepalgunj to Osaka (4,800 km) 🌏",
    photoIdx: 52,
    story: "4,800 km distance cannot separate our hearts. Every second brings us closer to being together."
  },
  {
    id: 4,
    title: "Sweet Home Kiddos Memory 🏡",
    photoIdx: 78,
    story: "Spending precious moments at sweet home with 30-40 kiddos, sharing smiles and love!"
  }
];

const createBoard = () => {
  const cards = [];
  MEMORY_PAIRS.forEach((pair) => {
    cards.push({ cardId: `${pair.id}-photo`, pairId: pair.id, type: 'photo', title: pair.title, photoIdx: pair.photoIdx, story: pair.story, flipped: false, matched: false });
    cards.push({ cardId: `${pair.id}-story`, pairId: pair.id, type: 'story', title: pair.title, photoIdx: pair.photoIdx, story: pair.story, flipped: false, matched: false });
  });

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
};

export default function LoveMemoryMatch() {
  const { triggerHaptic } = useAppStore();

  const [cards, setCards] = useState(createBoard);
  const [flipped, setFlipped] = useState([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [unlockedMemory, setUnlockedMemory] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCardClick = (index) => {
    if (won) return;
    const card = cards[index];
    if (card.flipped || card.matched || flipped.length >= 2) return;

    playSparkle();
    triggerHaptic(15);

    const updated = [...cards];
    updated[index] = { ...card, flipped: true };
    const newFlipped = [...flipped, index];
    setCards(updated);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = updated[firstIdx];
      const secondCard = updated[secondIdx];

      if (firstCard.pairId === secondCard.pairId && firstCard.type !== secondCard.type) {
        playBloom();
        setUnlockedMemory(firstCard);
        setTimeout(() => {
          const matchedState = [...updated];
          matchedState[firstIdx] = { ...matchedState[firstIdx], matched: true };
          matchedState[secondIdx] = { ...matchedState[secondIdx], matched: true };
          setCards(matchedState);
          setFlipped([]);
          const nextMatches = matches + 1;
          setMatches(nextMatches);

          if (nextMatches === MEMORY_PAIRS.length) {
            setWon(true);
            confetti({ particleCount: 250, spread: 110, origin: { y: 0.5 } });
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetState = [...updated];
          resetState[firstIdx] = { ...resetState[firstIdx], flipped: false };
          resetState[secondIdx] = { ...resetState[secondIdx], flipped: false };
          setCards(resetState);
          setFlipped([]);
        }, 900);
      }
    }
  };

  const handleSpeakVoice = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    playSparkle();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleReset = () => {
    playPop();
    setCards(createBoard());
    setFlipped([]);
    setMatches(0);
    setMoves(0);
    setWon(false);
    setUnlockedMemory(null);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Photo & Story Memory Match 📸📜"
      badgeIcon={<BookOpen className="w-3.5 h-3.5 text-rose-500 animate-bounce" />}
      title="Bhuntu's Photo & Story Memory Matcher 📸"
      subtitle="Match real Polaroid photos of Bhuntu with their matching love stories to unlock our special memories!"
      description="100% interactive photo & memory story match game with voice reading & WhatsApp sharing!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* Stats Header */}
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-3.5 rounded-2xl border border-rose-200 shadow-sm text-xs font-bold text-gray-700">
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700">
            📸 Memories Matched: {matches} / {MEMORY_PAIRS.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            🎯 Moves: {moves}
          </span>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center gap-1 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart 🎲
          </button>
        </div>

        {/* CARDS GRID */}
        {!won ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto">
            {cards.map((card, idx) => (
              <motion.button
                key={card.cardId}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => handleCardClick(idx)}
                className={`relative h-32 rounded-2xl cursor-pointer shadow-lg overflow-hidden border-2 transition-all flex flex-col items-center justify-center p-2 text-center ${
                  card.matched
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-200/50'
                    : card.flipped
                    ? 'bg-white border-rose-300 text-gray-800 shadow-pink-200/50'
                    : 'bg-gradient-to-br from-rose-600 via-pink-600 to-rose-700 border-pink-300 text-white'
                }`}
              >
                {card.flipped || card.matched ? (
                  card.type === 'photo' ? (
                    <div className="w-full h-full relative rounded-xl overflow-hidden">
                      <img
                        src={BHUNTU_PHOTOS[card.photoIdx % BHUNTU_PHOTOS.length]}
                        onError={e => handlePhotoError(e, card.photoIdx)}
                        alt="Photo Card"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-[9px] font-black text-amber-200 truncate">
                        📸 {card.title}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 h-full text-left">
                      <BookOpen className="w-4 h-4 text-rose-500 mb-1" />
                      <span className="text-[10px] font-black text-rose-900 leading-tight">
                        {card.title}
                      </span>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center gap-1">
                    {card.type === 'photo' ? <ImageIcon className="w-6 h-6 text-pink-200 animate-pulse" /> : <BookOpen className="w-6 h-6 text-pink-200 animate-pulse" />}
                    <span className="text-[10px] font-black tracking-wider text-pink-100 uppercase">
                      {card.type === 'photo' ? 'PHOTO CARD' : 'STORY CARD'}
                    </span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        ) : (
          /* WIN CELEBRATION BOX */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-6 sm:p-8 rounded-3xl border-4 border-rose-400 bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-2xl text-center space-y-4 max-w-md mx-auto"
          >
            <Trophy className="w-14 h-14 text-amber-300 mx-auto animate-bounce" />
            <h3 className="text-2xl font-black font-nepali">
              ALL PHOTO & STORY MEMORIES MATCHED! 📸💖
            </h3>
            <p className="text-xs text-pink-100 leading-relaxed font-ui">
              You matched all photos with their real stories in {moves} moves!
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-full bg-white text-rose-600 font-extrabold text-xs shadow-lg hover:bg-pink-50 cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Memories 📸
            </button>
          </motion.div>
        )}

        {/* UNLOCKED MEMORY BANNER */}
        {unlockedMemory && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-card p-5 rounded-3xl border-2 border-rose-300 bg-amber-50/95 shadow-xl max-w-md mx-auto text-left space-y-3"
          >
            <div className="flex items-center justify-between border-b border-amber-200 pb-2">
              <h4 className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Unlocked Memory: {unlockedMemory.title}</span>
              </h4>

              <button
                onClick={() => handleSpeakVoice(unlockedMemory.story)}
                className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-all ${
                  isSpeaking ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Voice Read 🎙️</span>
              </button>
            </div>

            <p className="text-xs font-bold text-amber-900 leading-relaxed italic">
              "{unlockedMemory.story}"
            </p>
          </motion.div>
        )}

        {/* ALWAYS VISIBLE WHATSAPP SENDER */}
        <div className="max-w-md mx-auto">
          <button
            onClick={() => {
              const memoryText = unlockedMemory ? unlockedMemory.story : "Riding through Bardiya on our light blue scooter & hot chiya in Nepalgunj!";
              sendWhatsAppMessage(`📸 Hey Abu! I matched our real photos & love memories on our site!\n\n"${memoryText}"\n\n❤️ Forever matched in love! ✨`, '📸 Photo & Story Memory Match');
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-ui"
          >
            <Send className="w-4 h-4 fill-white animate-bounce" />
            <span>Send Matched Memory to Abu on WhatsApp 📲</span>
          </button>
        </div>

      </div>
    </WorldShell>
  );
}
