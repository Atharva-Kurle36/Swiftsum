'use client';

import React from 'react';
import { Diamond } from './shared';

const MARQUEE_ITEMS = [
  { devanagari: 'शून्य', english: 'ZERO' },
  { devanagari: 'दशमलव प्रणाली', english: 'DECIMAL PLACE-VALUE' },
  { devanagari: 'ज्या', english: 'THE SINE' },
  { devanagari: 'छन्दःशास्त्र', english: 'BINARY PROSODY' },
  { devanagari: 'निखिलम', english: 'NIKHILAM SUTRA' },
  { devanagari: 'माधव', english: "MĀDHAVA'S SERIES" },
  { devanagari: 'ब्रह्मगुप्त', english: 'BRAHMAGUPTA' },
  { devanagari: 'बौधायन', english: 'BAUDHĀYANA' },
];

export default function MarqueeRibbon() {
  return (
    <div className="relative border-y border-[#E5A93C]/10 bg-[#13110D] py-6 overflow-hidden select-none">
      {/* Left and right gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#13110D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#13110D] to-transparent z-10 pointer-events-none" />

      {/* Infinite marquee track (paused on hover) */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
        {/* Render twice for continuous loop */}
        {[0, 1].map((copyIndex) => (
          <div key={`track-${copyIndex}`} className="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
            {MARQUEE_ITEMS.map((item, idx) => (
              <React.Fragment key={`item-${copyIndex}-${idx}`}>
                <div className="flex items-center gap-3.5 group cursor-default">
                  <span className="font-dev text-xl sm:text-2xl text-[#E5A93C] font-normal tracking-wide transition-colors group-hover:text-[#FF9F1C]">
                    {item.devanagari}
                  </span>
                  <span className="text-[#E5A93C]/40 text-xs font-mono font-light">/</span>
                  <span className="font-mono text-[11px] sm:text-xs text-[#F5F0E6] uppercase tracking-[0.3em] font-medium transition-colors group-hover:text-[#E5A93C]">
                    {item.english}
                  </span>
                </div>
                <Diamond className="w-2.5 h-2.5 text-[#E5A93C]/60 flex-shrink-0" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
