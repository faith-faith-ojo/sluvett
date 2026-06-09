'use strict';

/* ── BACKGROUND SLIDESHOW ────────────────────────────────── */
(function () {
  const slides = document.querySelectorAll('.lp-bg-slide');
  const dots   = document.querySelectorAll('.lp-dot');
  if (!slides.length) return;
  let idx = 0;
  setInterval(() => {
    slides[idx].classList.remove('active');
    dots[idx]?.classList.remove('active');
    idx = (idx + 1) % slides.length;
    slides[idx].classList.add('active');
    dots[idx]?.classList.add('active');
  }, 5000);
})();

/* ── LETTER-BY-LETTER HEADLINE ───────────────────────────── */
(function () {
  document.querySelectorAll('.lw').forEach((word, wi) => {
    const txt = word.textContent;
    word.innerHTML = [...txt].map((ch, ci) => {
      const delay = (1.0 + wi * 0.13 + ci * 0.05).toFixed(3);
      const char  = ch === ' ' ? '&nbsp;' : ch;
      return `<span class="lc" style="animation-delay:${delay}s">${char}</span>`;
    }).join('');
  });
})();

/* ── MOUSE SPOTLIGHT ─────────────────────────────────────── */
(function () {
  const panel = document.querySelector('.lp-right');
  if (!panel) return;
  panel.addEventListener('mousemove', e => {
    const r = panel.getBoundingClientRect();
    panel.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%');
    panel.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%');
  });
})();

/* ── CUSTOM CURSOR ───────────────────────────────────────── */
(function () {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function tick() {
    requestAnimationFrame(tick);
    rx += (mx - rx) * 0.35;
    ry += (my - ry) * 0.35;
    dot.style.transform  = `translate(${mx}px, ${my}px)`;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
  })();
  document.querySelectorAll('a, button, input, label').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('h'); ring.classList.add('h'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('h'); ring.classList.remove('h'); });
  });
})();

/* ── THREE.JS WAVING CLOTH BACKGROUND ───────────────────── */
(function () {
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('loginCanvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setPixelRatio(1);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 12;

  /* white cloth layer */
  const geoA = new THREE.PlaneGeometry(30, 20, 72, 44);
  const matA = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.055 });
  scene.add(new THREE.Mesh(geoA, matA));

  /* gold cloth layer */
  const geoB = new THREE.PlaneGeometry(26, 17, 52, 34);
  const matB = new THREE.MeshBasicMaterial({ color: 0xc9a84c, wireframe: true, transparent: true, opacity: 0.032 });
  const meshB = new THREE.Mesh(geoB, matB);
  meshB.position.z = -1.4;
  scene.add(meshB);

  let tick = 0, mx = 0, my = 0;
  window.addEventListener('mousemove', e => {
    mx = e.clientX / window.innerWidth  - 0.5;
    my = e.clientY / window.innerHeight - 0.5;
  });

  function wave(geo, offset, amp) {
    const p = geo.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i);
      p.setZ(i,
        Math.sin(x * 0.32 + tick + offset)  * Math.cos(y * 0.22 + tick * 0.65) * amp +
        Math.sin(x * 0.18 + tick * 0.48)    * Math.sin(y * 0.38 + tick * 0.28) * amp * 0.5
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
    camera.position.y += (-my * 0.9 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
})();

/* ── PASSWORD VISIBILITY TOGGLE ─────────────────────────── */
const passEl    = document.getElementById('loginPassword');
const toggleBtn = document.getElementById('togglePass');

toggleBtn?.addEventListener('click', () => {
  const show = passEl.type === 'password';
  passEl.type = show ? 'text' : 'password';
  toggleBtn.querySelector('.eye-open').style.display = show ? 'none'  : '';
  toggleBtn.querySelector('.eye-shut').style.display = show ? ''      : 'none';
  passEl.focus();
});

/* ── BRUTE FORCE PROTECTION ──────────────────────────────── */
const MAX_ATTEMPTS = 5;
const LOCK_MS      = 5 * 60 * 1000;

function getLockState() {
  try { return JSON.parse(localStorage.getItem('sluvetLock') || '{}'); } catch (e) { return {}; }
}
function isLocked() {
  const s = getLockState();
  return s.until && Date.now() < s.until;
}
function recordFailure() {
  const s = getLockState();
  s.count = (s.count || 0) + 1;
  if (s.count >= MAX_ATTEMPTS) s.until = Date.now() + LOCK_MS;
  localStorage.setItem('sluvetLock', JSON.stringify(s));
  return s;
}
function clearLock() { localStorage.removeItem('sluvetLock'); }

/* ── FORM LOGIC ──────────────────────────────────────────── */
const form      = document.getElementById('loginForm');
const emailEl   = document.getElementById('loginEmail');
const errorEl   = document.getElementById('loginError');
const submitEl  = document.getElementById('loginSubmit');
const submitTxt = submitEl?.querySelector('.lp-submit-text');
const arrow     = submitEl?.querySelector('.lp-arrow');

form?.addEventListener('submit', e => {
  e.preventDefault();

  if (isLocked()) {
    const mins = Math.ceil((getLockState().until - Date.now()) / 60000);
    showError(`Too many attempts. Try again in ${mins} minute${mins === 1 ? '' : 's'}.`);
    return;
  }

  const email = emailEl.value.trim();
  const pass  = passEl.value.toLowerCase().trim();

  if (!email.includes('@')) {
    showError('Enter a valid email address.');
    return;
  }

  if (pass === 'sluvet') {
    clearLock();
    submitEl.classList.add('loading');
    submitEl.disabled = true;
    if (submitTxt) submitTxt.textContent = 'Verifying…';

    localStorage.setItem('sluvetAuth', JSON.stringify({ ts: Date.now() }));

    setTimeout(() => {
      submitEl.classList.remove('loading');
      submitEl.classList.add('success');
      if (submitTxt) submitTxt.textContent = 'Access Granted';
      if (arrow)     arrow.textContent     = '✓';
      window.SLUVET?.charSuccess?.();

      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    }, 900);

  } else {
    const s = recordFailure();
    if (isLocked()) {
      showError('Too many failed attempts. Access locked for 5 minutes.');
    } else {
      const left = MAX_ATTEMPTS - s.count;
      showError(`Incorrect password. ${left} attempt${left === 1 ? '' : 's'} remaining.`);
    }
    passEl.value = '';
    passEl.focus();
  }
});

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.add('show');
  form.classList.add('shake');
  window.SLUVET?.charError?.();
  setTimeout(() => {
    form.classList.remove('shake');
    errorEl.classList.remove('show');
  }, 2500);
}

/* ── ANIMATED CHARACTERS ──────────────────────────────────── */
(function () {
  const charsEl = document.getElementById('lpCharacters');
  if (!charsEl) return;

  const charDefs = [
    { el: document.getElementById('wrap-purple'), baseZ:   0, shakeClass: 'ch-shake-purple', hideClass: 'hide-purple' },
    { el: document.getElementById('wrap-pink'),   baseZ:  50, shakeClass: 'ch-shake-pink',   hideClass: 'hide-pink'   },
    { el: document.getElementById('wrap-yellow'), baseZ: 100, shakeClass: 'ch-shake-yellow', hideClass: 'hide-yellow' },
    { el: document.getElementById('wrap-orange'), baseZ: 150, shakeClass: 'ch-shake-orange', hideClass: 'hide-orange' }
  ];

  const pupilDefs = [
    { el: document.getElementById('pupil-purple-l'), curX: 0, curY: 0, tX: 0, tY: 0 },
    { el: document.getElementById('pupil-purple-r'), curX: 0, curY: 0, tX: 0, tY: 0 },
    { el: document.getElementById('pupil-pink-l'),   curX: 0, curY: 0, tX: 0, tY: 0 },
    { el: document.getElementById('pupil-pink-r'),   curX: 0, curY: 0, tX: 0, tY: 0 },
    { el: document.getElementById('pupil-yellow-l'), curX: 0, curY: 0, tX: 0, tY: 0 },
    { el: document.getElementById('pupil-yellow-r'), curX: 0, curY: 0, tX: 0, tY: 0 },
    { el: document.getElementById('pupil-orange-l'), curX: 0, curY: 0, tX: 0, tY: 0 },
    { el: document.getElementById('pupil-orange-r'), curX: 0, curY: 0, tX: 0, tY: 0 }
  ];

  let mX = window.innerWidth / 2, mY = window.innerHeight / 2;
  let hidingPass = false, processingError = false;

  setTimeout(() => charsEl.classList.add('chars-loaded'), 1400);

  document.addEventListener('mousemove', e => { mX = e.clientX; mY = e.clientY; });

  /* cover/reveal eyes on password field focus */
  const passInput = document.getElementById('loginPassword');
  passInput?.addEventListener('focus', () => {
    if (processingError) return;
    hidingPass = true;
    charDefs.forEach(c => c.el?.classList.add(c.hideClass));
  });
  passInput?.addEventListener('blur', () => {
    if (processingError) return;
    hidingPass = false;
    charDefs.forEach(c => c.el?.classList.remove(c.hideClass));
    pupilDefs.forEach(p => { p.tX = 0; p.tY = 0; });
  });

  /* trigger scared expression + shake on wrong password */
  window.SLUVET = window.SLUVET || {};
  window.SLUVET.charError = function () {
    if (processingError) return;
    hidingPass = false;
    processingError = true;
    charDefs.forEach(c => c.el?.classList.remove(c.hideClass));
    charsEl.classList.add('wrong-pass');
    charDefs.forEach(c => {
      if (!c.el) return;
      c.el.style.transform = `translateZ(${c.baseZ}px)`;
      c.el.classList.add(c.shakeClass);
    });
    document.getElementById('mouth-purple')?.setAttribute('d', 'M 55 82 Q 70 68 85 82');
    document.getElementById('mouth-pink')?.setAttribute('d',   'M 45 68 Q 50 60 55 68');
    document.getElementById('mouth-yellow')?.setAttribute('d', 'M 42 106 Q 58 88 74 104');
    document.getElementById('mouth-orange')?.setAttribute('d', 'M 108 128 Q 115 116 122 128');
    setTimeout(() => {
      charsEl.classList.remove('wrong-pass');
      charDefs.forEach(c => c.el?.classList.remove(c.shakeClass));
      processingError = false;
      document.getElementById('mouth-purple')?.setAttribute('d', 'M 55 75 Q 70 85 85 75');
      document.getElementById('mouth-pink')?.setAttribute('d',   'M 45 65 Q 50 65 55 65');
      document.getElementById('mouth-yellow')?.setAttribute('d', 'M 45 100 Q 60 100 75 100');
      document.getElementById('mouth-orange')?.setAttribute('d', 'M 100 118 Q 115 130 130 118');
      pupilDefs.forEach(p => { p.tX = 0; p.tY = 0; });
    }, 1800);
  };

  /* trigger happy bounce + big smiles on correct login */
  window.SLUVET.charSuccess = function () {
    document.getElementById('mouth-purple')?.setAttribute('d', 'M 50 72 Q 70 94 90 72');
    document.getElementById('mouth-pink')?.setAttribute('d',   'M 40 62 Q 50 76 60 62');
    document.getElementById('mouth-yellow')?.setAttribute('d', 'M 40 97 Q 60 118 80 97');
    document.getElementById('mouth-orange')?.setAttribute('d', 'M 88 112 Q 115 140 142 112');
    charDefs.forEach((c, i) => {
      setTimeout(() => c.el?.classList.add('ch-success'),    i * 90);
      setTimeout(() => c.el?.classList.remove('ch-success'), i * 90 + 900);
    });
  };

  const hasPointer = matchMedia('(pointer:fine)').matches;

  /* render loop — breathing + tilt + pupil tracking */
  (function tick() {
    requestAnimationFrame(tick);

    charDefs.forEach((c, i) => {
      if (!c.el || processingError) return;
      const breathe = 1 + Math.sin(Date.now() * 0.0009 + i * 0.9) * 0.018;
      if (!hasPointer) {
        c.el.style.transform = `scale(${breathe}) translateZ(${c.baseZ}px)`;
        return;
      }
      const r    = c.el.getBoundingClientRect();
      const dx   = mX - (r.left + r.width  / 2);
      const dy   = mY - (r.top  + r.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const tiltX = -(dy / window.innerHeight) * 14;
      const tiltY =  (dx / window.innerWidth)  * 14;
      const grow  = dist < 450 ? 1 + (1 - dist / 450) * 0.08 : 1;
      c.el.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${grow * breathe}) translateZ(${c.baseZ}px)`;
    });

    pupilDefs.forEach(p => {
      if (!p.el) return;
      if (!hidingPass && !processingError && hasPointer) {
        const r = p.el.getBoundingClientRect();
        if (r.width > 0) {
          const angle = Math.atan2(mY - (r.top + r.height / 2), mX - (r.left + r.width / 2));
          p.tX = Math.cos(angle) * 5.5;
          p.tY = Math.sin(angle) * 5.5;
        }
      } else if (hidingPass || !hasPointer) {
        p.tX = 0; p.tY = 0;
      }
      p.curX += (p.tX - p.curX) * 0.12;
      p.curY += (p.tY - p.curY) * 0.12;
      p.el.style.transform = `translate(${p.curX}px, ${p.curY}px)`;
    });
  })();
})();
