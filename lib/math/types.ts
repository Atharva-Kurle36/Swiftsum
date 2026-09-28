export interface DigitConnection {
  topIndex: number;    // 0-indexed from left of the top number
  bottomIndex: number; // 0-indexed from left of the bottom number
}

export interface CalculationStep {
  stepNumber: number;
  totalSteps: number;
  title: string;
  sanskritSutra: string;
  explanation: string;
  formula?: string;
  subResult?: string;
  carryIn?: number;
  carryOut?: number;
  activeConnections?: DigitConnection[];
  activeDigits?: {
    top?: number[];    // indices in top number
    bottom?: number[]; // indices in bottom number
  };
  accumulatedAnswer: string;
}

export interface CalculationResult {
  operationId: string;
  sutraName: string;
  sanskritName: string;
  inputs: {
    a: string;
    b?: string;
  };
  finalAnswer: string;
  steps: CalculationStep[];
  groundTruth: string;
  isVerified: boolean;
  quotient?: string;
  remainder?: string;
  isDivisible?: boolean;
  verdictText?: string;
  methodUsed: string;
  notes?: string;
}

export interface OperationConfig {
  id: string;
  name: string;
  sanskrit: string;
  description: string;
  requiresSecondInput: boolean;
  labelA: string;
  labelB?: string;
  placeholderA: string;
  placeholderB?: string;
  presets: Array<{ label: string; a: string; b?: string }>;
  calculate: (a: string, b?: string) => CalculationResult;
}
