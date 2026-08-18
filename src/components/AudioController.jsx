import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Disc, Sparkles, SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

/* ── Web Audio Polyphonic Soundtrack Engine (100% Offline, Zero CORS/Network Risk) ── */
class RomanticWebAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.subTimer = null;
    this.trackIndex = 0;
    this.volume = 0.5;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  setTrack(idx) {
    this.trackIndex = idx % 4;
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  start() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    // Track 0: Bhuntu Romantic Piano (Cmaj9 -> Am7 -> Fmaj7 -> G7)
    // Track 1: Nepalgunj Love Chords (Warm Pad Harmony)
    // Track 2: Osaka Sunset Lofi (Pentatonic Lullaby)
    // Track 3: Heartbeat Symphony (Rhythmic Heartbeat + Chime)
    const chordProgressions = [
      [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 349.23], // G7
      ],
      [
        [130.81, 196.00, 246.94, 329.63], // C low pad
        [110.00, 164.81, 220.00, 261.63], // A low pad
        [87.31, 130.81, 174.61, 220.00],  // F low pad
        [98.00, 146.83, 196.00, 246.94],  // G low pad
      ],
      [
        [293.66, 369.99, 440.00, 554.37], // Dmaj7 / F#m
        [220.00, 277.18, 329.63, 440.00], // Amaj7
        [246.94, 293.66, 369.99, 440.00], // Bm7
        [196.00, 246.94, 293.66, 392.00], // Gmaj7
      ],
      [
        [130.81, 261.63, 392.00, 523.25], // C pulse
        [110.00, 220.00, 329.63, 440.00], // A pulse
        [87.31, 174.61, 261.63, 349.23],  // F pulse
        [196.00, 293.66, 392.00, 587.33], // G pulse
      ]
    ];

    let chordIdx = 0;
    let noteStep = 0;

    const playChordStep = () => {
      if (!this.isPlaying || !this.ctx) return;
      try {
        const chords = chordProgressions[this.trackIndex];
        const currentChord = chords[chordIdx % chords.length];
        chordIdx = (chordIdx + 1) % chords.length;

        // Play harmonic swell for current chord
        currentChord.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = this.trackIndex === 1 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const now = this.ctx.currentTime;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.08 / (i + 1), now + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 3.3);
        });

        // Sub-arpeggio steps inside the chord duration
        if (this.subTimer) clearInterval(this.subTimer);
        noteStep = 0;
        this.subTimer = setInterval(() => {
          if (!this.isPlaying || !this.ctx) return;
          try {
            const arpeggioFreq = currentChord[noteStep % currentChord.length] * 2;
            noteStep++;
            const subOsc = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();

            subOsc.type = 'sine';
            subOsc.frequency.setValueAtTime(arpeggioFreq, this.ctx.currentTime);

            const t = this.ctx.currentTime;
            subGain.gain.setValueAtTime(0.001, t);
            subGain.gain.exponentialRampToValueAtTime(0.05, t + 0.1);
            subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

            subOsc.connect(subGain);
            subGain.connect(this.masterGain);

            subOsc.start(t);
            subOsc.stop(t + 0.85);
          } catch (_) {}
        }, 750);

      } catch (e) {
        console.warn('Romantic audio synth error:', e);
      }
    };

    playChordStep();
    this.timer = setInterval(playChordStep, 3200);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.subTimer) {
      clearInterval(this.subTimer);
      this.subTimer = null;
    }
  }
}

export const audioEngine = new RomanticWebAudioEngine();

/* ── Interactive Sound Effects ── */
export const playSparkle = () => {
  try {
    audioEngine.init();
    const ctx = audioEngine.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(audioEngine.masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch (_) {}
};

export const playPop = () => {
  try {
    audioEngine.init();
    const ctx = audioEngine.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(audioEngine.masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (_) {}
};

export const playChime = () => {
  try {
    audioEngine.init();
    const ctx = audioEngine.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(audioEngine.masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (_) {}
};

export const playBlip = () => {
  try {
    audioEngine.init();
    const ctx = audioEngine.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(audioEngine.masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (_) {}
};

export const playBloom = () => {
  try {
    audioEngine.init();
    const ctx = audioEngine.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

    osc.connect(gain);
    gain.connect(audioEngine.masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  } catch (_) {}
};

export const playHeartbeat = () => {
  try {
    audioEngine.init();
    const ctx = audioEngine.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(audioEngine.masterGain || ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (_) {}
};

export const playMagic = () => {
  try {
    audioEngine.init();
    const ctx = audioEngine.ctx;
    if (!ctx) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(audioEngine.masterGain || ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
    });
  } catch (_) {}
};

const TRACK_NAMES = [
  '🎹 Bhuntu Romantic Piano',
  '🎶 Nepalgunj Love Chords',
  '🌅 Osaka Sunset Lofi',
  '💖 Heartbeat Symphony'
];

export default function AudioController({ isAudioStarted, setIsAudioStarted }) {
  const { audioState, setAudioState, toggleAudio } = useAppStore();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolumeState] = useState(0.6);

  const isPlaying = audioState === 'playing';

  // Global unlock audio context on ANY user touch/click/key interaction
  useEffect(() => {
    const unlockAudio = () => {
      audioEngine.init();
      if (isPlaying) {
        audioEngine.start();
      }
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [isPlaying]);

  // Sync state with engine
  useEffect(() => {
    if (isPlaying) {
      audioEngine.start();
    } else {
      audioEngine.stop();
    }
  }, [isPlaying]);

  // Sync initial launch from loading screen
  useEffect(() => {
    if (isAudioStarted && audioState !== 'playing') {
      setAudioState('playing');
      audioEngine.start();
    }
  }, [isAudioStarted]);

  const handleToggle = () => {
    if (!isAudioStarted) {
      setIsAudioStarted(true);
    }
    toggleAudio();
    if (!isPlaying) {
      playSparkle();
    }
  };

  const handleTrackChange = (idx) => {
    setCurrentTrack(idx);
    audioEngine.setTrack(idx);
    playChime();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolumeState(val);
    audioEngine.setVolume(val);
  };

  return (
    <div
      className="fixed right-4 z-50 flex flex-col items-end gap-2"
      style={{ bottom: 'calc(4rem + max(env(safe-area-inset-bottom), 0.5rem))' }}
    >
      {/* Expanded Control Panel */}
      {showControls && (
        <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-pink-200 shadow-2xl flex flex-col gap-2.5 w-64 animate-in fade-in slide-in-from-bottom-2 text-xs font-ui">
          <div className="flex items-center justify-between font-bold text-rose-600 border-b border-pink-100 pb-2">
            <span className="flex items-center gap-1.5">
              <Disc className="w-4 h-4 animate-spin text-pink-500" style={{ animationDuration: '6s' }} />
              Background Music
            </span>
            <button
              onClick={() => setShowControls(false)}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Track Selector */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Select Sound Track</span>
            <div className="grid grid-cols-1 gap-1">
              {TRACK_NAMES.map((name, i) => (
                <button
                  key={i}
                  onClick={() => handleTrackChange(i)}
                  className={`px-2.5 py-1.5 rounded-lg text-left font-medium transition-all flex items-center justify-between cursor-pointer ${
                    currentTrack === i
                      ? 'bg-rose-500 text-white font-bold shadow-sm'
                      : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                  }`}
                >
                  <span className="truncate">{name}</span>
                  {currentTrack === i && <Sparkles className="w-3 h-3 text-yellow-200 animate-pulse shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex flex-col gap-1 pt-1 border-t border-pink-100">
            <div className="flex justify-between text-[11px] font-semibold text-gray-600">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-pink-100 rounded-lg appearance-none"
            />
          </div>
        </div>
      )}

      {/* Main Floating Bar */}
      <div className="flex items-center gap-2">
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-200 shadow-xl text-xs font-semibold text-rose-600 font-ui">
            <Music className="w-3.5 h-3.5 animate-spin text-rose-500" style={{ animationDuration: '4s' }} />
            <span className="max-w-[140px] truncate">{TRACK_NAMES[currentTrack]}</span>
            <div className="flex items-end gap-0.5 h-3 ml-0.5">
              <span className="w-0.5 bg-rose-500 rounded-full h-full animate-bounce" style={{ animationDuration: '0.6s' }}></span>
              <span className="w-0.5 bg-rose-500 rounded-full h-2/3 animate-bounce" style={{ animationDuration: '0.8s' }}></span>
              <span className="w-0.5 bg-rose-500 rounded-full h-full animate-bounce" style={{ animationDuration: '0.5s' }}></span>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowControls(prev => !prev)}
          className="bg-white/90 hover:bg-white text-gray-700 p-2.5 rounded-full shadow-lg border border-pink-200 transition-transform active:scale-90 cursor-pointer"
          title="Audio Settings"
          aria-label="Open audio settings"
        >
          <SlidersHorizontal className="w-4 h-4 text-rose-500" />
        </button>

        <button
          onClick={handleToggle}
          className="relative group bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-white/40 cursor-pointer"
          title={isPlaying ? "Mute Background Music" : "Play Background Music"}
          aria-label={isPlaying ? "Mute background music" : "Play background music"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-white/80" />
          )}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 border border-white"></span>
          </span>
        </button>
      </div>
    </div>
  );
}
