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
  setTimeout(() => {
    form.classList.remove('shake');
    errorEl.classList.remove('show');
  }, 2500);
}
