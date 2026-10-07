'use client';

import React from 'react';
import { FadeUp, SectionHeading, Diamond } from './shared';

export default function PioneersBento() {
  return (
    <section id="pioneers" className="relative bg-black py-24 sm:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading Row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <SectionHeading
            kicker="गणितज्ञ · 03 — The Pioneers"
            title="Six minds the world forgot to cite."
            sub="A bento of the tradition's sharpest tools and the hands that wielded them — hover each card."
          />
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[#E5A93C] pb-3 self-start lg:self-end">
            <span>Six pioneers</span>
            <Diamond className="w-2 h-2 text-[#E5A93C]" />
            <span>Twelve centuries</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* Card 1: Baudhāyana (col-span-7, row-span-2) with right triangle and squares SVG */}
          <FadeUp delay={0.07} className="lg:col-span-7 lg:row-span-2">
            <div
              data-testid="pioneer-card-1"
              className="spotlight-hover bg-[#1A1712] border border-[#E5A93C]/15 rounded-2xl p-8 sm:p-10 min-h-[380px] lg:min-h-full flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#E5A93C] uppercase tracking-[0.2em]">
                    c. 800 BCE · The Geometer
                  </span>
                  <span className="font-dev text-xl text-[#E5A93C]">बौधायन</span>
                </div>
                <h3 className="font-display text-4xl sm:text-5xl text-[#F5F0E6] font-medium tracking-tight mb-4 group-hover:text-[#E5A93C] transition-colors">
                  Baudhāyana
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#A8A090] font-light leading-relaxed max-w-md mb-6">
                  Śulba Sūtras — rope-and-peg altar geometry, the diagonal rule, √2 to five decimals.
                </p>

                {/* Inline SVG Diagram: Right Triangle in vermilion stroke with gold squares on all three sides */}
                <div className="my-6 p-4 rounded-xl bg-[#13110D]/70 border border-[#E5A93C]/10 flex items-center justify-center">
                  <svg
                    viewBox="0 0 280 230"
                    className="w-full max-w-[280px] h-[190px]"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Square on side a (vertical, width 50, height 50) */}
                    <rect
                      x="40"
                      y="70"
                      width="50"
                      height="50"
                      stroke="#E5A93C"
                      strokeWidth="1.2"
                      fill="#E5A93C"
                      fillOpacity="0.08"
                    />
                    <text x="60" y="98" fill="#E5A93C" fontSize="10" fontFamily="JetBrains Mono" opacity="0.8">
                      a²
                    </text>

                    {/* Square on side b (horizontal, width 60, height 60) */}
                    <rect
                      x="90"
                      y="120"
                      width="60"
                      height="60"
                      stroke="#E5A93C"
                      strokeWidth="1.2"
                      fill="#E5A93C"
                      fillOpacity="0.08"
                    />
                    <text x="115" y="155" fill="#E5A93C" fontSize="10" fontFamily="JetBrains Mono" opacity="0.8">
                      b²
                    </text>

                    {/* Square on hypotenuse c (length ~78.1, rotated angle ~-39.8 deg) */}
                    <g transform="translate(90, 70) rotate(-39.8)">
                      <rect
                        x="0"
                        y="-78"
                        width="78"
                        height="78"
                        stroke="#E5A93C"
                        strokeWidth="1.2"
                        strokeDasharray="3 3"
                        fill="#E5A93C"
                        fillOpacity="0.12"
                      />
                      <text x="32" y="-35" fill="#E5A93C" fontSize="11" fontFamily="JetBrains Mono" fontWeight="bold">
                        c²
                      </text>
                    </g>

                    {/* Right triangle in vermilion stroke */}
                    <polygon
                      points="90,70 150,120 90,120"
                      stroke="#C84B31"
                      strokeWidth="2.5"
                      fill="#C84B31"
                      fillOpacity="0.15"
                    />

                    {/* Right angle marker at (90,120) */}
                    <path d="M90,110 L100,110 L100,120" stroke="#C84B31" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5A93C]/10 flex items-center justify-between">
                <span className="font-mono text-xs uppercase text-[#E5A93C] font-semibold tracking-wider">
                  a² + b² = c², before Pythagoras
                </span>
                <span className="font-mono text-[10px] text-[#A8A090]">Sulba Sutra 1.48</span>
              </div>
            </div>
          </FadeUp>

          {/* Card 2: Āryabhaṭa (col-span-5) */}
          <FadeUp delay={0.14} className="lg:col-span-5">
            <div
              data-testid="pioneer-card-2"
              className="spotlight-hover bg-[#1A1712] border border-[#E5A93C]/15 rounded-2xl p-8 min-h-[240px] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#E5A93C] uppercase tracking-[0.2em]">
                    476–550 CE · The Astronomer
                  </span>
                  <span className="font-dev text-xl text-[#E5A93C]">आर्यभट</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#F5F0E6] font-medium tracking-tight mb-3 group-hover:text-[#E5A93C] transition-colors">
                  Āryabhaṭa
                </h3>
                <p className="font-sans text-sm text-[#A8A090] font-light leading-relaxed mb-4">
                  Āryabhaṭīya — sine tables, place-value arithmetic, π ≈ 3.1416, Earth&apos;s rotation.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5A93C]/10">
                <span className="font-mono text-xs uppercase text-[#E5A93C] font-semibold tracking-wider">
                  π ≈ 62832 / 20000
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Card 3: Brahmagupta (col-span-5) */}
          <FadeUp delay={0.21} className="lg:col-span-5">
            <div
              data-testid="pioneer-card-3"
              className="spotlight-hover bg-[#1A1712] border border-[#E5A93C]/15 rounded-2xl p-8 min-h-[240px] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#E5A93C] uppercase tracking-[0.2em]">
                    598–668 CE · The Rule-Giver
                  </span>
                  <span className="font-dev text-xl text-[#E5A93C]">ब्रह्मगुप्त</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#F5F0E6] font-medium tracking-tight mb-3 group-hover:text-[#E5A93C] transition-colors">
                  Brahmagupta
                </h3>
                <p className="font-sans text-sm text-[#A8A090] font-light leading-relaxed mb-4">
                  First arithmetic of zero and negative numbers in the Brāhmasphuṭasiddhānta.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5A93C]/10">
                <span className="font-mono text-xs uppercase text-[#E5A93C] font-semibold tracking-wider">
                  Zero, given laws
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Card 4: Piṅgala (col-span-4) */}
          <FadeUp delay={0.28} className="lg:col-span-4">
            <div
              data-testid="pioneer-card-4"
              className="spotlight-hover bg-[#1A1712] border border-[#E5A93C]/15 rounded-2xl p-8 min-h-[240px] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#E5A93C] uppercase tracking-[0.2em]">
                    c. 200 BCE · The Encoder
                  </span>
                  <span className="font-dev text-xl text-[#E5A93C]">पिङ्गल</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#F5F0E6] font-medium tracking-tight mb-3 group-hover:text-[#E5A93C] transition-colors">
                  Piṅgala
                </h3>
                <p className="font-sans text-sm text-[#A8A090] font-light leading-relaxed mb-4">
                  Binary meters for Sanskrit verse; Mātrāmeru — a Fibonacci-like recursion.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5A93C]/10">
                <span className="font-mono text-xs uppercase text-[#E5A93C] font-semibold tracking-wider">
                  Binary, before bits
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Card 5: Bhāskara II (col-span-4) */}
          <FadeUp delay={0.35} className="lg:col-span-4">
            <div
              data-testid="pioneer-card-5"
              className="spotlight-hover bg-[#1A1712] border border-[#E5A93C]/15 rounded-2xl p-8 min-h-[240px] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#E5A93C] uppercase tracking-[0.2em]">
                    1114–1185 CE · The Teacher
                  </span>
                  <span className="font-dev text-xl text-[#E5A93C]">भास्कर द्वितीय</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#F5F0E6] font-medium tracking-tight mb-3 group-hover:text-[#E5A93C] transition-colors">
                  Bhāskara II
                </h3>
                <p className="font-sans text-sm text-[#A8A090] font-light leading-relaxed mb-4">
                  Līlāvatī&apos;s playful problems; cakravāla method for Pell&apos;s equation; infinitesimal seeds.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5A93C]/10">
                <span className="font-mono text-xs uppercase text-[#E5A93C] font-semibold tracking-wider">
                  Chakravāla → Pell&apos;s equation
                </span>
              </div>
            </div>
          </FadeUp>

          {/* Card 6: Mādhava (col-span-4) */}
          <FadeUp delay={0.42} className="lg:col-span-4">
            <div
              data-testid="pioneer-card-6"
              className="spotlight-hover bg-[#1A1712] border border-[#E5A93C]/15 rounded-2xl p-8 min-h-[240px] flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#E5A93C] uppercase tracking-[0.2em]">
                    c. 1340–1425 · The Infinite
                  </span>
                  <span className="font-dev text-xl text-[#E5A93C]">माधव</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl text-[#F5F0E6] font-medium tracking-tight mb-3 group-hover:text-[#E5A93C] transition-colors">
                  Mādhava
                </h3>
                <p className="font-sans text-sm text-[#A8A090] font-light leading-relaxed mb-4">
                  Kerala school — infinite series for π and trigonometry, the seed of calculus.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5A93C]/10">
                <span className="font-mono text-xs uppercase text-[#E5A93C] font-semibold tracking-wider">
                  π = 1 − 1/3 + 1/5 − …
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
