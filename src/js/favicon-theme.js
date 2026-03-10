const favicon = document.getElementById('favicon');

function updateFavicon() {
  if (!favicon) return;

  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  favicon.href = isDark ? '/logo-dark.svg' : '/logo-light.svg';
}

updateFavicon();

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', updateFavicon);
