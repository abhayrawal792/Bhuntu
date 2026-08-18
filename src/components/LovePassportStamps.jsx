import React, { useState } from 'react';

const PRESETS = [
  "My dearest Bhuntu, you make every ordinary day feel like magic...",
  "To Abu: Distance is just numbers when two hearts beat as one...",
  "Forever yours, through every sunrise in Nepal and sunset in Osaka...",
];

export default function LovePassportStamps() {
  const [text, setText] = useState('');
  const [typedMessage, setTypedMessage] = useState(null);

  const handleType = (val) => {
    setText(val);
    setTypedMessage(null);
  };

  const printLetter = () => {
    if (text.trim()) setTypedMessage(text);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #292524 0%, #1c1917 100%)',
      fontFamily: "'Courier New', Courier, monospace",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 56 }}>✍️</div>
        <h1 style={{ color: '#d97706', fontSize: 24, fontWeight: 900, margin: '8px 0 4px' }}>
          Love Typewriter Studio
        </h1>
        <p style={{ color: '#a8a29e', fontSize: 13, fontFamily: "'Segoe UI', sans-serif" }}>
          Type a vintage love letter with authentic typewriter vibes! 📜
        </p>
      </div>

      {/* Typewriter Paper */}
      <div style={{
        width: '100%', maxWidth: 380, minHeight: 220,
        background: '#fef3c7', color: '#451a03', border: '3px solid #b45309',
        borderRadius: 8, padding: 20, boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
        marginBottom: 20, position: 'relative',
      }}>
        <div style={{ borderBottom: '1px solid #d97706', paddingBottom: 8, marginBottom: 12, fontSize: 12, fontWeight: 800, color: '#78350f' }}>
          PARIS / OSAKA / NEPALGUNJ • VINTAGE TYPEWRITER NO. 1928
        </div>
        <textarea
          value={text}
          onChange={e => handleType(e.target.value)}
          placeholder="Start typing your romantic letter..."
          rows={6}
          style={{
            width: '100%', background: 'transparent', border: 'none', outline: 'none',
            fontFamily: "'Courier New', Courier, monospace", fontSize: 14, color: '#451a03',
            resize: 'none', lineHeight: 1.6,
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 380, marginBottom: 16 }}>
        {PRESETS.map((p, idx) => (
          <button key={idx} onClick={() => setText(p)} style={{
            background: 'rgba(217,119,6,0.15)', border: '1px solid #d97706',
            color: '#fef3c7', borderRadius: 12, padding: '6px 10px', fontSize: 11,
            cursor: 'pointer', fontFamily: "'Segoe UI', sans-serif",
          }}>
            Preset #{idx + 1}
          </button>
        ))}
      </div>

      <button onClick={printLetter} disabled={!text.trim()} style={{
        background: 'linear-gradient(135deg, #d97706, #b45309)', border: 'none', color: '#fff',
        padding: '14px 36px', borderRadius: 24, fontSize: 15, fontWeight: 800, cursor: 'pointer',
        boxShadow: '0 0 20px rgba(217,119,6,0.4)', fontFamily: "'Segoe UI', sans-serif",
      }}>
        📜 Seal & Stamp Letter
      </button>

      {typedMessage && (
        <div style={{
          marginTop: 20, width: '100%', maxWidth: 380,
          background: 'rgba(251,191,36,0.15)', border: '2px solid #f59e0b',
          borderRadius: 16, padding: '16px', textAlign: 'center', color: '#fef3c7',
          fontFamily: "'Segoe UI', sans-serif", fontSize: 14,
        }}>
          💌 Letter sealed & delivered to Abu's heart!
        </div>
      )}
    </div>
  );
}
