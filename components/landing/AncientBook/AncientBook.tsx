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

/* 5 flip windows — cover first, then 3 content leaves. */
const LEAF_RANGES: Array<[number, number]> = [
  [0.02, 0.18], // cover opens
  [0.16, 0.36], // Intro leaf
  [0.34, 0.54], // Education leaf
  [0.52, 0.72], // Science leaf
  [0.70, 0.88], // Modern Relevance leaf
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

        {/* LEFT HALF base: dark maroon backing — flipped pages land on top of this */}
        <div className="ab-leftbase" aria-hidden="true" />

        {/* RIGHT HALF base: parchment endpaper — only visible after ALL pages have flipped */}
        <div className="ab-rightbase" aria-hidden="true">
          <p className="sanskrit-title" style={{ color: '#9A7730', fontSize: '0.9rem' }}>॥ शुभम् ॥</p>
        </div>

        {/* ── Leaves render back-to-front so cover is on top.
            Flip order: Cover → Intro (p2) → Education (p3) → Science (p5) → base ── */}


        <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[4]} zTop={7} zRest={4}
          label="Modern Relevance page"
          frontClass="ab-page" backClass="ab-page ab-closing"
          front={
            <>
              <Kicker>Page 4 · Present Day</Kicker>
              <Title>Modern Relevance</Title>
              <div className="ab-rule" />
              <Body>Traditional Indian knowledge speaks to contemporary education — NEP 2020 (§4.27) brings Indian Knowledge Systems into modern curricula.</Body>
              <Body>Ancient methods sharpen mental agility, pattern recognition and numerical intuition in today&apos;s classrooms.</Body>
              <PageNo>॥ ४ ॥</PageNo>
            </>
          }
          back={
            <>
              <YantraMini />
              <Title>Philosophy &amp; Wisdom</Title>
              <Body>Dharma, inquiry and compassion — values that guide conduct across generations.</Body>
            </>
          }
        />

        {/* Leaf 3 — (z=8), flip 3rd → reveals Modern Relevance */}
        <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[3]} zTop={8} zRest={3}
          label="Science and Mathematics page"
          frontClass="ab-page" backClass="ab-page"
          front={
            <>
              <Kicker>Page 3 · Gaṇita &amp; Jyotiṣa</Kicker>
              <Title>Science &amp; Mathematics</Title>
              <div className="ab-rule" />
              <ChakraMini />
              <Body>Zero and the decimal place-value system, precise astronomy, Ayurvedic medicine — India&apos;s enduring gifts to world knowledge.</Body>
              <PageNo>॥ ३ ॥</PageNo>
            </>
          }
          back={
            <>
              <Kicker>The Four Vedas</Kicker>
              <Title>Ṛg · Sāma · Yajur · Atharva</Title>
              <div className="ab-rule" />
              <ul className="ab-list">
                <li><strong>Ṛgveda</strong> — hymns of cosmic order</li>
                <li><strong>Sāmaveda</strong> — the science of melody</li>
                <li><strong>Yajurveda</strong> — ritual and procedure</li>
                <li><strong>Atharvaveda</strong> — life and healing lore</li>
              </ul>
            </>
          }
        />

        {/* Leaf 2 — (z=9), flip 2nd → reveals Science */}
        <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[2]} zTop={9} zRest={2}
          label="Ancient Indian Education page"
          frontClass="ab-page" backClass="ab-page"
          front={<EducationFace />}
          back={
            <>
              <ArchMini />
              <Body>Nalanda and Takshashila stood as the world&apos;s first universities, attracting scholars from across Asia.</Body>
            </>
          }
        />

        {/* Leaf 1 — (z=10), flip 1st after cover → reveals Education */}
        <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[1]} zTop={10} zRest={1}
          label="Introduction page"
          frontClass="ab-page" backClass="ab-page"
          front={<IntroFace />}
          back={
            <>
              <LotusMini />
            </>
          }
        />

        {/* Cover (z=11) — very first flip → reveals Introduction (Leaf 1) */}
        <FlipLeaf progress={scrollYProgress} range={LEAF_RANGES[0]} zTop={11} zRest={0}
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
  hideWhenFlipped?: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  return <BookLeaf {...props} />;
}

/** Non-animated fallback for reduced-motion users. */
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
