'use client';

import React from 'react';
import Link from 'next/link';
import { MousePointerClick, Waypoints, BadgeCheck, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

const STEPS = [
  {
    n: '01',
    icon: MousePointerClick,
    title: 'Choose a Sūtra',
    sanskrit: 'सूत्र चयन',
    text: 'Pick from 5 classical pillars — multiplication, squaring, subtraction, division or divisibility. Each card ships with textbook presets.',
    accent: 'copper' as const,
  },
  {
    n: '02',
    icon: Waypoints,
    title: 'Trace Vector Rays',
    sanskrit: 'रेखा अनुरेखण',
    text: 'Scrub steps at 0.8s / 1.6s / 3.0s tempo. Watch Ūrdhva-Tiryag cross-lines light up exact digit coordinates in the ray matrix.',
    accent: 'lapis' as const,
  },
  {
    n: '03',
    icon: BadgeCheck,
    title: 'Verify Ground Truth',
    sanskrit: 'सत्यापन',
    text: 'Every carry and final answer is cross-checked against hardware arithmetic. Green badge means 100% algebraic match.',
    accent: 'emerald' as const,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell">
      <div className="section-inner">
        <SectionHeading
          kicker="Section 01 — Method"
          eyebrow="How Swiftsum Works"
          eyebrowTone="teal"
          title="From Aphorism"
          highlight="to Auditable Proof."
          description="A three-stage pedagogical loop designed for classrooms, evaluators and self-learners. No black boxes — every mental shortcut is exposed as geometry."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="parchment-card p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                  s.accent === 'copper'
                    ? 'bg-[rgba(100,30,22,0.07)] border-[#C49A45] text-[#641E16]'
                    : s.accent === 'lapis'
                    ? 'bg-[rgba(196,154,69,0.12)] border-[#C49A45] text-[#9A7730]'
                    : 'bg-[rgba(79,122,58,0.1)] border-[rgba(79,122,58,0.3)] text-[#4F7A3A]'
                }`}>
                  <s.icon className="w-5 h-5" />
                </span>
                <span className="font-mono text-xs font-black text-[#9A7730] tracking-widest">{s.n}</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#641E16]">{s.title}</h3>
                <p className="sanskrit-title text-xs text-[#9A7730] font-bold mt-0.5">{s.sanskrit}</p>
              </div>
              <p className="text-sm text-[#45352B] leading-relaxed flex-1">{s.text}</p>
              <div className="pt-3 border-t border-[#C49A45]">
                <span className="font-mono text-[11px] text-[#8C7763]">
                  {s.n === '01' ? '→ 5 sutras · 23 presets' : s.n === '02' ? '→ ray matrix + scrubber' : '→ hardware match'}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/calculator" className="btn-vedic-primary text-sm">
            <span>Try the 3-Step Loop Live</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
