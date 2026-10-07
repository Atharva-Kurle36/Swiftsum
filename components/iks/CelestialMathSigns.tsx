'use client';

import React from 'react';

/* ==========================================================================
   CELESTIAL & MATHEMATICAL CHAKRA (Rotating Circles around the Manuscript)
   - Outer: 12 Rasis / Zodiac graduations & Golayantra (Clockwise)
   - Middle: Vedic Geometry, Sulba Sutra altar, & Math nodes (Counter-Clockwise)
   - Inner: Navagraha coordinates & glowing Bindu core
   ========================================================================== */

export function CelestialBookYantra() {
  return (
    <div
      className="absolute inset-[-40px] sm:inset-[-70px] pointer-events-none flex items-center justify-center z-0 select-none overflow-visible"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full max-w-[580px] max-h-[580px] drop-shadow-[0_0_25px_rgba(229,169,60,0.18)]"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Golden Radial Glow at Core */}
          <radialGradient id="yantraCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.32" />
            <stop offset="45%" stopColor="#FF9F1C" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C84B31" stopOpacity="0" />
          </radialGradient>

          {/* Golden Stroke Gradient */}
          <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E5A93C" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#E5A93C" stopOpacity="0.75" />
          </linearGradient>

          {/* Curved text paths for Sanskrit inscriptions */}
          <path id="outerRingPath" d="M 250,250 m -216,0 a 216,216 0 1,1 432,0 a 216,216 0 1,1 -432,0" />
          <path id="innerRingPath" d="M 250,250 m -160,0 a 160,160 0 1,1 320,0 a 160,160 0 1,1 -320,0" />
        </defs>

        {/* Central Luminous Aura behind manuscript spine */}
        <circle cx="250" cy="250" r="210" fill="url(#yantraCoreGlow)" />

        {/* ── Outer Clockwise Group: Golayantra & 12 Rasis (Celestial Sphere) ── */}
        <g className="animate-spin-slower origin-center">
          {/* Outer Graduation Ring */}
          <circle
            cx="250"
            cy="250"
            r="234"
            stroke="url(#goldStrokeGrad)"
            strokeWidth="1.2"
            opacity="0.45"
          />
          <circle
            cx="250"
            cy="250"
            r="224"
            stroke="#E5A93C"
            strokeWidth="0.8"
            strokeDasharray="2 6"
            opacity="0.5"
          />
          <circle
            cx="250"
            cy="250"
            r="208"
            stroke="#C49A45"
            strokeWidth="1"
            opacity="0.35"
          />

          {/* 360-degree ticks (every 15 degrees) */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const isMajor = i % 2 === 0;
            const r1 = isMajor ? 224 : 227;
            const r2 = 234;
            return (
              <line
                key={`tick-${i}`}
                x1={250 + r1 * Math.cos(angle)}
                y1={250 + r1 * Math.sin(angle)}
                x2={250 + r2 * Math.cos(angle)}
                y2={250 + r2 * Math.sin(angle)}
                stroke="#E5A93C"
                strokeWidth={isMajor ? 1.2 : 0.6}
                opacity={isMajor ? 0.6 : 0.3}
              />
            );
          })}

          {/* 12 Rasi (Zodiac / Astronomical) glyph nodes */}
          {[
            { sym: '♈', name: 'मेष', deg: 0 },
            { sym: '♉', name: 'वृषभ', deg: 30 },
            { sym: '♊', name: 'मिथुन', deg: 60 },
            { sym: '♋', name: 'कर्क', deg: 90 },
            { sym: '♌', name: 'सिंह', deg: 120 },
            { sym: '♍', name: 'कन्या', deg: 150 },
            { sym: '♎', name: 'तुला', deg: 180 },
            { sym: '♏', name: 'वृश्चिक', deg: 210 },
            { sym: '♐', name: 'धनु', deg: 240 },
            { sym: '♑', name: 'मकर', deg: 270 },
            { sym: '♒', name: 'कुम्भ', deg: 300 },
            { sym: '♓', name: 'मीन', deg: 330 },
          ].map((rasi) => {
            const rad = (rasi.deg * Math.PI) / 180;
            const cx = 250 + 216 * Math.cos(rad);
            const cy = 250 + 216 * Math.sin(rad);
            return (
              <g key={rasi.name}>
                <circle cx={cx} cy={cy} r="7" fill="#15130F" stroke="#E5A93C" strokeWidth="0.8" opacity="0.8" />
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fill="#E5A93C"
                  fontSize="8"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  opacity="0.95"
                >
                  {rasi.sym}
                </text>
              </g>
            );
          })}

          {/* Sanskrit Circular Inscription */}
          <text fill="#C49A45" fontSize="7" letterSpacing="4" opacity="0.45" fontFamily="var(--font-sanskrit)">
            <textPath href="#outerRingPath" startOffset="0%">
              ॥ गोलयन्त्रम् · खगोल मण्डलम् · द्वादश राशयः · सूर्य सिद्धान्तः ॥
            </textPath>
          </text>
        </g>

        {/* ── Middle Counter-Clockwise Group: Gaṇita & Vedic Geometry (Meru & Sulba) ── */}
        <g className="animate-spin-rev origin-center">
          <circle
            cx="250"
            cy="250"
            r="176"
            stroke="#C84B31"
            strokeWidth="1.2"
            opacity="0.4"
          />
          <circle
            cx="250"
            cy="250"
            r="154"
            stroke="#E5A93C"
            strokeWidth="0.9"
            strokeDasharray="4 4"
            opacity="0.5"
          />

          {/* Inscribed Sulba Altar Concentric Squares (45-degree rotation) */}
          <rect
            x="142"
            y="142"
            width="216"
            height="216"
            stroke="#E5A93C"
            strokeWidth="0.9"
            fill="none"
            opacity="0.28"
          />
          <rect
            x="142"
            y="142"
            width="216"
            height="216"
            transform="rotate(45 250 250)"
            stroke="#C84B31"
            strokeWidth="0.9"
            fill="none"
            opacity="0.25"
          />

          {/* Aryabhata Trigonometric Arc & Chords (Jyā ज्या & Kotijyā कोटिज्या) */}
          <path
            d="M 120 250 A 130 130 0 0 1 250 120"
            stroke="#E5A93C"
            strokeWidth="1.4"
            strokeDasharray="3 3"
            opacity="0.6"
          />
          <line x1="120" y1="250" x2="250" y2="250" stroke="#E5A93C" strokeWidth="0.8" opacity="0.4" />
          <line x1="250" y1="120" x2="250" y2="250" stroke="#E5A93C" strokeWidth="0.8" opacity="0.4" />
          <line x1="158" y1="158" x2="250" y2="250" stroke="#FF9F1C" strokeWidth="1" opacity="0.55" />
          <circle cx="158" cy="158" r="3" fill="#E5A93C" opacity="0.8" />

          {/* 8 Octagram Harmonics with Vedic Math Signs */}
          {[
            { sym: '०', deg: 0 },
            { sym: '१', deg: 45 },
            { sym: '∞', deg: 90 },
            { sym: 'π', deg: 135 },
            { sym: '√२', deg: 180 },
            { sym: 'ज्या', deg: 225 },
            { sym: '∑', deg: 270 },
            { sym: '∫', deg: 315 },
          ].map((item) => {
            const rad = (item.deg * Math.PI) / 180;
            const cx = 250 + 165 * Math.cos(rad);
            const cy = 250 + 165 * Math.sin(rad);
            return (
              <g key={item.sym}>
                <rect
                  x={cx - 8}
                  y={cy - 8}
                  width="16"
                  height="16"
                  fill="#15130F"
                  stroke="#E5A93C"
                  strokeWidth="0.8"
                  transform={`rotate(45 ${cx} ${cy})`}
                  opacity="0.75"
                />
                <text
                  x={cx}
                  y={cy + 3}
                  textAnchor="middle"
                  fill="#F5F0E6"
                  fontSize="7.5"
                  fontFamily="var(--font-sanskrit)"
                  fontWeight="bold"
                  opacity="0.9"
                >
                  {item.sym}
                </text>
              </g>
            );
          })}
        </g>

        {/* ── Inner Celestial Core: Navagraha Planetary Markers ── */}
        <g opacity="0.75">
          <circle
            cx="250"
            cy="250"
            r="120"
            stroke="#9A7730"
            strokeWidth="0.9"
            strokeDasharray="2 3"
            opacity="0.4"
          />
          {/* Surya (Sun ☉) & Chandra (Moon ☽) nodal axes */}
          <line x1="250" y1="130" x2="250" y2="370" stroke="#E5A93C" strokeWidth="0.7" opacity="0.3" />
          <line x1="130" y1="250" x2="370" y2="250" stroke="#E5A93C" strokeWidth="0.7" opacity="0.3" />

          {/* Center Bindu (०) focal point */}
          <circle cx="250" cy="250" r="16" fill="#15130F" stroke="#E5A93C" strokeWidth="1.2" opacity="0.6" />
          <circle cx="250" cy="250" r="5" fill="#E5A93C" opacity="0.8" />
          <circle cx="250" cy="250" r="1.5" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
