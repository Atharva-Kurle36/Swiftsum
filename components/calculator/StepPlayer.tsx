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
    <div className="w-full bg-[#FFF9EF] border border-[#C49A45] rounded-2xl p-5 space-y-4">
      
      {/* Top row: Step Counter & Progress bar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="vedic-badge text-[11px] font-mono font-bold bg-[#641E16] text-[#FFF9EF] border border-[#C49A45]">
              Step {currentStep} of {totalSteps}
            </span>
            {currentStep === totalSteps && (
              <span className="vedic-badge text-[11px] font-semibold bg-[rgba(79,122,58,0.1)] text-[#4F7A3A] border border-[rgba(79,122,58,0.3)]">
                Calculation Synthesized
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-[#641E16] font-bold">
            {Math.round(progressPercent)}%
          </span>
        </div>

        {/* Visual Progress & Step Scrubber Bar */}
        <div className="relative w-full h-3 rounded-full bg-[#EDDCB9] border border-[#C49A45] overflow-hidden cursor-pointer">
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%`, background: 'linear-gradient(90deg,#641E16,#C49A45)' }}
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
                    ? 'bg-[#641E16] text-[#FFF9EF] border-[#641E16] scale-110'
                    : stepNum < currentStep
                    ? 'bg-[#FAF0DB] text-[#641E16] border-[#C49A45]'
                    : 'bg-[#FFF9EF] text-[#8C7763] border-[#C49A45] hover:bg-[#FAF0DB]'
                }`}
              >
                {stepNum}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Control buttons bar */}
      <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#C49A45]">
        
        {/* Reset / Beginning */}
        <button
          onClick={onReset}
          disabled={currentStep === 1}
          title="Reset to Step 1"
          className="p-2.5 rounded-xl bg-[#FFF9EF] border border-[#C49A45] text-[#6B5847] hover:bg-[#FAF0DB] hover:text-[#641E16] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStep <= 1}
            title="Previous Step"
            className="px-3.5 py-2 rounded-xl bg-[#FFF9EF] border border-[#C49A45] text-[#45352B] hover:bg-[#FAF0DB] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Primary Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause Auto-Play' : `Start Auto-Play (${speedLabels[speedMs]})`}
            className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all border ${
              isPlaying
                ? 'bg-[#4A1510] text-[#FFF9EF] border-[#4A1510]'
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
            className="px-3.5 py-2 rounded-xl bg-[#FFF9EF] border border-[#C49A45] text-[#45352B] hover:bg-[#FAF0DB] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speed cycle toggle */}
        <button
          onClick={cycleSpeed}
          title="Click to cycle playback tempo"
          className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#641E16] bg-[#FFF9EF] hover:bg-[#FAF0DB] px-3 py-1.5 rounded-lg border border-[#C49A45] cursor-pointer transition-all"
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>{speedLabels[speedMs]}</span>
        </button>
      </div>
    </div>
  );
}
