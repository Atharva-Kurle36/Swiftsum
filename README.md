# SwiftSum · Indian Knowledge Systems (IKS)
> High-Precision Vedic Mathematics Computing Suite & Scrollytelling Engine

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_App-black?style=flat-square&logo=vercel)](https://swiftsum.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-338_Passed-success?style=flat-square)](https://swiftsum.vercel.app/)

**Live Website**: [https://swiftsum.vercel.app/](https://swiftsum.vercel.app/)  
**Exhibition Manual**: [`Swiftsum_Exhibition_Guide.pdf`](./Swiftsum_Exhibition_Guide.pdf) (6-page presentation guide in root)

---

## What is SwiftSum?

SwiftSum is an interactive web platform that bridges 2,000+ years of **Indian Knowledge Systems (IKS)** and **Vedic Mathematics** with modern web engineering. It pairs an immersive dark Vedic luxury scrollytelling experience with an exact, step-by-step verified arithmetic engine.

### Key Highlights
- **Scrollytelling Descent (`/`)**: Journey through 5 historical eras—from Sulba altar geometry and the Bakhshali zero dot to the Kerala School's infinite series.
- **5 Sūtra Calculators (`/calculator`)**: Multi-method arithmetic engine with real-time ground-truth verification:
  1. **Multiplication**: Nikhilam (base deficit/surplus) & Ūrdhva-Tiryagbhyām (vertical & crosswise).
  2. **Squaring**: Ekādhikena Pūrveṇa (ends in 5), Yāvadūnam (near base), & General Duplex.
  3. **Subtraction**: Nikhilam complement identity (eliminating recursive borrowing).
  4. **Division**: Nikhilam / Parāvartya with Euclidean quotient and remainder proof.
  5. **Divisibility Check**: Veṣṭanam (osculation) & Bījāṅka digit-root tests.
- **3D Spatial Walkthrough**: Three.js WebGL animations projecting calculations with synchronized voice narration.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack) & React 19
- **3D & Motion**: Three.js, Canvas 2D fallback, Framer Motion
- **Styling**: Tailwind CSS with dark Vedic luxury palette (`#000000`, `#E5A93C`, `#D4AF37`)
- **Audio**: Web Speech API text-to-speech synthesis
- **Testing**: Node test runner with 338 automated test cases

---

## Quick Start

### Prerequisites
- Node.js 18.17+
- npm 9+

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

### Verification & Testing
```bash
# Run unit tests (338 tests covering all math engines)
npm test

# Type-check with TypeScript (0 errors)
npm run lint

# Production build
npm run build
```

---

## College Exhibition Presentation Guide

For college exhibitions and demonstrations, refer to **[`Swiftsum_Exhibition_Guide.pdf`](./Swiftsum_Exhibition_Guide.pdf)** in the root folder. It contains:
- **8-Member Booth Plan**: Assigned speaking outlines and live demo tasks for each presenter.
- **Benchmark Calculations**: Verified examples (`98 × 97 = 9506`, `12² = 144`, `85² = 7225`, `1000 - 347 = 653`, `1032 ÷ 9 = 114 R 6`).
- **Judge Q&As**: 8–10 anticipated questions with short, simple answers covering history, mathematical proofs, and system architecture.

---

## Heritage Citations
- *Vedic Mathematics* by Swami Bharati Krishna Tirtha (1884–1960)
- *Sulba Sūtras* (Baudhāyana, Āpastamba, Kātyāyana)
- *Bakhshali Manuscript* (Earliest zero dot record)
- *Āryabhaṭīya* by Āryabhaṭa (499 CE)
- *Brāhmasphuṭasiddhānta* by Brahmagupta (628 CE)
- *Kerala School of Astronomy and Mathematics* (Mādhava of Sangamagrāma)
