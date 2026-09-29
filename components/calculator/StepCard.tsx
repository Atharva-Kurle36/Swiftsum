'use client';

import React from 'react';
import { CalculationStep } from '@/lib/math/types';
import { BookOpen, ArrowDownCircle, Check, Sparkles } from 'lucide-react';

interface StepCardProps {
  step: CalculationStep;
}

export default function StepCard({ step }: StepCardProps) {
  return (
    <div className="parchment-card p-6 sm:p-7 border border-[#C49A45] bg-[#FFF9EF] space-y-5">
      
      {/* Step Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C49A45]">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-[#641E16] text-[#FFF9EF] text-xs font-black flex items-center justify-center font-mono">
            {step.stepNumber}
          </span>
          <h3 className="font-serif font-black text-base sm:text-xl text-[#641E16] tracking-tight">
            {step.title}
          </h3>
        </div>
        <span className="vedic-badge text-[10px] bg-[#FAF0DB] text-[#641E16] border border-[#C49A45]">
          Operation {step.stepNumber} of {step.totalSteps}
        </span>
      </div>

      {/* Sanskrit Sutra Tag */}
      <div className="flex items-center gap-2.5 text-xs text-[#641E16] bg-[#FAF0DB] px-3.5 py-2 rounded-xl border border-[#C49A45]">
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-[#9A7730]" />
        <span className="sanskrit-title font-bold text-sm">{step.sanskritSutra}</span>
      </div>

      {/* Plain-Language Explanation */}
      <div className="text-xs sm:text-sm text-[#45352B] leading-relaxed whitespace-pre-line bg-[#FFFEF9] p-4 rounded-xl border border-[#C49A45] font-sans">
        {step.explanation}
      </div>

      {/* Formula & Subresult details */}
      {(step.formula || step.subResult) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {step.formula && (
            <div className="p-3.5 rounded-xl bg-[#FFF9EF] border border-[#C49A45]">
              <span className="text-[10px] font-mono font-semibold text-[#8C7763] uppercase tracking-wider block mb-1">
                Active Equation
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#45352B]">
                {step.formula}
              </span>
            </div>
          )}

          {step.subResult && (
            <div className="p-3.5 rounded-xl bg-[#FAF0DB] border border-[#C49A45]">
              <span className="text-[10px] font-mono font-semibold text-[#9A7730] uppercase tracking-wider block mb-1">
                Step Outcome
              </span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#45352B]">
                {step.subResult}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Running Answer Bar */}
      <div className="pt-4 border-t border-[#C49A45] flex items-center justify-between text-xs">
        <span className="text-[#6B5847] font-medium flex items-center gap-2">
          <ArrowDownCircle className="w-4 h-4 text-[#9A7730]" />
          Accumulated Result Register:
        </span>
        <span className="font-mono font-extrabold text-sm sm:text-base text-[#641E16] bg-[#FAF0DB] px-3.5 py-1 rounded-lg border border-[#C49A45]">
          {step.accumulatedAnswer}
        </span>
      </div>

    </div>
  );
}
