'use client';

import React from 'react';
import Hero from '@/components/landing/Hero';
import IksFactDeck from '@/components/landing/IksFactDeck';
import SutraCatalog from '@/components/landing/SutraCatalog';
import NepContext from '@/components/landing/NepContext';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <IksFactDeck />
      <SutraCatalog />
      <NepContext />
    </div>
  );
}
