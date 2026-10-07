'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { EASE, FadeUp } from './shared';

const STATS = [
  { era: 'c. 800 BCE', fact: 'Śulba Sūtras — altar geometry' },
  { era: 'c. 200 BCE', fact: 'Piṅgala — binary verse meters' },
  { era: '499 CE', fact: 'Āryabhaṭa — π ≈ 3.1416' },
  { era: '628 CE', fact: 'Brahmagupta — rules of zero' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.1]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const wheelParallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  // Mouse 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 16 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!visualRef.current) return;
    const rect = visualRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // @ts-expect-error Lenis attached to window
      if (window.__lenis) {
        // @ts-expect-error Lenis scrollTo
        window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0B0A08] pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col justify-between"
    >
      {/* Background Giant Devanagari Watermark "गणित" */}
      <motion.div
        style={{ y: watermarkY, opacity: heroOpacity }}
        aria-hidden="true"
        className="absolute right-[-5vw] top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
      >
        <span
          className="font-dev text-outline-faint text-[38vw] lg:text-[28vw] leading-none block"
          style={{ letterSpacing: '-0.05em' }}
        >
          गणित
        </span>
      </motion.div>

      {/* Main Grid Content */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-[40px] h-[1.5px] bg-[#E5A93C]" />
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.4em] text-[#E5A93C] font-semibold">
                IKS · Indian Knowledge Systems
              </p>
            </div>

            {/* H1 with 3 Masked Line Reveals */}
            <h1 className="font-display font-medium text-[clamp(3.2rem,8.5vw,6.8rem)] leading-[0.98] tracking-[-0.02em] mb-7 select-none">
              {/* Line 1 */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.15, delay: 0.3, ease: EASE }}
                  className="block text-[#F5F0E6]"
                >
                  Where Zero
                </motion.span>
              </div>

              {/* Line 2 */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.15, delay: 0.45, ease: EASE }}
                  className="block text-[#E5A93C] italic font-serif"
                >
                  Was Born
                </motion.span>
              </div>

              {/* Line 3 */}
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.15, delay: 0.6, ease: EASE }}
                  className="block text-[#F5F0E6]"
                >
                  & Infinity Took Shape
                </motion.span>
              </div>
            </h1>

            {/* Sub copy */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.0, ease: EASE }}
              className="font-sans text-base sm:text-lg lg:text-xl text-[#A8A090] font-light max-w-2xl leading-relaxed mb-9"
            >
              A scrollytelling descent through 2,000+ years of ancient Indian mathematics —
              from knotted altar ropes to the Kerala school&apos;s infinite series.
              The zero you read, the decimals you compute, the sine you plot: it all began here.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
              className="flex flex-wrap items-center gap-4 sm:gap-5"
            >
              <button
                onClick={() => scrollTo('journey')}
                data-testid="hero-cta-journey-btn"
                className="group vedic-pill vedic-pill-gold"
              >
                <span>Begin the Journey</span>
                <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
              </button>

              <button
                onClick={() => scrollTo('pioneers')}
                data-testid="hero-cta-pioneers-btn"
                className="vedic-pill vedic-pill-ghost"
              >
                Meet the Pioneers
              </button>

              <Link
                href="/calculator"
                className="font-mono text-xs text-[#FF9F1C] hover:text-[#E5A93C] underline underline-offset-4 decoration-[#FF9F1C]/40 hover:decoration-[#E5A93C] ml-2 tracking-wider uppercase transition-colors"
              >
                Try Live Calculator →
              </Link>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Konark Wheel Arch + Rotating Yantra */}
          <div
            ref={visualRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-5 flex justify-center items-center relative py-6"
            style={{ perspective: 1000 }}
          >
            <motion.div
              style={{ rotateX, rotateY }}
              className="relative w-[340px] sm:w-[380px] h-[460px] sm:h-[500px] flex items-center justify-center transition-transform duration-200"
            >
              {/* Rotating SVG Yantra Behind the Arch */}
              <div className="absolute inset-[-40px] sm:inset-[-60px] pointer-events-none flex items-center justify-center z-0">
                <svg
                  className="w-full h-full max-w-[500px] max-h-[500px]"
                  viewBox="0 0 420 420"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer counter-rotating group 1 (46s clockwise) */}
                  <g className="animate-spin-slower origin-center">
                    {/* Outer dashed gold circle r 186 */}
                    <circle
                      cx="210"
                      cy="210"
                      r="186"
                      stroke="#E5A93C"
                      strokeWidth="1.2"
                      strokeDasharray="4 6"
                      opacity="0.45"
                    />
                    {/* 12 gold dots */}
                    {[...Array(12)].map((_, i) => {
                      const angle = (i * 360) / 12;
                      const rad = (angle * Math.PI) / 180;
                      const cx = 210 + 186 * Math.cos(rad);
                      const cy = 210 + 186 * Math.sin(rad);
                      return (
                        <circle
                          key={`dot-${i}`}
                          cx={cx}
                          cy={cy}
                          r="3"
                          fill="#E5A93C"
                          opacity="0.8"
                        />
                      );
                    })}
                  </g>

                  {/* Inner counter-rotating group 2 (62s reverse) */}
                  <g className="animate-spin-rev origin-center">
                    {/* Vermilion ring r 166 */}
                    <circle
                      cx="210"
                      cy="210"
                      r="166"
                      stroke="#C84B31"
                      strokeWidth="1.2"
                      opacity="0.5"
                    />
                    {/* 8 rotated squares on vermilion ring */}
                    {[...Array(8)].map((_, i) => {
                      const angle = (i * 360) / 8;
                      return (
                        <rect
                          key={`sq-${i}`}
                          x="204"
                          y="40"
                          width="12"
                          height="12"
                          stroke="#E5A93C"
                          strokeWidth="1"
                          fill="none"
                          opacity="0.6"
                          transform={`rotate(${angle} 210 210)`}
                        />
                      );
                    })}
                  </g>
                </svg>
              </div>

              {/* Arch-Framed Photo */}
              <div
                data-testid="hero-wheel-image"
                className="relative z-10 w-[300px] sm:w-[350px] h-[430px] sm:h-[480px] rounded-t-[999px] rounded-b-2xl overflow-hidden border border-[#E5A93C]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(229,169,60,0.15)] bg-[#13110D]"
              >
                {/* Parallax inner image */}
                <motion.div
                  style={{ y: wheelParallaxY }}
                  className="w-full h-[120%] -mt-[10%] relative"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=1600&auto=format&fit=crop"
                    alt="Konark Sun Temple celestial stone wheel"
                    className="w-full h-full object-cover scale-110 brightness-90 contrast-110"
                  />
                  {/* Ancient dark gold vignette overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-transparent to-[#0B0A08]/40" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A08]/30 via-transparent to-[#0B0A08]/30" />
                </motion.div>

                {/* Floating pill badge below center */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                  <div className="px-5 py-2 rounded-full bg-[#0B0A08]/90 border border-[#E5A93C]/50 backdrop-blur-md shadow-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse" />
                    <span className="font-dev text-sm font-semibold text-[#E5A93C] tracking-wide">
                      ॐ शून्यम्
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Band at Bottom of Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 1.3, ease: EASE }}
        style={{ opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12 sm:mt-16"
      >
        <div className="border-t border-[#E5A93C]/15 pt-6 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              data-testid="hero-stat"
              className="flex flex-col gap-1 border-l border-[#E5A93C]/20 pl-4"
            >
              <span className="font-mono text-xs sm:text-sm font-bold text-[#E5A93C] tracking-wider">
                {stat.era}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[#A8A090]/80">
                {stat.fact}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
