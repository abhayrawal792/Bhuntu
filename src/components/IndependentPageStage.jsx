import React from 'react';
import { useLocation } from 'react-router-dom';
import { ROOM_SEQUENCE } from '../data/roomSequence';
import { getIndependentBlueprint } from '../data/independentPageBlueprints';

const STAGES = [
  { name: 'paper-letter', shell: 'bg-[#f5efe6] text-[#34261f]', decoration: 'bg-[radial-gradient(circle_at_12%_18%,rgba(178,111,72,.22),transparent_26%),linear-gradient(110deg,#f5efe6,#fffaf2_48%,#eadbcd)]', rail: 'border-[#b77d5f] bg-[#fffaf2]/55', content: 'font-ui' },
  { name: 'ink-noir', shell: 'bg-[#11141a] text-[#f7efe4]', decoration: 'bg-[radial-gradient(circle_at_80%_10%,rgba(246,183,93,.2),transparent_25%),linear-gradient(135deg,#11141a,#252832 55%,#090a0e)]', rail: 'border-[#d6a45a]/35 bg-black/20', content: 'font-ui' },
  { name: 'sakura-air', shell: 'bg-[#fff7fb] text-[#3b2332]', decoration: 'bg-[radial-gradient(circle_at_20%_18%,rgba(244,114,182,.22),transparent_22%),radial-gradient(circle_at_86%_70%,rgba(251,191,36,.18),transparent_28%),#fff7fb', rail: 'border-pink-200 bg-white/50', content: 'font-ui' },
  { name: 'blue-hour', shell: 'bg-[#0d1b2a] text-[#e5f3ff]', decoration: 'bg-[linear-gradient(120deg,#0d1b2a,#1b3a57 48%,#102a43)]', rail: 'border-sky-300/25 bg-sky-950/30', content: 'font-ui' },
  { name: 'film-negative', shell: 'bg-[#191919] text-[#f6e8c9]', decoration: 'bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.035)_0_2px,transparent_2px_18px),linear-gradient(135deg,#191919,#3b3025)]', rail: 'border-amber-200/25 bg-stone-950/35', content: 'font-ui' },
  { name: 'mint-desk', shell: 'bg-[#eaf7f0] text-[#15372c]', decoration: 'bg-[radial-gradient(circle_at_75%_20%,rgba(16,185,129,.18),transparent_25%),linear-gradient(145deg,#eaf7f0,#d7efe6)]', rail: 'border-emerald-300 bg-white/45', content: 'font-ui' },
  { name: 'terracotta', shell: 'bg-[#4a2119] text-[#fff1e7]', decoration: 'bg-[radial-gradient(circle_at_16%_80%,rgba(251,146,60,.22),transparent_24%),linear-gradient(135deg,#4a2119,#783d2e 54%,#2a1210)]', rail: 'border-orange-200/25 bg-black/15', content: 'font-ui' },
  { name: 'lavender-diary', shell: 'bg-[#eee9ff] text-[#2c2250]', decoration: 'bg-[radial-gradient(circle_at_84%_14%,rgba(139,92,246,.22),transparent_24%),linear-gradient(150deg,#eee9ff,#fce7f3)]', rail: 'border-violet-200 bg-white/55', content: 'font-ui' },
  { name: 'museum-cream', shell: 'bg-[#efe9dc] text-[#2e2a24]', decoration: 'bg-[linear-gradient(90deg,rgba(119,85,47,.06)_1px,transparent_1px),linear-gradient(#efe9dc,#f9f5ec)] bg-[size:24px_24px]', rail: 'border-[#9a7b4f]/35 bg-[#fffdf7]/60', content: 'font-ui' },
  { name: 'neon-cassette', shell: 'bg-[#080b16] text-[#e8faff]', decoration: 'bg-[radial-gradient(circle_at_30%_15%,rgba(34,211,238,.22),transparent_22%),radial-gradient(circle_at_80%_80%,rgba(244,63,94,.18),transparent_25%),#080b16', rail: 'border-cyan-300/25 bg-cyan-950/20', content: 'font-ui' },
  { name: 'sunlit-postcard', shell: 'bg-[#fff5d6] text-[#4b2b17]', decoration: 'bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,.3),transparent_30%),linear-gradient(150deg,#fff5d6,#fed7aa)]', rail: 'border-orange-300/55 bg-white/50', content: 'font-ui' },
  { name: 'everest-night', shell: 'bg-[#0c2033] text-[#e8f6ff]', decoration: 'bg-[radial-gradient(circle_at_50%_8%,rgba(186,230,253,.24),transparent_20%),linear-gradient(160deg,#0c2033,#123c56 52%,#07131f)]', rail: 'border-sky-200/30 bg-sky-950/25', content: 'font-ui' },
  { name: 'rose-theatre', shell: 'bg-[#2a0e1c] text-[#fff0f5]', decoration: 'bg-[radial-gradient(ellipse_at_top,rgba(244,114,182,.25),transparent_35%),linear-gradient(180deg,#2a0e1c,#120812)]', rail: 'border-rose-200/25 bg-black/20', content: 'font-ui' },
  { name: 'post-it-wall', shell: 'bg-[#f4f1d5] text-[#27312a]', decoration: 'bg-[linear-gradient(135deg,rgba(255,255,255,.45)_25%,transparent_25%),linear-gradient(315deg,rgba(255,255,255,.35)_25%,transparent_25%),#f4f1d5] bg-[size:38px_38px]', rail: 'border-lime-300/60 bg-white/45', content: 'font-ui' },
  { name: 'sea-glass', shell: 'bg-[#dff8f4] text-[#123b42]', decoration: 'bg-[radial-gradient(circle_at_14%_60%,rgba(45,212,191,.2),transparent_25%),linear-gradient(140deg,#dff8f4,#dbeafe)]', rail: 'border-teal-300/50 bg-white/45', content: 'font-ui' },
  { name: 'candle-archive', shell: 'bg-[#251a14] text-[#fff3dc]', decoration: 'bg-[radial-gradient(circle_at_50%_22%,rgba(251,191,36,.28),transparent_20%),linear-gradient(120deg,#251a14,#4a2c20)', rail: 'border-amber-200/30 bg-black/20', content: 'font-ui' },
  { name: 'garden-botanical', shell: 'bg-[#e8f4df] text-[#20341e]', decoration: 'bg-[radial-gradient(circle_at_20%_20%,rgba(74,222,128,.2),transparent_22%),linear-gradient(135deg,#e8f4df,#fce7f3)', rail: 'border-green-300/60 bg-white/45', content: 'font-ui' },
  { name: 'train-window', shell: 'bg-[#dbeafe] text-[#14213d]', decoration: 'bg-[linear-gradient(90deg,rgba(255,255,255,.8)_0_3%,transparent_3%_18%,rgba(255,255,255,.6)_18%_21%,transparent_21%_100%),linear-gradient(145deg,#dbeafe,#bfdbfe)]', rail: 'border-blue-300/55 bg-white/50', content: 'font-ui' },
  { name: 'red-envelope', shell: 'bg-[#5c1111] text-[#fff7ed]', decoration: 'bg-[radial-gradient(circle_at_85%_12%,rgba(251,191,36,.22),transparent_22%),linear-gradient(135deg,#5c1111,#8b1e1e 52%,#330707)]', rail: 'border-amber-200/30 bg-black/15', content: 'font-ui' },
  { name: 'cloud-paper', shell: 'bg-[#f0f9ff] text-[#1e3a5f]', decoration: 'bg-[radial-gradient(ellipse_at_20%_20%,white,transparent_28%),radial-gradient(ellipse_at_80%_70%,rgba(125,211,252,.3),transparent_30%),#f0f9ff', rail: 'border-sky-200 bg-white/55', content: 'font-ui' },
  { name: 'vinyl-blue', shell: 'bg-[#101828] text-[#ecfeff]', decoration: 'bg-[repeating-radial-gradient(circle_at_20%_20%,rgba(125,211,252,.08)_0_2px,transparent_2px_8px),linear-gradient(135deg,#101828,#1e3a5f)]', rail: 'border-cyan-200/25 bg-black/20', content: 'font-ui' },
  { name: 'future-scooter', shell: 'bg-[#d9f99d] text-[#1a2e05]', decoration: 'bg-[radial-gradient(circle_at_82%_18%,rgba(132,204,22,.22),transparent_22%),linear-gradient(140deg,#d9f99d,#ccfbf1)]', rail: 'border-lime-400/60 bg-white/45', content: 'font-ui' },
  { name: 'quiet-sunrise', shell: 'bg-[#fff1f2] text-[#4c1d1d]', decoration: 'bg-[radial-gradient(circle_at_50%_100%,rgba(251,146,60,.28),transparent_35%),linear-gradient(180deg,#fff1f2,#fed7aa)]', rail: 'border-rose-200 bg-white/50', content: 'font-ui' },
  { name: 'final-gallery', shell: 'bg-[#17151c] text-[#fff7ed]', decoration: 'bg-[radial-gradient(circle_at_50%_40%,rgba(244,114,182,.2),transparent_25%),linear-gradient(135deg,#17151c,#31243a)', rail: 'border-pink-200/25 bg-black/20', content: 'font-ui' },
];

const hash = (value) => [...value].reduce((sum, char) => (sum * 33 + char.charCodeAt(0)) >>> 0, 7);

export default function IndependentPageStage({ children }) {
  const { pathname } = useLocation();
  const sequenceIndex = ROOM_SEQUENCE.indexOf(pathname);
  const stage = STAGES[(sequenceIndex >= 0 ? sequenceIndex : hash(pathname)) % STAGES.length];
  const blueprint = getIndependentBlueprint(pathname);
  return (
    <div data-independent-stage={stage.name} data-page-identity={blueprint.identity} className={`relative isolate overflow-hidden ${stage.shell}`} style={{ '--room-accent': blueprint.visual[1] }}>
      <div className={`pointer-events-none absolute inset-0 ${stage.decoration}`} aria-hidden="true" />
      <div className={`pointer-events-none absolute inset-y-0 left-0 w-2 border-r ${stage.rail}`} aria-hidden="true" />
      <div className="pointer-events-none absolute right-5 top-5 h-20 w-20 rounded-full border border-current/10" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-6 left-8 h-2 w-24 rounded-full bg-current/10" aria-hidden="true" />
      <div className="pointer-events-none absolute left-8 top-5 max-w-[min(70vw,28rem)] text-[9px] font-black uppercase tracking-[0.24em] text-current/45" aria-hidden="true">{String(blueprint.order).padStart(3, '0')} · {blueprint.composition} · {blueprint.photoTreatment}</div>
      <div className="relative z-10">{children}</div>
      <div className="pointer-events-none absolute bottom-5 right-8 max-w-[min(65vw,24rem)] text-right text-[9px] font-black uppercase tracking-[0.2em] text-current/40" aria-hidden="true">{blueprint.ritual} · {blueprint.giftForm}</div>
    </div>
  );
}
