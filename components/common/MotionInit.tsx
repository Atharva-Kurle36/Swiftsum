'use client';

import { useEffect } from 'react';
import { supportsFlags } from 'motion-dom';

// 1. Immediately disable buggy experimental ScrollTimeline / ViewTimeline in motion-dom
// This prevents Framer Motion 12 from constructing native WAAPI scroll timelines with invalid keyframe offsets.
if (typeof window !== 'undefined') {
  supportsFlags.scrollTimeline = false;
  supportsFlags.viewTimeline = false;

  // 2. Safe monkey-patch on Element.prototype.animate to prevent unhandled WAAPI TypeError crashes
  if (typeof Element !== 'undefined' && Element.prototype && Element.prototype.animate) {
    const originalAnimate = Element.prototype.animate;
    // Only patch once
    if (!(originalAnimate as any).__patchedForWaapiSafe) {
      const safeAnimate = function (this: Element, keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions) {
        try {
          if (keyframes && typeof keyframes === 'object' && !Array.isArray(keyframes)) {
            const kf = keyframes as Record<string, any>;
            if (Array.isArray(kf.offset)) {
              // Ensure all offsets are in [0, 1] range and monotonically non-decreasing
              const hasInvalidOffset = kf.offset.some(
                (o: unknown) => typeof o !== 'number' || isNaN(o) || o < 0 || o > 1
              );
              const startsAtZero = kf.offset[0] === 0;
              const endsAtOne = kf.offset[kf.offset.length - 1] === 1;

              if (hasInvalidOffset || !startsAtZero || !endsAtOne) {
                // Remove the custom offset so the browser can calculate keyframes evenly
                delete kf.offset;
              }
            }
          }
          return originalAnimate.apply(this, arguments as any);
        } catch (err) {
          console.warn('[WAAPI Safe Guard] Intercepted invalid element.animate call:', err);
          // Return a no-op Animation object to protect the React render tree
          return {
            play: () => {},
            pause: () => {},
            cancel: () => {},
            finish: () => {},
            reverse: () => {},
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => false,
            playbackRate: 1,
            playState: 'idle' as AnimationPlayState,
            currentTime: 0,
            startTime: 0,
            timeline: null,
            effect: null,
            id: '',
            pending: false,
            ready: Promise.resolve(this),
            finished: Promise.resolve(this),
            onfinish: null,
            oncancel: null,
            onremove: null,
          } as unknown as Animation;
        }
      };
      (safeAnimate as any).__patchedForWaapiSafe = true;
      Element.prototype.animate = safeAnimate;
    }
  }
}

export default function MotionInit() {
  useEffect(() => {
    // Re-verify flags in client runtime
    supportsFlags.scrollTimeline = false;
    supportsFlags.viewTimeline = false;
  }, []);

  return null;
}
