'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FadeUp, SectionHeading } from './shared';
import { ArrowRight, Calculator } from 'lucide-react';

export default function VedicMathPlayground() {
  const [base, setBase] = useState<number>(100);
  const [numA, setNumA] = useState<string>('98');
  const [numB, setNumB] = useState<string>('97');

  const baseDigits = Math.log10(base);

  const calcState = useMemo(() => {
    const a = parseInt(numA, 10);
    const b = parseInt(numB, 10);

    if (isNaN(a) || isNaN(b)) {
      return {
        a: 0,
        b: 0,
        da: 0,
        db: 0,
        right: 0,
        left: 0,
        rightPadded: '0',
        finalResult: 0,
        isValid: false,
        reason: 'Please enter valid integers.',
      };
    }

    const da = a - base;
    const db = b - base;
    const right = da * db;
    const left = a + db;

    // VALID iff |da|<=20, |db|<=20, right>=0, right<base, left>=0
    const isValid =
      Math.abs(da) <= 20 &&
      Math.abs(db) <= 20 &&
      right >= 0 &&
      right < base &&
      left >= 0;

    const rightPadded = right.toString().padStart(baseDigits, '0');
    const finalResult = a * b;

    return {
      a,
      b,
      da,
      db,
      right,
      left,
      rightPadded,
      finalResult,
      isValid,
    };
  }, [numA, numB, base, baseDigits]);

  const handleBaseChange = (newBase: number) => {
    setBase(newBase);
    // suggest friendly defaults for the new base
    setNumA((newBase - 2).toString());
    setNumB((newBase - 3).toString());
  };

  const setSuggestedNumbers = () => {
    setNumA((base - 2).toString());
    setNumB((base - 3).toString());
  };

  return (
    <section
      id="vedic-math"
      className="relative bg-[#13110D] border-y border-[#E5A93C]/10 py-24 sm:py-36 overflow-hidden"
    >
      {/* Background Watermark "गणना" 24vw bottom-left */}
      <div
        aria-hidden="true"
        className="absolute left-[-2vw] bottom-[-4vw] pointer-events-none select-none z-0"
      >
        <span className="font-dev text-outline-faint text-[24vw] leading-none block">
          गणना
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Heading, Explanation, Base Selector */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <SectionHeading
              kicker="निखिलम · 04 — The Playground"
              title="Multiply 98 × 97 — without knowing 9's tables."
              sub="Nikhilam Navatashcaramam Dashatah — “all from 9 and the last from 10”. Numbers near a base multiply through their deficits alone. Change the numbers and watch the sutra work."
            />

            {/* Base Selector Chips: 10 / 100 / 1000 */}
            <FadeUp delay={0.4} className="mt-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A8A090] block mb-3">
                Working Base
              </span>
              <div className="flex items-center gap-3">
                {[10, 100, 1000].map((b) => (
                  <button
                    key={b}
                    onClick={() => handleBaseChange(b)}
                    data-testid={`vedic-calc-base-${b}`}
                    className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                      base === b
                        ? 'bg-[#E5A93C] text-[#0B0A08] shadow-[0_0_15px_rgba(229,169,60,0.3)]'
                        : 'bg-transparent text-[#F5F0E6] border border-[#E5A93C]/30 hover:border-[#E5A93C] hover:text-[#E5A93C]'
                    }`}
                  >
                    Base {b}
                  </button>
                ))}
              </div>
            </FadeUp>

            {/* Link to Full Multi-Method Calculator */}
            <FadeUp delay={0.5} className="mt-8">
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2.5 font-mono text-xs text-[#FF9F1C] hover:text-[#E5A93C] uppercase tracking-wider group"
              >
                <Calculator className="w-4 h-4" />
                <span>Launch Full 5-Sūtra Computing Engine</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </FadeUp>
          </div>

          {/* RIGHT: Live Interactive Nikhilam Calculator Card */}
          <div className="lg:col-span-7">
            <FadeUp delay={0.2}>
              <div className="bg-[#1A1712] border border-[#E5A93C]/20 rounded-2xl p-7 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
                {/* Inputs Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                  {/* First Input */}
                  <div className="w-full sm:w-1/2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#A8A090] mb-2">
                      First number
                    </label>
                    <input
                      type="number"
                      value={numA}
                      onChange={(e) => setNumA(e.target.value)}
                      data-testid="vedic-calc-input-a"
                      className="w-full bg-[#0B0A08] border border-[#E5A93C]/25 rounded-xl px-5 py-3 font-mono text-2xl text-[#F5F0E6] focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C] transition-all"
                    />
                  </div>

                  {/* Multiplier Symbol */}
                  <div className="font-display text-3xl sm:text-4xl text-[#E5A93C] pt-4 select-none">
                    ×
                  </div>

                  {/* Second Input */}
                  <div className="w-full sm:w-1/2">
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#A8A090] mb-2">
                      Second number
                    </label>
                    <input
                      type="number"
                      value={numB}
                      onChange={(e) => setNumB(e.target.value)}
                      data-testid="vedic-calc-input-b"
                      className="w-full bg-[#0B0A08] border border-[#E5A93C]/25 rounded-xl px-5 py-3 font-mono text-2xl text-[#F5F0E6] focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C] transition-all"
                    />
                  </div>
                </div>

                {/* Live Steps Breakdown */}
                {calcState.isValid ? (
                  <div data-testid="vedic-calc-steps" className="space-y-3.5 mb-8">
                    <div className="flex items-start gap-3 text-xs sm:text-sm font-mono text-[#F5F0E6]/90 bg-[#0B0A08]/60 p-3 rounded-lg border border-[#E5A93C]/10">
                      <span className="text-[#E5A93C] font-bold">01</span>
                      <span>Both numbers sit close to the base {base}.</span>
                    </div>

                    <div className="flex items-start gap-3 text-xs sm:text-sm font-mono text-[#F5F0E6]/90 bg-[#0B0A08]/60 p-3 rounded-lg border border-[#E5A93C]/10">
                      <span className="text-[#E5A93C] font-bold">02</span>
                      <span>
                        Deficits: {calcState.a} − {base} ={' '}
                        <strong className="text-[#FF9F1C]">{calcState.da}</strong> ·{' '}
                        {calcState.b} − {base} ={' '}
                        <strong className="text-[#FF9F1C]">{calcState.db}</strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-xs sm:text-sm font-mono text-[#F5F0E6]/90 bg-[#0B0A08]/60 p-3 rounded-lg border border-[#E5A93C]/10">
                      <span className="text-[#E5A93C] font-bold">03</span>
                      <span>
                        Cross-add: {calcState.a} + ({calcState.db}) ={' '}
                        <strong className="text-[#E5A93C]">{calcState.left}</strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-3 text-xs sm:text-sm font-mono text-[#F5F0E6]/90 bg-[#0B0A08]/60 p-3 rounded-lg border border-[#E5A93C]/10">
                      <span className="text-[#E5A93C] font-bold">04</span>
                      <span>
                        Multiply the deficits: ({calcState.da}) × ({calcState.db}) ={' '}
                        <strong className="text-[#E5A93C]">{calcState.right}</strong>
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Invalid Hint Box */
                  <div
                    data-testid="vedic-calc-hint"
                    className="p-5 rounded-xl bg-[#C84B31]/10 border border-[#C84B31]/40 text-sm text-[#F5F0E6] mb-8"
                  >
                    <p className="mb-2">
                      The sutra shines when both numbers sit close to the same base and their deficits
                      multiply inside it — try{' '}
                      <button
                        onClick={setSuggestedNumbers}
                        data-testid="vedic-calc-hint-suggestion-btn"
                        className="text-[#E5A93C] underline font-mono font-bold hover:text-[#FF9F1C]"
                      >
                        {base - 2} × {base - 3}
                      </button>
                      .
                    </p>
                    <p className="text-xs text-[#A8A090]">
                      Click the suggestion above to load ideal numbers for Base {base}.
                    </p>
                  </div>
                )}

                {/* Footer Result Row */}
                {calcState.isValid && (
                  <div className="pt-6 border-t border-[#E5A93C]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="font-mono text-sm uppercase tracking-wider text-[#A8A090]">
                      JOIN —{' '}
                      <span className="text-[#E5A93C] font-bold text-lg">
                        {calcState.left}
                      </span>{' '}
                      |{' '}
                      <span className="text-[#FF9F1C] font-bold text-lg">
                        {calcState.rightPadded}
                      </span>
                    </div>

                    <div
                      data-testid="vedic-calc-result"
                      className="font-display text-4xl sm:text-5xl text-[#E5A93C] font-bold tracking-tight"
                    >
                      = {calcState.finalResult.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
