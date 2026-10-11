export interface NikhilamChapter {
  id: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  durationSeconds: number;
  startTimeSeconds: number;
  endTimeSeconds: number;
  narrationText: string;
  captionText: string;
  equations: string[];
  active3dFocus: 'intro' | 'base' | 'deviations' | 'crossAdd' | 'multiplyDev' | 'combine' | 'verify';
  explanationDetails: {
    what: string;
    why: string;
    how: string;
  };
}

export interface NikhilamLessonData {
  a: number;
  b: number;
  aStr: string;
  bStr: string;
  base: number;
  numZeros: number;
  devA: number;
  devB: number;
  devAStr: string;
  devBStr: string;
  absDevA: number;
  absDevB: number;
  lhs1: number; // a + devB
  lhs2: number; // b + devA
  lhs: number;
  rawRhs: number; // devA * devB
  balancedLhs: number;
  balancedRhsStr: string;
  finalAnswer: string;
  groundTruth: string;
  isVerified: boolean;
  isSuitableForNikhilam: boolean;
  totalDurationSeconds: number;
  chapters: NikhilamChapter[];
}

/**
 * Determine the optimal base and compute all variables for Nikhilam multiplication
 */
export function generateNikhilamLesson(aInput: string | number, bInput: string | number): NikhilamLessonData {
  const cleanA = String(aInput).replace(/^0+(?!$)/, '') || '0';
  const cleanB = String(bInput).replace(/^0+(?!$)/, '') || '0';
  const a = parseInt(cleanA, 10) || 0;
  const b = parseInt(cleanB, 10) || 0;

  // Determine closest power of 10 base
  const maxDigits = Math.max(cleanA.length, cleanB.length);
  const base1 = Math.pow(10, Math.max(1, maxDigits));
  const base2 = Math.pow(10, Math.max(1, maxDigits - 1));

  const dist1 = Math.max(Math.abs(a - base1), Math.abs(b - base1));
  const dist2 = Math.max(Math.abs(a - base2), Math.abs(b - base2));

  const base = dist1 <= dist2 ? base1 : base2;
  const numZeros = Math.max(1, Math.round(Math.log10(base)));

  const devA = a - base;
  const devB = b - base;
  const devAStr = devA >= 0 ? `+${devA}` : `${devA}`;
  const devBStr = devB >= 0 ? `+${devB}` : `${devB}`;
  const absDevA = Math.abs(devA);
  const absDevB = Math.abs(devB);

  // Left-hand side cross additions
  const lhs1 = a + devB;
  const lhs2 = b + devA;
  const lhs = lhs1; // both are algebraically identical

  // Right-hand side product
  const rawRhs = devA * devB;

  // Balancing & normalization
  let balancedLhs = lhs;
  let balancedRhsStr = '';

  if (rawRhs >= 0) {
    const rawRhsStr = rawRhs.toString();
    if (rawRhsStr.length < numZeros) {
      balancedRhsStr = rawRhsStr.padStart(numZeros, '0');
    } else if (rawRhsStr.length > numZeros) {
      const overflow = Math.floor(rawRhs / Math.pow(10, numZeros));
      const rem = rawRhs % Math.pow(10, numZeros);
      balancedLhs += overflow;
      balancedRhsStr = rem.toString().padStart(numZeros, '0');
    } else {
      balancedRhsStr = rawRhsStr;
    }
  } else {
    // Negative RHS (one above, one below base)
    const absRhs = Math.abs(rawRhs);
    const borrow = Math.ceil(absRhs / base);
    balancedLhs -= borrow;
    const adjusted = borrow * base + rawRhs;
    balancedRhsStr = adjusted.toString().padStart(numZeros, '0');
  }

  const finalProductBig = BigInt(balancedLhs) * BigInt(base) + BigInt(balancedRhsStr);
  const finalAnswer = finalProductBig.toString();
  const groundTruthBig = BigInt(a) * BigInt(b);
  const groundTruth = groundTruthBig.toString();
  const isVerified = finalAnswer === groundTruth;

  // Check whether inputs are within reasonable proximity to base (within 40% of base)
  const isSuitableForNikhilam = absDevA <= base * 0.4 && absDevB <= base * 0.4;

  // Optimized Chapter durations (in seconds): total 34s (approx 32–36s)
  const durations = [3, 4, 5, 6, 6, 5, 5];
  const totalDurationSeconds = durations.reduce((sum, d) => sum + d, 0);

  let currentStart = 0;

  const signNote =
    devA < 0 && devB < 0
      ? `Both numbers are below base ${base}, so both deviations are negative (${devAStr} and ${devBStr}).`
      : devA >= 0 && devB >= 0
      ? `Both numbers are above base ${base}, so both deviations are positive (${devAStr} and ${devBStr}).`
      : `One number is above and one is below base ${base}, producing signed deviations ${devAStr} and ${devBStr}.`;

  const multiplySignNote =
    devA < 0 && devB < 0
      ? `Multiplying two negative deviations produces a positive product: (${devAStr}) × (${devBStr}) = +${rawRhs}.`
      : devA >= 0 && devB >= 0
      ? `Multiplying two positive deviations produces: (${devAStr}) × (${devBStr}) = +${rawRhs}.`
      : `Multiplying opposite-signed deviations gives a negative product: (${devAStr}) × (${devBStr}) = ${rawRhs}.`;

  const placeValueNote =
    numZeros > 1 && rawRhs >= 0 && rawRhs.toString().length < numZeros
      ? `Because base ${base} has ${numZeros} zeros, the right part must occupy ${numZeros} digits. We write "${balancedRhsStr}" by prefixing a leading zero.`
      : rawRhs >= 0 && rawRhs.toString().length > numZeros
      ? `Because the product ${rawRhs} exceeds ${numZeros} digits, the excess carries to the left side.`
      : `The right part fits the ${numZeros} digits allocated by base ${base}.`;

  const chapters: NikhilamChapter[] = [
    {
      id: 1,
      title: 'Introduction: The Nikhilam Method',
      shortTitle: 'Introduction',
      subtitle: 'Nikhilam Navatashcaramam Dashatah Sūtra',
      durationSeconds: durations[0],
      startTimeSeconds: currentStart,
      endTimeSeconds: (currentStart += durations[0]),
      narrationText: `Can we multiply ${a} times ${b} without conventional long multiplication? When numbers are near a power of ten, the ancient Nikhilam sūtra enables lightning-fast mental multiplication by examining deviations.`,
      captionText: `Multiplication using the Nikhilam method. Can we multiply ${a} × ${b} without long multiplication? When numbers are close to ${base}, deviations from ${base} simplify calculation.`,
      equations: [`${a} × ${b} = ?`, `Target: Compute via Nikhilam Sūtra`],
      active3dFocus: 'intro',
      explanationDetails: {
        what: `Multiply two numbers: ${a} × ${b}`,
        why: `Conventional multi-digit multiplication involves repetitive columnar additions. The Vedic method maps numbers to a common benchmark.`,
        how: `Reduces a complex multi-digit product into a simple 1-digit deviation arithmetic.`
      }
    },
    {
      id: 2,
      title: 'Identify the Reference Base',
      shortTitle: 'Identify Base',
      subtitle: `Reference Base = ${base} (${numZeros} Zeros)`,
      durationSeconds: durations[1],
      startTimeSeconds: currentStart,
      endTimeSeconds: (currentStart += durations[1]),
      narrationText: `Establish ${base} as our mathematical reference plane. ${a} is ${absDevA} ${devA < 0 ? 'less than' : 'greater than'} ${base}, and ${b} is ${absDevB} ${devB < 0 ? 'less than' : 'greater than'} ${base}. Both numbers are anchored to this base.`,
      captionText: `Base = ${base}. ${a} = ${base} ${devAStr} (${absDevA} ${devA < 0 ? 'deficit' : 'surplus'}). ${b} = ${base} ${devBStr} (${absDevB} ${devB < 0 ? 'deficit' : 'surplus'}).`,
      equations: [
        `Base = ${base}`,
        `${a} = ${base} ${devAStr}`,
        `${b} = ${base} ${devBStr}`
      ],
      active3dFocus: 'base',
      explanationDetails: {
        what: `Choose Base = ${base}`,
        why: `Both numbers are near ${base}, so measuring distance from ${base} yields small, manageable numbers.`,
        how: `The base determines the number of allocated digit positions (${numZeros}) for the right part.`
      }
    },
    {
      id: 3,
      title: 'Calculate the Deviations',
      shortTitle: 'Deviations',
      subtitle: `Dev(${a}) = ${devAStr} | Dev(${b}) = ${devBStr}`,
      durationSeconds: durations[2],
      startTimeSeconds: currentStart,
      endTimeSeconds: (currentStart += durations[2]),
      narrationText: `Calculate the signed deviations from base ${base}. Number ${a} gives ${devAStr}, and number ${b} gives ${devBStr}. ${signNote}`,
      captionText: `First number: ${a} ➔ Deviation: ${devAStr}. Second number: ${b} ➔ Deviation: ${devBStr}. ${signNote}`,
      equations: [
        `${a} − ${base} = ${devAStr}`,
        `${b} − ${base} = ${devBStr}`,
        `Deviation Register: [${devAStr}, ${devBStr}]`
      ],
      active3dFocus: 'deviations',
      explanationDetails: {
        what: `Compute deviations: ${devAStr} and ${devBStr}`,
        why: `Deviations measure how far each factor deviates from the selected base.`,
        how: `These signed offsets become the inputs for the cross-addition and deviation multiplication.`
      }
    },
    {
      id: 4,
      title: 'Cross-Addition (Left Part)',
      shortTitle: 'Cross-Addition',
      subtitle: `LEFT PART = ${lhs}`,
      durationSeconds: durations[3],
      startTimeSeconds: currentStart,
      endTimeSeconds: (currentStart += durations[3]),
      narrationText: `Perform cross-addition. Add either number to the other number's deviation. ${a} plus ${devBStr} gives ${lhs}. Notice ${b} plus ${devAStr} also gives ${lhs}! This perfect symmetry guarantees our left part is ${lhs}.`,
      captionText: `Cross-add either number with the opposite deviation: ${a} + (${devBStr}) = ${lhs}, and ${b} + (${devAStr}) = ${lhs}. LEFT PART = ${lhs}.`,
      equations: [
        `${a} + (${devBStr}) = ${lhs}`,
        `${b} + (${devAStr}) = ${lhs}`,
        `LEFT PART = ${lhs}`
      ],
      active3dFocus: 'crossAdd',
      explanationDetails: {
        what: `Cross-add: ${a} + (${devBStr}) = ${lhs}`,
        why: `Because (B + a)(B + b) = B(B + a + b) + ab = B(x + b) + ab. Cross-addition produces (B + a + b).`,
        how: `Forms the higher place-value component representing ${lhs} × ${base}.`
      }
    },
    {
      id: 5,
      title: 'Multiply the Deviations (Right Part)',
      shortTitle: 'Multiply Deviations',
      subtitle: `RIGHT PART = ${balancedRhsStr}`,
      durationSeconds: durations[4],
      startTimeSeconds: currentStart,
      endTimeSeconds: (currentStart += durations[4]),
      narrationText: `Multiply the deviations: ${devAStr} times ${devBStr} equals ${rawRhs}. ${multiplySignNote} ${placeValueNote}`,
      captionText: `(${devAStr}) × (${devBStr}) = ${rawRhs}. Because base is ${base} (${numZeros} zeros), the right part requires ${numZeros} digits: "${balancedRhsStr}".`,
      equations: [
        `(${devAStr}) × (${devBStr}) = ${rawRhs}`,
        `Formatted RHS (${numZeros} digits) = ${balancedRhsStr}`,
        `RIGHT PART = ${balancedRhsStr}`
      ],
      active3dFocus: 'multiplyDev',
      explanationDetails: {
        what: `Multiply deviations: (${devAStr}) × (${devBStr}) = ${rawRhs}`,
        why: `This evaluates the ab term in the algebraic expansion (B + a)(B + b).`,
        how: `Provides the lower place-value component. Zero-padding ensures correct decimal alignment.`
      }
    },
    {
      id: 6,
      title: 'Combine Both Parts',
      shortTitle: 'Combine Parts',
      subtitle: `${balancedLhs} | ${balancedRhsStr} ➔ ${finalAnswer}`,
      durationSeconds: durations[5],
      startTimeSeconds: currentStart,
      endTimeSeconds: (currentStart += durations[5]),
      narrationText: `Bring the two components together: ${balancedLhs} on the left, and ${balancedRhsStr} on the right. Concatenation is shorthand for ${balancedLhs} times ${base} plus ${balancedRhsStr}, yielding the product ${finalAnswer}.`,
      captionText: `LEFT PART [${balancedLhs}] and RIGHT PART [${balancedRhsStr}] join: ${balancedLhs} × ${base} + ${balancedRhsStr} = ${finalAnswer}.`,
      equations: [
        `${balancedLhs} | ${balancedRhsStr}`,
        `= ${balancedLhs} × ${base} + ${balancedRhsStr}`,
        `= ${finalAnswer}`
      ],
      active3dFocus: 'combine',
      explanationDetails: {
        what: `Synthesize: ${balancedLhs} × ${base} + ${balancedRhsStr} = ${finalAnswer}`,
        why: `Combines the base multiple and unit remainder into the complete positional decimal value.`,
        how: `Produces the final computed product without any long-division scratch work.`
      }
    },
    {
      id: 7,
      title: 'Final Result & Verification',
      shortTitle: 'Verification',
      subtitle: `${a} × ${b} = ${finalAnswer} (100% Verified)`,
      durationSeconds: durations[6],
      startTimeSeconds: currentStart,
      endTimeSeconds: (currentStart += durations[6]),
      narrationText: `The calculation is complete. ${a} multiplied by ${b} equals ${finalAnswer}. Hardware arithmetic verifies the exact same answer: ${groundTruth}. Understand the pattern, master the calculation!`,
      captionText: `Final Verified Product: ${a} × ${b} = ${finalAnswer}. Nikhilam: ${finalAnswer} | Independent arithmetic: ${groundTruth}. Match confirmed!`,
      equations: [
        `${a} × ${b} = ${finalAnswer}`,
        `Nikhilam Result: ${finalAnswer}`,
        `Arithmetic Verification: ${groundTruth} ✓`
      ],
      active3dFocus: 'verify',
      explanationDetails: {
        what: `Independent verification check: ${a} × ${b} = ${finalAnswer}`,
        why: `Validates that the Vedic shortcut exactly equals standard algebraic arithmetic.`,
        how: `Confirms zero calculation error and verifies mathematical proof.`
      }
    }
  ];

  return {
    a,
    b,
    aStr: cleanA,
    bStr: cleanB,
    base,
    numZeros,
    devA,
    devB,
    devAStr,
    devBStr,
    absDevA,
    absDevB,
    lhs1,
    lhs2,
    lhs,
    rawRhs,
    balancedLhs,
    balancedRhsStr,
    finalAnswer,
    groundTruth,
    isVerified,
    isSuitableForNikhilam,
    totalDurationSeconds,
    chapters
  };
}
