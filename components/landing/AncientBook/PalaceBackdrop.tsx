'use client';

import React from 'react';

/**
 * Rich backdrop for the pinned hero: geometric jaali lattice, cusped-arch frames,
 * hanging-lantern glows, and authentic Ancient Indian Mathematics (Gaṇita) &
 * Astrology/Astronomy (Jyotiṣa) manuscript diagrams with continuous sacred celestial rotations.
 */
export default function PalaceBackdrop() {
  return (
    <div className="ab-palace" aria-hidden="true">
      <div className="ab-palace-base" />
      <div className="ab-palace-lattice" />
      <div className="ab-palace-glow" />
      <div className="ab-palace-scrim" />

      <svg className="ab-palace-arches" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice" style={{ position: 'relative', zIndex: 2 }}>
        {/* ── Left cusped arch frame ── */}
        <g fill="none" stroke="#9A7730" strokeWidth="2.5" opacity="0.55">
          <path d="M60 720 L60 300 Q60 220 118 176 Q138 108 150 40 Q162 108 182 176 Q240 220 240 300 L240 720" />
          <path d="M84 720 L84 312 Q84 244 132 206 Q148 152 150 96 Q152 152 168 206 Q216 244 216 312 L216 720" opacity="0.7" />
          <circle cx="150" cy="30" r="7" />
        </g>

        {/* ── Right cusped arch frame ── */}
        <g fill="none" stroke="#9A7730" strokeWidth="2.5" opacity="0.55">
          <path d="M960 720 L960 300 Q960 220 1018 176 Q1038 108 1050 40 Q1062 108 1082 176 Q1140 220 1140 300 L1140 720" />
          <path d="M984 720 L984 312 Q984 244 1032 206 Q1048 152 1050 96 Q1052 152 1068 206 Q1116 244 1116 312 L1116 720" opacity="0.7" />
          <circle cx="1050" cy="30" r="7" />
        </g>

        {/* ══════════════════════════════════════════════════════════════════
            LEFT SIDE: GAṆITA (ANCIENT INDIAN MATHEMATICS & VEDIC GEOMETRY)
           ══════════════════════════════════════════════════════════════════ */}
        <g>
          {/* Top Section Header */}
          <g className="ab-header-popup" transform="translate(150, 120)">
            <rect x="-84" y="-18" width="168" height="36" fill="transparent" />
            <rect className="ab-header-plate" x="-78" y="-14" width="156" height="28" rx="6" />
            <text x="0" y="4" textAnchor="middle" fill="#641E16" fontSize="11" letterSpacing="3" fontFamily="var(--font-title)" fontWeight="bold">
              ॥ गणित शास्त्रम् ॥
            </text>
          </g>

          {/* 1. Meru Prastāra (Pingala's Combinatorial Pyramid) — ROTATING MANDALA & FLOATING PYRAMID */}
          <g className="ab-symbol-3d" transform="translate(150, 245)">
            <rect x="-60" y="-45" width="120" height="135" fill="transparent" />
            <rect className="ab-symbol-plate" x="-58" y="-42" width="116" height="130" rx="8" />

            {/* Outer rotating Meru Chakra mandala */}
            <g className="ab-spin-slow" fill="none">
              <circle cx="0" cy="0" r="38" stroke="#9A7730" strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />
              <polygon points="0,-38 27,-27 38,0 27,27 0,38 -27,27 -38,0 -27,-27" stroke="#C49A45" strokeWidth="0.8" opacity="0.6" />
              <circle cx="0" cy="-38" r="1.8" fill="#641E16" />
              <circle cx="38" cy="0" r="1.8" fill="#641E16" />
              <circle cx="0" cy="38" r="1.8" fill="#641E16" />
              <circle cx="-38" cy="0" r="1.8" fill="#641E16" />
            </g>

            {/* Inner counter-rotating harmonics */}
            <g className="ab-spin-ccw" fill="none">
              <circle cx="0" cy="0" r="22" stroke="#9A7730" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
              <line x1="-38" y1="0" x2="38" y2="0" stroke="#C49A45" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
              <line x1="0" y1="-38" x2="0" y2="38" stroke="#C49A45" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
            </g>

            {/* Floating Diamond Pyramid with Pingala Numerals */}
            <g className="ab-meru-float">
              <g fill="none" stroke="#9A7730" strokeWidth="1">
                <polygon points="0,-28 10,-16 0,-4 -10,-16" stroke="#641E16" strokeWidth="1.3" fill="rgba(247,236,210,0.4)" />
                <polygon points="-16,-10 -6,2 -16,14 -26,2" fill="rgba(247,236,210,0.3)" />
                <polygon points="16,-10 26,2 16,14 6,2" fill="rgba(247,236,210,0.3)" />
                <polygon points="-32,8 -22,20 -32,32 -42,20" fill="rgba(247,236,210,0.2)" />
                <polygon points="0,8 10,20 0,32 -10,20" stroke="#641E16" strokeWidth="1.3" fill="rgba(247,236,210,0.5)" />
                <polygon points="32,8 42,20 32,32 22,20" fill="rgba(247,236,210,0.2)" />
                <line x1="0" y1="-4" x2="-16" y2="8" strokeDasharray="2 2" stroke="#C49A45" />
                <line x1="0" y1="-4" x2="16" y2="8" strokeDasharray="2 2" stroke="#C49A45" />
                <line x1="-16" y1="14" x2="-32" y2="26" strokeDasharray="2 2" stroke="#C49A45" />
                <line x1="-16" y1="14" x2="0" y2="26" strokeDasharray="2 2" stroke="#C49A45" />
                <line x1="16" y1="14" x2="0" y2="26" strokeDasharray="2 2" stroke="#C49A45" />
                <line x1="16" y1="14" x2="32" y2="26" strokeDasharray="2 2" stroke="#C49A45" />
              </g>
              <text x="0" y="-13" textAnchor="middle" fill="#641E16" fontSize="8.5" fontFamily="var(--font-sanskrit)" fontWeight="bold">१</text>
              <text x="-16" y="5" textAnchor="middle" fill="#9A7730" fontSize="7.5" fontFamily="var(--font-sanskrit)">१</text>
              <text x="16" y="5" textAnchor="middle" fill="#9A7730" fontSize="7.5" fontFamily="var(--font-sanskrit)">१</text>
              <text x="-32" y="23" textAnchor="middle" fill="#9A7730" fontSize="7.5" fontFamily="var(--font-sanskrit)">१</text>
              <text x="0" y="23" textAnchor="middle" fill="#641E16" fontSize="9" fontFamily="var(--font-sanskrit)" fontWeight="bold">२</text>
              <text x="32" y="23" textAnchor="middle" fill="#9A7730" fontSize="7.5" fontFamily="var(--font-sanskrit)">१</text>
            </g>

            <text x="0" y="56" textAnchor="middle" fill="#641E16" fontSize="8" letterSpacing="1" fontFamily="var(--font-title)" fontWeight="bold">मेरु प्रस्तार</text>
            <text x="0" y="72" textAnchor="middle" fill="#9A7730" fontSize="6.5" fontFamily="var(--font-sans)">पिङ्गल · Combinatorics</text>
          </g>

          {/* 2. Aryabhata Trigonometric Quadrant (Jyā, Kotijyā / Sine Chord Arc) */}
          <g className="ab-symbol-3d" transform="translate(150, 415)">
            <rect x="-60" y="-55" width="120" height="145" fill="transparent" />
            <rect className="ab-symbol-plate" x="-58" y="-52" width="116" height="140" rx="8" />

            {/* Rotating celestial circle & chords */}
            <g className="ab-spin-slow" fill="none">
              <circle cx="0" cy="0" r="40" stroke="#9A7730" strokeDasharray="3 3" opacity="0.4" />
              <line x1="0" y1="0" x2="-34.6" y2="-20" stroke="#C49A45" strokeWidth="1.3" />
              <line x1="0" y1="0" x2="-20" y2="-34.6" stroke="#C49A45" strokeWidth="1.3" />
              <circle cx="-34.6" cy="-20" r="2.5" fill="#C49A45" />
              <circle cx="-20" cy="-34.6" r="2.5" fill="#C49A45" />
            </g>

            <g fill="none" stroke="#9A7730" strokeWidth="1.1">
              <path d="M-40 0 A40 40 0 0 1 0 -40" stroke="#641E16" strokeWidth="1.6" />
              <line x1="-46" y1="0" x2="6" y2="0" stroke="#9A7730" strokeWidth="1.2" />
              <line x1="0" y1="-46" x2="0" y2="6" stroke="#9A7730" strokeWidth="1.2" />
              <line x1="-34.6" y1="-20" x2="-34.6" y2="0" stroke="#641E16" strokeWidth="1.2" strokeDasharray="2 2" />
              <line x1="-20" y1="-34.6" x2="0" y2="-34.6" stroke="#641E16" strokeWidth="1.2" strokeDasharray="2 2" />
              <line x1="-34.6" y1="-20" x2="0" y2="-20" stroke="#9A7730" strokeWidth="0.8" strokeDasharray="2 2" />
              <circle cx="0" cy="0" r="3" fill="#641E16" stroke="#C49A45" strokeWidth="1" />
            </g>

            <text x="0" y="56" textAnchor="middle" fill="#641E16" fontSize="8" letterSpacing="1" fontFamily="var(--font-title)" fontWeight="bold">ज्या · कोटिज्या</text>
            <text x="0" y="72" textAnchor="middle" fill="#9A7730" fontSize="6.5" fontFamily="var(--font-sans)">आर्यभट (499 CE) · Sine Arc</text>
          </g>

          {/* 3. Śulba Sūtra Geometric Altar Construction — IN-PLACE SACRED ROTATION */}
          <g className="ab-symbol-3d" transform="translate(150, 580)">
            <rect x="-60" y="-55" width="120" height="145" fill="transparent" />
            <rect className="ab-symbol-plate" x="-58" y="-52" width="116" height="140" rx="8" />

            <g fill="none" stroke="#9A7730" strokeWidth="1">
              <g className="ab-spin-cw">
                <circle cx="0" cy="0" r="36" stroke="#9A7730" strokeWidth="1.4" />
                <rect x="-25" y="-25" width="50" height="50" stroke="#641E16" strokeWidth="1.4" fill="rgba(247,236,210,0.3)" />
                <rect x="-25" y="-25" width="50" height="50" transform="rotate(45)" stroke="#C49A45" strokeWidth="1.2" />
              </g>

              <g className="ab-spin-ccw">
                <circle cx="0" cy="0" r="18" stroke="#9A7730" strokeWidth="1.1" strokeDasharray="3 2" />
                <line x1="-36" y1="0" x2="36" y2="0" strokeDasharray="2 2" stroke="#C49A45" />
                <line x1="0" y1="-36" x2="0" y2="36" strokeDasharray="2 2" stroke="#C49A45" />
              </g>

              <circle cx="0" cy="0" r="3.5" fill="#641E16" stroke="#C49A45" strokeWidth="1.2" />
            </g>

            <text x="0" y="56" textAnchor="middle" fill="#641E16" fontSize="8" letterSpacing="1" fontFamily="var(--font-title)" fontWeight="bold">शुल्ब सूत्र (वेदी रचना)</text>
            <text x="0" y="72" textAnchor="middle" fill="#9A7730" fontSize="6.5" fontFamily="var(--font-sans)">बौधायन (800 BCE) · Vedic Geometry</text>
          </g>

          {/* 4. Floating 3D Ancient Mathematical Glyphs */}
          <g fontFamily="var(--font-sanskrit)" fontSize="11">
            <g className="ab-glyph-popup" transform="translate(94, 180)">
              <circle cx="0" cy="0" r="16" fill="transparent" />
              <circle className="ab-glyph-halo" cx="0" cy="0" r="13" />
              <text x="0" y="4" textAnchor="middle" fill="#641E16" fontWeight="bold">०</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(206, 180)">
              <circle cx="0" cy="0" r="16" fill="transparent" />
              <circle className="ab-glyph-halo" cx="0" cy="0" r="13" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">∞</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(94, 345)">
              <circle cx="0" cy="0" r="16" fill="transparent" />
              <circle className="ab-glyph-halo" cx="0" cy="0" r="13" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">π</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(206, 345)">
              <circle cx="0" cy="0" r="16" fill="transparent" />
              <circle className="ab-glyph-halo" cx="0" cy="0" r="13" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">√२</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(94, 510)">
              <circle cx="0" cy="0" r="16" fill="transparent" />
              <circle className="ab-glyph-halo" cx="0" cy="0" r="13" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">५</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(206, 510)">
              <circle cx="0" cy="0" r="16" fill="transparent" />
              <circle className="ab-glyph-halo" cx="0" cy="0" r="13" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">७</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(94, 675)">
              <circle cx="0" cy="0" r="16" fill="transparent" />
              <circle className="ab-glyph-halo" cx="0" cy="0" r="13" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">९</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(206, 675)">
              <rect x="-24" y="-12" width="48" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-20" y="-10" width="40" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#641E16" fontWeight="bold">॥ ॐ ॥</text>
            </g>
          </g>
        </g>


        {/* ══════════════════════════════════════════════════════════════════
            RIGHT SIDE: JYOTIṢA (ANCIENT INDIAN ASTRONOMY & ASTROLOGY)
           ══════════════════════════════════════════════════════════════════ */}
        <g>
          {/* Top Section Header */}
          <g className="ab-header-popup" transform="translate(1050, 120)">
            <rect x="-84" y="-18" width="168" height="36" fill="transparent" />
            <rect className="ab-header-plate" x="-78" y="-14" width="156" height="28" rx="6" />
            <text x="0" y="4" textAnchor="middle" fill="#641E16" fontSize="11" letterSpacing="3" fontFamily="var(--font-title)" fontWeight="bold">
              ॥ ज्योतिष शास्त्रम् ॥
            </text>
          </g>

          {/* 1. Rāśi Kundali (12-House Vedic Horoscope) — ROTATING INNER DIAMOND */}
          <g className="ab-symbol-3d" transform="translate(1050, 245)">
            <rect x="-60" y="-45" width="120" height="135" fill="transparent" />
            <rect className="ab-symbol-plate" x="-58" y="-42" width="116" height="130" rx="8" />

            <g fill="none" stroke="#9A7730" strokeWidth="1.1">
              <rect x="-32" y="-32" width="64" height="64" stroke="#641E16" strokeWidth="1.5" fill="rgba(247,236,210,0.3)" />
              <line x1="-32" y1="-32" x2="32" y2="32" stroke="#9A7730" strokeWidth="1" />
              <line x1="32" y1="-32" x2="-32" y2="32" stroke="#9A7730" strokeWidth="1" />

              {/* Rotating Diamond Mandala */}
              <g className="ab-spin-slow">
                <polygon points="0,-32 32,0 0,32 -32,0" stroke="#C49A45" strokeWidth="1.3" fill="rgba(247,236,210,0.4)" />
              </g>

              {/* Counter-spinning house bindu markers */}
              <g className="ab-spin-ccw">
                <circle cx="0" cy="-14" r="2.5" fill="#641E16" />
                <circle cx="-14" cy="0" r="1.8" fill="#9A7730" />
                <circle cx="14" cy="0" r="1.8" fill="#9A7730" />
                <circle cx="0" cy="14" r="1.8" fill="#9A7730" />
              </g>
            </g>
            <text x="0" y="-10" textAnchor="middle" fill="#641E16" fontSize="7" fontFamily="var(--font-title)" fontWeight="bold">तनु</text>

            <text x="0" y="56" textAnchor="middle" fill="#641E16" fontSize="8" letterSpacing="1" fontFamily="var(--font-title)" fontWeight="bold">द्वादश भाव (कुण्डली)</text>
            <text x="0" y="72" textAnchor="middle" fill="#9A7730" fontSize="6.5" fontFamily="var(--font-sans)">12 Bhavas Horoscope Chart</text>
          </g>

          {/* 2. Navagraha & 27 Nakshatra Celestial Astrolabe (Golayantra) — IN-PLACE SACRED ROTATION */}
          <g className="ab-symbol-3d" transform="translate(1050, 415)">
            <rect x="-60" y="-55" width="120" height="145" fill="transparent" />
            <rect className="ab-symbol-plate" x="-58" y="-52" width="116" height="140" rx="8" />

            <g fill="none" stroke="#9A7730" strokeWidth="1">
              <circle cx="0" cy="0" r="38" stroke="#641E16" strokeWidth="1.4" />
              <g className="ab-spin-cw">
                <circle cx="0" cy="0" r="30" stroke="#9A7730" strokeWidth="0.8" strokeDasharray="3 2" />
                <circle cx="0" cy="0" r="22" stroke="#C49A45" strokeWidth="1.2" />
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <line
                      key={deg}
                      x1={12 * Math.cos(rad)}
                      y1={12 * Math.sin(rad)}
                      x2={38 * Math.cos(rad)}
                      y2={38 * Math.sin(rad)}
                      stroke="#9A7730"
                      strokeWidth={deg % 90 === 0 ? 1.2 : 0.6}
                      strokeDasharray={deg % 90 === 0 ? undefined : '2 2'}
                    />
                  );
                })}
              </g>

              <g className="ab-spin-ccw">
                <circle cx="18" cy="-14" r="2.2" fill="#641E16" />
                <circle cx="-22" cy="10" r="2.5" fill="#C49A45" />
                <circle cx="14" cy="22" r="2" fill="#9A7730" />
                <circle cx="-10" cy="-25" r="2.2" fill="#641E16" />
              </g>

              <circle cx="0" cy="0" r="5" fill="#C49A45" stroke="#641E16" strokeWidth="1.2" />
              <circle cx="0" cy="0" r="12" stroke="#9A7730" strokeWidth="0.8" />
            </g>

            <text x="0" y="56" textAnchor="middle" fill="#641E16" fontSize="8" letterSpacing="1" fontFamily="var(--font-title)" fontWeight="bold">नवग्रह · नक्षत्र चक्र</text>
            <text x="0" y="72" textAnchor="middle" fill="#9A7730" fontSize="6.5" fontFamily="var(--font-sans)">गोलयन्त्र · Celestial Sphere</text>
          </g>

          {/* 3. Saptarshi Mandala & Dhruva (Polaris) — REVOLVES AROUND DHRUVA */}
          <g className="ab-symbol-3d" transform="translate(1050, 580)">
            <rect x="-60" y="-55" width="120" height="145" fill="transparent" />
            <rect className="ab-symbol-plate" x="-58" y="-52" width="116" height="140" rx="8" />

            <g fill="none" stroke="#9A7730" strokeWidth="1">
              {/* Central fixed Pole Star: Dhruva with pulsing radiance */}
              <g className="ab-pulse-star">
                <circle cx="0" cy="-6" r="3.5" fill="#C49A45" stroke="#641E16" strokeWidth="1.2" />
                <line x1="0" y1="-14" x2="0" y2="2" stroke="#641E16" strokeWidth="1.2" />
                <line x1="-8" y1="-6" x2="8" y2="-6" stroke="#641E16" strokeWidth="1.2" />
              </g>
              <text x="10" y="-8" fill="#641E16" fontSize="7" fontFamily="var(--font-sanskrit)" fontWeight="bold">ध्रुव</text>

              {/* Saptarshi constellation revolving continuously around Dhruva */}
              <g className="ab-spin-celestial">
                <polyline
                  points="-28,24 -12,28 8,20 -8,2 -28,24 -8,2 12,-12 28,-18 42,-14"
                  stroke="#C49A45"
                  strokeWidth="1.3"
                  strokeDasharray="2 2"
                />
                {[
                  { x: -28, y: 24, name: 'ऋ' },
                  { x: -12, y: 28, name: 'तु' },
                  { x: 8, y: 20, name: 'पु' },
                  { x: -8, y: 2, name: 'अ' },
                  { x: 12, y: -12, name: 'अं' },
                  { x: 28, y: -18, name: 'व' },
                  { x: 42, y: -14, name: 'म' },
                ].map((star, i) => (
                  <g key={i}>
                    <circle cx={star.x} cy={star.y} r="2.8" fill="#641E16" stroke="#C49A45" strokeWidth="1" />
                  </g>
                ))}
                <line x1="-8" y1="2" x2="0" y2="-6" stroke="#C49A45" strokeWidth="1" strokeDasharray="3 3" opacity="0.85" />
              </g>

              {/* Orbiting Crescent Moon (Chandra Kalā) */}
              <g className="ab-spin-ccw">
                <path d="M-36 -28 A 12 12 0 0 0 -22 -14 A 9 9 0 0 1 -36 -28 Z" fill="#C49A45" opacity="0.9" />
              </g>
            </g>

            <text x="0" y="56" textAnchor="middle" fill="#641E16" fontSize="8" letterSpacing="1" fontFamily="var(--font-title)" fontWeight="bold">सप्तर्षि मण्डल · ध्रुव</text>
            <text x="0" y="72" textAnchor="middle" fill="#9A7730" fontSize="6.5" fontFamily="var(--font-sans)">7 Great Rṣis &amp; Polaris</text>
          </g>

          {/* 4. Floating 3D Astrological Glyphs */}
          <g fontFamily="var(--font-sanskrit)" fontSize="11">
            <g className="ab-glyph-popup" transform="translate(994, 180)">
              <rect x="-20" y="-12" width="40" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-18" y="-10" width="36" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#641E16" fontWeight="bold">सूर्य</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(1106, 180)">
              <rect x="-20" y="-12" width="40" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-18" y="-10" width="36" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">चन्द्र</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(994, 345)">
              <rect x="-20" y="-12" width="40" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-18" y="-10" width="36" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">मेष</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(1106, 345)">
              <rect x="-20" y="-12" width="40" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-18" y="-10" width="36" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">वृषभ</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(994, 510)">
              <rect x="-20" y="-12" width="40" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-18" y="-10" width="36" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">बुध</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(1106, 510)">
              <rect x="-20" y="-12" width="40" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-18" y="-10" width="36" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">गुरु</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(994, 675)">
              <rect x="-20" y="-12" width="40" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-18" y="-10" width="36" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#9A7730">शुक्र</text>
            </g>
            <g className="ab-glyph-popup" transform="translate(1106, 675)">
              <rect x="-20" y="-12" width="40" height="24" fill="transparent" />
              <rect className="ab-glyph-halo" x="-18" y="-10" width="36" height="20" rx="4" />
              <text x="0" y="4" textAnchor="middle" fill="#641E16" fontWeight="bold">शनि</text>
            </g>
          </g>
        </g>

        {/* ── Hanging palace lanterns ── */}
        <g opacity="0.75">
          <line x1="330" y1="0" x2="330" y2="70" stroke="#9A7730" strokeWidth="2" />
          <path d="M312 96 L330 70 L348 96 L340 150 L320 150 Z" fill="rgba(196,154,69,0.25)" stroke="#9A7730" strokeWidth="2" />
          <circle cx="330" cy="112" r="9" fill="#E9B94E" opacity="0.9" />
          <line x1="870" y1="0" x2="870" y2="70" stroke="#9A7730" strokeWidth="2" />
          <path d="M852 96 L870 70 L888 96 L880 150 L860 150 Z" fill="rgba(196,154,69,0.25)" stroke="#9A7730" strokeWidth="2" />
          <circle cx="870" cy="112" r="9" fill="#E9B94E" opacity="0.9" />
        </g>

        {/* ── Floor medallions ── */}
        <g fill="none" stroke="#9A7730" strokeWidth="1.5" opacity="0.45">
          <circle cx="150" cy="710" r="24" />
          <circle cx="150" cy="710" r="12" />
          <circle cx="1050" cy="710" r="24" />
          <circle cx="1050" cy="710" r="12" />
        </g>
      </svg>
    </div>
  );
}
