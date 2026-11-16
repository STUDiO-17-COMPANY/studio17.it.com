const menu = document.querySelector('.menu');
const navigation = document.querySelector('#navigation');
const compact = window.matchMedia('(max-width: 760px)');

function updateMenu(open = false) {
  menu.hidden = !compact.matches;
  navigation.hidden = compact.matches && !open;
  menu.setAttribute('aria-expanded', String(compact.matches && open));
}

updateMenu();
compact.addEventListener('change', () => updateMenu());
menu.addEventListener('click', () => updateMenu(navigation.hidden));

navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!compact.matches || !link) return;

  updateMenu();
  const section = document.querySelector(link.hash);
  section.setAttribute('tabindex', '-1');
  section.focus({ preventScroll: true });
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape' || menu.getAttribute('aria-expanded') !== 'true') return;

  updateMenu();
  menu.focus();
});

if ('ResizeObserver' in window) {
  const layers = document.querySelectorAll('.scroll-stack > .scroll-layer');
  const observer = new ResizeObserver((entries) => {
    for (const { target } of entries) {
      target.style.setProperty('--layer-height', target.offsetHeight + 'px');
    }
  });

  for (const layer of layers) observer.observe(layer);
}
