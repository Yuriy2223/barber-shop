const header = document.querySelector('#site-header');
const logo = document.querySelector('#header-logo');
const logoSource = document.querySelector('#header-logo-source');

window.addEventListener('scroll', () => {
  const scroll = window.scrollY;

  if (scroll > 20) {
    header.classList.add('header-scrolled');
    logoSource.srcset = '/logo-light.svg';
    logo.src = '/logo-light.svg';
  } else {
    header.classList.remove('header-scrolled');
    logoSource.srcset = '/logo-dark.svg';
    logo.src = '/logo-light.svg';
  }
});
