'use client';

import React, { RefObject, useEffect, useState } from 'react';
import { motion, useReducedMotion, useTransform, MotionValue, useMotionValue, useSpring, transform } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import BookLeaf from './BookLeaf';
import { NalandaIllustration } from '@/components/common/Motifs';

/* ---------- small manuscript motifs (inline SVG, no image assets) ---------- */

function LotusMini() {
  return (
    <svg width="54" height="22" viewBox="0 0 54 22" fill="none" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <path d="M27 2 C30 8 30 14 27 19 C24 14 24 8 27 2 Z" stroke="#9A7730" strokeWidth="1.2" />
      <path d="M17 5 C21 8 22 13 21 18 C17 15 16 10 17 5 Z" stroke="#9A7730" strokeWidth="1" />
      <path d="M37 5 C38 10 37 15 33 18 C32 13 33 8 37 5 Z" stroke="#9A7730" strokeWidth="1" />
      <path d="M7 10 C11 11 14 13 15 17 C11 17 8 14 7 10 Z" stroke="#9A7730" strokeWidth="1" />
      <path d="M47 10 C46 14 43 17 39 17 C40 13 43 11 47 10 Z" stroke="#9A7730" strokeWidth="1" />
    </svg>
  );
}

function ChakraMini() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx="32" cy="32" r="22" stroke="#9A7730" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="13" stroke="#641E16" strokeWidth="1.2" />
      <circle cx="32" cy="32" r="3.5" fill="#C49A45" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line key={i}
            x1={32 + 14 * Math.cos(a)} y1={32 + 14 * Math.sin(a)}
            x2={32 + 21 * Math.cos(a)} y2={32 + 21 * Math.sin(a)}
            stroke="#9A7730" strokeWidth="1" />
        );
      })}
    </svg>
  );
}

function YantraMini() {
  return (
    <svg width="72" height="60" viewBox="0 0 72 60" fill="none" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <rect x="6" y="6" width="60" height="48" stroke="#9A7730" strokeWidth="1.2" />
      <path d="M36 12 L60 48 L12 48 Z" stroke="#641E16" strokeWidth="1.2" />
      <path d="M36 48 L60 12 L12 12 Z" stroke="#641E16" strokeWidth="1" opacity="0.7" />
      <circle cx="36" cy="30" r="5" stroke="#9A7730" strokeWidth="1.2" />
    </svg>
  );
}

function ArchMini() {
  return (
    <svg width="120" height="44" viewBox="0 0 120 44" fill="none" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <path d="M8 40 L8 16 L112 16 L112 40" stroke="#641E16" strokeWidth="1.4" />
      {[24, 44, 64, 84, 104].map(x => (
        <g key={x}>
          <line x1={x - 8} y1="40" x2={x - 8} y2="26" stroke="#641E16" strokeWidth="1.1" />
          <line x1={x + 8} y1="40" x2={x + 8} y2="26" stroke="#641E16" strokeWidth="1.1" />
          <path d={`M${x - 8} 26 A8 8 0 0 1 ${x + 8} 26`} stroke="#9A7730" strokeWidth="1.1" />
        </g>
      ))}
      <path d="M4 16 L116 16 L108 8 L12 8 Z" stroke="#9A7730" strokeWidth="1.1" />
    </svg>
  );
}

/* ---------- face building blocks ---------- */

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="ab-kicker">{children}</p>;
}
function Title({ children }: { children: React.ReactNode }) {
  return <h3 className="ab-title">{children}</h3>;
}
function Body({ children }: { children: React.ReactNode }) {
  return <p className="ab-body">{children}</p>;
}
function PageNo({ children }: { children: React.ReactNode }) {
  return <p className="ab-pageno">{children}</p>;
}

function IntroFace() {
  return (
    <>
      <Kicker>Page 1 · Paricaya</Kicker>
      <Title>Introduction</Title>
      <div className="ab-rule" />
      <Body>Indian Knowledge Systems preserve millennia of inquiry into mathematics, astronomy, medicine, philosophy and the arts.</Body>
      <Body>They are not relics of the past, but a living intellectual heritage — studied, verified and taught anew.</Body>
      <PageNo>॥ १ ॥</PageNo>
    </>
  );
}

function EducationFace() {
  return (
    <>
      <Kicker>Page 2 · Gurukula</Kicker>
      <Title>Ancient Indian Education</Title>
      <div className="ab-rule" />
      <ArchMini />
      <Body>The Gurukul system and guru–śiṣya tradition nurtured learning as a way of life, flowering in universities like Nalanda and Takshashila.</Body>
      <PageNo>॥ २ ॥</PageNo>
    </>
  );
}

/* 4 flip windows — cover first, then 3 content leaves. */
const LEAF_RANGES: Array<[number, number]> = [
  [0.02, 0.25], // cover opens
  [0.23, 0.50], // Education & Vedas leaf
  [0.48, 0.75], // Science & Philosophy leaf
  [0.72, 0.96], // Modern Relevance & Closing leaf
];

export function BookHeadline() {
  return (
    <div className="ab-head text-center my-4">
      <p className="ab-eyebrow font-mono text-xs uppercase tracking-widest text-[#9A7730]">An Interactive Manuscript</p>
      <h2 className="ab-headline font-display text-2xl text-[#641E16]">Discover the Wisdom of Ancient India</h2>
      <p className="ab-sub text-xs text-[#6B5847] italic">Explore the timeless knowledge, philosophy, science, and heritage of Bharat.</p>
    </div>
  );
}

interface AncientBookProps {
  targetRef?: RefObject<HTMLElement | null>;
  scrollProgress?: MotionValue<number>;
  className?: string;
}

export default function AncientBook({ targetRef, scrollProgress, className = '' }: AncientBookProps) {
  const reduce = useReducedMotion();

  return (
    <div className={`ab-wrap w-full flex flex-col items-center select-none ${className}`}>
      {reduce ? <StaticBook /> : <LiveBook targetRef={targetRef} scrollProgress={scrollProgress} />}
    </div>
  );
}

function LiveBook({ targetRef, scrollProgress }: AncientBookProps) {
  const rawProgress = useMotionValue(0);
  const internalSpring = useSpring(rawProgress, { stiffness: 90, damping: 20 });
  const scrollYProgress = scrollProgress ?? internalSpring;
  if ('accelerate' in scrollYProgress) {
    delete (scrollYProgress as any).accelerate;
  }
  const [currentPage, setCurrentPage] = useState(0);

  // Sync scroll progress to active page dots
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      let page = 0;
      if (v >= 0.72) page = 4;
      else if (v >= 0.48) page = 3;
      else if (v >= 0.22) page = 2;
      else if (v >= 0.03) page = 1;
      setCurrentPage(page);
    });
  }, [scrollYProgress]);

  // Fallback scroll listener if external scrollProgress is not passed
  useEffect(() => {
    if (scrollProgress) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = targetRef?.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrolled = -rect.top;
        const totalDistance = Math.max(350, rect.height - window.innerHeight);
        if (scrolled > 5) {
          const p = Math.min(1, Math.max(0, scrolled / totalDistance));
          rawProgress.set(p);
        }
      } else {
        const p = Math.min(1, Math.max(0, window.scrollY / 500));
        rawProgress.set(p);
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [targetRef, rawProgress, scrollProgress]);

  const goToPage = (pageIdx: number) => {
    const targets = [0, 0.22, 0.48, 0.72, 0.96];
    const targetVal = targets[pageIdx] ?? 0;
    setCurrentPage(pageIdx);
    rawProgress.set(targetVal);

    if (targetRef?.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const trackTop = window.scrollY + rect.top;
      const scrollableDist = targetRef.current.offsetHeight - window.innerHeight;
      if (scrollableDist > 100) {
        const destY = trackTop + targetVal * scrollableDist;
        window.scrollTo({ top: destY, behavior: 'smooth' });
      }
    }
  };

  const nextPage = () => {
    const next = Math.min(currentPage + 1, 4);
    goToPage(next);
  };

  const prevPage = () => {
    const prev = Math.max(currentPage - 1, 0);
    goToPage(prev);
  };

  // Fore-edge page block fades as leaves leave the right stack.
  const edgeOpacityMap = transform([0.05, 0.8], [1, 0.15]);
  const edgeOpacity = useTransform(scrollYProgress, (v) => edgeOpacityMap(v));

  return (
    <div className="flex flex-col items-center w-full">
      <div className="ab-stage">
        <div className="ab-floor" aria-hidden="true" />
        <div
          className="ab-book cursor-pointer"
          role="img"
          aria-label="Ancient Indian manuscript whose pages turn as you scroll"
          onClick={nextPage}
        >
          {/* Centre spine visible between left (read) and right (unread) halves */}
          <div className="ab-spine" aria-hidden="true" />
          {/* Right-edge page block — fades as pages are turned */}
          <motion.div className="ab-foreedge" aria-hidden="true" style={{ opacity: edgeOpacity }} />

          {/* Back cover — visible at the very end when all pages are flipped */}
          <div className="ab-backboard" aria-hidden="true">
            <div className="ab-backboard-inner">
              <LotusMini />
              <p className="sanskrit-title" style={{ color: '#C49A45', fontSize: '0.95rem', marginTop: 8 }}>॥ समाप्तम् ॥</p>
            </div>
          </div>

          {/* Static base: Introduction page (left) + parchment endpaper (right). */}
          <div className="ab-leftbase ab-introbase" aria-label="Introduction page">
            <IntroFace />
          </div>
          <div className="ab-rightbase" aria-hidden="true">
            <p className="sanskrit-title" style={{ color: '#9A7730', fontSize: '0.85rem' }}>॥ शुभम् ॥</p>
          </div>

          {/* Leaves render back-to-front so cover is on top. */}

          {/* Leaf 3 (z=7, flip 4th) */}
          <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[3]} zTop={7} zRest={3}
            label="Modern relevance and closing leaves"
            frontClass="ab-page" backClass="ab-page ab-closing"
            front={
              <>
                <Kicker>Page 7 · Present Day</Kicker>
                <Title>Modern Relevance</Title>
                <div className="ab-rule" />
                <Body>Traditional Indian knowledge speaks to contemporary education — NEP 2020 (§4.27) brings Indian Knowledge Systems into modern curricula.</Body>
                <Body>Ancient methods sharpen mental agility, pattern recognition and numerical intuition in today&apos;s classrooms.</Body>
                <PageNo>॥ ७ ॥</PageNo>
              </>
            }
            back={
              <>
                <LotusMini />
                <Title>Ancient Wisdom. Timeless Knowledge.</Title>
                <Body>A future inspired by heritage.</Body>
                <div className="ab-rule" />
                <p className="sanskrit-title" style={{ color: '#641E16', fontSize: '0.9rem' }}>॥ शुभम् ॥</p>
                <PageNo>॥ ८ ॥</PageNo>
              </>
            }
          />

          {/* Leaf 2 (z=8, flip 3rd) */}
          <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[2]} zTop={8} zRest={2}
            label="Science and philosophy leaves"
            frontClass="ab-page" backClass="ab-page"
            front={
              <>
                <Kicker>Page 5 · Gaṇita &amp; Jyotiṣa</Kicker>
                <Title>Science &amp; Mathematics</Title>
                <div className="ab-rule" />
                <ChakraMini />
                <Body>Zero and the decimal place-value system, precise astronomy, Ayurvedic medicine and scientific thought — India&apos;s enduring gifts to world knowledge.</Body>
                <PageNo>॥ ५ ॥</PageNo>
              </>
            }
            back={
              <>
                <Kicker>Page 6 · Darśana</Kicker>
                <Title>Philosophy &amp; Wisdom</Title>
                <div className="ab-rule" />
                <YantraMini />
                <Body>Six schools of thought explore knowledge, ethics and the examined life — values of dharma, inquiry and compassion that guide conduct.</Body>
                <PageNo>॥ ६ ॥</PageNo>
              </>
            }
          />

          {/* Leaf 1 (z=9, flip 2nd) */}
          <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[1]} zTop={9} zRest={1}
            label="Education and Vedas leaves"
            frontClass="ab-page" backClass="ab-page"
            front={<EducationFace />}
            back={
              <>
                <Kicker>Page 4 · The Four Vedas</Kicker>
                <Title>Ṛg · Sāma · Yajur · Atharva</Title>
                <div className="ab-rule" />
                <ul className="ab-list">
                  <li><strong>Ṛgveda</strong> — hymns of cosmic order</li>
                  <li><strong>Sāmaveda</strong> — the science of melody</li>
                  <li><strong>Yajurveda</strong> — ritual and procedure</li>
                  <li><strong>Atharvaveda</strong> — life and healing lore</li>
                </ul>
                <PageNo>॥ ४ ॥</PageNo>
              </>
            }
          />

          {/* Cover Leaf (z=10, flip 1st) */}
          <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[0]} zTop={10} zRest={0}
            label="SwiftSum manuscript cover" leafClass="ab-coverleaf"
            frontClass="ab-coverface ab-coverfull" backClass="ab-coverback"
            hideWhenFlipped={true}
            front={
              <div className="ab-cover-frame">
                <LotusMini />
                <p className="ab-cover-kicker">A Nalanda-Era Manuscript</p>
                <p className="ab-cover-title">SWIFTSUM</p>
                <p className="sanskrit-title ab-cover-sub">Indian Knowledge Systems</p>
                <div className="ab-cover-nalanda">
                  <NalandaIllustration />
                </div>
                <p className="ab-cover-foot">॥ विद्या ददाति विनयम् ॥</p>
              </div>
            }
            back={
              <div className="ab-cover-frame ab-cover-frame-inner" aria-hidden="true">
                <LotusMini />
              </div>
            }
          />
        </div>
      </div>

      {/* Interactive Controls & Hints */}
      <div className="flex items-center justify-between w-full max-w-[560px] px-4 mt-3">
        {/* Previous Page Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevPage();
          }}
          className="flex items-center gap-1 text-[11px] font-serif uppercase tracking-wider text-[#A8A090] hover:text-[#C49A45] transition-colors py-1 px-3 rounded-full border border-[#C49A45]/30 hover:border-[#C49A45] bg-[#1A1712]/80"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#C49A45]" />
          <span>Prev</span>
        </button>

        {/* Page Dots Navigation */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                goToPage(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentPage === idx
                  ? 'bg-[#C49A45] w-5 shadow-[0_0_8px_rgba(196,154,69,0.8)]'
                  : 'bg-[#C49A45]/30 hover:bg-[#C49A45]/70'
              }`}
              aria-label={`Go to page ${idx === 0 ? 'Cover' : idx}`}
            />
          ))}
        </div>

        {/* Next Page Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            nextPage();
          }}
          className="flex items-center gap-1 text-[11px] font-serif uppercase tracking-wider text-[#A8A090] hover:text-[#C49A45] transition-colors py-1 px-3 rounded-full border border-[#C49A45]/30 hover:border-[#C49A45] bg-[#1A1712]/80"
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#C49A45]" />
        </button>
      </div>

      {/* Scroll Hint */}
      <div className="ab-hint mt-2" aria-hidden="true">
        <ChevronDown className="ab-hint-icon" />
        <span>Click or scroll to turn pages</span>
      </div>
    </div>
  );
}

function FlipLeaf(props: {
  progress: MotionValue<number>;
  range: [number, number];
  zTop: number;
  zRest: number;
  label: string;
  frontClass: string;
  backClass: string;
  leafClass?: string;
  hideWhenFlipped?: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  return <BookLeaf {...props} />;
}

/** Non-animated fallback for reduced-motion users */
function StaticBook() {
  const pages: Array<[string, string]> = [
    ['Cover', 'SWIFTSUM — Indian Knowledge Systems manuscript.'],
    ['Introduction', 'Indian Knowledge Systems preserve millennia of inquiry into mathematics, astronomy, medicine, philosophy and the arts.'],
    ['Ancient Indian Education', 'The Gurukul system and guru–śiṣya tradition, flowering in Nalanda and Takshashila.'],
    ['The Four Vedas', 'Ṛgveda, Sāmaveda, Yajurveda and Atharvaveda — hymns, melody, ritual and healing lore.'],
    ['Science & Mathematics', 'Zero, decimal place-value, astronomy, Ayurveda and scientific thought.'],
    ['Philosophy & Wisdom', 'Darśana traditions of knowledge, ethics, dharma and the examined life.'],
    ['Modern Relevance', 'Traditional knowledge meets contemporary education through NEP 2020 (§4.27).'],
    ['Closing', 'Ancient Wisdom. Timeless Knowledge. A Future Inspired by Heritage.'],
  ];
  return (
    <div className="ab-static">
      <div className="ab-book ab-static-book" aria-label="SwiftSum manuscript cover">
        <div className="ab-spine" aria-hidden="true" />
        <div className="ab-face ab-front ab-coverface ab-coverfull ab-static-face">
          <div className="ab-cover-frame">
            <LotusMini />
            <p className="ab-cover-kicker">A Nalanda-Era Manuscript</p>
            <p className="ab-cover-title">SWIFTSUM</p>
            <p className="sanskrit-title ab-cover-sub">Indian Knowledge Systems</p>
            <p className="ab-cover-foot">॥ विद्या ददाति विनयम् ॥</p>
          </div>
        </div>
      </div>
      <ol className="ab-static-list">
        {pages.map(([t, d]) => (
          <li key={t}><strong>{t}.</strong> {d}</li>
        ))}
      </ol>
    </div>
  );
}
