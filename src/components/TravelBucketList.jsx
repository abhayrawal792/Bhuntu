import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, Plane, Check, Sparkles, ArrowLeft, X, Plus } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import confetti from 'canvas-confetti';

const GENUINE_DESTINATIONS = [
  { id: 1, name: "Pokhara, Manang & Mustang Honeymoon 🏔️🇳🇵", desc: "Our Romantic Nepal Honeymoon Trip after Marriage", emoji: "🏔️", dream: "Bihe paxi Pokhara ko Phewa lake boating ra Manang Mustang ko himal herna romantic honeymoon trip! 💕" },
  { id: 2, name: "Light Blue Scooter Trip to Bardiya 🛵💙", desc: "Sanzu driving her Light Blue Scooter with Abu in the back seat!", emoji: "🛵", dream: "Bihe paxi Sanzu le aafno light blue scooter kine-ra Abu lai paxi raakhya Bardiya ghar jaane! 💙" },
  { id: 3, name: "Kansai Airport Osaka Reunion Hug ✈️🤗", desc: "First tight hug after long-distance waiting at Osaka Airport", emoji: "✈️", dream: "Kansai Airport (Osaka) ma uffriyera tight hug garne tyo long distance paxi ko first meeting! 🫂" },
  { id: 4, name: "Osaka Cherry Blossom Hanami Date 🌸🇯🇵", desc: "Picnic under Sakura trees with homemade Chau-chau & Panipuri", emoji: "🌸", dream: "Osaka ma sakura ko rukhh tala picnic garne, haat samayera hidne ra Chau-chau khane! 🍜" },
  { id: 5, name: "Movie Hall Hand-Feeding Date 🎬🍿", desc: "Holding hands in the theater & hand-feeding popcorn to Bebo", emoji: "🍿", dream: "Movie hall ma haat samaye-ra film herne ra Abu le aafno haat le Bebo lai khana khuwaaune! 🤲❤️" },
  { id: 6, name: "Our Grand Wedding & Living Together 💒💍", desc: "Getting married surrounded by love and living in our own house", emoji: "💒", dream: "Ramro bihe garera sangai aafno pyaro ghar ma endless happiness sangai basne! 💍" },
  { id: 7, name: "30 to 40 Cute Kiddos Family 👶🍼", desc: "Building our big, happy, loving family as promised in our love letter", emoji: "👶", dream: "As written in our heartwritten love letter, 30 to 40 cute kiddos ra aafno family! 👨‍👩‍👧‍👦" },
  { id: 8, name: "Late Night Chiya & Endless Love Guff ☕🌙", desc: "Making tea at 12 AM and talking for hours with warm cuddles", emoji: "☕", dream: "Raati 12 baje chiya banaayera tap tap guff gardai endless love talks & tight hugs! ☕❤️" },
  { id: 9, name: "Bhuntu's Grand Annual Birthday Party 🎂🎉", desc: "Cutting the biggest cake every single year for Bebo", emoji: "👑", dream: "Har saal Bebo ko birthday ma sab bhanda thulo cake kaatne & grand surprise garne! 🎂" },
  { id: 10, name: "Matching Aesthetic Outfits Shoot 📸👗", desc: "Wearing matching couple clothes and taking aesthetic polaroid photos", emoji: "👗", dream: "Sanzu & Abu matching aesthetic clothes lagayera cute couple photos khichne! 📸" },
  { id: 11, name: "Spicy Current Noodles & Panipuri Party 🍜🥟", desc: "Cooking spicy noodles and eating panipuri together at home", emoji: "🥟", dream: "Kitchen ma sangai spicy Current Noodles & Panipuri banaayera khane competition! 🌶️" },
  { id: 12, name: "Rainy Day Blanket & Cuddle Session 🌧️🛋️", desc: "Wrapped in a warm blanket during rain with tea & sweet talks", emoji: "🌧️", dream: "Paani parda blanket bhitra beriyera garam chiya pichu & tightest cuddles forever! 🛋️❤️" }
];

export default function TravelBucketList() {
  const [destinations, setDestinations] = useState(GENUINE_DESTINATIONS);
  const [checked, setChecked] = useState(new Set());
  const [selectedDream, setSelectedDream] = useState(null);
  const [newDreamName, setNewDreamName] = useState('');
  const [newDreamDesc, setNewDreamDesc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { triggerHaptic } = useAppStore();

  const handleCheck = (idx) => {
    playPop();
    triggerHaptic([20, 40]);
    const next = new Set(checked);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    setChecked(next);
  };

  const handleAddCustomDream = (e) => {
    e.preventDefault();
    if (!newDreamName.trim()) return;

    playBloom();
    triggerHaptic(20);
    const newEntry = {
      id: Date.now(),
      name: newDreamName.trim() + " ✨",
      desc: newDreamDesc.trim() || "Our personal dream for the future!",
      emoji: "💖",
      dream: `Abu & Bhuntu's genuine dream: "${newDreamName.trim()}" 💕`
    };

    setDestinations(prev => [newEntry, ...prev]);
    setNewDreamName('');
    setNewDreamDesc('');
    setShowAddForm(false);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
  };

  const progress = Math.round((checked.size / destinations.length) * 100);

  return (
    <WorldShell
      theme="journey"
      badge="Genuine Couple Bucket List 🗺️"
      badgeIcon={<MapPin className="w-3.5 h-3.5" />}
      title="Hamro Genuine Couple Bucket List 🗺️"
      subtitle="100% Real & Genuine Dreams of Abu & Bhuntu 💕"
      description="Tap any dream to mark as promised or read our personal relationship goals!"
    >

      <div className="max-w-2xl mx-auto font-ui space-y-4">

        {/* Progress Bar & Add Dream Toggle */}
        <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-pink-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold font-ui">
            <span className="text-rose-600 flex items-center gap-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
              Genuine Dreams Promised
            </span>
            <span className="text-pink-600 font-extrabold">{checked.size}/{destinations.length} Dreams 💕</span>
          </div>

          <div className="w-full h-3 rounded-full bg-pink-100 overflow-hidden border border-pink-200">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="h-full rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </motion.div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-gray-500 font-semibold">
              {progress}% Completed
            </span>

            <button
              onClick={() => setShowAddForm(prev => !prev)}
              className="px-3.5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Your Own Genuine Dream ✨</span>
            </button>
          </div>
        </div>

        {/* Custom Dream Input Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleAddCustomDream}
              className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-rose-300 shadow-lg space-y-2 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 font-ui flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Add a New Genuine Dream for Us:
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <input
                type="text"
                value={newDreamName}
                onChange={(e) => setNewDreamName(e.target.value)}
                placeholder="E.g., Sunset walk on Dhamboji road holding hands... 💕"
                className="w-full px-3.5 py-2 rounded-xl border border-pink-300 bg-pink-50/50 text-xs font-semibold text-gray-800 focus:outline-none focus:border-rose-500"
                required
              />

              <input
                type="text"
                value={newDreamDesc}
                onChange={(e) => setNewDreamDesc(e.target.value)}
                placeholder="Optional details / story note..."
                className="w-full px-3.5 py-2 rounded-xl border border-pink-300 bg-pink-50/50 text-xs font-semibold text-gray-800 focus:outline-none focus:border-rose-500"
              />

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-md hover:scale-101 transition-all cursor-pointer font-ui"
              >
                Save Genuine Dream to Bucket List ✨
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {destinations.map((d, i) => {
            const isChecked = checked.has(i);
            return (
              <motion.div
                key={d.id || i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`glass-card rounded-2xl p-4 border shadow-md text-left relative overflow-hidden cursor-pointer transition-all duration-300 ${
                  isChecked ? 'border-green-400 bg-green-50/90 shadow-lg' : 'border-pink-200 bg-white'
                }`}
              >
                {/* Stamp overlay */}
                {isChecked && (
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: -12 }}
                    className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md z-20 border-2 border-white"
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                )}

                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0 mt-0.5">{d.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 font-bold text-rose-600 font-ui text-sm mb-0.5">
                      <Heart className={`w-3.5 h-3.5 flex-shrink-0 ${isChecked ? 'fill-rose-500 text-rose-500' : 'text-rose-400'}`} />
                      <span className={isChecked ? 'line-through opacity-70' : ''}>{d.name}</span>
                    </div>
                    <p className="text-[11px] text-gray-600 font-ui mb-2.5 leading-snug">{d.desc}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCheck(i); }}
                        className={`px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-green-600 text-white border border-green-600 shadow-xs'
                            : 'bg-pink-100 text-rose-700 border border-pink-200 hover:bg-pink-200'
                        }`}
                      >
                        {isChecked ? '✅ Promised!' : '💭 Promise It'}
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedDream(d); }}
                        className="px-3 py-1.5 rounded-full text-[11px] font-bold cursor-pointer bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 transition-all"
                      >
                        💬 Read Note
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dream Note Modal */}
        <AnimatePresence>
          {selectedDream && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedDream(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border-2 border-pink-300 shadow-2xl bg-white text-center relative"
              >
                <button
                  onClick={() => setSelectedDream(null)}
                  className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-rose-500 hover:text-white text-gray-600 font-bold text-xs shadow transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Close</span>
                </button>

                <div className="text-5xl mb-3 mt-4">{selectedDream.emoji}</div>
                <h3 className="text-lg font-bold font-ui text-rose-600 mb-1">{selectedDream.name}</h3>
                <p className="text-xs text-gray-500 font-ui mb-4">{selectedDream.desc}</p>

                <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-rose-700 font-nepali text-xs sm:text-sm leading-relaxed font-semibold mb-6">
                  "{selectedDream.dream}"
                </div>

                <button
                  onClick={() => setSelectedDream(null)}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-2xl shadow-md cursor-pointer text-xs font-ui"
                >
                  Close & Keep Dreaming 💕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </WorldShell>
  );
}
