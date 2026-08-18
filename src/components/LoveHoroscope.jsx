import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Star } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import WorldShell, { WorldCard } from './WorldShell';

const READINGS = [
  {
    icon: <Sun className="w-5 h-5 text-amber-300" />,
    label: 'Leo Birthday Queen ♌',
    sub: 'August 20 — 2061/05/04 BS',
    content: 'The stars confirm: your bond across oceans is written in the oldest light. Pure heart, unbreakable trust, and a glowing future together.',
    nepali: 'Timi mero jun-tara ho — jaba pani ujyalo dina aaunxau. 💫',
    accent: 'text-amber-300',
  },
  {
    icon: <Star className="w-5 h-5 text-indigo-300" />,
    label: 'Love Compatibility: ∞%',
    sub: 'Celestial alignment: confirmed',
    content: 'Jupiter, Venus, and every wandering planet cast their vote: this love is cosmically destined. Distance is just space between stars — stars that always find each other.',
    nepali: 'Hazaarau mile ko duri vaye pani, hamro mutu eutai taalama dhadkinxa. ❤️',
    accent: 'text-indigo-300',
  },
  {
    icon: <Moon className="w-5 h-5 text-purple-300" />,
    label: "Tonight's Reading 🌙",
    sub: 'From Osaka to Nepalgunj, same moon',
    content: "The moon you see tonight from Osaka is the same one watching over Nepalgunj. Abu is looking up at it too. Distance measured in stars, not miles.",
    nepali: "Aaja raatiko jun — timi r ma duitai le herxam. Arkai aakashma, eutai mutu. 🌙",
    accent: 'text-purple-300',
  },
];

export default function LoveHoroscope() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.horoscope;

  return (
    <WorldShell
      theme="celestial"
      badge="Astrological Zodiac Chart 🔮"
      badgeIcon="✨"
      title={nepaliTitle}
      subtitle={title}
      description={`${nepaliSubtitle} — ${subtitle}`}
    >
      <div className="space-y-4 max-w-xl mx-auto">
        {READINGS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: i * 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorldCard className="text-left">
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-0.5">{r.icon}</div>
                <div>
                  <p className={`font-bold text-sm font-ui ${r.accent}`}>{r.label}</p>
                  <p className="text-indigo-400/60 text-[11px] font-ui">{r.sub}</p>
                </div>
              </div>
              <p className="text-indigo-100 text-xs sm:text-sm font-ui leading-relaxed mb-2">
                {r.content}
              </p>
              <p className="text-indigo-300/70 text-[11px] font-nepali italic">
                {r.nepali}
              </p>
            </WorldCard>
          </motion.div>
        ))}
      </div>
    </WorldShell>
  );
}
