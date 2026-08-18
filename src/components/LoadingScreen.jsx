import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, Music, KeyRound, LockKeyhole, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

const petals = ['🌸', '🌹', '💗', '✨', '🌺', '💕'];

export default function LoadingScreen({ onStart }) {
  const [floats, setFloats] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [password, setPassword] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [feedback, setFeedback] = useState('The first door opens only for the name you gave Abu.');
  const [isChecking, setIsChecking] = useState(false);

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    const normalized = password.trim().toLowerCase();
    if (!normalized) {
      setFeedback('Type the nickname you gave Abhay.');
      return;
    }
    setIsChecking(true);
    window.setTimeout(() => {
      if (normalized === 'bhuntu') {
        setFeedback('Correct. Abu’s birthday world is opening for you.');
        onStart();
        return;
      }
      const nextAttempts = wrongAttempts + 1;
      setWrongAttempts(nextAttempts);
      setPassword('');
      setIsChecking(false);
      if (nextAttempts >= 8) {
        setFeedback('The real password is: Bhuntu. Abu knew your nickname would open the door.');
      } else if (nextAttempts >= 5) {
        setFeedback('Tip from Abu: the password is your nickname for him.');
      } else {
        setFeedback(`Not this one, Babe. Attempt ${nextAttempts} of 8.`);
      }
    }, 350);
  };

  useEffect(() => {
    const items = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      emoji: petals[i % petals.length],
      left: `${5 + Math.random() * 90}%`,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 3,
      size: 14 + Math.random() * 14,
    }));
    setFloats(items);
    
    // Staggered content reveal
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF0F3] via-[#FAF8F8] to-[#FFE5EC] overflow-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 24px)',
      }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink-300/25 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-rose-200/35 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
        />
        {floats.map(f => (
          <motion.span
            key={f.id}
            className="absolute"
            style={{ left: f.left, top: -20, fontSize: f.size }}
            initial={{ y: -20, opacity: 0.8 }}
            animate={{ y: '110vh', opacity: 0, rotate: 360 }}
            transition={{ duration: f.duration, delay: f.delay, ease: 'linear', repeat: Infinity, repeatDelay: 2 }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-xs sm:max-w-sm mx-auto flex flex-col items-center px-6 text-center">

        {/* Animated Heart with pulse ring */}
        <motion.div
          className="relative mb-7"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 12, delay: 0.1 }}
        >
          {/* Pulse ring behind */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 opacity-30 blur-xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 p-1 shadow-2xl shadow-pink-400/40 flex items-center justify-center animate-heartbeat">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-4 border-pink-100">
              <Heart className="w-14 h-14 text-rose-500 fill-rose-500" />
            </div>
          </div>
          <motion.div
            className="absolute -top-2 -right-2 bg-pink-100 text-rose-500 p-1.5 rounded-full border border-pink-200 shadow"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </motion.div>

        {/* Title - Nepali name */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.h1
              className="text-3xl sm:text-4xl font-extrabold font-nepali text-gray-900 mb-1 leading-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {birthdayData.person.nepaliName}
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showContent && (
            <motion.p
              className="text-xs font-bold tracking-widest uppercase text-rose-500 mb-2 font-ui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45 }}
            >
              {birthdayData.hero.badge}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showContent && (
            <motion.p
              className="text-gray-500 text-sm font-handwriting text-lg max-w-xs mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.6 }}
            >
              "A sweet birthday surprise, made with all my love..."
            </motion.p>
          )}
        </AnimatePresence>

        {/* Password gate — Bhuntu is the only key to page two */}
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.form
              onSubmit={handlePasswordSubmit}
              className="w-full rounded-3xl border border-pink-200/80 bg-white/75 p-4 shadow-xl shadow-pink-200/30 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.75, type: 'spring', stiffness: 200 }}
            >
              <div className="mb-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500"><LockKeyhole className="h-3.5 w-3.5" /> Page 1 is locked for Samjhana</div>
              <label htmlFor="bhuntu-password" className="mb-2 block text-sm font-bold text-gray-800">Enter the nickname you gave Abu</label>
              <div className="flex gap-2"><div className="relative flex-1"><KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-rose-400" /><input id="bhuntu-password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="off" placeholder="Your secret nickname" className="w-full rounded-2xl border border-pink-200 bg-white px-10 py-3 text-sm font-bold text-gray-900 outline-none ring-rose-300 placeholder:text-gray-400 focus:ring-2" /></div><button type="submit" disabled={isChecking} className="rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 px-4 py-3 text-xs font-black text-white shadow-lg transition hover:scale-[1.02] disabled:opacity-60">{isChecking ? 'Checking…' : 'Unlock'}</button></div>
              <p className={`mt-3 text-xs leading-5 ${wrongAttempts >= 5 ? 'font-bold text-rose-600' : 'text-gray-500'}`}>{feedback}</p>
              {wrongAttempts >= 8 && <p className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-rose-100 px-3 py-2 text-xs font-black text-rose-700"><ShieldCheck className="h-4 w-4" /> Password revealed: Bhuntu</p>}
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">{wrongAttempts} / 8 attempts used</p>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {showContent && (
            <motion.p
              className="text-[11px] text-gray-400 mt-5 font-ui flex items-center gap-1.5 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Sound will begin when you enter</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
