import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Dice5, Gamepad2, Heart, Sparkles, BookOpen, MapPin, Gem } from 'lucide-react';

// Every page that exists in App.jsx but is not part of the main journey sequence.
// Grouped so Samjhana can find games, letters, and hidden rooms easily.
const games = [
  { route: '/memory-match', title: 'The Memories Abu Recognizes', icon: Heart },
  { route: '/love-memory-match', title: 'Match the Memory to the Feeling', icon: Heart },
  { route: '/love-memory-match-3d', title: 'Three Dimensions of Our Memory', icon: Heart },
  { route: '/memory-replay', title: 'The Memory Abu Keeps Replaying', icon: Heart },
  { route: '/scratch-memory', title: 'Scratch Memory', icon: Heart },
  { route: '/scratch-surprises', title: 'Small Surprises Under the Surface', icon: Heart },
  { route: '/love-scratch-off-gallery', title: 'Love Scratch Off Gallery', icon: Heart },
  { route: '/love-scratch-off-gallery-2', title: 'A Second Gallery of Hidden Notes', icon: Heart },
  { route: '/love-scratch-voucher-book', title: 'Vouchers Abu Would Give You', icon: Heart },
  { route: '/bubble-pop', title: 'A Pocketful of Better Days', icon: Sparkles },
  { route: '/tic-tac-toe', title: 'Two Hearts, One Gentle Match', icon: Gamepad2 },
  { route: '/love-slots', title: 'The Little Luck Abu Wishes You', icon: Dice5 },
  { route: '/catcher-game', title: 'Hearts Abu Would Catch for You', icon: Gamepad2 },
  { route: '/sweet-dream-catcher', title: 'Sweet Dream Catcher', icon: Sparkles },
  { route: '/jigsaw', title: 'The Pieces Abu Remembers', icon: Gamepad2 },
  { route: '/love-puzzle-slider', title: 'Slide the Story into Place', icon: Gamepad2 },
  { route: '/heart-shape-tangram', title: 'Heart Shape Tangram', icon: Heart },
  { route: '/love-map-canvas', title: 'Love Map Canvas', icon: MapPin },
  { route: '/pixel-heart-painter', title: 'Pixel Heart Painter', icon: Sparkles },
  { route: '/word-search', title: 'Words Hidden in Our Story', icon: BookOpen },
  { route: '/word-jumble', title: 'Words Abu Saves for Samjhana', icon: BookOpen },
  { route: '/love-crossword-puzzle', title: 'Clues from Our Little World', icon: BookOpen },
  { route: '/love-trivia-quiz', title: 'Our Details, Abu\u2019s Answers', icon: Dice5 },
  { route: '/bhuntu-trivia-showdown', title: 'Bhuntu Trivia Showdown', icon: Dice5 },
  { route: '/love-quiz-advanced', title: 'The Details Abu Never Forgets', icon: Dice5 },
  { route: '/couple-quiz-master', title: 'The Master List of Our Details', icon: Dice5 },
  { route: '/couple-quiz-2', title: 'How Abu Remembers Our Details', icon: Dice5 },
  { route: '/bhuntu-personality-quiz', title: 'The Samjhana Abu Knows', icon: Dice5 },
  { route: '/love-quiz-personality', title: 'Love Quiz Personality', icon: Dice5 },
  { route: '/quiz-duel', title: 'Two Hearts, One Story', icon: Dice5 },
  { route: '/timeline-quiz', title: 'Put Our Memories Back in Order', icon: Dice5 },
  { route: '/two-truths', title: 'The Things Abu Knows About You', icon: Dice5 },
  { route: '/arcade-dance-machine', title: 'Arcade Dance Machine', icon: Gamepad2 },
  { route: '/bhuntu-emoji-arcade', title: 'Our Story in Small Symbols', icon: Gamepad2 },
  { route: '/love-rhythm-drum-pad', title: 'The Rhythm of Our Calls', icon: Sparkles },
];

const lettersAndKeepsakes = [
  { route: '/birthday-sky-letter', title: 'Your Birthday Sky Letter', icon: BookOpen },
  { route: '/letter-tonight', title: 'The Letter Abu Would Send Tonight', icon: BookOpen },
  { route: '/secret-language', title: 'The Secret Language of Us', icon: BookOpen },
  { route: '/little-things-abu-notices', title: 'The Little Things Abu Notices', icon: Heart },
  { route: '/bouquet-reasons', title: 'A Bouquet of Reasons Abu Loves You', icon: Heart },
  { route: '/promise-trio', title: 'Three Little Promises for Our Future', icon: Gem },
  { route: '/future-night-ride', title: 'The Night Ride We Still Owe Ourselves', icon: MapPin },
];

const hiddenRooms = [
  { route: '/room/1', title: 'Room 1 \u2014 The First Door', icon: MapPin },
  { route: '/room/4', title: 'Room 4 \u2014 The Memory Abu Knows', icon: MapPin },
  { route: '/bonus-arcade', title: 'The Bonus Room of Small Surprises', icon: Gamepad2 },
];

const groups = [
  { key: 'games', label: 'Games Abu set up for you', tone: 'bg-[#fde7ee]', accent: '#c2185b', items: games },
  { key: 'letters', label: 'Letters and keepsakes', tone: 'bg-[#eef2fb]', accent: '#2a4d9c', items: lettersAndKeepsakes },
  { key: 'rooms', label: 'Hidden rooms', tone: 'bg-[#fdf6e3]', accent: '#8a6d1d', items: hiddenRooms },
];

export default function GamesArcadePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('games');
  const group = groups.find((g) => g.key === tab);
  return (
    <main className="min-h-dvh bg-[#faf4f0] px-5 py-10 text-[#2b1a22] sm:px-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <header className="border-b-2 border-[#2b1a22]/15 pb-8">
          <p className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#c2185b]">
            <Sparkles className="h-4 w-4" /> The bonus shelf
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[.9] tracking-[-0.08em] sm:text-7xl">
            Every little game, letter and room Abu made for his Bhuntu.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#7d5a64]">
            The journey has its own rhythm, but these pages live a little further down the shelf.
            None of them are required — every one of them is a small gift, so open whatever feels warm.
          </p>
        </header>

        <nav aria-label="Bonus shelf tabs" className="mt-10 flex flex-wrap gap-3">
          {groups.map((g) => (
            <button
              key={g.key}
              type="button"
              onClick={() => setTab(g.key)}
              className={`rounded-full px-6 py-3 text-sm font-black transition active:scale-[.97] ${
                tab === g.key
                  ? 'bg-[#2b1a22] text-white shadow-xl'
                  : 'bg-white/70 text-[#5c3a44] hover:bg-white'
              }`}
            >
              {g.label} ({g.items.length})
            </button>
          ))}
        </nav>

        <section aria-label={group.label} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {group.items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.route}
                type="button"
                onClick={() => navigate(item.route)}
                className={`group flex items-start gap-4 rounded-[1.5rem] border border-[#2b1a22]/10 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl active:scale-[.98] ${group.tone}`}
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/80 shadow" style={{ color: group.accent }}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block text-lg font-black tracking-[-0.02em] text-[#2b1a22]">{item.title}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: group.accent }}>
                    Open this one <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </span>
              </button>
            );
          })}
        </section>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#2b1a22]/10 pt-8">
          <p className="flex items-center gap-2 text-sm font-bold text-[#7d5a64]">
            <Heart className="h-4 w-4 fill-current text-rose-300" /> Abu keeps this shelf for his Bhuntu.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 rounded-full border border-[#2b1a22]/20 px-5 py-3 text-sm font-black text-[#5c3a44] transition hover:bg-white"
          >
            Back to Abu’s doorway
          </button>
        </div>
      </div>
    </main>
  );
}
