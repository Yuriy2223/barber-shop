const sections = document.querySelectorAll(
  '#about, #services, #stats, #barbers, #booking'
);
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const header = document.querySelector('#site-header');

const activeDot = `
  <span class="active-dot absolute -bottom-5 left-1/2 -translate-x-1/2 text-[#E8A045]" aria-hidden="true">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  </span>`;

function highlightActiveSection() {
  const scrollY = window.scrollY;
  const headerHeight = header?.offsetHeight || 0;

  navLinks.forEach((link) => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    link.querySelector('.active-dot')?.remove();
    const line = link.querySelector('span:not(.active-dot)');
    if (line) line.classList.replace('w-full', 'w-0');
  });

  mobileNavLinks.forEach((link) => {
    link.classList.remove('text-[#E8A045]', 'font-semibold');
    link.classList.add('text-white');
  });

  if (scrollY < 100) return;

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const sectionTop = section.offsetTop - headerHeight - 100;

    if (scrollY >= sectionTop) {
      const sectionId = section.getAttribute('id');

      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
          link.insertAdjacentHTML('beforeend', activeDot);
          const line = link.querySelector('span:not(.active-dot)');
          if (line) line.classList.replace('w-0', 'w-full');
        }
      });

      mobileNavLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('text-[#E8A045]', 'font-semibold');
          link.classList.remove('text-white');
        }
      });

      break;
    }
  }
}

window.addEventListener('scroll', highlightActiveSection, { passive: true });
highlightActiveSection();
