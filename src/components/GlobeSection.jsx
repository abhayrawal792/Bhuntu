import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Globe, Heart, MapPin, Calendar, Clock, Plane } from 'lucide-react';
import Globe3D from '../3d/Globe3D';
import WebGLErrorBoundary from '../components/WebGLErrorBoundary';
import { birthdayData } from '../data/birthdayData';

export default function GlobeSection() {
  const [daysTogether, setDaysTogether] = useState(0);

  useEffect(() => {
    const startDate = new Date(birthdayData.relationshipStartDate);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysTogether(diffDays);
  }, []);

  return (
    <section id="distance" className="py-24 px-4 bg-gradient-to-b from-[#071329] via-[#0F274A] to-[#050D1C] text-sky-100 relative overflow-hidden min-h-dvh">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Interactive 3D Connection Globe</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-nepali text-white mb-2">
            Hamro Prem Ko Duri Ra Saath 🌐
          </h2>
          <p className="text-sky-300 font-script text-2xl sm:text-3xl">
            Nepalgunj ✈️ Sakai (Osaka, Japan) — Abu & Bhuntu...
          </p>
        </div>


        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
          <div className="glass-card rounded-2xl p-5 border border-pink-200 text-left flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-rose-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
              🇳🇵
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 font-ui">Your Location</span>
              <h4 className="text-lg font-bold font-nepali text-gray-900">{birthdayData.partner.locationName}</h4>
              <p className="text-xs text-gray-600 font-ui">{birthdayData.partner.address}</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-pink-200 text-left flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-pink-100 text-rose-600 flex items-center justify-center flex-shrink-0 font-bold text-lg">
              🇯🇵
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 font-ui">Her Location (Bebo)</span>
              <h4 className="text-lg font-bold font-nepali text-gray-900">{birthdayData.herLocation.locationName}</h4>
              <p className="text-xs text-gray-600 font-ui">{birthdayData.herLocation.address}</p>
            </div>
          </div>
        </div>

        {/* Ultra-smooth Animated Earth Connection Card */}
        <div className="w-full py-8 sm:py-12 relative mb-8 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950 text-white shadow-2xl border border-pink-500/30">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 px-6">
            {/* Nepalgunj Node */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-bounce">
                🇳🇵
              </div>
              <span className="font-extrabold text-sm mt-2 text-rose-300">Nepalgunj, Nepal</span>
              <span className="text-[11px] text-gray-400 font-mono">28.0500° N, 81.6167° E</span>
            </div>

            {/* Pulsing Flight Line */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2 text-pink-400 font-bold text-xs">
                <span>✈️</span>
                <span className="tracking-widest uppercase text-[11px]">Connected By Infinite Love</span>
                <span>✨</span>
              </div>
              <div className="w-36 sm:w-48 h-1 bg-gradient-to-r from-rose-500 via-pink-400 to-indigo-400 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-white/80 w-1/3 animate-ping" />
              </div>
            </div>

            {/* Osaka Node */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(129,140,248,0.4)] animate-bounce" style={{ animationDelay: '0.5s' }}>
                🇯🇵
              </div>
              <span className="font-extrabold text-sm mt-2 text-indigo-300">Osaka, Japan</span>
              <span className="text-[11px] text-gray-400 font-mono">34.6937° N, 135.5023° E</span>
            </div>
          </div>
        </div>

        {/* Relationship Days Together Counter */}
        <div className="max-w-md mx-auto">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-pink-300 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md animate-pulse">
              <Heart className="w-6 h-6 fill-white" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-rose-500 font-ui">
              {birthdayData.nepaliAnniversaryBadge}
            </span>

            <div className="text-4xl sm:text-5xl font-extrabold text-gray-900 font-ui my-2">
              {daysTogether} <span className="text-rose-500 font-script text-3xl">Days</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 font-nepali">
              "Counting every single day of our beautiful love journey together..."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
