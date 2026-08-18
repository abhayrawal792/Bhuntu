import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Cookie, Heart, RotateCcw, Sparkles, Send, Volume2, Plus } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const ABU_FORTUNES = [
  "🥠 Fortune says: Abu, you are my absolute favorite person in the whole universe! 💖",
  "🥠 Fortune says: Abu, prepare to take me on our light blue scooter to Bardiya! 🛵",
  "🥠 Fortune says: Abu, 4,800 km distance cannot stop my heart from loving you every single day! 🌏",
  "🥠 Fortune says: Abu, you owe me hot chiya & momos in Nepalgunj right now! ☕🥟",
  "🥠 Fortune says: Abu, the universe has officially declared you Sanzu's eternal soulmate! 👑✨"
];

export default function LoveFortuneCookie() {
  const [cracked, setCracked] = useState(false);
  const [fortune, setFortune] = useState(null);
  const [history, setHistory] = useState([]);
  const [customFortune, setCustomFortune] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleCrack = () => {
    if (cracked) return;
    playBloom();
    triggerHaptic([30, 60, 30]);

    const chosen = customFortune.trim()
      ? `🥠 Fortune says: Abu, ${customFortune.trim()}! 💖`
      : ABU_FORTUNES[Math.floor(Math.random() * ABU_FORTUNES.length)];

    setFortune(chosen);
    setCracked(true);
    setHistory(prev => [...prev, chosen]);
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } });
  };

  const handleSpeakVoice = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    playSparkle();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleReset = () => {
    playPop();
    setCracked(false);
    setFortune(null);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="Love Fortune Cookie Bakery 🥠"
      badgeIcon={<Cookie className="w-3.5 h-3.5 text-amber-500 animate-bounce" />}
      title="Sanzu's Love Fortune Cookie for Abu 🥠"
      subtitle="Crack open golden fortune cookies to reveal playful, affectionate love fortunes for Abhay (Abu)!"
      description="100% interactive fortune cookie bakery with custom fortunes, voice reader & WhatsApp sharing!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* COOKIE DISPLAY AREA */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          {!cracked ? (
            <motion.button
              whileHover={{ scale: 1.06, rotate: 5 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleCrack}
              className="w-52 h-52 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-4 border-amber-200 shadow-2xl flex flex-col items-center justify-center cursor-pointer relative"
            >
              <div className="w-full h-1 bg-amber-600/40 absolute top-1/2 -translate-y-1/2" />
              <span className="text-7xl mb-2 drop-shadow-md">🥠</span>
              <span className="text-xs font-black text-amber-950 bg-white/60 backdrop-blur-xs px-3.5 py-1 rounded-full shadow-sm uppercase tracking-wider">
                TAP TO CRACK OPEN FOR ABU!
              </span>
            </motion.button>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="w-full"
            >
              {/* Split Cookie Graphic */}
              <div className="flex justify-between items-center px-4 mb-3">
                <motion.span animate={{ x: -25, rotate: -25 }} className="text-6xl drop-shadow-md">🥠</motion.span>
                <motion.span animate={{ x: 25, rotate: 25 }} className="text-6xl drop-shadow-md">🥠</motion.span>
              </div>

              {/* Fortune Slip */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-5 sm:p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-2xl text-left relative space-y-3"
              >
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="text-[11px] font-mono text-amber-900 font-black uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>LUCKY FORTUNE FOR ABU #{history.length}</span>
                  </span>

                  <button
                    onClick={() => handleSpeakVoice(fortune)}
                    className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-all ${
                      isSpeaking ? 'bg-amber-500 text-white animate-pulse' : 'bg-amber-200 text-amber-900 hover:bg-amber-300'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Voice Read 🎙️</span>
                  </button>
                </div>

                <p className="text-sm font-extrabold text-amber-950 italic leading-relaxed">
                  {fortune}
                </p>

                <div className="text-[11px] text-amber-800/80 font-mono flex justify-between pt-1 border-t border-amber-200/60">
                  <span>Lucky Numbers: 4 • 8 • 20 • 143</span>
                  <span>Stamp: Eternal Love 💕</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* CONTROLS */}
        {cracked && (
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs shadow-lg cursor-pointer flex items-center gap-1.5 mx-auto font-ui"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Crack Another Fortune Cookie 🥠
          </button>
        )}

        {/* CUSTOM FORTUNE INPUT */}
        <div className="glass-card p-4 rounded-2xl border-2 border-amber-300 bg-white text-left space-y-2.5 max-w-md mx-auto">
          <label className="text-xs font-black text-gray-800 flex items-center gap-1">
            <Plus className="w-4 h-4 text-amber-600" />
            <span>Write a Custom Fortune for Abu:</span>
          </label>
          <input
            type="text"
            value={customFortune}
            onChange={(e) => setCustomFortune(e.target.value)}
            placeholder="Type fortune (e.g. 'you owe me a scooter trip to Bardiya!')..."
            className="w-full p-3 rounded-xl border border-amber-200 text-xs font-bold text-gray-800 outline-none focus:border-amber-400 bg-amber-50/30"
          />
        </div>

        {/* ALWAYS VISIBLE WHATSAPP SENDER */}
        <div className="max-w-md mx-auto pt-2">
          <button
            onClick={() => {
              const textToSend = fortune ? fortune : ABU_FORTUNES[0];
              sendWhatsAppMessage(`${textToSend}\n\n🥠 Sealed & Cracked with love by your Sanzu! 💖`, '🥠 Love Fortune Cookie for Abu');
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 font-ui"
          >
            <Send className="w-4 h-4 fill-white animate-bounce" />
            <span>Send Fortune Cookie to Abu on WhatsApp 📲</span>
          </button>
        </div>

      </div>
    </WorldShell>
  );
}
