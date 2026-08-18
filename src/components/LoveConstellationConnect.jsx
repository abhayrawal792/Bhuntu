import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Heart, Sparkles, Wand2, Send, Award, RefreshCw, Compass } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CONSTELLATIONS = [
  {
    id: 1,
    title: "Crown of Queen Sanzu 👑",
    nepali: "Aakash ma sabai bhanda chamkine Queen Sanzu ko mugut constellation!",
    stars: [
      { id: 0, x: 20, y: 40 },
      { id: 1, x: 35, y: 70 },
      { id: 2, x: 50, y: 30 },
      { id: 3, x: 65, y: 70 },
      { id: 4, x: 80, y: 40 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [1, 3], [0, 4]],
    photoIdx: 0
  },
  {
    id: 2,
    title: "Light Blue Scooter Centauri 🛵",
    nepali: "Bardiya tira light blue scooter ma ghumne pyaro constellation!",
    stars: [
      { id: 0, x: 25, y: 65 },
      { id: 1, x: 40, y: 35 },
      { id: 2, x: 60, y: 35 },
      { id: 3, x: 75, y: 65 },
      { id: 4, x: 50, y: 75 }
    ],
    connections: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [1, 4], [2, 4]],
    photoIdx: 25
  },
  {
    id: 3,
    title: "Nepalgunj Chiya Lyra ☕",
    nepali: "Hot chiya ra momo ko mitho samjhana aakash ma!",
    stars: [
      { id: 0, x: 30, y: 30 },
      { id: 1, x: 70, y: 30 },
      { id: 2, x: 35, y: 70 },
      { id: 3, x: 65, y: 70 }
    ],
    connections: [[0, 1], [1, 3], [3, 2], [2, 0], [0, 3]],
    photoIdx: 52
  },
  {
    id: 4,
    title: "Twin Hearts Orion 💖",
    nepali: "Osaka ra Nepalgunj ko maya jodne dubaiko mutu constellation!",
    stars: [
      { id: 0, x: 50, y: 20 },
      { id: 1, x: 30, y: 40 },
      { id: 2, x: 70, y: 40 },
      { id: 3, x: 50, y: 80 }
    ],
    connections: [[0, 1], [0, 2], [1, 3], [2, 3], [1, 2]],
    photoIdx: 78
  }
];

export default function LoveConstellationConnect() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveConstellationConnect;
  const { triggerHaptic } = useAppStore();

  const [activeIdx, setActiveIdx] = useState(0);
  const [drawnLines, setDrawnLines] = useState([]);
  const [constellationName, setConstellationName] = useState('');
  const [isCertified, setIsCertified] = useState(false);

  const activeConstellation = CONSTELLATIONS[activeIdx];
  const photoSrc = BHUNTU_PHOTOS[activeConstellation.photoIdx % BHUNTU_PHOTOS.length];

  const handleAutoDrawAll = () => {
    playBloom();
    triggerHaptic([30, 90, 30]);

    setDrawnLines(activeConstellation.connections);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
  };

  const handleLineToggle = (conn) => {
    playSparkle();
    triggerHaptic(15);

    const exists = drawnLines.some(c =>
      (c[0] === conn[0] && c[1] === conn[1]) || (c[0] === conn[1] && c[1] === conn[0])
    );

    if (exists) {
      setDrawnLines(drawnLines.filter(c => !(c[0] === conn[0] && c[1] === conn[1]) && !(c[0] === conn[1] && c[1] === conn[0])));
    } else {
      const next = [...drawnLines, conn];
      setDrawnLines(next);

      if (next.length === activeConstellation.connections.length) {
        playBloom();
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      }
    }
  };

  const handleRegisterCertificate = () => {
    if (!constellationName.trim()) return;
    playBloom();
    triggerHaptic([40, 90]);
    setIsCertified(true);
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } });
  };

  const isCompleted = drawnLines.length === activeConstellation.connections.length;

  return (
    <WorldShell
      theme="celestial"
      badge="Stargazer Constellation Studio ✨"
      badgeIcon={<Star className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />}
      title="Bhuntu's 3D Stargazer Constellation Studio ✨"
      subtitle="Connect star beams, auto-trace constellations, and register your star in the Osaka & Nepalgunj sky!"
      description="100% interactive stargazer observatory with auto-tracer & WhatsApp certificates!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* Constellation Selector Chips */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CONSTELLATIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                playPop();
                setActiveIdx(idx);
                setDrawnLines([]);
                setIsCertified(false);
              }}
              className={`px-3.5 py-2 rounded-full text-xs font-black whitespace-nowrap transition-all cursor-pointer border ${
                activeIdx === idx
                  ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md scale-105'
                  : 'bg-slate-900/80 text-amber-200 border-amber-500/30 hover:bg-slate-800'
              }`}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Controls Header */}
        <div className="flex items-center justify-between bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-amber-500/30 text-xs font-bold text-amber-200">
          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Progress: {drawnLines.length} / {activeConstellation.connections.length} Lines</span>
          </div>

          <button
            onClick={handleAutoDrawAll}
            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-md cursor-pointer hover:scale-105 transition-all flex items-center gap-1"
          >
            <Wand2 className="w-3.5 h-3.5" /> Auto Star Beam Tracer 🪄
          </button>
        </div>

        {/* 3D STARFIELD CANVAS */}
        <div className="w-full max-w-md h-80 mx-auto rounded-3xl bg-gradient-to-b from-slate-950 via-indigo-950 to-black border-4 border-amber-400/40 shadow-2xl relative overflow-hidden flex items-center justify-center">
          
          {/* Background Stars */}
          {[...Array(40)].map((_, i) => (
            <div
              key={`bg-${i}`}
              className="absolute w-1 h-1 rounded-full bg-amber-200/50 animate-pulse"
              style={{
                left: `${(i * 17) % 95}%`,
                top: `${(i * 23) % 90}%`,
                animationDuration: `${1.5 + (i % 4) * 0.5}s`
              }}
            />
          ))}

          {/* SVG Connection Beams */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
            {activeConstellation.connections.map((conn, i) => {
              const from = activeConstellation.stars.find(s => s.id === conn[0]);
              const to = activeConstellation.stars.find(s => s.id === conn[1]);
              const isDrawn = drawnLines.some(c => (c[0] === conn[0] && c[1] === conn[1]) || (c[0] === conn[1] && c[1] === conn[0]));

              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isDrawn ? '#fbbf24' : '#ffffff20'}
                  strokeWidth={isDrawn ? '1.2' : '0.4'}
                  strokeDasharray={isDrawn ? 'none' : '2,2'}
                  style={isDrawn ? { filter: 'drop-shadow(0 0 6px #fbbf24)' } : {}}
                />
              );
            })}
          </svg>

          {/* Interactive Star Nodes */}
          {activeConstellation.stars.map(star => (
            <button
              key={star.id}
              onClick={() => {
                const conn = activeConstellation.connections.find(c => c[0] === star.id || c[1] === star.id);
                if (conn) handleLineToggle(conn);
              }}
              className="absolute w-7 h-7 rounded-full bg-amber-300 border-2 border-white shadow-xl shadow-amber-400/50 cursor-pointer flex items-center justify-center text-slate-950 font-black text-[10px] transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              ★
            </button>
          ))}

          {/* Center Revealed Photo on Completion */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10 w-24 h-24 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-2xl bg-black"
              >
                <img
                  src={photoSrc}
                  onError={e => handlePhotoError(e, activeConstellation.photoIdx)}
                  alt="Constellation Photo"
                  className="w-full h-full object-contain opacity-90"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Naming & Official Certificate Generator */}
        {isCompleted && !isCertified && (
          <div className="glass-card p-5 rounded-3xl border-2 border-amber-400 bg-slate-900/90 text-white shadow-xl space-y-3 max-w-md mx-auto text-left">
            <h4 className="text-xs font-black text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Register Constellation in Sky Registry ✨</span>
            </h4>

            <input
              type="text"
              value={constellationName}
              onChange={e => setConstellationName(e.target.value)}
              placeholder="Enter name (e.g. 'Sanzu-Queen-Star-2026')"
              className="w-full p-3 rounded-2xl border border-amber-400/50 text-xs font-bold text-amber-100 outline-none focus:border-amber-400 bg-black/40 font-ui"
            />

            <button
              onClick={handleRegisterCertificate}
              disabled={!constellationName.trim()}
              className="w-full py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg cursor-pointer hover:scale-102 transition-all disabled:opacity-50"
            >
              Generate Official Star Certificate 📜
            </button>
          </div>
        )}

        {/* Official Framed Stargazer Certificate */}
        {isCertified && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-3xl bg-gradient-to-b from-amber-100 via-amber-50 to-amber-100 border-4 border-amber-500 shadow-2xl text-center space-y-3 max-w-md mx-auto text-amber-950 font-serif"
          >
            <Award className="w-10 h-10 text-amber-600 mx-auto animate-bounce" />
            <h3 className="text-sm font-black tracking-widest uppercase">
              ★ OFFICIAL STAR REGISTRY CERTIFICATE ★
            </h3>
            <p className="text-xs italic font-sans font-semibold">
              Constellation <span className="font-extrabold text-amber-900">"{constellationName}"</span> has been officially registered in the Osaka & Nepalgunj Night Sky for Princess Sanzu Rawal! ✨💖
            </p>

            <button
              onClick={() => {
                sendWhatsAppMessage(`✨ Hey Abu! I connected all stars & registered our official constellation *"${constellationName}"* in the night sky! 📜⭐\n\n("${activeConstellation.title}") ❤️`, '✨ Official Star Certificate');
              }}
              className="w-full py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 font-ui"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Star Certificate to Abu on WhatsApp 📲</span>
            </button>
          </motion.div>
        )}

      </div>
    </WorldShell>
  );
}
