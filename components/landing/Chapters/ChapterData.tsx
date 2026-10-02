import React from 'react';
import { LotusDivider } from '@/components/common/Motifs';
import { BookHeadline } from '@/components/landing/AncientBook/AncientBook';

export interface Chapter {
  /** Stable id, also used for the progress indicator + data attributes. */
  id: string;
  /** Short label, e.g. 'Chapter I · Origins'. */
  label: string;
  /** Chapter body. Reuses existing project copy — no placeholder text. */
  content: React.ReactNode;
}

// Step 3.2: Chapter I reuses the existing hero copy verbatim (moved here
// from CoverPage so panels own their content). Chapters II–IV land in 3.3.
export const CHAPTERS: Chapter[] = [
  {
    id: 'origins',
    label: 'Chapter I · Origins',
    content: (
      <>
        <p className="sanskrit-title text-center" style={{ color: '#9A7730', fontSize: '0.95rem', fontWeight: 600 }}>
          ॥ विद्या ददाति विनयम् ॥
        </p>
        <p className="text-center italic font-serif" style={{ color: '#6B5847', fontSize: '0.78rem' }}>
          “Knowledge bestows humility” — a guiding ideal of the ancient Nalanda tradition
        </p>

        <div className="gold-rule" />

        <LotusDivider />

        <BookHeadline />
      </>
    ),
  },
  // Step 3.3 — below: verbatim excerpts from lib/data/iksFacts.ts
  // (fact ids noted). Chapter IV has no existing copy in the project, so it
  // uses a clearly-marked bridging line built only from the NEP 2020 text
  // already present in NepContext — no new academic claims invented.
  {
    id: 'shunya',
    label: 'Chapter II · Shunya',
    content: (
      <>
        {/* Source: iksFacts 'brahmagupta-zero' + 'aryabhata-pi-earth'. */}
        <p className="ch-kicker">Chapter II · Shunya — Zero</p>
        <h3 className="ch-title">Zero — Āryabhaṭa &amp; Brahmagupta</h3>
        <div className="ab-rule" />
        <p className="ch-body">
          Brahmagupta was the first mathematician in world history to establish zero (Shunya)
          as a number in its own right, with formal algebraic laws — the foundation of modern
          world arithmetic.
        </p>
        <p className="ch-body">
          Āryabhaṭa computed π as 62,832 / 20,000 = 3.1416, explicitly labelling it
          “Asanna” (approximated), and posited the Earth&apos;s axial rotation.
        </p>
        <p className="ch-source">Brāhmasphuṭasiddhānta (628 CE) · Āryabhaṭīya (499 CE)</p>
      </>
    ),
  },
  {
    id: 'kerala',
    label: 'Chapter III · Kerala School',
    content: (
      <>
        {/* Source: iksFacts 'madhava-calculus'. */}
        <p className="ch-kicker">Chapter III · Kerala School</p>
        <h3 className="ch-title">Infinite Series — Mādhava</h3>
        <div className="ab-rule" />
        <p className="ch-body">
          Mādhava of Sangamagrāma discovered the infinite series for arctangent, sine,
          cosine and π (the Mādhava–Leibniz series) nearly 300 years before Newton and Leibniz.
        </p>
        <p className="ch-body">
          The birth of mathematical analysis, power series expansions, and early differential calculus.
        </p>
        <p className="ch-source">Yuktibhāṣā / Karaṇapaddhati · c. 1350–1425 CE</p>
      </>
    ),
  },
  {
    id: 'living',
    label: 'Chapter IV · Living Tradition',
    content: (
      <>
        {/* Bridging copy (no existing Ramanujan text in project): built only
            from the NEP 2020 wording already in NepContext. */}
        <p className="ch-kicker">Chapter IV · Living Tradition</p>
        <h3 className="ch-title">Rāmānujaṉ &amp; Beyond</h3>
        <div className="ab-rule" />
        <p className="ch-body">
          The tradition continues into the modern era — NEP 2020 (Section 4.27) brings
          Indian Knowledge Systems into contemporary curricula.
        </p>
        <p className="ch-body">
          Students don&apos;t memorize black-box procedures; they witness, verify and extend —
          carrying the paramparā forward.
        </p>
        <p className="ch-source">NEP 2020 · Ministry of Education, Govt. of India</p>
      </>
    ),
  },
];
