'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Calculator } from 'lucide-react';
import LogoMark from './LogoMark';

interface NavItem {
  id: string;
  label: string;
  devanagari: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'journey', label: 'Journey', devanagari: 'यात्रा' },
  { id: 'zero', label: 'Zero', devanagari: 'शून्य' },
  { id: 'pioneers', label: 'Pioneers', devanagari: 'गणितज्ञ' },
  { id: 'vedic-math', label: 'Vedic Math', devanagari: 'निखिलम' },
  { id: 'treatises', label: 'Treatises', devanagari: 'ग्रन्थ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      // @ts-expect-error Lenis attached to window
      if (window.__lenis) {
        // @ts-expect-error Lenis scrollTo
        window.__lenis.scrollTo(element, { offset: -70, duration: 1.4 });
      } else {
        const top = element.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    if (!isHomePage) {
      window.location.href = '/';
      return;
    }
    // @ts-expect-error Lenis attached to window
    if (window.__lenis) {
      // @ts-expect-error Lenis scrollTo
      window.__lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass-nav py-3.5 shadow-2xl' : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo Mark + Wordmark */}
          <button
            onClick={scrollToTop}
            data-testid="nav-logo-home-btn"
            className="text-left focus:outline-none"
            aria-label="IKS Homepage"
          >
            <LogoMark />
          </button>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                data-testid={`nav-link-${item.id}`}
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#A8A090] hover:text-[#E5A93C] transition-colors duration-200 cursor-pointer focus:outline-none"
              >
                {item.label}
              </button>
            ))}

            {/* Calculator Route Link */}
            <Link
              href="/calculator"
              data-testid="nav-link-calculator"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF9F1C] hover:text-[#E5A93C] transition-colors duration-200"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculator</span>
            </Link>

            {/* Explore Pill Button */}
            <button
              onClick={() => scrollToSection('journey')}
              data-testid="nav-explore-btn"
              className="ml-2 px-5 py-2 rounded-full border border-[#E5A93C] text-[#E5A93C] font-mono text-[11px] uppercase tracking-[0.2em] font-semibold hover:bg-[#E5A93C] hover:text-[#0B0A08] transition-all duration-300 transform hover:scale-[1.02] shadow-[0_0_15px_rgba(229,169,60,0.15)]"
            >
              Explore
            </button>
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/calculator"
              className="px-3 py-1.5 rounded-full border border-[#E5A93C]/40 text-[#E5A93C] font-mono text-[10px] uppercase tracking-wider flex items-center gap-1"
            >
              <Calculator className="w-3 h-3" />
              <span>Calc</span>
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              data-testid="nav-menu-btn"
              aria-label="Open mobile navigation"
              className="p-2.5 rounded-xl border border-[#E5A93C]/20 bg-[#13110D]/80 text-[#F5F0E6] hover:text-[#E5A93C] hover:border-[#E5A93C]/50 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            data-testid="nav-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#13110D]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden"
          >
            {/* Top Bar with Close Button */}
            <div className="flex items-center justify-between">
              <LogoMark />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                className="p-3 rounded-full border border-[#E5A93C]/30 text-[#E5A93C] hover:bg-[#E5A93C]/10 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links Stack */}
            <div className="flex flex-col gap-5 my-auto py-8">
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.4 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    data-testid={`nav-mobile-link-${idx + 1}`}
                    className="group flex items-baseline justify-between w-full text-left py-2 border-b border-[#E5A93C]/10"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-[#E5A93C]/60 tracking-widest">
                        0{idx + 1}
                      </span>
                      <span className="font-display text-4xl sm:text-5xl text-[#F5F0E6] group-hover:text-[#E5A93C] transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-dev text-sm text-[#E5A93C]/70">
                      {item.devanagari}
                    </span>
                  </button>
                </motion.div>
              ))}

              {/* Mobile Calculator Route Link */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                <Link
                  href="/calculator"
                  onClick={() => setMobileOpen(false)}
                  className="group flex items-center justify-between w-full text-left py-3 mt-2 border-b border-[#E5A93C]/10"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#FF9F1C] tracking-widest">
                      06
                    </span>
                    <span className="font-display text-4xl sm:text-5xl text-[#FF9F1C] group-hover:text-[#E5A93C] transition-colors">
                      Calculator
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#FF9F1C]" />
                </Link>
              </motion.div>
            </div>

            {/* Bottom Info */}
            <div className="pt-4 border-t border-[#E5A93C]/15 flex items-center justify-between text-xs text-[#A8A090]">
              <span className="font-mono uppercase tracking-widest text-[#E5A93C]">
                IKS · Vedic Heritage
              </span>
              <span className="font-dev text-[#E5A93C]">ॐ शून्यम्</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
