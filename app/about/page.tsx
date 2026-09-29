import type { Metadata } from 'next';
import Link from 'next/link';
import { LotusDivider, PillarAccent, NalandaIllustration } from '@/components/common/Motifs';

export const metadata: Metadata = {
  title: 'About — SwiftSum · Indian Knowledge Systems',
  description: 'About the SwiftSum IKS college project: objectives, scope, methods and NEP 2020 alignment.',
};

const OBJECTIVES = [
  { n: '01', t: 'Demonstrate classical sūtras', d: 'Present five Vedic computation methods — Ūrdhva-Tiryagbhyām, Nikhilam, Ekādhikena, Nikhilam Vibhāgaḥ and osculation — with worked steps.' },
  { n: '02', t: 'Make method visible', d: 'Trace every digit-level operation with vector-ray visualisation and step scrubbing instead of black-box answers.' },
  { n: '03', t: 'Verify against ground truth', d: 'Cross-check each carry and final result against standard arithmetic so every demonstration is auditable.' },
  { n: '04', t: 'Align with NEP 2020', d: 'Support Section 4.27 on Indian Knowledge Systems with classroom-ready, print-friendly academic presentation.' },
];

export default function AboutPage() {
  return (
    <div className="section-shell">
      <div className="section-inner" style={{ maxWidth: '880px', margin: '0 auto' }}>
        <p className="section-number text-center">About the Project</p>
        <h1 className="text-center text-3xl sm:text-4xl mt-2">SwiftSum · Vedic Ganita</h1>
        <p className="sanskrit-title text-center mt-2" style={{ color: '#641E16', fontWeight: 700 }}>
          भारतीय ज्ञान परंपरा — NEP 2020, Section 4.27
        </p>
        <LotusDivider />

        <div className="manuscript-page corner-motifs mb-6">
          <span className="corner tl" aria-hidden="true">◈</span>
          <span className="corner tr" aria-hidden="true">◈</span>
          <span className="corner bl" aria-hidden="true">◈</span>
          <span className="corner br" aria-hidden="true">◈</span>
          <h2 className="text-2xl mb-3">Project Overview</h2>
          <p className="text-sm sm:text-base" style={{ lineHeight: 1.9 }}>
            SwiftSum is a college academic submission presenting Indian Knowledge Systems through
            interactive Vedic mathematics. It combines a Nalanda-inspired manuscript report with a
            client-side computational workspace covering multiplication, squaring, subtraction,
            division and divisibility checks — each traced step by step with verification.
          </p>
          <div style={{ margin: '18px 0 4px' }}>
            <NalandaIllustration />
          </div>
        </div>

        <div className="manuscript-page mb-6">
          <h2 className="text-2xl mb-4">Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OBJECTIVES.map(o => (
              <div key={o.n} className="parchment-card p-5">
                <p className="section-number mb-1">{o.n}</p>
                <h3 className="text-lg mb-1">{o.t}</h3>
                <p className="text-sm" style={{ lineHeight: 1.8 }}>{o.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="manuscript-page mb-6">
          <h2 className="text-2xl mb-3">Scope</h2>
          <table className="manuscript-table">
            <thead>
              <tr><th>Module</th><th>Content</th></tr>
            </thead>
            <tbody>
              <tr><td>Home</td><td>Cover sheet, demonstration, sūtra chapters, heritage archive, references</td></tr>
              <tr><td>About</td><td>Objectives, scope and academic context (this page)</td></tr>
              <tr><td>Calculator</td><td>Five-operation workspace with presets, ray visualiser and verified results</td></tr>
            </tbody>
          </table>
          <LotusDivider />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/calculator" className="btn-vedic-primary text-sm w-full sm:w-auto">
              Open Calculator
            </Link>
            <Link href="/" className="btn-vedic-secondary text-sm w-full sm:w-auto">
              Back to Home
            </Link>
          </div>
          <div className="mt-4"><PillarAccent /></div>
        </div>
      </div>
    </div>
  );
}
