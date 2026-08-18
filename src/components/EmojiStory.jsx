import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Smile, Check, X as XIcon } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const STORIES = [
  { emojis: '👦💌✈️🇯🇵👩', answer: 'Boy sends letter, flies to Japan, meets girl', options: ['Boy sends letter, flies to Japan, meets girl', 'Girl flies to Nepal for vacation', 'Two strangers meet at airport'] },
  { emojis: '📱🌙💬💕😴', answer: 'Late night phone call, sweet talk, fall asleep', options: ['Texting during class', 'Late night phone call, sweet talk, fall asleep', 'Watching movie together'] },
  { emojis: '💍🧎‍♂️👰🏠👶', answer: 'Proposal, wedding, home, family', options: ['Shopping for rings', 'Proposal, wedding, home, family', 'Moving to new city'] }
];

export default function EmojiStory() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.emojiStory;
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const { triggerHaptic } = useAppStore();

  const story = STORIES[currentQ];
  const isCorrect = selected !== null && story.options[selected] === story.answer;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    triggerHaptic(20);
    if (story.options[idx] === story.answer) {
      playSparkle();
      setScore(s => s + 1);
      if (currentQ === STORIES.length - 1) confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleNext = () => {
    if (currentQ < STORIES.length - 1) {
      setCurrentQ(q => q + 1);
      setSelected(null);
    }
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Emoji Story Decoder 😍"
      badgeIcon={<Smile className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      <div className="text-xs font-bold text-gray-500 font-ui mb-4">Story {currentQ + 1} of {STORIES.length} • Score: {score}/{STORIES.length}</div>

      <div className="p-6 rounded-3xl bg-white border-2 border-pink-300 shadow-xl max-w-md mx-auto mb-6">
        <div className="text-4xl tracking-widest mb-4">{story.emojis}</div>
        <p className="text-xs font-bold text-gray-500 font-ui mb-4">What does this emoji story mean?</p>
        <div className="space-y-2">
          {story.options.map((opt, idx) => {
            const isThis = selected === idx;
            const correct = opt === story.answer;
            return (
              <button key={idx} onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3 rounded-xl text-xs font-bold font-ui border-2 cursor-pointer flex items-center justify-between transition-all ${
                  selected !== null ? (correct ? 'bg-green-500 text-white border-green-500' : isThis ? 'bg-rose-500 text-white border-rose-500' : 'bg-gray-50 text-gray-500 border-gray-200') : 'bg-white text-gray-800 border-pink-200 hover:bg-pink-50'
                }`}>
                <span>{opt}</span>
                {selected !== null && correct && <Check className="w-4 h-4" />}
                {isThis && !correct && <XIcon className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>

      {selected !== null && currentQ < STORIES.length - 1 && (
        <button onClick={handleNext} className="px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-xs shadow-lg cursor-pointer font-ui">Next Story →</button>
      )}
    </WorldShell>
  );
}
