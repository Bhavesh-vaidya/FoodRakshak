// HERO SCROLL REVEAL ANIMATION
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector('.hero');
  const bg = document.querySelector('.hero-bg');

  if (!hero || !bg) return;

  let heroHeight = hero.offsetHeight;

  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    if (scrollY <= heroHeight) {
      // Pin the hero
      hero.style.position = "sticky";
      hero.style.top = "0";

      // Reveal the background image
      let progress = scrollY / heroHeight;
      let translateValue = 100 - (progress * 100);
      bg.style.transform = `translateY(${translateValue}%)`;

    } else {
      // Unpin and continue normal scrolling
      hero.style.position = "relative";
    }
  });
});
