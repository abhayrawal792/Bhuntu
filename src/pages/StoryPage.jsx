import React, { useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Feather } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const lines = [
  'There was a room-search conversation in Nepalgunj that did not know it was opening Abu’s whole heart.',
  'There was Bageshwori, Water Park, Chau-Chau, and Panipuri — ordinary plans that became our private language.',
  'There were calls from Nepalgunj to Sakai where your face made the distance forget its job.',
  'There was you, Samjhana — my Sanzu, my Bhuntu, my Sanu — turning minutes into the place Abu belongs.',
];

export default function StoryPage() {
  const navigate = useNavigate();
  const [line, setLine] = useState(0);
  return (
    <main className="min-h-dvh bg-[#f5f1e9] text-[#24221e]">
      <section className="mx-auto grid min-h-dvh w-full max-w-6xl gap-10 px-5 py-10 sm:px-10 lg:grid-cols-[.7fr_1.3fr] lg:items-center lg:gap-20 lg:px-16">
        <aside className="flex flex-col justify-between gap-10 lg:min-h-[34rem]">
          <div><button type="button" onClick={() => navigate('/')} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#766c5e] transition hover:text-[#24221e]"><ArrowLeft className="h-4 w-4" /> Doorway</button><div className="mt-12 h-px w-24 bg-[#24221e]" /><p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-[#8a5b47]">Chapter three / Abu’s story of Samjhana</p></div>
          <div><Feather className="h-8 w-8 text-[#8a5b47]" /><p className="mt-6 max-w-xs font-serif text-2xl leading-9 text-[#655b4e]">Some stories are built from plot. Ours is built from the names, places, and tiny things Abu keeps noticing about you.</p><div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#8a5b47]"><span className="h-2 w-2 rounded-full bg-[#8a5b47]" /> An unfolding letter, not a game</div></div>
        </aside>
        <div className="relative overflow-hidden border-y border-[#cfc4b4] py-12 sm:py-16">
          <div className="absolute right-0 top-0 font-serif text-[8rem] leading-none text-[#ded4c5] sm:text-[12rem]">{String(line + 1).padStart(2, '0')}</div>
          <p className="relative text-sm font-bold uppercase tracking-[0.25em] text-[#8a5b47]">A small archive of becoming Abu and Samjhana</p>
          <h1 className="relative mt-7 max-w-2xl font-serif text-5xl leading-[.96] tracking-[-0.05em] sm:text-7xl">The story is not only what happened. It is what stayed in Abu’s heart.</h1>
          <div className="relative mt-16 min-h-[9rem] max-w-2xl"><p className="font-serif text-3xl leading-[1.25] text-[#403a33] transition-opacity duration-500 sm:text-4xl">{lines[line]}</p></div>
          <div className="relative mt-12 flex items-center justify-between border-t border-[#cfc4b4] pt-5"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a8278]">{line + 1} / {lines.length}</p><div className="flex gap-2"><button type="button" aria-label="Previous story line" onClick={() => setLine((value) => (value - 1 + lines.length) % lines.length)} className="grid h-10 w-10 place-items-center rounded-full border border-[#b7aa98] transition hover:bg-[#e9e0d3] active:scale-95"><ArrowLeft className="h-4 w-4" /></button><button type="button" aria-label="Next story line" onClick={() => setLine((value) => (value + 1) % lines.length)} className="grid h-10 w-10 place-items-center rounded-full bg-[#24221e] text-white transition hover:bg-[#8a5b47] active:scale-95"><ArrowRight className="h-4 w-4" /></button></div></div>
          <div className="mt-14 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#8a5b47]"><ArrowDown className="h-4 w-4" /> Keep turning the page, Sanu</div>
        </div>
      </section>
    </main>
  );
}
