import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Mail,
  Send,
  Sparkles,
  Share2,
  RefreshCw,
  X
} from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

export default function HeartMailbox() {
  const { triggerHaptic } = useAppStore();

  const [letter, setLetter] = useState('');
  const [sentLetters, setSentLetters] = useState([]);
  const [flagUp, setFlagUp] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [activeLetterModal, setActiveLetterModal] = useState(null);

  const handlePostLetter = (e) => {
    if (e) e.preventDefault();
    if (!letter.trim()) return;

    playPop();
    playBloom();
    triggerHaptic([20, 50, 80]);

    setFlagUp(true);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    const newLetter = {
      id: Date.now(),
      text: letter.trim(),
      photoIdx: nextPhoto,
      photoUrl: BHUNTU_PHOTOS[nextPhoto % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0]
    };

    setSentLetters((prev) => [newLetter, ...prev]);
    setLetter('');
    setActiveLetterModal(newLetter);

    confetti({ particleCount: 75, spread: 75, origin: { y: 0.6 } });
  };

  const handleShareWhatsApp = (l) => {
    playSparkle();
    const text = `📮 HEART POST MAILBOX LETTER 📮\n\n"${l?.text || 'Happy Birthday Sanzu!'}"\n\n- Posted with love for Queen Sanzu Rawal! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="paper"
      badge="Heart Post Mailbox 📮✨"
      badgeIcon={<Mail className="w-3.5 h-3.5 text-rose-400" />}
      title={"मायाको हुलाक बाकस"}
      subtitle={"Post Stamped Love Letters into the Mailbox"}
      description={"Type a sweet love letter and drop it into the red heart mailbox to attach a secret photo envelope!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* 3D RED MAILBOX STAGE */}
        <div className="relative w-64 h-56 mx-auto mb-6 flex flex-col items-center justify-center">
          <div className="w-48 h-36 bg-gradient-to-b from-red-600 to-rose-700 rounded-t-full border-4 border-rose-800 shadow-2xl relative flex items-center justify-center">
            <div className="w-32 h-4 bg-rose-950 rounded-full border border-rose-900 shadow-inner" />
            <motion.div
              animate={{ rotate: flagUp ? -90 : 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="absolute -right-3 top-8 w-4 h-16 bg-amber-400 rounded-full border-2 border-amber-600 origin-bottom flex items-top justify-center shadow-md"
            >
              <span className="text-[11px] font-bold text-amber-950 mt-1">🚩</span>
            </motion.div>
          </div>
          <div className="w-8 h-20 bg-amber-900 border-2 border-amber-950 shadow-lg" />
        </div>

        {/* LETTER FORM */}
        <form onSubmit={handlePostLetter} className="flex gap-2 max-w-md mx-auto mb-6">
          <input
            type="text"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            placeholder="Write a stamped love letter..."
            maxLength={60}
            className="flex-1 px-4 py-3 rounded-2xl bg-white border-2 border-rose-200 text-sm font-bold text-gray-800 focus:outline-none focus:border-rose-500 shadow-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!letter.trim()}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-extrabold text-xs shadow-md cursor-pointer disabled:opacity-40 flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Post</span>
          </motion.button>
        </form>

        {/* POSTED LETTERS LIST */}
        {sentLetters.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
            <AnimatePresence>
              {sentLetters.map((l) => (
                <motion.div
                  key={l.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => {
                    playSparkle();
                    setActiveLetterModal(l);
                  }}
                  className="px-3.5 py-2 rounded-2xl bg-rose-100 text-rose-900 text-xs font-bold border border-rose-200 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform shadow-sm"
                >
                  <span>📮 "{l.text}"</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* LETTER ENVELOPE MODAL POPUP */}
        <AnimatePresence>
          {activeLetterModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-sm w-full p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border-2 border-rose-400 shadow-2xl text-center"
              >
                {/* Top Left Close Icon Button */}
                <button
                  type="button"
                  onClick={() => {
                    playPop();
                    setActiveLetterModal(null);
                  }}
                  className="absolute top-4 left-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 active:scale-95"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-400/20 border border-rose-300/40 text-rose-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                  📮 Stamped Envelope Unlocked!
                </span>

                <h3 className="text-xl font-extrabold font-nepali text-white mb-3">
                  "{activeLetterModal.text}"
                </h3>

                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border-2 border-amber-300/80 shadow-lg relative bg-black/40">
                  <img
                    src={activeLetterModal.photoUrl}
                    alt="Letter Photo"
                    onError={(e) => handlePhotoError(e, activeLetterModal.photoIdx)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono text-amber-200 text-center border border-white/20">
                    Stamped Letter Memory Photo 📮📸
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleShareWhatsApp(activeLetterModal)}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Letter on WhatsApp 💬</span>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </WorldShell>
  );
}
