'use client';

import React, { useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from 'framer-motion';
import { CHAPTERS } from './ChapterData';
import ChapterPanel from './ChapterPanel';
import ChapterProgress from './ChapterProgress';
import { buildChapterScrub } from './ChapterScrub';

// Step 3.2: renders the chapter stack inside the existing pinned hero panel
// and tracks which chapter owns the current scroll position via ScrollTrigger.
// Visual crossfade/slide arrives in Step 3.4 — for now panels render
// statically, so the hero looks byte-identical to before.
// NOTE: the trigger is passed as an ELEMENT, not a '#cover' selector string —
// gsap.context() scopes selector text to rootRef (the stack sits *inside*
// #cover, so '#cover' would resolve to null and the trigger would silently
// fall back to document scroll range).
export default function ChapterStack({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  // Remembers the previously shown panel so it can fade out on change.
  const prevRef = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const track = targetRef.current;
    if (!track) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        // Map track progress → owning chapter. Guarded setState avoids
        // re-renders when the index hasn't changed. data-progress mirrors
        // the raw value for the Step 3.5 indicator (and is cheap to read).
        onUpdate: (self) => {
          const i = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * CHAPTERS.length));
          setActive((prev) => (prev === i ? prev : i));
          rootRef.current?.setAttribute('data-progress', self.progress.toFixed(3));
        },
      });
    }, rootRef);
    // Refresh after fonts/layout settle so trigger positions are exact.
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 500);
    // Step 4 (scrub): master scrubbed timeline for chapter SVG motifs.
    // Skipped automatically with everything else when reduce is true.
    const killScrub = buildChapterScrub(track, rootRef);
    return () => {
      window.clearTimeout(t);
      killScrub();
      ctx.revert();
    };
  }, [reduce, targetRef]);

  // Step 3.4: transform/opacity-only entrance for the incoming chapter plus
  // a quick crossfade of the outgoing one. Skipped for reduced motion.
  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    if (!root) return;
    const panels = [...root.querySelectorAll<HTMLElement>(':scope > .ch-panel')];
    const incoming = panels[active];
    const prev = prevRef.current;
    prevRef.current = active;
    // Clear every leaving flag first — including on the incoming panel, which
    // may carry a stranded flag from an interrupted fade while IT was outgoing.
    // (Killed tweens never run onComplete, so without this the flag — and a
    // ghost-visible panel — survives until some later chapter change.)
    panels.forEach((p) => p.removeAttribute('data-leaving'));
    const incomingKids = incoming
      ? incoming.querySelectorAll<HTMLElement>(':scope > *')
      : [];
    const inTween = gsap.fromTo(
      incomingKids,
      { y: 26, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.07, overwrite: 'auto' }
    );
    let outTween: gsap.core.Tween | null = null;
    if (prev !== active && panels[prev]) {
      const out = panels[prev];
      out.setAttribute('data-leaving', 'true');
      outTween = gsap.to(out.querySelectorAll<HTMLElement>(':scope > *'), {
        autoAlpha: 0,
        y: -14,
        duration: 0.35,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => out.removeAttribute('data-leaving'),
      });
    }
    return () => {
      inTween.kill();
      outTween?.kill();
    };
  }, [active, reduce]);

  return (
    <>
      <div ref={rootRef} className="ch-stack" data-active-chapter={CHAPTERS[active].id}>
        {CHAPTERS.map((ch, i) => (
          <ChapterPanel key={ch.id} chapter={ch} index={i} active={i === active} />
        ))}
      </div>
      {/* Step 3.5: fixed chapter indicator (null for reduced motion). */}
      <ChapterProgress chapters={CHAPTERS} activeIndex={active} trackRef={targetRef} />
    </>
  );
}
