import WorldShell from './WorldShell';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Ticket, Heart, Sparkles, CheckCircle2, Send, PlusCircle, BookmarkCheck, Gift, Star, RefreshCw } from 'lucide-react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const PRESET_COUPONS = [
  { id: 1, title: '30-Minute Romantic Foot & Back Massage', icon: '💆‍♀️', desc: 'Abu will give Bhuntu a relaxing massage anytime on request.', theme: 'from-rose-500 to-pink-600', code: 'BHUNTU-MASSAGE-01' },
  { id: 2, title: 'Chiya & Hot Momos Date Pass', icon: '☕🥟', desc: 'Redeemable for hot Chiya & Steam Momos at Bhuntu\'s favorite spot!', theme: 'from-amber-500 to-rose-500', code: 'BHUNTU-CHIYA-02' },
  { id: 3, title: 'Light Blue Scooter Ride to Bardiya', icon: '🛵💨', desc: 'Sanzu drives while Abu holds her tight in the back seat!', theme: 'from-sky-500 to-indigo-600', code: 'BHUNTU-SCOOTER-03' },
  { id: 4, title: 'Midnight Movie Pick (No Complaints Allowed)', icon: '🍿🎬', desc: 'Bhuntu gets complete control over movie selection all night long!', theme: 'from-purple-600 to-pink-600', code: 'BHUNTU-MOVIE-04' },
  { id: 5, title: 'Queen for a Day (Abu Does All Chores)', icon: '👑✨', desc: 'Bhuntu relaxes while Abu handles all meals, drinks, and cleanups!', theme: 'from-yellow-500 to-amber-600', code: 'BHUNTU-QUEEN-05' },
  { id: 6, title: '1,000 Super Tight Cuddle Hugs Pass', icon: '🫂💖', desc: 'Unlimited warm bear hugs guaranteed with zero time limits!', theme: 'from-pink-500 to-rose-600', code: 'BHUNTU-HUGS-06' },
  { id: 7, title: 'Win Any Argument Instant Golden Pass', icon: '🏆⚡', desc: 'Instantly ends any disagreement. Bhuntu automatically wins!', theme: 'from-amber-400 to-yellow-600', code: 'BHUNTU-WINNER-07' },
  { id: 8, title: 'Pokhara & Mustang Honeymoon Pass', icon: '🏔️✈️', desc: 'Valid for our upcoming post-marriage dream trip across Nepal!', theme: 'from-emerald-500 to-teal-600', code: 'BHUNTU-HONEYMOON-08' },
  { id: 9, title: 'Late Night Cheat Meal Treat', icon: '🍕🍰', desc: 'Late night cravings delivery paid & served by Abu!', theme: 'from-red-500 to-orange-500', code: 'BHUNTU-FOOD-09' },
  { id: 10, title: 'Dedicated Romantic Song Singing Call', icon: '🎶📱', desc: 'Abu sings your favorite romantic track live on video call!', theme: 'from-violet-600 to-purple-600', code: 'BHUNTU-SONG-10' },
  { id: 11, title: 'Osaka Sakura Picnic Date Voucher', icon: '🌸🏯', desc: 'Valid for our future Osaka Kansai Airport & Hanami date!', theme: 'from-pink-400 to-rose-500', code: 'BHUNTU-OSAKA-11' },
  { id: 12, title: 'Forever Loyalty & Endless Hugs Contract', icon: '💍💒', desc: '100% genuine lifetime love commitment contract between Abu & Bhuntu!', theme: 'from-rose-600 to-red-700', code: 'BHUNTU-FOREVER-12' },
];

const THEME_OPTIONS = [
  { name: 'Rose Gold', class: 'from-rose-500 to-pink-600' },
  { name: 'Midnight Purple', class: 'from-purple-600 to-indigo-600' },
  { name: 'Osaka Sakura', class: 'from-pink-400 to-rose-500' },
  { name: 'Golden Glow', class: 'from-amber-400 to-yellow-600' },
  { name: 'Emerald Love', class: 'from-emerald-500 to-teal-600' },
];

const ICON_OPTIONS = ['🎟️', '💆‍♀️', '☕', '🛵', '👑', '🫂', '🏆', '🍕', '🌸', '💍', '🍿', '🎶'];

export default function LoveCouponGenerator() {
  const { title, nepaliTitle, subtitle, nepaliSubtitle } = birthdayData.loveCouponGenerator;
  const { triggerHaptic } = useAppStore();

  const [activeTab, setActiveTab] = useState('preset'); // preset | custom | wallet
  const [claimedCoupons, setClaimedCoupons] = useState([1, 6, 12]); // default claimed IDs
  const [customCoupons, setCustomCoupons] = useState([]);

  // Form states for custom creation
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customIcon, setCustomIcon] = useState('🎟️');
  const [customTheme, setCustomTheme] = useState('from-rose-500 to-pink-600');

  const handleClaim = (id) => {
    if (claimedCoupons.includes(id)) return;
    playBloom();
    triggerHaptic([30, 60]);
    setClaimedCoupons([...claimedCoupons, id]);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleCreateCustom = () => {
    if (!customTitle.trim()) return;
    playSparkle();
    triggerHaptic([40, 90]);

    const newCoupon = {
      id: Date.now(),
      title: customTitle,
      icon: customIcon,
      desc: customDesc || 'Custom love voucher redeemable anytime with Abu!',
      theme: customTheme,
      code: `BHUNTU-CUSTOM-${Math.floor(100 + Math.random() * 900)}`,
      isCustom: true
    };

    setCustomCoupons([newCoupon, ...customCoupons]);
    setClaimedCoupons([...claimedCoupons, newCoupon.id]);
    setCustomTitle('');
    setCustomDesc('');
    setActiveTab('wallet');
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
  };

  const sendWhatsApp = (coupon) => {
    playSparkle();
    triggerHaptic(20);
    const text = `🎟️ *BHUNTU OFFICIAL VIP LOVE COUPON REDEEMED!*\n\n*Ticket:* ${coupon.icon} ${coupon.title}\n*Serial:* #${coupon.code}\n*Details:* ${coupon.desc}\n\n*Status:* CLAIMED & VALID FOREVER ❤️`;
    sendWhatsAppMessage(text, `🎟️ Redeem Coupon: ${coupon.title}`);
  };

  const allCoupons = [...PRESET_COUPONS, ...customCoupons];
  const walletList = allCoupons.filter(c => claimedCoupons.includes(c.id));

  return (
    <WorldShell
      theme="sweet"
      badge="Custom Love Coupon Studio 🎟️"
      badgeIcon={<Ticket className="w-3.5 h-3.5 text-pink-500" />}
      title="Bhuntu's Deluxe Love Coupon Book 🎟️"
      subtitle="Claim pre-made love vouchers or design your own custom tickets for Abu!"
      description="100% valid lifetime coupons redeemable anytime anywhere!"
    >

      <div className="max-w-3xl mx-auto space-y-5 font-ui">

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-pink-200 shadow-sm">
          {[
            { id: 'preset', label: '🎟️ VIP Coupon Vault (12)', badge: PRESET_COUPONS.length },
            { id: 'custom', label: '✨ Create Custom Ticket', badge: null },
            { id: 'wallet', label: `💼 My Wallet (${walletList.length})`, badge: walletList.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { playPop(); setActiveTab(tab.id); }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-pink-50'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: PRESET COUPONS VAULT */}
        {activeTab === 'preset' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRESET_COUPONS.map(coupon => {
              const isClaimed = claimedCoupons.includes(coupon.id);

              return (
                <motion.div
                  key={coupon.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-3xl bg-gradient-to-r ${coupon.theme} text-white shadow-xl relative overflow-hidden border-2 border-dashed border-white/40 flex flex-col justify-between`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                      {coupon.icon}
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-mono tracking-widest text-white/80 uppercase block">
                        #{coupon.code}
                      </span>
                      <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-extrabold text-white mt-0.5">
                        VALID FOREVER ♾️
                      </span>
                    </div>
                  </div>

                  <div className="my-3 space-y-1 text-left">
                    <h3 className="text-sm font-black tracking-tight leading-snug">
                      {coupon.title}
                    </h3>
                    <p className="text-[11px] text-white/90 leading-normal">
                      {coupon.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/20">
                    <button
                      onClick={() => handleClaim(coupon.id)}
                      disabled={isClaimed}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isClaimed
                          ? 'bg-white/30 text-white cursor-default'
                          : 'bg-white text-rose-600 hover:bg-rose-50 shadow-md active:scale-95'
                      }`}
                    >
                      {isClaimed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          <span>Claimed in Wallet</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                          <span>Claim Love Ticket 🎟️</span>
                        </>
                      )}
                    </button>

                    {isClaimed && (
                      <button
                        onClick={() => sendWhatsApp(coupon)}
                        className="py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1 shrink-0"
                        title="Redeem on WhatsApp"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Redeem</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* TAB 2: CUSTOM COUPON CREATOR STUDIO */}
        {activeTab === 'custom' && (
          <div className="glass-card p-6 rounded-3xl border-2 border-pink-300 bg-white/95 shadow-2xl text-left space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-pink-100">
              <PlusCircle className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-extrabold text-gray-800 uppercase tracking-wide">
                Design Custom Love Coupon Studio ✨
              </h3>
            </div>

            {/* Custom Title Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Coupon Title / Promise:</label>
              <input
                type="text"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                placeholder="e.g. 1 Hour Unlimited Back Scratches..."
                className="w-full p-3 rounded-2xl border-2 border-pink-200 text-xs font-bold text-gray-800 outline-none focus:border-rose-400 font-ui bg-pink-50/40"
              />
            </div>

            {/* Custom Description Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Special Terms & Description:</label>
              <input
                type="text"
                value={customDesc}
                onChange={e => setCustomDesc(e.target.value)}
                placeholder="e.g. Valid anytime Abu is tired after work..."
                className="w-full p-3 rounded-2xl border-2 border-pink-200 text-xs font-medium text-gray-800 outline-none focus:border-rose-400 font-ui bg-pink-50/40"
              />
            </div>

            {/* Choose Icon */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Select Icon Badge:</label>
              <div className="flex flex-wrap gap-2">
                {ICON_OPTIONS.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setCustomIcon(icon)}
                    className={`w-9 h-9 rounded-xl border text-lg flex items-center justify-center cursor-pointer transition-all ${
                      customIcon === icon ? 'bg-rose-500 text-white border-rose-500 scale-110 shadow-sm' : 'bg-gray-50 border-gray-200 hover:bg-pink-50'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Theme */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Select Background Theme:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {THEME_OPTIONS.map(th => (
                  <button
                    key={th.name}
                    type="button"
                    onClick={() => setCustomTheme(th.class)}
                    className={`p-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${th.class} border-2 transition-all cursor-pointer ${
                      customTheme === th.class ? 'border-gray-900 ring-2 ring-pink-400 scale-102' : 'border-transparent opacity-80'
                    }`}
                  >
                    {th.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Card */}
            <div className="pt-2">
              <label className="text-xs font-bold text-gray-600 block mb-1">Live Ticket Preview:</label>
              <div className={`p-4 rounded-3xl bg-gradient-to-r ${customTheme} text-white border-2 border-dashed border-white/40 shadow-lg text-left`}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{customIcon}</span>
                  <span className="text-[10px] font-mono text-white/80">#BHUNTU-CUSTOM-001</span>
                </div>
                <h4 className="text-sm font-black mt-2">{customTitle || 'Your Custom Coupon Title'}</h4>
                <p className="text-[11px] text-white/90 mt-0.5">{customDesc || 'Enter description above to preview ticket terms...'}</p>
              </div>
            </div>

            <button
              onClick={handleCreateCustom}
              disabled={!customTitle.trim()}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-extrabold text-xs shadow-xl cursor-pointer hover:scale-102 transition-all disabled:opacity-50"
            >
              Generate & Save Custom Ticket 🎟️
            </button>
          </div>
        )}

        {/* TAB 3: MY COUPON WALLET */}
        {activeTab === 'wallet' && (
          <div className="space-y-4">
            {walletList.length === 0 ? (
              <div className="p-8 rounded-3xl bg-white border-2 border-dashed border-pink-200 text-center space-y-2">
                <Ticket className="w-12 h-12 text-pink-300 mx-auto animate-bounce" />
                <h3 className="text-sm font-bold text-gray-700">Your Coupon Wallet is Empty!</h3>
                <p className="text-xs text-gray-500">Go to the VIP Coupon Vault to claim tickets or create custom ones!</p>
                <button
                  onClick={() => setActiveTab('preset')}
                  className="px-5 py-2 rounded-full bg-rose-500 text-white text-xs font-bold shadow-md cursor-pointer mt-2"
                >
                  Browse 12 VIP Coupons 🎟️
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {walletList.map(coupon => (
                  <motion.div
                    key={coupon.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-4 rounded-3xl bg-gradient-to-r ${coupon.theme} text-white shadow-xl relative border-2 border-dashed border-white/50 text-left flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{coupon.icon}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-mono font-bold">
                        #{coupon.code}
                      </span>
                    </div>

                    <div className="my-2">
                      <h4 className="text-sm font-black leading-snug">{coupon.title}</h4>
                      <p className="text-[11px] text-white/90 mt-1">{coupon.desc}</p>
                    </div>

                    <button
                      onClick={() => sendWhatsApp(coupon)}
                      className="w-full py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Redeem Now on WhatsApp 📲</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </WorldShell>
  );
}
