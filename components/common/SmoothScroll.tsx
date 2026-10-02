'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Step 3.2: app-wide smooth scroll + GSAP wiring.
// - Mounted once in app/layout.tsx (renders nothing itself).
// - Lenis drives native scroll; its 'scroll' event keeps ScrollTrigger
//   positions correct via gsap's ticker (standard Lenis integration).
// - Skipped entirely under prefers-reduced-motion: native scroll stays.
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
  return null;
}
