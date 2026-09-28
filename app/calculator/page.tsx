import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import CalculatorShell from '@/components/calculator/CalculatorShell';

export const metadata: Metadata = {
  title: 'Vedic Calculator — Step-by-Step Indian Knowledge Systems Arithmetic',
  description: 'Interactive Vedic Mathematics calculator demonstrating Urdhva-Tiryagbhyam, Nikhilam, Ekadhikena, and Osculation with animated steps and crosswise lines.',
};

export default function CalculatorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-3 border-[var(--vermilion)] border-t-transparent animate-spin" />
          <p className="font-serif text-sm text-[var(--ink-muted)]">Loading Vedic Workspace...</p>
        </div>
      </div>
    }>
      <CalculatorShell />
    </Suspense>
  );
}
