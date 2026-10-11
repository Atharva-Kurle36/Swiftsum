import { CalculationResult, CalculationStep } from './types';
import { urdhvaTiryagbhyam } from './urdhvaTiryag';

export function calculateSquaring(nStr: string): CalculationResult {
  const trimmed = (nStr || '').trim();
  if (!trimmed || !/^\d+$/.test(trimmed)) {
    return {
      operationId: 'squaring',
      sutraName: 'Input Validation Error',
      sanskritName: 'Shuddhi Pariksha',
      inputs: { a: nStr },
      finalAnswer: '0',
      steps: [
        {
          stepNumber: 1,
          totalSteps: 1,
          title: 'Invalid Input',
          sanskritSutra: 'Shuddhi Pariksha (Input Validation)',
          explanation: `The input "${nStr}" is not a valid positive integer. Please enter a positive whole number to square.`,
          subResult: 'Invalid Input',
          accumulatedAnswer: '0',
        },
      ],
      groundTruth: '0',
      isVerified: false,
      methodUsed: 'Input Validation',
      notes: 'Please enter a valid positive integer.',
    };
  }

  const cleanN = trimmed.replace(/^0+(?!$)/, '') || '0';
  const n = parseInt(cleanN, 10);

  if (n === 0) {
    return {
      operationId: 'squaring',
      sutraName: 'Zero Property',
      sanskritName: 'Shunya Varga',
      inputs: { a: '0' },
      finalAnswer: '0',
      steps: [
        {
          stepNumber: 1,
          totalSteps: 1,
          title: 'Square of Zero',
          sanskritSutra: 'Shunya Gunita Shunya',
          explanation: 'The square of 0 is 0.',
          formula: '0² = 0',
          subResult: '0',
          accumulatedAnswer: '0',
        },
      ],
      groundTruth: '0',
      isVerified: true,
      methodUsed: 'Zero Property',
      notes: '0² = 0',
    };
  }

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

  // For base 10, numbers 6 to 19 (deviation up to 9) use Yavadunam base 10.
  // For higher bases (100, 1000), deviation within 35% of the base uses Yavadunam.
  const isNear = chosenBase === 10 ? dev <= 9 : dev <= chosenBase * 0.35;
  if (isNear && n > 0) {
    return yavadunamSquaring(cleanN, chosenBase);
  }

  // Method 3: General Urdhva-Tiryagbhyam Duplex / Crosswise
  return generalSquaring(cleanN);
}

export function ekadhikenaSquaring(nInput: string | number): CalculationResult {
  const nStr = nInput.toString();
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
      explanation: `Take the previous part ${prefix} and multiply it by "one more than itself" (${prefix} + 1 = ${successor}):\n${prefix} × ${successor} = ${lhs}. This forms the left-hand side of the square.`,
      formula: `LHS = ${prefix} × (${prefix} + 1) = ${prefix} × ${successor} = ${lhs}`,
      subResult: `LHS = ${lhs}`,
      accumulatedAnswer: `${lhs} | ...`,
    },
    {
      stepNumber: 3,
      totalSteps: 3,
      title: 'Append Square of 5 (25)',
      sanskritSutra: 'Antyayordashake pi (Square the terminal 5)',
      explanation: `Square the unit digit 5: 5² = 25.\nAppend 25 to the right of the LHS ${lhs}:\nResult = ${lhs} and 25 = ${finalAnswer}.`,
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

export function yavadunamSquaring(nInput: string | number, baseInput?: number): CalculationResult {
  const nStr = nInput.toString();
  const n = parseInt(nStr, 10);
  const base = baseInput || (n >= 500 ? 1000 : n >= 50 ? 100 : 10);
  const dev = n - base;
  const numZeros = Math.max(1, Math.round(Math.log10(base)));
  const devStr = dev >= 0 ? `+${dev}` : `${dev}`;

  const adjustedNum = n + dev;
  const devSqRaw = dev * dev;

  // Task 3: Robust carry normalization
  // q = floor(d² / B)
  // r = d² mod B
  // normalizedLeft = n + d + q
  // normalizedRight = r (padded with leading zeros to numZeros)
  const q = Math.floor(devSqRaw / base);
  const r = devSqRaw % base;

  const normalizedLeft = adjustedNum + q;
  const normalizedRightStr = r.toString().padStart(numZeros, '0');
  const finalAnswer = (BigInt(normalizedLeft) * BigInt(base) + BigInt(r)).toString();

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      totalSteps: 3,
      title: 'Identify Base and Deficiency/Surplus',
      sanskritSutra: 'Yavadunam Tavadunikritya Varganca Yojayet',
      explanation: `The number ${n} is close to Base ${base} (having ${numZeros} zero${numZeros > 1 ? 's' : ''}).
Deficiency/Surplus deviation: d = ${n} - ${base} = ${devStr}.`,
      formula: `Base = ${base} | Deviation d = ${devStr}`,
      subResult: `Deviation = ${devStr}`,
      accumulatedAnswer: `${n} (${devStr})`,
    },
    {
      stepNumber: 2,
      totalSteps: 3,
      title: 'Adjust Number by Its Deficiency/Surplus (LHS)',
      sanskritSutra: 'Tavadunikritya (Adjust by That Much)',
      explanation: `Adjust the number by adding the deviation to itself:
${n} + (${devStr}) = ${adjustedNum}. This forms the initial left-hand side of the result.`,
      formula: `Initial LHS = ${n} + (${devStr}) = ${adjustedNum}`,
      subResult: `LHS = ${adjustedNum}`,
      accumulatedAnswer: `${adjustedNum} | ...`,
    },
  ];

  let step3Explanation = `Square the deviation: (${devStr})² = ${devSqRaw}.
The RHS requires ${numZeros} digit${numZeros > 1 ? 's' : ''} (matching base zeroes).`;

  if (q > 0) {
    step3Explanation += `
Because (${devStr})² = ${devSqRaw} exceeds base ${base}, the quotient carry q = floor(${devSqRaw} / ${base}) = ${q} is added to LHS (${adjustedNum} + ${q} = ${normalizedLeft}).
The remainder r = ${devSqRaw} mod ${base} = ${r} forms the right component "${normalizedRightStr}".`;
  } else if (devSqRaw.toString().length < numZeros) {
    step3Explanation += `
Pad with leading zeros to format ${numZeros} digits: "${normalizedRightStr}".`;
  } else {
    step3Explanation += `
The square ${devSqRaw} directly fits the ${numZeros} digit slot: "${normalizedRightStr}".`;
  }

  step3Explanation += `
Combine: ${normalizedLeft} | ${normalizedRightStr} = ${normalizedLeft} × ${base} + ${r} = ${finalAnswer}.`;

  steps.push({
    stepNumber: 3,
    totalSteps: 3,
    title: 'Square the Deviation & Balance Carry (RHS)',
    sanskritSutra: 'Varganca Yojayet (And Add the Square of the Deficiency)',
    explanation: step3Explanation,
    formula: `LHS | d² = ${normalizedLeft} | ${normalizedRightStr} = ${finalAnswer}`,
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
    notes: `Calculated as (${n} + ${devStr}) | (${devStr})² with carry normalization.`,
  };
}

export function generalSquaring(nInput: string | number): CalculationResult {
  const nStr = nInput.toString().replace(/^0+(?!$)/, '') || '0';
  const n = parseInt(nStr, 10);
  const groundTruth = (BigInt(nStr) * BigInt(nStr)).toString();

  // If single digit (0-9)
  if (nStr.length === 1) {
    const d = parseInt(nStr, 10);
    const ans = (d * d).toString();
    return {
      operationId: 'squaring',
      sutraName: 'General Duplex (Dvandva Yoga)',
      sanskritName: 'Dvandva Yoga (Single Digit Duplex)',
      inputs: { a: nStr },
      finalAnswer: ans,
      steps: [
        {
          stepNumber: 1,
          totalSteps: 1,
          title: 'Single-Digit Duplex',
          sanskritSutra: 'Dvandva Yoga: D(a) = a²',
          explanation: `For single digit ${d}, the duplex is its square: D(${d}) = ${d}² = ${ans}.`,
          formula: `D(${d}) = ${d}² = ${ans}`,
          subResult: ans,
          accumulatedAnswer: ans,
        },
      ],
      groundTruth,
      isVerified: ans === groundTruth,
      methodUsed: 'General Duplex (Dvandva Yoga) crosswise squaring',
      notes: `Single digit duplex D(${d}) = ${d}² = ${ans}.`,
    };
  }

  // Two-digit special detailed step breakdown (e.g. 40, 43, 25, 99)
  if (nStr.length === 2) {
    const a = parseInt(nStr[0], 10); // tens digit
    const b = parseInt(nStr[1], 10); // units digit

    // Duplex calculations
    const du = b * b; // D(b) = b²
    const dtu = 2 * a * b; // D(a, b) = 2ab
    const dt = a * a; // D(a) = a²

    // Place values & carry normalization
    // Column 0: units (10^0)
    const carry1 = Math.floor(du / 10);
    const unitsPlaced = du % 10;

    // Column 1: tens (10^1)
    const tensSum = dtu + carry1;
    const carry2 = Math.floor(tensSum / 10);
    const tensPlaced = tensSum % 10;

    // Column 2: hundreds (10^2)
    const hundredsSum = dt + carry2;

    const finalAnswer = `${hundredsSum}${tensPlaced}${unitsPlaced}`;

    const steps: CalculationStep[] = [
      {
        stepNumber: 1,
        totalSteps: 5,
        title: 'Identify Digits and Duplex Expansion',
        sanskritSutra: 'Dvandva Yoga (The Duplex Method)',
        explanation: `Identify digits: Tens digit a = ${a}, Units digit b = ${b}.
For n = 10a + b, the algebraic square expands to:
n² = (10a + b)² = 100a² + 20ab + b² = 100·D(a) + 10·D(a, b) + D(b).`,
        formula: `${n} = 10 × ${a} + ${b} | Tens = ${a}, Units = ${b}`,
        subResult: `a = ${a}, b = ${b}`,
        accumulatedAnswer: `${n}² = 100·D(${a}) + 10·D(${a},${b}) + D(${b})`,
      },
      {
        stepNumber: 2,
        totalSteps: 5,
        title: 'Compute Units Duplex: D(b) = b²',
        sanskritSutra: 'Charama Dvaidham (Terminal Unit Duplex)',
        explanation: `Compute units duplex: D(${b}) = ${b}² = ${du}.
${b === 0 ? 'Since units digit is 0, units contribution is 0.' : du >= 10 ? `Place digit ${unitsPlaced} in units column and carry ${carry1} to tens column.` : `Units contribution is ${du}.`}`,
        formula: `D(${b}) = ${b}² = ${du}${carry1 > 0 ? ` ➔ Placed: ${unitsPlaced}, Carry: ${carry1}` : ''}`,
        subResult: `Units contribution = ${du}`,
        accumulatedAnswer: `...${unitsPlaced}`,
      },
      {
        stepNumber: 3,
        totalSteps: 5,
        title: 'Compute Cross Duplex: D(a, b) = 2ab',
        sanskritSutra: 'Tiryag Gunanam (Crosswise Multiplication)',
        explanation: `Compute cross duplex: D(${a}, ${b}) = 2 × ${a} × ${b} = ${dtu}.
${b === 0 || a === 0 ? 'Because one of the digits is zero, cross contribution is zero.' : `With incoming carry ${carry1}: ${dtu} + ${carry1} = ${tensSum}. Place ${tensPlaced} in tens column and carry ${carry2} to hundreds column.`}`,
        formula: `D(${a}, ${b}) = 2 × ${a} × ${b} = ${dtu}${carry1 > 0 ? ` + Carry ${carry1} = ${tensSum}` : ''}`,
        subResult: `Cross contribution = ${dtu * 10}`,
        accumulatedAnswer: `...${tensPlaced}${unitsPlaced}`,
      },
      {
        stepNumber: 4,
        totalSteps: 5,
        title: 'Compute Tens Duplex: D(a) = a²',
        sanskritSutra: 'Adya Dvaidham (Tens Duplex)',
        explanation: `Compute tens duplex: D(${a}) = ${a}² = ${dt}.
The digit ${a} represents ${a} tens, so (${a} × 10)² = ${dt} × 100 = ${dt * 100}.
${carry2 > 0 ? `Add incoming carry ${carry2}: ${dt} + ${carry2} = ${hundredsSum}.` : `Tens contribution = ${dt * 100}.`}`,
        formula: `D(${a}) = ${a}² = ${dt}${carry2 > 0 ? ` + Carry ${carry2} = ${hundredsSum}` : ''} | Tens contribution = ${hundredsSum * 100}`,
        subResult: `Tens contribution = ${hundredsSum * 100}`,
        accumulatedAnswer: `${hundredsSum}${tensPlaced}${unitsPlaced}`,
      },
      {
        stepNumber: 5,
        totalSteps: 5,
        title: 'Combine Contributions & Final Verification',
        sanskritSutra: 'Sankalana-Vyavakalana (Place-Value Synthesis)',
        explanation: `Combine place-value contributions:
100 × ${a}² + 10 × (2 × ${a} × ${b}) + ${b}²
= 100 × ${dt} + 10 × ${dtu} + ${du}
= ${dt * 100} + ${dtu * 10} + ${du} = ${finalAnswer}.`,
        formula: `100·D(${a}) + 10·D(${a},${b}) + D(${b}) = ${dt * 100} + ${dtu * 10} + ${du} = ${finalAnswer}`,
        subResult: `Final Answer = ${finalAnswer}`,
        accumulatedAnswer: finalAnswer,
      },
    ];

    return {
      operationId: 'squaring',
      sutraName: 'General Duplex (Dvandva Yoga)',
      sanskritName: 'Urdhva-Tiryagbhyam (Dvandva Yoga)',
      inputs: { a: nStr },
      finalAnswer,
      steps,
      groundTruth,
      isVerified: finalAnswer === groundTruth,
      methodUsed: 'General Duplex (Dvandva Yoga) crosswise squaring',
      notes: `Calculated via place-value duplex decomposition: 100·D(${a}) + 10·D(${a},${b}) + D(${b}) = ${finalAnswer}.`,
    };
  }

  // Generalized multi-digit duplex calculation (length >= 3, e.g. 125)
  const m = nStr.length;
  const digits = nStr.split('').reverse().map(Number); // digits[0] is units
  const numCols = 2 * m - 1;
  const colSums = Array(numCols).fill(0);
  for (let p = 0; p < numCols; p++) {
    for (let i = 0; i <= p; i++) {
      const j = p - i;
      if (i <= j && i < m && j < m) {
        colSums[p] += (i === j ? digits[i] * digits[i] : 2 * digits[i] * digits[j]);
      }
    }
  }

  let carry = 0;
  const resultDigits: number[] = [];
  for (let p = 0; p < numCols; p++) {
    const val = colSums[p] + carry;
    resultDigits.unshift(val % 10);
    carry = Math.floor(val / 10);
  }
  if (carry > 0) resultDigits.unshift(carry);
  const finalAnswer = resultDigits.join('');

  const steps: CalculationStep[] = [
    {
      stepNumber: 1,
      totalSteps: 3,
      title: 'Digit Decomposition for Multi-Digit Duplex',
      sanskritSutra: 'Dvandva Yoga (General Duplex)',
      explanation: `Decompose ${nStr} into ${m} digits. Duplex contributions are evaluated for each column 10⁰ to 10^${numCols - 1}.`,
      formula: `Digits: [${nStr.split('').join(', ')}]`,
      subResult: `${m} digits`,
      accumulatedAnswer: `${nStr}²`,
    },
    {
      stepNumber: 2,
      totalSteps: 3,
      title: 'Compute Column Duplex Contributions',
      sanskritSutra: 'Urdhva-Tiryagbhyam (Vertical & Crosswise)',
      explanation: `Column duplex sums from units (10⁰) to highest power: [${colSums.join(', ')}].`,
      formula: `Columns: ${colSums.map((c, idx) => `10^${idx}×${c}`).join(' + ')}`,
      subResult: `Raw Columns = [${colSums.join(', ')}]`,
      accumulatedAnswer: `${nStr}² raw columns`,
    },
    {
      stepNumber: 3,
      totalSteps: 3,
      title: 'Propagate Carries & Place Values',
      sanskritSutra: 'Sankalana (Digit Synthesis)',
      explanation: `Propagating carries from right to left produces the exact square: ${finalAnswer}.`,
      formula: `Synthesized digits = ${finalAnswer}`,
      subResult: `Final Answer = ${finalAnswer}`,
      accumulatedAnswer: finalAnswer,
    },
  ];

  return {
    operationId: 'squaring',
    sutraName: 'General Duplex (Dvandva Yoga)',
    sanskritName: 'Urdhva-Tiryagbhyam (Dvandva Yoga)',
    inputs: { a: nStr },
    finalAnswer,
    steps,
    groundTruth,
    isVerified: finalAnswer === groundTruth,
    methodUsed: 'General Duplex (Dvandva Yoga) crosswise squaring',
    notes: `Calculated using general Dvandva Yoga column duplexes with carry propagation.`,
  };
}
