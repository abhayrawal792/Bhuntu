import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Swords,
  Sparkles,
  Share2,
  RefreshCw,
  Trophy,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function QuizDuel() {
  const { triggerHaptic } = useAppStore();

  const [bossHp, setBossHp] = useState(100);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeVictoryModal, setActiveVictoryModal] = useState(null);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleCastSpell = (damage, spellName) => {
    if (bossHp <= 0) return;

    playPop();
    triggerHaptic([20, 50, 80]);

    const newHp = Math.max(0, bossHp - damage);
    setBossHp(newHp);

    if (newHp === 0) {
      playBloom();
      playSparkle();

      let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
      setPhotoIdx(nextPhoto);

      setActiveVictoryModal({
        spellName,
        photoIdx: nextPhoto,
        photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
      });

      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleResetBattle = () => {
    playPop();
    setBossHp(100);
    setActiveVictoryModal(null);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `⚔️ LOVE VS. LONELINESS RPG BATTLE ⚔️\n\nAbu & Sanzu's love defeated the Loneliness Boss! Love wins every single time! Happy Birthday Queen Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="arcade"
      badge="Love vs. Loneliness Battle ⚔️💖"
      badgeIcon={<Swords className="w-3.5 h-3.5 text-rose-400" />}
      title={"प्रेम विरुद्ध एक्लोपना युद्ध"}
      subtitle={"Cast Love Spells to Defeat Loneliness"}
      description={"Combine Sanzu & Abu's love powers to cast spells, defeat the Loneliness Boss, and unlock Sanzu's victory photo!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* BOSS STAGE */}
        <div className="relative max-w-md mx-auto p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 border-4 border-rose-400/60 shadow-2xl mb-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-rose-300">
            <span>BOSS: LONELINESS MONSTER 👾</span>
            <span className="font-extrabold text-white">{bossHp} / 100 HP</span>
          </div>

          {/* HP Bar */}
          <div className="w-full h-4 rounded-full bg-black/60 border border-white/20 overflow-hidden relative p-0.5">
            <motion.div
              animate={{ width: `${bossHp}%` }}
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-red-500 to-amber-400 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            />
          </div>

          {/* Boss Sprite */}
          <div className="py-6">
            {bossHp > 0 ? (
              <motion.div
                animate={{ rotate: [-4, 4, -4], scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-7xl filter drop-shadow-[0_0_25px_rgba(244,63,94,0.8)]"
              >
                👾
              </motion.div>
            ) : (
              <div className="text-6xl animate-bounce">✨ DEFEATED! ✨</div>
            )}
          </div>
        </div>

        {/* SPELL BUTTONS */}
        {bossHp > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCastSpell(35, 'Unconditional Love Spell ✨')}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Unconditional Love Spell ✨ (-35 HP)</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCastSpell(45, 'Japan Reunion Strike ⚡')}
              className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Japan Reunion Strike ⚡ (-45 HP)</span>
            </motion.button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 max-w-md mx-auto mb-6">
            <button
              type="button"
              onClick={handleResetBattle}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Replay Battle</span>
            </button>

            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Victory</span>
            </button>
          </div>
        )}

        {/* VICTORY MODAL */}
        <AnimatePresence>
          {activeVictoryModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-rose-400 shadow-2xl text-center"
              >
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setActiveVictoryModal(null);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-400/20 border border-rose-300/40 text-rose-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  🏆 RPG Battle Victory!
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  Love Defeated Loneliness!
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activeVictoryModal.photoUrl}
                    alt="Victory Photo"
                    onError={(e) => handlePhotoError(e, activeVictoryModal.photoIdx)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Victory Memory Photo Unlocked! ⚔️📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Victory on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
