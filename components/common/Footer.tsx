'use client';

import React from 'react';
import Link from 'next/link';
import { BookMarked, Sparkles, Award } from 'lucide-react';
import { PillarAccent } from '@/components/common/Motifs';

export default function Footer() {
  return (
    <footer className="no-print" style={{ borderTop: '2px solid #C49A45', background: '#FFF9EF', position: 'relative' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="section-number mb-8 text-center">Colophon · Explore · Treatises</p>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
                style={{ background: '#641E16', color: '#FFF9EF', border: '1px solid #C49A45', fontFamily: 'Cinzel, serif' }}>
                ॥
              </div>
              <h3 className="text-lg">SwiftSum · Vedic Ganita</h3>
            </div>
            <p className="text-sm max-w-md" style={{ lineHeight: 1.8 }}>
              An academic presentation of Indian Knowledge Systems — five classical sūtras with
              verifiable computation, prepared for college submission under NEP 2020, Section 4.27.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="vedic-badge gold text-[11px]"><Award className="w-3.5 h-3.5" /> NEP 2020</span>
              <span className="vedic-badge teal text-[11px]"><Sparkles className="w-3.5 h-3.5" /> Client-Side</span>
              <span className="vedic-badge emerald text-[11px]"><BookMarked className="w-3.5 h-3.5" /> 5 Sūtras</span>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm mb-4 uppercase tracking-wider">Pages</h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { href: '/', t: 'Home', s: 'cover, sutras & archive' },
                { href: '/about', t: 'About', s: 'objectives & scope' },
                { href: '/calculator', t: 'Calculator', s: 'worked computation' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors">
                    <span className="font-bold block" style={{ color: '#641E16' }}>{l.t}</span>
                    <span className="text-[11px]" style={{ color: '#8C7763' }}>{l.s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm mb-4 uppercase tracking-wider">Sūtras</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/calculator?op=multiplication"><span className="font-bold block" style={{ color: '#45352B' }}>Ūrdhva-Tiryagbhyām</span><span className="text-[11px]" style={{ color: '#8C7763' }}>Crosswise ×</span></Link></li>
              <li><Link href="/calculator?op=multiplication&a=98&b=97"><span className="font-bold block" style={{ color: '#45352B' }}>Nikhilam</span><span className="text-[11px]" style={{ color: '#8C7763' }}>Base deficiency</span></Link></li>
              <li><Link href="/calculator?op=squaring"><span className="font-bold block" style={{ color: '#45352B' }}>Ekādhikena</span><span className="text-[11px]" style={{ color: '#8C7763' }}>Squaring</span></Link></li>
              <li><Link href="/calculator?op=division"><span className="font-bold block" style={{ color: '#45352B' }}>Nikhilam Vibhāgaḥ</span><span className="text-[11px]" style={{ color: '#8C7763' }}>Division</span></Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm mb-4 uppercase tracking-wider">Treatises</h4>
            <ul className="space-y-2 text-xs" style={{ color: '#6B5847' }}>
              <li>• Śulba Sūtra (~800 BCE)</li>
              <li>• Chandaḥ Śāstra (~300 BCE)</li>
              <li>• Āryabhaṭīya (499 CE)</li>
              <li>• Brāhmasphuṭa (628 CE)</li>
              <li>• Līlāvatī (1150 CE)</li>
              <li>• Vedic Maths (1965)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4" style={{ borderTop: '1px solid #C49A45', color: '#8C7763' }}>
          <p>© 2026 SwiftSum · IKS Course Submission</p>
          <PillarAccent />
          <span className="sanskrit-title" style={{ color: '#641E16', fontWeight: 700 }}>गणितं मूर्धनि स्थितम्</span>
        </div>
      </div>
    </footer>
  );
}
