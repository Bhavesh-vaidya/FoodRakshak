// HERO SCROLL REVEAL ANIMATION (Smooth, No Disappear Issue)
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector('.hero');
  const bg = document.querySelector('.hero-bg');

  if (!hero || !bg) return;

  let heroHeight = hero.offsetHeight;

  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    // Limit progress between 0 and 1
    let progress = Math.min(scrollY / heroHeight, 1);

    // Smooth reveal movement
    let translateValue = 100 - (progress * 100);
    bg.style.transform = `translateY(${translateValue}%)`;

    if (scrollY < heroHeight) {
      // While within hero section → keep sticky
      hero.style.position = "sticky";
      hero.style.top = "0";
    } else {
      // Past hero section → release smoothly
      hero.style.position = "relative";
      bg.style.transform = `translateY(0%)`; // keep final revealed state
    }
  });
});
