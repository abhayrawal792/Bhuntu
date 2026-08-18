import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Camera, Gift, Heart, LockKeyhole, MapPin, Play, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { pageGiftByRoute } from '../data/pageGiftData';
import { pageNameByRoute } from '../data/pageNames';
import { photoCaptions } from '../data/photoCaptions';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { getIndependentBlueprint } from '../data/independentPageBlueprints';

const families = {
  letter: { label: 'Abu’s letter room', place: 'A quiet corner for words', icon: '✉️', cta: 'Open Abu’s letter', shell: 'from-rose-50 via-white to-orange-50', badge: 'text-rose-600', button: 'bg-rose-600' },
  keepsake: { label: 'The keepsake room', place: 'A small thing worth carrying', icon: '🎁', cta: 'Unwrap the keepsake', shell: 'from-amber-50 via-white to-yellow-50', badge: 'text-amber-700', button: 'bg-amber-600' },
  memory: { label: 'The memory room', place: 'A moment Abu refused to lose', icon: '📍', cta: 'Reveal the memory', shell: 'from-sky-50 via-white to-indigo-50', badge: 'text-sky-700', button: 'bg-sky-700' },
  compliment: { label: 'The compliment room', place: 'A mirror made from Abu’s words', icon: '💌', cta: 'Read the compliment', shell: 'from-pink-50 via-white to-fuchsia-50', badge: 'text-fuchsia-700', button: 'bg-fuchsia-700' },
  promise: { label: 'The promise room', place: 'A road Abu still wants to walk', icon: '🛵', cta: 'Open the promise', shell: 'from-emerald-50 via-white to-teal-50', badge: 'text-emerald-700', button: 'bg-emerald-700' },
  journey: { label: 'The journey room', place: 'One stop on our real story', icon: '🗺️', cta: 'Read the next stop', shell: 'from-violet-50 via-white to-indigo-50', badge: 'text-violet-700', button: 'bg-violet-700' },
  bouquet: { label: 'The bouquet room', place: 'Flowers made of sentences', icon: '🌸', cta: 'Choose the flower Abu means', shell: 'from-pink-50 via-white to-green-50', badge: 'text-pink-700', button: 'bg-pink-600' },
  'voice-note': { label: 'The voice room', place: 'A message for the nights between calls', icon: '🎙️', cta: 'Open the voice note', shell: 'from-slate-50 via-white to-blue-50', badge: 'text-slate-700', button: 'bg-slate-800' },
  future: { label: 'The future room', place: 'A window into what Abu imagines', icon: '🏠', cta: 'Open the future postcard', shell: 'from-orange-50 via-white to-rose-50', badge: 'text-orange-700', button: 'bg-orange-700' },
  blessing: { label: 'The blessing room', place: 'A little light for your next year', icon: '✨', cta: 'Read the birthday blessing', shell: 'from-indigo-50 via-white to-purple-50', badge: 'text-indigo-700', button: 'bg-indigo-700' },
  cinema: { label: 'The cinema room', place: 'A scene Abu would replay', icon: '🎞️', cta: 'Open the scene', shell: 'from-stone-100 via-white to-amber-50', badge: 'text-stone-700', button: 'bg-stone-800' },
  'single-quiz': { label: 'The one game’s prize room', place: 'Play once, then keep the feeling', icon: '🏆', cta: 'Open your personal prize', shell: 'from-cyan-50 via-white to-rose-50', badge: 'text-cyan-700', button: 'bg-cyan-700' },
};

const compositionVariant = {
  'cinema title card': 'cinema',
  'map-and-route board': 'map',
  'ticket-window frame': 'ticket',
  'three-column contact sheet': 'contact',
  'diary spread': 'diary',
  'archive index': 'archive',
  'postcard stack': 'postcard',
  'full-bleed portrait with margin notes': 'portrait',
};

const pickVisitPhotoIndexes = (pathname) => {
  const total = ALL_MEDIA_PHOTOS.length;
  let previous = [];
  try { previous = JSON.parse(window.localStorage.getItem(`bhuntu-photo-visit:${pathname}`) || '[]'); } catch (_) { previous = []; }
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
  const firstPath = useRef(pathname);
  const [revealed, setRevealed] = useState(false);
  const [photoIndexes, setPhotoIndexes] = useState(() => pickVisitPhotoIndexes(pathname));
  useEffect(() => {
    setRevealed(false);
    if (firstPath.current !== pathname) {
      firstPath.current = pathname;
      setPhotoIndexes(pickVisitPhotoIndexes(pathname));
    }
  }, [pathname]);
  if (pathname === '/' || pathname === '/home' || pathname === '/room/12') return null;

  const item = pageGiftByRoute[pathname] || pageGiftByRoute['/'];
  if (!item) return null;
  const page = pageNameByRoute[pathname] || { title: item.title };
  const family = families[item.kind] || families.keepsake;
  const blueprint = getIndependentBlueprint(pathname);
  const variant = compositionVariant[blueprint.composition] || (blueprint.order % 4 === 0 ? 'postcard' : blueprint.order % 3 === 0 ? 'portrait' : 'editorial');
  const photoPaths = photoIndexes.map((index) => ALL_MEDIA_PHOTOS[index % ALL_MEDIA_PHOTOS.length]);
  const photos = photoPaths.map((photoPath) => getAssetUrl(photoPath));
  const metas = photoPaths.map((photoPath) => photoCaptions[photoPath.split('/').pop()] || { caption: 'A real frame from the memories Abu keeps close.', memory: item.memory, comment: item.compliment });
  const reveal = <Reveal family={family} revealed={revealed} setRevealed={setRevealed} item={item} />;

  return (
    <section id="page-gift" className={`relative mx-auto my-12 w-[calc(100%-1rem)] max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/80 bg-gradient-to-br ${family.shell} p-3 shadow-[0_24px_80px_rgba(91,33,67,.16)] sm:my-16 sm:p-5`} aria-label={`${page.title} — personal birthday gift from Abu`} data-gift-variant={variant}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
      {variant === 'cinema' && <CinemaGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
      {variant === 'map' && <MapGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
      {variant === 'ticket' && <TicketGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
      {variant === 'contact' && <ContactGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
      {variant === 'diary' && <DiaryGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
      {variant === 'archive' && <ArchiveGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
      {variant === 'postcard' && <PostcardGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
      {variant === 'portrait' && <PortraitGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
      {variant === 'editorial' && <EditorialGift photos={photos} metas={metas} family={family} item={item} page={page} reveal={reveal} />}
    </section>
  );
}

function GiftTop({ family, page, item, tone = 'text-slate-700' }) {
  return <div className="flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.2em]"><span className={family.badge}>{family.icon} {family.label}</span><span className={tone}>Page {item.pageNumber} · {page.title}</span></div>;
}

function CaptionBlock({ meta, family, compact = false }) {
  return <div className={`grid gap-3 ${compact ? '' : 'sm:grid-cols-2'}`}><div className="rounded-2xl border border-slate-900/10 bg-white/65 p-4"><p className={`text-[10px] font-black uppercase tracking-[0.16em] ${family.badge}`}>What Abu remembers</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-800"><MapPin className="mr-1 inline h-3.5 w-3.5" />{meta.memory}</p></div><div className="rounded-2xl border border-slate-900/10 bg-white/65 p-4"><p className={`text-[10px] font-black uppercase tracking-[0.16em] ${family.badge}`}>Abu’s exact note</p><p className="mt-2 text-sm font-semibold leading-6 text-slate-800">{meta.comment}</p></div></div>;
}

function PhotoStrip({ photos, metas, className = '' }) {
  return <div className={`flex gap-2 ${className}`}>{photos.slice(1).map((photo, index) => <img key={photo} src={photo} alt={metas[index + 1].caption} className="h-14 w-14 rounded-xl border-2 border-white/70 object-contain shadow-lg" loading="lazy" />)}</div>;
}

function Reveal({ family, revealed, setRevealed, item }) {
  return !revealed ? <button type="button" onClick={() => setRevealed(true)} className={`mt-7 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-black uppercase tracking-[0.13em] text-white shadow-lg transition hover:-translate-y-0.5 active:scale-[.98] ${family.button}`}><LockKeyhole className="h-4 w-4" /> {family.cta}</button> : <div className="mt-7 rounded-3xl border border-white bg-white/80 p-5 shadow-inner"><div className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] ${family.badge}`}><Sparkles className="h-4 w-4" /> Personal surprise unlocked</div><p className="mt-3 text-base font-bold leading-7 text-slate-900">{item.surprise}</p><div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-700"><Gift className="h-4 w-4" /> {item.gift}</div><div className="mt-4 flex items-center justify-between border-t border-slate-900/10 pt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-500"><span>From Abhay, your Abu</span><a href="#page-gift" className="inline-flex items-center gap-1 underline underline-offset-4">Keep this <ArrowUpRight className="h-3.5 w-3.5" /></a></div></div>;
}

function CinemaGift({ photos, metas, family, item, page, reveal }) {
  return <div className="relative overflow-hidden rounded-[2rem] bg-[#111015] text-white"><img src={photos[0]} alt={metas[0].caption} className="h-[30rem] w-full object-contain opacity-70 sm:h-[38rem]" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 sm:p-10"><GiftTop family={family} page={page} item={item} tone="text-white/60" /><p className="mt-5 text-[10px] font-black uppercase tracking-[0.3em] text-white/55">A scene Abu would replay</p><h2 className="mt-3 max-w-3xl text-4xl font-black leading-[.94] tracking-[-0.07em] sm:text-7xl">{page.title}</h2><p className="mt-4 max-w-2xl text-base leading-7 text-white/75">{item.message}</p><blockquote className="mt-5 max-w-xl border-l-2 border-white/40 pl-4 text-sm italic leading-6 text-white/80">“{metas[0].caption}”</blockquote>{reveal}</div></div>;
}

function MapGift({ photos, metas, family, item, page, reveal }) {
  return <div className="grid overflow-hidden rounded-[2rem] bg-white/55 lg:grid-cols-[.85fr_1.15fr]"><div className="relative p-6 sm:p-10"><GiftTop family={family} page={page} item={item} /><div className="mt-12 border-l-2 border-dashed border-violet-300 pl-6"><p className="text-[10px] font-black uppercase tracking-[0.22em] text-violet-700">Nepalgunj → Sakai</p><h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-0.07em] text-slate-900 sm:text-6xl">{page.title}</h2><p className="mt-5 text-base leading-7 text-slate-700">{item.message}</p><CaptionBlock meta={metas[0]} family={family} compact />{reveal}</div></div><div className="relative min-h-[27rem] bg-slate-900 p-5 sm:min-h-[36rem]"><img src={photos[0]} alt={metas[0].caption} className="absolute inset-0 h-full w-full object-contain opacity-80" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/25" /><div className="absolute bottom-6 left-6 right-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-white/70">{metas[0].memory}</p><PhotoStrip photos={photos} metas={metas} className="mt-4" /></div></div></div>;
}

function TicketGift({ photos, metas, family, item, page, reveal }) {
  return <div className="rounded-[2rem] border-2 border-dashed border-current/25 bg-white/60 p-4 sm:p-8"><GiftTop family={family} page={page} item={item} /><div className="mt-6 grid gap-7 border-y border-dashed border-current/20 py-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div className="overflow-hidden rounded-2xl bg-slate-900"><img src={photos[0]} alt={metas[0].caption} className="h-[23rem] w-full object-contain" loading="lazy" /></div><div><p className={`text-[10px] font-black uppercase tracking-[0.22em] ${family.badge}`}>{family.place}</p><h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-0.07em] text-slate-900 sm:text-6xl">{page.title}</h2><p className="mt-5 text-base leading-7 text-slate-700">{item.message}</p><blockquote className="mt-5 border-l-4 border-current/20 pl-4 text-sm italic leading-7 text-slate-700">“{metas[0].caption}”</blockquote>{reveal}</div></div><CaptionBlock meta={metas[0]} family={family} /></div>;
}

function ContactGift({ photos, metas, family, item, page, reveal }) {
  return <div className="rounded-[2rem] border border-current/15 bg-white/55 p-5 sm:p-9"><GiftTop family={family} page={page} item={item} /><div className="mt-7 grid gap-3 sm:grid-cols-3">{photos.map((photo, index) => <figure key={photo} className={`overflow-hidden bg-slate-900 ${index === 1 ? 'sm:translate-y-6' : ''}`}><img src={photo} alt={metas[index].caption} className="h-64 w-full object-contain" loading="lazy" /><figcaption className="bg-white p-3 text-xs font-semibold leading-5 text-slate-700">{metas[index].caption}</figcaption></figure>)}</div><div className="mx-auto mt-12 max-w-3xl text-center"><h2 className="text-4xl font-black leading-[.95] tracking-[-0.07em] text-slate-900 sm:text-6xl">{page.title}</h2><p className="mt-5 text-base leading-7 text-slate-700">{item.message}</p>{reveal}</div></div>;
}

function DiaryGift({ photos, metas, family, item, page, reveal }) {
  return <div className="rounded-[2rem] border-x border-current/15 bg-[#fffdf7]/75 p-5 shadow-inner sm:p-10"><GiftTop family={family} page={page} item={item} /><div className="mt-8 grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start"><div className="rotate-[-2deg] overflow-hidden border border-amber-200 bg-white p-3 shadow-xl"><img src={photos[0]} alt={metas[0].caption} className="h-[24rem] w-full object-contain" loading="lazy" /><p className="p-3 font-script text-lg text-slate-700">{metas[0].caption}</p></div><div className="border-y border-dashed border-amber-300/70 py-6 text-left"><p className={`text-[10px] font-black uppercase tracking-[0.22em] ${family.badge}`}>Dear Samjhana,</p><h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-0.07em] text-slate-900 sm:text-6xl">{page.title}</h2><p className="mt-5 text-base leading-8 text-slate-700">{item.message}</p><CaptionBlock meta={metas[0]} family={family} compact />{reveal}</div></div></div>;
}

function ArchiveGift({ photos, metas, family, item, page, reveal }) {
  return <div className="rounded-[2rem] border border-slate-900/20 bg-[#f3efe5] p-5 font-mono text-slate-900 sm:p-10"><GiftTop family={family} page={page} item={item} /><div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start"><div><p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">PRIVATE RECORD / PHOTO ANNOTATION</p><h2 className="mt-4 text-4xl font-black leading-[.95] tracking-[-0.07em] sm:text-6xl">{page.title}</h2><p className="mt-5 max-w-2xl font-sans text-base leading-7 text-slate-700">{item.message}</p><div className="mt-7 border-y border-slate-900/20 py-5 font-sans"><CaptionBlock meta={metas[0]} family={family} compact /></div>{reveal}</div><div className="rotate-[1deg] border border-slate-900/20 bg-white p-3 shadow-lg"><img src={photos[0]} alt={metas[0].caption} className="h-[27rem] w-full object-contain" loading="lazy" /><p className="border-t border-dashed border-slate-900/20 p-3 text-xs leading-5 text-slate-600">FILE NOTE: {metas[0].comment}</p></div></div></div>;
}

function PostcardGift({ photos, metas, family, item, page, reveal }) {
  return <div className="rounded-[2rem] border border-orange-300/50 bg-white/60 p-4 shadow-xl sm:p-8"><GiftTop family={family} page={page} item={item} /><div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center"><div><h2 className="text-4xl font-black leading-[.95] tracking-[-0.07em] text-slate-900 sm:text-6xl">{page.title}</h2><p className="mt-5 text-base leading-7 text-slate-700">{item.message}</p><blockquote className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm italic leading-7 text-amber-950">“{metas[0].caption}”</blockquote>{reveal}</div><div className="rotate-[2deg] overflow-hidden rounded-xl border-8 border-white bg-white shadow-2xl"><img src={photos[0]} alt={metas[0].caption} className="h-[26rem] w-full object-contain" loading="lazy" /><div className="p-3 text-xs font-bold text-slate-700">{metas[0].memory}</div></div></div></div>;
}

function PortraitGift({ photos, metas, family, item, page, reveal }) {
  return <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white"><div className="relative min-h-[32rem]"><img src={photos[0]} alt={metas[0].caption} className="absolute inset-0 h-full w-full object-contain opacity-75" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 sm:p-10"><GiftTop family={family} page={page} item={item} tone="text-white/60" /><h2 className="mt-5 max-w-3xl text-4xl font-black leading-[.95] tracking-[-0.07em] sm:text-7xl">{page.title}</h2><p className="mt-5 max-w-2xl text-base leading-7 text-white/75">{item.message}</p>{reveal}</div></div><div className="grid gap-3 bg-white p-4 sm:grid-cols-2 sm:p-7"><CaptionBlock meta={metas[0]} family={family} /></div></div>;
}

function EditorialGift({ photos, metas, family, item, page, reveal }) {
  return <div className="rounded-[2rem] border border-white/70 bg-white/65 p-5 sm:p-10"><GiftTop family={family} page={page} item={item} /><div className="mt-8 grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center"><div className="relative overflow-hidden rounded-3xl bg-slate-900"><img src={photos[0]} alt={metas[0].caption} className="h-[27rem] w-full object-contain" loading="lazy" /><div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/80"><span><Camera className="mr-1 inline h-3.5 w-3.5" /> Real frame</span><span>{blueprintLabel(item)}</span></div></div><div><h2 className="text-4xl font-black leading-[.95] tracking-[-0.07em] text-slate-900 sm:text-6xl">{page.title}</h2><p className="mt-5 text-base leading-7 text-slate-700">{item.message}</p><blockquote className="mt-5 border-l-4 border-current/20 pl-4 text-sm italic leading-7 text-slate-700">“{metas[0].caption}”</blockquote><CaptionBlock meta={metas[0]} family={family} compact />{reveal}</div></div></div>;
}

function blueprintLabel(item) { return item.nickname ? `For ${item.nickname}` : 'For Samjhana'; }
