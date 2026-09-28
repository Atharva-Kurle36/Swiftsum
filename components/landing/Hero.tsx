'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
      
      {/* Decorative Sanskrit Blessing */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 mb-6"
      >
        <span className="vedic-badge text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Indian Knowledge Systems (IKS) • NEP 2020
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[var(--ink)] tracking-tight leading-tight max-w-4xl mx-auto"
      >
        Demystify Mathematics with{' '}
        <span className="text-[var(--vermilion)] relative inline-block">
          Vedic Ganita
          <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[var(--gold)] rounded-full opacity-80" />
        </span>
      </motion.h1>

      {/* Sanskrit Shloka subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="sanskrit-title text-base sm:text-xl text-[var(--gold)] mt-4 mb-2 tracking-wide font-medium"
      >
        "Yatha Sikha Mayuranam, Naganam Manayo Yatha - Tadvad Vedangasastranam, Ganitam Murdhani Sthitam"
      </motion.p>
      <p className="text-xs text-[var(--ink-light)] italic mb-6 max-w-xl mx-auto font-sans">
        "Like the crest on a peacock and the gem on a cobra, mathematics stands at the crown of all Vedic sciences." — Vedanga Jyotisha
      </p>

      {/* Narrative summary */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-base sm:text-lg text-[var(--ink-muted)] max-w-2xl mx-auto mb-8 leading-relaxed"
      >
        Experience arithmetic the way ancient masters intended. Step through classical sutras
        like <em>Urdhva-Tiryagbhyam</em> and <em>Nikhilam</em> with interactive step-by-step animations,
        crosswise visual digit lines, and rigorous ground-truth verification.
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
      >
        <Link
          href="/calculator"
          className="btn-vedic-primary w-full sm:w-auto text-base !py-3.5 !px-8 shadow-lg group"
        >
          <Calculator className="w-5 h-5" />
          <span>Launch Vedic Calculator</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="#iks-facts"
          className="btn-vedic-secondary w-full sm:w-auto text-base !py-3.5 !px-6"
        >
          <Sparkles className="w-4 h-4 text-[var(--gold)]" />
          <span>Explore Ancient Lore</span>
        </a>
      </motion.div>

      {/* Highlights Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-[var(--parchment-border)] text-left"
      >
        <div className="p-4 rounded-xl bg-[rgba(236,224,194,0.45)] border border-[var(--parchment-border)]">
          <div className="flex items-center gap-2 text-[var(--vermilion)] font-bold text-lg mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>5 Core Sutras</span>
          </div>
          <p className="text-xs text-[var(--ink-muted)]">
            Multiplication, Squaring, Subtraction, Division & Divisibility.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[rgba(236,224,194,0.45)] border border-[var(--parchment-border)]">
          <div className="flex items-center gap-2 text-[var(--gold)] font-bold text-lg mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Visual Crosslines</span>
          </div>
          <p className="text-xs text-[var(--ink-muted)]">
            Animated SVG lines connecting active digit pairs in real time.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[rgba(236,224,194,0.45)] border border-[var(--parchment-border)]">
          <div className="flex items-center gap-2 text-[var(--teal)] font-bold text-lg mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Interactive Player</span>
          </div>
          <p className="text-xs text-[var(--ink-muted)]">
            Step forward, step back, pause, and auto-play at ~1.6s rhythm.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[rgba(236,224,194,0.45)] border border-[var(--parchment-border)]">
          <div className="flex items-center gap-2 text-[var(--ink)] font-bold text-lg mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Verified</span>
          </div>
          <p className="text-xs text-[var(--ink-muted)]">
            Every step and result is cross-checked against standard arithmetic.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
