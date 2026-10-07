'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Menu, X, Home, Info } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === '/';
  const isAbout = pathname.startsWith('/about');

  const linkStyle = (active: boolean): React.CSSProperties =>
    active
      ? { background: '#641E16', color: '#FFF9EF', border: '1px solid #C49A45', fontWeight: 700 }
      : { color: '#6B5847' };

  return (
    <header className="sticky top-0 z-50 no-print" style={{ background: 'rgba(255,249,239,0.94)', borderBottom: '2px solid #C49A45' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3 group text-decoration-none flex-shrink-0">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black transition-transform group-hover:scale-105"
            style={{ background: '#641E16', color: '#FFF9EF', border: '1px solid #C49A45', boxShadow: 'inset 0 0 0 1px rgba(196,154,69,0.6)' }}>
            <span className="text-base" style={{ fontFamily: 'Cinzel, serif' }}>॥</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-extrabold text-lg tracking-tight" style={{ color: '#641E16', fontFamily: 'Cinzel, serif' }}>
                Swiftsum
              </span>
              <span className="vedic-badge gold text-[10px] px-2 py-0.5 hidden sm:inline-flex">Vedic Ganita</span>
            </div>
            <p className="text-[11px] font-medium tracking-wide hidden sm:block" style={{ color: '#8C7763' }}>
              Nalanda Heritage · NEP 2020
            </p>
          </div>
        </Link>

        {/* Desktop: Home + About + Calculator */}
        <nav className="hidden lg:flex items-center gap-1.5">
          <Link href="/" className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2" style={linkStyle(isHome)}>
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link href="/about" className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2" style={linkStyle(isAbout)}>
            <Info className="w-4 h-4" />
            About
          </Link>
          <Link href="/calculator" className="btn-vedic-primary text-sm !py-2.5 !px-5 ml-1">
            <Calculator className="w-4 h-4" />
            Calculator
          </Link>
        </nav>

        {/* Mobile actions — hidden on desktop (desktop nav already has Calculator) */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/calculator" className="btn-vedic-primary text-xs sm:text-sm !py-2.5 !px-4">
            <Calculator className="w-4 h-4" />
            <span>Calculator</span>
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
            className="p-2.5 rounded-xl cursor-pointer"
            style={{ background: '#FFF9EF', border: '1px solid #C49A45', color: '#641E16' }}>
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden px-4 py-3 grid grid-cols-2 gap-2" style={{ borderTop: '1px solid #C49A45', background: '#FFF9EF' }}>
          <Link href="/" onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
            style={{ background: isHome ? '#641E16' : '#FFF9EF', color: isHome ? '#FFF9EF' : '#45352B', border: '1px solid #C49A45' }}>
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
            style={{ background: isAbout ? '#641E16' : '#FFF9EF', color: isAbout ? '#FFF9EF' : '#45352B', border: '1px solid #C49A45' }}>
            <Info className="w-3.5 h-3.5" />
            About
          </Link>
          <Link href="/calculator" onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 col-span-2 justify-center"
            style={{ background: '#641E16', color: '#FFF9EF' }}>
            <Calculator className="w-3.5 h-3.5" />
            Open Calculator
          </Link>
        </nav>
      )}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C49A45, transparent)' }} />
    </header>
  );
}
