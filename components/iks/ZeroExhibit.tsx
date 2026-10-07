'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, transform } from 'framer-motion';
import { FadeUp, SectionHeading } from './shared';

const ZERO_RULES = [
  {
    rule: 'शून्य + a = a',
    name: 'Addition',
    desc: 'Zero leaves every number itself.',
    sanskritName: 'योग',
  },
  {
    rule: 'शून्य × a = 0',
    name: 'Multiplication',
    desc: 'Everything dissolves into nothing.',
    sanskritName: 'गुणन',
  },
  {
    rule: 'a ÷ शून्य = kha-hara',
    name: 'Division by zero',
    desc: 'Brahmagupta even attempted the impossible.',
    sanskritName: 'ख-हर',
  },
];

export default function ZeroExhibit() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  if ('accelerate' in scrollYProgress) {
    delete (scrollYProgress as any).accelerate;
  }

  // Monument animations
  const monumentScaleMap = transform([0, 1], [0.72, 1.12]);
  const monumentScale = useTransform(scrollYProgress, (v) => monumentScaleMap(v));

  const monumentYMap = transform([0, 1], ['12%', '-12%']);
  const monumentY = useTransform(scrollYProgress, (v) => monumentYMap(v));

  const glowOpacityMap = transform([0, 0.5, 1], [0.15, 0.45, 0.2]);
  const glowOpacity = useTransform(scrollYProgress, (v) => glowOpacityMap(v));

  return (
    <section
      id="zero"
      ref={sectionRef}
      className="relative bg-black border-y border-[#E5A93C]/10 py-24 sm:py-36 overflow-hidden"
    >
      {/* Background Radial Gold Glow Behind Monument */}
      <motion.div
        style={{ opacity: glowOpacity }}
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(229,169,60,0.3)_0%,rgba(200,75,49,0.1)_45%,transparent_70%)] pointer-events-none blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Section Header + Copy */}
        <div className="max-w-3xl mb-20">
          <SectionHeading
            kicker="शून्य · 02 — The Exhibit"
            title="A circle that changed everything."
            highlightWord="changed"
            sub="Dotted into the Bakhshali manuscript as placeholder, then freed by Brahmagupta in 628 CE as a number in its own right — śūnya let zero stand for nothing and do everything. Without it, no place-value, no algebra, no binary code."
          />
        </div>

        {/* Center: Giant Zero Monument */}
        <div className="flex justify-center items-center my-12 sm:my-20">
          <motion.div
            data-testid="zero-monument"
            style={{ scale: monumentScale, y: monumentY }}
            className="relative flex items-center justify-center select-none"
          >
            {/* Giant Devanagari Zero "०" (outlined) */}
            <span
              className="font-dev text-outline text-[42vw] sm:text-[30vw] leading-none block select-none pointer-events-none"
              style={{ filter: 'drop-shadow(0 0 45px rgba(229, 169, 60, 0.2))' }}
            >
              ०
            </span>

            {/* Solid Gold Latin Zero "0" absolutely centered */}
            <span className="absolute font-display text-[18vw] sm:text-[11vw] font-bold text-[#E5A93C] leading-none pointer-events-none drop-shadow-[0_0_35px_rgba(229,169,60,0.5)]">
              0
            </span>

            {/* Subtle concentric ornamental orbit */}
            <div className="absolute inset-[-10%] rounded-full border border-dashed border-[#E5A93C]/20 animate-spin-slower pointer-events-none" />
          </motion.div>
        </div>

        {/* 3 Spotlight-Hover Cards for Brahmagupta's Rules */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24">
          {ZERO_RULES.map((item, idx) => (
            <FadeUp key={idx} delay={0.15 * idx}>
              <div
                data-testid={`zero-rule-card-${idx + 1}`}
                className="spotlight-hover bg-[#1A1712] border border-[#E5A93C]/15 rounded-2xl p-7 sm:p-8 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E5A93C]/70">
                      0{idx + 1} · {item.name}
                    </span>
                    <span className="font-dev text-xs text-[#E5A93C]">
                      {item.sanskritName}
                    </span>
                  </div>

                  {/* Mathematical rule in gold mono */}
                  <div className="font-mono text-xl sm:text-2xl text-[#E5A93C] font-semibold mb-3 tracking-wide group-hover:text-[#FF9F1C] transition-colors">
                    {item.rule}
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-[#A8A090] font-light leading-relaxed mt-4 pt-4 border-t border-[#E5A93C]/10">
                  {item.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
