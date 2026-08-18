import React, { useState } from 'react';
import { Film, Play, Rewind } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
import { pageGiftByRoute, pageNameByRoute } from '../data/pageGiftData';
import { useLocation } from 'react-router-dom';

export default function MemoryReplayPage() {
  const { pathname } = useLocation();
  const gift = pageGiftByRoute[pathname] || {};
  const page = pageNameByRoute[pathname] || {};
  const [frame, setFrame] = useState(0);
  const frames = [18, 63, 117, 165].map((i) => getAssetUrl(ALL_MEDIA_PHOTOS[i % ALL_MEDIA_PHOTOS.length]));
  return <main className="min-h-[76dvh] bg-[#191919] px-5 py-12 text-white sm:px-10"><div className="mx-auto max-w-6xl"><div className="flex items-end justify-between gap-6"><div><p className="text-xs font-black uppercase tracking-[.3em] text-orange-300/70">A private film Abu keeps replaying</p><h1 className="mt-5 text-6xl font-black leading-[.88] tracking-[-.08em] sm:text-8xl">{page.title}</h1></div><Film className="h-12 w-12 text-orange-300" /></div><div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_.8fr]"><section><div className="relative overflow-hidden rounded-[2rem] border-8 border-[#292929] bg-black p-3 shadow-2xl"><img src={frames[frame]} alt="A replayed memory" className="aspect-video w-full rounded-xl object-cover" loading="lazy" /><div className="absolute bottom-7 left-7 rounded bg-black/70 px-3 py-1 text-xs font-black tracking-[.2em]">FRAME 0{frame + 1}</div></div><div className="mt-5 grid grid-cols-4 gap-2">{frames.map((photo, i) => <button type="button" key={photo} onClick={() => setFrame(i)} className={frame === i ? 'overflow-hidden rounded-xl border-2 border-orange-300' : 'overflow-hidden rounded-xl border-2 border-transparent'}><img src={photo} alt="Memory frame" className="aspect-square w-full object-cover" loading="lazy" /></button>)}</div></section><aside className="rounded-[2rem] border border-orange-200/15 bg-white/[.06] p-7"><Rewind className="h-6 w-6 text-orange-300" /><h2 className="mt-7 text-3xl font-black">{gift.memory}</h2><p className="mt-5 leading-8 text-white/65">{gift.message}</p><button type="button" onClick={() => setFrame((frame + 1) % frames.length)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-300 px-5 py-3 text-sm font-black text-[#191919]"><Play className="h-4 w-4" />Replay one more frame</button></aside></div></div></main>;
}
