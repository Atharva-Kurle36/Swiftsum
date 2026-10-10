import { urdhvaTiryagbhyam } from '../lib/math/urdhvaTiryag.ts';
import { nikhilamMultiplication } from '../lib/math/nikhilamMult.ts';
import { calculateSquaring } from '../lib/math/squaring.ts';
import { nikhilamSubtraction } from '../lib/math/nikhilamSub.ts';
import { nikhilamDivision } from '../lib/math/nikhilamDiv.ts';
import { checkDivisibility } from '../lib/math/divisibility.ts';

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

console.log('\n=== 1. Testing Urdhva-Tiryagbhyam Multiplication ===');
const multCases = [
  ['43', '21'],
  ['312', '214'],
  ['98', '97'],
  ['1234', '56'],
  ['999', '999'],
  ['7654', '321'],
];
for (const [a, b] of multCases) {
  const res = urdhvaTiryagbhyam(a, b);
  const expected = (BigInt(a) * BigInt(b)).toString();
  assert(res.finalAnswer === expected && res.isVerified, `${a} × ${b} = ${res.finalAnswer} (expected ${expected})`);
}

console.log('\n=== 2. Testing Nikhilam Multiplication ===');
const nikhilamCases = [
  ['98', '97'],
  ['96', '92'],
  ['104', '106'],
  ['996', '992'],
  ['1005', '1008'],
];
for (const [a, b] of nikhilamCases) {
  const res = nikhilamMultiplication(a, b);
  const expected = (BigInt(a) * BigInt(b)).toString();
  assert(res.finalAnswer === expected && res.isVerified, `${a} × ${b} = ${res.finalAnswer} (expected ${expected})`);
}

console.log('\n=== 3. Testing Squaring (Ekadhikena, Yavadunam, Duplex) ===');
const squareCases = ['15', '45', '85', '125', '96', '108', '992', '43', '67', '234'];
for (const n of squareCases) {
  const res = calculateSquaring(n);
  const expected = (BigInt(n) * BigInt(n)).toString();
  assert(res.finalAnswer === expected && res.isVerified, `${n}² = ${res.finalAnswer} (expected ${expected}) [Method: ${res.methodUsed}]`);
}

console.log('\n=== 4. Testing Nikhilam Subtraction ===');
const subCases = [
  ['1000', '347'],
  ['10000', '6824'],
  ['100000', '45391'],
  ['524', '189'],
  ['8765', '4321'],
  ['1000', '1000'],
  ['1000', '0'],
  ['500', '500'],
  ['500', '0'],
];
for (const [a, b] of subCases) {
  const res = nikhilamSubtraction(a, b);
  const expected = (BigInt(a) - BigInt(b)).toString();
  assert(res.finalAnswer === expected && res.isVerified, `${a} − ${b} = ${res.finalAnswer} (expected ${expected})`);
}

console.log('\n=== 5. Testing Division (Nikhilam & Fallback) ===');
const divCases = [
  ['1032', '9'],
  ['1124', '89'],
  ['3456', '12'],
  ['2104', '8'],
  ['7892', '23'],
  ['199', '9'],
  ['124', '9'],
];
for (const [a, b] of divCases) {
  const res = nikhilamDivision(a, b);
  const divA = parseInt(a, 10);
  const divB = parseInt(b, 10);
  const expQ = Math.floor(divA / divB).toString();
  const expR = (divA % divB).toString();
  assert(res.quotient === expQ && res.remainder === expR && res.isVerified, `${a} ÷ ${b} => Q: ${res.quotient}, R: ${res.remainder} [Method: ${res.methodUsed}]`);
}

console.log('\n=== 6. Testing Divisibility (Osculators & Digit Sums) ===');
const divCheckCases = [
  ['27835', '7'],
  ['27836', '7'],
  ['27832', '7'],
  ['39416', '13'],
  ['39417', '13'],
  ['47289', '11'],
  ['47290', '11'],
  ['92341', '19'],
  ['62832', '9'],
  ['12345', '3'],
];
for (const [a, b] of divCheckCases) {
  const res = checkDivisibility(a, b);
  const expectedDiv = BigInt(a) % BigInt(b) === BigInt(0);
  assert(res.isDivisible === expectedDiv && res.isVerified, `${a} divisible by ${b}? Result: ${res.isDivisible} (Expected: ${expectedDiv})`);
}

console.log(`\n========================================`);
console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
