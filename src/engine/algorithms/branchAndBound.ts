// Branch and Bound: 0/1 Knapsack B&B, Traveling Salesperson B&B, and 15-Puzzle B&B
import { AlgorithmStep } from '../types';

export function generateKnapsackBranchBoundSteps(): AlgorithmStep[] {
  const weights = [2, 3, 4, 5];
  const values = [3, 4, 5, 8];
  const capacity = 5;
  const n = weights.length;

  const steps: AlgorithmStep[] = [];

  // Tree nodes representing state-space tree
  steps.push({
    stepIndex: 0,
    totalSteps: 8,
    description: `Branch & Bound 0/1 Knapsack: Root Node (Level 0). Compute initial upper bound using fractional relaxation. Bound = 9.4, Capacity = ${capacity}.`,
    codeLine: 1,
    variables: {
      level: '0 (Root)',
      current_weight: '0',
      current_value: '0',
      upper_bound: '9.4',
      best_value: '0',
      status: 'Explore Branches'
    },
    comparisonsCount: 1,
    swapsCount: 0,
    stats: { comparisons: 1, swaps: 0, operations: 1 }
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 8,
    description: `Subproblem 1 (Include Item 1): wt=2, val=3. New weight = 2 <= 5. Compute upper bound for left child: Bound = 3 + (4 + 5 * 0.4) = 9.4. Promising node, add to Priority Queue.`,
    codeLine: 2,
    variables: {
      subproblem: 'Branch Left (Item 1 IN)',
      current_weight: '2',
      current_value: '3',
      upper_bound: '9.4',
      best_value: '3',
      action: 'Enqueued'
    },
    comparisonsCount: 2,
    swapsCount: 0,
    stats: { comparisons: 2, swaps: 0, operations: 2 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 8,
    description: `Subproblem 2 (Exclude Item 1): wt=0, val=0. Compute upper bound for right child: Bound = (4 + 5 + 8 * 0.2) = 8.6. Enqueue right child.`,
    codeLine: 3,
    variables: {
      subproblem: 'Branch Right (Item 1 OUT)',
      current_weight: '0',
      current_value: '0',
      upper_bound: '8.6',
      best_value: '3',
      action: 'Enqueued'
    },
    comparisonsCount: 3,
    swapsCount: 0,
    stats: { comparisons: 3, swaps: 0, operations: 3 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 8,
    description: `Subproblem 3 (From Node 1, Include Item 2): wt=2+3=5, val=3+4=7. Knapsack capacity 5 reached exactly! Update Best Value so far: max_value = 7.`,
    codeLine: 4,
    variables: {
      subproblem: 'Item 2 IN (Full Capacity)',
      current_weight: '5',
      current_value: '7',
      upper_bound: '7.0',
      best_value: '7',
      action: 'Feasible Solution Updated'
    },
    comparisonsCount: 4,
    swapsCount: 0,
    stats: { comparisons: 4, swaps: 0, operations: 4 }
  });

  steps.push({
    stepIndex: 4,
    totalSteps: 8,
    description: `Subproblem 4 (Include Item 3 from Node 1): wt=2+4=6 > 5. Capacity exceeded! Prune this branch immediately (Infeasible node pruned).`,
    codeLine: 5,
    variables: {
      subproblem: 'Item 3 IN',
      current_weight: '6 > 5',
      current_value: '8',
      status: 'PRUNED (Capacity Violation)',
      best_value: '7',
      action: 'Discard Branch'
    },
    comparisonsCount: 5,
    swapsCount: 0,
    stats: { comparisons: 5, swaps: 0, operations: 5 }
  });

  steps.push({
    stepIndex: 5,
    totalSteps: 8,
    description: `Subproblem 5 (Explore Node with Item 1 OUT): Bound = 8.6. Branch into Item 2 (wt=3, val=4), then Item 4 (wt=5, val=8, wt=5, val=8 > 7). New Best Value = 8!`,
    codeLine: 6,
    variables: {
      subproblem: 'Branch Right Explore',
      current_weight: '5',
      current_value: '8',
      upper_bound: '8.0',
      best_value: '8',
      action: 'Best Solution Updated to 8'
    },
    comparisonsCount: 7,
    swapsCount: 0,
    stats: { comparisons: 7, swaps: 0, operations: 7 }
  });

  steps.push({
    stepIndex: 6,
    totalSteps: 8,
    description: `Pruning Check: Remaining nodes in queue have upper bound <= 8. Since bound <= best_value, prune all remaining branches without expanding!`,
    codeLine: 7,
    variables: {
      subproblem: 'Bounding & Pruning',
      pruned_subtrees: '3 Subtrees Pruned',
      best_value: '8',
      rule: 'Upper Bound <= Best Known',
      savings: 'Avoided 2^4 = 16 full evaluations'
    },
    comparisonsCount: 9,
    swapsCount: 0,
    stats: { comparisons: 9, swaps: 0, operations: 9 }
  });

  steps.push({
    stepIndex: 7,
    totalSteps: 8,
    description: `Branch & Bound Complete: Optimal Knapsack Value = 8 (Selected Item 4 with wt=5, val=8). State Space Tree pruned 65% of subproblems!`,
    codeLine: 8,
    variables: {
      optimal_profit: '8',
      optimal_items: 'Item 4 (wt=5, val=8)',
      nodes_explored: '6 of 31',
      complexity: 'O(2^n) worst, O(n) average with good bounds'
    },
    comparisonsCount: 10,
    swapsCount: 0,
    stats: { comparisons: 10, swaps: 0, operations: 10 }
  });

  return steps;
}

export function generateTspBranchBoundSteps(): AlgorithmStep[] {
  const steps: AlgorithmStep[] = [];

  steps.push({
    stepIndex: 0,
    totalSteps: 6,
    description: 'Traveling Salesperson (TSP) Branch & Bound: Root Node. Reduce cost matrix by subtracting minimums from each row and column. Reduced Matrix Lower Bound = 25.',
    codeLine: 1,
    variables: {
      current_node: 'Root (City A)',
      lower_bound: '25',
      visited_path: '[A]',
      status: 'Initial Reduced Matrix'
    },
    comparisonsCount: 4,
    swapsCount: 0,
    stats: { comparisons: 4, swaps: 0, operations: 4 }
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 6,
    description: 'Subproblem 1 (Branch A → B): Set row A and col B to infinity, set (B, A) to infinity. Reduce matrix: Lower Bound = 25 + cost(A, B) + reduction = 35.',
    codeLine: 2,
    variables: {
      branch: 'A → B',
      lower_bound: '35',
      visited_path: '[A, B]',
      action: 'Enqueue Node (Cost 35)'
    },
    comparisonsCount: 8,
    swapsCount: 0,
    stats: { comparisons: 8, swaps: 0, operations: 8 }
  });

  steps.push({
    stepIndex: 2,
    totalSteps: 6,
    description: 'Subproblem 2 (Branch A → C): Reduce matrix for subpath A → C. Lower Bound = 25 + cost(A, C) + reduction = 28. More promising than path to B!',
    codeLine: 3,
    variables: {
      branch: 'A → C',
      lower_bound: '28',
      visited_path: '[A, C]',
      action: 'Selected as Best-First Node'
    },
    comparisonsCount: 12,
    swapsCount: 0,
    stats: { comparisons: 12, swaps: 0, operations: 12 }
  });

  steps.push({
    stepIndex: 3,
    totalSteps: 6,
    description: 'Subproblem 3 (From C, Branch C → D): Set row C and col D to infinity. Matrix reduction gives Lower Bound = 28 + cost(C, D) = 31.',
    codeLine: 4,
    variables: {
      branch: 'A → C → D',
      lower_bound: '31',
      visited_path: '[A, C, D]',
      action: 'Next choice is only city B'
    },
    comparisonsCount: 16,
    swapsCount: 0,
    stats: { comparisons: 16, swaps: 0, operations: 16 }
  });

  steps.push({
    stepIndex: 4,
    totalSteps: 6,
    description: 'Subproblem 4 (Complete Tour A → C → D → B → A): Total Tour Cost = 31 + cost(D, B) + cost(B, A) = 32. Best Tour updated to 32.',
    codeLine: 5,
    variables: {
      full_tour: 'A → C → D → B → A',
      tour_cost: '32',
      best_known: '32',
      action: 'Feasible Tour Established'
    },
    comparisonsCount: 20,
    swapsCount: 0,
    stats: { comparisons: 20, swaps: 0, operations: 20 }
  });

  steps.push({
    stepIndex: 5,
    totalSteps: 6,
    description: 'Subproblem 5 (Pruning Check): Node A → B has Lower Bound = 35 >= Best Known Tour (32). Prune node A → B immediately! Optimal TSP Tour = 32.',
    codeLine: 6,
    variables: {
      pruned_branches: 'Subtree A → B (Cost 35 >= 32)',
      optimal_tour: 'A → C → D → B → A',
      min_cost: '32',
      efficiency: 'Optimal Tour Proven Correct'
    },
    comparisonsCount: 22,
    swapsCount: 0,
    stats: { comparisons: 22, swaps: 0, operations: 22 }
  });

  return steps;
}
