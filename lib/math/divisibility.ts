import { CalculationResult, CalculationStep } from './types';

export function checkDivisibility(numStr: string, divisorStr: string): CalculationResult {
  const cleanNum = numStr.replace(/^0+(?!$)/, '') || '0';
  const cleanDivisor = divisorStr.replace(/^0+(?!$)/, '') || '1';

  const divisor = parseInt(cleanDivisor, 10);

  if (divisor === 0) {
    return {
      operationId: 'divisibility',
      sutraName: 'Divisibility by Zero',
      sanskritName: 'Avibhajyam',
      inputs: { a: cleanNum, b: cleanDivisor },
      finalAnswer: 'Undefined',
      isDivisible: false,
      verdictText: 'Division by zero is undefined.',
      steps: [
        {
          stepNumber: 1,
          totalSteps: 1,
          title: 'Divisor is Zero',
          sanskritSutra: 'Avibhajyam (Cannot Divide by Zero)',
          explanation: 'Division by zero is undefined in mathematics. A number cannot be evaluated for divisibility by 0.',
          formula: `${cleanNum} ÷ 0 = Undefined`,
          subResult: 'Undefined',
          accumulatedAnswer: 'Undefined',
        },
      ],
      groundTruth: 'Undefined',
      isVerified: false,
      methodUsed: 'Error',
      notes: 'Divisor cannot be 0.',
    };
  }

  const numBig = BigInt(cleanNum);
  const divBig = BigInt(cleanDivisor);

  const isDivisible = numBig % divBig === BigInt(0);
  const verdictText = isDivisible
    ? `VERIFIED: ${cleanNum} is DIVISIBLE by ${cleanDivisor}`
    : `VERIFIED: ${cleanNum} is NOT DIVISIBLE by ${cleanDivisor} (Remainder: ${(numBig % divBig).toString()})`;

  const steps: CalculationStep[] = [];

  // Route by divisor type
  if (divisor === 7 || divisor === 13 || divisor === 17 || divisor === 19) {
    return osculationDivisibility(cleanNum, divisor, isDivisible, verdictText);
  } else if (divisor === 3 || divisor === 9) {
    return digitSumDivisibility(cleanNum, divisor, isDivisible, verdictText);
  } else if (divisor === 11) {
    return alternatingSumDivisibility(cleanNum, isDivisible, verdictText);
  } else if (divisor === 2 || divisor === 5 || divisor === 10) {
    return terminalDigitDivisibility(cleanNum, divisor, isDivisible, verdictText);
  } else {
    // Composite or arbitrary divisor
    return generalDivisibility(cleanNum, divisor, isDivisible, verdictText);
  }
}

// Ekadhika / Osculation method for 7, 13, 17, 19
function osculationDivisibility(
  numStr: string,
  divisor: number,
  isDivisible: boolean,
  verdictText: string
): CalculationResult {
  // Osculator details
  // 19: Positive osculator P = 2
  // 13: Positive osculator P = 4 (13 * 3 = 39 -> 40)
  // 7: Negative osculator Q = 2 (7 * 3 = 21 -> 20) or Positive P = 5
  // 17: Negative osculator Q = 5 (17 * 3 = 51 -> 50)
  const oscInfo: Record<number, { type: 'positive' | 'negative'; P: number; sutra: string; name: string }> = {
    19: { type: 'positive', P: 2, sutra: 'Ekadhikena Purvena (Positive Osculator P = 2)', name: 'Ekadhika Osculation for 19' },
    13: { type: 'positive', P: 4, sutra: 'Ekadhikena Purvena (Positive Osculator P = 4)', name: 'Ekadhika Osculation for 13' },
    7: { type: 'negative', P: 2, sutra: 'Vestana Paddhati (Negative Osculator Q = 2)', name: 'Vestana Osculation for 7' },
    17: { type: 'negative', P: 5, sutra: 'Vestana Paddhati (Negative Osculator Q = 5)', name: 'Vestana Osculation for 17' },
  };

  const info = oscInfo[divisor];
  const steps: CalculationStep[] = [];

  steps.push({
    stepNumber: 1,
    totalSteps: 5,
    title: `Identify Vedic Osculator for Divisor ${divisor}`,
    sanskritSutra: info.sutra,
    explanation: info.type === 'positive'
      ? `For divisor ${divisor}, the positive osculator is P = ${info.P}.
Rule: Truncate the last digit L, multiply it by ${info.P}, and ADD to the remaining truncated number: Next = Truncated + (${info.P} × L).`
      : `For divisor ${divisor}, the negative osculator is Q = ${info.P}.
Rule: Truncate the last digit L, multiply it by ${info.P}, and SUBTRACT from the remaining truncated number: Next = Truncated - (${info.P} × L).`,
    formula: `Osculator ${info.type === 'positive' ? 'P' : 'Q'} = ${info.P}`,
    subResult: `Divisor: ${divisor}`,
    accumulatedAnswer: numStr,
  });

  let current = parseInt(numStr, 10);
  let round = 1;

  while (current > divisor * 10 && round < 8) {
    const lastDigit = current % 10;
    const truncated = Math.floor(current / 10);
    const prod = lastDigit * info.P;
    const nextVal = info.type === 'positive' ? truncated + prod : Math.abs(truncated - prod);

    steps.push({
      stepNumber: round + 1,
      totalSteps: 5,
      title: `Osculation Reduction Round ${round}`,
      sanskritSutra: 'Vestana Charana (Osculation Step)',
      explanation: `Current number: ${current}.
Last digit L = ${lastDigit}, Remaining number = ${truncated}.
${info.type === 'positive' ? `Multiply L by ${info.P}: ${lastDigit} × ${info.P} = ${prod}. Add to remaining: ${truncated} + ${prod} = ${nextVal}.` : `Multiply L by ${info.P}: ${lastDigit} × ${info.P} = ${prod}. Subtract from remaining: |${truncated} - ${prod}| = ${nextVal}.`}`,
      formula: info.type === 'positive'
        ? `${truncated} + (${info.P} × ${lastDigit}) = ${nextVal}`
        : `|${truncated} - (${info.P} × ${lastDigit})| = ${nextVal}`,
      subResult: `Reduced to: ${nextVal}`,
      accumulatedAnswer: nextVal.toString(),
    });

    current = nextVal;
    round++;
  }

  // Final check step
  const finalRem = current % divisor;
  const finalCheckDiv = finalRem === 0;

  steps.push({
    stepNumber: round + 1,
    totalSteps: round + 1,
    title: 'Final Divisibility Verdict',
    sanskritSutra: 'Nirnayah (Final Determination)',
    explanation: `The reduced number ${current} is evaluated directly against divisor ${divisor}:
${current} ÷ ${divisor} = ${Math.floor(current / divisor)} with remainder ${finalRem}.
${finalCheckDiv ? `Since ${current} is divisible by ${divisor}, the original number ${numStr} is guaranteed to be DIVISIBLE!` : `Since ${current} is not divisible by ${divisor}, ${numStr} is NOT divisible.`}`,
    formula: `${current} mod ${divisor} = ${finalRem}`,
    subResult: verdictText,
    accumulatedAnswer: verdictText,
  });

  // Normalize total steps
  const total = steps.length;
  steps.forEach(st => (st.totalSteps = total));

  return {
    operationId: 'divisibility',
    sutraName: info.name,
    sanskritName: 'Ekadhikena Purvena / Vestanam',
    inputs: { a: numStr, b: divisor.toString() },
    finalAnswer: isDivisible ? 'Divisible (Yes)' : 'Not Divisible (No)',
    isDivisible,
    verdictText,
    steps,
    groundTruth: isDivisible ? 'Divisible' : 'Not Divisible',
    isVerified: true,
    methodUsed: `${info.type === 'positive' ? 'Positive' : 'Negative'} osculation (P = ${info.P})`,
    notes: `Reduced multi-digit number to ${current} in ${round - 1} osculation steps.`,
  };
}

// Digit Sum method for 3 and 9
function digitSumDivisibility(
  numStr: string,
  divisor: number,
  isDivisible: boolean,
  verdictText: string
): CalculationResult {
  const steps: CalculationStep[] = [];
  const digits = numStr.split('').map(Number);
  const sum1 = digits.reduce((a, b) => a + b, 0);

  steps.push({
    stepNumber: 1,
    totalSteps: 3,
    title: 'Digit-Sum (Navasesh / Casting Out)',
    sanskritSutra: 'Navasesha / Beejanka (Beejank Method)',
    explanation: `For divisibility by ${divisor}, calculate the sum of all digits (Beejank):
${digits.join(' + ')} = ${sum1}.`,
    formula: `Beejank Sum = ${digits.join(' + ')} = ${sum1}`,
    subResult: `Sum = ${sum1}`,
    accumulatedAnswer: sum1.toString(),
  });

  let currentSum = sum1;
  let finalSum = sum1;
  let reductionRound = 2;

  while (currentSum > 9) {
    const sumDigits = currentSum.toString().split('').map(Number);
    finalSum = sumDigits.reduce((a, b) => a + b, 0);
    steps.push({
      stepNumber: reductionRound,
      totalSteps: 3,
      title: reductionRound === 2 ? 'Secondary Reduction to Single Digit' : `Further Reduction Round ${reductionRound - 1}`,
      sanskritSutra: 'Shuddha Beejanka (Pure Beejank Reduction)',
      explanation: `Reduce ${currentSum} further by summing its digits: ${sumDigits.join(' + ')} = ${finalSum}.`,
      formula: `${sumDigits.join(' + ')} = ${finalSum}`,
      subResult: `Beejank: ${finalSum}`,
      accumulatedAnswer: finalSum.toString(),
    });
    currentSum = finalSum;
    reductionRound++;
  }

  const stepCount = steps.length + 1;
  steps.push({
    stepNumber: stepCount,
    totalSteps: stepCount,
    title: 'Verdict from Beejank',
    sanskritSutra: 'Nirnayah (Final Determination)',
    explanation: `The final digit sum is ${finalSum}.
${isDivisible ? `${finalSum} is a multiple of ${divisor}, confirming ${numStr} is DIVISIBLE!` : `${finalSum} is not divisible by ${divisor}, confirming ${numStr} is NOT divisible.`}`,
    formula: `${finalSum} mod ${divisor} = ${finalSum % divisor}`,
    subResult: verdictText,
    accumulatedAnswer: verdictText,
  });

  steps.forEach(st => (st.totalSteps = stepCount));

  return {
    operationId: 'divisibility',
    sutraName: `Digit-Sum (Beejank) for ${divisor}`,
    sanskritName: 'Navasesha Beejanka Paddhati',
    inputs: { a: numStr, b: divisor.toString() },
    finalAnswer: isDivisible ? 'Divisible (Yes)' : 'Not Divisible (No)',
    isDivisible,
    verdictText,
    steps,
    groundTruth: isDivisible ? 'Divisible' : 'Not Divisible',
    isVerified: true,
    methodUsed: `Digit-sum reduction (Beejank = ${finalSum})`,
  };
}

// Alternating Sum for 11
function alternatingSumDivisibility(
  numStr: string,
  isDivisible: boolean,
  verdictText: string
): CalculationResult {
  const digits = numStr.split('').map(Number);
  let oddSum = 0;
  let evenSum = 0;

  for (let i = 0; i < digits.length; i++) {
    if (i % 2 === 0) {
      oddSum += digits[i];
    } else {
      evenSum += digits[i];
    }
  }

  const diff = Math.abs(oddSum - evenSum);

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      totalSteps: 2,
      title: 'Calculate Alternating Place Sums',
      sanskritSutra: 'Ekadhikena Purva / Ekanantara Yoga (Alternating Digit Sum)',
      explanation: `Sum the digits at odd positions and even positions separately:
Sum of odd-position digits: ${oddSum}
Sum of even-position digits: ${evenSum}`,
      formula: `Odd Sum = ${oddSum} | Even Sum = ${evenSum}`,
      subResult: `Diff = |${oddSum} - ${evenSum}| = ${diff}`,
      accumulatedAnswer: `Diff: ${diff}`,
    },
    {
      stepNumber: 2,
      totalSteps: 2,
      title: 'Determine Divisibility by 11',
      sanskritSutra: 'Nirnayah (Verdict)',
      explanation: `Difference between place sums = |${oddSum} - ${evenSum}| = ${diff}.
${isDivisible ? `${diff} is a multiple of 11 (or 0), proving ${numStr} is DIVISIBLE by 11!` : `${diff} is not divisible by 11, proving ${numStr} is NOT divisible.`}`,
      formula: `${diff} mod 11 = ${diff % 11}`,
      subResult: verdictText,
      accumulatedAnswer: verdictText,
    },
  ];

  return {
    operationId: 'divisibility',
    sutraName: 'Alternating Digit Sum for 11',
    sanskritName: 'Ekanantara Yoga Paddhati',
    inputs: { a: numStr, b: '11' },
    finalAnswer: isDivisible ? 'Divisible (Yes)' : 'Not Divisible (No)',
    isDivisible,
    verdictText,
    steps,
    groundTruth: isDivisible ? 'Divisible' : 'Not Divisible',
    isVerified: true,
    methodUsed: 'Alternating place sum comparison',
  };
}

// Terminal digit rules for 2, 5, 10
function terminalDigitDivisibility(
  numStr: string,
  divisor: number,
  isDivisible: boolean,
  verdictText: string
): CalculationResult {
  const lastDigit = parseInt(numStr.slice(-1), 10);
  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      totalSteps: 1,
      title: `Terminal Digit Check for ${divisor}`,
      sanskritSutra: 'Antya Anka Pariksha (Last Digit Inspection)',
      explanation: `For divisor ${divisor}, only the terminal digit "${lastDigit}" matters.
${isDivisible ? `The last digit ${lastDigit} satisfies the divisibility condition for ${divisor}.` : `The last digit ${lastDigit} fails the divisibility condition for ${divisor}.`}`,
      formula: `Last digit = ${lastDigit}`,
      subResult: verdictText,
      accumulatedAnswer: verdictText,
    },
  ];

  return {
    operationId: 'divisibility',
    sutraName: `Last Digit Rule for ${divisor}`,
    sanskritName: 'Antya Anka Pariksha',
    inputs: { a: numStr, b: divisor.toString() },
    finalAnswer: isDivisible ? 'Divisible (Yes)' : 'Not Divisible (No)',
    isDivisible,
    verdictText,
    steps,
    groundTruth: isDivisible ? 'Divisible' : 'Not Divisible',
    isVerified: true,
    methodUsed: `Terminal digit inspection (${lastDigit})`,
  };
}

// General composite divisibility
function generalDivisibility(
  numStr: string,
  divisor: number,
  isDivisible: boolean,
  verdictText: string
): CalculationResult {
  const rem = Number(BigInt(numStr) % BigInt(divisor));
  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      totalSteps: 1,
      title: `General Divisibility Test for ${divisor}`,
      sanskritSutra: 'Samanya Bhagahara Pariksha (General Divisor Evaluation)',
      explanation: `Evaluating ${numStr} ÷ ${divisor}:
Remainder = ${rem}.
${isDivisible ? `Remainder is 0, confirming ${numStr} is evenly divisible by ${divisor}.` : `Remainder is ${rem} ≠ 0, confirming ${numStr} is not evenly divisible.`}`,
      formula: `${numStr} mod ${divisor} = ${rem}`,
      subResult: verdictText,
      accumulatedAnswer: verdictText,
    },
  ];

  return {
    operationId: 'divisibility',
    sutraName: `Divisibility Check for ${divisor}`,
    sanskritName: 'Samanya Bhagahara Pariksha',
    inputs: { a: numStr, b: divisor.toString() },
    finalAnswer: isDivisible ? 'Divisible (Yes)' : 'Not Divisible (No)',
    isDivisible,
    verdictText,
    steps,
    groundTruth: isDivisible ? 'Divisible' : 'Not Divisible',
    isVerified: true,
    methodUsed: 'Standard modulo evaluation',
  };
}
