import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Star,
  Lock,
  CheckCircle2,
  Sparkles,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const INITIAL_BADGES = [
  { id: 1, icon: '💕', title: 'First Sweet Text', desc: 'Sent your very first message', photoIdx: 0, unlocked: true },
  { id: 2, icon: '📱', title: '10,000+ Texts', desc: 'Exchanged endless messages', photoIdx: 3, unlocked: true },
  { id: 3, icon: '🎂', title: 'Birthday Queen', desc: 'Celebrated Sanzu’s special day', photoIdx: 7, unlocked: true },
  { id: 4, icon: '✈️', title: 'Long Distance Champions', desc: 'Conquered Nepalgunj to Japan distance', photoIdx: 12, unlocked: true },
  { id: 5, icon: '🌙', title: 'Late Night Calls', desc: 'Talked until sunrise on video call', photoIdx: 15, unlocked: false },
  { id: 6, icon: '💖', title: 'Soulmate Bond', desc: 'Realized you are forever partners', photoIdx: 20, unlocked: false },
  { id: 7, icon: '👑', title: 'Royal Queen Crown', desc: 'Crowned Sanzu as undisputed Queen', photoIdx: 25, unlocked: false },
  { id: 8, icon: '💍', title: 'Eternal Promise', desc: 'Promised to stay together forever', photoIdx: 30, unlocked: false }
];

export default function LoveAchievementBadges() {
  const { triggerHaptic } = useAppStore();

  const [badges, setBadges] = useState(INITIAL_BADGES);
  const [selectedBadgeModal, setSelectedBadgeModal] = useState(null);

  const handleUnlock = (b) => {
    setBadges((prev) => prev.map((item) => (item.id === b.id ? { ...item, unlocked: true } : item)));
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90, 150]);

    setSelectedBadgeModal({ ...b, unlocked: true });
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
  };

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const progressPct = Math.round((unlockedCount / badges.length) * 100);

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🏆 LOVE ACHIEVEMENT TROPHIES 🏆\n\nUnlocked ${unlockedCount}/${badges.length} Relationship Trophies! Level: Ultimate Soulmate Royalty! Happy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Love Achievement Trophies 🏆✨"
      badgeIcon={<Trophy className="w-3.5 h-3.5 text-amber-400" />}
      title={"शाही प्रेम ट्रफी कक्ष"}
      subtitle={"Relationship Milestones & Trophy Hall"}
      description={"Tap locked trophies to unlock relationship milestones and reveal Sanzu's secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PROGRESS BAR & RANK */}
        <div className="p-5 rounded-3xl bg-slate-900 border-2 border-amber-400/60 shadow-2xl mb-8 text-white space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1 font-bold text-amber-300">
              <Trophy className="w-4 h-4 text-amber-400" />
              Unlocked: {unlockedCount} / {badges.length} Trophies
            </span>
            <span className="text-pink-300 font-extrabold">{progressPct}% Complete</span>
          </div>

          <div className="w-full h-3 rounded-full bg-black/60 border border-white/20 overflow-hidden relative p-0.5">
            <motion.div
              animate={{ width: `${progressPct}%` }}
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            />
          </div>

          <p className="text-xs font-bold text-amber-200">
            Current Rank: {progressPct >= 100 ? '👑 Ultimate Soulmate Royalty!' : '💖 Eternal Lovers'}
          </p>
        </div>

        {/* TROPHY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {badges.map((b) => (
            <motion.button
              key={b.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (!b.unlocked) {
                  handleUnlock(b);
                } else {
                  playPop();
                  setSelectedBadgeModal(b);
                }
              }}
              className={`p-4 rounded-3xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                b.unlocked
                  ? 'bg-gradient-to-br from-amber-400/20 via-yellow-500/10 to-amber-600/20 border-amber-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                  : 'bg-slate-900/60 border-slate-700 text-gray-400 opacity-60 hover:opacity-100'
              }`}
            >
              <span className="text-3xl sm:text-4xl mb-2 filter drop-shadow">
                {b.unlocked ? b.icon : '🔒'}
              </span>

              <p className="text-xs font-extrabold text-amber-200 leading-tight mb-1">
                {b.title}
              </p>

              <p className="text-[10px] text-gray-300 line-clamp-2 leading-tight">
                {b.desc}
              </p>

              {b.unlocked ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-2" />
              ) : (
                <span className="text-[9px] font-mono text-amber-300 mt-2 bg-amber-400/20 px-2 py-0.5 rounded-full">
                  Tap to Unlock 🔓
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* SHARE BUTTON */}
        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Trophy Cabinet on WhatsApp 💬</span>
        </button>

        {/* BADGE MODAL POPUP */}
        <AnimatePresence>
          {selectedBadgeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-amber-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setSelectedBadgeModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  {selectedBadgeModal.title}
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-2">
                  {selectedBadgeModal.desc}
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={BHUNTU_PHOTOS[selectedBadgeModal.photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]}
                    alt="Trophy Photo"
                    onError={(e) => handlePhotoError(e, selectedBadgeModal.photoIdx)}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Trophy Memory Photo Unlocked! 🏆📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Trophy on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
