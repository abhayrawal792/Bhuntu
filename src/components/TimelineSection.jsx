import React from 'react';
import { Heart, Calendar, Sparkles, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24 px-4 bg-[#FAF8F8] relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-nepali text-gray-900 mb-2">
            Hamro Maya Ko Yatra
          </h2>
          <p className="text-gray-600 font-script text-2xl sm:text-3xl text-pink-500">
            Every moment with you is a cherished memory...
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-pink-300 ml-4 sm:ml-32 space-y-12">
          {birthdayData.timeline.map((item, index) => (
            <div key={item.id} className="relative pl-8 group">
              {/* Pulsing Node */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 p-0.5 shadow-md flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                </div>
              </div>

              {/* Date Badge on the Left (Desktop) */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-pink-100/80 px-2.5 py-1 rounded-full border border-pink-200">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </span>
              </div>

              {/* Milestone Content Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 hover:border-pink-300 hover:shadow-xl transition-all duration-300">
                <div className="sm:hidden mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-pink-100/80 px-2.5 py-1 rounded-full border border-pink-200">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-nepali text-gray-900">
                    {item.nepaliTitle}
                  </h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-md border border-pink-100">
                    {item.tag}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-rose-500 mb-3 font-ui">
                  {item.title}
                </h4>

                <p className="text-gray-700 font-nepali text-sm sm:text-base leading-relaxed mb-2">
                  {item.nepaliDescription}
                </p>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-ui italic">
                  "{item.description}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
