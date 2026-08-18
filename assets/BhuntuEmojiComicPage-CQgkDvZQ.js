import{n as e,s as t,t as n}from"./jsx-runtime-B5yqYJvp.js";import{t as r}from"./arrow-left-Zt0RJV2w.js";import{t as i}from"./refresh-cw-BnfYtjuO.js";import{t as a}from"./share-2-B8lo7Psy.js";import{a as o,b as s,c,g as l,s as u,u as d,v as f,y as p}from"./index--ylBhzAw.js";import{t as m}from"./confetti.module-Uxh4CK4s.js";import{t as h}from"./whatsappHelper-C-BTVrT0.js";var g=t(e(),1),_=n(),v=`Today is...(as beautiful as other days(but you realize(another year has gone(in a blink of an eye(however...(Do you know..?(today is just special(so special to you & Abu(that's why...(Let's make it...(the best celebration ever(and let me share...(a piece of happiness to you(I made all this...(as a birthday present for Queen Sanzu(Nepalgunj 🇳🇵 to Sakai, Osaka 🇯🇵(thanks for the love we made(thanks for everything, Bebo(I wish you all the best(May your life be at ease(May all your wishes come true(Remember...(our October 28 proposal vow 💍(you live as a free bird...(flying in the blue sky(Now things are different...(real story of your life(is just about to begin(indeed..(but...(don't worry(because...(Abu & God has your back(and this year will be better(and I hope(you'll find...(happiness along the way(keep your spirit up(enjoy every single moment...(that you experience today(fill it with your most beautiful smile(and make it the best memory..(lastly...(I'd like to wish you one more time(a very happy birthday babyy ❤️`.split(`(`);function y(){let{triggerHaptic:e}=d(),[t,n]=(0,g.useState)(0),[y,b]=(0,g.useState)(0),[x,S]=(0,g.useState)(!1),[C,w]=(0,g.useState)(()=>Math.floor(Math.random()*l.length)),T=l[C%l.length]||l[0];(0,g.useEffect)(()=>{if(t===8&&!x)if(y<v.length-1){let e=setTimeout(()=>{b(e=>e+1)},1800);return()=>clearTimeout(e)}else S(!0),o(),c(),m({particleCount:120,spread:90,origin:{y:.5}})},[t,y,x]);let E=()=>{u(),e(15),t===0?(o(),n(1)):t===1?(c(),n(2)):t===2?n(3):t===3?n(4):t===4?n(5):t===5?(c(),n(6)):t===6?(n(7),m({particleCount:85,spread:70,origin:{y:.5}})):t===7&&(n(8),b(0))};return(0,_.jsxs)(`div`,{className:`shizuka-bday-root ${t>=1?`shizuka-peach`:`shizuka-dark`}`,children:[(0,_.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Signika:wght@600;700&family=Nunito:wght@700;800&display=swap');

        .shizuka-bday-root {
          min-height: 100vh;
          font-family: 'Signika', sans-serif;
          position: relative;
          overflow-x: hidden;
          padding: 2rem 1rem 6rem;
          transition: background-color 2s ease;
          user-select: none;
        }

        .shizuka-dark {
          background-color: #0d0d11;
          color: #ffffff;
        }

        .shizuka-peach {
          background-color: #FFDAB9;
          animation: shizukaPeachPulse 8s infinite ease-in-out;
          color: #333333;
        }

        @keyframes shizukaPeachPulse {
          0% { background-color: #FFDAB9; }
          25% { background-color: #FFE4B5; }
          50% { background-color: #FFDAB9; }
          75% { background-color: #FFEFD5; }
          100% { background-color: #FFDAB9; }
        }

        /* BULB HOLDERS & BULBS */
        .shizuka-bulbs-row {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .shizuka-bulb {
          width: 24px;
          height: 36px;
          border-radius: 50%;
          background: #444;
          transition: all 0.5s ease;
          position: relative;
        }

        .shizuka-bulb::before {
          content: '';
          position: absolute;
          top: -8px;
          left: 7px;
          width: 10px;
          height: 8px;
          background: #222;
        }

        .shizuka-bulb-glow-yellow { background: #ffd700; box-shadow: 0 0 30px 10px #ffd700; }
        .shizuka-bulb-glow-red { background: #ff4500; box-shadow: 0 0 30px 10px #ff4500; }
        .shizuka-bulb-glow-blue { background: #1e90ff; box-shadow: 0 0 30px 10px #1e90ff; }
        .shizuka-bulb-glow-green { background: #32cd32; box-shadow: 0 0 30px 10px #32cd32; }
        .shizuka-bulb-glow-pink { background: #ff69b4; box-shadow: 0 0 30px 10px #ff69b4; }
        .shizuka-bulb-glow-orange { background: #ffa500; box-shadow: 0 0 30px 10px #ffa500; }

        /* BANNER */
        .shizuka-banner {
          max-width: 550px;
          margin: 0 auto 2rem;
          transform: translateY(-100px);
          opacity: 0;
          transition: all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .shizuka-banner-come {
          transform: translateY(0);
          opacity: 1;
        }

        /* FLOATING BALLOONS */
        .shizuka-balloons-container {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }

        .shizuka-balloon {
          width: 45px;
          height: 55px;
          border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.4rem;
          color: white;
          box-shadow: inset -5px -5px 10px rgba(0,0,0,0.15);
          animation: shizukaFloat 3s ease-in-out infinite alternate;
        }

        @keyframes shizukaFloat {
          0% { transform: translateY(0) rotate(-4deg); }
          100% { transform: translateY(-15px) rotate(4deg); }
        }

        /* 3D BIRTHDAY CAKE & CANDLE FLAMES */
        .shizuka-cake-box {
          position: relative;
          width: 280px;
          height: 260px;
          margin: 0 auto 2rem;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          padding: 1.5rem;
          display: flex;
          flex-col;
          align-items: center;
          justify-content: center;
        }

        .shizuka-cake-photo {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 4px solid #ff69b4;
          object-fit: cover;
          box-shadow: 0 5px 15px rgba(255, 105, 180, 0.4);
        }

        .shizuka-velas {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .shizuka-candlestick {
          width: 10px;
          height: 35px;
          background: repeating-linear-gradient(45deg, #ff69b4, #ff69b4 5px, #ffffff 5px, #ffffff 10px);
          border-radius: 4px;
          position: relative;
        }

        .shizuka-fuego {
          width: 14px;
          height: 22px;
          background: #ffd700;
          border-radius: 50% 50% 20% 20%;
          position: absolute;
          top: -20px;
          left: -2px;
          box-shadow: 0 0 15px #ff4500;
          animation: shizukaFuego 1.2s infinite ease-in-out alternate;
        }

        @keyframes shizukaFuego {
          0% { transform: scale(0.9) rotate(-3deg); }
          100% { transform: scale(1.15) rotate(3deg); }
        }

        /* BOTTOM NAVBAR BUTTONS */
        .shizuka-navbar {
          position: fixed;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          width: 90%;
          max-width: 450px;
        }

        .shizuka-btn {
          width: 100%;
          padding: 1rem;
          font-size: 1.15rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          color: white;
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .shizuka-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.6);
        }
      `}),(0,_.jsxs)(`a`,{href:`#/`,className:`fixed top-4 left-4 z-50 bg-white/90 text-pink-600 px-4 py-2 rounded-full border border-pink-300 shadow-md font-bold text-xs flex items-center gap-1.5 hover:bg-white transition-all`,children:[(0,_.jsx)(r,{className:`w-4 h-4`}),(0,_.jsx)(`span`,{children:`Back to Home`})]}),(0,_.jsxs)(`div`,{className:`max-w-xl mx-auto text-center pt-8`,children:[(0,_.jsxs)(`div`,{className:`shizuka-bulbs-row`,children:[(0,_.jsx)(`div`,{className:`shizuka-bulb ${t>=1?`shizuka-bulb-glow-yellow`:``}`}),(0,_.jsx)(`div`,{className:`shizuka-bulb ${t>=1?`shizuka-bulb-glow-red`:``}`}),(0,_.jsx)(`div`,{className:`shizuka-bulb ${t>=1?`shizuka-bulb-glow-blue`:``}`}),(0,_.jsx)(`div`,{className:`shizuka-bulb ${t>=1?`shizuka-bulb-glow-green`:``}`}),(0,_.jsx)(`div`,{className:`shizuka-bulb ${t>=1?`shizuka-bulb-glow-pink`:``}`}),(0,_.jsx)(`div`,{className:`shizuka-bulb ${t>=1?`shizuka-bulb-glow-orange`:``}`})]}),(0,_.jsx)(`div`,{className:`shizuka-banner ${t>=3?`shizuka-banner-come`:``}`,children:(0,_.jsx)(`div`,{className:`bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white font-extrabold text-2xl sm:text-3xl py-3 px-6 rounded-2xl shadow-xl tracking-wider uppercase font-serif`,children:`🎉 Happy Birthday Sanzu 🎉`})}),t>=4&&(0,_.jsx)(`div`,{className:`shizuka-balloons-container`,children:[`H`,`A`,`P`,`P`,`Y`,``,`B`,`D`,`A`,`Y`].map((e,t)=>(0,_.jsx)(`div`,{className:`shizuka-balloon`,style:{backgroundColor:[`#ff4757`,`#ffa502`,`#2ed573`,`#1e90ff`,`#9b59b6`][t%5],animationDelay:`${t*.2}s`},children:e},t))}),t>=5&&t<8&&(0,_.jsxs)(p.div,{initial:{opacity:0,scale:.8},animate:{opacity:1,scale:1},className:`shizuka-cake-box`,children:[(0,_.jsx)(`div`,{className:`shizuka-velas`,children:[0,1,2,3,4].map(e=>(0,_.jsx)(`div`,{className:`shizuka-candlestick`,children:t>=6&&(0,_.jsx)(`div`,{className:`shizuka-fuego`})},e))}),(0,_.jsx)(`img`,{src:T,alt:`Queen Sanzu Cake Photo`,onError:e=>f(e,C),className:`shizuka-cake-photo object-contain object-center brightness-110 contrast-105 saturate-105`})]}),t===8&&(0,_.jsx)(p.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},className:`p-8 rounded-3xl bg-white/90 border-4 border-pink-400 shadow-2xl space-y-6 max-w-md mx-auto my-4 text-stone-900`,children:x?(0,_.jsxs)(`div`,{className:`space-y-6`,children:[(0,_.jsx)(`h2`,{className:`text-3xl font-black text-pink-600 font-serif`,children:`A Very Happy Birthday Bebo! ❤️`}),(0,_.jsx)(`div`,{className:`w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl bg-black`,children:(0,_.jsx)(`img`,{src:T,alt:`Storylane Sanzu Photo`,onError:e=>f(e,C),className:`w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105`})}),(0,_.jsx)(`p`,{className:`text-sm font-semibold text-stone-700 leading-relaxed`,children:`"May all your dreams come true, Queen Sanzu. Nepalgunj 🇳🇵 & Sakai, Osaka 🇯🇵 are forever connected!"`}),(0,_.jsxs)(`div`,{className:`flex items-center justify-center gap-2 pt-2`,children:[(0,_.jsxs)(`button`,{type:`button`,onClick:()=>{u(),e(10),n(0),b(0),S(!1)},className:`py-3 px-5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5`,children:[(0,_.jsx)(i,{className:`w-4 h-4`}),(0,_.jsx)(`span`,{children:`Replay Celebration`})]}),(0,_.jsxs)(`button`,{type:`button`,onClick:()=>{c(),h(`🎂 HAPPY BIRTHDAY QUEEN SANZU 🎂

"A very happy birthday babyy ❤️"
From Abu with eternal love!

Happy Birthday Bebo! 🎂💖`)},className:`py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg cursor-pointer flex items-center justify-center gap-1.5`,children:[(0,_.jsx)(a,{className:`w-4 h-4`}),(0,_.jsx)(`span`,{children:`Share Wishes 💝`})]})]})]}):(0,_.jsx)(`div`,{className:`min-h-[120px] flex items-center justify-center`,children:(0,_.jsx)(s,{mode:`wait`,children:(0,_.jsxs)(p.p,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.9},className:`text-xl font-extrabold text-pink-600 leading-relaxed font-serif`,children:[`"`,v[y],`"`]},y)})})})]}),(0,_.jsxs)(`div`,{className:`shizuka-navbar`,children:[t===0&&(0,_.jsx)(`button`,{type:`button`,onClick:E,className:`shizuka-btn bg-gradient-to-r from-amber-500 to-yellow-500`,children:`💡 Turn On Lights`}),t===1&&(0,_.jsx)(`button`,{type:`button`,onClick:E,className:`shizuka-btn bg-gradient-to-r from-purple-500 to-indigo-500`,children:`🎵 Play the Music Buddy`}),t===2&&(0,_.jsx)(`button`,{type:`button`,onClick:E,className:`shizuka-btn bg-gradient-to-r from-pink-500 to-rose-500`,children:`🎀 Let's Decorate`}),t===3&&(0,_.jsx)(`button`,{type:`button`,onClick:E,className:`shizuka-btn bg-gradient-to-r from-cyan-500 to-blue-500`,children:`🎈 Calm, i got you some balloons`}),t===4&&(0,_.jsx)(`button`,{type:`button`,onClick:E,className:`shizuka-btn bg-gradient-to-r from-emerald-500 to-teal-500`,children:`🎂 Cake? of course!`}),t===5&&(0,_.jsx)(`button`,{type:`button`,onClick:E,className:`shizuka-btn bg-gradient-to-r from-amber-500 to-orange-500`,children:`🕯️ Don't forget to Light the Candle`}),t===6&&(0,_.jsx)(`button`,{type:`button`,onClick:E,className:`shizuka-btn bg-gradient-to-r from-pink-500 to-purple-500`,children:`🎉 Happy Birthday`}),t===7&&(0,_.jsx)(`button`,{type:`button`,onClick:E,className:`shizuka-btn bg-gradient-to-r from-rose-500 to-red-500`,children:`💌 A message for you`})]})]})}function b(){return(0,_.jsx)(y,{})}export{b as default};