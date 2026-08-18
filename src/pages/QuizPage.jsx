import React, { useState } from 'react';
import { Check, Heart, Lock, RotateCcw } from 'lucide-react';

const questions = [
  { prompt: 'What is the best kind of birthday surprise?', options: ['A perfect plan', 'A tiny detail remembered', 'A room full of balloons', 'A dramatic entrance'], answer: 1 },
  { prompt: 'What should a beautiful memory feel like?', options: ['Polished', 'Quietly alive', 'Very loud', 'Impossible to repeat'], answer: 1 },
  { prompt: 'What is the secret ingredient in a good gift?', options: ['Price', 'Timing', 'Attention', 'Wrapping paper'], answer: 2 },
  { prompt: 'Who is this entire birthday trail for?', options: ['Someone extraordinary', 'A mysterious guest', 'The birthday star', 'All of the above'], answer: 3 },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const finished = step >= questions.length;
  const question = questions[step];
  const choose = (index) => { if (selected !== null) return; setSelected(index); if (index === question.answer) setScore((value) => value + 1); };
  const next = () => { setSelected(null); setStep((value) => value + 1); };
  const reset = () => { setStep(0); setSelected(null); setScore(0); };

  return (
    <main className="min-h-dvh bg-[#10131d] px-5 py-10 text-white sm:px-10 lg:px-20">
      <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-6xl gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-center">
        <aside><div className="mb-10 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300"><Lock className="h-4 w-4" /> The only game in the house</div><p className="text-sm font-bold uppercase tracking-[0.25em] text-white/40">Page 004 / one-time play</p><h1 className="mt-5 max-w-sm text-6xl font-black leading-[.9] tracking-[-0.07em] sm:text-8xl">A tiny test of excellent taste.</h1><p className="mt-7 max-w-sm text-lg leading-8 text-white/55">Four questions. No leaderboard. No second version hiding behind another route. Just one playful moment before the quieter gifts begin.</p></aside>
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[.06] p-6 shadow-2xl backdrop-blur sm:p-10">
          <div className="absolute right-[-3rem] top-[-3rem] h-40 w-40 rounded-full bg-cyan-300/15 blur-3xl" />
          {!finished ? <>
            <div className="relative flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-white/45"><span>Question {String(step + 1).padStart(2, '0')} / {questions.length}</span><span>{score} correct</span></div>
            <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
            <h2 className="relative mt-14 max-w-xl text-4xl font-black leading-tight tracking-[-0.05em] sm:text-5xl">{question.prompt}</h2>
            <div className="relative mt-9 grid gap-3 sm:grid-cols-2">{question.options.map((option, index) => { const isCorrect = selected !== null && index === question.answer; const isWrong = selected === index && !isCorrect; return <button key={option} type="button" onClick={() => choose(index)} className={`flex min-h-16 items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm font-bold transition active:scale-[.98] ${isCorrect ? 'border-emerald-300 bg-emerald-300/15 text-emerald-100' : isWrong ? 'border-rose-300 bg-rose-300/15 text-rose-100' : 'border-white/10 bg-white/[.04] text-white/75 hover:border-cyan-300/60 hover:bg-cyan-300/10'}`}><span>{option}</span>{isCorrect && <Check className="h-5 w-5" />}</button>; })}</div>
            {selected !== null && <div className="relative mt-8 flex items-center justify-between rounded-2xl bg-white/[.06] p-4"><p className="text-sm text-white/65">{selected === question.answer ? 'Exactly. Your instincts are impeccable.' : 'A charming answer. The gift still approves.'}</p><button type="button" onClick={next} className="rounded-full bg-cyan-300 px-4 py-2 text-xs font-black text-[#10131d]">{step === questions.length - 1 ? 'See result' : 'Next'}</button></div>}
          </> : <div className="relative py-10 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-rose-300/15 text-rose-200"><Heart className="h-9 w-9 fill-current" /></div><p className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">The one game is complete</p><h2 className="mt-4 text-5xl font-black tracking-[-0.06em]">{score >= 3 ? 'Certified gift connoisseur.' : 'Officially impossible to disappoint.'}</h2><p className="mx-auto mt-5 max-w-md text-lg leading-8 text-white/55">Your final score is {score} / {questions.length}. The important answer was correct before the game began: this page was made just for you.</p><button type="button" onClick={reset} className="mt-9 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-bold text-white/75 transition hover:border-white/35 hover:text-white"><RotateCcw className="h-4 w-4" /> Play the one game again</button></div>}
        </section>
      </div>
    </main>
  );
}
