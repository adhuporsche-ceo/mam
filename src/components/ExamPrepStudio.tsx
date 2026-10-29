import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  ChevronLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Award,
  RefreshCw,
  FileText,
  Search,
  Filter
} from 'lucide-react';
import { soundFx } from '../utils/soundEffects';

interface ExamQuestion {
  id: string;
  unit: string;
  unitNumber: number;
  marks: 2 | 5 | 14;
  type: 'definition' | 'derivation' | 'dryrun' | 'proof' | 'viva';
  question: string;
  answerSummary: string;
  modelAnswer: string[];
  keyPoints: string[];
  kctExamTip: string;
}

const EXAM_QUESTIONS: ExamQuestion[] = [
  // Unit 1 & 2 - Fundamentals & Asymptotics
  {
    id: 'q1',
    unit: 'Unit 1: Fundamentals of Algorithm Analysis',
    unitNumber: 1,
    marks: 2,
    type: 'definition',
    question: 'Define an Algorithm. List its five crucial properties.',
    answerSummary: 'An algorithm is a finite, well-defined sequence of unambiguous computer-implementable instructions.',
    modelAnswer: [
      'Definition: An algorithm is a sequence of unambiguous instructions for solving a problem, i.e., for obtaining a required output for any legitimate input in a finite amount of time.',
      '1. Input: Zero or more externally supplied quantities.',
      '2. Output: At least one quantity produced as result.',
      '3. Definiteness: Each instruction must be clear and unambiguous.',
      '4. Finiteness: The algorithm must terminate after a finite number of steps for all cases.',
      '5. Effectiveness: Every operation must be sufficiently basic to be executable in principle.'
    ],
    keyPoints: ['Unambiguous', 'Finite steps', 'Definiteness', 'Effectiveness'],
    kctExamTip: 'Mention all 5 Knuth criteria for full 2 marks. Finiteness and Definiteness are evaluated critically.'
  },
  {
    id: 'q2',
    unit: 'Unit 2: Asymptotic Notations & Recurrences',
    unitNumber: 2,
    marks: 2,
    type: 'definition',
    question: 'Formally define Big-O, Big-Omega (Ω), and Big-Theta (Θ) asymptotic notations with their mathematical conditions.',
    answerSummary: 'Big-O is asymptotic upper bound, Ω is lower bound, and Θ is asymptotically tight bound.',
    modelAnswer: [
      'Big-O (Upper Bound): f(n) = O(g(n)) iff there exist positive constants c and n₀ such that 0 ≤ f(n) ≤ c · g(n) for all n ≥ n₀.',
      'Big-Omega (Lower Bound): f(n) = Ω(g(n)) iff there exist positive constants c and n₀ such that 0 ≤ c · g(n) ≤ f(n) for all n ≥ n₀.',
      'Big-Theta (Tight Bound): f(n) = Θ(g(n)) iff there exist positive constants c₁, c₂, and n₀ such that 0 ≤ c₁ · g(n) ≤ f(n) ≤ c₂ · g(n) for all n ≥ n₀.'
    ],
    keyPoints: ['constants c and n₀', '0 ≤ f(n) ≤ c·g(n)', 'c₁·g(n) ≤ f(n) ≤ c₂·g(n)'],
    kctExamTip: 'Always draw the graphical bound or write the strict inequality with n ≥ n₀ to secure 2/2 marks.'
  },
  {
    id: 'q3',
    unit: 'Unit 2: Asymptotic Notations & Recurrences',
    unitNumber: 2,
    marks: 5,
    type: 'derivation',
    question: 'State Master Theorem for divide-and-conquer recurrences T(n) = aT(n/b) + f(n) and state the condition for each of the 3 cases.',
    answerSummary: 'Compares f(n) against n^(log_b a). Case 1 is polynomial smaller, Case 2 is equal, Case 3 is polynomial larger with regularity.',
    modelAnswer: [
      'Recurrence form: T(n) = aT(n/b) + f(n), where a ≥ 1, b > 1, and f(n) is asymptotically positive.',
      'Calculate the watershed value: p = log_b a.',
      'Case 1: If f(n) = O(n^(log_b a - ε)) for some constant ε > 0, then T(n) = Θ(n^(log_b a)).',
      'Case 2: If f(n) = Θ(n^(log_b a) · logᵏ n) where k ≥ 0, then T(n) = Θ(n^(log_b a) · log^(k+1) n).',
      'Case 3: If f(n) = Ω(n^(log_b a + ε)) for some ε > 0, and regularity condition a·f(n/b) ≤ c·f(n) holds for c < 1 and sufficiently large n, then T(n) = Θ(f(n)).'
    ],
    keyPoints: ['Watershed n^(log_b a)', 'Polynomially smaller/larger', 'Regularity condition for Case 3'],
    kctExamTip: 'Remember: Case 3 strictly requires verifying the regularity condition a·f(n/b) ≤ c·f(n).'
  },
  {
    id: 'q4',
    unit: 'Unit 6: Sorting Algorithms',
    unitNumber: 6,
    marks: 14,
    type: 'dryrun',
    question: 'Trace Quick Sort using Lomuto Partitioning on array A = [38, 27, 43, 3, 9, 82, 10]. State its worst-case and best-case recurrence relations and solve them.',
    answerSummary: 'Pivot = 10, pointers i and j sweep left to right. Worst-case recurrence is T(n) = T(n-1) + O(n) = O(n²). Best-case is T(n) = 2T(n/2) + O(n) = O(n log n).',
    modelAnswer: [
      'Lomuto Partition Algorithm:',
      '1. Choose rightmost element as pivot: pivot = A[high] = 10.',
      '2. Initialize index i = low - 1 = -1.',
      '3. For j = 0 to 5: compare A[j] with pivot (10):',
      '   - j=0: A[0]=38 > 10, no swap.',
      '   - j=1: A[1]=27 > 10, no swap.',
      '   - j=2: A[2]=43 > 10, no swap.',
      '   - j=3: A[3]=3 <= 10 -> increment i=0, swap A[0] and A[3] -> [3, 27, 43, 38, 9, 82, 10].',
      '   - j=4: A[4]=9 <= 10 -> increment i=1, swap A[1] and A[4] -> [3, 9, 43, 38, 27, 82, 10].',
      '   - j=5: A[5]=82 > 10, no swap.',
      '4. Finally, swap A[i+1] with A[high]: swap A[2]=43 with A[6]=10 -> Partitioned Array: [3, 9, 10, 38, 27, 82, 43]. Pivot 10 placed at index 2.',
      '5. Recurrences:',
      '   - Worst Case (already sorted array with bad pivot): T(n) = T(n-1) + T(0) + cn = Θ(n²).',
      '   - Best Case (balanced 50-50 split): T(n) = 2T(n/2) + cn = Θ(n log n) by Master Theorem Case 2.'
    ],
    keyPoints: ['Pivot A[high]', 'Lomuto swap steps', 'Worst case O(n²)', 'Best case O(n log n)'],
    kctExamTip: 'Present the step-by-step table of [i, j, A[j], Action, Array State] for maximum marks in Part B.'
  },
  {
    id: 'q5',
    unit: 'Unit 9: Dynamic Programming',
    unitNumber: 9,
    marks: 14,
    type: 'derivation',
    question: 'Solve the 0/1 Knapsack problem with weights W = [2, 3, 4, 5], values V = [3, 4, 5, 6], and Knapsack capacity C = 5 using Dynamic Programming. Show the complete DP table and backtrack to find selected items.',
    answerSummary: 'Optimal value = 7 by selecting Item 1 (w=2, v=3) and Item 2 (w=3, v=4).',
    modelAnswer: [
      'DP Recurrence: dp[i][w] = max(dp[i-1][w], dp[i-1][w - wt[i-1]] + val[i-1]) when wt[i-1] <= w, else dp[i-1][w].',
      'Table Construction (rows i=0..4, cols w=0..5):',
      'Row 0 (no items): [0, 0, 0, 0, 0, 0]',
      'Row 1 (wt=2, val=3): [0, 0, 3, 3, 3, 3]',
      'Row 2 (wt=3, val=4): [0, 0, 3, 4, 4, 7]',
      'Row 3 (wt=4, val=5): [0, 0, 3, 4, 5, 7]',
      'Row 4 (wt=5, val=6): [0, 0, 3, 4, 5, 7]',
      'Maximum value achieved: dp[4][5] = 7.',
      'Backtracking for Item Selection:',
      '- At (4, 5): dp[4][5] == dp[3][5] (7 == 7) -> Item 4 NOT included. Move to (3, 5).',
      '- At (3, 5): dp[3][5] == dp[2][5] (7 == 7) -> Item 3 NOT included. Move to (2, 5).',
      '- At (2, 5): dp[2][5]=7 != dp[1][5]=3 -> Item 2 IS INCLUDED! (wt=3, val=4). Remaining capacity = 5 - 3 = 2. Move to (1, 2).',
      '- At (1, 2): dp[1][2]=3 != dp[0][2]=0 -> Item 1 IS INCLUDED! (wt=2, val=3). Remaining capacity = 2 - 2 = 0.',
      'Final Selected Subset: {Item 1, Item 2} with Total Weight = 2+3 = 5 <= 5, Total Value = 3+4 = 7.'
    ],
    keyPoints: ['Recurrence formula', 'Full 5x6 DP table', 'Backtracking inequality logic', 'Optimal items {1, 2}'],
    kctExamTip: 'Always show both the table and the backtracking step with remaining capacity deductions.'
  },
  {
    id: 'q6',
    unit: 'Unit 8: Graph Algorithms',
    unitNumber: 8,
    marks: 5,
    type: 'proof',
    question: 'Why does Dijkstra’s algorithm fail in graphs with negative-weight edges? Illustrate with a counterexample.',
    answerSummary: 'Dijkstra assumes once a vertex is marked visited, its shortest path is final (greedy property). Negative edges can subsequently reduce this distance.',
    modelAnswer: [
      'Core Reason: Dijkstra employs a greedy choice property. Once a vertex u is extracted from the priority queue and marked "visited", Dijkstra assumes that dist[u] is optimal and will never be relaxed again.',
      'Counterexample Graph:',
      'Vertices: S, A, B.',
      'Edges: S &rarr; A with weight 3; S &rarr; B with weight 5; B &rarr; A with weight -4.',
      'Execution of Dijkstra from source S:',
      '1. Distances: S=0, A=&infin;, B=&infin;.',
      '2. Relax neighbors of S: dist[A]=3, dist[B]=5.',
      '3. Extract min: Vertex A has min distance 3. Dijkstra marks A as visited (FINAL).',
      '4. Next extract B (dist 5). From B, edge B &rarr; A gives alternative distance 5 + (-4) = 1.',
      '5. Because A is already visited, Dijkstra ignores edge B &rarr; A or fails to propagate the reduction to downstream nodes.',
      'Result: True shortest path to A is S &rarr; B &rarr; A (cost 1), but Dijkstra outputs 3. Use Bellman-Ford algorithm for negative edges instead.'
    ],
    keyPoints: ['Greedy finality assumption', 'Counterexample diagram (S, A, B)', 'Bellman-Ford alternative'],
    kctExamTip: 'Drawing the 3-node graph with negative edge makes this an immediate 5/5 answer in the autonomous exam.'
  },
  {
    id: 'q7',
    unit: 'Unit 10: Greedy Technique',
    unitNumber: 10,
    marks: 2,
    type: 'definition',
    question: 'Differentiate Greedy technique from Dynamic Programming in terms of choice-making and subproblem independence.',
    answerSummary: 'Greedy makes the locally optimal choice without backtracking; DP solves all subproblems and combines them.',
    modelAnswer: [
      '1. Choice Timing: Greedy makes greedy choice before solving subproblems (top-down, no reconsideration). DP makes choice after solving overlapping subproblems (bottom-up or memoized).',
      '2. Optimality Guarantee: Greedy requires the Greedy-Choice Property and Optimal Substructure. DP only requires Optimal Substructure and Overlapping Subproblems.',
      '3. Efficiency: Greedy is typically O(n log n) or O(n) and faster; DP explores a polynomial table of states.'
    ],
    keyPoints: ['Locally optimal vs globally combined', 'Overlapping subproblems vs greedy choice', 'Efficiency differences'],
    kctExamTip: 'Use a clear 2-column comparative table in Part A for fast evaluation.'
  },
  {
    id: 'q8',
    unit: 'Unit 11: Backtracking',
    unitNumber: 11,
    marks: 5,
    type: 'proof',
    question: 'Explain the concept of State-Space Tree and Pruning (Bounding) in Backtracking with reference to the 4-Queens Problem.',
    answerSummary: 'A state-space tree represents all possible candidate configurations. Pruning discards branches violating constraints.',
    modelAnswer: [
      '1. State-Space Tree: A tree representation where the root represents the initial empty state, intermediate nodes represent partial assignments, and leaves represent complete configurations.',
      '2. Backtracking Search: Performs Depth-First Search on the state-space tree.',
      '3. Bounding Function / Pruning: A boolean test applied at each node. If adding a queen violates row, column, or diagonal attack constraints, the subtree rooted at that node is pruned (discarded) immediately without generating its descendants.',
      '4. 4-Queens Pruning Benefit: Total brute-force permutations = 4⁴ = 256. With backtracking pruning, only 62 nodes are visited to find both valid solutions [2, 4, 1, 3] and [3, 1, 4, 2].'
    ],
    keyPoints: ['State-space tree DFS', 'Bounding function constraint check', 'Branch pruning savings (256 vs 62 nodes)'],
    kctExamTip: 'Emphasize that pruning avoids generating infeasible subtrees, drastically reducing time from O(nⁿ) to feasible times.'
  }
];

interface MockExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const MOCK_EXAM_QUESTIONS: MockExamQuestion[] = [
  {
    id: 1,
    question: 'What is the tightest upper bound for the recurrence T(n) = 2T(n/2) + O(n)?',
    options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
    correctIndex: 1,
    explanation: 'By Master Theorem Case 2: a=2, b=2, log₂ 2 = 1. f(n) = n = Θ(n¹). Thus T(n) = Θ(n log n).'
  },
  {
    id: 2,
    question: 'Which algorithmic paradigm does Kruskal’s Minimum Spanning Tree algorithm follow?',
    options: ['Divide and Conquer', 'Dynamic Programming', 'Greedy Technique', 'Backtracking'],
    correctIndex: 2,
    explanation: 'Kruskal sorts all edges by weight and greedily selects the minimum weight edge that does not form a cycle.'
  },
  {
    id: 3,
    question: 'In 0/1 Knapsack problem with n items and capacity W, what is the time complexity of the dynamic programming approach?',
    options: ['O(n log n)', 'O(n · W)', 'O(2ⁿ)', 'O(W²)'],
    correctIndex: 1,
    explanation: 'The DP table has (n + 1) rows and (W + 1) columns. Filling each cell takes O(1) time, giving O(n · W) pseudo-polynomial time.'
  },
  {
    id: 4,
    question: 'Which sorting algorithm has a worst-case time complexity of O(n log n) and sorts in-place?',
    options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting Sort'],
    correctIndex: 2,
    explanation: 'Heap Sort guarantees O(n log n) worst-case time and O(1) auxiliary space (in-place). Merge Sort requires O(n) auxiliary space.'
  },
  {
    id: 5,
    question: 'What data structure is utilized in Breadth-First Search (BFS) to maintain frontier vertices?',
    options: ['LIFO Stack', 'FIFO Queue', 'Priority Queue', 'Disjoint-Set Union'],
    correctIndex: 1,
    explanation: 'BFS explores vertices level by level in First-In-First-Out (FIFO) queue order.'
  },
  {
    id: 6,
    question: 'What is the recurrence relation for the worst-case time complexity of Quick Sort?',
    options: ['T(n) = 2T(n/2) + O(n)', 'T(n) = T(n-1) + O(n)', 'T(n) = T(n/2) + O(1)', 'T(n) = 2T(n-1) + O(1)'],
    correctIndex: 1,
    explanation: 'When the partition is completely unbalanced (e.g. 0 elements on one side and n-1 on the other), T(n) = T(n-1) + O(n) = O(n²).'
  },
  {
    id: 7,
    question: 'Which problem is proven to be NP-Complete?',
    options: ['Single-source shortest path', 'Minimum Spanning Tree', '0/1 Knapsack decision problem', 'Merge sort'],
    correctIndex: 2,
    explanation: 'The 0/1 Knapsack decision problem is NP-Complete (reducible from Subset Sum).'
  },
  {
    id: 8,
    question: 'Why is ordinary Binary Search inapplicable to an unsorted singly linked list?',
    options: [
      'It cannot compare integers',
      'Arbitrary indexing arr[mid] takes O(n) time instead of O(1)',
      'Linked lists cannot store duplicates',
      'It requires a recursion stack'
    ],
    correctIndex: 1,
    explanation: 'Binary Search requires O(1) random access to find the middle element. In a singly linked list, reaching the middle requires traversing n/2 nodes, taking O(n) time.'
  },
  {
    id: 9,
    question: 'What is the primary condition for applying Dijkstra’s single-source shortest path algorithm?',
    options: [
      'Graph must be a DAG',
      'All edge weights must be non-negative',
      'Graph must be planar',
      'Number of edges must equal V - 1'
    ],
    correctIndex: 1,
    explanation: 'Dijkstra requires all edge weights to be non-negative (w(u, v) ≥ 0) due to greedy finality assumptions.'
  },
  {
    id: 10,
    question: 'What is the optimal substructure property?',
    options: [
      'An optimal solution to the problem contains within it optimal solutions to subproblems',
      'Subproblems must be completely independent with no overlap',
      'The problem must be solvable in polynomial time',
      'The algorithm must sort inputs before executing'
    ],
    correctIndex: 0,
    explanation: 'Optimal substructure means that the optimal solution to the overall problem is composed of optimal solutions to its constituent subproblems.'
  }
];

interface ExamPrepStudioProps {
  onBackToDashboard: () => void;
  onLaunchVisualizer: () => void;
  onOpenComplexityCalculator?: () => void;
}

export const ExamPrepStudio: React.FC<ExamPrepStudioProps> = ({
  onBackToDashboard,
  onLaunchVisualizer,
  onOpenComplexityCalculator
}) => {
  const [activeTab, setActiveTab] = useState<'part_a' | 'part_b' | 'viva' | 'invariants' | 'mock_exam'>('part_a');
  const [selectedUnit, setSelectedUnit] = useState<number | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('q1');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Exam State
  const [mockStarted, setMockStarted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins (900 seconds)

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (mockStarted && !mockSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setMockSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [mockStarted, mockSubmitted, timeLeft]);

  const handleStartMock = () => {
    soundFx.playClick();
    setUserAnswers({});
    setMockSubmitted(false);
    setTimeLeft(900);
    setMockStarted(true);
  };

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (mockSubmitted) return;
    soundFx.playClick();
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitMock = () => {
    soundFx.playSuccessChime();
    setMockSubmitted(true);
  };

  const score = MOCK_EXAM_QUESTIONS.reduce((acc, q) => {
    return userAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  // Filtered Questions for repository
  const filteredQuestions = EXAM_QUESTIONS.filter(q => {
    if (activeTab === 'part_a' && q.marks !== 2) return false;
    if (activeTab === 'part_b' && q.marks === 2) return false;
    if (selectedUnit !== 'all' && q.unitNumber !== selectedUnit) return false;
    if (searchQuery) {
      const sq = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(sq) ||
        q.answerSummary.toLowerCase().includes(sq) ||
        q.unit.toLowerCase().includes(sq)
      );
    }
    return true;
  });

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Breadcrumb */}
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
              onLaunchVisualizer();
            }}
            className="text-xs font-bold text-[#7B42F6] bg-[#EDE8FE] hover:bg-[#D4C7F5] px-3.5 py-1.5 rounded-full border border-[#D4C7F5] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>⚡ Launch Live Visualizer</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm shadow-[#8C52FF]/5 space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7B42F6]">
          <GraduationCap className="w-4 h-4 text-[#7B42F6]" />
          <span>KCT Autonomous 23CS401 Regulation Examination Hub</span>
          <span>•</span>
          <span>Semester IV Preparation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#201538] tracking-tight">
          DAA Autonomous Examination &amp; Viva Voce Preparation Center
        </h1>
        <p className="text-xs sm:text-sm text-[#5B507A] max-w-3xl leading-relaxed">
          Curated repository of Part A (2-Mark), Part B &amp; C (5-Mark &amp; 14-Mark) model question papers, formal loop invariant proofs, external examiner viva questions, and timed mock assessments tailored for KCT CBCS regulations.
        </p>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b-2 border-[#E5DCF9] pb-1 overflow-x-auto select-none">
        {[
          { id: 'part_a', label: '📝 Part A: 2-Mark Short Answer Bank' },
          { id: 'part_b', label: '📊 Part B & C: 5 & 14-Mark Analytical Problems' },
          { id: 'invariants', label: '🛡️ Loop Invariant & Correctness Proofs' },
          { id: 'viva', label: '🎙️ External Examiner Viva Voce Bank' },
          { id: 'mock_exam', label: '⏱️ Timed University Mock Exam (10 Qs)' }
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

      {/* TAB: PART A & PART B QUESTIONS REPOSITORY */}
      {(activeTab === 'part_a' || activeTab === 'part_b') && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#887D9F]" />
              <input
                type="text"
                placeholder="Search questions by concept (e.g. Master Theorem, Lomuto, Dijkstra)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium text-[#201538] placeholder-[#887D9F] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#887D9F] font-bold">Filter Unit:</span>
              <select
                value={selectedUnit}
                onChange={e => setSelectedUnit(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="text-xs font-bold text-[#201538] bg-[#F4F0FF] border border-[#D4C7F5] rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer"
              >
                <option value="all">All Syllabus Units</option>
                <option value={1}>Unit 1: Fundamentals</option>
                <option value={2}>Unit 2: Asymptotics &amp; Recurrences</option>
                <option value={6}>Unit 6: Sorting Algorithms</option>
                <option value={8}>Unit 8: Graph Algorithms</option>
                <option value={9}>Unit 9: Dynamic Programming</option>
                <option value={10}>Unit 10: Greedy Technique</option>
                <option value={11}>Unit 11: Backtracking</option>
              </select>
            </div>
          </div>

          {/* Question List Accordion */}
          <div className="space-y-3">
            {filteredQuestions.map(q => {
              const isExpanded = expandedId === q.id;
              return (
                <div
                  key={q.id}
                  className={`bg-white border-2 rounded-2xl transition-all shadow-2xs overflow-hidden ${
                    isExpanded ? 'border-[#7B42F6] ring-1 ring-[#D4C7F5]' : 'border-[#E5DCF9] hover:border-[#D4C7F5]'
                  }`}
                >
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setExpandedId(isExpanded ? null : q.id);
                    }}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#EDE8FE] text-[#7B42F6] border border-[#D4C7F5]">
                          {q.marks}-Mark Question
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#887D9F]">
                          {q.unit}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#201538]">
                        {q.question}
                      </h3>
                      {!isExpanded && (
                        <p className="text-xs text-[#5B507A] line-clamp-1">
                          {q.answerSummary}
                        </p>
                      )}
                    </div>
                    <span className="text-xs font-mono font-bold text-[#7B42F6] shrink-0 mt-1">
                      {isExpanded ? '▲ Hide' : '▼ Model Answer'}
                    </span>
                  </button>

                  {/* Expanded Model Answer */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 pt-0 border-t border-[#F0EBFD] space-y-4 bg-[#F8F6FE]/50">
                      <div className="space-y-2 pt-3">
                        <div className="text-xs font-mono font-bold text-[#7B42F6] uppercase tracking-wider">
                          Full Standard Model Answer (Expected for {q.marks} Marks):
                        </div>
                        <div className="bg-white border border-[#E5DCF9] rounded-2xl p-4 space-y-2 text-xs sm:text-sm text-[#201538] leading-relaxed font-mono">
                          {q.modelAnswer.map((line, idx) => (
                            <p key={idx} className={line.startsWith('   -') ? 'pl-4 text-[#5B507A]' : ''}>
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* Key Points & Exam Tip */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-[#EDE8FE] border border-[#D4C7F5] space-y-1">
                          <span className="font-bold text-[#4C1D95] font-mono uppercase text-[10px] block">
                            Key Evaluated Rubric Points:
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {q.keyPoints.map((pt, pIdx) => (
                              <span key={pIdx} className="bg-white px-2 py-0.5 rounded-md font-mono text-[11px] text-[#7B42F6] font-bold border border-[#D4C7F5]">
                                ✓ {pt}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#FFF7D6] border border-[#FFE082] space-y-1">
                          <span className="font-bold text-[#8C5300] font-mono uppercase text-[10px] block">
                            Autonomous Exam Scoring Tip:
                          </span>
                          <p className="text-[#8C5300] leading-relaxed">
                            {q.kctExamTip}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: LOOP INVARIANT & CORRECTNESS PROOFS */}
      {activeTab === 'invariants' && (
        <div className="space-y-4">
          <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-[#201538]">
              Formal Loop Invariant Verification Framework
            </h3>
            <p className="text-xs text-[#5B507A] leading-relaxed">
              Every iterative algorithm in KCT Autonomous Part B questions requires a 3-part mathematical induction proof:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#EDE8FE] border border-[#D4C7F5] space-y-2">
                <span className="text-xs font-mono font-black text-[#7B42F6] uppercase">
                  1. Initialization
                </span>
                <p className="text-xs text-[#5B507A] leading-relaxed">
                  The loop invariant is true prior to the first iteration of the loop (corresponds to the Base Case of induction).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF7D6] border border-[#FFE082] space-y-2">
                <span className="text-xs font-mono font-black text-[#8C5300] uppercase">
                  2. Maintenance
                </span>
                <p className="text-xs text-[#5B507A] leading-relaxed">
                  If it is true before an iteration of the loop, it remains true before the next iteration (Inductive Step).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] space-y-2">
                <span className="text-xs font-mono font-black text-[#047857] uppercase">
                  3. Termination
                </span>
                <p className="text-xs text-[#065F46] leading-relaxed">
                  When the loop terminates, the invariant gives us a useful property that helps show that the algorithm is correct.
                </p>
              </div>
            </div>

            {/* Invariant Example: Lomuto Partition */}
            <div className="pt-2 space-y-2">
              <h4 className="text-sm font-bold text-[#201538]">
                Lomuto Partitioning Invariant (Quick Sort):
              </h4>
              <div className="p-4 rounded-2xl bg-[#1E1435] text-purple-200 font-mono text-xs space-y-2 border border-[#2E2050]">
                <div>// Loop Invariant for index k between low and high-1:</div>
                <div>1. If low &le; k &le; i, then A[k] &le; pivot.</div>
                <div>2. If i + 1 &le; k &le; j - 1, then A[k] &gt; pivot.</div>
                <div>3. If k = high, then A[k] = pivot.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: VIVA VOCE DEFENSE BANK */}
      {activeTab === 'viva' && (
        <div className="space-y-4">
          <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <h3 className="text-base font-black text-[#201538]">
                Top 10 DAA Laboratory External Examiner Viva Questions
              </h3>
            </div>
            <p className="text-xs text-[#5B507A]">
              Frequently asked oral questions during external lab examinations with crisp, high-scoring verbal responses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                {
                  q: 'Why is Quick Sort widely preferred over Merge Sort for internal memory sorting?',
                  a: 'Quick Sort has better cache locality, lower constant overhead, and sorts in-place (O(log n) stack space vs Merge Sort O(n) auxiliary array).'
                },
                {
                  q: 'What is the difference between Kruskal and Prim algorithms for MST?',
                  a: 'Kruskal grows a forest by picking globally smallest edges without cycles (good for sparse graphs, O(E log E)). Prim grows a single tree by adding nearest vertices (good for dense graphs, O(V² or E + V log V)).'
                },
                {
                  q: 'Why does 0/1 Knapsack require dynamic programming while Fractional Knapsack can be solved greedily?',
                  a: 'Fractional knapsack has the greedy-choice property (we can take fractional amounts of highest value-density item). In 0/1, taking a high-density item can leave unusable wasted capacity.'
                },
                {
                  q: 'What is a strongly connected component in directed graphs?',
                  a: 'A maximal sub-graph where there is a directed path from every vertex to every other vertex in that component (computed via Kosaraju or Tarjan algorithms in O(V + E)).'
                }
              ].map((v, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8F6FE] border border-[#E5DCF9] space-y-2">
                  <div className="text-xs font-bold text-[#201538]">
                    Q{idx + 1}: {v.q}
                  </div>
                  <div className="text-xs text-[#5B507A] leading-relaxed bg-white p-3 rounded-xl border border-[#D4C7F5]">
                    <span className="font-bold text-[#10B981]">Model Response: </span>
                    {v.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: TIMED UNIVERSITY MOCK EXAM */}
      {activeTab === 'mock_exam' && (
        <div className="space-y-4">
          {!mockStarted ? (
            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-8 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#EDE8FE] text-[#7B42F6] flex items-center justify-center mx-auto text-2xl font-black">
                ⏱️
              </div>
              <h3 className="text-xl font-black text-[#201538]">
                KCT 23CS401 Timed Mock Examination
              </h3>
              <p className="text-xs text-[#5B507A] leading-relaxed max-w-md mx-auto">
                10 multiple-choice questions covering all core DAA units: Asymptotic Notations, Recurrences, Sorting, DP, Graphs, and Greedy Choice.
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs font-mono max-w-sm mx-auto">
                <div className="p-2 bg-[#F8F6FE] rounded-xl border border-[#E5DCF9]">
                  <div className="text-[#887D9F]">Questions</div>
                  <div className="font-black text-[#201538] text-sm">10</div>
                </div>
                <div className="p-2 bg-[#F8F6FE] rounded-xl border border-[#E5DCF9]">
                  <div className="text-[#887D9F]">Duration</div>
                  <div className="font-black text-[#7B42F6] text-sm">15 Mins</div>
                </div>
                <div className="p-2 bg-[#F8F6FE] rounded-xl border border-[#E5DCF9]">
                  <div className="text-[#887D9F]">Pass Mark</div>
                  <div className="font-black text-[#10B981] text-sm">70%</div>
                </div>
              </div>
              <button
                onClick={handleStartMock}
                className="px-8 py-3 rounded-full bg-[#7B42F6] hover:bg-[#6830E0] text-white font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                Begin Timed Mock Assessment
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Exam Sticky Command Bar */}
              <div className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-4 flex items-center justify-between shadow-sm sticky top-16 z-20">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black text-[#7B42F6]">
                    Answered: {Object.keys(userAnswers).length} / {MOCK_EXAM_QUESTIONS.length}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#F5B800] bg-[#FFF7D6] px-3 py-1 rounded-xl border border-[#FFE082]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Time Remaining: {formatTimer(timeLeft)}</span>
                  </div>

                  {!mockSubmitted ? (
                    <button
                      onClick={handleSubmitMock}
                      className="px-5 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={handleStartMock}
                      className="px-4 py-1.5 bg-[#7B42F6] hover:bg-[#6830E0] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retake</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Exam Results Scorecard if submitted */}
              {mockSubmitted && (
                <div className="bg-[#1E1435] text-white rounded-3xl p-6 shadow-xl space-y-3 border border-[#2E2050]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F5B800] font-bold uppercase tracking-wider">
                      ASSESSMENT SUMMARY
                    </span>
                    <span className="text-purple-200">KCT 23CS401 Criteria</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-[#10B981]">
                      {score} / {MOCK_EXAM_QUESTIONS.length}
                    </span>
                    <span className="text-sm font-bold text-purple-200">
                      ({((score / MOCK_EXAM_QUESTIONS.length) * 100).toFixed(0)}% Score)
                    </span>
                  </div>
                  <p className="text-xs text-purple-200/80">
                    {score >= 8
                      ? 'Outstanding performance! You have high mastery of core DAA concepts.'
                      : score >= 6
                      ? 'Good attempt. Review the detailed explanations below to cement difficult recurrence and graph questions.'
                      : 'Keep practicing. Revisit the Asymptotic Growth Lab and step walkthroughs.'}
                  </p>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-4">
                {MOCK_EXAM_QUESTIONS.map((q, idx) => {
                  const selectedOpt = userAnswers[q.id];
                  const isCorrect = selectedOpt === q.correctIndex;

                  return (
                    <div
                      key={q.id}
                      className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-5 shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-xs font-bold text-[#201538] flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#EDE8FE] text-[#7B42F6] flex items-center justify-center font-mono font-black text-[11px] shrink-0">
                            {idx + 1}
                          </span>
                          <span>{q.question}</span>
                        </div>
                        {mockSubmitted && (
                          <span>
                            {isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-500" />
                            )}
                          </span>
                        )}
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt, oIdx) => {
                          const isSelected = selectedOpt === oIdx;
                          let optClass = 'bg-[#F8F6FE] border-[#E5DCF9] text-[#201538] hover:border-[#7B42F6]';

                          if (isSelected) {
                            optClass = 'bg-[#EDE8FE] border-[#7B42F6] text-[#7B42F6] font-bold ring-1 ring-[#7B42F6]';
                          }
                          if (mockSubmitted) {
                            if (oIdx === q.correctIndex) {
                              optClass = 'bg-[#ECFDF5] border-[#10B981] text-[#065F46] font-bold';
                            } else if (isSelected && !isCorrect) {
                              optClass = 'bg-rose-50 border-rose-300 text-rose-800';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={mockSubmitted}
                              onClick={() => handleSelectOption(q.id, oIdx)}
                              className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center gap-2 ${optClass}`}
                            >
                              <span className="font-mono text-[10px] font-bold opacity-70">
                                {String.fromCharCode(65 + oIdx)}.
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation if submitted */}
                      {mockSubmitted && (
                        <div className="p-3 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9] text-xs text-[#5B507A] space-y-1">
                          <div className="font-bold text-[#7B42F6] font-mono text-[11px]">
                            Explanation:
                          </div>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
