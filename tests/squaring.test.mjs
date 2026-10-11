import { calculateSquaring, yavadunamSquaring, ekadhikenaSquaring, generalSquaring } from '../lib/math/squaring.ts';
import { generateSquaringLesson, generateNikhilamLesson } from '../lib/math/nikhilamLesson.ts';
import { nikhilamMultiplication } from '../lib/math/nikhilamMult.ts';

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

console.log('\n=== TASK 9: AUTOMATED MATHEMATICAL TESTING FOR SQUARING ===');

// 1. Core minimum required square results
console.log('\n--- 1. Minimum Required Square Results ---');
const coreCases = [
  { n: '12', expected: '144', method: 'Yavadunam (Base 10)' },
  { n: '43', expected: '1849', method: 'Duplex (General Squaring)' },
  { n: '85', expected: '7225', method: 'Ekadhikena Purvena' },
  { n: '96', expected: '9216', method: 'Yavadunam (Base 100)' },
  { n: '108', expected: '11664', method: 'Yavadunam (Base 100)' },
  { n: '125', expected: '15625', method: 'Ekadhikena Purvena' },
];

for (const tc of coreCases) {
  const res = calculateSquaring(tc.n);
  const independentCheck = (BigInt(tc.n) * BigInt(tc.n)).toString();
  assert(res.finalAnswer === tc.expected, `${tc.n}² = ${res.finalAnswer} (expected ${tc.expected})`);
  assert(res.finalAnswer === independentCheck, `${tc.n}² matches independent BigInt multiplication (${independentCheck})`);
  assert(res.isVerified === true, `${tc.n}² marked verified`);
  assert(res.methodUsed.toLowerCase().includes(tc.method.split(' ')[0].toLowerCase()), `${tc.n}² used expected method: ${res.methodUsed}`);
}

// 2. Carry Normalization Testing
console.log('\n--- 2. Carry Normalization Testing ---');
// 18 close to base 10: d = 8, d² = 64. q = floor(64/10) = 6, r = 64 % 10 = 4.
// Left = 10 + 2(8) + 6 = 32. Right = 4. 32 * 10 + 4 = 324.
const carryCases = [
  { n: '18', expected: '324', base: 10, d: 8, q: 6, r: 4 },
  { n: '88', expected: '7744', base: 100, d: -12, q: 1, r: 44 }, // (-12)² = 144 -> q=1, r=44
  { n: '112', expected: '12544', base: 100, d: 12, q: 1, r: 44 }, // (+12)² = 144 -> q=1, r=44
];

for (const cc of carryCases) {
  const res = calculateSquaring(cc.n);
  const independentCheck = (BigInt(cc.n) * BigInt(cc.n)).toString();
  assert(res.finalAnswer === cc.expected, `${cc.n}² with carry = ${res.finalAnswer} (expected ${cc.expected})`);
  assert(res.finalAnswer === independentCheck, `${cc.n}² matches independent arithmetic (${independentCheck})`);
  assert(res.isVerified === true, `${cc.n}² verification passed`);
}

// 3. Positive vs Negative Deviations
console.log('\n--- 3. Positive and Negative Deviations (Yavadunam) ---');
const yavadunamNeg = yavadunamSquaring(96);
assert(yavadunamNeg.finalAnswer === '9216' && yavadunamNeg.steps[0].formula?.includes('Deviation d = -4'), `96 has negative deviation -4, result 9216`);

const yavadunamPos = yavadunamSquaring(108);
assert(yavadunamPos.finalAnswer === '11664' && yavadunamPos.steps[0].formula?.includes('Deviation d = +8'), `108 has positive deviation +8, result 11664`);

const yavadunam12 = yavadunamSquaring(12);
assert(yavadunam12.finalAnswer === '144' && yavadunam12.steps[0].formula?.includes('Base = 10') && yavadunam12.steps[0].formula?.includes('Deviation d = +2'), `12 has base 10, deviation +2, result 144`);

// 4. Numbers ending in 5 (Ekadhikena Purvena)
console.log('\n--- 4. Numbers Ending in 5 (Ekadhikena Purvena) ---');
const eka85 = ekadhikenaSquaring(85);
assert(eka85.finalAnswer === '7225', `85² = 7225 via Ekadhikena`);
const eka125 = ekadhikenaSquaring(125);
assert(eka125.finalAnswer === '15625', `125² = 15625 via Ekadhikena`);
const eka35 = ekadhikenaSquaring(35);
assert(eka35.finalAnswer === '1225', `35² = 1225 via Ekadhikena`);

// 5. General Duplex Squaring
console.log('\n--- 5. General Duplex Squaring ---');
const dup43 = generalSquaring(43);
assert(dup43.finalAnswer === '1849', `43² = 1849 via Duplex`);
const dup67 = generalSquaring(67);
assert(dup67.finalAnswer === '4489', `67² = 4489 via Duplex`);

// 6. Input Validation
console.log('\n--- 6. Input Validation ---');
const invalidCases = ['', 'abc', '-12', '0', '  '];
for (const inv of invalidCases) {
  const res = calculateSquaring(inv);
  assert(res.finalAnswer === '0' || !res.isVerified, `Invalid input "${inv}" safely handled without throwing: answer="${res.finalAnswer}", isVerified=${res.isVerified}`);
}

// 7. Dynamic Input Change Test: 85 -> 12
console.log('\n--- 7. Dynamic Input Change Test: 85 -> 12 ---');
const res85 = calculateSquaring('85');
assert(res85.finalAnswer === '7225', `Initial calculation with 85 yields 7225`);
const res12 = calculateSquaring('12');
assert(res12.finalAnswer === '144', `Recomputing with 12 yields 144 (not 7225 or any other stale value)`);

// 8. 3D Walkthrough Squaring Lesson for 12²
console.log('\n--- 8. 3D Walkthrough Squaring Lesson for 12² ---');
const lesson12 = generateSquaringLesson('12');
assert(lesson12.operationType === 'squaring', `Lesson operationType is 'squaring'`);
assert(lesson12.finalAnswer === '144', `Lesson finalAnswer is '144' (not 1164)`);
assert(lesson12.base === 10, `Lesson base is 10 (not 100)`);
assert(lesson12.devA === 2, `Lesson deviation is +2`);
assert(lesson12.lhs === 14, `Lesson adjusted left component is 14`);
assert(lesson12.rawRhs === 4, `Lesson squared deviation is 4`);
assert(lesson12.balancedRhsStr === '4', `Lesson right component is '4'`);
assert(lesson12.isVerified === true, `Lesson isVerified is true`);
assert(lesson12.chapters.length === 7, `Lesson has 7 structured chapters`);

// Check Scene 1
assert(lesson12.chapters[0].title.includes('Yavadunam') || lesson12.chapters[0].title.includes('12'), `Scene 1 title is specific to squaring 12: "${lesson12.chapters[0].title}"`);
assert(lesson12.chapters[0].equations.join(' ').includes('12²'), `Scene 1 equation contains 12²: "${lesson12.chapters[0].equations.join(' ')}"`);

// Check Scene 3
assert(lesson12.chapters[2].equations.join(' ').includes('12 - 10') || lesson12.chapters[2].equations.join(' ').includes('+2'), `Scene 3 deviation equation: "${lesson12.chapters[2].equations.join(' ')}"`);

// Check Scene 4
assert(lesson12.chapters[3].equations.join(' ').includes('12 + 2') || lesson12.chapters[3].equations.join(' ').includes('14'), `Scene 4 left component equation: "${lesson12.chapters[3].equations.join(' ')}"`);

// Check Scene 5
assert(lesson12.chapters[4].equations.join(' ').includes('2²') || lesson12.chapters[4].equations.join(' ').includes('4'), `Scene 5 deviation square equation: "${lesson12.chapters[4].equations.join(' ')}"`);

// Check Scene 6
assert(lesson12.chapters[5].equations.join(' ').includes('14 | 4') || lesson12.chapters[5].equations.join(' ').includes('140 + 4'), `Scene 6 combine equation: "${lesson12.chapters[5].equations.join(' ')}"`);

// Check Scene 7
assert(lesson12.chapters[6].equations.join(' ').includes('144'), `Scene 7 final answer is 144`);
assert(lesson12.chapters[6].narrationText.includes('12 × 12 = 144'), `Scene 7 independent verification text includes 12 × 12 = 144`);
assert(lesson12.chapters[6].title === 'Arithmetic Verification Passed', `Scene 7 title is "Arithmetic Verification Passed"`);

// 9. Ensure 97 is NEVER present in Squaring Lesson
console.log('\n--- 9. No Stale Factor 97 in Squaring Lesson ---');
const lessonJson = JSON.stringify(lesson12);
assert(!lessonJson.includes('97'), `Squaring lesson for 12 contains no trace of 97`);
assert(!lessonJson.includes('1164'), `Squaring lesson for 12 contains no trace of 1164`);

// 10. Regression Test: Existing Multiplication 98 × 97 = 9506
console.log('\n--- 10. Regression Test: Multiplication 98 × 97 = 9506 ---');
const multRes = nikhilamMultiplication('98', '97');
assert(multRes.finalAnswer === '9506', `Nikhilam multiplication 98 × 97 = 9506`);
assert(multRes.isVerified === true, `98 × 97 verified`);

const multLesson = generateNikhilamLesson('98', '97');
assert(multLesson.operationType === 'multiplication', `Multiplication lesson operationType is 'multiplication'`);
assert(multLesson.finalAnswer === '9506', `Multiplication lesson finalAnswer is '9506'`);
assert(multLesson.chapters[6].title === 'Arithmetic Verification Passed', `Multiplication lesson Scene 7 title updated to 'Arithmetic Verification Passed'`);

// 11. GENERAL DUPLEX WALKTHROUGH TEST FOR 40² = 1600
console.log('\n--- 11. General Duplex 40² Walkthrough Validation ---');
const lesson40 = generateSquaringLesson('40', 'duplex');
assert(lesson40.operationType === 'squaring', `40 lesson operationType is 'squaring'`);
assert(lesson40.squaringMethod === 'duplex', `40 lesson squaringMethod is 'duplex'`);
assert(lesson40.finalAnswer === '1600', `40² final answer is 1600`);
assert(lesson40.groundTruth === '1600', `40² groundTruth is 1600`);
assert(lesson40.isVerified === true, `40² isVerified is true`);
assert(lesson40.chapters.length === 7, `40² lesson has exactly 7 chapters`);

// Scene 1: Introduction
const sc1 = lesson40.chapters[0];
assert(sc1.title.includes('Squaring 40 Using General Duplex'), `Scene 1 title is "Squaring 40 Using General Duplex"`);
assert(sc1.equations.includes('40² = ?'), `Scene 1 equation displays "40² = ?"`);

// Scene 2: Identify Digits
const sc2 = lesson40.chapters[1];
assert(sc2.title.includes('Identify Digits'), `Scene 2 title is "Identify Digits & Place Values"`);
assert(sc2.captionText.includes('Tens digit = 4') && sc2.captionText.includes('Units digit = 0'), `Scene 2 identifies Tens digit = 4, Units digit = 0`);
assert(!sc2.captionText.toLowerCase().includes('deviation'), `Scene 2 does NOT display deviation`);
assert(!sc2.captionText.toLowerCase().includes('base 10'), `Scene 2 does NOT display base 10`);

// Scene 3: Units Duplex
const sc3 = lesson40.chapters[2];
assert(sc3.title.includes('Units Duplex') && sc3.title.includes('D(0) = 0²'), `Scene 3 title is Units Duplex D(0) = 0²`);
assert(sc3.equations.some(eq => eq.includes('D(0) = 0² = 0')), `Scene 3 equation D(0) = 0² = 0`);
assert(sc3.captionText.includes('Units contribution = 0'), `Scene 3 states units contribution = 0`);

// Scene 4: Cross Duplex
const sc4 = lesson40.chapters[3];
assert(sc4.title.includes('Cross Duplex') && sc4.title.includes('D(4, 0) = 2 × 4 × 0'), `Scene 4 title is Cross Duplex D(4, 0) = 2 × 4 × 0`);
assert(sc4.equations.some(eq => eq.includes('D(4, 0) = 2 × 4 × 0 = 0')), `Scene 4 equation D(4, 0) = 2 × 4 × 0 = 0`);
assert(sc4.narrationText.toLowerCase().includes('zero because one of the digits is zero'), `Scene 4 explains cross contribution is zero because one digit is zero`);
// STRICT REGRESSION CHECKS:
const allLesson40Text = JSON.stringify(lesson40);
assert(!allLesson40Text.includes('LEFT PART = 16'), `General Duplex 40² NEVER contains "LEFT PART = 16"`);
assert(!allLesson40Text.includes('40 + (+0) = 16'), `General Duplex 40² NEVER contains "40 + (+0) = 16"`);
assert(!allLesson40Text.includes('40 + 0 = 16'), `General Duplex 40² NEVER contains "40 + 0 = 16"`);
assert(!allLesson40Text.includes('left = n + d'), `General Duplex 40² NEVER contains "left = n + d"`);

// Scene 5: Tens Duplex
const sc5 = lesson40.chapters[4];
assert(sc5.title.includes('Tens Duplex') && sc5.title.includes('D(4) = 4²'), `Scene 5 title is Tens Duplex D(4) = 4²`);
assert(sc5.equations.some(eq => eq.includes('D(4) = 4² = 16')), `Scene 5 equation D(4) = 4² = 16`);
assert(sc5.captionText.includes('(4 × 10)² = 16 × 100 = 1600'), `Scene 5 caption has (4 × 10)² = 16 × 100 = 1600`);
assert(sc5.captionText.includes('Tens contribution = 1600'), `Scene 5 states Tens contribution = 1600`);

// Scene 6: Combine Contributions
const sc6 = lesson40.chapters[5];
assert(sc6.title.includes('Combine Contributions'), `Scene 6 title is "Combine Contributions"`);
assert(sc6.equations.some(eq => eq.includes('Tens contribution: 100 × 4² = 1600')), `Scene 6 shows Tens contribution: 100 × 4² = 1600`);
assert(sc6.equations.some(eq => eq.includes('Cross contribution: 10 × (2 × 4 × 0) = 0')), `Scene 6 shows Cross contribution: 10 × (2 × 4 × 0) = 0`);
assert(sc6.equations.some(eq => eq.includes('Units contribution: 0² = 0')), `Scene 6 shows Units contribution: 0² = 0`);
assert(sc6.equations.some(eq => eq.includes('1600 + 0 + 0 = 1600')), `Scene 6 shows 1600 + 0 + 0 = 1600`);
assert(sc6.equations.some(eq => eq.includes('40² = 1600')), `Scene 6 shows 40² = 1600`);

// Scene 7: Verification
const sc7 = lesson40.chapters[6];
assert(sc7.title === 'Arithmetic Verification Passed', `Scene 7 title is Arithmetic Verification Passed`);
assert(sc7.equations.includes('40² = 1600'), `Scene 7 displays 40² = 1600`);
assert(sc7.captionText.includes('40 × 40 = 1600'), `Scene 7 displays independent arithmetic check: 40 × 40 = 1600`);

// 12. GENERAL DUPLEX ARBITRARY NUMBER VERIFICATION (40, 43, 25, 99, 125)
console.log('\n--- 12. General Duplex Calculation Suite (40, 43, 25, 99, 125) ---');
const duplexVerificationList = [
  { n: '40', expected: '1600' },
  { n: '43', expected: '1849' },
  { n: '25', expected: '625' },
  { n: '99', expected: '9801' },
  { n: '125', expected: '15625' },
];

for (const item of duplexVerificationList) {
  const res = generalSquaring(item.n);
  const indCheck = (BigInt(item.n) * BigInt(item.n)).toString();
  assert(res.finalAnswer === item.expected, `generalSquaring(${item.n}) = ${res.finalAnswer} (expected ${item.expected})`);
  assert(res.finalAnswer === indCheck, `generalSquaring(${item.n}) matches BigInt check ${indCheck}`);
  assert(res.isVerified === true, `generalSquaring(${item.n}) is verified`);

  const lesson = generateSquaringLesson(item.n, 'duplex');
  assert(lesson.finalAnswer === item.expected, `generateSquaringLesson(${item.n}, 'duplex') finalAnswer = ${lesson.finalAnswer}`);
  assert(lesson.squaringMethod === 'duplex', `generateSquaringLesson(${item.n}, 'duplex') method is 'duplex'`);
}

// 13. EKADHIKENA PURVENA WALKTHROUGH TEST FOR 85² = 7225
console.log('\n--- 13. Ekadhikena Purvena 85² Walkthrough Validation ---');
const lesson85 = generateSquaringLesson('85', 'ekadhikena');
assert(lesson85.operationType === 'squaring', `85 lesson operationType is 'squaring'`);
assert(lesson85.squaringMethod === 'ekadhikena', `85 lesson squaringMethod is 'ekadhikena'`);
assert(lesson85.finalAnswer === '7225', `85² final answer is 7225`);
assert(lesson85.groundTruth === '7225', `85² groundTruth is 7225`);
assert(lesson85.isVerified === true, `85² isVerified is true`);
assert(lesson85.chapters.length === 7, `85² lesson has exactly 7 chapters`);

// Verify no base/deviation leakage in lesson85 root
assert(lesson85.base === 0, `85 lesson base is 0 (no Yavadunam base 100)`);
assert(lesson85.devA === 0, `85 lesson devA is 0 (no Yavadunam deviation +5)`);
assert(lesson85.devAStr === '', `85 lesson devAStr is empty`);

// Strict text assertions across all scenes of 85²
const allLesson85Text = JSON.stringify(lesson85);
assert(!allLesson85Text.includes('85 + (+5) = 72'), `85² NEVER displays false equation "85 + (+5) = 72"`);
assert(!allLesson85Text.includes('85 + 5 = 72'), `85² NEVER displays false equation "85 + 5 = 72"`);
assert(!allLesson85Text.includes('Deviation = +5'), `85² NEVER displays "Deviation = +5"`);
assert(!allLesson85Text.includes('Base = 100'), `85² NEVER displays "Base = 100"`);
assert(!allLesson85Text.includes('left = n + d'), `85² NEVER displays "left = n + d"`);
assert(!allLesson85Text.includes('LEFT COMPONENT (N + D)'), `85² NEVER displays "LEFT COMPONENT (N + D)"`);
assert(!allLesson85Text.includes('SQUARE OF DEVIATION'), `85² NEVER displays "SQUARE OF DEVIATION"`);

// SCENE 1: Introduction
const sc1_85 = lesson85.chapters[0];
assert(sc1_85.title === 'Squaring 85 Using Ekadhikena Purvena', `Scene 1 title is "Squaring 85 Using Ekadhikena Purvena"`);
assert(sc1_85.equations.includes('85² = ?'), `Scene 1 equation displays "85² = ?"`);
assert(sc1_85.narrationText.toLowerCase().includes('ending in 5') && sc1_85.narrationText.toLowerCase().includes('prefix'), `Scene 1 explains numbers ending in 5 can be squared using prefix and terminal digit`);

// SCENE 2: Split the Number
const sc2_85 = lesson85.chapters[1];
assert(sc2_85.title === 'Split the Number', `Scene 2 title is "Split the Number"`);
assert(sc2_85.equations.some(eq => eq.includes('85 = 8 | 5')), `Scene 2 displays "85 = 8 | 5"`);
assert(sc2_85.captionText.includes('Prefix = 8') && sc2_85.captionText.includes('Last digit = 5'), `Scene 2 displays Prefix = 8 and Last digit = 5`);

// SCENE 3: Find the Successor
const sc3_85 = lesson85.chapters[2];
assert(sc3_85.title === 'Find the Successor', `Scene 3 title is "Find the Successor"`);
assert(sc3_85.equations.some(eq => eq.includes('Successor = 8 + 1 = 9')), `Scene 3 displays "Successor = 8 + 1 = 9"`);
assert(sc3_85.captionText.includes('Prefix = 8') && sc3_85.captionText.includes('Successor = 8 + 1 = 9'), `Scene 3 caption displays Prefix = 8, Successor = 8 + 1 = 9`);
assert(sc3_85.narrationText.toLowerCase().includes('one more than the preceding'), `Scene 3 explains Ekadhikena means "one more than the preceding"`);

// SCENE 4: Multiply the Prefix and Successor
const sc4_85 = lesson85.chapters[3];
assert(sc4_85.title === 'Multiply the Prefix and Successor', `Scene 4 title is "Multiply the Prefix and Successor"`);
assert(sc4_85.equations.some(eq => eq.includes('8 × 9 = 72')), `Scene 4 displays equation "8 × 9 = 72"`);
assert(sc4_85.equations.some(eq => eq.includes('LEFT PART = 72')), `Scene 4 displays "LEFT PART = 72"`);
assert(sc4_85.captionText.includes('8 × 9 = 72') && sc4_85.captionText.includes('LEFT PART = 72'), `Scene 4 caption displays 8 × 9 = 72 and LEFT PART = 72`);

// SCENE 5: Square the Final Digit
const sc5_85 = lesson85.chapters[4];
assert(sc5_85.title === 'Square the Final Digit', `Scene 5 title is "Square the Final Digit"`);
assert(sc5_85.equations.some(eq => eq.includes('5² = 25')), `Scene 5 displays equation "5² = 25"`);
assert(sc5_85.equations.some(eq => eq.includes('RIGHT PART = 25')), `Scene 5 displays "RIGHT PART = 25"`);
assert(sc5_85.narrationText.includes('final digit is 5, and its square is 25'), `Scene 5 explains final digit is 5 and square is 25`);

// SCENE 6: Combine the Parts
const sc6_85 = lesson85.chapters[5];
assert(sc6_85.title === 'Combine the Parts', `Scene 6 title is "Combine the Parts"`);
assert(sc6_85.equations.some(eq => eq.includes('72 | 25')), `Scene 6 displays "72 | 25"`);
assert(sc6_85.equations.some(eq => eq.includes('72 × 100 + 25 = 7225')), `Scene 6 displays "72 × 100 + 25 = 7225"`);
assert(sc6_85.equations.some(eq => eq.includes('85² = 7225')), `Scene 6 displays final answer "85² = 7225"`);
assert(sc6_85.captionText.includes('first part is 72 and the final two digits are 25'), `Scene 6 explains first part is 72 and final two digits are 25`);

// SCENE 7: Verification
const sc7_85 = lesson85.chapters[6];
assert(sc7_85.title === 'Arithmetic Verification Passed', `Scene 7 title is "Arithmetic Verification Passed"`);
assert(sc7_85.equations.includes('85² = 7225'), `Scene 7 displays 85² = 7225`);
assert(sc7_85.captionText.includes('85 × 85 = 7225'), `Scene 7 independent verification displays 85 × 85 = 7225`);

// 14. PRESETS SUITE COMPREHENSIVE VERIFICATION
console.log('\n--- 14. Presets Suite Comprehensive Verification ---');
const presetsToVerify = [
  { n: '12', expected: '144', method: 'yavadunam' },
  { n: '85', expected: '7225', method: 'ekadhikena' },
  { n: '96', expected: '9216', method: 'yavadunam' },
  { n: '108', expected: '11664', method: 'yavadunam' },
  { n: '43', expected: '1849', method: 'duplex' },
  { n: '125', expected: '15625', method: 'ekadhikena' },
  { n: '40', expected: '1600', method: 'duplex' },
];

for (const p of presetsToVerify) {
  const lesson = generateSquaringLesson(p.n, p.method);
  assert(lesson.finalAnswer === p.expected, `Preset ${p.n}² = ${lesson.finalAnswer} (expected ${p.expected})`);
  assert(lesson.groundTruth === p.expected, `Preset ${p.n}² groundTruth = ${p.expected}`);
  assert(lesson.isVerified === true, `Preset ${p.n}² is verified`);
  assert(lesson.squaringMethod === p.method, `Preset ${p.n}² used method ${lesson.squaringMethod} (expected ${p.method})`);
}

// 15. GENERAL DUPLEX 43² INDIVIDUAL CONTRIBUTIONS & METHOD SUBTITLES
console.log('\n--- 15. General Duplex 43² Individual Contributions & Method Subtitles ---');
const lesson43 = generateSquaringLesson('43', 'duplex');
assert(lesson43.finalAnswer === '1849', `43² finalAnswer is 1849`);
assert(lesson43.groundTruth === '1849', `43² groundTruth is 1849`);

// Verify 43² Scene 6 displays all three individual contributions distinctly
const sc6_43 = lesson43.chapters[5];
assert(sc6_43.equations.some(eq => eq.includes('Tens contribution: 100 × 4² = 1600')), `43² Scene 6 displays "Tens contribution: 100 × 4² = 1600"`);
assert(sc6_43.equations.some(eq => eq.includes('Cross contribution: 10 × (2 × 4 × 3) = 240')), `43² Scene 6 displays "Cross contribution: 10 × (2 × 4 × 3) = 240"`);
assert(sc6_43.equations.some(eq => eq.includes('Units contribution: 3² = 9')), `43² Scene 6 displays "Units contribution: 3² = 9"`);
assert(sc6_43.equations.some(eq => eq.includes('Then show: 1600 + 240 + 9 = 1849')), `43² Scene 6 displays "Then show: 1600 + 240 + 9 = 1849"`);
assert(sc6_43.equations.some(eq => eq.includes('Final result: 43² = 1849')), `43² Scene 6 displays "Final result: 43² = 1849"`);

// Verify method-aware subtitles
assert(lesson85.sutraSubtitle.includes('Prefix and successor multiplication for numbers ending in 5.'), `85² Ekadhikena subtitle matches "Prefix and successor multiplication for numbers ending in 5."`);
assert(lesson12.sutraSubtitle.includes('Base selection, signed deviations and place-value alignment.'), `12² Yavadunam subtitle matches "Base selection, signed deviations and place-value alignment."`);
assert(lesson43.sutraSubtitle.includes('Digit-wise duplex contributions, place values and carries.'), `43² General Duplex subtitle matches "Digit-wise duplex contributions, place values and carries."`);

// Verify Core Operations step counts in calculation results
const calc85 = calculateSquaring('85');
const calc43 = calculateSquaring('43');
const calc12 = calculateSquaring('12');
assert(calc85.steps.length === 3, `85² has 3 Core Operations`);
assert(calc43.steps.length === 5, `43² has 5 Core Operations`);
assert(calc12.steps.length === 3, `12² has 3 Core Operations`);

console.log(`\n======================================================`);
console.log(`TOTAL SQUARING TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log(`======================================================\n`);

if (failed > 0) {
  process.exit(1);
}

