import React, { useState } from 'react';

const CHARMS = [
  { name: 'Classic Blue Eye 🧿', meaning: 'Protects Abu & Bhuntu from envy & bad vibes', color: '#2563eb' },
  { name: 'Golden Sun Charm ☀️', meaning: 'Brings warmth & bright days to your bond', color: '#f59e0b' },
  { name: 'Red Ruby Heart ❤️', meaning: 'Shields your passion & deep affection', color: '#ef4444' },
  { name: 'Silver Star ⭐️', meaning: 'Guides your long-distance steps between Nepal & Japan', color: '#e2e8f0' },
];

export default function LoveHoroscopeDaily() {
  const [talisman, setTalisman] = useState([]);
  const [isBlessed, setIsBlessed] = useState(false);

  const addCharm = (c) => {
    if (talisman.length >= 4) return;
    setTalisman(t => [...t, c]);
    setIsBlessed(false);
  };

  const bless = () => setIsBlessed(true);
  const reset = () => { setTalisman([]); setIsBlessed(false); };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0b1329 0%, #1c2b4e 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🪬</div>
        <h1 style={{ color: '#60a5fa', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Evil Eye Protection
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Craft an evil eye talisman to keep Abu & Bhuntu safe forever! 🧿
        </p>
      </div>

      <div style={{
        position: 'relative', width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, #1e3a8a 0%, #0f172a 100%)',
        border: '4px solid #60a5fa', boxShadow: '0 0 35px rgba(96,165,250,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, padding: 16,
      }}>
        {talisman.length === 0 ? (
          <div style={{ color: '#93c5fd', fontSize: 14, textAlign: 'center' }}>
            Tap charms below to build your talisman... 🪬
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
            {talisman.map((c, i) => (
              <div key={i} style={{ fontSize: 36, filter: `drop-shadow(0 0 8px ${c.color})` }}>
                {c.name.split(' ').pop()}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, width: '100%', maxWidth: 380, marginBottom: 24 }}>
        {CHARMS.map(c => (
          <button key={c.name} onClick={() => addCharm(c)} style={{
            background: `${c.color}20`, border: `2px solid ${c.color}`,
            borderRadius: 16, padding: '12px 8px', cursor: 'pointer', textAlign: 'center',
            color: '#fff', fontSize: 13, fontWeight: 700,
          }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{c.name.split(' ').pop()}</div>
            {c.name.split(' ').slice(0, -1).join(' ')}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={reset} style={{
          background: 'rgba(255,255,255,0.1)', border: '1px solid #64748b',
          color: '#cbd5e1', padding: '12px 24px', borderRadius: 20, cursor: 'pointer', fontWeight: 600,
        }}>
          Reset
        </button>
        <button onClick={bless} disabled={talisman.length === 0} style={{
          background: talisman.length > 0 ? 'linear-gradient(135deg, #2563eb, #60a5fa)' : 'rgba(255,255,255,0.1)',
          border: 'none', color: '#fff', padding: '12px 32px', borderRadius: 20, cursor: 'pointer',
          fontWeight: 800, boxShadow: talisman.length > 0 ? '0 0 20px rgba(96,165,250,0.4)' : 'none',
        }}>
          🪬 Bless Talisman!
        </button>
      </div>

      {isBlessed && (
        <div style={{
          marginTop: 24, width: '100%', maxWidth: 380,
          background: 'rgba(96,165,250,0.15)', border: '2px solid #60a5fa',
          borderRadius: 24, padding: '20px', textAlign: 'center', animation: 'fadeIn 0.4s ease',
        }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>✨🧿</div>
          <h3 style={{ color: '#60a5fa', fontSize: 20, fontWeight: 900, margin: '4px 0' }}>
            Protected Forever!
          </h3>
          <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6 }}>
            Your custom evil eye charm is active! No negative energy can ever touch Abu & Bhuntu's love story.
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  );
}
