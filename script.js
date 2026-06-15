/* ===== Bella Longevity Spa — interactions ===== */
(function () {
  'use strict';

  /* --- Nav: scrolled state --- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* --- Mobile menu --- */
  const burger = document.getElementById('burger');
  const navMobile = document.getElementById('navMobile');
  burger.addEventListener('click', () => navMobile.classList.toggle('is-open'));
  navMobile.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => navMobile.classList.remove('is-open'))
  );

  /* --- Hero slideshow --- */
  const slides = Array.from(document.querySelectorAll('.hero__slide'));
  const labels = Array.from(document.querySelectorAll('.hero__labels li'));
  const dotsWrap = document.getElementById('heroDots');
  let idx = 0;
  let timer;

  // build dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    if (i === 0) b.classList.add('is-active');
    b.addEventListener('click', () => go(i, true));
    dotsWrap.appendChild(b);
  });
  const dots = Array.from(dotsWrap.children);

  function go(n, manual) {
    slides[idx].classList.remove('is-active');
    labels[idx] && labels[idx].classList.remove('is-active');
    dots[idx].classList.remove('is-active');
    idx = (n + slides.length) % slides.length;
    slides[idx].classList.add('is-active');
    labels[idx] && labels[idx].classList.add('is-active');
    dots[idx].classList.add('is-active');
    if (manual) restart();
  }
  function next() { go(idx + 1); }
  function restart() { clearInterval(timer); timer = setInterval(next, 5000); }
  restart();

  /* --- Reveal on scroll --- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el, i) => {
    // small stagger for grid children
    el.style.transitionDelay = (Math.min(i % 4, 3) * 0.06) + 's';
    io.observe(el);
  });
})();
