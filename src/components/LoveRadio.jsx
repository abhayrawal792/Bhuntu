import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Volume2, Music, Sparkles } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from './AudioController';
import { useAppStore } from '../store/useAppStore';

const STATIONS = [
  { freq: '88.5 FM', name: 'Love Hits Radio 📻', song: 'Sano Sano Maya — Nepali Acoustic' },
  { freq: '94.3 FM', name: 'Romantic Lo-Fi Chill 🎶', song: 'Late Night Phone Call Beats' },
  { freq: '101.1 FM', name: 'Sanzu & Abhay FM 💖', song: 'Happy Birthday My Queen (Official Track)' }
];

export default function LoveRadio() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveRadio;
  const [stationIdx, setStationIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleTune = (idx) => {
    playSparkle();
    triggerHaptic(20);
    setStationIdx(idx);
    setIsPlaying(true);
  };

  const curr = STATIONS[stationIdx];

  return (
    <WorldShell
      theme="music"
      badge="Vintage FM Love Radio 📻"
      badgeIcon={<Radio className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Radio Unit */}
      <div className="max-w-sm mx-auto p-6 rounded-3xl bg-amber-900 border-4 border-amber-700 shadow-2xl text-amber-100 mb-6">
        <div className="p-4 rounded-2xl bg-amber-950 border border-amber-800 mb-4 text-center font-mono">
          <span className="text-xs text-amber-400 font-bold block mb-1">TUNED FREQUENCY</span>
          <span className="text-3xl font-extrabold text-amber-200">{curr.freq}</span>
          <p className="text-xs text-amber-300 mt-2 font-ui font-bold">{curr.name}</p>
          <p className="text-[11px] text-amber-400 italic mt-1 font-ui">Now Playing: {curr.song}</p>
        </div>

        {/* Audio Equalizer visual */}
        <div className="flex justify-center items-end gap-1.5 h-10 mb-6">
          {[1,2,3,4,5,6,7,8].map(i => (
            <motion.div key={i} animate={{ height: isPlaying ? [10, 36, 12, 40, 15] : 8 }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
              className="w-2.5 bg-amber-400 rounded-full" />
          ))}
        </div>

        {/* Station Presets */}
        <div className="flex justify-center gap-2">
          {STATIONS.map((st, i) => (
            <button key={i} onClick={() => handleTune(i)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer ${stationIdx === i ? 'bg-amber-400 text-amber-950 border-amber-300' : 'bg-amber-800 text-amber-200 border-amber-700'}`}>
              Preset #{i + 1}
            </button>
          ))}
        </div>
      </div>
    </WorldShell>
  );
}
