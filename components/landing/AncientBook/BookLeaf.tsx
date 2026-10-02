'use client';

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BookLeafProps {
  progress: MotionValue<number>;
  range: [number, number];
  zTop: number;
  zRest: number;
  front: React.ReactNode;
  back: React.ReactNode;
  frontClass?: string;
  backClass?: string;
  leafClass?: string;
  label: string;
  hideWhenFlipped?: boolean;
}

/** One double-sided leaf. Content leaves hinge at the centre spine;
 *  the full-width cover leaf hinges at the frame's left edge. Angle is a
 *  pure function of pin scroll progress, so flips are fully reversible. */
export default function BookLeaf({
  progress, range, zTop, zRest, front, back, frontClass = '', backClass = '', leafClass = '', label, hideWhenFlipped = false,
}: BookLeafProps) {
  const [a, b] = range;
  const mid = a + (b - a) * 0.72;

  // Natural timing: fast turn, gentle settle onto the left stack.
  const angle = useTransform(progress, [0, a, mid, b, 1], [0, 0, -152, -168, -168]);
  // While edge-on the leaf is invisible — safe moment to swap stack order.
  const zIndex = useTransform(angle, (v) => (v < -90 ? zRest : zTop));
  // Shading: front face darkens as it turns away; back face lightens as it lands.
  const frontShade = useTransform(angle, [0, -90], [0, 0.42]);
  const backShade = useTransform(angle, [-168, -90], [0, 0.42]);

  // Leaf opacity: if hideWhenFlipped is true, fade out as angle turns past -70 to -140 deg
  const leafOpacity = useTransform(angle, (v) => {
    if (!hideWhenFlipped) return 1;
    if (v >= -70) return 1;
    if (v <= -140) return 0;
    return (v - (-140)) / (-70 - (-140));
  });

  const pointerEvents = useTransform(leafOpacity, (o) => (o === 0 ? 'none' : 'auto'));

  return (
    <motion.div
      className={`ab-leaf ${leafClass}`}
      aria-label={label}
      style={{ rotateY: angle, zIndex, opacity: leafOpacity, pointerEvents }}
    >
      <div className={`ab-face ab-front ${frontClass}`}>
        {front}
        <motion.div className="ab-shade" style={{ opacity: frontShade }} />
      </div>
      <div className={`ab-face ab-back ${backClass}`}>
        {back}
        <motion.div className="ab-shade" style={{ opacity: backShade }} />
      </div>
    </motion.div>
  );
}
