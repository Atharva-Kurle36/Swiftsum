'use client';

import React from 'react';
import { CalculationStep } from '@/lib/math/types';
import { ArrowDownCircle, Sparkles, HelpCircle, Compass, Target } from 'lucide-react';

interface StepCardProps {
  step: CalculationStep;
}

export default function StepCard({ step }: StepCardProps) {
  const hasStructuredDetails = !!(step.what || step.why || step.how);

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

      {/* Structured WHAT / WHY / HOW Explanation (Requirement 6) */}
      {hasStructuredDetails ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* WHAT */}
          <div className="p-4 rounded-xl bg-[#0B0A08]/90 border border-[#E5A93C]/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#FFD700] mb-2">
                <Target className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>1. What</span>
              </div>
              <p className="font-mono text-xs text-[#F5F0E6] leading-relaxed">
                {step.what}
              </p>
            </div>
            <span className="text-[10px] text-[#A8A090] mt-3 font-sans block border-t border-[#E5A93C]/10 pt-2">
              Specific mathematical operation
            </span>
          </div>

          {/* WHY */}
          <div className="p-4 rounded-xl bg-[#0B0A08]/90 border border-[#E5A93C]/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#E5A93C] mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>2. Why</span>
              </div>
              <p className="font-sans text-xs text-[#D1C9BE] leading-relaxed">
                {step.why}
              </p>
            </div>
            <span className="text-[10px] text-[#A8A090] mt-3 font-sans block border-t border-[#E5A93C]/10 pt-2">
              Underlying algebraic necessity
            </span>
          </div>

          {/* HOW */}
          <div className="p-4 rounded-xl bg-[#0B0A08]/90 border border-emerald-500/25 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                <span>3. How</span>
              </div>
              <p className="font-sans text-xs text-[#D1C9BE] leading-relaxed">
                {step.how}
              </p>
            </div>
            <span className="text-[10px] text-[#A8A090] mt-3 font-sans block border-t border-emerald-500/10 pt-2">
              Contribution to final answer
            </span>
          </div>
        </div>
      ) : (
        /* Fallback Plain-Language Explanation if what/why/how are not present */
        <div className="text-sm text-[#D1C9BE] leading-relaxed whitespace-pre-line bg-[#0B0A08]/75 p-4 sm:p-5 rounded-xl border border-[#E5A93C]/15 font-sans">
          {step.explanation}
        </div>
      )}

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
