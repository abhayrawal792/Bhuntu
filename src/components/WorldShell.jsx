import React, { createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Archive, Camera, MapPin, Ticket, X } from 'lucide-react';
import { getTheme } from '../themes';
import { getIndependentBlueprint } from '../data/independentPageBlueprints';

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

const FRAME_MODES = {
  'asymmetric split-screen': 'split',
  'full-bleed portrait with margin notes': 'portrait',
  'vertical museum placard': 'museum',
  'cinema title card': 'cinema',
  'desktop scrapbook': 'scrapbook',
  'passport spread': 'passport',
  'floating island cards': 'floating',
  'long editorial scroll': 'editorial',
  'postcard stack': 'postcard',
  'map-and-route board': 'map',
  'ticket-window frame': 'ticket',
  'three-column contact sheet': 'contact',
  'diary spread': 'diary',
  'window-seat vignette': 'window',
  'altar table': 'altar',
  'archive index': 'archive',
};

const frameFor = (composition = '') => FRAME_MODES[composition] || 'editorial';

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
  const navigate = useNavigate();
  const location = useLocation();
  const blueprint = getIndependentBlueprint(location.pathname);
  const frame = frameFor(blueprint.composition);

  const handleBack = () => (onBack ? onBack() : navigate(-1));
  const handleClose = () => (onClose ? onClose() : navigate('/'));
  const frameContext = { ...t, frame, blueprint };

  return (
    <ThemeContext.Provider value={frameContext}>
      <div
        className={`min-h-[85vh] min-h-[85dvh] ${t.bg} ${t.text} relative overflow-hidden ${className}`}
        style={{ paddingTop: 'max(env(safe-area-inset-top), 0.5rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 2rem)' }}
        data-world-frame={frame}
      >
        {t.stars && <StarField />}
        <AmbientLightOrbs />
        {frame !== 'museum' && frame !== 'archive' && <FloatingParticles />}
        {!hideNav && <FrameNav onBack={handleBack} onClose={handleClose} frame={frame} />}
        <FrameHeader frame={frame} theme={t} blueprint={blueprint} badge={badge} badgeIcon={badgeIcon} title={title} subtitle={subtitle} description={description} />
        <div className={`relative z-10 ${contentClass(frame)}`}>{children}</div>
      </div>
    </ThemeContext.Provider>
  );
}

function FrameNav({ onBack, onClose, frame }) {
  const dark = ['cinema', 'portrait', 'ticket'].includes(frame);
  return (
    <div className={`relative z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 pt-2 sm:px-8 ${dark ? 'text-white/75' : 'text-current/65'}`}>
      <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition hover:bg-white/15 active:scale-[.97]"><ArrowLeft className="h-3.5 w-3.5" /> Previous room</button>
      <button type="button" onClick={onClose} aria-label="Close room" className="grid h-9 w-9 place-items-center rounded-full border border-current/15 transition hover:bg-white/15 active:scale-[.97]"><X className="h-4 w-4" /></button>
    </div>
  );
}

function FrameHeader({ frame, theme, blueprint, badge, badgeIcon, title, subtitle, description }) {
  const meta = `${String(blueprint.order).padStart(3, '0')} / ${blueprint.voice}`;
  const titleBlock = (
    <>
      {badge && <div className={`inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] ${theme.badge}`}>{badgeIcon && <span className="grid h-4 w-4 place-items-center">{badgeIcon}</span>}{badge}</div>}
      {title && <h1 className={`mt-4 font-black tracking-[-0.07em] ${theme.heading}`}>{title}</h1>}
      {subtitle && <h2 className={`mt-3 font-script ${theme.subheading}`}>{subtitle}</h2>}
      {description && <p className={`mt-4 max-w-xl text-sm leading-7 ${theme.body}`}>{description}</p>}
    </>
  );

  if (frame === 'cinema') return <header className="relative z-10 mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-10 sm:pb-16"><div className="flex items-center justify-between border-y border-white/20 py-3 text-[10px] font-black uppercase tracking-[0.25em] text-white/60"><span>Birthday film · {meta}</span><span>Take one</span></div><div className="pt-12 text-left text-white"><p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--room-accent)]">Chapter {String(blueprint.order).padStart(3, '0')}</p><h1 className="mt-5 max-w-4xl text-5xl font-black leading-[.92] tracking-[-0.08em] sm:text-8xl">{title}</h1>{subtitle && <h2 className="mt-6 text-2xl font-script text-white/75 sm:text-4xl">{subtitle}</h2>}{description && <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65">{description}</p>}</div></header>;
  if (frame === 'museum') return <header className="relative z-10 mx-auto grid max-w-6xl gap-7 px-5 py-10 sm:grid-cols-[12rem_1fr] sm:px-10"><aside className="border-l-4 border-[var(--room-accent)] pl-4 text-left"><Archive className="h-5 w-5 opacity-70" /><p className="mt-5 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Exhibit {meta}</p><p className="mt-3 text-xs leading-6 opacity-70">A real detail from Abu’s memory vault.</p></aside><div className="text-left">{titleBlock}</div></header>;
  if (frame === 'map') return <header className="relative z-10 mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-[.7fr_1.3fr] sm:items-end sm:px-10"><div className="relative min-h-28 border-b border-current/20 sm:border-b-0 sm:border-r sm:pr-8"><MapPin className="absolute bottom-1 left-0 h-7 w-7 text-[var(--room-accent)]" /><div className="absolute bottom-4 left-9 h-px w-32 border-t border-dashed border-current/35" /><span className="absolute bottom-7 left-9 text-[10px] font-black uppercase tracking-[0.2em] opacity-55">Dhamboji → Sakai</span></div><div className="text-left">{titleBlock}</div></header>;
  if (frame === 'ticket') return <header className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:px-10"><div className="border-2 border-dashed border-current/30 p-5 text-left sm:p-8"><div className="flex items-center justify-between gap-3 border-b border-current/15 pb-4 text-[10px] font-black uppercase tracking-[0.2em]"><span className="inline-flex items-center gap-2"><Ticket className="h-4 w-4" /> Abu’s keepsake ticket</span><span>{meta}</span></div>{titleBlock}</div></header>;
  if (frame === 'passport') return <header className="relative z-10 mx-auto max-w-6xl px-5 py-9 sm:px-10"><div className="grid gap-6 border-4 border-double border-current/20 p-5 text-left sm:grid-cols-[.8fr_1.2fr] sm:p-8"><div className="border-b border-current/15 pb-5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-7"><p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Bhuntu birthday passport</p><p className="mt-5 text-6xl font-black tracking-[-0.1em] text-[var(--room-accent)]">{String(blueprint.order).padStart(3, '0')}</p><p className="mt-2 text-xs font-bold opacity-65">{blueprint.giftForm}</p></div><div>{titleBlock}</div></div></header>;
  if (frame === 'archive') return <header className="relative z-10 mx-auto max-w-6xl px-5 py-10 font-mono text-left sm:px-10"><div className="border-y border-current/25 py-4 text-[10px] uppercase tracking-[0.18em] opacity-60">INDEX / {meta} / PRIVATE RECORD</div>{titleBlock}</header>;
  if (frame === 'scrapbook') return <header className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-10"><div className="relative rotate-[-1deg] border border-current/15 bg-white/35 p-6 text-left shadow-xl sm:p-10"><div className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-2 bg-amber-200/70" />{titleBlock}<p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-45">{meta}</p></div></header>;
  if (frame === 'diary') return <header className="relative z-10 mx-auto max-w-4xl border-x border-current/10 bg-white/15 px-6 py-10 text-left shadow-inner sm:px-12"><p className="text-[10px] font-black uppercase tracking-[0.22em] opacity-55">Dear diary · {meta}</p>{titleBlock}</header>;
  if (frame === 'window') return <header className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:px-10"><div className="overflow-hidden rounded-[2rem] border border-current/15 bg-white/20 shadow-2xl"><div className="flex items-center gap-2 border-b border-current/10 px-5 py-3"><span className="h-2 w-2 rounded-full bg-rose-400" /><span className="h-2 w-2 rounded-full bg-amber-400" /><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="ml-auto text-[9px] font-black uppercase tracking-[0.2em] opacity-50">Window seat {String(blueprint.order).padStart(3, '0')}</span></div><div className="p-6 text-left sm:p-10">{titleBlock}</div></div></header>;
  if (frame === 'altar') return <header className="relative z-10 mx-auto max-w-4xl px-5 py-10 text-center sm:px-10"><div className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-3 opacity-45"><span className="h-px flex-1 bg-current" /><span className="h-2 w-2 rotate-45 border border-current" /><span className="h-px flex-1 bg-current" /></div>{titleBlock}<p className="mx-auto mt-7 max-w-xs text-[10px] font-black uppercase tracking-[0.2em] opacity-45">{meta}</p></header>;
  if (frame === 'contact') return <header className="relative z-10 mx-auto max-w-7xl px-5 py-9 text-left sm:px-10"><div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-current/20 pb-5"><div>{titleBlock}</div><p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-55">Contact sheet / {meta}</p></div></header>;

  return <header className={`relative z-10 mx-auto max-w-4xl px-5 py-9 text-center sm:px-10 ${frame === 'split' ? 'text-left' : ''}`}><div className={frame === 'split' ? 'max-w-2xl' : ''}>{titleBlock}</div><p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{blueprint.composition} · {blueprint.ritual}</p></header>;
}

function contentClass(frame) {
  if (frame === 'contact' || frame === 'split') return 'mx-auto max-w-7xl px-5 pb-12 sm:px-10';
  if (frame === 'map' || frame === 'passport' || frame === 'ticket' || frame === 'museum') return 'mx-auto max-w-6xl px-5 pb-12 sm:px-10';
  if (frame === 'archive') return 'mx-auto max-w-6xl px-5 pb-12 font-mono sm:px-10';
  return 'mx-auto max-w-5xl px-5 pb-12 sm:px-10';
}

export function WorldCard({ children, className = '', hover = true }) {
  const t = useTheme();
  const safeT = t ?? { ...getTheme('celestial'), frame: 'editorial' };
  const frameCard = {
    cinema: 'rounded-none border-y border-white/20 bg-black/20',
    museum: 'rounded-none border-l-4 border-[var(--room-accent)] shadow-none',
    scrapbook: 'rounded-2xl rotate-[0.4deg] border border-amber-200/60 shadow-[8px_10px_0_rgba(120,80,30,.12)]',
    passport: 'rounded-none border-2 border-double',
    ticket: 'rounded-none border-2 border-dashed',
    archive: 'rounded-none border border-current/20 bg-transparent font-mono',
    diary: 'rounded-none border-x border-current/15 bg-white/15',
    window: 'rounded-[2rem] shadow-2xl',
    altar: 'rounded-[2rem] border border-current/15 bg-white/15',
  }[safeT.frame] || 'rounded-3xl';
  return <motion.div whileHover={hover ? safeT.hoverCard : undefined} className={`${frameCard} p-6 ${safeT.card || ''} ${className}`}>{children}</motion.div>;
}

function StarField() {
  const stars = React.useMemo(() => Array.from({ length: 55 }, (_, i) => ({ id: i, left: ((i * 37 + 11) % 97), top: ((i * 53 + 7) % 91), duration: 2 + (i % 4), delay: (i * 0.13) % 4, size: i % 3 === 0 ? 'w-1 h-1' : 'w-0.5 h-0.5' })), []);
  return <div className="absolute inset-0 pointer-events-none" aria-hidden="true">{stars.map((s) => <motion.div key={s.id} className={`absolute rounded-full bg-white ${s.size}`} style={{ left: `${s.left}%`, top: `${s.top}%` }} animate={{ opacity: [0.15, 0.9, 0.15] }} transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }} />)}</div>;
}

function FloatingParticles() {
  const items = React.useMemo(() => [{ emoji: '💕', size: '14px', left: '8%', duration: 14, delay: 0 }, { emoji: '🌸', size: '16px', left: '22%', duration: 18, delay: 3 }, { emoji: '✨', size: '12px', left: '38%', duration: 12, delay: 1 }, { emoji: '💖', size: '15px', left: '58%', duration: 16, delay: 4 }, { emoji: '🌸', size: '13px', left: '74%', duration: 19, delay: 2 }, { emoji: '✨', size: '14px', left: '88%', duration: 15, delay: 5 }], []);
  return <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">{items.map((it, i) => <motion.div key={i} className="absolute select-none opacity-45" style={{ left: it.left, bottom: '-20px', fontSize: it.size }} animate={{ y: ['0vh', '-110vh'], x: ['0px', i % 2 === 0 ? '25px' : '-25px', '0px'], opacity: [0, 0.65, 0], rotate: [0, i % 2 === 0 ? 45 : -45] }} transition={{ duration: it.duration, repeat: Infinity, delay: it.delay, ease: 'linear' }}>{it.emoji}</motion.div>)}</div>;
}

function AmbientLightOrbs() {
  return <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40" aria-hidden="true"><motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-rose-500/20 blur-3xl" /><motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 10, repeat: Infinity, delay: 2, ease: 'easeInOut' }} className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl" /></div>;
}
