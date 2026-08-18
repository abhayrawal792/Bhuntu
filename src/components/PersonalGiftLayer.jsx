import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Camera, Gift, Heart, LockKeyhole, MapPin, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { pageGiftByRoute } from '../data/pageGiftData';
import { pageNameByRoute } from '../data/pageNames';
import { personalVoice } from '../data/personalVoice';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';

const families = {
  letter: { label: 'Abu’s letter room', place: 'A quiet corner for words', icon: '✉️', cta: 'Open Abu’s letter', shell: 'from-rose-50 via-white to-orange-50', badge: 'text-rose-600', button: 'bg-rose-600', composition: 'paper' },
  keepsake: { label: 'The keepsake room', place: 'A small thing worth carrying', icon: '🎁', cta: 'Unwrap the keepsake', shell: 'from-amber-50 via-white to-yellow-50', badge: 'text-amber-700', button: 'bg-amber-600', composition: 'ticket' },
  memory: { label: 'The memory room', place: 'A moment Abu refused to lose', icon: '📍', cta: 'Reveal the memory', shell: 'from-sky-50 via-white to-indigo-50', badge: 'text-sky-700', button: 'bg-sky-700', composition: 'film' },
  compliment: { label: 'The compliment room', place: 'A mirror made from Abu’s words', icon: '💌', cta: 'Read the compliment', shell: 'from-pink-50 via-white to-fuchsia-50', badge: 'text-fuchsia-700', button: 'bg-fuchsia-700', composition: 'portrait' },
  promise: { label: 'The promise room', place: 'A road Abu still wants to walk', icon: '🛵', cta: 'Open the promise', shell: 'from-emerald-50 via-white to-teal-50', badge: 'text-emerald-700', button: 'bg-emerald-700', composition: 'postcard' },
  journey: { label: 'The journey room', place: 'One stop on our real story', icon: '🗺️', cta: 'Read the next stop', shell: 'from-violet-50 via-white to-indigo-50', badge: 'text-violet-700', button: 'bg-violet-700', composition: 'map' },
  bouquet: { label: 'The bouquet room', place: 'Flowers made of sentences', icon: '🌸', cta: 'Choose the flower Abu means', shell: 'from-pink-50 via-white to-green-50', badge: 'text-pink-700', button: 'bg-pink-600', composition: 'bouquet' },
  'voice-note': { label: 'The voice room', place: 'A message for the nights between calls', icon: '🎙️', cta: 'Open the voice note', shell: 'from-slate-50 via-white to-blue-50', badge: 'text-slate-700', button: 'bg-slate-800', composition: 'audio' },
  future: { label: 'The future room', place: 'A window into what Abu imagines', icon: '🏠', cta: 'Open the future postcard', shell: 'from-orange-50 via-white to-rose-50', badge: 'text-orange-700', button: 'bg-orange-700', composition: 'window' },
  blessing: { label: 'The blessing room', place: 'A little light for your next year', icon: '✨', cta: 'Read the birthday blessing', shell: 'from-indigo-50 via-white to-purple-50', badge: 'text-indigo-700', button: 'bg-indigo-700', composition: 'night' },
  cinema: { label: 'The cinema room', place: 'A scene Abu would replay', icon: '🎞️', cta: 'Open the scene', shell: 'from-stone-100 via-white to-amber-50', badge: 'text-stone-700', button: 'bg-stone-800', composition: 'film' },
  'single-quiz': { label: 'The one game’s prize room', place: 'Play once, then keep the feeling', icon: '🏆', cta: 'Open your personal prize', shell: 'from-cyan-50 via-white to-rose-50', badge: 'text-cyan-700', button: 'bg-cyan-700', composition: 'ticket' },
};

const pickVisitPhotoIndexes = (pathname) => {
  const total = ALL_MEDIA_PHOTOS.length;
  let previous = [];
  try {
    previous = JSON.parse(window.localStorage.getItem(`bhuntu-photo-visit:${pathname}`) || '[]');
  } catch (_) {
    previous = [];
  }
  let first = Math.floor(Math.random() * total);
  if (total > 1 && first === previous[0]) first = (first + 1 + Math.floor(Math.random() * (total - 1))) % total;
  const indexes = [first];
  while (indexes.length < 3) {
    const candidate = Math.floor(Math.random() * total);
    if (!indexes.includes(candidate)) indexes.push(candidate);
  }
  try { window.localStorage.setItem(`bhuntu-photo-visit:${pathname}`, JSON.stringify(indexes)); } catch (_) {}
  return indexes;
};

export default function PersonalGiftLayer() {
  const { pathname } = useLocation();
  const firstPath = React.useRef(pathname);
  const [revealed, setRevealed] = useState(false);
  const [photoIndexes, setPhotoIndexes] = useState(() => pickVisitPhotoIndexes(pathname));
  useEffect(() => {
    setRevealed(false);
    if (firstPath.current !== pathname) {
      firstPath.current = pathname;
      setPhotoIndexes(pickVisitPhotoIndexes(pathname));
    }
  }, [pathname]);
  if (pathname === '/' || pathname === '/home') return null;

  const item = pageGiftByRoute[pathname] || pageGiftByRoute['/'];
  if (!item) return null;
  const page = pageNameByRoute[pathname] || { title: item.title };
  const family = families[item.kind] || families.keepsake;
  const photos = photoIndexes.map((index) => getAssetUrl(ALL_MEDIA_PHOTOS[index % ALL_MEDIA_PHOTOS.length]));

  return (
    <section id="page-gift" className={`relative mx-auto my-12 w-[calc(100%-1rem)] max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br ${family.shell} p-3 shadow-[0_24px_80px_rgba(91,33,67,.16)] sm:my-16 sm:p-5`} aria-label={`${page.title} — personal birthday gift from Abu`}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/60 backdrop-blur-xl">
        <div className="grid lg:grid-cols-[.95fr_1.05fr]">
          <div className="relative min-h-[27rem] overflow-hidden bg-slate-900 p-5 text-white sm:min-h-[31rem] sm:p-7">
            <img src={photos[0]} alt="A personal memory selected for Samjhana" className="absolute inset-0 h-full w-full object-contain opacity-80" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
            <div className="relative flex h-full flex-col justify-between"><div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.22em] text-white/75"><span>{family.icon} {family.label}</span><span>Page {item.pageNumber}</span></div><div><div className="mb-3 flex items-center gap-2 text-xs font-bold text-white/75"><Camera className="h-4 w-4" /> {family.place}</div><p className="max-w-sm text-4xl font-black leading-[.95] tracking-[-0.06em]">For {item.nickname}, because Abu remembers the details.</p><div className="mt-5 flex gap-2">{photos.slice(1).map((photo) => <img key={photo} src={photo} alt="A second birthday memory" className="h-14 w-14 rounded-xl border-2 border-white/50 object-contain shadow-lg" loading="lazy" />)}</div></div></div>
          </div>
          <div className="p-6 sm:p-9">
            <div className={`text-xs font-black uppercase tracking-[0.22em] ${family.badge}`}>{family.label} · a birthday place for Samjhana</div>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[.92] tracking-[-0.07em] text-slate-950 sm:text-6xl">{page.title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">{item.message}</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-slate-900/10 bg-white/65 p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">A real memory</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-800"><MapPin className="mr-1 inline h-3.5 w-3.5" />{item.memory}</p></div><div className="rounded-2xl border border-slate-900/10 bg-white/65 p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">A compliment from Abu</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{item.compliment}</p></div></div>
            <blockquote className="mt-6 border-l-4 border-current/20 pl-4 text-sm italic leading-7 text-slate-700">“{personalVoice.statements.closing}”</blockquote>
            {!revealed ? <button type="button" onClick={() => setRevealed(true)} className={`mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.13em] text-white shadow-lg transition hover:-translate-y-0.5 ${family.button}`}><LockKeyhole className="h-4 w-4" /> {family.cta}</button> : <div className="mt-7 rounded-3xl border border-white bg-white/80 p-5 shadow-inner"><div className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] ${family.badge}`}><Sparkles className="h-4 w-4" /> Personal surprise unlocked</div><p className="mt-3 text-base font-bold leading-7 text-slate-900">{item.surprise}</p><div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-700"><Gift className="h-4 w-4" /> {item.gift}</div><div className="mt-4 flex items-center justify-between border-t border-slate-900/10 pt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500"><span>From Abhay, your Abu</span><a href="#page-gift" className="inline-flex items-center gap-1 underline underline-offset-4">Keep this <ArrowUpRight className="h-3.5 w-3.5" /></a></div></div>}
          </div>
        </div>
      </div>
    </section>
  );
}
