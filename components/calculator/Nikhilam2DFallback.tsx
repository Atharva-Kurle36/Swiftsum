'use client';

import React from 'react';
import { NikhilamLessonData, NikhilamChapter } from '@/lib/math/nikhilamLesson';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

interface Nikhilam2DFallbackProps {
  lesson: NikhilamLessonData;
  activeChapter: NikhilamChapter;
  onJumpToChapter?: (chapterId: number) => void;
}

export default function Nikhilam2DFallback({
  lesson,
  activeChapter,
}: Nikhilam2DFallbackProps) {
  const { a, b, base, numZeros, devA, devB, lhs, rawRhs, balancedLhs, balancedRhsStr, finalAnswer, groundTruth } = lesson;

  const formatDevSign = (val: number) => (val >= 0 ? `+${val}` : `−${Math.abs(val)}`);
  const devAFormatted = formatDevSign(devA);
  const devBFormatted = formatDevSign(devB);

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[460px] bg-black rounded-xl flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden border border-[#E5A93C]/15">
      
      {/* Background celestial ring motif matching landing page */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none flex items-center justify-center" aria-hidden="true">
        <div className="w-[420px] h-[420px] rounded-full border border-[#E5A93C] flex items-center justify-center">
          <div className="w-[300px] h-[300px] rounded-full border border-dashed border-[#E5A93C] flex items-center justify-center">
            <div className="w-[180px] h-[180px] rotate-45 border border-[#E5A93C]" />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeChapter.id}
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.99 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-full max-w-xl mx-auto flex flex-col items-center z-10 space-y-6"
        >

          {/* SCENE 1: INTRODUCTION */}
          {activeChapter.id === 1 && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5A93C]/30 bg-[#1A1712] text-[#E5A93C] text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Vedic Multiplication Algorithm
              </div>
              <div className="text-5xl sm:text-7xl font-display font-medium text-[#F5F0E6] tracking-tight py-4 flex items-center justify-center gap-5">
                <span className="text-[#FFD700]">{a}</span>
                <span className="text-[#A8A090] text-3xl sm:text-4xl font-light">×</span>
                <span className="text-[#FFD700]">{b}</span>
              </div>
              <p className="text-sm sm:text-base text-[#D1C9BE] max-w-md mx-auto leading-relaxed font-sans">
                Can we multiply these two numbers without tedious long multiplication? Because they sit close to <strong className="text-[#FFD700] font-mono">{base}</strong>, the Nikhilam sūtra solves this instantly through deficits alone.
              </p>
            </div>
          )}

          {/* SCENE 2: IDENTIFY BASE */}
          {activeChapter.id === 2 && (
            <div className="space-y-5 w-full">
              <div className="p-4 sm:p-5 rounded-2xl border border-[#E5A93C]/35 bg-[#14120D] shadow-xl inline-block">
                <span className="text-[10px] font-mono text-[#A8A090] uppercase tracking-[0.25em] block mb-1">
                  Mathematical Reference Benchmark
                </span>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700] tracking-wider">
                  BASE = {base}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                  <div className="text-2xl font-display font-bold text-[#F5F0E6]">{a}</div>
                  <div className="text-xs text-amber-400 mt-1 font-mono">
                    = {base} {devAFormatted}
                  </div>
                  <div className="text-[10px] text-[#A8A090] mt-1 font-sans">
                    {Math.abs(devA)} {devA < 0 ? 'deficit from' : 'surplus over'} base
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                  <div className="text-2xl font-display font-bold text-[#F5F0E6]">{b}</div>
                  <div className="text-xs text-amber-400 mt-1 font-mono">
                    = {base} {devBFormatted}
                  </div>
                  <div className="text-[10px] text-[#A8A090] mt-1 font-sans">
                    {Math.abs(devB)} {devB < 0 ? 'deficit from' : 'surplus over'} base
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 3: DEVIATIONS (Upright & Horizontal) */}
          {activeChapter.id === 3 && (
            <div className="space-y-4 w-full">
              <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                Signed Deviation Coordinate Register
              </span>
              <div className="flex items-center justify-center gap-6 max-w-md mx-auto py-2">
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/30 min-w-[130px]">
                  <span className="text-xs text-[#A8A090] font-mono">Factor 1</span>
                  <span className="text-3xl font-display font-bold text-[#F5F0E6]">{a}</span>
                  <span className="text-xs text-[#A8A090]">Deviation</span>
                  <span className="text-2xl font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                    {devAFormatted}
                  </span>
                </div>
                <div className="text-2xl font-light text-[#A8A090]">×</div>
                <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/30 min-w-[130px]">
                  <span className="text-xs text-[#A8A090] font-mono">Factor 2</span>
                  <span className="text-3xl font-display font-bold text-[#F5F0E6]">{b}</span>
                  <span className="text-xs text-[#A8A090]">Deviation</span>
                  <span className="text-2xl font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                    {devBFormatted}
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#A8A090] max-w-sm mx-auto">
                {devA < 0 && devB < 0
                  ? 'Both deviations are negative because both factors sit below base 100.'
                  : 'Signed deviations preserve algebraic orientation relative to base.'}
              </p>
            </div>
          )}

          {/* SCENE 4: CROSS-ADDITION */}
          {activeChapter.id === 4 && (
            <div className="space-y-4 w-full">
              <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                Crosswise Combination (Tiryag Yogah)
              </span>
              <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 space-y-3 max-w-md mx-auto">
                <div className="flex items-center justify-between text-sm sm:text-base font-mono border-b border-[#E5A93C]/15 pb-2">
                  <span className="text-[#A8A090]">Left Cross:</span>
                  <span className="text-[#F5F0E6]">{a} + ({devBFormatted}) = <strong className="text-[#FFD700]">{lhs}</strong></span>
                </div>
                <div className="flex items-center justify-between text-sm sm:text-base font-mono">
                  <span className="text-[#A8A090]">Right Cross:</span>
                  <span className="text-[#F5F0E6]">{b} + ({devAFormatted}) = <strong className="text-[#FFD700]">{lhs}</strong></span>
                </div>
              </div>
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-[#1A1712] border border-[#E5A93C]/40">
                <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-[0.2em] block mb-1">
                  Synthesized Left Part
                </span>
                <span className="text-4xl sm:text-5xl font-display font-bold text-[#FFD700]">{lhs}</span>
              </div>
            </div>
          )}

          {/* SCENE 5: MULTIPLY DEVIATIONS */}
          {activeChapter.id === 5 && (
            <div className="space-y-4 w-full">
              <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                Product of Deviations (Charamayorghatah)
              </span>
              <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-3">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#F5F0E6]">
                  ({devAFormatted}) × ({devBFormatted}) = <span className="text-[#FFD700]">+{rawRhs}</span>
                </div>
                <p className="text-xs text-[#A8A090] font-sans">
                  Multiplying two negative numbers yields a positive product.
                </p>
                <div className="pt-2 border-t border-[#E5A93C]/15 text-xs text-[#E5A93C] font-mono">
                  Base {base} has {numZeros} zeros ➔ Right part requires {numZeros} digits
                </div>
              </div>
              <div className="inline-block p-4 sm:p-5 rounded-2xl bg-[#1A1712] border border-amber-500/40">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-[0.2em] block mb-1">
                  Aligned Right Part
                </span>
                <span className="text-4xl sm:text-5xl font-display font-bold text-[#FFD700]">{balancedRhsStr}</span>
              </div>
            </div>
          )}

          {/* ── SCENE 6: REBUILT BALANCED LEFT & RIGHT PART COMPONENT LAYOUT (Requirement 5) ── */}
          {activeChapter.id === 6 && (
            <div className="space-y-6 w-full">
              <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                Synthesize Both Coordinate Halves
              </span>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                
                {/* Left Part Box */}
                <div className="flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl w-[150px] sm:w-[170px]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold mb-1 text-center whitespace-nowrap">
                    LEFT PART
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#FFD700] tracking-tight text-center leading-none">
                    {balancedLhs}
                  </span>
                </div>

                <span className="text-2xl sm:text-3xl font-light text-[#E5A93C]">|</span>

                {/* Right Part Box */}
                <div className="flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl w-[150px] sm:w-[170px]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold mb-1 text-center whitespace-nowrap">
                    RIGHT PART
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#FFD700] tracking-tight text-center leading-none">
                    {balancedRhsStr}
                  </span>
                </div>

              </div>

              <div className="text-xs sm:text-sm font-mono text-[#D1C9BE] bg-[#14120D] p-3.5 rounded-xl border border-[#E5A93C]/20 max-w-md mx-auto">
                {balancedLhs} × {base} + {balancedRhsStr} = <strong className="text-[#FFD700]">{finalAnswer}</strong>
              </div>
            </div>
          )}

          {/* SCENE 7: VERIFICATION */}
          {activeChapter.id === 7 && (
            <div className="space-y-4 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Proof Complete & Hardware Verified
              </div>
              <div className="text-5xl sm:text-7xl font-display font-bold text-[#FFD700] py-2">
                {finalAnswer}
              </div>
              <div className="p-3.5 rounded-xl bg-[#14120D] border border-emerald-500/30 text-xs font-mono text-[#A8A090] max-w-md mx-auto flex items-center justify-between">
                <span>Nikhilam Result: <strong className="text-[#F5F0E6]">{finalAnswer}</strong></span>
                <span>Verification: <strong className="text-emerald-400">{groundTruth} ✓</strong></span>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
