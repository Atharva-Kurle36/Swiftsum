'use client';

import React from 'react';

/** Subtle lotus divider — restrained single-row motif, kept away from body text. */
export function LotusDivider({ label }: { label?: string }) {
  return (
    <div className="manuscript-divider" aria-hidden="true">
      <span className="manuscript-motif">❖</span>
      <svg width="46" height="18" viewBox="0 0 46 18" fill="none" aria-hidden="true">
        <path d="M23 1 C26 6 26 11 23 16 C20 11 20 6 23 1 Z" stroke="#9A7730" strokeWidth="1.2" fill="none" />
        <path d="M14 4 C18 7 19 11 18 15 C14 12 13 8 14 4 Z" stroke="#9A7730" strokeWidth="1" fill="none" />
        <path d="M32 4 C33 8 32 12 28 15 C27 11 28 7 32 4 Z" stroke="#9A7730" strokeWidth="1" fill="none" />
        <path d="M5 8 C9 9 12 11 13 14 C9 14 6 12 5 8 Z" stroke="#9A7730" strokeWidth="1" fill="none" />
        <path d="M41 8 C40 12 37 14 33 14 C34 11 37 9 41 8 Z" stroke="#9A7730" strokeWidth="1" fill="none" />
      </svg>
      {label ? (
        <span className="font-serif italic text-sm" style={{ color: '#641E16' }}>{label}</span>
      ) : null}
      <span className="manuscript-motif">❖</span>
    </div>
  );
}

/** Small corner ornaments for manuscript cards. Render inside .corner-motifs container. */
export function CornerOrnaments() {
  return (
    <>
      <span className="corner tl" aria-hidden="true">◈</span>
      <span className="corner tr" aria-hidden="true">◈</span>
      <span className="corner bl" aria-hidden="true">◈</span>
      <span className="corner br" aria-hidden="true">◈</span>
    </>
  );
}

/**
 * Nalanda-inspired line illustration: stupa arch, pillared vihara arcade,
 * palm-leaf manuscript and yantra diagram — drawn as restrained gold/maroon line art.
 */
export function NalandaIllustration() {
  return (
    <svg viewBox="0 0 560 220" role="img" aria-label="Line illustration of Nalanda vihara arcade, stupa and palm-leaf manuscript"
      style={{ width: '100%', height: 'auto', display: 'block' }}>
      {/* ground line */}
      <line x1="30" y1="188" x2="530" y2="188" stroke="#9A7730" strokeWidth="1.5" />
      <line x1="60" y1="193" x2="500" y2="193" stroke="#C49A45" strokeWidth="1" />
      {/* central stupa */}
      <g stroke="#641E16" fill="none" strokeWidth="1.6">
        <path d="M250 188 L250 130 L310 130 L310 188" />
        <path d="M242 130 L318 130 L300 108 L260 108 Z" />
        <path d="M265 108 L265 92 L295 92 L295 108" />
        <line x1="280" y1="92" x2="280" y2="70" />
        <circle cx="280" cy="64" r="5" />
        <circle cx="280" cy="52" r="2.4" />
      </g>
      {/* left vihara arcade */}
      <g stroke="#641E16" fill="none" strokeWidth="1.4">
        <path d="M60 188 L60 120 L200 120 L200 188" />
        {[80, 105, 130, 155, 180].map(x => (
          <g key={x}>
            <line x1={x} y1="188" x2={x} y2="140" />
            <path d={`M${x - 12} 140 A12 12 0 0 1 ${x + 12} 140`} />
          </g>
        ))}
        <path d="M52 120 L208 120 L196 106 L64 106 Z" />
      </g>
      {/* right pillared hall */}
      <g stroke="#641E16" fill="none" strokeWidth="1.4">
        <path d="M360 188 L360 120 L500 120 L500 188" />
        {[380, 405, 430, 455, 480].map(x => (
          <g key={x}>
            <line x1={x} y1="188" x2={x} y2="140" />
            <path d={`M${x - 12} 140 A12 12 0 0 1 ${x + 12} 140`} />
          </g>
        ))}
        <path d="M352 120 L508 120 L496 106 L364 106 Z" />
      </g>
      {/* palm-leaf manuscript */}
      <g stroke="#9A7730" fill="none" strokeWidth="1.2">
        <path d="M150 44 C230 34 330 34 410 44 L410 62 C330 52 230 52 150 62 Z" />
        <line x1="180" y1="50" x2="380" y2="50" strokeWidth="1" />
        <line x1="200" y1="56" x2="360" y2="56" strokeWidth="0.8" />
        <circle cx="280" cy="53" r="3" fill="#C49A45" stroke="none" />
      </g>
      {/* small sun / jyotisa motif */}
      <g stroke="#9A7730" fill="none" strokeWidth="1.1">
        <circle cx="90" cy="52" r="14" />
        <circle cx="90" cy="52" r="7" />
        {[0, 45, 90, 135].map(a => (
          <line key={a} x1={90 - 20 * Math.cos(a * Math.PI / 180)} y1={52 - 20 * Math.sin(a * Math.PI / 180)}
            x2={90 - 26 * Math.cos(a * Math.PI / 180)} y2={52 - 26 * Math.sin(a * Math.PI / 180)} />
        ))}
      </g>
      {/* lotus base accents */}
      <g stroke="#9A7730" fill="none" strokeWidth="1.1">
        <path d="M250 200 C256 194 262 194 268 200 C262 206 256 206 250 200 Z" />
        <path d="M292 200 C298 194 304 194 310 200 C304 206 298 206 292 200 Z" />
      </g>
    </svg>
  );
}

/** Ashoka-inspired restrained capital accent (single chakra-line + lotus base). */
export function PillarAccent() {
  return (
    <svg width="72" height="40" viewBox="0 0 72 40" fill="none" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      <circle cx="36" cy="14" r="10" stroke="#9A7730" strokeWidth="1.3" />
      <circle cx="36" cy="14" r="3" stroke="#641E16" strokeWidth="1.2" />
      {[0, 30, 60, 90, 120, 150].map(a => (
        <line key={a}
          x1={36 + 4 * Math.cos(a * Math.PI / 180)} y1={14 + 4 * Math.sin(a * Math.PI / 180)}
          x2={36 + 9 * Math.cos(a * Math.PI / 180)} y2={14 + 9 * Math.sin(a * Math.PI / 180)}
          stroke="#9A7730" strokeWidth="1" />
      ))}
      <path d="M22 30 C28 26 44 26 50 30 C44 36 28 36 22 30 Z" stroke="#9A7730" strokeWidth="1.2" />
    </svg>
  );
}
