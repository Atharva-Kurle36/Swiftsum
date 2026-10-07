import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/iks/Navbar';
import Footer from '@/components/iks/Footer';
import { FilmGrain } from '@/components/iks/shared';

export const metadata: Metadata = {
  title: 'About — IKS · Indian Knowledge Systems',
  description: 'About the IKS project: objectives, scope, methods and NEP 2020 alignment.',
};

const OBJECTIVES = [
  { n: '01', t: 'Demonstrate Classical Sūtras', d: 'Present classical Vedic computation methods — Ūrdhva-Tiryagbhyām, Nikhilam, Ekādhikena, Nikhilam Vibhāgaḥ and osculation — with worked steps.' },
  { n: '02', t: 'Make Computational Method Visible', d: 'Trace every digit-level operation with vector-ray visualisation and step scrubbing instead of black-box answers.' },
  { n: '03', t: 'Verify Against Ground Truth', d: 'Cross-check each carry and final result against standard arithmetic so every demonstration is mathematically auditable.' },
  { n: '04', t: 'Align with NEP 2020', d: 'Support Section 4.27 on Indian Knowledge Systems with classroom-ready, research-grade presentation.' },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#0B0A08] text-[#F5F0E6] flex flex-col justify-between">
      <FilmGrain />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#E5A93C] mb-3">
            Academic Context · NEP 2020
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F5F0E6] font-medium tracking-tight mb-4">
            Indian Knowledge Systems
          </h1>
          <p className="font-dev text-xl text-[#E5A93C]">
            भारतीय ज्ञान परंपरा — NEP 2020, Section 4.27
          </p>
        </div>

        {/* Project Overview Card */}
        <div className="bg-[#1A1712] border border-[#E5A93C]/20 rounded-2xl p-8 sm:p-10 mb-8 shadow-2xl">
          <h2 className="font-display text-2xl sm:text-3xl text-[#E5A93C] mb-4">Project Overview</h2>
          <p className="font-sans text-sm sm:text-base text-[#A8A090] leading-relaxed font-light mb-6">
            A scrollytelling and computational exploration of Indian Knowledge Systems (IKS),
            demonstrating the deep roots of algebra, binary sequences, infinite series, and the birth of zero.
            Built with modern interaction design, mathematical rigor, and respect for the Vedic tradition.
          </p>
        </div>

        {/* Objectives */}
        <div className="bg-[#1A1712] border border-[#E5A93C]/20 rounded-2xl p-8 sm:p-10 mb-8 shadow-2xl">
          <h2 className="font-display text-2xl sm:text-3xl text-[#E5A93C] mb-6">Key Objectives</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {OBJECTIVES.map((o) => (
              <div key={o.n} className="p-5 rounded-xl bg-[#13110D] border border-[#E5A93C]/15">
                <span className="font-mono text-xs text-[#E5A93C] uppercase tracking-widest block mb-1">
                  {o.n}
                </span>
                <h3 className="font-display text-lg text-[#F5F0E6] mb-2">{o.t}</h3>
                <p className="font-sans text-xs sm:text-sm text-[#A8A090] font-light leading-relaxed">
                  {o.d}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
          <Link href="/calculator" className="vedic-pill vedic-pill-gold">
            Launch Calculator
          </Link>
          <Link href="/" className="vedic-pill vedic-pill-ghost">
            Back to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
