'use client';

import React from 'react';
import { CalculationResult } from '@/lib/math/types';
import { CheckCircle2, Award, Sparkles, AlertCircle } from 'lucide-react';

interface ResultBannerProps {
  result: CalculationResult;
}

export default function ResultBanner({ result }: ResultBannerProps) {
  return (
    <div className="parchment-card p-6 sm:p-8 border-2 border-[var(--border-copper)] bg-[var(--bg-surface)] shadow-2xl relative overflow-hidden space-y-5">
      
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-[#090D16] flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 fill-current" />
          </span>
          <div>
            <h4 className="font-serif font-black text-lg text-[var(--text-pure)] tracking-tight">
              Synthesized Vedic Result
            </h4>
            <p className="text-xs text-[var(--accent-copper)] font-medium">
              {result.methodUsed}
            </p>
          </div>
        </div>

        {/* Verification Tag */}
        {result.isVerified ? (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ground-Truth Verified (100% Match)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Verification Flag</span>
          </div>
        )}
      </div>

      {/* Main Answer Display */}
      <div className="text-center py-4">
        {result.operationId === 'divisibility' ? (
          <div>
            <div
              className={`inline-block text-2xl sm:text-3xl font-mono font-bold px-8 py-3.5 rounded-2xl border ${
                result.isDivisible
                  ? 'bg-emerald-500/15 border-emerald-400 text-emerald-400'
                  : 'bg-rose-500/15 border-rose-400 text-rose-400'
              }`}
            >
              {result.finalAnswer}
            </div>
            {result.verdictText && (
              <p className="text-sm text-[var(--text-muted)] mt-3 font-medium">
                {result.verdictText}
              </p>
            )}
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-mono font-bold text-[var(--text-dim)] uppercase tracking-widest block mb-2">
              Calculated Value
            </span>
            <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-black text-[var(--text-pure)] tracking-tight">
              {result.finalAnswer}
            </div>
            {result.quotient !== undefined && result.remainder !== undefined && (
              <div className="flex items-center justify-center gap-6 mt-4 text-sm font-mono">
                <span className="bg-[var(--bg-surface-elevated)] px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-pure)]">
                  Quotient: <strong className="text-[var(--accent-copper)]">{result.quotient}</strong>
                </span>
                <span className="bg-[var(--bg-surface-elevated)] px-4 py-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-pure)]">
                  Remainder: <strong className="text-[var(--accent-lapis)]">{result.remainder}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ground Truth Validation Box */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[var(--accent-copper)]" />
          <span>Standard Hardware Arithmetic Match:</span>
          <code className="font-mono bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded text-emerald-400 font-bold border border-[var(--border-subtle)]">
            {result.groundTruth}
          </code>
        </div>
        {result.notes && (
          <span className="text-[11px] text-[var(--text-dim)] text-center sm:text-right font-mono">
            {result.notes}
          </span>
        )}
      </div>
    </div>
  );
}
