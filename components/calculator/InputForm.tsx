'use client';

import React, { useState, useEffect } from 'react';
import { OperationConfig } from '@/lib/math/types';
import { Sparkles, Calculator, HelpCircle } from 'lucide-react';

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
      } else if (config.id === 'division' && parseInt(valB.trim(), 10) === 0) {
        setErrorB('Divisor cannot be 0');
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
    <div className="parchment-card p-6 border border-[var(--parchment-border)] bg-[var(--parchment-card)] shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--parchment-border)]">
        <div>
          <h3 className="font-serif font-bold text-base text-[var(--ink)]">
            Input Configuration
          </h3>
          <p className="text-xs text-[var(--ink-muted)]">
            Enter whole numbers or select an ancient textbook preset
          </p>
        </div>
        <span className="vedic-badge gold text-[10px]">
          Live Mode
        </span>
      </div>

      {/* Preset Pills */}
      <div>
        <span className="text-[11px] font-semibold text-[var(--ink-light)] uppercase tracking-wider block mb-2">
          Recommended Demonstration Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          {config.presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[var(--parchment)] border border-[var(--parchment-border)] text-[var(--ink)] hover:bg-[#E4D5B1] hover:border-[var(--gold)] cursor-pointer transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={validateAndSubmit} className="space-y-4 pt-1">
        
        {/* Input A */}
        <div>
          <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
            {config.labelA}
          </label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={valA}
              onChange={e => {
                const cleaned = e.target.value.replace(/\D/g, '');
                setValA(cleaned);
                if (errorA) setErrorA('');
              }}
              placeholder={config.placeholderA}
              className={`w-full px-4 py-2.5 rounded-xl font-mono text-base bg-white border ${
                errorA ? 'border-red-500' : 'border-[var(--parchment-border)]'
              } text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--vermilion)] transition-all`}
            />
          </div>
          {errorA && <p className="text-[11px] text-red-600 mt-1">{errorA}</p>}
        </div>

        {/* Input B (if required) */}
        {config.requiresSecondInput && (
          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
              {config.labelB}
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={valB}
                onChange={e => {
                  const cleaned = e.target.value.replace(/\D/g, '');
                  setValB(cleaned);
                  if (errorB) setErrorB('');
                }}
                placeholder={config.placeholderB}
                className={`w-full px-4 py-2.5 rounded-xl font-mono text-base bg-white border ${
                  errorB ? 'border-red-500' : 'border-[var(--parchment-border)]'
                } text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--vermilion)] transition-all`}
              />
            </div>
            {errorB && <p className="text-[11px] text-red-600 mt-1">{errorB}</p>}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="btn-vedic-primary w-full !py-3 font-semibold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
        >
          <Calculator className="w-4 h-4" />
          <span>Execute Vedic Sutra Calculation</span>
        </button>
      </form>

    </div>
  );
}
