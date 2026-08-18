import React, { useState } from 'react';
import { Award, Heart, Star } from 'lucide-react';

const honors = [
  { title: 'The award for being home', note: 'Presented to Samjhana, whose voice makes Nepalgunj feel closer to Sakai.' },
  { title: 'The award for every nickname', note: 'Presented to Sanzu, Bhoot, Bhuntu, Sanu, Babe, Runchi, Bebo, and Fuchee — one person, many beloved names.' },
  { title: 'The award for the future', note: 'Presented to the girl Abu wants beside him on every road from Bardiya to Mustang.' },
];

export default function LoveAwardsNightPage() {
  const [honor, setHonor] = useState(0);
  const item = honors[honor];
  return (
    <main className="min-h-dvh bg-[#1f1c2e] px-5 py-12 text-[#fff3d8] sm:px-10 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="border-b border-[#fff3d8]/20 pb-9">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e7b268]">A private awards night · hosted by Abu</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[.88] tracking-[-0.08em] sm:text-8xl">The room is full of applause for one person.</h1>
        </header>
        <div className="grid gap-8 py-12 md:grid-cols-3">
          {honors.map((entry, index) => (
            <button key={entry.title} type="button" onClick={() => setHonor(index)} className={`min-h-52 rounded-[1.5rem] border-2 p-6 text-left transition ${honor === index ? 'border-[#e7b268] bg-[#e7b268]/15 shadow-[7px_7px_0_#e7b268]' : 'border-white/15 bg-white/5 hover:bg-white/10'}`}>
              <Award className="h-8 w-8 text-[#e7b268]" />
              <span className="mt-10 block font-black">Award 0{index + 1}</span>
              <span className="mt-2 block text-sm text-[#c8c0cb]">{entry.title}</span>
            </button>
          ))}
        </div>
        <section className="rounded-[2rem] bg-[#fff3d8] p-8 text-[#1f1c2e] shadow-[13px_13px_0_rgba(231,178,104,.25)] sm:p-14">
          <Star className="h-10 w-10 fill-[#b45c58] text-[#b45c58]" />
          <p className="mt-16 text-[10px] font-black uppercase tracking-[0.25em] text-[#b45c58]">And the award goes to</p>
          <h2 className="mt-5 max-w-3xl text-5xl font-black leading-[.92] tracking-[-0.07em] sm:text-7xl">{item.title}</h2>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-[#6d6070]">{item.note}</p>
          <p className="mt-14 flex items-center gap-2 border-t border-[#1f1c2e]/15 pt-5 text-sm font-black text-[#b45c58]"><Heart className="h-4 w-4 fill-current" /> Abu’s standing ovation for Samjhana.</p>
        </section>
      </div>
    </main>
  );
}
