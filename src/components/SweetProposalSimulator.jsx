import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Check, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const LOCATIONS = ['Eiffel Tower Sunset, Paris 🗼', 'Kyoto Sakura Garden 🌸', 'Phewa Lake Lakeside, Pokhara ⛵'];
const RINGS = ['Rose Gold Diamond Solitaire 💍', 'Classic Platinum Halo 💍', 'Golden Vintage Heart Ring 💍'];

export default function SweetProposalSimulator() {
  const { triggerHaptic } = useAppStore();

  const [loc, setLoc] = useState(0);
  const [ring, setRing] = useState(0);
  const [proposed, setProposed] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePropose = () => {
    playBloom();
    playSparkle();
    triggerHaptic([40, 80, 120, 160]);
    setProposed(true);
    confetti({ particleCount: 100, spread: 85, origin: { y: 0.5 } });
  };

  const handleReset = () => {
    playPop();
    triggerHaptic(10);
    setProposed(false);
    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💍 DREAM PROPOSAL PLANNER 💍\n\nLocation: ${LOCATIONS[loc]}\nRing: ${RINGS[ring]}\nVerdict: YES 1000%! Sanzu & Abu Forever!\n\nHappy Birthday Queen Sanzu! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Dream Proposal Planner 💍✨"
      badgeIcon={<Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
      title={"Dream Proposal Planner"}
      subtitle={"Simulating Our Future Marriage Proposal"}
      description={"Select the romantic location and engagement ring to unlock Sanzu's proposal ceremony!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {!proposed ? (
          <div className="max-w-md mx-auto space-y-4 p-6 rounded-3xl bg-white border border-pink-200 shadow-xl mb-6 text-left">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2 font-ui">1. Select Proposal Location:</label>
              <div className="space-y-2">
                {LOCATIONS.map((l, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      playPop();
                      setLoc(i);
                    }}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                      loc === i ? 'bg-rose-500 text-white border-rose-500 shadow-xs' : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    <span>{l}</span>
                    {loc === i && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2 font-ui">2. Select Ring Style:</label>
              <div className="space-y-2">
                {RINGS.map((r, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      playPop();
                      setRing(i);
                    }}
                    className={`w-full p-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between cursor-pointer ${
                      ring === i ? 'bg-pink-500 text-white border-pink-500 shadow-xs' : 'bg-gray-50 text-gray-700 border-gray-200'
                    }`}
                  >
                    <span>{r}</span>
                    {ring === i && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handlePropose}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-1.5 cursor-pointer mt-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>Present Proposal Ring to Bebo! 💍</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto p-6 rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl space-y-4 mb-6"
          >
            {/* Photo Card */}
            <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl relative bg-black/40">
              <img
                src={currentPhoto}
                alt="Proposal Photo"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
              />
            </div>

            <div className="pt-1">
              <h3 className="text-xl font-extrabold text-rose-300 mb-1">
                "Sanzu Rawal, Will You Marry Me?"
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                Location: {LOCATIONS[loc]} <br />
                Ring: {RINGS[ring]}
              </p>
              <div className="p-3 bg-rose-500/20 rounded-2xl border border-rose-400/60 text-xs font-extrabold text-rose-200">
                ✅ YES 1000%! Forever & Always Bebo 💕
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Re-plan Proposal</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Proposal</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </WorldShell>
  );
}
