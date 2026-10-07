'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface Chapter {
  index: string;
  era: string;
  devanagari: string;
  title: string;
  body: string;
  chip: string;
  image: string;
  alt: string;
}

const CHAPTERS: Chapter[] = [
  {
    index: '01',
    era: 'c. 800 BCE',
    devanagari: 'शुल्ब सूत्र',
    title: 'The Altar Builders',
    body: "Before chalkboards, there were knotted ropes. Baudhāyana's Śulba Sūtras prescribed fire-altar geometry down to the finger-width — and stated the diagonal rule a² + b² = c² centuries before Pythagoras, along with √2 to five decimal places.",
    chip: '√2 ≈ 1.4142156 … PULLED FROM A RITUAL',
    image: '/journey/chapter-01.jpg',
    alt: 'Ancient geometric brickwork and fire altar tradition',
  },
  {
    index: '02',
    era: 'c. 200 BCE',
    devanagari: 'छन्दःशास्त्र',
    title: 'The Poetry of Binary',
    body: 'Piṅgala encoded Sanskrit verse meters with light and heavy syllables — a working binary system two millennia before Leibniz. His mātrāmeru recursion grows exactly like the Fibonacci sequence, embedded in poetry manuals.',
    chip: '0 / 1 LIVED FIRST IN SANSKRIT VERSE',
    image: '/journey/chapter-02.jpg',
    alt: 'Sanskrit palm leaf manuscript and metrical celestial verses',
  },
  {
    index: '03',
    era: '628 CE',
    devanagari: 'ब्रह्मगुप्त',
    title: 'The Zero Moment',
    body: 'In the Brāhmasphuṭasiddhānta, Brahmagupta did what no one had: treated śūnya as a number with its own rules of arithmetic. The dot in a ledger became a digit, and mathematics became universal.',
    chip: 'ZERO BECOMES A NUMBER — WITH RULES',
    image: '/journey/chapter-03.jpg',
    alt: 'Ancient Indian mathematical mandala and zero concept',
  },
  {
    index: '04',
    era: '499 CE',
    devanagari: 'आर्यभटीय',
    title: "The Astronomer's Precision",
    body: 'Āryabhaṭa, aged 23, compiled the Āryabhaṭīya: place-value arithmetic, sine (jyā) tables, π ≈ 3.1416, and the rotation of the Earth — all in 121 verses of memorizable Sanskrit.',
    chip: 'π ≈ 62832 / 20000',
    image: '/journey/chapter-04.jpg',
    alt: 'Brihadisvara temple tower and ancient astronomical calculations',
  },
  {
    index: '05',
    era: 'c. 1350 CE',
    devanagari: 'केरल गणित',
    title: 'The Infinite Series',
    body: 'Mādhava of Sangamagrāma and the Kerala school summed infinite series for π and trigonometric functions — the foundations of calculus, nearly 250 years before Newton and Leibniz.',
    chip: 'π = 1 - 1/3 + 1/5 - 1/7 + …',
    image: '/journey/chapter-05.jpg',
    alt: 'Konark wheel and cosmic mathematical cycles',
  },
];

export default function JourneyScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(Math.floor(latest * CHAPTERS.length), CHAPTERS.length - 1);
    setActiveIndex(Math.max(0, idx));
  });

  const activeChapter = CHAPTERS[activeIndex] || CHAPTERS[0];

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative h-[500vh] bg-[#0B0A08]"
    >
      {/* Pinned 100vh Full-Bleed Scrollytelling Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row bg-[#0B0A08]">
        {/* LEFT HALF (Full-bleed image stack with overlays) */}
        <div
          data-testid="journey-sticky-visual"
          className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden bg-[#0B0A08]"
        >
          {/* Stack of crossfading high-res images */}
          {CHAPTERS.map((chapter, idx) => (
            <motion.div
              key={`journey-img-${idx}`}
              animate={{
                opacity: activeIndex === idx ? 1 : 0,
                scale: activeIndex === idx ? 1 : 1.05,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={chapter.image}
                alt={chapter.alt}
                className="w-full h-full object-cover object-center"
              />
              {/* Vignette & gradient overlays for crisp contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/90 via-[#0B0A08]/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0A08]/40" />
            </motion.div>
          ))}

          {/* Bottom Overlays matching the user's reference screenshots */}
          <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 z-20 flex items-end justify-between pointer-events-none">
            {/* Bottom Left: Sanskrit Title & Era */}
            <div>
              <motion.p
                key={`dev-${activeIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="font-dev text-xl sm:text-2xl text-[#E5A93C] font-semibold tracking-wide"
              >
                {activeChapter.devanagari}
              </motion.p>
              <motion.p
                key={`era-${activeIndex}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="font-mono text-xs uppercase tracking-[0.3em] text-[#A8A090] mt-1"
              >
                {activeChapter.era.toUpperCase()}
              </motion.p>
            </div>

            {/* Bottom Right: Big Outlined Number & / 05 */}
            <div
              data-testid="journey-active-index"
              className="flex items-start"
            >
              <motion.span
                key={`idx-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="font-display text-6xl sm:text-7xl lg:text-8xl text-outline-thick font-light leading-none select-none text-transparent"
              >
                {activeChapter.index}
              </motion.span>
              <span className="font-serif text-sm sm:text-base text-[#E5A93C]/60 ml-1.5 mt-1 font-medium select-none">
                / 05
              </span>
            </div>
          </div>
        </div>

        {/* Center Vertical Divider Line with Golden Scroll Track */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#E5A93C]/20 -translate-x-1/2 z-30 pointer-events-none">
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="w-full h-full bg-[#E5A93C] origin-top shadow-[0_0_8px_#E5A93C]"
          />
        </div>

        {/* RIGHT HALF (Vertically centered text content crossfade stack) */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative flex flex-col justify-center px-8 sm:px-14 lg:px-20 bg-[#0B0A08] z-20">
          {CHAPTERS.map((chapter, idx) => (
            <motion.div
              key={`journey-text-${idx}`}
              data-testid={`journey-chapter-${idx + 1}`}
              animate={{
                opacity: activeIndex === idx ? 1 : 0,
                y: activeIndex === idx ? 0 : 20,
                pointerEvents: activeIndex === idx ? 'auto' : 'none',
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-8 sm:inset-x-14 lg:inset-x-20 max-w-xl"
            >
              {/* Era & Index Header */}
              <p className="font-mono text-xs sm:text-sm text-[#A8A090] uppercase tracking-[0.35em] font-semibold mb-3">
                {chapter.index} — {chapter.era.toUpperCase()}
              </p>

              {/* Chapter Main Title */}
              <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F5F0E6] font-medium leading-[1.08] tracking-tight mb-2 select-none">
                {chapter.title}
              </h2>

              {/* Sanskrit Subtitle */}
              <p className="font-dev text-base sm:text-lg text-[#E5A93C] font-semibold mb-6">
                {chapter.devanagari}
              </p>

              {/* Paragraph Description */}
              <p className="font-sans text-sm sm:text-base text-[#A8A090] font-light leading-relaxed mb-8 max-w-lg">
                {chapter.body}
              </p>

              {/* Formula Pill Chip */}
              <div>
                <span className="font-mono text-xs px-6 py-2.5 rounded-full border border-[#E5A93C]/35 bg-[#14120D] text-[#E5A93C] inline-block tracking-widest uppercase shadow-[0_0_12px_rgba(229,169,60,0.08)]">
                  {chapter.chip}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
