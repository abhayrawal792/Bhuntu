import React from 'react';
import { ArrowLeft, Moon, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const constellations = [
  ['The way you look up when you are thinking', 'a small star near the horizon'],
  ['The way you remember the details I forget', 'a patient line between two lights'],
  ['The way a room changes when you arrive', 'the brightest point in the field'],
];

export default function StarsPage() {
  const navigate = useNavigate();
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#080d1b] text-[#f5f0df]">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_18%_20%,#fff_0_1px,transparent_1.5px),radial-gradient(circle_at_72%_36%,#fff_0_1px,transparent_1.5px),radial-gradient(circle_at_45%_78%,#fff_0_1px,transparent_1.5px),radial-gradient(circle_at_88%_82%,#fff_0_1px,transparent_1.5px)] [background-size:180px_160px,240px_210px,210px_190px,280px_240px]" />
      <section className="relative mx-auto grid min-h-dvh max-w-7xl gap-12 px-5 py-10 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-16">
        <div><button type="button" onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-sky-200/70 transition hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to the doorway</button><div className="mt-16 flex items-center gap-3 text-sky-200"><Moon className="h-6 w-6" /><span className="text-xs font-bold uppercase tracking-[0.28em]">Page five / the star room</span></div><h1 className="mt-7 max-w-xl text-6xl font-black leading-[.9] tracking-[-0.07em] sm:text-8xl">Some people are a whole sky.</h1><p className="mt-8 max-w-lg text-lg leading-8 text-sky-100/60">No wishing, no score, no constellation to solve. Just a quiet observatory for the qualities that make you impossible to replace.</p></div>
        <div className="relative min-h-[34rem] rounded-[2.5rem] border border-sky-200/15 bg-sky-100/[.04] p-7 shadow-[0_0_100px_rgba(72,128,220,.12)] backdrop-blur-sm sm:p-10"><div className="flex items-center justify-between border-b border-sky-100/10 pb-5"><p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-200/65">The private sky map</p><Star className="h-5 w-5 fill-current text-amber-200" /></div><div className="relative py-12"><div className="absolute left-[1.2rem] top-10 bottom-10 w-px bg-gradient-to-b from-sky-200/0 via-sky-200/40 to-sky-200/0" />{constellations.map(([title, caption], index) => <article key={title} className="relative mb-12 flex gap-7 last:mb-0"><div className="relative mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-sky-200/40 bg-[#0b1226] text-amber-200 shadow-[0_0_20px_rgba(253,230,138,.22)]"><Star className="h-4 w-4 fill-current" /></div><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-200/45">0{index + 1} / an orbit I keep noticing</p><h2 className="mt-2 max-w-md text-2xl font-bold leading-tight tracking-[-0.03em] text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-sky-100/50">{caption}</p></div></article>)}</div><div className="border-t border-sky-100/10 pt-5 text-sm italic text-sky-100/45">The best things do not need to be chased. They keep shining.</div></div>
      </section>
    </main>
  );
}
