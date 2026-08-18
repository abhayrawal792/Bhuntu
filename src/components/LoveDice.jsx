import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dice6, Heart, Sparkles, Plus, Dices } from 'lucide-react';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const ACTIONS = [
  { text: 'Send a cute voice note saying "I love you Bebo"', emoji: '🎤' },
  { text: 'Write 3 things you love most about your partner', emoji: '📝' },
  { text: 'Record a 5-second selfie video with a funny face', emoji: '📸' },
  { text: 'Promise to cook their favorite meal next time you meet', emoji: '🍳' },
  { text: 'Send the cheesiest pickup line you can think of', emoji: '🧀' },
  { text: 'Tell your favorite memory of both of you', emoji: '💭' },
];

const TWISTS = [
  { text: '...in Nepali language! 🇳🇵', emoji: '💬' },
  { text: '...with a funny baby accent! 👶', emoji: '😜' },
  { text: '...while blowing a kiss to the camera! 💋', emoji: '😘' },
  { text: '...right this very second! ⚡', emoji: '⏰' },
  { text: '...with extra dramatic romance! 🎭', emoji: '🌹' },
  { text: '...and tag it with #ForeverBebo! 💖', emoji: '✨' },
];

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function LoveDice() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveDice;
  const { triggerHaptic } = useAppStore();

  const [rolling, setRolling] = useState(false);
  const [dice1Num, setDice1Num] = useState(1);
  const [dice2Num, setDice2Num] = useState(1);
  const [result, setResult] = useState(null);
  const [customDare, setCustomDare] = useState('');
  const [customList, setCustomList] = useState([]);

  const handleRoll = () => {
    if (rolling) return;
    setRolling(true);
    setResult(null);
    playSparkle();
    triggerHaptic([30, 60, 30, 60]);

    let count = 0;
    const interval = setInterval(() => {
      setDice1Num(Math.floor(Math.random() * 6) + 1);
      setDice2Num(Math.floor(Math.random() * 6) + 1);
      playPop();
      count++;

      if (count > 14) {
        clearInterval(interval);
        const idx1 = Math.floor(Math.random() * 6);
        const idx2 = Math.floor(Math.random() * 6);
        setDice1Num(idx1 + 1);
        setDice2Num(idx2 + 1);

        const actionObj = ACTIONS[idx1];
        const twistObj = TWISTS[idx2];

        setResult({ action: actionObj.text, twist: twistObj.text, emoji: actionObj.emoji });
        setRolling(false);
        playSparkle();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    }, 100);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customDare.trim()) return;
    setCustomList([...customList, customDare.trim()]);
    setCustomDare('');
    triggerHaptic(20);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center font-ui">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 font-bold text-xs mb-3 shadow-sm">
        <Dice6 className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Dual 3D Romantic Dare Dice 🎲</span>
      </div>

      <h1 className="text-2xl sm:text-4xl font-extrabold text-rose-600 font-nepali mb-2">
        {nepaliTitle}
      </h1>
      <h2 className="text-lg sm:text-2xl font-script text-pink-500 mb-3">{title}</h2>
      <p className="text-gray-600 text-xs sm:text-sm max-w-lg mx-auto mb-8">
        {nepaliSubtitle} — {subtitle}
      </p>

      {/* Felt Board with Dual 3D Dice */}
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-b from-rose-900 via-pink-900 to-rose-950 border-4 border-pink-300 shadow-2xl mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        <div className="flex justify-center items-center gap-6 mb-6">
          {/* Dice 1 (Action) */}
          <motion.div
            animate={{
              rotateX: rolling ? [0, 360, 720] : 0,
              rotateY: rolling ? [0, 360, 720] : 0,
              scale: rolling ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3, repeat: rolling ? Infinity : 0 }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border-4 border-pink-400 shadow-2xl flex flex-col items-center justify-center cursor-pointer select-none"
            onClick={handleRoll}
          >
            <span className="text-5xl text-rose-600">{DICE_FACES[dice1Num - 1]}</span>
            <span className="text-[11px] font-bold text-gray-400 mt-1 uppercase">Action</span>
          </motion.div>

          <span className="text-white text-2xl font-bold font-script">+</span>

          {/* Dice 2 (Twist) */}
          <motion.div
            animate={{
              rotateX: rolling ? [720, 360, 0] : 0,
              rotateY: rolling ? [720, 360, 0] : 0,
              scale: rolling ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3, repeat: rolling ? Infinity : 0 }}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 border-4 border-white text-white shadow-2xl flex flex-col items-center justify-center cursor-pointer select-none"
            onClick={handleRoll}
          >
            <span className="text-5xl text-white">{DICE_FACES[dice2Num - 1]}</span>
            <span className="text-[11px] font-bold text-pink-200 mt-1 uppercase">Twist</span>
          </motion.div>
        </div>

        <button
          onClick={handleRoll}
          disabled={rolling}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-xl transition-all cursor-pointer disabled:opacity-50"
        >
          {rolling ? 'Tumbling Dice... 🎲' : 'Roll Romantic Dice Pair! 🎲'}
        </button>
      </div>

      {/* Result Display Card */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-white border-2 border-pink-300 shadow-2xl max-w-md mx-auto mb-8"
          >
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2 text-xl">
              {result.emoji}
            </div>
            <h3 className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-2 font-ui">
              Your Romantic Combo Dare:
            </h3>
            <p className="font-nepali text-base font-bold text-gray-900 leading-snug mb-1">
              "{result.action}"
            </p>
            <p className="font-nepali text-sm font-semibold text-rose-600 mb-4">
              {result.twist}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <a
                href={`https://wa.me/9779708349123?text=${encodeURIComponent(`Hey Abu! 🎲 The Romantic Dare Dice rolled a dare for you:\n\n"${result.action} ${result.twist}"\n\nYou have to do it right now! ❤️`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>📲 Challenge Abu on WhatsApp</span>
              </a>

              <a
                href={`https://wa.me/9779708349123?text=${encodeURIComponent(`Hey Abu! 🎲 I just completed the Romantic Dare:\n\n"${result.action} ${result.twist}"\n\nHere is my proof / response for you! ❤️`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>✅ Complete Dare & Send to Abu</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Dare Creator */}
      <div className="max-w-md mx-auto p-5 rounded-3xl bg-pink-50/80 border border-pink-200">
        <h4 className="text-xs font-bold text-gray-700 mb-3 flex items-center justify-center gap-1">
          <Plus className="w-3.5 h-3.5 text-pink-500" /> Add Your Own Custom Dare:
        </h4>
        <form onSubmit={handleAddCustom} className="flex gap-2">
          <input
            type="text"
            value={customDare}
            onChange={(e) => setCustomDare(e.target.value)}
            placeholder="Type a sweet dare..."
            className="flex-1 px-4 py-2 rounded-xl bg-white border border-pink-200 text-xs font-ui focus:outline-none focus:border-rose-400"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-colors cursor-pointer"
          >
            Add
          </button>
        </form>

        {customList.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {customList.map((c, i) => (
              <div key={i} className="px-3 py-1.5 rounded-full bg-white text-rose-600 text-[11px] font-bold border border-pink-200 flex items-center gap-2">
                <span>✨ {c}</span>
                <a
                  href={`https://wa.me/9779708349123?text=${encodeURIComponent(`Hey Abu! 🎲 I just completed our custom dare:\n\n"${c}"\n\n- Sending to you on WhatsApp! ❤️`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold hover:bg-emerald-600 cursor-pointer"
                >
                  Send to Abu 📲
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
