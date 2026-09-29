'use client';

import React from 'react';
import { Layers, ScrollText, ShieldCheck, GraduationCap } from 'lucide-react';

const STATS = [
  { icon: Layers, value: '05', label: 'Classical Sūtras', sub: 'Urdhva · Nikhilam · Ekadhika' },
  { icon: ScrollText, value: '10+', label: 'IKS Archive Facts', sub: '800 BCE → 1965 CE' },
  { icon: ShieldCheck, value: '100%', label: 'Ground-Truth Verified', sub: 'hardware cross-check' },
  { icon: GraduationCap, value: 'NEP', label: '2020 Aligned', sub: 'Sec 4.27 · IKS mandate' },
];

export default function StatsBand() {
  return (
    <section aria-label="SwiftSum at a glance" className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-2 mb-4">
      <div className="parchment-card px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6 !rounded-2xl !bg-[#FFF9EF] !border-[#C49A45]">
        {STATS.map((s) => (
          <div key={s.label} className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-xl bg-[rgba(196,154,69,0.12)] border border-[#C49A45] flex items-center justify-center text-[#641E16] flex-shrink-0">
              <s.icon className="w-5 h-5" />
            </span>
            <div>
              <div className="font-mono font-black text-xl text-[#641E16] leading-none">
                {s.value} <span className="text-xs font-semibold text-[#45352B]">{s.label}</span>
              </div>
              <div className="text-[11px] font-mono text-[#8C7763] mt-1">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
