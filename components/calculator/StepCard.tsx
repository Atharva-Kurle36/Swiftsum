'use client';

import React from 'react';
import { CalculationStep } from '@/lib/math/types';
import { BookOpen, ArrowDownCircle, Check, Sparkles } from 'lucide-react';

interface StepCardProps {
  step: CalculationStep;
}

export default function StepCard({ step }: StepCardProps) {
  return (
    <div className="parchment-card p-6 sm:p-7 border border-[var(--border-medium)] bg-[var(--bg-surface)] shadow-xl space-y-5">
      
      {/* Step Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[var(--accent-copper)] text-[#090D16] text-xs font-black flex items-center justify-center font-mono shadow-md shadow-[rgba(245,158,11,0.25)]">
            {step.stepNumber}
          </span>
          <h3 className="font-serif font-black text-base sm:text-xl text-[var(--text-pure)] tracking-tight">
            {step.title}
          </h3>
        </div>
        <span className="vedic-badge gold text-[10px]">
          Operation {step.stepNumber} of {step.totalSteps}
        </span>
      </div>

      {/* Sanskrit Sutra Tag */}
      <div className="flex items-center gap-2.5 text-xs text-[var(--accent-copper)] bg-[rgba(245,158,11,0.08)] px-3.5 py-2 rounded-xl border border-[var(--border-copper)]">
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[var(--accent-copper)]" />
        <span className="sanskrit-title font-bold text-sm">{step.sanskritSutra}</span>
      </div>

      {/* Plain-Language Explanation */}
      <div className="text-xs sm:text-sm text-[var(--text-pure)] leading-relaxed whitespace-pre-line bg-[var(--bg-surface-subtle)] p-4 rounded-xl border border-[var(--border-subtle)] font-sans">
        {step.explanation}
      </div>

      {/* Formula & Subresult details */}
      {(step.formula || step.subResult) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {step.formula && (
            <div className="p-3.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
              <span className="text-[10px] font-mono font-semibold text-[var(--text-dim)] uppercase tracking-wider block mb-1">
                Active Equation
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-pure)]">
                {step.formula}
              </span>
            </div>
          )}

          {step.subResult && (
            <div className="p-3.5 rounded-xl bg-[rgba(56,189,248,0.08)] border border-[rgba(56,189,248,0.25)]">
              <span className="text-[10px] font-mono font-semibold text-[var(--accent-lapis)] uppercase tracking-wider block mb-1">
                Step Outcome
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--text-pure)]">
                {step.subResult}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Running Answer Bar */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
        <span className="text-[var(--text-muted)] font-medium flex items-center gap-2">
          <ArrowDownCircle className="w-4 h-4 text-[var(--accent-copper)]" />
          Accumulated Result Register:
        </span>
        <span className="font-mono font-extrabold text-sm sm:text-base text-[var(--accent-copper)] bg-[var(--bg-surface-subtle)] px-3.5 py-1 rounded-lg border border-[var(--border-copper)]">
          {step.accumulatedAnswer}
        </span>
      </div>

    </div>
  );
}
