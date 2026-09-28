'use client';

import React from 'react';
import { CalculationResult } from '@/lib/math/types';
import { CheckCircle2, Award, Sparkles, AlertCircle } from 'lucide-react';

interface ResultBannerProps {
  result: CalculationResult;
}

export default function ResultBanner({ result }: ResultBannerProps) {
  return (
    <div className="parchment-card p-6 sm:p-8 border-2 border-[var(--gold)] bg-[var(--gold-surface)] shadow-lg relative overflow-hidden space-y-4">
      
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[rgba(169,129,47,0.25)]">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[var(--gold)] text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h4 className="font-serif font-bold text-base sm:text-lg text-[var(--ink)]">
              Final Vedic Result
            </h4>
            <p className="text-xs text-[var(--ink-muted)]">
              {result.methodUsed}
            </p>
          </div>
        </div>

        {/* Verification Tag */}
        {result.isVerified ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(41,76,72,0.1)] border border-[rgba(41,76,72,0.25)] text-[var(--teal)] text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[var(--teal)]" />
            <span>Ground-Truth Verified</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4" />
            <span>Verification Warning</span>
          </div>
        )}
      </div>

      {/* Main Answer Display */}
      <div className="text-center py-3">
        {result.operationId === 'divisibility' ? (
          <div>
            <div
              className={`inline-block text-xl sm:text-2xl font-bold px-6 py-3 rounded-xl border ${
                result.isDivisible
                  ? 'bg-[rgba(41,76,72,0.12)] border-[var(--teal)] text-[var(--teal)]'
                  : 'bg-[rgba(168,64,47,0.12)] border-[var(--vermilion)] text-[var(--vermilion)]'
              }`}
            >
              {result.finalAnswer}
            </div>
            {result.verdictText && (
              <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-2 font-medium">
                {result.verdictText}
              </p>
            )}
          </div>
        ) : (
          <div>
            <span className="text-xs font-semibold text-[var(--ink-light)] uppercase tracking-wider block mb-1">
              Calculated Value
            </span>
            <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-extrabold text-[var(--ink)] tracking-tight">
              {result.finalAnswer}
            </div>
            {result.quotient !== undefined && result.remainder !== undefined && (
              <div className="flex items-center justify-center gap-6 mt-3 text-sm font-mono">
                <span className="bg-[var(--parchment)] px-3 py-1 rounded border border-[var(--parchment-border)]">
                  Quotient: <strong>{result.quotient}</strong>
                </span>
                <span className="bg-[var(--parchment)] px-3 py-1 rounded border border-[var(--parchment-border)]">
                  Remainder: <strong>{result.remainder}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ground Truth Validation Box */}
      <div className="pt-3 border-t border-[rgba(169,129,47,0.25)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--ink-muted)] gap-2">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[var(--gold)]" />
          <span>Standard JS Arithmetic Match:</span>
          <code className="font-mono bg-[var(--parchment)] px-2 py-0.5 rounded text-[var(--ink)] font-semibold">
            {result.groundTruth}
          </code>
        </div>
        {result.notes && (
          <span className="text-[11px] italic text-[var(--ink-light)] text-center sm:text-right">
            {result.notes}
          </span>
        )}
      </div>

    </div>
  );
}
