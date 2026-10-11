import { CalculationResult, CalculationStep } from './types';

export function isNearBase(a: number, b: number): boolean {
  // Check if both numbers are reasonably close to a power of 10
  const maxVal = Math.max(a, b);
  const power = Math.round(Math.log10(maxVal));
  const base = Math.pow(10, Math.max(1, power));
  
  const devA = Math.abs(a - base);
  const devB = Math.abs(b - base);

  // Consider "near base" if deviations are within 35% of the base
  return devA <= base * 0.35 && devB <= base * 0.35;
}

export function nikhilamMultiplication(aStr: string, bStr: string): CalculationResult {
  const cleanA = aStr.replace(/^0+(?!$)/, '') || '0';
  const cleanB = bStr.replace(/^0+(?!$)/, '') || '0';
  const a = parseInt(cleanA, 10);
  const b = parseInt(cleanB, 10);

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

  const steps: CalculationStep[] = [];
  const TOTAL_STEPS = 6;

  // STEP 1 — SELECT THE BASE
  steps.push({
    stepNumber: 1,
    totalSteps: TOTAL_STEPS,
    title: 'Select the Reference Base',
    sanskritSutra: 'Nikhilam Navatashcaramam Dashatah (Base Selection)',
    explanation: `Identify the nearest power-of-10 landmark base: Base = ${base} (having ${numZeros} zero${numZeros > 1 ? 's' : ''}). Both ${a} and ${b} are evaluated relative to this base.`,
    formula: `Base = ${base}`,
    subResult: `Base: ${base}`,
    accumulatedAnswer: `Base: ${base}`,
    what: `Base = ${base}`,
    why: `Both numbers (${a} and ${b}) are close to ${base}, making this base convenient for calculating small distance offsets.`,
    how: `Establishes the coordinate system and allocates exactly ${numZeros} digit slot${numZeros > 1 ? 's' : ''} for the right part.`
  });

  // STEP 2 — FIND THE DEVIATIONS
  steps.push({
    stepNumber: 2,
    totalSteps: TOTAL_STEPS,
    title: 'Find the Deviations',
    sanskritSutra: 'Yavadunam Tavadhunam (Deviation Metric)',
    explanation: `Compute the signed deviation of each factor from base ${base}:\n${a} − ${base} = ${devAStr}\n${b} − ${base} = ${devBStr}`,
    formula: `Dev(${a}) = ${a} − ${base} = ${devAStr} | Dev(${b}) = ${b} − ${base} = ${devBStr}`,
    subResult: `Deviations: [${devAStr}, ${devBStr}]`,
    accumulatedAnswer: `${a} (${devAStr}) × ${b} (${devBStr})`,
    what: `${a} − ${base} = ${devAStr}, ${b} − ${base} = ${devBStr}`,
    why: `The deviations measure how far each number is from the selected base, turning multi-digit multiplication into single-digit arithmetic.`,
    how: `Stores the signed coordinates [${devAStr}, ${devBStr}] for cross-addition and deviation multiplication.`
  });

  // STEP 3 — CROSS-ADD
  const lhs = a + devB; // also equals b + devA
  steps.push({
    stepNumber: 3,
    totalSteps: TOTAL_STEPS,
    title: 'Cross-Add for Left-Hand Side (LHS)',
    sanskritSutra: 'Tiryag Yogah (Crosswise Combination)',
    explanation: `Add either number with the other factor's deviation:\n${a} + (${devBStr}) = ${lhs}\nNotice that ${b} + (${devAStr}) also equals ${lhs}! This algebraic symmetry guarantees correctness.`,
    formula: `LHS = ${a} + (${devBStr}) = ${lhs}`,
    subResult: `LHS = ${lhs}`,
    accumulatedAnswer: `${lhs} | ...`,
    what: `${a} + (${devBStr}) = ${lhs} (or ${b} + (${devAStr}) = ${lhs})`,
    why: `Cross-addition gives the left part of the final result by evaluating the base-multiple term B(B + a + b).`,
    how: `Provides the higher-order component: LEFT PART = ${lhs}.`
  });

  // STEP 4 — MULTIPLY THE DEVIATIONS
  const rhsRaw = devA * devB;
  steps.push({
    stepNumber: 4,
    totalSteps: TOTAL_STEPS,
    title: 'Multiply the Deviations for Right-Hand Side (RHS)',
    sanskritSutra: 'Charamayorghatah (Product of Deviations)',
    explanation: `Multiply the two signed deviations together: (${devAStr}) × (${devBStr}) = ${rhsRaw}.`,
    formula: `RHS = (${devAStr}) × (${devBStr}) = ${rhsRaw}`,
    subResult: `Raw RHS = ${rhsRaw}`,
    accumulatedAnswer: `${lhs} | ${rhsRaw}`,
    what: `(${devAStr}) × (${devBStr}) = ${rhsRaw}`,
    why: `This evaluates the remainder component ab in the algebraic identity (B + a)(B + b) = B(B + a + b) + ab.`,
    how: `Gives the right part of the result: Raw RHS = ${rhsRaw}.`
  });

  // STEP 5 — ALIGN THE PLACE VALUES
  let finalLhs = lhs;
  let finalRhsStr = '';
  let balancingWhy = '';

  if (rhsRaw >= 0) {
    const rhsDigits = rhsRaw.toString();
    if (rhsDigits.length < numZeros) {
      finalRhsStr = rhsDigits.padStart(numZeros, '0');
      balancingWhy = `The base is ${base} (${numZeros} zeros), so the right part requires ${numZeros} digits. We zero-pad "${rhsDigits}" to "${finalRhsStr}".`;
    } else if (rhsDigits.length > numZeros) {
      const overflow = Math.floor(rhsRaw / Math.pow(10, numZeros));
      const remainderRhs = rhsRaw % Math.pow(10, numZeros);
      finalLhs += overflow;
      finalRhsStr = remainderRhs.toString().padStart(numZeros, '0');
      balancingWhy = `The product ${rhsRaw} exceeds ${numZeros} digits. Carry overflow of ${overflow} to LHS (${lhs} + ${overflow} = ${finalLhs}), leaving "${finalRhsStr}" on RHS.`;
    } else {
      finalRhsStr = rhsDigits;
      balancingWhy = `The base is ${base} (${numZeros} zeros), and the right part fits exactly into ${numZeros} digits.`;
    }
  } else {
    const absRhs = Math.abs(rhsRaw);
    const borrow = Math.ceil(absRhs / base);
    finalLhs -= borrow;
    const adjustedRhs = borrow * base + rhsRaw;
    finalRhsStr = adjustedRhs.toString().padStart(numZeros, '0');
    balancingWhy = `Since the RHS was negative (${rhsRaw}), borrow ${borrow} from LHS (${lhs} − ${borrow} = ${finalLhs}) and compute (${borrow} × ${base}) + (${rhsRaw}) = "${finalRhsStr}".`;
  }

  const finalAnswer = (BigInt(finalLhs) * BigInt(base) + BigInt(finalRhsStr)).toString();

  steps.push({
    stepNumber: 5,
    totalSteps: TOTAL_STEPS,
    title: 'Align Place Values & Synthesize',
    sanskritSutra: 'Samyojanam (Positional Alignment)',
    explanation: `Align the RHS into ${numZeros} digit columns. ${balancingWhy}\nCombine: ${finalLhs} × ${base} + ${finalRhsStr} = ${finalAnswer}.`,
    formula: `${finalLhs} | ${finalRhsStr} = ${finalAnswer}`,
    subResult: `Aligned: ${finalAnswer}`,
    accumulatedAnswer: finalAnswer,
    what: `${finalLhs} | ${finalRhsStr}`,
    why: balancingWhy,
    how: `Synthesizes the complete positional decimal answer: ${finalAnswer}.`
  });

  // STEP 6 — VERIFY
  const groundTruth = (BigInt(a) * BigInt(b)).toString();
  const isVerified = finalAnswer === groundTruth;

  steps.push({
    stepNumber: 6,
    totalSteps: TOTAL_STEPS,
    title: 'Hardware & Arithmetic Verification',
    sanskritSutra: 'Shuddhi Pariksha (Proof Verification)',
    explanation: `Verify the Nikhilam result against standard arithmetic calculation:\nNikhilam Output: ${finalAnswer}\nGround Truth (${a} × ${b}): ${groundTruth}\nVerification: ${isVerified ? 'PASSED (100% Precision Match)' : 'FAILED'}`,
    formula: `${a} × ${b} = ${finalAnswer} (${isVerified ? 'Verified ✓' : 'Mismatch'})`,
    subResult: `Verified: ${finalAnswer}`,
    accumulatedAnswer: finalAnswer,
    what: `${a} × ${b} = ${finalAnswer}`,
    why: `Verification confirms that the method produced the correct product without algebraic or arithmetic error.`,
    how: `Proves algorithm correctness and guarantees mathematical parity: ${finalAnswer}.`
  });

  return {
    operationId: 'multiplication',
    sutraName: 'Nikhilam Navatashcaramam Dashatah (Base Multiplication)',
    sanskritName: 'Nikhilam Navatashcaramam Dashatah',
    inputs: { a: cleanA, b: cleanB },
    finalAnswer,
    steps,
    groundTruth,
    isVerified,
    methodUsed: `Nikhilam base-${base} multiplication`,
    notes: `Calculated relative to Base ${base} with deviations ${devAStr} and ${devBStr}.`,
  };
}
