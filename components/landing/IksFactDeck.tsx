'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IKS_FACTS, IksFact } from '@/lib/data/iksFacts';
import { Shuffle, Play, Pause, ChevronRight, ChevronLeft, BookOpen, Clock, Award } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';

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
    <section id="iks-facts" className="section-shell section-shell-alt">
      <div className="section-inner">
      {/* Header section */}
      <SectionHeading
        kicker="Section 03 — Heritage Archive"
        eyebrow="IKS Fact Deck · 800 BCE → 1965 CE"
        eyebrowTone="gold"
        title="Chronicles of Ancient"
        highlight="Indian Science"
        description="Flash through mathematical epiphanies, algorithmic poetry and astronomical breakthroughs — filterable by śāstra, auto-flashing every 5 seconds."
      />

      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all border ${
              selectedCategory === cat
                ? 'bg-[#641E16] text-[#FFF9EF] border-[#641E16]'
                : 'bg-[#FFF9EF] text-[#45352B] border-[#C49A45] hover:text-[#641E16] hover:border-[#641E16]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card Deck Wrapper */}
      <div className="relative max-w-2xl mx-auto min-h-[380px] flex items-center justify-center">
        
        {/* Layered visual shadow cards beneath to simulate tactile astronomical plaques */}
        <div
          className="absolute inset-x-6 inset-y-2 bg-[#EDDCB9] border border-[#C49A45] rounded-2xl opacity-40 transform rotate-2 pointer-events-none transition-transform"
        />
        <div
          className="absolute inset-x-3 inset-y-1 bg-[#FFF9EF] border border-[#C49A45] rounded-2xl opacity-60 transform -rotate-1 pointer-events-none transition-transform"
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
            className="parchment-card w-full p-6 sm:p-8 relative z-10 border border-[#C49A45] !bg-[#FFF9EF] shadow-[0_2px_12px_rgba(100,30,22,0.08)]"
          >
            {/* Top metadata row */}
            <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[#C49A45]">
              <div className="flex items-center gap-2">
                <span className="vedic-badge text-[11px] !text-[#FFF9EF] !bg-[#641E16] !border-[#641E16]">
                  {currentFact.category}
                </span>
                <span className="text-xs text-[#6B5847] flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#9A7730]" />
                  {currentFact.era}
                </span>
              </div>
              <span className="text-xs font-mono text-[#45352B] bg-[#FAF0DB] px-2.5 py-1 rounded border border-[#C49A45]">
                {(currentIndex % filteredFacts.length) + 1} / {filteredFacts.length}
              </span>
            </div>

            {/* Fact Title */}
            <h3 className="text-lg sm:text-2xl font-serif font-black text-[#641E16] mb-3 leading-snug">
              {currentFact.title}
            </h3>

            {/* Sanskrit Shloka Quote (if available) */}
            {currentFact.sanskritVerse && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF0DB] border border-[#C49A45] mb-5">
                <p className="sanskrit-title text-base sm:text-lg text-[#641E16] text-center mb-1 font-bold">
                  {currentFact.sanskritVerse}
                </p>
                {currentFact.verseTranslation && (
                  <p className="text-xs text-[#6B5847] italic text-center font-sans">
                    "{currentFact.verseTranslation}"
                  </p>
                )}
              </div>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base text-[#45352B] leading-relaxed mb-5">
              {currentFact.description}
            </p>

            {/* Impact / Significance */}
            <div className="flex items-start gap-2.5 text-xs text-[#45352B] bg-[rgba(196,154,69,0.12)] p-3.5 rounded-xl border border-[#C49A45] mb-5">
              <Award className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#9A7730]" />
              <div>
                <span className="font-bold text-[#641E16]">Significance: </span>
                <span className="text-[#45352B]">{currentFact.significance}</span>
              </div>
            </div>

            {/* Footer Source Attribution */}
            <div className="pt-3 border-t border-[#C49A45] flex items-center justify-between text-xs text-[#8C7763]">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#641E16]" />
                <span className="font-semibold text-[#45352B]">{currentFact.treatise}</span>
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
          className="p-2.5 rounded-xl bg-[#FFF9EF] border border-[#C49A45] text-[#641E16] hover:border-[#641E16] cursor-pointer transition-colors"
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
              ? 'bg-[#FFF9EF] text-[#641E16] border-[#C49A45] shadow-sm'
              : 'bg-[#FFF9EF] text-[#6B5847] border-[#C49A45] hover:text-[#641E16]'
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
          className="p-2.5 rounded-xl bg-[#FFF9EF] border border-[#C49A45] text-[#641E16] hover:border-[#641E16] cursor-pointer transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      </div>
    </section>
  );
}
