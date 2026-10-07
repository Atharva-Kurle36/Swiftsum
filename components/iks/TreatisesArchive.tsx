'use client';

import React from 'react';
import { FadeUp, SectionHeading } from './shared';

interface Treatise {
  title: string;
  devanagari: string;
  author: string;
  date: string;
  note: string;
  image: string;
}

const TREATISES: Treatise[] = [
  {
    title: 'Śulba Sūtras',
    devanagari: 'शुल्ब सूत्र',
    author: 'Baudhāyana & others',
    date: 'c. 800 BCE',
    note: 'Rope-measured altar geometry, the diagonal rule, and irrational numbers in construction manuals.',
    image: 'https://images.unsplash.com/photo-1522442676585-c751dab71864?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Chandaḥśāstra',
    devanagari: 'छन्दःशास्त्र',
    author: 'Piṅgala',
    date: 'c. 200 BCE',
    note: 'The prosody manual where binary patterns and combinatorial recurrences first appear in writing.',
    image: 'https://images.unsplash.com/photo-1561812938-f6e60cbf95e3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Āryabhaṭīya',
    devanagari: 'आर्यभटीय',
    author: 'Āryabhaṭa',
    date: '499 CE',
    note: 'Astronomy, sine tables and place-value arithmetic compressed into 121 memorizable verses.',
    image: 'https://images.unsplash.com/photo-1720700955600-a21cd215d1a3?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Brāhmasphuṭasiddhānta',
    devanagari: 'ब्राह्मस्फुटसिद्धान्त',
    author: 'Brahmagupta',
    date: '628 CE',
    note: 'The text where zero first became a number — with rules — alongside algebra and astronomy.',
    image: 'https://images.unsplash.com/photo-1506513083865-434a8a207e11?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Līlāvatī',
    devanagari: 'लीलावती',
    author: 'Bhāskara II',
    date: 'c. 1150 CE',
    note: 'Playful problems addressed to a daughter — bees, pearls and puzzles teaching arithmetic and algebra.',
    image: 'https://images.unsplash.com/photo-1467688695332-6b486449d78f?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function TreatisesArchive() {
  return (
    <section id="treatises" className="relative bg-black py-24 sm:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-20 sm:mb-28">
          <SectionHeading
            kicker="ग्रन्थ · 05 — The Treatises"
            title="The archive of five texts."
            sub="Five manuscripts carry most of this story — read them in the order the tradition wrote them."
          />
        </div>

        {/* 5 Alternating Rows */}
        <div className="space-y-24 sm:space-y-36">
          {TREATISES.map((item, idx) => {
            const isOdd = idx % 2 === 1;

            return (
              <FadeUp key={idx} delay={0.1}>
                <div
                  data-testid={`treatise-card-${idx + 1}`}
                  className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center group ${
                    isOdd ? '[direction:rtl] lg:[direction:rtl]' : ''
                  }`}
                >
                  {/* Arch-framed Image (5 cols) */}
                  <div className="lg:col-span-5 flex justify-center [direction:ltr]">
                    <div className="relative w-full max-w-sm aspect-[3/4] rounded-t-[999px] rounded-b-2xl overflow-hidden border border-[#E5A93C]/25 bg-[#13110D] shadow-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={`${item.title} ancient manuscript`}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                      />
                      {/* Bottom vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    </div>
                  </div>

                  {/* Text Block (7 cols) */}
                  <div className="lg:col-span-7 [direction:ltr]">
                    {/* Meta: Date · Author */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs sm:text-sm text-[#E5A93C] uppercase tracking-[0.25em] font-semibold">
                        {item.date} · {item.author}
                      </span>
                    </div>

                    {/* Title in display serif */}
                    <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F0E6] group-hover:text-[#E5A93C] transition-colors duration-300 font-medium leading-[1.1] tracking-tight mb-3">
                      {item.title}
                    </h3>

                    {/* Devanagari Gold */}
                    <p className="font-dev text-2xl sm:text-3xl text-[#E5A93C] font-normal mb-6">
                      {item.devanagari}
                    </p>

                    {/* Hairline gold gradient divider */}
                    <div className="w-full h-[1px] bg-gradient-to-r from-[#E5A93C]/40 via-[#E5A93C]/10 to-transparent my-6" />

                    {/* Description note */}
                    <p className="font-sans text-base sm:text-lg text-[#A8A090] font-light leading-relaxed max-w-xl">
                      {item.note}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
