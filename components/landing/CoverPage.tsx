'use client';

import React, { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import AncientBook from '@/components/landing/AncientBook/AncientBook';
import ChapterStack from '@/components/landing/Chapters/ChapterStack';
import PalaceBackdrop from '@/components/landing/AncientBook/PalaceBackdrop';

export default function CoverPage() {
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const sheet = (inPin: boolean) => (
    <div className={`cover-sheet corner-motifs${inPin ? ' ab-pinsheet' : ''}`}>
      <span className="corner tl" aria-hidden="true">◈</span>
      <span className="corner tr" aria-hidden="true">◈</span>
      <span className="corner bl" aria-hidden="true">◈</span>
      <span className="corner br" aria-hidden="true">◈</span>
      <PalaceBackdrop />

      <div className="ab-split">
        <div className="ab-split-copy">
          {/* Step 3.2: chapter stack lives in the existing pin panel beside
              the book. Chapter I holds the previous hero copy verbatim. */}
          <ChapterStack targetRef={heroRef} />
        </div>

        <div className="ab-split-book">
          {/* Interactive 3D manuscript — flips with pin scroll progress only,
              stays inside this hero, never overlaps other sections. */}
          <AncientBook targetRef={heroRef} />
        </div>
      </div>
    </div>
  );

  return (
    <section id="cover" ref={heroRef} className={`hero-shell ab-hero${reduce ? '' : ' ab-track'}`} aria-label="Cover page">
      {reduce ? (
        sheet(false)
      ) : (
        /* Single pinned panel: locks in view while the book completes its
           flips, then releases into the next section. Reversible. */
        <div className="ab-pin">{sheet(true)}</div>
      )}
    </section>
  );
}
