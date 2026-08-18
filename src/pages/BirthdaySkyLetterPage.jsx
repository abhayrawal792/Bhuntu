import React, { useState } from 'react';
import { Moon, Orbit, Star } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function BirthdaySkyLetterPage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [constellation, setConstellation] = useState(0);
  const photos = [29, 87, 139].map((i) => getAssetUrl(ALL_MEDIA_PHOTOS[i % ALL_MEDIA_PHOTOS.length]));
  const lines = ['Your laugh is the first star Abu looks for.', 'Your “huss” is the small moon over every hard day.', 'Your future is the sky Abu wants to travel toward.'];
  return <main className="min-h-[76dvh] bg-[#071027] px-5 py-12 text-[#edf5ff] sm:px-10"><div className="mx-auto max-w-6xl"><div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><div className="flex items-center gap-3 text-amber-200"><Moon className="h-7 w-7" /><span className="text-xs font-black uppercase tracking-[.3em]">Birthday observatory</span></div><h1 className="mt-6 text-6xl font-black leading-[.88] tracking-[-.08em] sm:text-8xl">{page.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-blue-100/60">Samjhana, this is not a horoscope. It is a small sky-letter made from what Abu already knows to be true about you.</p><div className="mt-8 flex flex-wrap gap-2">{lines.map((line, i) => <button type="button" key={line} onClick={() => setConstellation(i)} className={constellation === i ? 'rounded-full bg-amber-200 px-4 py-2 text-xs font-black text-[#071027]' : 'rounded-full border border-blue-100/20 px-4 py-2 text-xs font-black text-blue-100/65'}><Star className="mr-1 inline h-3 w-3" />0{i + 1}</button>)}</div><p className="mt-7 text-2xl font-black leading-tight text-amber-100">{lines[constellation]}</p></div><section className="rounded-[2.5rem] border border-blue-100/15 bg-white/[.05] p-5 shadow-[0_0_100px_rgba(90,140,255,.14)]"><div className="grid grid-cols-2 gap-3"><img src={photos[0]} alt="A birthday memory" className="col-span-2 h-64 w-full rounded-[2rem] object-cover" loading="lazy" />{photos.slice(1).map((photo) => <img key={photo} src={photo} alt="A sky-letter memory" className="h-44 w-full rounded-2xl object-cover" loading="lazy" />)}</div><div className="mt-6 flex gap-3 rounded-2xl bg-[#101c3c] p-5"><Orbit className="h-5 w-5 shrink-0 text-amber-200" /><p className="text-sm leading-7 text-blue-100/70">{gift.message} {gift.surprise}</p></div></section></div></div></main>;
}
