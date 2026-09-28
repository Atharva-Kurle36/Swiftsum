'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Compass, Calculator, BookOpen, Layers } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(9,13,22,0.82)] border-b border-[var(--border-subtle)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Monogram & Title */}
        <Link href="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#B45309] text-[#090D16] flex items-center justify-center font-black shadow-lg shadow-[rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform border border-amber-300/40">
            <span className="font-mono text-base tracking-tighter font-extrabold">VG</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-extrabold text-lg text-[var(--text-pure)] tracking-tight">
                SwiftSum
              </span>
              <span className="vedic-badge gold text-[10px] px-2 py-0.5">
                Vedic Ganita
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-medium tracking-wide">
              Indian Knowledge Systems • NEP 2020
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              pathname === '/'
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-copper)] border border-[var(--border-subtle)] font-semibold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-pure)] hover:bg-[var(--bg-surface-elevated)]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Heritage & Sutras
          </Link>
          <Link
            href="/#iks-facts"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-pure)] hover:bg-[var(--bg-surface-elevated)] transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[var(--accent-copper)]" />
            IKS Fact Deck
          </Link>
          <Link
            href="/calculator"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              pathname.startsWith('/calculator')
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-copper)] border border-[var(--border-subtle)] font-semibold shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-pure)] hover:bg-[var(--bg-surface-elevated)]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Interactive Workspace
          </Link>
        </nav>

        {/* Top Right Action CTA */}
        <div className="flex items-center gap-3">
          {pathname !== '/calculator' ? (
            <Link
              href="/calculator"
              className="btn-vedic-primary text-xs sm:text-sm !py-2.5 !px-4"
            >
              <Calculator className="w-4 h-4 text-[#090D16]" />
              <span>Launch Calculator</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="btn-vedic-secondary text-xs sm:text-sm !py-2 !px-3.5"
            >
              <Compass className="w-4 h-4 text-[var(--accent-lapis)]" />
              <span>Explore Lore</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
