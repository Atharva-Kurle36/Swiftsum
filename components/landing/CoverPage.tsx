'use client';

import React from 'react';
import { NalandaIllustration, LotusDivider, PillarAccent } from '@/components/common/Motifs';

export default function CoverPage() {
  return (
    <section id="cover" className="hero-shell" aria-label="Cover page">
      <div className="cover-sheet corner-motifs">
        <span className="corner tl" aria-hidden="true">◈</span>
        <span className="corner tr" aria-hidden="true">◈</span>
        <span className="corner bl" aria-hidden="true">◈</span>
        <span className="corner br" aria-hidden="true">◈</span>

        <p className="sanskrit-title text-center" style={{ color: '#9A7730', fontSize: '1.05rem', fontWeight: 600 }}>
          ॥ विद्या ददाति विनयम् ॥
        </p>
        <p className="text-center italic font-serif" style={{ color: '#6B5847', fontSize: '0.85rem' }}>
          “Knowledge bestows humility” — a guiding ideal of the ancient Nalanda tradition
        </p>

        <div className="gold-rule" />

        <p className="section-number text-center">A COLLEGE ACADEMIC SUBMISSION</p>
        <h1 className="text-center text-3xl sm:text-4xl md:text-5xl mt-2" style={{ letterSpacing: '0.08em' }}>
          INDIAN KNOWLEDGE<br />SYSTEMS (IKS)
        </h1>
        <p className="sanskrit-title text-center mt-2" style={{ color: '#641E16', fontWeight: 700, fontSize: '1.1rem' }}>
          भारतीय ज्ञान परंपरा
        </p>
        <p className="text-center font-serif italic mt-2" style={{ color: '#6B5847' }}>
          Vedic Mathematics · Astronomy · Philosophy · Scholarship — from Nalanda to NEP 2020
        </p>

        <div style={{ margin: '22px 0 6px' }}>
          <NalandaIllustration />
        </div>

        <LotusDivider />

        <PillarAccent />
      </div>
    </section>
  );
}
