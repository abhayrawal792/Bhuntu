import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Crown, Trophy, Heart, Sparkles, Award, Send, Star, ShieldCheck, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const TROPHIES = [
  { id: 1, title: "100 Birthday Rooms Master 🏆", desc: "Completed all 100 interactive love experiences on your birthday site!" },
  { id: 2, title: "Eternal Queen of Abu's Heart 👑", desc: "Officially crowned ruler of Abhay's life, mind, and dreams forever." },
  { id: 3, title: "Bardiya Scooter Champion 🛵", desc: "Riding through life together on our light blue scooter to Bardiya!" },
  { id: 4, title: "Nepalgunj Chiya & Momo Queen ☕", desc: "Master of hot chiya, momos, and endless sweet giggles." },
  { id: 5, title: "30-40 Kiddos Future Partner 💒", desc: "Building our dream home, family, and future together." }
];

export default function HallOfFame() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.hallOfFame;
  const { triggerHaptic } = useAppStore();

  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [inducted, setInducted] = useState(false);

  const handleInduct = () => {
    playBloom();
    triggerHaptic([50, 100, 150, 200]);
    setInducted(true);
    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#FF85A1', '#FF006E', '#FFFFFF', '#10B981']
    });
  };

  const handleNextPhoto = () => {
    playPop();
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const photoSrc = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length];

  return (
    <WorldShell
      theme="retro"
      badge="Grand 100th Room Hall of Fame 👑🏆"
      badgeIcon={<Trophy className="w-3.5 h-3.5 text-amber-400 animate-bounce" />}
      title="Bhuntu's Grand 100-Room Hall of Fame 🏆"
      subtitle="Celebrating Sanzu Rawal's induction into the Ultimate Love Hall of Fame after 100 rooms!"
      description="100% interactive 100-room milestone hall of fame with trophies & WhatsApp sharing!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* 100 ROOMS MILESTONE BANNER */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border-4 border-amber-400 bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950 text-white shadow-2xl text-center space-y-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 text-slate-950 flex items-center justify-center mx-auto shadow-2xl animate-pulse">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 fill-amber-200 text-amber-950" />
          </div>

          <div>
            <h2 className="text-2xl sm:text-4xl font-black font-nepali text-amber-300">
              १०० वटा रूम पूरा! HALL OF FAME 🏆
            </h2>
            <h3 className="text-sm sm:text-lg font-bold text-pink-200 mt-1 font-ui">
              Grand 100th Milestone: Inducting Queen Sanzu Rawal
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-lg mx-auto mt-2 font-ui">
              You navigated all 100 interactive rooms of love, memory flips, soundwaves, sealed envelopes, and sky lanterns!
            </p>
          </div>

          {/* Inductee Photo Stand */}
          <div className="relative w-44 h-52 mx-auto rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-black my-3">
            <img
              src={photoSrc}
              onError={e => handlePhotoError(e, photoIdx)}
              alt="Hall of Fame Inductee"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-1 text-[10px] font-black text-amber-300 uppercase tracking-tight">
              Inductee #1: Sanzu Rawal
            </div>
          </div>

          {/* Photo Switcher Row */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              {[...Array(6)].map((_, i) => {
                const pIdx = (photoIdx + i) % BHUNTU_PHOTOS.length;
                return (
                  <button
                    key={i}
                    onClick={() => { playPop(); setPhotoIdx(pIdx); }}
                    className={`w-10 h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      photoIdx === pIdx ? 'border-amber-400 scale-110 shadow-lg' : 'border-amber-400/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={BHUNTU_PHOTOS[pIdx]}
                      onError={e => handlePhotoError(e, pIdx)}
                      alt="Thumb"
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNextPhoto}
              className="px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-extrabold hover:bg-amber-400/30 cursor-pointer flex items-center justify-center gap-1 mx-auto"
            >
              <RefreshCw className="w-3 h-3" /> Change Inductee Photo 🎲
            </button>
          </div>

          {!inducted ? (
            <button
              onClick={handleInduct}
              className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-2xl hover:scale-102 transition-all cursor-pointer font-ui flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5" /> INDUCT SANZU INTO THE 100-ROOM HALL OF FAME 🎉✨
            </button>
          ) : (
            <div className="p-3 rounded-2xl bg-amber-400/20 border border-amber-400/40 text-xs font-black text-amber-200 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>OFFICIALLY INDUCTED INTO THE 100-ROOM HALL OF FAME 🏅</span>
            </div>
          )}
        </div>

        {/* 5 GOLDEN TROPHIES LIST */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-amber-700 uppercase tracking-wider text-left">
            🏆 Queen Sanzu's Hall of Fame Trophies:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {TROPHIES.map(t => (
              <div
                key={t.id}
                className="glass-card p-4 rounded-2xl border-2 border-amber-300 bg-white/90 shadow-md space-y-1"
              >
                <h4 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{t.title}</span>
                </h4>
                <p className="text-[11px] text-gray-600 font-medium">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ALWAYS VISIBLE SEND HALL OF FAME TROPHY TO ABU ON WHATSAPP */}
        <div className="pt-2">
          <button
            onClick={() => {
              sendWhatsAppMessage(`🏆 INDUCTED INTO THE 100-ROOM HALL OF FAME! 🎉\n\nQueen Sanzu Rawal has mastered all 100 birthday rooms on our site!\n\n👑 Eternal Queen of Abu's Heart Forever! 💕`, '🏆 100-Room Hall of Fame');
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-ui"
          >
            <Send className="w-4 h-4 fill-white animate-bounce" />
            <span>Send 100-Room Hall of Fame Trophy to Abu on WhatsApp 📲</span>
          </button>
        </div>

      </div>
    </WorldShell>
  );
}
