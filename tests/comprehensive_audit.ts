import { urdhvaTiryagbhyam } from '../lib/math/urdhvaTiryag';
import { nikhilamMultiplication } from '../lib/math/nikhilamMult';
import { calculateSquaring } from '../lib/math/squaring';
import { nikhilamSubtraction } from '../lib/math/nikhilamSub';
import { nikhilamDivision } from '../lib/math/nikhilamDiv';
import { checkDivisibility } from '../lib/math/divisibility';
import { SUTRA_REGISTRY } from '../lib/math/registry';

console.log('--- AUDITING ALL REGISTRY PRESETS ---');
for (const [opId, op] of Object.entries(SUTRA_REGISTRY)) {
  console.log(`\nOperation: ${opId} (${op.name})`);
  for (const preset of op.presets) {
    try {
      const res = op.calculate(preset.a, preset.b);
      console.log(`  Preset "${preset.label}": Final Answer = ${res.finalAnswer}, Verified = ${res.isVerified}, Method = ${res.methodUsed}`);
    } catch (err: any) {
      console.error(`  ERROR in Preset "${preset.label}":`, err.message);
    }
  }
}

console.log('\n--- TESTING CORNER CASES ---');

// 1. Subtraction edge cases
console.log('\n[Subtraction Edge Cases]');
const subTests = [
  ['1000', '1000'],
  ['1000', '0'],
  ['500', '500'],
  ['500', '0'],
  ['100', '99'],
  ['1000', '1'],
  ['10000', '9999'],
];
for (const [a, b] of subTests) {
  const res = nikhilamSubtraction(a, b);
  const expected = (BigInt(a) - BigInt(b)).toString();
  const match = res.finalAnswer === expected;
  console.log(`  ${a} - ${b}: Got ${res.finalAnswer}, Expected ${expected}, Match: ${match}, Verified: ${res.isVerified}`);
}

// 2. Nikhilam Multiplication edge cases
console.log('\n[Nikhilam Multiplication Edge Cases]');
const nikhMultTests = [
  ['120', '85'],
  ['115', '88'],
  ['108', '92'],
  ['98', '97'],
  ['105', '105'],
];
for (const [a, b] of nikhMultTests) {
  const res = nikhilamMultiplication(a, b);
  const expected = (BigInt(a) * BigInt(b)).toString();
  const match = res.finalAnswer === expected;
  console.log(`  ${a} × ${b}: Got ${res.finalAnswer}, Expected ${expected}, Match: ${match}, Formula in Step 4: ${res.steps[3]?.formula}`);
}

// 3. Squaring edge cases
console.log('\n[Squaring Edge Cases]');
const sqTests = ['0', '1', '5', '10', '15', '25', '95', '98', '100', '105', '999'];
for (const a of sqTests) {
  const res = calculateSquaring(a);
  const expected = (BigInt(a) * BigInt(a)).toString();
  const match = res.finalAnswer === expected;
  console.log(`  ${a}²: Got ${res.finalAnswer}, Expected ${expected}, Match: ${match}`);
}

// 4. Divisibility edge cases
console.log('\n[Divisibility Edge Cases]');
const divTests = [
  ['27835', '7'],
  ['27832', '7'],
  ['100', '0'],
  ['0', '7'],
  ['999999999999', '9'],
  ['121', '11'],
  ['100', '10'],
];
for (const [a, b] of divTests) {
  try {
    const res = checkDivisibility(a, b);
    console.log(`  ${a} ÷ ${b}: isDivisible = ${res.isDivisible}, Verified = ${res.isVerified}, Answer = ${res.finalAnswer}`);
  } catch (err: any) {
    console.error(`  ${a} ÷ ${b}: CRASHED with error:`, err.message);
  }
}

// 5. Division edge cases
console.log('\n[Division Edge Cases]');
const divOpTests = [
  ['1032', '9'],
  ['1124', '89'],
  ['199', '9'],
  ['124', '9'],
  ['100', '0'],
  ['0', '9'],
  ['88', '89'],
];
for (const [a, b] of divOpTests) {
  try {
    const res = nikhilamDivision(a, b);
    console.log(`  ${a} ÷ ${b}: Q: ${res.quotient}, R: ${res.remainder}, Method: ${res.methodUsed}, Verified: ${res.isVerified}`);
  } catch (err: any) {
    console.error(`  ${a} ÷ ${b}: CRASHED with error:`, err.message);
  }
}
