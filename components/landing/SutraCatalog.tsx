'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, CheckCircle, Zap } from 'lucide-react';

interface SutraCardInfo {
  id: string;
  name: string;
  sanskrit: string;
  meaning: string;
  operation: string;
  example: string;
  description: string;
  defaultInputs: { a: string; b?: string };
}

const SUTRA_LIST: SutraCardInfo[] = [
  {
    id: 'multiplication',
    name: 'Urdhva-Tiryagbhyam & Nikhilam',
    sanskrit: 'Urdhva-Tiryagbhyam / Nikhilam Navatashcaramam Dashatah',
    meaning: 'Vertically and Crosswise / All from 9 and the last from 10',
    operation: 'Multiplication',
    example: '98 × 97 = 9,506 or 43 × 21 = 903',
    description: 'Calculates all crosswise partial products in single parallel steps with dynamic visual connecting lines, and base-deficiency shortcuts for near-round numbers.',
    defaultInputs: { a: '98', b: '97' },
  },
  {
    id: 'squaring',
    name: 'Ekadhikena Purvena & Yavadunam',
    sanskrit: 'Ekadhikena Purvena / Yavadunam',
    meaning: 'By one more than the previous / Whatever the deficiency, lessen by that much',
    operation: 'Squaring',
    example: '85² = 7,225 or 96² = 9,216',
    description: 'Instant mental squaring for numbers ending in 5 (e.g. 8 × 9 | 25 = 7225) and numbers near powers of 10 using negative or positive deviation adjustments.',
    defaultInputs: { a: '85' },
  },
  {
    id: 'subtraction',
    name: 'Nikhilam Complement Subtraction',
    sanskrit: 'Nikhilam Navatashcaramam Dashatah',
    meaning: 'All from 9 and the last from 10',
    operation: 'Subtraction',
    example: '1,000 − 468 = 532',
    description: 'Replaces tedious multi-column borrowing by directly computing the 10’s complement of each digit: subtract preceding digits from 9, and the unit digit from 10.',
    defaultInputs: { a: '1000', b: '468' },
  },
  {
    id: 'division',
    name: 'Nikhilam Division & Self-Correction',
    sanskrit: 'Nikhilam Vibhagah',
    meaning: 'Base-deviation quotient adjustment with column fallback',
    operation: 'Division',
    example: '1,032 ÷ 9 = Q: 114, R: 6',
    description: 'Efficiently divides numbers when the divisor sits near a base of 10 using the divisor’s deficiency to iteratively generate and balance quotient digits.',
    defaultInputs: { a: '1032', b: '9' },
  },
  {
    id: 'divisibility',
    name: 'Ekadhika Osculation & Digit-Sums',
    sanskrit: 'Ekadhika Purva / Vestana Paddhati',
    meaning: 'By one more than the previous (positive & negative osculators)',
    operation: 'Divisibility Check',
    example: '27,835 ÷ 7 ➜ Verified Yes',
    description: 'Rapidly reduces arbitrarily large numbers using osculators (P = 2 for 19, P = 5 for 7, P = 4 for 13) and casting-out-nines, outputting step-by-step reduction trees.',
    defaultInputs: { a: '27835', b: '7' },
  },
];

export default function SutraCatalog() {
  return (
    <section id="sutras" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="vedic-badge teal">
            <Zap className="w-3.5 h-3.5" /> 5 Classical Pillars
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[var(--ink)]">
          The Five Classical Operations
        </h2>
        <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-2xl mx-auto mt-2">
          Each technique demonstrates an intuitive shortcut derived from the 16 core Vedic Sutras,
          backed by complete algebraic proofs and step-by-step visualizations.
        </p>
      </div>

      {/* Grid of 5 Sutras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUTRA_LIST.map((sutra) => (
          <div
            key={sutra.id}
            className="parchment-card p-6 flex flex-col justify-between border border-[var(--parchment-border)] hover:shadow-lg transition-shadow group"
          >
            <div>
              {/* Operation Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="vedic-badge gold text-[10px]">
                  {sutra.operation}
                </span>
                <span className="text-[11px] font-mono text-[var(--ink-muted)] bg-[var(--parchment)] px-2 py-0.5 rounded">
                  Sutra
                </span>
              </div>

              {/* Title & Sanskrit */}
              <h3 className="font-serif font-bold text-lg text-[var(--ink)] mb-1 group-hover:text-[var(--vermilion)] transition-colors">
                {sutra.name}
              </h3>
              <p className="sanskrit-title text-sm text-[var(--gold)] mb-2 font-medium">
                {sutra.sanskrit}
              </p>
              <p className="text-xs text-[var(--ink-light)] italic mb-4">
                "{sutra.meaning}"
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed mb-4">
                {sutra.description}
              </p>

              {/* Example box */}
              <div className="p-3 rounded-lg bg-[rgba(236,224,194,0.6)] border border-[var(--parchment-border)] mb-6">
                <span className="text-[11px] font-semibold text-[var(--teal)] uppercase tracking-wider block mb-0.5">
                  Classic Demonstration
                </span>
                <span className="font-mono text-sm font-bold text-[var(--ink)]">
                  {sutra.example}
                </span>
              </div>
            </div>

            {/* Launch CTA */}
            <Link
              href={`/calculator?op=${sutra.id}&a=${sutra.defaultInputs.a}${sutra.defaultInputs.b ? `&b=${sutra.defaultInputs.b}` : ''}`}
              className="btn-vedic-secondary !py-2 !px-4 text-xs font-semibold flex items-center justify-between w-full group/btn"
            >
              <span className="flex items-center gap-1.5 text-[var(--ink)]">
                <Calculator className="w-3.5 h-3.5 text-[var(--vermilion)]" />
                <span>Test in Calculator</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[var(--vermilion)]" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
