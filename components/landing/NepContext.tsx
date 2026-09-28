'use client';

import React from 'react';
import { BookOpen, GraduationCap, Cpu, Lightbulb, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NepContext() {
  return (
    <section id="nep-context" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left narrative */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2">
            <span className="vedic-badge gold">
              <GraduationCap className="w-3.5 h-3.5" /> NEP 2020 Pedagogical Framework
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[var(--text-pure)] leading-tight tracking-tight">
            Bridging Ancient Indian Knowledge Systems with Modern STEM Education
          </h2>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            India's National Education Policy (<strong className="text-[var(--text-pure)]">NEP 2020, Section 4.27</strong>) mandates integrating Indian Knowledge Systems into contemporary education. Rather than treating classical algorithms as dusty historical curiosities, 
            <strong className="text-[var(--accent-copper)]"> SwiftSum</strong> makes them tactile, auditable, and mathematically rigorous.
          </p>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Every calculation exposes the foundational mechanics of the decimal positional number system invented in India. Students don't memorize black-box procedures; they witness digit pairs cross-multiply in parallel, see complements eliminate borrow chains, and understand base-deficiency shortcuts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 text-xs text-[var(--text-muted)] bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-subtle)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-copper)] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--text-pure)] block mb-1">Algorithmic Parallelism:</strong>
                Ancient sutras operate on independent digit partitions, directly anticipating modern SIMD computing pipelines.
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-[var(--text-muted)] bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-subtle)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--accent-lapis)] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--text-pure)] block mb-1">Eradication of Math Anxiety:</strong>
                Transforming tedious column calculations into intuitive spatial patterns builds mental agility and numerical intuition.
              </div>
            </div>
          </div>
        </div>

        {/* Right Feature Architecture Card */}
        <div className="lg:col-span-5">
          <div className="parchment-card p-6 sm:p-8 border border-[var(--border-medium)] bg-[var(--bg-surface)] shadow-xl relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--border-subtle)]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0284C7] to-[#0369A1] text-white flex items-center justify-center shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[var(--text-pure)]">
                  Pedagogical Audit Standard
                </h3>
                <p className="text-xs text-[var(--text-dim)]">
                  Curriculum Guidelines for Educators & Evaluators
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-[var(--text-muted)]">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[rgba(245,158,11,0.15)] text-[var(--accent-copper)] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-amber-500/20">
                  01
                </span>
                <div>
                  <strong className="text-[var(--text-pure)]">Interactive Step Scrubber:</strong>
                  Play at variable tempo (0.8s, 1.6s, 3.0s) or manually scrub forward and backward through each intermediate operation.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[rgba(56,189,248,0.15)] text-[var(--accent-lapis)] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-500/20">
                  02
                </span>
                <div>
                  <strong className="text-[var(--text-pure)]">Sulba Ray Geometry:</strong>
                  Dynamic vector lines visually connect exact digit coordinate pairs during crosswise multiplication.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[rgba(16,185,129,0.15)] text-emerald-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/20">
                  03
                </span>
                <div>
                  <strong className="text-[var(--text-pure)]">100% Ground-Truth Verification:</strong>
                  Every single step, carry, and final result is cross-checked against standard algebraic ground truth in real time.
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-dim)]">
              <span>National Education Policy 2020</span>
              <span className="font-mono text-[var(--accent-copper)] font-semibold">IKS-2026-NEP</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
