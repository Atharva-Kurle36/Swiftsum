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
import { BookOpen, CheckCircle2, Cpu } from 'lucide-react';

function CalcSectionLabel({ num, title, sub }: { num: string; title: string; sub: string }) {
  return (
    <div className="calc-section-label">
      <span className="calc-section-num">{num}</span>
      <div>
        <div className="calc-section-title">{title}</div>
        <div className="calc-section-sub">{sub}</div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section 00 — Page header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <p className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-[#8C7763] mb-3">
          Workspace · 5 Sections · Step-Scrubbable
        </p>
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="vedic-badge gold border border-[#C49A45] bg-[#FAF0DB] text-[#641E16]">
            <Cpu className="w-3.5 h-3.5 text-[#9A7730]" />
            Parallel Vedic Arithmetic Workspace
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#641E16] tracking-tight">
          Sutra Computational Engine
        </h1>
        <p className="text-sm sm:text-base text-[#45352B] mt-2">
          Follow five clearly separated stages — choose a sūtra, enter coordinates, visualize rays, scrub steps, verify the result.
        </p>
      </div>

      {/* Section 01 — Choose Sutra */}
      <section aria-label="Choose sutra" className="parchment-card p-5 sm:p-6 mb-6">
        <CalcSectionLabel num="01" title="Choose a Sūtra" sub="5 classical operations · auto-routed to fastest method" />
        <div className="flex flex-wrap items-center justify-center gap-2.5 pb-1">
          {Object.values(SUTRA_REGISTRY).map(op => (
            <button
              key={op.id}
              onClick={() => handleTabChange(op.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center gap-2 border ${
                activeOpId === op.id
                  ? 'bg-[#641E16] text-[#FFF9EF] border-[#C49A45]'
                  : 'bg-[#FFF9EF] text-[#45352B] border-[#C49A45] hover:bg-[#FAF0DB]'
              }`}
            >
              <span>{op.name}</span>
              <span className="text-[10px] opacity-75 hidden md:inline font-mono">
                [{op.sanskrit.split('/')[0].trim()}]
              </span>
            </button>
          ))}
        </div>
        {/* Active Sutra Info Callout */}
        <div className="mt-4 p-4 rounded-xl border border-[#C49A45] bg-[#FAF0DB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="sanskrit-title font-bold text-base sm:text-lg text-[#641E16]">
                {activeConfig.sanskrit}
              </span>
              <span className="vedic-badge text-[10px] bg-[#641E16] text-[#FFF9EF] border border-[#C49A45]">
                Active Sutra
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#45352B]">
              {activeConfig.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#4F7A3A] font-semibold bg-[rgba(79,122,58,0.1)] px-3.5 py-1.5 rounded-xl border border-[rgba(79,122,58,0.3)] flex-shrink-0">
            <CheckCircle2 className="w-4 h-4 text-[#4F7A3A]" />
            <span>Ground-Truth Verified</span>
          </div>
        </div>
      </section>

      {/* Two Column Layout: Left Input Panel, Right Step Player & Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (Inputs & Method info) */}
        <div className="lg:col-span-4 space-y-6">
          <section aria-label="Input parameters">
            <CalcSectionLabel num="02" title="Input Coordinates" sub="presets or custom digits-only values" />
            <InputForm
              config={activeConfig}
              initialA={initialA}
              initialB={initialB}
              onCalculate={handleCalculate}
            />
          </section>

          {/* Quick Summary Card */}
          <div className="parchment-card p-5 border border-[#C49A45] bg-[#FFF9EF] text-xs text-[#45352B] space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#641E16] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#9A7730]" />
              Sutra Mechanics
            </h4>
            <p className="leading-relaxed">
              In Indian Knowledge Systems (IKS), arithmetic shortcuts are termed <em>Sūtras</em> and <em>Upa-sūtras</em>.
              They exploit the base-10 positional decimal system developed by Indian scholars to simplify mental calculations into parallel coordinate steps.
            </p>
            <div className="pt-3 border-t border-[#C49A45] flex items-center justify-between text-[11px] text-[#6B5847] font-mono">
              <span>Method: <strong className="text-[#641E16]">{calcResult.methodUsed}</strong></span>
              <span>Total Steps: {calcResult.steps.length}</span>
            </div>
          </div>
        </div>

        {/* Right Column (Visual Grid, Step Player, Step Card, Final Banner) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 03 — Visualization */}
          {showDigitGrid && (
            <section aria-label="Ray visualization">
              <CalcSectionLabel num="03" title="Vector Ray Visualizer" sub="Ūrdhva-Tiryag parallel coordinate matrix" />
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
            <CalcSectionLabel num="04" title="Step-by-Step Walkthrough" sub={`step ${currentStep} of ${calcResult.steps.length} · 0.8s / 1.6s / 3.0s tempo`} />
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
            <CalcSectionLabel num="05" title="Verified Result" sub={isFinalStep ? 'synthesized · hardware cross-checked' : `unlocks at final step (${calcResult.steps.length})`} />
            {isFinalStep ? (
              <ResultBanner result={calcResult} />
            ) : (
              <div className="parchment-card p-5 text-center text-xs text-[#45352B] bg-[#FFF9EF] border border-dashed border-[#C49A45]">
                Scrub to <strong className="text-[#641E16]">Step {calcResult.steps.length}</strong> or press Play to synthesize and verify the final answer.
              </div>
            )}
          </section>

        </div>

      </div>

    </div>
  );
}
