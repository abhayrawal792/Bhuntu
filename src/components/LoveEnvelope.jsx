import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, Send, Volume2, Stamp, RefreshCw, PenTool, CheckCircle2, Lock } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const STAMPS = [
  { id: 'initial', name: 'A ❤️ S Gold Seal', icon: '👑', color: 'from-amber-400 to-amber-600' },
  { id: 'heart', name: 'Pink Twin Hearts', icon: '💖', color: 'from-rose-500 to-pink-600' },
  { id: 'crown', name: 'Royal Wifey Seal', icon: '👸', color: 'from-purple-500 to-indigo-600' }
];

const LETTER_PRESETS = [
  {
    id: 1,
    title: "Abu's Official Birthday Letter 👑",
    nepali: "Mero Pyari Bebo Sanzu, jab bata temi mero jeevan ma aayou, mero sansar nai badliyo. Nepalgunj bata Osaka 4,800km dur bhaye pani mero mutu sadhai temrai woripori huncha. Happy Birthday my queen!",
    english: "From the moment I met you, my world changed forever. Distance means nothing when someone means everything.",
    photoIdx: 0
  },
  {
    id: 2,
    title: "Light Blue Scooter & Bardiya Journey 🛵",
    nepali: "Bardiya tira light blue scooter ma ghumna jada ra paxi 30 to 40 kiddos sanga sweet home ma basda ko samjhana sadhai mero heart ma rahechha. Temi nai mero sabai bhanda pyaro partner hou!",
    english: "Riding through life together on our scooter to Bardiya is my favorite dream.",
    photoIdx: 25
  },
  {
    id: 3,
    title: "Forever Wifey & Marriage Promise 💍",
    nepali: "Sanzu Rawal, ma temlai sadhai usto dherai maya gariraxu ra sadhai garirahansuk. Temi nai mero vartaman ra bhavishya hou, mero wifey Bebo!",
    english: "I loved you yesterday, I love you today, and I will love you for all of my futures.",
    photoIdx: 64
  }
];

export default function LoveEnvelope() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveEnvelope;
  const { triggerHaptic } = useAppStore();

  const [selectedStamp, setSelectedStamp] = useState(STAMPS[0]);
  const [selectedLetter, setSelectedLetter] = useState(LETTER_PRESETS[0]);
  const [sealTaps, setSealTaps] = useState(0);
  const [isCracked, setIsCracked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [customLetterText, setCustomLetterText] = useState('');
  const [activeTab, setActiveTab] = useState('preset'); // preset | write

  const handleSealTap = () => {
    if (isCracked) return;
    playPop();
    triggerHaptic(25);
    const next = sealTaps + 1;
    setSealTaps(next);

    if (next >= 3) {
      setIsCracked(true);
      playBloom();
      triggerHaptic([30, 90, 40]);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });

      setTimeout(() => {
        setIsOpen(true);
      }, 600);
    }
  };

  const handleResetEnvelope = () => {
    playPop();
    setSealTaps(0);
    setIsCracked(false);
    setIsOpen(false);
  };

  const handleSpeakVoice = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    playSparkle();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const photoSrc = BHUNTU_PHOTOS[selectedLetter.photoIdx % BHUNTU_PHOTOS.length];

  return (
    <WorldShell
      theme="paper"
      badge="3D Wax Sealed Love Envelope ✉️"
      badgeIcon={<Mail className="w-3.5 h-3.5 text-rose-500 animate-bounce" />}
      title="Bhuntu's 3D Sealed Love Envelope Studio ✉️"
      subtitle="Select a wax seal stamp, tap to crack open the vintage envelope & read Abu's love letters!"
      description="100% interactive envelope studio with custom wax seals and voice letter reading!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* Preset vs Custom Tab Bar */}
        <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-pink-200 shadow-sm">
          <button
            onClick={() => { playPop(); setActiveTab('preset'); handleResetEnvelope(); }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'preset'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-pink-50'
            }`}
          >
            <span>💌 Abu's Preset Love Letters</span>
          </button>

          <button
            onClick={() => { playPop(); setActiveTab('write'); handleResetEnvelope(); }}
            className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'write'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-gray-700 hover:bg-pink-50'
            }`}
          >
            <span>✍️ Write Custom Love Letter</span>
          </button>
        </div>

        {/* Stamp Choice Chips */}
        {!isOpen && (
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider block">
              Choose Wax Seal Stamp:
            </span>
            <div className="flex items-center justify-center gap-2">
              {STAMPS.map(stamp => (
                <button
                  key={stamp.id}
                  onClick={() => { playPop(); setSelectedStamp(stamp); }}
                  className={`px-3.5 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-1.5 ${
                    selectedStamp.id === stamp.id
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-105'
                      : 'bg-white text-gray-700 border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  <span>{stamp.icon} {stamp.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Preset Selection List */}
        {!isOpen && activeTab === 'preset' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {LETTER_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => { playPop(); setSelectedLetter(preset); handleResetEnvelope(); }}
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer text-xs font-black ${
                  selectedLetter.id === preset.id
                    ? 'bg-rose-500 text-white border-rose-500 shadow-md scale-102'
                    : 'bg-white text-gray-800 border-pink-200 hover:bg-pink-50'
                }`}
              >
                <div className="line-clamp-1">{preset.title}</div>
              </button>
            ))}
          </div>
        )}

        {/* Custom Letter Input Box */}
        {!isOpen && activeTab === 'write' && (
          <div className="glass-card p-4 rounded-2xl border-2 border-pink-300 bg-white text-left space-y-2">
            <label className="text-xs font-extrabold text-gray-800 flex items-center gap-1">
              <PenTool className="w-3.5 h-3.5 text-rose-500" />
              <span>Write your own love letter to seal inside:</span>
            </label>
            <textarea
              value={customLetterText}
              onChange={e => setCustomLetterText(e.target.value)}
              placeholder="Type your romantic message to Abu here..."
              rows={3}
              className="w-full p-3 rounded-xl border border-pink-200 text-xs font-medium outline-none focus:border-rose-400 bg-pink-50/30 resize-none font-ui"
            />
          </div>
        )}

        {/* 3D ENVELOPE INTERACTIVE DISPLAY */}
        <div className="relative max-w-md mx-auto py-4">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.div
                key="closed-envelope"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full h-60 rounded-3xl bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center p-6 text-white overflow-hidden"
              >
                {/* Envelope Flap Triangle */}
                <div
                  className="absolute top-0 left-0 right-0 h-24 bg-rose-900 border-b-2 border-amber-300/40 shadow-lg origin-top"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />

                {/* Interactive Wax Seal Stamp */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleSealTap}
                  className={`relative z-20 w-24 h-24 rounded-full bg-gradient-to-br ${selectedStamp.color} border-4 border-amber-300 shadow-2xl flex flex-col items-center justify-center cursor-pointer`}
                >
                  <span className="text-2xl mb-0.5">{selectedStamp.icon}</span>
                  <span className="text-[10px] font-black text-amber-100 uppercase tracking-tight font-mono">
                    {3 - sealTaps > 0 ? `TAP ${3 - sealTaps}X` : 'OPENING'}
                  </span>
                </motion.button>

                <p className="relative z-10 text-xs font-extrabold text-amber-200 mt-4 tracking-wide font-nepali">
                  To: Princess Sanzu Rawal (Bebo) ❤️
                </p>
                <span className="relative z-10 text-[10px] text-pink-200/80 italic">
                  Tap the wax seal {3 - sealTaps} times to break open!
                </span>
              </motion.div>
            ) : (
              /* OPENED LETTER PARCHMENT DISPLAY */
              <motion.div
                key="opened-letter"
                initial={{ y: 30, opacity: 0, scale: 0.92 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -30, opacity: 0 }}
                className="glass-card p-6 sm:p-7 rounded-3xl border-4 border-amber-300 bg-amber-50/95 shadow-2xl text-left space-y-4 relative"
              >
                {/* Vintage Letterhead Bar */}
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-800" />
                    <h3 className="text-xs font-black text-amber-950 uppercase tracking-wider">
                      {activeTab === 'write' ? 'Bhuntu\'s Custom Sealed Letter 📜' : selectedLetter.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleSpeakVoice(activeTab === 'write' ? customLetterText : selectedLetter.nepali)}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-all ${
                      isSpeaking
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isSpeaking ? 'Reading...' : 'Voice Read 🎙️'}</span>
                  </button>
                </div>

                {/* Photo & Letter Content */}
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-md shrink-0">
                    <img
                      src={photoSrc}
                      onError={e => handlePhotoError(e, selectedLetter.photoIdx)}
                      alt="Letter Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <p className="text-sm font-black text-amber-950 font-nepali leading-relaxed">
                      "{activeTab === 'write' ? (customLetterText || 'My dearest Abu, you are my happiest love story!') : selectedLetter.nepali}"
                    </p>
                    {activeTab === 'preset' && (
                      <p className="text-xs text-rose-700 italic font-semibold">
                        "{selectedLetter.english}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-amber-200">
                  <button
                    onClick={() => {
                      const msg = activeTab === 'write'
                        ? customLetterText
                        : selectedLetter.nepali;
                      sendWhatsAppMessage(`💌 Hey Abu! I unsealed our vintage love letter:\n\n"${msg}"\n\n❤️ Sealed with infinite love! ✨`, '💌 Sealed Love Letter');
                    }}
                    className="w-full sm:flex-1 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Letter to Abu on WhatsApp 📲</span>
                  </button>

                  <button
                    onClick={handleResetEnvelope}
                    className="w-full sm:w-auto px-5 py-3 rounded-full bg-amber-200 text-amber-950 font-extrabold text-xs hover:bg-amber-300 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Re-seal ✉️
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ALWAYS VISIBLE SEND TO ABU BUTTON ON MAIN PAGE */}
        <div className="pt-2">
          <button
            onClick={() => {
              const msg = activeTab === 'write'
                ? (customLetterText || 'My dearest Abu, you are my happiest love story!')
                : selectedLetter.nepali;
              sendWhatsAppMessage(`💌 Hey Abu! I sealed this love letter for you on our site:\n\n"${msg}"\n\n❤️ Sealed with infinite love! ✨`, '💌 Sealed Love Letter');
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 font-ui"
          >
            <Send className="w-4 h-4 fill-white animate-bounce" />
            <span>Send Sealed Love Letter to Abu on WhatsApp 📲</span>
          </button>
        </div>

      </div>
    </WorldShell>
  );
}
