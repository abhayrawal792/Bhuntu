import React, { useState } from 'react';
import { Clock3, Heart, Phone } from 'lucide-react';
const moments = [
  { title: 'When Nepalgunj wakes', note: 'Abu starts the day hoping Samjhana’s morning in Sakai contains one small reason to smile.' },
  { title: 'When the call arrives', note: 'Two clocks become one room for a while, and every ordinary update feels worth staying awake for.' },
  { title: 'When tomorrow is shared', note: 'The best time on Abu’s clock is the future hour when Sanu is beside him on the road.' },
];
export default function LoveClockPage() {
  const [moment, setMoment] = useState(0);
  const item = moments[moment];
  return (
    <main className="min-h-dvh bg-[#e9e4f0] px-5 py-12 text-[#332e43] sm:px-10 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="border-b-2 border-[#332e43]/20 pb-9">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#92627f]">A two-city time desk · Abu for Samjhana</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[.88] tracking-[-0.08em] sm:text-8xl">The clock is only useful when it tells us when we can feel close.</h1>
        </header>
        <div className="grid gap-10 py-12 lg:grid-cols-[.72fr_1.28fr]">
          <nav className="space-y-3" aria-label="Shared moments">
            {moments.map((entry, index) => <button key={entry.title} type="button" onClick={() => setMoment(index)} className={`w-full rounded-xl border p-5 text-left transition ${moment === index ? 'border-[#b15e68] bg-white shadow-[6px_6px_0_#b15e68]' : 'border-[#332e43]/15 bg-white/45 hover:bg-white'}`}><span className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-[#b15e68]" /><span className="font-black">Moment 0{index + 1}</span></span><span className="mt-2 block text-sm text-[#786d82]">{entry.title}</span></button>)}
          </nav>
          <section className="min-h-[30rem] rounded-[2rem] bg-[#fffdf6] p-8 shadow-[13px_13px_0_rgba(51,46,67,.13)] sm:p-14">
            <Phone className="h-10 w-10 text-[#b15e68]" />
            <p className="mt-16 text-[10px] font-black uppercase tracking-[0.25em] text-[#b15e68]">{item.title}</p>
            <h2 className="mt-5 max-w-2xl text-5xl font-black leading-[.92] tracking-[-0.07em] sm:text-7xl">{item.note}</h2>
            <p className="mt-14 flex items-center gap-2 border-t border-[#332e43]/15 pt-5 text-sm font-black text-[#b15e68]"><Heart className="h-4 w-4 fill-current" /> Abu keeps time for Samjhana.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
