import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const DIARY_ENTRIES = [
  { date: 'The Day We Met 💫', text: "I didn't know my life was about to change forever. Sanzu Rawal walked into my world, and everything suddenly made sense. My heart whispered — this is the one.", icon: '✨' },
  { date: 'First Butterflies 🦋', text: "My stomach was doing flips every time I saw your name pop up on my phone. I'd re-read your messages a hundred times, smiling like a fool.", icon: '📱' },
  { date: 'First Fight & Makeup 💋', text: "We argued. I thought it was over. But then you messaged first, and I realized — real love doesn't give up. We came back stronger.", icon: '💪' },
  { date: 'Long Distance Begins 🌏', text: "Saying goodbye at the airport was the hardest thing I've ever done. But we promised each other — distance is just a test, not a punishment.", icon: '✈️' },
  { date: 'Midnight Calls 🌙', text: "3 AM conversations about everything and nothing. Your sleepy voice is my favorite lullaby. I fall asleep feeling like you're right beside me.", icon: '🌙' },
  { date: 'Today & Always 💖', text: "Happy Birthday Bebo! Every chapter of our diary leads to the same conclusion — you are my forever person. I love you more than all the stars combined.", icon: '⭐' }
];

export default function LoveDiary() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveDiary;
  const [page, setPage] = useState(0);
  const { triggerHaptic } = useAppStore();

  const handleFlip = (dir) => {
    playSparkle();
    triggerHaptic(15);
    if (dir === 'next' && page < DIARY_ENTRIES.length - 1) setPage(p => p + 1);
    if (dir === 'prev' && page > 0) setPage(p => p - 1);
  };

  const entry = DIARY_ENTRIES[page];

  return (
    <WorldShell
      theme="paper"
      badge="Couple Diary Journal 📔"
      badgeIcon={<BookOpen className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="text-xs text-gray-400 font-ui mb-4">Page {page + 1} of {DIARY_ENTRIES.length}</div>

      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, rotateY: 90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 shadow-2xl relative min-h-[280px] flex flex-col justify-center"
          style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e5d4b0 28px)', backgroundSize: '100% 28px' }}>
          <div className="absolute top-4 left-4 text-2xl">{entry.icon}</div>
          <div className="absolute top-4 right-4 text-2xl">📔</div>
          <h3 className="font-bold font-nepali text-rose-600 text-lg mb-3 mt-4">{entry.date}</h3>
          <p className="font-ui text-sm text-gray-800 leading-relaxed italic">"{entry.text}"</p>
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400 mx-auto mt-4" />
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={() => handleFlip('prev')} disabled={page === 0}
          className="p-3 rounded-full bg-amber-200 text-amber-800 cursor-pointer hover:bg-amber-300 disabled:opacity-30">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-gray-500 font-ui">Flip Pages</span>
        <button onClick={() => handleFlip('next')} disabled={page === DIARY_ENTRIES.length - 1}
          className="p-3 rounded-full bg-amber-200 text-amber-800 cursor-pointer hover:bg-amber-300 disabled:opacity-30">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </WorldShell>
  );
}
