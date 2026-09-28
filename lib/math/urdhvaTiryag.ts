import { CalculationResult, CalculationStep, DigitConnection } from './types';

export function urdhvaTiryagbhyam(aStr: string, bStr: string): CalculationResult {
  const cleanA = aStr.replace(/^0+(?!$)/, '') || '0';
  const cleanB = bStr.replace(/^0+(?!$)/, '') || '0';

  const m = cleanA.length;
  const n = cleanB.length;
  const digitsA = cleanA.split('').map(Number);
  const digitsB = cleanB.split('').map(Number);

  const steps: CalculationStep[] = [];
  const totalRounds = m + n - 1;
  let currentCarry = 0;
  const resultDigits: number[] = [];

  for (let s = 0; s < totalRounds; s++) {
    // Find all pairs (i, j) where i is index in A from right (0 = units) and j in B from right
    // s = i + j
    const activePairs: Array<{ i: number; j: number; topIdx: number; botIdx: number; prod: number }> = [];
    const connections: DigitConnection[] = [];
    const topActive: number[] = [];
    const botActive: number[] = [];

    for (let i = 0; i < m; i++) {
      const j = s - i;
      if (j >= 0 && j < n) {
        const topIdx = m - 1 - i;
        const botIdx = n - 1 - j;
        const prod = digitsA[topIdx] * digitsB[botIdx];
        activePairs.push({ i, j, topIdx, botIdx, prod });
        connections.push({ topIndex: topIdx, bottomIndex: botIdx });
        if (!topActive.includes(topIdx)) topActive.push(topIdx);
        if (!botActive.includes(botIdx)) botActive.push(botIdx);
      }
    }

    const sumProducts = activePairs.reduce((acc, p) => acc + p.prod, 0);
    const totalStepSum = sumProducts + currentCarry;
    const digitPlaced = totalStepSum % 10;
    const nextCarry = Math.floor(totalStepSum / 10);
    resultDigits.unshift(digitPlaced);

    // Human-friendly description
    const isVertical = activePairs.length === 1 && activePairs[0].topIdx === activePairs[0].botIdx && m === n;
    const modeName = activePairs.length === 1 ? 'Vertical Multiplication' : 'Crosswise Multiplication';

    const formulaParts = activePairs.map(
      p => `(${digitsA[p.topIdx]} × ${digitsB[p.botIdx]} = ${p.prod})`
    );
    let formulaStr = formulaParts.join(' + ');
    if (currentCarry > 0) {
      formulaStr += ` + ${currentCarry} (carry)`;
    }
    formulaStr += ` = ${totalStepSum}`;

    const explanation = activePairs.length === 1
      ? `Step ${s + 1}: Multiply vertically ${digitsA[activePairs[0].topIdx]} × ${digitsB[activePairs[0].botIdx]} = ${sumProducts}.${currentCarry > 0 ? ` Add incoming carry ${currentCarry} to get ${totalStepSum}.` : ''} Write down ${digitPlaced} and carry over ${nextCarry}.`
      : `Step ${s + 1}: Cross-multiply and sum the ${activePairs.length} digit pairs: ${formulaParts.join(' + ')} = ${sumProducts}.${currentCarry > 0 ? ` Add incoming carry ${currentCarry} to get ${totalStepSum}.` : ''} Write down ${digitPlaced} and carry over ${nextCarry}.`;

    steps.push({
      stepNumber: s + 1,
      totalSteps: totalRounds + (nextCarry > 0 ? 1 : 0),
      title: `${modeName} (Column ${s + 1})`,
      sanskritSutra: 'Urdhva-Tiryagbhyam (Vertically & Crosswise)',
      explanation,
      formula: formulaStr,
      subResult: `Digit: ${digitPlaced}, Carry to next column: ${nextCarry}`,
      carryIn: currentCarry,
      carryOut: nextCarry,
      activeConnections: connections,
      activeDigits: { top: topActive, bottom: botActive },
      accumulatedAnswer: resultDigits.join(''),
    });

    currentCarry = nextCarry;
  }

  // If there is a remaining carry at the end, append it as the final step
  if (currentCarry > 0) {
    resultDigits.unshift(currentCarry);
    steps.push({
      stepNumber: totalRounds + 1,
      totalSteps: totalRounds + 1,
      title: 'Final Carry Resolution',
      sanskritSutra: 'Urdhva-Tiryagbhyam',
      explanation: `Prefix the final remaining carry of ${currentCarry} to the left of the accumulated digits.`,
      formula: `Carry ${currentCarry} placed at the highest place-value.`,
      subResult: `Final Prefix: ${currentCarry}`,
      carryIn: currentCarry,
      carryOut: 0,
      accumulatedAnswer: resultDigits.join(''),
    });
  }

  // Update totalSteps count on all steps
  const finalTotalSteps = steps.length;
  steps.forEach(st => (st.totalSteps = finalTotalSteps));

  const finalAnswer = resultDigits.join('') || '0';
  const groundTruth = (BigInt(cleanA) * BigInt(cleanB)).toString();
  const isVerified = finalAnswer === groundTruth;

  return {
    operationId: 'multiplication',
    sutraName: 'Urdhva-Tiryagbhyam (Vertically & Crosswise)',
    sanskritName: 'Urdhva-Tiryagbhyam',
    inputs: { a: cleanA, b: cleanB },
    finalAnswer,
    steps,
    groundTruth,
    isVerified,
    methodUsed: 'Urdhva-Tiryagbhyam general crosswise multiplication',
    notes: 'All intermediate cross-products are accumulated in place, eliminating secondary row additions.',
  };
}
