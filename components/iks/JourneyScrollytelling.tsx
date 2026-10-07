'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, transform } from 'framer-motion';

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

interface ChapterMotionDef {
  input: number[];
  textY: number[];
  opacity: number[];
  imgY: number[];
  indexY: number[];
  metaY: number[];
}

const CHAPTER_CONFIGS: ChapterMotionDef[] = [
  // Chapter 01 (Index 0): Centered from start (0.0), scrolls up & out between 0.12 and 0.20
  {
    input: [0.0, 0.12, 0.20],
    textY: [0, 0, -110],
    opacity: [1, 1, 0],
    imgY: [0, 0, -35],
    indexY: [0, 0, -60],
    metaY: [0, 0, -40],
  },
  // Chapter 02 (Index 1): Enters from bottom (+110) at 0.12..0.20, centered, exits up at 0.32..0.40
  {
    input: [0.12, 0.20, 0.32, 0.40],
    textY: [110, 0, 0, -110],
    opacity: [0, 1, 1, 0],
    imgY: [35, 0, 0, -35],
    indexY: [60, 0, 0, -60],
    metaY: [40, 0, 0, -40],
  },
  // Chapter 03 (Index 2): Enters from bottom at 0.32..0.40, centered, exits up at 0.52..0.60
  {
    input: [0.32, 0.40, 0.52, 0.60],
    textY: [110, 0, 0, -110],
    opacity: [0, 1, 1, 0],
    imgY: [35, 0, 0, -35],
    indexY: [60, 0, 0, -60],
    metaY: [40, 0, 0, -40],
  },
  // Chapter 04 (Index 3): Enters from bottom at 0.52..0.60, centered, exits up at 0.72..0.80
  {
    input: [0.52, 0.60, 0.72, 0.80],
    textY: [110, 0, 0, -110],
    opacity: [0, 1, 1, 0],
    imgY: [35, 0, 0, -35],
    indexY: [60, 0, 0, -60],
    metaY: [40, 0, 0, -40],
  },
  // Chapter 05 (Index 4): Enters from bottom at 0.72..0.80, stays centered through 1.0
  {
    input: [0.72, 0.80, 1.0],
    textY: [110, 0, 0],
    opacity: [0, 1, 1],
    imgY: [35, 0, 0],
    indexY: [60, 0, 0],
    metaY: [40, 0, 0],
  },
];

/**
 * Animated Text Card for each Chapter.
 * Uses continuous useTransform directly linked to scroll progress.
 * As user scrolls DOWN: text glides UPWARDS and fades out, next text rises from BELOW.
 * As user scrolls UP: text glides DOWNWARDS in exact reverse.
 * Micro-staggered vertical offsets create a tangible multiplane parallax illusion.
 */
function ChapterTextItem({
  chapter,
  index,
  activeIdx,
  scrollYProgress,
}: {
  chapter: Chapter;
  index: number;
  activeIdx: number;
  scrollYProgress: MotionValue<number>;
}) {
  const cfg = CHAPTER_CONFIGS[index] || CHAPTER_CONFIGS[0];

  // Base vertical translation and opacity tied directly to the scroll trigger via pure function mappers
  const mapperY = transform(cfg.input, cfg.textY);
  const y = useTransform(scrollYProgress, (v) => mapperY(v));

  const mapperOpacity = transform(cfg.input, cfg.opacity);
  const opacity = useTransform(scrollYProgress, (v) => mapperOpacity(v));

  // Staggered parallax offsets: eyebrow moves fastest, title solid, body slightly delayed, chip floating
  const yEyebrow = useTransform(y, (v) => v * 1.35);
  const yDevanagari = useTransform(y, (v) => v * 0.9);
  const yBody = useTransform(y, (v) => v * 0.78);
  const yChip = useTransform(y, (v) => v * 0.62);

  return (
    <motion.div
      data-testid={`journey-chapter-${index + 1}`}
      style={{
        opacity,
      }}
      className={`absolute inset-x-6 sm:inset-x-12 lg:inset-x-20 max-w-xl flex flex-col justify-center select-none ${
        activeIdx === index ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Era & Index Eyebrow */}
      <motion.p
        style={{ y: yEyebrow }}
        className="font-mono text-xs sm:text-sm text-[#A8A090] uppercase tracking-[0.35em] font-semibold mb-2 sm:mb-3"
      >
        {chapter.index} — {chapter.era.toUpperCase()}
      </motion.p>

      {/* Chapter Main Title */}
      <motion.h2
        style={{ y }}
        className="font-display text-3xl sm:text-5xl lg:text-6xl text-[#F5F0E6] font-medium leading-[1.08] tracking-tight mb-1 sm:mb-2"
      >
        {chapter.title}
      </motion.h2>

      {/* Sanskrit Subtitle */}
      <motion.p
        style={{ y: yDevanagari }}
        className="font-dev text-base sm:text-xl text-[#E5A93C] font-semibold mb-4 sm:mb-6"
      >
        {chapter.devanagari}
      </motion.p>

      {/* Paragraph Description */}
      <motion.p
        style={{ y: yBody }}
        className="font-sans text-xs sm:text-base text-[#A8A090] font-light leading-relaxed mb-5 sm:mb-8 max-w-lg"
      >
        {chapter.body}
      </motion.p>

      {/* Formula Pill Chip */}
      <motion.div style={{ y: yChip }}>
        <span className="font-mono text-[11px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-[#E5A93C]/35 bg-[#14120D] text-[#E5A93C] inline-block tracking-widest uppercase shadow-[0_0_12px_rgba(229,169,60,0.08)]">
          {chapter.chip}
        </span>
      </motion.div>
    </motion.div>
  );
}

/**
 * Crossfading and vertically drifting background visuals for each chapter.
 */
function ChapterImageItem({
  chapter,
  index,
  scrollYProgress,
}: {
  chapter: Chapter;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const cfg = CHAPTER_CONFIGS[index] || CHAPTER_CONFIGS[0];
  const mapperOpacity = transform(cfg.input, cfg.opacity);
  const opacity = useTransform(scrollYProgress, (v) => mapperOpacity(v));

  const mapperY = transform(cfg.input, cfg.imgY);
  const y = useTransform(scrollYProgress, (v) => mapperY(v));

  const scale = useTransform(opacity, (v) => 1.05 - v * 0.05);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
      }}
      className="absolute inset-0 pointer-events-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={chapter.image}
        alt={chapter.alt}
        className="w-full h-full object-cover object-center"
      />
      {/* Cinematic vignettes for high readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/95 via-[#0B0A08]/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0B0A08]/50" />
    </motion.div>
  );
}

/**
 * Bottom-left Sanskrit & Era metadata that slides up/down with chapter transitions.
 */
function ChapterMetaItem({
  chapter,
  index,
  scrollYProgress,
}: {
  chapter: Chapter;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const cfg = CHAPTER_CONFIGS[index] || CHAPTER_CONFIGS[0];
  const mapperOpacity = transform(cfg.input, cfg.opacity);
  const opacity = useTransform(scrollYProgress, (v) => mapperOpacity(v));

  const mapperY = transform(cfg.input, cfg.metaY);
  const y = useTransform(scrollYProgress, (v) => mapperY(v));

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute bottom-0 left-0 pointer-events-none"
    >
      <p className="font-dev text-lg sm:text-2xl text-[#E5A93C] font-semibold tracking-wide whitespace-nowrap">
        {chapter.devanagari}
      </p>
      <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#A8A090] mt-0.5 sm:mt-1 whitespace-nowrap">
        {chapter.era.toUpperCase()}
      </p>
    </motion.div>
  );
}

/**
 * Bottom-right large outline index counter that rolls vertically like a mechanical odometer.
 */
function ChapterIndexItem({
  chapter,
  index,
  scrollYProgress,
}: {
  chapter: Chapter;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const cfg = CHAPTER_CONFIGS[index] || CHAPTER_CONFIGS[0];
  const mapperOpacity = transform(cfg.input, cfg.opacity);
  const opacity = useTransform(scrollYProgress, (v) => mapperOpacity(v));

  const mapperY = transform(cfg.input, cfg.indexY);
  const y = useTransform(scrollYProgress, (v) => mapperY(v));

  return (
    <motion.span
      style={{ opacity, y }}
      className="absolute bottom-0 right-0 font-display text-5xl sm:text-7xl lg:text-8xl text-outline-thick font-light leading-none select-none text-transparent pointer-events-none"
    >
      {chapter.index}
    </motion.span>
  );
}

export default function JourneyScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  // Target the pinned 500vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  if ('accelerate' in scrollYProgress) {
    delete (scrollYProgress as any).accelerate;
  }
  const progressScaleY = useTransform(scrollYProgress, (v) => v);

  // Track active index for dot indicators and pagination
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(Math.floor(latest * CHAPTERS.length), CHAPTERS.length - 1);
    setActiveIdx(Math.max(0, idx));
  });

  const jumpToChapter = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const totalDist = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = (idx + 0.5) / CHAPTERS.length;
    const targetY = trackTop + targetProgress * totalDist;

    // @ts-expect-error Lenis attached to window
    if (window.__lenis) {
      // @ts-expect-error Lenis scrollTo
      window.__lenis.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <section id="journey" className="relative bg-[#0B0A08] overflow-x-clip">
      {/* 01 Scrollytelling Section Introduction Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-32 sm:pb-18">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-dev text-sm text-[#FF9F1C] font-semibold">यात्रा</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A93C]" />
            <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FF9F1C] font-semibold">
              01 — The Scrollytelling Descent
            </span>
          </div>

          <h2 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl text-[#F5F0E6] leading-[1.08] tracking-tight mb-6 select-none">
            Twenty-five centuries, five leaps.
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#A8A090] font-light max-w-2xl leading-relaxed">
            Scroll slowly. Each chapter responds directly to your scroll motion — sliding up or down in physical harmony as mathematics advances across the millennia.
          </p>
        </div>
      </div>

      {/* Pinned Scrollytelling Track (500vh) */}
      <div
        ref={containerRef}
        className="relative h-[500vh] bg-[#0B0A08]"
      >
        {/* Pinned 100vh Full-Bleed Scrollytelling Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col lg:flex-row bg-[#0B0A08]">
          {/* LEFT HALF (Full-bleed image stack with overlays) */}
          <div
            data-testid="journey-sticky-visual"
            className="w-full lg:w-1/2 h-[44vh] lg:h-full relative overflow-hidden bg-[#0B0A08]"
          >
            {/* Stack of crossfading and parallax drifting high-res images */}
            {CHAPTERS.map((chapter, idx) => (
              <ChapterImageItem
                key={`journey-img-${idx}`}
                chapter={chapter}
                index={idx}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* Bottom Overlays */}
            <div className="absolute bottom-4 sm:bottom-10 left-4 sm:left-10 right-4 sm:right-10 z-20 flex items-end justify-between pointer-events-none">
              {/* Bottom Left: Sliding Sanskrit Title & Era */}
              <div className="relative h-12 sm:h-16 w-48 sm:w-64">
                {CHAPTERS.map((chapter, idx) => (
                  <ChapterMetaItem
                    key={`journey-meta-${idx}`}
                    chapter={chapter}
                    index={idx}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>

              {/* Bottom Right: Sliding Outline Number & Static / 05 */}
              <div
                data-testid="journey-active-index"
                className="flex items-end"
              >
                <div className="relative h-12 sm:h-18 lg:h-22 w-16 sm:w-24 lg:w-32">
                  {CHAPTERS.map((chapter, idx) => (
                    <ChapterIndexItem
                      key={`journey-idx-${idx}`}
                      chapter={chapter}
                      index={idx}
                      scrollYProgress={scrollYProgress}
                    />
                  ))}
                </div>
                <span className="font-serif text-xs sm:text-base text-[#E5A93C]/60 ml-1 mb-1 font-medium select-none pointer-events-none">
                  / 05
                </span>
              </div>
            </div>
          </div>

          {/* Center Vertical Divider Line with Golden Scroll Track & Chapter Waypoints */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#E5A93C]/20 -translate-x-1/2 z-30 pointer-events-none">
            {/* Active scrub line */}
            <motion.div
              style={{ scaleY: progressScaleY }}
              className="w-full h-full bg-[#E5A93C] origin-top shadow-[0_0_10px_#E5A93C]"
            />
          </div>

          {/* RIGHT HALF (Vertically centered text content with continuous scroll-linked motion) */}
          <div className="w-full lg:w-1/2 h-[56vh] lg:h-full relative flex flex-col justify-center bg-[#0B0A08] z-20">
            {CHAPTERS.map((chapter, idx) => (
              <ChapterTextItem
                key={`journey-text-${idx}`}
                chapter={chapter}
                index={idx}
                activeIdx={activeIdx}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* Floating Chapter Dot Navigator on Right Margin */}
            <div className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
              {CHAPTERS.map((ch, i) => (
                <button
                  key={`dot-nav-${i}`}
                  onClick={() => jumpToChapter(i)}
                  aria-label={`Jump to chapter ${ch.index}`}
                  className="group flex items-center gap-2.5 p-1 focus:outline-none"
                >
                  <span
                    className={`font-mono text-[10px] tracking-widest transition-all duration-300 ${
                      activeIdx === i ? 'text-[#E5A93C] opacity-100 font-bold' : 'text-[#A8A090] opacity-0 group-hover:opacity-60'
                    }`}
                  >
                    {ch.index}
                  </span>
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      activeIdx === i
                        ? 'w-2 h-6 bg-[#E5A93C] shadow-[0_0_8px_#E5A93C]'
                        : 'w-2 h-2 bg-[#E5A93C]/30 group-hover:bg-[#E5A93C]/60'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
