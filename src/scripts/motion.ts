import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Smooth scroll. Lenis drives the page and ScrollTrigger reads from it, so the
 * two never fight over scroll position.
 */
function initSmoothScroll(): Lenis | null {
  if (prefersReducedMotion()) return null;

  const lenis = new Lenis({
    duration: 1.1,
    // Settled, unhurried decay — luxury reads as calm, never springy.
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page anchors route through Lenis so they inherit the same easing.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -100 });
    });
  });

  return lenis;
}

/**
 * Scroll reveals. Content is visible by default in the markup and only hidden
 * once JS confirms motion is wanted — so a failed script or a reduced-motion
 * visitor never gets a blank page.
 */
function initReveals(): void {
  if (prefersReducedMotion()) return;

  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  items.forEach((el) => {
    const kind = el.dataset.reveal || 'up';
    const delay = Number(el.dataset.revealDelay ?? 0);

    /* How far the element travels. 34px is the site's default and every
       existing reveal keeps it; `data-reveal-shift` exists because a large
       photograph needs a longer run than a paragraph does before the movement
       reads as movement at all. */
    const shift = Number(el.dataset.revealShift ?? 34);

    const from: gsap.TweenVars =
      kind === 'fade'
        ? { opacity: 0 }
        : kind === 'scale'
          ? { opacity: 0, scale: 1.06 }
          : /* `down` enters from ABOVE — a negative offset closing to zero.
               Added for paired images that should arrive from opposite
               directions; nothing else uses it, and `up` is unchanged. */
            kind === 'down'
            ? { opacity: 0, y: -shift }
            : { opacity: 0, y: shift };

    gsap.fromTo(el, from, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.05,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Staggered groups — spec rows, unit cards, credit columns.
  gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const children = Array.from(group.children) as HTMLElement[];
    gsap.fromTo(
      children,
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.075,
        scrollTrigger: { trigger: group, start: 'top 86%', once: true },
      },
    );
  });
}

/** Slow parallax drift on full-bleed imagery. Bounded, transform-only. */
function initParallax(): void {
  if (prefersReducedMotion()) return;

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const strength = Number(el.dataset.parallax || 12);
    gsap.fromTo(
      el,
      { yPercent: -strength / 2 },
      {
        yPercent: strength / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement ?? el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

/** The fixed bar condenses once the hero is behind it. */
function initHeaderState(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  const setState = () => {
    header.classList.toggle('is-condensed', window.scrollY > 40);
  };

  setState();
  window.addEventListener('scroll', setState, { passive: true });
}

export function initMotion(): void {
  initHeaderState();
  initSmoothScroll();
  initReveals();
  initParallax();

  // Late-loading imagery changes document height; recalculate once settled.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
