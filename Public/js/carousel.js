// Carrousel de la section « Mes Projets » — flèches précédent/suivant,
// points de navigation synchronisés, et glissement tactile natif (scroll-snap).
(function () {
  const track = document.getElementById('projectsTrack');
  const prevBtn = document.getElementById('projectsPrev');
  const nextBtn = document.getElementById('projectsNext');
  const dotsWrap = document.getElementById('projectsDots');
  if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

  const cards = Array.from(track.children); // les <li>

  // Génère un point de navigation par projet
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', 'Aller au projet ' + (i + 1));
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  // Met à jour le point actif selon la carte actuellement visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          const index = cards.indexOf(entry.target);
          dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
        }
      });
    },
    { root: track, threshold: [0.6] }
  );
  cards.forEach((card) => observer.observe(card));

  // Boutons précédent / suivant : avance d'une carte (largeur + espacement)
  function pas() {
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 16;
    return cards[0].getBoundingClientRect().width + gap;
  }
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -pas(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: pas(), behavior: 'smooth' }));

  // Masque flèches + points et centre les cartes quand il n'y a rien à faire
  // défiler (ex. 1 ou 2 projets qui tiennent déjà dans la largeur disponible).
  // Basé sur le débordement réel (scrollWidth > clientWidth) plutôt que sur un
  // nombre de projets fixe : ça reste correct à toutes les largeurs d'écran.
  function updateNav() {
    const hasOverflow = track.scrollWidth > track.clientWidth + 1;
    prevBtn.hidden = !hasOverflow;
    nextBtn.hidden = !hasOverflow;
    dotsWrap.hidden = !hasOverflow;
    track.classList.toggle('is-centered', !hasOverflow);
  }
  updateNav();
  window.addEventListener('resize', updateNav);
})();
