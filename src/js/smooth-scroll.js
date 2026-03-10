const header = document.querySelector('#site-header');

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');

    if (!targetId || targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const headerHeight = header?.offsetHeight || 0;
    const offset = targetElement.offsetTop - headerHeight;

    smoothScrollTo(window.scrollY, offset, 800);
  });
});

function smoothScrollTo(start, end, duration) {
  const distance = end - start;
  let startTime = null;

  function animationStep(currentTime) {
    if (!startTime) startTime = currentTime;

    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, start + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationStep);
    }
  }

  requestAnimationFrame(animationStep);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  header?.classList.toggle('is-scrolled', current > 0);

  lastScroll = current;
});
