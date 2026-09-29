'use client';

import React from 'react';

/**
 * Rich Mughal-palace-inspired backdrop for the pinned hero: geometric jaali
 * lattice, cusped-arch frames, hanging-lantern glows — pure CSS/SVG, no images.
 * Absolutely positioned inside the hero sheet; never sticky, never overlaps
 * other sections. A bright ivory centre keeps all text readable.
 */
export default function PalaceBackdrop() {
  return (
    <div className="ab-palace" aria-hidden="true">
      <div className="ab-palace-base" />
      <div className="ab-palace-lattice" />
      <svg className="ab-palace-arches" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice">
        {/* left cusped arch */}
        <g fill="none" stroke="#9A7730" strokeWidth="2.5" opacity="0.6">
          <path d="M60 720 L60 300 Q60 220 118 176 Q138 108 150 40 Q162 108 182 176 Q240 220 240 300 L240 720" />
          <path d="M84 720 L84 312 Q84 244 132 206 Q148 152 150 96 Q152 152 168 206 Q216 244 216 312 L216 720" opacity="0.7" />
          <circle cx="150" cy="30" r="7" />
        </g>
        {/* right cusped arch */}
        <g fill="none" stroke="#9A7730" strokeWidth="2.5" opacity="0.6">
          <path d="M960 720 L960 300 Q960 220 1018 176 Q1038 108 1050 40 Q1062 108 1082 176 Q1140 220 1140 300 L1140 720" />
          <path d="M984 720 L984 312 Q984 244 1032 206 Q1048 152 1050 96 Q1052 152 1068 206 Q1116 244 1116 312 L1116 720" opacity="0.7" />
          <circle cx="1050" cy="30" r="7" />
        </g>
        {/* hanging lanterns */}
        <g opacity="0.75">
          <line x1="330" y1="0" x2="330" y2="70" stroke="#9A7730" strokeWidth="2" />
          <path d="M312 96 L330 70 L348 96 L340 150 L320 150 Z" fill="rgba(196,154,69,0.25)" stroke="#9A7730" strokeWidth="2" />
          <circle cx="330" cy="112" r="9" fill="#E9B94E" opacity="0.9" />
          <line x1="870" y1="0" x2="870" y2="70" stroke="#9A7730" strokeWidth="2" />
          <path d="M852 96 L870 70 L888 96 L880 150 L860 150 Z" fill="rgba(196,154,69,0.25)" stroke="#9A7730" strokeWidth="2" />
          <circle cx="870" cy="112" r="9" fill="#E9B94E" opacity="0.9" />
        </g>
        {/* floor medallions */}
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
