import React, { useState } from 'react';
import { Award, Crown, Heart, Star } from 'lucide-react';

const awards = [
  { title: 'Most likely to brighten Abu’s day', winner: 'Samjhana', reason: 'One message from Sanu can change the entire weather of a Nepalgunj afternoon.' },
  { title: 'Best long-distance laugh', winner: 'Sanzu', reason: 'The Sakai calls are never ordinary once her laughter arrives.' },
  { title: 'Most anticipated road companion', winner: 'Babe', reason: 'Every future plan — from Bardiya to Mustang — is better because Abu imagines her there.' },
];

export default function CoupleSuperlativesPage() {
  const [award, setAward] = useState(0);
  const item = awards[award];
  return (
    <main className="min-h-dvh bg-[#f3e7d5] px-5 py-12 text-[#3d3028] sm:px-10 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="border-b-4 border-[#3d3028] pb-9">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#b26846]">The Abu awards wall · one winner only</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[.88] tracking-[-0.08em] sm:text-8xl">Every category has the same very obvious winner.</h1>
        </header>
        <div className="grid gap-8 py-12 md:grid-cols-3">
          {awards.map((entry, index) => (
            <button key={entry.title} type="button" onClick={() => setAward(index)} className={`min-h-56 rounded-[1.5rem] border-2 p-6 text-left transition ${award === index ? 'border-[#b26846] bg-[#fffaf1] shadow-[7px_7px_0_#b26846]' : 'border-[#3d3028]/15 bg-white/40 hover:bg-white'}`}>
              <Award className="h-8 w-8 text-[#b26846]" />
              <span className="mt-10 block font-black">Category 0{index + 1}</span>
              <span className="mt-2 block text-sm text-[#756458]">{entry.title}</span>
            </button>
          ))}
        </div>
        <section className="relative rounded-[2rem] bg-[#fffaf1] p-8 shadow-[13px_13px_0_rgba(61,48,40,.13)] sm:p-14">
          <Crown className="h-10 w-10 text-[#b26846]" />
          <p className="mt-12 text-[10px] font-black uppercase tracking-[0.25em] text-[#b26846]">And the award goes to</p>
          <h2 className="mt-5 text-6xl font-black tracking-[-0.08em] sm:text-8xl">{item.winner}</h2>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-[#756458]">{item.reason}</p>
          <p className="mt-14 flex items-center gap-2 border-t border-[#3d3028]/15 pt-5 text-sm font-black text-[#b26846]"><Star className="h-4 w-4 fill-current" /> Abu’s favorite person, in every category <Heart className="ml-auto h-4 w-4 fill-current" /></p>
        </section>
      </div>
    </main>
  );
}
