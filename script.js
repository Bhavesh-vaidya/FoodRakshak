// HERO PIN + RISE ANIMATION
// Hero will be pinned while the .hero-wrap container is in view.
// Background image rises from translateY(100%) -> translateY(0%).

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector('.hero-wrap');
  const hero = document.querySelector('.hero');
  const bg = document.querySelector('.hero-bg');

  if (!wrapper || !hero || !bg) return;

  // Recompute boundaries on resize (responsive)
  let startScroll, endScroll;
  function recompute() {
    const rect = wrapper.getBoundingClientRect();
    // top of wrapper relative to document:
    startScroll = window.pageYOffset + rect.top;
    // end scroll position where pinned period finishes:
    // we want wrapperBottom - viewportHeight
    endScroll = startScroll + wrapper.offsetHeight - window.innerHeight;
  }

  recompute();
  window.addEventListener('resize', () => {
    recompute();
  });

  // animation frame throttle for smoothness
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }

  function clamp(v, a = 0, b = 1) {
    return Math.max(a, Math.min(b, v));
  }

  function update() {
    const y = window.pageYOffset;

    // progress 0..1 for the pin-duration: starts when wrapper top reaches viewport,
    // ends when wrapperBottom reaches viewport bottom (i.e. when wrapper has scrolled by wrapper.offsetHeight - viewport)
    const total = endScroll - startScroll;
    let progress = 0;
    if (total > 0) {
      progress = clamp((y - startScroll) / total, 0, 1);
    }

    // translate from 100% -> 0% as progress goes 0->1
    const translateValue = 100 - progress * 100;
    bg.style.transform = `translateY(${translateValue}%)`;

    // When progress is 1, the image fully in place and the wrapper continues scrolling normally,
    // the sticky hero will naturally unpin because its wrapper scrolled out of the pin range.
    // We don't modify hero.position in JS at all.

    // Fade white text based on progress

  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // initial update in case page isn't scrolled to top
  update();
});
