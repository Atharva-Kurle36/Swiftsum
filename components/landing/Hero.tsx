'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Sparkles, ArrowRight, Zap, Play, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

interface DemoCase {
  id: string;
  name: string;
  sanskrit: string;
  expression: string;
  op: string;
  a: string;
  b?: string;
  conventionalSteps: string[];
  conventionalTime: string;
  vedicInsight: string;
  vedicSteps: string[];
  vedicTime: string;
  finalAnswer: string;
}

const DEMO_CASES: DemoCase[] = [
  {
    id: 'squaring-85',
    name: 'Ekādhikena Pūrveṇa',
    sanskrit: 'एकाधिकेन पूर्वेण',
    expression: '85²',
    op: 'squaring',
    a: '85',
    conventionalSteps: [
      'Multiply 85 × 5 = 425',
      'Shift and multiply 85 × 80 = 6800',
      'Add 425 + 6800 column by column',
      'Carries resolved over 3 cycles',
    ],
    conventionalTime: '18 - 25 seconds',
    vedicInsight: 'Numbers ending in 5: multiply leading digits by (digits + 1) and append 25.',
    vedicSteps: [
      'Left partition: 8 × (8 + 1) = 8 × 9 = 72',
      'Right partition: 5² = 25',
      'Concatenate partitions: 72 | 25 = 7,225',
    ],
    vedicTime: '2 seconds (Mental)',
    finalAnswer: '7,225',
  },
  {
    id: 'nikhilam-98x97',
    name: 'Nikhilam Navataścaramam',
    sanskrit: 'निखिलं नवतश्चरमं दशतः',
    expression: '98 × 97',
    op: 'multiplication',
    a: '98',
    b: '97',
    conventionalSteps: [
      '98 × 7 = 686',
      '98 × 90 = 8820',
      'Add 686 + 8820 with carrying across 4 columns',
      'Final total verified after multi-row tally',
    ],
    conventionalTime: '20 - 30 seconds',
    vedicInsight: 'Base 100 deficits: 98 is (-2), 97 is (-3). Cross-subtract and multiply deviations.',
    vedicSteps: [
      'Base 100 Deficits: (98 - 100) = -02, (97 - 100) = -03',
      'Left partition: 98 - 03 = 95 (or 97 - 02 = 95)',
      'Right partition: (-02) × (-03) = 06',
      'Synthesize: 95 | 06 = 9,506',
    ],
    vedicTime: '3 seconds (Mental)',
    finalAnswer: '9,506',
  },
  {
    id: 'urdhva-43x21',
    name: 'Ūrdhva-Tiryagbhyām',
    sanskrit: 'ऊर्ध्वतिर्यग्भ्याम्',
    expression: '43 × 21',
    op: 'multiplication',
    a: '43',
    b: '21',
    conventionalSteps: [
      '43 × 1 = 43',
      '43 × 20 = 860',
      'Combine 43 + 860 with carry arithmetic',
      'Standard 3-line paper calculation',
    ],
    conventionalTime: '15 - 20 seconds',
    vedicInsight: 'Vertically and crosswise: single-line parallel cross products straight to answer.',
    vedicSteps: [
      'Step 1 (Units): 3 × 1 = 3 (Placed: 3, Carry: 0)',
      'Step 2 (Cross): (4×1) + (3×2) = 4 + 6 = 10 (Placed: 0, Carry: 1)',
      'Step 3 (Tens): (4×2) + 1 carry = 9 (Placed: 9)',
      'Complete left-to-right vector: 903',
    ],
    vedicTime: '4 seconds (Mental)',
    finalAnswer: '903',
  },
];

export default function Hero() {
  const [activeDemo, setActiveDemo] = useState<DemoCase>(DEMO_CASES[0]);

  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner Tag */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2"
        >
          <span className="vedic-badge gold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Indian Knowledge Systems (IKS) • NEP 2020 Pedagogical Framework
          </span>
        </motion.div>
      </div>

      {/* Main Headline & Philosophical Framing */}
      <div className="text-center max-w-4xl mx-auto mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight text-[var(--text-pure)]"
        >
          Ancient Mental Algorithms.{' '}
          <span className="text-[var(--accent-copper)] relative inline-block">
            Calculated in Parallel.
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--accent-copper)] opacity-70" />
          </span>
        </motion.h1>

        {/* Authentic Vedanga Shloka */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 mb-4 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] max-w-2xl mx-auto text-center"
        >
          <p className="sanskrit-title text-base sm:text-lg text-[var(--accent-copper)] font-bold tracking-wide">
            यथा शिखा मयूराणां नागानां मणयो यथा । तद्वद् वेदाङ्गशास्त्राणां गणितं मूर्धनि स्थितम् ॥
          </p>
          <p className="text-xs text-[var(--text-muted)] italic mt-1 font-sans">
            "Like the crest on a peacock and the crown jewel on a serpent, mathematics sits supreme at the pinnacle of all Vedic sciences." — <span className="text-[var(--text-pure)] font-medium">Vedāṅga Jyotiṣa (v. 4)</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed"
        >
          Vedic mathematics is not rote arithmetic or mystical shortcuts. It is an elegant, positional base-10 algebra designed for lightning-fast mental execution. Step through classical sutras with live vector cross-lines and ground-truth verification.
        </motion.p>
      </div>

      {/* THE SIGNATURE THESIS: Interactive Live "Speed of Sutra" Mental Math Demonstrator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="max-w-4xl mx-auto parchment-card p-6 sm:p-8 border border-[var(--border-medium)] bg-[var(--bg-surface)] shadow-2xl mb-14"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)] mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--accent-copper)]" />
              <h3 className="font-serif font-extrabold text-lg text-[var(--text-pure)]">
                The Speed of Sutra: Mental Micro-Demonstration
              </h3>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Select an expression below to witness how Vedic principles compress multi-step scratchwork into a single parallel glance.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {DEMO_CASES.map(tc => (
              <button
                key={tc.id}
                onClick={() => setActiveDemo(tc)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all border ${
                  activeDemo.id === tc.id
                    ? 'bg-[var(--accent-copper)] text-[#090D16] border-[var(--accent-copper)] shadow-md shadow-[rgba(245,158,11,0.25)]'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-pure)] hover:border-[var(--border-medium)]'
                }`}
              >
                {tc.expression}
              </button>
            ))}
          </div>
        </div>

        {/* Live Side-by-Side Comparison Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDemo.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
          >
            {/* Left: Conventional Long-Form Arithmetic */}
            <div className="p-5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[var(--text-dim)]">
                    Conventional Scratchpad
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-rose-400">
                    <Clock className="w-3.5 h-3.5" />
                    {activeDemo.conventionalTime}
                  </span>
                </div>
                <div className="text-2xl font-mono font-bold text-[var(--text-muted)] mb-3">
                  {activeDemo.expression}
                </div>
                <div className="space-y-2 text-xs font-mono text-[var(--text-muted)]">
                  {activeDemo.conventionalSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--text-dim)] select-none">[{idx + 1}]</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--text-dim)]">
                Requires scratch paper, multiple lines of intermediate products, and sequential column addition.
              </div>
            </div>

            {/* Right: Vedic Ganita Mental Sutra */}
            <div className="p-5 rounded-xl bg-[rgba(245,158,11,0.05)] border border-[var(--border-copper)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[var(--accent-copper)] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Vedic Sutra Shortcut
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    {activeDemo.vedicTime}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="text-3xl font-mono font-black text-[var(--accent-copper)]">
                    = {activeDemo.finalAnswer}
                  </div>
                  <span className="sanskrit-title text-xs text-[var(--text-muted)] font-medium">
                    {activeDemo.sanskrit}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-pure)] font-medium mb-3 bg-[var(--bg-surface-elevated)] p-2.5 rounded-lg border border-[var(--border-subtle)]">
                  {activeDemo.vedicInsight}
                </p>
                <div className="space-y-2 text-xs font-mono text-[var(--text-pure)]">
                  {activeDemo.vedicSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[var(--accent-copper)] select-none">✓</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Deep-link to Calculator */}
              <div className="mt-5 pt-3 border-t border-[var(--border-copper)] flex items-center justify-between">
                <span className="text-[11px] text-[var(--accent-copper)] font-medium">
                  Verified in {activeDemo.name}
                </span>
                <Link
                  href={`/calculator?op=${activeDemo.op}&a=${activeDemo.a}${activeDemo.b ? `&b=${activeDemo.b}` : ''}`}
                  className="text-xs font-bold text-[var(--text-pure)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-copper)] hover:text-[#090D16] px-3 py-1.5 rounded-lg border border-[var(--border-copper)] transition-all flex items-center gap-1 group"
                >
                  <span>Step Through in Engine</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Global Launch Bar below Demo */}
        <div className="mt-6 pt-5 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Full 5-Sutra Suite: Multiplication, Squaring, Subtraction, Division & Divisibility</span>
          </div>
          <Link
            href="/calculator"
            className="btn-vedic-primary w-full sm:w-auto text-sm !py-2.5 !px-6"
          >
            <Calculator className="w-4 h-4" />
            <span>Open Vedic Arithmetic Engine</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

    </section>
  );
}
