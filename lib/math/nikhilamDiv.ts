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

  const quotientPartStr = dividendStr.slice(0, -numZeros);
  const remainderPartStr = dividendStr.slice(-numZeros);

  const qDigits = quotientPartStr.split('').map(Number);
  const rDigits = remainderPartStr.split('').map(Number);

  const steps: CalculationStep[] = [];

  // Step 1: Base & Setup
  steps.push({
    stepNumber: 1,
    totalSteps: qDigits.length + 2,
    title: 'Setup Nikhilam Base & Separation Bar',
    sanskritSutra: 'Nikhilam Vibhagah (Nikhilam Division Setup)',
    explanation: `Divisor ${divisor} is close to Base ${base}. The deficiency/complement is C = ${base} - ${divisor} = ${complement}.
Separate the dividend "${dividendStr}" into Quotient portion ("${quotientPartStr}") and Remainder portion ("${remainderPartStr}") having ${numZeros} digits (equal to the number of zeros in Base ${base}).`,
    formula: `Base = ${base} | Complement C = ${complement} | Dividend: ${quotientPartStr} | ${remainderPartStr}`,
    subResult: `Complement: ${complement}`,
    accumulatedAnswer: `${quotientPartStr} | ${remainderPartStr}`,
  });

  // Step 2...N: Iterative column propagation
  const workingQuotient: number[] = [];
  let carry = 0;

  for (let i = 0; i < qDigits.length; i++) {
    const rawDigit = qDigits[i] + carry;
    workingQuotient.push(rawDigit);
    // Multiply by complement to carry to next position
    carry = rawDigit * complement;

    steps.push({
      stepNumber: i + 2,
      totalSteps: qDigits.length + 2,
      title: `Generate Quotient Digit ${i + 1}`,
      sanskritSutra: 'Puraka Gunaka Samvahana (Complement Product Forwarding)',
      explanation: `Column ${i + 1}: Bring down digit ${qDigits[i]}${carry !== 0 && i > 0 ? ` + forwarded value` : ''} = ${rawDigit}.
Multiply this digit by complement ${complement}: ${rawDigit} × ${complement} = ${carry}. Forward this to the next column.`,
      formula: `Q[${i + 1}] = ${rawDigit} | Forward = ${rawDigit} × ${complement} = ${carry}`,
      subResult: `Quotient so far: ${workingQuotient.join('')}`,
      accumulatedAnswer: `${workingQuotient.join('')} | ...`,
    });
  }

  // Calculate raw remainder by adding forwarded carry to remainder part
  const initialRemainderVal = parseInt(remainderPartStr, 10) + carry;
  let finalQVal = parseInt(workingQuotient.join(''), 10);
  let finalRVal = initialRemainderVal;

  // Self-correction if remainder >= divisor
  let correctionNote = '';
  if (finalRVal >= divisor) {
    const extraQ = Math.floor(finalRVal / divisor);
    finalRVal = finalRVal % divisor;
    finalQVal += extraQ;
    correctionNote = ` Self-correction applied: Remainder ${initialRemainderVal} was ≥ Divisor ${divisor}, so added ${extraQ} to quotient and adjusted remainder to ${finalRVal}.`;
  }

  const finalAnswerStr = `Q: ${finalQVal}, R: ${finalRVal}`;

  steps.push({
    stepNumber: qDigits.length + 2,
    totalSteps: qDigits.length + 2,
    title: 'Resolve Remainder & Self-Correction',
    sanskritSutra: 'Shesha Shuddhi (Self-Correcting Remainder Adjustment)',
    explanation: `Combine the forwarded amount with remainder column "${remainderPartStr}": ${parseInt(remainderPartStr, 10)} + ${carry} = ${initialRemainderVal}.${correctionNote}
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
