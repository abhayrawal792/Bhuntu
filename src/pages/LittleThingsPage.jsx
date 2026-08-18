import React, { useState } from 'react';
import { CheckCircle2, Eye, NotebookPen } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function LittleThingsPage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [seen, setSeen] = useState([]);
  const details = ['The way you make “huss” sound like a whole conversation.', 'The way Nepalgunj becomes softer after a Sakai call.', 'The way every nickname still means the same person: my Samjhana.'];
  const photos = [7, 48, 172].map((i) => getAssetUrl(ALL_MEDIA_PHOTOS[i % ALL_MEDIA_PHOTOS.length]));
  return <main className="min-h-[76dvh] bg-[#f6f1e7] px-5 py-12 text-[#27332e] sm:px-10"><div className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-black uppercase tracking-[.3em] text-emerald-700/70">Abu’s observation notebook</p><h1 className="mt-5 text-6xl font-black leading-[.88] tracking-[-.08em] sm:text-8xl">{page.title}</h1><p className="mt-7 max-w-xl text-lg leading-8 text-[#68766b]">Bhoot, the grand gestures are easy to remember. Abu wanted this room to keep the tiny details that make your presence feel like home.</p><div className="mt-8 flex items-center gap-3 text-emerald-700"><NotebookPen className="h-5 w-5" /><span className="text-sm font-bold">Field notes from Abu, for Babe</span></div></div><section className="rounded-[2rem] border border-emerald-200 bg-white p-5 shadow-xl sm:p-8"><div className="grid grid-cols-3 gap-3">{photos.map((photo) => <img key={photo} src={photo} alt="A detail Abu notices" className="h-44 w-full rounded-2xl object-contain" loading="lazy" />)}</div><div className="mt-8 space-y-3">{details.map((detail, i) => <button type="button" key={detail} onClick={() => setSeen((items) => items.includes(i) ? items : [...items, i])} className={seen.includes(i) ? 'flex w-full items-start gap-4 rounded-2xl border border-emerald-500 bg-emerald-50 p-4 text-left' : 'flex w-full items-start gap-4 rounded-2xl border border-emerald-100 p-4 text-left'}><span className="mt-0.5 text-emerald-700">{seen.includes(i) ? <CheckCircle2 className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</span><span className="font-bold leading-6">{detail}</span></button>)}</div><p className="mt-7 border-t border-emerald-100 pt-6 text-sm leading-7 text-[#68766b]">{seen.length === 3 ? gift.message : gift.compliment}</p></section></div></div></main>;
}
