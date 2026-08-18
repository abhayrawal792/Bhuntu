import React, { useState } from 'react';
import { Bike, MapPin, Route } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function FutureNightRidePage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [stop, setStop] = useState(0);
  const photos = [42, 58, 76].map((i) => getAssetUrl(ALL_MEDIA_PHOTOS[i % ALL_MEDIA_PHOTOS.length]));
  const stops = ['Bardiya sunrise', 'Pokhara lakeside', 'Manang under a clear sky'];
  return <main className="min-h-[76dvh] overflow-hidden bg-[#101b2e] px-5 py-12 text-[#edf6ff] sm:px-10"><div className="mx-auto max-w-6xl"><div className="flex flex-wrap items-end justify-between gap-7"><div><p className="text-xs font-black uppercase tracking-[.32em] text-cyan-300/70">A route Abu is saving for us</p><h1 className="mt-5 max-w-3xl text-6xl font-black leading-[.88] tracking-[-.08em] sm:text-8xl">{page.title}</h1></div><Bike className="h-16 w-16 text-cyan-300" /></div><div className="mt-12 grid gap-8 lg:grid-cols-[1fr_.8fr]"><section className="rounded-[2rem] border border-cyan-200/15 bg-white/[.06] p-5"><div className="grid grid-cols-3 gap-3">{photos.map((photo) => <img key={photo} src={photo} alt="A future journey memory" className="h-56 w-full rounded-2xl object-contain" loading="lazy" />)}</div><div className="mt-6 flex items-center gap-3 text-cyan-200"><MapPin className="h-5 w-5" /><span className="text-sm font-bold">Nepalgunj → {stops[stop]}</span></div><div className="mt-6 flex flex-wrap gap-2">{stops.map((item, i) => <button type="button" key={item} onClick={() => setStop(i)} className={i === stop ? 'rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-[#101b2e]' : 'rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white/65'}>{item}</button>)}</div></section><aside className="rounded-[2rem] border border-amber-200/20 bg-gradient-to-br from-amber-200/15 to-cyan-200/10 p-7"><Route className="h-7 w-7 text-amber-200" /><p className="mt-8 text-xs font-black uppercase tracking-[.22em] text-cyan-100/60">What Abu promises at the next stop</p><h2 className="mt-4 text-3xl font-black leading-tight">{gift.gift}</h2><p className="mt-5 leading-8 text-white/65">{gift.message}</p><p className="mt-7 border-t border-white/10 pt-5 text-sm italic text-cyan-100/65">{gift.surprise}</p></aside></div></div></main>;
}
