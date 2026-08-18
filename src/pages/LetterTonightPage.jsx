import React, { useState } from 'react';
import { Mail, PenLine, Stamp } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function LetterTonightPage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [opened, setOpened] = useState(false);
  const photos = [107, 116].map((i) => getAssetUrl(ALL_MEDIA_PHOTOS[i % ALL_MEDIA_PHOTOS.length]));
  return <main className="min-h-[76dvh] bg-[#e8e0d5] px-5 py-12 text-[#30261f] sm:px-10"><div className="mx-auto max-w-5xl"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.3em] text-[#a15f45]">Posted from Nepalgunj to Sakai</p><h1 className="mt-5 max-w-3xl text-6xl font-black leading-[.88] tracking-[-.08em] sm:text-8xl">{page.title}</h1></div><Stamp className="h-14 w-14 text-[#a15f45]" /></div><div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><aside className="grid grid-cols-2 gap-3"><img src={photos[0]} alt="A shared memory" className="h-72 w-full rotate-[-3deg] rounded-lg object-cover shadow-xl" loading="lazy" /><img src={photos[1]} alt="A second shared memory" className="mt-12 h-72 w-full rotate-[4deg] rounded-lg object-cover shadow-xl" loading="lazy" /></aside><section className="rounded-[1.5rem] bg-[#fffaf1] p-7 shadow-2xl sm:p-12"><Mail className="h-6 w-6 text-[#a15f45]" /><p className="mt-8 text-xs font-black uppercase tracking-[.2em] text-[#a15f45]">Dear Samjhana</p><h2 className="mt-4 text-3xl font-black leading-tight">A letter for the night you miss Abu.</h2><p className="mt-5 leading-8 text-[#725d4f]">{gift.memory}. {gift.compliment}</p><button type="button" onClick={() => setOpened((value) => !value)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#30261f] px-6 py-3 text-sm font-black text-[#fffaf1]"><PenLine className="h-4 w-4" />{opened ? 'Fold the letter' : 'Open the last paragraph'}</button>{opened && <div className="mt-8 border-t border-[#e3d4c4] pt-6 text-xl font-bold leading-8 text-[#a15f45]">{gift.message}<br /><span className="mt-4 block text-sm font-semibold leading-7 text-[#725d4f]">{gift.gift} — {gift.surprise}</span></div>}</section></div></div></main>;
}
