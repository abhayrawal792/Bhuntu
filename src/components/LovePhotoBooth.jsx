import WorldShell from './WorldShell';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Camera, Heart, Sparkles, Image as ImageIcon, Video, Upload, Send, RefreshCw, FlipHorizontal } from 'lucide-react';
import { BHUNTU_PHOTOS, getAssetUrl, handlePhotoError } from '../utils/mediaUtils';
import { playSparkle, playPop, playBloom } from './AudioController';
import { useAppStore } from '../store/useAppStore';
import { sendWhatsAppMessage } from '../utils/whatsappHelper';

const FRAMES = [
  { name: 'Rose Romance 🌹', bg: 'bg-rose-50 border-rose-300', text: 'text-rose-600' },
  { name: 'Vintage Polaroid 📸', bg: 'bg-amber-50 border-amber-300', text: 'text-amber-700' },
  { name: 'Neon Party 🥳', bg: 'bg-purple-950 border-purple-500 text-white', text: 'text-purple-300' },
  { name: 'Sakura Blossom 🌸', bg: 'bg-pink-100 border-pink-300', text: 'text-pink-600' },
];

const STICKERS = ['👑', '💖', '🎂', '🎉', '🌸', '🧸', '💋', '✨', '🎀'];

export default function LovePhotoBooth() {
  const { triggerHaptic } = useAppStore();
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(() => Math.floor(Math.random() * BHUNTU_PHOTOS.length));
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [activeStickers, setActiveStickers] = useState([]);
  const [customCaption, setCustomCaption] = useState('Happy Birthday Sanzu! 🎂💖');
  const [flash, setFlash] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startCamera = async () => {
    playSparkle();
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        triggerHaptic(20);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera access denied or unavailable. You can also upload a photo!");
      setIsCameraActive(false);
    }
  };

  const handleCaptureLivePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    playBloom();
    triggerHaptic([40, 80, 40]);

    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;

    const ctx = canvas.getContext('2d');
    // Mirror horizontally for selfie mode
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/png');
    setCapturedPhotoUrl(dataUrl);
    stopCameraStream();
    setIsCameraActive(false);

    confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 } });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    playBloom();
    triggerHaptic(20);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCapturedPhotoUrl(event.target.result);
        stopCameraStream();
        setIsCameraActive(false);
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.5 } });
      }
    };
    reader.readAsDataURL(file);
  };

  const addSticker = (emoji) => {
    playSparkle();
    triggerHaptic(10);
    setActiveStickers(prev => [...prev, {
      id: Date.now() + Math.random(),
      emoji,
      x: 20 + Math.random() * 60,
      y: 20 + Math.random() * 60,
    }]);
  };

  const frame = FRAMES[selectedFrame];
  const photoSrc = capturedPhotoUrl || BHUNTU_PHOTOS[photoIdx % BHUNTU_PHOTOS.length];

  return (
    <WorldShell
      theme="retro"
      badge="Live Polaroid Photo Booth 📸🎥"
      badgeIcon={<Camera className="w-3.5 h-3.5 text-rose-500 animate-bounce" />}
      title="Sanzu's Live Polaroid Photo Booth 📸"
      subtitle="Click a live photo using your camera, customize your Polaroid with sticker badges & send your live birthday photo to Abu!"
      description="100% interactive live camera photo booth with real photo capture & WhatsApp sharing!"
    >

      <div className="max-w-3xl mx-auto space-y-6 font-ui">

        {/* Hidden Canvas for Live Screen Capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />

        {/* Frame Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {FRAMES.map((f, i) => (
            <button
              key={i}
              onClick={() => { playPop(); setSelectedFrame(i); }}
              className={`px-3 py-1.5 rounded-xl font-black text-xs cursor-pointer transition-all ${
                selectedFrame === i ? 'bg-rose-500 text-white shadow-md scale-105' : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        {/* Camera Flash Overlay */}
        {flash && (
          <div
            className="fixed inset-0 bg-white z-50 animate-ping pointer-events-none"
            style={{ paddingTop: 'max(env(safe-area-inset-top), 1rem)', paddingBottom: 'max(env(safe-area-inset-bottom), 1.5rem)' }}
          />
        )}

        {/* POLAROID CARD CONTAINER */}
        <div className={`w-72 sm:w-80 mx-auto p-4 sm:p-5 rounded-3xl border-4 shadow-2xl relative overflow-hidden flex flex-col justify-between ${frame.bg}`}>

          {/* Photo Preview / Live Camera Stream Box */}
          <div className="w-full h-72 rounded-2xl bg-black border-2 border-white/80 relative overflow-hidden flex items-center justify-center shadow-inner">
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <img
                src={photoSrc}
                onError={e => handlePhotoError(e, photoIdx)}
                alt="Polaroid Memory"
                className="w-full h-full object-cover"
              />
            )}

            {/* Live Camera Tag Badge */}
            {isCameraActive && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" /> LIVE CAMERA
              </div>
            )}

            {/* Draggable Active Stickers */}
            {activeStickers.map(s => (
              <motion.span
                key={s.id}
                drag
                dragConstraints={{ top: -100, left: -100, right: 100, bottom: 100 }}
                className="absolute text-3xl cursor-grab active:cursor-grabbing drop-shadow-md select-none"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                {s.emoji}
              </motion.span>
            ))}
          </div>

          {/* Custom Caption Input */}
          <div className="text-center pt-3 pb-1">
            <input
              type="text"
              value={customCaption}
              onChange={(e) => setCustomCaption(e.target.value)}
              placeholder="Write a message for Abu..."
              className={`w-full text-center bg-transparent border-b-2 border-rose-300 text-xs font-black outline-none focus:border-rose-500 py-1 ${frame.text}`}
            />
          </div>
        </div>

        {/* CAMERA & PHOTO ACTION CONTROLS */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
          {isCameraActive ? (
            <button
              onClick={handleCaptureLivePhoto}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 via-rose-500 to-pink-600 text-white font-black text-xs shadow-xl hover:scale-104 cursor-pointer flex items-center gap-2 animate-bounce"
            >
              <Camera className="w-4 h-4 fill-white" /> Take Live Photo 📸
            </button>
          ) : (
            <button
              onClick={startCamera}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-xs shadow-lg hover:scale-102 cursor-pointer flex items-center gap-1.5"
            >
              <Video className="w-4 h-4" /> Turn On Live Camera 🎥
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-full bg-amber-100 text-amber-800 font-bold text-xs hover:bg-amber-200 cursor-pointer flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" /> Upload Photo 📁
          </button>

          <button
            onClick={() => { playPop(); setCapturedPhotoUrl(null); setPhotoIdx((prev) => (prev + 1) % BHUNTU_PHOTOS.length); }}
            className="px-4 py-2.5 rounded-full bg-pink-100 text-pink-800 font-bold text-xs hover:bg-pink-200 cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Another Photo 🎲
          </button>
        </div>

        {cameraError && (
          <p className="text-xs text-rose-600 font-bold text-center">{cameraError}</p>
        )}

        {/* STICKER BAR */}
        <div className="glass-card p-3 rounded-2xl border border-pink-200 bg-white/80 max-w-md mx-auto text-center space-y-1">
          <span className="text-[11px] font-black text-gray-700 block">Tap Stickers to Add onto Polaroid:</span>
          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            {STICKERS.map((st, i) => (
              <button
                key={i}
                onClick={() => addSticker(st)}
                className="text-2xl hover:scale-130 transition-transform cursor-pointer"
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* ALWAYS VISIBLE WHATSAPP SENDER */}
        <div className="max-w-md mx-auto pt-2">
          <button
            onClick={() => {
              const captionText = customCaption.trim() ? customCaption.trim() : "Happy Birthday Abu! 🎂💖";
              sendWhatsAppMessage(`📸 Hey Abu! I snapped a live Polaroid photo for you on our site!\n\nCaption: "${captionText}"\n\n💖 Captured with love by your Sanzu! ✨`, '📸 Live Polaroid Photo Booth');
            }}
            className="w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 font-ui"
          >
            <Send className="w-4 h-4 fill-white animate-bounce" />
            <span>Send Live Photo to Abu on WhatsApp 📲</span>
          </button>
        </div>

      </div>
    </WorldShell>
  );
}
