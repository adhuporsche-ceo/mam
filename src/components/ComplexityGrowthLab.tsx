import React, { useState } from 'react';
import { ChevronLeft, ArrowRight, Sliders, Activity, Info, BarChart3, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface GrowthClass {
  notation: string;
  name: string;
  formula: (n: number) => number;
  displayValue: (n: number) => string;
  color: string;
  barColor: string;
  example: string;
  practicalLimit: string;
}

const GROWTH_CLASSES: GrowthClass[] = [
  {
    notation: 'O(1)',
    name: 'Constant Time',
    formula: () => 1,
    displayValue: () => '1 step',
    color: '#10B981',
    barColor: 'bg-emerald-500',
    example: 'Hash map lookup, array index access arr[i]',
    practicalLimit: 'Fast for any n (independent of input size)'
  },
  {
    notation: 'O(log n)',
    name: 'Logarithmic Time',
    formula: (n) => Math.max(1, Math.round(Math.log2(n))),
    displayValue: (n) => `${Math.max(1, Math.round(Math.log2(n)))} steps`,
    color: '#059669',
    barColor: 'bg-emerald-600',
    example: 'Binary Search, balanced BST search, GCD Euclidean algorithm',
    practicalLimit: 'For n = 1,000,000, takes only ~20 operations'
  },
  {
    notation: 'O(n)',
    name: 'Linear Time',
    formula: (n) => n,
    displayValue: (n) => `${n.toLocaleString()} steps`,
    color: '#7B42F6',
    barColor: 'bg-[#7B42F6]',
    example: 'Linear Search, Kadane max subarray, counting sort pass',
    practicalLimit: 'For n = 10⁷, executes in under 0.1s on 1GHz CPU'
  },
  {
    notation: 'O(n log n)',
    name: 'Linearithmic Time',
    formula: (n) => Math.round(n * Math.max(1, Math.log2(n))),
    displayValue: (n) => `${Math.round(n * Math.max(1, Math.log2(n))).toLocaleString()} steps`,
    color: '#6B32E8',
    barColor: 'bg-[#6B32E8]',
    example: 'Merge Sort, Quick Sort (average), Heap Sort',
    practicalLimit: 'Theoretical optimum for comparison-based sorting'
  },
  {
    notation: 'O(n²)',
    name: 'Quadratic Time',
    formula: (n) => n * n,
    displayValue: (n) => `${(n * n).toLocaleString()} steps`,
    color: '#F5B800',
    barColor: 'bg-[#F5B800]',
    example: 'Bubble Sort, Selection Sort, Insertion Sort, all pairs check',
    practicalLimit: 'Practical only up to n ≈ 10,000; at n=10⁶ takes hours'
  },
  {
    notation: 'O(n³)',
    name: 'Cubic Time',
    formula: (n) => Math.min(1e12, n * n * n),
    displayValue: (n) => `${(n * n * n).toLocaleString()} steps`,
    color: '#EA580C',
    barColor: 'bg-orange-600',
    example: 'Standard Matrix Multiplication (n×n), Floyd-Warshall all-pairs',
    practicalLimit: 'Becomes sluggish for n > 500'
  },
  {
    notation: 'O(2ⁿ)',
    name: 'Exponential Time',
    formula: (n) => (n > 40 ? 1e14 : Math.pow(2, n)),
    displayValue: (n) => (n > 40 ? '> 10¹⁴ (Cosmic Limit)' : Math.pow(2, n).toLocaleString() + ' steps'),
    color: '#EF4444',
    barColor: 'bg-rose-500',
    example: 'Recursive Fibonacci without memoization, 0/1 Knapsack brute force',
    practicalLimit: 'Intractable for n > 35; at n=64 exceeds age of universe'
  },
  {
    notation: 'O(n!)',
    name: 'Factorial Time',
    formula: (n) => {
      if (n > 15) return 1e15;
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      return res;
    },
    displayValue: (n) => {
      if (n > 15) return '> 1.3 × 10¹² (Universe Limit)';
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      return `${res.toLocaleString()} steps`;
    },
    color: '#DC2626',
    barColor: 'bg-red-700',
    example: 'Travelling Salesperson brute force permutations, N-Queens brute-force',
    practicalLimit: 'Fails for n ≥ 15'
  }
];

interface LoopPattern {
  id: string;
  title: string;
  complexity: string;
  code: string;
  explanation: string;
  stepCountAtN: (n: number) => string;
}

const LOOP_PATTERNS: LoopPattern[] = [
  {
    id: 'single_loop',
    title: '1. Standard Linear Iteration',
    complexity: 'O(n)',
    code: `// Loop runs exactly n times
for (int i = 0; i < n; i++) {
    sum += arr[i]; // O(1) basic operation
}`,
    explanation: 'The loop executes exactly n times, with constant work O(1) in each pass. Total operations T(n) = c · n = O(n).',
    stepCountAtN: (n) => `${n} operations`
  },
  {
    id: 'nested_independent',
    title: '2. Nested Independent Double Loop',
    complexity: 'O(n²)',
    code: `// Outer runs n times, inner runs n times
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        matrix[i][j] = 0; // O(1)
    }
}`,
    explanation: 'For each of the n iterations of outer loop, the inner loop executes n times. Total work = n × n = n² operations = O(n²).',
    stepCountAtN: (n) => `${n * n} operations`
  },
  {
    id: 'nested_dependent',
    title: '3. Triangular Dependent Loop',
    complexity: 'O(n²)',
    code: `// Inner loop runs i times (0 + 1 + 2 + ... + n-1)
for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
        comparisons++; // Bubble/Selection inner pass
    }
}`,
    explanation: 'Sum of arithmetic progression: 0 + 1 + 2 + ... + (n - 1) = n(n - 1)/2 = 0.5n² - 0.5n. Because asymptotic notation drops the 0.5 constant and lower-order 0.5n term, complexity is strictly O(n²).',
    stepCountAtN: (n) => `${(n * (n - 1)) / 2} operations (exact: n(n-1)/2)`
  },
  {
    id: 'logarithmic_halving',
    title: '4. Repeated Halving / Doubling',
    complexity: 'O(log n)',
    code: `// Loop index doubles (or input halves)
int count = 0;
for (int i = 1; i < n; i *= 2) {
    count++; // Binary Search style jump
}`,
    explanation: 'The variable i takes values 1, 2, 4, 8, 16, ..., 2ᵏ until 2ᵏ ≥ n. Taking log₂ on both sides gives k = ⌈log₂ n⌉ passes.',
    stepCountAtN: (n) => `${Math.max(1, Math.round(Math.log2(n)))} operations`
  },
  {
    id: 'divide_and_conquer',
    title: '5. Divide-and-Conquer Recurrence',
    complexity: 'O(n log n)',
    code: `// T(n) = 2T(n/2) + O(n) (Merge Sort recurrence)
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);     // T(n/2)
        mergeSort(arr, m + 1, r); // T(n/2)
        merge(arr, l, m, r);       // O(n) linear merge
    }
}`,
    explanation: 'The recursion tree has log₂ n levels. At every level k, the combined work across all sub-arrays is exactly O(n). Total work = n × log₂ n = O(n log n).',
    stepCountAtN: (n) => `${Math.round(n * Math.max(1, Math.log2(n)))} operations`
  }
];

interface ComplexityGrowthLabProps {
  onBackToDashboard: () => void;
  onLaunchVisualizer: () => void;
  onOpenMasterTheorem: () => void;
  onOpenComplexityCalculator?: () => void;
}

export const ComplexityGrowthLab: React.FC<ComplexityGrowthLabProps> = ({
  onBackToDashboard,
  onLaunchVisualizer,
  onOpenMasterTheorem,
  onOpenComplexityCalculator
}) => {
  const [inputN, setInputN] = useState<number>(32);
  const [activeTab, setActiveTab] = useState<'plot' | 'loops' | 'dominant' | 'quiz'>('plot');
  const [selectedPattern, setSelectedPattern] = useState<string>('single_loop');

  // Dominant terms interactive equation: T(n) = a*n^2 + b*n + c
  const [coeffA, setCoeffA] = useState<number>(3);
  const [coeffB, setCoeffB] = useState<number>(100);
  const [coeffC, setCoeffC] = useState<number>(500);

  // Dominant terms calculation at inputN
  const termA = coeffA * inputN * inputN;
  const termB = coeffB * inputN;
  const termC = coeffC;
  const totalOps = termA + termB + termC;
  const percentA = totalOps > 0 ? ((termA / totalOps) * 100).toFixed(1) : '0';
  const percentB = totalOps > 0 ? ((termB / totalOps) * 100).toFixed(1) : '0';
  const percentC = totalOps > 0 ? ((termC / totalOps) * 100).toFixed(1) : '0';

  // Fast preset buttons for N
  const nPresets = [8, 16, 32, 64, 128, 256, 512, 1024];

  return (
    <div className="space-y-6 w-full">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={() => {
            soundFx.playClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Syllabus Dashboard
        </button>

        <div className="flex items-center gap-2">
          {onOpenComplexityCalculator && (
            <button
              onClick={() => {
                soundFx.playClick();
                onOpenComplexityCalculator();
              }}
              className="text-xs font-bold text-white bg-[#7B42F6] hover:bg-[#6830E0] px-3.5 py-1.5 rounded-full shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>🧮 Asymptotic Complexity Calculator</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onOpenMasterTheorem();
            }}
            className="text-xs font-bold text-[#7B42F6] bg-[#EDE8FE] hover:bg-[#D4C7F5] px-3 py-1.5 rounded-full border border-[#D4C7F5] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>📐 Master Theorem Solver</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm shadow-[#8C52FF]/5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7B42F6]">
          <span>Unit 1 &amp; 2 Specialization</span>
          <span>•</span>
          <span>Asymptotic Growth &amp; Complexity Laboratory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#201538] tracking-tight">
          Asymptotic Growth Rates &amp; Loop Analysis Lab
        </h1>
        <p className="text-xs sm:text-sm text-[#5B507A] max-w-3xl leading-relaxed">
          Interactive mathematical workbench to compare Big-O growth curves, observe why dominant terms rule asymptotic behavior, and inspect loop nesting complexity formulas for KCT 23CS401 university examinations.
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 border-b-2 border-[#E5DCF9] pb-1 overflow-x-auto select-none">
        {[
          { id: 'plot', label: '📈 Asymptotic Growth Curve Comparator' },
          { id: 'dominant', label: '⚖️ Dominant Term & Constant Eraser Lab' },
          { id: 'loops', label: '🔍 Loop Nesting & Recurrence Inspector' },
          { id: 'quiz', label: '🎯 Asymptotic Hierarchy Challenge' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              soundFx.playClick();
              setActiveTab(tab.id as any);
            }}
            className={`py-2 px-4 text-xs font-bold rounded-2xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#7B42F6] text-white shadow-xs'
                : 'text-[#5B507A] hover:text-[#201538] hover:bg-[#F4F0FF]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ASYMPTOTIC GROWTH CURVE COMPARATOR */}
      {activeTab === 'plot' && (
        <div className="space-y-6">
          {/* Input Size Slider Controls */}
          <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider font-mono">
                  INPUT SIZE CONTROLLER
                </span>
                <div className="text-lg font-black text-[#201538] flex items-center gap-2">
                  <span>Input Size:</span>
                  <span className="font-mono text-[#7B42F6] bg-[#EDE8FE] px-3 py-0.5 rounded-xl border border-[#D4C7F5]">
                    n = {inputN}
                  </span>
                </div>
              </div>

              {/* Fast Presets */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-[#887D9F] mr-1">Quick Presets:</span>
                {nPresets.map(val => (
                  <button
                    key={val}
                    onClick={() => {
                      soundFx.playClick();
                      setInputN(val);
                    }}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-colors ${
                      inputN === val
                        ? 'bg-[#7B42F6] text-white'
                        : 'bg-[#F4F0FF] text-[#5B507A] hover:bg-[#EDE8FE]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-1 pt-2">
              <input
                type="range"
                min="1"
                max="256"
                value={inputN}
                onChange={e => setInputN(Number(e.target.value))}
                className="w-full h-2 bg-[#E5DCF9] rounded-lg appearance-none cursor-pointer accent-[#7B42F6]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#887D9F]">
                <span>n = 1</span>
                <span>n = 32</span>
                <span>n = 64</span>
                <span>n = 128</span>
                <span>n = 256</span>
              </div>
            </div>
          </div>

          {/* Comparative Growth Rates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GROWTH_CLASSES.map(gc => {
              const count = gc.formula(inputN);
              const maxDisplay = 1000000;
              const relativeHeight = Math.min(100, Math.max(8, (Math.log10(count + 1) / 6) * 100));

              return (
                <div
                  key={gc.notation}
                  className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-4 shadow-2xs hover:border-[#7B42F6] transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-black font-mono" style={{ color: gc.color }}>
                        {gc.notation}
                      </span>
                      <span className="text-[10px] font-bold text-[#887D9F] uppercase font-mono">
                        {gc.name}
                      </span>
                    </div>
                    <div className="text-xs text-[#5B507A] line-clamp-2">
                      {gc.example}
                    </div>
                  </div>

                  {/* Visual Bar Indicator */}
                  <div className="space-y-1.5 pt-2 border-t border-[#F0EBFD]">
                    <div className="flex justify-between items-baseline text-xs font-mono">
                      <span className="text-[#887D9F] text-[10px]">Operations:</span>
                      <span className="font-black text-[#201538]">
                        {gc.displayValue(inputN)}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#F4F0FF] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${gc.barColor}`}
                        style={{ width: `${relativeHeight}%` }}
                      />
                    </div>

                    <div className="text-[10px] text-[#887D9F] font-mono truncate">
                      {gc.practicalLimit}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mathematical Hierarchy Explanation Card */}
          <div className="bg-[#1E1435] text-white rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#F5B800]">
              <span className="font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>👑</span> Fundamental Asymptotic Growth Hierarchy
              </span>
              <span>Strict Mathematical Ordering</span>
            </div>
            <div className="p-3 bg-[#2D1F4D] rounded-2xl border border-[#3E2D69] text-center font-mono font-bold text-xs sm:text-sm text-[#E9D5FF] overflow-x-auto whitespace-nowrap">
              O(1) &lt; O(log n) &lt; O(√n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(n³) &lt; O(2ⁿ) &lt; O(n!) &lt; O(nⁿ)
            </div>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              In university examinations, always compare functions for large values of n. For any polynomial function nᵏ and any exponential function cⁿ (where c &gt; 1), the exponential function will eventually surpass the polynomial regardless of how large k is!
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: DOMINANT TERM & CONSTANT ERASER LAB */}
      {activeTab === 'dominant' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-[#201538]">
              Why Are Constants and Lower-Order Terms Discarded?
            </h3>
            <p className="text-xs text-[#5B507A] leading-relaxed">
              Suppose an algorithm has an exact operational step count defined by the quadratic polynomial:
            </p>
            <div className="p-3 bg-[#F4F0FF] rounded-2xl border border-[#E5DCF9] text-center font-mono font-black text-sm text-[#7B42F6]">
              T(n) = {coeffA}n² + {coeffB}n + {coeffC}
            </div>

            {/* Interactive Coefficient Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9] space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span>Quadratic Term (a · n²):</span>
                  <span className="text-[#7B42F6]">a = {coeffA}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={coeffA}
                  onChange={e => setCoeffA(Number(e.target.value))}
                  className="w-full accent-[#7B42F6]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9] space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span>Linear Term (b · n):</span>
                  <span className="text-[#F5B800]">b = {coeffB}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={coeffB}
                  onChange={e => setCoeffB(Number(e.target.value))}
                  className="w-full accent-[#F5B800]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9] space-y-2">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span>Constant Term (c):</span>
                  <span className="text-[#10B981]">c = {coeffC}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="100"
                  value={coeffC}
                  onChange={e => setCoeffC(Number(e.target.value))}
                  className="w-full accent-[#10B981]"
                />
              </div>
            </div>

            {/* Current Input N at Evaluation */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#EDE8FE] border border-[#D4C7F5] text-xs font-mono">
              <span className="font-bold text-[#4C1D95]">Current Evaluation Point:</span>
              <div className="flex items-center gap-2">
                <span>Input Size:</span>
                <span className="font-black text-[#7B42F6] bg-white px-2 py-0.5 rounded-lg border border-[#D4C7F5]">
                  n = {inputN}
                </span>
                <button
                  onClick={() => setInputN(inputN === 500 ? 32 : 500)}
                  className="px-2 py-0.5 bg-[#7B42F6] text-white rounded-lg font-bold"
                >
                  {inputN >= 500 ? 'Reset n=32' : 'Test Large n=500'}
                </button>
              </div>
            </div>

            {/* Breakdown Breakdown Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-[#7B42F6]">Quadratic: {percentA}%</span>
                <span className="text-[#F5B800]">Linear: {percentB}%</span>
                <span className="text-[#10B981]">Constant: {percentC}%</span>
              </div>

              <div className="w-full h-6 rounded-xl overflow-hidden flex shadow-inner border border-[#E5DCF9]">
                <div style={{ width: `${percentA}%` }} className="bg-[#7B42F6] h-full transition-all" title={`Quadratic: ${percentA}%`} />
                <div style={{ width: `${percentB}%` }} className="bg-[#F5B800] h-full transition-all" title={`Linear: ${percentB}%`} />
                <div style={{ width: `${percentC}%` }} className="bg-[#10B981] h-full transition-all" title={`Constant: ${percentC}%`} />
              </div>
            </div>

            {/* Proof conclusion */}
            <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] space-y-1.5">
              <div className="font-black flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>Formal Conclusion for University Proofs:</span>
              </div>
              <p>
                At n = {inputN}, the dominant term <strong>{coeffA}n²</strong> contributes <strong>{percentA}%</strong> of all CPU operations. As n &rarr; &infin;, the ratio ({coeffA}n² / T(n)) approaches <strong>1.00 (100%)</strong>. Therefore, constants ({coeffA}) and lower order terms ({coeffB}n + {coeffC}) are omitted in Big-O analysis, leaving simply <strong>O(n²)</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LOOP NESTING & RECURRENCE INSPECTOR */}
      {activeTab === 'loops' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Pattern Selection */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-xs font-mono font-bold text-[#887D9F] uppercase px-1">
                Common Loop Patterns in DAA
              </div>
              {LOOP_PATTERNS.map(pat => (
                <button
                  key={pat.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedPattern(pat.id);
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                    selectedPattern === pat.id
                      ? 'bg-[#F4F0FF] border-[#7B42F6] shadow-xs'
                      : 'bg-white border-[#E5DCF9] hover:border-[#D4C7F5]'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-[#201538]">{pat.title}</div>
                    <div className="text-[11px] font-mono font-bold text-[#7B42F6]">{pat.complexity}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#887D9F]" />
                </button>
              ))}
            </div>

            {/* Right: Pattern Detail & Code Inspection */}
            <div className="lg:col-span-7">
              {(() => {
                const pat = LOOP_PATTERNS.find(p => p.id === selectedPattern) || LOOP_PATTERNS[0];
                return (
                  <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
                      <h4 className="text-sm font-black text-[#201538]">{pat.title}</h4>
                      <span className="font-mono text-xs font-black px-3 py-1 rounded-full bg-[#EDE8FE] text-[#7B42F6] border border-[#D4C7F5]">
                        {pat.complexity}
                      </span>
                    </div>

                    {/* Code Snippet Box */}
                    <div className="bg-[#1E1435] text-purple-200 rounded-2xl p-4 font-mono text-xs overflow-x-auto shadow-inner border border-[#2E2050]">
                      <pre>{pat.code}</pre>
                    </div>

                    {/* Mathematical Explanation */}
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-[#7B42F6] uppercase">
                        Step-by-step Mathematical Derivation:
                      </div>
                      <p className="text-xs text-[#5B507A] leading-relaxed">
                        {pat.explanation}
                      </p>
                    </div>

                    {/* Exact Evaluation at current n */}
                    <div className="p-3 bg-[#F8F6FE] rounded-2xl border border-[#E5DCF9] flex justify-between items-center text-xs font-mono">
                      <span className="text-[#5B507A]">Evaluation at n = {inputN}:</span>
                      <span className="font-black text-[#201538]">{pat.stepCountAtN(inputN)}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ASYMPTOTIC HIERARCHY CHALLENGE */}
      {activeTab === 'quiz' && (
        <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h3 className="text-base font-black text-[#201538] flex items-center gap-2">
            <span>🎯</span> Asymptotic Speed Ranking Quiz (KCT 23CS401 Part A)
          </h3>
          <p className="text-xs text-[#5B507A]">
            Test your intuition on comparing growth rates of common algorithm functions:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#F8F6FE] border border-[#E5DCF9] space-y-2">
              <div className="text-xs font-bold text-[#201538]">
                Q1: Which function grows strictly faster as n &rarr; &infin;?
              </div>
              <div className="font-mono text-xs text-[#7B42F6] font-bold">
                f(n) = n¹.⁵ vs g(n) = n log₂ n
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D4C7F5] text-xs text-[#5B507A] space-y-1">
                <div className="font-bold text-[#10B981]">✓ Correct Answer: f(n) = n¹.⁵</div>
                <p>
                  Dividing both by n: n¹.⁵/n = n⁰.⁵ = √n, whereas (n log n)/n = log n. Since √n grows strictly faster than log n, n¹.⁵ dominates n log n asymptotically.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F6FE] border border-[#E5DCF9] space-y-2">
              <div className="text-xs font-bold text-[#201538]">
                Q2: Which function grows faster?
              </div>
              <div className="font-mono text-xs text-[#7B42F6] font-bold">
                f(n) = 2ⁿ vs g(n) = n!
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#D4C7F5] text-xs text-[#5B507A] space-y-1">
                <div className="font-bold text-[#10B981]">✓ Correct Answer: g(n) = n!</div>
                <p>
                  2ⁿ = 2 × 2 × ... × 2 (n times). In contrast, n! = 1 × 2 × 3 × ... × n. For n &gt; 4, every term in n! is larger than 2, making n! grow asymptotically faster than any 2ⁿ or cⁿ.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
