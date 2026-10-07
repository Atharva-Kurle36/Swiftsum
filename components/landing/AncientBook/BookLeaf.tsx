'use client';

import React from 'react';
import { motion, MotionValue, useTransform, transform } from 'framer-motion';

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

  // Natural timing: fast turn, gentle settle onto the left stack. Pure function mappers prevent WAAPI offset errors.
  const angleMap = transform([0, a, mid, b, 1], [0, 0, -152, -168, -168]);
  const angle = useTransform(progress, (v) => angleMap(v));

  // While edge-on the leaf is invisible — safe moment to swap stack order.
  const zIndex = useTransform(angle, (v) => (v < -90 ? zRest : zTop));

  // Shading: front face darkens as it turns away; back face lightens as it lands.
  const frontShadeMap = transform([0, a, mid, 1], [0, 0, 0.42, 0.42]);
  const frontShade = useTransform(progress, (v) => frontShadeMap(v));

  const backShadeMap = transform([0, mid, b, 1], [0.42, 0.42, 0, 0]);
  const backShade = useTransform(progress, (v) => backShadeMap(v));

  // Leaf opacity: if hideWhenFlipped is true, fade out smoothly during the turn
  // so the flap never extends over adjacent text on the left.
  const fadeStart = a + (mid - a) * 0.25;
  const fadeEnd = a + (mid - a) * 0.65;
  const leafOpacityMap = transform(
    [0, fadeStart, fadeEnd, 1],
    hideWhenFlipped ? [1, 1, 0, 0] : [1, 1, 1, 1]
  );
  const leafOpacity = useTransform(progress, (v) => leafOpacityMap(v));

  return (
    <motion.div
      className={`ab-leaf ${leafClass}`}
      aria-label={label}
      style={{
        rotateY: angle,
        zIndex,
        opacity: leafOpacity,
      }}
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
