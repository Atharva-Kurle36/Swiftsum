'use client';

import React from 'react';
import { BookOpen, GraduationCap, Cpu, Lightbulb, Compass, CheckCircle } from 'lucide-react';

export default function NepContext() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-[var(--parchment-border)]">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left narrative */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="vedic-badge gold">
              <GraduationCap className="w-3.5 h-3.5" /> NEP 2020 Vision
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--ink)] leading-snug">
            Bridging Ancient Indian Knowledge Systems (IKS) with Modern Pedagogy
          </h2>

          <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
            India's National Education Policy (NEP 2020) mandates the integration of Indian Knowledge Systems
            into core curricula. Rather than presenting classical algorithms as dusty historical curiosities,
            <strong> Vedic Ganita Calculator</strong> makes them tangible, auditable, and engaging.
          </p>

          <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
            Every calculation shows the complete working behind each step. Students don't just memorize
            a formula—they watch digit pairs cross-multiply, see complements eliminate borrowing, and
            understand how deviation from powers of 10 creates lightning-fast mental shortcuts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-start gap-2 text-xs text-[var(--ink)] bg-[rgba(236,224,194,0.45)] p-3 rounded-lg border border-[var(--parchment-border)]">
              <CheckCircle className="w-4 h-4 text-[var(--vermilion)] flex-shrink-0 mt-0.5" />
              <span><strong>Algorithmic Thinking:</strong> Learn how ancient Indian methods parallel modern parallel-processing architectures.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-[var(--ink)] bg-[rgba(236,224,194,0.45)] p-3 rounded-lg border border-[var(--parchment-border)]">
              <CheckCircle className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
              <span><strong>Mental Agility:</strong> Build cognitive confidence and number intuition without relying on calculators.</span>
            </div>
          </div>
        </div>

        {/* Right Feature Card */}
        <div className="lg:col-span-5">
          <div className="parchment-card p-6 sm:p-8 border border-[var(--parchment-border)] bg-[var(--parchment-card)] shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--teal)] text-white flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[var(--ink)]">
                  Pedagogical Framework
                </h3>
                <p className="text-xs text-[var(--ink-light)]">
                  Designed for Students, Teachers & Evaluators
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[var(--ink-muted)]">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[rgba(168,64,47,0.1)] text-[var(--vermilion)] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-[var(--ink)]">Step Player Control:</strong> Auto-advance every ~1.6s, or manually step forward and backwards at your own pace.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[rgba(169,129,47,0.15)] text-[var(--gold)] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-[var(--ink)]">Crosswise Visual Lines:</strong> Animated SVG bezier lines highlight exactly which digits interact in each step.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[rgba(41,76,72,0.15)] text-[var(--teal)] font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-[var(--ink)]">100% Ground-Truth Guarantee:</strong> Rigorous fallback algorithms ensure standard arithmetic correctness is always preserved.
                </div>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[var(--parchment-border)] flex items-center justify-between text-xs text-[var(--ink-light)]">
              <span>National Education Policy 2020</span>
              <span className="font-mono text-[var(--gold)]">IKS-2026-NEP</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
