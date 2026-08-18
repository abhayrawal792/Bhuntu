import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Share2, RefreshCw, Heart, CheckCircle2, Volume2 } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SECTORS = [
  { id: 1, category: 'romance', type: 'TRUTH 💭', question: 'What was the exact millisecond you knew Abu was your forever person? 🥺', angle: 0 },
  { id: 2, category: 'fun', type: 'DARE 🎤', question: 'Record and send a 5-second voice note saying "I love you Abu!" 💖', angle: 30 },
  { id: 3, category: 'romance', type: 'TRUTH 🌸', question: 'What is your absolute favorite late-night memory of us talking on call? 🌙', angle: 60 },
  { id: 4, category: 'fun', type: 'DARE 📸', question: 'Pose with your cutest royal crown smile and send a photo to Abu right now! 👑', angle: 90 },
  { id: 5, category: 'dreams', type: 'TRUTH 💍', question: 'On a scale of 1-100, how excited are you for our dream home in 2026? 🏡', angle: 120 },
  { id: 6, category: 'food', type: 'DARE 🥟', question: 'Promise Abu a Panipuri & Momo date as soon as we land together! 🥟', angle: 150 },
  { id: 7, category: 'romance', type: 'TRUTH 💖', question: 'What nickname from Abu makes your heart beat the fastest? 💓', angle: 180 },
  { id: 8, category: 'fun', type: 'DARE 💃', question: 'Do a 3-second happy birthday victory dance for Queen Sanzu! 🎉', angle: 210 },
  { id: 9, category: 'dreams', type: 'TRUTH ✈️', question: 'What is the #1 country you want Abu & Sanzu to explore first? 🌐', angle: 240 },
  { id: 10, category: 'romance', type: 'DARE 💌', question: 'Write 3 words describing how much you love Abu in WhatsApp chat! ✍️', angle: 270 },
  { id: 11, category: 'dreams', type: 'TRUTH 🌟', question: 'If you could make one wish come true instantly today, what would it be? 🌠', angle: 300 },
  { id: 12, category: 'fun', type: 'DARE 💋', question: 'Blow a virtual kiss to the screen right now for Abu! 💋', angle: 330 }
];

export default function LoveSpinBottle() {
  const { triggerHaptic } = useAppStore();

  const [filter, setFilter] = useState('all');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSector, setSelectedSector] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const filteredSectors = filter === 'all' ? SECTORS : SECTORS.filter(s => s.category === filter);
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSpinBottle = () => {
    if (spinning) return;

    playPop();
    triggerHaptic(15);
    setSpinning(true);
    setSelectedSector(null);

    const targetList = filteredSectors.length > 0 ? filteredSectors : SECTORS;
    const randomIdx = Math.floor(Math.random() * targetList.length);
    const targetSector = targetList[randomIdx];
    const extraSpins = (6 + Math.floor(Math.random() * 3)) * 360;
    const finalRotation = rotation + extraSpins + targetSector.angle;

    // Tick audio during spin
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      tickCount++;
      if (tickCount % 3 === 0) playPop();
      if (tickCount > 20) clearInterval(tickInterval);
    }, 100);

    setRotation(finalRotation);

    setTimeout(() => {
      clearInterval(tickInterval);
      playBloom();
      playSparkle();
      triggerHaptic([40, 80, 120]);
      setSpinning(false);
      setSelectedSector(targetSector);
      setCompletedCount(c => c + 1);
      setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));

      confetti({ particleCount: 110, spread: 85, origin: { y: 0.5 } });
    }, 2600);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🍾 SPIN THE BOTTLE - TRUTH OR DARE 🍾\n\nResult [${selectedSector ? selectedSector.type : 'Truth or Dare'}]:\n"${selectedSector ? selectedSector.question : 'Spun the bottle!'}"\nCompleted Challenges: ${completedCount}\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Spin The Bottle Arena 🍾✨"
      badgeIcon={<Sparkles className="w-3.5 h-3.5 text-pink-400" />}
      title={"Spin The Bottle Arena"}
      subtitle={"Real 3D Rotating Champagne Bottle Truth or Dare"}
      description={"Spin the 3D glass champagne bottle on the circular game table to draw romantic truths & dares!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 select-none text-center">
        {/* CATEGORY FILTER PILLS */}
        <div className="flex items-center justify-center gap-1.5 mb-4 flex-wrap">
          {[
            { id: 'all', label: 'All Sectors 🎯' },
            { id: 'romance', label: 'Romance 💕' },
            { id: 'fun', label: 'Fun & Dares 🎤' },
            { id: 'dreams', label: 'Future Dreams 🏡' },
            { id: 'food', label: 'Food & Treats 🥟' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                filter === tab.id
                  ? 'bg-pink-500 text-white border-pink-300 shadow-md font-extrabold scale-105'
                  : 'bg-stone-900 text-pink-300 border-pink-500/30 hover:border-pink-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* GAME TABLE CONTAINER */}
        <div className="relative max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-pink-500/70 shadow-2xl p-5 sm:p-6 space-y-6">
          
          {/* TOP COUNTER */}
          <div className="flex items-center justify-between text-xs font-mono font-bold text-pink-300 bg-pink-950/40 p-2.5 rounded-xl border border-pink-400/30">
            <span>CHALLENGES COMPLETED: {completedCount} 🏆</span>
            <span className="text-amber-300">SECTORS: {SECTORS.length} 🍾</span>
          </div>

          {/* CIRCULAR SPINNING BOTTLE TABLE */}
          <div className="relative w-72 h-72 rounded-full border-4 border-pink-400/80 mx-auto bg-gradient-to-b from-pink-950/40 via-slate-950 to-stone-950 p-4 shadow-[0_0_40px_rgba(244,63,94,0.3)] overflow-hidden flex items-center justify-center">
            
            {/* TARGET ALIGNMENT POINTER */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-pink-400 text-xl font-bold z-30 animate-bounce">
              ▼
            </div>

            {/* SECTOR LABELS AROUND CIRCLE */}
            {SECTORS.map((sec, i) => {
              const rad = (sec.angle - 90) * (Math.PI / 180);
              const x = 50 + 39 * Math.cos(rad);
              const y = 50 + 39 * Math.sin(rad);
              const isTarget = selectedSector?.id === sec.id;

              return (
                <div
                  key={i}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 text-[9px] font-mono font-black px-2 py-0.5 rounded-full transition-all border ${
                    isTarget
                      ? 'bg-amber-400 text-black border-amber-200 scale-125 z-20 shadow-lg'
                      : 'bg-pink-950/80 text-pink-300 border-pink-400/40'
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  #{sec.id}
                </div>
              );
            })}

            {/* REAL 3D CHAMPAGNE BOTTLE */}
            <motion.div
              animate={{ rotate: rotation }}
              transition={{ duration: 2.6, ease: [0.15, 0.85, 0.35, 1.0] }}
              className="text-6xl cursor-pointer filter drop-shadow-[0_0_20px_rgba(244,63,94,0.9)] z-20 origin-center"
            >
              🍾
            </motion.div>
          </div>

          {/* REVEALED RESULT CARD */}
          <AnimatePresence>
            {selectedSector && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="p-4 rounded-2xl bg-pink-950/80 border-2 border-pink-400/80 space-y-3 shadow-xl"
              >
                <div className="w-full h-48 rounded-xl overflow-hidden border-2 border-amber-300 shadow relative bg-black">
                  <img
                    src={currentPhoto}
                    alt="Truth Dare Photo"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
                  />
                  <div className="absolute top-2 right-2 bg-pink-900/90 px-3 py-1 rounded-lg text-xs font-mono text-pink-200 border border-white/20 font-bold">
                    Sector #{selectedSector.id}
                  </div>
                </div>
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-black text-amber-300 uppercase tracking-widest bg-pink-900/80 px-3 py-0.5 rounded-full border border-amber-400/40">
                      {selectedSector.type}
                    </span>
                    <span className="text-[10px] font-mono text-pink-300 uppercase font-bold">
                      {selectedSector.category}
                    </span>
                  </div>
                  <p className="text-xs text-white font-bold italic leading-relaxed pt-1">
                    "{selectedSector.question}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ACTIONS */}
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleSpinBottle}
              disabled={spinning}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 hover:brightness-110 active:scale-98 transition-all border border-pink-300"
            >
              <Sparkles className="w-4 h-4" />
              <span>{spinning ? 'Spinning Champagne...' : 'Spin Bottle! 🍾'}</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg cursor-pointer flex items-center justify-center gap-1.5 hover:brightness-110 active:scale-98 transition-all border border-emerald-300"
            >
              <Share2 className="w-4 h-4" />
              <span>Share WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    </WorldShell>
  );
}

