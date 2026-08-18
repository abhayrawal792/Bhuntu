import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MILESTONES = [
  { date: "First Feelings", title: "Falling in Love with Your Voice 💕", desc: "The very moment Abu's heart beat for Queen Sanzu's sweet voice and kind nature." },
  { date: "October 28, 2025", title: "Official Love Acceptance 💍", desc: "Abu confessed eternal love & Bhuntu accepted! Connecting Nepalgunj 🇳🇵 to Osaka 🇯🇵." },
  { date: "August 20, 2026", title: "Approaching 1st Year Anniversary 💖", desc: "1 full year of unconditional love, late-night video calls, and endless laughter!" },
  { date: "Our Golden Future", title: "Forever Marriage & Dream Home 🏠💍", desc: "Building our dream cozy home together in total joy and peace." }
];

export default function CoupleAnniversaryTimeline() {
  const { triggerHaptic } = useAppStore();

  const [active, setActive] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMilestone = MILESTONES[active % MILESTONES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNext = () => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setActive((prev) => (prev + 1) % MILESTONES.length);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🗺️ LOVE ROADMAP TIMELINE 🗺️\n\nMilestone [${currentMilestone.date}]:\n"${currentMilestone.title}"\n"${currentMilestone.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Love Roadmap Timeline 🗺️✨"
      badgeIcon={<Calendar className="w-3.5 h-3.5 text-pink-400" />}
      title={"Love Roadmap Timeline"}
      subtitle={"Abu & Sanzu's Journey Milestones"}
      description={"Travel through key milestones in our love story and unlock secret photo memories!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* MILESTONE CARD & PHOTO DISCOVERY */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Milestone Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            <div className="pt-1 text-left w-full">
              <span className="text-[10px] font-mono text-pink-300 bg-pink-900/60 px-3 py-1 rounded-full border border-pink-400 font-bold inline-block mb-2">
                {currentMilestone.date}
              </span>
              <h3 className="text-sm font-extrabold text-white mb-1">{currentMilestone.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{currentMilestone.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Next Milestone</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Milestone</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
