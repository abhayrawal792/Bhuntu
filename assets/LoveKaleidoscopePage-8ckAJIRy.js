import{n as e,s as t,t as n}from"./jsx-runtime-B5yqYJvp.js";import{t as r}from"./arrow-left-B-w0camb.js";import{t as i}from"./arrow-right-BhFkYTH7.js";import{t as a}from"./lock-CpIcmIAS.js";import{t as o}from"./refresh-cw-DYf5Z2OL.js";import{t as s}from"./share-2-g2BChCEz.js";import{a as c,c as l,g as u,s as d,u as f,v as p,y as m}from"./index-Dq6Hy7xR.js";import{t as h}from"./confetti.module-Uxh4CK4s.js";import{t as g}from"./whatsappHelper-C-BTVrT0.js";var _=t(e(),1),v=n(),y={recipientName:`sanzu`,nameHint:`Nickname for Queen Sanzu (e.g. Sanzu, Bebo, Bhuntu)`,soloGalleryTitle:`✨ My Birthday Girl: Queen Sanzu ✨`,togetherGalleryTitle:`💕 Nepalgunj 🇳🇵 to Sakai, Osaka 🇯🇵 Memories 💕`,messageTitle:`To My Favorite Person: Queen Sanzu 💖`,typingTextFirst:`Hey, wait a second!`,typingTextSecond:`This website is only for someone special: Queen Sanzu.`,messageParagraphs:[`Happy Birthday, my love!`,`I hope today is filled with boundless joy, warm laughter, and all the little moments that make you smile. As you step into this new year of your life, may it bring exciting opportunities, meaningful memories, and the confidence to chase everything you dream of.`,`From Nepalgunj 🇳🇵 to Sakai, Osaka 🇯🇵, distance can never shrink the love in Abu's heart. Our October 28, 2025 proposal vow is written in the stars forever.`,`You have so much bright happiness ahead of you, Bebo, and I hope you never stop believing in yourself. May this birthday year be kind to you, rewarding, and full of delicious momos, panipuris, and endless celebrations.`,`Wishing you a beautiful birthday and an even more amazing year to come.`,`- With eternal love, Abu ❤️`]};function b(){let{triggerHaptic:e}=f(),[t,n]=(0,_.useState)(0),[b,x]=(0,_.useState)(`Sanzu`),[S,C]=(0,_.useState)(``),[w,T]=(0,_.useState)(()=>Math.floor(Math.random()*u.length)),E=u[w%u.length]||u[0],D=u[(w+1)%u.length]||u[0],O=u[(w+2)%u.length]||u[0],k=u[(w+3)%u.length]||u[0];(0,_.useEffect)(()=>{if(t===0){let e=`${y.typingTextFirst} ${y.typingTextSecond}`,t=0;C(``);let n=setInterval(()=>{t<e.length?(C(n=>n+e.charAt(t)),t++):clearInterval(n)},40);return()=>clearInterval(n)}},[t]);let A=()=>{h({particleCount:85,spread:80,origin:{y:.5}})},j=t=>{t&&t.preventDefault(),c(),l(),e([40,80,120]),A(),n(1)},M=()=>{if(d(),e(15),t<4){let e=t+1;n(e),T(e=>(e+1)%u.length),e===4&&(c(),l(),A())}};return(0,v.jsxs)(`div`,{className:`bday-surprise-root`,children:[(0,v.jsx)(`style`,{children:`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Quicksand:wght@500;700&display=swap');

        .bday-surprise-root {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf2f8 0%, #fbcfe8 50%, #fdf2f8 100%);
          font-family: 'Quicksand', sans-serif;
          color: #333333;
          position: relative;
          overflow-x: hidden;
          padding: 2rem 1rem 4rem;
          user-select: none;
        }

        .bday-start-screen {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #1a1a2e;
          border-radius: 30px;
          padding: 2.5rem 1.5rem;
          color: #ffffff;
          box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          text-align: center;
        }

        .bday-title-handwritten {
          font-family: 'Dancing Script', cursive;
          font-size: clamp(2.5rem, 6vw, 3.8rem);
          color: #ec4899;
          margin-bottom: 0.5rem;
        }

        .bday-card-white {
          background: #ffffff;
          border-radius: 28px;
          padding: 2.5rem 1.5rem;
          box-shadow: 0 12px 30px rgba(236, 72, 153, 0.2);
          max-width: 650px;
          margin: 1.5rem auto;
          text-align: center;
          border: 3px solid #fbcfe8;
        }

        .bday-photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.2rem;
          margin: 1.8rem 0;
        }

        .bday-photo-card {
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
          border: 3px solid #fbcfe8;
          height: 220px;
          background: #fdf2f8;
        }

        .bday-btn-primary {
          background: linear-gradient(45deg, #ec4899, #db2777);
          color: white;
          font-weight: 700;
          padding: 1rem 2.2rem;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          box-shadow: 0 6px 20px rgba(236, 72, 153, 0.35);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }

        .bday-btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(236, 72, 153, 0.5);
        }

        .bday-input {
          padding: 0.9rem 1.2rem;
          border-radius: 50px;
          border: 2px solid #ec4899;
          outline: none;
          font-size: 1rem;
          text-align: center;
          background: rgba(255,255,255,0.95);
          color: #1a1a2e;
          font-weight: 700;
          width: 100%;
          max-width: 280px;
        }
      `}),(0,v.jsxs)(`a`,{href:`#/`,className:`fixed top-4 left-4 z-50 bg-white/90 text-pink-600 px-4 py-2 rounded-full border border-pink-300 shadow-md font-bold text-xs flex items-center gap-1.5 hover:bg-white transition-all`,children:[(0,v.jsx)(r,{className:`w-4 h-4`}),(0,v.jsx)(`span`,{children:`Back to Home`})]}),(0,v.jsxs)(`div`,{className:`max-w-3xl mx-auto`,children:[t===0&&(0,v.jsxs)(m.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},className:`bday-start-screen`,children:[(0,v.jsx)(a,{className:`w-12 h-12 text-pink-400 mb-2 animate-bounce`}),(0,v.jsx)(`h1`,{className:`bday-title-handwritten`,children:`Security Gate`}),(0,v.jsxs)(`p`,{className:`text-sm font-mono text-pink-200 min-h-[3rem] max-w-sm mb-6`,children:[`"`,S,`"`]}),(0,v.jsxs)(`form`,{onSubmit:j,className:`space-y-4 w-full max-w-xs flex flex-col items-center`,children:[(0,v.jsx)(`input`,{type:`text`,value:b,onChange:e=>x(e.target.value),placeholder:`Enter Recipient Name...`,className:`bday-input`}),(0,v.jsx)(`button`,{type:`submit`,className:`bday-btn-primary mt-2`,children:(0,v.jsx)(`span`,{children:`Unlock Birthday World 💖`})})]})]}),t===1&&(0,v.jsxs)(m.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:`bday-card-white`,children:[(0,v.jsx)(`h1`,{className:`bday-title-handwritten`,children:`✨ Happy Birthday Queen Sanzu! ✨`}),(0,v.jsx)(`div`,{className:`w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl my-6 bg-pink-100`,children:(0,v.jsx)(`img`,{src:E,alt:`Queen Sanzu Hero Photo`,onError:e=>p(e,w),className:`w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105`})}),(0,v.jsx)(`p`,{className:`text-sm font-semibold text-stone-700 max-w-md mx-auto mb-8 leading-relaxed`,children:`Welcome to the private birthday surprise world prepared with endless love from Abu!`}),(0,v.jsxs)(`button`,{type:`button`,onClick:M,className:`bday-btn-primary`,children:[(0,v.jsx)(`span`,{children:`Ready for a little surprise?`}),(0,v.jsx)(i,{className:`w-4 h-4`})]})]}),t===2&&(0,v.jsxs)(m.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:`bday-card-white`,children:[(0,v.jsx)(`h1`,{className:`bday-title-handwritten`,children:y.soloGalleryTitle}),(0,v.jsxs)(`div`,{className:`bday-photo-grid`,children:[(0,v.jsx)(`div`,{className:`bday-photo-card`,children:(0,v.jsx)(`img`,{src:E,alt:`Sanzu 1`,onError:e=>p(e,w),className:`w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105`})}),(0,v.jsx)(`div`,{className:`bday-photo-card`,children:(0,v.jsx)(`img`,{src:D,alt:`Sanzu 2`,onError:e=>p(e,w+1),className:`w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105`})})]}),(0,v.jsxs)(`button`,{type:`button`,onClick:M,className:`bday-btn-primary mt-4`,children:[(0,v.jsx)(`span`,{children:`Want to see more?`}),(0,v.jsx)(i,{className:`w-4 h-4`})]})]}),t===3&&(0,v.jsxs)(m.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:`bday-card-white`,children:[(0,v.jsx)(`h1`,{className:`bday-title-handwritten`,children:y.togetherGalleryTitle}),(0,v.jsxs)(`div`,{className:`bday-photo-grid`,children:[(0,v.jsx)(`div`,{className:`bday-photo-card`,children:(0,v.jsx)(`img`,{src:O,alt:`Together 1`,onError:e=>p(e,w+2),className:`w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105`})}),(0,v.jsx)(`div`,{className:`bday-photo-card`,children:(0,v.jsx)(`img`,{src:k,alt:`Together 3`,onError:e=>p(e,w+3),className:`w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105`})})]}),(0,v.jsxs)(`button`,{type:`button`,onClick:M,className:`bday-btn-primary mt-4`,children:[(0,v.jsx)(`span`,{children:`One last thing...`}),(0,v.jsx)(i,{className:`w-4 h-4`})]})]}),t===4&&(0,v.jsxs)(m.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:`bday-card-white space-y-6`,children:[(0,v.jsx)(`h1`,{className:`bday-title-handwritten`,children:y.messageTitle}),(0,v.jsx)(`div`,{className:`w-44 h-44 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl bg-pink-100`,children:(0,v.jsx)(`img`,{src:E,alt:`Queen Sanzu Letter Photo`,onError:e=>p(e,w),className:`w-full h-full object-contain object-center brightness-110 contrast-105 saturate-105`})}),(0,v.jsx)(`div`,{className:`space-y-4 text-left text-stone-700 text-sm leading-relaxed max-w-lg mx-auto bg-pink-50/90 p-6 rounded-2xl border border-pink-200`,children:y.messageParagraphs.map((e,t)=>(0,v.jsx)(`p`,{className:t===0||t===y.messageParagraphs.length-1?`font-bold text-pink-600 font-serif text-base`:``,children:e},t))}),(0,v.jsxs)(`div`,{className:`flex flex-col sm:flex-row items-center justify-center gap-3 pt-4`,children:[(0,v.jsxs)(`button`,{type:`button`,onClick:()=>{d(),e(10),n(0),x(`Sanzu`)},className:`bday-btn-primary bg-purple-600`,children:[(0,v.jsx)(o,{className:`w-4 h-4`}),(0,v.jsx)(`span`,{children:`Replay Surprise`})]}),(0,v.jsxs)(`button`,{type:`button`,onClick:()=>{l(),g(`💖 BIRTHDAY SURPRISE TEMPLATE 💖

Recipient: Queen Sanzu
"Wishing you a beautiful birthday and an even more amazing year to come!"

Happy Birthday Bebo! 🎂💖`)},className:`bday-btn-primary bg-emerald-600`,children:[(0,v.jsx)(s,{className:`w-4 h-4`}),(0,v.jsx)(`span`,{children:`Share Surprise 💝`})]})]})]})]})]})}function x(){return(0,v.jsx)(b,{})}export{x as default};