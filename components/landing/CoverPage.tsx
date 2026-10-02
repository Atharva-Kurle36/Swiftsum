'use client';

import React, { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import AncientBook from '@/components/landing/AncientBook/AncientBook';
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
      {/* Full-width two-page spread book. Cover opens left, pages flip left. */}
      <AncientBook targetRef={heroRef} />
    </div>
  );

  return (
    <section id="cover" ref={heroRef} className={`hero-shell ab-hero${reduce ? '' : ' ab-track'}`} aria-label="Cover page">
      {reduce ? (
        sheet(false)
      ) : (
        <div className="ab-pin">{sheet(true)}</div>
      )}
    </section>
  );
}
