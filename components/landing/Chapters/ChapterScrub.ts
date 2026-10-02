import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Step 4 (scrub): ONE master scrubbed timeline on the hero track element.
// Each chapter owns a sub-range of the 8s master (I: 0–2, II: 2–4,
// III: 4–6, IV: 6–8). Nested timelines + relative positions ("<0.4")
// make each chapter feel like one continuous scrub with sequenced beats.
// Only transform / opacity / SVG-stroke properties are animated.
// Reduced motion: caller skips this entirely → markup shows final states.
export function buildChapterScrub(
  track: HTMLElement,
  scope: Element | string | object
): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => {
    const master = gsap.timeline({
      defaults: { ease: 'none' }, // scrub owns pacing; positions create sequence
      scrollTrigger: {
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6, // slight smoothing so strokes feel inked, not jittery
      },
    });

    // ---- Chapter I (master 0–2): brick courses draw, then altar reveals.
    const ch1 = gsap.timeline();
    ch1
      .fromTo(
        '.scr-ch1-course',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1, stagger: 0.12 },
        0
      )
      .fromTo(
        '.scr-ch1-altar',
        { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 60%' },
        { autoAlpha: 1, scale: 1, duration: 0.6 },
        '<0.4' // start while the last courses are still drawing
      );
    master.add(ch1, 0);

    // ---- Chapter II (master 2–4): axis draws, ticks pop, ring draws, 0 lands.
    const ch2 = gsap.timeline();
    ch2
      .fromTo(
        '.scr-ch2-axis',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.8 },
        0
      )
      .fromTo(
        '.scr-ch2-tick',
        { autoAlpha: 0, scaleY: 0, transformOrigin: '50% 50%' },
        { autoAlpha: 1, scaleY: 1, duration: 0.3, stagger: 0.08 },
        '<0.2' // ticks pop as the axis finishes
      )
      .fromTo(
        '.scr-ch2-ring',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.5 },
        '<0.3'
      )
      .fromTo(
        '.scr-ch2-zero',
        { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 60%' },
        { autoAlpha: 1, scale: 1, duration: 0.5 },
        '<0.2' // 0 lands inside its ring
      );
    master.add(ch2, 2);

    // ---- Chapter III (master 4–6): series terms appear, circle draws, π converges.
    const ch3 = gsap.timeline();
    ch3
      .fromTo(
        '.scr-ch3-term',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.25 },
        0
      )
      .fromTo(
        '.scr-ch3-circle',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.6 },
        '<0.3' // circle draws as the last terms land
      )
      .fromTo(
        '.scr-ch3-pi',
        { autoAlpha: 0, scale: 0.7, transformOrigin: '50% 50%' },
        { autoAlpha: 1, scale: 1, duration: 0.4 },
        '<0.3' // π converges at the centre
      );
    master.add(ch3, 4);

    // ---- Chapter IV (master 6–8): cells fill grid-wise, then row →
    // diagonal → column highlights sweep in sequence.
    const ch4 = gsap.timeline();
    ch4
      .fromTo(
        '.scr-ch4-cell',
        { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 50%' },
        { autoAlpha: 1, scale: 1, duration: 0.3, stagger: { each: 0.05, from: 'start' } },
        0
      )
      .fromTo(
        '.scr-ch4-hl',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, stagger: 0.2 },
        '+=0.15' // beat after the grid completes, then sequenced sweeps
      );
    master.add(ch4, 6);
  }, scope);
  return () => ctx.revert();
}
