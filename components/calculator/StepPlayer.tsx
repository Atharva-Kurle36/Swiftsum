'use client';

import React, { useEffect, useCallback } from 'react';
import { Play, Pause, SkipBack, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

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
  
  // PRD 6.1: Auto-advances every ~1.6 seconds
  const autoAdvanceInterval = 1600;

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps) {
      onStepChange(currentStep + 1);
    } else {
      // Reached the end, pause
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
    }, autoAdvanceInterval);
    return () => clearInterval(timer);
  }, [isPlaying, handleNext, autoAdvanceInterval]);

  const progressPercent = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="w-full bg-[var(--parchment-card)] border border-[var(--parchment-border)] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      
      {/* Top row: Step Counter & Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="vedic-badge gold text-[11px] font-mono">
              Step {currentStep} of {totalSteps}
            </span>
            {currentStep === totalSteps && (
              <span className="vedic-badge text-[11px] text-[var(--gold)]">
                Final Step Reached
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-[var(--ink-muted)]">
            {Math.round(progressPercent)}%
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[var(--parchment-dark)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--vermilion)] to-[var(--gold)] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Control buttons bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        
        {/* Reset / Beginning */}
        <button
          onClick={onReset}
          disabled={currentStep === 1}
          title="Reset to Step 1"
          className="p-2.5 rounded-lg bg-[var(--parchment)] border border-[var(--parchment-border)] text-[var(--ink)] hover:bg-[#E2D2AA] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStep <= 1}
            title="Previous Step"
            className="p-2.5 rounded-lg bg-[var(--parchment)] border border-[var(--parchment-border)] text-[var(--ink)] hover:bg-[#E2D2AA] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Primary Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play (~1.6s)'}
            className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              isPlaying
                ? 'bg-[var(--teal)] text-white shadow-md'
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
                <Play className="w-4 h-4" />
                <span>Auto-Play</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep >= totalSteps}
            title="Next Step"
            className="p-2.5 rounded-lg bg-[var(--parchment)] border border-[var(--parchment-border)] text-[var(--ink)] hover:bg-[#E2D2AA] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speed indicator badge */}
        <div className="hidden sm:flex items-center text-[11px] font-mono text-[var(--ink-muted)] bg-[var(--parchment)] px-2.5 py-1.5 rounded-md border border-[var(--parchment-border)]">
          1.6s / step
        </div>
      </div>
    </div>
  );
}
