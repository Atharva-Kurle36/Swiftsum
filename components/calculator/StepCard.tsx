'use client';

import React from 'react';
import { CalculationStep } from '@/lib/math/types';
import { BookOpen, ArrowDownCircle, Check, Info } from 'lucide-react';

interface StepCardProps {
  step: CalculationStep;
}

export default function StepCard({ step }: StepCardProps) {
  return (
    <div className="parchment-card p-6 sm:p-7 border border-[var(--parchment-border)] bg-[var(--parchment-card)] shadow-md space-y-4">
      
      {/* Step Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--parchment-border)]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[var(--vermilion)] text-white text-xs font-bold flex items-center justify-center font-mono">
            {step.stepNumber}
          </span>
          <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--ink)]">
            {step.title}
          </h3>
        </div>
        <span className="vedic-badge gold text-[10px]">
          Step {step.stepNumber} of {step.totalSteps}
        </span>
      </div>

      {/* Sanskrit Sutra Tag */}
      <div className="flex items-center gap-2 text-xs text-[var(--gold)] bg-[rgba(169,129,47,0.08)] px-3 py-1.5 rounded-lg border border-[rgba(169,129,47,0.2)]">
        <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="sanskrit-title font-medium">{step.sanskritSutra}</span>
      </div>

      {/* Plain-Language Explanation */}
      <div className="text-xs sm:text-sm text-[var(--ink)] leading-relaxed whitespace-pre-line bg-[rgba(248,243,230,0.5)] p-4 rounded-xl border border-[var(--parchment-border)]">
        {step.explanation}
      </div>

      {/* Formula & Subresult details */}
      {(step.formula || step.subResult) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {step.formula && (
            <div className="p-3 rounded-lg bg-[var(--parchment)] border border-[var(--parchment-border)]">
              <span className="text-[11px] font-semibold text-[var(--ink-light)] uppercase tracking-wider block mb-1">
                Active Equation
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--ink)]">
                {step.formula}
              </span>
            </div>
          )}

          {step.subResult && (
            <div className="p-3 rounded-lg bg-[rgba(41,76,72,0.07)] border border-[rgba(41,76,72,0.2)]">
              <span className="text-[11px] font-semibold text-[var(--teal)] uppercase tracking-wider block mb-1">
                Step Outcome
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[var(--teal)]">
                {step.subResult}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Running Answer Bar */}
      <div className="pt-3 border-t border-[var(--parchment-border)] flex items-center justify-between text-xs">
        <span className="text-[var(--ink-muted)] font-medium flex items-center gap-1.5">
          <ArrowDownCircle className="w-3.5 h-3.5 text-[var(--gold)]" />
          Accumulated Digits So Far:
        </span>
        <span className="font-mono font-bold text-sm sm:text-base text-[var(--ink)] bg-[var(--parchment)] px-3 py-1 rounded-md border border-[var(--parchment-border)]">
          {step.accumulatedAnswer}
        </span>
      </div>

    </div>
  );
}
