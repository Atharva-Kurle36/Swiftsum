import { generateDivisibilityLesson, generateDivisionLesson } from '../lib/math/nikhilamLesson.ts';

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

console.log('\n=== Testing Divisibility Check vs Division ===');

// CASE 1: 1967 ÷ 5 -> NOT DIVISIBLE
console.log('\n--- Case 1: 1967 ÷ 5 (Not Divisible) ---');
const c1 = generateDivisibilityLesson('1967', '5');
assert(c1.operationType === 'divisibility', "c1.operationType === 'divisibility'");
assert(c1.divisibilityData !== undefined, 'divisibilityData is present');
assert(c1.divisibilityData.num === 1967, 'num is 1967');
assert(c1.divisibilityData.divisor === 5, 'divisor is 5');
assert(c1.divisibilityData.lastDigit === 7, 'lastDigit is 7');
assert(c1.divisibilityData.quotient === 393, 'quotient is 393');
assert(c1.divisibilityData.remainder === 2, 'remainder is 2');
assert(c1.divisibilityData.isDivisible === false, 'isDivisible is false');
assert(c1.finalAnswer === 'NOT DIVISIBLE', "finalAnswer is 'NOT DIVISIBLE'");
assert(c1.divisibilityData.verdictText === 'NOT DIVISIBLE', "verdictText is 'NOT DIVISIBLE'");
assert(c1.chapters.length === 7, 'has 7 scenes');

// Verification formula: N = d * quotient + remainder
assert(
  c1.divisibilityData.divisor * c1.divisibilityData.quotient + c1.divisibilityData.remainder === c1.divisibilityData.num,
  `Euclidean verification: 5 * 393 + 2 = ${5 * 393 + 2} === 1967`
);

// Terminal-digit rule explanation:
const c1Text = c1.chapters.map(c => `${c.title} ${c.heading} ${c.captionText} ${c.equations?.join(' ')}`).join(' ');
assert(c1Text.includes('last digit is 0 or 5') || c1Text.includes('Last digit is 7'), 'Explains terminal digit 7 rule');
assert(c1Text.includes('quotient = floor(N / d)') || c1Text.includes('floor(1967 / 5) = 393'), 'Explains floor(N / d)');
assert(c1Text.includes('remainder = N % d') || c1Text.includes('1967 % 5 = 2'), 'Explains N % d');
assert(c1Text.includes('remainder === 0') || c1Text.includes('NOT DIVISIBLE'), 'Explains remainder === 0 condition');
assert(c1Text.includes('1967 = 5 × 393 + 2'), 'Includes 1967 = 5 × 393 + 2 verification');
assert(!c1Text.includes('1967 × 5 = 9835'), 'Does NOT contain multiplication 1967 × 5 = 9835');
assert(!c1Text.includes('Factor 1') && !c1Text.includes('Factor 2'), 'Does NOT contain multiplication factors');

// CASE 2: 1000 ÷ 5 -> DIVISIBLE
console.log('\n--- Case 2: 1000 ÷ 5 (Divisible) ---');
const c2 = generateDivisibilityLesson('1000', '5');
assert(c2.operationType === 'divisibility', "c2.operationType === 'divisibility'");
assert(c2.divisibilityData.num === 1000, 'num is 1000');
assert(c2.divisibilityData.divisor === 5, 'divisor is 5');
assert(c2.divisibilityData.lastDigit === 0, 'lastDigit is 0');
assert(c2.divisibilityData.quotient === 200, 'quotient is 200');
assert(c2.divisibilityData.remainder === 0, 'remainder is 0');
assert(c2.divisibilityData.isDivisible === true, 'isDivisible is true');
assert(c2.finalAnswer === 'DIVISIBLE', "finalAnswer is 'DIVISIBLE'");
assert(c2.divisibilityData.verdictText === 'DIVISIBLE', "verdictText is 'DIVISIBLE'");

assert(
  c2.divisibilityData.divisor * c2.divisibilityData.quotient + c2.divisibilityData.remainder === c2.divisibilityData.num,
  `Euclidean verification: 5 * 200 + 0 = ${5 * 200 + 0} === 1000`
);

const c2Text = c2.chapters.map(c => `${c.title} ${c.heading} ${c.captionText} ${c.equations?.join(' ')}`).join(' ');
assert(c2Text.includes('Last digit is 0'), 'Explains last digit is 0');
assert(c2Text.includes('floor(1000 / 5) = 200'), 'Explains floor(1000 / 5) = 200');
assert(c2Text.includes('1000 % 5 = 0'), 'Explains 1000 % 5 = 0');
assert(c2Text.includes('1000 = 5 × 200 + 0'), 'Includes 1000 = 5 × 200 + 0 verification');
assert(!c2Text.includes('1000 × 5 = 5000'), 'Does NOT contain multiplication 1000 × 5 = 5000');

// DISTINCT FROM DIVISION (ensure Division 1032 ÷ 9 is intact)
console.log('\n--- Verify Division is Distinct and Intact ---');
const divLesson = generateDivisionLesson('1032', '9');
assert(divLesson.operationType === 'division', "divLesson.operationType === 'division'");
assert(divLesson.divisionData.quotient === 114, 'Division 1032 ÷ 9 quotient is 114');
assert(divLesson.divisionData.remainder === 6, 'Division 1032 ÷ 9 remainder is 6');
assert(divLesson.methodTitle === 'Division Using the Nikhilam Method', 'Division title is preserved');
assert(divLesson.finalAnswer === '114 rem 6', 'Division finalAnswer is intact');

console.log(`\n======================================================`);
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log(`======================================================\n`);

if (failed > 0) {
  process.exit(1);
}
