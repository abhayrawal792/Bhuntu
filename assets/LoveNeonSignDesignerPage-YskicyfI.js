import{n as e,s as t,t as n}from"./jsx-runtime-B5yqYJvp.js";import{t as r}from"./arrow-left-DtRTMQLs.js";import{t as i}from"./refresh-cw-hvZX0Z9d.js";import{t as a}from"./share-2-Dt4ah25B.js";import{a as o,b as s,c,g as l,s as u,u as d,v as f,y as p}from"./index-DD2rdQ1D.js";import{t as m}from"./confetti.module-Uxh4CK4s.js";import{t as h}from"./whatsappHelper-C-BTVrT0.js";var g=t(e(),1),_=n(),v=[{text:`You’re such a kind, sweet, and wonderful person, Sanzu, and I feel so lucky to share such an eternal bond with you! 💖`,emoji:`🌟`},{text:`May your day be filled with love, laughter, and endless joy across Nepalgunj 🇳🇵 & Sakai, Osaka 🇯🇵! 🌸`,emoji:`💗`},{text:`Wishing you success, happiness, and everything your beautiful heart desires. October 28 proposal vow is sealed! ✨`,emoji:`💕`},{text:`Stay the amazing girl you are—always spreading positivity around. Have the happiest year ahead, Bebo! 🥳`,emoji:`🌟`}];function y(){let{triggerHaptic:e}=d(),[t,n]=(0,g.useState)(`index`),[y,b]=(0,g.useState)(``),[x,S]=(0,g.useState)(0),[C,w]=(0,g.useState)([v[0]]),[T,E]=(0,g.useState)({x:-100,y:-100}),[D,O]=(0,g.useState)(()=>Math.floor(Math.random()*l.length)),k=l[D%l.length]||l[0],A=l[(D+1)%l.length]||l[0],j=l[(D+2)%l.length]||l[0];return(0,g.useEffect)(()=>{if(t===`index`){let e=0;b(``);let t=setInterval(()=>{e<64?(b(t=>t+`Hey You Know What! You're the most adorable human i ever met! 💖`.charAt(e)),e++):clearInterval(t)},50);return()=>clearInterval(t)}},[t]),(0,g.useEffect)(()=>{let e=e=>{E({x:e.clientX,y:e.clientY})};return window.addEventListener(`mousemove`,e),()=>window.removeEventListener(`mousemove`,e)},[]),(0,_.jsxs)(`div`,{className:`hbd-app-root`,children:[(0,_.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Comic+Neue:wght@700&family=Quicksand:wght@500;600&family=Dancing+Script:wght@700&display=swap');

        .hbd-app-root {
          min-height: 100vh;
          background: linear-gradient(-45deg, #ffe6e6, #e6e6ff, #ffebf5, #ffd1dc);
          background-size: 400% 400%;
          animation: hbdGradient 15s ease infinite;
          font-family: 'Quicksand', sans-serif;
          color: #4a4a4a;
          position: relative;
          overflow-x: hidden;
          padding: 2rem 1rem;
        }

        @keyframes hbdGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hbd-custom-cursor {
          width: 30px;
          height: 30px;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transition: transform 0.1s;
        }

        .hbd-custom-cursor svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 5px rgba(255, 182, 193, 0.8));
        }

        .hbd-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .hbd-h1 {
          font-family: 'Bubblegum Sans', cursive;
          font-size: 3.5rem;
          color: #ff69b4;
          text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
          margin-bottom: 1.5rem;
          animation: hbdBounce 1s ease infinite;
        }

        @keyframes hbdBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .hbd-greeting {
          font-family: 'Comic Neue', cursive;
          font-size: 1.5rem;
          color: #8a2be2;
          margin-bottom: 2.5rem;
          min-height: 2.5em;
        }

        .hbd-cta-button {
          background: linear-gradient(45deg, #ff69b4, #ff99cc);
          border: none;
          border-radius: 50px;
          padding: 1rem 2.5rem;
          font-size: 1.25rem;
          color: white;
          cursor: pointer;
          font-family: 'Comic Neue', cursive;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.5);
          transition: all 0.3s ease;
        }

        .hbd-cta-button:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.7);
        }

        .hbd-reason-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 20px;
          padding: 1.8rem;
          margin: 1.2rem auto;
          max-width: 650px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
          text-align: left;
        }

        .hbd-reason-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.2);
        }

        .hbd-reason-text {
          font-size: 1.15rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 1rem;
        }

        .hbd-reason-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
        }

        .hbd-shuffle-button {
          background: linear-gradient(45deg, #ff69b4, #ff99cc);
          border: none;
          border-radius: 50px;
          padding: 1rem 2.5rem;
          font-size: 1.2rem;
          color: white;
          margin: 2rem 0 1rem;
          cursor: pointer;
          font-family: 'Comic Neue', cursive;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
          transition: all 0.3s;
        }

        .hbd-shuffle-button.story-mode {
          background: linear-gradient(45deg, #9b6dff, #ff6dc7);
          transform: scale(1.1);
        }

        .hbd-shuffle-button:hover {
          transform: scale(1.1);
        }

        .hbd-reason-counter {
          font-size: 0.95rem;
          color: #ff69b4;
          font-weight: 600;
          margin-top: 0.5rem;
        }

        .hbd-welcome-section {
          text-align: center;
          padding: 2rem 1rem;
        }

        .hbd-welcome-section h1 {
          font-family: 'Dancing Script', cursive;
          font-size: 3.8rem;
          color: #ff69b4;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .hbd-welcome-section p {
          font-size: 1.2rem;
          max-width: 650px;
          margin: 1rem auto;
          line-height: 1.6;
        }

        .hbd-memory-container {
          max-width: 1050px;
          margin: 2rem auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.8rem;
        }

        .hbd-memory-card {
          background: rgba(255, 255, 255, 0.92);
          border-radius: 20px;
          padding: 1.4rem;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          text-align: left;
        }

        .hbd-memory-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 30px rgba(255, 105, 180, 0.2);
        }

        .hbd-memory-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          border-radius: 14px;
          margin-bottom: 1rem;
        }

        .hbd-memory-date {
          font-family: 'Dancing Script', cursive;
          color: #ff69b4;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .hbd-memory-caption {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #555;
        }

        .hbd-final-message {
          text-align: center;
          padding: 3rem 1.5rem;
          background: rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(10px);
          border-radius: 24px;
          margin-top: 3rem;
          border: 2px border rgba(255, 105, 180, 0.3);
        }

        .hbd-final-message h2 {
          font-family: 'Dancing Script', cursive;
          font-size: 3.2rem;
          color: #ff69b4;
          margin-bottom: 1.5rem;
        }

        .hbd-final-message p {
          font-size: 1.15rem;
          max-width: 750px;
          margin: 0 auto 1.5rem;
          line-height: 1.8;
        }

        .hbd-goodbye-btn {
          display: inline-block;
          padding: 1rem 2.5rem;
          font-size: 1.2rem;
          background: linear-gradient(45deg, #ff69b4, #da70d6);
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          text-decoration: none;
          font-weight: 700;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
          transition: all 0.3s ease;
        }

        .hbd-goodbye-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(255, 105, 180, 0.6);
        }

        @media (max-width: 768px) {
          .hbd-h1 { font-size: 2.3rem; }
          .hbd-greeting { font-size: 1.15rem; }
          .hbd-welcome-section h1 { font-size: 2.6rem; }
          .hbd-final-message h2 { font-size: 2.3rem; }
        }
      `}),(0,_.jsxs)(`a`,{href:`#/`,className:`fixed top-4 left-4 z-50 bg-white/90 text-pink-600 px-4 py-2 rounded-full border border-pink-300 shadow-md font-bold text-xs flex items-center gap-1.5 hover:bg-white transition-all`,children:[(0,_.jsx)(r,{className:`w-4 h-4`}),(0,_.jsx)(`span`,{children:`Back to Home`})]}),(0,_.jsx)(`div`,{className:`hbd-custom-cursor hidden sm:block`,style:{left:`${T.x-15}px`,top:`${T.y-15}px`},children:(0,_.jsx)(`svg`,{viewBox:`0 0 24 24`,children:(0,_.jsx)(`path`,{fill:`#ff69b4`,d:`M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`})})}),t===`index`&&(0,_.jsxs)(`div`,{className:`hbd-container py-12`,children:[(0,_.jsx)(`h1`,{className:`hbd-h1`,children:`Happy Birthday Sanzu💗`}),(0,_.jsxs)(`div`,{className:`hbd-greeting`,children:[`"`,y,`"`]}),(0,_.jsx)(`div`,{className:`w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl mb-8 bg-black`,children:(0,_.jsx)(`img`,{src:k,alt:`Sanzu Entrance Photo`,onError:e=>f(e,D),className:`w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105`})}),(0,_.jsx)(`button`,{type:`button`,onClick:()=>{o(),c(),n(`cause`)},className:`hbd-cta-button`,children:`Click to Enter Our World 💕`})]}),t===`cause`&&(0,_.jsxs)(`div`,{className:`hbd-container py-8`,children:[(0,_.jsx)(`h1`,{className:`hbd-h1`,children:`Why You're My Best Friend! 💖`}),(0,_.jsx)(`div`,{id:`reasons-container`,children:(0,_.jsx)(s,{children:C.map((e,t)=>(0,_.jsxs)(p.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.5,ease:`backOut`},className:`hbd-reason-card`,children:[(0,_.jsxs)(`div`,{className:`hbd-reason-text`,children:[e.emoji,` `,e.text]}),(0,_.jsx)(`img`,{src:l[(D+t)%l.length]||k,alt:`Sanzu Reason Memory`,onError:e=>f(e,D),className:`hbd-reason-img`})]},t))})}),(0,_.jsx)(`button`,{type:`button`,onClick:()=>{if(u(),e(15),x+1<v.length){let e=x+1;S(e),w(t=>[...t,v[e]]),O(Math.floor(Math.random()*l.length))}else o(),c(),e([40,80,120]),n(`last`),m({particleCount:120,spread:90,origin:{y:.5}})},className:`hbd-shuffle-button ${x+1===v.length?`story-mode`:``}`,children:x+1===v.length?`Enter Our Storylane 💫`:`Click Here... 💕`}),(0,_.jsxs)(`div`,{className:`hbd-reason-counter`,children:[`Reason `,x+1,` of `,v.length]})]}),t===`last`&&(0,_.jsxs)(`div`,{className:`hbd-container`,children:[(0,_.jsxs)(`section`,{className:`hbd-welcome-section`,children:[(0,_.jsx)(`h1`,{children:`Our Beautiful Moments Together`}),(0,_.jsx)(`p`,{children:`Every moment spent with you has been magical. Let's cherish these precious memories for Queen Sanzu...`})]}),(0,_.jsxs)(`div`,{className:`hbd-memory-container`,children:[(0,_.jsxs)(`div`,{className:`hbd-memory-card`,children:[(0,_.jsx)(`img`,{src:k,alt:`Her Smile Says It All`,onError:e=>f(e,D),className:`hbd-memory-img`}),(0,_.jsx)(`div`,{className:`hbd-memory-date`,children:`Her Smile Says It All`}),(0,_.jsx)(`div`,{className:`hbd-memory-caption`,children:`You’re truly one of the sweetest girls I know, Sanzu, and I feel so lucky to have you in my life. ❤️`})]}),(0,_.jsxs)(`div`,{className:`hbd-memory-card`,children:[(0,_.jsx)(`img`,{src:A,alt:`Together Vibes`,onError:e=>f(e,D+1),className:`hbd-memory-img`}),(0,_.jsx)(`div`,{className:`hbd-memory-date`,children:`Together Vibes`}),(0,_.jsx)(`div`,{className:`hbd-memory-caption`,children:`May your journey ahead across Nepalgunj 🇳🇵 & Sakai, Osaka 🇯🇵 be filled with happiness, success, and endless smiles. 😊💕`})]}),(0,_.jsxs)(`div`,{className:`hbd-memory-card`,children:[(0,_.jsx)(`img`,{src:j,alt:`Pretty Soul`,onError:e=>f(e,D+2),className:`hbd-memory-img`}),(0,_.jsx)(`div`,{className:`hbd-memory-date`,children:`Pretty Soul`}),(0,_.jsx)(`div`,{className:`hbd-memory-caption`,children:`Keep being the amazing person you are, Bebo—you make every moment brighter. 🌸💖`})]})]}),(0,_.jsxs)(`section`,{className:`hbd-final-message`,children:[(0,_.jsx)(`h2`,{children:`Thank You for the Memories`}),(0,_.jsxs)(`p`,{children:[`Every laugh, every chat, and every moment we’ve shared has been truly special. 💫`,(0,_.jsx)(`br`,{}),`I’m so grateful for the bond we have, and for the positivity you always bring into my life.`,(0,_.jsx)(`br`,{}),`On your birthday, I just wish for endless happiness, love, and success to come your way. 🌸`]}),(0,_.jsx)(`p`,{children:`You deserve all the joy in the world—keep shining and spreading your beautiful energy. ✨`}),(0,_.jsxs)(`div`,{className:`flex flex-col sm:flex-row items-center justify-center gap-3 pt-2`,children:[(0,_.jsxs)(`button`,{type:`button`,onClick:()=>{u(),e(10),n(`index`),S(0),w([v[0]])},className:`hbd-goodbye-btn flex items-center justify-center gap-1.5`,children:[(0,_.jsx)(i,{className:`w-4 h-4`}),(0,_.jsx)(`span`,{children:`Replay Storylane`})]}),(0,_.jsxs)(`button`,{type:`button`,onClick:()=>{c(),h(`💖 HAPPY BIRTHDAY SANZU 💖

Happy Birthday GF Card:
"You're the BESTEST Bebo Ever! 💖"

Happy Birthday Bebo! 🎂💖`)},className:`hbd-goodbye-btn flex items-center justify-center gap-1.5`,children:[(0,_.jsx)(a,{className:`w-4 h-4`}),(0,_.jsx)(`span`,{children:`Share Birthday Wishes 💝`})]})]})]})]})]})}function b(){return(0,_.jsx)(y,{})}export{b as default};