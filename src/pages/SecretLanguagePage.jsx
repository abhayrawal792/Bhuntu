import React, { useState } from 'react';
import { BookOpen, MessageCircle, Quote } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function SecretLanguagePage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [word, setWord] = useState('huss');
  const dictionary = { huss: 'I heard you, I am here, and I am not going anywhere.', Sanzu: 'the name that made Abhay feel like Abu.', Bhuntu: 'the smile Abu wants to protect.', Runchi: 'the soft chaos that makes a room feel alive.' };
  const photo = getAssetUrl(ALL_MEDIA_PHOTOS[128 % ALL_MEDIA_PHOTOS.length]);
  return <main className="min-h-[76dvh] bg-[#21172d] px-5 py-12 text-[#f7ecff] sm:px-10"><div className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[.3em] text-fuchsia-200/65">A tiny dictionary for two people</p><h1 className="mt-5 text-6xl font-black leading-[.88] tracking-[-.08em] sm:text-8xl">{page.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-fuchsia-100/65">Some words are ordinary until two people fill them with a whole relationship. This is Abu’s page for the language Samjhana made with him.</p><img src={photo} alt="A memory from Abu and Samjhana" className="mt-8 h-64 w-full max-w-xl rounded-[2rem] object-cover" loading="lazy" /></div><section className="rounded-[2rem] border border-fuchsia-200/15 bg-white/[.07] p-6 sm:p-9"><div className="flex items-center gap-3 text-fuchsia-200"><BookOpen /><span className="text-xs font-black uppercase tracking-[.2em]">Choose a word</span></div><div className="mt-7 flex flex-wrap gap-2">{Object.keys(dictionary).map((item) => <button type="button" key={item} onClick={() => setWord(item)} className={word === item ? 'rounded-full bg-fuchsia-200 px-4 py-2 text-sm font-black text-[#21172d]' : 'rounded-full border border-fuchsia-100/20 px-4 py-2 text-sm font-black text-fuchsia-100/70'}>{item}</button>)}</div><div className="mt-9 rounded-2xl bg-[#140d1c] p-6"><MessageCircle className="h-5 w-5 text-fuchsia-200" /><p className="mt-5 text-2xl font-black leading-tight">“{dictionary[word]}”</p><p className="mt-5 text-sm leading-7 text-fuchsia-100/55">{gift.message} {gift.surprise}</p></div><div className="mt-7 flex gap-3 text-sm italic text-fuchsia-100/55"><Quote className="h-4 w-4 shrink-0" />{gift.compliment}</div></section></div></div></main>;
}
