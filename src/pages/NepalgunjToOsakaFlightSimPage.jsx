import React, { useState } from 'react';
import { MapPinned, Route, Heart, Check } from 'lucide-react';

const mileposts = [
  ['Dhamboji', 'Abu starts here, carrying every ordinary detail that reminds him of Samjhana.'],
  ['The call line', 'The distance becomes a voice, a laugh, and one more “Huss” from Sakai.'],
  ['Together', 'The real destination is not a city. It is the day the miles stop deciding the schedule.'],
];

export default function NepalgunjToOsakaFlightSimPage() {
  const [milepost, setMilepost] = useState(0);
  return (
    <main className="min-h-dvh bg-[#f3f0e8] px-5 py-16 text-[#263746]">
      <div className="mx-auto max-w-5xl">
        <Route className="h-12 w-12 text-teal-700" />
        <p className="mt-6 text-xs font-black uppercase tracking-[.3em] text-teal-700">A distance letter from one side of the map to the other</p>
        <h1 className="mt-4 text-6xl font-black">Three mileposts between Abu and Samjhana.</h1>
        <div className="mt-12 rounded-[2rem] border border-teal-100 bg-white p-8 shadow-xl">
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold"><MapPinned className="h-5 w-5 text-teal-700" /> Nepalgunj <span className="text-teal-400">→</span> Sakai <span className="text-teal-400">→</span> us</div>
          <div className="mt-10 grid gap-3 md:grid-cols-3">{mileposts.map(([title], index) => <button key={title} onClick={() => setMilepost(index)} className={"rounded-2xl p-5 text-left " + (milepost === index ? 'bg-teal-700 text-white' : 'bg-teal-50')}><span className="font-mono text-xs">MILEPOST 0{index + 1}</span><b className="mt-12 block text-2xl">{title}</b></button>)}</div>
          <article className="mt-8 rounded-[2rem] bg-[#e3f5f0] p-8"><p className="text-3xl font-black leading-tight">{mileposts[milepost][1]}</p>{milepost === mileposts.length - 1 && <p className="mt-6 flex items-center gap-2 font-bold text-teal-800"><Check /> Abu’s favorite distance is the one he gets to close.</p>}</article>
          <button onClick={() => setMilepost((milepost + 1) % mileposts.length)} className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal-700 px-5 py-3 font-bold text-white"><Heart className="h-4 w-4 fill-pink-300 text-pink-300" /> Read the next milepost</button>
        </div>
      </div>
    </main>
  );
}
