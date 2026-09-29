'use client';

import React from 'react';
import { CalculationResult } from '@/lib/math/types';
import { CheckCircle2, Award, Sparkles, AlertCircle } from 'lucide-react';

interface ResultBannerProps {
  result: CalculationResult;
}

export default function ResultBanner({ result }: ResultBannerProps) {
  return (
    <div className="parchment-card p-6 sm:p-8 border-2 border-[#C49A45] bg-[#FFF9EF] relative overflow-hidden space-y-5">
      
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#C49A45]">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-[#641E16] text-[#FFF9EF] flex items-center justify-center">
            <Sparkles className="w-5 h-5 fill-current" />
          </span>
          <div>
            <h4 className="font-serif font-black text-lg text-[#641E16] tracking-tight">
              Synthesized Vedic Result
            </h4>
            <p className="text-xs text-[#9A7730] font-medium">
              {result.methodUsed}
            </p>
          </div>
        </div>

        {/* Verification Tag */}
        {result.isVerified ? (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(79,122,58,0.1)] border border-[rgba(79,122,58,0.3)] text-[#4F7A3A] text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#4F7A3A]" />
            <span>Ground-Truth Verified (100% Match)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(140,43,27,0.08)] border border-[rgba(140,43,27,0.3)] text-[#8C2B1B] text-xs font-bold">
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
                  ? 'bg-[rgba(79,122,58,0.1)] border-[rgba(79,122,58,0.3)] text-[#4F7A3A]'
                  : 'bg-[rgba(140,43,27,0.08)] border-[rgba(140,43,27,0.3)] text-[#8C2B1B]'
              }`}
            >
              {result.finalAnswer}
            </div>
            {result.verdictText && (
              <p className="text-sm text-[#45352B] mt-3 font-medium">
                {result.verdictText}
              </p>
            )}
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-mono font-bold text-[#8C7763] uppercase tracking-widest block mb-2">
              Calculated Value
            </span>
            <div className="text-4xl sm:text-5xl md:text-6xl font-mono font-black text-[#641E16] tracking-tight">
              {result.finalAnswer}
            </div>
            {result.quotient !== undefined && result.remainder !== undefined && (
              <div className="flex items-center justify-center gap-6 mt-4 text-sm font-mono">
                <span className="bg-[#FFF9EF] px-4 py-1.5 rounded-lg border border-[#C49A45] text-[#45352B]">
                  Quotient: <strong className="text-[#641E16]">{result.quotient}</strong>
                </span>
                <span className="bg-[#FFF9EF] px-4 py-1.5 rounded-lg border border-[#C49A45] text-[#45352B]">
                  Remainder: <strong className="text-[#9A7730]">{result.remainder}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ground Truth Validation Box */}
      <div className="pt-4 border-t border-[#C49A45] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B5847] gap-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#9A7730]" />
          <span>Standard Hardware Arithmetic Match:</span>
          <code className="font-mono bg-[#FAF0DB] px-2.5 py-1 rounded text-[#4F7A3A] font-bold border border-[#C49A45]">
            {result.groundTruth}
          </code>
        </div>
        {result.notes && (
          <span className="text-[11px] text-[#8C7763] text-center sm:text-right font-mono">
            {result.notes}
          </span>
        )}
      </div>
    </div>
  );
}
