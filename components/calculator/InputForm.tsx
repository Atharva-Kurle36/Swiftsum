'use client';

import React, { useState, useEffect } from 'react';
import { OperationConfig } from '@/lib/math/types';
import { Sparkles, Calculator, HelpCircle, ArrowRight } from 'lucide-react';

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
    <div className="parchment-card p-6 border border-[var(--border-medium)] bg-[var(--bg-surface)] shadow-lg space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
        <div>
          <h3 className="font-serif font-black text-base text-[var(--text-pure)] tracking-tight">
            Input Coordinate Parameters
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            Enter whole numbers or select an algorithmic textbook preset
          </p>
        </div>
        <span className="vedic-badge gold text-[10px]">
          Live Mode
        </span>
      </div>

      {/* Preset Pills */}
      <div>
        <span className="text-[10px] font-mono font-bold text-[var(--accent-copper)] uppercase tracking-wider block mb-2">
          Demonstration Presets:
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
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-[var(--accent-copper)] text-[#090D16] border-[var(--accent-copper)] shadow-sm'
                    : 'bg-[var(--bg-surface-elevated)] text-[var(--text-pure)] border-[var(--border-subtle)] hover:border-[var(--accent-copper)]'
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
          <label className="flex items-center justify-between text-xs font-semibold text-[var(--text-pure)] mb-1.5">
            <span>{config.labelA}</span>
            <span className="text-[11px] text-[var(--text-dim)] font-mono">Digits only</span>
          </label>
          <input
            type="text"
            value={valA}
            onChange={e => setValA(e.target.value)}
            placeholder={config.placeholderA || "e.g. 98"}
            className="w-full"
          />
          {errorA && (
            <p className="text-xs text-rose-400 mt-1 font-medium">{errorA}</p>
          )}
        </div>

        {/* Input B (if required) */}
        {config.requiresSecondInput && config.labelB && (
          <div>
            <label className="flex items-center justify-between text-xs font-semibold text-[var(--text-pure)] mb-1.5">
              <span>{config.labelB}</span>
              <span className="text-[11px] text-[var(--text-dim)] font-mono">Digits only</span>
            </label>
            <input
              type="text"
              value={valB}
              onChange={e => setValB(e.target.value)}
              placeholder={config.placeholderB || "e.g. 97"}
              className="w-full"
            />
            {errorB && (
              <p className="text-xs text-rose-400 mt-1 font-medium">{errorB}</p>
            )}
          </div>
        )}

        {/* Action Button */}
        <button
          type="submit"
          className="btn-vedic-primary w-full !py-3 text-sm font-bold flex items-center justify-center gap-2 mt-2"
        >
          <Calculator className="w-4 h-4 text-[#090D16]" />
          <span>Execute Vedic Algorithm</span>
          <ArrowRight className="w-4 h-4 text-[#090D16]" />
        </button>
      </form>
    </div>
  );
}
