'use client';

import React from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

export default function NepContext() {
  return (
    <section id="nep-context" className="section-shell">
      <div className="section-inner">
      <SectionHeading
        kicker="Section 04 — Pedagogy"
        eyebrow="NEP 2020 · Section 4.27"
        eyebrowTone="emerald"
        title="Bridging Ancient Wisdom"
        highlight="with Modern STEM"
        description="NEP 2020 mandates Indian Knowledge Systems in classrooms. SwiftSum turns that mandate into tactile, auditable, classroom-ready practice."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left narrative */}
        <div className="lg:col-span-7 space-y-5">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#641E16] leading-tight tracking-tight">
            Not history lessons — tactile, rigorous computation
          </h3>

          <p className="text-sm sm:text-base text-[#45352B] leading-relaxed">
            India's National Education Policy (<strong className="text-[#641E16]">NEP 2020, Section 4.27</strong>) mandates integrating Indian Knowledge Systems into contemporary education. Rather than treating classical algorithms as dusty historical curiosities, 
            <strong className="text-[#641E16]"> SwiftSum</strong> makes them tactile, auditable, and mathematically rigorous.
          </p>

          <p className="text-sm sm:text-base text-[#45352B] leading-relaxed">
            Every calculation exposes the foundational mechanics of the decimal positional number system invented in India. Students don't memorize black-box procedures; they witness digit pairs cross-multiply in parallel, see complements eliminate borrow chains, and understand base-deficiency shortcuts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3 text-xs text-[#45352B] bg-[#FFF9EF] p-4 rounded-xl border border-[#C49A45]">
              <CheckCircle2 className="w-4 h-4 text-[#641E16] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#641E16] block mb-1">Algorithmic Parallelism:</strong>
                Ancient sutras operate on independent digit partitions, directly anticipating modern SIMD computing pipelines.
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-[#45352B] bg-[#FFF9EF] p-4 rounded-xl border border-[#C49A45]">
              <CheckCircle2 className="w-4 h-4 text-[#9A7730] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#641E16] block mb-1">Eradication of Math Anxiety:</strong>
                Transforming tedious column calculations into intuitive spatial patterns builds mental agility and numerical intuition.
              </div>
            </div>
          </div>
        </div>

        {/* Right Feature Architecture Card */}
        <div className="lg:col-span-5">
          <div className="parchment-card p-6 sm:p-8 border border-[#C49A45] !bg-[#FFF9EF] shadow-[0_2px_12px_rgba(100,30,22,0.08)] relative">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#C49A45]">
              <div className="w-10 h-10 rounded-xl bg-[#641E16] text-[#FFF9EF] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#641E16]">
                  Pedagogical Audit Standard
                </h3>
                <p className="text-xs text-[#8C7763]">
                  Curriculum Guidelines for Educators & Evaluators
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-xs sm:text-sm text-[#45352B]">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[rgba(100,30,22,0.07)] text-[#641E16] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#C49A45]">
                  01
                </span>
                <div>
                  <strong className="text-[#641E16]">Interactive Step Scrubber:</strong>
                  Play at variable tempo (0.8s, 1.6s, 3.0s) or manually scrub forward and backward through each intermediate operation.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[rgba(196,154,69,0.12)] text-[#9A7730] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#C49A45]">
                  02
                </span>
                <div>
                  <strong className="text-[#641E16]">Sulba Ray Geometry:</strong>
                  Dynamic vector lines visually connect exact digit coordinate pairs during crosswise multiplication.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-[rgba(79,122,58,0.1)] text-[#4F7A3A] font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-[rgba(79,122,58,0.3)]">
                  03
                </span>
                <div>
                  <strong className="text-[#641E16]">100% Ground-Truth Verification:</strong>
                  Every single step, carry, and final result is cross-checked against standard algebraic ground truth in real time.
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-4 border-t border-[#C49A45] flex items-center justify-between text-xs text-[#8C7763]">
              <span>National Education Policy 2020</span>
              <span className="font-mono text-[#641E16] font-semibold">IKS-2026-NEP</span>
            </div>
          </div>
        </div>

      </div>

      </div>
    </section>
  );
}
