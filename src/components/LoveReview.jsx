import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Heart, Send } from 'lucide-react';
import WorldShell from './WorldShell';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const CATEGORIES = [
  { name: 'Video Call Hugs & Care 🫂', emoji: '🥰', desc: 'How caring is Abu on late-night video calls from Nepalgunj to Osaka?' },
  { name: 'Hand-Feeding Food 🍜🤲', emoji: '🍜', desc: 'How sweet is Abu when he promises to feed you Chau-chau & Panipuri with his own hands?' },
  { name: 'Movie Theater Hand-Holding 🎬🍿', emoji: '🍿', desc: 'How romantic is Abu holding your hand tight through the entire film?' },
  { name: 'Back-Seat Scooter Passenger 🛵💙', emoji: '🛵', desc: 'How great is Abu sitting behind you on your light blue scooter all the way to Bardiya?' },
  { name: 'Honeymoon & Future Together 🏔️💍', emoji: '🏔️', desc: 'How excited are you for your honeymoon trip to Pokhara, Manang & Mustang with Abu?' },
  { name: 'Overall Boyfriend Score 💖👑', emoji: '💕', desc: 'Rate Abu as your overall boyfriend, best friend & future together!' }
];

export default function LoveReview() {
  const { triggerHaptic } = useAppStore();
  // Default 5 stars on all categories so button is instantly ready!
  const [ratings, setRatings] = useState({
    'Video Call Hugs & Care 🫂': 5,
    'Hand-Feeding Food 🍜🤲': 5,
    'Movie Theater Hand-Holding 🎬🍿': 5,
    'Back-Seat Scooter Passenger 🛵💙': 5,
    'Honeymoon & Future Together 🏔️💍': 5,
    'Overall Boyfriend Score 💖👑': 5,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleRate = (cat, stars) => {
    if (submitted) return;
    playSparkle();
    triggerHaptic(15);
    setRatings(prev => ({ ...prev, [cat]: stars }));
  };

  const handleSubmit = () => {
    playSparkle();
    triggerHaptic([50, 100, 50]);
    setSubmitted(true);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
  };

  const avg = (Object.values(ratings).reduce((a, b) => a + b, 0) / Object.keys(ratings).length).toFixed(1);

  return (
    <WorldShell
      theme="sweet"
      badge="Rate Your Boyfriend Abu ⭐"
      badgeIcon={<Star className="w-3.5 h-3.5 text-amber-500" />}
      title="Rate Your Sweetheart Abu ⭐"
      subtitle="Rate Abu as Your Boyfriend & Future Together!"
      description="Tap the stars below to rate Abu for video calls, hand-feeding, light blue scooter ride & Pokhara honeymoon!"
    >
      <div className="space-y-3 max-w-md mx-auto mb-6 text-left font-ui">
        {CATEGORIES.map((cat) => (
          <div key={cat.name} className="p-3.5 rounded-2xl bg-white border-2 border-amber-200 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-xs font-bold text-gray-900">{cat.name}</span>
            </div>
            <p className="text-[11px] text-gray-500 mb-2 leading-tight">{cat.desc}</p>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => handleRate(cat.name, s)}
                  className="cursor-pointer active:scale-120 transition-transform p-0.5"
                >
                  <Star className={`w-6 h-6 ${(ratings[cat.name] || 0) >= s ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm font-bold text-gray-700 font-ui mb-4">
        Abu's Overall Score: <span className="text-amber-500 text-xl font-black">{avg} / 5 ⭐</span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitted}
        className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-extrabold text-sm shadow-xl hover:scale-105 transition-transform cursor-pointer font-ui flex items-center gap-2 mx-auto disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        <span>{submitted ? 'Review Submitted! 🌟' : 'Submit Boyfriend Review ✨'}</span>
      </button>

      {submitted && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-2xl max-w-sm mx-auto text-center"
        >
          <Heart className="w-10 h-10 text-rose-500 fill-rose-500 mx-auto mb-2 animate-bounce" />
          <h3 className="text-lg font-extrabold font-nepali text-rose-600 mb-1">
            Abu Earned a {avg}/5 Star Rating! 🏆
          </h3>
          <p className="text-xs text-gray-600 font-ui mb-4">
            Certified: World's Best Boyfriend & Future Together for Sanzu! 💕
          </p>

          <a
            href={`https://wa.me/9779708349123?text=${encodeURIComponent(`Hey Abu! ⭐ I just rated you as my boyfriend on our website:\n\nYou got a PERFECT ${avg}/5 STAR RATING as my partner & future together! 🏆❤️`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer font-ui"
          >
            <span>📲 Send Boyfriend Rating to Abu on WhatsApp</span>
          </a>
        </motion.div>
      )}
    </WorldShell>
  );
}
