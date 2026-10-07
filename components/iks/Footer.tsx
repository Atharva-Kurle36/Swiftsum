'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Calculator } from 'lucide-react';
import LogoMark from './LogoMark';

interface NavLink {
  id: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { id: 'journey', label: 'Journey' },
  { id: 'zero', label: 'Zero' },
  { id: 'pioneers', label: 'Pioneers' },
  { id: 'vedic-math', label: 'Vedic Math' },
  { id: 'treatises', label: 'Treatises' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      // @ts-expect-error Lenis attached to window
      if (window.__lenis) {
        // @ts-expect-error Lenis scrollTo
        window.__lenis.scrollTo(el, { offset: -70, duration: 1.4 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative bg-[#0B0A08] border-t border-[#E5A93C]/10 pt-20 pb-12 overflow-hidden">
      {/* Background Watermark "ॐ तत् सत्" 26vw Centered Bottom */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-[-4vw] pointer-events-none select-none z-0 opacity-40"
      >
        <span className="font-dev text-outline-faint text-[26vw] leading-none block whitespace-nowrap">
          ॐ तत् सत्
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid 12 cols */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          {/* Col 1-5 (5 cols): Logo mark + IKS Cinzel + Devanagari + text */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <LogoMark className="mb-6" />
            <p className="font-sans text-sm sm:text-base text-[#A8A090] font-light leading-relaxed max-w-md mb-6">
              A scrollytelling study of ancient Indian mathematics — the rope, the verse, the void, the
              infinite. Built with reverence for the tradition.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E5A93C]/60 tracking-widest uppercase">
              <span>BHĀRATĪYA GAṆITA</span>
              <span>·</span>
              <span>EST. ANTIQUITY</span>
            </div>
          </div>

          {/* Col 6-8 (3 cols): Explore Column */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#E5A93C] mb-6 font-semibold">
              Explore
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    data-testid={`footer-link-${link.id}`}
                    className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#A8A090] hover:text-[#E5A93C] transition-colors focus:outline-none"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E5A93C]" />
                  </button>
                </li>
              ))}
              {/* Calculator route */}
              <li>
                <Link
                  href="/calculator"
                  data-testid="footer-link-calculator"
                  className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[#FF9F1C] hover:text-[#E5A93C] transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Interactive Calculator</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#E5A93C]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 9-12 (4 cols): Join the quest newsletter form */}
          <div className="lg:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-[#E5A93C] mb-3 font-semibold">
              Join the Quest
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#A8A090] font-light leading-relaxed mb-6">
              Subscribe for scholarly updates on Indian Knowledge Systems, manuscript findings, and Vedic computation.
            </p>

            {submitted ? (
              <div
                data-testid="footer-newsletter-thanks"
                className="p-4 rounded-xl bg-[#1A1712] border border-[#E5A93C]/40 text-[#E5A93C] font-dev text-base sm:text-lg animate-fadeIn"
              >
                धन्यवाद · You&apos;re on the list.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-testid="footer-newsletter-form"
                className="relative flex items-center"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  data-testid="footer-newsletter-input"
                  className="w-full bg-[#13110D] border border-[#E5A93C]/25 rounded-full py-3 pl-5 pr-28 text-xs font-mono text-[#F5F0E6] placeholder:text-[#A8A090]/50 focus:outline-none focus:border-[#E5A93C] transition-colors"
                />
                <button
                  type="submit"
                  data-testid="footer-newsletter-submit-btn"
                  className="absolute right-1.5 px-5 py-2 rounded-full bg-[#E5A93C] text-[#0B0A08] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#D4AF37] transition-all shadow-md"
                >
                  JOIN
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar after gold/10 divider */}
        <div className="pt-8 border-t border-[#E5A93C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#A8A090]/80">
            IKS — Ancient Indian Mathematics
          </span>
          <span className="font-dev text-sm text-[#E5A93C] tracking-wide">
            शून्यात् सर्वम्
          </span>
        </div>
      </div>
    </footer>
  );
}
