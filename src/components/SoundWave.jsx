import WorldShell from './WorldShell';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Play, Pause, Heart, Sparkles, Volume2, Music, Radio, Send, VolumeX, Mic } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const SOUND_TRACKS = [
  {
    id: 1,
    title: 'Happy Birthday My Queen 💖',
    genre: 'Romantic Acoustic Synth',
    duration: '1:45',
    notes: [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 523.25, 392.00], // C major arpeggio
    nepali: "Sanzu, temi mero jeevan ko sabai bhanda pyaro geet hou! Happy Birthday Bebo! ❤️🎂",
    english: "Sanzu, you are my happiest hello and my sweetest melody.",
    photoIdx: 0
  },
  {
    id: 2,
    title: 'Nepalgunj to Osaka Beats ✈️',
    genre: 'Lo-Fi Chill & Distance Waves',
    duration: '2:10',
    notes: [349.23, 440.00, 523.25, 659.25, 523.25, 440.00, 349.23, 261.63], // F maj7 notes
    nepali: "Nepalgunj bata Osaka Sakai hazaarau miles bhaye pani temro aawaj le duri birsaidinx! ✈️",
    english: "No sea or mountain can separate two souls destined to be one.",
    photoIdx: 15
  },
  {
    id: 3,
    title: 'Late Night Pillow Talk 🌙',
    genre: 'Dreamy Ambient Lullaby',
    duration: '2:30',
    notes: [392.00, 493.88, 587.33, 739.99, 587.33, 493.88], // G maj7 notes
    nepali: "Every night 'Good night babe' vanera suta ko kasto pyaro feel huncha, mero Bebo! 🌙",
    english: "I fall asleep counting all the reasons why I love you.",
    photoIdx: 42
  },
  {
    id: 4,
    title: 'Light Blue Scooter Serenade 🛵',
    genre: 'Upbeat Romantic Pop',
    duration: '1:55',
    notes: [440.00, 554.37, 659.25, 880.00, 659.25, 554.37], // A major anthem
    nepali: "Light blue scooter ma Bardiya jada ra 30 to 40 kiddos huda sammi sadhai temrai hu! 🛵💙",
    english: "Riding through life together on our blue scooter forever!",
    photoIdx: 88
  }
];

export default function SoundWave() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.soundWave;
  const { triggerHaptic } = useAppStore();

  const [activeTrackIdx, setActiveTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const noteStepRef = useRef(0);

  // Initialize Web Audio Context
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Play Single Synth Tone
  const playTone = (freq, duration = 0.3) => {
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume * 0.3, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Web Audio Playback failed:', e);
    }
  };

  // Loop Melody Synth
  useEffect(() => {
    if (isPlaying) {
      const track = SOUND_TRACKS[activeTrackIdx];
      noteStepRef.current = 0;

      timerRef.current = setInterval(() => {
        const freq = track.notes[noteStepRef.current % track.notes.length];
        playTone(freq, 0.4);
        noteStepRef.current += 1;
      }, 350);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeTrackIdx, volume]);

  const handleTogglePlay = (idx) => {
    getAudioContext();
    triggerHaptic(20);

    if (activeTrackIdx === idx && isPlaying) {
      setIsPlaying(false);
    } else {
      setActiveTrackIdx(idx);
      setIsPlaying(true);
      playSparkle();
    }
  };

  // Speak Voice Note
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

  const currTrack = SOUND_TRACKS[activeTrackIdx];
  const photoSrc = BHUNTU_PHOTOS[currTrack.photoIdx % BHUNTU_PHOTOS.length];

  return (
    <WorldShell
      theme="music"
      badge="Real Audio Waveform & Player 🎧"
      badgeIcon={<Headphones className="w-3.5 h-3.5 text-purple-400 animate-pulse" />}
      title="Bhuntu's Romantic Soundwave Station 🎧"
      subtitle="Listen to real Web Audio synth melodies, speech voice broadcasts & waveform visualizers!"
      description="100% working audio melodies composed exclusively for Sanzu Rawal!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* Main Audio Visualizer Player Deck */}
        <div className="glass-card p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-purple-950 via-slate-900 to-indigo-950 text-white border-2 border-purple-500/40 shadow-2xl space-y-5 text-center relative overflow-hidden">
          
          {/* Animated Glowing Waveform Spectrum */}
          <div className="flex justify-center items-end gap-1.5 h-20 px-4 py-2 bg-black/40 rounded-2xl border border-purple-500/30">
            {[14, 28, 55, 30, 75, 42, 88, 35, 60, 22, 70, 48, 95, 32, 64, 25, 50, 18, 80, 40].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isPlaying ? [12, h, 15, h * 0.9, 12] : 8,
                  backgroundColor: isPlaying ? ['#a855f7', '#ec4899', '#3b82f6', '#a855f7'] : '#6b7280'
                }}
                transition={{
                  repeat: isPlaying ? Infinity : 0,
                  duration: 0.6,
                  delay: (i % 5) * 0.08,
                  ease: 'easeInOut'
                }}
                className="w-2.5 sm:w-3 rounded-full shadow-lg"
              />
            ))}
          </div>

          {/* Current Playing Track Meta & Photo */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-left bg-purple-900/40 p-4 rounded-2xl border border-purple-400/30">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-xl shrink-0 relative">
              <img
                src={photoSrc}
                onError={e => handlePhotoError(e, currTrack.photoIdx)}
                alt="Track Cover"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-black/70 text-purple-300 font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                Track #{currTrack.id}
              </span>
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 border border-purple-400/40">
                  {currTrack.genre}
                </span>
                <span className="text-xs font-mono text-purple-300">{currTrack.duration}</span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white font-nepali">
                {currTrack.title}
              </h3>
              <p className="text-xs text-purple-200/90 font-nepali leading-relaxed">
                "{currTrack.nepali}"
              </p>
              <p className="text-[11px] text-pink-300 italic">
                "{currTrack.english}"
              </p>
            </div>
          </div>

          {/* Audio Controls Bar */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleTogglePlay(activeTrackIdx)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-extrabold text-xs shadow-xl cursor-pointer hover:scale-105 transition-all flex items-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? 'PAUSE MELODY' : 'PLAY REAL SYNTH MELODY 🎵'}</span>
            </button>

            <button
              onClick={() => handleSpeakVoice(currTrack.nepali)}
              className={`px-4 py-3.5 rounded-full font-bold text-xs cursor-pointer transition-all border flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-purple-900/60 text-purple-200 border-purple-500/40 hover:bg-purple-800'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>{isSpeaking ? 'Reading...' : 'Voice Broadcast 🎙️'}</span>
            </button>
          </div>

        </div>

        {/* Playlist Track Selection List */}
        <div className="space-y-2">
          <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider text-left px-1">
            🎵 Bhuntu's Romantic Soundwave Tracks (Click to Play)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SOUND_TRACKS.map((t, idx) => {
              const isCurrent = activeTrackIdx === idx;
              const isCurrentPlaying = isCurrent && isPlaying;

              return (
                <button
                  key={t.id}
                  onClick={() => handleTogglePlay(idx)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-left flex items-center justify-between gap-3 shadow-md ${
                    isCurrentPlaying
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-purple-500 ring-2 ring-purple-300 scale-102'
                      : isCurrent
                        ? 'bg-purple-100 text-purple-900 border-purple-400'
                        : 'bg-white text-gray-800 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-inner ${
                      isCurrentPlaying ? 'bg-white text-purple-600' : 'bg-purple-200 text-purple-800'
                    }`}>
                      {isCurrentPlaying ? <Music className="w-4 h-4 animate-bounce" /> : `#${t.id}`}
                    </div>

                    <div>
                      <h5 className="text-xs font-extrabold line-clamp-1">{t.title}</h5>
                      <span className={`text-[10px] ${isCurrentPlaying ? 'text-purple-200' : 'text-gray-500'}`}>
                        {t.genre} • {t.duration}
                      </span>
                    </div>
                  </div>

                  {isCurrentPlaying ? <Pause className="w-4 h-4 shrink-0" /> : <Play className="w-4 h-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* WhatsApp Share Track Button */}
        <button
          onClick={() => {
            sendWhatsAppMessage(`🎧 Hey Abu! I am listening to Track #${currTrack.id} (${currTrack.title}) on our Soundwave station:\n\n"${currTrack.nepali}"\n\n("${currTrack.english}") ❤️✨`, '🎧 Soundwave Track');
          }}
          className="w-full py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Share Track #{currTrack.id} to Abu on WhatsApp 📲</span>
        </button>

      </div>
    </WorldShell>
  );
}
