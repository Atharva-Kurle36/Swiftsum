'use client';

import React, { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LotusDivider } from '@/components/common/Motifs';
import AncientBook, { BookHeadline } from '@/components/landing/AncientBook/AncientBook';
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
          <p className="sanskrit-title text-center" style={{ color: '#9A7730', fontSize: '0.95rem', fontWeight: 600 }}>
            ॥ विद्या ददाति विनयम् ॥
          </p>
          <p className="text-center italic font-serif" style={{ color: '#6B5847', fontSize: '0.78rem' }}>
            “Knowledge bestows humility” — a guiding ideal of the ancient Nalanda tradition
          </p>

          <div className="gold-rule" />

          <LotusDivider />

          <BookHeadline />
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
