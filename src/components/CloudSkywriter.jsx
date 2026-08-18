import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Cloud,
  Send,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SKY_PRESETS = [
  'Happy Birthday Queen Sanzu! 🎂💖',
  'Nepalgunj to Osaka with All My Love ✈️🇳🇵🇯🇵',
  'Sanzu + Abu = Forever Soulmates 💍✨',
  'You Are My Sun, My Moon & All My Stars 🌌',
];

export default function CloudSkywriter() {
  const { triggerHaptic } = useAppStore();

  const [msg, setMsg] = useState('');
  const [skyMessages, setSkyMessages] = useState([]);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  const attachedPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handleSkyWrite = (e) => {
    if (e) e.preventDefault();
    const textToWrite = msg.trim() || SKY_PRESETS[skyMessages.length % SKY_PRESETS.length];

    playSparkle();
    playBloom();
    triggerHaptic([30, 60, 90, 150]);

    const newCloud = {
      id: Date.now(),
      text: textToWrite,
      top: 15 + Math.random() * 45,
      speed: 18 + Math.random() * 8,
      photoUrl: attachedPhoto,
      photoIdx: photoIdx,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSkyMessages((prev) => [newCloud, ...prev]);
    setMsg('');
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = (cloud) => {
    playSparkle();
    const text = `☁️ CLOUD LOVE SKYWRITER ☁️\n\n"${cloud.text}"\n\n- Written across the sky for Sanzu Rawal! Happy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="celestial"
      badge="Cloud Love Skywriter ☁️✈️"
      badgeIcon={<Cloud className="w-3.5 h-3.5 text-sky-300" />}
      title={"Cloud Skywriter"}
      subtitle={"Write Glowing Cloud Messages Across the Sky"}
      description={"Write a love note, attach Sanzu's photo, and watch an airplane write your glowing cloud message across the sunset sky!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* SUNSET SKY STAGE */}
        <div className="relative w-full aspect-[16/10] min-h-[300px] sm:min-h-[360px] rounded-3xl bg-gradient-to-b from-purple-950 via-rose-900 to-amber-700 border-4 border-amber-300/80 shadow-2xl overflow-hidden select-none mb-6">
          {/* Glowing Sun & Stars */}
          <div className="absolute top-6 left-8 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-400 shadow-[0_0_40px_rgba(251,191,36,0.9)] animate-pulse" />
          <div className="absolute top-4 right-10 text-2xl text-amber-200 opacity-80 pointer-events-none">✨</div>
          <div className="absolute top-16 right-24 text-xl text-pink-300 opacity-60 pointer-events-none">🌟</div>

          {/* Background Fluffy Clouds */}
          <div className="absolute top-12 left-1/4 text-4xl opacity-30 pointer-events-none">☁️</div>
          <div className="absolute top-20 right-1/3 text-3xl opacity-25 pointer-events-none">☁️</div>

          {/* ANIMATED CLOUD MESSAGES WRITTEN IN SKY */}
          <AnimatePresence>
            {skyMessages.map((c) => (
              <motion.div
                key={c.id}
                initial={{ x: '-110%', opacity: 0 }}
                animate={{ x: '115%', opacity: [0, 1, 1, 0] }}
                transition={{ duration: c.speed, ease: 'linear' }}
                style={{ top: `${c.top}%` }}
                onClick={() => {
                  playSparkle();
                  setActivePhotoModal(c);
                }}
                className="absolute z-20 flex items-center gap-2 cursor-pointer group pointer-events-auto"
              >
                {/* Airplane */}
                <span className="text-3xl sm:text-4xl filter drop-shadow-[0_5px_10px_rgba(251,191,36,0.8)]">
                  ✈️
                </span>

                {/* Cloud Smoke Message Bubble */}
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border-2 border-white flex items-center gap-2 max-w-xs group-hover:scale-105 transition-transform">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-pink-300 flex-shrink-0 bg-black/20">
                    <img
                      src={c.photoUrl}
                      alt="Attached"
                      onError={(e) => handlePhotoError(e, c.photoIdx)}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-sky-950 font-nepali truncate">
                    "{c.text}"
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Sky Watermark */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-amber-200 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            <span className="flex items-center gap-1 font-bold">
              <Cloud className="w-3.5 h-3.5 text-sky-300" />
              Written in the Sky: <span className="text-amber-300 font-extrabold">{skyMessages.length} Messages</span>
            </span>
            <span className="text-pink-200 font-bold">
              Sunset Sky Stage 🌅
            </span>
          </div>
        </div>

        {/* INPUT & PHOTO SELECTION FORM */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-xl mb-6 space-y-4">
          {/* Photo attachment selector */}
          <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-amber-400 shadow-sm relative bg-black/20 flex-shrink-0">
                <img
                  src={attachedPhoto}
                  alt="Attached"
                  onError={(e) => handlePhotoError(e, photoIdx)}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-800">Attached Memory Photo #{photoIdx + 1}</p>
                <p className="text-[11px] text-gray-500">Flies attached to your cloud message!</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>

          <form onSubmit={handleSkyWrite} className="space-y-3">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Write a love message in the clouds..."
              maxLength={60}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-2 border-sky-200 text-sm text-gray-800 focus:outline-none focus:border-sky-500 focus:bg-white"
            />

            {/* Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[11px] font-bold text-gray-400 flex-shrink-0">Presets:</span>
              {SKY_PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMsg(p)}
                  className="px-2.5 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 text-[11px] font-bold border border-sky-200 whitespace-nowrap cursor-pointer flex-shrink-0"
                >
                  "{p.slice(0, 18)}..."
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white font-extrabold text-sm shadow-xl cursor-pointer hover:brightness-110 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>SKYWRITE MESSAGE NOW! ☁️✈️</span>
            </motion.button>
          </form>
        </div>

        {/* CLOUD MESSAGE MODAL POPUP */}
        <AnimatePresence>
          {activePhotoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-sky-400 shadow-2xl text-center"
              >
                {/* Modal Header Controls */}
                <div className="flex items-center justify-between mb-2 z-10 relative">
                  <button
                    type="button"
                    onClick={() => {
                      playPop();
                      setActivePhotoModal(null);
                    }}
                    className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer active:scale-95 border border-rose-400/40"
                    aria-label="Back"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playPop();
                      setActivePhotoModal(null);
                    }}
                    className="w-9 h-9 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-all cursor-pointer active:scale-95 border border-rose-400/40"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-400/20 border border-sky-300/40 text-sky-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Cloud className="w-3.5 h-3.5 text-sky-300" />
                  Cloud Skywrite Message
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  "{activePhotoModal.text}"
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activePhotoModal.photoUrl}
                    alt="Cloud Photo"
                    onError={(e) => handlePhotoError(e, activePhotoModal.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Skywrite Memory Photo ☁️📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(activePhotoModal)}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Cloud Message on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
