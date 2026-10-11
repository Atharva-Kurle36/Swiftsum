import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import CalculatorShell from '@/components/calculator/CalculatorShell';
import Navbar from '@/components/iks/Navbar';
import Footer from '@/components/iks/Footer';
import { FilmGrain, ScrollProgress } from '@/components/iks/shared';

export const metadata: Metadata = {
  title: 'Swiftsum — Vedic Arithmetic Engine & Step-by-Step Calculator',
  description: 'Interactive Vedic Mathematics calculator demonstrating Urdhva-Tiryagbhyam, Nikhilam, Ekadhikena, and Osculation with animated steps and crosswise lines.',
};

export default function CalculatorPage() {
  return (
    <div className="relative min-h-screen bg-black text-[#F5F0E6] flex flex-col justify-between selection:bg-[#E5A93C] selection:text-black overflow-hidden">
      {/* Global Landing Page Overlays */}
      <FilmGrain />
      <ScrollProgress />
      <Navbar />

      {/* Atmospheric Background Layers (Directly matching landing page hero and treatises) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Soft top-down antique-gold illumination */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,169,60,0.06)_0%,rgba(0,0,0,0)_70%)]" />
        {/* Central subtle white starfield glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_80%)]" />
        {/* Background Architectural Watermark "निखिलम्" matching landing page "गणना" */}
        <div className="absolute right-[-4vw] top-[14vh] pointer-events-none select-none z-0 opacity-[0.14]">
          <span className="font-dev text-outline-faint text-[22vw] leading-none block whitespace-nowrap">
            निखिलम्
          </span>
        </div>
      </div>

      <main className="relative z-10 flex-grow pt-28 pb-20">
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#E5A93C] border-t-transparent animate-spin" />
              <p className="font-mono text-xs text-[#E5A93C] uppercase tracking-widest">Loading Vedic Workspace...</p>
            </div>
          </div>
        }>
          <CalculatorShell />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
