const slider = document.getElementById('hero-slider');
const prevBtn = document.getElementById('hero-prev');
const nextBtn = document.getElementById('hero-next');
const dots = document.querySelectorAll('.hero-dot');
const slides = document.querySelectorAll('.hero-slide');
const total = slides.length;

let current = 0;
let autoplayTimer = null;
const AUTOPLAY_DELAY = 6000;

function goTo(index) {
  current = (index + total) % total;

  slider.style.transform = `translateX(-${current * 100}%)`;

  const parallaxOffset = window.scrollY * 0.15;
  const img = slides[current]?.querySelector('img');
  if (img) {
    img.style.transform = `translateY(${parallaxOffset}px)`;
  }

  dots.forEach((dot, i) => {
    const active = i === current;
    dot.classList.toggle('bg-white', active);
    dot.classList.toggle('w-8', active);
    dot.classList.toggle('bg-white/40', !active);
    dot.classList.toggle('w-3', !active);
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
          const parallaxOffset = window.scrollY * 0.15;
          const img = activeImg();
          if (img) {
            img.style.transform = `translateY(${parallaxOffset}px)`;
          }

          tick = false;
        });

        tick = true;
      }
    },
    { passive: true }
  );
}
