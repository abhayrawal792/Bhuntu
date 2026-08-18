import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Ship,
  Sparkles,
  Share2,
  RefreshCw,
  Wind
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PORTS = [
  { name: 'Nepalgunj Riverbank 🇳🇵', text: 'Where Abu folded the paper boat with love.' },
  { name: 'Ganges River Stream 🌊', text: 'Floating gently downstream across borders.' },
  { name: 'Pacific Ocean Breeze ⛵', text: 'Riding the warm ocean waves toward Japan.' },
  { name: 'Osaka Bay Harbor 🇯🇵', text: 'Arrived safely in Sanzu\'s arms in Japan!' }
];

export default function OrigamiBoat() {
  const { triggerHaptic } = useAppStore();

  const [portIdx, setPortIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPort = PORTS[portIdx];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPort = () => {
    playPop();
    triggerHaptic(15);
    setPortIdx((prev) => (prev + 1) % PORTS.length);

    if ((portIdx + 1) % PORTS.length === 3) {
      playBloom();
      playSparkle();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    let next = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    if (next === photoIdx) next = (next + 1) % BHUNTU_PHOTOS.length;
    setPhotoIdx(next);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `⛵ ROMANTIC ORIGAMI BOAT VOYAGE ⛵\n\nOur paper love boat sailed to ${currentPort.name} carrying Queen Sanzu's memory photo! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="journey"
      badge="Origami Boat Voyage ⛵✨"
      badgeIcon={<Ship className="w-3.5 h-3.5 text-cyan-400" />}
      title={"कागजको डुङ्गा यात्रा"}
      subtitle={"Sail the Paper Love Boat Across Oceans"}
      description={"Set sail on a paper origami boat carrying Sanzu's photo from Nepalgunj all the way to Osaka, Japan!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* WATER RIVER STAGE */}
        <div className="relative max-w-sm sm:max-w-md mx-auto h-72 sm:h-80 rounded-3xl p-4 bg-gradient-to-b from-sky-950 via-cyan-950 to-blue-950 border-4 border-cyan-400/60 shadow-2xl overflow-hidden mb-6 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between text-xs font-mono text-cyan-200 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <span>PORT: {currentPort.name}</span>
            <span>JOURNEY: {portIdx + 1} / 4</span>
          </div>

          {/* Boat Sprite carrying Photo Sail */}
          <motion.div
            animate={{ x: [-10, 10, -10], y: [-4, 4, -4], rotate: [-2, 2, -2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex flex-col items-center cursor-pointer"
          >
            {/* Photo Sail */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-xl relative bg-black/40 mb-1">
              <img
                src={currentPhoto}
                alt="Sail Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>
            {/* Origami Boat Base */}
            <span className="text-6xl filter drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">⛵</span>
          </motion.div>

          <p className="text-xs font-bold text-cyan-100 bg-black/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 max-w-xs">
            "{currentPort.text}"
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleNextPort}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Wind className="w-4 h-4" />
            <span>Blow Ocean Breeze</span>
          </button>

          <button
            type="button"
            onClick={handleNextPhoto}
            className="py-3.5 px-4 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Random Photo</span>
          </button>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
