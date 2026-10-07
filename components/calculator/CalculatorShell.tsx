'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SUTRA_REGISTRY } from '@/lib/math/registry';
import { CalculationResult } from '@/lib/math/types';
import InputForm from './InputForm';
import StepPlayer from './StepPlayer';
import StepCard from './StepCard';
import DigitCrossGrid from './DigitCrossGrid';
import ResultBanner from './ResultBanner';
import { BookOpen, CheckCircle2, Cpu, Sparkles } from 'lucide-react';

function CalcSectionLabel({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 rounded-lg border border-[#E5A93C]/40 bg-[#1A1712] text-[#E5A93C] font-mono font-bold text-xs flex items-center justify-center shadow-[0_0_12px_rgba(229,169,60,0.15)] flex-shrink-0">
        {num}
      </span>
      <div>
        <div className="font-display text-base sm:text-lg text-[#F5F0E6] font-medium tracking-tight">
          {title}
        </div>
        <div className="font-sans text-xs text-[#A8A090]">
          {sub}
        </div>
      </div>
    </div>
  );
}

export default function CalculatorShell() {
  const searchParams = useSearchParams();
  const initialOp = searchParams.get('op') || 'multiplication';
  const initialA = searchParams.get('a') || '';
  const initialB = searchParams.get('b') || '';

  const [activeOpId, setActiveOpId] = useState<string>(
    SUTRA_REGISTRY[initialOp] ? initialOp : 'multiplication'
  );

  const activeConfig = SUTRA_REGISTRY[activeOpId] || SUTRA_REGISTRY.multiplication;

  // Calculation state
  const [calcResult, setCalcResult] = useState<CalculationResult>(() => {
    const a = initialA || activeConfig.presets[0]?.a || '98';
    const b = initialB || activeConfig.presets[0]?.b || '97';
    return activeConfig.calculate(a, b);
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // When tab changes, re-calculate with defaults
  const handleTabChange = (opId: string) => {
    setActiveOpId(opId);
    setIsPlaying(false);
    const newConfig = SUTRA_REGISTRY[opId];
    if (newConfig) {
      const defaultA = newConfig.presets[0]?.a || '85';
      const defaultB = newConfig.presets[0]?.b || '21';
      const res = newConfig.calculate(defaultA, defaultB);
      setCalcResult(res);
      setCurrentStep(1);
    }
  };

  const handleCalculate = (a: string, b?: string) => {
    setIsPlaying(false);
    const res = activeConfig.calculate(a, b);
    setCalcResult(res);
    setCurrentStep(1);
  };

  const activeStep = calcResult.steps[currentStep - 1] || calcResult.steps[0];
  const isFinalStep = currentStep === calcResult.steps.length;

  // Determine if we should display the digit cross grid (multiplication or squaring with crosswise method)
  const showDigitGrid =
    (activeOpId === 'multiplication' || activeOpId === 'squaring') &&
    calcResult.inputs.a &&
    (activeStep?.activeConnections?.length ?? 0) > 0;

  const gridNumA = calcResult.inputs.a;
  const gridNumB = activeOpId === 'squaring' ? calcResult.inputs.a : (calcResult.inputs.b || calcResult.inputs.a);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Section 00 — Page header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#A8A090] mb-3">
          Swiftsum Workspace · 5 Stages · Step-Scrubbable
        </p>
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="px-3.5 py-1.5 rounded-full border border-[#E5A93C]/35 bg-[#14120D] text-[#E5A93C] font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-[0_0_15px_rgba(229,169,60,0.12)]">
            <Cpu className="w-3.5 h-3.5 text-[#E5A93C]" />
            Parallel Vedic Arithmetic Workspace
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-medium text-[#F5F0E6] tracking-tight leading-[1.08] mb-3">
          Sūtra Computational Engine
        </h1>
        <p className="text-sm sm:text-base text-[#A8A090] font-light leading-relaxed max-w-2xl mx-auto">
          Experience classical Indian arithmetic algorithms through interactive digit-level coordinate manipulation, continuous ray tracking, and hardware-verified proofs.
        </p>
      </div>

      {/* Section 01 — Choose Sutra */}
      <section aria-label="Choose sutra" className="rounded-2xl border border-[#E5A93C]/20 bg-[#14120D]/90 backdrop-blur-md p-6 sm:p-7 mb-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
        <CalcSectionLabel num="01" title="Choose a Sūtra" sub="5 classical operations · auto-routed to the optimal mental algorithm" />
        
        {/* Sutra Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-2">
          {Object.values(SUTRA_REGISTRY).map(op => {
            const isActive = activeOpId === op.id;
            return (
              <button
                key={op.id}
                onClick={() => handleTabChange(op.id)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-mono cursor-pointer transition-all flex items-center gap-2.5 border ${
                  isActive
                    ? 'bg-[#E5A93C] text-[#0B0A08] border-[#FFD700] font-bold shadow-[0_0_20px_rgba(229,169,60,0.35)] scale-[1.02]'
                    : 'bg-[#1A1712] text-[#A8A090] border-[#E5A93C]/20 hover:text-[#E5A93C] hover:border-[#E5A93C]/40 hover:bg-[#201C15]'
                }`}
              >
                <span>{op.name}</span>
                <span className={`text-[10px] hidden md:inline font-mono ${isActive ? 'text-[#0B0A08]/75' : 'text-[#E5A93C]/70'}`}>
                  [{op.sanskrit.split('/')[0].trim()}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Sutra Info Callout */}
        <div className="mt-5 p-4 sm:p-5 rounded-xl border border-[#E5A93C]/25 bg-[#1A1712]/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-dev font-semibold text-lg sm:text-xl text-[#E5A93C]">
                {activeConfig.sanskrit}
              </span>
              <span className="border border-[#E5A93C]/30 bg-[#E5A93C]/10 text-[#E5A93C] font-mono text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Active Sūtra
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A8A090] font-light leading-relaxed max-w-2xl">
              {activeConfig.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/30 flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ground-Truth Verified</span>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Left Input Panel, Right Step Player & Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Inputs & Method info) */}
        <div className="lg:col-span-4 space-y-6">
          <section aria-label="Input parameters">
            <CalcSectionLabel num="02" title="Input Coordinates" sub="Choose historical presets or enter custom digits" />
            <InputForm
              config={activeConfig}
              initialA={initialA}
              initialB={initialB}
              onCalculate={handleCalculate}
            />
          </section>

          {/* Quick Summary Card */}
          <div className="rounded-2xl border border-[#E5A93C]/20 bg-[#14120D]/90 p-5 sm:p-6 shadow-xl space-y-3.5">
            <h4 className="font-display text-base sm:text-lg text-[#F5F0E6] font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#E5A93C]" />
              Sūtra Mechanics
            </h4>
            <p className="text-xs sm:text-sm text-[#A8A090] font-light leading-relaxed">
              In Indian Knowledge Systems (IKS), arithmetic algorithms are concise memory sūtras.
              They leverage base-10 positional decimal structure to convert multi-digit calculations into parallel coordinate cross-products without intermediate scratchpad clutter.
            </p>
            <div className="pt-3 border-t border-[#E5A93C]/15 flex items-center justify-between text-xs text-[#A8A090] font-mono">
              <span>Method: <strong className="text-[#E5A93C]">{calcResult.methodUsed}</strong></span>
              <span>Total Steps: <strong className="text-[#F5F0E6]">{calcResult.steps.length}</strong></span>
            </div>
          </div>
        </div>

        {/* Right Column (Visual Grid, Step Player, Step Card, Final Banner) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 03 — Visualization */}
          {showDigitGrid && (
            <section aria-label="Ray visualization">
              <CalcSectionLabel num="03" title="Vector Ray Visualizer" sub="Ūrdhva-Tiryag parallel coordinate cross-matrix" />
              <DigitCrossGrid
                numberA={gridNumA}
                numberB={gridNumB}
                activeConnections={activeStep?.activeConnections}
                activeDigits={activeStep?.activeDigits}
                currentFormula={activeStep?.formula}
                placedDigit={activeStep?.subResult?.includes('Digit:') ? parseInt(activeStep.subResult.split('Digit:')[1], 10) : undefined}
                carryOut={activeStep?.carryOut}
              />
            </section>
          )}

          {/* Section 04 — Step walkthrough */}
          <section aria-label="Step walkthrough">
            <CalcSectionLabel num="04" title="Step-by-Step Walkthrough" sub={`Step ${currentStep} of ${calcResult.steps.length} · scrub or auto-play through each coordinate`} />
            <div className="space-y-4">
              <StepPlayer
                currentStep={currentStep}
                totalSteps={calcResult.steps.length}
                isPlaying={isPlaying}
                onStepChange={step => setCurrentStep(step)}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                onReset={() => {
                  setIsPlaying(false);
                  setCurrentStep(1);
                }}
              />
              {activeStep && <StepCard step={activeStep} />}
            </div>
          </section>

          {/* Section 05 — Result */}
          <section aria-label="Verified result">
            <CalcSectionLabel num="05" title="Verified Result" sub={isFinalStep ? 'Synthesized result · hardware verified' : `Unlocks at final step (${calcResult.steps.length})`} />
            {isFinalStep ? (
              <ResultBanner result={calcResult} />
            ) : (
              <div className="rounded-2xl border border-dashed border-[#E5A93C]/30 bg-[#14120D]/60 p-6 text-center text-xs sm:text-sm text-[#A8A090]">
                Scrub to <strong className="text-[#E5A93C] font-mono">Step {calcResult.steps.length}</strong> or click <span className="text-[#E5A93C] font-medium">Play Steps</span> to synthesize the final verified result.
              </div>
            )}
          </section>

        </div>

      </div>

    </div>
  );
}
