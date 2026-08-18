import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Send,
  PlaneTakeoff,
  Heart,
  RefreshCw,
  Share2,
  Unlock,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const AIRPLANE_STYLES = [
  { id: 'rose', name: 'Rose Glider 🌹', emoji: '✈️', color: 'from-pink-500 via-rose-500 to-red-500', skyTrail: '#ff2a85' },
  { id: 'gold', name: 'Golden Galaxy 🌟', emoji: '🛩️', color: 'from-amber-400 via-yellow-400 to-amber-600', skyTrail: '#fbbf24' },
  { id: 'sakura', name: 'Sakura Petal 🌸', emoji: '✈️', color: 'from-pink-300 via-pink-400 to-rose-400', skyTrail: '#f472b6' },
  { id: 'cosmic', name: 'Cosmic Sky 🌌', emoji: '🚀', color: 'from-indigo-500 via-purple-500 to-pink-500', skyTrail: '#38bdf8' },
];

const PRESET_MESSAGES = [
  'Happy Birthday to the Queen of my Heart, Sanzu! 🎂💖',
  'From Nepalgunj to Osaka, I love you infinitely! ✈️🇳🇵🇯🇵',
  'You are my today, my tomorrow, and my forever soulmate 💕',
  'Counting down every second until I get to hold your hand again! 🤝✨',
];

export default function PaperAirplaneMessenger() {
  const { triggerHaptic } = useAppStore();

  const [message, setMessage] = useState('');
  const [selectedStyleIdx, setSelectedStyleIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const [activeFlight, setActiveFlight] = useState(null);
  const [flightHistory, setFlightHistory] = useState([]);
  const [launchedCount, setLaunchedCount] = useState(0);
  const [unlockedPhoto, setUnlockedPhoto] = useState(null);

  const currentStyle = AIRPLANE_STYLES[selectedStyleIdx];
  const attachedPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handleLaunchAirplane = (e) => {
    if (e) e.preventDefault();
    const noteText = message.trim() || PRESET_MESSAGES[launchedCount % PRESET_MESSAGES.length];

    playSparkle();
    playBloom();
    triggerHaptic([30, 60, 90, 150]);

    const newFlight = {
      id: Date.now(),
      text: noteText,
      style: currentStyle,
      photoUrl: attachedPhoto,
      photoIdx: photoIdx,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setActiveFlight(newFlight);
    setFlightHistory((prev) => [newFlight, ...prev]);
    const count = launchedCount + 1;
    setLaunchedCount(count);
    setMessage('');

    // Fireworks confetti & unlocks!
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });

    // Unlock photo modal surprise every 3 launches
    if (count % 3 === 0) {
      setTimeout(() => {
        setUnlockedPhoto({
          photoIdx: (photoIdx + 3) % BHUNTU_PHOTOS.length,
          count: count
        });
      }, 2200);
    }
  };

  const handleShareWhatsApp = (flight) => {
    playSparkle();
    const text = `✈️ PAPER AIRPLANE LOVE NOTE ✈️\n\n"${flight.text}"\n\n- Sent with endless love to Sanzu Rawal! 💕✨\n\nHappy Birthday Bebo! 🎂🎉`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Interactive Paper Airplane Messenger ✈️"
      badgeIcon={<PlaneTakeoff className="w-3.5 h-3.5 text-sky-500" />}
      title={"कागजी हवाइजहाज प्रेमपत्र"}
      subtitle={"Fold, Attach Photo & Launch Love Notes Across the Sky!"}
      description={"Write a sweet note, attach Sanzu's photo, pick your plane style, and launch your paper airplane into the sky!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {/* SKY FLIGHT CANVA STAGE */}
        <div className="relative w-full aspect-[16/9] min-h-[260px] sm:min-h-[320px] rounded-3xl bg-gradient-to-b from-sky-400 via-sky-300 to-indigo-200 border-4 border-white/80 shadow-2xl overflow-hidden mb-6 select-none">
          {/* Animated Sky Clouds */}
          <motion.div
            animate={{ x: ['100%', '-20%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-4 text-5xl opacity-80 pointer-events-none"
          >
            ☁️
          </motion.div>
          <motion.div
            animate={{ x: ['-20%', '100%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute top-12 text-3xl opacity-60 pointer-events-none"
          >
            ☁️
          </motion.div>
          <div className="absolute top-6 left-12 text-2xl text-pink-300 animate-pulse pointer-events-none">✨</div>
          <div className="absolute top-16 right-16 text-3xl text-pink-400 animate-bounce pointer-events-none">💖</div>

          {/* TARGET HEART RINGS IN SKY */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-pink-400/60 flex items-center justify-center animate-spin">
              <span className="text-xl opacity-80">🎯</span>
            </div>
          </div>

          {/* ACTIVE FLIGHT ANIMATION */}
          <AnimatePresence>
            {activeFlight && (
              <motion.div
                key={activeFlight.id}
                initial={{ x: '-15%', y: '85%', rotate: -25, scale: 0.7 }}
                animate={{
                  x: ['-15%', '45%', '110%'],
                  y: ['85%', '25%', '-15%'],
                  rotate: [-25, 5, 20],
                  scale: [0.7, 1.2, 0.8]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.2, ease: 'easeOut' }}
                className="absolute z-30 flex flex-col items-center pointer-events-none"
              >
                {/* Airplane emoji & trail */}
                <div className="relative">
                  <span className="text-6xl sm:text-7xl block filter drop-shadow-[0_10px_20px_rgba(236,72,153,0.8)]">
                    {activeFlight.style.emoji}
                  </span>
                  <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-2xl animate-pulse">
                    ✨
                  </span>
                </div>

                {/* Attached Photo Badge */}
                <div className="mt-1 p-1 rounded-xl bg-white/90 shadow-lg border border-pink-300 max-w-[140px] text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg overflow-hidden mb-1 border border-pink-200">
                    <img
                      src={activeFlight.photoUrl}
                      alt="Attached Photo"
                      onError={(e) => handlePhotoError(e, activeFlight.photoIdx)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gray-800 truncate max-w-[120px] px-1">
                    "{activeFlight.text}"
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Launch Counter & Watermark Bar */}
          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[11px] font-mono text-gray-800 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60">
            <span className="flex items-center gap-1 font-bold">
              <PlaneTakeoff className="w-3.5 h-3.5 text-sky-600" />
              Launched: <span className="text-pink-600 font-extrabold">{launchedCount} Planes</span>
            </span>
            <span className="text-indigo-800 font-bold">
              Nepalgunj ✈️ Osaka Sky
            </span>
          </div>
        </div>

        {/* INPUT & PHOTO ATTACHMENT STUDIO */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-sky-200 shadow-xl mb-6">
          <h4 className="text-sm font-extrabold font-nepali text-sky-900 mb-3 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-pink-500" />
            Attach Photo & Write Love Note:
          </h4>

          {/* Photo Selector Strip */}
          <div className="flex items-center gap-3 mb-4 p-2.5 rounded-2xl bg-sky-50 border border-sky-100">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-pink-400 shadow-sm flex-shrink-0 relative bg-black/20">
              <img
                src={attachedPhoto}
                alt="Selected"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="text-xs font-bold text-gray-800">Attached Memory Photo #{photoIdx + 1}</p>
              <p className="text-[11px] text-gray-500">Photo travels inside the paper airplane!</p>
            </div>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="px-3 py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Change Photo</span>
            </button>
          </div>

          {/* Airplane Style Selector */}
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-700 mb-2">Select Paper Airplane Style:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AIRPLANE_STYLES.map((st, idx) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    playPop();
                    triggerHaptic(10);
                    setSelectedStyleIdx(idx);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                    selectedStyleIdx === idx
                      ? 'bg-gradient-to-r ' + st.color + ' text-white border-white shadow-md scale-105'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <span>{st.emoji}</span>
                  <span className="truncate">{st.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Input */}
          <form onSubmit={handleLaunchAirplane} className="space-y-3">
            <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your sweet love note here..."
                maxLength={80}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-2 border-sky-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-pink-500 focus:bg-white transition-all"
              />
            </div>

            {/* Quick Preset Message Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[11px] font-bold text-gray-400 flex-shrink-0">Presets:</span>
              {PRESET_MESSAGES.map((msg, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setMessage(msg)}
                  className="px-2.5 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 text-[11px] font-bold border border-pink-200 whitespace-nowrap cursor-pointer transition-all flex-shrink-0"
                >
                  "{msg.slice(0, 20)}..."
                </button>
              ))}
            </div>

            {/* Launch Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 text-white font-extrabold text-sm shadow-xl cursor-pointer hover:brightness-110 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>LAUNCH PAPER AIRPLANE NOW! ✈️💖</span>
            </motion.button>
          </form>
        </div>

        {/* LAUNCHED FLIGHT LOG & WHATSAPP SHARE */}
        {flightHistory.length > 0 && (
          <div className="space-y-2 max-w-xl mx-auto">
            <h4 className="text-xs font-bold text-gray-500 font-mono">Recent Launched Airplanes:</h4>
            <div className="space-y-2">
              {flightHistory.map((flight) => (
                <div
                  key={flight.id}
                  className="p-3.5 rounded-2xl bg-white border border-sky-100 shadow-md flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-pink-300 flex-shrink-0 bg-black/20">
                      <img
                        src={flight.photoUrl}
                        alt="Attached"
                        onError={(e) => handlePhotoError(e, flight.photoIdx)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">"{flight.text}"</p>
                      <p className="text-[10px] text-gray-400">{flight.style.name} • {flight.date}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleShareWhatsApp(flight)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* UNLOCKED PHOTO MODAL */}
        <AnimatePresence>
          {unlockedPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-indigo-950 text-white border-2 border-pink-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setUnlockedPhoto(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Unlock className="w-3.5 h-3.5 text-amber-300" />
                  Flight Milestone Unlocked!
                </span>

                <h3 className="text-lg font-extrabold font-nepali text-white mb-3">
                  {unlockedPhoto.count} Airplanes Reached Sanzu's Heart! ✈️💖
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={BHUNTU_PHOTOS[unlockedPhoto.photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]}
                    alt="Unlocked Photo"
                    onError={(e) => handlePhotoError(e, unlockedPhoto.photoIdx)}
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-xs text-amber-100 italic leading-relaxed bg-white/10 p-3 rounded-xl border border-white/15 mb-4">
                  "Every paper airplane carries my heartbeat straight to you across the sky!"
                </p>

                <button
                  type="button"
                  onClick={() => {
                    playSparkle();
                    setUnlockedPhoto(null);
                  }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-lg cursor-pointer hover:brightness-110 flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Keep Launching Planes! ✈️💖</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
