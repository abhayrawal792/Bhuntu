/**
 * Bhuntu Visual Worlds — Theme Configuration
 * Each "world" defines a cohesive visual + motion language.
 * Consumed by <WorldShell theme="..."> to frame every mini-experience.
 */

export const themes = {
  // 🌌 Cosmic horoscopes, tarot, constellations, fortune-telling
  celestial: {
    bg: 'bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-900',
    text: 'text-white',
    badge: 'bg-indigo-900/60 border border-indigo-500/40 text-indigo-200 backdrop-blur-md',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-pink-200 to-purple-200',
    subheading: 'text-indigo-300',
    body: 'text-indigo-200/70',
    card: 'bg-indigo-950/60 border border-indigo-700 backdrop-blur-md',
    stars: true,
    motion: {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
    },
    hoverCard: { scale: 1.015, transition: { duration: 0.8 } },
  },

  // 📜 Letters, origami, diaries, stamps, wax seals
  paper: {
    bg: 'bg-gradient-to-b from-amber-50 to-orange-50',
    text: 'text-amber-900',
    badge: 'bg-amber-50 border border-amber-300 text-amber-800 shadow-sm',
    heading: 'text-amber-900',
    subheading: 'text-rose-700',
    body: 'text-amber-800/70',
    card: 'bg-white border border-amber-200 shadow-sm',
    stars: false,
    motion: {
      initial: { opacity: 0, rotateX: 8, y: 10 },
      animate: { opacity: 1, rotateX: 0, y: 0 },
      transition: { duration: 0.7, type: 'spring', stiffness: 80, damping: 18 },
    },
    hoverCard: { y: -2, rotateZ: 0.4, transition: { duration: 0.3 } },
  },

  // 🕹️ Games, quizzes, puzzles, challenges
  arcade: {
    bg: 'bg-gray-950',
    text: 'text-white',
    badge: 'bg-gray-900 border border-cyan-400/70 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400',
    subheading: 'text-cyan-400',
    body: 'text-gray-400',
    card: 'bg-gray-900 border border-gray-700',
    stars: false,
    motion: {
      initial: { opacity: 0, scale: 0.92 },
      animate: { opacity: 1, scale: 1 },
      transition: { type: 'spring', stiffness: 420, damping: 22 },
    },
    hoverCard: { scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 15 } },
  },

  // 🌸 Flowers, trees, seasons, butterflies, gardens
  garden: {
    bg: 'bg-gradient-to-b from-green-50 via-rose-50 to-pink-50',
    text: 'text-gray-800',
    badge: 'bg-green-50 border border-green-200 text-green-700 shadow-sm',
    heading: 'text-rose-700',
    subheading: 'text-green-700',
    body: 'text-gray-600',
    card: 'bg-white/80 border border-green-200 backdrop-blur-sm',
    stars: false,
    motion: {
      initial: { opacity: 0, y: 16, scale: 0.97 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 1.1, ease: [0.34, 1.56, 0.64, 1] },
    },
    hoverCard: { y: -3, scale: 1.01, transition: { duration: 0.4, ease: 'easeOut' } },
  },

  // ✈️ Distance, travel, two countries, milestones
  journey: {
    bg: 'bg-gradient-to-b from-slate-900 via-blue-950 to-indigo-950',
    text: 'text-white',
    badge: 'bg-red-950/80 border border-red-500/60 text-red-200',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-red-300 via-white to-blue-300',
    subheading: 'text-sky-300',
    body: 'text-slate-300',
    card: 'bg-white/5 border border-white/10 backdrop-blur-sm',
    stars: true,
    motion: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    hoverCard: { x: 2, scale: 1.01, transition: { duration: 0.4 } },
  },

  // 📸 Polaroids, film strips, scrapbooks, photo galleries
  retro: {
    bg: 'bg-stone-900',
    text: 'text-stone-200',
    badge: 'bg-amber-950 border border-amber-600/60 text-amber-300',
    heading: 'text-amber-200',
    subheading: 'text-orange-300',
    body: 'text-stone-400',
    card: 'bg-stone-800 border border-stone-600',
    stars: false,
    motion: {
      initial: { opacity: 0, rotate: -1, scale: 0.96 },
      animate: { opacity: 1, rotate: 0, scale: 1 },
      transition: { type: 'spring', stiffness: 140, damping: 22 },
    },
    hoverCard: { rotate: 0.8, scale: 1.02, transition: { type: 'spring', stiffness: 200 } },
  },

  // 🍵 Food, cooking, potions, cozy domestic moments
  sweet: {
    bg: 'bg-gradient-to-b from-orange-50 to-pink-50',
    text: 'text-gray-800',
    badge: 'bg-orange-100 border border-orange-200 text-orange-700 shadow-sm',
    heading: 'text-orange-800',
    subheading: 'text-rose-600',
    body: 'text-orange-700/70',
    card: 'bg-white border border-orange-100 shadow-sm',
    stars: false,
    motion: {
      initial: { opacity: 0, y: 8, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hoverCard: { y: -2, scale: 1.015, transition: { duration: 0.25 } },
  },

  // 🎤 Music, audio, cinema, performance, neon
  music: {
    bg: 'bg-gradient-to-b from-purple-950 via-slate-900 to-black',
    text: 'text-white',
    badge: 'bg-purple-950 border border-purple-500/60 text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.3)]',
    heading: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-purple-300',
    subheading: 'text-purple-300',
    body: 'text-slate-400',
    card: 'bg-white/5 border border-purple-800/50 backdrop-blur-sm',
    stars: false,
    motion: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
    },
    hoverCard: { scale: 1.025, transition: { type: 'spring', stiffness: 300, damping: 18 } },
  },
};

/** Returns the theme config for a given world key, falling back to celestial. */
export const getTheme = (name) => themes[name] ?? themes.celestial;
