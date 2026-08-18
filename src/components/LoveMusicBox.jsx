import WorldShell from './WorldShell';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Heart, Sparkles, Volume2, Play, Pause, Disc, RotateCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { audioEngine, playSparkle, playChime, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const MUSIC_BOX_TRACKS = [
  { name: 'Bhuntu Romantic Lullaby 🎹', idx: 0, desc: 'Soft romantic piano harmony' },
  { name: 'Nepalgunj Love Chords 🎶', idx: 1, desc: 'Warm comforting music box tones' },
  { name: 'Osaka Sunset Melody 🌅', idx: 2, desc: 'Gentle lofi pentatonic bells' },
  { name: 'Heartbeat Symphony 💖', idx: 3, desc: 'Rhythmic heartbeat & chime melody' }
];

export default function LoveMusicBox() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.musicBox;
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(0);
  const { triggerHaptic, setAudioState } = useAppStore();

  const handleWindUp = () => {
    triggerHaptic([20, 50, 20]);
    if (!isPlaying) {
      playBloom();
      audioEngine.init();
      audioEngine.setTrack(selectedTrack);
      audioEngine.start();
      setAudioState('playing');
      setIsPlaying(true);
    } else {
      audioEngine.stop();
      setAudioState('muted');
      setIsPlaying(false);
    }
  };

  const handleSelectTrack = (idx) => {
    setSelectedTrack(idx);
    audioEngine.setTrack(idx);
    playChime();
    triggerHaptic(15);
    if (!isPlaying) {
      audioEngine.init();
      audioEngine.start();
      setAudioState('playing');
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      // Keep background music preference when leaving
    };
  }, []);

  return (
    <WorldShell
      theme="music"
      badge="Wind-up Lullaby 🎶"
      badgeIcon={<Music className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Interactive Music Box Card */}
      <div className="max-w-md mx-auto space-y-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={handleWindUp}
          className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-purple-300 shadow-2xl bg-gradient-to-b from-amber-100 via-amber-50 to-pink-50 text-center relative overflow-hidden cursor-pointer group"
        >
          {/* Floating animated music notes */}
          <AnimatePresence>
            {isPlaying && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div
                    key={i}
                    initial={{ y: 150, x: (i * 60) - 120, opacity: 0, scale: 0.5 }}
                    animate={{ y: -50, opacity: [0, 0.8, 0], scale: 1.2, rotate: [0, 20, -20] }}
                    transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5, ease: 'easeOut' }}
                    className="absolute bottom-4 left-1/2 text-rose-500 font-black text-xl"
                  >
                    {['🎵', '🎶', '✨', '💖', '🎹'][i % 5]}
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Rotating Heart Center Piece */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 text-white flex items-center justify-center mx-auto mb-5 shadow-2xl relative border-4 border-white/80">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Heart className="w-14 h-14 fill-white drop-shadow-md" />
            </motion.div>

            {/* Rotating Wind-up Key */}
            <motion.div
              animate={{ rotate: isPlaying ? [0, 180, 360] : 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute -right-3 -top-2 bg-amber-400 text-amber-950 p-2 rounded-full shadow-lg border border-white"
            >
              <RotateCw className="w-4 h-4" />
            </motion.div>
          </div>

          <h3 className="text-xl font-black font-nepali text-gray-900 mb-1">
            {isPlaying ? '🎶 Playing Romantic Wind-up Melody...' : 'Turn Wind-up Key to Play Melody 🗝️'}
          </h3>
          <p className="text-xs text-rose-600 font-semibold mb-5 font-ui">
            {isPlaying ? MUSIC_BOX_TRACKS[selectedTrack].name : 'Tap the key below to start listening to soothing melodies for Bhuntu 💕'}
          </p>

          <button className={`px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2.5 mx-auto shadow-xl transition-all cursor-pointer font-ui ${
            isPlaying ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white animate-pulse' : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105'
          }`}>
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
            <span>{isPlaying ? 'Pause Music Box' : 'Turn Wind-up Key 🗝️'}</span>
          </button>
        </motion.div>

        {/* Melody Selector Grid */}
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-pink-200 shadow-md text-left">
          <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Disc className="w-4 h-4 text-purple-500 animate-spin" style={{ animationDuration: '6s' }} />
            Select Music Box Melody (4 Melodies)
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {MUSIC_BOX_TRACKS.map(tr => (
              <button
                key={tr.idx}
                onClick={() => handleSelectTrack(tr.idx)}
                className={`p-3 rounded-xl font-ui transition-all text-xs font-bold flex items-center justify-between border cursor-pointer ${
                  selectedTrack === tr.idx && isPlaying
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-md scale-102'
                    : 'bg-pink-50/80 text-gray-800 border-pink-100 hover:bg-pink-100'
                }`}
              >
                <div>
                  <div className="font-extrabold">{tr.name}</div>
                  <div className={`text-[11px] font-normal mt-0.5 ${selectedTrack === tr.idx && isPlaying ? 'text-pink-100' : 'text-gray-500'}`}>
                    {tr.desc}
                  </div>
                </div>
                {selectedTrack === tr.idx && isPlaying && (
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-bounce" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </WorldShell>
  );
}
