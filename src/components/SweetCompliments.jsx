import React, { useState } from 'react';

const GIFTS = [
  { name: 'Giant Plush Teddy 🧸', color: '#ec4899', desc: 'Warm & soft, perfect for hugging when Abu is away!' },
  { name: 'Diamond Heart Necklace 💎', color: '#38bdf8', desc: 'Sparkles as bright as Bhuntu\'s smile!' },
  { name: 'Box of Osaka Chocolates 🍫', color: '#f59e0b', desc: 'Sweet treats imported straight from Japan!' },
];

export default function SweetCompliments() {
  const [giftIdx, setGiftIdx] = useState(0);
  const [isUnwrapped, setIsUnwrapped] = useState(false);

  const unwrap = () => setIsUnwrapped(true);
  const nextGift = () => {
    setGiftIdx(i => (i + 1) % GIFTS.length);
    setIsUnwrapped(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🎁</div>
        <h1 style={{ color: '#ec4899', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Gift Wrapper
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Unwrap virtual surprise gifts wrapped by Abu! 🎁💖
        </p>
      </div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: 360, height: 220,
        background: 'rgba(255,255,255,0.05)', border: '3px solid #ec4899',
        borderRadius: 24, padding: 20, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        marginBottom: 24, boxShadow: '0 0 35px rgba(236,72,153,0.25)',
      }}>
        {!isUnwrapped ? (
          <div>
            <div style={{ fontSize: 72, marginBottom: 8, animation: 'shake 1s infinite alternate' }}>🎁</div>
            <div style={{ color: '#ec4899', fontSize: 15, fontWeight: 800 }}>Wrapped Gift #{giftIdx + 1}</div>
          </div>
        ) : (
          <div style={{ animation: 'popIn 0.3s ease' }}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>{GIFTS[giftIdx].name.split(' ').pop()}</div>
            <div style={{ color: GIFTS[giftIdx].color, fontSize: 18, fontWeight: 900, marginBottom: 6 }}>
              {GIFTS[giftIdx].name}
            </div>
            <div style={{ color: '#e2e8f0', fontSize: 14 }}>"{GIFTS[giftIdx].desc}"</div>
          </div>
        )}
      </div>

      {!isUnwrapped ? (
        <button onClick={unwrap} style={{
          background: 'linear-gradient(135deg, #db2777, #ec4899)', border: 'none', color: '#fff',
          padding: '16px 44px', borderRadius: 28, fontSize: 17, fontWeight: 900, cursor: 'pointer',
          boxShadow: '0 0 25px rgba(236,72,153,0.4)',
        }}>
          🎁 Unwrap Gift!
        </button>
      ) : (
        <button onClick={nextGift} style={{
          background: 'rgba(255,255,255,0.1)', border: '1px solid #ec4899', color: '#ec4899',
          padding: '12px 28px', borderRadius: 20, fontSize: 14, fontWeight: 800, cursor: 'pointer',
        }}>
          🎁 Next Gift
        </button>
      )}

      <style>{`
        @keyframes shake { 0%{transform:rotate(-4deg)} 100%{transform:rotate(4deg)} }
        @keyframes popIn { from{transform:scale(0)} to{transform:scale(1)} }
      `}</style>
    </div>
  );
}
