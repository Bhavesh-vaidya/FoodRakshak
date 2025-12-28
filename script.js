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


//=======about us=============
// TYPEWRITER: continuous typing + deleting loop
document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("type-text");
  const cursorEl = document.querySelector(".type-cursor");

  if (!textEl || !cursorEl) return;

  const fullText = "Who We Are ..."; // the text to type
  const typingSpeed = 100;     // ms per character when typing
  const deletingSpeed = 60;    // ms per character when deleting (backspace)
  const pauseAfterTyping = 1500; // ms pause when full text typed
  const pauseAfterDeleting = 600; // ms pause after deletion before re-typing

  // helper sleep
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function typeLoop() {
    while (true) {
      // TYPE forward
      for (let i = 1; i <= fullText.length; i++) {
        textEl.textContent = fullText.slice(0, i);
        // keep cursor visible and positioned (cursor is separate element)
        cursorEl.style.opacity = "1";
        await wait(typingSpeed);
      }

      // Pause at full text
      await wait(pauseAfterTyping);

      // DELETE backwards
      for (let i = fullText.length; i >= 0; i--) {
        textEl.textContent = fullText.slice(0, i);
        await wait(deletingSpeed);
      }

      // Pause before starting again
      await wait(pauseAfterDeleting);
    }
  }

  // Kick off the loop
  typeLoop().catch(err => console.error("TypeLoop error:", err));
});



// ===============Services carousel==============
const track = document.querySelector(".services-carousel");
let cards = document.querySelectorAll(".service-card");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const cardGap = 30;
let index = 1;
let isTransitioning = false;

// Clone first & last
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

cards = document.querySelectorAll(".service-card");

const cardWidth = cards[0].offsetWidth + cardGap;

// Initial position
track.style.transform = `translateX(-${cardWidth * index}px)`;

// Slide function
function moveCarousel() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${cardWidth * index}px)`;
}

// Next
nextBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  isTransitioning = true;
  index++;
  moveCarousel();
});

// Prev
prevBtn.addEventListener("click", () => {
  if (isTransitioning) return;
  isTransitioning = true;
  index--;
  moveCarousel();
});

// Loop handling
track.addEventListener("transitionend", () => {
  isTransitioning = false;

  if (cards[index].classList.contains("clone")) {
    track.style.transition = "none";

    if (index === cards.length - 1) {
      index = 1; // jump to real first
    } else if (index === 0) {
      index = cards.length - 2; // jump to real last
    }

    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }
});


