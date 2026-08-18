import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Heart, Sparkles, X, CheckCircle2, ArrowLeft } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';

export default function BouquetSection() {
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [assembledBouquet, setAssembledBouquet] = useState([]);
  const { triggerHaptic } = useAppStore();

  const handleSelectFlower = (flower) => {
    playSparkle();
    triggerHaptic(15);
    setSelectedFlower(flower);
    if (!assembledBouquet.some(f => f.id === flower.id)) {
      setAssembledBouquet(prev => [...prev, flower]);
    }
  };

  return (
    <section id="bouquet" className="py-10 sm:py-20 px-3 sm:px-4 bg-gradient-to-b from-[#FFF0F3] via-[#FAF8F8] to-[#FFF0F3] relative overflow-hidden min-h-dvh">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-7 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm font-ui">
            <Flower2 className="w-4 h-4 text-rose-500" />
            <span>Luxury Bouquets for Bebo • {birthdayData.bouquet.length} Bouquets</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-nepali text-gray-900 mb-1.5 leading-tight">
            Mero Bebo Ko Lagi Ashali Phool Haru 💐
          </h2>
          <p className="text-gray-500 font-ui text-sm sm:text-base text-pink-500">
            Tap any luxury flower bouquet to open your romantic card...
          </p>
        </div>

        {/* Flower Bouquet Cards Grid — 1 col on iPhone, 2+ on larger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {birthdayData.bouquet.map(flower => {
            const isAdded = assembledBouquet.some(f => f.id === flower.id);
            return (
              <motion.div
                key={flower.id}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectFlower(flower)}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-pink-200 cursor-pointer group flex flex-col justify-between transition-all active:shadow-md"
              >
                {/* Flower Image */}
                <div className="relative overflow-hidden bg-pink-50" style={{ height: '220px' }}>
                  <img
                    src={flower.flowerImg}
                    alt={flower.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-end p-4 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 font-ui mb-1">
                      Luxury Real Bouquet
                    </span>
                    <h3 className="text-base font-bold font-nepali text-white leading-snug">
                      {flower.nepaliName}
                    </h3>
                  </div>

                  {isAdded && (
                    <div className="absolute top-3 right-3 bg-rose-500 text-white p-1.5 rounded-full shadow-lg">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Card Details */}
                <div className="p-4 text-center">
                  <p className="text-xs font-bold text-gray-800 font-ui mb-1">{flower.name}</p>
                  <p className="text-xs text-rose-600 font-nepali italic mb-3">"{flower.nepaliMessage}"</p>
                  <div className="w-full py-2.5 rounded-full bg-gradient-to-r from-pink-50 to-rose-50 text-rose-600 font-bold text-xs group-hover:from-pink-500 group-hover:to-rose-500 group-hover:text-white transition-all border border-pink-200 group-hover:border-transparent">
                    View Bouquet & Card ✨
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Collected Bouquet Status Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border-2 border-pink-300 shadow-xl max-w-xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold font-nepali text-gray-900">
              Mero Bebo Ko Bouquet ({assembledBouquet.length}/{birthdayData.bouquet.length})
            </h3>
          </div>
          <p className="text-xs text-gray-500 font-ui mb-4">
            {assembledBouquet.length === birthdayData.bouquet.length
              ? 'All bouquets collected! Your bouquet is full of eternal love ❤️'
              : 'Tap all bouquets to complete your collection for Bebo!'}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {birthdayData.bouquet.map(flower => {
              const collected = assembledBouquet.some(f => f.id === flower.id);
              return (
                <div
                  key={flower.id}
                  className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                    collected
                      ? 'border-rose-500 ring-2 ring-pink-300 scale-110'
                      : 'border-gray-200 opacity-40 grayscale'
                  }`}
                >
                  <img src={flower.flowerImg} alt={flower.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Flower Detail Modal — safe area aware */}
      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center"
            style={{
              paddingBottom: 'env(safe-area-inset-bottom)',
              paddingTop: 'env(safe-area-inset-top)',
            }}
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border-t-2 sm:border-2 border-pink-300 mx-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Top Left Close Icon Button */}
              <button
                onClick={() => setSelectedFlower(null)}
                className="absolute top-4 left-4 z-[60] p-2.5 rounded-full bg-black/60 text-white hover:bg-rose-600 transition-all cursor-pointer backdrop-blur-md shadow-lg border border-white/20 active:scale-95"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Side-by-Side Images */}
              <div className="grid grid-cols-2 bg-pink-100" style={{ height: '200px' }}>
                <div className="h-full relative overflow-hidden">
                  <img src={selectedFlower.flowerImg} alt={selectedFlower.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
                    Luxury Bouquet
                  </span>
                </div>
                <div className="h-full relative overflow-hidden">
                  <img src={selectedFlower.herImg} alt="Mero Bebo" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-rose-500 text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
                    Mero Bebo ❤️
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 text-center">
                <div className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 uppercase tracking-wider mb-1 font-ui">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedFlower.name}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-nepali text-gray-900 mb-2 leading-tight">
                  {selectedFlower.nepaliName}
                </h3>
                <p className="text-sm font-nepali text-rose-600 font-semibold mb-2">
                  "{selectedFlower.nepaliMessage}"
                </p>
                <p className="text-xs text-gray-500 font-ui italic mb-5">
                  "{selectedFlower.message}"
                </p>

                <button
                  onClick={() => setSelectedFlower(null)}
                  className="btn-romantic w-full py-3.5 font-bold text-sm rounded-2xl shadow-lg cursor-pointer"
                >
                  Add To Bebo's Bouquet 💕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
