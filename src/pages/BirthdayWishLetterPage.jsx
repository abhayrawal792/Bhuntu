import React, { useState } from 'react';
import { Cake, Gift, LockKeyhole } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function BirthdayWishLetterPage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [revealed, setRevealed] = useState(false);
  const photos = [142, 151, 160].map((i) => getAssetUrl(ALL_MEDIA_PHOTOS[i % ALL_MEDIA_PHOTOS.length]));
  return <main className="min-h-[76dvh] bg-gradient-to-br from-[#fff2f6] via-[#fffaf2] to-[#efe6ff] px-5 py-12 text-[#382536] sm:px-10"><div className="mx-auto max-w-6xl"><div className="text-center"><p className="text-xs font-black uppercase tracking-[.3em] text-rose-500">Sealed for your birthday only</p><h1 className="mt-5 text-6xl font-black leading-[.88] tracking-[-.08em] sm:text-8xl">{page.title}</h1><p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#8a6474]">Bebo, Abu wrote this before you opened the door. The photos are the outside of the envelope; the promise is inside.</p></div><div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3">{photos.map((photo) => <img key={photo} src={photo} alt="Birthday memory for Samjhana" className="h-60 w-full rounded-[2rem] object-cover shadow-lg" loading="lazy" />)}</div><section className="mx-auto mt-10 max-w-3xl rounded-[2rem] border border-rose-200 bg-white/80 p-8 text-center shadow-xl sm:p-12"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-rose-100 text-rose-500"><Cake /></div><h2 className="mt-6 text-3xl font-black">A birthday wish from Abu</h2><p className="mt-4 leading-8 text-[#8a6474]">{gift.memory}</p><button type="button" onClick={() => setRevealed(true)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#382536] px-6 py-3 text-sm font-black text-white"><LockKeyhole className="h-4 w-4" />{revealed ? 'The seal is open' : 'Break the birthday seal'}</button>{revealed && <div className="mt-8 border-t border-rose-100 pt-7 text-left"><Gift className="h-5 w-5 text-rose-500" /><p className="mt-4 text-2xl font-black leading-8 text-rose-700">{gift.message}</p><p className="mt-4 text-sm leading-7 text-[#8a6474]">{gift.gift} {gift.surprise}</p></div>}</section></div></main>;
}
