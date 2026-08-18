import React, { useState } from 'react';

const MESSAGES = [
  { subject: 'Open when you miss me... 🌧️', body: 'Bhuntu, close your eyes and take a deep breath. Imagine my arms around you right now. I love you!' },
  { subject: 'Open when you need a smile... 😊', body: 'Remember when we couldn\'t stop laughing on that video call until our bellies hurt? I cherish you!' },
  { subject: 'Open before sleeping... 🌙', body: 'Goodnight my sweet Bhuntu. Rest well. I\'ll meet you in our dreams!' },
];

export default function LoveJarNotes() {
  const [activeMsg, setActiveMsg] = useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1e1b4b 0%, #0f172a 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>📥</div>
        <h1 style={{ color: '#a78bfa', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Abu's Secret Inbox
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Open sealed messages written specifically for different moments! 💌
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, width: '100%', maxWidth: 360, marginBottom: 24 }}>
        {MESSAGES.map((m, idx) => (
          <button key={idx} onClick={() => setActiveMsg(idx)} style={{
            background: activeMsg === idx ? 'rgba(167,139,250,0.2)' : 'rgba(255,255,255,0.05)',
            border: `2px solid ${activeMsg === idx ? '#a78bfa' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 18, padding: '16px 14px', cursor: 'pointer', textAlign: 'left',
            color: '#fff', fontSize: 14, fontWeight: 800,
          }}>
            📩 {m.subject}
          </button>
        ))}
      </div>

      {activeMsg !== null && (
        <div style={{
          width: '100%', maxWidth: 360, background: 'rgba(167,139,250,0.15)',
          border: '2px solid #a78bfa', borderRadius: 24, padding: '20px', textAlign: 'center',
          animation: 'slideUp 0.3s ease',
        }}>
          <div style={{ color: '#a78bfa', fontSize: 16, fontWeight: 900, marginBottom: 8 }}>
            {MESSAGES[activeMsg].subject}
          </div>
          <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
            "{MESSAGES[activeMsg].body}"
          </p>
          <div style={{ color: '#c084fc', fontSize: 12, fontWeight: 700, marginTop: 10 }}>
            — Abu 💙
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(15px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
