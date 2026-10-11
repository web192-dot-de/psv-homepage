// Mobiles Menü: ☰-Button klappt die Navigation auf und zu.
(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (!header || !toggle || !nav) return;

  function setOpen(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    toggle.textContent = open ? '✕' : '☰';
  }

  toggle.addEventListener('click', function () {
    setOpen(!header.classList.contains('nav-open'));
  });

  // Nach Klick auf einen Menüpunkt schließen (wichtig bei Anker-Links auf der Startseite)
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setOpen(false);
  });

  // Mit Escape schließen
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  // Beim Wechsel auf Desktop-Breite Zustand zurücksetzen
  window.matchMedia('(min-width: 821px)').addEventListener('change', function (m) {
    if (m.matches) setOpen(false);
  });
})();
