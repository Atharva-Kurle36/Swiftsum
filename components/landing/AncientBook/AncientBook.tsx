'use client';

import React, { RefObject, useEffect } from 'react';
import { motion, useReducedMotion, useTransform, MotionValue, useMotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
      <Kicker>Page 2 · Paricaya</Kicker>
      <Title>Introduction</Title>
      <div className="ab-rule" />
      <Body>Indian Knowledge Systems preserve millennia of inquiry into mathematics, astronomy, medicine, philosophy and the arts.</Body>
      <Body>They are not relics of the past, but a living intellectual heritage — studied, verified and taught anew.</Body>
      <PageNo>॥ २ ॥</PageNo>
    </>
  );
}

function EducationFace() {
  return (
    <>
      <Kicker>Page 3 · Gurukula</Kicker>
      <Title>Ancient Indian Education</Title>
      <div className="ab-rule" />
      <ArchMini />
      <Body>The Gurukul system and guru–śiṣya tradition nurtured learning as a way of life, flowering in universities like Nalanda and Takshashila.</Body>
      <PageNo>॥ ३ ॥</PageNo>
    </>
  );
}

/* Flip windows across pin scroll progress: cover first, then leaves. */
const LEAF_RANGES: Array<[number, number]> = [
  [0.03, 0.16], // cover opens first
  [0.15, 0.32],
  [0.30, 0.50],
  [0.48, 0.70],
];

interface AncientBookProps {
  targetRef: RefObject<HTMLElement | null>;
}

export default function AncientBook({ targetRef }: AncientBookProps) {
  const reduce = useReducedMotion();

  return (
    <div className="ab-wrap">
      {reduce ? <StaticBook /> : <LiveBook targetRef={targetRef} />}

      <div className="ab-hint" aria-hidden="true">
        <ChevronDown className="ab-hint-icon" />
        <span>Scroll to turn the pages and explore</span>
      </div>
    </div>
  );
}

export function BookHeadline() {
  return (
    <div className="ab-head">
      <p className="ab-eyebrow">An Interactive Manuscript</p>
      <h2 className="ab-headline">Discover the Wisdom of Ancient India</h2>
      <p className="ab-sub">Explore the timeless knowledge, philosophy, science, and heritage of Bharat.</p>
    </div>
  );
}

function LiveBook({ targetRef }: AncientBookProps) {
  // Progress across the PINNED hero track: 0 when the pin locks,
  // 1 when the track releases. Pure function of scrollY → fully reversible.
  // (Manual rAF listener: deterministic across browsers.)
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      scrollYProgress.set(Math.min(1, Math.max(0, (window.scrollY - el.offsetTop) / travel)));
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
  }, [targetRef, scrollYProgress]);
  // Fore-edge page block fades as leaves leave the right stack.
  const edgeOpacity = useTransform(scrollYProgress, [0.05, 0.8], [1, 0.15]);

  return (
    <div className="ab-stage">
      <div className="ab-floor" aria-hidden="true" />
      <div className="ab-book" role="img" aria-label="Ancient Indian manuscript whose pages turn as you scroll">
        <div className="ab-spine" aria-hidden="true" />
        <motion.div className="ab-foreedge" aria-hidden="true" style={{ opacity: edgeOpacity }} />
        <div className="ab-backboard" aria-hidden="true">
          <div className="ab-backboard-inner">
            <LotusMini />
            <p className="sanskrit-title" style={{ color: '#C49A45', fontSize: '0.95rem', marginTop: 8 }}>॥ समाप्तम् ॥</p>
          </div>
        </div>
        {/* Static base: Introduction page (left) + parchment endpaper (right).
            The closed cover fills the whole frame; first scroll folds it back
            to reveal this spread. Landed leaves rest on the left, in frame. */}
        <div className="ab-leftbase ab-introbase" aria-label="Introduction page">
          <IntroFace />
        </div>
        <div className="ab-rightbase" aria-hidden="true">
          <p className="sanskrit-title" style={{ color: '#9A7730', fontSize: '0.85rem' }}>॥ शुभम् ॥</p>
        </div>

        {/* Leaves render back-to-front so the cover starts on top. */}
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
              <PageNo>॥ ८ ॥</PageNo>
            </>
          }
        />

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

        {/* Cover: full-width closed book named SwiftSum. First scroll folds
            it back to reveal the spread; it stays folded outside the frame. */}
        <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[0]} zTop={10} zRest={0}
          label="SwiftSum manuscript cover" leafClass="ab-coverleaf"
          frontClass="ab-coverface ab-coverfull" backClass="ab-coverback"
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
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  return <BookLeaf {...props} />;
}

/** Non-animated alternative: cover + full readable page list. */
function StaticBook() {
  const pages: Array<[string, string]> = [
    ['Cover', 'INDIAN KNOWLEDGE SYSTEMS — The Timeless Wisdom of Bharat.'],
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
