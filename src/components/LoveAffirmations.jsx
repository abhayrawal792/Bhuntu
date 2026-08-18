import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCw, Bookmark } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const CARDS = [
  {
    text: "Sanzu, you are the most beautiful soul I have ever known. Your kindness lights up my whole world. 💕",
    nepali: "Sanzu, temi jasto sundar aatma malai aaile samma bhetiyeko chhaina. Temro dayalu swabhaab le mero sansar ujyaalo banauxa.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    text: "Bebo, your smile can cure any sadness — even from 4,650 km away in Japan. ☀️",
    nepali: "Bebo, temro muskan le dherai tadha bata pani sabai dukha harauxa — Japan bata Nepalgunj samma.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    text: "You are stronger than you think, braver than you feel, and loved more than you'll ever know, my Bhuntu. 🌸",
    nepali: "Timi jati sochxau tyaa bhanda baliyo xau, jati feel garxau tyaa bhanda bahadur xau, Bhuntu.",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    text: "Every morning I wake up grateful that you exist in my life, Fuchhee. You are my everything. 💖",
    nepali: "Bihana uthda nai ma dhanyabaad manxu ki temi mero jeeban ma xau, Fuchhee. Temi nai mero sab kura hou.",
    gradient: "from-pink-500 to-fuchsia-600",
  },
  {
    text: "The way you laugh, get angry, and then forgive me — that's the purest love I've ever felt, Bebo. ❤️",
    nepali: "Timi jasari hasxau, risauxau, ra maaf garxau — tyahi ho sacchcha maya, Bebo.",
    gradient: "from-rose-600 to-red-500",
  },
  {
    text: "You are my home, my safe place, and my forever person. I choose you every single day, Sanuu. 🏡",
    nepali: "Temi mero ghar hou, mero surakshit thaaun, ra mero sadhai ko manxe. Ma temlaai dherai dherai roojxu, Sanuu.",
    gradient: "from-sky-500 to-blue-600",
  },
  {
    text: "Distance means nothing when someone means everything. You mean the whole universe to me. 🌌",
    nepali: "Duri le kehi matlab raakhdaina jaba koi sab kura hunxa. Temi mero lagi purai brahmanda hou.",
    gradient: "from-indigo-500 to-violet-600",
  },
  {
    text: "I promise to love your flaws, celebrate your strengths, and hold your hand through every storm, Runchee. 🌹",
    nepali: "Ma temro kamjori lai maya garnexu, shakti lai manaunexu, ra har aandhi ma haath samaaunexu, Runchee.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    text: "When the world gets heavy, remember: you have someone across the ocean who would move mountains for you. ⛰️",
    nepali: "Jaba sansar garo lagxa, samjha: samundra pari koi xa jasle temro lagi pahad hatauna sakxa.",
    gradient: "from-amber-600 to-yellow-500",
  },
  {
    text: "You don't need to be perfect, Bebo. You just need to be you — and that's already more than enough. 💗",
    nepali: "Timi perfect huna pardaina, Bebo. Timi bas timi bhai deu — tyati nai dherai xa.",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    text: "Our love story isn't written in miles — it's written in every 'good morning' text, every late-night call, and every 'I miss you'. 📱",
    nepali: "Hamro prem kahani mile ma lekhiyeko hoina — har 'good morning' text, raat ko call, ra 'I miss you' ma lekhiyeko ho.",
    gradient: "from-fuchsia-500 to-pink-600",
  },
  {
    text: "One day, I'll hold your hand and never let go. Until then, know that my heart is permanently locked to yours, Sanzu Rawal. 💍",
    nepali: "Ek din, ma temro haath samaaunexu ra kaile xoddina. Tyaa samma, jaana ki mero mutu temro sanga sadhai lai taalieko xa, Sanzu Rawal.",
    gradient: "from-rose-500 to-red-600",
  },
];

export default function LoveAffirmations() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.affirmations;
  const [cardIndex, setCardIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [flipped, setFlipped] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleDraw = () => {
    playSparkle();
    triggerHaptic(20);
    setFlipped(false);
    setCardIndex((prev) => (prev + 1) % CARDS.length);
  };

  const handleFlip = () => {
    triggerHaptic(15);
    setFlipped(!flipped);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    playSparkle();
    triggerHaptic([20, 40]);
    const next = new Set(favorites);
    if (next.has(cardIndex)) next.delete(cardIndex);
    else next.add(cardIndex);
    setFavorites(next);
  };

  const card = CARDS[cardIndex];

  return (
    <WorldShell
      theme="sweet"
      badge="Daily Love Affirmation Cards 🃏"
      badgeIcon={<Sparkles className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Card Counter */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-[11px] font-bold">
          Card {cardIndex + 1} of {CARDS.length}
        </span>
        {favorites.size > 0 && (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-[11px] font-bold flex items-center gap-1">
            <Bookmark className="w-3 h-3" /> {favorites.size} saved
          </span>
        )}
      </div>

      {/* Affirmation Card with Flip */}
      <div className="perspective-[800px] max-w-md mx-auto mb-6" onClick={handleFlip}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${cardIndex}-${flipped}`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
            className={`rounded-3xl p-8 shadow-2xl border-2 border-white/30 cursor-pointer relative overflow-hidden min-h-[200px] flex flex-col justify-center ${
              flipped
                ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-white'
                : `bg-gradient-to-br ${card.gradient} text-white`
            }`}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />

            {/* Favorite Button */}
            <button
              onClick={handleFavorite}
              className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all"
            >
              <Bookmark className={`w-4 h-4 ${favorites.has(cardIndex) ? 'fill-amber-300 text-amber-300' : 'text-white/70'}`} />
            </button>

            <div className="relative z-10">
              {!flipped ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-10 h-10 fill-white/30 text-white mx-auto mb-4" />
                  </motion.div>
                  <p className="font-ui text-sm sm:text-base font-bold leading-relaxed mb-3">
                    "{card.text}"
                  </p>
                  <p className="text-[11px] opacity-70 font-ui">Tap card to see Nepali version 💕</p>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-4" />
                  </motion.div>
                  <p className="font-nepali text-sm sm:text-base font-bold leading-relaxed mb-3 text-amber-100">
                    "{card.nepali}"
                  </p>
                  <p className="text-[11px] opacity-70 font-ui text-slate-300">Tap to flip back 🔄</p>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Draw Button */}
      <button
        onClick={handleDraw}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-lg flex items-center gap-2 mx-auto cursor-pointer font-ui hover:scale-105 transition-transform"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Draw Next Affirmation Card ✨</span>
      </button>

      {/* Card dots */}
      <div className="flex items-center justify-center gap-1 mt-4 flex-wrap max-w-xs mx-auto">
        {CARDS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === cardIndex
                ? 'bg-rose-500 scale-125'
                : favorites.has(i)
                  ? 'bg-amber-400'
                  : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </WorldShell>
  );
}
