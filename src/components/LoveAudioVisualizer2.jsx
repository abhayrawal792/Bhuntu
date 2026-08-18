import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Volume2, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const AUDIO_MODES = [
  { mode: "Nepalgunj Wind Chime 🎐", desc: "Soft breeze carrying sweet thoughts across the mountains!" },
  { mode: "Osaka Sakura Rhythm 🌸", desc: "Cherry blossom petals falling in harmony with our hearts!" },
  { mode: "Ocean Wave Symphony 🌊", desc: "Peaceful waves connecting 4,500 miles between Nepal & Japan!" }
];

export default function LoveAudioVisualizer2() {
  const { triggerHaptic } = useAppStore();

  const [modeIdx, setModeIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentMode = AUDIO_MODES[modeIdx % AUDIO_MODES.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectMode = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setModeIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎧 LOVE AUDIO VISUALIZER 🎧\n\n[${currentMode.mode}]\n"${currentMode.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Love Audio Visualizer 🎧✨"
      badgeIcon={<Volume2 className="w-3.5 h-3.5 text-sky-400" />}
      title={"Love Audio Visualizer"}
      subtitle={"Interactive Audio Visualizer for Queen Sanzu"}
      description={"Visualize romantic sound waves and unlock secret photo cards for Queen Sanzu!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* AUDIO CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={modeIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-sky-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Audio Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-sky-900/80 px-3 py-1 rounded-lg text-xs font-mono text-sky-200 border border-white/20 font-bold">
                🎧 Mode #{modeIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-sky-300 uppercase tracking-wider mb-1">
                {currentMode.mode}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentMode.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* MODE BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {AUDIO_MODES.map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectMode(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                modeIdx === idx
                  ? 'bg-sky-500 text-white border-sky-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-sky-200 border-sky-500/40 hover:border-sky-400'
              }`}
            >
              🎧 {m.mode.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Audio Visualizer</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
