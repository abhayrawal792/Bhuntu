import WorldShell from './WorldShell';
import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Heart, Search, Send, CheckCheck, Phone, Video, MoreVertical, 
  Smile, Paperclip, Sparkles, Copy, Check, ShieldCheck, Flame, Play, Pause, RefreshCw, Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { BHUNTU_PHOTOS, handlePhotoError } from '../utils/mediaUtils';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const CHAT_MEMORIES = [
  { id: 1, sender: 'Bhuntu', text: 'Abu, are you awake? 🥺', time: '01:42 AM', type: 'text' },
  { id: 2, sender: 'You', text: 'Always awake for you, my sweet princess ❤️ What happened?', time: '01:43 AM', type: 'text' },
  { id: 3, sender: 'Bhuntu', text: 'Just missing your warm hugs so much tonight...', time: '01:44 AM', type: 'text' },
  { id: 4, sender: 'You', text: 'Sending you 1,000,000 virtual tight hugs right now! 🫂🥰 You are forever safe in my heart.', time: '01:45 AM', type: 'text' },
  { id: 5, sender: 'Bhuntu', text: 'How much do you actually love me? Tell me truth! 🙈', time: '02:05 AM', type: 'text' },
  { id: 6, sender: 'You', text: 'I write "I love you" 10,000 times for you with all my heart & soul! ✨💖', time: '02:06 AM', type: 'text' },
  { id: 7, sender: 'You', text: 'Voice note recorded (0:42)', time: '02:07 AM', type: 'audio', duration: '0:42' },
  { id: 8, sender: 'Bhuntu', text: 'Aww my heart is melting! 🥹 You are my favorite person in the whole wide world! 💕', time: '02:08 AM', type: 'text' }
];

const EMOJI_SETS = [
  "❤️✨", "💖👑", "💗🌸", "💘💫", "💓🧸", "💞🥺", "🥰💕", "😘🎀", "🙈💐", "💍🌟",
  "🌌🕯️", "💋🫂", "💌🍓", "☁️💖", "🔥👑", "🌷🥰", "🕊️✨", "🌙💘", "✨❤️", "💖💫"
];

const STYLES = [
  (i, e) => `i love uuu so much Bhuntu ${e} (#${i})`,
  (i, e) => `I LOVE YOU BHUNTU ${e} (#${i})`,
  (i, e) => `i  l o v e  y o u  b h u n t u ${e} (#${i})`,
  (i, e) => `💖 I LOVE YOU BHUNTU FOREVER 💖 (${e} #${i})`,
  (i, e) => `i looveee you to the moon and back baby girl ${e} (#${i})`,
  (i, e) => `You have my whole heart forever & ever Bhuntu ${e} (#${i})`,
  (i, e) => `I love you 10,000 times my sweetest princess ${e} (#${i})`,
  (i, e) => `i love u endlessly my cutie pie ${e} (#${i})`,
  (i, e) => `whispering i love you to the stars for Bhuntu ${e} (#${i})`,
  (i, e) => `I love you x1000000000 Bhuntu ${e} (#${i})`,
  (i, e) => `my heart beats only for you my love ${e} (#${i})`,
  (i, e) => `I LOVE YOU MORE THAN WORDS CAN EVER SAY BHUNTU ${e} (#${i})`,
  (i, e) => `i love u so so so so much my angel ${e} (#${i})`,
  (i, e) => `Forever & always yours, I love you Bhuntu ${e} (#${i})`,
  (i, e) => `~ i love you endlessly ~ ${e} (#${i})`
];

export default function WhatsApp10kLove() {
  const { triggerHaptic } = useAppStore();

  const [activeTab, setActiveTab] = useState('10kWall');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [messages, setMessages] = useState(CHAT_MEMORIES);
  const [inputText, setInputText] = useState('');
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const chatEndRef = useRef(null);

  const currentPhoto = BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length] || BHUNTU_PHOTOS[0];

  const all10kMessages = useMemo(() => {
    const list = [];
    for (let i = 1; i <= 10000; i++) {
      const styleFn = STYLES[(i - 1) % STYLES.length];
      const emoji = EMOJI_SETS[(i * 3 + i % 7) % EMOJI_SETS.length];
      const textStr = styleFn(i, emoji);

      list.push({
        id: i,
        count: i,
        text: textStr,
        time: `${(i % 12 || 12).toString().padStart(2, '0')}:${((i * 7) % 60).toString().padStart(2, '0')} ${i % 24 < 12 ? 'AM' : 'PM'}`
      });
    }
    return list;
  }, []);

  const filtered10k = useMemo(() => {
    if (!searchTerm.trim()) return all10kMessages.slice(0, page * 150);
    return all10kMessages.filter(m => 
      m.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.count.toString() === searchTerm.trim()
    ).slice(0, 300);
  }, [all10kMessages, searchTerm, page]);

  const triggerHeartConfetti = () => {
    playBloom();
    playSparkle();
    triggerHaptic([30, 60, 90]);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#ff2a6d', '#ff758c', '#ff7eb3', '#ffffff']
    });
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    playPop();
    triggerHaptic(10);
    
    const newMsg = {
      id: Date.now(),
      sender: 'You',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleShareWhatsApp = () => {
    playSparkle();
    const text = `💬 WHATSAPP 10,000 I LOVE YOU WALL 💬\n\n10,000 Unique Messages Written for Queen Sanzu!\n\nHappy Birthday Bebo! 🎂💖`;
    sendWhatsAppMessage(text);
  };

  return (
    <WorldShell
      theme="sweet"
      badge="WhatsApp 10,000 I Love You 💬✨"
      badgeIcon={<MessageSquare className="w-3.5 h-3.5 text-emerald-400" />}
      title={"WhatsApp 10,000 I Love You Wall"}
      subtitle={"10,000 Unique Love Messages for Queen Sanzu"}
      description={"Explore 10,000 uniquely formatted I Love You messages and live WhatsApp chat memory simulator!"}
    >
      <div className="max-w-4xl mx-auto px-4 pb-16 text-center select-none font-ui">
        
        {/* TOP TAB CONTROLS & AVATAR */}
        <div className="flex items-center justify-between max-w-xl mx-auto bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-emerald-500/30 mb-6 shadow-xl">
          <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 shadow-md">
              <img
                src={currentPhoto}
                alt="Sanzu Avatar"
                onError={(e) => handlePhotoError(e, photoIdx)}
                className="w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105"
              />
            </div>
            <div className="text-left">
              <span className="text-xs font-extrabold text-white block">Sanzu ❤️ (My Princess)</span>
              <span className="text-[10px] text-emerald-300 font-mono block">online | 10000 I Love Yous 🟢</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('10kWall')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === '10kWall' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              10k Wall
            </button>
            <button
              onClick={() => setActiveTab('chatHistory')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'chatHistory' ? 'bg-emerald-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              Live Chat
            </button>
          </div>
        </div>

        {/* TAB 1: 10k WALL */}
        {activeTab === '10kWall' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search 10,000 messages or type #500..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-emerald-500/30 rounded-xl text-xs text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                />
              </div>
              <button
                onClick={triggerHeartConfetti}
                className="p-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1"
              >
                <Heart className="w-4 h-4 fill-white" />
              </button>
            </div>

            <div className="h-[420px] overflow-y-auto p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 text-left space-y-2 font-mono text-xs shadow-2xl">
              {filtered10k.map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-emerald-200">
                  <span className="truncate pr-2 font-semibold">{item.text}</span>
                  <span className="text-[10px] text-gray-500 shrink-0">{item.time}</span>
                </div>
              ))}

              {!searchTerm && (
                <div className="text-center pt-3">
                  <button
                    onClick={() => setPage(p => p + 1)}
                    className="px-6 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow hover:bg-emerald-500 cursor-pointer"
                  >
                    Load More Messages ({filtered10k.length} / 10,000)
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* TAB 2: LIVE CHAT SIMULATOR */
          <div className="bg-slate-950 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl text-left">
            <div className="h-[380px] overflow-y-auto p-4 space-y-3 bg-[#0b141a]">
              {messages.map((msg) => {
                const isMe = msg.sender === 'You';
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] sm:max-w-[65%] px-4 py-2.5 rounded-2xl shadow-sm ${
                        isMe
                          ? 'bg-[#005c4b] text-gray-100 rounded-tr-none'
                          : 'bg-[#202c33] text-gray-100 rounded-tl-none'
                      }`}
                    >
                      {!isMe && (
                        <div className="text-xs font-bold text-pink-400 mb-0.5">{msg.sender}</div>
                      )}

                      {msg.type === 'audio' ? (
                        <div className="flex items-center gap-3 py-1 min-w-[180px]">
                          <button
                            type="button"
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md cursor-pointer"
                          >
                            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                          <div className="flex-1 space-y-1">
                            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                              <div className={`h-full bg-emerald-400 rounded-full ${isPlayingAudio ? 'w-3/4 transition-all duration-3000' : 'w-1/4'}`} />
                            </div>
                            <div className="text-[10px] text-emerald-200 flex justify-between font-mono">
                              <span>Voice Note</span>
                              <span>{msg.duration}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs font-medium leading-relaxed">{msg.text}</p>
                      )}

                      <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-300 mt-1 font-mono">
                        <span>{msg.time}</span>
                        {isMe && <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-[#1f2c34] flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your love message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 py-2.5 px-4 bg-[#2a3942] border-none rounded-2xl text-xs text-white placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-500 cursor-pointer"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center justify-center gap-2 max-w-sm mx-auto mt-6">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share 10k Wall</span>
          </button>
        </div>
      </div>
    </WorldShell>
  );
}
