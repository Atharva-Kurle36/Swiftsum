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
    <ErrorBoundary>
      <div className="relative min-h-screen bg-[#0B0A08] text-[#F5F0E6] selection:bg-[#E5A93C] selection:text-[#0B0A08]">
        {/* Fixed Film Grain Overlay */}
        <FilmGrain />

        {/* Fixed Gold Scroll Progress Bar */}
        <ScrollProgress />

        {/* Fixed Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main>
          {/* Hero Section */}
          <Hero />

          {/* 01: Journey Scrollytelling */}
          <JourneyScrollytelling />

          {/* 02: Zero Exhibit */}
          <ZeroExhibit />

          {/* 03: Pioneers Bento */}
          <PioneersBento />

          {/* 04: Vedic Math Playground */}
          <VedicMathPlayground />

          {/* 05: Treatises Archive */}
          <TreatisesArchive />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
