'use client';

import React from 'react';
import { Header } from '@/components/ui/header-2';

/**
 * Main application navigation bar forwarding to the custom Header component
 * located at `@/components/ui/header-2`.
 */
export default function Navbar() {
  return <Header />;
}

export { Header };

