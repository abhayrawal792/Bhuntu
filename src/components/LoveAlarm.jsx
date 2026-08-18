import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Clock, BellRing, Heart, Moon, Sun, MessageCircle } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const MESSAGES = [
  "Good morning my queen! I love you more than yesterday! 👑",
  "Rise and shine, Bebo! Today is going to be beautiful because you exist! 🌸",
  "Ohayo Sanzu! May your day be as sweet as your smile! 😍",
  "Good morning Fuchee! I fell asleep thinking of you 💕",
  "Wake up jaan! The sun is jealous of your glow today! ☀️",
  "Subha prabhat meri Sanuu! Another day to love you! 🌹",
  "Good morning babu! Your smile is my favorite alarm! 💖",
  "GM Bebo! Every sunrise reminds me why I'm lucky! 🌅",
];

const ALARM_SOUNDS = [
  { name: '🎵 Gentle Bells', icon: '🔔' },
  { name: '🎶 Love Song', icon: '🎵' },
  { name: '💖 Heartbeat', icon: '💓' },
  { name: '🌸 Wind Chimes', icon: '🎐' },
];

export default function LoveAlarm() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveAlarm;
  const [hours, setHours] = useState(8);
  const [minutes, setMinutes] = useState(0);
  const [alarmSet, setAlarmSet] = useState(false);
  const [ringing, setRinging] = useState(false);
  const [selectedSound, setSelectedSound] = useState(0);
  const [message, setMessage] = useState(MESSAGES[0]);
  const [customMsg, setCustomMsg] = useState('');
  const [showMsgPicker, setShowMsgPicker] = useState(false);
  const { triggerHaptic } = useAppStore();

  // clock face animation
  const hourAngle = ((hours % 12) + minutes / 60) * 30;
  const minuteAngle = minutes * 6;

  const handleSetAlarm = () => {
    playSparkle();
    triggerHaptic([40, 80, 40]);
    setAlarmSet(true);
    // simulate ringing after 3 seconds
    setTimeout(() => {
      setRinging(true);
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    }, 3000);
  };

  const handleSnooze = () => {
    playSparkle();
    setRinging(false);
    setAlarmSet(false);
  };

  const adjustTime = (type, delta) => {
    playSparkle();
    if (type === 'h') setHours(h => (h + delta + 12) % 12 || 12);
    else setMinutes(m => (m + delta + 60) % 60);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Morning Love Alarm Clock ⏰"
      badgeIcon={<Clock className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {!ringing ? (
        <div className="max-w-sm mx-auto p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-4 border-pink-400 shadow-2xl text-white mb-6">
          {/* Analog Clock Face */}
          <div className="relative w-40 h-40 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-slate-700 border-4 border-pink-300 shadow-inner">
              {/* hour markers */}
              {[...Array(12)].map((_, i) => (
                <div key={i} className="absolute w-full h-full"
                  style={{ transform: `rotate(${i * 30}deg)` }}>
                  <div className={`absolute top-1 left-1/2 -translate-x-1/2 rounded-full ${
                    i % 3 === 0 ? 'w-2 h-2 bg-pink-400' : 'w-1 h-1 bg-slate-400'
                  }`} />
                </div>
              ))}
              {/* hour hand */}
              <div className="absolute top-1/2 left-1/2 origin-bottom"
                style={{ transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`, width: '4px', height: '35%', background: 'linear-gradient(to top, #ec4899, #f472b6)', borderRadius: '4px' }}
              />
              {/* minute hand */}
              <div className="absolute top-1/2 left-1/2 origin-bottom"
                style={{ transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`, width: '2px', height: '42%', background: 'white', borderRadius: '4px' }}
              />
              {/* center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink-500 border-2 border-white z-10" />
            </div>
          </div>

          {/* Digital Time Display */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex flex-col items-center">
              <button onClick={() => adjustTime('h', 1)} className="text-pink-300 text-lg cursor-pointer hover:text-pink-100 transition-colors">▲</button>
              <span className="text-4xl font-extrabold font-mono text-pink-400 w-16 text-center">{String(hours).padStart(2, '0')}</span>
              <button onClick={() => adjustTime('h', -1)} className="text-pink-300 text-lg cursor-pointer hover:text-pink-100 transition-colors">▼</button>
            </div>
            <span className="text-4xl font-extrabold text-pink-400 animate-pulse">:</span>
            <div className="flex flex-col items-center">
              <button onClick={() => adjustTime('m', 5)} className="text-pink-300 text-lg cursor-pointer hover:text-pink-100 transition-colors">▲</button>
              <span className="text-4xl font-extrabold font-mono text-pink-400 w-16 text-center">{String(minutes).padStart(2, '0')}</span>
              <button onClick={() => adjustTime('m', -5)} className="text-pink-300 text-lg cursor-pointer hover:text-pink-100 transition-colors">▼</button>
            </div>
            <span className="text-lg font-bold text-slate-400 ml-2">AM</span>
          </div>

          {/* Alarm Sound Picker */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {ALARM_SOUNDS.map((s, i) => (
              <button key={i} onClick={() => { setSelectedSound(i); playSparkle(); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  selectedSound === i ? 'bg-pink-500 text-white shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}>
                {s.icon}
              </button>
            ))}
          </div>

          {/* Message Picker */}
          <button onClick={() => setShowMsgPicker(!showMsgPicker)}
            className="w-full px-4 py-2 rounded-xl bg-slate-700 text-xs text-slate-300 cursor-pointer hover:bg-slate-600 mb-3 flex items-center justify-center gap-2">
            <MessageCircle className="w-3 h-3" />
            <span className="truncate">{message.substring(0, 40)}...</span>
          </button>

          <AnimatePresence>
            {showMsgPicker && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-3">
                <div className="max-h-32 overflow-y-auto rounded-xl bg-slate-800 p-2 space-y-1">
                  {MESSAGES.map((m, i) => (
                    <button key={i} onClick={() => { setMessage(m); setShowMsgPicker(false); playSparkle(); }}
                      className="w-full text-left p-2 rounded-lg text-[11px] text-slate-300 hover:bg-pink-900/30 cursor-pointer transition-colors">
                      {m}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Set Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSetAlarm}
            disabled={alarmSet}
            className={`w-full py-3 rounded-full font-bold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all ${
              alarmSet ? 'bg-green-500 text-white animate-pulse' : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
            }`}
          >
            <BellRing className="w-4 h-4" />
            <span>{alarmSet ? '⏰ Alarm Set! Ringing in 3s...' : 'Set Morning Love Alarm'}</span>
          </motion.button>
        </div>
      ) : (
        /* Ringing Animation */
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
          className="max-w-sm mx-auto p-8 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-amber-500 text-white shadow-2xl mb-6">
          <motion.div animate={{ rotate: [-15, 15, -15] }} transition={{ duration: 0.15, repeat: Infinity }}
            className="text-6xl mb-4">⏰</motion.div>
          <h3 className="text-2xl font-extrabold font-nepali mb-3">GOOD MORNING BEBO! 💖</h3>
          <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm mb-4">
            <p className="text-sm italic leading-relaxed">{message}</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs mb-4">
            <Sun className="w-4 h-4 text-amber-200" />
            <span>Love Alarm • {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')} AM</span>
          </div>
          <button onClick={handleSnooze}
            className="px-8 py-3 rounded-full bg-white text-rose-600 font-bold text-xs shadow-lg cursor-pointer hover:bg-rose-50">
            Snooze with Love 😴💕
          </button>
        </motion.div>
      )}
    </WorldShell>
  );
}
