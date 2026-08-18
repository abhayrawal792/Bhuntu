import React, { useMemo, useState } from 'react';
import { ArrowRight, Bike, Check, Gift, Heart, Mail, MapPin, Mountain, Sparkles } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { photoCaptions } from '../data/photoCaptions';

const chapters = [
  { label: 'The last sunrise', kicker: 'The trail brought you here', icon: Sparkles, title: 'The last page is a sunrise, not a goodbye.', copy: 'Samjhana, if you reached this room, you carried Abu through every memory, promise, and little surprise. This final room is quiet on purpose: it is the part I want you to keep.', accent: 'from-indigo-950 via-rose-900 to-orange-300' },
  { label: 'What Abu promises', kicker: 'Not a perfect promise—an honest one', icon: Heart, title: 'I will keep choosing the details.', copy: 'I will remember the way you say “Abu,” the sweetness of “Sanzu..!!👀🤍✨,” the calls between Nepalgunj and Sakai, the food memories, the small worries, and the plans we have not lived yet.', accent: 'from-rose-950 via-fuchsia-900 to-amber-400' },
  { label: 'The future shelf', kicker: 'A few places I want beside you', icon: Mountain, title: 'One day, we will collect these views together.', copy: 'The light-blue scooter, Bardiya, Pokhara, Manang, Mustang, a thousand ordinary mornings, and every road that becomes beautiful because you are walking it with me.', accent: 'from-emerald-950 via-sky-900 to-cyan-300' },
];

function pickFinalPhotos() {
  const candidates = [132, 18, 42, 76, 101, 145, 160].filter((index) => ALL_MEDIA_PHOTOS[index]);
  const start = Math.floor(Math.random() * candidates.length);
  return [0, 1, 2].map((offset) => ALL_MEDIA_PHOTOS[candidates[(start + offset) % candidates.length]]);
}

export default function Room12Page() {
  const [chapter, setChapter] = useState(0);
  const photos = useMemo(pickFinalPhotos, []);
  const current = chapters[chapter];
  const Icon = current.icon;
  const photoMeta = photos.map((photo) => photoCaptions[photo.split('/').pop()] || { caption: 'A real memory Abu keeps close.' });

  return <main className={`min-h-dvh bg-gradient-to-br ${current.accent} px-5 py-12 text-white transition-colors duration-700 sm:px-10 sm:py-16`}>
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-white/20 pb-5 text-[10px] font-black uppercase tracking-[0.25em] text-white/70"><span>Room 263 / the final keepsake</span><span>20 August · for Samjhana</span></header>
      <div className="grid gap-12 py-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:py-20">
        <section><div className="flex items-center gap-3 text-amber-100"><Icon className="h-7 w-7" /><span className="text-xs font-black uppercase tracking-[0.25em]">{current.kicker}</span></div><h1 className="mt-6 max-w-3xl text-5xl font-black leading-[.9] tracking-[-0.08em] sm:text-7xl">{current.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-white/80">{current.copy}</p><div className="mt-8 grid gap-3 sm:grid-cols-3">{chapters.map((item, index) => { const ChapterIcon = item.icon; return <button key={item.label} type="button" onClick={() => setChapter(index)} className={`rounded-2xl border p-4 text-left transition ${index === chapter ? 'border-white bg-white/20 shadow-xl' : 'border-white/20 bg-black/10 hover:bg-white/10'}`}><ChapterIcon className="h-4 w-4 text-amber-100" /><span className="mt-4 block text-xs font-black uppercase tracking-[0.12em]">{item.label}</span><span className="mt-1 block text-[10px] text-white/60">0{index + 1} / 03</span></button>; })}</div>{chapter < chapters.length - 1 ? <button type="button" onClick={() => setChapter((value) => value + 1)} className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-black text-slate-900 shadow-xl transition hover:-translate-y-1 active:scale-[.98]">Open the next promise <ArrowRight className="h-4 w-4" /></button> : <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => window.print()} className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-black text-slate-900 shadow-xl transition hover:-translate-y-1 active:scale-[.98]"><Mail className="h-4 w-4" /> Keep this letter</button><span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-4 text-xs font-black uppercase tracking-[0.13em] text-white/80"><Check className="h-4 w-4" /> Abu’s final promise unlocked</span></div>}</section>
        <section className="relative"><div className="grid grid-cols-2 gap-4"><figure className="col-span-2 overflow-hidden rounded-[2rem] border border-white/30 bg-black/20 p-3 shadow-2xl"><img src={getAssetUrl(photos[0])} alt={photoMeta[0].caption} className="h-[21rem] w-full object-contain sm:h-[28rem]" /><figcaption className="px-2 pb-2 pt-3 text-xs font-semibold leading-5 text-white/75">{photoMeta[0].caption}</figcaption></figure><figure className="-rotate-2 overflow-hidden rounded-[1.5rem] border border-white/30 bg-white/10 p-2 shadow-xl"><img src={getAssetUrl(photos[1])} alt={photoMeta[1].caption} className="h-40 w-full object-contain sm:h-52" /><figcaption className="p-2 text-[10px] leading-4 text-white/70">{photoMeta[1].caption}</figcaption></figure><figure className="rotate-2 overflow-hidden rounded-[1.5rem] border border-white/30 bg-white/10 p-2 shadow-xl"><img src={getAssetUrl(photos[2])} alt={photoMeta[2].caption} className="h-40 w-full object-contain sm:h-52" /><figcaption className="p-2 text-[10px] leading-4 text-white/70">{photoMeta[2].caption}</figcaption></figure></div><div className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-white/25 bg-black/20 px-4 py-3 text-xs font-bold text-white/80 backdrop-blur sm:block"><Bike className="mr-2 inline h-4 w-4 text-amber-100" /> Future rides, Abu and Bhuntu</div></section>
      </div>
      <footer className="grid gap-6 border-t border-white/20 pt-7 text-sm text-white/65 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="font-script text-2xl text-white">Your Abu, Abhay</p><p className="mt-2">From Nepalgunj, with every road leading back to you in Sakai.</p></div><div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em]"><MapPin className="h-4 w-4" /> Abu → Samjhana</div></footer>
    </div>
  </main>;
}
