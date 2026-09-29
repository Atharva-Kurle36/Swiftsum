'use client';

import React from 'react';
import { LotusDivider } from '@/components/common/Motifs';

interface SectionHeadingProps {
  eyebrow: string;
  eyebrowTone?: string;
  kicker?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'center' | 'left';
  sanskrit?: string;
}

export default function SectionHeading({
  eyebrow,
  kicker,
  title,
  highlight,
  description,
  align = 'center',
  sanskrit,
}: SectionHeadingProps) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col ${alignCls} max-w-3xl ${align === 'center' ? 'mx-auto' : ''} mb-8`}>
      {kicker && <span className="section-number mb-2">{kicker}</span>}
      <span className="vedic-badge gold mb-3">{eyebrow}</span>
      <h2 className="text-3xl sm:text-4xl">
        {title}{' '}
        {highlight && <span style={{ color: '#641E16' }}>{highlight}</span>}
      </h2>
      {sanskrit && (
        <p className="sanskrit-title mt-2" style={{ color: '#9A7730', fontWeight: 600 }}>{sanskrit}</p>
      )}
      {description && (
        <p className={`text-sm sm:text-base mt-3 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`} style={{ color: '#6B5847' }}>
          {description}
        </p>
      )}
      <LotusDivider />
    </div>
  );
}
