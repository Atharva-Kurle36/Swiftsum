import { OperationConfig, CalculationResult } from './types';
import { urdhvaTiryagbhyam } from './urdhvaTiryag';
import { nikhilamMultiplication, isNearBase } from './nikhilamMult';
import { calculateSquaring } from './squaring';
import { nikhilamSubtraction } from './nikhilamSub';
import { nikhilamDivision } from './nikhilamDiv';
import { checkDivisibility } from './divisibility';

export const SUTRA_REGISTRY: Record<string, OperationConfig> = {
  multiplication: {
    id: 'multiplication',
    name: 'Multiplication',
    sanskrit: 'Urdhva-Tiryagbhyam / Nikhilam',
    description: 'Crosswise & vertical pairwise multiplication, with automatic near-base Nikhilam shortcut detection.',
    requiresSecondInput: true,
    labelA: 'First Multiplicand',
    labelB: 'Second Multiplicand',
    placeholderA: 'e.g. 98 or 43',
    placeholderB: 'e.g. 97 or 21',
    presets: [
      { label: '98 × 97 (Nikhilam Base 100)', a: '98', b: '97' },
      { label: '43 × 21 (Crosswise Grid)', a: '43', b: '21' },
      { label: '312 × 214 (3-Digit Crosswise)', a: '312', b: '214' },
      { label: '104 × 106 (Surplus Base 100)', a: '104', b: '106' },
      { label: '996 × 992 (Base 1000)', a: '996', b: '992' },
    ],
    calculate: (a: string, b = '1'): CalculationResult => {
      const cleanA = a.replace(/^0+(?!$)/, '') || '0';
      const cleanB = b.replace(/^0+(?!$)/, '') || '0';
      const numA = parseInt(cleanA, 10);
      const numB = parseInt(cleanB, 10);

      // Automatically route to Nikhilam if both numbers sit near the same base of 10
      if (isNearBase(numA, numB) && numA > 10 && numB > 10) {
        return nikhilamMultiplication(cleanA, cleanB);
      }
      return urdhvaTiryagbhyam(cleanA, cleanB);
    },
  },

  squaring: {
    id: 'squaring',
    name: 'Squaring',
    sanskrit: 'Ekadhikena Purvena / Yavadunam',
    description: 'Lightning mental squaring using ending-in-5 Ekadhikena, near-base Yavadunam, or general Duplex.',
    requiresSecondInput: false,
    labelA: 'Number to Square',
    placeholderA: 'e.g. 85 or 96 or 43',
    presets: [
      { label: '85² (Ends in 5: Ekadhikena)', a: '85' },
      { label: '96² (Deficiency: Yavadunam)', a: '96' },
      { label: '108² (Surplus: Yavadunam)', a: '108' },
      { label: '43² (General Duplex)', a: '43' },
      { label: '125² (3-digit Ends in 5)', a: '125' },
    ],
    calculate: (a: string): CalculationResult => {
      return calculateSquaring(a);
    },
  },

  subtraction: {
    id: 'subtraction',
    name: 'Subtraction',
    sanskrit: 'Nikhilam Navatashcaramam Dashatah',
    description: 'Eliminates borrowing by transforming subtraction into addition of 10’s complements.',
    requiresSecondInput: true,
    labelA: 'Minuend (Greater Number)',
    labelB: 'Subtrahend (Number to Subtract)',
    placeholderA: 'e.g. 1000 or 524',
    placeholderB: 'e.g. 347 or 189',
    presets: [
      { label: '1000 − 347 (Power of 10 Base)', a: '1000', b: '347' },
      { label: '10000 − 6824 (Base 10,000)', a: '10000', b: '6824' },
      { label: '524 − 189 (General Complement)', a: '524', b: '189' },
      { label: '100000 − 45391 (Base 100,000)', a: '100000', b: '45391' },
    ],
    calculate: (a: string, b = '0'): CalculationResult => {
      return nikhilamSubtraction(a, b);
    },
  },

  division: {
    id: 'division',
    name: 'Division',
    sanskrit: 'Nikhilam Vibhagah / Stambha Vibhagah',
    description: 'Self-correcting base deviation division with verified column division fallback for 100% precision.',
    requiresSecondInput: true,
    labelA: 'Dividend',
    labelB: 'Divisor',
    placeholderA: 'e.g. 1032 or 3456',
    placeholderB: 'e.g. 9 or 12',
    presets: [
      { label: '1032 ÷ 9 (Nikhilam Divisor 9)', a: '1032', b: '9' },
      { label: '1124 ÷ 89 (Near-Base 100 Divisor)', a: '1124', b: '89' },
      { label: '3456 ÷ 12 (Verified Column Fallback)', a: '3456', b: '12' },
      { label: '2104 ÷ 8 (Single-digit Base 10)', a: '2104', b: '8' },
    ],
    calculate: (a: string, b = '1'): CalculationResult => {
      return nikhilamDivision(a, b);
    },
  },

  divisibility: {
    id: 'divisibility',
    name: 'Divisibility Check',
    sanskrit: 'Vestanam (Osculation) / Navasesha',
    description: 'Step-by-step reduction of multi-digit numbers using Ekadhika osculators and digit-sum rules.',
    requiresSecondInput: true,
    labelA: 'Number to Test',
    labelB: 'Divisor (7, 11, 13, 17, 19, 3, 9...)',
    placeholderA: 'e.g. 27835',
    placeholderB: 'e.g. 7 or 13 or 11',
    presets: [
      { label: '27,835 ÷ 7 (Osculator Q = 2)', a: '27835', b: '7' },
      { label: '39,416 ÷ 13 (Osculator P = 4)', a: '39416', b: '13' },
      { label: '47,289 ÷ 11 (Alternating Sum)', a: '47289', b: '11' },
      { label: '92,341 ÷ 19 (Positive Osculator P = 2)', a: '92341', b: '19' },
      { label: '62,832 ÷ 9 (Beejank Digit-Sum)', a: '62832', b: '9' },
    ],
    calculate: (a: string, b = '7'): CalculationResult => {
      return checkDivisibility(a, b);
    },
  },
};
