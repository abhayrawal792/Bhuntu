import React, { createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { getTheme } from '../themes';

// Context so child components can read theme tokens without prop-drilling
const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

/**
 * WorldShell — wraps a mini-experience page in its visual world.
 *
 * Props:
 *   theme       — one of: celestial | paper | arcade | garden | journey | retro | sweet | music
 *   badge       — text for the badge pill (e.g. "Wheel of Fortune 🎡")
 *   badgeIcon   — optional React node for icon before badge text
 *   title       — Nepali heading (font-nepali, large)
 *   subtitle    — English subtitle (font-script)
 *   description — small body text below subtitle
 *   children    — the interactive content of the page
 *   className   — extra classes on the outer wrapper
 *   onBack      — custom back handler (defaults to navigate(-1))
 *   onClose     — custom close handler (defaults to navigate('/'))
 *   hideNav     — set to true if header nav should be omitted
 */
export default function WorldShell({
  theme = 'celestial',
  badge,
  badgeIcon,
  title,
  subtitle,
  description,
  children,
  className = '',
  onBack,
  onClose,
  hideNav = false,
}) {
  const t = getTheme(theme);
  let navigate;
  let location;
  try {
    navigate = useNavigate();
    location = useLocation();
  } catch (e) {
    navigate = null;
    location = null;
  }

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigate) {
      navigate(-1);
    } else {
      window.history.back();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (navigate) {
      navigate('/');
    } else {
      window.location.hash = '#/';
    }
  };

  return (
    <ThemeContext.Provider value={t}>
      {/* Outermost page wrapper */}
      <div
        className={`min-h-[85vh] min-h-[85dvh] ${t.bg} ${t.text} relative overflow-hidden ${className}`}
        style={{
          paddingTop: 'max(env(safe-area-inset-top), 0.5rem)',
          paddingBottom: 'max(env(safe-area-inset-bottom), 2rem)',
        }}
      >

        {/* Star field — only for celestial / journey worlds */}
        {t.stars && <StarField />}

        {/* Ambient background glowing light orbs */}
        <AmbientLightOrbs />

        {/* Floating romantic hearts & sakura petals background */}
        <FloatingParticles />



        {/* Content container */}
        <motion.div
          initial={t.motion.initial}
          animate={t.motion.animate}
          transition={t.motion.transition}
          className="relative z-10 max-w-3xl mx-auto px-4 py-6 text-center"
        >
          {/* Badge pill */}
          {badge && (
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-xs mb-3 ${t.badge}`}>
              {badgeIcon && <span className="w-4 h-4 flex items-center justify-center">{badgeIcon}</span>}
              <span>{badge}</span>
            </div>
          )}

          {/* Heading */}
          {title && (
            <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 drop-shadow-sm ${t.heading}`}>
              {title}
            </h1>
          )}

          {/* English subtitle */}
          {subtitle && (
            <h2 className={`text-lg sm:text-2xl font-script mb-3 ${t.subheading}`}>
              {subtitle}
            </h2>
          )}

          {/* Description */}
          {description && (
            <p className={`text-xs sm:text-sm font-ui max-w-lg mx-auto mb-6 ${t.body}`}>
              {description}
            </p>
          )}

          {/* Page content */}
          {children}
        </motion.div>
      </div>
    </ThemeContext.Provider>
  );
}

/**
 * WorldCard — themed card wrapper for results / content blocks.
 * Uses the parent WorldShell's theme automatically via context.
 */
export function WorldCard({ children, className = '', hover = true }) {
  const t = useTheme();
  const safeT = t ?? getTheme('celestial');

  return (
    <motion.div
      whileHover={hover ? safeT.hoverCard : undefined}
      className={`rounded-3xl p-6 ${safeT.card} ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Internal helpers ─────────────────────────────────────────── */

/** Lightweight CSS-only star field for dark worlds (celestial / journey). */
function StarField() {
  const stars = React.useMemo(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      left: ((i * 37 + 11) % 97),
      top: ((i * 53 + 7) % 91),
      duration: 2 + (i % 4),
      delay: (i * 0.13) % 4,
      size: i % 3 === 0 ? 'w-1 h-1' : 'w-0.5 h-0.5',
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className={`absolute rounded-full bg-white ${s.size}`}
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
          animate={{ opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/** Floating romantic hearts and sparkles background */
function FloatingParticles() {
  const items = React.useMemo(() => [
    { emoji: '💕', size: '14px', left: '8%', duration: 14, delay: 0 },
    { emoji: '🌸', size: '16px', left: '22%', duration: 18, delay: 3 },
    { emoji: '✨', size: '12px', left: '38%', duration: 12, delay: 1 },
    { emoji: '💖', size: '15px', left: '58%', duration: 16, delay: 4 },
    { emoji: '🌸', size: '13px', left: '74%', duration: 19, delay: 2 },
    { emoji: '✨', size: '14px', left: '88%', duration: 15, delay: 5 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="absolute opacity-45 select-none"
          style={{ left: it.left, bottom: '-20px', fontSize: it.size }}
          animate={{
            y: ['0vh', '-110vh'],
            x: ['0px', i % 2 === 0 ? '25px' : '-25px', '0px'],
            opacity: [0, 0.65, 0],
            rotate: [0, i % 2 === 0 ? 45 : -45]
          }}
          transition={{
            duration: it.duration,
            repeat: Infinity,
            delay: it.delay,
            ease: 'linear'
          }}
        >
          {it.emoji}
        </motion.div>
      ))}
    </div>
  );
}

/** Ambient glowing color orbs in background */
function AmbientLightOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40" aria-hidden="true">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
      />
    </div>
  );
}
