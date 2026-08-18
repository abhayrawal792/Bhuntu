import React, { useState } from 'react';
import { Flower2, Heart } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function BouquetReasonsPage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [open, setOpen] = useState(false);
  const photos = [3, 19, 31].map((i) => getAssetUrl(ALL_MEDIA_PHOTOS[i % ALL_MEDIA_PHOTOS.length]));
  return (
    <main className="min-h-[76dvh] bg-[#fff8f2] px-5 py-12 text-[#3a1f2a] sm:px-10"><div className="mx-auto max-w-6xl">
      <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[.3em] text-rose-500">A hand-tied birthday bouquet</p><h1 className="mt-5 text-6xl font-black leading-[.88] tracking-[-.08em] sm:text-8xl">{page.title}</h1><p className="mt-7 max-w-lg text-lg leading-8 text-[#7d5664]">Abu gathered the small reasons: the way my Babe says “huss”, the way Sanzu turns an ordinary day bright, and the way home sounds like your voice.</p></div><div className="grid grid-cols-3 gap-3">{photos.map((photo, i) => <img key={photo} src={photo} alt="A memory Abu keeps for Samjhana" className={i === 1 ? 'translate-y-8 aspect-[3/4] w-full rounded-[2rem] object-contain shadow-xl' : 'aspect-[3/4] w-full rounded-[2rem] object-contain shadow-xl'} loading="lazy" />)}</div></div>
      <section className="mt-16 rounded-[2rem] border border-rose-200 bg-white p-7 shadow-xl sm:p-10"><div className="flex items-center gap-3 text-rose-500"><Flower2 /><p className="text-xs font-black uppercase tracking-[.2em]">A note beneath the ribbon</p></div><h2 className="mt-5 text-3xl font-black">{gift.memory}</h2><p className="mt-4 max-w-3xl leading-8 text-[#7d5664]">{gift.compliment}</p><button type="button" onClick={() => setOpen((value) => !value)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-black text-white">{open ? 'Close Abu’s ribbon note' : 'Untie Abu’s ribbon note'} <Heart className={open ? 'h-4 w-4 fill-current' : 'h-4 w-4'} /></button>{open && <p className="mt-7 max-w-3xl border-l-4 border-rose-300 pl-5 text-xl font-bold leading-8 text-rose-700">{gift.message} {gift.surprise}</p>}</section>
    </div></main>
  );
}
