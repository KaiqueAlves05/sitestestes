export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
