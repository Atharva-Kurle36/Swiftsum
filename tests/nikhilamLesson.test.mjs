import { generateNikhilamLesson } from '../lib/math/nikhilamLesson.ts';

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

console.log('\n=== Testing Required Nikhilam Lesson Test Cases ===');

// TEST 1: 98 × 97
console.log('\n--- Test 1: 98 × 97 ---');
const t1 = generateNikhilamLesson('98', '97');
assert(t1.finalAnswer === '9506', `Final answer is 9506 (got ${t1.finalAnswer})`);
assert(t1.base === 100, `Base is 100 (got ${t1.base})`);
assert(t1.devA === -2 && t1.devB === -3, `Deviations are -2 and -3 (got ${t1.devA}, ${t1.devB})`);
assert(t1.lhs === 95, `Cross-addition LHS is 95 (got ${t1.lhs})`);
assert(t1.rawRhs === 6, `Deviation product is 6 (got ${t1.rawRhs})`);
assert(t1.balancedRhsStr === '06', `Right part is '06' (got '${t1.balancedRhsStr}')`);
assert(t1.isVerified === true, `Ground-truth verified`);
assert(t1.chapters.length === 7, `7 animated chapters generated`);

// TEST 2: 96 × 94
console.log('\n--- Test 2: 96 × 94 ---');
const t2 = generateNikhilamLesson('96', '94');
assert(t2.finalAnswer === '9024', `Final answer is 9024 (got ${t2.finalAnswer})`);
assert(t2.base === 100, `Base is 100 (got ${t2.base})`);
assert(t2.devA === -4 && t2.devB === -6, `Deviations are -4 and -6 (got ${t2.devA}, ${t2.devB})`);
assert(t2.lhs === 90, `Cross-addition LHS is 90 (got ${t2.lhs})`);
assert(t2.rawRhs === 24, `Deviation product is 24 (got ${t2.rawRhs})`);
assert(t2.balancedRhsStr === '24', `Right part is '24' (got '${t2.balancedRhsStr}')`);
assert(t2.isVerified === true, `Ground-truth verified`);

// TEST 3: 99 × 98
console.log('\n--- Test 3: 99 × 98 ---');
const t3 = generateNikhilamLesson('99', '98');
assert(t3.finalAnswer === '9702', `Final answer is 9702 (got ${t3.finalAnswer})`);
assert(t3.base === 100, `Base is 100 (got ${t3.base})`);
assert(t3.devA === -1 && t3.devB === -2, `Deviations are -1 and -2 (got ${t3.devA}, ${t3.devB})`);
assert(t3.lhs === 97, `Cross-addition LHS is 97 (got ${t3.lhs})`);
assert(t3.rawRhs === 2, `Deviation product is 2 (got ${t3.rawRhs})`);
assert(t3.balancedRhsStr === '02', `Right part is '02' (got '${t3.balancedRhsStr}')`);
assert(t3.isVerified === true, `Ground-truth verified`);

// TEST 4: 102 × 103
console.log('\n--- Test 4: 102 × 103 ---');
const t4 = generateNikhilamLesson('102', '103');
assert(t4.finalAnswer === '10506', `Final answer is 10506 (got ${t4.finalAnswer})`);
assert(t4.base === 100, `Base is 100 (got ${t4.base})`);
assert(t4.devA === 2 && t4.devB === 3, `Deviations are +2 and +3 (got ${t4.devA}, ${t4.devB})`);
assert(t4.lhs === 105, `Cross-addition LHS is 105 (got ${t4.lhs})`);
assert(t4.rawRhs === 6, `Deviation product is 6 (got ${t4.rawRhs})`);
assert(t4.balancedRhsStr === '06', `Right part is '06' (got '${t4.balancedRhsStr}')`);
assert(t4.isVerified === true, `Ground-truth verified`);

// Extra Test: 996 × 992 (Base 1000)
console.log('\n--- Extra Test: 996 × 992 (Base 1000) ---');
const t5 = generateNikhilamLesson('996', '992');
assert(t5.finalAnswer === '988032', `Final answer is 988032 (got ${t5.finalAnswer})`);
assert(t5.base === 1000, `Base is 1000 (got ${t5.base})`);
assert(t5.balancedRhsStr === '032', `Right part is '032' (got '${t5.balancedRhsStr}')`);
assert(t5.isVerified === true, `Ground-truth verified`);

console.log(`\n========================================`);
console.log(`TOTAL NIKHILAM TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
