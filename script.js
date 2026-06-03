/* ═══════════════════════════════════════════════════════════
   COLOR THEMES — 5 dark + 5 light
   Space key cycles through them, theme toggle switches mode
   ═══════════════════════════════════════════════════════════ */

const DARK_THEMES = [
  { name: 'Neon Green',  accent: '#00ff88', dim: 'rgba(0,255,136,0.1)',   bg: '#0a0a0a', bg2: '#111',    dot: '#00ff88' },
  { name: 'Cyber Blue',  accent: '#00cfff', dim: 'rgba(0,207,255,0.1)',   bg: '#060d12', bg2: '#0d1a22', dot: '#00cfff' },
  { name: 'Plasma Pink', accent: '#ff2d78', dim: 'rgba(255,45,120,0.1)',  bg: '#0d060a', bg2: '#1a0d12', dot: '#ff2d78' },
  { name: 'Solar Gold',  accent: '#ffd700', dim: 'rgba(255,215,0,0.1)',   bg: '#0d0c06', bg2: '#1a1a0d', dot: '#ffd700' },
  { name: 'Void Purple', accent: '#bf5fff', dim: 'rgba(191,95,255,0.1)',  bg: '#0a060d', bg2: '#130d1a', dot: '#bf5fff' },
];

const LIGHT_THEMES = [
  { name: 'Ocean Blue',  accent: '#0066cc', dim: 'rgba(0,102,204,0.1)',   bg: '#f0f2f5', bg2: '#ffffff', dot: '#0066cc' },
  { name: 'Forest',      accent: '#1a8a4a', dim: 'rgba(26,138,74,0.1)',   bg: '#f0f5f2', bg2: '#ffffff', dot: '#1a8a4a' },
  { name: 'Crimson',     accent: '#cc2244', dim: 'rgba(204,34,68,0.1)',   bg: '#f5f0f2', bg2: '#ffffff', dot: '#cc2244' },
  { name: 'Amber',       accent: '#c87800', dim: 'rgba(200,120,0,0.1)',   bg: '#f5f3ee', bg2: '#ffffff', dot: '#c87800' },
  { name: 'Grape',       accent: '#7b3fa0', dim: 'rgba(123,63,160,0.1)', bg: '#f3f0f5', bg2: '#ffffff', dot: '#7b3fa0' },
];

let isLightMode  = false;
let themeIndex   = 0;    // 0–4, shared index for both modes

function getThemes() {
  return isLightMode ? LIGHT_THEMES : DARK_THEMES;
}

function applyTheme(t) {
  const r = document.documentElement.style;
  r.setProperty('--accent-color', t.accent);
  r.setProperty('--accent-dim',   t.dim);
  r.setProperty('--bg-color',     t.bg);
  r.setProperty('--bg-secondary', t.bg2);

  // Light mode class controls text/glass/border tokens
  if (isLightMode) {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }

  updateIndicator();
  updateParticleColor(t.accent);
  localStorage.setItem('themeIndex', themeIndex);
  localStorage.setItem('themeMode',  isLightMode ? 'light' : 'dark');
}

function cycleTheme() {
  themeIndex = (themeIndex + 1) % 5;

  // Flash body
  document.body.classList.add('theme-switching');
  setTimeout(() => document.body.classList.remove('theme-switching'), 260);

  applyTheme(getThemes()[themeIndex]);
}

/* ── Indicator dots ─────────────────────────────────────── */
function buildIndicator() {
  const container = document.getElementById('ti-dots');
  container.innerHTML = '';
  getThemes().forEach((t, i) => {
    const dot = document.createElement('div');
    dot.className = 'ti-dot' + (i === themeIndex ? ' active' : '');
    dot.style.background    = i === themeIndex ? t.dot : 'transparent';
    dot.style.borderColor   = t.dot;
    dot.style.color         = t.dot;
    container.appendChild(dot);
  });
}

function updateIndicator() {
  const dots = document.querySelectorAll('.ti-dot');
  const themes = getThemes();
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === themeIndex);
    dot.style.background  = i === themeIndex ? themes[i].dot : 'transparent';
    dot.style.borderColor = themes[i].dot;
    dot.style.color       = themes[i].dot;
  });
}

/* ═══════════════════════════════════════════════════════════
   THREE.JS PARTICLE SYSTEM
   ═══════════════════════════════════════════════════════════ */
let particleColors = null;   // ref to live color buffer
let threeRenderer  = null;

function initThreeJS() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  threeRenderer = renderer;

  const particleCount = 100;
  const particles     = [];
  const geometry      = new THREE.BufferGeometry();
  const positions     = new Float32Array(particleCount * 3);
  const colors        = new Float32Array(particleCount * 3);

  function hexToRgb(hex) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return r
      ? { r: parseInt(r[1],16)/255, g: parseInt(r[2],16)/255, b: parseInt(r[3],16)/255 }
      : { r: 0, g: 1, b: 0.53 };
  }

  const initColor = getThemes()[themeIndex].accent;
  const rgb = hexToRgb(initColor);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;
    positions[i*3]=x; positions[i*3+1]=y; positions[i*3+2]=z;
    particles.push({ x, y, z,
      vx: (Math.random()-0.5)*0.05,
      vy: (Math.random()-0.5)*0.05,
      vz: (Math.random()-0.5)*0.05
    });
    colors[i*3]=rgb.r; colors[i*3+1]=rgb.g; colors[i*3+2]=rgb.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  particleColors = geometry.attributes.color;

  const material = new THREE.PointsMaterial({ size: 0.8, vertexColors: true, transparent: true, opacity: 0.8 });
  const pointCloud = new THREE.Points(geometry, material);
  scene.add(pointCloud);
  camera.position.z = 50;

  function animate() {
    requestAnimationFrame(animate);
    const pos = geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      particles[i].x += particles[i].vx;
      particles[i].y += particles[i].vy;
      particles[i].z += particles[i].vz;
      if (Math.abs(particles[i].x) > 50) particles[i].vx *= -1;
      if (Math.abs(particles[i].y) > 50) particles[i].vy *= -1;
      if (Math.abs(particles[i].z) > 50) particles[i].vz *= -1;
      pos[i*3]=particles[i].x; pos[i*3+1]=particles[i].y; pos[i*3+2]=particles[i].z;
    }
    pointCloud.rotation.y += 0.001;
    pointCloud.rotation.z += 0.0005;
    geometry.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

function updateParticleColor(hex) {
  if (!particleColors) return;
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!r) return;
  const cr = parseInt(r[1],16)/255;
  const cg = parseInt(r[2],16)/255;
  const cb = parseInt(r[3],16)/255;
  for (let i = 0; i < particleColors.count; i++) {
    particleColors.array[i*3]   = cr;
    particleColors.array[i*3+1] = cg;
    particleColors.array[i*3+2] = cb;
  }
  particleColors.needsUpdate = true;
}

/* ═══════════════════════════════════════════════════════════
   THEME TOGGLE (light/dark mode button)
   ═══════════════════════════════════════════════════════════ */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const icon   = toggle.querySelector('i');

  function syncIcon() {
    icon.className = isLightMode ? 'fas fa-moon' : 'fas fa-sun';
  }

  toggle.addEventListener('click', () => {
    isLightMode = !isLightMode;
    // rebuild dots for the new mode's colors
    buildIndicator();
    applyTheme(getThemes()[themeIndex]);
    syncIcon();
  });

  syncIcon();
}

/* ═══════════════════════════════════════════════════════════
   SPACE KEY — cycle color
   ═══════════════════════════════════════════════════════════ */
function initSpaceKey() {
  document.addEventListener('keydown', e => {
    // Don't fire when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.code === 'Space') {
      e.preventDefault();
      cycleTheme();
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   BOOT
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Restore saved prefs
  const savedIndex = parseInt(localStorage.getItem('themeIndex') ?? '0');
  const savedMode  = localStorage.getItem('themeMode') ?? 'dark';
  themeIndex  = isNaN(savedIndex) ? 0 : Math.min(savedIndex, 4);
  isLightMode = savedMode === 'light';

  buildIndicator();
  applyTheme(getThemes()[themeIndex]);

  initThreeJS();
  initThemeToggle();
  initSpaceKey();
});
