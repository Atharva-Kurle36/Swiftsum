'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Compass, Calculator, BookOpen } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[rgba(248,243,230,0.88)] border-b border-[var(--parchment-border)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group text-decoration-none">
          <div className="w-10 h-10 rounded-xl bg-[var(--vermilion)] text-white flex items-center justify-center font-bold shadow-md shadow-[rgba(168,64,47,0.25)] group-hover:scale-105 transition-transform">
            <span className="font-serif font-bold text-base">VG</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-[var(--ink)] tracking-tight">
                Vedic Ganita
              </span>
              <span className="vedic-badge gold text-[10px] px-2 py-0.5">
                IKS
              </span>
            </div>
            <p className="text-[11px] text-[var(--ink-muted)] font-medium tracking-wide">
              Indian Knowledge Systems • NEP 2020
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              pathname === '/'
                ? 'bg-[var(--parchment)] text-[var(--vermilion)] font-semibold'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[rgba(236,224,194,0.5)]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Heritage & Sutras
          </Link>
          <Link
            href="/#iks-facts"
            className="px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[rgba(236,224,194,0.5)] transition-colors flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[var(--gold)]" />
            IKS Fact Deck
          </Link>
          <Link
            href="/calculator"
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              pathname.startsWith('/calculator')
                ? 'bg-[var(--parchment)] text-[var(--vermilion)] font-semibold'
                : 'text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[rgba(236,224,194,0.5)]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            Calculator App
          </Link>
        </nav>

        {/* Launch CTA */}
        <div className="flex items-center gap-3">
          {pathname !== '/calculator' ? (
            <Link
              href="/calculator"
              className="btn-vedic-primary text-xs sm:text-sm !py-2.5 !px-4"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch Calculator</span>
            </Link>
          ) : (
            <Link
              href="/"
              className="btn-vedic-secondary text-xs sm:text-sm !py-2 !px-3.5"
            >
              <Compass className="w-4 h-4 text-[var(--teal)]" />
              <span>Explore Lore</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
