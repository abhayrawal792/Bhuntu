import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PhoneCall, Play, Pause, Heart, Sparkles, Share2, RefreshCw } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const VOICEMAILS = [
  { time: "Today 02:14 AM", title: "Late Night Voice Memo 🌙", msg: "Bebo, I love you so much! Good night from Nepalgunj 💕" },
  { time: "Yesterday 08:30 PM", title: "Missing You Note 🥺", msg: "Can't wait to hear your voice on video call tonight, Sanzu!" },
  { time: "2 Days Ago", title: "Birthday Wish Voice Memo 🎂", msg: "Happy Birthday Fuchhee! You are my eternal blessing!" }
];

export default function SweetVoicemailInbox() {
  const { triggerHaptic } = useAppStore();

  const [active, setActive] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const handlePlay = (i) => {
    playBloom();
    playSparkle();
    triggerHaptic(20);
    setActive(active === i ? null : i);

    let nextPhoto = Math.floor(Math.random() * BHUNTU_PHOTOS.length);
    setPhotoIdx(nextPhoto);

    confetti({ particleCount: 75, spread: 70, origin: { y: 0.5 } });
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `📞 SWEET VOICEMAIL INBOX 📞\n\nPlaying Voicemail for Queen Sanzu:\n"${active !== null ? VOICEMAILS[active].msg : VOICEMAILS[0].msg}"\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="music"
      badge="Voicemail Inbox 📞✨"
      badgeIcon={<PhoneCall className="w-3.5 h-3.5 text-purple-400" />}
      title={"Voicemail Inbox"}
      subtitle={"Vintage Answering Machine Memos for Sanzu"}
      description={"Press play to hear sweet recorded audio messages for Bebo and reveal secret memory photos!"}
    >
      <div className="max-w-xl mx-auto px-4 pb-16 text-center select-none">
        {/* PHOTO DISCOVERY STAGE */}
        <div className="w-full max-w-md mx-auto h-56 rounded-3xl overflow-hidden border-4 border-purple-300 shadow-2xl relative bg-black/40 mb-6">
          <img
            src={currentPhoto}
            alt="Voicemail Photo"
            onError={(e) => handlePhotoError(e, photoIdx)}
            className="w-full h-full object-cover object-[center_20%] brightness-110 contrast-105 saturate-105"
          />
          <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-mono text-purple-200 text-center border border-white/20 font-bold">
            {active !== null ? VOICEMAILS[active].title : "Select Voicemail to Play 📞"}
          </div>
        </div>

        {/* VOICEMAIL LIST */}
        <div className="space-y-3 max-w-md mx-auto mb-6">
          {VOICEMAILS.map((v, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-purple-400/40 text-left shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-white block">{v.title}</span>
                  <span className="text-[10px] text-purple-300 font-mono block">{v.time}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handlePlay(i)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/20 shadow ${
                    active === i ? 'bg-rose-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-500'
                  }`}
                >
                  {active === i ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>
              </div>

              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-purple-200 italic border-t border-purple-500/30 pt-2 mt-2 leading-relaxed"
                  >
                    "{v.msg}"
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
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
            <span>Share Voicemail</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
