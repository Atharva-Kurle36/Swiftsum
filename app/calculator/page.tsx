import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import CalculatorShell from '@/components/calculator/CalculatorShell';
import Navbar from '@/components/iks/Navbar';
import Footer from '@/components/iks/Footer';
import { FilmGrain } from '@/components/iks/shared';

export const metadata: Metadata = {
  title: 'Swiftsum — Vedic Arithmetic Engine & Step-by-Step Calculator',
  description: 'Interactive Vedic Mathematics calculator demonstrating Urdhva-Tiryagbhyam, Nikhilam, Ekadhikena, and Osculation with animated steps and crosswise lines.',
};

export default function CalculatorPage() {
  return (
    <div className="relative min-h-screen bg-[#0B0A08] text-[#F5F0E6] flex flex-col justify-between">
      <FilmGrain />
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
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
