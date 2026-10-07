'use client';

import React from 'react';
import { CalculationStep } from '@/lib/math/types';
import { ArrowDownCircle, Sparkles } from 'lucide-react';

interface StepCardProps {
  step: CalculationStep;
}

export default function StepCard({ step }: StepCardProps) {
  return (
    <div className="rounded-2xl border border-[#E5A93C]/20 bg-[#14120D]/90 backdrop-blur-md p-6 sm:p-7 shadow-xl space-y-5">
      
      {/* Step Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E5A93C]/15">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[#E5A93C] text-[#0B0A08] text-sm font-black flex items-center justify-center font-mono shadow-[0_0_10px_rgba(229,169,60,0.3)] flex-shrink-0">
            {step.stepNumber}
          </span>
          <h3 className="font-display font-medium text-lg sm:text-2xl text-[#F5F0E6] tracking-tight">
            {step.title}
          </h3>
        </div>
        <span className="border border-[#E5A93C]/30 bg-[#E5A93C]/10 text-[#E5A93C] font-mono text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
          Operation {step.stepNumber} of {step.totalSteps}
        </span>
      </div>

      {/* Sanskrit Sutra Tag */}
      <div className="flex items-center gap-2.5 text-xs text-[#E5A93C] bg-[#1A1712] px-4 py-2.5 rounded-xl border border-[#E5A93C]/25">
        <Sparkles className="w-4 h-4 flex-shrink-0 text-[#E5A93C]" />
        <span className="font-dev font-semibold text-base sm:text-lg">{step.sanskritSutra}</span>
      </div>

      {/* Plain-Language Explanation */}
      <div className="text-sm text-[#D1C9BE] leading-relaxed whitespace-pre-line bg-[#0B0A08]/75 p-4 sm:p-5 rounded-xl border border-[#E5A93C]/15 font-sans">
        {step.explanation}
      </div>

      {/* Formula & Subresult details */}
      {(step.formula || step.subResult) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {step.formula && (
            <div className="p-4 rounded-xl bg-[#1A1712] border border-[#E5A93C]/20">
              <span className="text-[10px] font-mono font-semibold text-[#A8A090] uppercase tracking-wider block mb-1">
                Active Equation
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#F5F0E6]">
                {step.formula}
              </span>
            </div>
          )}

          {step.subResult && (
            <div className="p-4 rounded-xl bg-[#1A1712] border border-[#E5A93C]/30">
              <span className="text-[10px] font-mono font-semibold text-[#E5A93C] uppercase tracking-wider block mb-1">
                Step Outcome
              </span>
              <span className="font-mono text-sm sm:text-base font-bold text-[#E5A93C]">
                {step.subResult}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Running Answer Bar */}
      <div className="pt-4 border-t border-[#E5A93C]/15 flex items-center justify-between text-xs sm:text-sm">
        <span className="text-[#A8A090] font-sans flex items-center gap-2">
          <ArrowDownCircle className="w-4 h-4 text-[#E5A93C]" />
          Accumulated Result Register:
        </span>
        <span className="font-mono font-bold text-base sm:text-lg text-[#E5A93C] bg-[#0B0A08] px-4 py-1.5 rounded-xl border border-[#E5A93C]/40 shadow-[0_0_15px_rgba(229,169,60,0.15)]">
          {step.accumulatedAnswer}
        </span>
      </div>

    </div>
  );
}
