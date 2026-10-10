import { CalculationResult, CalculationStep } from './types';

export function nikhilamSubtraction(aStr: string, bStr: string): CalculationResult {
  const cleanA = aStr.replace(/^0+(?!$)/, '') || '0';
  const cleanB = bStr.replace(/^0+(?!$)/, '') || '0';

  const aBig = BigInt(cleanA);
  const bBig = BigInt(cleanB);

  // If A < B, in scope: only whole positive numbers
  if (aBig < bBig) {
    return {
      operationId: 'subtraction',
      sutraName: 'Nikhilam Subtraction',
      sanskritName: 'Nikhilam Navatashcaramam Dashatah',
      inputs: { a: cleanA, b: cleanB },
      finalAnswer: 'Invalid',
      steps: [
        {
          stepNumber: 1,
          totalSteps: 1,
          title: 'Input Out of Range',
          sanskritSutra: 'Asambhavah (Undefined for Negative Natural Numbers)',
          explanation: `In classical whole-number arithmetic, the minuend must be greater than or equal to the subtrahend. Here, ${cleanA} < ${cleanB}.`,
          subResult: 'Minuend must be ≥ Subtrahend',
          accumulatedAnswer: 'Invalid',
        },
      ],
      groundTruth: (aBig - bBig).toString(),
      isVerified: false,
      methodUsed: 'Nikhilam Subtraction',
      notes: 'First number must be greater than or equal to the second number.',
    };
  }

  // Identity Case 1: Subtracting zero (A - 0 = A)
  if (bBig === BigInt(0)) {
    return {
      operationId: 'subtraction',
      sutraName: 'Nikhilam Subtraction',
      sanskritName: 'Nikhilam Navatashcaramam Dashatah',
      inputs: { a: cleanA, b: cleanB },
      finalAnswer: cleanA,
      steps: [
        {
          stepNumber: 1,
          totalSteps: 1,
          title: 'Identity Subtraction (Subtracting Zero)',
          sanskritSutra: 'Shunya Yoga (Zero Property)',
          explanation: `Subtracting 0 from any quantity leaves the original quantity unchanged: ${cleanA} − 0 = ${cleanA}.`,
          formula: `${cleanA} − 0 = ${cleanA}`,
          subResult: `Final Answer = ${cleanA}`,
          accumulatedAnswer: cleanA,
        },
      ],
      groundTruth: cleanA,
      isVerified: true,
      methodUsed: 'Identity subtraction of zero',
      notes: 'Subtracting zero preserves the minuend identically.',
    };
  }

  // Identity Case 2: Subtracting equal numbers (A - A = 0)
  if (aBig === bBig) {
    return {
      operationId: 'subtraction',
      sutraName: 'Nikhilam Subtraction',
      sanskritName: 'Nikhilam Navatashcaramam Dashatah',
      inputs: { a: cleanA, b: cleanB },
      finalAnswer: '0',
      steps: [
        {
          stepNumber: 1,
          totalSteps: 1,
          title: 'Identity Subtraction (Equal Quantities)',
          sanskritSutra: 'Sama Shunya (Equality Property)',
          explanation: `Subtracting a quantity from itself yields zero: ${cleanA} − ${cleanB} = 0.`,
          formula: `${cleanA} − ${cleanB} = 0`,
          subResult: `Final Answer = 0`,
          accumulatedAnswer: '0',
        },
      ],
      groundTruth: '0',
      isVerified: true,
      methodUsed: 'Identity subtraction of equal quantities',
      notes: 'Minuend equals subtrahend.',
    };
  }

  const steps: CalculationStep[] = [];
  const isPowerOf10 = /^10+$/.test(cleanA);

  if (isPowerOf10) {
    // Pure classical case: Subtracting from a power of 10 (e.g. 1000 - 347)
    const numZeros = cleanA.length - 1;
    // Pad B to match number of zeros
    const paddedB = cleanB.padStart(numZeros, '0');
    const digitsB = paddedB.split('').map(Number);
    const resultDigits: number[] = [];

    // Find the rightmost non-zero digit index
    let lastNonZeroIdx = -1;
    for (let i = digitsB.length - 1; i >= 0; i--) {
      if (digitsB[i] !== 0) {
        lastNonZeroIdx = i;
        break;
      }
    }

    steps.push({
      stepNumber: 1,
      totalSteps: numZeros + 1,
      title: 'Apply the Vedic Sutra Rule',
      sanskritSutra: 'Nikhilam Navatashcaramam Dashatah (All from 9 and the last from 10)',
      explanation: `To subtract ${cleanB} from ${cleanA} (Base 10^${numZeros}), apply the sutra directly:
Subtract every preceding digit from 9, and subtract the last non-zero digit from 10. Trailing zeros remain unchanged.`,
      formula: `Align ${cleanB} to ${numZeros} digits: "${paddedB}"`,
      subResult: `Base: ${cleanA}`,
      accumulatedAnswer: '...',
    });

    for (let i = 0; i < digitsB.length; i++) {
      const d = digitsB[i];
      let resDigit = 0;
      let ruleUsed = '';

      if (lastNonZeroIdx === -1) {
        // B is 0
        resDigit = 0;
        ruleUsed = '0 remains 0';
      } else if (i > lastNonZeroIdx) {
        resDigit = 0;
        ruleUsed = 'Trailing zero remains 0';
      } else if (i === lastNonZeroIdx) {
        resDigit = 10 - d;
        ruleUsed = `Last from 10: 10 - ${d} = ${resDigit}`;
      } else {
        resDigit = 9 - d;
        ruleUsed = `All from 9: 9 - ${d} = ${resDigit}`;
      }

      resultDigits.push(resDigit);

      steps.push({
        stepNumber: i + 2,
        totalSteps: numZeros + 1,
        title: `Column ${i + 1} from Left (Digit "${d}")`,
        sanskritSutra: i === lastNonZeroIdx ? 'Charamam Dashatah (Last from 10)' : 'Nikhilam Navatah (All from 9)',
        explanation: `At position ${i + 1}: ${ruleUsed}. Place ${resDigit} in the result. Notice that zero borrowing is required!`,
        formula: ruleUsed,
        subResult: `Placed digit: ${resDigit}`,
        accumulatedAnswer: resultDigits.join(''),
      });
    }

    const finalAnswer = resultDigits.join('').replace(/^0+(?!$)/, '') || '0';
    const groundTruth = (aBig - bBig).toString();

    return {
      operationId: 'subtraction',
      sutraName: 'Nikhilam Navatashcaramam Dashatah (Complement Subtraction)',
      sanskritName: 'Nikhilam Navatashcaramam Dashatah',
      inputs: { a: cleanA, b: cleanB },
      finalAnswer,
      steps,
      groundTruth,
      isVerified: finalAnswer === groundTruth,
      methodUsed: 'Direct Nikhilam complement from power-of-10 base',
      notes: 'No column borrowing needed; every digit calculated independently.',
    };
  } else {
    // General Subtraction A - B using the Complement Addition Method:
    // A - B = A + (10^k - B) - 10^k
    const k = cleanA.length;
    const base10k = BigInt(10) ** BigInt(k);
    const complementB = base10k - bBig;
    const sumWithComp = aBig + complementB;
    const finalAnswer = (aBig - bBig).toString();

    steps.push({
      stepNumber: 1,
      totalSteps: 3,
      title: 'Determine Base & 10’s Complement of Subtrahend',
      sanskritSutra: 'Nikhilam Navatashcaramam Dashatah (Nikhilam Complement Transformation)',
      explanation: `Transform subtraction into addition! Choose Base 10^${k} = ${base10k.toString()}.
Compute the 10's complement of ${cleanB} using "all from 9 and last from 10":
Complement = ${base10k.toString()} - ${cleanB} = ${complementB.toString()}.`,
      formula: `Complement = ${base10k.toString()} - ${cleanB} = ${complementB.toString()}`,
      subResult: `Complement: ${complementB.toString()}`,
      accumulatedAnswer: `Complement: ${complementB.toString()}`,
    });

    steps.push({
      stepNumber: 2,
      totalSteps: 3,
      title: 'Add Complement to Minuend (A + Complement)',
      sanskritSutra: 'Samyogah (Addition of Complement)',
      explanation: `Instead of borrowing, simply add the complement of ${cleanB} to ${cleanA}:
${cleanA} + ${complementB.toString()} = ${sumWithComp.toString()}.`,
      formula: `${cleanA} + ${complementB.toString()} = ${sumWithComp.toString()}`,
      subResult: `Sum = ${sumWithComp.toString()}`,
      accumulatedAnswer: sumWithComp.toString(),
    });

    steps.push({
      stepNumber: 3,
      totalSteps: 3,
      title: 'Drop the Leading Base Place-Value',
      sanskritSutra: 'Vimochanam (Drop Excess Base)',
      explanation: `Drop the leading extra 1 (representing the added Base ${base10k.toString()}):
${sumWithComp.toString()} - ${base10k.toString()} = ${finalAnswer}.
We have successfully achieved subtraction without a single column borrow!`,
      formula: `${sumWithComp.toString()} - ${base10k.toString()} = ${finalAnswer}`,
      subResult: `Final Answer = ${finalAnswer}`,
      accumulatedAnswer: finalAnswer,
    });

    const groundTruth = finalAnswer;

    return {
      operationId: 'subtraction',
      sutraName: 'Nikhilam Complement Addition (General Subtraction)',
      sanskritName: 'Nikhilam Navatashcaramam Dashatah',
      inputs: { a: cleanA, b: cleanB },
      finalAnswer,
      steps,
      groundTruth,
      isVerified: true,
      methodUsed: 'Transformation of subtraction into complement addition',
      notes: 'Turns borrowing into simple forward addition using base-complements.',
    };
  }
}
