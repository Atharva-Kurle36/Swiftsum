'use client';

import React, { useRef, useState, useEffect } from 'react';
import { DigitConnection } from '@/lib/math/types';

interface DigitCrossGridProps {
  numberA: string;
  numberB: string;
  activeConnections?: DigitConnection[];
  activeDigits?: {
    top?: number[];
    bottom?: number[];
  };
  currentFormula?: string;
  placedDigit?: number;
  carryOut?: number;
}

export default function DigitCrossGrid({
  numberA,
  numberB,
  activeConnections = [],
  activeDigits,
  currentFormula,
  placedDigit,
  carryOut,
}: DigitCrossGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topCoords, setTopCoords] = useState<Array<{ x: number; y: number }>>([]);
  const [bottomCoords, setBottomCoords] = useState<Array<{ x: number; y: number }>>([]);

  const topDigits = numberA.split('');
  const bottomDigits = numberB.split('');

  // Measure center positions of digit boxes relative to container
  const updateCoordinates = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const topElements = containerRef.current.querySelectorAll<HTMLElement>('.digit-top');
    const bottomElements = containerRef.current.querySelectorAll<HTMLElement>('.digit-bottom');

    const newTop: Array<{ x: number; y: number }> = [];
    topElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      newTop.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    });

    const newBottom: Array<{ x: number; y: number }> = [];
    bottomElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      newBottom.push({
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      });
    });

    setTopCoords(newTop);
    setBottomCoords(newBottom);
  };

  useEffect(() => {
    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    return () => window.removeEventListener('resize', updateCoordinates);
  }, [numberA, numberB, activeConnections]);

  // Re-measure when active connections change
  useEffect(() => {
    const timer = setTimeout(updateCoordinates, 50);
    return () => clearTimeout(timer);
  }, [activeConnections]);

  return (
    <div
      ref={containerRef}
      className="parchment-card p-6 sm:p-8 relative border border-[var(--parchment-border)] bg-[var(--parchment-card)] shadow-md overflow-hidden"
    >
      {/* Visual Header */}
      <div className="flex items-center justify-between mb-6 pb-2 border-b border-[var(--parchment-border)] text-xs text-[var(--ink-muted)]">
        <span className="font-semibold uppercase tracking-wider text-[var(--teal)]">
          Urdhva-Tiryagbhyam Crosswise Visualizer
        </span>
        <span className="font-mono text-[11px] bg-[var(--parchment)] px-2 py-0.5 rounded border border-[var(--parchment-border)]">
          Interactive Grid
        </span>
      </div>

      {/* Digits Display Container */}
      <div className="relative py-4 flex flex-col items-center gap-12 sm:gap-14">
        
        {/* Top Row: Number A */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 relative z-10">
          <span className="text-xs font-mono text-[var(--ink-light)] mr-1 hidden sm:inline">
            A:
          </span>
          {topDigits.map((digit, idx) => {
            const isActive = activeDigits?.top?.includes(idx) ?? activeConnections.some(c => c.topIndex === idx);
            return (
              <div
                key={`top-${idx}`}
                className={`digit-top w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-mono text-2xl sm:text-3xl font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--vermilion)] text-white shadow-lg shadow-[var(--vermilion-glow)] scale-110 border-2 border-[var(--vermilion-light)]'
                    : 'bg-[var(--parchment)] text-[var(--ink)] border border-[var(--parchment-border)]'
                }`}
              >
                {digit}
              </div>
            );
          })}
        </div>

        {/* Dynamic SVG Connecting Lines Layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9E2A2B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7B1F20" stopOpacity="0.95" />
            </linearGradient>
            <filter id="glow">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#9E2A2B" floodOpacity="0.4" />
            </filter>
          </defs>

          {activeConnections.map((conn, idx) => {
            const p1 = topCoords[conn.topIndex];
            const p2 = bottomCoords[conn.bottomIndex];
            if (!p1 || !p2) return null;

            // Compute curved or straight line
            const isVertical = Math.abs(p1.x - p2.x) < 5;
            const midY = (p1.y + p2.y) / 2;

            return (
              <g key={`conn-${conn.topIndex}-${conn.bottomIndex}-${idx}`}>
                {/* Glow under-stroke */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="rgba(158, 42, 43, 0.22)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Active connecting line */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="url(#lineGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
                {/* Center node indicator */}
                <circle
                  cx={(p1.x + p2.x) / 2}
                  cy={midY}
                  r="3.5"
                  fill="var(--gold)"
                />
              </g>
            );
          })}
        </svg>

        {/* Bottom Row: Number B */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 relative z-10">
          <span className="text-xs font-mono text-[var(--ink-light)] mr-1 hidden sm:inline">
            B:
          </span>
          {bottomDigits.map((digit, idx) => {
            const isActive = activeDigits?.bottom?.includes(idx) ?? activeConnections.some(c => c.bottomIndex === idx);
            return (
              <div
                key={`bot-${idx}`}
                className={`digit-bottom w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-mono text-2xl sm:text-3xl font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--vermilion)] text-white shadow-lg shadow-[var(--vermilion-glow)] scale-110 border-2 border-[var(--vermilion-light)]'
                    : 'bg-[var(--parchment)] text-[var(--ink)] border border-[var(--parchment-border)]'
                }`}
              >
                {digit}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Step Equation Banner below Grid */}
      {currentFormula && (
        <div className="mt-6 pt-4 border-t border-[var(--parchment-border)] bg-[rgba(236,224,194,0.45)] p-3.5 rounded-xl text-center">
          <span className="text-[11px] font-semibold text-[var(--ink-muted)] uppercase tracking-wider block mb-1">
            Active Cross-Multiplication Equation
          </span>
          <p className="font-mono text-sm sm:text-base font-bold text-[var(--ink)]">
            {currentFormula}
          </p>
          {(placedDigit !== undefined || carryOut !== undefined) && (
            <div className="flex items-center justify-center gap-4 mt-2 text-xs">
              {placedDigit !== undefined && (
                <span className="text-[var(--teal)] font-semibold">
                  Placed Digit: <strong className="font-mono text-sm">{placedDigit}</strong>
                </span>
              )}
              {carryOut !== undefined && carryOut > 0 && (
                <span className="text-[var(--vermilion)] font-semibold">
                  Carry to Next: <strong className="font-mono text-sm">{carryOut}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
