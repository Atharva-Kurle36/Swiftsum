'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Diamond({ className = 'w-2 h-2 text-[#E5A93C]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="currentColor">
      <polygon points="5,0 10,5 5,10 0,5" />
    </svg>
  );
}

export function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{ opacity: 0.05 }}
    >
      <svg
        className="w-[200%] h-[200%] film-grain-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E5A93C] via-[#FF9F1C] to-[#E5A93C] origin-left z-[100]"
    />
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = '',
  y = 28,
  duration = 0.9,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MaskLine({
  children,
  delay = 0,
  duration = 1.15,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  sub,
  highlightWord,
  className = '',
}: {
  kicker: string;
  title: string;
  sub?: string;
  highlightWord?: string;
  className?: string;
}) {
  const renderTitle = () => {
    if (!highlightWord) return title;
    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#E5A93C] italic">{highlightWord}</span>
        {parts.slice(1).join(highlightWord)}
      </>
    );
  };

  return (
    <div className={`max-w-3xl ${className}`}>
      <FadeUp delay={0.1}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-[#E5A93C]/50" />
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#E5A93C]">
            {kicker}
          </p>
        </div>
      </FadeUp>
      <FadeUp delay={0.2}>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#F5F0E6] font-medium leading-[1.15] tracking-tight mb-5">
          {renderTitle()}
        </h2>
      </FadeUp>
      {sub && (
        <FadeUp delay={0.3}>
          <p className="font-sans text-base sm:text-lg text-[#A8A090] leading-relaxed font-light">
            {sub}
          </p>
        </FadeUp>
      )}
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[40vh] flex items-center justify-center p-6 text-center bg-[#0B0A08] text-[#F5F0E6]">
            <div>
              <h2 className="font-cinzel text-xl text-[#E5A93C] mb-2">Something went wrong</h2>
              <p className="text-[#A8A090] text-sm mb-4">
                The visual could not be displayed properly.
              </p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="vedic-pill vedic-pill-gold text-xs"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
