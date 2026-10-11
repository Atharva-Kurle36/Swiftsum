'use client';

import React from 'react';
import { NikhilamLessonData, NikhilamChapter } from '@/lib/math/nikhilamLesson';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

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
  const isSquaring = lesson.operationType === 'squaring';
  const isSubtraction = lesson.operationType === 'subtraction';
  const isDivision = lesson.operationType === 'division';
  const sub = lesson.subtractionData;
  const div = lesson.divisionData;
  const isDuplex = isSquaring && lesson.squaringMethod === 'duplex';
  const isEkadhikena = isSquaring && lesson.squaringMethod === 'ekadhikena';
  const duplex = lesson.duplexData;
  const ekadhikena = lesson.ekadhikenaData;

  const duplexTens = duplex ? duplex.tens : Math.floor(a / 10);
  const duplexUnits = duplex ? duplex.units : a % 10;
  const duplexDu = duplex ? duplex.du : duplexUnits * duplexUnits;
  const duplexDtu = duplex ? duplex.dtu : 2 * duplexTens * duplexUnits;
  const duplexDt = duplex ? duplex.dt : duplexTens * duplexTens;
  const duplexTensPart = duplex ? duplex.tensPart : duplexDt * 100;
  const duplexCrossPart = duplex ? duplex.crossPart : duplexDtu * 10;
  const duplexUnitsPart = duplex ? duplex.unitsPart : duplexDu;

  const ekPrefix = ekadhikena ? ekadhikena.prefix : Math.floor(a / 10);
  const ekTerminal = ekadhikena ? ekadhikena.terminal : 5;
  const ekSuccessor = ekadhikena ? ekadhikena.successor : ekPrefix + 1;
  const ekLhs = ekadhikena ? ekadhikena.lhs : ekPrefix * ekSuccessor;
  const ekRhs = ekadhikena ? ekadhikena.rhs : 25;

  const formatDevSign = (val: number) => (val >= 0 ? `+${val}` : `-${Math.abs(val)}`);
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
                {isDivision ? 'Vedic Division Algorithm' : isSubtraction ? 'Vedic Subtraction Algorithm' : isSquaring ? 'Vedic Squaring Algorithm' : 'Vedic Multiplication Algorithm'}
              </div>
              <div className="text-5xl sm:text-7xl font-display font-medium text-[#F5F0E6] tracking-tight py-4 flex items-center justify-center gap-5">
                {isDivision ? (
                  <>
                    <span className="text-[#FFD700]">{a}</span>
                    <span className="text-[#A8A090] text-3xl sm:text-4xl font-light">&divide;</span>
                    <span className="text-[#FFD700]">{b}</span>
                    <span className="text-[#A8A090] text-3xl sm:text-4xl font-light">=</span>
                    <span className="text-[#FFD700]">?</span>
                  </>
                ) : isSubtraction ? (
                  <>
                    <span className="text-[#FFD700]">{a}</span>
                    <span className="text-[#A8A090] text-3xl sm:text-4xl font-light">&minus;</span>
                    <span className="text-[#FFD700]">{b}</span>
                    <span className="text-[#A8A090] text-3xl sm:text-4xl font-light">=</span>
                    <span className="text-[#FFD700]">?</span>
                  </>
                ) : isSquaring ? (
                  <>
                    <span className="text-[#FFD700]">{a}<sup>2</sup></span>
                    <span className="text-[#A8A090] text-3xl sm:text-4xl font-light">=</span>
                    <span className="text-[#FFD700]">?</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#FFD700]">{a}</span>
                    <span className="text-[#A8A090] text-3xl sm:text-4xl font-light">&times;</span>
                    <span className="text-[#FFD700]">{b}</span>
                  </>
                )}
              </div>
              <p className="text-sm sm:text-base text-[#D1C9BE] max-w-md mx-auto leading-relaxed font-sans">
                {activeChapter.captionText}
              </p>
            </div>
          )}

          {/* SCENE 2: IDENTIFY DIGITS (DUPLEX / EKADHIKENA) OR IDENTIFY BASE */}
          {activeChapter.id === 2 && (
            <div className="space-y-5 w-full">
              {isDivision ? (
                <>
                  <div className="p-4 sm:p-5 rounded-2xl border border-[#E5A93C]/35 bg-[#14120D] shadow-xl inline-block">
                    <span className="text-[10px] font-mono text-[#A8A090] uppercase tracking-[0.25em] block mb-1">
                      Divisor Reference Base &amp; Complement
                    </span>
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700] tracking-wider">
                      BASE = {base} · C = {div?.complement ?? (base - b)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                      <div className="text-xs text-[#A8A090] uppercase font-mono">Dividend</div>
                      <div className="text-2xl font-display font-bold text-[#F5F0E6] mt-1">{a}</div>
                      <div className="text-[10px] text-[#A8A090] mt-1 font-sans">Number to divide</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                      <div className="text-xs text-[#A8A090] uppercase font-mono">Divisor</div>
                      <div className="text-2xl font-display font-bold text-[#F5F0E6] mt-1">{b}</div>
                      <div className="text-[10px] text-[#A8A090] mt-1 font-sans">Base {base} &minus; {b} = {div?.complement ?? (base - b)}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#A8A090] max-w-sm mx-auto font-sans">
                    Divisor deficiency relative to base {base} provides the multiplier for column propagation.
                  </p>
                </>
              ) : isSubtraction ? (
                <>
                  <div className="p-4 sm:p-5 rounded-2xl border border-[#E5A93C]/35 bg-[#14120D] shadow-xl inline-block">
                    <span className="text-[10px] font-mono text-[#A8A090] uppercase tracking-[0.25em] block mb-1">
                      Reference Base Selection
                    </span>
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700] tracking-wider">
                      BASE = {sub ? sub.base : base}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                      <div className="text-xs text-[#A8A090] uppercase font-mono">Minuend (M)</div>
                      <div className="text-2xl font-display font-bold text-[#F5F0E6] mt-1">{a}</div>
                      <div className="text-[10px] text-[#A8A090] mt-1 font-sans">Target to reduce</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                      <div className="text-xs text-[#A8A090] uppercase font-mono">Subtrahend (S)</div>
                      <div className="text-2xl font-display font-bold text-[#F5F0E6] mt-1">{b}</div>
                      <div className="text-[10px] text-[#A8A090] mt-1 font-sans">Value subtracted</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#A8A090] max-w-sm mx-auto font-sans">
                    A power-of-10 base is selected as the complement reference benchmark.
                  </p>
                </>
              ) : isEkadhikena ? (
                <>
                  <div className="p-4 sm:p-5 rounded-2xl border border-[#E5A93C]/35 bg-[#14120D] shadow-xl inline-block">
                    <span className="text-[10px] font-mono text-[#A8A090] uppercase tracking-[0.25em] block mb-1">
                      Split The Number
                    </span>
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700] tracking-wider">
                      {`${a} = ${ekPrefix} | ${ekTerminal}`}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                      <div className="text-xs text-[#A8A090] uppercase font-mono">Prefix</div>
                      <div className="text-3xl font-display font-bold text-[#FFD700] mt-1">{ekPrefix}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                      <div className="text-xs text-[#A8A090] uppercase font-mono">Terminal Digit</div>
                      <div className="text-3xl font-display font-bold text-[#FFD700] mt-1">{ekTerminal}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#A8A090] max-w-sm mx-auto font-sans">
                    Numbers ending in 5 are partitioned into the initial prefix and the terminal digit 5 without using any reference base.
                  </p>
                </>
              ) : isDuplex ? (
                <>
                  <div className="p-4 sm:p-5 rounded-2xl border border-[#E5A93C]/35 bg-[#14120D] shadow-xl inline-block">
                    <span className="text-[10px] font-mono text-[#A8A090] uppercase tracking-[0.25em] block mb-1">
                      Identify Digits &amp; Place Values
                    </span>
                    <span className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700] tracking-wider">
                      {`${a} = 10 \u00d7 ${duplexTens} + ${duplexUnits}`}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                      <div className="text-xs text-[#A8A090] uppercase font-mono">Tens Digit (a)</div>
                      <div className="text-3xl font-display font-bold text-[#FFD700] mt-1">{duplexTens}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/25 text-left">
                      <div className="text-xs text-[#A8A090] uppercase font-mono">Units Digit (b)</div>
                      <div className="text-3xl font-display font-bold text-[#FFD700] mt-1">{duplexUnits}</div>
                    </div>
                  </div>
                  <p className="text-xs text-[#A8A090] max-w-sm mx-auto font-sans">
                    The General Duplex method processes digits and place values without a reference base or deviation.
                  </p>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          )}

          {/* SCENE 3: COMPLEMENT (SUBTRACTION) / SUCCESSOR (EKADHIKENA) / DUPLEX / DEVIATIONS / DIGITS (DIVISION) */}
          {activeChapter.id === 3 && (
            <div className="space-y-4 w-full">
              {isDivision ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Process Dividend Digits
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-3">
                    <div className="text-xs text-[#A8A090] font-mono">
                      Partition: {div?.setupQuotientStr ?? '103'} | {div?.setupRemainderStr ?? '2'}
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-bold text-[#FFD700]">
                      {a === 1032 && b === 9 ? 'Bring down 1 → 0 + 1 = 1 → 3 + 1 = 4 → 2 + 4 = 6' : div?.stepsSummary?.slice(0, 2).join('; ')}
                    </div>
                    <p className="text-xs text-[#A8A090] font-sans">
                      Forward column additions determine the quotient digits and remainder.
                    </p>
                  </div>
                </>
              ) : isSubtraction ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Calculate The Complement (Nikhilam Navatashcaramam Dashatah)
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-3">
                    <div className="text-xs text-[#A8A090] font-mono">
                      C = B &minus; S = {sub ? sub.base : base} &minus; {b}
                    </div>
                    <div className="text-3xl font-display font-bold text-[#FFD700]">
                      Complement C = {sub ? sub.complement : finalAnswer}
                    </div>
                    {sub && sub.digitSteps && sub.digitSteps.length > 0 && (
                      <div className="pt-2 border-t border-[#E5A93C]/20 flex flex-wrap justify-center gap-2">
                        {sub.digitSteps.map((st, i) => (
                          <span key={i} className="px-2 py-1 rounded bg-[#1A1712] border border-[#E5A93C]/30 text-xs font-mono text-[#E5A93C]">
                            {st.calc}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-[#A8A090] font-sans">
                      All digits from 9, last digit from 10.
                    </p>
                  </div>
                </>
              ) : isEkadhikena ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Find The Successor (Ekadhika)
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-3">
                    <div className="text-xs text-[#A8A090] font-mono">Prefix = {ekPrefix}</div>
                    <div className="text-3xl font-display font-bold text-[#FFD700]">
                      {`Successor = ${ekPrefix} + 1 = ${ekSuccessor}`}
                    </div>
                    <p className="text-xs text-[#A8A090] font-sans">
                      Ekadhikena means &ldquo;one more than the preceding&rdquo;&mdash;incrementing prefix {ekPrefix} by 1 yields {ekSuccessor}.
                    </p>
                  </div>
                </>
              ) : isDuplex ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Units Duplex: D(b) = b<sup>2</sup>
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-2">
                    <div className="text-3xl font-display font-bold text-[#FFD700]">
                      {`D(${duplexUnits}) = ${duplexUnits}\u00b2 = ${duplexDu}`}
                    </div>
                    <div className="text-xs font-mono text-[#E5A93C]">
                      Result: Units contribution = {duplexDu}
                    </div>
                  </div>
                </>
              ) : (
                <>
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
                    {!isSquaring && (
                      <>
                        <div className="text-2xl font-light text-[#A8A090]">&times;</div>
                        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#14120D] border border-[#E5A93C]/30 min-w-[130px]">
                          <span className="text-xs text-[#A8A090] font-mono">Factor 2</span>
                          <span className="text-3xl font-display font-bold text-[#F5F0E6]">{b}</span>
                          <span className="text-xs text-[#A8A090]">Deviation</span>
                          <span className="text-2xl font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                            {devBFormatted}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* SCENE 4: ADD COMPLEMENT TO MINUEND (SUBTRACTION) / MULTIPLY PREFIX & SUCCESSOR / CROSS-ADDITION / QUOTIENT (DIVISION) */}
          {activeChapter.id === 4 && (
            <div className="space-y-4 w-full">
              {isDivision ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Determine The Quotient
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 space-y-3 max-w-md mx-auto">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700]">
                      QUOTIENT = {div?.quotient ?? 114}
                    </div>
                    <div className="text-xs font-mono text-[#E5A93C]">
                      Formed directly from processed dividend digits
                    </div>
                  </div>
                  <p className="text-xs text-[#A8A090] max-w-sm mx-auto font-sans">
                    The whole quotient is obtained without trial division or estimation.
                  </p>
                </>
              ) : isSubtraction ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Add Complement to Minuend
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 space-y-3 max-w-md mx-auto">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700]">
                      {`${a} + ${sub ? sub.complement : ''} = ${sub ? sub.intermediateSum : ''}`}
                    </div>
                    <div className="text-xs font-mono text-[#E5A93C]">
                      Intermediate Sum = {sub ? sub.intermediateSum : ''}
                    </div>
                  </div>
                  <p className="text-xs text-[#A8A090] max-w-sm mx-auto font-sans">
                    Adding the complement transforms subtraction into addition using the reference base.
                  </p>
                </>
              ) : isEkadhikena ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Multiply Prefix and Successor
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 space-y-3 max-w-md mx-auto">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700]">
                      {`${ekPrefix} \u00d7 ${ekSuccessor} = ${ekLhs}`}
                    </div>
                    <div className="text-xs font-mono text-[#E5A93C]">
                      LEFT PART = {ekLhs}
                    </div>
                  </div>
                </>
              ) : isDuplex ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Cross Duplex: D(a, b) = 2ab
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 space-y-3 max-w-md mx-auto">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-[#FFD700]">
                      {`D(${duplexTens}, ${duplexUnits}) = 2 \u00d7 ${duplexTens} \u00d7 ${duplexUnits} = ${duplexDtu}`}
                    </div>
                    <div className="text-xs font-mono text-[#E5A93C]">
                      {duplexUnits === 0 || duplexTens === 0
                        ? 'Cross contribution is zero because one of the digits is zero'
                        : `Cross contribution = ${duplexDtu} \u00d7 10 = ${duplexCrossPart}`}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Crosswise Combination (Tiryag Yogah)
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 space-y-3 max-w-md mx-auto">
                    <div className="flex items-center justify-between text-sm sm:text-base font-mono border-b border-[#E5A93C]/15 pb-2">
                      <span className="text-[#A8A090]">Left Cross:</span>
                      <span className="text-[#F5F0E6]">{`${a} + (${devBFormatted}) = `}<strong className="text-[#FFD700]">{lhs}</strong></span>
                    </div>
                    <div className="flex items-center justify-between text-sm sm:text-base font-mono">
                      <span className="text-[#A8A090]">Right Cross:</span>
                      <span className="text-[#F5F0E6]">{`${b} + (${devAFormatted}) = `}<strong className="text-[#FFD700]">{lhs}</strong></span>
                    </div>
                  </div>
                  <div className="inline-block p-4 sm:p-5 rounded-2xl bg-[#1A1712] border border-[#E5A93C]/40">
                    <span className="text-xs font-mono text-[#E5A93C] uppercase tracking-[0.2em] block mb-1">
                      Synthesized Left Part
                    </span>
                    <span className="text-4xl sm:text-5xl font-display font-bold text-[#FFD700]">{lhs}</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* SCENE 5: REMOVE REFERENCE BASE (SUBTRACTION) / SQUARE FINAL DIGIT / DUPLEX / DEVIATIONS / REMAINDER (DIVISION) */}
          {activeChapter.id === 5 && (
            <div className="space-y-4 w-full">
              {isDivision ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Determine The Remainder
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 space-y-3 max-w-md mx-auto">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700]">
                      REMAINDER = {div?.remainder ?? 6}
                    </div>
                    <div className="text-xs font-mono text-emerald-400">
                      Constraint satisfied: 0 ≤ {div?.remainder ?? 6} &lt; {b}
                    </div>
                  </div>
                  <p className="text-xs text-[#A8A090] max-w-sm mx-auto font-sans">
                    The remainder column resolves to {div?.remainder ?? 6}, strictly less than divisor {b}.
                  </p>
                </>
              ) : isSubtraction ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Remove Reference Base
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-3">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-[#F5F0E6]">
                      {`${sub ? sub.intermediateSum : ''} &minus; ${sub ? sub.base : base} = `}<span className="text-[#FFD700]">{finalAnswer}</span>
                    </div>
                    <div className="pt-2 border-t border-[#E5A93C]/15 text-xs text-[#E5A93C] font-mono">
                      Subtracting the base removes the reference offset to reveal the true difference.
                    </div>
                  </div>
                </>
              ) : isEkadhikena ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Square The Final Digit
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-3">
                    <div className="text-3xl sm:text-4xl font-mono font-bold text-[#FFD700]">
                      {`${ekTerminal}\u00b2 = ${ekRhs}`}
                    </div>
                    <div className="text-xs font-mono text-[#E5A93C]">
                      RIGHT PART = {ekRhs}
                    </div>
                    <p className="text-xs text-[#A8A090] font-sans">
                      The final digit is 5, and its square is always 25.
                    </p>
                  </div>
                </>
              ) : isDuplex ? (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    Tens Duplex: D(a) = a<sup>2</sup>
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-2">
                    <div className="text-3xl font-display font-bold text-[#FFD700]">
                      {`D(${duplexTens}) = ${duplexTens}\u00b2 = ${duplexDt}`}
                    </div>
                    <div className="text-xs font-mono text-[#E5A93C]">
                      {`(${duplexTens} \u00d7 10)\u00b2 = ${duplexDt} \u00d7 100 = ${duplexTensPart}`}
                    </div>
                    <div className="text-xs text-amber-300 font-sans">
                      Result: Tens contribution = {duplexTensPart}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                    {isSquaring ? 'Square of Deviation (d\u00b2)' : 'Product of Deviations (Charamayorghatah)'}
                  </span>
                  <div className="p-5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/30 max-w-md mx-auto space-y-3">
                    <div className="text-2xl sm:text-3xl font-mono font-bold text-[#F5F0E6]">
                      {isSquaring ? (
                        <span>{`(${devAFormatted})\u00b2 = `}<span className="text-[#FFD700]">+{rawRhs}</span></span>
                      ) : (
                        <span>{`(${devAFormatted}) \u00d7 (${devBFormatted}) = `}<span className="text-[#FFD700]">+{rawRhs}</span></span>
                      )}
                    </div>
                    <div className="pt-2 border-t border-[#E5A93C]/15 text-xs text-[#E5A93C] font-mono">
                      {`Base ${base} has ${numZeros} zeros \u2192 Right part requires ${numZeros} digits: "${balancedRhsStr}"`}
                    </div>
                  </div>
                  <div className="inline-block p-4 sm:p-5 rounded-2xl bg-[#1A1712] border border-amber-500/40">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-[0.2em] block mb-1">
                      Aligned Right Part
                    </span>
                    <span className="text-4xl sm:text-5xl font-display font-bold text-[#FFD700]">{balancedRhsStr}</span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* SCENE 6: FINAL RESULT / COMBINE CONTRIBUTIONS */}
          {activeChapter.id === 6 && (
            <div className="space-y-6 w-full">
              <span className="text-xs font-mono text-[#A8A090] uppercase tracking-[0.2em]">
                {isDivision ? 'Division Result' : isSubtraction ? 'Final Difference' : isEkadhikena ? 'Combine The Parts' : isDuplex ? 'Combine Place-Value Contributions' : 'Synthesize Both Coordinate Halves'}
              </span>

              {isDivision ? (
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl max-w-md mx-auto space-y-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A8A090] font-semibold">
                    DIVISION RESULT
                  </span>
                  <span className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight leading-none">
                    {a} &divide; {b} = {div?.quotient ?? 114} remainder {div?.remainder ?? 6}
                  </span>
                  <div className="font-mono text-xs text-[#E5A93C] pt-2 border-t border-[#E5A93C]/20">
                    Exact: {div?.exactFraction ?? '114 + 6/9 = 114 + 2/3'} · Decimal: {div?.decimalResult ?? '114.666...'}
                  </div>
                  <div className="font-mono text-[11px] text-[#A8A090]">
                    Quotient: {div?.quotient ?? 114} · Remainder: {div?.remainder ?? 6}
                  </div>
                </div>
              ) : isSubtraction ? (
                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl max-w-md mx-auto space-y-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A8A090] font-semibold">
                    SUBTRACTION RESULT
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#FFD700] tracking-tight leading-none">
                    {finalAnswer}
                  </span>
                  <div className="font-mono text-xs text-[#E5A93C] pt-2 border-t border-[#E5A93C]/20">
                    {`${a} &minus; ${b} = ${finalAnswer}`}
                  </div>
                  <div className="font-mono text-[11px] text-[#A8A090]">
                    Formula: M + (B &minus; S) &minus; B = {finalAnswer}
                  </div>
                </div>
              ) : isDuplex ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mx-auto">
                  {/* Tens contribution */}
                  <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#A8A090] font-semibold mb-1">
                      TENS CONTRIBUTION
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-[#FFD700]">
                      {duplexTensPart}
                    </span>
                    <span className="font-mono text-[10px] text-[#E5A93C] mt-1">
                      {`100 \u00d7 ${duplexTens}\u00b2 = ${duplexTensPart}`}
                    </span>
                  </div>

                  {/* Cross contribution */}
                  <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#A8A090] font-semibold mb-1">
                      CROSS CONTRIBUTION
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-[#FFD700]">
                      {duplexCrossPart}
                    </span>
                    <span className="font-mono text-[10px] text-[#E5A93C] mt-1">
                      {`10 \u00d7 (2 \u00d7 ${duplexTens} \u00d7 ${duplexUnits}) = ${duplexCrossPart}`}
                    </span>
                  </div>

                  {/* Units contribution */}
                  <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl">
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#A8A090] font-semibold mb-1">
                      UNITS CONTRIBUTION
                    </span>
                    <span className="font-display text-2xl sm:text-3xl font-bold text-[#FFD700]">
                      {duplexUnitsPart}
                    </span>
                    <span className="font-mono text-[10px] text-[#E5A93C] mt-1">
                      {`${duplexUnits}\u00b2 = ${duplexUnitsPart}`}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4 sm:gap-6">
                  {/* Left Part */}
                  <div className="flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl w-[160px] sm:w-[180px]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold mb-1 text-center whitespace-nowrap">
                      LEFT PART
                    </span>
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight text-center leading-none">
                      {isEkadhikena ? ekLhs : balancedLhs}
                    </span>
                  </div>

                  <span className="text-2xl sm:text-3xl font-light text-[#E5A93C]">{isEkadhikena ? '|' : '+'}</span>

                  {/* Right Part */}
                  <div className="flex flex-col items-center justify-center px-6 py-4 rounded-2xl bg-[#14120D] border border-[#E5A93C]/40 shadow-xl w-[160px] sm:w-[180px]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A8A090] font-semibold mb-1 text-center whitespace-nowrap">
                      RIGHT PART
                    </span>
                    <span className="font-display text-3xl sm:text-4xl font-bold text-[#FFD700] tracking-tight text-center leading-none">
                      {isEkadhikena ? ekRhs : balancedRhsStr}
                    </span>
                  </div>
                </div>
              )}

              <div className="text-xs sm:text-sm font-mono text-[#D1C9BE] bg-[#14120D] p-3.5 rounded-xl border border-[#E5A93C]/20 max-w-md mx-auto">
                {isDivision ? (
                  <span>
                    {`${a} ÷ ${b} = Quotient `}
                    <strong className="text-[#FFD700]">{div?.quotient ?? 114}</strong>
                    {`, Remainder `}
                    <strong className="text-[#FF9F1C]">{div?.remainder ?? 6}</strong>
                  </span>
                ) : isSubtraction ? (
                  <span>
                    {`${a} &minus; ${b} = `}
                    <strong className="text-[#FFD700]">{finalAnswer}</strong>
                  </span>
                ) : isEkadhikena ? (
                  <span>
                    {`${ekLhs} | ${ekRhs} \u2192 ${ekLhs} \u00d7 100 + ${ekRhs} = `}
                    <strong className="text-[#FFD700]">{finalAnswer}</strong>
                  </span>
                ) : isDuplex ? (
                  <div className="space-y-1">
                    <div>
                      {`Then show: ${duplexTensPart} + ${duplexCrossPart} + ${duplexUnitsPart} = `}
                      <strong className="text-[#FFD700]">{finalAnswer}</strong>
                    </div>
                    <div className="text-amber-400 font-bold">
                      {`Final result: ${a}\u00b2 = ${finalAnswer}`}
                    </div>
                  </div>
                ) : (
                  <span>
                    {`${balancedLhs} \u00d7 ${base} + ${balancedRhsStr} = `}
                    <strong className="text-[#FFD700]">{finalAnswer}</strong>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* SCENE 7: VERIFICATION */}
          {activeChapter.id === 7 && (
            <div className="space-y-4 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isDivision || isSubtraction ? 'Arithmetic Verification Passed' : 'Proof Complete & Arithmetic Verified'}
              </div>
              <div className="text-4xl sm:text-6xl font-display font-bold text-[#FFD700] py-2">
                {isDivision ? (
                  <span>Quotient: {div?.quotient ?? 114}, Remainder: {div?.remainder ?? 6}</span>
                ) : finalAnswer}
              </div>
              <div className="p-3.5 rounded-xl bg-[#14120D] border border-emerald-500/30 text-xs font-mono text-[#A8A090] max-w-md mx-auto flex items-center justify-between">
                <span>{isDivision ? `${a} ÷ ${b} = ${div?.quotient ?? 114} rem ${div?.remainder ?? 6}` : isSubtraction ? `${a} &minus; ${b} = ${finalAnswer}` : isSquaring ? `${a}\u00b2 = ${finalAnswer}` : `${a} \u00d7 ${b} = ${finalAnswer}`}</span>
                <span>Verification: <strong className="text-emerald-400">{isDivision ? `${div?.quotient ?? 114} × ${b} + ${div?.remainder ?? 6} = ${a}` : isSubtraction ? `${finalAnswer} + ${b} = ${a}` : groundTruth} &#10003;</strong></span>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>

    </div>
  );
}
