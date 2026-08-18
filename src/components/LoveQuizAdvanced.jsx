import React, { useState } from 'react';

const QUESTIONS = [
  { reporter: 'BBC Romance', q: 'Abu, how much do you love Bhuntu on a scale of 1 to 10?', ans: 'Abu: "10 is too small. Infinity times infinity!"' },
  { reporter: 'Tokyo Daily', q: 'What is your favorite memory together so far?', ans: 'Abu: "Every single minute spent talking to her."' },
  { reporter: 'Nepal Journal', q: 'What are your future plans with Bhuntu?', ans: 'Abu: "To make her happy every single day for the rest of our lives."' },
];

export default function LoveQuizAdvanced() {
  const [qIdx, setQIdx] = useState(0);

  const nextQuestion = () => {
    setQIdx(i => (i + 1) % QUESTIONS.length);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #18181b 0%, #09090b 100%)',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56 }}>🎙️</div>
        <h1 style={{ color: '#38bdf8', fontSize: 26, fontWeight: 900, margin: '8px 0 4px' }}>
          Abu's Press Conference
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>
          Reporters ask Abu questions about Bhuntu at a live press conference! 🎤📰
        </p>
      </div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: 360, height: 220,
        background: 'rgba(255,255,255,0.03)', border: '3px solid #38bdf8',
        borderRadius: 24, padding: 20, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        marginBottom: 24, boxShadow: '0 0 35px rgba(56,189,248,0.2)',
      }}>
        <div style={{ color: '#38bdf8', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', marginBottom: 6 }}>
          🎤 {QUESTIONS[qIdx].reporter} asks:
        </div>
        <div style={{ color: '#fff', fontSize: 15, fontWeight: 800, marginBottom: 12 }}>
          "{QUESTIONS[qIdx].q}"
        </div>
        <div style={{ color: '#7dd3fc', fontSize: 14, fontStyle: 'italic', lineHeight: 1.5 }}>
          {QUESTIONS[qIdx].ans}
        </div>
      </div>

      <button onClick={nextQuestion} style={{
        background: 'linear-gradient(135deg, #0284c7, #38bdf8)', border: 'none', color: '#fff',
        padding: '16px 44px', borderRadius: 28, fontSize: 16, fontWeight: 900, cursor: 'pointer',
        boxShadow: '0 0 25px rgba(56,189,248,0.4)',
      }}>
        🎙️ Next Reporter Question!
      </button>
    </div>
  );
}
