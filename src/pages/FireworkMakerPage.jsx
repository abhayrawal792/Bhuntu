import React, { useState } from 'react';
import { Gift, Heart, Check, Calendar } from 'lucide-react';

const wishes = [
  ['A gentler year', 'Abu wishes every hard day gives way to a softer morning for Samjhana.'],
  ['A nearer distance', 'Abu wishes the road from Nepalgunj to Sakai becomes a road you can travel together.'],
  ['A kept promise', 'Abu wishes every plan for Bardiya, Pokhara, Manang, and Mustang finds its day.'],
];

export default function BirthdayWishWallPage() {
  const [opened, setOpened] = useState([]);
  return (
    <main className="min-h-dvh bg-[#fff7ed] px-5 py-16 text-[#43221f]">
      <div className="mx-auto max-w-5xl">
        <Gift className="h-12 w-12 text-rose-600" />
        <p className="mt-5 text-xs font-black uppercase tracking-[.3em] text-rose-600">A birthday wish wall from Abu</p>
        <h1 className="mt-4 text-6xl font-black">Three wishes, written only for Bhuntu.</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8">This little room is not asking Samjhana to win anything. It is simply holding the things Abu hopes her next year gives her.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {wishes.map(([title, copy], index) => (
            <button key={title} onClick={() => !opened.includes(title) && setOpened([...opened, title])} className={"min-h-72 rounded-[2rem] border-2 p-7 text-left transition " + (opened.includes(title) ? 'border-rose-600 bg-rose-100' : 'border-rose-200 bg-white hover:-translate-y-1')}>
              <Calendar className="h-7 w-7 text-rose-600" />
              <p className="mt-6 font-mono text-xs text-rose-600">WISH 0{index + 1}</p>
              <h2 className="mt-3 text-3xl font-black">{title}</h2>
              {opened.includes(title) ? <><p className="mt-4 leading-7">{copy}</p><Check className="mt-5 text-emerald-600" /></> : <p className="mt-4 font-bold text-rose-500">Open Abu’s note</p>}
            </button>
          ))}
        </div>
        {opened.length === wishes.length && <p className="mt-9 flex items-center gap-3 text-xl font-bold"><Heart className="fill-rose-500 text-rose-500" />Happy birthday, Sanu. Abu’s wishes are all for you.</p>}
      </div>
    </main>
  );
}
