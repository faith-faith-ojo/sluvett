'use strict';

/* ── SCROLL PROGRESS BAR ─────────────────────────────────── */
(function () {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? window.scrollY / max * 100 : 0).toFixed(2) + '%';
  }, { passive: true });
})();

/* ── PAGE LOADER ─────────────────────────────────────────── */
(function () {
  const path    = window.location.pathname;
  const isQuick = /product|shop|checkout/.test(path);

  /* Use the loader already in the HTML, or create one as fallback */
  let loader = document.getElementById('pageLoader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.innerHTML = '<div class="loader-wordmark">SLUVET</div><div class="loader-bar"></div>';
    document.body.prepend(loader);
  }
  loader.className = 'page-loader' + (isQuick ? ' loader-short' : '');

  const delay   = isQuick ? 480 : 1100;
  const dismiss = () => requestAnimationFrame(() => loader.classList.add('gone'));
  if (document.readyState === 'complete') setTimeout(dismiss, delay);
  else window.addEventListener('load', () => setTimeout(dismiss, delay));
})();

/* ── CUSTOM CURSOR ───────────────────────────────────────── */
(function () {
  if (!matchMedia('(pointer:fine)').matches) return;
  const dot  = Object.assign(document.createElement('div'), { id: 'cursorDot' });
  const ring = Object.assign(document.createElement('div'), { id: 'cursorRing' });
  document.body.append(dot, ring);

  let mx = -100, my = -100, rx = -100, ry = -100, raf = null;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  function tick() {
    raf = null;
    rx += (mx - rx) * 0.65;
    ry += (my - ry) * 0.65;
    dot.style.transform  = `translate(${mx}px,${my}px)`;
    ring.style.transform = `translate(${rx}px,${ry}px)`;
    if (Math.abs(mx - rx) > 0.3 || Math.abs(my - ry) > 0.3) raf = requestAnimationFrame(tick);
  }

  document.querySelectorAll('a, button, .product-card, .sc-dadd, .sc-thumb, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('h'); ring.classList.add('h'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('h'); ring.classList.remove('h'); });
  });
})();

/* ── STAT COUNTER helper ─────────────────────────────────── */
function animateStats(slideEl) {
  slideEl.querySelectorAll('.stat-val[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const t0 = performance.now();
    const dur = 1400;
    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * ease).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  });
}

/* ── HEADER scroll state ─────────────────────────────────── */
(function () {
  const h = document.getElementById('header');
  if (!h) return;
  const update = () => h.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── ACTIVE NAV LINK ─────────────────────────────────────── */
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href !== '#' && href !== 'index.html' && path.endsWith(href)) {
      a.classList.add('active');
    }
  });
})();

/* ── CART DRAWER ─────────────────────────────────────────── */
(function () {
  let cart = JSON.parse(localStorage.getItem('sluvetCart') || '[]');

  const drawer   = document.getElementById('cartDrawer');
  const overlay  = document.getElementById('cartOverlay');
  const toggle   = document.getElementById('cartToggle');
  const closeBtn = document.getElementById('cartClose');
  const contBtn  = document.getElementById('cartContinue');
  const listEl   = document.getElementById('cartItemsList');
  const countEl  = document.getElementById('cartCount');
  const subEl    = document.getElementById('cartSubtotal');

  if (!drawer) return;

  function openCart()  { drawer.classList.add('open'); overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { drawer.classList.remove('open'); overlay.classList.remove('open'); document.body.style.overflow = ''; }

  toggle?.addEventListener('click', openCart);
  closeBtn?.addEventListener('click', closeCart);
  contBtn?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);

  const COLL = {
    'Oversized Void Hoodie':'N','Raw Hem Wide Leg':'N','Noir Leather Gloves':'N',
    'Void Trench Coat':'I','Ivory Slip Dress':'I',
    'Midnight Tailored Blazer':'E','Eclipse Turtleneck':'E',
    'Structured Leather Tote':'C','Chrome Crossbody':'C','Chrome Chain Belt':'C',
    'Signature Maxi Coat':'O','Obsidian Cuff':'O',
    'Silk Evening Robe':'I',
  };
  const COLORS = { N:'#161616', I:'#1e1a10', E:'#0e1220', C:'#14161a', O:'#140e20' };
  const IMGS = {
    /* ── Showcase ──────────────────────────────────────────── */
    'Fit sized Void blazzer':       'background/NOIR/blazer/black coat.png',
    'Structured Leather Tote':      'background/chrome(BAGS)/hand bag/red bag.png',
    'Midnight Tailored Blazer':     'background/eclipse(street wares)/turtle neck/green turtle neck.png',
    'Signature Maxi Coat':          'background/obsidian(jeweries)/belt/neck piece.png',
    'Void Trench Coat':             'background/IVORY(women dress)/robe/black robe.png',
    'Chrome Chain Belt':            'background/obsidian(jeweries)/belt/black belt.png',
    /* ── Noir Blazer ────────────────────────────────────────── */
    'Noir Blazer':                  'background/NOIR/blazer/black coat.png',
    'Noir Blazer — Black':          'background/NOIR/blazer/black coat.png',
    'Noir Blazer — Blue':           'background/NOIR/blazer/blue coat.png',
    'Noir Blazer — Lemon':          'background/NOIR/blazer/lemon coat.png',
    'Noir Blazer — Pink':           'background/NOIR/blazer/pink coat.png',
    'Noir Blazer — Purple':         'background/NOIR/blazer/purple coat#.png',
    /* ── Tailored Suit ──────────────────────────────────────── */
    'Tailored Suit':                'background/NOIR/blazer/suit.png',
    /* ── Noir Coat ──────────────────────────────────────────── */
    'Noir Coat':                    'background/NOIR/coat/cream coat.png',
    'Noir Coat — Cream':            'background/NOIR/coat/cream coat.png',
    'Noir Coat — Green':            'background/NOIR/coat/green coat.png',
    'Noir Coat — Purple':           'background/NOIR/coat/purple coat.png',
    'Noir Coat — Yellow':           'background/NOIR/coat/yellow coat.png',
    /* ── Noir Trouser ───────────────────────────────────────── */
    'Noir Trouser':                 'background/NOIR/trouser/black trouser.png',
    'Noir Trouser — Black':         'background/NOIR/trouser/black trouser.png',
    'Noir Trouser — Green':         'background/NOIR/trouser/green trouser.png',
    'Noir Trouser — Purple':        'background/NOIR/trouser/purple trouser.png',
    /* ── Eclipse Hoodie ─────────────────────────────────────── */
    'Eclipse Hoodie':               'background/eclipse(street wares)/hoodies/grey hoodie no bg.png',
    'Eclipse Hoodie — Grey':        'background/eclipse(street wares)/hoodies/grey hoodie no bg.png',
    'Eclipse Hoodie — Green':       'background/eclipse(street wares)/hoodies/green hoodie.png',
    'Eclipse Hoodie — Lemon':       'background/eclipse(street wares)/hoodies/lemon hoodie.png',
    'Eclipse Hoodie — Purple':      'background/eclipse(street wares)/hoodies/purple hoodie.png',
    'Eclipse Hoodie — Red':         'background/eclipse(street wares)/hoodies/red hoodie.png',
    /* ── Eclipse Turtleneck ─────────────────────────────────── */
    'Eclipse Turtleneck':           'background/eclipse(street wares)/turtle neck/green turtle neck.png',
    'Eclipse Turtleneck — Green':   'background/eclipse(street wares)/turtle neck/green turtle neck.png',
    'Eclipse Turtleneck — Red':     'background/eclipse(street wares)/turtle neck/red turtle neck.png',
    'Eclipse Turtleneck — Orange':  'background/eclipse(street wares)/turtle neck/orange turtle neck.png',
    'Eclipse Turtleneck — Purple':  'background/eclipse(street wares)/turtle neck/puerple turtle neck.png',
    /* ── Eclipse Joggers ────────────────────────────────────── */
    'Eclipse Joggers':              'background/eclipse(street wares)/joggers/jogginghose.png',
    /* ── Ivory Dress ────────────────────────────────────────── */
    'Ivory Dress':                  'background/IVORY(women dress)/DRESS/cream dress.png',
    'Ivory Dress — Cream':          'background/IVORY(women dress)/DRESS/cream dress.png',
    'Ivory Dress — Green':          'background/IVORY(women dress)/DRESS/green dress.png',
    'Ivory Dress — Pink':           'background/IVORY(women dress)/DRESS/pink dress.png',
    'Ivory Dress — Yellow':         'background/IVORY(women dress)/DRESS/yellow dress.png',
    /* ── Ivory Robe ─────────────────────────────────────────── */
    'Ivory Robe':                   'background/IVORY(women dress)/robe/black robe.png',
    'Ivory Robe — Black':           'background/IVORY(women dress)/robe/black robe.png',
    'Ivory Robe — Blue':            'background/IVORY(women dress)/robe/blue robe.png',
    'Ivory Robe — Green':           'background/IVORY(women dress)/robe/green robe.png',
    'Ivory Robe — Orange':          'background/IVORY(women dress)/robe/orange robe.png',
    'Ivory Robe — Purple':          'background/IVORY(women dress)/robe/purple robe.png',
    'Ivory Robe — Red':             'background/IVORY(women dress)/robe/red robe.png',
    /* ── Ivory Heels ────────────────────────────────────────── */
    'Ivory Heels':                  'background/IVORY(women dress)/heels/black heels.png',
    'Ivory Heels — Black':          'background/IVORY(women dress)/heels/black heels.png',
    'Ivory Heels — Blue':           'background/IVORY(women dress)/heels/blue heels.png',
    'Ivory Heels — Brown':          'background/IVORY(women dress)/heels/brown heels.png',
    'Ivory Heels — Green':          'background/IVORY(women dress)/heels/green heels.png',
    'Ivory Heels — Red':            'background/IVORY(women dress)/heels/red heels.png',
    'Ivory Heels — White':          'background/IVORY(women dress)/heels/white heels.png',
    /* ── Ivory Sandals ──────────────────────────────────────── */
    'Ivory Sandals':                'background/IVORY(women dress)/sandals/black sandals.png',
    'Ivory Sandals — Black':        'background/IVORY(women dress)/sandals/black sandals.png',
    'Ivory Sandals — Green':        'background/IVORY(women dress)/sandals/green sandals.png',
    'Ivory Sandals — Purple':       'background/IVORY(women dress)/sandals/purple sandals.png',
    'Ivory Sandals — Red':          'background/IVORY(women dress)/sandals/red sandals.png',
    /* ── Chrome Tote ────────────────────────────────────────── */
    'Chrome Tote':                  'background/chrome(BAGS)/hand bag/black bag.png',
    'Chrome Tote — Black':          'background/chrome(BAGS)/hand bag/black bag.png',
    'Chrome Tote — Red':            'background/chrome(BAGS)/hand bag/red bag.png',
    /* ── Chrome Luxury Bag ──────────────────────────────────── */
    'Chrome Luxury Bag':            'background/chrome(BAGS)/luxury bag/black luxury bag.png',
    'Chrome Luxury Bag — Black':    'background/chrome(BAGS)/luxury bag/black luxury bag.png',
    'Chrome Luxury Bag — Blue':     'background/chrome(BAGS)/luxury bag/blue luxury bag.png',
    'Chrome Luxury Bag — Green':    'background/chrome(BAGS)/luxury bag/green luxury bag.png',
    'Chrome Luxury Bag — Orange':   'background/chrome(BAGS)/luxury bag/orange luxury bag.png',
    'Chrome Luxury Bag — Purple':   'background/chrome(BAGS)/luxury bag/purple luxury bag.png',
    'Chrome Luxury Bag — Red':      'background/chrome(BAGS)/luxury bag/red luxury bag.png',
    'Chrome Luxury Bag — Yellow':   'background/chrome(BAGS)/luxury bag/yellow luxury bag.png',
    /* legacy cached names (color in product name) */
    'Luxury Bag — Black':           'background/chrome(BAGS)/luxury bag/black luxury bag.png',
    'Luxury Bag — Blue':            'background/chrome(BAGS)/luxury bag/blue luxury bag.png',
    'Luxury Bag — Green':           'background/chrome(BAGS)/luxury bag/green luxury bag.png',
    'Luxury Bag — Orange':          'background/chrome(BAGS)/luxury bag/orange luxury bag.png',
    'Luxury Bag — Purple':          'background/chrome(BAGS)/luxury bag/purple luxury bag.png',
    'Luxury Bag — Red':             'background/chrome(BAGS)/luxury bag/red luxury bag.png',
    'Luxury Bag — Yellow':          'background/chrome(BAGS)/luxury bag/yellow luxury bag.png',
    /* ── Chrome Belt / Obsidian ─────────────────────────────── */
    'Chrome Belt':                  'background/obsidian(jeweries)/belt/black belt.png',
    'Chrome Belt — Black':          'background/obsidian(jeweries)/belt/black belt.png',
    'Chrome Belt — Blue':           'background/obsidian(jeweries)/belt/blue belt.png',
    'Chrome Belt — Red':            'background/obsidian(jeweries)/belt/red belt.png',
    'Noir Leather Gloves':          'background/obsidian(jeweries)/belt/glove.png',
    'Obsidian Earrings':            'background/obsidian(jeweries)/belt/earings.png',
    'Obsidian Necklace':            'background/obsidian(jeweries)/belt/neck piece.png',
    'Obsidian Ring':                'background/obsidian(jeweries)/belt/ring.png',
    /* ── Legacy keys ────────────────────────────────────────── */
    'Oversized Void Hoodie':        'background/eclipse(street wares)/hoodies/grey hoodie no bg.png',
    'Raw Hem Wide Leg':             'background/NOIR/trouser/black trouser.png',
    'Ivory Slip Dress':             'background/IVORY(women dress)/DRESS/cream dress.png',
    'Chrome Crossbody':             'background/chrome(BAGS)/hand bag/red bag.png',
    'Silk Evening Robe':            'background/IVORY(women dress)/robe/black robe.png',
    'Obsidian Cuff':                'background/obsidian(jeweries)/belt/neck piece.png',
  };

  function thumb(name) {
    const src = IMGS[name];
    if (src) return `<div class="cart-item-thumb cart-item-thumb-img"><img src="${src}" alt="${name}"></div>`;
    const k = COLL[name] || 'N';
    return `<div class="cart-item-thumb" style="background:${COLORS[k]||'#161616'}"><span class="cart-thumb-letter">${k}</span></div>`;
  }

  function render() {
    localStorage.setItem('sluvetCart', JSON.stringify(cart));
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const count = cart.reduce((s, i) => s + i.qty, 0);
    if (countEl) { countEl.textContent = count; countEl.classList.toggle('visible', count > 0); }
    if (subEl)   subEl.textContent = '£' + total.toLocaleString();
    if (!listEl) return;

    if (!cart.length) { listEl.innerHTML = '<p class="cart-empty-msg">Your cart is empty.</p>'; return; }

    listEl.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        ${thumb(item.name)}
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-size">${item.size}${item.color ? ' · ' + item.color : ''}</p>
          <p class="cart-item-price">£${item.price.toLocaleString()}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="dec" data-idx="${idx}">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-idx="${idx}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-idx="${idx}" aria-label="Remove">×</button>
      </div>
    `).join('');

    listEl.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.idx;
        if (btn.dataset.action === 'inc') cart[i].qty++;
        else if (cart[i].qty > 1) cart[i].qty--;
        else cart.splice(i, 1);
        render();
      });
    });
    listEl.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => { cart.splice(+btn.dataset.idx, 1); render(); });
    });
  }

  window.SLUVET = window.SLUVET || {};
  window.SLUVET.addToCart = function (name, price, size, color) {
    const ex = cart.find(i => i.name === name && i.size === size && i.color === (color || ''));
    if (ex) ex.qty++;
    else cart.push({ name, price: +price, size: size || 'One Size', color: color || '', qty: 1 });
    render();
    openCart();
  };

  document.querySelector('.cart-checkout-btn')?.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });

  render();
})();

/* ── LOGIN / LOGOUT NAV STATE ────────────────────────────── */
(function () {
  const raw = localStorage.getItem('sluvetAuth');
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    if (!d.ts || Date.now() - d.ts > 86400000) {
      localStorage.removeItem('sluvetAuth');
      return;
    }
  } catch (e) {
    localStorage.removeItem('sluvetAuth');
    return;
  }
  document.querySelectorAll('a.nav-login, a.mobile-login-link').forEach(a => {
    a.textContent = 'Logout';
    a.addEventListener('click', e => {
      e.preventDefault();
      localStorage.removeItem('sluvetAuth');
      localStorage.removeItem('sluvetCart');
      window.location.href = 'login.html';
    });
  });
})();

/* ── NAV SCROLL-SPY ──────────────────────────────────────── */
(function () {
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  if (!navLinks.length) return;
  const targets = ['about', 'contact', 'showcase'].map(id => document.getElementById(id)).filter(Boolean);
  if (!targets.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(a => {
        const href = a.getAttribute('href');
        const matches = href === '#' + id || href === 'index.html#' + id;
        a.style.color = matches ? 'var(--gold)' : '';
      });
    });
  }, { threshold: 0.25 });
  targets.forEach(t => obs.observe(t));
})();

/* ── HERO SLIDER ─────────────────────────────────────────── */
(function () {
  const slides  = document.querySelectorAll('.hero-slide');
  const buttons = document.querySelectorAll('.col-btn');
  if (!slides.length) return;
  let current = 0, locked = false;

  animateStats(slides[0]);

  function restartProgress(btn) {
    btn.classList.remove('col-btn-progress');
    void btn.offsetWidth; /* force reflow to restart animation */
    btn.classList.add('col-btn-progress');
  }

  function goTo(idx) {
    if (idx === current || locked) return;
    locked = true;
    const prev = current;
    slides[prev].classList.add('outgoing');
    slides[idx].classList.add('incoming', 'active');
    buttons[prev].classList.remove('active', 'col-btn-progress');
    buttons[idx].classList.add('active');
    restartProgress(buttons[idx]);
    current = idx;
    animateStats(slides[idx]);
    setTimeout(() => {
      slides[prev].classList.remove('active', 'outgoing');
      slides[idx].classList.remove('incoming');
      locked = false;
    }, 1050);
  }

  /* initialise first button */
  if (buttons[0]) restartProgress(buttons[0]);

  buttons.forEach((btn, i) => btn.addEventListener('click', () => goTo(i)));
  setInterval(() => goTo((current + 1) % slides.length), 7000);

  /* ── TOUCH SWIPE ──────────────────────────────────────── */
  const hero = document.querySelector('.hero-section');
  if (hero) {
    let tx = 0;
    hero.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) < 40) return;
      goTo(dx < 0 ? (current + 1) % slides.length : (current - 1 + slides.length) % slides.length);
    }, { passive: true });
  }
})();

/* ── PRODUCT SHOWCASE ────────────────────────────────────── */
(function () {
  const nameSlides = document.querySelectorAll('.sc-name-slide');
  const largeItems = document.querySelectorAll('.sc-large-item');
  const thumbs     = document.querySelectorAll('.sc-thumb');
  const details    = document.querySelectorAll('.sc-detail');
  const scBg       = document.getElementById('scBg');
  const scPrev     = document.getElementById('scPrev');
  const scNext     = document.getElementById('scNext');
  if (!largeItems.length) return;

  const bgs = [
    'linear-gradient(120deg,#080808 0%,#0e0a0a 55%,#180c0c 100%)',
    'linear-gradient(120deg,#080808 0%,#0a0a0c 55%,#0e0e14 100%)',
    'linear-gradient(120deg,#080808 0%,#08090e 55%,#0a0d1a 100%)',
    'linear-gradient(120deg,#080808 0%,#0a0810 55%,#120a1e 100%)',
    'linear-gradient(120deg,#080808 0%,#0c0b08 55%,#1a1608 100%)',
    'linear-gradient(120deg,#080808 0%,#0a0a0c 55%,#100e14 100%)',
  ];
  let cur = 0;
  const total = largeItems.length;

  function goTo(idx) {
    if (idx < 0 || idx >= total || idx === cur) return;
    [nameSlides[cur], largeItems[cur], thumbs[cur], details[cur]].forEach(el => el?.classList.remove('active'));
    cur = idx;
    [nameSlides[cur], largeItems[cur], thumbs[cur], details[cur]].forEach(el => el?.classList.add('active'));
    if (scBg) scBg.style.background = bgs[cur];
  }

  if (scBg) scBg.style.background = bgs[0];
  scPrev?.addEventListener('click', () => goTo(cur - 1));
  scNext?.addEventListener('click', () => goTo(cur + 1));

  details.forEach(det => {
    det.querySelectorAll('.sz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        det.querySelectorAll('.sz-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  document.querySelectorAll('.sc-dadd').forEach(btn => {
    btn.addEventListener('click', function () {
      const det   = this.closest('.sc-detail');
      const name  = det?.querySelector('.sc-dname')?.textContent || '';
      const price = det?.querySelector('.sc-dprice')?.textContent?.replace('£','') || '0';
      const size  = det?.querySelector('.sz-btn.active')?.textContent || 'One Size';
      const orig  = this.textContent;
      this.textContent = 'Added ✓';
      this.classList.add('added');
      setTimeout(() => { this.textContent = orig; this.classList.remove('added'); }, 2000);
      window.SLUVET?.addToCart(name, +price, size, '');
    });
  });
})();

/* ── 3D MOUSE TILT ───────────────────────────────────────── */
(function () {
  function makeTilter(triggerEl, moveEl, maxRotX, maxRotY, perspective, liftZ) {
    const shine = document.createElement('div');
    shine.className = 'tilt-shine';
    moveEl.appendChild(shine);
    let tx = 0, ty = 0, cx = 0, cy = 0, hovering = false, raf = null;

    function loop() {
      cx += ((hovering ? tx : 0) - cx) * 0.1;
      cy += ((hovering ? ty : 0) - cy) * 0.1;
      if (!hovering && Math.abs(cx) < 0.02 && Math.abs(cy) < 0.02) {
        moveEl.style.transform = ''; raf = null; return;
      }
      moveEl.style.transform = `perspective(${perspective}px) rotateX(${cx}deg) rotateY(${cy}deg) translateZ(${hovering ? liftZ : 0}px)`;
      raf = requestAnimationFrame(loop);
    }
    triggerEl.addEventListener('mousemove', e => {
      const r = triggerEl.getBoundingClientRect();
      ty = ((e.clientX - r.left) / r.width  * 2 - 1) * maxRotY;
      tx = -((e.clientY - r.top)  / r.height * 2 - 1) * maxRotX;
      hovering = true;
      const px = (e.clientX - r.left) / r.width  * 100;
      const py = (e.clientY - r.top)  / r.height * 100;
      shine.style.opacity = '1';
      shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.11) 0%, transparent 62%)`;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    triggerEl.addEventListener('mouseleave', () => {
      hovering = false; shine.style.opacity = '0';
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  document.querySelectorAll('.product-card').forEach(card => makeTilter(card, card, 9, 13, 800, 16));

  document.querySelectorAll('.hero-tilt-wrap').forEach(el => makeTilter(el, el, 14, 18, 900, 28));

  document.querySelectorAll('.sc-large-item').forEach(el => makeTilter(el, el, 12, 16, 900, 24));
})();

/* ── THREE.JS WAVING CLOTH HERO BACKGROUND ───────────────── */
(function () {
  if (typeof THREE === 'undefined') return;
  const hero = document.getElementById('hero');
  if (!hero) return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;';
  hero.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(1);
  renderer.setSize(hero.offsetWidth, hero.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, hero.offsetWidth / hero.offsetHeight, 0.1, 100);
  camera.position.z = 12;

  /* primary cloth — white wireframe */
  const geoA = new THREE.PlaneGeometry(30, 20, 72, 44);
  const matA = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.045 });
  const clothA = new THREE.Mesh(geoA, matA);
  scene.add(clothA);

  /* secondary cloth — gold tint, slightly behind */
  const geoB = new THREE.PlaneGeometry(26, 17, 52, 34);
  const matB = new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true, transparent: true, opacity: 0.028 });
  const clothB = new THREE.Mesh(geoB, matB);
  clothB.position.z = -1.2;
  scene.add(clothB);

  let tick = 0, mx = 0, my = 0;

  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth  - 0.5);
    my = -(e.clientY / window.innerHeight - 0.5);
  });

  function wave(geo, offset, amp) {
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      p.setZ(i,
        Math.sin(x * 0.32 + tick + offset)     * Math.cos(y * 0.22 + tick * 0.65) * amp +
        Math.sin(x * 0.18 + tick * 0.48)       * Math.sin(y * 0.38 + tick * 0.28) * amp * 0.5
      );
    }
    p.needsUpdate = true;
  }

  (function loop() {
    requestAnimationFrame(loop);
    tick += 0.006;
    wave(geoA, 0,   0.85);
    wave(geoB, 1.3, 0.62);
    camera.position.x += (mx * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (my * 0.9 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    renderer.setSize(hero.offsetWidth, hero.offsetHeight);
    camera.aspect = hero.offsetWidth / hero.offsetHeight;
    camera.updateProjectionMatrix();
  });
})();

/* ── MODEL-VIEWER SHOWCASE (swap SVG → GLB when ready) ───── */
(function () {
  /* When you have a .glb file:
     1. Drop it in a /models/ folder  e.g. models/hoodie.glb
     2. Add  data-model="models/hoodie.glb"  to the .sc-large-item div
     3. This script replaces the SVG with a <model-viewer> automatically  */
  if (!document.querySelector('.sc-large-item[data-model]')) return;

  const mvScript = document.createElement('script');
  mvScript.type  = 'module';
  mvScript.src   = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
  document.head.appendChild(mvScript);

  document.querySelectorAll('.sc-large-item[data-model]').forEach(item => {
    const src = item.dataset.model;
    const mv  = document.createElement('model-viewer');
    mv.setAttribute('src',              src);
    mv.setAttribute('camera-controls',  '');
    mv.setAttribute('auto-rotate',      '');
    mv.setAttribute('auto-rotate-delay','800');
    mv.setAttribute('shadow-intensity', '0.6');
    mv.setAttribute('environment-image','neutral');
    mv.setAttribute('exposure',         '0.85');
    mv.style.cssText = 'width:100%;height:100%;background:transparent;--progress-bar-color:transparent;';
    const svg = item.querySelector('svg');
    if (svg) svg.replaceWith(mv);
  });
})();

/* ── MOBILE MENU ─────────────────────────────────────────── */
(function () {
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('mobileMenu');
  const mOverlay  = document.getElementById('mobileOverlay');
  const closeBtn  = document.getElementById('mobileClose');
  if (!hamburger || !menu) return;

  function open()  { menu.classList.add('open'); mOverlay?.classList.add('open'); document.body.style.overflow = 'hidden'; hamburger.classList.add('active'); }
  function close() { menu.classList.remove('open'); mOverlay?.classList.remove('open'); document.body.style.overflow = ''; hamburger.classList.remove('active'); }

  hamburger.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  mOverlay?.addEventListener('click', close);
})();

/* ── SHOP — URL collection filter ────────────────────────── */
(function () {
  if (!document.querySelector('.shop-filter-bar')) return;
  const col = new URLSearchParams(window.location.search).get('col');
  if (col) {
    const btn = document.querySelector(`.filter-btn[data-f="${col}"]`);
    if (btn) setTimeout(() => btn.click(), 50);
  }
})();

/* ── SHOP + INDEX — filter & quick-add ───────────────────── */
(function () {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.f;
      document.querySelectorAll('.product-card').forEach(card => {
        const show = f === 'all' || card.dataset.cat === f || card.dataset.col === f;
        card.style.display = show ? '' : 'none';
      });
      /* Collection colour theme */
      const colMap = { noir:'noir', ivory:'ivory', eclipse:'eclipse', chrome:'chrome', obsidian:'obsidian' };
      document.body.dataset.col = colMap[f] || 'noir';
    });
  });

  document.querySelectorAll('.product-card-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const { name, price } = btn.dataset;
      const card  = btn.closest('.product-card');
      const color = card?.querySelector('.card-swatch.active')?.dataset.color || '';
      const size  = card?.querySelector('.card-sz.active')?.textContent?.trim() || 'One Size';
      window.SLUVET?.addToCart(name, +price, size, color);
      const orig = btn.textContent;
      btn.textContent = 'Added ✓';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    });
  });
})();

/* ── NEWSLETTER FORM ─────────────────────────────────────── */
(function () {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('.newsletter-input');
    const btn   = form.querySelector('.newsletter-submit');
    if (!input?.value.includes('@')) return;
    btn.textContent = 'Subscribed ✓';
    btn.disabled = true;
    input.value = '';
    input.placeholder = "You're on the list.";
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.disabled = false; input.placeholder = 'Your email address'; }, 4000);
  });
})();

/* ── SWAP SVGs → REAL PHOTOS ─────────────────────────────── */
(function () {
  const PHOTOS = {
    'Oversized Void Hoodie':    'background/eclipse(street wares)/hoodies/grey hoodie no bg.png',
    'Raw Hem Wide Leg':         'background/NOIR/trouser/black trouser.png',
    'Void Trench Coat':         'background/NOIR/coat/cream coat.png',
    'Ivory Slip Dress':         'background/IVORY(women dress)/DRESS/cream dress.png',
    'Midnight Tailored Blazer': 'background/NOIR/blazer/suit.png',
    'Eclipse Turtleneck':       'background/eclipse(street wares)/turtle neck/Untitled design (3).png',
    'Structured Leather Tote':  'background/chrome(BAGS)/hand bag/black bag.png',
    'Chrome Crossbody':         'background/chrome(BAGS)/hand bag/red bag.png',
    'Chrome Chain Belt':        'background/obsidian(jeweries)/belt/black belt.png',
    'Signature Maxi Coat':      'background/NOIR/coat/purple coat.png',
    'Noir Leather Gloves':      'background/obsidian(jeweries)/belt/glove.png',
    'Obsidian Cuff':            'background/obsidian(jeweries)/belt/neck piece.png',
    'Fit sized Void blazzer':   'background/NOIR/blazer/black coat.png',
  };
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('.product-card-name')?.textContent?.trim();
    const src  = PHOTOS[name];
    if (!src) return;
    const svg = card.querySelector('.product-card-svg');
    if (!svg) return;
    const img = document.createElement('img');
    img.src       = src;
    img.alt       = name;
    img.className = 'product-card-photo';
    svg.replaceWith(img);
  });
})();

/* ── SHOP — sort by price ────────────────────────────────── */
(function () {
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const dir = btn.dataset.sort;
      const grid = document.getElementById('shopGrid');
      if (!grid) return;
      const cards = [...grid.querySelectorAll('.product-card')];
      cards.sort((a, b) => {
        const pa = +(a.querySelector('.product-card-add')?.dataset.price || 0);
        const pb = +(b.querySelector('.product-card-add')?.dataset.price || 0);
        return dir === 'price-asc' ? pa - pb : pb - pa;
      });
      cards.forEach(c => grid.appendChild(c));
    });
  });
})();

/* ── PRODUCT CARD → DETAIL PAGE ──────────────────────────── */
(function () {
  const IDS = {
    'Blazer': 1, 'Tailored Suit': 2, 'Coat': 3, 'Trouser': 4,
    'Leather Gloves': 5, 'Hoodie': 6, 'Turtleneck': 7, 'Joggers': 8,
    'Dress': 9, 'Robe': 10, 'Heels': 11, 'Sandals': 12,
    'Tote Bag': 13, 'Luxury Bag': 14, 'Belt': 15,
    'Statement Earrings': 16, 'Statement Necklace': 17, 'Statement Ring': 18,
  };
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('.product-card-name')?.textContent?.trim();
    const link = card.querySelector('.product-card-link');
    if (name && link && IDS[name]) link.href = `product.html?id=${IDS[name]}`;
  });
})();

/* ── CONTACT FORM ────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.contact-submit');
    const orig = btn.textContent;
    btn.textContent = 'Message Sent ✓';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--black)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
})();

/* ── INFO MODAL SYSTEM ───────────────────────────────────── */
(function () {
  const CONTENT = {
    sizing: `<h3>Sizing Guide</h3><p style="font-size:11px;color:rgba(240,237,232,0.52);margin-bottom:20px;">All measurements in centimetres.</p><table class="modal-table"><thead><tr><th>Size</th><th>Chest</th><th>Waist</th><th>Hip</th></tr></thead><tbody><tr><td>XS</td><td>82–86</td><td>62–66</td><td>88–92</td></tr><tr><td>S</td><td>87–91</td><td>67–71</td><td>93–97</td></tr><tr><td>M</td><td>92–96</td><td>72–76</td><td>98–102</td></tr><tr><td>L</td><td>97–101</td><td>77–81</td><td>103–107</td></tr><tr><td>XL</td><td>102–106</td><td>82–86</td><td>108–112</td></tr><tr><td>XXL</td><td>107–114</td><td>87–94</td><td>113–120</td></tr></tbody></table><p style="margin-top:16px;font-size:9px;color:rgba(240,237,232,0.3)">Between sizes? We recommend sizing up.</p>`,
    shipping: `<h3>Shipping</h3><ul class="modal-list"><li><strong>Standard</strong> — Free on orders over £200. 3–5 working days.</li><li><strong>Express</strong> — £12. 1–2 working days.</li><li><strong>International</strong> — Free on orders over £200. 5–10 working days.</li><li><strong>Tracking</strong> — A tracking number is sent once your order ships.</li></ul>`,
    returns: `<h3>Returns</h3><ul class="modal-list"><li>30-day return window from date of delivery.</li><li>Items must be unworn, unwashed, and in original condition with all tags attached.</li><li>Sale items are final sale and cannot be returned.</li><li>To initiate a return, contact <strong>hello@sluvet.com</strong> with your order number.</li><li>Refunds are processed within 5–7 working days of receiving the return.</li></ul>`,
    faq: `<h3>FAQ</h3><div class="modal-faq"><div class="modal-faq-item"><p class="modal-faq-q">How do I know my size?</p><p class="modal-faq-a">Refer to our Sizing Guide above. When in doubt, size up — our pieces are designed to wear with ease.</p></div><div class="modal-faq-item"><p class="modal-faq-q">Do you ship internationally?</p><p class="modal-faq-a">Yes. Free worldwide shipping on orders over £200.</p></div><div class="modal-faq-item"><p class="modal-faq-q">Can I cancel or modify my order?</p><p class="modal-faq-a">Contact us within 1 hour of placing your order at hello@sluvet.com. After that, cancellations cannot be guaranteed.</p></div><div class="modal-faq-item"><p class="modal-faq-q">How do I care for my SLUVET pieces?</p><p class="modal-faq-a">Each product has specific care instructions. As a rule: dry clean tailored pieces, hand wash knitwear cold, and store leather away from direct sunlight.</p></div></div>`,
    privacy: `<h3>Privacy Policy</h3><p class="modal-body">SLUVET collects only the information necessary to process your order and improve your experience. We do not sell or share your data with third parties. All payment information is encrypted and handled securely. For full details, contact hello@sluvet.com.</p>`,
    terms: `<h3>Terms &amp; Conditions</h3><p class="modal-body">By using this site and placing an order, you agree to our terms of service. All prices are in GBP and include applicable taxes. SLUVET reserves the right to update these terms at any time. Products are subject to availability. Images are for illustrative purposes.</p>`,
    cookies: `<h3>Cookie Policy</h3><p class="modal-body">SLUVET uses cookies solely to maintain your session and cart state. We do not use tracking or advertising cookies. By continuing to use this site you consent to this use. You can clear cookies at any time via your browser settings.</p>`,
    careers: `<h3>Careers</h3><p class="modal-body">We are a small, intentional team. When roles open, we announce them via our newsletter and email list. If you believe your skills align with SLUVET's values, send a brief introduction to <strong>hello@sluvet.com</strong>.</p>`,
    press: `<h3>Press &amp; Editorial</h3><p class="modal-body">For press enquiries, lookbook access, or editorial collaboration, contact <strong>press@sluvet.com</strong>. We respond to all genuine enquiries within 3 working days.</p>`,
  };

  const overlay = document.createElement('div');
  overlay.className = 'info-modal-overlay';
  overlay.innerHTML = `<div class="info-modal"><button class="info-modal-close" aria-label="Close">×</button><div class="info-modal-body" id="infoModalBody"></div></div>`;
  document.body.appendChild(overlay);

  const bodyEl   = overlay.querySelector('#infoModalBody');
  const closeBtn = overlay.querySelector('.info-modal-close');

  function open(key) {
    bodyEl.innerHTML = CONTENT[key] || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  document.querySelectorAll('[data-modal]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); open(el.dataset.modal); });
  });
})();

/* ── SCROLL REVEAL ───────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay ? +e.target.dataset.delay : 0;
        setTimeout(() => e.target.classList.add('visible'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
})();

/* ── GSAP SCROLL EXPERIENCE ─────────────────────────────── */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── 1. Showcase: product image depth parallax ── */
  gsap.to('.sc-large-wrap', {
    scrollTrigger: { trigger: '.showcase-section', start: 'top bottom', end: 'bottom top', scrub: true },
    y: -70, ease: 'none',
  });

  /* ── 2. Video: bg zooms in, content rises on enter ── */
  gsap.fromTo('.video-bg',
    { scale: 1.05 },
    { scrollTrigger: { trigger: '.video-section', start: 'top bottom', end: 'bottom top', scrub: true },
      scale: 1.22, ease: 'none' }
  );
  (() => {
    const vc = document.querySelector('.video-content');
    if (!vc) return;
    vc.classList.remove('reveal');
    gsap.from('.video-section .section-eyebrow', {
      scrollTrigger: { trigger: '.video-section', start: 'top 70%', toggleActions: 'play none none none' },
      y: 28, opacity: 0, duration: 0.8, ease: 'power2.out',
    });
    gsap.from('.video-title', {
      scrollTrigger: { trigger: '.video-section', start: 'top 65%', toggleActions: 'play none none none' },
      y: 70, opacity: 0, duration: 1.3, ease: 'power3.out',
    });
    gsap.from('.video-cta', {
      scrollTrigger: { trigger: '.video-section', start: 'top 58%', toggleActions: 'play none none none' },
      y: 40, opacity: 0, duration: 0.9, delay: 0.35, ease: 'power3.out',
    });
  })();

  /* ── 3. Manifesto: word-by-word scrub ── */
  (() => {
    const quoteEl = document.querySelector('.manifesto-quote');
    if (!quoteEl) return;
    const inner = document.querySelector('.manifesto-inner');
    if (inner) inner.classList.remove('reveal');
    quoteEl.innerHTML = quoteEl.textContent.trim()
      .split(/\s+/).map(w => `<span class="mq-word">${w}</span>`).join(' ');
    gsap.from('.manifesto-section .section-eyebrow', {
      scrollTrigger: { trigger: '.manifesto-section', start: 'top 80%', toggleActions: 'play none none none' },
      y: 22, opacity: 0, duration: 0.75, ease: 'power2.out',
    });
    gsap.fromTo(quoteEl.querySelectorAll('.mq-word'),
      { opacity: 0.1, y: 18 },
      { scrollTrigger: { trigger: '.manifesto-section', start: 'top 65%', end: 'center 28%', scrub: 1.2 },
        opacity: 1, y: 0, stagger: 0.07, ease: 'none' }
    );
    gsap.from('.manifesto-cite', {
      scrollTrigger: { trigger: '.manifesto-section', start: 'center 62%', toggleActions: 'play none none none' },
      y: 18, opacity: 0, duration: 0.8, ease: 'power2.out',
    });
  })();

  /* ── 4. Edit cards: rise up from below ── */
  gsap.from('.edit-card:not(.hidden)', {
    scrollTrigger: { trigger: '.edit-grid', start: 'top 85%', toggleActions: 'play none none none' },
    y: 60, opacity: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out',
  });

  /* ── 5. Story section: flowing panels with fast scroll reveal ── */
  (() => {
    const section = document.getElementById('storySection');
    const panels  = section ? [...section.querySelectorAll('.story-panel')] : [];
    const dots    = section ? [...section.querySelectorAll('.story-dot')]   : [];
    const counter = section?.querySelector('.sp-counter');
    if (!section || !panels.length) return;

    const LABELS = ['AS FEATURED IN','CLIENT VOICES','OUR STORY','REACH OUT','THE SLUVET EDIT'];

    const panelEls = panels.map(p => p.querySelectorAll(
      '.section-eyebrow, h2, h3, ' +
      '.press-logos span, ' +
      '.testimonial, ' +
      '.about-body, .about-cta, .about-stat, ' +
      '.contact-item, .contact-form, ' +
      '.newsletter-sub, .newsletter-form'
    ));

    let current = 0;
    const revealed = new Set();

    function revealPanel(idx) {
      if (revealed.has(idx)) return;
      revealed.add(idx);
      gsap.fromTo(panels[idx],
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
      if (panelEls[idx].length) {
        gsap.fromTo(panelEls[idx],
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.1, ease: 'power3.out', clearProps: 'transform,opacity' }
        );
      }
    }

    function setActive(idx) {
      current = idx;
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
      if (counter) counter.textContent = `0${idx + 1} — ${LABELS[idx]}`;
      revealPanel(idx);
    }

    /* Trigger reveal when panel is 25% in view */
    const panelIo = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const idx = panels.indexOf(e.target);
        if (idx < 0) return;
        if (idx !== current) setActive(idx);
        else revealPanel(idx);
      });
    }, { threshold: 0.25 });
    panels.forEach(p => panelIo.observe(p));

    /* Show/hide fixed dots + counter while story section is visible */
    const dotsEl = dots[0]?.parentElement;
    const sectionIo = new IntersectionObserver(entries => {
      const vis = entries[0].isIntersecting;
      dotsEl?.classList.toggle('story-in-view', vis);
      counter?.classList.toggle('story-in-view', vis);
    }, { threshold: 0.01 });
    sectionIo.observe(section);

    /* Dot clicks: scroll to that panel */
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () =>
        panels[i].scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
    });
  })();

  ScrollTrigger.refresh();
})();

/* ── THE EDIT: Women / Men / Children tab switcher ────────── */
(function () {
  const tabs  = document.querySelectorAll('.edit-tab');
  const cards = document.querySelectorAll('.edit-card');
  if (!tabs.length) return;

  const initTab = document.querySelector('.edit-tab.active')?.dataset.tab || 'women';
  cards.forEach(c => { if (c.dataset.gender !== initTab) c.classList.add('hidden'); });

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const gender = this.dataset.tab;
      cards.forEach(c => c.classList.toggle('hidden', c.dataset.gender !== gender));
    });
  });
})();

/* ── LOOKBOOK CAROUSEL ───────────────────────────────────── */
(function () {
  const wrap = document.getElementById('lookbookTrack');
  if (!wrap) return;

  const CARD_W = 258 + 14; // card width + gap

  /* Arrow navigation */
  const prev = document.querySelector('.lb-prev');
  const next = document.querySelector('.lb-next');
  function updateArrows() {
    if (prev) prev.disabled = wrap.scrollLeft <= 0;
    if (next) next.disabled = wrap.scrollLeft >= wrap.scrollWidth - wrap.clientWidth - 4;
  }
  prev?.addEventListener('click', () => { wrap.scrollBy({ left: -CARD_W * 2, behavior: 'smooth' }); });
  next?.addEventListener('click', () => { wrap.scrollBy({ left:  CARD_W * 2, behavior: 'smooth' }); });
  wrap.addEventListener('scroll', updateArrows, { passive: true });
  updateArrows();

  /* Drag to scroll (desktop) */
  let down = false, startX = 0, startScroll = 0;
  wrap.addEventListener('mousedown', e => {
    down = true; startX = e.pageX; startScroll = wrap.scrollLeft;
    wrap.classList.add('grabbing');
  });
  window.addEventListener('mouseup', () => { down = false; wrap.classList.remove('grabbing'); });
  window.addEventListener('mousemove', e => {
    if (!down) return;
    e.preventDefault();
    wrap.scrollLeft = startScroll - (e.pageX - startX) * 1.4;
  });
})();

/* ── PARALLAX BACKGROUND ORBS ────────────────────────────── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const DEFS = [
    { sel: '.manifesto-section', orbs: [
      { x:  8, y: 15, w: 720, h: 720, color: 'rgba(201,168,76,0.055)', blur: 150, speed: 0.08 },
      { x: 82, y: 65, w: 520, h: 520, color: 'rgba(80,20,120,0.065)',  blur: 110, speed: 0.22 },
      { x: 45, y: 50, w: 300, h: 300, color: 'rgba(201,168,76,0.040)', blur:  70, speed: 0.40 },
    ]},
    { sel: '.edit-section', orbs: [
      { x:  5, y: 20, w: 760, h: 760, color: 'rgba(201,168,76,0.035)', blur: 160, speed: 0.06 },
      { x: 87, y: 65, w: 560, h: 560, color: 'rgba(18,58,128,0.055)',  blur: 125, speed: 0.18 },
    ]},
    { sel: '.story-section', orbs: [
      { x: 10, y: 20, w: 700, h: 700, color: 'rgba(201,168,76,0.040)', blur: 150, speed: 0.00 },
      { x: 85, y: 60, w: 520, h: 520, color: 'rgba(80,20,120,0.050)',  blur: 110, speed: 0.00 },
      { x: 45, y: 80, w: 380, h: 380, color: 'rgba(18,58,128,0.045)',  blur:  90, speed: 0.00 },
    ]},
  ];

  const active = [];

  DEFS.forEach(({ sel, orbs }) => {
    const section = document.querySelector(sel);
    if (!section) return;

    const bg = document.createElement('div');
    bg.className = 'parallax-bg';
    section.prepend(bg);

    const items = orbs.map(({ x, y, w, h, color, blur, speed }) => {
      const el = document.createElement('div');
      el.className = 'px-orb';
      el.style.cssText = `width:${w}px;height:${h}px;left:${x}%;top:${y}%;` +
        `background:radial-gradient(circle,${color} 0%,transparent 70%);` +
        `filter:blur(${blur}px);transform:translate(-50%,-50%)`;
      bg.appendChild(el);
      return { el, speed };
    });

    active.push({ section, items });
  });

  /* Parallax only on desktop — touch scrolling jank not worth it */
  if (window.innerWidth <= 768) return;

  function update() {
    const vh = window.innerHeight;
    active.forEach(({ section, items }) => {
      const rect = section.getBoundingClientRect();
      const fromCenter = (rect.top + rect.height * 0.5) - vh * 0.5;
      items.forEach(({ el, speed }) => {
        const shift = fromCenter * speed;
        el.style.transform = `translate(-50%, calc(-50% + ${shift}px))`;
      });
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
})();

/* ── FLOATING PARTICLE BACKGROUND ────────────────────────── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!document.querySelector('.hero-section')) return; /* index only */

  const canvas = document.createElement('canvas');
  canvas.id    = 'particleBg';
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;' +
    'pointer-events:none;z-index:2;';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();

  /* Colour palette: gold, off-white, soft lilac */
  const PALETTE = ['201,168,76', '240,237,232', '180,140,220'];

  const COUNT = W < 768 ? 50 : 100;

  function rand(a, b) { return Math.random() * (b - a) + a; }

  function spawn(fromBottom) {
    return {
      x:      rand(0, W),
      y:      fromBottom ? H + rand(4, 24) : rand(-H * 0.2, H),
      r:      rand(0.4, 2.2),
      alpha:  rand(0.05, 0.20),
      vy:     rand(0.10, 0.45),   /* drift speed upward */
      vx:     rand(-0.12, 0.12),  /* slow horizontal drift */
      sway:   rand(0.003, 0.011), /* oscillation frequency */
      phase:  rand(0, Math.PI * 2),
      twink:  rand(0.010, 0.030), /* twinkle speed */
      col:    PALETTE[Math.floor(Math.random() < 0.65 ? 0 : Math.random() < 0.75 ? 1 : 2)],
    };
  }

  let pts = Array.from({ length: COUNT }, () => spawn(false));
  let tick = 0;

  (function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, W, H);
    tick++;

    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];

      /* Twinkle: opacity breathes gently */
      const a = p.alpha * (0.5 + 0.5 * Math.sin(tick * p.twink + p.phase));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.col},${+a.toFixed(3)})`;
      ctx.fill();

      /* Move */
      p.y -= p.vy;
      p.x += p.vx + Math.sin(tick * p.sway + p.phase) * 0.25;

      /* Wrap horizontally */
      if (p.x < -4)     p.x = W + 4;
      if (p.x > W + 4)  p.x = -4;

      /* Recycle when off top */
      if (p.y < -p.r * 2) pts[i] = spawn(true);
    }
  })();

  window.addEventListener('resize', resize, { passive: true });
})();
