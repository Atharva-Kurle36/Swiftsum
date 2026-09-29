'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, Sparkles, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="hero-shell">

      {/* Top Banner Tag */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2"
        >
          <span className="vedic-badge gold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Indian Knowledge Systems (IKS) • NEP 2020 Pedagogical Framework
          </span>
        </motion.div>
      </div>

      {/* Main Headline & Philosophical Framing */}
      <div className="text-center max-w-4xl mx-auto mb-6">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight text-[#45352B]"
        >
          Ancient Mental Algorithms.{' '}
          <span className="text-[#641E16] relative inline-block">
            Calculated in Parallel.
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#641E16] opacity-70" />
          </span>
        </motion.h1>

        {/* Authentic Vedanga Shloka */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 mb-4 p-4 rounded-xl bg-[#FFF9EF] border border-[#C49A45] max-w-2xl mx-auto text-center"
        >
          <p className="sanskrit-title text-base sm:text-lg text-[#641E16] font-bold tracking-wide">
            यथा शिखा मयूराणां नागानां मणयो यथा । तद्वद् वेदाङ्गशास्त्राणां गणितं मूर्धनि स्थितम् ॥
          </p>
          <p className="text-xs text-[#6B5847] italic mt-1 font-sans">
            "Like the crest on a peacock and the crown jewel on a serpent, mathematics sits supreme at the pinnacle of all Vedic sciences." — <span className="text-[#45352B] font-medium">Vedāṅga Jyotiṣa (v. 4)</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg text-[#45352B] max-w-2xl mx-auto leading-relaxed"
        >
          Vedic mathematics is not rote arithmetic or mystical shortcuts. It is an elegant, positional base-10 algebra designed for lightning-fast mental execution. Step through classical sutras with live vector cross-lines and ground-truth verification.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Link
            href="/calculator"
            className="btn-vedic-primary text-sm !py-2.5 !px-6"
          >
            <Calculator className="w-4 h-4" />
            <span>Open Vedic Arithmetic Engine</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
