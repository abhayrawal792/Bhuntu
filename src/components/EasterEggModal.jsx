import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { Sparkles, Heart, X, Gift } from 'lucide-react';

export default function EasterEggModal() {
  const { unlockedEasterEgg, closeEasterEgg } = useAppStore();

  if (!unlockedEasterEgg) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}>
      <div className="relative max-w-md w-full glass-card rounded-3xl p-8 border-2 border-rose-400 shadow-2xl text-center">
        <button
          onClick={closeEasterEgg}
          className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
          <Sparkles className="w-8 h-8" />
        </div>

        <span className="inline-block text-xs font-bold uppercase tracking-widest text-rose-600 mb-1 font-ui">
          Secret Easter Egg Unlocked! 💖
        </span>
        
        <h3 className="text-2xl font-bold font-nepali text-gray-900 mb-3">
          Temi Mero Sabai Bhanda Pyaro Bebo Hou!
        </h3>

        <p className="text-gray-700 font-ui text-sm sm:text-base leading-relaxed mb-6">
          You tapped her name 3 times! Here is a secret hug from Nepalgunj (Dhamboji) straight to Sakai (Osaka, Japan) 🇳🇵✈️🇯🇵
        </p>

        <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-rose-600 font-handwriting text-2xl font-bold mb-6">
          "30 to 40 kiddies ra sadhai bhariko bihe ko promise!"
        </div>

        <button
          onClick={closeEasterEgg}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
        >
          Close Secret Surprise ❤️
        </button>
      </div>
    </div>
  );
}
