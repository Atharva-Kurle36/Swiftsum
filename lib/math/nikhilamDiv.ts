import { CalculationResult, CalculationStep } from './types';

export function nikhilamDivision(dividendStr: string, divisorStr: string): CalculationResult {
  const cleanDividend = dividendStr.replace(/^0+(?!$)/, '') || '0';
  const cleanDivisor = divisorStr.replace(/^0+(?!$)/, '') || '0';

  const dividend = parseInt(cleanDividend, 10);
  const divisor = parseInt(cleanDivisor, 10);

  if (divisor === 0) {
    return {
      operationId: 'division',
      sutraName: 'Division by Zero',
      sanskritName: 'Avibhajyam',
      inputs: { a: cleanDividend, b: cleanDivisor },
      finalAnswer: 'Undefined',
      steps: [],
      groundTruth: 'Undefined',
      isVerified: false,
      methodUsed: 'Error',
      notes: 'Division by zero is undefined.',
    };
  }

  // Calculate ground truth
  const gtQuotient = Math.floor(dividend / divisor);
  const gtRemainder = dividend % divisor;
  const groundTruthStr = `Quotient: ${gtQuotient}, Remainder: ${gtRemainder}`;

  // Check if divisor qualifies for Nikhilam division (near power of 10)
  const divLen = cleanDivisor.length;
  const base = Math.pow(10, divLen);
  const complement = base - divisor;

  // Nikhilam division is ideal when divisor is near base (complement > 0 and complement <= base * 0.4)
  const isNikhilamEligible = complement > 0 && complement <= base * 0.4 && dividend >= base;

  if (isNikhilamEligible) {
    const nikhilamRes = tryNikhilamDivision(cleanDividend, divisor, base, complement, gtQuotient, gtRemainder);
    if (nikhilamRes && nikhilamRes.isVerified) {
      return nikhilamRes;
    }
  }

  // Fallback to verified classical column division
  return fallbackColumnDivision(cleanDividend, cleanDivisor, gtQuotient, gtRemainder);
}

function tryNikhilamDivision(
  dividendStr: string,
  divisor: number,
  base: number,
  complement: number,
  gtQuotient: number,
  gtRemainder: number
): CalculationResult | null {
  const numZeros = Math.round(Math.log10(base));
  if (dividendStr.length <= numZeros) return null;

  const qLen = dividendStr.length - numZeros;
  const quotientPartStr = dividendStr.slice(0, qLen);
  const remainderPartStr = dividendStr.slice(qLen);

  const dividendDigits = dividendStr.split('').map(Number);
  const complementDigits = complement.toString().padStart(numZeros, '0').split('').map(Number);

  const steps: CalculationStep[] = [];

  // Step 1: Base & Setup
  steps.push({
    stepNumber: 1,
    totalSteps: qLen + 2,
    title: 'Setup Nikhilam Base & Separation Bar',
    sanskritSutra: 'Nikhilam Vibhagah (Nikhilam Division Setup)',
    explanation: `Divisor ${divisor} is close to Base ${base}. The deficiency complement is C = ${base} − ${divisor} = ${complement} (represented across ${numZeros} column${numZeros > 1 ? 's' : ''}: [${complementDigits.join(', ')}]).
Separate the dividend "${dividendStr}" into Quotient portion ("${quotientPartStr}") and Remainder portion ("${remainderPartStr}") having ${numZeros} digit${numZeros > 1 ? 's' : ''}.`,
    formula: `Base = ${base} | Complement = ${complement} | Setup: ${quotientPartStr} | ${remainderPartStr}`,
    subResult: `Complement: ${complement}`,
    accumulatedAnswer: `${quotientPartStr} | ${remainderPartStr}`,
  });

  // Step 2...N: Iterative column propagation using Vedic complement distribution
  const workingCols = [...dividendDigits];
  const qDigitsOut: number[] = [];

  for (let i = 0; i < qLen; i++) {
    const rawQDigit = workingCols[i];
    qDigitsOut.push(rawQDigit);

    // Distribute products into subsequent columns
    const distributionFormulas: string[] = [];
    for (let p = 0; p < numZeros; p++) {
      const targetCol = i + 1 + p;
      if (targetCol < workingCols.length) {
        const added = rawQDigit * complementDigits[p];
        workingCols[targetCol] += added;
        distributionFormulas.push(`Col ${targetCol + 1} += ${rawQDigit} × ${complementDigits[p]} = ${added}`);
      }
    }

    steps.push({
      stepNumber: i + 2,
      totalSteps: qLen + 2,
      title: `Process Column ${i + 1} (Quotient Component ${i + 1})`,
      sanskritSutra: 'Puraka Gunaka Samvahana (Complement Product Forwarding)',
      explanation: `Column ${i + 1}: Current value is ${rawQDigit}. Write ${rawQDigit} into the quotient register.
Multiply this quotient value by the complement digit${numZeros > 1 ? 's' : ''} [${complementDigits.join(', ')}] and distribute forward:
${distributionFormulas.join('; ')}.`,
      formula: `Q-component[${i + 1}] = ${rawQDigit} | Distributed: ${distributionFormulas.join(', ')}`,
      subResult: `Quotient components: [${qDigitsOut.join(', ')}]`,
      accumulatedAnswer: `Q: [${qDigitsOut.join(', ')}] | Rem cols: [${workingCols.slice(qLen).join(', ')}]`,
    });
  }

  // Calculate raw quotient value from qDigitsOut
  let rawQuotientVal = 0;
  for (let i = 0; i < qLen; i++) {
    rawQuotientVal = rawQuotientVal * 10 + qDigitsOut[i];
  }

  // Calculate raw remainder value from workingCols remainder section
  let initialRemainderVal = 0;
  for (let i = qLen; i < workingCols.length; i++) {
    initialRemainderVal = initialRemainderVal * 10 + workingCols[i];
  }

  let finalQVal = rawQuotientVal;
  let finalRVal = initialRemainderVal;

  // Self-correction (Shesha Shuddhi) if remainder >= divisor
  let correctionNote = '';
  if (finalRVal >= divisor) {
    const extraQ = Math.floor(finalRVal / divisor);
    finalRVal = finalRVal % divisor;
    finalQVal += extraQ;
    correctionNote = ` Self-correction (Shesha Shuddhi) applied: Remainder ${initialRemainderVal} was ≥ Divisor ${divisor}, so transferred ${extraQ} to quotient (${rawQuotientVal} + ${extraQ} = ${finalQVal}) leaving final remainder ${finalRVal}.`;
  }

  const finalAnswerStr = `Q: ${finalQVal}, R: ${finalRVal}`;

  steps.push({
    stepNumber: qLen + 2,
    totalSteps: qLen + 2,
    title: 'Resolve Remainder & Self-Correction (Shesha Shuddhi)',
    sanskritSutra: 'Shesha Shuddhi (Self-Correcting Remainder Adjustment)',
    explanation: `Evaluate the accumulated remainder section: initial remainder value = ${initialRemainderVal}.${correctionNote}
Final Result: Quotient = ${finalQVal}, Remainder = ${finalRVal}.`,
    formula: `Quotient = ${finalQVal} | Remainder = ${finalRVal}`,
    subResult: finalAnswerStr,
    accumulatedAnswer: finalAnswerStr,
  });

  const isVerified = finalQVal === gtQuotient && finalRVal === gtRemainder;

  return {
    operationId: 'division',
    sutraName: 'Nikhilam Division (Base-Deviation Method)',
    sanskritName: 'Nikhilam Navatashcaramam Dashatah (Vibhagah)',
    inputs: { a: dividendStr, b: divisor.toString() },
    finalAnswer: finalAnswerStr,
    quotient: finalQVal.toString(),
    remainder: finalRVal.toString(),
    steps,
    groundTruth: `Q: ${gtQuotient}, R: ${gtRemainder}`,
    isVerified,
    methodUsed: `Nikhilam base-${base} division with complement ${complement}`,
    notes: `Deviations forward quotient contributions smoothly without standard long trial-and-error.`,
  };
}

function fallbackColumnDivision(
  dividendStr: string,
  divisorStr: string,
  gtQuotient: number,
  gtRemainder: number
): CalculationResult {
  const divisor = parseInt(divisorStr, 10);
  const digits = dividendStr.split('').map(Number);
  const steps: CalculationStep[] = [];

  let currentVal = 0;
  let quotientStr = '';

  steps.push({
    stepNumber: 1,
    totalSteps: digits.length + 1,
    title: 'Standard Verified Column Division Fallback',
    sanskritSutra: 'Paravartya Yojayet / Stambha Vibhagah (Transposition & Column Division)',
    explanation: `Divisor ${divisor} is evaluated via verified step-by-step column division to ensure 100% ground-truth precision across all number ranges.`,
    formula: `Divide ${dividendStr} by ${divisor}`,
    subResult: `Divisor: ${divisor}`,
    accumulatedAnswer: '0',
  });

  for (let i = 0; i < digits.length; i++) {
    currentVal = currentVal * 10 + digits[i];
    const qDigit = Math.floor(currentVal / divisor);
    const sub = qDigit * divisor;
    const rem = currentVal - sub;

    quotientStr += qDigit;
    currentVal = rem;

    steps.push({
      stepNumber: i + 2,
      totalSteps: digits.length + 1,
      title: `Step ${i + 1}: Bring Down Digit "${digits[i]}"`,
      sanskritSutra: 'Stambha Vibhaga Charana (Column Step)',
      explanation: `Current dividend chunk is ${currentVal + sub}.
${currentVal + sub} ÷ ${divisor} = ${qDigit} with remainder ${rem} (${qDigit} × ${divisor} = ${sub}).
Place quotient digit "${qDigit}".`,
      formula: `${currentVal + sub} ÷ ${divisor} = ${qDigit} (Rem ${rem})`,
      subResult: `Quotient so far: ${quotientStr.replace(/^0+/, '') || '0'}`,
      accumulatedAnswer: `Q: ${quotientStr.replace(/^0+/, '') || '0'}, R: ${rem}`,
    });
  }

  const cleanQuotient = quotientStr.replace(/^0+/, '') || '0';
  const finalAnswer = `Q: ${cleanQuotient}, R: ${currentVal}`;

  return {
    operationId: 'division',
    sutraName: 'Verified Column Division',
    sanskritName: 'Stambha Vibhagah (Verified Column Division)',
    inputs: { a: dividendStr, b: divisorStr },
    finalAnswer,
    quotient: cleanQuotient,
    remainder: currentVal.toString(),
    steps,
    groundTruth: `Q: ${gtQuotient}, R: ${gtRemainder}`,
    isVerified: parseInt(cleanQuotient, 10) === gtQuotient && currentVal === gtRemainder,
    methodUsed: 'Standard verified step-by-step column division',
    notes: 'Guarantees zero margin of error for non-base divisors.',
  };
}
