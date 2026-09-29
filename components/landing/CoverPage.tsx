'use client';

import React, { useRef } from 'react';
import { LotusDivider, PillarAccent } from '@/components/common/Motifs';
import AncientBook, { BookHeadline } from '@/components/landing/AncientBook/AncientBook';

export default function CoverPage() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section id="cover" ref={heroRef} className="hero-shell ab-hero" aria-label="Cover page">
      <div className="cover-sheet corner-motifs">
        <span className="corner tl" aria-hidden="true">◈</span>
        <span className="corner tr" aria-hidden="true">◈</span>
        <span className="corner bl" aria-hidden="true">◈</span>
        <span className="corner br" aria-hidden="true">◈</span>

        <div className="ab-hero-grid">
          <div>
            <p className="sanskrit-title text-center" style={{ color: '#9A7730', fontSize: '1.05rem', fontWeight: 600 }}>
              ॥ विद्या ददाति विनयम् ॥
            </p>
            <p className="text-center italic font-serif" style={{ color: '#6B5847', fontSize: '0.85rem' }}>
              “Knowledge bestows humility” — a guiding ideal of the ancient Nalanda tradition
            </p>

            <div className="gold-rule" />

            <p className="section-number text-center">A COLLEGE ACADEMIC SUBMISSION</p>
            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl mt-2" style={{ letterSpacing: '0.08em' }}>
              INDIAN KNOWLEDGE<br />SYSTEMS (IKS)
            </h1>
            <p className="sanskrit-title text-center mt-2" style={{ color: '#641E16', fontWeight: 700, fontSize: '1.1rem' }}>
              भारतीय ज्ञान परंपरा
            </p>
            <p className="text-center font-serif italic mt-2" style={{ color: '#6B5847' }}>
              Vedic Mathematics · Astronomy · Philosophy · Scholarship — from Nalanda to NEP 2020
            </p>

            <LotusDivider />
            <BookHeadline />
          </div>

          {/* Interactive 3D manuscript — flips with hero scroll progress only,
              stays inside this section, never sticky, scrolls away naturally. */}
          <AncientBook targetRef={heroRef} />
        </div>

        <div className="gold-rule-thin" />
        <PillarAccent />
      </div>
    </section>
  );
}
