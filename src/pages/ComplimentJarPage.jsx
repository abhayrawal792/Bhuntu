import React, { useState } from 'react';
import { Heart, Quote, Archive, ArrowRight } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';

const notes = [
  ['For your kindness', 'Samjhana, the way you make ordinary people feel safe is one of the first things Abu fell for.'],
  ['For your courage', 'You keep moving through new days in Sakai, and Abu is proud of every quiet brave step.'],
  ['For your laugh', 'Your laugh is the sound Abu would choose if he could keep only one memory close.'],
];

export default function ComplimentJarPage() {
  const [note, setNote] = useState(0);
  return (
    <main className="min-h-dvh bg-[#fff8ef] px-5 py-16 text-[#40251c]">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <div className="rounded-[2.5rem] bg-[#40251c] p-8 text-amber-50">
            <Archive className="h-12 w-12 text-amber-300" />
            <p className="mt-7 text-xs font-black uppercase tracking-[.3em] text-amber-300">The compliment archive</p>
            <h1 className="mt-4 text-5xl font-black">Abu keeps noticing you.</h1>
            <p className="mt-5 leading-8 text-amber-100/75">Not as a jar to shake. Not as a random result. These are the things Abu has deliberately saved for Samjhana.</p>
            <img src={getAssetUrl(ALL_MEDIA_PHOTOS[56])} alt="A memory Abu treasures" className="mt-8 h-64 w-full rounded-2xl object-cover" />
          </div>
          <section>
            <div className="flex flex-wrap gap-3">{notes.map(([title], index) => <button key={title} onClick={() => setNote(index)} className={"rounded-full border px-4 py-2 text-sm font-bold " + (note === index ? 'border-rose-600 bg-rose-600 text-white' : 'border-rose-200 bg-white')}>{title}</button>)}</div>
            <article className="mt-7 rounded-[2rem] border border-rose-100 bg-white p-8 shadow-xl">
              <Quote className="h-10 w-10 text-rose-500" />
              <p className="mt-8 text-xs font-black uppercase tracking-[.25em] text-rose-600">Note 0{note + 1}</p>
              <p className="mt-5 text-4xl font-black leading-tight">{notes[note][1]}</p>
              <div className="mt-10 flex items-center justify-between border-t border-rose-100 pt-6"><span className="flex items-center gap-2 font-bold"><Heart className="h-5 w-5 fill-rose-500 text-rose-500" />Filed by Abu</span><button onClick={() => setNote((note + 1) % notes.length)} className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-sm font-black">Read another <ArrowRight className="h-4 w-4" /></button></div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
