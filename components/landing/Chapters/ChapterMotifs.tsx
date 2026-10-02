'use client';

import React from 'react';

// Step 4 (scrub), Chapter I only — more chapters append here after review.
// Motifs are pure inline SVG in existing tokens (maroon #641E16, gold
// #C49A45). Initial (hidden/drawing) states are applied by GSAP fromTo, NEVER
// in markup/CSS — so reduced-motion / no-JS renders the final state as-is.
// pathLength={1} + dasharray lets dashoffset animate 1 → 0 without measuring.

/** Śulba altar courses: brick lines draw in sequence, then the yantra altar reveals. */
export function ShulbaMotif() {
  return (
    <div className="scr-motif" aria-hidden="true">
      <svg viewBox="0 0 220 84" className="scr-svg">
        {/* Brick courses — drawn one after another (class hook for scrub). */}
        <g fill="none" stroke="#641E16" strokeWidth="2" strokeLinecap="round">
          <path className="scr-ch1-course" pathLength={1} strokeDasharray={1} d="M10 14 H150" />
          <path className="scr-ch1-course" pathLength={1} strokeDasharray={1} d="M10 30 H150" />
          <path className="scr-ch1-course" pathLength={1} strokeDasharray={1} d="M10 46 H150" />
          <path className="scr-ch1-course" pathLength={1} strokeDasharray={1} d="M30 6 V54" />
          <path className="scr-ch1-course" pathLength={1} strokeDasharray={1} d="M70 6 V54" />
          <path className="scr-ch1-course" pathLength={1} strokeDasharray={1} d="M110 6 V54" />
        </g>
        {/* Geometric altar — fades/scales in after the courses (hook below). */}
        <g className="scr-ch1-altar" fill="none" stroke="#C49A45" strokeWidth="2">
          <path pathLength={1} strokeDasharray={1} className="scr-ch1-altar-line" d="M168 66 L196 22 L224 66 Z" />
          <circle cx="196" cy="54" r="3.5" fill="#C49A45" stroke="none" className="scr-ch1-altar-dot" />
        </g>
      </svg>
    </div>
  );
}

/** Zero on the number line: axis draws, ticks pop, "0" scales in with a gold ring. */
export function ZeroMotif() {
  const ticks = [30, 70, 110, 150, 190];
  return (
    <div className="scr-motif" aria-hidden="true">
      <svg viewBox="0 0 220 84" className="scr-svg">
        <path className="scr-ch2-axis" pathLength={1} strokeDasharray={1} d="M14 52 H206"
          fill="none" stroke="#641E16" strokeWidth="2" strokeLinecap="round" />
        {ticks.map((x) => (
          <line key={x} className="scr-ch2-tick" x1={x} y1={44} x2={x} y2={60}
            stroke="#9A7730" strokeWidth="2" strokeLinecap="round" />
        ))}
        <circle className="scr-ch2-ring" pathLength={1} strokeDasharray={1} cx="110" cy="30" r="16"
          fill="none" stroke="#C49A45" strokeWidth="2" />
        <text className="scr-ch2-zero" x="110" y="41" textAnchor="middle"
          fontSize="30" fontWeight="700" fill="#641E16" fontFamily="Cinzel, serif">0</text>
      </svg>
    </div>
  );
}

/** Converging series: terms appear one at a time along an arc, then a
    circle draws with π at its centre — the convergence point. */
export function SeriesMotif() {
  const terms: Array<[string, number, number]> = [
    ['4', 28, 34],
    ['−4/3', 72, 28],
    ['+4/5', 122, 28],
    ['−4/7', 172, 34],
    ['…', 212, 40],
  ];
  return (
    <div className="scr-motif" aria-hidden="true">
      <svg viewBox="0 0 240 92" className="scr-svg">
        {terms.map(([t, x, y]) => (
          <text key={t} className="scr-ch3-term" x={x} y={y} textAnchor="middle"
            fontSize="17" fontStyle="italic" fill="#45352B" fontFamily="'Noto Serif', serif">{t}</text>
        ))}
        <circle className="scr-ch3-circle" pathLength={1} strokeDasharray={1} cx="120" cy="68" r="15"
          fill="none" stroke="#9A7730" strokeWidth="2" />
        <text className="scr-ch3-pi" x="120" y="75" textAnchor="middle"
          fontSize="17" fill="#641E16" fontFamily="'Noto Serif', serif">π</text>
      </svg>
    </div>
  );
}

/** Ramanujan's 4×4 magic square: grid draws, cells fill one by one, then a
    row, the diagonal and a column highlight in sequence. */
export function SquareMotif() {
  const cells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      cells.push(
        <rect key={`${r}-${c}`} className="scr-ch4-cell" x={14 + c * 23} y={6 + r * 23}
          width="21" height="21" rx="2" fill="rgba(196,154,69,0.16)"
          stroke="#9A7730" strokeWidth="1.2" />
      );
    }
  }
  return (
    <div className="scr-motif" aria-hidden="true">
      <svg viewBox="0 0 120 104" className="scr-svg">
        {cells}
        {/* Highlights sweep in sequence: row → diagonal → column. */}
        <rect className="scr-ch4-hl" x={14} y={52} width={92} height={21} rx="3"
          fill="none" stroke="#641E16" strokeWidth="2.5" />
        <path className="scr-ch4-hl" pathLength={1} strokeDasharray={1} d="M14 6 L106 98"
          fill="none" stroke="#641E16" strokeWidth="2.5" strokeLinecap="round" />
        <rect className="scr-ch4-hl" x={60} y={6} width={23} height={92} rx="3"
          fill="none" stroke="#641E16" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
