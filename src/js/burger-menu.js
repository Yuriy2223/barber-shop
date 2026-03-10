const toggle = document.getElementById('mobile-menu-toggle');
const menu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('mobile-menu-close');
const navLinks = menu?.querySelectorAll('.mobile-nav-link') ?? [];

function openMenu() {
  menu.classList.remove('translate-x-full');
  toggle?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menu.classList.add('translate-x-full');
  toggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

toggle?.addEventListener('click', openMenu);
closeBtn?.addEventListener('click', closeMenu);

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

document.addEventListener('click', (e) => {
  const isOpen = !menu.classList.contains('translate-x-full');
  if (isOpen && !menu.contains(e.target) && !toggle.contains(e.target)) {
    closeMenu();
  }
});
