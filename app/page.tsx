'use client';

import React from 'react';
import Navbar from '@/components/iks/Navbar';
import Hero from '@/components/iks/Hero';
import JourneyScrollytelling from '@/components/iks/JourneyScrollytelling';
import ZeroExhibit from '@/components/iks/ZeroExhibit';
import PioneersBento from '@/components/iks/PioneersBento';
import VedicMathPlayground from '@/components/iks/VedicMathPlayground';
import TreatisesArchive from '@/components/iks/TreatisesArchive';
import Footer from '@/components/iks/Footer';
import { ScrollProgress, FilmGrain, ErrorBoundary } from '@/components/iks/shared';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black text-[#F5F0E6] selection:bg-[#E5A93C] selection:text-black">
      {/* Fixed Film Grain Overlay */}
      <FilmGrain />

      {/* Fixed Gold Scroll Progress Bar */}
      <ScrollProgress />

      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Content Sections with isolated ErrorBoundaries */}
      <main>
        {/* Hero Section */}
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>

        {/* 01: Journey Scrollytelling */}
        <ErrorBoundary>
          <JourneyScrollytelling />
        </ErrorBoundary>

        {/* 02: Zero Exhibit */}
        <ErrorBoundary>
          <ZeroExhibit />
        </ErrorBoundary>

        {/* 03: Pioneers Bento */}
        <ErrorBoundary>
          <PioneersBento />
        </ErrorBoundary>

        {/* 04: Vedic Math Playground */}
        <ErrorBoundary>
          <VedicMathPlayground />
        </ErrorBoundary>

        {/* 05: Treatises Archive */}
        <ErrorBoundary>
          <TreatisesArchive />
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
