'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FinalCta() {
  return (
    <section id="get-started" className="section-shell section-shell-accent">
      <div className="section-inner">
        <div className="parchment-card p-8 sm:p-12 text-center relative overflow-hidden !bg-[#FFF9EF] !border-[#C49A45]">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#C49A45]" />
          <div className="absolute inset-x-8 top-1 h-px bg-[#C49A45] opacity-60" />
          <span className="vedic-badge gold mb-5">Section 05 — Begin Practice</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-[#641E16] max-w-2xl mx-auto leading-tight">
            Ready to calculate <span className="text-[#641E16]">the Vedic way?</span>
          </h2>
          <p className="sanskrit-title text-[#9A7730] font-bold mt-3 text-base">गणितं मूर्धनि स्थितम् — Mathematics reigns supreme</p>
          <p className="text-sm sm:text-base text-[#45352B] max-w-xl mx-auto mt-3 leading-relaxed">
            Open the interactive workspace, pick a preset like 98 × 97 or 85², and scrub through every digit-level ray intersection with verification.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link href="/calculator" className="btn-vedic-primary w-full sm:w-auto">
              <Calculator className="w-4 h-4" />
              <span>Launch Arithmetic Engine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#sutras" className="btn-vedic-secondary w-full sm:w-auto !bg-[#FFF9EF] !text-[#641E16] !border-[#C49A45]">
              <BookOpen className="w-4 h-4 text-[#641E16]" />
              <span>Revisit Sūtra Catalog</span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6 text-[11px] font-mono text-[#8C7763]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4F7A3A]" />
            <span>No signup · 100% client-side · Classroom-ready step scrubber</span>
          </div>
        </div>
      </div>
    </section>
  );
}
