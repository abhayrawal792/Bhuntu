import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CERTS = [
  { cert: "Official Certificate of Eternal Love 📜", desc: "Issued on October 28, 2025 certifying Abu & Queen Sanzu bound in everlasting love!" },
  { cert: "Nepalgunj to Osaka Relationship License 🌐", desc: "Certifying 4,500 miles connected by pure devotion!" },
  { cert: "Everlasting Marriage Vow Certificate 💍", desc: "Official seal for our future dream home and lifelong happiness!" }
];

export default function CoupleRelationshipCert() {
  const { triggerHaptic } = useAppStore();

  const [certIdx, setCertIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentCert = CERTS[certIdx % CERTS.length];
  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handleSelectCert = (idx) => {
    playBloom();
    playSparkle();
    triggerHaptic(15);
    setCertIdx(idx);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📜 RELATIONSHIP CERTIFICATE 📜\n\n[${currentCert.cert}]\n"${currentCert.desc}"\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="retro"
      badge="Relationship Certificate 📜✨"
      badgeIcon={<Award className="w-3.5 h-3.5 text-amber-400" />}
      title={"Couple Relationship Certificate"}
      subtitle={"Official Certificate of Eternal Devotion"}
      description={"Inspect official relationship certificates and seals issued for Abu & Queen Sanzu to unlock photo cards!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* CERT CANVAS & PHOTO STAGE */}
        <AnimatePresence mode="wait">
          <motion.div
            key={certIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative max-w-sm mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-amber-400 shadow-2xl space-y-4 mb-6 flex flex-col items-center"
          >
            {/* Photo Frame */}
            <div className="w-full h-52 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Certificate Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
              <div className="absolute top-2 right-2 bg-amber-950/80 px-3 py-1 rounded-lg text-xs font-mono text-amber-200 border border-amber-400/40 font-bold">
                📜 Seal #{certIdx + 1}
              </div>
            </div>

            <div className="pt-1 text-left w-full">
              <h3 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider mb-1">
                {currentCert.cert}
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{currentCert.desc}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CERT BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-md mx-auto mb-6">
          {CERTS.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectCert(idx)}
              className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                certIdx === idx
                  ? 'bg-amber-500 text-white border-amber-400 shadow-md font-extrabold'
                  : 'bg-slate-900 text-amber-200 border-amber-500/40 hover:border-amber-400'
              }`}
            >
              📜 Seal #{idx + 1}
            </button>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Certificate</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
