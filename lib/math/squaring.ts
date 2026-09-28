import { CalculationResult, CalculationStep } from './types';
import { urdhvaTiryagbhyam } from './urdhvaTiryag';

export function calculateSquaring(nStr: string): CalculationResult {
  const cleanN = nStr.replace(/^0+(?!$)/, '') || '0';
  const n = parseInt(cleanN, 10);

  // Method 1: Ekadhikena Purvena (if ends in 5)
  if (cleanN.endsWith('5') && cleanN.length > 1) {
    return ekadhikenaSquaring(cleanN);
  }

  // Method 2: Yavadunam (if close to power of 10)
  const len = cleanN.length;
  const base1 = Math.pow(10, len);
  const base2 = Math.pow(10, Math.max(1, len - 1));
  const dev1 = Math.abs(n - base1);
  const dev2 = Math.abs(n - base2);
  const chosenBase = dev1 < dev2 ? base1 : base2;
  const dev = Math.abs(n - chosenBase);

  // If deviation is within 25% of the base, use Yavadunam
  if (dev <= chosenBase * 0.25) {
    return yavadunamSquaring(cleanN, chosenBase);
  }

  // Method 3: General Urdhva-Tiryagbhyam Duplex / Crosswise
  return generalSquaring(cleanN);
}

function ekadhikenaSquaring(nStr: string): CalculationResult {
  const prefixStr = nStr.slice(0, -1);
  const prefix = parseInt(prefixStr, 10);
  const successor = prefix + 1;
  const lhs = prefix * successor;
  const rhs = 25;
  const finalAnswer = `${lhs}25`;

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      totalSteps: 3,
      title: 'Split Number into Previous Part & Unit Digit 5',
      sanskritSutra: 'Ekadhikena Purvena (By One More than the Previous)',
      explanation: `Identify the ending digit 5 and the previous prefix part "${prefixStr}". Since the number ends in 5, the classical shortcut applies directly!`,
      formula: `Number = ${prefixStr} | 5`,
      subResult: `Prefix = ${prefix}, Unit = 5`,
      accumulatedAnswer: `${prefixStr} | 5`,
    },
    {
      stepNumber: 2,
      totalSteps: 3,
      title: 'Multiply Previous Part by "One More"',
      sanskritSutra: 'Ekadhika Gunakarah (Multiply by Successor)',
      explanation: `Take the previous part ${prefix} and multiply it by "one more than itself" (${prefix} + 1 = ${successor}):
${prefix} × ${successor} = ${lhs}. This forms the left-hand side of the square.`,
      formula: `LHS = ${prefix} × (${prefix} + 1) = ${prefix} × ${successor} = ${lhs}`,
      subResult: `LHS = ${lhs}`,
      accumulatedAnswer: `${lhs} | ...`,
    },
    {
      stepNumber: 3,
      totalSteps: 3,
      title: 'Append Square of 5 (25)',
      sanskritSutra: 'Antyayordashake pi (Square the terminal 5)',
      explanation: `Square the unit digit 5: 5² = 25.
Append 25 to the right of the LHS ${lhs}:
Result = ${lhs} and 25 = ${finalAnswer}.`,
      formula: `LHS | 5² = ${lhs} | 25 = ${finalAnswer}`,
      subResult: `Final Answer: ${finalAnswer}`,
      accumulatedAnswer: finalAnswer,
    },
  ];

  const groundTruth = (BigInt(nStr) * BigInt(nStr)).toString();

  return {
    operationId: 'squaring',
    sutraName: 'Ekadhikena Purvena (Ending in 5 Squaring)',
    sanskritName: 'Ekadhikena Purvena',
    inputs: { a: nStr },
    finalAnswer,
    steps,
    groundTruth,
    isVerified: finalAnswer === groundTruth,
    methodUsed: 'Ekadhikena Purvena shortcut for numbers ending in 5',
    notes: `Calculated mentally as ${prefix} × (${prefix}+1) concatenated with 25.`,
  };
}

function yavadunamSquaring(nStr: string, base: number): CalculationResult {
  const n = parseInt(nStr, 10);
  const dev = n - base;
  const numZeros = Math.round(Math.log10(base));
  const devStr = dev >= 0 ? `+${dev}` : `${dev}`;

  const adjustedNum = n + dev;
  const devSqRaw = dev * dev;

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      totalSteps: 3,
      title: 'Identify Base and Deficiency/Surplus',
      sanskritSutra: 'Yavadunam Tavadunikritya Varganca Yojayet',
      explanation: `The number ${n} is close to Base ${base} (having ${numZeros} zeroes).
Deficiency/Surplus deviation: d = ${n} - ${base} = ${devStr}.`,
      formula: `Base = ${base} | Deviation d = ${devStr}`,
      subResult: `Deviation = ${devStr}`,
      accumulatedAnswer: `${n} (${devStr})`,
    },
    {
      stepNumber: 2,
      totalSteps: 3,
      title: 'Adjust Number by Its Deficiency (LHS)',
      sanskritSutra: 'Tavadunikritya (Lessen by That Much)',
      explanation: `Adjust the number by adding the deviation to itself:
${n} + (${devStr}) = ${adjustedNum}. This forms the left-hand side of the result.`,
      formula: `LHS = ${n} + (${devStr}) = ${adjustedNum}`,
      subResult: `LHS = ${adjustedNum}`,
      accumulatedAnswer: `${adjustedNum} | ...`,
    },
  ];

  // Balancing RHS
  let finalLhs = adjustedNum;
  let finalRhsStr = '';
  const devSqStr = devSqRaw.toString();

  if (devSqStr.length < numZeros) {
    finalRhsStr = devSqStr.padStart(numZeros, '0');
  } else if (devSqStr.length > numZeros) {
    const overflow = Math.floor(devSqRaw / Math.pow(10, numZeros));
    const rem = devSqRaw % Math.pow(10, numZeros);
    finalLhs += overflow;
    finalRhsStr = rem.toString().padStart(numZeros, '0');
  } else {
    finalRhsStr = devSqStr;
  }

  const finalAnswer = (BigInt(finalLhs) * BigInt(base) + BigInt(finalRhsStr)).toString();

  steps.push({
    stepNumber: 3,
    totalSteps: 3,
    title: 'Square the Deviation and Combine (RHS)',
    sanskritSutra: 'Varganca Yojayet (And Add the Square of the Deficiency)',
    explanation: `Square the deviation: (${devStr})² = ${devSqRaw}.
The RHS must have ${numZeros} digits (matching base zeroes).
${devSqStr.length < numZeros ? `Pad with leading zeros to get "${finalRhsStr}".` : ''}
${devSqStr.length > numZeros ? `Carry over the excess ${Math.floor(devSqRaw / Math.pow(10, numZeros))} to LHS (${adjustedNum} + carry = ${finalLhs}).` : ''}
Combine: ${finalLhs} | ${finalRhsStr} = ${finalAnswer}.`,
    formula: `LHS | d² = ${finalLhs} | ${finalRhsStr} = ${finalAnswer}`,
    subResult: `Final Answer = ${finalAnswer}`,
    accumulatedAnswer: finalAnswer,
  });

  const groundTruth = (BigInt(nStr) * BigInt(nStr)).toString();

  return {
    operationId: 'squaring',
    sutraName: 'Yavadunam Tavadunikritya (Base Deficiency Squaring)',
    sanskritName: 'Yavadunam Tavadunikritya Varganca Yojayet',
    inputs: { a: nStr },
    finalAnswer,
    steps,
    groundTruth,
    isVerified: finalAnswer === groundTruth,
    methodUsed: `Yavadunam base-${base} squaring`,
    notes: `Calculated as (${n} + ${devStr}) | (${devStr})².`,
  };
}

function generalSquaring(nStr: string): CalculationResult {
  // Use Urdhva-Tiryagbhyam for general squaring of arbitrary numbers
  const multRes = urdhvaTiryagbhyam(nStr, nStr);
  return {
    ...multRes,
    operationId: 'squaring',
    sutraName: 'Urdhva-Tiryagbhyam Duplex (General Squaring)',
    sanskritName: 'Urdhva-Tiryagbhyam (Dvandva Yoga)',
    inputs: { a: nStr },
    notes: 'Calculated using general crosswise duplex multiplication.',
  };
}
