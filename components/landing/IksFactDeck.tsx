'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IKS_FACTS, IksFact } from '@/lib/data/iksFacts';
import { Sparkles, Shuffle, Play, Pause, ChevronRight, ChevronLeft, BookOpen, Clock, Award } from 'lucide-react';

export default function IksFactDeck() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [direction, setDirection] = useState<number>(1);

  // Filter facts based on category
  const filteredFacts = selectedCategory === 'All'
    ? IKS_FACTS
    : IKS_FACTS.filter(f => f.category === selectedCategory);

  const currentFact: IksFact = filteredFacts[currentIndex % filteredFacts.length];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % filteredFacts.length);
  }, [filteredFacts.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + filteredFacts.length) % filteredFacts.length);
  }, [filteredFacts.length]);

  const handleRandom = () => {
    setDirection(1);
    const availableIndices = filteredFacts
      .map((_, idx) => idx)
      .filter(idx => idx !== currentIndex);
    const randomChoice = availableIndices[Math.floor(Math.random() * availableIndices.length)] ?? 0;
    setCurrentIndex(randomChoice);
  };

  // Auto-play timer (flashes fact every 5 seconds if active)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, handleNext]);

  const categories = ['All', 'Mathematics', 'Astronomy', 'Algorithms', 'Geometry', 'Linguistics'];

  return (
    <section id="iks-facts" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[var(--border-subtle)]">
      
      {/* Header section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="vedic-badge gold">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-copper)]" />
            Indian Knowledge Systems (IKS) Archive
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-black text-[var(--text-pure)] tracking-tight">
          Chronicles of Ancient Indian Science
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto mt-2">
          Discover the mathematical epiphanies, algorithmic poetry, and astronomical breakthroughs preserved across millennia.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all border ${
              selectedCategory === cat
                ? 'bg-[var(--accent-copper)] text-[#090D16] border-[var(--accent-copper)] shadow-md shadow-[rgba(245,158,11,0.25)]'
                : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-pure)] hover:border-[var(--border-medium)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Deck Wrapper */}
      <div className="relative max-w-2xl mx-auto min-h-[440px] flex items-center justify-center">
        
        {/* Layered visual shadow cards beneath to simulate tactile astronomical plaques */}
        <div
          className="absolute inset-x-6 inset-y-2 bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] rounded-2xl opacity-40 transform rotate-2 pointer-events-none transition-transform"
        />
        <div
          className="absolute inset-x-3 inset-y-1 bg-[var(--bg-surface-elevated)] border border-[var(--border-medium)] rounded-2xl opacity-60 transform -rotate-1 pointer-events-none transition-transform"
        />

        {/* Top Active Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentFact.id}
            custom={direction}
            initial={{ opacity: 0, scale: 0.95, y: direction * 14, rotateZ: direction * 1.5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -direction * 14, rotateZ: -direction * 1.5 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="parchment-card w-full p-6 sm:p-8 relative z-10 border border-[var(--border-copper)] bg-[var(--bg-surface)] shadow-2xl"
          >
            {/* Top metadata row */}
            <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <span className="vedic-badge text-[11px] text-[var(--accent-copper)] border-[var(--border-copper)] bg-[rgba(245,158,11,0.1)]">
                  {currentFact.category}
                </span>
                <span className="text-xs text-[var(--text-dim)] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-lapis)]" />
                  {currentFact.era}
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-surface-elevated)] px-2.5 py-1 rounded border border-[var(--border-subtle)]">
                {(currentIndex % filteredFacts.length) + 1} / {filteredFacts.length}
              </span>
            </div>

            {/* Fact Title */}
            <h3 className="text-lg sm:text-2xl font-serif font-black text-[var(--text-pure)] mb-3 leading-snug">
              {currentFact.title}
            </h3>

            {/* Sanskrit Shloka Quote (if available) */}
            {currentFact.sanskritVerse && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[rgba(245,158,11,0.06)] border border-[var(--border-copper)] mb-5">
                <p className="sanskrit-title text-base sm:text-lg text-[var(--accent-copper)] text-center mb-1 font-bold">
                  {currentFact.sanskritVerse}
                </p>
                {currentFact.verseTranslation && (
                  <p className="text-xs text-[var(--text-muted)] italic text-center font-sans">
                    "{currentFact.verseTranslation}"
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mb-5">
              {currentFact.description}
            </p>

            {/* Impact / Significance */}
            <div className="flex items-start gap-2.5 text-xs text-[var(--accent-lapis)] bg-[rgba(56,189,248,0.08)] p-3.5 rounded-xl border border-[rgba(56,189,248,0.25)] mb-5">
              <Award className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--accent-lapis)]" />
              <div>
                <span className="font-bold text-[var(--text-pure)]">Significance: </span>
                <span className="text-[var(--text-muted)]">{currentFact.significance}</span>
              </div>
            </div>

            {/* Footer Source Attribution */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-dim)]">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--accent-copper)]" />
                <span className="font-semibold text-[var(--text-pure)]">{currentFact.treatise}</span>
              </div>
              <span className="italic">{currentFact.author}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Deck Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handlePrev}
          aria-label="Previous fact"
          className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-pure)] hover:border-[var(--accent-copper)] cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleRandom}
          className="btn-vedic-primary !py-2.5 !px-5 text-xs sm:text-sm flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4" />
          <span>Flash Random Fact</span>
        </button>

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border cursor-pointer transition-all ${
            isAutoPlaying
              ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-lapis)] border-[rgba(56,189,248,0.4)] shadow-sm'
              : 'bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border-[var(--border-subtle)] hover:text-[var(--text-pure)]'
          }`}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Auto-Flashing (5s)</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Resume Auto-Play</span>
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          aria-label="Next fact"
          className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] text-[var(--text-pure)] hover:border-[var(--accent-copper)] cursor-pointer transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
