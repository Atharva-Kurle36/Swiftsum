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

  useEffect(() => {
    const timer = setTimeout(updateCoordinates, 50);
    return () => clearTimeout(timer);
  }, [activeConnections]);

  // Compute column power names (e.g. 10^0, 10^1) for place value grounding
  const maxLen = Math.max(topDigits.length, bottomDigits.length);

  return (
    <div
      ref={containerRef}
      className="parchment-card p-6 sm:p-8 relative border border-[var(--border-copper)] bg-[var(--bg-surface)] shadow-2xl overflow-hidden"
    >
      {/* Visual Header */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--border-subtle)] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-copper)] animate-pulse" />
          <span className="font-serif font-bold text-sm tracking-wide text-[var(--text-pure)] uppercase">
            Ūrdhva-Tiryagbhyām Vector Ray Visualizer
          </span>
        </div>
        <span className="font-mono text-[11px] text-[var(--accent-lapis)] bg-[rgba(56,189,248,0.1)] px-2.5 py-1 rounded-md border border-[rgba(56,189,248,0.25)]">
          Parallel Ray Matrix
        </span>
      </div>

      {/* Place Value Header Indicators */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2">
        <span className="w-8 hidden sm:inline" />
        <div className="flex items-center gap-3 sm:gap-4">
          {topDigits.map((_, idx) => {
            const power = topDigits.length - 1 - idx;
            return (
              <div
                key={`col-${idx}`}
                className="w-12 sm:w-14 text-center font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-wider"
              >
                10<sup>{power}</sup>
              </div>
            );
          })}
        </div>
      </div>

      {/* Digits Display Container */}
      <div className="relative py-4 flex flex-col items-center gap-14 sm:gap-16">
        
        {/* Top Row: Number A */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 relative z-10">
          <span className="text-xs font-mono font-bold text-[var(--accent-copper)] w-8 text-right hidden sm:inline select-none">
            A:
          </span>
          {topDigits.map((digit, idx) => {
            const isActive = activeDigits?.top?.includes(idx) ?? activeConnections.some(c => c.topIndex === idx);
            return (
              <div
                key={`top-${idx}`}
                className={`digit-top w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-mono text-2xl sm:text-3xl font-extrabold transition-all duration-300 select-none ${
                  isActive
                    ? 'bg-gradient-to-b from-[#F59E0B] to-[#D97706] text-[#090D16] shadow-xl shadow-[rgba(245,158,11,0.35)] scale-110 border-2 border-amber-200'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--text-pure)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
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
            <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.95" />
            </linearGradient>
            <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F59E0B" floodOpacity="0.65" />
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#38BDF8" floodOpacity="0.35" />
            </filter>
          </defs>

          {activeConnections.map((conn, idx) => {
            const p1 = topCoords[conn.topIndex];
            const p2 = bottomCoords[conn.bottomIndex];
            if (!p1 || !p2) return null;

            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            return (
              <g key={`conn-${conn.topIndex}-${conn.bottomIndex}-${idx}`}>
                {/* Wide soft ray aura */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="rgba(245, 158, 11, 0.25)"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Core Laser Ray Beam */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke="url(#laserBeamGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  filter="url(#laserGlow)"
                />
                {/* Center Node Convergence Indicator */}
                <circle
                  cx={midX}
                  cy={midY}
                  r="4"
                  fill="#FFF"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>

        {/* Bottom Row: Number B */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 relative z-10">
          <span className="text-xs font-mono font-bold text-[var(--accent-lapis)] w-8 text-right hidden sm:inline select-none">
            B:
          </span>
          {bottomDigits.map((digit, idx) => {
            const isActive = activeDigits?.bottom?.includes(idx) ?? activeConnections.some(c => c.bottomIndex === idx);
            return (
              <div
                key={`bot-${idx}`}
                className={`digit-bottom w-12 h-14 sm:w-14 sm:h-16 rounded-xl flex items-center justify-center font-mono text-2xl sm:text-3xl font-extrabold transition-all duration-300 select-none ${
                  isActive
                    ? 'bg-gradient-to-b from-[#38BDF8] to-[#0284C7] text-[#090D16] shadow-xl shadow-[rgba(56,189,248,0.35)] scale-110 border-2 border-sky-200'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--text-pure)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)]'
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
        <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] p-4 rounded-xl text-center border border-[var(--border-subtle)]">
          <span className="text-[10px] font-mono font-semibold text-[var(--accent-copper)] uppercase tracking-wider block mb-1">
            Active Coordinate Equation
          </span>
          <p className="font-mono text-base sm:text-lg font-bold text-[var(--text-pure)]">
            {currentFormula}
          </p>
          {(placedDigit !== undefined || carryOut !== undefined) && (
            <div className="flex items-center justify-center gap-6 mt-3 text-xs">
              {placedDigit !== undefined && (
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/25">
                  Placed Digit: <strong className="font-mono text-sm text-[var(--text-pure)]">{placedDigit}</strong>
                </span>
              )}
              {carryOut !== undefined && carryOut > 0 && (
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/25">
                  Carry to Next: <strong className="font-mono text-sm text-[var(--text-pure)]">{carryOut}</strong>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
