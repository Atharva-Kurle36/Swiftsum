'use client';

import React, { useState, useEffect } from 'react';
import { OperationConfig } from '@/lib/math/types';
import { Calculator, ArrowRight } from 'lucide-react';

interface InputFormProps {
  config: OperationConfig;
  initialA?: string;
  initialB?: string;
  onCalculate: (a: string, b?: string) => void;
}

export default function InputForm({
  config,
  initialA = '',
  initialB = '',
  onCalculate,
}: InputFormProps) {
  const [valA, setValA] = useState<string>(initialA || config.presets[0]?.a || '98');
  const [valB, setValB] = useState<string>(initialB || config.presets[0]?.b || '97');
  const [errorA, setErrorA] = useState<string>('');
  const [errorB, setErrorB] = useState<string>('');

  // Update inputs when config changes
  useEffect(() => {
    if (initialA) {
      setValA(initialA);
    } else if (config.presets[0]) {
      setValA(config.presets[0].a);
    }
    if (config.requiresSecondInput) {
      if (initialB) {
        setValB(initialB);
      } else if (config.presets[0]?.b) {
        setValB(config.presets[0].b);
      }
    }
    setErrorA('');
    setErrorB('');
  }, [config.id, initialA, initialB]);

  const validateAndSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let valid = true;
    if (!valA.trim() || !/^\d+$/.test(valA.trim())) {
      setErrorA('Enter a valid whole number (digits only)');
      valid = false;
    } else {
      setErrorA('');
    }

    if (config.requiresSecondInput) {
      if (!valB.trim() || !/^\d+$/.test(valB.trim())) {
        setErrorB('Enter a valid whole number (digits only)');
        valid = false;
      } else if ((config.id === 'division' || config.id === 'divisibility') && parseInt(valB.trim(), 10) === 0) {
        setErrorB('Divisor cannot be 0');
        valid = false;
      } else if (
        config.id === 'subtraction' &&
        /^\d+$/.test(valA.trim()) &&
        /^\d+$/.test(valB.trim()) &&
        BigInt(valA.trim()) < BigInt(valB.trim())
      ) {
        setErrorB('Subtrahend must be ≤ minuend (positive integers only)');
        valid = false;
      } else {
        setErrorB('');
      }
    }

    if (valid) {
      onCalculate(valA.trim(), config.requiresSecondInput ? valB.trim() : undefined);
    }
  };

  const handleSelectPreset = (preset: { a: string; b?: string }) => {
    setValA(preset.a);
    if (preset.b !== undefined) setValB(preset.b);
    setErrorA('');
    setErrorB('');
    onCalculate(preset.a, preset.b);
  };

  return (
    <div className="rounded-2xl border border-[#E5A93C]/20 bg-[#14120D]/90 backdrop-blur-md p-6 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E5A93C]/15">
        <div>
          <h3 className="font-display font-medium text-base sm:text-lg text-[#F5F0E6] tracking-tight">
            Coordinate Parameters
          </h3>
          <p className="text-xs text-[#A8A090] mt-0.5">
            Enter whole numbers or select classical treatise presets
          </p>
        </div>
        <span className="border border-[#E5A93C]/30 bg-[#E5A93C]/10 text-[#E5A93C] font-mono text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          Live Evaluator
        </span>
      </div>

      {/* Preset Pills */}
      <div>
        <span className="text-[11px] font-mono font-semibold text-[#A8A090] uppercase tracking-wider block mb-2.5">
          Classical Demonstration Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {config.presets.map((preset, idx) => {
            const label = preset.b !== undefined ? `${preset.a} × ${preset.b}` : `${preset.a}`;
            const isSelected = valA === preset.a && (preset.b === undefined || valB === preset.b);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#E5A93C] text-[#0B0A08] border-[#FFD700] font-bold shadow-[0_0_12px_rgba(229,169,60,0.3)]'
                    : 'bg-[#1A1712] text-[#A8A090] border-[#E5A93C]/20 hover:text-[#E5A93C] hover:border-[#E5A93C]/50 hover:bg-[#201C15]'
                }`}
              >
                {preset.label || label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Inputs */}
      <form onSubmit={validateAndSubmit} className="space-y-4">
        {/* Input A */}
        <div>
          <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#E5A93C] mb-2">
            <span>{config.labelA}</span>
            <span className="text-[10px] text-[#A8A090] lowercase tracking-normal">digits only</span>
          </label>
          <input
            type="text"
            value={valA}
            onChange={e => setValA(e.target.value)}
            placeholder={config.placeholderA || "e.g. 98"}
            className="w-full bg-[#0B0A08] border border-[#E5A93C]/30 rounded-xl px-4 py-3 text-lg font-mono text-[#F5F0E6] placeholder-[#6E6759] focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C] transition-all"
          />
          {errorA && (
            <p className="text-xs text-[#E5533D] font-mono mt-1.5">{errorA}</p>
          )}
        </div>

        {/* Input B (if required) */}
        {config.requiresSecondInput && config.labelB && (
          <div>
            <label className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#E5A93C] mb-2">
              <span>{config.labelB}</span>
              <span className="text-[10px] text-[#A8A090] lowercase tracking-normal">digits only</span>
            </label>
            <input
              type="text"
              value={valB}
              onChange={e => setValB(e.target.value)}
              placeholder={config.placeholderB || "e.g. 97"}
              className="w-full bg-[#0B0A08] border border-[#E5A93C]/30 rounded-xl px-4 py-3 text-lg font-mono text-[#F5F0E6] placeholder-[#6E6759] focus:outline-none focus:border-[#E5A93C] focus:ring-1 focus:ring-[#E5A93C] transition-all"
            />
            {errorB && (
              <p className="text-xs text-[#E5533D] font-mono mt-1.5">{errorB}</p>
            )}
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl bg-[#E5A93C] hover:bg-[#D4AF37] text-[#0B0A08] font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(229,169,60,0.3)] transition-all transform hover:scale-[1.01] cursor-pointer mt-4"
        >
          <Calculator className="w-4 h-4" />
          <span>Execute Vedic Algorithm</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
