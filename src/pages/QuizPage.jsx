import React, { useState } from 'react';
import { Heart, MapPin, Check, ArrowRight } from 'lucide-react';
import { ALL_MEDIA_PHOTOS, getAssetUrl } from '../utils/mediaUtils';
const prompts = [
  ['Where did Abu keep finding reasons to remember you?', 'Bageshwori, Water Park, and every ordinary road after them.'],
  ['What food became part of our private language?', 'Chau-Chau, Panipuri, momo, and the cravings that made distance feel smaller.'],
  ['What does Samjhana call Abhay?', 'Abu — the little name that turned into a home.'],
];
export default function QuizPage() {
  const [step, setStep] = useState(0); const [answered, setAnswered] = useState(false);
  const finished = step === prompts.length; const photo = getAssetUrl(ALL_MEDIA_PHOTOS[3]);
  return <main className="min-h-dvh bg-[#101827] px-5 py-16 text-white"><div className="mx-auto max-w-5xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><img src={photo} alt="Samjhana remembered by Abu" className="h-[28rem] w-full rounded-[2rem] object-contain shadow-2xl" /><section className="rounded-[2rem] border border-cyan-200/20 bg-white/10 p-8 backdrop-blur-xl">{finished ? <><Heart className="h-12 w-12 fill-pink-400 text-pink-400" /><h1 className="mt-6 text-5xl font-black">You are the answer, Sanzu.</h1><p className="mt-5 text-lg leading-8 text-cyan-100">Abu did not make a score screen. He made a small place where every answer returns to Samjhana.</p><button onClick={() => { setStep(0); setAnswered(false); }} className="mt-8 rounded-full bg-pink-500 px-5 py-3 font-bold">Read the memories again</button></> : <><p className="text-xs font-black uppercase tracking-[.3em] text-cyan-300">Abu’s memory confession {step + 1} / {prompts.length}</p><h1 className="mt-5 text-4xl font-black">{prompts[step][0]}</h1>{!answered ? <button onClick={() => setAnswered(true)} className="mt-9 inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 font-black text-slate-950">I know this one <Check className="h-4 w-4" /></button> : <div className="mt-8 rounded-2xl border border-cyan-200/30 bg-cyan-100/10 p-5"><MapPin className="h-5 w-5 text-cyan-300" /><p className="mt-3 text-xl font-bold text-cyan-50">{prompts[step][1]}</p><button onClick={() => { setStep(step + 1); setAnswered(false); }} className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-500 px-5 py-3 font-bold">Next memory <ArrowRight className="h-4 w-4" /></button></div>}</>}</section></div></div></main>;
}
