import React from 'react';
import { ArrowDown, Camera, Heart, MapPin, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { pageGiftByRoute } from '../data/pageGiftData';
import { pageNameByRoute } from '../data/pageNames';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';

const hash = (text) => [...text].reduce((value, char) => (value * 33 + char.charCodeAt(0)) >>> 0, 19);

export default function RomanticReplacementPage() {
  const { pathname } = useLocation();
  const item = pageGiftByRoute[pathname] || pageGiftByRoute['/'];
  const page = pageNameByRoute[pathname] || { title: item?.title || 'A new room from Abu' };
  const seed = hash(pathname);
  const photos = [0, 1, 2].map((offset) => getAssetUrl(ALL_MEDIA_PHOTOS[(seed + offset * 11) % ALL_MEDIA_PHOTOS.length]));
  if (!item) return null;

  return (
    <main className="min-h-[72dvh] bg-[#17131c] px-4 py-10 text-white sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div><p className="text-xs font-black uppercase tracking-[0.26em] text-rose-200/70">A new romantic room from Abu</p><h1 className="mt-5 max-w-xl text-6xl font-black leading-[.88] tracking-[-0.08em] sm:text-8xl">{page.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-white/65">No wheel, no random result, and no repeated game. This is a place made around one real thing Abu remembers about Samjhana.</p><div className="mt-8 flex items-center gap-2 text-sm font-bold text-rose-100"><Heart className="h-4 w-4 fill-current" /> For {item.nickname}, from Abhay — your Abu</div></div>
          <div className="relative grid grid-cols-2 gap-3"><img src={photos[0]} alt="A personal birthday memory" className="col-span-2 h-72 w-full rounded-[2rem] object-cover shadow-2xl" loading="lazy" /><img src={photos[1]} alt="Another shared memory" className="h-44 w-full rounded-[1.5rem] object-cover" loading="lazy" /><div className="flex h-44 flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/[.08] p-5"><Camera className="h-5 w-5 text-rose-200" /><p className="text-sm font-semibold leading-6 text-white/75">{item.memory}</p></div></div>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_.85fr]"><article className="rounded-[2rem] border border-white/10 bg-white/[.06] p-6 sm:p-9"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-rose-200/70"><MapPin className="h-4 w-4" /> The story inside this room</div><h2 className="mt-5 text-3xl font-black tracking-[-0.05em]">{item.message}</h2><p className="mt-5 text-base leading-8 text-white/65">{item.compliment}</p><div className="mt-7 border-t border-white/10 pt-5 text-sm italic leading-7 text-white/55">“{item.memory}” — a detail Abu kept because it belongs to you.</div></article><aside className="rounded-[2rem] border border-rose-200/20 bg-gradient-to-br from-rose-300/20 to-violet-300/10 p-6 sm:p-9"><Sparkles className="h-6 w-6 text-rose-200" /><p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-rose-100/70">Your new surprise</p><p className="mt-4 text-2xl font-black leading-tight">{item.gift}</p><p className="mt-5 text-sm leading-7 text-white/65">{item.surprise}</p><a href="#page-gift" className="mt-7 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-rose-100 underline underline-offset-4">Continue to the personal gift <ArrowDown className="h-4 w-4" /></a></aside></div>
      </div>
    </main>
  );
}
