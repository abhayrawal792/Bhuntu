import React, { useState } from 'react';
import { ArrowUpRight, Gift, Heart, LockKeyhole, MapPin, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { pageGiftByRoute } from '../data/pageGiftData';
import { personalVoice } from '../data/personalVoice';

const palettes = {
  rose: 'border-rose-200 bg-rose-50 text-rose-950', saffron: 'border-amber-200 bg-amber-50 text-amber-950', night: 'border-indigo-200 bg-indigo-950 text-white',
  mint: 'border-emerald-200 bg-emerald-50 text-emerald-950', lavender: 'border-violet-200 bg-violet-50 text-violet-950', peach: 'border-orange-200 bg-orange-50 text-orange-950',
  sky: 'border-sky-200 bg-sky-50 text-sky-950', plum: 'border-fuchsia-200 bg-fuchsia-950 text-white',
};

const variants = {
  letter: { label: 'A letter from Abu', icon: '✉️', hint: 'Read this like Abu is sitting beside you.' },
  keepsake: { label: 'A keepsake for Samjhana', icon: '🎁', hint: 'Keep this little detail close.' },
  memory: { label: 'A memory Abu saved', icon: '📍', hint: 'This moment still has a pulse.' },
  compliment: { label: 'A compliment you cannot return', icon: '💌', hint: 'Abu is being specific on purpose.' },
  promise: { label: 'A promise for the road', icon: '🛵', hint: 'For the distance between Nepalgunj and Sakai.' },
  journey: { label: 'A stop on our story', icon: '🗺️', hint: 'One page, one real memory.' },
  bouquet: { label: 'A bouquet made of words', icon: '🌸', hint: 'Every flower is a sentence Abu means.' },
  'voice-note': { label: 'A voice-note in writing', icon: '🎙️', hint: 'Imagine Abu saying this softly.' },
  future: { label: 'A future postcard', icon: '🏠', hint: 'A place we have not reached yet.' },
  blessing: { label: 'A birthday blessing', icon: '✨', hint: 'For the year ahead of my Sanu.' },
  cinema: { label: 'A scene Abu would replay', icon: '🎞️', hint: 'Some memories deserve a second look.' },
  'single-quiz': { label: 'The one game’s personal prize', icon: '🏆', hint: 'No second game is hiding here.' },
};

export default function PersonalGiftLayer() {
  const { pathname } = useLocation();
  const [revealed, setRevealed] = useState(false);
  if (pathname === '/' || pathname === '/home') return null;
  const item = pageGiftByRoute[pathname] || pageGiftByRoute['/'];
  if (!item) return null;
  const variant = variants[item.kind] || variants.keepsake;
  const palette = palettes[item.accent] || palettes.rose;

  return (
    <section className={`mx-auto my-10 w-[calc(100%-2rem)] max-w-6xl overflow-hidden rounded-[2rem] border p-5 shadow-lg sm:my-14 sm:p-8 ${palette}`} aria-label={`Personal gift for ${item.nickname}`}>
      <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
        <div><div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] opacity-70"><span className="text-xl">{variant.icon}</span>{variant.label}</div><h2 className="mt-4 max-w-md text-3xl font-black leading-tight tracking-[-0.05em]">{item.nickname}, this page has one thing Abu wanted you to keep.</h2><p className="mt-4 max-w-md text-sm leading-7 opacity-75">{variant.hint} {personalVoice.statements.closing}</p><div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] opacity-60"><Heart className="h-4 w-4 fill-current" /> From Abhay, your Abu</div></div>
        <div className="rounded-[1.5rem] border border-current/10 bg-white/55 p-5 backdrop-blur sm:p-7">
          <div className="flex items-center justify-between gap-4 border-b border-current/10 pb-4"><div><p className="text-xs font-bold uppercase tracking-[0.18em] opacity-60">{item.title}</p><p className="mt-2 text-xl font-black">{item.gift}</p></div><Gift className="h-6 w-6 shrink-0 opacity-70" /></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-55">A memory</p><p className="mt-2 text-sm leading-6 opacity-80"><MapPin className="mr-1 inline h-3.5 w-3.5" />{item.memory}</p></div><div><p className="text-[10px] font-black uppercase tracking-[0.18em] opacity-55">A compliment</p><p className="mt-2 text-sm leading-6 opacity-80">{item.compliment}</p></div></div>
          <div className="mt-6 rounded-2xl border border-current/10 bg-black/[.04] p-4"><p className="text-sm font-semibold leading-7">{item.message}</p></div>
          {!revealed ? <button type="button" onClick={() => setRevealed(true)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-current px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-white mix-blend-multiply transition hover:scale-[1.02] active:scale-[.98]"><LockKeyhole className="h-4 w-4" /> Open the personal surprise</button> : <div className="mt-6 rounded-2xl bg-white/65 p-4"><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] opacity-65"><Sparkles className="h-4 w-4" /> Surprise unlocked</div><p className="mt-2 text-sm font-semibold leading-7">{item.surprise}</p><a href="#top" className="mt-3 inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] underline underline-offset-4">Keep exploring <ArrowUpRight className="h-3.5 w-3.5" /></a></div>}
        </div>
      </div>
    </section>
  );
}
