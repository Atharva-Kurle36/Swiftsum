# SwiftSum · Indian Knowledge Systems (IKS)
### High-Precision Vedic Mathematics Computing Suite & Scrollytelling Engine

SwiftSum is an interactive, web-based computational engine and cultural preservation platform designed to bring 2,000+ years of **Indian Knowledge Systems (IKS)** and **Vedic Mathematics** to life. Built with modern web technologies (Next.js, TypeScript, Tailwind CSS, and Framer Motion), SwiftSum combines an immersive dark luxury manuscript experience with an exact, step-by-step verified algorithmic math suite.

---

## Table of Contents
1. [Overview & Architecture](#overview--architecture)
2. [How to Access the Tools](#how-to-access-the-tools)
3. [User Interface Guide](#user-interface-guide)
4. [Mathematical Tools & Working Guide](#mathematical-tools--working-guide)
   - [Tool 1: Multiplication (Ūrdhva-Tiryagbhyām & Nikhilam)](#1-multiplication-ūrdhva-tiryagbhyām--nikhilam)
   - [Tool 2: Squaring (Ekādhikena Pūrveṇa & Yāvadūnam)](#2-squaring-ekādhikena-pūrveṇa--yāvadūnam)
   - [Tool 3: Subtraction (Nikhilam Navataścaramaṁ Daśataḥ)](#3-subtraction-nikhilam-navataścaramaṁ-daśataḥ)
   - [Tool 4: Division (Nikhilam Vibhāgaḥ & Stambha Vibhāgaḥ)](#4-division-nikhilam-vibhāgaḥ--stambha-vibhāgaḥ)
   - [Tool 5: Divisibility Check (Veṣṭanam & Navāśeṣa / Bījāṅka)](#5-divisibility-check-veṣṭanam--navāśeṣa--bījāṅka)
5. [Programmatic / Developer API](#programmatic--developer-api)
6. [Local Setup & Verification](#local-setup--verification)

---

## Overview & Architecture

Vedic Mathematics consists of 16 foundational Sūtras (aphorisms) and 13 Upa-sūtras (sub-aphorisms) reconstructed by Swami Bharati Krishna Tirtha between 1911 and 1918. Rather than forcing rigid, single-path arithmetic algorithms, Vedic Mathematics provides intuitive, modular shortcuts based on number structure, base proximity, and crosswise digit patterns.

SwiftSum implements these principles into an interactive two-tiered computing environment:
1. **The Vedic Math Playground (`/#vedic-math`)**: A lightweight, instant-response sandbox on the landing page focused on real-time base deficit multiplication (*Nikhilam*).
2. **The 5-Sūtra Computing Engine (`/calculator`)**: A full-featured computing environment with step-by-step playback, 2D crosswise matrix ray tracing, speed scrubbing, and ground-truth verification.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          SwiftSum Architecture                         │
├──────────────────────────────────┬─────────────────────────────────────┤
│      Landing Page (/)            │       Calculator Engine (/calculator)│
│  - 3D Interactive Manuscript     │   - Sūtra Selector Tabs (5 pillars) │
│  - Scrollytelling History        │   - Input Form & Preset Pills       │
│  - Celestial Hero Atmosphere     │   - Interactive Step Player         │
│  - Live Nikhilam Sandbox         │   - 2D Crosswise Vector Matrix      │
│                                  │   - Verification & Ground-Truth Tag │
├──────────────────────────────────┴─────────────────────────────────────┤
│                          lib/math/ Engine                              │
│  urdhvaTiryag.ts  ·  nikhilamMult.ts  ·  squaring.ts                   │
│  nikhilamSub.ts   ·  nikhilamDiv.ts   ·  divisibility.ts                │
└────────────────────────────────────────────────────────────────────────┘
```

---

## How to Access the Tools

### 1. In the Web Application
- **Live Calculator**: Navigate to `http://localhost:3000/calculator` or click the **"Calculator"** button in the top navigation header.
- **Hero Shortcut**: Click **"Try Live Calculator →"** in the Hero section of the landing page.
- **Landing Page Sandbox**: Scroll down to Section 04 (*The Playground*) at `http://localhost:3000/#vedic-math`.

---

## User Interface Guide

When using the dedicated calculator at `/calculator`, you interact with a streamlined obsidian-and-gold interface:

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [ Multiplication ]  [ Squaring ]  [ Subtraction ]  [ Division ]  [...]   │ <-- Sūtra Tabs
├───────────────────────────────────┬─────────────────────────────────────┤
│ INPUT & CONFIGURATION             │ STEP-BY-STEP VISUALIZER             │
│ Presets: [ 98 × 97 ] [ 43 × 21 ]  │ [ ⏮ ] [ ◀ ] [ ▶ PLAY ] [ ▶ ] [ ⏭ ]  │ <-- Player Controls
│ First Multiplicand:  [  98  ]     │ Speed: [ 0.8s ] [ 1.6s ] [ 3.0s ]   │
│ Second Multiplicand: [  97  ]     │ Progress: ━━━━━●━━━━━━━━━ (Step 2/4)│ <-- Scrubber & Pips
│                                   ├─────────────────────────────────────┤
│ [ Compute with Vedic Engine ]     │ SŪTRA CARD & REGISTER               │
│                                   │ Sanskrit: Nikhilam Navatashcaramam  │
│                                   │ Formula: LHS = 98 + (-3) = 95       │
│                                   │ Current Step Register: [ 95 | ... ] │
├───────────────────────────────────┴─────────────────────────────────────┤
│ VERIFICATION & RESULT BANNER                                            │
│ Final Answer: 9,506   |   Verified: Exact Match with CPU ALU Engine     │
└─────────────────────────────────────────────────────────────────────────┘
```

### Key UI Features
- **Sūtra Selector Tabs**: Switch between the 5 primary branches of arithmetic (Multiplication, Squaring, Subtraction, Division, Divisibility).
- **Textbook Presets**: Click any preset pill (e.g., `98 × 97`, `43 × 21`, `85²`) to instantly load classic textbook problems.
- **Interactive Step Player**:
  - **Play / Pause**: Automatically steps through the mathematical deduction.
  - **Step Forward / Backward**: Inspect each mathematical transformation individually.
  - **Scrubber & Pips**: Jump directly to any step by clicking on the timeline track or step numbers.
  - **Speed Selector**: Adjust animation pace between **0.8s (Fast)**, **1.6s (Normal)**, and **3.0s (Study Mode)**.
- **2D Digit Cross Grid** (Multiplication): Displays digits in aligned matrix columns with glowing golden vectors illustrating the active vertical and crosswise pairs for that exact step.
- **Result & Verification Banner**: Shows the final formatted result along with hardware comparison verification (`Verified: Exact Match`).

---

## Mathematical Tools & Working Guide

---

### 1. Multiplication (Ūrdhva-Tiryagbhyām & Nikhilam)

The multiplication tool supports **all numbers of arbitrary length**, automatically routing to the fastest Vedic method.

#### A. Ūrdhva-Tiryagbhyām (उर्ध्व-तिर्यग्भ्याम् — "Vertically and Crosswise")
- **Best For**: Any general multi-digit multiplication (e.g., $43 \times 21$, $312 \times 214$).
- **Algorithm**:
  For an $m$-digit number $A$ and $n$-digit number $B$, the product requires $m + n - 1$ steps.
  In step $s$ (where $s = 0, 1, \dots, m + n - 2$, indexed from right to left):
  $$\text{Sum}_s = \sum_{i + j = s} (A_i \times B_j) + \text{Carry}_{s-1}$$
  $$\text{Result Digit}_s = \text{Sum}_s \pmod{10}$$
  $$\text{Carry}_s = \left\lfloor \frac{\text{Sum}_s}{10} \right\rfloor$$

#### Example: $43 \times 21$
```
     4   3
  ×  2   1
  ────────
```
1. **Step 1 (Vertical Right)**: Multiply unit digits:
   $$3 \times 1 = 3$$
   - Digit: `3`, Carry: `0`.
2. **Step 2 (Crosswise Middle)**: Cross-multiply and add:
   $$(4 \times 1) + (3 \times 2) = 4 + 6 = 10$$
   - Digit: `0`, Carry: `1`.
3. **Step 3 (Vertical Left)**: Multiply tens digits, add incoming carry:
   $$(4 \times 2) + 1 = 8 + 1 = 9$$
   - Digit: `9`, Carry: `0`.
4. **Final Answer**: `903`

---

#### B. Nikhilam Multiplication (निखिलम् नवतश्चरमं दशतः — "All from 9 and the last from 10")
- **Best For**: Numbers sitting close to powers of 10 ($10, 100, 1000, \dots$).
- **Algorithm**:
  1. Identify base $B = 10^k$.
  2. Compute deviations: $d_A = A - B$ and $d_B = B - B$.
  3. Left-Hand Side (LHS): Cross-add: $\text{LHS} = A + d_B = B + d_A$.
  4. Right-Hand Side (RHS): Multiply deviations: $\text{RHS} = d_A \times d_B$.
  5. Format RHS with exactly $k$ digits (the number of zeros in base $B$). Carry over any overflow.

#### Example: $98 \times 97$ (Base 100)
```
  Number    Deviation (Base 100)
    98            -02
  × 97            -03
  ──────────────────────
   LHS            RHS
  98 + (-03)     (-02) × (-03)
     95       |      06
```
1. **LHS**: $98 - 3 = 95$
2. **RHS**: $(-2) \times (-3) = 6 \implies 06$ (2 digits for Base 100)
3. **Combined**: `9506`

---

### 2. Squaring (Ekādhikena Pūrveṇa & Yāvadūnam)

SwiftSum automatically selects the most elegant squaring algorithm based on the structure of the input number.

#### A. Ekādhikena Pūrveṇa (एकाधिकेन पूर्वेण — "By One More than the Previous")
- **Condition**: Numbers ending in 5 ($15, 25, 35, \dots, 85, 125$).
- **Formula**:
  $$\text{For any number } N = 10a + 5: \quad N^2 = [a \times (a + 1)] \mid 25$$

#### Example: $85^2$
1. **Prefix**: $a = 8$, One more: $a + 1 = 9$.
2. **LHS**: $8 \times 9 = 72$.
3. **RHS**: Always $5^2 = 25$.
4. **Final Answer**: `7225`

---

#### B. Yāvadūnam Vargañca Yojayet (यावदूनम् वर्गञ्च योजयेत् — "Whatever the Deficiency, Lessen it Further")
- **Condition**: Numbers near a base of 10 ($96, 994, 108, 1012$).
- **Formula**:
  $$\text{For base } B \text{ with deviation } d = N - B: \quad N^2 = (N + d) \mid d^2$$

#### Example 1: $96^2$ (Deficit Base 100)
1. Base = $100$, Deviation $d = 96 - 100 = -4$.
2. **LHS**: Lessen by deficit: $96 + (-4) = 92$.
3. **RHS**: Square of deficit: $(-4)^2 = 16$.
4. **Final Answer**: `9216`

#### Example 2: $108^2$ (Surplus Base 100)
1. Base = $100$, Deviation $d = +8$.
2. **LHS**: Increase by surplus: $108 + 8 = 116$.
3. **RHS**: Square of surplus: $8^2 = 64$.
4. **Final Answer**: `11664`

---

#### C. General Duplex Method (Dvandva Yoga — द्वन्द्व योग)
- **Condition**: Arbitrary numbers not ending in 5 or near a base ($43^2, 731^2$).
- **Duplex Formulas**:
  - $D(a) = a^2$
  - $D(ab) = 2ab$
  - $D(abc) = 2ac + b^2$
- For a 2-digit number $ab$:
  $$N^2 = D(a) \mid D(ab) \mid D(b) = a^2 \mid 2ab \mid b^2$$

#### Example: $43^2$
1. $D(3) = 3^2 = 9$ (Unit: `9`, Carry: `0`)
2. $D(4, 3) = 2 \times (4 \times 3) = 24$ (Tens: `4`, Carry: `2`)
3. $D(4) = 4^2 + 2 = 16 + 2 = 18$
4. **Final Answer**: `1849`

---

### 3. Subtraction (Nikhilam Navataścaramaṁ Daśataḥ)

The Nikhilam subtraction tool eliminates recursive borrowing by translating subtractions into simple complement deductions.

#### A. Power of 10 Subtractions ($1000 - 347$)
- **Sūtra**: "All from 9 and the last from 10".
- **Rule**:
  1. Pad the subtrahend with leading zeros to match the zero count of the base.
  2. Subtract every preceding digit from 9.
  3. Subtract the rightmost non-zero digit from 10.
  4. Trailing zeros remain unchanged.

#### Example: $10,000 - 6,824$
- Base has 4 zeros. Subtrahend has 4 digits: `6 8 2 4`.
$$\begin{aligned}
9 - 6 &= 3 \\
9 - 8 &= 1 \\
9 - 2 &= 7 \\
10 - 4 &= 6 \quad (\text{last non-zero from 10})
\end{aligned}$$
- **Final Answer**: `3176`

#### B. Arbitrary Subtractions ($524 - 189$)
- Uses the Vedic vinculum complement technique:
  $$\text{Result} = A + \text{Complement}(B) - 10^k$$
  Each digit column operates cleanly without multi-stage backward borrowing.

---

### 4. Division (Nikhilam Vibhāgaḥ & Stambha Vibhāgaḥ)

#### A. Nikhilam Division (Divisors below power of 10)
- **Best For**: Divisors like $9, 8, 89, 97, 889$.
- **Algorithm**:
  1. Divisor has base $B = 10^k$. Compute complement $C = B - D$.
  2. Split dividend: The last $k$ digits form the **Remainder Column**, preceding digits form the **Quotient Column**.
  3. Bring down the first quotient digit.
  4. Multiply this digit by complement $C$, and add the product to the next column.
  5. Repeat across quotient columns.
  6. Add remainder columns. If remainder $\ge D$, adjust: $Q = Q + 1, R = R - D$.

#### Example: $1032 \div 9$
- Base = $10$, Complement $C = 10 - 9 = 1$.
- Split: `1 0 3 | 2` ($k=1$ zero).
```
  Divisor: 9  | Dividend:  1   0   3  |  2
  Comp:   +1  |            ↓   1   2  |  6
  ────────────┼───────────────────────┼────
              | Quot:      1   1   4  |  8
```
1. Bring down `1`.
2. $1 \times 1 = 1$; Add to next column: $0 + 1 = 1$.
3. $1 \times 1 = 1$; Add to next column: $3 + 1 = 4$.
4. $4 \times 1 = 4$; Add to remainder column: $2 + 4 = 6$.
- **Quotient**: `114`, **Remainder**: `6`
- **Verification**: $114 \times 9 + 6 = 1026 + 6 = 1032$ (Exact Match).

---

### 5. Divisibility Check (Veṣṭanam & Navāśeṣa / Bījāṅka)

Multi-digit divisibility in Vedic mathematics does not require long division. SwiftSum uses **Osculation (Veṣṭanam)** for prime divisors and **Bījāṅka (Root Sum)** for digit-sum divisors.

#### A. Ekādhika Osculation (वेष्टनम् — Veṣṭanam)
To test if a number $N = 10a + b$ is divisible by prime $D$:
- Multiply the last digit $b$ by the osculator $P$ or $Q$.
- Add (Positive Osculator $P$) or subtract (Negative Osculator $Q$) from the truncated part $a$.
- Repeat until the remaining number is small enough to test.

| Divisor | Osculator Type | Value | Formula Origin |
|---|---|---|---|
| **19** | Positive ($P$) | $+2$ | $19 + 1 = 20 \implies 2$ |
| **13** | Positive ($P$) | $+4$ | $13 \times 3 = 39 \implies 39 + 1 = 40 \implies 4$ |
| **7** | Negative ($Q$) | $-2$ | $7 \times 3 = 21 \implies 21 - 1 = 20 \implies 2$ |
| **17** | Negative ($Q$) | $-5$ | $17 \times 3 = 51 \implies 51 - 1 = 50 \implies 5$ |

#### Example: Is $27,835$ divisible by $7$? (Negative Osculator $Q = 2$)
$$\text{Formula: } N' = a - (2 \times b)$$
1. **Pass 1**: $2783 - (2 \times 5) = 2783 - 10 = 2773$
2. **Pass 2**: $277 - (2 \times 3) = 277 - 6 = 271$
3. **Pass 3**: $27 - (2 \times 1) = 27 - 2 = 25$
4. **Pass 4**: $25$ is **not** divisible by $7$ ($25 = 7 \times 3 + 4$).
- **Verdict**: $27,835$ is **not** divisible by $7$. Remainder = $1$.

---

#### B. Bījāṅka / Navāśeṣa (Digit-Sum Rule for 3 & 9)
- Sum all digits of the number repeatedly until a single digit (the *Bījāṅka*) remains.
- If the Bījāṅka is 3, 6, or 9 $\implies$ divisible by 3.
- If the Bījāṅka is 9 $\implies$ divisible by 9.

#### C. Alternating Sum for 11
- Sum alternating digits from left to right:
  $$\Delta = (d_0 + d_2 + d_4 + \dots) - (d_1 + d_3 + d_5 + \dots)$$
- If $\Delta$ is 0 or a multiple of 11, the number is divisible by 11.

---

## Programmatic / Developer API

You can import and use any of the calculation engines directly within TypeScript / JavaScript code:

```typescript
import { SUTRA_REGISTRY } from '@/lib/math/registry';
import { urdhvaTiryagbhyam } from '@/lib/math/urdhvaTiryag';
import { calculateSquaring } from '@/lib/math/squaring';
import { checkDivisibility } from '@/lib/math/divisibility';

// 1. General Multiplication via Urdhva-Tiryagbhyam
const multResult = urdhvaTiryagbhyam('43', '21');
console.log(multResult.finalAnswer); // "903"
console.log(multResult.steps.length); // 3 steps with matrix coordinates

// 2. Automated Smart Squaring
const squareResult = calculateSquaring('85');
console.log(squareResult.methodUsed); // "Ekadhikena Purvena"
console.log(squareResult.finalAnswer); // "7225"

// 3. Osculation Divisibility Check
const divCheck = checkDivisibility('39416', '13');
console.log(divCheck.isVerified); // true
console.log(divCheck.finalAnswer); // "Divisible"
```

### TypeScript Data Structures

```typescript
export interface CalculationResult {
  operationId: string;
  sutraName: string;
  sanskritName: string;
  inputs: { a: string; b?: string };
  finalAnswer: string;
  steps: CalculationStep[];
  groundTruth: string;
  isVerified: boolean;
  methodUsed: string;
  notes?: string;
}

export interface CalculationStep {
  stepNumber: number;
  totalSteps: number;
  title: string;
  sanskritSutra?: string;
  explanation: string;
  formula?: string;
  subResult: string;
  accumulatedAnswer: string;
  connections?: DigitConnection[]; // Used for 2D vector ray rendering
}
```

---

## Local Setup & Verification

### Prerequisites
- Node.js `18.17.0` or higher
- npm `9.x` or higher

### Installation & Execution
```bash
# Clone the repository
git clone https://github.com/your-username/IKS-Microproject.git
cd IKS-Microproject/Swiftsum

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` to explore the scrollytelling manuscript and `http://localhost:3000/calculator` to access the computing engine.

### Verification Suite
Run the TypeScript compiler to confirm type safety:
```bash
npx tsc --noEmit
```

Run production build validation:
```bash
npm run build
```

---

## Cultural Heritage & Citations
- **Foundational Text**: *Vedic Mathematics: Sixteen Simple Mathematical Formulae from the Vedas* by Jagadguru Swami Sri Bharati Krishna Tirtha (1884–1960).
- **Sulba Sūtras**: Baudhāyana, Āpastamba, and Kātyāyana (Geometry of sacrificial altars, earliest Pythagorean theorem statements).
- **Bakhshali Manuscript**: Earliest physical evidence of the dot symbol for zero (*śūnya*), dated c. 3rd–4th Century CE.
- **Aryabhatiya**: Āryabhaṭa I (499 CE) — Place-value decimal notation, trigonometry tables, and indeterminate equations.
- **Brahmasphutasiddhanta**: Brahmagupta (628 CE) — First comprehensive axiomatic treatment of zero and negative numbers.
- **Kerala School**: Mādhava of Sangamagrāma (c. 1340–1425 CE) — Discovery of infinite series for $\pi$, sine, and cosine 250 years before Newton and Leibniz.
