'use client';

import React from 'react';
import CoverPage from '@/components/landing/CoverPage';
import Hero from '@/components/landing/Hero';
import StatsBand from '@/components/landing/StatsBand';
import HowItWorks from '@/components/landing/HowItWorks';
import SutraCatalog from '@/components/landing/SutraCatalog';
import IksFactDeck from '@/components/landing/IksFactDeck';
import NepContext from '@/components/landing/NepContext';
import FinalCta from '@/components/landing/FinalCta';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Cover — academic title sheet */}
      <CoverPage />
      {/* Preface — thesis demonstration */}
      <Hero />
      {/* At-a-glance strip */}
      <StatsBand />
      {/* 01 — Method */}
      <HowItWorks />
      {/* 02 — Content chapters */}
      <SutraCatalog />
      {/* 03 — Heritage archive */}
      <IksFactDeck />
      {/* 04 — Pedagogy */}
      <NepContext />
      {/* Colophon call to action */}
      <FinalCta />
    </div>
  );
}
