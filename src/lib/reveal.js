// Apparition douce des éléments .reveal quand ils entrent à l'écran.
// La classe « js » est posée dans le <head> (voir index.html) : sans JavaScript tout reste visible,
// et la CSS n'anime rien quand « réduire les animations » est activé.
export function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
  );
  items.forEach((el) => observer.observe(el));
}
