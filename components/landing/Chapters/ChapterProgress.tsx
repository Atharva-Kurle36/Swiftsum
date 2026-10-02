'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import type { Chapter } from './ChapterData';

interface ChapterProgressProps {
  chapters: Chapter[];
  /** Index of the chapter owning the current scroll position. */
  activeIndex: number;
  /** Ref of the hero track element, for click-to-chapter scrolling. */
  trackRef: React.RefObject<HTMLElement | null>;
}

const NUMERALS = ['I', 'II', 'III', 'IV'];

// Step 3.5: fixed I–IV indicator. Shows only while the hero track is in
// view (own toggle trigger), highlights the active chapter, and jumps to a
// chapter on click. Show/hide + active states use opacity/transform only.
// Hidden in print via .no-print; not rendered at all for reduced motion.
export default function ChapterProgress({ chapters, activeIndex, trackRef }: ChapterProgressProps) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: '#cover',
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => setVisible((prev) => (prev === self.isActive ? prev : self.isActive)),
    });
    return () => {
      st.kill();
    };
  }, [reduce]);

  if (reduce) return null;

  const jumpTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    // Aim for the middle of the chapter's scroll window.
    const y = track.offsetTop + ((index + 0.5) / chapters.length) * Math.max(1, track.offsetHeight - window.innerHeight);
    window.scrollTo(0, Math.round(y));
  };

  return (
    <nav
      ref={rootRef}
      className="ch-progress no-print"
      data-visible={visible}
      aria-label="Manuscript chapters"
    >
      {chapters.map((ch, i) => (
        <button
          key={ch.id}
          type="button"
          className="ch-progress-dot"
          data-active={i === activeIndex}
          aria-label={`Go to ${ch.label}`}
          aria-current={i === activeIndex ? 'true' : undefined}
          onClick={() => jumpTo(i)}
        >
          <span aria-hidden="true">{NUMERALS[i] ?? `${i + 1}`}</span>
        </button>
      ))}
    </nav>
  );
}
