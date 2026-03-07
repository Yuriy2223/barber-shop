const toggle = document.getElementById('mobile-menu-toggle');
const menu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('mobile-menu-close');
const navLinks = menu?.querySelectorAll('.mobile-nav-link') ?? [];

function openMenu() {
  menu.classList.remove('translate-x-full');
  toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  menu.classList.add('translate-x-full');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

toggle?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);
navLinks.forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

const slider = document.getElementById('hero-slider');
const prevBtn = document.getElementById('hero-prev');
const nextBtn = document.getElementById('hero-next');
const dots = document.querySelectorAll('.hero-dot');
const slides = document.querySelectorAll('.hero-slide');
const total = slides.length;

let current = 0;
let autoplayTimer = null;
const AUTOPLAY_DELAY = 5000;

function goTo(index) {
  current = (index + total) % total;

  slider.style.transform = `translateX(-${current * 100}%)`;

  dots.forEach((dot, i) => {
    const active = i === current;
    dot.classList.toggle('bg-white', active);
    dot.classList.toggle('w-8', active);
    dot.classList.toggle('bg-white/40', !active);
    dot.classList.toggle('w-5', !active);
    dot.setAttribute('aria-selected', String(active));
  });
}

function next() {
  goTo(current + 1);
}
function prev() {
  goTo(current - 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
}
function stopAutoplay() {
  clearInterval(autoplayTimer);
}

prevBtn?.addEventListener('click', () => {
  prev();
  startAutoplay();
});
nextBtn?.addEventListener('click', () => {
  next();
  startAutoplay();
});

dots.forEach((dot) => {
  dot.addEventListener('click', () => {
    goTo(Number(dot.dataset.dot));
    startAutoplay();
  });
});

let touchStartX = 0;
slider?.addEventListener(
  'touchstart',
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true }
);
slider?.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? next() : prev();
    startAutoplay();
  }
});

slider?.addEventListener('mouseenter', stopAutoplay);
slider?.addEventListener('mouseleave', startAutoplay);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    next();
    startAutoplay();
  }
  if (e.key === 'ArrowLeft') {
    prev();
    startAutoplay();
  }
});

goTo(0);
startAutoplay();

if (window.matchMedia('(min-width: 1024px)').matches) {
  let tick = false;
  const activeImg = () => slides[current]?.querySelector('img');

  window.addEventListener(
    'scroll',
    () => {
      if (!tick) {
        requestAnimationFrame(() => {
          const img = activeImg();
          if (img)
            img.style.transform = `translateY(${window.scrollY * 0.18}px)`;
          tick = false;
        });
        tick = true;
      }
    },
    { passive: true }
  );
}

const favicon = document.getElementById('favicon');
function updateFavicon() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  favicon.href = isDark ? '/logo-dark.svg' : '/logo-light.svg';
}

updateFavicon();

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', updateFavicon);
