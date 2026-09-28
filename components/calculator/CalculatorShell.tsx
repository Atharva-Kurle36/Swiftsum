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
import { Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight, Cpu } from 'lucide-react';

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
      
      {/* Top Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="vedic-badge gold">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent-copper)]" />
            Parallel Vedic Arithmetic Workspace
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-[var(--text-pure)] tracking-tight">
          Sutra Computational Engine
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] mt-2">
          Select an operation, input parameters, and trace through classical sutras with live vector ray intersections.
        </p>
      </div>

      {/* Tabs Row for the 5 Classical Sutras */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 pb-4 border-b border-[var(--border-subtle)]">
        {Object.values(SUTRA_REGISTRY).map(op => (
          <button
            key={op.id}
            onClick={() => handleTabChange(op.id)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all flex items-center gap-2 border ${
              activeOpId === op.id
                ? 'bg-[var(--accent-copper)] text-[#090D16] border-[var(--accent-copper)] shadow-lg shadow-[rgba(245,158,11,0.25)]'
                : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-pure)] hover:border-[var(--border-medium)]'
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
      <div className="parchment-card p-5 mb-8 border border-[var(--border-copper)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="sanskrit-title font-bold text-base sm:text-lg text-[var(--accent-copper)]">
              {activeConfig.sanskrit}
            </span>
            <span className="vedic-badge teal text-[10px]">
              Active Sutra
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)]">
            {activeConfig.description}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/25 flex-shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Ground-Truth Verified</span>
        </div>
      </div>

      {/* Two Column Layout: Left Input Panel, Right Step Player & Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Inputs & Method info) */}
        <div className="lg:col-span-4 space-y-6">
          <InputForm
            config={activeConfig}
            initialA={initialA}
            initialB={initialB}
            onCalculate={handleCalculate}
          />

          {/* Quick Summary Card */}
          <div className="parchment-card p-5 border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-muted)] space-y-3">
            <h4 className="font-serif font-bold text-sm text-[var(--text-pure)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--accent-copper)]" />
              Sutra Mechanics
            </h4>
            <p className="leading-relaxed">
              In Indian Knowledge Systems (IKS), arithmetic shortcuts are termed <em>Sūtras</em> and <em>Upa-sūtras</em>.
              They exploit the base-10 positional decimal system developed by Indian scholars to simplify mental calculations into parallel coordinate steps.
            </p>
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-dim)] font-mono">
              <span>Method: <strong className="text-[var(--accent-copper)]">{calcResult.methodUsed}</strong></span>
              <span>Total Steps: {calcResult.steps.length}</span>
            </div>
          </div>
        </div>

        {/* Right Column (Visual Grid, Step Player, Step Card, Final Banner) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Visual Digit Grid for Urdhva-Tiryagbhyam & Squaring */}
          {showDigitGrid && (
            <DigitCrossGrid
              numberA={gridNumA}
              numberB={gridNumB}
              activeConnections={activeStep?.activeConnections}
              activeDigits={activeStep?.activeDigits}
              currentFormula={activeStep?.formula}
              placedDigit={activeStep?.subResult?.includes('Digit:') ? parseInt(activeStep.subResult.split('Digit:')[1], 10) : undefined}
              carryOut={activeStep?.carryOut}
            />
          )}

          {/* Step Player Controls */}
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

          {/* Active Step Details Card */}
          {activeStep && <StepCard step={activeStep} />}

          {/* Final Answer Banner */}
          {isFinalStep && (
            <ResultBanner result={calcResult} />
          )}

        </div>

      </div>

    </div>
  );
}
