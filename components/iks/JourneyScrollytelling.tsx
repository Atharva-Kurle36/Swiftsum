'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FadeUp, SectionHeading } from './shared';

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
    chip: '√2 ≈ 1.4142156 … pulled from a ritual',
    image: 'https://images.unsplash.com/photo-1665003725647-3ae0f01140b1?q=80&w=1400&auto=format&fit=crop',
    alt: 'Ancient geometric brickwork and fire altar tradition',
  },
  {
    index: '02',
    era: 'c. 200 BCE',
    devanagari: 'छन्दःशास्त्र',
    title: 'The Poetry of Binary',
    body: 'Piṅgala encoded Sanskrit verse meters with light and heavy syllables — a working binary system two millennia before Leibniz. His mātrāmeru recursion grows exactly like the Fibonacci sequence, embedded in poetry manuals.',
    chip: '0 / 1 lived first in Sanskrit verse',
    image: 'https://images.unsplash.com/photo-1729335312170-b96ee0f6decd?q=80&w=1400&auto=format&fit=crop',
    alt: 'Sanskrit palm leaf manuscript and metrical verses',
  },
  {
    index: '03',
    era: '628 CE',
    devanagari: 'ब्रह्मगुप्त',
    title: 'The Zero Moment',
    body: 'In the Brāhmasphuṭasiddhānta, Brahmagupta did what no one had: treated śūnya as a number with its own rules of arithmetic. The dot in a ledger became a digit, and mathematics became universal.',
    chip: 'Zero becomes a number — with rules',
    image: 'https://images.unsplash.com/photo-1659738943702-a22ddb8f87f1?q=80&w=1400&auto=format&fit=crop',
    alt: 'Ancient Indian mathematical manuscript with numerical notations',
  },
  {
    index: '04',
    era: '499 CE',
    devanagari: 'आर्यभटीय',
    title: "The Astronomer's Precision",
    body: 'Āryabhaṭa, aged 23, compiled the Āryabhaṭīya: place-value arithmetic, sine (jyā) tables, π ≈ 3.1416, and the rotation of the Earth — all in 121 verses of memorizable Sanskrit.',
    chip: 'π ≈ 62832 / 20000',
    image: 'https://images.unsplash.com/photo-1566915682737-3e97a7eed93b?q=80&w=1400&auto=format&fit=crop',
    alt: 'Observational astronomy instrument and ancient celestial sphere',
  },
  {
    index: '05',
    era: 'c. 1350 CE',
    devanagari: 'केरल गणित',
    title: 'The Infinite Series',
    body: 'Mādhava of Sangamagrāma and the Kerala school summed infinite series for π and trigonometric functions — the foundations of calculus, nearly 250 years before Newton and Leibniz.',
    chip: 'π = 1 − 1/3 + 1/5 − …',
    image: 'https://images.unsplash.com/photo-1725046908999-195118679132?q=80&w=1600&auto=format&fit=crop',
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
    <section id="journey" className="relative bg-[#0B0A08] py-20 sm:py-28 overflow-hidden">
      {/* Heading Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <SectionHeading
          kicker="यात्रा · 01 — The Scrollytelling Descent"
          title="Twenty-five centuries, five leaps."
          sub="Scroll slowly. Each chapter pins the timeline as the tradition advances — rope geometry, binary poetry, the birth of zero, the sine tables, and the infinite."
        />
      </div>

      {/* Scrollytelling Dual Column Container */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* LEFT (Desktop sticky top-0 h-screen crossfading stack) */}
          <div className="hidden lg:block sticky top-0 h-screen border-r border-[#E5A93C]/10 pr-12 pb-12 pt-8">
            <div
              data-testid="journey-sticky-visual"
              className="relative w-full h-[85vh] rounded-2xl overflow-hidden border border-[#E5A93C]/20 bg-[#13110D] shadow-2xl flex flex-col justify-end p-8"
            >
              {/* Stack of crossfading images */}
              {CHAPTERS.map((chapter, idx) => (
                <motion.div
                  key={`sticky-img-${idx}`}
                  animate={{
                    opacity: activeIndex === idx ? 1 : 0,
                    scale: activeIndex === idx ? 1 : 1.07,
                  }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chapter.image}
                    alt={chapter.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-[#0B0A08]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B0A08]/50 via-transparent to-transparent" />
                </motion.div>
              ))}

              {/* Bottom Overlay with Active Chapter Info */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E5A93C] block mb-2">
                    {activeChapter.era}
                  </span>
                  <p className="font-dev text-3xl sm:text-4xl text-[#F5F0E6] font-medium leading-tight">
                    {activeChapter.devanagari}
                  </p>
                </div>

                {/* Outlined index 0X / 05 */}
                <div
                  data-testid="journey-active-index"
                  className="font-display text-7xl lg:text-8xl text-outline-thick font-bold leading-none select-none"
                >
                  {activeChapter.index}
                  <span className="text-3xl lg:text-4xl text-[#E5A93C]/40 ml-1">/ 05</span>
                </div>
              </div>

              {/* 3px vertical progress line on the right edge */}
              <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-[#E5A93C]/10">
                <motion.div
                  style={{ scaleY: scrollYProgress }}
                  className="w-full h-full bg-[#E5A93C] origin-top"
                />
              </div>
            </div>
          </div>

          {/* RIGHT: 5 Chapters in Normal Flow */}
          <div className="flex flex-col gap-24 lg:gap-32 py-12">
            {CHAPTERS.map((chapter, idx) => (
              <div
                key={chapter.index}
                data-testid={`journey-chapter-${idx + 1}`}
                className="min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-center max-w-xl"
              >
                <FadeUp delay={0.1}>
                  {/* Era kicker */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs sm:text-sm text-[#E5A93C] uppercase tracking-[0.25em] font-semibold">
                      {chapter.index} — {chapter.era}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]/60" />
                    <span className="font-dev text-sm text-[#E5A93C]/80">
                      {chapter.devanagari}
                    </span>
                  </div>
                </FadeUp>

                {/* Mobile Inline Image (Hidden on LG) */}
                <div className="lg:hidden aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5A93C]/20 mb-6 bg-[#13110D]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chapter.image}
                    alt={chapter.alt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <FadeUp delay={0.2}>
                  <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F0E6] font-medium leading-[1.1] tracking-tight mb-6">
                    {chapter.title}
                  </h3>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <p className="font-sans text-base sm:text-lg text-[#A8A090] font-light leading-relaxed mb-8">
                    {chapter.body}
                  </p>
                </FadeUp>

                <FadeUp delay={0.4}>
                  <div>
                    <span className="vedic-chip">
                      {chapter.chip}
                    </span>
                  </div>
                </FadeUp>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
