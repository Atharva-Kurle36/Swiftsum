'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Calculator, BookOpen, Layers, Menu, X, FlaskConical, ScrollText } from 'lucide-react';

const LANDING_LINKS = [
  { href: '/#cover', label: 'Cover', icon: ScrollText },
  { href: '/#how-it-works', label: 'Method', icon: FlaskConical },
  { href: '/#sutras', label: 'Sūtras', icon: Layers },
  { href: '/#iks-facts', label: 'Archive', icon: BookOpen },
  { href: '/#nep-context', label: 'NEP 2020', icon: Compass },
  { href: '/#references', label: 'References', icon: ScrollText },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
                SwiftSum · IKS
              </span>
              <span className="vedic-badge gold text-[10px] px-2 py-0.5 hidden sm:inline-flex">Vedic Ganita</span>
            </div>
            <p className="text-[11px] font-medium tracking-wide hidden sm:block" style={{ color: '#8C7763' }}>
              Nalanda Heritage · NEP 2020
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LANDING_LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className="px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all flex items-center gap-1.5"
              style={{ color: '#6B5847' }}>
              <l.icon className="w-3.5 h-3.5" style={{ color: '#9A7730' }} />
              {l.label}
            </Link>
          ))}
          <span className="w-px h-5 mx-1" style={{ background: '#C49A45' }} />
          <Link href="/calculator"
            className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
            style={pathname.startsWith('/calculator')
              ? { background: '#641E16', color: '#FFF9EF', border: '1px solid #C49A45', fontWeight: 700 }
              : { color: '#6B5847' }}>
            <Calculator className="w-4 h-4" />
            Workspace
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {pathname !== '/calculator' ? (
            <Link href="/calculator" className="btn-vedic-primary text-xs sm:text-sm !py-2.5 !px-4">
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">Open Calculator</span>
              <span className="sm:hidden">Open</span>
            </Link>
          ) : (
            <Link href="/" className="btn-vedic-secondary text-xs sm:text-sm !py-2 !px-3.5">
              <Compass className="w-4 h-4" />
              <span>Cover Page</span>
            </Link>
          )}
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
            className="lg:hidden p-2.5 rounded-xl cursor-pointer"
            style={{ background: '#FFF9EF', border: '1px solid #C49A45', color: '#641E16' }}>
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden px-4 py-3 grid grid-cols-2 gap-2" style={{ borderTop: '1px solid #C49A45', background: '#FFF9EF' }}>
          {LANDING_LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
              style={{ background: '#FFF9EF', border: '1px solid #C49A45', color: '#45352B' }}>
              <l.icon className="w-3.5 h-3.5" style={{ color: '#9A7730' }} />
              {l.label}
            </Link>
          ))}
          <Link href="/calculator" onClick={() => setOpen(false)}
            className="px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 col-span-2 justify-center"
            style={{ background: '#641E16', color: '#FFF9EF' }}>
            <Calculator className="w-3.5 h-3.5" />
            Open Interactive Workspace
          </Link>
        </nav>
      )}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #C49A45, transparent)' }} />
    </header>
  );
}
