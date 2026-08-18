import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Gamepad2, Heart, Music, Globe, Compass, BookOpen, Star, Zap, Volume2, X, Command, Flame } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { playPop, playSparkle } from './AudioController';

// Quick Room Registry with search tags and icons
const QUICK_ROOMS = [
  { path: '/room/1', title: '1. Love Proposal Vault 🔐', cat: 'Escape Room', icon: Heart, tag: 'vault lock password proposal' },
  { path: '/room/2', title: '2. Emoji Arcade Cabinet 🕹️', cat: 'Arcade', icon: Gamepad2, tag: 'emoji arcade score game' },
  { path: '/room/3', title: '3. Spin The Love Bottle 🍾', cat: 'Minigames', icon: Flame, tag: 'truth dare spin bottle' },
  { path: '/room/4', title: '4. Nickname Constellation 🌌', cat: 'Cosmic', icon: Star, tag: 'galaxy star nepali nicknames' },
  { path: '/room/5', title: '5. World Bucket List Globe ✈️', cat: 'Journey', icon: Globe, tag: 'osaka nepalgunj flight travel' },
  { path: '/room/6', title: '6. 35mm Vintage Film Reel 🎞️', cat: 'Memories', icon: BookOpen, tag: 'photos film strip polaroid' },
  { path: '/room/7', title: '7. Love Tetris Blocks 🧩', cat: 'Arcade', icon: Gamepad2, tag: 'tetris blocks stack lines' },
  { path: '/room/8', title: '8. Love Scrabble Master 🔤', cat: 'Arcade', icon: Sparkles, tag: 'scrabble words tiles Nepali' },
  { path: '/room/9', title: '9. Secret Love Maze 🗺️', cat: 'Arcade', icon: Compass, tag: 'maze puzzle path steps' },
  { path: '/room/10', title: '10. Grand Coronation Finale 👑', cat: 'Special', icon: Zap, tag: 'crown finale ceremony 300th' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { triggerHaptic } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          playSparkle();
          triggerHaptic(20);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerHaptic]);

  const filtered = QUICK_ROOMS.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) ||
    r.cat.toLowerCase().includes(query.toLowerCase()) ||
    r.tag.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (room) => {
    playPop();
    triggerHaptic(20);
    onClose();
    navigate(room.path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-[0_0_60px_rgba(244,63,94,0.25)] overflow-hidden font-ui"
        >
          {/* Raycast Header Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-800 bg-slate-950/50">
            <Search className="w-5 h-5 text-rose-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search 300+ rooms, games, memories, or type shortcut... (e.g. 'Arcade', 'Globe', 'Film')"
              className="w-full bg-transparent text-white placeholder-slate-500 font-medium text-sm sm:text-base outline-none"
            />
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs border border-slate-700">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No matching rooms found. Try searching "Arcade", "Scrabble", or "Maze"!
              </div>
            ) : (
              filtered.map((room, idx) => {
                const Icon = room.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={room.path}
                    onClick={() => handleSelect(room)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full px-4 py-3 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/20'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-white/20' : 'bg-slate-800 text-rose-400'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{room.title}</div>
                        <div className={`text-xs ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>{room.cat}</div>
                      </div>
                    </div>

                    <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Jump ↵
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Open</span>
              <span>ESC Close</span>
            </div>
            <div className="text-rose-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Raycast Dock Active</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
