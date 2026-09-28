import { CalculationResult, CalculationStep } from './types';

export function isNearBase(a: number, b: number): boolean {
  // Check if both numbers are reasonably close to a power of 10
  const maxVal = Math.max(a, b);
  const minVal = Math.min(a, b);
  const power = Math.round(Math.log10(maxVal));
  const base = Math.pow(10, Math.max(1, power));
  
  const devA = Math.abs(a - base);
  const devB = Math.abs(b - base);

  // Consider "near base" if deviations are within 35% of the base
  return devA <= base * 0.35 && devB <= base * 0.35;
}

export function nikhilamMultiplication(aStr: string, bStr: string): CalculationResult {
  const a = parseInt(aStr, 10);
  const b = parseInt(bStr, 10);

  // Determine closest power of 10 base
  const maxDigits = Math.max(aStr.length, bStr.length);
  // Compare 10^(maxDigits-1) and 10^maxDigits
  const base1 = Math.pow(10, Math.max(1, maxDigits));
  const base2 = Math.pow(10, Math.max(1, maxDigits - 1));
  
  const dist1 = Math.max(Math.abs(a - base1), Math.abs(b - base1));
  const dist2 = Math.max(Math.abs(a - base2), Math.abs(b - base2));
  
  const base = dist1 <= dist2 ? base1 : base2;
  const numZeros = Math.round(Math.log10(base));

  const devA = a - base;
  const devB = b - base;

  const steps: CalculationStep[] = [];

  // Step 1: Determine Base & Deviations
  const devAStr = devA >= 0 ? `+${devA}` : `${devA}`;
  const devBStr = devB >= 0 ? `+${devB}` : `${devB}`;

  steps.push({
    stepNumber: 1,
    totalSteps: 4,
    title: 'Select Base & Compute Deviations',
    sanskritSutra: 'Nikhilam Navatashcaramam Dashatah',
    explanation: `Identify the nearest power-of-10 base: Base = ${base} (having ${numZeros} zero${numZeros > 1 ? 's' : ''}). Calculate deviation of each number from the base:
Deviation of ${a} = ${a} - ${base} = ${devAStr}
Deviation of ${b} = ${b} - ${base} = ${devBStr}`,
    formula: `Base = ${base} | Dev(${a}) = ${devAStr} | Dev(${b}) = ${devBStr}`,
    subResult: `Deviations: [${devAStr}, ${devBStr}]`,
    accumulatedAnswer: `${a} (${devAStr}) × ${b} (${devBStr})`,
  });

  // Step 2: Compute Left-Hand Side (Cross-addition / Subtraction)
  const lhs = a + devB; // equals b + devA
  steps.push({
    stepNumber: 2,
    totalSteps: 4,
    title: 'Cross-Add for Left-Hand Side (LHS)',
    sanskritSutra: 'Tiryag Yogah (Crosswise Combination)',
    explanation: `Compute the left portion of the answer by cross-adding either number with the other's deviation:
${a} + (${devBStr}) = ${lhs}
Notice that ${b} + (${devAStr}) also equals ${lhs}! This beautiful symmetry guarantees correctness.`,
    formula: `LHS = ${a} + (${devBStr}) = ${lhs}`,
    subResult: `LHS = ${lhs}`,
    accumulatedAnswer: `${lhs} | ...`,
  });

  // Step 3: Compute Right-Hand Side (Product of Deviations)
  const rhsRaw = devA * devB;
  steps.push({
    stepNumber: 3,
    totalSteps: 4,
    title: 'Multiply Deviations for Right-Hand Side (RHS)',
    sanskritSutra: 'Charamayorghatah (Product of Deviations)',
    explanation: `Multiply the two deviations together: (${devAStr}) × (${devBStr}) = ${rhsRaw}. The RHS must occupy exactly ${numZeros} digit place${numZeros > 1 ? 's' : ''} (equal to the number of zeros in Base ${base}).`,
    formula: `RHS = (${devAStr}) × (${devBStr}) = ${rhsRaw}`,
    subResult: `Raw RHS = ${rhsRaw}`,
    accumulatedAnswer: `${lhs} | ${rhsRaw}`,
  });

  // Step 4: Balancing and Final Combination
  let finalLhs = lhs;
  let finalRhsStr = '';

  if (rhsRaw >= 0) {
    const rhsDigits = rhsRaw.toString();
    if (rhsDigits.length < numZeros) {
      // Pad with leading zeros
      finalRhsStr = rhsDigits.padStart(numZeros, '0');
    } else if (rhsDigits.length > numZeros) {
      // Carry overflow to LHS
      const overflow = Math.floor(rhsRaw / Math.pow(10, numZeros));
      const remainderRhs = rhsRaw % Math.pow(10, numZeros);
      finalLhs += overflow;
      finalRhsStr = remainderRhs.toString().padStart(numZeros, '0');
    } else {
      finalRhsStr = rhsDigits;
    }
  } else {
    // Negative RHS (one number above base, one below)
    // Borrow 1 from LHS
    finalLhs -= 1;
    const adjustedRhs = base + rhsRaw;
    finalRhsStr = adjustedRhs.toString().padStart(numZeros, '0');
  }

  const finalAnswer = (BigInt(finalLhs) * BigInt(base) + BigInt(finalRhsStr)).toString();

  steps.push({
    stepNumber: 4,
    totalSteps: 4,
    title: 'Align Digits & Synthesize Final Result',
    sanskritSutra: 'Samyojanam (Final Synthesis)',
    explanation: `Align the RHS into ${numZeros} digit columns.${rhsRaw < 0 ? ` Since RHS was negative, borrow 1 from LHS (${lhs} - 1 = ${finalLhs}) and compute ${base} - ${Math.abs(rhsRaw)} = ${finalRhsStr}.` : rhsRaw.toString().length < numZeros ? ` Zero-pad RHS to ${numZeros} digits: "${finalRhsStr}".` : ''}
Combine: ${finalLhs} × ${base} + ${finalRhsStr} = ${finalAnswer}.`,
    formula: `${finalLhs} | ${finalRhsStr} = ${finalAnswer}`,
    subResult: `Answer: ${finalAnswer}`,
    accumulatedAnswer: finalAnswer,
  });

  const groundTruth = (BigInt(a) * BigInt(b)).toString();
  const isVerified = finalAnswer === groundTruth;

  return {
    operationId: 'multiplication',
    sutraName: 'Nikhilam Navatashcaramam Dashatah (Base Multiplication)',
    sanskritName: 'Nikhilam Navatashcaramam Dashatah',
    inputs: { a: aStr, b: bStr },
    finalAnswer,
    steps,
    groundTruth,
    isVerified,
    methodUsed: `Nikhilam base-${base} multiplication`,
    notes: `Calculated relative to Base ${base} with deviations ${devAStr} and ${devBStr}.`,
  };
}
