import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Activity, Heart, Radio, Volume2, Send, Play, Pause, Sliders } from 'lucide-react';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const AUDIO_TRACKS = [
  {
    id: 1,
    title: "Abu's Live Heartbeat Pulse (72 BPM) 💓",
    desc: "Recorded live: Abhay's heart beating only for Sanzu.",
    speechText: "Sanzu, listen closely to my heartbeat. Every single beat is calling your name from Osaka to Nepalgunj! 💖"
  },
  {
    id: 2,
    title: "Scooter Ride to Bardiya with Sanzu 🛵",
    desc: "Wind & laughter audio waveform on our scooter journey.",
    speechText: "Sanzu, taking you on our light blue scooter to Bardiya is my absolute favorite memory in the world!"
  },
  {
    id: 3,
    title: "Late Night Chiya & Momo Whispers ☕",
    desc: "Warm tea frequency & cozy laughter in Nepalgunj.",
    speechText: "Sanzu, late night hot momos and chiya dates with you are pure bliss. I love you so much!"
  },
  {
    id: 4,
    title: "Sanzu's 100-Room Royal Birthday Anthem 🎂",
    desc: "Grand birthday soundwave celebrating Queen Sanzu Rawal.",
    speechText: "Sanzu, happy birthday my queen! I built all 100 interactive rooms just to show you how infinitely I love you!"
  }
];

export default function LoveAudioVisualizer() {
  const { triggerHaptic } = useAppStore();
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bars, setBars] = useState(Array(24).fill(25));
  const [bassLevel, setBassLevel] = useState(70);
  const [trebleLevel, setTrebleLevel] = useState(50);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBars(Array(24).fill(0).map(() => Math.min(100, Math.max(15, (bassLevel / 100) * 40 + Math.random() * 60))));
    }, 90);
    return () => clearInterval(interval);
  }, [isPlaying, bassLevel]);

  const track = AUDIO_TRACKS[selectedTrack];

  const handleTogglePlay = () => {
    playSparkle();
    triggerHaptic(20);
    const next = !isPlaying;
    setIsPlaying(next);
    if (next) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      handleSpeakVoice(track.speechText);
    } else {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleSpeakVoice = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <WorldShell
      theme="music"
      badge="Abhay's Heartbeat & Voice Equalizer 🎧💓"
      badgeIcon={<Radio className="w-3.5 h-3.5 text-rose-500 animate-bounce" />}
      title="Sanzu, Listen to Abhay's Heartbeat 📡"
      subtitle="Sanzu, listen to Abhay (Abu)'s live heartbeat pulse & voice waveforms, adjust the love equalizer & send your response to Abu on WhatsApp!"
      description="100% interactive audio visualizer & voice note player with live equalizer & WhatsApp sharing!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* TRACK SELECTOR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {AUDIO_TRACKS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                playPop();
                setSelectedTrack(idx);
                setIsPlaying(false);
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedTrack === idx
                  ? 'bg-rose-500 text-white border-rose-600 shadow-lg scale-102'
                  : 'bg-white/80 text-gray-800 border-pink-200 hover:bg-pink-50'
              }`}
            >
              <span className="text-[10px] font-black uppercase opacity-80">Track #{idx + 1}</span>
              <span className="text-xs font-black line-clamp-1 mt-1">{t.title}</span>
            </button>
          ))}
        </div>

        {/* VISUALIZER DISPLAY BOX */}
        <div className="w-full max-w-md mx-auto rounded-3xl bg-slate-950 border-4 border-rose-400 shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden space-y-4">
          <div className="flex justify-between items-center z-10 border-b border-rose-900/60 pb-3">
            <div className="text-left">
              <span className="text-xs font-black text-rose-300 block">{track.title}</span>
              <span className="text-[10px] text-rose-200/70">{track.desc}</span>
            </div>
            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
              isPlaying ? 'bg-emerald-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400'
            }`}>
              {isPlaying ? 'PLAYING 🎙️' : 'STANDBY'}
            </span>
          </div>

          {/* Waveform Equalizer Bars */}
          <div className="flex items-end justify-center gap-1.5 h-36 z-10 py-2">
            {bars.map((height, i) => (
              <motion.div
                key={i}
                animate={{ height: isPlaying ? `${height}%` : '20%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                className="w-2.5 rounded-t-full bg-gradient-to-t from-rose-600 via-pink-500 to-amber-400 shadow-lg shadow-rose-500/30"
              />
            ))}
          </div>

          {/* Equalizer Controls Sliders */}
          <div className="z-10 grid grid-cols-2 gap-4 bg-slate-900/80 p-3 rounded-2xl border border-rose-950 text-left">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-rose-300 flex items-center gap-1">
                <Sliders className="w-3 h-3 text-pink-400" />
                <span>Love Bass ({bassLevel}%)</span>
              </label>
              <input
                type="range"
                min="30"
                max="100"
                value={bassLevel}
                onChange={e => setBassLevel(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-rose-300 flex items-center gap-1">
                <Sliders className="w-3 h-3 text-amber-400" />
                <span>Treble ({trebleLevel}%)</span>
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={trebleLevel}
                onChange={e => setTrebleLevel(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* PLAY / PAUSE BUTTON */}
        <div className="text-center">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleTogglePlay}
            className={`px-8 py-3.5 rounded-full text-white font-black text-xs shadow-xl cursor-pointer flex items-center justify-center gap-2 mx-auto transition-all font-ui ${
              isPlaying ? 'bg-rose-600 hover:bg-rose-700' : 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:scale-102'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isPlaying ? 'Pause Heartbeat Pulse ⏸️' : 'Play Abhay\'s Heartbeat & Voice Note 🎙️'}</span>
          </motion.button>
        </div>

        {/* ALWAYS VISIBLE WHATSAPP SENDER */}
        <div className="max-w-md mx-auto pt-2">
          <button
            onClick={() => {
              sendWhatsAppMessage(`🎧 Hey Abu! I listened to your Heartbeat & Voice Note track on our site:\n\n"${track.title}"\n\n"${track.speechText}"\n\n💓 My heart beats only for you! ✨`, '🎧 Heartbeat & Voice Waveform');
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 font-ui"
          >
            <Send className="w-4 h-4 fill-white animate-bounce" />
            <span>Send Response to Abu on WhatsApp 📲</span>
          </button>
        </div>

      </div>
    </WorldShell>
  );
}
