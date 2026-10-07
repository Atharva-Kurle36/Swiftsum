'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Gauge } from 'lucide-react';

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
    <div className="rounded-2xl border border-[#E5A93C]/20 bg-[#14120D]/90 backdrop-blur-md p-5 sm:p-6 shadow-xl space-y-5">
      
      {/* Top row: Step Counter & Progress bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="border border-[#E5A93C]/35 bg-[#E5A93C]/10 text-[#E5A93C] font-mono font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Step {currentStep} of {totalSteps}
            </span>
            {currentStep === totalSteps && (
              <span className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs px-3 py-1 rounded-full font-medium">
                Calculation Synthesized
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-[#E5A93C] font-bold">
            {Math.round(progressPercent)}%
          </span>
        </div>

        {/* Visual Progress & Step Scrubber Bar */}
        <div className="relative w-full h-2.5 rounded-full bg-[#1A1712] border border-[#E5A93C]/20 overflow-hidden cursor-pointer">
          <div
            className="h-full bg-gradient-to-r from-[#FF9F1C] to-[#E5A93C] shadow-[0_0_12px_#E5A93C] transition-all duration-300 ease-out"
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
                className={`w-7 h-7 rounded-lg font-mono text-[11px] cursor-pointer transition-all flex items-center justify-center border ${
                  currentStep === stepNum
                    ? 'bg-[#E5A93C] text-[#0B0A08] border-[#FFD700] font-bold scale-110 shadow-[0_0_12px_rgba(229,169,60,0.4)]'
                    : stepNum < currentStep
                    ? 'bg-[#E5A93C]/15 text-[#E5A93C] border border-[#E5A93C]/35 font-medium'
                    : 'bg-[#1A1712] text-[#A8A090] border border-[#E5A93C]/15 hover:border-[#E5A93C]/40 hover:text-[#E5A93C]'
                }`}
              >
                {stepNum}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Control buttons bar */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E5A93C]/15">
        
        {/* Reset / Beginning */}
        <button
          onClick={onReset}
          disabled={currentStep === 1}
          title="Reset to Step 1"
          className="p-2.5 rounded-xl bg-[#1A1712] border border-[#E5A93C]/20 text-[#A8A090] hover:text-[#E5A93C] hover:border-[#E5A93C]/50 hover:bg-[#201C15] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStep <= 1}
            title="Previous Step"
            className="px-4 py-2 rounded-xl bg-[#1A1712] border border-[#E5A93C]/20 text-[#F5F0E6] hover:text-[#E5A93C] hover:border-[#E5A93C]/50 hover:bg-[#201C15] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Primary Play/Pause Button */}
          <button
            onClick={onTogglePlay}
            title={isPlaying ? 'Pause Auto-Play' : `Start Auto-Play (${speedLabels[speedMs]})`}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono uppercase font-bold tracking-wider flex items-center gap-2 cursor-pointer transition-all border ${
              isPlaying
                ? 'bg-[#C84B31] text-[#F5F0E6] border-[#C84B31] shadow-[0_0_15px_rgba(200,75,49,0.3)]'
                : 'bg-[#E5A93C] hover:bg-[#D4AF37] text-[#0B0A08] border-[#FFD700] shadow-[0_0_15px_rgba(229,169,60,0.35)]'
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
            className="px-4 py-2 rounded-xl bg-[#1A1712] border border-[#E5A93C]/20 text-[#F5F0E6] hover:text-[#E5A93C] hover:border-[#E5A93C]/50 hover:bg-[#201C15] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speed cycle toggle */}
        <button
          onClick={cycleSpeed}
          title="Click to cycle playback tempo"
          className="flex items-center gap-1.5 text-[11px] font-mono text-[#E5A93C] bg-[#1A1712] hover:bg-[#201C15] hover:border-[#E5A93C]/50 px-3 py-1.5 rounded-lg border border-[#E5A93C]/20 cursor-pointer transition-all"
        >
          <Gauge className="w-3.5 h-3.5 text-[#E5A93C]" />
          <span>{speedLabels[speedMs]}</span>
        </button>
      </div>
    </div>
  );
}
