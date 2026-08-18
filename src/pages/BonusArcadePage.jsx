import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Sparkles, ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WorldShell from '../components/WorldShell';

const BONUS_GAMES = [
  { name: "Love Tic-Tac-Toe ❌⭕", path: "/tic-tac-toe", desc: "Classic 3-in-a-row heart game" },
  { name: "Love Tetris 🧩", path: "/tetris", desc: "Falling block puzzle fun" },
  { name: "Love Arcade Dance 💃", path: "/dance", desc: "Rhythm and arrow tap game" },
  { name: "Love Butterfly Catcher 🦋", path: "/butterfly-catcher", desc: "Catch floating butterflies" },
  { name: "Bubble Wrap Pop 🫧", path: "/bubble-wrap", desc: "Relaxing bubble wrap popping" },
  { name: "Heart Tangram 🧩", path: "/tangram", desc: "Geometric heart puzzle" },
  { name: "Love Doodle Canvas 🎨", path: "/doodle", desc: "Draw cute glowing love doodles" },
  { name: "Love Kaleidoscope 🌀", path: "/kaleidoscope", desc: "Symmetrical rainbow visuals" },
  { name: "Pixel Heart Painter 👾", path: "/pixel-painter", desc: "Retro pixel art designer" },
  { name: "3D Photo Puzzle 🧩", path: "/photo-puzzle-3d", desc: "Assemble 3D photo blocks" },
  { name: "Bhuntu Emoji Arcade 🕹️", path: "/emoji-arcade", desc: "Retro emoji arcade fun" },
  { name: "Love Anagram Solver 🔤", path: "/anagram", desc: "Scramble & unscramble love words" },
  { name: "Cupid Archery 🏹", path: "/archery", desc: "Aim & shoot love arrows" },
  { name: "Heart Catcher Game 💖", path: "/catcher", desc: "Catch falling pink hearts" },
  { name: "Love Maze 🧩", path: "/maze", desc: "Guide the heart through the maze" },
  { name: "Love Slots 🎰", path: "/slots", desc: "Triple heart slot machine" },
  { name: "Love Memory Match 🃏", path: "/memory-match", desc: "Flip and pair matching cards" },
  { name: "Love Tamagotchi 🐱", path: "/pet", desc: "Virtual pet care simulator" }
];

export default function BonusArcadePage() {
  const navigate = useNavigate();

  return (
    <WorldShell
      theme="arcade"
      badge="Bonus Games & Side Extras 🎮"
      badgeIcon={<Gamepad2 className="w-3.5 h-3.5" />}
      title="बोनस आर्केड र रमाइलो गेमहरू"
      subtitle="Fun Side Arcade & Mini-Games"
      description="A dedicated bonus corner for quick mini-games, puzzles, and arcade extras!"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto my-6 text-left">
        {BONUS_GAMES.map((game, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(game.path)}
            className="glass-card rounded-2xl p-5 border border-pink-300 shadow-md bg-white/90 cursor-pointer flex flex-col justify-between hover:border-rose-400 hover:shadow-xl transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-1.5 font-bold text-rose-600 font-ui text-sm">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500 flex-shrink-0" />
                <span>{game.name}</span>
              </div>
              <p className="text-xs text-gray-600 font-ui">{game.desc}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-pink-100 flex items-center justify-between text-[11px] font-bold text-pink-600 font-ui">
              <span>Play Game</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        ))}
      </div>
    </WorldShell>
  );
}
