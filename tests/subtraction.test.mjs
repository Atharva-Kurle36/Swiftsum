import { generateSubtractionLesson, generateNikhilamLesson } from '../lib/math/nikhilamLesson.ts';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n=== Testing Vedic Subtraction (Nikhilam Navatashcaramam Dashatah) ===');

// PRESET 1: 1000 - 347 = 653
console.log('\n--- Preset 1: 1000 - 347 ---');
const p1 = generateSubtractionLesson('1000', '347');
assert(p1.operationType === 'subtraction', 'Operation type is subtraction');
assert(p1.finalAnswer === '653', `Final answer is 653 (got ${p1.finalAnswer})`);
assert(p1.base === 1000, `Base is 1000 (got ${p1.base})`);
assert(p1.subtractionData.complement === 653, `Complement is 653 (got ${p1.subtractionData.complement})`);
assert(p1.subtractionData.intermediateSum === 1653, `Intermediate sum is 1653 (got ${p1.subtractionData.intermediateSum})`);
assert(p1.isVerified === true, 'Ground truth verified');
assert(p1.groundTruth === '653', `Ground truth is '653' (got ${p1.groundTruth})`);
assert(p1.chapters.length === 7, '7 chapters generated');

// Verify formula: M - S = M + (B - S) - B
const p1Formula = p1.a + (p1.subtractionData.base - p1.b) - p1.subtractionData.base;
assert(p1Formula === 653, `Complement identity holds: ${p1.a} + (${p1.subtractionData.base} - ${p1.b}) - ${p1.subtractionData.base} = 653`);

// Verify independent addition check: finalAnswer + b = a
assert(parseInt(p1.finalAnswer) + p1.b === p1.a, `Independent addition verification holds: ${p1.finalAnswer} + ${p1.b} = ${p1.a}`);

// Check that multiplication terms do NOT appear in titles or captions
const p1ChaptersText = p1.chapters.map(c => `${c.title} ${c.heading} ${c.captionText}`).join(' ');
assert(!p1ChaptersText.includes('Multiplication Using the Nikhilam Method'), 'Never mentions multiplication player title');
assert(!p1ChaptersText.includes('Factor 1') && !p1ChaptersText.includes('Factor 2'), 'Never mentions Factor 1 or Factor 2');
assert(!p1ChaptersText.includes('LEFT PART') && !p1ChaptersText.includes('RIGHT PART'), 'Never mentions LEFT PART or RIGHT PART');
assert(!p1ChaptersText.includes('347000'), 'Never mentions 347000');

// PRESET 2: 10000 - 6824 = 3176
console.log('\n--- Preset 2: 10000 - 6824 ---');
const p2 = generateSubtractionLesson('10000', '6824');
assert(p2.finalAnswer === '3176', `Final answer is 3176 (got ${p2.finalAnswer})`);
assert(p2.base === 10000, `Base is 10000 (got ${p2.base})`);
assert(p2.subtractionData.complement === 3176, `Complement is 3176 (got ${p2.subtractionData.complement})`);
assert(p2.subtractionData.intermediateSum === 13176, `Intermediate sum is 13176 (got ${p2.subtractionData.intermediateSum})`);
assert(p2.isVerified === true, 'Ground truth verified');
assert(parseInt(p2.finalAnswer) + p2.b === p2.a, `Independent check: ${p2.finalAnswer} + ${p2.b} = ${p2.a}`);

// PRESET 3: 524 - 189 = 335
console.log('\n--- Preset 3: 524 - 189 ---');
const p3 = generateSubtractionLesson('524', '189');
assert(p3.finalAnswer === '335', `Final answer is 335 (got ${p3.finalAnswer})`);
assert(p3.base === 1000, `Base is 1000 (got ${p3.base})`);
assert(p3.subtractionData.complement === 811, `Complement of 189 (base 1000) is 811 (got ${p3.subtractionData.complement})`);
assert(p3.subtractionData.intermediateSum === 1335, `Intermediate sum: 524 + 811 = 1335 (got ${p3.subtractionData.intermediateSum})`);
assert(p3.isVerified === true, 'Ground truth verified');
const p3Formula = p3.a + (p3.subtractionData.base - p3.b) - p3.subtractionData.base;
assert(p3Formula === 335, `Complement identity holds: 524 + 811 - 1000 = 335`);
assert(parseInt(p3.finalAnswer) + p3.b === p3.a, `Independent check: ${p3.finalAnswer} + ${p3.b} = ${p3.a}`);

// PRESET 4: 100000 - 45391 = 54609
console.log('\n--- Preset 4: 100000 - 45391 ---');
const p4 = generateSubtractionLesson('100000', '45391');
assert(p4.finalAnswer === '54609', `Final answer is 54609 (got ${p4.finalAnswer})`);
assert(p4.base === 100000, `Base is 100000 (got ${p4.base})`);
assert(p4.subtractionData.complement === 54609, `Complement is 54609 (got ${p4.subtractionData.complement})`);
assert(p4.subtractionData.intermediateSum === 154609, `Intermediate sum is 154609 (got ${p4.subtractionData.intermediateSum})`);
assert(p4.isVerified === true, 'Ground truth verified');
assert(parseInt(p4.finalAnswer) + p4.b === p4.a, `Independent check: ${p4.finalAnswer} + ${p4.b} = ${p4.a}`);

// REGRESSION TEST: MULTIPLICATION 98 * 97 = 9506
console.log('\n--- Regression Test: Multiplication 98 * 97 ---');
const mul = generateNikhilamLesson('98', '97');
assert(mul.operationType === 'multiplication', 'Operation type is multiplication');
assert(mul.finalAnswer === '9506', `Final answer is 9506 (got ${mul.finalAnswer})`);
assert(mul.base === 100, `Base is 100 (got ${mul.base})`);
assert(mul.devA === -2 && mul.devB === -3, `Deviations are -2 and -3 (got ${mul.devA}, ${mul.devB})`);
assert(mul.lhs === 95, `Cross-addition LHS is 95 (got ${mul.lhs})`);
assert(mul.balancedRhsStr === '06', `Right part is '06' (got ${mul.balancedRhsStr})`);
assert(mul.isVerified === true, 'Ground truth verified');

console.log(`\n========================================`);
console.log(`SUMMARY: ${passed} passed, ${failed} failed`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
