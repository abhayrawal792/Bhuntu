import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Video, ChevronLeft, ChevronRight, Play, Pause, Film, Sparkles, Heart, Maximize2, ArrowLeft, X } from 'lucide-react';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { getAssetUrl, ALL_VIDEOS } from '../utils/mediaUtils';

// Map all 20 video clips from public/all_media/
const SANZU_VIDEOS = ALL_VIDEOS.map((path, idx) => ({
  id: idx + 1,
  path: path,
  title: `Sanzu Memory Clip #${idx + 1} 🎬`,
  caption: `Special video memory #${idx + 1} of Abu & Bhuntu 💕`,
}));

export default function VideoSection() {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleNext = () => {
    playSparkle();
    triggerHaptic(15);
    setSelectedIdx((prev) => (prev + 1) % SANZU_VIDEOS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    playSparkle();
    triggerHaptic(15);
    setSelectedIdx((prev) => (prev - 1 + SANZU_VIDEOS.length) % SANZU_VIDEOS.length);
    setIsPlaying(true);
  };

  const current = SANZU_VIDEOS[selectedIdx] || SANZU_VIDEOS[0];

  return (
    <section
      id="video"
      className="py-8 sm:py-16 px-3 sm:px-4 bg-gradient-to-b from-[#FAF8F8] via-[#FFE5EC] to-[#FAF8F8] relative overflow-hidden font-ui"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 1rem)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 2.5rem)',
      }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">

        {/* Section Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Video className="w-4 h-4 text-rose-500" />
            <span>Sanzu's Video Vault • {SANZU_VIDEOS.length} Videos</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-nepali text-gray-900 mb-1 leading-tight">
            Mero Pyaro Bebo Ko Video Vault 🎬
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-script text-rose-500">
            Tap any video to view full screen with back arrow button...
          </p>
        </div>

        {/* High-Performance Native Video Player */}
        <div className="max-w-lg mx-auto bg-black rounded-3xl p-3 shadow-2xl border-4 border-rose-500/50 relative text-white">
          <div className="relative rounded-2xl overflow-hidden bg-black mb-3 flex items-center justify-center min-h-[300px] max-h-[55vh]">
            <video
              key={current.path}
              src={getAssetUrl(current.path)}
              controls
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full max-h-[55vh] object-contain rounded-xl cursor-pointer"
            />
            {/* Floating Fullscreen button */}
            <button
              onClick={() => setIsFullScreen(true)}
              className="absolute top-3 right-3 bg-black/60 hover:bg-rose-600 text-white p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-lg z-20 flex items-center gap-1 text-xs font-bold px-3"
              title="Expand Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Full Screen</span>
            </button>
          </div>

          {/* Caption */}
          <div className="text-left mb-3 px-2">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-rose-500 text-white rounded-full text-xs font-extrabold">
                Video {selectedIdx + 1} / {SANZU_VIDEOS.length} — {current.title}
              </span>
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
            <p className="text-xs text-pink-100 font-semibold">{current.caption}</p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer active:scale-95 text-white"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>
            <button
              onClick={() => setIsFullScreen(true)}
              className="px-3 py-1.5 bg-white/20 hover:bg-rose-500 rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer text-white transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 rounded-full font-bold text-xs flex items-center gap-1 cursor-pointer active:scale-95 text-white shadow-md"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Thumbnail Grid */}
        <div className="mt-6 max-w-3xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
            Tap Any Video ({SANZU_VIDEOS.length} Videos Available)
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-44 overflow-y-auto p-2 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl border border-pink-200 shadow-inner">
            {SANZU_VIDEOS.map((vid, idx) => (
              <button
                key={vid.id}
                onClick={() => { playPop(); setSelectedIdx(idx); setIsFullScreen(true); }}
                className={`p-2 rounded-xl text-left transition-all border text-xs font-semibold cursor-pointer ${
                  selectedIdx === idx
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-105'
                    : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:bg-rose-100'
                }`}
              >
                <div className="flex items-center gap-1 font-bold text-[11px] truncate">
                  <Film className="w-3 h-3 flex-shrink-0 text-rose-400" />
                  <span className="truncate">Clip {idx + 1}</span>
                </div>
                <div className="text-[11px] opacity-80 truncate mt-0.5">{vid.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fullscreen Video Modal */}
        <AnimatePresence>
          {isFullScreen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
              onClick={() => setIsFullScreen(false)}
            >
              {/* Top Bar with Back Arrow and Close */}
              <div 
                className="fixed top-0 left-0 right-0 z-[10000] px-4 py-3 bg-slate-900/90 border-b border-pink-500/30 backdrop-blur-md flex items-center justify-between"
                onClick={(e) => e.stopPropagation()}
                style={{ paddingTop: 'max(env(safe-area-inset-top), 12px)' }}
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsFullScreen(false); }}
                  className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-95 border border-rose-400/40"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="text-rose-200 text-xs font-bold bg-rose-500/20 px-3.5 py-1.5 rounded-full border border-pink-300/30 hidden sm:block font-ui">
                  Video {selectedIdx + 1} / {SANZU_VIDEOS.length} — {current.title}
                </div>

                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setIsFullScreen(false); }}
                  className="w-10 h-10 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg transition-all cursor-pointer active:scale-95 border border-rose-400/40"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Prev Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-3 z-50 p-3 rounded-full bg-white/15 hover:bg-rose-600 text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              {/* Video Player */}
              <div className="w-full max-w-3xl flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <video
                  key={current.path}
                  src={getAssetUrl(current.path)}
                  controls
                  autoPlay
                  playsInline
                  webkit-playsinline="true"
                  onCanPlay={(e) => e.target.play().catch(() => {})}
                  className="max-h-[75vh] max-w-full rounded-2xl shadow-2xl object-contain border-2 border-amber-400/50"
                />
                <p className="text-white font-bold text-sm mt-3 text-center px-4">{current.caption}</p>
              </div>

              {/* Next Button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-3 z-50 p-3 rounded-full bg-white/15 hover:bg-rose-600 text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
