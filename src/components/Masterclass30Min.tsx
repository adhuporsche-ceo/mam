import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  HelpCircle,
  Download,
  Share2
} from 'lucide-react';
import { PeacockLogo } from './PeacockLogo';
import { soundFx } from '../utils/soundEffects';
import { GlossaryTooltip } from './GlossaryTooltip';
import { ALGORITHMS, AlgorithmItem } from '../data/daaData';

export interface MasterclassModule {
  id: string;
  unitNumber: string;
  unitTitle: string;
  title: string;
  durationMinutes: number;
  algoId: string;
  summaryHook: string;
  coreConcepts: string[];
  examInvariantFormula: string;
  teachingStory: string;
  checkpointQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const MASTERCLASS_MODULES: MasterclassModule[] = [
  {
    id: 'mc_1',
    unitNumber: '01',
    unitTitle: 'Analysis & Correctness',
    title: 'Mastering Big-O Bounds & Master Theorem',
    durationMinutes: 3,
    algoId: 'master_theorem',
    summaryHook: 'Learn how to classify asymptotic growth without measuring clock seconds, and solve recurrences in 10 seconds using Master Theorem.',
    coreConcepts: [
      'Big-O is an asymptotic upper bound: f(n) <= c * g(n) for all n >= n0',
      'Master Theorem Recipe compares leaf work n^(log_b a) against root combining work f(n)',
      'Case 1: Leaves dominate -> Theta(n^(log_b a)); Case 2: Even balance -> Theta(n^(log_b a) * log n); Case 3: Root dominates -> Theta(f(n))'
    ],
    examInvariantFormula: 'T(n) = a·T(n/b) + f(n) where a >= 1, b > 1. Compare f(n) with n^(log_b a).',
    teachingStory: 'Imagine an engine race: constant multipliers (like a 4x turbocharger) do not matter once input n reaches millions. A quadratic algorithm will always lose to a linearithmic one regardless of hardware speed.',
    checkpointQuestion: {
      question: 'In MergeSort recurrence T(n) = 2T(n/2) + O(n), which Master Theorem case applies?',
      options: [
        'Case 1 (leaves dominate)',
        'Case 2 (equal balance: log_2(2) == 1, so Theta(n log n))',
        'Case 3 (root dominates)',
        'Master Theorem does not apply'
      ],
      correctIndex: 1,
      explanation: 'Since a=2, b=2, critical exponent log_2(2) = 1. Combining work is f(n) = Theta(n^1). Since exponents match, Case 2 applies, giving Theta(n log n).'
    }
  },
  {
    id: 'mc_2',
    unitNumber: '02',
    unitTitle: 'Divide and Conquer',
    title: 'Divide, Conquer, Combine & Karatsuba Trick',
    durationMinutes: 4,
    algoId: 'karatsuba_mult',
    summaryHook: 'Discover why splitting subproblems saves massive multiplications, dropping Karatsuba from O(n^2) to O(n^1.585).',
    coreConcepts: [
      'Three sacred steps: Divide into independent subproblems, Conquer recursively, Combine in linear time',
      'Karatsuba reduces 4 multiplication branches down to 3 using algebraic identity (A+B)(C+D) - AC - BD',
      'Independent subproblems ensure zero redundant overlapping recalculations'
    ],
    examInvariantFormula: 'T(n) = 3T(n/2) + O(n) => n^(log_2 3) = O(n^1.585)',
    teachingStory: 'Grade-school multiplication takes n^2 single-digit steps. By computing just three products instead of four, Karatsuba broke a 2,000-year-old speed barrier for cryptographic multiplication.',
    checkpointQuestion: {
      question: 'How many recursive multiplications does Karatsuba perform for two n-digit numbers?',
      options: ['4 multiplications', '3 multiplications', '2 multiplications', '1 multiplication'],
      correctIndex: 1,
      explanation: 'Karatsuba cleverly computes Z1 = (A+B)(C+D) - Z0 - Z2, needing only 3 multiplications (Z0, Z2, and (A+B)(C+D)) instead of 4.'
    }
  },
  {
    id: 'mc_3',
    unitNumber: '06',
    unitTitle: 'Sorting Algorithms',
    title: 'Sorting Invariants & Lomuto vs Hoare Partitioning',
    durationMinutes: 4,
    algoId: 'quick_sort',
    summaryHook: 'Understand loop invariants for Bubble, Insertion, and QuickSort, and why pivot selection determines O(n log n) vs O(n^2).',
    coreConcepts: [
      'Loop Invariant 3 stages: 1. Initialization (n=0), 2. Maintenance (pass k preserves sorted slice), 3. Termination (i=n)',
      'Lomuto Partition maintains single scan pointer i: arr[low..i] <= pivot < arr[i+1..j]',
      'QuickSort worst case O(n^2) happens when pivot is smallest or largest (already sorted array)'
    ],
    examInvariantFormula: 'Invariant: Array elements [0..i] are <= pivot; elements [i+1..j-1] are > pivot.',
    teachingStory: 'QuickSort is like organizing students by height around a benchmark student (pivot): shorter students step left, taller step right. Once in place, the pivot never moves again.',
    checkpointQuestion: {
      question: 'What is the worst-case time complexity of QuickSort with Lomuto partitioning on an already-sorted array?',
      options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
      correctIndex: 2,
      explanation: 'When the array is already sorted and the last element is chosen as pivot, partition creates a maximally unbalanced subproblem of sizes 0 and n-1 at every step, degrading to O(n²).'
    }
  },
  {
    id: 'mc_4',
    unitNumber: '05 & 08',
    unitTitle: 'Data Structures & Extensions',
    title: 'Amortized Array Doubling & LIFO/FIFO Buffers',
    durationMinutes: 3,
    algoId: 'dynamic_array_amortized',
    summaryHook: 'Why C++ std::vector and Java ArrayList insertions are O(1) amortized, even though occasional doubling copies the entire array.',
    coreConcepts: [
      'Aggregate Method: sum total cost across n operations and divide by n',
      'Banker / Potential Method: charge 3 credits per insert (1 pay, 2 save in bank for future doubling)',
      'Circular Queue uses modulo arithmetic (rear + 1) % capacity to avoid creeping memory leaks'
    ],
    examInvariantFormula: 'Amortized Cost a_i = c_i + Φ(D_i) - Φ(D_{i-1}) = O(1) constant average',
    teachingStory: 'Think of dynamic array doubling like paying rent: every month you put a little spare cash in the piggy bank. When the big doubling day arrives, the piggy bank pays the moving truck completely!',
    checkpointQuestion: {
      question: 'In the Banker/Accounting method for dynamic array doubling, how many credits are allocated per inserted item?',
      options: ['1 credit', '2 credits', '3 credits', 'Capacity * 2 credits'],
      correctIndex: 2,
      explanation: '3 credits are charged: 1 credit pays for the immediate write into the array, 1 credit will pay to move this item during the next doubling, and 1 credit pays to move a partner item.'
    }
  },
  {
    id: 'mc_5',
    unitNumber: '09',
    unitTitle: 'Graph Algorithms',
    title: 'BFS, DFS, Dijkstra Relaxation & Kruskal MST',
    durationMinutes: 4,
    algoId: 'dijkstra_shortest_path',
    summaryHook: 'Master edge relaxation, priority queues, and greedy cut properties that power Google Maps and GPS navigation.',
    coreConcepts: [
      'BFS guarantees shortest path in UNWEIGHTED graphs; Dijkstra handles non-negative weighted graphs',
      'Edge Relaxation formula: if dist[v] > dist[u] + weight(u, v), then dist[v] = dist[u] + weight(u, v)',
      'Kruskal greedily adds lightest edges, using Disjoint Set Union (DSU) to reject cycles'
    ],
    examInvariantFormula: 'Triangle Inequality: dist[v] <= dist[u] + w(u, v) for all shortest path vertices.',
    teachingStory: 'Dijkstra works like dropping a dye into water: ripples expand outward at equal speed. The first time the dye touches a landmark node, that is guaranteed to be the fastest route possible.',
    checkpointQuestion: {
      question: 'Why does Dijkstra algorithm fail on graphs with negative weight edges?',
      options: [
        'It causes stack overflow in recursion',
        'Once a vertex is marked visited in Dijkstra, its distance is finalized and never updated, even if a cheaper negative path appears later',
        'Negative edges make the graph directed',
        'Priority queue cannot store negative numbers'
      ],
      correctIndex: 1,
      explanation: 'Dijkstra is greedy and assumes paths only get longer as you add edges. A negative edge can decrease total path cost after a vertex was finalized, breaking Dijkstra\'s greedy invariant. Bellman-Ford must be used instead.'
    }
  },
  {
    id: 'mc_6',
    unitNumber: '10',
    unitTitle: 'Dynamic Programming',
    title: '0/1 Knapsack & LCS: Overlapping Subproblems',
    durationMinutes: 5,
    algoId: 'knapsack_dp',
    summaryHook: 'Deconstruct the Bellman Principle of Optimality: memoization vs bottom-up tabulation, and reconstructing optimal answers.',
    coreConcepts: [
      'Two requirements for DP: 1. Optimal Substructure, 2. Overlapping Subproblems',
      '0/1 Knapsack Decision: DP[i][w] = max(DP[i-1][w], DP[i-1][w - wt_i] + val_i)',
      'LCS Character Matching: Diagonal + 1 on match, or max(top, left) on mismatch'
    ],
    examInvariantFormula: 'DP[i][w] = max( DP[i-1][w],  w >= wt[i] ? DP[i-1][w - wt[i]] + val[i] : 0 )',
    teachingStory: 'Those who forget the past are condemned to repeat it! Dynamic Programming is simply recursion with a notepad so you never calculate fib(3) or knapsack subproblem twice.',
    checkpointQuestion: {
      question: 'What is the time complexity of 0/1 Knapsack dynamic programming with n items and capacity W?',
      options: ['O(2^n)', 'O(n * W) pseudo-polynomial', 'O(n log W)', 'O(W^2)'],
      correctIndex: 1,
      explanation: 'Filling the (n+1) x (W+1) matrix requires visiting each cell once and doing constant O(1) comparison, resulting in O(n * W) pseudo-polynomial time.'
    }
  },
  {
    id: 'mc_7',
    unitNumber: '14',
    unitTitle: 'Greedy Algorithms',
    title: 'Greedy Choice Property & Interval Scheduling',
    durationMinutes: 3,
    algoId: 'activity_selection',
    summaryHook: 'When does greedy work? The matroid theory of locally optimal choices leading to globally optimal schedules.',
    coreConcepts: [
      'Greedy Choice Property: a global optimum can be reached by choosing locally optimal actions',
      'Activity Selection Rule: Sort activities by FINISH TIME, not start time or duration',
      'Greedy works for Fractional Knapsack, but FAILS for 0/1 Knapsack'
    ],
    examInvariantFormula: 'Select activity k with earliest finish time f_k >= previous chosen finish time.',
    teachingStory: 'If you want to attend as many movie screenings at a film festival as possible, always pick the movie that finishes earliest! That leaves maximum time open for subsequent screenings.',
    checkpointQuestion: {
      question: 'In Activity Selection problem, by which parameter must the intervals be sorted to guarantee optimal count?',
      options: ['Earliest Start Time', 'Shortest Duration', 'Earliest Finish Time', 'Latest Finish Time'],
      correctIndex: 2,
      explanation: 'Sorting by earliest finish time guarantees the greedy choice property: picking the activity that frees up the resource as early as possible leaves room for the maximum remaining activities.'
    }
  },
  {
    id: 'mc_8',
    unitNumber: '03 & 04',
    unitTitle: 'Branch & Bound and Complexity',
    title: 'State-Space Pruning & P vs NP Intractability',
    durationMinutes: 4,
    algoId: 'knapsack_branch_bound',
    summaryHook: 'How Branch and Bound cuts hopeless subtrees using bounding functions, and why P vs NP defines modern computer science.',
    coreConcepts: [
      'Branch and Bound explores State Space Trees using upper/lower bounds to prune dead branches',
      'P: Problems solvable in polynomial time; NP: Problems verifiable in polynomial time',
      'NP-Complete: Hardest problems in NP (Cook-Levin Theorem: SAT is NP-Complete)'
    ],
    examInvariantFormula: 'Pruning Rule: If Upper Bound(node) <= Best_Known_Profit, prune node immediately!',
    teachingStory: 'Branch and Bound is like packing a suitcase with a smart scale: if even the lightest items left will overflow your baggage weight limit, stop testing that combination immediately and prune that whole branch!',
    checkpointQuestion: {
      question: 'What is the primary difference between Backtracking and Branch & Bound?',
      options: [
        'Backtracking uses loops; Branch & Bound uses recursion',
        'Backtracking is for decision/constraint problems (DFS); Branch & Bound is for optimization problems using bounding functions to prune (BFS/LC-search)',
        'Backtracking works in polynomial time; Branch & Bound is exponential',
        'There is no difference'
      ],
      correctIndex: 1,
      explanation: 'Backtracking uses DFS to find any feasible or all feasible solutions to decision problems. Branch & Bound is specifically tailored for optimization problems (min cost or max profit) and computes bounding estimates to prune subtrees.'
    }
  }
];

interface Masterclass30MinProps {
  onBackToDashboard: () => void;
  onLaunchAlgorithm: (algoId: string) => void;
}

export const Masterclass30Min: React.FC<Masterclass30MinProps> = ({
  onBackToDashboard,
  onLaunchAlgorithm
}) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentMod = MASTERCLASS_MODULES[activeModuleIndex];

  // Timer countdown
  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
    if (isRunning && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => Math.max(0, prev - 1));
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsRunning(false);
      soundFx.playSuccessChime();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, secondsRemaining]);

  // Stop speaking when module switches
  useEffect(() => {
    soundFx.stopSpeaking();
    setIsSpeaking(false);
  }, [activeModuleIndex]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleTimer = () => {
    soundFx.playClick();
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    soundFx.playClick();
    setIsRunning(false);
    setSecondsRemaining(30 * 60);
  };

  const handleAnswerSelect = (optionIdx: number) => {
    soundFx.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentMod.id]: optionIdx
    }));

    if (optionIdx === currentMod.checkpointQuestion.correctIndex) {
      soundFx.playSuccessChime();
      if (!completedModules.includes(currentMod.id)) {
        setCompletedModules(prev => [...prev, currentMod.id]);
      }
    }
  };

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      soundFx.stopSpeaking();
      setIsSpeaking(false);
    } else {
      soundFx.playPop();
      setIsSpeaking(true);
      const script = `${currentMod.title}. ${currentMod.summaryHook} ${currentMod.teachingStory}`;
      soundFx.speak(script, () => setIsSpeaking(false));
    }
  };

  const hasAnswered = selectedAnswers[currentMod.id] !== undefined;
  const isCorrect = selectedAnswers[currentMod.id] === currentMod.checkpointQuestion.correctIndex;

  return (
    <div className="space-y-6">
      {/* Top Navigation Strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Syllabus Dashboard
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#5B507A]">
            Progress: {completedModules.length} of {MASTERCLASS_MODULES.length} Modules
          </span>
          <span className="text-xs font-mono font-black text-[#10B981] bg-[#EBF7E3] px-2.5 py-0.5 rounded-full border border-[#C5E1A5]">
            {Math.round((completedModules.length / MASTERCLASS_MODULES.length) * 100)}% Mastered
          </span>
        </div>
      </div>

      {/* Hero Masterclass Banner */}
      <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm shadow-[#8C52FF]/5 space-y-4 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8FE] border border-[#D4C7F5] text-xs font-bold text-[#7B42F6]">
              <PeacockLogo size={18} className="w-4 h-4" />
              <span>30-Minute DAA Animated University Crash Course</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#201538] tracking-tight">
              High-Yield Animated Masterclass
            </h1>
            <p className="text-xs sm:text-sm text-[#5B507A] leading-relaxed">
              Designed for fast, deep comprehension: master all 8 foundational algorithm paradigms across 16 syllabus units in exactly 30 minutes with synchronized animated walkthroughs and exam invariants.
            </p>
          </div>

          {/* Interactive 30-Minute Clock & Controls */}
          <div className="bg-[#1E1435] text-white p-5 rounded-2xl border border-[#2E2050] flex flex-col items-center justify-center min-w-[240px] shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-200 uppercase tracking-wider">
              <Clock className="w-4 h-4 text-[#FFB800]" />
              <span>Exam Crash Timer</span>
            </div>

            <div className="text-4xl font-black font-mono tracking-tight text-[#FFB800]">
              {formatTime(secondsRemaining)}
            </div>

            <div className="flex items-center gap-2 w-full pt-1">
              <button
                onClick={handleToggleTimer}
                className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-[#7B42F6] hover:bg-[#6830E0] text-white'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                <span>{isRunning ? 'Pause' : 'Start 30m'}</span>
              </button>

              <button
                onClick={handleResetTimer}
                className="p-1.5 bg-[#2D1F4D] hover:bg-[#3E2D69] text-purple-200 rounded-xl transition-colors cursor-pointer"
                title="Reset Timer to 30:00"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 8-Segment Interactive Roadmap Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 border-t border-[#E5DCF9]">
          {MASTERCLASS_MODULES.map((mod, idx) => {
            const isCurrent = idx === activeModuleIndex;
            const isDone = completedModules.includes(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => {
                  soundFx.playClick();
                  setActiveModuleIndex(idx);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#7B42F6] text-white border-[#7B42F6] shadow-xs scale-102'
                    : isDone
                    ? 'bg-[#EBF7E3] text-[#33691E] border-[#C5E1A5]'
                    : 'bg-[#F8F6FE] text-[#5B507A] border-[#E5DCF9] hover:border-[#D4C7F5]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className="font-bold">M{idx + 1} ({mod.durationMinutes}m)</span>
                  {isDone && <CheckCircle2 className="w-3 h-3 text-[#10B981]" />}
                </div>
                <div className="text-[11px] font-bold truncate leading-tight">
                  {mod.title.split(' ')[0]} {mod.title.split(' ')[1]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Module Classroom Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lesson Narrative & Voice Mentor (7 Cols) */}
        <div className="lg:col-span-7 bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E5DCF9]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-2.5 py-0.5 rounded-full border border-[#D4C7F5]">
                  Unit {currentMod.unitNumber} · {currentMod.unitTitle}
                </span>
                <span className="text-xs font-mono text-[#887D9F]">
                  Module {activeModuleIndex + 1} of 8 ({currentMod.durationMinutes} mins)
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#201538]">
                {currentMod.title}
              </h2>
            </div>

            {/* Audio Voice Narration Button */}
            <button
              onClick={handleToggleSpeech}
              className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-2 text-xs font-bold ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  : 'bg-[#F4F0FF] text-[#7B42F6] border-[#D4C7F5] hover:bg-[#EDE8FE]'
              }`}
              title={isSpeaking ? 'Stop Voice Narration' : 'Listen to Voice Mentor'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'Speaking...' : 'Listen to Teacher'}</span>
            </button>
          </div>

          {/* Quick Summary Hook */}
          <div className="p-4 bg-[#F8F6FE] rounded-2xl border border-[#E5DCF9] text-xs sm:text-sm font-medium text-[#201538] leading-relaxed">
            {currentMod.summaryHook}
          </div>

          {/* Intuitive Teaching Story / Real-World Analogy */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#7B42F6] uppercase tracking-wider block">
              💡 60-Second Intuition &amp; Mental Model:
            </span>
            <p className="text-xs sm:text-sm text-[#5B507A] leading-relaxed italic bg-amber-50/50 p-4 rounded-2xl border border-amber-200/60">
              &quot;{currentMod.teachingStory}&quot;
            </p>
          </div>

          {/* Core Concept Bullets */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#201538] uppercase tracking-wider block">
              Key Syllabus Principles:
            </span>
            <ul className="space-y-2">
              {currentMod.coreConcepts.map((concept, cIdx) => (
                <li
                  key={cIdx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#201538] leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-[#EDE8FE] text-[#7B42F6] font-mono text-[10px] font-black shrink-0 flex items-center justify-center mt-0.5">
                    {cIdx + 1}
                  </span>
                  <span>{concept}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formal Examination Invariant Formula */}
          <div className="p-4 bg-[#F4F0FF] rounded-2xl border-2 border-[#7B42F6] space-y-1">
            <span className="text-[10px] font-mono font-black text-[#7B42F6] uppercase tracking-wider block">
              🎓 Autonomous Exam Invariant / Formula to Write:
            </span>
            <p className="font-mono text-xs sm:text-sm font-black text-[#201538] overflow-x-auto">
              {currentMod.examInvariantFormula}
            </p>
          </div>

          {/* Navigation Between Modules */}
          <div className="pt-2 flex items-center justify-between border-t border-[#E5DCF9]">
            <button
              disabled={activeModuleIndex === 0}
              onClick={() => {
                soundFx.playClick();
                setActiveModuleIndex(prev => prev - 1);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-[#E5DCF9] hover:bg-[#F4F0FF] disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Module</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                onLaunchAlgorithm(currentMod.algoId);
              }}
              className="px-4 py-2 bg-[#7B42F6] hover:bg-[#6830E0] text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Launch Live Animation</span>
            </button>

            <button
              disabled={activeModuleIndex === MASTERCLASS_MODULES.length - 1}
              onClick={() => {
                soundFx.playClick();
                setActiveModuleIndex(prev => prev + 1);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F4F0FF] text-[#7B42F6] border border-[#D4C7F5] hover:bg-[#EDE8FE] disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1.5"
            >
              <span>Next Module</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Checkpoint Quiz & Revision Sheet (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Checkpoint Quiz Card */}
          <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFB800]" />
                <h3 className="text-sm font-black text-[#201538]">
                  Module Checkpoint Quiz
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#887D9F]">
                Instant Verification
              </span>
            </div>

            <p className="text-xs sm:text-sm font-bold text-[#201538] leading-relaxed">
              {currentMod.checkpointQuestion.question}
            </p>

            <div className="space-y-2">
              {currentMod.checkpointQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentMod.id] === oIdx;
                const isCorrectChoice = oIdx === currentMod.checkpointQuestion.correctIndex;
                let btnStyle = 'bg-[#F8F6FE] border-[#E5DCF9] text-[#201538] hover:border-[#7B42F6]';

                if (hasAnswered) {
                  if (isCorrectChoice) {
                    btnStyle = 'bg-[#EBF7E3] border-[#8BC34A] text-[#1B5E20] font-bold';
                  } else if (isSelected && !isCorrectChoice) {
                    btnStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswerSelect(oIdx)}
                    className={`w-full p-3 rounded-2xl border-2 text-left text-xs font-medium transition-all cursor-pointer flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current font-mono text-[10px] font-black shrink-0 flex items-center justify-center mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {hasAnswered && (
              <div className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-in fade-in-50 ${
                isCorrect ? 'bg-[#EBF7E3] border-[#8BC34A] text-[#1B5E20]' : 'bg-rose-50 border-rose-200 text-rose-900'
              }`}>
                <div className="font-bold flex items-center gap-1.5">
                  {isCorrect ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <HelpCircle className="w-4 h-4 text-rose-500" />}
                  <span>{isCorrect ? 'Correct! Concept Mastered.' : 'Review Concept Explanation:'}</span>
                </div>
                <p className="leading-relaxed">
                  {currentMod.checkpointQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* 30-Minute Masterclass Quick Cheat Card */}
          <div className="bg-[#1E1435] text-white rounded-3xl p-6 border border-[#2E2050] space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FFB800]" />
                <h3 className="text-sm font-black text-white">
                  University Exam Pocket Formulas
                </h3>
              </div>
              <span className="text-[10px] font-mono text-purple-200 bg-[#2D1F4D] px-2 py-0.5 rounded border border-[#3E2D69]">
                KCT 23CS401
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-purple-100">
              <div className="p-2.5 bg-[#251842] rounded-xl border border-[#372461] flex justify-between">
                <span>Comparison Sorting Lower Bound:</span>
                <strong className="text-[#FFB800]">Ω(n log n)</strong>
              </div>
              <div className="p-2.5 bg-[#251842] rounded-xl border border-[#372461] flex justify-between">
                <span>0/1 Knapsack Complexity:</span>
                <strong className="text-[#8BC34A]">O(n · W)</strong>
              </div>
              <div className="p-2.5 bg-[#251842] rounded-xl border border-[#372461] flex justify-between">
                <span>Dijkstra with Min-Heap:</span>
                <strong className="text-purple-200">O((V + E) log V)</strong>
              </div>
              <div className="p-2.5 bg-[#251842] rounded-xl border border-[#372461] flex justify-between">
                <span>Kruskal MST with DSU:</span>
                <strong className="text-purple-200">O(E log E)</strong>
              </div>
              <div className="p-2.5 bg-[#251842] rounded-xl border border-[#372461] flex justify-between">
                <span>Dynamic Array Doubling:</span>
                <strong className="text-[#8BC34A]">Amortized O(1)</strong>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playSuccessChime();
                window.print();
              }}
              className="w-full py-2.5 px-4 bg-[#7B42F6] hover:bg-[#6830E0] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Save 30-Min Master Formula Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
