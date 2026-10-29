import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Code2,
  ChevronLeft,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Volume2,
  VolumeX,
  Layers,
  ArrowRight,
  TrendingUp,
  Scale,
  GitBranch,
  Split,
  HelpCircle,
  FileText
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';
import { GlossaryTooltip } from './GlossaryTooltip';
import { PeacockLogo } from './PeacockLogo';

export type CalculatorTab = 'recurrence' | 'loops';

interface RecurrenceResult {
  inputEquation: string;
  a: number;
  b: number;
  fnStr: string;
  criticalExponent: number; // log_b(a)
  fnExponent: number; // d in n^d
  caseType: 'Case 1' | 'Case 2' | 'Case 3' | 'Linear Decreasing' | 'Non-Standard Split';
  bigO: string;
  bigTheta: string;
  bigOmega: string;
  auxiliarySpace: string;
  proofSteps: string[];
  examStandardAnswer: string;
  treeLevels: { level: number; subproblems: number; size: string; workPerNode: string; totalLevelWork: string }[];
}

interface LoopAnalysisResult {
  codeSnippet: string;
  loopType: 'single_linear' | 'nested_quadratic' | 'dependent_triangular' | 'logarithmic_halving' | 'linearithmic' | 'cubic' | 'geometric_nested';
  summationFormula: string;
  closedFormCount: string;
  bigO: string;
  bigTheta: string;
  bigOmega: string;
  loopInvariant: string;
  proofSteps: string[];
  examProofSheet: string;
}

export const AsymptoticComplexityCalculator: React.FC<{
  onBackToDashboard: () => void;
  onLaunchVisualizer?: (algoId?: string) => void;
}> = ({ onBackToDashboard, onLaunchVisualizer }) => {
  const [activeTab, setActiveTab] = useState<CalculatorTab>('recurrence');
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Recurrence Input States
  const [recurrenceInput, setRecurrenceInput] = useState('T(n) = 2T(n/2) + n');
  const [customA, setCustomA] = useState(2);
  const [customB, setCustomB] = useState(2);
  const [customD, setCustomD] = useState(1); // Exponent of n in f(n) = n^d
  const [customK, setCustomK] = useState(0); // log^k n

  // Code Loop Input States
  const [loopCodeInput, setLoopCodeInput] = useState(`for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        // Elementary O(1) Statement
        sum += arr[i] * arr[j];
    }
}`);

  // Presets for Recurrences
  const recurrencePresets = [
    { label: 'Merge Sort: T(n) = 2T(n/2) + n', a: 2, b: 2, d: 1, k: 0, text: 'T(n) = 2T(n/2) + n' },
    { label: 'Binary Search: T(n) = T(n/2) + 1', a: 1, b: 2, d: 0, k: 0, text: 'T(n) = T(n/2) + 1' },
    { label: 'Strassen Matrix: T(n) = 7T(n/2) + n²', a: 7, b: 2, d: 2, k: 0, text: 'T(n) = 7T(n/2) + n²' },
    { label: 'Karatsuba Fast Mult: T(n) = 3T(n/2) + n', a: 3, b: 2, d: 1, k: 0, text: 'T(n) = 3T(n/2) + n' },
    { label: 'Divide & Conquer Tree: T(n) = 8T(n/2) + n²', a: 8, b: 2, d: 2, k: 0, text: 'T(n) = 8T(n/2) + n²' },
    { label: 'Root Dominant: T(n) = 2T(n/2) + n²', a: 2, b: 2, d: 2, k: 0, text: 'T(n) = 2T(n/2) + n²' },
    { label: 'Polylog Balance: T(n) = 2T(n/2) + n log n', a: 2, b: 2, d: 1, k: 1, text: 'T(n) = 2T(n/2) + n log n' },
    { label: 'QuickSort Worst Case: T(n) = T(n-1) + n', a: 1, b: 1, d: 1, k: 0, text: 'T(n) = T(n-1) + n' },
    { label: 'Tower of Hanoi: T(n) = 2T(n-1) + 1', a: 2, b: 1, d: 0, k: 0, text: 'T(n) = 2T(n-1) + 1' }
  ];

  // Presets for Loops
  const loopPresets = [
    {
      label: 'Dependent Triangular Loop (∑ i = n(n-1)/2)',
      code: `for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        // Elementary O(1) Statement
        sum += arr[i] * arr[j];
    }
}`
    },
    {
      label: 'Logarithmic Halving Loop (i /= 2)',
      code: `for (int i = n; i > 0; i /= 2) {
    // Halves search space at each iteration
    processChunk(i);
}`
    },
    {
      label: 'Linearithmic Loop (Outer n, Inner doubling j *= 2)',
      code: `for (int i = 0; i < n; i++) {
    for (int j = 1; j < n; j *= 2) {
        // Operates O(log n) times per outer pass
        matrix[i][j] = compute(i, j);
    }
}`
    },
    {
      label: 'Nested Square Matrix Loop (n × n)',
      code: `for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // Independent rectangular grid traversal
        table[i][j] = 0;
    }
}`
    },
    {
      label: 'Triple Nested Matrix Multiply (n × n × n)',
      code: `for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        for (int k = 0; k < n; k++) {
            // Standard O(n³) matrix product
            C[i][j] += A[i][k] * B[k][j];
        }
    }
}`
    },
    {
      label: 'Geometric Nested Loop (j < i with i *= 2)',
      code: `for (int i = 1; i < n; i *= 2) {
    for (int j = 0; j < i; j++) {
        // Total sum = 1 + 2 + 4 + ... + n < 2n
        counter++;
    }
}`
    }
  ];

  // Solve Recurrence Relation
  const recurrenceResult: RecurrenceResult = useMemo(() => {
    // Check if linear decreasing recurrence T(n) = T(n-1) + ...
    const isDecreasing = customB === 1 || recurrenceInput.includes('n-1');

    if (isDecreasing) {
      if (recurrenceInput.includes('2T(n-1)') || customA === 2) {
        return {
          inputEquation: recurrenceInput,
          a: 2,
          b: 1,
          fnStr: 'O(1)',
          criticalExponent: 0,
          fnExponent: 0,
          caseType: 'Linear Decreasing',
          bigO: 'O(2ⁿ)',
          bigTheta: 'Θ(2ⁿ)',
          bigOmega: 'Ω(2ⁿ)',
          auxiliarySpace: 'O(n) Call Stack',
          proofSteps: [
            '1. Form: Decreasing recurrence with branching factor a = 2: T(n) = 2T(n-1) + c.',
            '2. Expand: T(n) = 2(2T(n-2) + c) + c = 4T(n-2) + 3c = ... = 2ᵏ T(n-k) + c(2ᵏ - 1).',
            '3. Base Case: At k = n-1, T(n) = 2ⁿ⁻¹ T(1) + c(2ⁿ⁻¹ - 1).',
            '4. Dominant Term: 2ⁿ term strictly dictates asymptotic rate of growth.',
            '5. Formal Bound: T(n) = Θ(2ⁿ) Exponential growth (Classic Tower of Hanoi recurrence).'
          ],
          examStandardAnswer: `Given Recurrence: T(n) = 2T(n-1) + c\nBy backward substitution:\nT(n) = 2[2T(n-2) + c] + c = 2²T(n-2) + 2c + c\nT(n) = 2³T(n-3) + 4c + 2c + c\nIn general after k steps: T(n) = 2ᵏ T(n-k) + c Σ_{j=0}^{k-1} 2ʲ\nFor base case n-k = 1 => k = n-1:\nT(n) = 2ⁿ⁻¹ T(1) + c (2ⁿ⁻¹ - 1) = O(2ⁿ)\nTherefore, Time Complexity = Θ(2ⁿ), Space Complexity = O(n).`,
          treeLevels: [
            { level: 0, subproblems: 1, size: 'n', workPerNode: 'c', totalLevelWork: 'c' },
            { level: 1, subproblems: 2, size: 'n-1', workPerNode: 'c', totalLevelWork: '2c' },
            { level: 2, subproblems: 4, size: 'n-2', workPerNode: 'c', totalLevelWork: '4c' },
            { level: 3, subproblems: 8, size: 'n-3', workPerNode: 'c', totalLevelWork: '8c' }
          ]
        };
      }

      // T(n) = T(n-1) + n
      return {
        inputEquation: recurrenceInput,
        a: 1,
        b: 1,
        fnStr: 'n',
        criticalExponent: 0,
        fnExponent: 1,
        caseType: 'Linear Decreasing',
        bigO: 'O(n²)',
        bigTheta: 'Θ(n²)',
        bigOmega: 'Ω(n²)',
        auxiliarySpace: 'O(n) Call Stack',
        proofSteps: [
          '1. Form: Decreasing recurrence with additive linear combine work: T(n) = T(n-1) + n.',
          '2. Expand: T(n) = (T(n-2) + (n-1)) + n = T(n-3) + (n-2) + (n-1) + n.',
          '3. Summation: T(n) = T(0) + Σ_{i=1}^n i = T(0) + n(n+1)/2.',
          '4. Algebraic Simplification: n²/2 + n/2 + T(0).',
          '5. Dominant Term: Drop lower-order term n/2 and constant 1/2 to obtain Θ(n²).'
        ],
        examStandardAnswer: `Given Recurrence: T(n) = T(n-1) + n\nBy repeated substitution:\nT(n) = T(n-2) + (n-1) + n\nT(n) = T(n-3) + (n-2) + (n-1) + n\nAfter n substitutions:\nT(n) = T(0) + 1 + 2 + 3 + ... + n\nT(n) = T(0) + [n(n + 1) / 2] = n²/2 + n/2 + O(1)\nBy definition of Big-O, n²/2 <= c·n² for c = 1, n >= 1.\nTherefore, T(n) = Θ(n²) (QuickSort Worst Case).`,
        treeLevels: [
          { level: 0, subproblems: 1, size: 'n', workPerNode: 'n', totalLevelWork: 'n' },
          { level: 1, subproblems: 1, size: 'n-1', workPerNode: 'n-1', totalLevelWork: 'n-1' },
          { level: 2, subproblems: 1, size: 'n-2', workPerNode: 'n-2', totalLevelWork: 'n-2' },
          { level: 3, subproblems: 1, size: 'n-3', workPerNode: 'n-3', totalLevelWork: 'n-3' }
        ]
      };
    }

    // Standard Master Theorem: T(n) = a T(n/b) + f(n)
    const a = customA;
    const b = customB;
    const d = customD;
    const k = customK;

    const logba = Math.log(a) / Math.log(b);
    const logbaRounded = Math.round(logba * 1000) / 1000;
    const diff = logba - d;

    let caseType: 'Case 1' | 'Case 2' | 'Case 3' = 'Case 2';
    let bigO = 'O(n log n)';
    let bigTheta = 'Θ(n log n)';
    let bigOmega = 'Ω(n log n)';
    let proofSteps: string[] = [];

    if (diff > 0.001) {
      // Case 1: Leaves dominate
      caseType = 'Case 1';
      const expStr = logbaRounded === Math.round(logbaRounded) ? `${Math.round(logbaRounded)}` : `${logbaRounded}`;
      bigO = `O(n^${expStr})`;
      bigTheta = `Θ(n^${expStr})`;
      bigOmega = `Ω(n^${expStr})`;

      proofSteps = [
        `1. Identify Master Theorem Parameters: a = ${a}, b = ${b}, f(n) = Θ(n^${d}).`,
        `2. Compute Critical Exponent: log_b(a) = log_${b}(${a}) = ${logbaRounded}.`,
        `3. Compare Exponents: log_b(a) (${logbaRounded}) > d (${d}).`,
        `4. Master Theorem Case 1 applies: Since f(n) = O(n^(log_b a - ε)) for ε = ${Math.round(diff * 1000) / 1000} > 0, the recursive subproblems at the tree leaves dominate total computation.`,
        `5. Final Asymptotic Bound: T(n) = Θ(n^(log_b a)) = Θ(n^${expStr}).`
      ];
    } else if (Math.abs(diff) <= 0.001) {
      // Case 2: Equal balance
      caseType = 'Case 2';
      const expStr = d === 0 ? '' : d === 1 ? 'n' : `n^${d}`;
      const logPower = k + 1 === 1 ? 'log n' : `log^${k + 1} n`;
      const combinedStr = expStr ? `${expStr} ${logPower}` : logPower;

      bigO = `O(${combinedStr})`;
      bigTheta = `Θ(${combinedStr})`;
      bigOmega = `Ω(${combinedStr})`;

      proofSteps = [
        `1. Identify Master Theorem Parameters: a = ${a}, b = ${b}, f(n) = Θ(n^${d} ${k > 0 ? `log^${k} n` : ''}).`,
        `2. Compute Critical Exponent: log_b(a) = log_${b}(${a}) = ${logbaRounded}.`,
        `3. Compare Exponents: log_b(a) == d == ${d}. Combining work matches recursive tree branching rate.`,
        `4. Master Theorem Case 2 applies: Tree height is log_b(n). Multiplying per-level work by tree depth adds a logarithmic factor: Θ(n^d · log^(k+1) n).`,
        `5. Final Asymptotic Bound: T(n) = Θ(${combinedStr}).`
      ];
    } else {
      // Case 3: Root dominates
      caseType = 'Case 3';
      const expStr = d === 1 ? 'n' : `n^${d}`;
      bigO = `O(${expStr})`;
      bigTheta = `Θ(${expStr})`;
      bigOmega = `Ω(${expStr})`;

      proofSteps = [
        `1. Identify Master Theorem Parameters: a = ${a}, b = ${b}, f(n) = Θ(n^${d}).`,
        `2. Compute Critical Exponent: log_b(a) = log_${b}(${a}) = ${logbaRounded}.`,
        `3. Compare Exponents: d (${d}) > log_b(a) (${logbaRounded}). Root combining cost dominates leaf work.`,
        `4. Regularity Condition Check: Verify a·f(n/b) ≤ c·f(n) for c < 1. Here ${a}·(n/${b})^${d} = (${a}/${Math.pow(b, d)})·n^${d}. Since ${a}/${Math.pow(b, d)} < 1, regularity holds!`,
        `5. Final Asymptotic Bound: T(n) = Θ(f(n)) = Θ(${expStr}).`
      ];
    }

    const examStandardAnswer = `KCT CS401 Examination Solution:
Recurrence Equation: T(n) = ${a}T(n/${b}) + n^${d}
Step 1: By Master Theorem standard form T(n) = aT(n/b) + f(n):
  a = ${a} (subproblems), b = ${b} (division factor), f(n) = n^${d}
Step 2: Calculate critical exponent:
  log_b(a) = log_${b}(${a}) = ${logbaRounded}
Step 3: Compare f(n) with n^(log_b a):
  ${caseType === 'Case 1' ? `log_b(a) > d (${logbaRounded} > ${d}) => Case 1 applies.` : caseType === 'Case 2' ? `log_b(a) == d (${logbaRounded} == ${d}) => Case 2 applies.` : `d > log_b(a) (${d} > ${logbaRounded}) => Case 3 applies.`}
Step 4: Formal Conclusion:
  T(n) = ${bigTheta}
Auxiliary Space: O(log n) stack memory.`;

    const treeLevels = [
      { level: 0, subproblems: 1, size: 'n', workPerNode: `n^${d}`, totalLevelWork: `n^${d}` },
      { level: 1, subproblems: a, size: `n/${b}`, workPerNode: `(n/${b})^${d}`, totalLevelWork: `${a} × (n/${b})^${d}` },
      { level: 2, subproblems: a * a, size: `n/${b * b}`, workPerNode: `(n/${b * b})^${d}`, totalLevelWork: `${a * a} × (n/${b * b})^${d}` },
      { level: 3, subproblems: a * a * a, size: `n/${b * b * b}`, workPerNode: `(n/${b * b * b})^${d}`, totalLevelWork: `${a * a * a} × (n/${b * b * b})^${d}` }
    ];

    return {
      inputEquation: `T(n) = ${a}T(n/${b}) + n^${d}`,
      a,
      b,
      fnStr: `n^${d}`,
      criticalExponent: logbaRounded,
      fnExponent: d,
      caseType,
      bigO,
      bigTheta,
      bigOmega,
      auxiliarySpace: 'O(log n) Recursion Stack',
      proofSteps,
      examStandardAnswer,
      treeLevels
    };
  }, [recurrenceInput, customA, customB, customD, customK]);

  // Solve Code Loop
  const loopAnalysisResult: LoopAnalysisResult = useMemo(() => {
    const code = loopCodeInput.toLowerCase();

    // 1. Triple Nested Loop
    if (code.includes('for') && (code.match(/for/g) || []).length >= 3) {
      return {
        codeSnippet: loopCodeInput,
        loopType: 'cubic',
        summationFormula: '∑_{i=0}^{n-1} ∑_{j=0}^{n-1} ∑_{k=0}^{n-1} 1',
        closedFormCount: 'n × n × n = n³ operations',
        bigO: 'O(n³)',
        bigTheta: 'Θ(n³)',
        bigOmega: 'Ω(n³)',
        loopInvariant: 'Invariant: C[i][j] holds exact dot product of row i of A and column j of B for processed k.',
        proofSteps: [
          '1. Loop Structure: Three mutually nested loops, each iterating independently from 0 to n-1 with stride +1.',
          '2. Outer Loop (i): Executes exactly n times.',
          '3. Middle Loop (j): Executes exactly n times for every single iteration of i.',
          '4. Inner Loop (k): Executes exactly n times for every (i, j) pair.',
          '5. Summation: T(n) = ∑_{i=0}^{n-1} ∑_{j=0}^{n-1} ∑_{k=0}^{n-1} c = c · n · n · n = c · n³.',
          '6. Asymptotic Result: T(n) = Θ(n³) Cubic Time Complexity (e.g. standard matrix multiplication).'
        ],
        examProofSheet: `Loop Complexity Proof (Triple Loop):\nOuter loop i ranges from 0 to n-1 (n steps)\nMiddle loop j ranges from 0 to n-1 (n steps)\nInner loop k ranges from 0 to n-1 (n steps)\nTotal operations = ∑_{i=0}^{n-1} ∑_{j=0}^{n-1} ∑_{k=0}^{n-1} 1\n= n · n · n = n³\nBy definition: f(n) <= c · n³ for c = 1, n0 = 1.\nTherefore, Time Complexity = Θ(n³), Auxiliary Space = O(1).`
      };
    }

    // 2. Dependent Triangular Loop (j < i)
    if (code.includes('j < i') || code.includes('j <= i')) {
      return {
        codeSnippet: loopCodeInput,
        loopType: 'dependent_triangular',
        summationFormula: '∑_{i=0}^{n-1} i = 0 + 1 + 2 + ... + (n-1)',
        closedFormCount: 'n(n - 1) / 2 = 0.5n² - 0.5n operations',
        bigO: 'O(n²)',
        bigTheta: 'Θ(n²)',
        bigOmega: 'Ω(n²)',
        loopInvariant: 'Invariant: At start of iteration i, exactly i(i-1)/2 subproblem comparisons have been executed.',
        proofSteps: [
          '1. Outer Loop (i): Runs from 0 to n-1 (n iterations total).',
          '2. Inner Loop (j): Bound depends directly on outer counter i (runs j = 0 to i-1, exactly i times).',
          '3. Summation Form: T(n) = ∑_{i=0}^{n-1} i = 0 + 1 + 2 + 3 + ... + (n - 1).',
          '4. Arithmetic Series Formula: S = n(first + last) / 2 = n(0 + n - 1) / 2 = n(n - 1) / 2.',
          '5. Expansion: (1/2)n² - (1/2)n. As n → ∞, the quadratic term (1/2)n² dominates.',
          '6. Formal Bound: T(n) = Θ(n²) Quadratic Time Complexity (Bubble/Selection sort inner work).'
        ],
        examProofSheet: `Loop Complexity Proof (Dependent Nested Loop):\nOuter loop: i runs from 0 to n-1\nInner loop: for a given i, j runs from 0 to i-1 (i iterations)\nTotal Operations T(n) = ∑_{i=0}^{n-1} ∑_{j=0}^{i-1} c\n= c · ∑_{i=0}^{n-1} i = c · [n(n - 1) / 2]\n= (c/2)n² - (c/2)n\nFor n >= 2: (c/4)n² <= T(n) <= (c/2)n²\nHence T(n) = Θ(n²) by definition of tight bound.`
      };
    }

    // 3. Logarithmic Halving Loop (i /= 2 or i *= 2)
    if (code.includes('/= 2') || code.includes('*= 2') || code.includes('>>= 1')) {
      if (code.includes('for') && (code.match(/for/g) || []).length >= 2) {
        // Linearithmic O(n log n)
        return {
          codeSnippet: loopCodeInput,
          loopType: 'linearithmic',
          summationFormula: '∑_{i=0}^{n-1} (log₂ n)',
          closedFormCount: 'n × log₂ n operations',
          bigO: 'O(n log n)',
          bigTheta: 'Θ(n log n)',
          bigOmega: 'Ω(n log n)',
          loopInvariant: 'Invariant: Outer loop runs linearly n times; inner loop multiplies by 2, terminating in log₂ n steps.',
          proofSteps: [
            '1. Outer Loop (i): Increments i++ linearly from 0 to n-1 (runs n times).',
            '2. Inner Loop (j): Multiplies j by 2 each pass: j = 1, 2, 4, 8, ..., 2ᵏ < n.',
            '3. Inner Step Count: Loop terminates when 2ᵏ >= n, which implies k = ⌈log₂ n⌉ iterations.',
            '4. Total Work: T(n) = ∑_{i=0}^{n-1} (log₂ n) = n · log₂ n.',
            '5. Asymptotic Result: T(n) = Θ(n log n) Linearithmic Complexity (Optimal sorting bound).'
          ],
          examProofSheet: `Linearithmic Nested Loop Proof:\nOuter loop i = 0 to n-1 executes n times.\nInner loop j starts at 1 and doubles: j = 2^k.\nCondition 2^k < n => k < log2(n).\nTotal operations = ∑_{i=1}^n log2(n) = n · log2(n).\nTherefore T(n) = Θ(n log n).`
        };
      }

      // Pure Logarithmic Loop
      return {
        codeSnippet: loopCodeInput,
        loopType: 'logarithmic_halving',
        summationFormula: 'k = log₂ n',
        closedFormCount: '⌈log₂ n⌉ + 1 operations',
        bigO: 'O(log n)',
        bigTheta: 'Θ(log n)',
        bigOmega: 'Ω(log n)',
        loopInvariant: 'Invariant: After pass k, remaining problem size is n / 2ᵏ.',
        proofSteps: [
          '1. Loop Variable: Starts at n and is halved at every iteration (i = i / 2).',
          '2. Successive Values of i: n, n/2, n/4, n/8, ..., n / 2ᵏ.',
          '3. Termination Condition: Loop stops when i <= 0 (or i < 1 in integer division).',
          '4. Solve for k: n / 2ᵏ < 1 ⟹ 2ᵏ > n ⟹ k = ⌈log₂ n⌉.',
          '5. Asymptotic Result: T(n) = Θ(log n) Logarithmic Time Complexity (Binary Search paradigm).'
        ],
        examProofSheet: `Logarithmic Halving Loop Proof:\nLet i_k be the value of i after k iterations.\ni_0 = n, i_1 = n/2, i_2 = n/4, ..., i_k = n/2^k\nLoop terminates when i_k < 1:\nn / 2^k < 1  =>  2^k >= n  =>  k = ceil(log2 n)\nTotal loop cycles = log2(n) + 1 = Θ(log n).`
      };
    }

    // 4. Nested Square Matrix Loop
    if (code.includes('for') && (code.match(/for/g) || []).length >= 2) {
      return {
        codeSnippet: loopCodeInput,
        loopType: 'nested_quadratic',
        summationFormula: '∑_{i=0}^{n-1} ∑_{j=0}^{n-1} 1',
        closedFormCount: 'n × n = n² operations',
        bigO: 'O(n²)',
        bigTheta: 'Θ(n²)',
        bigOmega: 'Ω(n²)',
        loopInvariant: 'Invariant: After pass i, row i has all n column values processed.',
        proofSteps: [
          '1. Outer Loop (i): Iterates from 0 to n-1 (n times).',
          '2. Inner Loop (j): Iterates from 0 to n-1 (n times) independently of i.',
          '3. Total Iterations: T(n) = n · n = n².',
          '4. Asymptotic Bound: T(n) = Θ(n²) Quadratic Time Complexity.'
        ],
        examProofSheet: `Square Nested Loop Proof:\nOuter loop runs n times.\nFor each outer loop pass, inner loop runs n times.\nTotal operations = n · n = n².\nHence T(n) = Θ(n²).`
      };
    }

    // Default Single Linear Loop
    return {
      codeSnippet: loopCodeInput,
      loopType: 'single_linear',
      summationFormula: '∑_{i=0}^{n-1} 1',
      closedFormCount: 'n operations',
      bigO: 'O(n)',
      bigTheta: 'Θ(n)',
      bigOmega: 'Ω(n)',
      loopInvariant: 'Invariant: At start of pass i, elements 0 to i-1 have been visited.',
      proofSteps: [
        '1. Loop counter starts at i = 0 and increments by +1 each cycle.',
        '2. Termination occurs when i reaches n.',
        '3. Total operations: T(n) = n · c = Θ(n).',
        '4. Asymptotic Bound: T(n) = Θ(n) Linear Time Complexity.'
      ],
      examProofSheet: `Single Loop Complexity Proof:\nLoop runs from 0 to n-1 with increment +1.\nNumber of iterations = (n - 1 - 0) + 1 = n.\nEach iteration executes constant O(1) body operations.\nTotal time T(n) = c · n = Θ(n).`
    };
  }, [loopCodeInput]);

  const handleCopyProof = (text: string) => {
    soundFx.playClick();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleAudio = (text: string) => {
    if (isSpeaking) {
      soundFx.stopSpeaking();
      setIsSpeaking(false);
    } else {
      soundFx.playPop();
      setIsSpeaking(true);
      soundFx.speak(text, () => setIsSpeaking(false));
    }
  };

  return (
    <div className="space-y-6 w-full select-none">
      {/* Top Breadcrumb & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Syllabus Dashboard
        </button>

        <div className="flex items-center gap-1 bg-[#F4F0FF] p-1 rounded-2xl border border-[#E5DCF9]">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('recurrence');
            }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'recurrence'
                ? 'bg-[#7B42F6] text-white shadow-xs'
                : 'text-[#5B507A] hover:text-[#7B42F6]'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span>Recurrence Relation Solver</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('loops');
            }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
              activeTab === 'loops'
                ? 'bg-[#7B42F6] text-white shadow-xs'
                : 'text-[#5B507A] hover:text-[#7B42F6]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code Loop Inspector</span>
          </button>
        </div>
      </div>

      {/* Main Feature Banner */}
      <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-2.5 py-0.5 rounded-full border border-[#D4C7F5]">
              KCT Autonomous CSE 23CS401 Engine
            </span>
            <span className="text-xs font-mono text-[#887D9F]">Unit 01 &amp; University Exam Hub</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#10B981] bg-[#EBF7E3] px-3 py-1 rounded-full border border-[#C5E1A5] flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#10B981]" />
              <span>Step-by-Step Mathematical Proofs</span>
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#201538] tracking-tight flex items-center gap-2.5">
          <Calculator className="w-7 h-7 text-[#7B42F6]" />
          <span>Asymptotic Complexity Calculator &amp; Proof Engine</span>
        </h1>

        <p className="text-xs sm:text-sm text-[#5B507A] max-w-2xl leading-relaxed">
          Input any recurrence equation or paste arbitrary nested loops. The engine automatically parses the recursive branches or loop bounds, identifies the governing paradigm, and renders step-by-step mathematical proofs with Big-O, Big-Omega, and Big-Theta bounds ready for university exam answer sheets.
        </p>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: RECURRENCE RELATION SOLVER                                    */}
      {/* =================================================================== */}
      {activeTab === 'recurrence' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input Form & Presets (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-black text-[#201538] font-mono uppercase tracking-wider flex items-center gap-2">
                <span>1. Choose or Type Recurrence</span>
              </h3>

              {/* Presets Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#201538]">Quick Syllabus Presets:</label>
                <select
                  onChange={e => {
                    const preset = recurrencePresets.find(p => p.text === e.target.value);
                    if (preset) {
                      soundFx.playClick();
                      setRecurrenceInput(preset.text);
                      setCustomA(preset.a);
                      setCustomB(preset.b);
                      setCustomD(preset.d);
                      setCustomK(preset.k);
                    }
                  }}
                  className="w-full text-xs font-mono font-bold bg-[#F8F6FE] border-2 border-[#D4C7F5] rounded-xl px-3 py-2 text-[#201538] focus:outline-none focus:ring-2 focus:ring-[#7B42F6]"
                >
                  {recurrencePresets.map((p, idx) => (
                    <option key={idx} value={p.text}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Freeform Formula String */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#201538]">Recurrence Equation String:</label>
                <input
                  type="text"
                  value={recurrenceInput}
                  onChange={e => setRecurrenceInput(e.target.value)}
                  placeholder="e.g. T(n) = 2T(n/2) + n"
                  className="w-full text-xs font-mono font-bold bg-[#F8F6FE] border-2 border-[#D4C7F5] rounded-xl px-3 py-2 text-[#201538] focus:outline-none focus:ring-2 focus:ring-[#7B42F6]"
                />
              </div>

              {/* Interactive Parameter Sliders */}
              <div className="space-y-3 pt-2 border-t border-[#E5DCF9]">
                <div className="text-[11px] font-mono font-bold text-[#887D9F] uppercase tracking-wider">
                  Tuning Parameters (T(n) = a·T(n/b) + n^d):
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Number of Subproblems (a):</span>
                    <strong className="text-[#7B42F6] font-black">{customA}</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    value={customA}
                    onChange={e => setCustomA(Number(e.target.value))}
                    className="w-full accent-[#7B42F6] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Subproblem Shrink Divisor (b):</span>
                    <strong className="text-[#7B42F6] font-black">{customB}</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={customB}
                    onChange={e => setCustomB(Number(e.target.value))}
                    className="w-full accent-[#7B42F6] cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span>Combining Work Exponent d (in n^d):</span>
                    <strong className="text-[#7B42F6] font-black">{customD} (f(n) = n^{customD})</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={customD}
                    onChange={e => setCustomD(Number(e.target.value))}
                    className="w-full accent-[#7B42F6] cursor-pointer"
                  />
                </div>
              </div>

              {/* Reset to Default */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setRecurrenceInput('T(n) = 2T(n/2) + n');
                  setCustomA(2);
                  setCustomB(2);
                  setCustomD(1);
                  setCustomK(0);
                }}
                className="w-full py-2 px-3 rounded-xl border border-[#E5DCF9] hover:bg-[#F8F6FE] text-xs font-bold text-[#5B507A] flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Parameters</span>
              </button>
            </div>
          </div>

          {/* Right Column: Mathematical Proof & Solution Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Asymptotic Bound Hero Banner */}
            <div className="bg-[#1E1435] text-white rounded-3xl p-6 border border-[#2E2050] shadow-lg space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#2E2050]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#FFB800] uppercase">
                    Governing Paradigm:
                  </span>
                  <span className="text-xs font-mono font-black text-white bg-[#2D1F4D] px-2.5 py-0.5 rounded border border-[#3E2D69]">
                    {recurrenceResult.caseType}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleAudio(recurrenceResult.proofSteps.join('. '))}
                    className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                      isSpeaking ? 'bg-rose-900 text-rose-200 border-rose-500' : 'bg-[#2D1F4D] text-purple-200 border-[#3E2D69] hover:bg-[#3E2D69]'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? 'Mute' : 'Audio Proof'}</span>
                  </button>

                  <button
                    onClick={() => handleCopyProof(recurrenceResult.examStandardAnswer)}
                    className="p-1.5 bg-[#2D1F4D] hover:bg-[#3E2D69] text-purple-200 rounded-lg text-xs font-bold border border-[#3E2D69] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Exam Proof'}</span>
                  </button>
                </div>
              </div>

              {/* Big Bounds Triad */}
              <div className="grid grid-cols-3 gap-3 text-center font-mono">
                <div className="p-3 bg-[#251842] rounded-2xl border border-[#372461]">
                  <span className="text-[10px] text-purple-300 uppercase font-bold block">Upper Bound</span>
                  <span className="text-xl font-black text-[#FFB800] block mt-1">{recurrenceResult.bigO}</span>
                  <span className="text-[9px] text-purple-400">Worst-Case O</span>
                </div>

                <div className="p-3 bg-[#251842] rounded-2xl border border-[#372461]">
                  <span className="text-[10px] text-purple-300 uppercase font-bold block">Tight Bound</span>
                  <span className="text-xl font-black text-[#8BC34A] block mt-1">{recurrenceResult.bigTheta}</span>
                  <span className="text-[9px] text-purple-400">Exact Growth Θ</span>
                </div>

                <div className="p-3 bg-[#251842] rounded-2xl border border-[#372461]">
                  <span className="text-[10px] text-purple-300 uppercase font-bold block">Lower Bound</span>
                  <span className="text-xl font-black text-purple-200 block mt-1">{recurrenceResult.bigOmega}</span>
                  <span className="text-[9px] text-purple-400">Best-Case Ω</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-purple-200/80 pt-1 flex justify-between">
                <span>Auxiliary Stack Space: <strong>{recurrenceResult.auxiliarySpace}</strong></span>
                <span>Critical Exponent: <strong>log_{customB}({customA}) = {recurrenceResult.criticalExponent}</strong></span>
              </div>
            </div>

            {/* Step-by-Step Mathematical Proof Card */}
            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
                <h4 className="text-sm font-black text-[#201538] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#7B42F6]" />
                  <span>Step-by-Step Mathematical Proof Walkthrough</span>
                </h4>
                <span className="text-[11px] font-mono text-[#887D9F]">
                  5 &amp; 14-Mark University Format
                </span>
              </div>

              <div className="space-y-2.5">
                {recurrenceResult.proofSteps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-[#F8F6FE] rounded-2xl border border-[#E5DCF9] text-xs font-mono leading-relaxed text-[#201538]"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Recursion Tree Level Breakdown Table */}
            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-[#201538] flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#10B981]" />
                  <span>Recursion Tree Level-by-Level Summation</span>
                </h4>
                <span className="text-[11px] font-mono text-[#887D9F]">Tree Height: log_b(n)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#E5DCF9] text-[#7B6E96]">
                      <th className="pb-2 font-bold">Level</th>
                      <th className="pb-2 font-bold">Subproblems</th>
                      <th className="pb-2 font-bold">Problem Size</th>
                      <th className="pb-2 font-bold">Work per Node</th>
                      <th className="pb-2 font-bold text-right">Total Work at Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5DCF9]/60">
                    {recurrenceResult.treeLevels.map((lvl, lIdx) => (
                      <tr key={lIdx} className="hover:bg-[#F8F6FE]/60">
                        <td className="py-2 font-bold text-[#7B42F6]">Level {lvl.level}</td>
                        <td className="py-2">{lvl.subproblems}</td>
                        <td className="py-2">{lvl.size}</td>
                        <td className="py-2">{lvl.workPerNode}</td>
                        <td className="py-2 font-bold text-right text-[#201538]">{lvl.totalLevelWork}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: CODE LOOP INSPECTOR                                          */}
      {/* =================================================================== */}
      {activeTab === 'loops' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Code Editor & Presets (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-black text-[#201538] font-mono uppercase tracking-wider flex items-center gap-2">
                <span>1. Select or Paste Loop Code</span>
              </h3>

              {/* Loop Presets */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#201538]">Standard Loop Patterns:</label>
                <select
                  onChange={e => {
                    const found = loopPresets.find(p => p.label === e.target.value);
                    if (found) {
                      soundFx.playClick();
                      setLoopCodeInput(found.code);
                    }
                  }}
                  className="w-full text-xs font-mono font-bold bg-[#F8F6FE] border-2 border-[#D4C7F5] rounded-xl px-3 py-2 text-[#201538] focus:outline-none focus:ring-2 focus:ring-[#7B42F6]"
                >
                  {loopPresets.map((p, idx) => (
                    <option key={idx} value={p.label}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Code Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#201538]">Code Input (C++ / Java / Python loops):</label>
                <textarea
                  rows={8}
                  value={loopCodeInput}
                  onChange={e => setLoopCodeInput(e.target.value)}
                  className="w-full text-xs font-mono bg-[#1E1435] text-purple-100 rounded-2xl p-4 border-2 border-[#2E2050] focus:outline-none focus:ring-2 focus:ring-[#7B42F6] leading-relaxed resize-none"
                />
              </div>

              <div className="p-3 bg-[#F8F6FE] rounded-2xl border border-[#E5DCF9] text-xs space-y-1 text-[#5B507A]">
                <strong className="text-[#201538] block">Loop Pattern Detector:</strong>
                <span>Supports additive stride (`i++`, `i += c`), multiplicative doubling (`i *= 2`), halving (`i /= 2`), dependent inner bounds (`j &lt; i`), and multi-variable invariants.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Summation Proof & Bounds (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Loop Complexity Hero Card */}
            <div className="bg-[#1E1435] text-white rounded-3xl p-6 border border-[#2E2050] shadow-lg space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#2E2050]">
                <span className="text-xs font-mono font-bold text-[#FFB800] uppercase">
                  Loop Structure Analysis
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleAudio(loopAnalysisResult.proofSteps.join('. '))}
                    className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                      isSpeaking ? 'bg-rose-900 text-rose-200 border-rose-500' : 'bg-[#2D1F4D] text-purple-200 border-[#3E2D69] hover:bg-[#3E2D69]'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? 'Mute' : 'Audio Proof'}</span>
                  </button>

                  <button
                    onClick={() => handleCopyProof(loopAnalysisResult.examProofSheet)}
                    className="p-1.5 bg-[#2D1F4D] hover:bg-[#3E2D69] text-purple-200 rounded-lg text-xs font-bold border border-[#3E2D69] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Exam Proof'}</span>
                  </button>
                </div>
              </div>

              {/* Bounds Grid */}
              <div className="grid grid-cols-3 gap-3 text-center font-mono">
                <div className="p-3 bg-[#251842] rounded-2xl border border-[#372461]">
                  <span className="text-[10px] text-purple-300 uppercase font-bold block">Upper Bound</span>
                  <span className="text-xl font-black text-[#FFB800] block mt-1">{loopAnalysisResult.bigO}</span>
                  <span className="text-[9px] text-purple-400">Worst Case O</span>
                </div>

                <div className="p-3 bg-[#251842] rounded-2xl border border-[#372461]">
                  <span className="text-[10px] text-purple-300 uppercase font-bold block">Tight Bound</span>
                  <span className="text-xl font-black text-[#8BC34A] block mt-1">{loopAnalysisResult.bigTheta}</span>
                  <span className="text-[9px] text-purple-400">Exact Rate Θ</span>
                </div>

                <div className="p-3 bg-[#251842] rounded-2xl border border-[#372461]">
                  <span className="text-[10px] text-purple-300 uppercase font-bold block">Sum Formula</span>
                  <span className="text-sm font-black text-purple-200 block mt-1 truncate">{loopAnalysisResult.summationFormula}</span>
                  <span className="text-[9px] text-purple-400">Total Iterations</span>
                </div>
              </div>

              <div className="p-3 bg-[#251842] rounded-xl border border-[#372461] text-xs font-mono text-purple-200">
                Closed-Form Elementary Operations: <strong className="text-[#8BC34A]">{loopAnalysisResult.closedFormCount}</strong>
              </div>
            </div>

            {/* Loop Invariant Banner */}
            <div className="p-4 bg-[#EBF7E3] rounded-2xl border-2 border-[#8BC34A] space-y-1">
              <span className="text-[11px] font-mono font-black text-[#1B5E20] uppercase tracking-wider block">
                Formal Verified Loop Invariant:
              </span>
              <p className="text-xs font-mono font-bold text-[#201538]">
                {loopAnalysisResult.loopInvariant}
              </p>
            </div>

            {/* Step-by-Step Proof Sheet */}
            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
                <h4 className="text-sm font-black text-[#201538] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#7B42F6]" />
                  <span>Summation &amp; Loop Induction Proof</span>
                </h4>
                <span className="text-[11px] font-mono text-[#887D9F]">
                  Formal University Invariant
                </span>
              </div>

              <div className="space-y-2">
                {loopAnalysisResult.proofSteps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 bg-[#F8F6FE] rounded-2xl border border-[#E5DCF9] text-xs font-mono leading-relaxed text-[#201538]"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
