'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

interface SutraCardInfo {
  id: string;
  name: string;
  sanskritDevanagari: string;
  sanskrit: string;
  meaning: string;
  operation: string;
  complexity: string;
  example: string;
  description: string;
  defaultInputs: { a: string; b?: string };
}

const SUTRA_LIST: SutraCardInfo[] = [
  {
    id: 'multiplication',
    name: 'Ūrdhva-Tiryagbhyām & Nikhilam',
    sanskritDevanagari: 'ऊर्ध्वतिर्यग्भ्याम् / निखिलम्',
    sanskrit: 'Urdhva-Tiryagbhyam & Nikhilam',
    meaning: 'Vertically and Crosswise / All from 9 and the last from 10',
    operation: 'Multiplication',
    complexity: 'O(n) Mental Parallel Passes',
    example: '98 × 97 = 9,506  •  43 × 21 = 903',
    description: 'Computes parallel cross-products in a single pass using vector ray intersections. Automatically switches to base-deficiency shortcuts for numbers near powers of 10.',
    defaultInputs: { a: '98', b: '97' },
  },
  {
    id: 'squaring',
    name: 'Ekādhikena Pūrveṇa & Yāvadūnam',
    sanskritDevanagari: 'एकाधिकेन पूर्वेण / यावदूनम्',
    sanskrit: 'Ekadhikena Purvena & Yavadunam',
    meaning: 'By one more than the previous / Lessen by the deficiency',
    operation: 'Squaring',
    complexity: '1-Step Mental Concatenation',
    example: '85² = 7,225  •  96² = 9,216',
    description: 'Instant squaring for numbers ending in 5 (e.g. 8 × 9 | 25 = 7225) and numbers near 10, 100, 1000 using negative or positive deviation adjustments.',
    defaultInputs: { a: '85' },
  },
  {
    id: 'subtraction',
    name: 'Nikhilam Complement Subtraction',
    sanskritDevanagari: 'निखिलं नवतश्चरमं दशतः',
    sanskrit: 'Nikhilam Navatashcaramam Dashatah',
    meaning: 'All from 9 and the last from 10',
    operation: 'Subtraction',
    complexity: 'Direct Left-to-Right Stream',
    example: '1,000 − 468 = 532',
    description: 'Completely eliminates borrowing chains across multiple zeroes by computing 10’s complements directly: subtract all internal digits from 9 and the final non-zero unit from 10.',
    defaultInputs: { a: '1000', b: '468' },
  },
  {
    id: 'division',
    name: 'Nikhilam Division & Correction',
    sanskritDevanagari: 'निखिलं विभागः',
    sanskrit: 'Nikhilam Vibhagah',
    meaning: 'Base-deficiency quotient balance with column fallback',
    operation: 'Division',
    complexity: 'No Trial Multiplications',
    example: '1,032 ÷ 9 = Q: 114, R: 6',
    description: 'Divides large numbers by divisors near powers of 10 without tedious trial multiplication, generating quotient and remainder columns through deficiency addition.',
    defaultInputs: { a: '1032', b: '9' },
  },
  {
    id: 'divisibility',
    name: 'Ekādhika Osculation (Veṣṭana)',
    sanskritDevanagari: 'एकाधिक पूर्व / वेष्टन पद्धति',
    sanskrit: 'Ekadhika Purva & Vestana Paddhati',
    meaning: 'By one more than the previous (positive & negative osculators)',
    operation: 'Divisibility Check',
    complexity: 'Stepwise Modular Reduction',
    example: '27,835 ÷ 7 ➜ Verified Yes',
    description: 'Rapidly reduces arbitrarily large numbers using seed multipliers (P = 2 for 19, P = 5 for 7, P = 4 for 13) and casting out nines, outputting step-by-step reduction trees.',
    defaultInputs: { a: '27835', b: '7' },
  },
];

export default function SutraCatalog() {
  return (
    <section id="sutras" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="vedic-badge teal">
            <Cpu className="w-3.5 h-3.5" /> Core Algorithms
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[var(--text-pure)] tracking-tight">
          The Five Classical Computational Pillars
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto mt-2.5">
          Each technique demonstrates an algebraic shortcut derived from classical Sanskrit aphorisms, 
          backed by complete proofs and animated digit-level visualizers.
        </p>
      </div>

      {/* Grid of 5 Sutras */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUTRA_LIST.map((sutra) => (
          <div
            key={sutra.id}
            className="parchment-card p-6 flex flex-col justify-between border border-[var(--border-subtle)] hover:border-[var(--border-copper)] transition-all group"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="vedic-badge gold text-[10px]">
                  {sutra.operation}
                </span>
                <span className="font-mono text-[10px] text-[var(--accent-lapis)] bg-[rgba(56,189,248,0.08)] px-2 py-0.5 rounded border border-[rgba(56,189,248,0.2)]">
                  {sutra.complexity}
                </span>
              </div>

              {/* Title & Authentic Devanagari */}
              <h3 className="font-serif font-bold text-lg text-[var(--text-pure)] mb-1 group-hover:text-[var(--accent-copper)] transition-colors">
                {sutra.name}
              </h3>
              <p className="sanskrit-title text-sm text-[var(--accent-copper)] mb-1 font-bold">
                {sutra.sanskritDevanagari}
              </p>
              <p className="text-xs text-[var(--text-dim)] italic mb-4">
                "{sutra.meaning}"
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                {sutra.description}
              </p>

              {/* Example box */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] mb-6">
                <span className="text-[10px] font-semibold text-[var(--accent-copper)] uppercase tracking-wider block mb-1">
                  Demonstration Preset
                </span>
                <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-pure)]">
                  {sutra.example}
                </span>
              </div>
            </div>

            {/* Launch CTA */}
            <Link
              href={`/calculator?op=${sutra.id}&a=${sutra.defaultInputs.a}${sutra.defaultInputs.b ? `&b=${sutra.defaultInputs.b}` : ''}`}
              className="btn-vedic-secondary !py-2.5 !px-4 text-xs font-semibold flex items-center justify-between w-full group/btn"
            >
              <span className="flex items-center gap-1.5 text-[var(--text-pure)]">
                <Calculator className="w-3.5 h-3.5 text-[var(--accent-copper)]" />
                <span>Open in Calculator</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-[var(--accent-copper)]" />
            </Link>
          </div>
        ))}

        {/* 6th Tile: Systematic IKS Pedagogy Summary */}
        <div className="parchment-card p-6 flex flex-col justify-between border border-dashed border-[var(--border-medium)] bg-[rgba(245,158,11,0.03)]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="vedic-badge text-[10px] text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                NEP 2020 Aligned
              </span>
            </div>
            <h3 className="font-serif font-bold text-lg text-[var(--text-pure)] mb-2">
              Why Vedic Math in Modern Curricula?
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-4">
              NEP 2020 Section 4.27 highlights incorporating Indian Knowledge Systems into contemporary STEM. Vedic mathematics fosters mental flexibility, pattern recognition, and eliminates math phobia by turning arithmetic into visual geometry.
            </p>
          </div>
          <a
            href="#nep-context"
            className="text-xs font-semibold text-[var(--accent-copper)] hover:text-amber-300 flex items-center gap-1.5"
          >
            <span>Read Curriculum Context</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
