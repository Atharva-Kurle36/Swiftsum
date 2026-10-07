'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue, transform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { EASE } from './shared';
import AncientBook from '@/components/landing/AncientBook/AncientBook';

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Pinned scroll track animation (0 to 1 as user scrolls through the 270vh track)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  if ('accelerate' in scrollYProgress) {
    delete (scrollYProgress as any).accelerate;
  }

  // Towards the very end of the pinned track (0.92 to 1.0), gentle fade as it transitions to next section
  const heroOpacityMap = transform([0, 0.9, 1], [1, 1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, (v) => heroOpacityMap(v));
  const watermarkYMap = transform([0, 1], ['0%', '20%']);
  const watermarkY = useTransform(scrollYProgress, (v) => watermarkYMap(v));

  // Mouse 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 16 };
  const rotXMap = transform([-0.5, 0.5], [5, -5]);
  const rotYMap = transform([-0.5, 0.5], [-5, 5]);
  const rotateX = useSpring(useTransform(mouseY, (v) => rotXMap(v)), springConfig);
  const rotateY = useSpring(useTransform(mouseX, (v) => rotYMap(v)), springConfig);

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
      ref={trackRef}
      id="hero-track"
      className="relative h-[270vh] bg-[#0B0A08]"
    >
      {/* Pinned Sticky Viewport: locks for 170vh while book pages flip, then releases into next section */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-20 pb-4 sm:pt-24 sm:pb-6 z-10">
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
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column (5 cols on lg for clean text spacing) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-[40px] h-[1.5px] bg-[#E5A93C]" />
                <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.4em] text-[#E5A93C] font-semibold">
                  Swiftsum · Indian Knowledge Systems
                </p>
              </div>

              {/* H1 with 3 Masked Line Reveals */}
              <h1 className="font-display font-medium text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[0.98] tracking-[-0.02em] mb-6 select-none">
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
                className="font-sans text-sm sm:text-base text-[#A8A090] font-light max-w-xl leading-relaxed mb-7"
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
                className="flex flex-wrap items-center gap-3 sm:gap-4"
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
                  className="font-mono text-xs text-[#FF9F1C] hover:text-[#E5A93C] underline underline-offset-4 decoration-[#FF9F1C]/40 hover:decoration-[#E5A93C] ml-1 tracking-wider uppercase transition-colors"
                >
                  Try Live Calculator →
                </Link>
              </motion.div>
            </div>

            {/* Right Column (7 cols on lg): Scrollable 3D Ancient Manuscript Book */}
            <div
              ref={visualRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="lg:col-span-7 flex justify-center items-center relative py-4"
              style={{ perspective: 1200 }}
            >
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative w-full max-w-[550px] flex flex-col items-center justify-center transition-transform duration-200"
              >
                {/* Rotating SVG Yantra Behind the Book */}
                <div className="absolute inset-[-30px] sm:inset-[-50px] pointer-events-none flex items-center justify-center z-0">
                  <svg
                    className="w-full h-full max-w-[520px] max-h-[520px]"
                    viewBox="0 0 420 420"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer counter-rotating group 1 (46s clockwise) */}
                    <g className="animate-spin-slower origin-center">
                      <circle
                        cx="210"
                        cy="210"
                        r="186"
                        stroke="#E5A93C"
                        strokeWidth="1.2"
                        strokeDasharray="4 6"
                        opacity="0.3"
                      />
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
                            opacity="0.65"
                          />
                        );
                      })}
                    </g>

                    {/* Inner counter-rotating group 2 (62s reverse) */}
                    <g className="animate-spin-rev origin-center">
                      <circle
                        cx="210"
                        cy="210"
                        r="166"
                        stroke="#C84B31"
                        strokeWidth="1.2"
                        opacity="0.35"
                      />
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
                            opacity="0.45"
                            transform={`rotate(${angle} 210 210)`}
                          />
                        );
                      })}
                    </g>
                  </svg>
                </div>

                {/* Scrollable Ancient Book Component */}
                <div
                  data-testid="hero-wheel-image"
                  className="relative z-10 w-full flex flex-col items-center justify-center"
                >
                  <AncientBook scrollProgress={scrollYProgress} targetRef={trackRef} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
