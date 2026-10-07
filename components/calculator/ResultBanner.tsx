'use client';

import React from 'react';
import { CalculationResult } from '@/lib/math/types';
import { CheckCircle2, Award, Sparkles, AlertCircle } from 'lucide-react';

interface ResultBannerProps {
  result: CalculationResult;
}

export default function ResultBanner({ result }: ResultBannerProps) {
  return (
    <div className="rounded-2xl border-2 border-[#E5A93C]/40 bg-[#14120D]/95 backdrop-blur-md p-6 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(229,169,60,0.15)] relative overflow-hidden space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E5A93C]/15">
        <div className="flex items-center gap-3.5">
          <span className="w-10 h-10 rounded-xl bg-[#E5A93C] text-[#0B0A08] flex items-center justify-center shadow-[0_0_15px_rgba(229,169,60,0.4)] flex-shrink-0">
            <Sparkles className="w-5 h-5 fill-current" />
          </span>
          <div>
            <h4 className="font-display font-medium text-xl sm:text-2xl text-[#F5F0E6] tracking-tight">
              Synthesized Vedic Result
            </h4>
            <p className="text-xs text-[#A8A090] font-sans">
              Method: <span className="text-[#E5A93C] font-mono">{result.methodUsed}</span>
            </p>
          </div>
        </div>

        {/* Verification Tag */}
        {result.isVerified ? (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ground-Truth Verified (100% Match)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>Verification Flag</span>
          </div>
        )}
      </div>

      {/* Main Answer Display */}
      <div className="text-center py-4">
        {result.operationId === 'divisibility' ? (
          <div>
            <div
              className={`inline-block text-2xl sm:text-4xl font-mono font-bold px-8 py-4 rounded-2xl border ${
                result.isDivisible
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.15)]'
                  : 'bg-red-500/10 border-red-500/40 text-red-400 shadow-[0_0_20px_rgba(248,113,113,0.15)]'
              }`}
            >
              {result.finalAnswer}
            </div>
            {result.verdictText && (
              <p className="text-sm text-[#D1C9BE] mt-3 font-sans max-w-xl mx-auto">
                {result.verdictText}
              </p>
            )}
          </div>
        ) : (
          <div>
            <span className="text-[11px] font-mono font-bold text-[#A8A090] uppercase tracking-[0.25em] block mb-2">
              Calculated Value
            </span>
            <div className="text-4xl sm:text-6xl md:text-7xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#E5A93C] to-[#FF9F1C] tracking-tight drop-shadow-[0_0_25px_rgba(229,169,60,0.25)]">
              {result.finalAnswer}
            </div>
            {result.quotient !== undefined && result.remainder !== undefined && (
              <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-sm font-mono">
                <span className="bg-[#1A1712] px-5 py-2 rounded-xl border border-[#E5A93C]/25 text-[#F5F0E6]">
                  Quotient: <strong className="text-[#E5A93C]">{result.quotient}</strong>
                </span>
                <span className="bg-[#1A1712] px-5 py-2 rounded-xl border border-[#E5A93C]/25 text-[#F5F0E6]">
                  Remainder: <strong className="text-[#FF9F1C]">{result.remainder}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Ground Truth Validation Box */}
      <div className="pt-5 border-t border-[#E5A93C]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A8A090] gap-3">
        <div className="flex items-center gap-2.5">
          <Award className="w-4 h-4 text-[#E5A93C]" />
          <span>Standard Hardware Arithmetic Match:</span>
          <code className="font-mono bg-[#0B0A08] px-3 py-1 rounded-lg text-emerald-400 font-bold border border-emerald-500/30">
            {result.groundTruth}
          </code>
        </div>
        {result.notes && (
          <span className="text-[11px] text-[#A8A090] text-center sm:text-right font-mono">
            {result.notes}
          </span>
        )}
      </div>
    </div>
  );
}
