'use client';

import React from 'react';

/**
 * Rich backdrop for the pinned hero: geometric jaali lattice, cusped-arch frames,
 * hanging-lantern glows, and authentic Ancient Indian Mathematics (Gaṇita) &
 * Astrology/Astronomy (Jyotiṣa) manuscript diagrams.
 */
export default function PalaceBackdrop() {
  return (
    <div className="ab-palace" aria-hidden="true">
      <div className="ab-palace-base" />
      <div className="ab-palace-lattice" />
      <svg className="ab-palace-arches" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C49A45" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9A7730" stopOpacity="0" />
          </radialGradient>
        </defs>

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
        <g opacity="0.75">
          {/* Top Label */}
          <text x="150" y="145" textAnchor="middle" fill="#9A7730" fontSize="10" letterSpacing="3" fontFamily="var(--font-title)" fontWeight="bold" opacity="0.85">
            ॥ गणित शास्त्रम् ॥
          </text>

          {/* 1. Meru Prastāra (Pingala's Combinatorial Pyramid / Pascal's Triangle) */}
          <g transform="translate(150, 215)">
            <g fill="none" stroke="#9A7730" strokeWidth="1">
              {/* Row 1 */}
              <polygon points="0,-28 10,-16 0,-4 -10,-16" stroke="#641E16" strokeWidth="1.2" />
              {/* Row 2 */}
              <polygon points="-16,-10 -6,2 -16,14 -26,2" />
              <polygon points="16,-10 26,2 16,14 6,2" />
              {/* Row 3 */}
              <polygon points="-32,8 -22,20 -32,32 -42,20" />
              <polygon points="0,8 10,20 0,32 -10,20" stroke="#641E16" strokeWidth="1.2" />
              <polygon points="32,8 42,20 32,32 22,20" />
              {/* Connecting lines */}
              <line x1="0" y1="-4" x2="-16" y2="8" strokeDasharray="2 2" />
              <line x1="0" y1="-4" x2="16" y2="8" strokeDasharray="2 2" />
              <line x1="-16" y1="14" x2="-32" y2="26" strokeDasharray="2 2" />
              <line x1="-16" y1="14" x2="0" y2="26" strokeDasharray="2 2" />
              <line x1="16" y1="14" x2="0" y2="26" strokeDasharray="2 2" />
              <line x1="16" y1="14" x2="32" y2="26" strokeDasharray="2 2" />
            </g>
            {/* Pingala numerals */}
            <text x="0" y="-13" textAnchor="middle" fill="#641E16" fontSize="8" fontFamily="var(--font-sanskrit)" fontWeight="bold">१</text>
            <text x="-16" y="5" textAnchor="middle" fill="#9A7730" fontSize="7" fontFamily="var(--font-sanskrit)">१</text>
            <text x="16" y="5" textAnchor="middle" fill="#9A7730" fontSize="7" fontFamily="var(--font-sanskrit)">१</text>
            <text x="-32" y="23" textAnchor="middle" fill="#9A7730" fontSize="7" fontFamily="var(--font-sanskrit)">१</text>
            <text x="0" y="23" textAnchor="middle" fill="#641E16" fontSize="8" fontFamily="var(--font-sanskrit)" fontWeight="bold">२</text>
            <text x="32" y="23" textAnchor="middle" fill="#9A7730" fontSize="7" fontFamily="var(--font-sanskrit)">१</text>
            <text x="0" y="44" textAnchor="middle" fill="#9A7730" fontSize="7" letterSpacing="1" fontFamily="var(--font-title)" opacity="0.8">मेरु प्रस्तार</text>
          </g>

          {/* 2. Aryabhata Trigonometric Quadrant (Jyā, Kotijyā, Utkrama-jyā / Sine Chord Arc) */}
          <g transform="translate(150, 365)">
            <g fill="none" stroke="#9A7730" strokeWidth="1.1">
              {/* Quadrant arc and axes */}
              <circle cx="0" cy="0" r="42" strokeDasharray="2 2" opacity="0.4" />
              <path d="M-42 0 A42 42 0 0 1 0 -42" stroke="#641E16" strokeWidth="1.5" />
              <line x1="-48" y1="0" x2="6" y2="0" stroke="#9A7730" strokeWidth="1.2" />
              <line x1="0" y1="-48" x2="0" y2="6" stroke="#9A7730" strokeWidth="1.2" />
              {/* Radius vector to 30 deg */}
              <line x1="0" y1="0" x2="-36.37" y2="-21" stroke="#C49A45" strokeWidth="1.2" />
              {/* Radius vector to 60 deg */}
              <line x1="0" y1="0" x2="-21" y2="-36.37" stroke="#C49A45" strokeWidth="1.2" />
              {/* Sine / Jyā vertical and horizontal dropped chords */}
              <line x1="-36.37" y1="-21" x2="-36.37" y2="0" stroke="#641E16" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="-21" y1="-36.37" x2="0" y2="-36.37" stroke="#641E16" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="-36.37" y1="-21" x2="0" y2="-21" stroke="#9A7730" strokeWidth="0.8" strokeDasharray="2 2" />
              {/* Center Bindu */}
              <circle cx="0" cy="0" r="2.5" fill="#641E16" />
              <circle cx="-36.37" cy="-21" r="2" fill="#C49A45" />
              <circle cx="-21" cy="-36.37" r="2" fill="#C49A45" />
            </g>
            <text x="0" y="20" textAnchor="middle" fill="#9A7730" fontSize="7" letterSpacing="1" fontFamily="var(--font-title)" opacity="0.8">ज्या · कोटिज्या (आर्यभट)</text>
          </g>

          {/* 3. Śulba Sūtra Geometric Altar Construction (Squaring the Circle / Śūnya & Chakravala) */}
          <g transform="translate(150, 505)">
            <g fill="none" stroke="#9A7730" strokeWidth="1">
              {/* Outer circle and rotated Vedic altar squares */}
              <circle cx="0" cy="0" r="38" stroke="#9A7730" strokeWidth="1.2" />
              <rect x="-27" y="-27" width="54" height="54" stroke="#641E16" strokeWidth="1.3" />
              <rect x="-27" y="-27" width="54" height="54" transform="rotate(45)" stroke="#C49A45" strokeWidth="1" />
              <circle cx="0" cy="0" r="19" stroke="#9A7730" strokeDasharray="2 2" />
              {/* Diagonals & Cord lines (Rajju) */}
              <line x1="-38" y1="0" x2="38" y2="0" strokeDasharray="2 2" opacity="0.6" />
              <line x1="0" y1="-38" x2="0" y2="38" strokeDasharray="2 2" opacity="0.6" />
              {/* Central Bindu (Brahmagupta's Śūnya Zero) */}
              <circle cx="0" cy="0" r="3" fill="#641E16" stroke="#9A7730" strokeWidth="1" />
            </g>
            <text x="0" y="48" textAnchor="middle" fill="#9A7730" fontSize="7" letterSpacing="1" fontFamily="var(--font-title)" opacity="0.8">शुल्ब सूत्र (वेदी रचना)</text>
          </g>

          {/* 4. Floating Ancient Mathematical Glyphs (Śūnya, Ananta, Pi, Vedic numerals) */}
          <g fill="#9A7730" opacity="0.65" fontFamily="var(--font-sanskrit)" fontSize="10">
            <text x="96" y="175" fill="#641E16" fontWeight="bold">०</text>
            <text x="202" y="180">∞</text>
            <text x="90" y="305">π</text>
            <text x="208" y="325">√२</text>
            <text x="92" y="445">५</text>
            <text x="206" y="460">७</text>
            <text x="94" y="585">९</text>
            <text x="204" y="600">॥ ॐ ॥</text>
          </g>
        </g>


        {/* ══════════════════════════════════════════════════════════════════
            RIGHT SIDE: JYOTIṢA (ANCIENT INDIAN ASTRONOMY & ASTROLOGY)
           ══════════════════════════════════════════════════════════════════ */}
        <g opacity="0.75">
          {/* Top Label */}
          <text x="1050" y="145" textAnchor="middle" fill="#9A7730" fontSize="10" letterSpacing="3" fontFamily="var(--font-title)" fontWeight="bold" opacity="0.85">
            ॥ ज्योतिष शास्त्रम् ॥
          </text>

          {/* 1. Rāśi Kundali (12-House Vedic Horoscope & Astrological Matrix) */}
          <g transform="translate(1050, 215)">
            <g fill="none" stroke="#9A7730" strokeWidth="1.1">
              {/* Outer square */}
              <rect x="-34" y="-34" width="68" height="68" stroke="#641E16" strokeWidth="1.4" />
              {/* Diagonals */}
              <line x1="-34" y1="-34" x2="34" y2="34" stroke="#9A7730" strokeWidth="1" />
              <line x1="34" y1="-34" x2="-34" y2="34" stroke="#9A7730" strokeWidth="1" />
              {/* Inscribed diamond */}
              <polygon points="0,-34 34,0 0,34 -34,0" stroke="#C49A45" strokeWidth="1.2" />
              {/* Central Tanu / 1st house mark */}
              <circle cx="0" cy="-14" r="2.5" fill="#641E16" />
              <circle cx="-14" cy="0" r="1.8" fill="#9A7730" />
              <circle cx="14" cy="0" r="1.8" fill="#9A7730" />
              <circle cx="0" cy="14" r="1.8" fill="#9A7730" />
            </g>
            <text x="0" y="-10" textAnchor="middle" fill="#641E16" fontSize="6.5" fontFamily="var(--font-title)">तनु</text>
            <text x="0" y="44" textAnchor="middle" fill="#9A7730" fontSize="7" letterSpacing="1" fontFamily="var(--font-title)" opacity="0.8">द्वादश भाव (कुण्डली)</text>
          </g>

          {/* 2. Navagraha & 27 Nakshatra Celestial Astrolabe (Golayantra) */}
          <g transform="translate(1050, 365)">
            <g fill="none" stroke="#9A7730" strokeWidth="1">
              {/* Multi-tier armillary rings */}
              <circle cx="0" cy="0" r="42" stroke="#641E16" strokeWidth="1.3" />
              <circle cx="0" cy="0" r="34" stroke="#9A7730" strokeWidth="0.8" strokeDasharray="3 2" />
              <circle cx="0" cy="0" r="25" stroke="#C49A45" strokeWidth="1" />
              <circle cx="0" cy="0" r="14" stroke="#9A7730" strokeWidth="0.8" />
              {/* Sūrya Central Sun */}
              <circle cx="0" cy="0" r="5" fill="#C49A45" stroke="#641E16" strokeWidth="1" />
              {/* 12 Zodiac spokes (Rāśi divisions) */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => {
                const rad = (deg * Math.PI) / 180;
                return (
                  <line
                    key={deg}
                    x1={14 * Math.cos(rad)}
                    y1={14 * Math.sin(rad)}
                    x2={42 * Math.cos(rad)}
                    y2={42 * Math.sin(rad)}
                    stroke="#9A7730"
                    strokeWidth={deg % 90 === 0 ? 1.2 : 0.6}
                    strokeDasharray={deg % 90 === 0 ? undefined : '2 2'}
                  />
                );
              })}
              {/* Planetary node markers (Navagraha: Chandra, Mangala, Budha, Guru, Shukra, Shani, Rahu, Ketu) */}
              <circle cx="20" cy="-15" r="2" fill="#641E16" />
              <circle cx="-25" cy="12" r="2.2" fill="#C49A45" />
              <circle cx="15" cy="24" r="1.8" fill="#9A7730" />
              <circle cx="-12" cy="-28" r="2" fill="#641E16" />
            </g>
            <text x="0" y="20" textAnchor="middle" fill="#9A7730" fontSize="7" letterSpacing="1" fontFamily="var(--font-title)" opacity="0.8">नवग्रह · नक्षत्र चक्र</text>
          </g>

          {/* 3. Saptarshi Mandala (Ursa Major 7 Rṣis) & Dhruva (North Star) */}
          <g transform="translate(1050, 505)">
            <g fill="none" stroke="#9A7730" strokeWidth="1">
              {/* Dhruva (Polaris) with brilliant starburst */}
              <circle cx="18" cy="-38" r="3" fill="#C49A45" />
              <line x1="18" y1="-44" x2="18" y2="-32" stroke="#641E16" strokeWidth="1" />
              <line x1="12" y1="-38" x2="24" y2="-38" stroke="#641E16" strokeWidth="1" />
              <text x="24" y="-40" fill="#641E16" fontSize="6.5" fontFamily="var(--font-sanskrit)" fontWeight="bold">ध्रुव</text>

              {/* Saptarshi constellation path (Kratu, Pulaha, Pulastya, Atri, Angiras, Vashistha, Marichi) */}
              <polyline
                points="-32,18 -16,22 4,14 -12,-4 -32,18 -12,-4 8,-18 24,-24 38,-20"
                stroke="#C49A45"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
              {/* Star nodes */}
              {[
                { x: -32, y: 18, name: 'ऋ' },
                { x: -16, y: 22, name: 'तु' },
                { x: 4, y: 14, name: 'पु' },
                { x: -12, y: -4, name: 'अ' },
                { x: 8, y: -18, name: 'अं' },
                { x: 24, y: -24, name: 'व' },
                { x: 38, y: -20, name: 'म' },
              ].map((star, i) => (
                <g key={i}>
                  <circle cx={star.x} cy={star.y} r="2.4" fill="#641E16" stroke="#9A7730" strokeWidth="0.8" />
                </g>
              ))}
              {/* Pointer line to Dhruva */}
              <line x1="-12" y1="-4" x2="18" y2="-38" stroke="#9A7730" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

              {/* Chandra Kalā (Crescent Moon) */}
              <path d="M-36 -28 A 12 12 0 0 0 -22 -14 A 9 9 0 0 1 -36 -28 Z" fill="#C49A45" opacity="0.8" />
            </g>
            <text x="0" y="48" textAnchor="middle" fill="#9A7730" fontSize="7" letterSpacing="1" fontFamily="var(--font-title)" opacity="0.8">सप्तर्षि मण्डल · ध्रुव तारा</text>
          </g>

          {/* 4. Floating Astrological & Astronomical symbols (Zodiac & Graha signs) */}
          <g fill="#9A7730" opacity="0.65" fontFamily="var(--font-sanskrit)" fontSize="10">
            <text x="990" y="175" fill="#641E16" fontWeight="bold">सूर्य</text>
            <text x="1102" y="180">चन्द्र</text>
            <text x="986" y="305">मेष</text>
            <text x="1106" y="325">वृषभ</text>
            <text x="988" y="445">बुध</text>
            <text x="1104" y="460">गुरु</text>
            <text x="990" y="585">शुक्र</text>
            <text x="1100" y="600">शनि</text>
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
          <circle cx="150" cy="700" r="26" />
          <circle cx="150" cy="700" r="14" />
          <circle cx="1050" cy="700" r="26" />
          <circle cx="1050" cy="700" r="14" />
        </g>
      </svg>
      <div className="ab-palace-glow" />
      <div className="ab-palace-scrim" />
    </div>
  );
}
