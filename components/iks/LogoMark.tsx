'use client';

import React from 'react';

export function BinduMark({ size = 42, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 transition-transform duration-500 group-hover:scale-105 ${className}`}
    >
      {/* Dark rounded square */}
      <rect
        width="48"
        height="48"
        rx="14"
        fill="#000000"
        stroke="#E5A93C"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />
      {/* Outer gold circle (r 19, stroke 2) */}
      <circle
        cx="24"
        cy="24"
        r="19"
        stroke="#E5A93C"
        strokeWidth="2"
      />
      {/* Inner concentric gold circle (r 11.5, opacity .55) */}
      <circle
        cx="24"
        cy="24"
        r="11.5"
        stroke="#E5A93C"
        strokeWidth="1.2"
        strokeOpacity="0.55"
      />
      {/* Solid gold center dot (r 3.5) */}
      <circle
        cx="24"
        cy="24"
        r="3.5"
        fill="#E5A93C"
      />
      {/* Vermilion dot on outer ring's top (r 2.2) */}
      <circle
        cx="24"
        cy="5"
        r="2.2"
        fill="#C84B31"
      />
    </svg>
  );
}

export default function LogoMark({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 group cursor-pointer ${className}`}>
      <BinduMark size={42} />
      <div className="flex flex-col">
        <span
          className="font-cinzel text-xl sm:text-2xl font-bold text-[#F5F0E6] group-hover:text-[#E5A93C] transition-colors leading-tight"
          style={{ letterSpacing: '0.12em' }}
        >
          Swiftsum
        </span>
        <span
          className="font-dev text-[11px] sm:text-xs text-[#E5A93C] tracking-wide leading-tight mt-0.5"
        >
          भारतीय गणित परम्परा
        </span>
      </div>
    </div>
  );
}
