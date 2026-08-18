import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Plane, Sparkles, Share2, RefreshCw, Compass, MapPin, Navigation, Wind } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const WAYPOINTS = [
  { name: "Nepalgunj Departure (KEP) 🇳🇵", dist: "0 KM", alt: "35,000 FT", speed: "840 KM/H", desc: "Taking off from Nepalgunj runway into the sunrise with Abu's love notes!" },
  { name: "Himalayan Ridge Altitude 🏔️", dist: "1,200 KM", alt: "38,000 FT", speed: "890 KM/H", desc: "Cruising over majestic snowcapped peaks carrying warm birthday wishes!" },
  { name: "East Asian Jetstream Crossing ⚡", dist: "3,100 KM", alt: "40,000 FT", speed: "950 KM/H", desc: "Tailwinds pushing our flight faster toward Sakai, Osaka!" },
  { name: "Osaka Bay Touchdown (KIX) 🇯🇵", dist: "4,892 KM", alt: "Landed 🛬", speed: "0 KM/H", desc: "Touchdown in Osaka! Reunited with Queen Sanzu's smile!" }
];

export default function NepalgunjToOsakaFlightSim() {
  const { triggerHaptic } = useAppStore();

  const [waypointIdx, setWaypointIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentWaypoint = WAYPOINTS[waypointIdx % WAYPOINTS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleFlyNext = () => {
    playBloom();
    playSparkle();
    triggerHaptic(18);
    setWaypointIdx((i) => (i + 1) % WAYPOINTS.length);

    setPhotoIdx(Math.floor(Math.random() * BHUNTU_PHOTOS.length));
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    triggerHaptic(15);
    const text = `✈️ *NEPALGUNJ TO OSAKA FLIGHT SIMULATOR* ✈️\n\nWaypoint #${waypointIdx + 1}: *[${currentWaypoint.name}]*\nDistance Traveled: *${currentWaypoint.dist}*\nAltitude: *${currentWaypoint.alt}*\n"${currentWaypoint.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  const progressPercent = ((waypointIdx + 1) / WAYPOINTS.length) * 100;

  return (
    <WorldShell
      theme="journey"
      badge="Flight Simulator ✈️ 4,892 KM"
      badgeIcon={<Plane className="w-3.5 h-3.5 text-sky-400" />}
      title={"Nepalgunj to Osaka Flight Simulator"}
      subtitle={"Abu's Love Flight Connecting Nepal & Japan"}
      description={"Simulate the flight from Nepalgunj 🇳🇵 to Osaka 🇯🇵 and unlock secret memory photos!"}
    >
      <div className="max-w-2xl mx-auto px-4 pb-16 text-center select-none font-ui space-y-6">
        {/* Cockpit Flight HUD Telemetry Header */}
        <div className="rounded-3xl bg-slate-950 p-5 border-4 border-sky-500/80 shadow-[0_0_50px_rgba(56,189,248,0.35)] space-y-4">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-300 bg-slate-900 p-3 rounded-2xl border border-sky-500/30">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-sky-400 animate-spin" />
              <span>ALT: {currentWaypoint.alt}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-300">
              <Wind className="w-4 h-4" />
              <span>SPEED: {currentWaypoint.speed}</span>
            </div>
            <div className="text-emerald-400 font-bold">
              {currentWaypoint.dist}
            </div>
          </div>

          {/* Flight Path Arc Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-rose-400"><MapPin className="w-3.5 h-3.5" /> KEP (Nepalgunj)</span>
              <span className="text-sky-300 font-extrabold">{Math.round(progressPercent)}% FLIGHT COMPLETE</span>
              <span className="flex items-center gap-1 text-rose-400">KIX (Osaka) <MapPin className="w-3.5 h-3.5" /></span>
            </div>
            <div className="h-3 rounded-full bg-slate-900 overflow-hidden p-0.5 border border-sky-500/30">
              <motion.div
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-rose-500 shadow-md"
              />
            </div>
          </div>

          {/* Flight Viewport Photo Frame */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden border-2 border-sky-400/60 shadow-xl bg-black/60">
            <img
              src={currentPhoto.url || currentPhoto}
              alt="Flight Viewport"
              onError={(e) => handlePhotoError(e, photoIdx)}
              className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105"
            />
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono text-sky-200 border border-sky-400/40 font-bold flex items-center gap-1.5">
              <Plane className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentWaypoint.name}</span>
            </div>
          </div>

          {/* Waypoint Info */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-sky-500/30 text-left space-y-1">
            <div className="font-extrabold text-sm text-sky-300">{currentWaypoint.name}</div>
            <div className="text-xs text-slate-300 leading-relaxed font-medium">"{currentWaypoint.desc}"</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <button
            type="button"
            onClick={handleFlyNext}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Fly Next Waypoint ✈️</span>
          </button>
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}