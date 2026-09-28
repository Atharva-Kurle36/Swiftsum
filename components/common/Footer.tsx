'use client';

import React from 'react';
import Link from 'next/link';
import { BookMarked, Sparkles, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--parchment-border)] bg-[var(--parchment)] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Overview */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-[var(--vermilion)] text-white flex items-center justify-center font-bold text-xs">
                VG
              </span>
              <h3 className="font-serif font-bold text-base text-[var(--ink)]">
                Vedic Ganita Calculator
              </h3>
            </div>
            <p className="text-sm text-[var(--ink-muted)] max-w-md">
              An interactive mathematical exploration tool rooted in Indian Knowledge Systems (IKS).
              Demonstrating the elegance, mental agility, and algorithmic beauty of classical Indian mathematics
              aligned with NEP 2020 initiatives.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="vedic-badge gold text-[11px]">
                <Award className="w-3.5 h-3.5" /> NEP 2020 Aligned
              </span>
              <span className="vedic-badge teal text-[11px]">
                <Sparkles className="w-3.5 h-3.5" /> 100% Client-Side
              </span>
              <span className="vedic-badge text-[11px]">
                <BookMarked className="w-3.5 h-3.5" /> 5 Classical Sutras
              </span>
            </div>
          </div>

          {/* Col 2: Core Sutras */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-[var(--ink)] mb-3">
              Featured Sutras
            </h4>
            <ul className="space-y-2 text-xs text-[var(--ink-muted)]">
              <li>
                <span className="font-semibold text-[var(--ink)]">Urdhva-Tiryagbhyam</span>
                <p className="text-[11px]">Vertically & Crosswise Multiplication</p>
              </li>
              <li>
                <span className="font-semibold text-[var(--ink)]">Nikhilam Navatashcaramam</span>
                <p className="text-[11px]">All from 9 & Last from 10</p>
              </li>
              <li>
                <span className="font-semibold text-[var(--ink)]">Ekadhikena Purvena</span>
                <p className="text-[11px]">By One More than the Previous</p>
              </li>
              <li>
                <span className="font-semibold text-[var(--ink)]">Yavadunam Tavadunikritya</span>
                <p className="text-[11px]">Square by Base Deficiency</p>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & IKS References */}
          <div>
            <h4 className="font-serif font-semibold text-sm text-[var(--ink)] mb-3">
              Historical Treatises
            </h4>
            <ul className="space-y-1.5 text-xs text-[var(--ink-muted)]">
              <li>• Baudhayana Sulba Sutras (800 BCE)</li>
              <li>• Chandas Shastra by Pingala (300 BCE)</li>
              <li>• Aryabhatiya by Aryabhata (499 CE)</li>
              <li>• Brahmasphutasiddhanta (628 CE)</li>
              <li>• Lilavati by Bhaskara II (1150 CE)</li>
              <li>• Vedic Mathematics (1965)</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--parchment-border)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--ink-light)] gap-4">
          <p>© 2026 Vedic Ganita Calculator • Indian Knowledge Systems Courseware</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[var(--vermilion)] transition-colors">Home & Lore</Link>
            <Link href="/calculator" className="hover:text-[var(--vermilion)] transition-colors">Calculator</Link>
            <span className="text-[var(--gold)] font-serif text-[11px] tracking-wide">Ganitam Murdhani Sthitam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
