// Small DOM helpers shared by components.

/** Inline reference to an icon defined in the Icons sprite. */
export const icon = name => `<svg><use href="#i-${name}"/></svg>`;

export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Run fn once, the first time el scrolls into view. */
export function onVisible(el, fn, threshold = .25) {
  if (!("IntersectionObserver" in window)) return fn();
  const io = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { io.disconnect(); fn(); }
  }, { threshold });
  io.observe(el);
}

/** Fade in every .rv element as it scrolls into view. */
export function mountReveal(root = document) {
  const els = root.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window)) return els.forEach(el => el.classList.add("in"));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => io.observe(el));
}
