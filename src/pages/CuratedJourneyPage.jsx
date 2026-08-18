import React, { useState } from 'react';
import { ArrowUpRight, Compass, MapPin, MoveRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const chapters = [
  { number: '01', title: 'The first little spark', note: 'A chapter for the moments that were small at the time and enormous in hindsight.', route: '/story', tone: 'bg-[#f8d9b8]' },
  { number: '02', title: 'The places we made ours', note: 'Not a map of destinations. A map of the corners that started to feel like home.', route: '/gallery', tone: 'bg-[#b8d4d6]' },
  { number: '03', title: 'The things you make brighter', note: 'A quiet collection of your habits, your kindness, and your impossible timing.', route: '/why-i-love-you', tone: 'bg-[#d8c4e8]' },
  { number: '04', title: 'The door still opening', note: 'A future-facing room for everything that has not happened yet.', route: '/future-house-builder', tone: 'bg-[#f5e5a8]' },
];

export default function CuratedJourneyPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const chapter = chapters[selected];

  return (
    <main className="min-h-dvh bg-[#15141b] text-[#f9f3e8]">
      <section className="mx-auto grid min-h-dvh w-full max-w-[1500px] gap-10 px-5 py-8 sm:px-10 lg:grid-cols-[180px_1fr_420px] lg:gap-16 lg:px-16 lg:py-14">
        <aside className="flex flex-row items-start justify-between lg:flex-col lg:justify-start">
          <div><div className="grid h-12 w-12 place-items-center rounded-full border border-[#d7b779]/60 text-[#d7b779]"><Compass className="h-5 w-5" /></div><p className="mt-4 max-w-[9rem] text-[10px] font-bold uppercase tracking-[0.28em] text-[#d7b779]">A curated birthday journey</p></div>
          <div className="hidden lg:block"><p className="text-xs uppercase tracking-[0.2em] text-white/35">Route two</p><p className="mt-3 max-w-[8rem] text-sm leading-6 text-white/55">A slower way to move through the good stuff.</p></div>
        </aside>

        <div className="flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d7b779]">Not a homepage. A hand-drawn itinerary.</p>
          <h1 className="mt-6 max-w-4xl text-6xl font-black leading-[.9] tracking-[-0.075em] text-[#fffaf0] sm:text-8xl">Take the scenic route.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl">Four chapters. Four different temperatures of love. Follow the line, stop wherever a memory feels warm, and leave the map whenever you want.</p>
          <div className="mt-12 space-y-3">
            {chapters.map((item, index) => (
              <button key={item.number} type="button" onClick={() => setSelected(index)} className={`group grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-t border-white/10 py-5 text-left transition ${index === selected ? 'text-[#fffaf0]' : 'text-white/45 hover:text-white/80'}`}>
                <span className="font-mono text-xs text-[#d7b779]">{item.number}</span>
                <span className="text-xl font-bold tracking-[-0.03em] sm:text-2xl">{item.title}</span>
                <MoveRight className={`h-5 w-5 transition ${index === selected ? 'translate-x-1 text-[#d7b779]' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3"><button type="button" onClick={() => navigate(chapter.route)} className="inline-flex items-center gap-3 rounded-full bg-[#f6e9cf] px-5 py-3 text-sm font-bold text-[#20171a] transition hover:bg-white active:scale-[.98]">Enter {chapter.title} <ArrowUpRight className="h-4 w-4" /></button><button type="button" onClick={() => navigate('/')} className="rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/65 transition hover:border-white/35 hover:text-white">Back to the doorway</button></div>
        </div>

        <div className="flex items-center">
          <div className={`relative min-h-[31rem] w-full overflow-hidden rounded-[2rem] p-7 text-[#21181c] transition-colors duration-500 sm:p-9 ${chapter.tone}`}>
            <div className="flex items-center justify-between"><span className="rounded-full bg-black/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">Selected chapter</span><Star className="h-5 w-5 fill-current opacity-60" /></div>
            <div className="absolute left-8 top-24 h-40 w-px bg-black/15" />
            <div className="absolute left-[1.6rem] top-[13.5rem] h-3 w-3 rounded-full bg-[#21181c] ring-8 ring-black/10" />
            <div className="absolute bottom-9 left-7 right-7 sm:left-9 sm:right-9"><p className="text-7xl font-black tracking-[-0.09em] opacity-20">{chapter.number}</p><h2 className="mt-3 max-w-xs text-4xl font-black leading-[.94] tracking-[-0.06em]">{chapter.title}</h2><p className="mt-5 max-w-sm text-base leading-7 text-black/65">{chapter.note}</p><div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-black/55"><MapPin className="h-4 w-4" /> Page by page, not game by game</div></div>
          </div>
        </div>
      </section>
    </main>
  );
}
