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

  // Auto-play timer (flashes fact every 4.5 seconds if active)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, handleNext]);

  const categories = ['All', 'Mathematics', 'Astronomy', 'Algorithms', 'Geometry', 'Linguistics'];

  return (
    <section id="iks-facts" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-2">
          <span className="vedic-badge gold">
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            Indian Knowledge Systems (IKS) Lore
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--ink)]">
          Chronicles of Ancient Indian Science
        </h2>
        <p className="text-sm sm:text-base text-[var(--ink-muted)] max-w-xl mx-auto mt-2">
          Discover the mathematical epiphanies, algorithmic poetry, and astronomical breakthroughs preserved across millennia.
        </p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border ${
              selectedCategory === cat
                ? 'bg-[var(--vermilion)] text-white border-[var(--vermilion)] shadow-sm'
                : 'bg-[var(--parchment)] text-[var(--ink-muted)] border-[var(--parchment-border)] hover:bg-[#E4D5B1]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Deck Wrapper */}
      <div className="relative max-w-2xl mx-auto min-h-[420px] flex items-center justify-center">
        
        {/* Layered visual shadow cards beneath to simulate an ancient palm-leaf / manuscript deck */}
        <div
          className="absolute inset-x-4 inset-y-2 bg-[var(--parchment-dark)] border border-[var(--parchment-border)] rounded-2xl opacity-40 transform rotate-2 pointer-events-none transition-transform"
        />
        <div
          className="absolute inset-x-2 inset-y-1 bg-[#E2D2AA] border border-[var(--parchment-border)] rounded-2xl opacity-60 transform -rotate-1 pointer-events-none transition-transform"
        />

        {/* Top Active Card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentFact.id}
            custom={direction}
            initial={{ opacity: 0, scale: 0.94, y: direction * 15, rotateZ: direction * 1.5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -direction * 15, rotateZ: -direction * 1.5 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="parchment-card w-full p-6 sm:p-8 relative z-10 border border-[var(--parchment-border)] bg-[var(--parchment-card)] shadow-xl"
          >
            {/* Top metadata row */}
            <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--parchment-border)]">
              <div className="flex items-center gap-2">
                <span className="vedic-badge text-[11px]">
                  {currentFact.category}
                </span>
                <span className="text-xs text-[var(--ink-light)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {currentFact.era}
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--ink-muted)] bg-[var(--parchment)] px-2.5 py-1 rounded border border-[var(--parchment-border)]">
                {(currentIndex % filteredFacts.length) + 1} / {filteredFacts.length}
              </span>
            </div>

            {/* Fact Title */}
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[var(--ink)] mb-3 leading-snug">
              {currentFact.title}
            </h3>

            {/* Sanskrit Shloka Quote (if available) */}
            {currentFact.sanskritVerse && (
              <div className="p-3 sm:p-4 rounded-xl bg-[rgba(169,129,47,0.08)] border border-[rgba(169,129,47,0.22)] mb-4">
                <p className="sanskrit-title text-base sm:text-lg text-[var(--ink)] text-center mb-1">
                  {currentFact.sanskritVerse}
                </p>
                {currentFact.verseTranslation && (
                  <p className="text-xs text-[var(--ink-muted)] italic text-center font-sans">
                    "{currentFact.verseTranslation}"
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--ink)] leading-relaxed mb-4">
              {currentFact.description}
            </p>

            {/* Impact / Significance */}
            <div className="flex items-start gap-2.5 text-xs text-[var(--teal)] bg-[rgba(41,76,72,0.07)] p-3 rounded-lg border border-[rgba(41,76,72,0.2)] mb-4">
              <Award className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Significance: </span>
                <span>{currentFact.significance}</span>
              </div>
            </div>

            {/* Footer Source Attribution */}
            <div className="pt-3 border-t border-[var(--parchment-border)] flex items-center justify-between text-xs text-[var(--ink-muted)]">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--vermilion)]" />
                <span className="font-semibold">{currentFact.treatise}</span>
              </div>
              <span className="italic">{currentFact.author}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Deck Controls (Flash Random, Auto-play, Previous, Next) */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handlePrev}
          aria-label="Previous fact"
          className="p-2.5 rounded-lg bg-[var(--parchment)] border border-[var(--parchment-border)] text-[var(--ink)] hover:bg-[#E2D2AA] cursor-pointer transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleRandom}
          className="btn-vedic-primary !py-2.5 !px-5 text-xs sm:text-sm flex items-center gap-2"
        >
          <Shuffle className="w-4 h-4 animate-spin-slow" />
          <span>Flash Random Fact</span>
        </button>

        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 border cursor-pointer transition-all ${
            isAutoPlaying
              ? 'bg-[var(--teal)] text-white border-[var(--teal)] shadow-sm'
              : 'bg-[var(--parchment)] text-[var(--ink)] border-[var(--parchment-border)] hover:bg-[#E2D2AA]'
          }`}
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Auto-Flashing</span>
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
          aria-label="Next fact"
          className="p-2.5 rounded-lg bg-[var(--parchment)] border border-[var(--parchment-border)] text-[var(--ink)] hover:bg-[#E2D2AA] cursor-pointer transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
