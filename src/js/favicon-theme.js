const favicon = document.getElementById('favicon');

function updateFavicon() {
  if (!favicon) return;

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  favicon.href = isDark ? '/logo-light.svg' : '/logo-dark.svg';
}

updateFavicon();

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', updateFavicon);
