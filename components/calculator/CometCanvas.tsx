'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  color: string;
  twinkle: boolean;
  twinkleSpeed: number;
  twinklePhase: number;
  hasBloom: boolean;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  width: number;
  opacity: number;
  targetOpacity: number;
  phase: 'fadein' | 'travel' | 'fadeout' | 'dead';
  color: string;
  life: number;
  lifetime: number;
  age: number;
}

// Strictly pure white and soft ivory palette for stars & comets
const CELESTIAL_WHITE = '255, 255, 255';
const SOFT_IVORY = '248, 246, 240';
const MILD_IVORY = '240, 238, 232';

function generateStars(w: number, h: number): Star[] {
  const stars: Star[] = [];
  const count = Math.max(80, Math.min(150, Math.round((w * h) / 6000)));

  for (let i = 0; i < count; i++) {
    let x = Math.random() * w;
    let y = Math.random() * h;

    // Gently disperse stars away from the exact calculation center
    const inCenter = x > w * 0.32 && x < w * 0.68 && y > h * 0.32 && y < h * 0.68;
    if (inCenter && Math.random() < 0.6) {
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? Math.random() * (w * 0.3) : w * 0.7 + Math.random() * (w * 0.3);
      } else {
        y = Math.random() < 0.5 ? Math.random() * (h * 0.3) : h * 0.7 + Math.random() * (h * 0.3);
      }
    }

    const tierRand = Math.random();
    let radius = 0.5 + Math.random() * 0.4;
    let baseOpacity = 0.28 + Math.random() * 0.36;
    let color = Math.random() < 0.75 ? CELESTIAL_WHITE : SOFT_IVORY;
    let twinkle = false;
    let hasBloom = false;

    if (tierRand > 0.94) {
      // Landmark prominent star (crisp with delicate soft bloom)
      radius = 1.3 + Math.random() * 0.5;
      baseOpacity = 0.82 + Math.random() * 0.16;
      hasBloom = true;
      twinkle = true;
      color = Math.random() < 0.6 ? CELESTIAL_WHITE : SOFT_IVORY;
    } else if (tierRand > 0.72) {
      // Mid-distance sharp star
      radius = 0.85 + Math.random() * 0.45;
      baseOpacity = 0.55 + Math.random() * 0.32;
      twinkle = Math.random() < 0.35;
      color = Math.random() < 0.7 ? CELESTIAL_WHITE : MILD_IVORY;
    }

    stars.push({
      x,
      y,
      radius,
      baseOpacity,
      color,
      twinkle,
      twinkleSpeed: 0.8 + Math.random() * 1.8,
      twinklePhase: Math.random() * Math.PI * 2,
      hasBloom,
    });
  }

  return stars;
}

const COMET_COLORS = [
  CELESTIAL_WHITE,
  SOFT_IVORY,
  MILD_IVORY,
];

function spawnComet(w: number, h: number): Comet {
  // Smooth diagonal trajectory between 24° and 48°
  const angleDeg = 24 + Math.random() * 24;
  const angleRad = (angleDeg * Math.PI) / 180;
  const speed = 0.85 + Math.random() * 0.95;
  const vx = Math.cos(angleRad) * speed;
  const vy = Math.sin(angleRad) * speed;

  const fromTop = Math.random() < 0.65;
  const startX = fromTop ? Math.random() * w * 1.15 - w * 0.05 : -40;
  const startY = fromTop ? -40 : Math.random() * h * 0.55;

  return {
    x: startX,
    y: startY,
    vx,
    vy,
    length: 65 + Math.random() * 85,
    width: 1.1 + Math.random() * 1.1,
    opacity: 0,
    targetOpacity: 0.35 + Math.random() * 0.25,
    phase: 'fadein',
    color: COMET_COLORS[Math.floor(Math.random() * COMET_COLORS.length)],
    life: 0,
    lifetime: Math.round((w * 1.4) / speed),
    age: 0,
  };
}

function drawComet(ctx: CanvasRenderingContext2D, c: Comet) {
  if (c.opacity <= 0.005) return;
  const { x, y, vx, vy, length, width, opacity, color } = c;
  const mag = Math.sqrt(vx * vx + vy * vy);
  if (mag === 0) return;
  const nx = -vx / mag;
  const ny = -vy / mag;
  const tailX = x + nx * length;
  const tailY = y + ny * length;

  // Thin, tapered white/ivory tail gradient
  const grad = ctx.createLinearGradient(x, y, tailX, tailY);
  grad.addColorStop(0, `rgba(${color}, ${opacity})`);
  grad.addColorStop(0.25, `rgba(${color}, ${opacity * 0.6})`);
  grad.addColorStop(0.7, `rgba(${color}, ${opacity * 0.15})`);
  grad.addColorStop(1, `rgba(${color}, 0)`);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(tailX, tailY);
  ctx.strokeStyle = grad;
  ctx.lineWidth = width * 0.9;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Soft ivory glow immediately around the head
  const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, width * 3.8);
  glowGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, opacity * 2.8)})`);
  glowGrad.addColorStop(0.35, `rgba(${color}, ${opacity * 0.9})`);
  glowGrad.addColorStop(1, `rgba(${color}, 0)`);
  ctx.beginPath();
  ctx.arc(x, y, width * 3.8, 0, Math.PI * 2);
  ctx.fillStyle = glowGrad;
  ctx.fill();

  // Crisp, bright white head core
  ctx.beginPath();
  ctx.arc(x, y, Math.max(0.7, width * 0.8), 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, opacity * 3.5)})`;
  ctx.fill();
  ctx.restore();
}

export default function CometCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let stars: Star[] = [];
    let twinklingStars: Star[] = [];
    const comets: Comet[] = [];
    let frame = 0;
    const startTime = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Offscreen canvas to cache static stars for optimal frame rates
    let staticStarCanvas: HTMLCanvasElement | null = null;

    const buildStaticStarCache = (w: number, h: number, allStars: Star[]) => {
      staticStarCanvas = document.createElement('canvas');
      staticStarCanvas.width = w;
      staticStarCanvas.height = h;
      const sCtx = staticStarCanvas.getContext('2d');
      if (!sCtx) return;

      for (let i = 0; i < allStars.length; i++) {
        const s = allStars[i];
        if (s.twinkle) continue; // Twinkling stars are drawn dynamically

        sCtx.beginPath();
        sCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(${s.color}, ${s.baseOpacity})`;
        sCtx.fill();
      }
    };

    const resize = () => {
      const p = canvas.parentElement;
      if (p) {
        const w = p.clientWidth;
        const h = p.clientHeight;
        canvas.width = w;
        canvas.height = h;
        stars = generateStars(w, h);
        twinklingStars = stars.filter(s => s.twinkle);
        buildStaticStarCache(w, h, stars);

        if (reducedMotion) {
          ctx.clearRect(0, 0, w, h);
          if (staticStarCanvas) ctx.drawImage(staticStarCanvas, 0, 0);
          // Draw remaining stars statically
          for (const s of twinklingStars) {
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${s.color}, ${s.baseOpacity})`;
            ctx.fill();
          }
        }
      }
    };

    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    resize();

    if (reducedMotion) {
      return () => {
        ro.disconnect();
      };
    }

    let nextSpawnFrame = 35 + Math.floor(Math.random() * 50);

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const elapsedSec = (performance.now() - startTime) / 1000;
      ctx.clearRect(0, 0, w, h);

      // Fast blit of cached static stars
      if (staticStarCanvas) {
        ctx.drawImage(staticStarCanvas, 0, 0);
      }

      // Draw only the twinkling stars dynamically
      for (let i = 0; i < twinklingStars.length; i++) {
        const s = twinklingStars[i];
        const osc = Math.sin(elapsedSec * s.twinkleSpeed + s.twinklePhase);
        const curOpacity = s.baseOpacity * (0.65 + 0.35 * osc);
        if (curOpacity <= 0.02) continue;

        if (s.hasBloom) {
          const bloomGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 3.4);
          bloomGrad.addColorStop(0, `rgba(${s.color}, ${curOpacity * 0.85})`);
          bloomGrad.addColorStop(0.35, `rgba(${s.color}, ${curOpacity * 0.22})`);
          bloomGrad.addColorStop(1, `rgba(${s.color}, 0)`);
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.radius * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = bloomGrad;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${curOpacity})`;
        ctx.fill();
      }

      // Occasional white shooting comets
      const alive = comets.filter(c => c.phase !== 'dead').length;
      if (frame >= nextSpawnFrame && alive < 3) {
        comets.push(spawnComet(w, h));
        nextSpawnFrame = frame + 90 + Math.floor(Math.random() * 110);
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        if (c.phase === 'dead') {
          comets.splice(i, 1);
          continue;
        }

        c.age++;
        c.life = c.age / c.lifetime;
        c.x += c.vx;
        c.y += c.vy;

        if (c.phase === 'fadein') {
          c.opacity = Math.min(c.targetOpacity, c.opacity + c.targetOpacity / (c.lifetime * 0.14));
          if (c.life >= 0.14) c.phase = 'travel';
        } else if (c.phase === 'travel') {
          c.opacity += (c.targetOpacity - c.opacity) * 0.05;
          if (c.life >= 0.74) c.phase = 'fadeout';
        } else if (c.phase === 'fadeout') {
          c.opacity *= 0.93;
          if (c.opacity < 0.008 || c.life >= 1.0) {
            c.opacity = 0;
            c.phase = 'dead';
          }
        }

        if (c.x > w + 120 || c.y > h + 120 || c.x < -200 || c.y < -200) {
          c.phase = 'dead';
        }

        drawComet(ctx, c);
      }
    };

    tick();
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
