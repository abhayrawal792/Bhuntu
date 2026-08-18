import { Compass, Gift, MapPin, Sparkles, Star, Trophy } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { ROOM_SEQUENCE } from '../data/roomSequence';
import { getIndependentBlueprint } from '../data/independentPageBlueprints';
import { useAppStore } from '../store/useAppStore';

const MILESTONES = [
  { index: 9, label: 'The first archive', icon: Star, copy: 'Abu has started collecting the little things he never wants to lose.' },
  { index: 49, label: 'Across the distance', icon: MapPin, copy: 'Nepalgunj and Sakai are now part of the same birthday map.' },
  { index: 99, label: 'A hundred soft reasons', icon: Sparkles, copy: 'Every name—Sanzu, Bhoot, Bhuntu, Sanu, Babe, Runchi—is another doorway.' },
  { index: 199, label: 'The future shelf', icon: Compass, copy: 'Bardiya, Pokhara, Manang, Mustang, and the light-blue scooter are waiting in the plans.' },
  { index: ROOM_SEQUENCE.length - 1, label: 'The final room key', icon: Trophy, copy: 'The last room is not an ending. It is the keepsake Abu wants you to keep.' },
];

export default function JourneyPulse() {
  const { pathname } = useLocation();
  const { currentRoomIndex, maxUnlockedIndex } = useAppStore();
  if (pathname === '/' || pathname === '/home') return null;

  const routeIndex = ROOM_SEQUENCE.indexOf(pathname);
  const index = routeIndex >= 0 ? routeIndex : currentRoomIndex;
  const blueprint = getIndependentBlueprint(pathname);
  const next = MILESTONES.find((milestone) => milestone.index > maxUnlockedIndex);
  const nearest = [...MILESTONES].reverse().find((milestone) => milestone.index <= maxUnlockedIndex);
  const Icon = nearest?.icon || Gift;
  const progress = Math.min(100, ((maxUnlockedIndex + 1) / ROOM_SEQUENCE.length) * 100);

  return (
    <section className="relative z-20 border-b border-black/10 bg-white/75 px-4 py-3 backdrop-blur-xl" aria-label="Abu's birthday journey progress">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[#2f1726] text-white shadow-sm"><Icon className="h-4 w-4" /></div>
          <div className="min-w-0">
            <p className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-[#7c5364]">{nearest?.label || 'Abu’s birthday trail'}</p>
            <p className="truncate text-xs font-semibold text-[#402533]">{nearest?.copy || `Now opening ${blueprint.title}`}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:min-w-[19rem] sm:justify-end">
          <div className="hidden min-w-0 flex-1 sm:block"><div className="h-1.5 overflow-hidden rounded-full bg-black/10"><div className="h-full rounded-full bg-[var(--room-accent,#d66b95)] transition-all duration-700" style={{ width: `${progress}%` }} /></div></div>
          <p className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.16em] text-[#7c5364]">Room {index + 1} / {ROOM_SEQUENCE.length}</p>
          {next && <p className="hidden whitespace-nowrap text-[10px] font-bold text-[#9a6b7c] md:block">Next keepsake at {next.index + 1}</p>}
        </div>
      </div>
    </section>
  );
}
