import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar, Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const TARGET_DATE = new Date('2026-08-20T00:00:00');

export default function AnniversaryCountdownClock() {
  const { triggerHaptic } = useAppStore();

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = TARGET_DATE - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (nextPhoto === photoIdx) nextPhoto = (nextPhoto + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💍 1ST ANNIVERSARY COUNTDOWN 💍\n\nTarget: August 20, 2026\nTime Remaining: ${timeLeft.days} Days, ${timeLeft.hours} Hours, ${timeLeft.mins} Mins!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="1st Anniversary Countdown 💍✨"
      badgeIcon={<Calendar className="w-3.5 h-3.5 text-rose-500" />}
      title={"First Anniversary Countdown"}
      subtitle={"Counting Down to August 20, 2026"}
      description={"Counting down every second to 1 full year of unconditional love & togetherness between Sanzu & Abu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PHOTO BACKDROP FRAME */}
        <div className="w-full max-w-md mx-auto h-56 rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl relative bg-black/40 mb-6">
          <img
            src={currentPhoto}
            alt="Anniversary Photo"
            onError={(e) => handlePhotoError(e, photoIdx)}
            className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
          />
          <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono text-amber-200 text-center border border-white/20 font-bold">
            Target Anniversary: August 20, 2026 💍✨
          </div>
        </div>

        {/* COUNTDOWN READOUT */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto mb-6">
          {[
            { label: 'Days', val: timeLeft.days, color: 'from-rose-500 to-pink-600' },
            { label: 'Hours', val: timeLeft.hours, color: 'from-purple-500 to-indigo-600' },
            { label: 'Minutes', val: timeLeft.mins, color: 'from-sky-500 to-blue-600' },
            { label: 'Seconds', val: timeLeft.secs, color: 'from-amber-500 to-orange-600' },
          ].map((item) => (
            <motion.div
              key={item.label}
              animate={{ scale: item.label === 'Seconds' ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 1, repeat: Infinity }}
              className={`p-4 rounded-3xl bg-gradient-to-br ${item.color} text-white shadow-xl text-center border border-white/20`}
            >
              <span className="text-3xl font-extrabold font-mono block">{item.val}</span>
              <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPhoto}
            className="flex-1 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Random Photo</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Clock</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
