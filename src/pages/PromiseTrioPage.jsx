import React, { useState } from 'react';
import { Check, HeartHandshake, Lock, Shield } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function PromiseTrioPage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [chosen, setChosen] = useState([]);
  const promises = ['I will keep choosing your voice across the distance.', 'I will make room for every version of Sanzu.', 'I will take you to the places we keep naming.'];
  const photo = getAssetUrl(ALL_MEDIA_PHOTOS[91 % ALL_MEDIA_PHOTOS.length]);
  return <main className="min-h-[76dvh] bg-[#f3efe9] px-5 py-12 text-[#24201d] sm:px-10"><div className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[.3em] text-[#92744e]">Three promises, no spinning parts</p><h1 className="mt-5 text-6xl font-black leading-[.9] tracking-[-.08em] sm:text-8xl">{page.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#6f6255]">Babe, these are not prizes. They are the quiet things Abu wants to keep doing after the birthday page ends.</p><img src={photo} alt="A promise memory for Samjhana" className="mt-8 h-56 w-full max-w-xl rounded-[2rem] object-cover" loading="lazy" /></div><section className="rounded-[2rem] border border-[#d6c4a9] bg-white p-6 shadow-xl sm:p-9"><div className="flex items-center gap-3 text-[#92744e]"><HeartHandshake /><span className="text-xs font-black uppercase tracking-[.2em]">Tap to accept a promise</span></div><div className="mt-7 space-y-3">{promises.map((promise, i) => <button type="button" key={promise} onClick={() => setChosen((items) => items.includes(i) ? items.filter((item) => item !== i) : [...items, i])} className={chosen.includes(i) ? 'flex w-full items-start gap-4 rounded-2xl border border-[#92744e] bg-[#f4eadb] p-4 text-left' : 'flex w-full items-start gap-4 rounded-2xl border border-[#eadfd0] p-4 text-left'}><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#24201d] text-white">{chosen.includes(i) ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4" />}</span><span className="font-bold leading-6">{promise}</span></button>)}</div><div className="mt-8 border-t border-[#eadfd0] pt-6"><Shield className="h-5 w-5 text-[#92744e]" /><p className="mt-3 text-sm leading-7 text-[#6f6255]">{chosen.length === 3 ? gift.message : 'Choose all three, Sanu. Abu wrote one promise for each direction our story has taken.'}</p></div></section></div></div></main>;
}
