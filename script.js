/* كامل وموثوق: تغيير اللغة + dark mode + عداد + دخان + دخول متناوب + تعبئة الخدمات
   - يعمل حتى لو بعض العناصر ناقصة (ينشئ بدائل)
   - يحفظ siteLang و siteDark في localStorage
   - لا يحتاج مكتبات خارجية
*/

(function(){
  'use strict';

  /* --- بيانات النصوص باللغتين --- */
  const TEXT = {
    ar: {
      barText: "🔥 اشتراك Google AI Plus لمدة 4 شهور فقط بـ 2.49$ — أقوى عرض تقني 🔥",
      title: "المكلا تيليكوم",
      slogan: "أفضل تطبيق اتصالات وخدمات في اليمن",
      downloadBtn: "⬇ تحميل التطبيق الآن",
      aboutTitle: "نبذة عن التطبيق",
      aboutText: "تطبيق المكلا تيليكوم هو التطبيق رقم 1 في اليمن لخدمات الاتصالات: شراء باقات، دفع فواتير، تحويل رصيد، وعروض يومية. سريع، آمن، وسهل الاستخدام.",
      offerName: "اشتراك Google AI Plus",
      priceText: "فقط <span class='money'>2.49$</span> شهرياً لمدة <strong>4 شهور</strong>",
      offerDesc: "ميزات متقدمة: Gemini Pro, Deep Research, Veo, Flow, Whisk, NotebookLM — إشتراك حصري بسعر رمزي.",
      bannerCta: "احصل الآن",
      servicesList: [" شراء باقات النت"," دفع فواتير الاتصالات"," تحويل رصيد"," خدمات مخفض"," تسديد  شبكة الوادي","   تسديد شبكة الصفاء الرقمية"],
      visitorsTitle: "زائر",
      footerText: "© 2025 المكلا تيليكوم - جميع الحقوق محفوظة"
    },
    en: {
      barText: "🔥 Google AI Plus subscription 4 months only $2.49 — Best tech offer 🔥",
      title: "Mukalla Telecom",
      slogan: "The best telecom & services app in Yemen",
      downloadBtn: "⬇ Download App",
      aboutTitle: "About",
      aboutText: "Mukalla Telecom app is the #1 app in Yemen for telecom services: bundle purchases, bills, balance transfer and offers. Fast, secure, easy to use.",
      offerName: "Google AI Plus Subscription",
      priceText: "Only <span class='money'>2.49$</span> monthly for <strong>4 months</strong>",
      offerDesc: "Advanced features: Gemini Pro, Deep Research, Veo, Flow, Whisk, NotebookLM — premium access.",
      bannerCta: "Get Now",
      servicesList: [" Buy internet bundles"," Pay telecom bills"," Balance transfer","  Discounted Services","Payment fot Al-Wadi Network"," Al-Safaa Digital Net"],
      visitorsTitle: "Visitors",
      footerText: "© 2025 Mukalla Telecom - All Rights Reserved"
    }
  };

  /* --- مُعرّف سريع --- */
  const $ = id => document.getElementById(id);

  /* --- init after DOM ready --- */
  function init(){
    // تأكد وجود الأزرار، وإن لم تكن موجودة أنشئها
    let langBtn = $('langBtn');
    if (!langBtn) {
      langBtn = document.createElement('button');
      langBtn.id = 'langBtn';
      langBtn.className = 'control-btn';
      langBtn.textContent = 'EN';
      langBtn.style.position = 'fixed';
      langBtn.style.top = '12px';
      langBtn.style.right = '12px';
      document.body.appendChild(langBtn);
      console.info('langBtn created fallback');
    }

    let darkBtn = $('darkBtn');
    if (!darkBtn) {
      darkBtn = document.createElement('button');
      darkBtn.id = 'darkBtn';
      darkBtn.className = 'control-btn';
      darkBtn.textContent = '🌙';
      darkBtn.style.position = 'fixed';
      darkBtn.style.top = '12px';
      darkBtn.style.left = '12px';
      document.body.appendChild(darkBtn);
      console.info('darkBtn created fallback');
    }

    // عناصر صفحة قد تكون null — نتعامل بأمان
    const barTextEl = $('barText');
    const titleEl = $('title');
    const sloganEl = $('slogan');
    const downloadBtnEl = $('downloadBtn');
    const aboutTitleEl = $('aboutTitle');
    const aboutTextEl = $('aboutText');
    const offerNameEl = $('offerName');
    const priceTextEl = $('priceText');
    const offerDescEl = $('offerDesc');
    const bannerCtaEl = $('bannerCta');
    const servicesPillsEl = $('servicesList');
    const servicesLongEl = $('servicesLongList');
    const footerTextEl = $('footerText');
    const visitorsLabelEl = $('visitorsTitle');
    const counterBoxEl = $('counterBox');

    // load saved preferences
    let currentLang = localStorage.getItem('siteLang') || 'ar';
    const savedDark = localStorage.getItem('siteDark') === '1';

    // restore dark mode if محفوظ
    if (savedDark) {
      document.body.classList.add('dark');
      darkBtn.textContent = '☀️';
    } else {
      darkBtn.textContent = '🌙';
    }

    // function: apply language texts
    function applyLanguage(lang){
      const txt = TEXT[lang] || TEXT.ar;
      try {
        if (barTextEl) barTextEl.textContent = txt.barText;
        if (titleEl) titleEl.textContent = txt.title;
        if (sloganEl) sloganEl.textContent = txt.slogan;
        if (downloadBtnEl) downloadBtnEl.innerHTML = txt.downloadBtn;
        if (aboutTitleEl) aboutTitleEl.textContent = txt.aboutTitle;
        if (aboutTextEl) aboutTextEl.textContent = txt.aboutText;
        if (offerNameEl) offerNameEl.textContent = txt.offerName;
        if (priceTextEl) priceTextEl.innerHTML = txt.priceText;
        if (offerDescEl) offerDescEl.textContent = txt.offerDesc;
        if (bannerCtaEl) bannerCtaEl.textContent = txt.bannerCta;

        // services (pills)
        if (servicesPillsEl) {
          servicesPillsEl.innerHTML = '';
          txt.servicesList.forEach(item => {
            const sp = document.createElement('span');
            sp.className = 'pill';
            sp.textContent = item;
            servicesPillsEl.appendChild(sp);
          });
        }

        // long list
        if (servicesLongEl) {
          servicesLongEl.innerHTML = '';
          txt.servicesList.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.replace(/^✔\s*/,'');
            servicesLongEl.appendChild(li);
          });
        }

        if (footerTextEl) footerTextEl.textContent = txt.footerText;
        if (visitorsLabelEl) visitorsLabelEl.textContent = txt.visitorsTitle;
      } catch (e) {
        console.warn('applyLanguage partial error', e);
      }

      // direction & button label
      document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
      langBtn.textContent = (lang === 'ar') ? 'EN' : 'AR';
      currentLang = lang;
      localStorage.setItem('siteLang', lang);
    }

    // initial apply
    applyLanguage(currentLang);

    // visitor counter (localStorage)
    let visits = parseInt(localStorage.getItem('visits') || '0', 10);
    visits = isNaN(visits) ? 0 : visits;
    visits++;
    localStorage.setItem('visits', visits);
    if (counterBoxEl) counterBoxEl.textContent = visits;

    // language toggle handler
    langBtn.addEventListener('click', () => {
      const next = (currentLang === 'ar') ? 'en' : 'ar';
      applyLanguage(next);
      try { navigator.vibrate && navigator.vibrate(20); } catch(e){}
    });

    // dark toggle handler
    darkBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('siteDark', isDark ? '1' : '0');
      darkBtn.textContent = isDark ? '☀️' : '🌙';
      try { navigator.vibrate && navigator.vibrate(20); } catch(e){}
    });

    /* --- Alternating entrance (right/left) with small stagger --- */
    (function alternatingEntrance(){
      const sections = Array.from(document.querySelectorAll('.fade-section'));
      if (!sections.length) return;
      // prepare classes
      sections.forEach((sec, idx) => {
        sec.classList.remove('enter-from-right','enter-from-left','enter-animate','show','will-animate');
        sec.classList.add('will-animate');
        sec.classList.add(idx % 2 === 0 ? 'enter-from-right' : 'enter-from-left');
        sec.classList.add('enter-animate');
      });

      function reveal(){
        sections.forEach((sec, idx) => {
          if (sec.classList.contains('show')) return;
          const rect = sec.getBoundingClientRect();
          if (rect.top < window.innerHeight - 80) {
            setTimeout(() => {
              sec.classList.add('show');
              setTimeout(()=> sec.classList.remove('will-animate'), 700);
            }, idx * 80);
          }
        });
      }

      window.addEventListener('load', () => setTimeout(reveal, 160));
      window.addEventListener('scroll', reveal);
      reveal();
      // safety fallback: show all after 2s if something blocks
      setTimeout(()=> sections.forEach(s => s.classList.add('show')), 2000);
    })();

    /* --- Smoke canvas (light) --- */
    (function smoke(){
      const canvas = $('smokeCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext && canvas.getContext('2d');
      if (!ctx) return;

      function resize(){ canvas.width = window.innerWidth; canvas.height = 260; }
      resize();
      window.addEventListener('resize', resize);

      let arr = [];
      class Puff {
        constructor(){ this.x = Math.random()*canvas.width; this.y = canvas.height + 20; this.r = Math.random()*50+20; this.v = Math.random()*0.7+0.3; this.o = 0.18+Math.random()*0.14; }
        draw(){ ctx.beginPath(); ctx.fillStyle = `rgba(170,170,170,${this.o})`; ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fill(); }
        update(){ this.y -= this.v; this.x += Math.sin(this.y*0.02)*0.4; this.o -= 0.0009; }
      }

      function loop(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (arr.length < 45 && Math.random() > 0.28) arr.push(new Puff());
        arr.forEach((p,i)=>{ p.update(); p.draw(); if (p.o <= 0) arr.splice(i,1); });
        requestAnimationFrame(loop);
      }
      loop();
    })();

    /* --- expose debug helper --- */
    window.__mukalla_state = function(){ return {
      lang: localStorage.getItem('siteLang'),
      dark: localStorage.getItem('siteDark'),
      visits: localStorage.getItem('visits')
    }; };

    console.info('Mukalla: initialized (lang/dark/visitor/animations ready)');
  } // init

  // run init when ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
