import React, { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, Gift, Heart, LockKeyhole, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { nicknameFor, personalVoice } from '../data/personalVoice';

const ribbons = [
  { label: 'The name Abu kept', copy: 'You called Abhay “Abu,” and that little name became a home I carry everywhere.', color: 'from-rose-200 via-orange-100 to-amber-100' },
  { label: 'Nepalgunj to Sakai', copy: 'From Bageshwori and Panipuri to late-night calls, every mile still points back to you.', color: 'from-sky-200 via-indigo-100 to-violet-100' },
  { label: 'For my Bhuntu', copy: 'Sanzu, Bhoot, Bhuntu, Sanu, Babe, Runchi — every name is another way Abu says I love you.', color: 'from-emerald-200 via-teal-100 to-cyan-100' },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);
  const [activeRibbon, setActiveRibbon] = useState(0);
  const ribbon = ribbons[activeRibbon];
  const nickname = nicknameFor(activeRibbon);
  const progress = useMemo(() => `${((activeRibbon + 1) / ribbons.length) * 100}%`, [activeRibbon]);

  return (
    <main className="min-h-dvh overflow-hidden bg-[#fffaf6] text-[#2c1722]">
      <section className="relative isolate flex min-h-[calc(100dvh-5rem)] items-center px-5 py-14 sm:px-10 lg:px-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(251,191,36,.28),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(244,114,182,.2),transparent_28%),linear-gradient(135deg,#fffaf6_0%,#fff1eb_48%,#f4f0ff_100%)]" />
        <div className="absolute right-[-8rem] top-[-8rem] -z-10 h-72 w-72 rounded-full border border-rose-200/70 bg-white/20 blur-[1px] sm:h-96 sm:w-96" />
        <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-rose-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" /> A birthday door from Abu
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">For Samjhana, my Sanzu, my Bhuntu</p>
            <h1 className="max-w-xl text-5xl font-black leading-[.95] tracking-[-0.06em] text-[#351624] sm:text-7xl lg:text-8xl">
              Samjhana, your Abu made this for you.
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#744e5b] sm:text-xl">
              {personalVoice.statements.opening} {personalVoice.origin.detail}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => setOpened(true)} className="group inline-flex items-center gap-3 rounded-full bg-[#321526] px-6 py-4 text-sm font-bold text-white shadow-[0_16px_30px_rgba(50,21,38,.22)] transition hover:-translate-y-1 hover:bg-[#4e1d3a] active:scale-[.98]">
                <Gift className="h-5 w-5 transition group-hover:rotate-12" /> Open Abu’s first gift
              </button>
              <button type="button" onClick={() => navigate('/curated-journey')} className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white/60 px-5 py-4 text-sm font-bold text-rose-700 transition hover:bg-white active:scale-[.98]">
                Follow Abu’s trail <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-12 flex items-center gap-4 text-sm text-[#9a6b7c]">
              <div className="h-px w-16 bg-rose-200" />
              <span>Take your time, Babe. Abu made every little room with you in mind.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/65 p-5 shadow-[0_25px_80px_rgba(102,47,78,.17)] backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-rose-500">Abu’s ribbon room</p>
                  <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#351624]">Three names I love calling you.</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#351624] text-white"><LockKeyhole className="h-5 w-5" /></div>
              </div>
              <div className="mt-7 h-2 overflow-hidden rounded-full bg-rose-100"><div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-amber-300 transition-all duration-500" style={{ width: progress }} /></div>
              <div className={`mt-7 min-h-[18rem] rounded-[2rem] bg-gradient-to-br ${ribbon.color} p-7 transition-colors duration-500`}>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-[#7c4e60]"><span>0{activeRibbon + 1}</span><span>{ribbon.label} / {nickname}</span></div>
                <div className="mt-12 max-w-xs"><Heart className="h-8 w-8 fill-current text-rose-500/70" /><p className="mt-7 text-3xl font-black leading-tight tracking-[-0.04em] text-[#371a28]">{ribbon.copy}</p></div>
                <button type="button" aria-label="Next clue" onClick={() => setActiveRibbon((value) => (value + 1) % ribbons.length)} className="mt-9 inline-flex items-center gap-2 rounded-full bg-white/65 px-4 py-2 text-xs font-bold text-[#6b4051] shadow-sm transition hover:bg-white active:scale-[.98]">Turn the ribbon <ArrowDown className="h-4 w-4" /></button>
              </div>
              <p className="mt-5 text-center text-xs leading-5 text-[#9a6b7c]">No score. No timer. Just Abu remembering his Sanzu one name at a time.</p>
            </div>
            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-bold text-amber-800 shadow-lg sm:block">A gift from Abu should feel like a secret.</div>
            <div className="absolute -right-5 -top-5 hidden rotate-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-xs font-bold text-sky-800 shadow-lg sm:block">Made for Samjhana, my Bhuntu.</div>
          </div>
        </div>
        <a href="#next" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-rose-400 transition hover:text-rose-700" aria-label="Scroll to the next section"><ArrowDown className="h-5 w-5 animate-bounce" /></a>
      </section>

      <section id="next" className="border-t border-rose-100 bg-white px-5 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-rose-500">A promise from Abu</p><h2 className="mt-4 text-4xl font-black tracking-[-0.05em] text-[#351624] sm:text-5xl">Every room changes the feeling because every name I call you holds a different memory.</h2></div>
          <div className="flex flex-wrap gap-3 text-sm text-[#744e5b]"><span className="rounded-full bg-rose-50 px-4 py-3">Bageshwori memories</span><span className="rounded-full bg-violet-50 px-4 py-3">Nepalgunj ↔ Sakai love</span><span className="rounded-full bg-amber-50 px-4 py-3">names only Abu gets to use</span></div>
        </div>
      </section>

      {opened && <div className="fixed inset-0 z-50 grid place-items-center bg-[#24121f]/55 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="First gift opened">
        <div className="relative w-full max-w-md rounded-[2rem] bg-[#fffaf6] p-8 text-center shadow-2xl"><button type="button" onClick={() => setOpened(false)} className="absolute right-5 top-5 text-sm font-bold text-[#9a6b7c]">Close</button><div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-rose-100 text-rose-600"><Gift className="h-8 w-8" /></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-rose-500">Abu’s first gift unlocked</p><h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#351624]">Sanzu, you are Abu’s best surprise.</h2><p className="mt-4 leading-7 text-[#744e5b]">From Nepalgunj to Sakai, the rest of the trail is waiting: a small birthday world for my Bhuntu, my Bhoot, my Sanu, my Babe, my Runchi, and my forever person.</p><button type="button" onClick={() => navigate('/curated-journey')} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#351624] px-5 py-3 text-sm font-bold text-white">Continue <ArrowRight className="h-4 w-4" /></button></div>
      </div>}
    </main>
  );
}
