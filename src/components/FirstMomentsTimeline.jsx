import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Calendar, Sparkles, Share2, Heart, CheckCircle2, ArrowLeft, X, Maximize2, MapPin, Gift, Crown } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MILESTONES = [
  { id: 1, icon: '🏠', title: 'First Meeting at Home', date: 'Nepalgunj 🇳🇵', desc: 'Queen Sanzu came searching for a room to rent at Abu\'s home — the exact moment their destiny began! 🏠' },
  { id: 2, icon: '💖', title: 'First Love Confession', date: 'Heartfelt Promise', desc: 'Abu confessed his unconditional love for Sanzu\'s pure heart, beauty, and kindness!' },
  { id: 3, icon: '📱', title: 'Long-Distance Video Call Era', date: 'Osaka ✈️ Nepalgunj', desc: 'Distance vanished seeing Sanzu\'s smiling face on video call across 4,500 miles!' },
  { id: 4, icon: '💍', title: 'Proposal Accepted!', date: 'October 28, 2025', desc: 'October 28, 2025: Queen Sanzu accepted Abu\'s proposal to be married forever!' },
  { id: 5, icon: '🌸', title: 'Virtual Date Night & Promises', date: 'Every Single Evening', desc: 'Sharing late-night Panipuri, Momo, laughter, and sweet romantic plans!' },
  { id: 6, icon: '👑', title: 'Royal Birthday Coronation', date: 'Forever & Always', desc: 'Coronating Queen Sanzu Rawal as the undisputed ruler of Abu\'s heart!' }
];

export default function FirstMomentsTimeline() {
  const { triggerHaptic } = useAppStore();

  const [activeStep, setActiveStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState([0]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

  const currentMilestone = MILESTONES[activeStep % MILESTONES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleStepClick = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);

    setActiveStep(idx);
    if (!visitedSteps.includes(idx)) {
      setVisitedSteps(prev => [...prev, idx]);
    }
    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

    confetti({ particleCount: 85, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💕 QUEEN SANZU & ABU'S ROMANTIC TIMELINE 💕\n\nMilestone #${activeStep + 1}: [${currentMilestone.title} - ${currentMilestone.date}]\n"${currentMilestone.desc}"\nCompleted: ${visitedSteps.length}/${MILESTONES.length} Chapters\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Our Romantic Timeline 💕✨"
      badgeIcon={<Calendar className="w-3.5 h-3.5 text-pink-400" />}
      title={"Abu & Queen Sanzu's Relationship Story"}
      subtitle={"Unforgettable Milestones Along Our Journey"}
      description={"Tap each glowing milestone stone below to travel through our love story, unlock memory photos, and view full screen!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center font-ui">
        
        {/* MAIN TIMELINE CARD */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950/90 backdrop-blur-xl border-4 border-pink-500/60 shadow-2xl p-5 sm:p-6 space-y-6 text-white overflow-hidden">
          
          {/* STEPPING-STONE ROADWAY MAP */}
          <div className="flex justify-between items-center p-3 bg-pink-950/50 rounded-2xl border border-pink-400/30 relative overflow-x-auto">
            <div className="absolute top-1/2 left-6 right-6 h-1.5 bg-gradient-to-r from-rose-500 via-pink-400 to-amber-400 -translate-y-1/2 z-0" />

            {MILESTONES.map((m, idx) => {
              const isSelected = activeStep === idx;
              const isVisited = visitedSteps.includes(idx);

              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleStepClick(idx)}
                  className={`relative z-10 w-11 h-11 rounded-full border-2 font-mono font-black text-sm flex items-center justify-center cursor-pointer transition-all active:scale-90 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-amber-300 to-amber-500 border-white text-slate-950 scale-125 shadow-[0_0_22px_#fbbf24]'
                      : isVisited
                      ? 'bg-rose-600 border-amber-300 text-white shadow-md'
                      : 'bg-slate-900 border-pink-500/40 text-pink-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  {m.icon}
                </button>
              );
            })}
          </div>

          {/* ACTIVE MILESTONE CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              className="bg-slate-900/90 p-5 rounded-2xl border border-pink-400/40 text-left space-y-4 shadow-xl relative group"
            >
              {/* Photo Display with Expand Icon */}
              <div 
                onClick={() => setFullscreenPhoto(currentPhoto)}
                className="w-full h-56 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl relative bg-black cursor-pointer group-hover:border-amber-300 transition-all"
              >
                <img
                  src={currentPhoto}
                  alt="Milestone Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain object-top transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-200 text-xs font-bold border border-amber-300/40 flex items-center gap-1 shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Tap Fullscreen</span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-widest bg-pink-950/80 border border-pink-400/30 px-3 py-1 rounded-full">
                    CHAPTER #{activeStep + 1} • {currentMilestone.date}
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
                </div>

                <h3 className="text-base font-black text-rose-200 pt-1">{currentMilestone.title}</h3>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold italic bg-slate-950/60 p-3 rounded-xl border border-pink-500/20">
                  "{currentMilestone.desc}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ACTION BUTTON */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-2 border border-emerald-400/30"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Milestone Story on WhatsApp</span>
            </button>
          </div>

        </div>

        {/* FULLSCREEN PHOTO MODAL WITH TOP-LEFT CLOSE */}
        <AnimatePresence>
          {fullscreenPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
              onClick={() => setFullscreenPhoto(null)}
            >
              {/* Top-Left Corner Close Button */}
              <button
                type="button"
                onClick={() => setFullscreenPhoto(null)}
                className="fixed top-4 left-4 z-[10000] w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-2xl transition-all cursor-pointer active:scale-90 border-2 border-white/80"
                style={{ top: 'max(env(safe-area-inset-top), 16px)', left: '16px' }}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Chapter Badge */}
              <div 
                className="fixed top-4 right-4 z-[10000] px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-300/30 text-amber-200 text-xs font-bold font-ui shadow-lg hidden sm:block"
                style={{ top: 'max(env(safe-area-inset-top), 16px)' }}
              >
                Chapter #{activeStep + 1} — {currentMilestone.title}
              </div>

              {/* Photo Display */}
              <div className="max-w-2xl max-h-[75vh] w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img
                  src={fullscreenPhoto}
                  alt="Fullscreen Milestone Photo"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="max-h-[65vh] max-w-full rounded-2xl shadow-2xl border-4 border-amber-400/80 object-contain object-top"
                />
                <p className="text-amber-200 text-xs font-bold mt-3 text-center bg-slate-900/90 px-4 py-2 rounded-full border border-amber-300/40 shadow-lg">
                  {currentMilestone.title} • {currentMilestone.date}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </WorldShell>
  );
}
