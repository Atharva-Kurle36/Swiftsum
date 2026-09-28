'use client';

import React from 'react';
import Link from 'next/link';
import { BookMarked, Sparkles, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent-copper)] to-transparent opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Overview */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#B45309] text-[#090D16] flex items-center justify-center font-mono font-black text-xs shadow-md">
                VG
              </div>
              <h3 className="font-serif font-black text-lg text-[var(--text-pure)] tracking-tight">
                SwiftSum • Vedic Ganita Engine
              </h3>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-md leading-relaxed">
              An interactive mathematical exploration system grounded in Indian Knowledge Systems (IKS).
              Demonstrating the elegance, mental agility, and parallel algorithmic architecture of classical Indian mathematics
              aligned with NEP 2020 initiatives.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="vedic-badge gold text-[11px]">
                <Award className="w-3.5 h-3.5" /> NEP 2020 Aligned
              </span>
              <span className="vedic-badge teal text-[11px]">
                <Sparkles className="w-3.5 h-3.5" /> 100% Client-Side Engine
              </span>
              <span className="vedic-badge emerald text-[11px]">
                <BookMarked className="w-3.5 h-3.5" /> 5 Classical Sutras
              </span>
            </div>
          </div>

          {/* Col 2: Core Sutras */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[var(--text-pure)] mb-4 uppercase tracking-wider">
              Featured Algorithms
            </h4>
            <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
              <li>
                <Link href="/calculator?op=multiplication" className="hover:text-[var(--accent-copper)] transition-colors">
                  <span className="font-bold text-[var(--text-pure)] block">Ūrdhva-Tiryagbhyām</span>
                  <span className="text-[11px] text-[var(--text-dim)]">Vertically & Crosswise Multiplication</span>
                </Link>
              </li>
              <li>
                <Link href="/calculator?op=multiplication&a=98&b=97" className="hover:text-[var(--accent-copper)] transition-colors">
                  <span className="font-bold text-[var(--text-pure)] block">Nikhilam Navataścaramam</span>
                  <span className="text-[11px] text-[var(--text-dim)]">Base Deficiency Multiplier</span>
                </Link>
              </li>
              <li>
                <Link href="/calculator?op=squaring" className="hover:text-[var(--accent-copper)] transition-colors">
                  <span className="font-bold text-[var(--text-pure)] block">Ekādhikena Pūrveṇa</span>
                  <span className="text-[11px] text-[var(--text-dim)]">By One More than the Previous</span>
                </Link>
              </li>
              <li>
                <Link href="/calculator?op=division" className="hover:text-[var(--accent-copper)] transition-colors">
                  <span className="font-bold text-[var(--text-pure)] block">Nikhilam Vibhāgaḥ</span>
                  <span className="text-[11px] text-[var(--text-dim)]">Base Deficiency Division</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Treatises */}
          <div>
            <h4 className="font-serif font-bold text-sm text-[var(--text-pure)] mb-4 uppercase tracking-wider">
              Primary Treatises
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-muted)] font-mono">
              <li>• Baudhayana Śulba Sūtra (~800 BCE)</li>
              <li>• Chandaḥ Śāstra by Piṅgala (~300 BCE)</li>
              <li>• Āryabhaṭīya by Āryabhaṭa (499 CE)</li>
              <li>• Brāhmasphuṭasiddhānta (628 CE)</li>
              <li>• Līlāvatī by Bhāskara II (1150 CE)</li>
              <li>• Vedic Mathematics (Tirthaji, 1965)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-dim)] gap-4">
          <p>© 2026 SwiftSum • Indian Knowledge Systems Courseware Architecture</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[var(--accent-copper)] transition-colors">Lore & Sutras</Link>
            <Link href="/calculator" className="hover:text-[var(--accent-copper)] transition-colors">Calculator Workspace</Link>
            <span className="sanskrit-title text-[var(--accent-copper)] text-sm tracking-wide font-bold">गणितं मूर्धनि स्थितम्</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
