import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Sparkles, HelpCircle, X, ExternalLink } from 'lucide-react';

export interface GlossaryDefinition {
  term: string;
  category: 'Analysis' | 'Paradigm' | 'Proof Technique' | 'Memory' | 'Data Structure' | 'Complexity';
  definition: string;
  firstYearExplanation: string;
  analogy: string;
  examTip: string;
  relatedTerms?: string[];
}

export const DAA_GLOSSARY: Record<string, GlossaryDefinition> = {
  asymptotic: {
    term: 'Asymptotic Analysis',
    category: 'Analysis',
    definition: 'Evaluating the performance and resource consumption of an algorithm as the input size n approaches infinity (n → ∞).',
    firstYearExplanation: 'Instead of measuring seconds (which changes on faster or slower laptops), we count how operations scale when n grows from 10 to 1,000,000.',
    analogy: 'Comparing a bicycle vs a rocket: even an old rocket beats a sports bike once the distance is 100,000 km.',
    examTip: 'Always drop constant factors (like 4n) and lower order terms (like + 15) to express in Big-O form.',
    relatedTerms: ['Big-O', 'Big-Omega', 'Time Complexity']
  },
  invariants: {
    term: 'Loop Invariants',
    category: 'Proof Technique',
    definition: 'A formal mathematical condition that is unconditionally TRUE before, during, and after every iteration of a loop.',
    firstYearExplanation: 'The guarantee that your algorithm is making steady progress without breaking anything already completed.',
    analogy: 'A car odometer: no matter what gears you switch or which road you take, the mileage strictly never decreases.',
    examTip: 'To score full marks on 16-mark proof questions, always write all 3 stages: 1. Initialization, 2. Maintenance, 3. Termination.',
    relatedTerms: ['Time Complexity', 'Optimal Substructure']
  },
  'loop invariant': {
    term: 'Loop Invariant',
    category: 'Proof Technique',
    definition: 'A formal assertion about variables that remains valid across every loop cycle to prove total algorithmic correctness.',
    firstYearExplanation: 'A checkpoint condition: "At the start of pass i, array[0..i-1] is guaranteed to be completely sorted."',
    analogy: 'Stacking bricks: each brick layer added maintains the levelness of the whole wall.',
    examTip: 'State the exact index boundaries (e.g., A[0..i-1] is sorted) in both Part A and Part B answers.',
    relatedTerms: ['Invariants', 'Asymptotic']
  },
  'time complexity': {
    term: 'Time Complexity',
    category: 'Analysis',
    definition: 'The quantification of the amount of computational time an algorithm takes to run as a function of the length of the input.',
    firstYearExplanation: 'The rate at which elementary steps (comparisons, additions, swaps) grow as input size n gets bigger.',
    analogy: 'Looking for a name in an unsorted phonebook: O(n) checking page by page vs O(log n) jumping to the middle.',
    examTip: 'Distinguish between Best Case Ω(n), Average Case Θ(n), and Worst Case O(n).',
    relatedTerms: ['Asymptotic', 'Space Complexity']
  },
  'space complexity': {
    term: 'Space Complexity',
    category: 'Memory',
    definition: 'The total amount of working memory storage that an algorithm requires during execution, including input storage and auxiliary memory.',
    firstYearExplanation: 'How much RAM your program consumes when handling n elements.',
    analogy: 'Moving houses: total space is the furniture (input) plus the moving boxes used temporarily (auxiliary space).',
    examTip: 'Most university questions ask specifically for Auxiliary Space (ignoring the input array itself).',
    relatedTerms: ['Auxiliary Space', 'In-Place']
  },
  'auxiliary space': {
    term: 'Auxiliary Space',
    category: 'Memory',
    definition: 'The temporary or extra working memory allocated by an algorithm beyond the memory occupied by the input itself.',
    firstYearExplanation: 'Extra arrays, recursion call stacks, or pointers created while the algorithm runs.',
    analogy: 'The scratchpad paper you use during an exam: your question paper is the input, scratchpad is auxiliary space.',
    examTip: 'In-place algorithms (like QuickSort or HeapSort) use O(1) or O(log n) auxiliary space, whereas MergeSort requires O(n).',
    relatedTerms: ['Space Complexity', 'In-Place']
  },
  'optimal substructure': {
    term: 'Optimal Substructure',
    category: 'Paradigm',
    definition: 'A problem exhibits optimal substructure if an optimal solution to the entire problem can be constructed from optimal solutions of its subproblems.',
    firstYearExplanation: 'Solving the big problem by combining the best solutions to smaller pieces of the same problem.',
    analogy: 'Finding the shortest route from Chennai to Delhi through Nagpur: the sub-path from Chennai to Nagpur must also be the shortest route.',
    examTip: 'This is the mandatory requirement for both Dynamic Programming (Bellman principle) and Greedy algorithms.',
    relatedTerms: ['Subproblems', 'Dynamic Programming', 'Greedy Choice']
  },
  'overlapping subproblems': {
    term: 'Overlapping Subproblems',
    category: 'Paradigm',
    definition: 'A computational property where recursive algorithms revisit and solve the exact same smaller subproblems repeatedly.',
    firstYearExplanation: 'When computing fib(5), you need fib(3) twice. Instead of calculating it twice, DP remembers the result.',
    analogy: 'Writing down answers to math tables so you do not have to multiply from scratch each time.',
    examTip: 'Contrast with Divide-and-Conquer: MergeSort subproblems are independent; DP subproblems overlap.',
    relatedTerms: ['Optimal Substructure', 'Memoization', 'Dynamic Programming']
  },
  'greedy choice': {
    term: 'Greedy Choice Property',
    category: 'Paradigm',
    definition: 'The algorithmic property that a globally optimal solution can be arrived at by making locally optimal (best at current moment) choices.',
    firstYearExplanation: 'Grab the immediate best option right now without worrying about future consequences.',
    analogy: 'Dispensing change with coins: always give the largest coin possible first (50, 20, 10, etc.).',
    examTip: 'Greedy does NOT work for 0/1 Knapsack (items cannot be split), but works perfectly for Fractional Knapsack and Kruskal.',
    relatedTerms: ['Optimal Substructure', 'Dynamic Programming']
  },
  'divide and conquer': {
    term: 'Divide and Conquer',
    category: 'Paradigm',
    definition: 'An algorithmic design paradigm that divides a problem into non-overlapping subproblems, recursively solves them, and combines their solutions.',
    firstYearExplanation: 'Split the hard work in half, give each half to a teammate, then merge the two finished halves.',
    analogy: 'Organizing a large library by splitting books across two floors, then four rooms, then sorting each small shelf.',
    examTip: 'Three formal steps in every exam answer: 1. Divide (split input), 2. Conquer (solve subproblems recursively), 3. Combine (merge).',
    relatedTerms: ['Recurrence Relation', 'Master Theorem']
  },
  'recurrence relation': {
    term: 'Recurrence Relation',
    category: 'Analysis',
    definition: 'An equation or inequality that defines the runtime function T(n) recursively in terms of its values on smaller inputs (e.g. T(n) = 2T(n/2) + O(n)).',
    firstYearExplanation: 'A math formula describing how long the recursive algorithm takes based on its subproblems.',
    analogy: 'A domino chain: the time for n dominoes depends on the time for the first plus the remaining n-1.',
    examTip: 'Solved using 3 methods: Substitution Method, Recursion Tree Method, or Master Theorem.',
    relatedTerms: ['Master Theorem', 'Divide and Conquer']
  },
  'master theorem': {
    term: 'Master Theorem',
    category: 'Analysis',
    definition: 'A formulaic recipe to solve divide-and-conquer recurrence relations of the form T(n) = a·T(n/b) + f(n) by comparing n^(log_b a) with f(n).',
    firstYearExplanation: 'The cheat code for recurrence relations: compare subproblem branch growth against non-recursive merge work.',
    analogy: 'Tug-of-war between recursion branching (a) and combining cost (f(n)).',
    examTip: 'There are 3 standard cases. Remember: b > 1, a >= 1. If f(n) is not a polynomial, Master Theorem does not apply.',
    relatedTerms: ['Recurrence Relation', 'Asymptotic']
  },
  'branch and bound': {
    term: 'Branch and Bound (B&B)',
    category: 'Paradigm',
    definition: 'A state space search algorithm that systematically explores all candidate solutions while computing upper and lower bounds to prune hopeless branches.',
    firstYearExplanation: 'Like exploring a maze with a smart map: if a branch cannot possibly beat the best path found so far, throw it away immediately.',
    analogy: 'Shopping for flight tickets: if a flight with a layover is already $800, stop checking its connecting gates if you already found a direct flight for $500.',
    examTip: 'Key difference from Backtracking: B&B solves optimization problems using bounding functions; Backtracking solves decision problems.',
    relatedTerms: ['State Space Tree', 'Backtracking']
  },
  'state space tree': {
    term: 'State Space Tree',
    category: 'Data Structure',
    definition: 'A conceptual rooted tree representing all feasible states, choices, and partial solutions in an algorithmic search problem.',
    firstYearExplanation: 'A decision map where each fork is a choice you can make (e.g. include item or exclude item).',
    analogy: 'A family genealogy tree showing all possible ancestral lineages.',
    examTip: 'Draw the root node at level 0. Clearly mark pruned dead-end nodes with an "X" or cross in university answer sheets.',
    relatedTerms: ['Branch and Bound', 'Backtracking']
  },
  memoization: {
    term: 'Memoization',
    category: 'Paradigm',
    definition: 'A top-down optimization technique in dynamic programming that caches the return values of expensive recursive calls in a lookup table.',
    firstYearExplanation: 'Write it down in your notebook so you never have to re-solve the same calculation twice.',
    analogy: 'Checking your phone contacts instead of memorizing all phone numbers every time you call.',
    examTip: 'Top-down with recursion table = Memoization; Bottom-up with iterative loops = Tabulation.',
    relatedTerms: ['Tabulation', 'Overlapping Subproblems', 'Dynamic Programming']
  },
  tabulation: {
    term: 'Tabulation',
    category: 'Paradigm',
    definition: 'A bottom-up dynamic programming approach that fills a 1D or 2D table sequentially starting from base cases up to the required target value.',
    firstYearExplanation: 'Filling an Excel spreadsheet starting from row 0, column 0 up to the bottom-right target cell.',
    analogy: 'Building a staircase from the ground floor up to the roof, one step at a time.',
    examTip: 'Avoids recursion stack overflow errors and generally has better cache locality than memoization.',
    relatedTerms: ['Memoization', 'Dynamic Programming']
  },
  'lomuto partition': {
    term: 'Lomuto Partition',
    category: 'Analysis',
    definition: 'A QuickSort partitioning scheme that picks the last element as pivot and uses a single index i to track the boundary of elements smaller than the pivot.',
    firstYearExplanation: 'Walk through the array with pointer j; whenever arr[j] < pivot, increment i and swap arr[i] with arr[j].',
    analogy: 'Sorting books on a desk by pushing all thin books to the left and thick books to the right.',
    examTip: 'Easier to code and trace in exams than Hoare partition, but executes approximately 3 times more element swaps.',
    relatedTerms: ['Divide and Conquer', 'Loop Invariant']
  },
  'topological sort': {
    term: 'Topological Sort',
    category: 'Paradigm',
    definition: 'A linear arrangement of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), vertex u appears before vertex v.',
    firstYearExplanation: 'The order in which you must take prerequisite university courses before graduating.',
    analogy: 'Getting dressed in the morning: socks before shoes, shirt before jacket.',
    examTip: 'Only possible on DAGs (graphs with NO directed cycles). Implemented via Kahn\'s In-Degree Algorithm or DFS Finish Times.',
    relatedTerms: ['Optimal Substructure']
  },
  'big-o': {
    term: 'Big-O Notation (O)',
    category: 'Complexity',
    definition: 'Asymptotic upper bound: f(n) = O(g(n)) means f(n) <= c·g(n) for all n >= n0 and constant c > 0.',
    firstYearExplanation: 'The worst-case scenario: "My algorithm will take AT MOST this many steps."',
    analogy: 'An insurance guarantee: your hospital bill will not exceed $5,000.',
    examTip: 'Strict formal definition requires specifying the positive constants c and n0.',
    relatedTerms: ['Big-Omega', 'Big-Theta', 'Asymptotic']
  },
  'big-omega': {
    term: 'Big-Omega Notation (Ω)',
    category: 'Complexity',
    definition: 'Asymptotic lower bound: f(n) = Ω(g(n)) means f(n) >= c·g(n) for all n >= n0 and constant c > 0.',
    firstYearExplanation: 'The best-case scenario: "My algorithm will take AT LEAST this many steps."',
    analogy: 'Minimum flight time: regardless of tailwinds, a flight cannot take less than 1 hour.',
    examTip: 'Used to prove fundamental lower limits (e.g. comparison sorting is Ω(n log n)).',
    relatedTerms: ['Big-O', 'Big-Theta', 'Asymptotic']
  },
  'big-theta': {
    term: 'Big-Theta Notation (Θ)',
    category: 'Complexity',
    definition: 'Asymptotic tight bound: f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and f(n) = Ω(g(n)).',
    firstYearExplanation: 'The exact sandwich bound: the algorithm runs within this curve in both best and worst cases.',
    analogy: 'A fixed-price lunch buffet: always exactly $15 regardless of how much you eat.',
    examTip: 'When best case and worst case have the same rate of growth (e.g., MergeSort is always n log n), write Θ(n log n).',
    relatedTerms: ['Big-O', 'Big-Omega']
  },
  subproblem: {
    term: 'Subproblem',
    category: 'Paradigm',
    definition: 'A smaller instance of the same general computational problem, whose solution helps construct the overall solution.',
    firstYearExplanation: 'A bite-sized piece of the main challenge that looks identical in structure but has smaller input size.',
    analogy: 'Solving a 9x9 Sudoku by first solving a 3x3 sub-grid.',
    examTip: 'State the subproblem definition clearly in DP answers (e.g. let DP[i][w] be max profit using first i items and capacity w).',
    relatedTerms: ['Optimal Substructure', 'Overlapping Subproblems']
  },
  subproblems: {
    term: 'Subproblem Decomposition',
    category: 'Paradigm',
    definition: 'The process of partitioning a high-dimensional problem into smaller, manageable subproblem instances.',
    firstYearExplanation: 'Breaking down a complex task into smaller independent or memoized steps.',
    analogy: 'Assembling a car by building the engine, chassis, and doors separately before final assembly.',
    examTip: 'In Divide & Conquer, subproblems are disjoint. In Dynamic Programming, subproblems overlap.',
    relatedTerms: ['Subproblem', 'Divide and Conquer', 'Dynamic Programming']
  }
};

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({
  term,
  children,
  className = '',
  showIcon = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Normalize key to lookup in glossary dictionary
  const lookupKey = term.trim().toLowerCase();
  const definition = DAA_GLOSSARY[lookupKey] || {
    term: term,
    category: 'Analysis',
    definition: `Key technical concept in Design and Analysis of Algorithms (DAA 23CS401).`,
    firstYearExplanation: `Fundamental concept used to evaluate time, space, and mathematical correctness in autonomous syllabus.`,
    analogy: `Helps simplify complex computer science calculations into manageable components.`,
    examTip: `Remember to state clear assumptions and step-by-step reasoning in autonomous exam dry runs.`
  };

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipWidth = 320;
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;
      
      // Keep within viewport horizontal bounds
      if (left < 12) left = 12;
      if (left + tooltipWidth > window.innerWidth - 12) {
        left = window.innerWidth - tooltipWidth - 12;
      }
      
      let top = rect.bottom + 8;
      // If too close to bottom of screen, flip upwards
      if (top + 220 > window.innerHeight && rect.top > 240) {
        top = rect.top - 210;
      }

      setCoords({ x: left, y: top });
    }
  };

  const handleMouseEnter = () => {
    updatePosition();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    updatePosition();
    setIsOpen(!isOpen);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleDocumentClick);
    }
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [isOpen]);

  const categoryColor: Record<string, string> = {
    Analysis: 'bg-[#EDE8FE] text-[#7B42F6] border-[#D4C7F5]',
    Paradigm: 'bg-[#FFF7D6] text-[#8C5300] border-[#FFE082]',
    'Proof Technique': 'bg-[#EBF7E3] text-[#33691E] border-[#C5E1A5]',
    Memory: 'bg-sky-50 text-sky-800 border-sky-200',
    'Data Structure': 'bg-pink-50 text-pink-800 border-pink-200',
    Complexity: 'bg-amber-50 text-amber-800 border-amber-200'
  };

  return (
    <span
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`inline-flex items-center gap-1 cursor-help border-b-2 border-dotted border-[#7B42F6]/60 hover:border-[#7B42F6] hover:bg-[#F4F0FF]/80 rounded-xs px-0.5 transition-colors group relative ${className}`}
      title={`Click or hover to learn what "${definition.term}" means`}
    >
      <span className="font-semibold text-inherit">{children || term}</span>
      {showIcon && (
        <HelpCircle className="w-3 h-3 text-[#7B42F6] opacity-70 group-hover:opacity-100 transition-opacity" />
      )}

      {isOpen && coords && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            width: '320px',
            zIndex: 9999
          }}
          className="bg-white border-2 border-[#7B42F6] rounded-2xl p-4 shadow-xl shadow-[#7B42F6]/15 text-left text-xs text-[#201538] space-y-2.5 animate-in fade-in-50 zoom-in-95 pointer-events-auto"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 border-b border-[#E5DCF9] pb-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-full border shadow-2xs font-sans tracking-wide"
                  style={{
                    backgroundColor: definition.category === 'Paradigm' ? '#FEF9C3' : '#EDE8FE',
                    color: definition.category === 'Paradigm' ? '#854D0E' : '#6B32E8',
                    borderColor: definition.category === 'Paradigm' ? '#FDE047' : '#D4C7F5'
                  }}
                >
                  {definition.category}
                </span>
                <span className="text-[10px] font-mono text-[#887D9F]">DAA 1st-Year Guide</span>
              </div>
              <h4 className="text-sm font-black text-[#201538] mt-1">
                {definition.term}
              </h4>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#887D9F] hover:bg-[#F4F0FF] hover:text-[#201538] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simple Explanation for 1st Year Students */}
          <div className="bg-[#F8F6FE] p-2.5 rounded-xl border border-[#E5DCF9] space-y-1">
            <span className="text-[10px] font-extrabold text-[#7B42F6] font-mono uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FFB800]" />
              In Simple Student Words:
            </span>
            <p className="text-[11px] text-[#201538] font-medium leading-relaxed">
              {definition.firstYearExplanation}
            </p>
          </div>

          {/* Real-World Analogy */}
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-[#887D9F] uppercase tracking-wider block font-mono">
              💡 Real-Life Analogy
            </span>
            <p className="text-[11px] text-[#5B507A] italic leading-relaxed">
              &quot;{definition.analogy}&quot;
            </p>
          </div>

          {/* Exam Tip */}
          <div className="bg-[#FFFBEB] p-2 rounded-xl border border-[#FDE68A] flex items-start gap-1.5 text-[11px] text-[#92400E]">
            <span className="font-black text-xs leading-none mt-0.5">🎓</span>
            <div className="leading-snug">
              <strong>KCT Exam Tip:</strong> {definition.examTip}
            </div>
          </div>
        </div>
      )}
    </span>
  );
};
