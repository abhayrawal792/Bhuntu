import WorldShell from './WorldShell';
import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Stamp, MapPin, Heart } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function CouplePassport() {
  const { passenger, passportNo, seat, stamps, title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.passport;

  return (
    <WorldShell
      theme="paper"
      badge="Love Flight Pass ✈️"
      badgeIcon={<Plane className="w-3.5 h-3.5" />}
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >

      {/* Boarding Pass Ticket */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-card rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto border-2 border-blue-200 shadow-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden mb-8 text-left"
      >
        <div className="flex items-center justify-between border-b border-blue-800/80 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Plane className="w-6 h-6 text-pink-400" />
            <span className="font-mono font-bold tracking-widest text-sm text-blue-200">
              LOVE AIRWAYS VIP
            </span>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-pink-500/30 text-pink-300 border border-pink-400/40">
            BOARDING PASS
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-ui mb-6">
          <div>
            <span className="text-gray-400 block text-[11px] uppercase">Passenger</span>
            <strong className="text-white text-sm truncate block font-nepali">{passenger}</strong>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px] uppercase">Passport No</span>
            <strong className="text-pink-300 font-mono text-xs">{passportNo}</strong>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px] uppercase">Seat</span>
            <strong className="text-amber-300 font-bold">{seat}</strong>
          </div>
          <div>
            <span className="text-gray-400 block text-[11px] uppercase">Status</span>
            <strong className="text-green-400 font-bold">Confirmed 💖</strong>
          </div>
        </div>

        {/* Route Details */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-950/70 border border-blue-800/50">
          <div>
            <span className="text-[11px] text-gray-400 block font-mono">FROM</span>
            <h4 className="text-lg font-extrabold text-white font-ui">Nepalgunj 🇳🇵</h4>
            <span className="text-[11px] text-blue-300 font-ui">Dhamboji (NEP)</span>
          </div>
          <div className="flex flex-col items-center">
            <Plane className="w-6 h-6 text-rose-400 rotate-90 my-1 animate-pulse" />
            <span className="text-[11px] text-gray-400 font-mono">DIRECT LOVE</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-gray-400 block font-mono">TO</span>
            <h4 className="text-lg font-extrabold text-white font-ui">Osaka 🇯🇵</h4>
            <span className="text-[11px] text-pink-300 font-ui">Sakai City (KIX)</span>
          </div>
        </div>

        {/* Passport Stamps */}
        <div className="mt-6 pt-4 border-t border-blue-800/60">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3 font-ui">
            Entry Stamps Collected:
          </span>
          <div className="flex items-center gap-3 flex-wrap">
            {stamps.map((s, idx) => (
              <div key={idx} className="p-2.5 rounded-xl border border-dashed border-pink-400/50 bg-pink-950/40 text-[11px] font-mono text-pink-200 flex items-center gap-1.5">
                <Stamp className="w-3.5 h-3.5 text-pink-400" />
                <span>{s.name} ({s.date})</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </WorldShell>
  );
}
