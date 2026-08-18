import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Heart, Sparkles, X, Film, User, Star, MessageCircle, ChevronLeft, ChevronRight, Users, ArrowLeft } from 'lucide-react';
import { allMediaData } from '../data/allMediaData';
import { getComplimentForMedia } from '../data/complimentsData';
import { couplePhotosData } from '../data/couplePhotosData';
import { useDeviceGyro } from '../hooks/useDeviceGyro';
import { playSparkle, playPop } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { getAssetUrl } from '../utils/assetHelper';

import { ALL_VIDEOS } from '../utils/mediaUtils';

export default function GallerySection() {
  const navigate = useNavigate();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [displayCount, setDisplayCount] = useState(20);
  const { tiltX, tiltY } = useDeviceGyro();
  const { triggerHaptic } = useAppStore();

  const coupleList = useMemo(() => couplePhotosData.map((cp, i) => ({
    name: cp.title || `Couple Photo ${i + 1}`,
    isVideo: false,
    path: cp.url,
    coupleCompliment: cp.nepaliCompliment,
    coupleComplimentEn: cp.compliment,
  })), []);

  const photosList = useMemo(() => coupleList, [coupleList]);

  const SANZU_VIDEOS = useMemo(() => ALL_VIDEOS.map((path, idx) => ({
    name: `Sanzu Video Memory #${idx + 1} 🎬`,
    isVideo: true,
    path,
  })), []);

  const allList = useMemo(() => [...SANZU_VIDEOS, ...photosList], [photosList, SANZU_VIDEOS]);
  const tabs = [
    { key: 'all', label: 'All Memories', icon: Star, emoji: '🌟', list: allList },
    { key: 'videos', label: 'Her Videos', icon: Film, emoji: '🎬', list: SANZU_VIDEOS },
    { key: 'photos', label: 'Her Photos', icon: User, emoji: '👑', list: photosList },
  ];
  const currentTab = tabs.find((t) => t.key === activeTab);
  const currentList = currentTab?.list ?? photosList;

  const handleTabChange = (tabKey) => {
    playPop(); triggerHaptic(20); setActiveTab(tabKey); setDisplayCount(20); setSelectedMedia(null);
  };
  const handleLoadMore = () => { playSparkle(); triggerHaptic(20); setDisplayCount((prev) => prev + 20); };
  const handleMediaClick = (item, idx) => { playSparkle(); triggerHaptic(15); setSelectedMedia(item); setSelectedIndex(idx); };
  const handleNextModal = () => { playSparkle(); triggerHaptic(15); const nextIdx = (selectedIndex + 1) % currentList.length; setSelectedIndex(nextIdx); setSelectedMedia(currentList[nextIdx]); };
  const handlePrevModal = () => { playSparkle(); triggerHaptic(15); const prevIdx = (selectedIndex - 1 + currentList.length) % currentList.length; setSelectedIndex(prevIdx); setSelectedMedia(currentList[prevIdx]); };
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
  const cardVariants = { hidden: { opacity: 0, y: 20, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 22 } } };
  const currentCompliment = selectedMedia ? (selectedMedia.coupleCompliment ? { nepali: selectedMedia.coupleCompliment, english: selectedMedia.coupleComplimentEn } : getComplimentForMedia(selectedIndex, selectedMedia.name)) : null;

  return (
    <section id="gallery" className="py-10 px-3 sm:px-4 bg-gradient-to-b from-[#FAF8F8] via-[#FFF0F3] to-[#FAF8F8] relative overflow-hidden min-h-dvh" style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 2.5rem)' }}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-6 sm:mb-8"><div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-200 text-rose-600 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm"><Camera className="w-4 h-4 text-rose-500" /><span>Memory Vault • {allMediaData.length} Files</span></div><h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-ui text-gray-900 mb-1 leading-tight">Our Beautiful Memory Vault ❤️</h2><p className="text-gray-500 font-ui text-sm sm:text-base text-pink-500">Tap any photo or video to view sweet love notes and memories ✨</p></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6 sm:mb-8">{tabs.map((tab) => { const Icon = tab.icon; const isActive = activeTab === tab.key; return <button key={tab.key} onClick={() => handleTabChange(tab.key)} className={`flex flex-col items-center justify-center gap-1 p-3.5 rounded-2xl border-2 transition-all cursor-pointer font-ui active:scale-95 ${isActive ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-rose-400 shadow-xl ring-2 ring-pink-300' : 'bg-white text-gray-700 border-pink-200 active:bg-pink-50'}`}><div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-white/20' : 'bg-pink-50'}`}><Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-rose-500'}`} /></div><span className="text-[11px] font-bold uppercase tracking-wider leading-tight text-center">{tab.label} {tab.emoji}</span><span className={`text-[11px] font-semibold ${isActive ? 'text-white/80' : 'text-gray-400'}`}>({tab.list.length})</span></button>; })}</div>
        <AnimatePresence mode="wait"><motion.div key={activeTab} variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3">{currentList.slice(0, displayCount).map((item, idx) => { const compliment = item.coupleCompliment ? { nepali: item.coupleCompliment, english: item.coupleComplimentEn } : getComplimentForMedia(idx, item.name); return <motion.div key={`${activeTab}-${idx}`} variants={cardVariants} onClick={() => handleMediaClick(item, idx)} className="polaroid-card bg-white rounded-2xl border border-pink-200 shadow-md cursor-pointer group flex flex-col overflow-hidden"><div className="aspect-square overflow-hidden bg-slate-100 relative rounded-t-xl">{item.isVideo ? <div className="w-full h-full flex items-center justify-center relative bg-slate-900"><video src={getAssetUrl(item.path)} className="w-full h-full object-cover opacity-75" muted playsInline preload="metadata" /><div className="absolute inset-0 bg-black/30 flex items-center justify-center"><div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg"><Film className="w-5 h-5" /></div></div></div> : <img src={getAssetUrl(item.path)} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-contain" />}{item.coupleCompliment && <div className="absolute top-1.5 right-1.5 bg-rose-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full shadow">💕 Us</div>}</div><div className="px-2 py-2 text-center bg-white"><span className="block text-[11px] sm:text-[11px] font-bold font-nepali text-rose-600 line-clamp-1">{compliment.nepali}</span></div></motion.div>; })}</motion.div></AnimatePresence>
        {displayCount < currentList.length && <div className="text-center mt-8"><button onClick={handleLoadMore} className="btn-romantic px-8 py-3.5 font-bold text-sm rounded-full shadow-lg cursor-pointer">Load More ({currentList.length - displayCount} Left) ✨</button></div>}
      </div>
      <AnimatePresence>{selectedMedia && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[99999] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4" onClick={() => setSelectedMedia(null)}><button type="button" onClick={() => setSelectedMedia(null)} className="fixed top-4 left-4 z-[100000] w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl" aria-label="Close"><X className="w-6 h-6" /></button><div className="fixed top-4 right-4 z-[100000] flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-pink-300/30 text-xs text-rose-200 font-ui font-bold shadow-lg"><Sparkles className="w-3.5 h-3.5 text-pink-400" /><span>{selectedIndex + 1} / {currentList.length}</span></div><div className="flex-1 relative flex flex-col items-center justify-center px-6 sm:px-14 min-h-0 w-full" onClick={(e) => e.stopPropagation()}><button type="button" onClick={handlePrevModal} className="absolute left-2 z-10 w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center" aria-label="Previous"><ChevronLeft className="w-7 h-7" /></button><motion.div key={selectedIndex} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex flex-col items-center justify-center"><div className="relative inline-block max-w-full">{selectedMedia.isVideo ? <video key={selectedMedia.path} src={getAssetUrl(selectedMedia.path)} controls autoPlay playsInline className="max-w-full rounded-2xl shadow-2xl object-contain border-2 border-amber-400/50" style={{ maxHeight: '55vh' }} /> : <img src={getAssetUrl(selectedMedia.path)} alt={selectedMedia.name} className="max-w-full rounded-2xl shadow-2xl object-contain border-2 border-amber-400/50" style={{ maxHeight: '55vh' }} />}</div></motion.div><button type="button" onClick={handleNextModal} className="absolute right-2 z-10 w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center" aria-label="Next"><ChevronRight className="w-7 h-7" /></button></div><div className="flex-shrink-0 px-4 pt-3 pb-2"><div className="bg-gradient-to-r from-pink-950/90 via-black/90 to-rose-950/90 rounded-2xl p-4 border border-rose-500/30 text-center"><div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-rose-400 mb-1.5 font-ui uppercase tracking-wider"><MessageCircle className="w-3.5 h-3.5 text-pink-400" /><span>Compliment For My Bebo ❤️</span></div><p className="text-base sm:text-lg font-bold font-ui text-pink-200 leading-snug mb-0.5">"{currentCompliment?.english || currentCompliment?.nepali}"</p></div></div></motion.div>}</AnimatePresence>
    </section>
  );
}
