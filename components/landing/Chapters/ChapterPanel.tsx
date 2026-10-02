import React from 'react';
import type { Chapter } from './ChapterData';

interface ChapterPanelProps {
  chapter: Chapter;
  /** True when this chapter owns the current scroll position (Step 3.4 animates on this). */
  active: boolean;
  index: number;
}

// Step 3.2: pure presentational wrapper. No motion yet — panels render
// statically so the hero looks identical to before.
export default function ChapterPanel({ chapter, active, index }: ChapterPanelProps) {
  return (
    <article
      className="ch-panel"
      data-chapter={chapter.id}
      data-index={index}
      data-active={active}
      aria-label={chapter.label}
    >
      {chapter.content}
    </article>
  );
}
