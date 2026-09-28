'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, ChevronLeft, ChevronRight, RotateCcw, Gauge } from 'lucide-react';

interface StepPlayerProps {
  currentStep: number;     // 1-indexed
  totalSteps: number;
  isPlaying: boolean;
  onStepChange: (step: number) => void;
  onTogglePlay: () => void;
  onReset: () => void;
}

export default function StepPlayer({
  currentStep,
  totalSteps,
  isPlaying,
  onStepChange,
  onTogglePlay,
  onReset,
}: StepPlayerProps) {
  
  // Speed options in milliseconds: 800ms (Fast), 1600ms (Normal), 3000ms (Study)
  const [speedMs, setSpeedMs] = useState<number>(1600);

  const speedLabels: Record<number, string> = {
    800: '0.8s (Fast)',
    1600: '1.6s (Normal)',
    3000: '3.0s (Study)',
  };

  const cycleSpeed = () => {
    if (speedMs === 1600) setSpeedMs(800);
    else if (speedMs === 800) setSpeedMs(3000);
    else setSpeedMs(1600);
  };

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      onStepChange(currentStep + 1);
    } else {
      if (isPlaying) onTogglePlay();
    }
  }, [currentStep, totalSteps, isPlaying, onStepChange, onTogglePlay]);

  const handlePrev = useCallback(() => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  }, [currentStep, onStepChange]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, speedMs);
    return () => clearInterval(timer);
  }, [isPlaying, handleNext, speedMs]);

  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-2xl p-5 shadow-lg space-y-4">
      
      {/* Top row: Step Counter & Progress bar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="vedic-badge gold text-[11px] font-mono font-bold">
              Step {currentStep} of {totalSteps}
            </span>
            {currentStep === totalSteps && (
              <span className="vedic-badge emerald text-[11px] font-semibold">
                Calculation Synthesized
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-[var(--accent-copper)] font-bold">
            {Math.round(progressPercent)}%
          </span>
        </div>

        {/* Visual Progress & Step Scrubber Bar */}
        <div className="relative w-full h-3 rounded-full bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] overflow-hidden cursor-pointer">
          <div
            className="h-full bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#38BDF8] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Clickable Step Pips */}
        {totalSteps > 1 && totalSteps <= 12 && (
          <div className="flex items-center justify-between px-1 pt-1">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(stepNum => (
              <button
                key={stepNum}
                onClick={() => onStepChange(stepNum)}
                title={`Jump directly to Step ${stepNum}`}
                className={`w-6 h-6 rounded-md font-mono text-[10px] font-bold cursor-pointer transition-all flex items-center justify-center border ${
                  currentStep === stepNum
                    ? 'bg-[var(--accent-copper)] text-[#090D16] border-[var(--accent-copper)] shadow-md shadow-[rgba(245,158,11,0.3)] scale-110'
                    : stepNum < currentStep
                    ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-copper)] border-[var(--border-copper)]'
                    : 'bg-[var(--bg-surface-subtle)] text-[var(--text-dim)] border-[var(--border-subtle)] hover:text-[var(--text-pure)]'
                }`}
              >
                {stepNum}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Control buttons bar */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
        
        {/* Reset / Beginning */}
        <button
          onClick={onReset}
          disabled={currentStep === 1}
          title="Reset to Step 1"
          className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-pure)] hover:border-[var(--border-medium)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStep <= 1}
            title="Previous Step"
            className="px-3.5 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-pure)] hover:border-[var(--accent-copper)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Primary Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause Auto-Play' : `Start Auto-Play (${speedLabels[speedMs]})`}
            className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all ${
              isPlaying
                ? 'bg-sky-500 hover:bg-sky-400 text-[#090D16] shadow-lg shadow-sky-500/30'
                : 'btn-vedic-primary'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play Steps</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps}
            title="Next Step"
            className="px-3.5 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-pure)] hover:border-[var(--accent-copper)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speed cycle toggle */}
        <button
          onClick={cycleSpeed}
          title="Click to cycle playback tempo"
          className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--accent-copper)] bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface-hover)] px-3 py-1.5 rounded-lg border border-[var(--border-copper)] cursor-pointer transition-all"
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>{speedLabels[speedMs]}</span>
        </button>
      </div>
    </div>
  );
}
