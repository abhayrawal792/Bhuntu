import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Ticket,
  Film,
  Sparkles,
  Share2,
  Clapperboard,
  RefreshCw
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const MOVIE_PRESETS = [
  { title: 'The Love Story of Sanzu & Abu 💖', genre: '💕 Eternal Romance', location: 'Osaka Cinema Hall 🎬' },
  { title: 'Birthday Queen: Sanzu Rawal 🎂👑', genre: '✨ Blockbuster Comedy & Magic', location: 'VIP Starlight Theater 🌙' },
  { title: 'From Nepalgunj to Japan With Love ✈️', genre: '🌌 Epic Romantic Journey', location: 'Royal Grand Cinema 🎟️' },
];

const SNACK_OPTIONS = ['🍿 Golden Butter Popcorn', '🍫 Belgian Chocolates', '🍷 Romantic Champagne', '🍦 Gelato Ice Cream'];

export default function MovieTicketCreator() {
  const { triggerHaptic } = useAppStore();

  const [movieTitle, setMovieTitle] = useState('The Love Story of Sanzu & Abu 💖');
  const [genre, setGenre] = useState('💕 Eternal Romance');
  const [snack, setSnack] = useState('🍿 Golden Butter Popcorn');
  const [date, setDate] = useState('Happy Birthday Celebration Night 🎂');
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const [createdTicket, setCreatedTicket] = useState(null);

  const posterPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleNextPhoto = () => {
    playPop();
    triggerHaptic(10);
    setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length);
  };

  const handleCreateTicket = (e) => {
    if (e) e.preventDefault();
    if (!movieTitle.trim()) return;

    playSparkle();
    playBloom();
    triggerHaptic([30, 60, 90, 150]);

    const newTicket = {
      title: movieTitle.trim(),
      genre: genre,
      snack: snack,
      date: date || 'Weekend Date Night',
      photoIdx: photoIdx,
      photoUrl: posterPhoto,
      ticketNo: `VIP-BEBO-${Math.floor(Math.random() * 90000) + 10000}`,
      seat: 'Row A • Seats 1 & 2 (Couples VIP Recliner)'
    };

    setCreatedTicket(newTicket);
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `🎬 ROMANTIC CINEMA DATE NIGHT TICKET 🎟️\n\nMovie: "${createdTicket?.title}"\nGenre: ${createdTicket?.genre}\nSeat: ${createdTicket?.seat}\nTicket #: ${createdTicket?.ticketNo}\n\nAdmit Two: Sanzu & Abu! Happy Birthday Queen Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Golden Cinema Ticket Studio 🎬🎟️"
      badgeIcon={<Film className="w-3.5 h-3.5 text-amber-400" />}
      title={"शाही मुभी टिकट स्टुडियो"}
      subtitle={"Design VIP Movie Tickets & Posters for Date Night"}
      description={"Design custom gold-embossed cinema tickets featuring Sanzu's photo as the main movie poster!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16">
        {!createdTicket ? (
          /* FORM BUILDER */
          <div className="p-5 sm:p-6 rounded-3xl bg-white border-2 border-amber-300 shadow-2xl space-y-4">
            <h4 className="text-sm font-extrabold font-nepali text-gray-800 flex items-center gap-1.5">
              <Clapperboard className="w-4 h-4 text-purple-600" />
              Design Cinema Movie Ticket:
            </h4>

            {/* Photo Movie Poster Selector */}
            <div className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 rounded-xl overflow-hidden border-2 border-purple-400 shadow-sm relative bg-black/20 flex-shrink-0">
                  <img
                    src={posterPhoto}
                    alt="Movie Poster"
                    onError={(e) => handlePhotoError(e, photoIdx)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">Movie Poster Photo #{photoIdx + 1}</p>
                  <p className="text-[11px] text-gray-500">Stars as the main cinema poster!</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextPhoto}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer flex-shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Change Poster</span>
              </button>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Movie Title:</label>
              <input
                type="text"
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                placeholder="Movie Title..."
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-2 border-purple-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              <span className="text-[11px] font-bold text-gray-400 flex-shrink-0">Presets:</span>
              {MOVIE_PRESETS.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setMovieTitle(p.title);
                    setGenre(p.genre);
                  }}
                  className="px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-800 text-[11px] font-bold border border-purple-200 whitespace-nowrap cursor-pointer flex-shrink-0"
                >
                  "{p.title.slice(0, 18)}..."
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Date Night Snacks:</label>
              <div className="grid grid-cols-2 gap-2">
                {SNACK_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      playPop();
                      setSnack(s);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer truncate ${
                      snack === s
                        ? 'bg-amber-400 text-amber-950 border-amber-300 font-extrabold shadow-sm'
                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateTicket}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 text-amber-950 font-extrabold text-sm shadow-xl cursor-pointer hover:brightness-110 flex items-center justify-center gap-2 border border-yellow-200"
            >
              <Ticket className="w-4 h-4 fill-amber-950" />
              <span>PRINT VIP GOLDEN CINEMA TICKET! 🎬🎟️</span>
            </motion.button>
          </div>
        ) : (
          /* PRINTED TICKET CARD */
          <motion.div
            initial={{ scale: 0.8, rotateY: 90 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 15 }}
            className="relative max-w-md mx-auto rounded-3xl bg-gradient-to-br from-slate-950 via-purple-950 to-indigo-950 border-4 border-amber-400 shadow-2xl p-6 text-white space-y-4 overflow-hidden select-none"
          >
            {/* Gold Header */}
            <div className="flex items-center justify-between border-b border-amber-400/30 pb-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Ticket className="w-3.5 h-3.5 text-amber-300" />
                GOLDEN VIP CINEMA PASS
              </span>
              <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            </div>

            {/* Poster & Movie Info */}
            <div className="flex gap-4 items-center">
              <div className="w-24 h-36 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-lg bg-black/40 flex-shrink-0">
                <img
                  src={createdTicket.photoUrl}
                  alt="Poster"
                  onError={(e) => handlePhotoError(e, createdTicket.photoIdx)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1.5 flex-1">
                <h3 className="text-lg font-extrabold font-nepali text-amber-200 leading-tight">
                  {createdTicket.title}
                </h3>
                <p className="text-xs text-purple-200 font-bold">{createdTicket.genre}</p>
                <p className="text-[11px] text-amber-300 font-mono">{createdTicket.seat}</p>
                <p className="text-[11px] text-gray-300">{createdTicket.snack}</p>
              </div>
            </div>

            {/* Ticket Stub Barcode */}
            <div className="p-3 rounded-2xl bg-black/60 border border-amber-400/30 flex items-center justify-between text-xs font-mono text-amber-300">
              <div>
                <p className="font-bold text-[10px] text-gray-400">TICKET NO.</p>
                <p className="font-extrabold">{createdTicket.ticketNo}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[10px] text-gray-400">ADMIT TWO</p>
                <p className="font-extrabold text-pink-300">SANZU & ABU 💖</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCreatedTicket(null)}
                className="flex-1 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Create Another</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Ticket</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
