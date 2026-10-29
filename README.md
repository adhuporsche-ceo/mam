# Bharathi DAA Visualizer — Project Handbook

> A source-grounded guide to the Bharathi Design and Analysis of Algorithms learning lab.
> This extended handbook combines setup instructions, application architecture, algorithm reference material, study prompts, and annotated source examples.

## Quick start

1. Install a supported Node.js release and npm.
2. Open a terminal in the project root.
3. Install JavaScript dependencies with `npm install`.
4. Start the Vite development server with `npm run dev`.
5. Open `http://localhost:3000` in a browser.
6. The branded ADHITHYA boot screen transitions to the Bharathi DAA visualizer after two seconds.
7. Choose an algorithm from the visualizer selector and step through its trace.

## Contents

- [Product overview](#product-overview)
- [Technology and scripts](#technology-and-scripts)
- [Repository architecture](#repository-architecture)
- [Running and validating](#running-and-validating)
- [Using the learning lab](#using-the-learning-lab)
- [Algorithm catalogue](#algorithm-catalogue)
- [Algorithm reference and annotated source](#algorithm-reference-and-annotated-source)
- [Trace model and teaching concepts](#trace-model-and-teaching-concepts)
- [Testing and quality practices](#testing-and-quality-practices)
- [Accessibility and responsive design](#accessibility-and-responsive-design)
- [Troubleshooting](#troubleshooting)
- [Contribution workflow](#contribution-workflow)
- [Glossary](#glossary)

## Product overview

Bharathi DAA Visualizer is a browser-based learning application for exploring algorithm execution as a sequence of inspectable states.
The product combines an interactive algorithm catalogue, animated scenes, a technical canvas, playback controls, and course-oriented reference material.
The initial visualizer opens on Bubble Sort; the algorithm selector exposes the algorithms listed in the source catalogue.
The catalog contains 16 course categories and 40 algorithm entries.
The catalogue includes sorting, searching, data structures, graphs, dynamic programming, strings, number theory, backtracking, greedy methods, matrix operations, games, and complexity topics.
The display is educational: its fixed examples and traces are not a general-purpose performance benchmark.

### Product principles

- Preserve the correctness of the underlying computation while presenting each meaningful state.
- Make the current operation understandable before asking the learner to infer the next one.
- Keep algorithm data and executable step generation in separate, reviewable modules.
- Retain a technical canvas for learners who prefer a direct data representation.
- Treat complexity as a property of the algorithm and its assumptions, not as a stopwatch result.
- Keep controls discoverable and learning content visible alongside execution.
- Prefer a concrete trace, invariant, or state transition over decorative motion alone.
- Keep boot-screen identity distinct from the Bharathi identity used inside the application.

### Experience at a glance

- A short two-second ADHITHYA-branded boot screen appears before the lab.
- The boot screen uses the supplied wolf-and-sword logo asset.
- The main application retains the Bharathi DAA Lab name and course-oriented material.
- The visualizer offers cartoon and engineering display modes.
- Playback controls support stepping, playing, pausing, resetting, jumping, and speed changes.
- Array lessons provide sample-input presets and a custom array workflow.
- A variable watcher exposes values from the current algorithm step.
- Supporting views include a master-theorem solver, comparison tools, exam preparation, and progress panels.
- Specialized graph, maze, TSP, and sieve scenes are wired where supported by the renderer.

## Technology and scripts

| Area | Project choice |
| --- | --- |
| UI | React 19 with TypeScript |
| Bundler and development server | Vite 6 |
| Styling | Tailwind CSS 4 and project-specific CSS |
| Icons | lucide-react |
| Animation | Motion library plus CSS keyframes |
| PDF output | jsPDF and jspdf-autotable dependencies |
| Algorithm test harness | tsx executing `test/algorithms.test.ts` |
| Android scaffold | Gradle Kotlin DSL project under `app/` and `gradle/` |

### NPM scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite on port 3000 and listen on all network interfaces. |
| `npm run build` | Create the optimized browser build in `dist/`. |
| `npm run preview` | Preview a previously created production build. |
| `npm run lint` | Run TypeScript checking with `tsc --noEmit`. |
| `npm test` | Run the algorithm test harness with `tsx`. |

The project is configured as an ES module package.
The TypeScript configuration targets ES2022, uses bundler module resolution, enables React JSX transformation, and does not emit compiler output.
Vite uses the React and Tailwind CSS plugins.
The Vite development server binds to `0.0.0.0` on port 3000.
The root project also contains an Android Gradle scaffold; the browser instructions refer to the Vite frontend.

## Repository architecture

| Path | Responsibility |
| --- | --- |
| `src/main.tsx` | Creates the React root, renders `App`, and imports global styles. |
| `src/App.tsx` | Coordinates views, selected algorithm, step state, playback, input, and shared layout. |
| `src/data/daaData.ts` | Provides course categories, algorithm metadata, code snippets, teaching notes, and app-facing step types. |
| `src/engine/algorithmRegistry.ts` | Maps algorithm identifiers to executable step generators. |
| `src/engine/types.ts` | Defines engine-facing step and state types. |
| `src/engine/algorithms/` | Holds algorithm-family implementations that emit visualizable states. |
| `src/components/animation/` | Contains cartoon characters, speech, graph stages, and specialized scenes. |
| `src/components/VisualizerCanvas.tsx` | Renders engineering-oriented state views for supported structures. |
| `src/components/PlaybackDeck.tsx` | Presents controls for navigating generated steps. |
| `src/components/RealtimeVariableWatcher.tsx` | Presents values and invariants from the current trace step. |
| `src/components/CodeTraceView.tsx` | Presents algorithm code alongside trace information. |
| `src/components/ComplexityCard.tsx` | Presents complexity and related algorithm notes. |
| `src/components/ExamPrepStudio.tsx` | Presents exam-preparation material. |
| `src/components/StudentProgressDashboard.tsx` | Presents stored progress and progress-oriented summaries. |
| `src/components/` | Contains learning views, navigation, comparison, search, worksheets, and supporting UI. |
| `src/utils/soundEffects.ts` | Provides synthesized interaction and playback sound effects. |
| `src/index.css` | Imports Tailwind and defines the app’s animations and custom styles. |
| `public/assets/` | Holds static images and public assets served by Vite. |
| `test/algorithms.test.ts` | Exercises important algorithm outputs and edge cases. |
| `app/` | Android application scaffold and Android-specific source/resources. |
| `gradle/` | Gradle wrapper configuration and version catalog. |
| `index.html` | Browser metadata, fonts, root element, and frontend entry point. |

### Execution path

1. The browser loads `index.html` and imports `src/main.tsx`.
2. `src/main.tsx` creates the root React tree and mounts `App`.
3. `App` selects an algorithm and initializes input and trace state.
4. Step execution produces an ordered array of step objects.
5. Playback state selects one step as the current frame.
6. The selected display mode renders that step as an animation or technical canvas.
7. Supporting panels receive the current step for variables, code, complexity, or worksheet context.
8. User controls change the step index, play state, speed, selected algorithm, input, or active view.

## Running and validating

### Prerequisites

- Install Node.js compatible with the Vite 6 toolchain.
- Install npm, which is distributed with Node.js.
- Use a current desktop browser for the full interactive layout.
- Use a terminal opened in the repository root.
- A network connection is needed for package installation and externally hosted font requests.
- The Android scaffold has separate Android SDK and Gradle requirements; it is not required for Vite.

### Install dependencies

```powershell
npm install
```

The repository includes a Bun lockfile; use the package manager whose lockfile you intend to maintain when reproducing a locked install.
Do not commit generated dependency directories such as `node_modules/`.

### Start the development server

```powershell
npm run dev
```

The configured development URL is `http://localhost:3000`.
The host configuration binds the server to all interfaces, so network exposure depends on the machine and firewall.
Use the terminal output as the source of truth if the configured port is already in use.
Vite hot module replacement is enabled unless `DISABLE_HMR` is set to `true`.

### Run static type checking

```powershell
npm run lint
```

Despite its script name, this command runs TypeScript without emitting files; it is not a separate ESLint invocation.
Resolve TypeScript errors before considering the UI change ready.

### Run algorithm tests

```powershell
npm test
```

The test harness covers sorting, searching, linear and circular data structures, graph algorithms, dynamic programming, backtracking, and Master Theorem comparisons.
The test harness validates meaningful output properties instead of relying only on snapshot text.

### Build and preview

```powershell
npm run build
npm run preview
```

The build command writes the Vite production output to `dist/`.
The preview command serves an existing build; run the build first after source changes.
Review the complete build output for failed transforms and warnings.
Large JavaScript chunk warnings are performance feedback, not proof that code splitting was performed.

## Using the learning lab

### Select an algorithm

Use the visualizer algorithm selector to move between catalogued algorithms.
The selector groups options by course category.
The current algorithm’s worst-case complexity is surfaced near the selector.
Selecting a new algorithm updates its category and returns the main content to the visualizer.
The default algorithm on initial load is Bubble Sort.

### Choose a presentation mode

- **Cartoon Stage** focuses on characters, state, and visual storytelling.
- **Engineering Canvas** focuses on arrays, graph states, tables, queues, stacks, and data representations.
- **Motion: Animated** enables the normal motion presentation.
- **Motion: Calm** reduces motion controlled by the app.
- The operating system’s `prefers-reduced-motion` setting is respected by custom stage effects.

### Navigate a trace

- Start or pause automatic playback with the playback deck.
- Move forward one frame to inspect the next state transition.
- Move backward to revisit the prior state.
- Jump to the start or end of the trace when the control is available.
- Reset to replay from the first state.
- Adjust playback speed to suit demonstration or study.
- Read the step description before interpreting highlighted elements.
- Compare displayed variables with the current structure or array state.
- Use complexity and invariant panels to connect execution to analysis.

### Work with array inputs

Array workflows are intended for small educational traces, not large benchmarks.
The custom input interface accepts comma- or whitespace-separated positive integers according to UI validation.
The submitted array is limited in length by the UI before it is sent to the step generator.
Preset arrays demonstrate random, nearly sorted, and reversed patterns where the control is shown.
Different inputs can change the number of steps and comparisons even when asymptotic complexity is unchanged.
A changed count on one sample does not change the asymptotic classification.

### Interpret a frame

1. Identify the operation named by the step description.
2. Find the active index, node, cell, frontier item, or candidate.
3. Read the relevant variables from the watcher.
4. Compare the before-state with the current visual state.
5. Record any swap, insertion, relaxation, enqueue, dequeue, branch, or table update.
6. State the condition that permits the next step.
7. Connect the transition to the algorithm’s invariant or correctness argument.
8. Track any comparison or operation counter shown by the app.
9. Check whether memory state grows, shrinks, or remains constant.
10. Explain why the terminal condition is correct.

## Algorithm catalogue

The source catalog currently defines 40 algorithms across 16 categories.
Names, identifiers, complexities, input notes, and snippets below are read from `src/data/daaData.ts` at documentation-generation time.

### Course categories

| Code | Category | Lesson count | Focus from source catalog |
| --- | --- | ---: | --- |
| 01 | Analysis & Correctness | 10 | Master Big-O/Omega/Theta, loop invariants, recurrence relations, substitution, recursion trees, and Master Theorem. |
| 02 | Divide and Conquer | 6 | Divide into independent subproblems, solve recursively, and combine: Merge Sort, Quick Sort, Karatsuba, Strassen. |
| 03 | Branch and Bound | 4 | State space tree pruning with upper/lower bounding functions: 0/1 Knapsack B&B, Traveling Salesperson (TSP), 15-Puzzle. |
| 04 | Complexity Theory | 5 | Tractable vs Intractable problems, P vs NP, Polynomial Reductions, Cook-Levin Theorem, and NP-Completeness. |
| 05 | DAA Extensions | 20 | Randomized algorithms, QuickSelect, aggregate/potential amortized analysis, and approximation bounds. |
| 06 | Sorting | 15 | Fundamental and advanced ordering algorithms: Bubble, Selection, Insertion, Merge, Quick, Heap, Radix. |
| 07 | Searching | 14 | Linear, Binary, Ternary, Jump, and Interpolation search strategies with logarithmic bounds. |
| 08 | Data Structures | 49 | Stack, Queue, Linked Lists, Binary Search Trees, Self-balancing AVL, Heaps, and Disjoint Set Union. |
| 09 | Graphs | 19 | Breadth-First, Depth-First, Dijkstra’s Shortest Path, Bellman-Ford, Kruskal’s & Prim’s MSTs, Topological Sort. |
| 10 | Dynamic Programming | 14 | Overlapping subproblems & optimal substructure: Knapsack, LCS, LIS, Matrix Chain Multiplication, Coin Change. |
| 11 | Strings | 5 | Pattern matching with Knuth-Morris-Pratt (KMP), Rabin-Karp rolling hash, Z-Algorithm, and Tries. |
| 12 | Number Theory | 2 | Euclidean GCD, Modular Exponentiation, and Sieve of Eratosthenes prime factorization. |
| 13 | Backtracking | 6 | Systematic trial-and-error state pruning: N-Queens problem, Rat in a Maze, Sudoku Solver, Subset Sum. |
| 14 | Greedy | 5 | Locally optimal choices yielding globally optimal solutions: Huffman Coding, Fractional Knapsack, Activity Selection. |
| 15 | Matrix / Grid | 2 | Grid pathfinding BFS/A*, Matrix Rotation in-place, Spiral Traversal, and Connected Components Island Counting. |
| 16 | Games | 8 | Adversarial search: Minimax Decision Rule with Alpha-Beta Pruning, Game of Nim, and Cellular Automata. |

### Algorithm index

| Algorithm | Identifier | Category | Worst-case time |
| --- | --- | --- | --- |
| [Bubble Sort](#bubble-sort) | `bubble_sort` | Sorting | O(n²) |
| [Selection Sort](#selection-sort) | `selection_sort` | Sorting | O(n²) |
| [Insertion Sort](#insertion-sort) | `insertion_sort` | Sorting | O(n²) |
| [Quick Sort (Lomuto)](#quick-sort-lomuto) | `quick_sort` | Sorting | O(n²) |
| [Binary Search](#binary-search) | `binary_search` | Searching | O(log n) |
| [Stack (LIFO)](#stack-lifo) | `stack_ds` | Data Structures | O(1) |
| [Queue (FIFO)](#queue-fifo) | `queue_ds` | Data Structures | O(1) |
| [Breadth-First Search (BFS)](#breadth-first-search-bfs) | `graph_bfs` | Graphs | O(V + E) |
| [0/1 Knapsack Problem](#0-1-knapsack-problem) | `knapsack_dp` | Dynamic Programming | O(n * W) |
| [N-Queens Problem](#n-queens-problem) | `n_queens` | Backtracking | O(N!) |
| [Activity Selection (Interval Scheduling)](#activity-selection-interval-scheduling) | `activity_selection` | Greedy | O(n log n) |
| [Euclidean GCD Algorithm](#euclidean-gcd-algorithm) | `euclidean_gcd` | Number Theory | O(log(min(a, b))) |
| [Merge Sort](#merge-sort) | `merge_sort` | Divide and Conquer | O(n log n) |
| [Heap Sort](#heap-sort) | `heap_sort` | Sorting | O(n log n) |
| [Linear Search](#linear-search) | `linear_search` | Searching | O(n) |
| [Circular Queue (Wraparound)](#circular-queue-wraparound) | `circular_queue` | Data Structures | O(1) |
| [Depth-First Search (DFS)](#depth-first-search-dfs) | `graph_dfs` | Graphs | O(V + E) |
| [Dijkstra's Shortest Path](#dijkstra-s-shortest-path) | `dijkstra` | Graphs | O((V + E) log V) |
| [Kruskal's Minimum Spanning Tree](#kruskal-s-minimum-spanning-tree) | `kruskal_mst` | Greedy | O(E log E) |
| [Longest Common Subsequence (LCS)](#longest-common-subsequence-lcs) | `lcs_dp` | Dynamic Programming | O(m * n) |
| [Rat in a Maze](#rat-in-a-maze) | `rat_in_maze` | Backtracking | O(4^(N²)) |
| [Asymptotic Growth Comparator (Big-O)](#asymptotic-growth-comparator-big-o) | `asymptotic_growth` | Analysis & Correctness | O(1) |
| [Master Theorem Recurrence Solver](#master-theorem-recurrence-solver) | `master_theorem_sim` | Analysis & Correctness | O(1) |
| [Karatsuba Fast Multiplication](#karatsuba-fast-multiplication) | `karatsuba_mult` | Divide and Conquer | O(n^1.585) |
| [Closest Pair of 2D Points](#closest-pair-of-2d-points) | `closest_pair` | Divide and Conquer | O(n log n) |
| [Fractional Knapsack Problem](#fractional-knapsack-problem) | `fractional_knapsack` | cat_design_tech | O(n log n) |
| [Huffman Optimal Prefix Code](#huffman-optimal-prefix-code) | `huffman_coding` | cat_design_tech | O(n log n) |
| [Vertex Cover 2-Approximation](#vertex-cover-2-approximation) | `vertex_cover_approx` | Complexity Theory | O(V + E) |
| [Traveling Salesperson Problem (TSP)](#traveling-salesperson-problem-tsp) | `tsp_held_karp` | Complexity Theory | O(n² · 2ⁿ) |
| [QuickSelect (Hoare's Selection)](#quickselect-hoare-s-selection) | `quick_select` | DAA Extensions | O(n²) |
| [Dynamic Array Doubling (Amortized O(1))](#dynamic-array-doubling-amortized-o-1) | `dynamic_array_amortized` | DAA Extensions | O(n) |
| [Knuth-Morris-Pratt (KMP) Search](#knuth-morris-pratt-kmp-search) | `kmp_string_match` | Strings | O(n + m) |
| [Rabin-Karp Rolling Hash Search](#rabin-karp-rolling-hash-search) | `rabin_karp` | Strings | O(n · m) |
| [Sieve of Eratosthenes (Primes)](#sieve-of-eratosthenes-primes) | `sieve_eratosthenes` | Number Theory | O(N log log N) |
| [Number of Connected Islands (Flood Fill)](#number-of-connected-islands-flood-fill) | `flood_fill_islands` | Matrix / Grid | O(M × N) |
| [Spiral Matrix Traversal](#spiral-matrix-traversal) | `spiral_matrix` | Matrix / Grid | O(M × N) |
| [Minimax with Alpha-Beta Pruning](#minimax-with-alpha-beta-pruning) | `minimax_alphabeta` | Games | O(b^d) |
| [Game of Nim (Bouton's Theorem)](#game-of-nim-bouton-s-theorem) | `game_of_nim` | Games | O(k) |
| [0/1 Knapsack Branch & Bound](#0-1-knapsack-branch-bound) | `knapsack_branch_bound` | Branch and Bound | O(2^n) |
| [TSP Reduced Cost Matrix Branch & Bound](#tsp-reduced-cost-matrix-branch-bound) | `tsp_branch_bound` | Branch and Bound | O(n² 2^n) |

## Algorithm reference and annotated source

### Bubble Sort

**Catalog identifier:** `bubble_sort`  
**Course category:** Sorting  
**Catalog position:** 1 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Comparison-based Iterative |
| Best-case time | O(n) |
| Average-case time | O(n²) |
| Worst-case time | O(n²) |
| Auxiliary space | O(1) |
| Stable | Stable |
| In place | Yes |
| Default input | `[65,35,45,90,55,75]` |
| Input requirement | Array of 4 to 8 positive integers (e.g. 65, 35, 45, 90, 55, 75) |

#### Concept and teaching notes

**Short description.** Repeatedly steps through list, compares adjacent elements, and swaps them if in wrong order.
**Definition.** Repeatedly steps through list, compares adjacent elements, and swaps them if in wrong order.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Bubble Sort.
**When to use it.** Use this lesson to study Bubble Sort and compare its assumptions and bounds with related entries.
**Common mistake.** A lower step count on one input does not prove a better algorithm overall. Bubble sort degrades severely on reverse-sorted inputs.
**Exam note.** KCT DAA Unit 1: State the loop invariant: After pass k, the last k elements are in their final sorted positions.

#### Trace study questions

1. **Bubble Sort:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Bubble Sort:** What output or terminal status should a correct execution produce?
3. **Bubble Sort:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Bubble Sort:** What is the smallest meaningful state transition in this implementation?
5. **Bubble Sort:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Bubble Sort:** What condition allows execution to proceed to the next candidate?
7. **Bubble Sort:** What condition makes the algorithm stop?
8. **Bubble Sort:** Which values should be written in a dry-run table before the first update?
9. **Bubble Sort:** Which values should be written after one complete loop iteration or recursive call?
10. **Bubble Sort:** Which invariant or correctness property can be checked after this frame?
11. **Bubble Sort:** Which assumption is required for the selected algorithm to be correct?
12. **Bubble Sort:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Bubble Sort:** What input follows the best-case behavior listed in the source catalog?
14. **Bubble Sort:** What input shape can trigger the listed worst-case behavior?
15. **Bubble Sort:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Bubble Sort:** What should happen for an empty or minimal input if the UI permits it?
17. **Bubble Sort:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Bubble Sort:** What auxiliary storage is allocated and when can it be released?
19. **Bubble Sort:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Bubble Sort:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Bubble Sort:** What result would demonstrate that this trace has finished correctly?
22. **Bubble Sort:** Which independent test assertion could catch a bug in this transition?
23. **Bubble Sort:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Bubble Sort:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n), average time O(n²), worst time O(n²), and auxiliary space O(1).
1. **Bubble Sort:** Name the input-size variable used in the published time bound.
2. **Bubble Sort:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Bubble Sort:** Identify the operation performed once per outer iteration.
4. **Bubble Sort:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Bubble Sort:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Bubble Sort:** Explain how the input structure changes the amount of work.
7. **Bubble Sort:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Bubble Sort:** Separate comparisons from writes or swaps where appropriate.
9. **Bubble Sort:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Bubble Sort:** Explain why the average-case entry may differ from both best and worst case.
11. **Bubble Sort:** Describe what auxiliary space counts for this algorithm.
12. **Bubble Sort:** Check whether recursion stack space is included in the documented space bound.
13. **Bubble Sort:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Bubble Sort:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Bubble Sort:** Explain which code operation dominates as the input grows.
16. **Bubble Sort:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function bubbleSort(A):
  n = length(A)
  for i from 0 to n - 2:
    swapped = false
    for j from 0 to n - i - 2:
      if A[j] > A[j+1]:
        swap(A[j], A[j+1])
        swapped = true
    if not swapped: break
  return A
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Bubble Sort; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace this repetition in Bubble Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace this repetition in Bubble Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Evaluate this branch for the current Bubble Sort state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Check the index and boundary for this Bubble Sort access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 8:** Trace source line 8 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 9:** Evaluate this branch for the current Bubble Sort state; note which alternative runs and which states are excluded.
- **PSEUDO line 10:** Record the result or trace state returned by Bubble Sort; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace this repetition in Bubble Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace this repetition in Bubble Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Evaluate this branch for the current Bubble Sort state; note which alternative runs and which states are excluded.
- **CPP line 7:** Check the index and boundary for this Bubble Sort access; state which input or auxiliary cell is read or updated.
- **CPP line 8:** Trace source line 8 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Bubble Sort control-flow scope clear.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Bubble Sort control-flow scope clear.
- **CPP line 11:** Evaluate this branch for the current Bubble Sort state; note which alternative runs and which states are excluded.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Bubble Sort control-flow scope clear.
- **CPP line 13:** Match this closing delimiter with its opening block to keep the Bubble Sort control-flow scope clear.

##### JAVA reference

```java
public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Trace this repetition in Bubble Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Trace this repetition in Bubble Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 6:** Evaluate this branch for the current Bubble Sort state; note which alternative runs and which states are excluded.
- **JAVA line 7:** Check the index and boundary for this Bubble Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 8:** Check the index and boundary for this Bubble Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 9:** Check the index and boundary for this Bubble Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 10:** Trace source line 10 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 11:** Match this closing delimiter with its opening block to keep the Bubble Sort control-flow scope clear.
- **JAVA line 12:** Match this closing delimiter with its opening block to keep the Bubble Sort control-flow scope clear.
- **JAVA line 13:** Evaluate this branch for the current Bubble Sort state; note which alternative runs and which states are excluded.
- **JAVA line 14:** Match this closing delimiter with its opening block to keep the Bubble Sort control-flow scope clear.
- **JAVA line 15:** Match this closing delimiter with its opening block to keep the Bubble Sort control-flow scope clear.

##### PYTHON reference

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace this repetition in Bubble Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Trace this repetition in Bubble Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 6:** Evaluate this branch for the current Bubble Sort state; note which alternative runs and which states are excluded.
- **PYTHON line 7:** Check the index and boundary for this Bubble Sort access; state which input or auxiliary cell is read or updated.
- **PYTHON line 8:** Trace source line 8 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 9:** Evaluate this branch for the current Bubble Sort state; note which alternative runs and which states are excluded.
- **PYTHON line 10:** Trace source line 10 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 11:** Record the result or trace state returned by Bubble Sort; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Inversion | A pair of elements (A[i], A[j]) such that i < j and A[i] > A[j]. |
| Stability | Preserves the relative order of elements with equal keys. |
| Adaptive | Runs faster (O(n)) when the array is already sorted or nearly sorted. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Bubble Sort without reading the code.

**Practice task:** Build one small input for Bubble Sort, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Bubble Sort short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Selection Sort

**Catalog identifier:** `selection_sort`  
**Course category:** Sorting  
**Catalog position:** 2 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Selection Iterative |
| Best-case time | O(n²) |
| Average-case time | O(n²) |
| Worst-case time | O(n²) |
| Auxiliary space | O(1) |
| Stable | Unstable |
| In place | Yes |
| Default input | `[65,35,45,90,55,75]` |
| Input requirement | Array of 4 to 8 positive integers |

#### Concept and teaching notes

**Short description.** Divides the array into sorted and unsorted subarrays; repeatedly selects the minimum element.
**Definition.** Divides the array into sorted and unsorted subarrays; repeatedly selects the minimum element.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Selection Sort.
**When to use it.** Use this lesson to study Selection Sort and compare its assumptions and bounds with related entries.
**Common mistake.** Assuming Selection Sort is faster on sorted arrays. It always performs exactly n(n-1)/2 comparisons regardless of initial order.
**Exam note.** Selection Sort performs at most n swaps (O(n)), making it useful when write/swap operations are costly (e.g. Flash EEPROM).

#### Trace study questions

1. **Selection Sort:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Selection Sort:** What output or terminal status should a correct execution produce?
3. **Selection Sort:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Selection Sort:** What is the smallest meaningful state transition in this implementation?
5. **Selection Sort:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Selection Sort:** What condition allows execution to proceed to the next candidate?
7. **Selection Sort:** What condition makes the algorithm stop?
8. **Selection Sort:** Which values should be written in a dry-run table before the first update?
9. **Selection Sort:** Which values should be written after one complete loop iteration or recursive call?
10. **Selection Sort:** Which invariant or correctness property can be checked after this frame?
11. **Selection Sort:** Which assumption is required for the selected algorithm to be correct?
12. **Selection Sort:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Selection Sort:** What input follows the best-case behavior listed in the source catalog?
14. **Selection Sort:** What input shape can trigger the listed worst-case behavior?
15. **Selection Sort:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Selection Sort:** What should happen for an empty or minimal input if the UI permits it?
17. **Selection Sort:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Selection Sort:** What auxiliary storage is allocated and when can it be released?
19. **Selection Sort:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Selection Sort:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Selection Sort:** What result would demonstrate that this trace has finished correctly?
22. **Selection Sort:** Which independent test assertion could catch a bug in this transition?
23. **Selection Sort:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Selection Sort:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n²), average time O(n²), worst time O(n²), and auxiliary space O(1).
1. **Selection Sort:** Name the input-size variable used in the published time bound.
2. **Selection Sort:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Selection Sort:** Identify the operation performed once per outer iteration.
4. **Selection Sort:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Selection Sort:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Selection Sort:** Explain how the input structure changes the amount of work.
7. **Selection Sort:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Selection Sort:** Separate comparisons from writes or swaps where appropriate.
9. **Selection Sort:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Selection Sort:** Explain why the average-case entry may differ from both best and worst case.
11. **Selection Sort:** Describe what auxiliary space counts for this algorithm.
12. **Selection Sort:** Check whether recursion stack space is included in the documented space bound.
13. **Selection Sort:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Selection Sort:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Selection Sort:** Explain which code operation dominates as the input grows.
16. **Selection Sort:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function selectionSort(A):
  n = length(A)
  for i from 0 to n - 2:
    min_idx = i
    for j from i + 1 to n - 1:
      if A[j] < A[min_idx]:
        min_idx = j
    if min_idx != i:
      swap(A[i], A[min_idx])
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Selection Sort; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace this repetition in Selection Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace this repetition in Selection Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Evaluate this branch for the current Selection Sort state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Evaluate this branch for the current Selection Sort state; note which alternative runs and which states are excluded.
- **PSEUDO line 9:** Check the index and boundary for this Selection Sort access; state which input or auxiliary cell is read or updated.

##### CPP reference

```cpp
void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        if (min_idx != i) swap(arr[i], arr[min_idx]);
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace this repetition in Selection Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace this repetition in Selection Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Evaluate this branch for the current Selection Sort state; note which alternative runs and which states are excluded.
- **CPP line 7:** Match this closing delimiter with its opening block to keep the Selection Sort control-flow scope clear.
- **CPP line 8:** Evaluate this branch for the current Selection Sort state; note which alternative runs and which states are excluded.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Selection Sort control-flow scope clear.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Selection Sort control-flow scope clear.

##### JAVA reference

```java
public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        int temp = arr[minIdx];
        arr[minIdx] = arr[i];
        arr[i] = temp;
    }
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Trace this repetition in Selection Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Trace this repetition in Selection Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 6:** Evaluate this branch for the current Selection Sort state; note which alternative runs and which states are excluded.
- **JAVA line 7:** Match this closing delimiter with its opening block to keep the Selection Sort control-flow scope clear.
- **JAVA line 8:** Check the index and boundary for this Selection Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 9:** Check the index and boundary for this Selection Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 10:** Check the index and boundary for this Selection Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 11:** Match this closing delimiter with its opening block to keep the Selection Sort control-flow scope clear.
- **JAVA line 12:** Match this closing delimiter with its opening block to keep the Selection Sort control-flow scope clear.

##### PYTHON reference

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace this repetition in Selection Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Trace this repetition in Selection Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 6:** Evaluate this branch for the current Selection Sort state; note which alternative runs and which states are excluded.
- **PYTHON line 7:** Trace source line 7 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 8:** Check the index and boundary for this Selection Sort access; state which input or auxiliary cell is read or updated.
- **PYTHON line 9:** Record the result or trace state returned by Selection Sort; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Minimum Index | Pointer tracking the lowest value found in the current pass. |
| Non-adaptive | Takes the same O(n²) time regardless of whether input is sorted or reversed. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Selection Sort without reading the code.

**Practice task:** Build one small input for Selection Sort, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Selection Sort short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Insertion Sort

**Catalog identifier:** `insertion_sort`  
**Course category:** Sorting  
**Catalog position:** 3 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Incremental Insertion |
| Best-case time | O(n) |
| Average-case time | O(n²) |
| Worst-case time | O(n²) |
| Auxiliary space | O(1) |
| Stable | Stable |
| In place | Yes |
| Default input | `[65,35,45,90,55,75]` |
| Input requirement | Array of 4 to 8 positive integers |

#### Concept and teaching notes

**Short description.** Builds sorted array one item at a time by repeatedly taking the next element and inserting it in place.
**Definition.** Builds sorted array one item at a time by repeatedly taking the next element and inserting it in place.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Insertion Sort.
**When to use it.** Use this lesson to study Insertion Sort and compare its assumptions and bounds with related entries.
**Common mistake.** Assuming quicksort is always superior. For small arrays (n <= 16), Insertion Sort is usually faster due to cache locality and low overhead.
**Exam note.** Often used as the base case in hybrid sorting algorithms like TimSort (used in Python and Java standard libraries).

#### Trace study questions

1. **Insertion Sort:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Insertion Sort:** What output or terminal status should a correct execution produce?
3. **Insertion Sort:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Insertion Sort:** What is the smallest meaningful state transition in this implementation?
5. **Insertion Sort:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Insertion Sort:** What condition allows execution to proceed to the next candidate?
7. **Insertion Sort:** What condition makes the algorithm stop?
8. **Insertion Sort:** Which values should be written in a dry-run table before the first update?
9. **Insertion Sort:** Which values should be written after one complete loop iteration or recursive call?
10. **Insertion Sort:** Which invariant or correctness property can be checked after this frame?
11. **Insertion Sort:** Which assumption is required for the selected algorithm to be correct?
12. **Insertion Sort:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Insertion Sort:** What input follows the best-case behavior listed in the source catalog?
14. **Insertion Sort:** What input shape can trigger the listed worst-case behavior?
15. **Insertion Sort:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Insertion Sort:** What should happen for an empty or minimal input if the UI permits it?
17. **Insertion Sort:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Insertion Sort:** What auxiliary storage is allocated and when can it be released?
19. **Insertion Sort:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Insertion Sort:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Insertion Sort:** What result would demonstrate that this trace has finished correctly?
22. **Insertion Sort:** Which independent test assertion could catch a bug in this transition?
23. **Insertion Sort:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Insertion Sort:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n), average time O(n²), worst time O(n²), and auxiliary space O(1).
1. **Insertion Sort:** Name the input-size variable used in the published time bound.
2. **Insertion Sort:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Insertion Sort:** Identify the operation performed once per outer iteration.
4. **Insertion Sort:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Insertion Sort:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Insertion Sort:** Explain how the input structure changes the amount of work.
7. **Insertion Sort:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Insertion Sort:** Separate comparisons from writes or swaps where appropriate.
9. **Insertion Sort:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Insertion Sort:** Explain why the average-case entry may differ from both best and worst case.
11. **Insertion Sort:** Describe what auxiliary space counts for this algorithm.
12. **Insertion Sort:** Check whether recursion stack space is included in the documented space bound.
13. **Insertion Sort:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Insertion Sort:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Insertion Sort:** Explain which code operation dominates as the input grows.
16. **Insertion Sort:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function insertionSort(A):
  for i from 1 to length(A) - 1:
    key = A[i]
    j = i - 1
    while j >= 0 and A[j] > key:
      A[j + 1] = A[j]
      j = j - 1
    A[j + 1] = key
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Insertion Sort; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace this repetition in Insertion Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 3:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace this repetition in Insertion Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.

##### CPP reference

```cpp
void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace this repetition in Insertion Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 3:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace this repetition in Insertion Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **CPP line 7:** Trace source line 7 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Insertion Sort control-flow scope clear.
- **CPP line 9:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Insertion Sort control-flow scope clear.
- **CPP line 11:** Match this closing delimiter with its opening block to keep the Insertion Sort control-flow scope clear.

##### JAVA reference

```java
public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace this repetition in Insertion Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 3:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Trace this repetition in Insertion Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 6:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 7:** Trace source line 7 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 8:** Match this closing delimiter with its opening block to keep the Insertion Sort control-flow scope clear.
- **JAVA line 9:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 10:** Match this closing delimiter with its opening block to keep the Insertion Sort control-flow scope clear.
- **JAVA line 11:** Match this closing delimiter with its opening block to keep the Insertion Sort control-flow scope clear.

##### PYTHON reference

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace this repetition in Insertion Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 3:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Trace this repetition in Insertion Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 6:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **PYTHON line 7:** Trace source line 7 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 8:** Check the index and boundary for this Insertion Sort access; state which input or auxiliary cell is read or updated.
- **PYTHON line 9:** Record the result or trace state returned by Insertion Sort; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Key Element | The element currently being inserted into the sorted segment. |
| Online Algorithm | Can sort a list as it receives it on-the-fly without needing all elements upfront. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Insertion Sort without reading the code.

**Practice task:** Build one small input for Insertion Sort, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Insertion Sort short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Quick Sort (Lomuto)

**Catalog identifier:** `quick_sort`  
**Course category:** Sorting  
**Catalog position:** 4 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Divide and Conquer |
| Best-case time | O(n log n) |
| Average-case time | O(n log n) |
| Worst-case time | O(n²) |
| Auxiliary space | O(log n) |
| Stable | Unstable |
| In place | Yes |
| Default input | `[65,35,45,90,55,75]` |
| Input requirement | Array of 4 to 8 positive integers |

#### Concept and teaching notes

**Short description.** Picks a pivot, partitions the array such that smaller elements go left and larger go right, then recurses.
**Definition.** Picks a pivot, partitions the array such that smaller elements go left and larger go right, then recurses.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Quick Sort (Lomuto).
**When to use it.** Use this lesson to study Quick Sort (Lomuto) and compare its assumptions and bounds with related entries.
**Common mistake.** Picking the first or last element as pivot on already sorted arrays causes worst-case O(n²) behavior.
**Exam note.** Randomized QuickSort achieves expected O(n log n) running time on ANY input distribution.

#### Trace study questions

1. **Quick Sort (Lomuto):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Quick Sort (Lomuto):** What output or terminal status should a correct execution produce?
3. **Quick Sort (Lomuto):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Quick Sort (Lomuto):** What is the smallest meaningful state transition in this implementation?
5. **Quick Sort (Lomuto):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Quick Sort (Lomuto):** What condition allows execution to proceed to the next candidate?
7. **Quick Sort (Lomuto):** What condition makes the algorithm stop?
8. **Quick Sort (Lomuto):** Which values should be written in a dry-run table before the first update?
9. **Quick Sort (Lomuto):** Which values should be written after one complete loop iteration or recursive call?
10. **Quick Sort (Lomuto):** Which invariant or correctness property can be checked after this frame?
11. **Quick Sort (Lomuto):** Which assumption is required for the selected algorithm to be correct?
12. **Quick Sort (Lomuto):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Quick Sort (Lomuto):** What input follows the best-case behavior listed in the source catalog?
14. **Quick Sort (Lomuto):** What input shape can trigger the listed worst-case behavior?
15. **Quick Sort (Lomuto):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Quick Sort (Lomuto):** What should happen for an empty or minimal input if the UI permits it?
17. **Quick Sort (Lomuto):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Quick Sort (Lomuto):** What auxiliary storage is allocated and when can it be released?
19. **Quick Sort (Lomuto):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Quick Sort (Lomuto):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Quick Sort (Lomuto):** What result would demonstrate that this trace has finished correctly?
22. **Quick Sort (Lomuto):** Which independent test assertion could catch a bug in this transition?
23. **Quick Sort (Lomuto):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Quick Sort (Lomuto):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n log n), average time O(n log n), worst time O(n²), and auxiliary space O(log n).
1. **Quick Sort (Lomuto):** Name the input-size variable used in the published time bound.
2. **Quick Sort (Lomuto):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Quick Sort (Lomuto):** Identify the operation performed once per outer iteration.
4. **Quick Sort (Lomuto):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Quick Sort (Lomuto):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Quick Sort (Lomuto):** Explain how the input structure changes the amount of work.
7. **Quick Sort (Lomuto):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Quick Sort (Lomuto):** Separate comparisons from writes or swaps where appropriate.
9. **Quick Sort (Lomuto):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Quick Sort (Lomuto):** Explain why the average-case entry may differ from both best and worst case.
11. **Quick Sort (Lomuto):** Describe what auxiliary space counts for this algorithm.
12. **Quick Sort (Lomuto):** Check whether recursion stack space is included in the documented space bound.
13. **Quick Sort (Lomuto):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Quick Sort (Lomuto):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Quick Sort (Lomuto):** Explain which code operation dominates as the input grows.
16. **Quick Sort (Lomuto):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function partition(A, low, high):
  pivot = A[high]
  i = low - 1
  for j from low to high - 1:
    if A[j] < pivot:
      i = i + 1
      swap(A[i], A[j])
  swap(A[i + 1], A[high])
  return i + 1
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Quick Sort (Lomuto); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace this repetition in Quick Sort (Lomuto): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Evaluate this branch for the current Quick Sort (Lomuto) state; note which alternative runs and which states are excluded.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 8:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 9:** Record the result or trace state returned by Quick Sort (Lomuto); check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace this repetition in Quick Sort (Lomuto): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Evaluate this branch for the current Quick Sort (Lomuto) state; note which alternative runs and which states are excluded.
- **CPP line 6:** Trace source line 6 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 7:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Quick Sort (Lomuto) control-flow scope clear.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Quick Sort (Lomuto) control-flow scope clear.
- **CPP line 10:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **CPP line 11:** Record the result or trace state returned by Quick Sort (Lomuto); check that every required exit path reaches a valid result.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Quick Sort (Lomuto) control-flow scope clear.

##### JAVA reference

```java
int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;
        }
    }
    int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
    return i + 1;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **JAVA line 3:** Trace source line 3 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 4:** Trace this repetition in Quick Sort (Lomuto): write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 5:** Evaluate this branch for the current Quick Sort (Lomuto) state; note which alternative runs and which states are excluded.
- **JAVA line 6:** Trace source line 6 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 7:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **JAVA line 8:** Match this closing delimiter with its opening block to keep the Quick Sort (Lomuto) control-flow scope clear.
- **JAVA line 9:** Match this closing delimiter with its opening block to keep the Quick Sort (Lomuto) control-flow scope clear.
- **JAVA line 10:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **JAVA line 11:** Record the result or trace state returned by Quick Sort (Lomuto); check that every required exit path reaches a valid result.
- **JAVA line 12:** Match this closing delimiter with its opening block to keep the Quick Sort (Lomuto) control-flow scope clear.

##### PYTHON reference

```python
def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace this repetition in Quick Sort (Lomuto): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 5:** Evaluate this branch for the current Quick Sort (Lomuto) state; note which alternative runs and which states are excluded.
- **PYTHON line 6:** Trace source line 6 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 7:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 8:** Check the index and boundary for this Quick Sort (Lomuto) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 9:** Record the result or trace state returned by Quick Sort (Lomuto); check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Pivot | The reference element used to partition the array. |
| Lomuto Partition | Simpler partition scheme using a single scanning pointer and a boundary pointer. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Quick Sort (Lomuto) without reading the code.

**Practice task:** Build one small input for Quick Sort (Lomuto), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Quick Sort (Lomuto) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Binary Search

**Catalog identifier:** `binary_search`  
**Course category:** Searching  
**Catalog position:** 5 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Divide and Conquer |
| Best-case time | O(1) |
| Average-case time | O(log n) |
| Worst-case time | O(log n) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[35,45,55,65,75,90]` |
| Input requirement | Sorted array of integers (e.g. 35, 45, 55, 65, 75, 90) |

#### Concept and teaching notes

**Short description.** Halves the search interval each step in a sorted sequence, achieving logarithmic time.
**Definition.** Halves the search interval each step in a sorted sequence, achieving logarithmic time.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Binary Search.
**When to use it.** Use this lesson to study Binary Search and compare its assumptions and bounds with related entries.
**Common mistake.** Applying Binary Search to unsorted arrays. The precondition MUST be monotonic order.
**Exam note.** Avoid integer overflow when computing mid: use low + (high - low) / 2 instead of (low + high) / 2.

#### Trace study questions

1. **Binary Search:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Binary Search:** What output or terminal status should a correct execution produce?
3. **Binary Search:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Binary Search:** What is the smallest meaningful state transition in this implementation?
5. **Binary Search:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Binary Search:** What condition allows execution to proceed to the next candidate?
7. **Binary Search:** What condition makes the algorithm stop?
8. **Binary Search:** Which values should be written in a dry-run table before the first update?
9. **Binary Search:** Which values should be written after one complete loop iteration or recursive call?
10. **Binary Search:** Which invariant or correctness property can be checked after this frame?
11. **Binary Search:** Which assumption is required for the selected algorithm to be correct?
12. **Binary Search:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Binary Search:** What input follows the best-case behavior listed in the source catalog?
14. **Binary Search:** What input shape can trigger the listed worst-case behavior?
15. **Binary Search:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Binary Search:** What should happen for an empty or minimal input if the UI permits it?
17. **Binary Search:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Binary Search:** What auxiliary storage is allocated and when can it be released?
19. **Binary Search:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Binary Search:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Binary Search:** What result would demonstrate that this trace has finished correctly?
22. **Binary Search:** Which independent test assertion could catch a bug in this transition?
23. **Binary Search:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Binary Search:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(log n), worst time O(log n), and auxiliary space O(1).
1. **Binary Search:** Name the input-size variable used in the published time bound.
2. **Binary Search:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Binary Search:** Identify the operation performed once per outer iteration.
4. **Binary Search:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Binary Search:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Binary Search:** Explain how the input structure changes the amount of work.
7. **Binary Search:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Binary Search:** Separate comparisons from writes or swaps where appropriate.
9. **Binary Search:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Binary Search:** Explain why the average-case entry may differ from both best and worst case.
11. **Binary Search:** Describe what auxiliary space counts for this algorithm.
12. **Binary Search:** Check whether recursion stack space is included in the documented space bound.
13. **Binary Search:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Binary Search:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Binary Search:** Explain which code operation dominates as the input grows.
16. **Binary Search:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function binarySearch(A, target):
  low = 0, high = length(A) - 1
  while low <= high:
    mid = low + (high - low) / 2
    if A[mid] == target: return mid
    else if A[mid] < target: low = mid + 1
    else: high = mid - 1
  return -1
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Binary Search; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace this repetition in Binary Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 6:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 8:** Record the result or trace state returned by Binary Search; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Name the state represented by this Binary Search variable and record its value before its first update.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace this repetition in Binary Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **CPP line 6:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **CPP line 7:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Binary Search control-flow scope clear.
- **CPP line 9:** Record the result or trace state returned by Binary Search; check that every required exit path reaches a valid result.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Binary Search control-flow scope clear.

##### JAVA reference

```java
public static int binarySearch(int[] arr, int target) {
    int low = 0, high = arr.length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Trace this repetition in Binary Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **JAVA line 6:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **JAVA line 7:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **JAVA line 8:** Match this closing delimiter with its opening block to keep the Binary Search control-flow scope clear.
- **JAVA line 9:** Record the result or trace state returned by Binary Search; check that every required exit path reaches a valid result.
- **JAVA line 10:** Match this closing delimiter with its opening block to keep the Binary Search control-flow scope clear.

##### PYTHON reference

```python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: low = mid + 1
        else: high = mid - 1
    return -1
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace this repetition in Binary Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **PYTHON line 6:** Check the index and boundary for this Binary Search access; state which input or auxiliary cell is read or updated.
- **PYTHON line 7:** Evaluate this branch for the current Binary Search state; note which alternative runs and which states are excluded.
- **PYTHON line 8:** Record the result or trace state returned by Binary Search; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Midpoint | Index splitting current range into equal halves. |
| Logarithmic reduction | Search interval is halved at each step: n -> n/2 -> n/4 -> ... -> 1. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Binary Search without reading the code.

**Practice task:** Build one small input for Binary Search, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Binary Search short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Stack (LIFO)

**Catalog identifier:** `stack_ds`  
**Course category:** Data Structures  
**Catalog position:** 6 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | LIFO Storage |
| Best-case time | O(1) |
| Average-case time | O(1) |
| Worst-case time | O(1) |
| Auxiliary space | O(n) |
| Stable | N/A |
| In place | N/A |
| Default input | `[10,25,42,77]` |
| Input requirement | Push and Pop sequential operations |

#### Concept and teaching notes

**Short description.** Linear data structure where elements are added and removed strictly from the top.
**Definition.** Linear data structure where elements are added and removed strictly from the top.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Stack (LIFO).
**When to use it.** Use this lesson to study Stack (LIFO) and compare its assumptions and bounds with related entries.
**Common mistake.** Attempting to Pop or Peek on an empty stack leads to Stack Underflow exception.
**Exam note.** Applications in CS: Function call recursion stack, parenthesis matching, infix to postfix, undo operations.

#### Trace study questions

1. **Stack (LIFO):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Stack (LIFO):** What output or terminal status should a correct execution produce?
3. **Stack (LIFO):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Stack (LIFO):** What is the smallest meaningful state transition in this implementation?
5. **Stack (LIFO):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Stack (LIFO):** What condition allows execution to proceed to the next candidate?
7. **Stack (LIFO):** What condition makes the algorithm stop?
8. **Stack (LIFO):** Which values should be written in a dry-run table before the first update?
9. **Stack (LIFO):** Which values should be written after one complete loop iteration or recursive call?
10. **Stack (LIFO):** Which invariant or correctness property can be checked after this frame?
11. **Stack (LIFO):** Which assumption is required for the selected algorithm to be correct?
12. **Stack (LIFO):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Stack (LIFO):** What input follows the best-case behavior listed in the source catalog?
14. **Stack (LIFO):** What input shape can trigger the listed worst-case behavior?
15. **Stack (LIFO):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Stack (LIFO):** What should happen for an empty or minimal input if the UI permits it?
17. **Stack (LIFO):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Stack (LIFO):** What auxiliary storage is allocated and when can it be released?
19. **Stack (LIFO):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Stack (LIFO):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Stack (LIFO):** What result would demonstrate that this trace has finished correctly?
22. **Stack (LIFO):** Which independent test assertion could catch a bug in this transition?
23. **Stack (LIFO):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Stack (LIFO):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(1), worst time O(1), and auxiliary space O(n).
1. **Stack (LIFO):** Name the input-size variable used in the published time bound.
2. **Stack (LIFO):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Stack (LIFO):** Identify the operation performed once per outer iteration.
4. **Stack (LIFO):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Stack (LIFO):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Stack (LIFO):** Explain how the input structure changes the amount of work.
7. **Stack (LIFO):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Stack (LIFO):** Separate comparisons from writes or swaps where appropriate.
9. **Stack (LIFO):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Stack (LIFO):** Explain why the average-case entry may differ from both best and worst case.
11. **Stack (LIFO):** Describe what auxiliary space counts for this algorithm.
12. **Stack (LIFO):** Check whether recursion stack space is included in the documented space bound.
13. **Stack (LIFO):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Stack (LIFO):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Stack (LIFO):** Explain which code operation dominates as the input grows.
16. **Stack (LIFO):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
class Stack:
  top = -1
  push(x):
    top = top + 1
    A[top] = x
  pop():
    val = A[top]
    top = top - 1
    return val
  peek():
    return A[top]
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Stack (LIFO); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Check the index and boundary for this Stack (LIFO) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 6:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.
- **PSEUDO line 7:** Check the index and boundary for this Stack (LIFO) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 8:** Trace source line 8 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 9:** Record the result or trace state returned by Stack (LIFO); check that every required exit path reaches a valid result.
- **PSEUDO line 10:** Trace source line 10 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 11:** Record the result or trace state returned by Stack (LIFO); check that every required exit path reaches a valid result.

##### CPP reference

```cpp
stack<int> s;
s.push(10);
s.push(20);
int topVal = s.top(); // 20
s.pop();
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.
- **CPP line 3:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.

##### JAVA reference

```java
Stack<Integer> s = new Stack<>();
s.push(10);
s.push(20);
int topVal = s.peek(); // 20
s.pop();
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Identify the storage created for Stack (LIFO); state its size, lifetime, and contribution to auxiliary-space complexity.
- **JAVA line 2:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.
- **JAVA line 3:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.

##### PYTHON reference

```python
stack = []
stack.append(10)
stack.append(20)
top_val = stack[-1]  # 20
popped = stack.pop()
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Check the index and boundary for this Stack (LIFO) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 5:** Track the collection mutation made by Stack (LIFO); compare the collection immediately before and after this statement.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| LIFO | Last In, First Out. |
| Underflow | Popping from an empty stack. |
| Overflow | Pushing to a full fixed-size stack. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Stack (LIFO) without reading the code.

**Practice task:** Build one small input for Stack (LIFO), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Stack (LIFO) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Queue (FIFO)

**Catalog identifier:** `queue_ds`  
**Course category:** Data Structures  
**Catalog position:** 7 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | FIFO Storage |
| Best-case time | O(1) |
| Average-case time | O(1) |
| Worst-case time | O(1) |
| Auxiliary space | O(n) |
| Stable | N/A |
| In place | N/A |
| Default input | `[1,2,3,4]` |
| Input requirement | Enqueue and Dequeue sequence |

#### Concept and teaching notes

**Short description.** Linear structure where elements are inserted at the rear and removed from the front.
**Definition.** Linear structure where elements are inserted at the rear and removed from the front.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Queue (FIFO).
**When to use it.** Use this lesson to study Queue (FIFO) and compare its assumptions and bounds with related entries.
**Common mistake.** Using a linear array without circular wrap-around causes false overflow even when front cells are vacant.
**Exam note.** Essential for Level-Order tree traversal, BFS in graphs, CPU scheduling queues, and printer spoolers.

#### Trace study questions

1. **Queue (FIFO):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Queue (FIFO):** What output or terminal status should a correct execution produce?
3. **Queue (FIFO):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Queue (FIFO):** What is the smallest meaningful state transition in this implementation?
5. **Queue (FIFO):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Queue (FIFO):** What condition allows execution to proceed to the next candidate?
7. **Queue (FIFO):** What condition makes the algorithm stop?
8. **Queue (FIFO):** Which values should be written in a dry-run table before the first update?
9. **Queue (FIFO):** Which values should be written after one complete loop iteration or recursive call?
10. **Queue (FIFO):** Which invariant or correctness property can be checked after this frame?
11. **Queue (FIFO):** Which assumption is required for the selected algorithm to be correct?
12. **Queue (FIFO):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Queue (FIFO):** What input follows the best-case behavior listed in the source catalog?
14. **Queue (FIFO):** What input shape can trigger the listed worst-case behavior?
15. **Queue (FIFO):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Queue (FIFO):** What should happen for an empty or minimal input if the UI permits it?
17. **Queue (FIFO):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Queue (FIFO):** What auxiliary storage is allocated and when can it be released?
19. **Queue (FIFO):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Queue (FIFO):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Queue (FIFO):** What result would demonstrate that this trace has finished correctly?
22. **Queue (FIFO):** Which independent test assertion could catch a bug in this transition?
23. **Queue (FIFO):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Queue (FIFO):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(1), worst time O(1), and auxiliary space O(n).
1. **Queue (FIFO):** Name the input-size variable used in the published time bound.
2. **Queue (FIFO):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Queue (FIFO):** Identify the operation performed once per outer iteration.
4. **Queue (FIFO):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Queue (FIFO):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Queue (FIFO):** Explain how the input structure changes the amount of work.
7. **Queue (FIFO):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Queue (FIFO):** Separate comparisons from writes or swaps where appropriate.
9. **Queue (FIFO):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Queue (FIFO):** Explain why the average-case entry may differ from both best and worst case.
11. **Queue (FIFO):** Describe what auxiliary space counts for this algorithm.
12. **Queue (FIFO):** Check whether recursion stack space is included in the documented space bound.
13. **Queue (FIFO):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Queue (FIFO):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Queue (FIFO):** Explain which code operation dominates as the input grows.
16. **Queue (FIFO):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
class Queue:
  enqueue(x):
    rear = (rear + 1) % MAX
    A[rear] = x
  dequeue():
    val = A[front]
    front = (front + 1) % MAX
    return val
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Queue (FIFO); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Check the index and boundary for this Queue (FIFO) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Check the index and boundary for this Queue (FIFO) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Record the result or trace state returned by Queue (FIFO); check that every required exit path reaches a valid result.

##### CPP reference

```cpp
queue<int> q;
q.push(10); // enqueue
q.push(20);
int frontVal = q.front();
q.pop();    // dequeue
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Track the collection mutation made by Queue (FIFO); compare the collection immediately before and after this statement.
- **CPP line 3:** Track the collection mutation made by Queue (FIFO); compare the collection immediately before and after this statement.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Track the collection mutation made by Queue (FIFO); compare the collection immediately before and after this statement.

##### JAVA reference

```java
Queue<Integer> q = new LinkedList<>();
q.offer(10);
q.offer(20);
int frontVal = q.peek();
q.poll();
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Identify the storage created for Queue (FIFO); state its size, lifetime, and contribution to auxiliary-space complexity.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Trace source line 3 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Trace source line 5 in java: record the values it reads, the state it changes, and the next statement it enables.

##### PYTHON reference

```python
from collections import deque
q = deque()
q.append(10)
q.append(20)
front_val = q[0]
popped = q.popleft()
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Check the index and boundary for this Queue (FIFO) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 6:** Trace source line 6 in python: record the values it reads, the state it changes, and the next statement it enables.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| FIFO | First In, First Out. |
| Circular Queue | Connects rear back to front using modulo arithmetic to prevent space wastage. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Queue (FIFO) without reading the code.

**Practice task:** Build one small input for Queue (FIFO), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Queue (FIFO) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Breadth-First Search (BFS)

**Catalog identifier:** `graph_bfs`  
**Course category:** Graphs  
**Catalog position:** 8 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Level-order Traversal |
| Best-case time | O(V + E) |
| Average-case time | O(V + E) |
| Worst-case time | O(V + E) |
| Auxiliary space | O(V) |
| Stable | N/A |
| In place | No |
| Default input | `[0,1,2,3,4,5]` |
| Input requirement | Unweighted directed/undirected graph vertices |

#### Concept and teaching notes

**Short description.** Explores a graph level by level from a source vertex using a FIFO Queue.
**Definition.** Explores a graph level by level from a source vertex using a FIFO Queue.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Breadth-First Search (BFS).
**When to use it.** Use this lesson to study Breadth-First Search (BFS) and compare its assumptions and bounds with related entries.
**Common mistake.** Forgetting to mark a vertex as visited immediately upon enqueuing causes redundant re-enqueuing and exponential queue blowout.
**Exam note.** BFS guarantees the shortest path (minimum number of edges) in an unweighted graph.

#### Trace study questions

1. **Breadth-First Search (BFS):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Breadth-First Search (BFS):** What output or terminal status should a correct execution produce?
3. **Breadth-First Search (BFS):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Breadth-First Search (BFS):** What is the smallest meaningful state transition in this implementation?
5. **Breadth-First Search (BFS):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Breadth-First Search (BFS):** What condition allows execution to proceed to the next candidate?
7. **Breadth-First Search (BFS):** What condition makes the algorithm stop?
8. **Breadth-First Search (BFS):** Which values should be written in a dry-run table before the first update?
9. **Breadth-First Search (BFS):** Which values should be written after one complete loop iteration or recursive call?
10. **Breadth-First Search (BFS):** Which invariant or correctness property can be checked after this frame?
11. **Breadth-First Search (BFS):** Which assumption is required for the selected algorithm to be correct?
12. **Breadth-First Search (BFS):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Breadth-First Search (BFS):** What input follows the best-case behavior listed in the source catalog?
14. **Breadth-First Search (BFS):** What input shape can trigger the listed worst-case behavior?
15. **Breadth-First Search (BFS):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Breadth-First Search (BFS):** What should happen for an empty or minimal input if the UI permits it?
17. **Breadth-First Search (BFS):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Breadth-First Search (BFS):** What auxiliary storage is allocated and when can it be released?
19. **Breadth-First Search (BFS):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Breadth-First Search (BFS):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Breadth-First Search (BFS):** What result would demonstrate that this trace has finished correctly?
22. **Breadth-First Search (BFS):** Which independent test assertion could catch a bug in this transition?
23. **Breadth-First Search (BFS):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Breadth-First Search (BFS):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(V + E), average time O(V + E), worst time O(V + E), and auxiliary space O(V).
1. **Breadth-First Search (BFS):** Name the input-size variable used in the published time bound.
2. **Breadth-First Search (BFS):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Breadth-First Search (BFS):** Identify the operation performed once per outer iteration.
4. **Breadth-First Search (BFS):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Breadth-First Search (BFS):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Breadth-First Search (BFS):** Explain how the input structure changes the amount of work.
7. **Breadth-First Search (BFS):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Breadth-First Search (BFS):** Separate comparisons from writes or swaps where appropriate.
9. **Breadth-First Search (BFS):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Breadth-First Search (BFS):** Explain why the average-case entry may differ from both best and worst case.
11. **Breadth-First Search (BFS):** Describe what auxiliary space counts for this algorithm.
12. **Breadth-First Search (BFS):** Check whether recursion stack space is included in the documented space bound.
13. **Breadth-First Search (BFS):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Breadth-First Search (BFS):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Breadth-First Search (BFS):** Explain which code operation dominates as the input grows.
16. **Breadth-First Search (BFS):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function BFS(graph, start):
  visited = set()
  queue = [start]
  visited.add(start)
  while queue is not empty:
    u = queue.dequeue()
    for neighbor v in graph[u]:
      if v not in visited:
        visited.add(v)
        queue.enqueue(v)
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Breadth-First Search (BFS); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Track the collection mutation made by Breadth-First Search (BFS); compare the collection immediately before and after this statement.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Track the collection mutation made by Breadth-First Search (BFS); compare the collection immediately before and after this statement.
- **PSEUDO line 5:** Trace this repetition in Breadth-First Search (BFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Trace this repetition in Breadth-First Search (BFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 8:** Evaluate this branch for the current Breadth-First Search (BFS) state; note which alternative runs and which states are excluded.
- **PSEUDO line 9:** Track the collection mutation made by Breadth-First Search (BFS); compare the collection immediately before and after this statement.
- **PSEUDO line 10:** Trace source line 10 in pseudo: record the values it reads, the state it changes, and the next statement it enables.

##### CPP reference

```cpp
void bfs(int start, const vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    visited[start] = true;
    q.push(start);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Name the state represented by this Breadth-First Search (BFS) variable and record its value before its first update.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Check the index and boundary for this Breadth-First Search (BFS) access; state which input or auxiliary cell is read or updated.
- **CPP line 5:** Track the collection mutation made by Breadth-First Search (BFS); compare the collection immediately before and after this statement.
- **CPP line 6:** Trace this repetition in Breadth-First Search (BFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 7:** Track the collection mutation made by Breadth-First Search (BFS); compare the collection immediately before and after this statement.
- **CPP line 8:** Trace this repetition in Breadth-First Search (BFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 9:** Evaluate this branch for the current Breadth-First Search (BFS) state; note which alternative runs and which states are excluded.
- **CPP line 10:** Check the index and boundary for this Breadth-First Search (BFS) access; state which input or auxiliary cell is read or updated.
- **CPP line 11:** Track the collection mutation made by Breadth-First Search (BFS); compare the collection immediately before and after this statement.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Breadth-First Search (BFS) control-flow scope clear.
- **CPP line 13:** Match this closing delimiter with its opening block to keep the Breadth-First Search (BFS) control-flow scope clear.
- **CPP line 14:** Match this closing delimiter with its opening block to keep the Breadth-First Search (BFS) control-flow scope clear.
- **CPP line 15:** Match this closing delimiter with its opening block to keep the Breadth-First Search (BFS) control-flow scope clear.

##### JAVA reference

```java
void bfs(int start, List<List<Integer>> adj) {
    boolean[] visited = new boolean[adj.size()];
    Queue<Integer> q = new LinkedList<>();
    visited[start] = true;
    q.offer(start);
    while (!q.isEmpty()) {
        int u = q.poll();
        for (int v : adj.get(u)) {
            if (!visited[v]) {
                visited[v] = true;
                q.offer(v);
            }
        }
    }
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Check the index and boundary for this Breadth-First Search (BFS) access; state which input or auxiliary cell is read or updated.
- **JAVA line 3:** Identify the storage created for Breadth-First Search (BFS); state its size, lifetime, and contribution to auxiliary-space complexity.
- **JAVA line 4:** Check the index and boundary for this Breadth-First Search (BFS) access; state which input or auxiliary cell is read or updated.
- **JAVA line 5:** Trace source line 5 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 6:** Trace this repetition in Breadth-First Search (BFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 7:** Trace source line 7 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 8:** Trace this repetition in Breadth-First Search (BFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 9:** Evaluate this branch for the current Breadth-First Search (BFS) state; note which alternative runs and which states are excluded.
- **JAVA line 10:** Check the index and boundary for this Breadth-First Search (BFS) access; state which input or auxiliary cell is read or updated.
- **JAVA line 11:** Trace source line 11 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 12:** Match this closing delimiter with its opening block to keep the Breadth-First Search (BFS) control-flow scope clear.
- **JAVA line 13:** Match this closing delimiter with its opening block to keep the Breadth-First Search (BFS) control-flow scope clear.
- **JAVA line 14:** Match this closing delimiter with its opening block to keep the Breadth-First Search (BFS) control-flow scope clear.
- **JAVA line 15:** Match this closing delimiter with its opening block to keep the Breadth-First Search (BFS) control-flow scope clear.

##### PYTHON reference

```python
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        u = queue.popleft()
        for v in graph[u]:
            if v not in visited:
                visited.add(v)
                queue.append(v)
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace this repetition in Breadth-First Search (BFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 5:** Trace source line 5 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 6:** Trace this repetition in Breadth-First Search (BFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 7:** Evaluate this branch for the current Breadth-First Search (BFS) state; note which alternative runs and which states are excluded.
- **PYTHON line 8:** Track the collection mutation made by Breadth-First Search (BFS); compare the collection immediately before and after this statement.
- **PYTHON line 9:** Trace source line 9 in python: record the values it reads, the state it changes, and the next statement it enables.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Visited Set | Tracks vertices that have entered the queue to prevent infinite cycles. |
| Shortest Path Property | In unweighted graphs, the first time BFS visits a node, it arrives via the shortest route. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Breadth-First Search (BFS) without reading the code.

**Practice task:** Build one small input for Breadth-First Search (BFS), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Breadth-First Search (BFS) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### 0/1 Knapsack Problem

**Catalog identifier:** `knapsack_dp`  
**Course category:** Dynamic Programming  
**Catalog position:** 9 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Dynamic Programming |
| Best-case time | O(n * W) |
| Average-case time | O(n * W) |
| Worst-case time | O(n * W) |
| Auxiliary space | O(n * W) |
| Stable | N/A |
| In place | No |
| Default input | `[2,3,4,5]` |
| Input requirement | Item weights, values, and knapsack capacity W |

#### Concept and teaching notes

**Short description.** Maximize value within a weight capacity where each item can either be taken or left behind.
**Definition.** Maximize value within a weight capacity where each item can either be taken or left behind.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for 0/1 Knapsack Problem.
**When to use it.** Use this lesson to study 0/1 Knapsack Problem and compare its assumptions and bounds with related entries.
**Common mistake.** Assuming greedy choice (highest value/weight ratio) works for 0/1 knapsack. Greedy works ONLY for Fractional Knapsack!
**Exam note.** Knapsack time complexity O(n*W) is Pseudo-polynomial because W depends on the numeric value, not the number of bits in input.

#### Trace study questions

1. **0/1 Knapsack Problem:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **0/1 Knapsack Problem:** What output or terminal status should a correct execution produce?
3. **0/1 Knapsack Problem:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **0/1 Knapsack Problem:** What is the smallest meaningful state transition in this implementation?
5. **0/1 Knapsack Problem:** Which variable, index, pointer, node, or table cell controls that transition?
6. **0/1 Knapsack Problem:** What condition allows execution to proceed to the next candidate?
7. **0/1 Knapsack Problem:** What condition makes the algorithm stop?
8. **0/1 Knapsack Problem:** Which values should be written in a dry-run table before the first update?
9. **0/1 Knapsack Problem:** Which values should be written after one complete loop iteration or recursive call?
10. **0/1 Knapsack Problem:** Which invariant or correctness property can be checked after this frame?
11. **0/1 Knapsack Problem:** Which assumption is required for the selected algorithm to be correct?
12. **0/1 Knapsack Problem:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **0/1 Knapsack Problem:** What input follows the best-case behavior listed in the source catalog?
14. **0/1 Knapsack Problem:** What input shape can trigger the listed worst-case behavior?
15. **0/1 Knapsack Problem:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **0/1 Knapsack Problem:** What should happen for an empty or minimal input if the UI permits it?
17. **0/1 Knapsack Problem:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **0/1 Knapsack Problem:** What auxiliary storage is allocated and when can it be released?
19. **0/1 Knapsack Problem:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **0/1 Knapsack Problem:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **0/1 Knapsack Problem:** What result would demonstrate that this trace has finished correctly?
22. **0/1 Knapsack Problem:** Which independent test assertion could catch a bug in this transition?
23. **0/1 Knapsack Problem:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **0/1 Knapsack Problem:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n * W), average time O(n * W), worst time O(n * W), and auxiliary space O(n * W).
1. **0/1 Knapsack Problem:** Name the input-size variable used in the published time bound.
2. **0/1 Knapsack Problem:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **0/1 Knapsack Problem:** Identify the operation performed once per outer iteration.
4. **0/1 Knapsack Problem:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **0/1 Knapsack Problem:** Write a rough operation count for the smallest meaningful demonstration input.
6. **0/1 Knapsack Problem:** Explain how the input structure changes the amount of work.
7. **0/1 Knapsack Problem:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **0/1 Knapsack Problem:** Separate comparisons from writes or swaps where appropriate.
9. **0/1 Knapsack Problem:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **0/1 Knapsack Problem:** Explain why the average-case entry may differ from both best and worst case.
11. **0/1 Knapsack Problem:** Describe what auxiliary space counts for this algorithm.
12. **0/1 Knapsack Problem:** Check whether recursion stack space is included in the documented space bound.
13. **0/1 Knapsack Problem:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **0/1 Knapsack Problem:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **0/1 Knapsack Problem:** Explain which code operation dominates as the input grows.
16. **0/1 Knapsack Problem:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
dp[i][w] = max(
  dp[i-1][w],
  dp[i-1][w - wt[i-1]] + val[i-1] (if w >= wt[i-1])
)
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 2:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 3:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 4:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Problem control-flow scope clear.

##### CPP reference

```cpp
int knapSack(int W, const vector<int>& wt, const vector<int>& val, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Name the state represented by this 0/1 Knapsack Problem variable and record its value before its first update.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace this repetition in 0/1 Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Trace this repetition in 0/1 Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Evaluate this branch for the current 0/1 Knapsack Problem state; note which alternative runs and which states are excluded.
- **CPP line 6:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **CPP line 7:** Evaluate this branch for the current 0/1 Knapsack Problem state; note which alternative runs and which states are excluded.
- **CPP line 8:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Problem control-flow scope clear.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Problem control-flow scope clear.
- **CPP line 11:** Record the result or trace state returned by 0/1 Knapsack Problem; check that every required exit path reaches a valid result.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Problem control-flow scope clear.

##### JAVA reference

```java
public static int knapSack(int W, int[] wt, int[] val, int n) {
    int[][] dp = new int[n + 1][W + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (wt[i - 1] <= w)
                dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            else
                dp[i][w] = dp[i - 1][w];
        }
    }
    return dp[n][W];
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **JAVA line 3:** Trace this repetition in 0/1 Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 4:** Trace this repetition in 0/1 Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 5:** Evaluate this branch for the current 0/1 Knapsack Problem state; note which alternative runs and which states are excluded.
- **JAVA line 6:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **JAVA line 7:** Evaluate this branch for the current 0/1 Knapsack Problem state; note which alternative runs and which states are excluded.
- **JAVA line 8:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **JAVA line 9:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Problem control-flow scope clear.
- **JAVA line 10:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Problem control-flow scope clear.
- **JAVA line 11:** Record the result or trace state returned by 0/1 Knapsack Problem; check that every required exit path reaches a valid result.
- **JAVA line 12:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Problem control-flow scope clear.

##### PYTHON reference

```python
def knapsack(W, wt, val, n):
    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if wt[i - 1] <= w:
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][W]
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace this repetition in 0/1 Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 4:** Trace this repetition in 0/1 Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 5:** Evaluate this branch for the current 0/1 Knapsack Problem state; note which alternative runs and which states are excluded.
- **PYTHON line 6:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **PYTHON line 7:** Evaluate this branch for the current 0/1 Knapsack Problem state; note which alternative runs and which states are excluded.
- **PYTHON line 8:** Check the index and boundary for this 0/1 Knapsack Problem access; state which input or auxiliary cell is read or updated.
- **PYTHON line 9:** Record the result or trace state returned by 0/1 Knapsack Problem; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Optimal Substructure | An optimal solution contains optimal solutions to its subproblems. |
| Overlapping Subproblems | Subproblems are recomputed multiple times in a naive recursive solution. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for 0/1 Knapsack Problem without reading the code.

**Practice task:** Build one small input for 0/1 Knapsack Problem, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the 0/1 Knapsack Problem short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### N-Queens Problem

**Catalog identifier:** `n_queens`  
**Course category:** Backtracking  
**Catalog position:** 10 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Backtracking Depth-First Search |
| Best-case time | O(N!) |
| Average-case time | O(N!) |
| Worst-case time | O(N!) |
| Auxiliary space | O(N) |
| Stable | N/A |
| In place | Yes |
| Default input | `[4]` |
| Input requirement | Board dimension N (e.g. 4 for 4x4 chessboard) |

#### Concept and teaching notes

**Short description.** Place N chess queens on an N×N board so that no two queens threaten each other.
**Definition.** Place N chess queens on an N×N board so that no two queens threaten each other.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for N-Queens Problem.
**When to use it.** Use this lesson to study N-Queens Problem and compare its assumptions and bounds with related entries.
**Common mistake.** Only checking horizontal and vertical threats. Diagonal threats occur when |row1 - row2| == |col1 - col2|.
**Exam note.** For N=1 and N>=4, valid solutions always exist. N=2 and N=3 have 0 solutions.

#### Trace study questions

1. **N-Queens Problem:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **N-Queens Problem:** What output or terminal status should a correct execution produce?
3. **N-Queens Problem:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **N-Queens Problem:** What is the smallest meaningful state transition in this implementation?
5. **N-Queens Problem:** Which variable, index, pointer, node, or table cell controls that transition?
6. **N-Queens Problem:** What condition allows execution to proceed to the next candidate?
7. **N-Queens Problem:** What condition makes the algorithm stop?
8. **N-Queens Problem:** Which values should be written in a dry-run table before the first update?
9. **N-Queens Problem:** Which values should be written after one complete loop iteration or recursive call?
10. **N-Queens Problem:** Which invariant or correctness property can be checked after this frame?
11. **N-Queens Problem:** Which assumption is required for the selected algorithm to be correct?
12. **N-Queens Problem:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **N-Queens Problem:** What input follows the best-case behavior listed in the source catalog?
14. **N-Queens Problem:** What input shape can trigger the listed worst-case behavior?
15. **N-Queens Problem:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **N-Queens Problem:** What should happen for an empty or minimal input if the UI permits it?
17. **N-Queens Problem:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **N-Queens Problem:** What auxiliary storage is allocated and when can it be released?
19. **N-Queens Problem:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **N-Queens Problem:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **N-Queens Problem:** What result would demonstrate that this trace has finished correctly?
22. **N-Queens Problem:** Which independent test assertion could catch a bug in this transition?
23. **N-Queens Problem:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **N-Queens Problem:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(N!), average time O(N!), worst time O(N!), and auxiliary space O(N).
1. **N-Queens Problem:** Name the input-size variable used in the published time bound.
2. **N-Queens Problem:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **N-Queens Problem:** Identify the operation performed once per outer iteration.
4. **N-Queens Problem:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **N-Queens Problem:** Write a rough operation count for the smallest meaningful demonstration input.
6. **N-Queens Problem:** Explain how the input structure changes the amount of work.
7. **N-Queens Problem:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **N-Queens Problem:** Separate comparisons from writes or swaps where appropriate.
9. **N-Queens Problem:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **N-Queens Problem:** Explain why the average-case entry may differ from both best and worst case.
11. **N-Queens Problem:** Describe what auxiliary space counts for this algorithm.
12. **N-Queens Problem:** Check whether recursion stack space is included in the documented space bound.
13. **N-Queens Problem:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **N-Queens Problem:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **N-Queens Problem:** Explain which code operation dominates as the input grows.
16. **N-Queens Problem:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function solveNQueens(row):
  if row == N:
    recordSolution()
    return
  for col from 0 to N - 1:
    if isSafe(row, col):
      placeQueen(row, col)
      solveNQueens(row + 1)
      removeQueen(row, col) // backtrack
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for N-Queens Problem; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Evaluate this branch for the current N-Queens Problem state; note which alternative runs and which states are excluded.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Record the result or trace state returned by N-Queens Problem; check that every required exit path reaches a valid result.
- **PSEUDO line 5:** Trace this repetition in N-Queens Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Evaluate this branch for the current N-Queens Problem state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Trace source line 8 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 9:** Trace source line 9 in pseudo: record the values it reads, the state it changes, and the next statement it enables.

##### CPP reference

```cpp
bool isSafe(int row, int col, vector<int>& board) {
    for (int r = 0; r < row; r++) {
        if (board[r] == col || abs(board[r] - col) == abs(r - row))
            return false;
    }
    return true;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace this repetition in N-Queens Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 3:** Evaluate this branch for the current N-Queens Problem state; note which alternative runs and which states are excluded.
- **CPP line 4:** Record the result or trace state returned by N-Queens Problem; check that every required exit path reaches a valid result.
- **CPP line 5:** Match this closing delimiter with its opening block to keep the N-Queens Problem control-flow scope clear.
- **CPP line 6:** Record the result or trace state returned by N-Queens Problem; check that every required exit path reaches a valid result.
- **CPP line 7:** Match this closing delimiter with its opening block to keep the N-Queens Problem control-flow scope clear.

##### JAVA reference

```java
boolean isSafe(int row, int col, int[] board) {
    for (int r = 0; r < row; r++) {
        if (board[r] == col || Math.abs(board[r] - col) == Math.abs(r - row))
            return false;
    }
    return true;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace this repetition in N-Queens Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 3:** Evaluate this branch for the current N-Queens Problem state; note which alternative runs and which states are excluded.
- **JAVA line 4:** Record the result or trace state returned by N-Queens Problem; check that every required exit path reaches a valid result.
- **JAVA line 5:** Match this closing delimiter with its opening block to keep the N-Queens Problem control-flow scope clear.
- **JAVA line 6:** Record the result or trace state returned by N-Queens Problem; check that every required exit path reaches a valid result.
- **JAVA line 7:** Match this closing delimiter with its opening block to keep the N-Queens Problem control-flow scope clear.

##### PYTHON reference

```python
def is_safe(row, col, board):
    for r in range(row):
        if board[r] == col or abs(board[r] - col) == abs(r - row):
            return False
    return True
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace this repetition in N-Queens Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 3:** Evaluate this branch for the current N-Queens Problem state; note which alternative runs and which states are excluded.
- **PYTHON line 4:** Record the result or trace state returned by N-Queens Problem; check that every required exit path reaches a valid result.
- **PYTHON line 5:** Record the result or trace state returned by N-Queens Problem; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Pruning | Terminating exploration of a branch early as soon as a constraint is violated. |
| State Space Tree | Tree representing all candidate configurations explored during backtracking. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for N-Queens Problem without reading the code.

**Practice task:** Build one small input for N-Queens Problem, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the N-Queens Problem short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Activity Selection (Interval Scheduling)

**Catalog identifier:** `activity_selection`  
**Course category:** Greedy  
**Catalog position:** 11 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Greedy Method |
| Best-case time | O(n log n) |
| Average-case time | O(n log n) |
| Worst-case time | O(n log n) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[1,3,0,5,8,5]` |
| Input requirement | Activity start and finish intervals |

#### Concept and teaching notes

**Short description.** Greedily select maximum number of non-overlapping activities by sorting by finish time.
**Definition.** Greedily select maximum number of non-overlapping activities by sorting by finish time.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Activity Selection (Interval Scheduling).
**When to use it.** Use this lesson to study Activity Selection (Interval Scheduling) and compare its assumptions and bounds with related entries.
**Common mistake.** Sorting by start time or shortest duration instead of earliest finish time.
**Exam note.** Greedy Choice Property: The earliest finishing activity always leaves maximum room for remaining activities.

#### Trace study questions

1. **Activity Selection (Interval Scheduling):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Activity Selection (Interval Scheduling):** What output or terminal status should a correct execution produce?
3. **Activity Selection (Interval Scheduling):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Activity Selection (Interval Scheduling):** What is the smallest meaningful state transition in this implementation?
5. **Activity Selection (Interval Scheduling):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Activity Selection (Interval Scheduling):** What condition allows execution to proceed to the next candidate?
7. **Activity Selection (Interval Scheduling):** What condition makes the algorithm stop?
8. **Activity Selection (Interval Scheduling):** Which values should be written in a dry-run table before the first update?
9. **Activity Selection (Interval Scheduling):** Which values should be written after one complete loop iteration or recursive call?
10. **Activity Selection (Interval Scheduling):** Which invariant or correctness property can be checked after this frame?
11. **Activity Selection (Interval Scheduling):** Which assumption is required for the selected algorithm to be correct?
12. **Activity Selection (Interval Scheduling):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Activity Selection (Interval Scheduling):** What input follows the best-case behavior listed in the source catalog?
14. **Activity Selection (Interval Scheduling):** What input shape can trigger the listed worst-case behavior?
15. **Activity Selection (Interval Scheduling):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Activity Selection (Interval Scheduling):** What should happen for an empty or minimal input if the UI permits it?
17. **Activity Selection (Interval Scheduling):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Activity Selection (Interval Scheduling):** What auxiliary storage is allocated and when can it be released?
19. **Activity Selection (Interval Scheduling):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Activity Selection (Interval Scheduling):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Activity Selection (Interval Scheduling):** What result would demonstrate that this trace has finished correctly?
22. **Activity Selection (Interval Scheduling):** Which independent test assertion could catch a bug in this transition?
23. **Activity Selection (Interval Scheduling):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Activity Selection (Interval Scheduling):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n log n), average time O(n log n), worst time O(n log n), and auxiliary space O(1).
1. **Activity Selection (Interval Scheduling):** Name the input-size variable used in the published time bound.
2. **Activity Selection (Interval Scheduling):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Activity Selection (Interval Scheduling):** Identify the operation performed once per outer iteration.
4. **Activity Selection (Interval Scheduling):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Activity Selection (Interval Scheduling):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Activity Selection (Interval Scheduling):** Explain how the input structure changes the amount of work.
7. **Activity Selection (Interval Scheduling):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Activity Selection (Interval Scheduling):** Separate comparisons from writes or swaps where appropriate.
9. **Activity Selection (Interval Scheduling):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Activity Selection (Interval Scheduling):** Explain why the average-case entry may differ from both best and worst case.
11. **Activity Selection (Interval Scheduling):** Describe what auxiliary space counts for this algorithm.
12. **Activity Selection (Interval Scheduling):** Check whether recursion stack space is included in the documented space bound.
13. **Activity Selection (Interval Scheduling):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Activity Selection (Interval Scheduling):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Activity Selection (Interval Scheduling):** Explain which code operation dominates as the input grows.
16. **Activity Selection (Interval Scheduling):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function activitySelection(start, finish):
  sort activities by finish time
  selected = [activities[0]]
  last_finish = activities[0].finish
  for i from 1 to n - 1:
    if activities[i].start >= last_finish:
      selected.append(activities[i])
      last_finish = activities[i].finish
  return selected
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Activity Selection (Interval Scheduling); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 4:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 5:** Trace this repetition in Activity Selection (Interval Scheduling): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Evaluate this branch for the current Activity Selection (Interval Scheduling) state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 8:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 9:** Record the result or trace state returned by Activity Selection (Interval Scheduling); check that every required exit path reaches a valid result.

##### CPP reference

```cpp
vector<int> selectActivities(vector<pair<int, int>>& act) {
    sort(act.begin(), act.end(), [](auto& a, auto& b) { return a.second < b.second; });
    vector<int> res = {0};
    int lastFinish = act[0].second;
    for (int i = 1; i < act.size(); i++) {
        if (act[i].first >= lastFinish) {
            res.push_back(i);
            lastFinish = act[i].second;
        }
    }
    return res;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Track the collection mutation made by Activity Selection (Interval Scheduling); compare the collection immediately before and after this statement.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **CPP line 5:** Trace this repetition in Activity Selection (Interval Scheduling): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Evaluate this branch for the current Activity Selection (Interval Scheduling) state; note which alternative runs and which states are excluded.
- **CPP line 7:** Trace source line 7 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 8:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Activity Selection (Interval Scheduling) control-flow scope clear.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Activity Selection (Interval Scheduling) control-flow scope clear.
- **CPP line 11:** Record the result or trace state returned by Activity Selection (Interval Scheduling); check that every required exit path reaches a valid result.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Activity Selection (Interval Scheduling) control-flow scope clear.

##### JAVA reference

```java
public static List<Integer> selectActivities(int[] start, int[] finish) {
    List<Integer> res = new ArrayList<>();
    res.add(0);
    int lastFinish = finish[0];
    for (int i = 1; i < start.length; i++) {
        if (start[i] >= lastFinish) {
            res.add(i);
            lastFinish = finish[i];
        }
    }
    return res;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Identify the storage created for Activity Selection (Interval Scheduling); state its size, lifetime, and contribution to auxiliary-space complexity.
- **JAVA line 3:** Track the collection mutation made by Activity Selection (Interval Scheduling); compare the collection immediately before and after this statement.
- **JAVA line 4:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **JAVA line 5:** Trace this repetition in Activity Selection (Interval Scheduling): write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 6:** Evaluate this branch for the current Activity Selection (Interval Scheduling) state; note which alternative runs and which states are excluded.
- **JAVA line 7:** Track the collection mutation made by Activity Selection (Interval Scheduling); compare the collection immediately before and after this statement.
- **JAVA line 8:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **JAVA line 9:** Match this closing delimiter with its opening block to keep the Activity Selection (Interval Scheduling) control-flow scope clear.
- **JAVA line 10:** Match this closing delimiter with its opening block to keep the Activity Selection (Interval Scheduling) control-flow scope clear.
- **JAVA line 11:** Record the result or trace state returned by Activity Selection (Interval Scheduling); check that every required exit path reaches a valid result.
- **JAVA line 12:** Match this closing delimiter with its opening block to keep the Activity Selection (Interval Scheduling) control-flow scope clear.

##### PYTHON reference

```python
def activity_selection(start, finish):
    activities = sorted(zip(start, finish), key=lambda x: x[1])
    selected = [activities[0]]
    last_finish = activities[0][1]
    for act in activities[1:]:
        if act[0] >= last_finish:
            selected.append(act)
            last_finish = act[1]
    return selected
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 3:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 4:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 5:** Trace this repetition in Activity Selection (Interval Scheduling): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 6:** Evaluate this branch for the current Activity Selection (Interval Scheduling) state; note which alternative runs and which states are excluded.
- **PYTHON line 7:** Trace source line 7 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 8:** Check the index and boundary for this Activity Selection (Interval Scheduling) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 9:** Record the result or trace state returned by Activity Selection (Interval Scheduling); check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Interval Scheduling | Optimal selection of compatible intervals that do not overlap. |
| Greedy Choice Property | A globally optimal choice can be reached by making a locally optimal choice. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Activity Selection (Interval Scheduling) without reading the code.

**Practice task:** Build one small input for Activity Selection (Interval Scheduling), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Activity Selection (Interval Scheduling) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Euclidean GCD Algorithm

**Catalog identifier:** `euclidean_gcd`  
**Course category:** Number Theory  
**Catalog position:** 12 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Decrease and Conquer |
| Best-case time | O(1) |
| Average-case time | O(log(min(a, b))) |
| Worst-case time | O(log(min(a, b))) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[48,18]` |
| Input requirement | Two positive integers [a, b] (e.g. 48, 18) |

#### Concept and teaching notes

**Short description.** Computes Greatest Common Divisor using modulo arithmetic gcd(a, b) = gcd(b, a % b).
**Definition.** Computes Greatest Common Divisor using modulo arithmetic gcd(a, b) = gcd(b, a % b).
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Euclidean GCD Algorithm.
**When to use it.** Use this lesson to study Euclidean GCD Algorithm and compare its assumptions and bounds with related entries.
**Common mistake.** Forgetting that gcd(a, 0) = a, and assuming order of arguments matters.
**Exam note.** Lamé’s Theorem: The number of division steps never exceeds 5 times the number of digits in the smaller number.

#### Trace study questions

1. **Euclidean GCD Algorithm:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Euclidean GCD Algorithm:** What output or terminal status should a correct execution produce?
3. **Euclidean GCD Algorithm:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Euclidean GCD Algorithm:** What is the smallest meaningful state transition in this implementation?
5. **Euclidean GCD Algorithm:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Euclidean GCD Algorithm:** What condition allows execution to proceed to the next candidate?
7. **Euclidean GCD Algorithm:** What condition makes the algorithm stop?
8. **Euclidean GCD Algorithm:** Which values should be written in a dry-run table before the first update?
9. **Euclidean GCD Algorithm:** Which values should be written after one complete loop iteration or recursive call?
10. **Euclidean GCD Algorithm:** Which invariant or correctness property can be checked after this frame?
11. **Euclidean GCD Algorithm:** Which assumption is required for the selected algorithm to be correct?
12. **Euclidean GCD Algorithm:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Euclidean GCD Algorithm:** What input follows the best-case behavior listed in the source catalog?
14. **Euclidean GCD Algorithm:** What input shape can trigger the listed worst-case behavior?
15. **Euclidean GCD Algorithm:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Euclidean GCD Algorithm:** What should happen for an empty or minimal input if the UI permits it?
17. **Euclidean GCD Algorithm:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Euclidean GCD Algorithm:** What auxiliary storage is allocated and when can it be released?
19. **Euclidean GCD Algorithm:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Euclidean GCD Algorithm:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Euclidean GCD Algorithm:** What result would demonstrate that this trace has finished correctly?
22. **Euclidean GCD Algorithm:** Which independent test assertion could catch a bug in this transition?
23. **Euclidean GCD Algorithm:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Euclidean GCD Algorithm:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(log(min(a, b))), worst time O(log(min(a, b))), and auxiliary space O(1).
1. **Euclidean GCD Algorithm:** Name the input-size variable used in the published time bound.
2. **Euclidean GCD Algorithm:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Euclidean GCD Algorithm:** Identify the operation performed once per outer iteration.
4. **Euclidean GCD Algorithm:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Euclidean GCD Algorithm:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Euclidean GCD Algorithm:** Explain how the input structure changes the amount of work.
7. **Euclidean GCD Algorithm:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Euclidean GCD Algorithm:** Separate comparisons from writes or swaps where appropriate.
9. **Euclidean GCD Algorithm:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Euclidean GCD Algorithm:** Explain why the average-case entry may differ from both best and worst case.
11. **Euclidean GCD Algorithm:** Describe what auxiliary space counts for this algorithm.
12. **Euclidean GCD Algorithm:** Check whether recursion stack space is included in the documented space bound.
13. **Euclidean GCD Algorithm:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Euclidean GCD Algorithm:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Euclidean GCD Algorithm:** Explain which code operation dominates as the input grows.
16. **Euclidean GCD Algorithm:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function gcd(a, b):
  while b != 0:
    temp = b
    b = a mod b
    a = temp
  return a
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Euclidean GCD Algorithm; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace this repetition in Euclidean GCD Algorithm: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Record the result or trace state returned by Euclidean GCD Algorithm; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int gcd(int a, int b) {
    while (b != 0) {
        int temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace this repetition in Euclidean GCD Algorithm: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace source line 5 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 6:** Match this closing delimiter with its opening block to keep the Euclidean GCD Algorithm control-flow scope clear.
- **CPP line 7:** Record the result or trace state returned by Euclidean GCD Algorithm; check that every required exit path reaches a valid result.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Euclidean GCD Algorithm control-flow scope clear.

##### JAVA reference

```java
public static int gcd(int a, int b) {
    return b == 0 ? a : gcd(b, a % b);
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Evaluate this branch for the current Euclidean GCD Algorithm state; note which alternative runs and which states are excluded.
- **JAVA line 3:** Match this closing delimiter with its opening block to keep the Euclidean GCD Algorithm control-flow scope clear.

##### PYTHON reference

```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace this repetition in Euclidean GCD Algorithm: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Record the result or trace state returned by Euclidean GCD Algorithm; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| GCD | Greatest Common Divisor (Highest Common Factor). |
| Coprime | Two numbers having GCD equal to 1. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Euclidean GCD Algorithm without reading the code.

**Practice task:** Build one small input for Euclidean GCD Algorithm, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Euclidean GCD Algorithm short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Merge Sort

**Catalog identifier:** `merge_sort`  
**Course category:** Divide and Conquer  
**Catalog position:** 13 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Divide and Conquer |
| Best-case time | O(n log n) |
| Average-case time | O(n log n) |
| Worst-case time | O(n log n) |
| Auxiliary space | O(n) |
| Stable | Stable |
| In place | No |
| Default input | `[65,35,45,90,55,75]` |
| Input requirement | Array of positive integers |

#### Concept and teaching notes

**Short description.** Divide array into halves, recursively sort both, and merge in linear time.
**Definition.** Divide array into halves, recursively sort both, and merge in linear time.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Merge Sort.
**When to use it.** Use this lesson to study Merge Sort and compare its assumptions and bounds with related entries.
**Common mistake.** Assuming Merge Sort is in-place. Standard array merge requires O(n) auxiliary memory buffer.
**Exam note.** Recurrence T(n) = 2T(n/2) + Theta(n). Solves to Theta(n log n) by Master Theorem Case 2.

#### Trace study questions

1. **Merge Sort:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Merge Sort:** What output or terminal status should a correct execution produce?
3. **Merge Sort:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Merge Sort:** What is the smallest meaningful state transition in this implementation?
5. **Merge Sort:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Merge Sort:** What condition allows execution to proceed to the next candidate?
7. **Merge Sort:** What condition makes the algorithm stop?
8. **Merge Sort:** Which values should be written in a dry-run table before the first update?
9. **Merge Sort:** Which values should be written after one complete loop iteration or recursive call?
10. **Merge Sort:** Which invariant or correctness property can be checked after this frame?
11. **Merge Sort:** Which assumption is required for the selected algorithm to be correct?
12. **Merge Sort:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Merge Sort:** What input follows the best-case behavior listed in the source catalog?
14. **Merge Sort:** What input shape can trigger the listed worst-case behavior?
15. **Merge Sort:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Merge Sort:** What should happen for an empty or minimal input if the UI permits it?
17. **Merge Sort:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Merge Sort:** What auxiliary storage is allocated and when can it be released?
19. **Merge Sort:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Merge Sort:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Merge Sort:** What result would demonstrate that this trace has finished correctly?
22. **Merge Sort:** Which independent test assertion could catch a bug in this transition?
23. **Merge Sort:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Merge Sort:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n log n), average time O(n log n), worst time O(n log n), and auxiliary space O(n).
1. **Merge Sort:** Name the input-size variable used in the published time bound.
2. **Merge Sort:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Merge Sort:** Identify the operation performed once per outer iteration.
4. **Merge Sort:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Merge Sort:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Merge Sort:** Explain how the input structure changes the amount of work.
7. **Merge Sort:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Merge Sort:** Separate comparisons from writes or swaps where appropriate.
9. **Merge Sort:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Merge Sort:** Explain why the average-case entry may differ from both best and worst case.
11. **Merge Sort:** Describe what auxiliary space counts for this algorithm.
12. **Merge Sort:** Check whether recursion stack space is included in the documented space bound.
13. **Merge Sort:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Merge Sort:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Merge Sort:** Explain which code operation dominates as the input grows.
16. **Merge Sort:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function mergeSort(A, left, right):
  if left < right:
    mid = (left + right) / 2
    mergeSort(A, left, mid)
    mergeSort(A, mid + 1, right)
    merge(A, left, mid, right)
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Merge Sort; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Evaluate this branch for the current Merge Sort state; note which alternative runs and which states are excluded.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.

##### CPP reference

```cpp
void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < left.size() && j < right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.size()) arr[k++] = left[i++];
    while (j < right.size()) arr[k++] = right[j++];
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace this repetition in Merge Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Evaluate this branch for the current Merge Sort state; note which alternative runs and which states are excluded.
- **CPP line 7:** Evaluate this branch for the current Merge Sort state; note which alternative runs and which states are excluded.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Merge Sort control-flow scope clear.
- **CPP line 9:** Trace this repetition in Merge Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 10:** Trace this repetition in Merge Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 11:** Match this closing delimiter with its opening block to keep the Merge Sort control-flow scope clear.

##### JAVA reference

```java
public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Evaluate this branch for the current Merge Sort state; note which alternative runs and which states are excluded.
- **JAVA line 3:** Trace source line 3 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Trace source line 5 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 6:** Trace source line 6 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 7:** Match this closing delimiter with its opening block to keep the Merge Sort control-flow scope clear.
- **JAVA line 8:** Match this closing delimiter with its opening block to keep the Merge Sort control-flow scope clear.

##### PYTHON reference

```python
def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        # merge back into arr
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Evaluate this branch for the current Merge Sort state; note which alternative runs and which states are excluded.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Check the index and boundary for this Merge Sort access; state which input or auxiliary cell is read or updated.
- **PYTHON line 5:** Check the index and boundary for this Merge Sort access; state which input or auxiliary cell is read or updated.
- **PYTHON line 6:** Trace source line 6 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 7:** Trace source line 7 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 8:** Read this source comment as intent; verify the executable statements implement the stated intent.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Divide and Conquer | Break problem into smaller subproblems, solve recursively, and combine. |
| Stable Merge | Left elements chosen on ties (<=) preserving original relative ordering. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Merge Sort without reading the code.

**Practice task:** Build one small input for Merge Sort, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Merge Sort short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Heap Sort

**Catalog identifier:** `heap_sort`  
**Course category:** Sorting  
**Catalog position:** 14 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Transform and Conquer |
| Best-case time | O(n log n) |
| Average-case time | O(n log n) |
| Worst-case time | O(n log n) |
| Auxiliary space | O(1) |
| Stable | Unstable |
| In place | Yes |
| Default input | `[65,35,45,90,55,75]` |
| Input requirement | Array of positive integers |

#### Concept and teaching notes

**Short description.** Build a Max-Heap, repeatedly swap root with last leaf and heapify.
**Definition.** Build a Max-Heap, repeatedly swap root with last leaf and heapify.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Heap Sort.
**When to use it.** Use this lesson to study Heap Sort and compare its assumptions and bounds with related entries.
**Common mistake.** Thinking building a max heap takes O(n log n). Sifting down nodes bottom-up takes only O(n) total time.
**Exam note.** Guaranteed O(n log n) upper bound with zero additional memory, but cache locality is worse than Quick Sort.

#### Trace study questions

1. **Heap Sort:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Heap Sort:** What output or terminal status should a correct execution produce?
3. **Heap Sort:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Heap Sort:** What is the smallest meaningful state transition in this implementation?
5. **Heap Sort:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Heap Sort:** What condition allows execution to proceed to the next candidate?
7. **Heap Sort:** What condition makes the algorithm stop?
8. **Heap Sort:** Which values should be written in a dry-run table before the first update?
9. **Heap Sort:** Which values should be written after one complete loop iteration or recursive call?
10. **Heap Sort:** Which invariant or correctness property can be checked after this frame?
11. **Heap Sort:** Which assumption is required for the selected algorithm to be correct?
12. **Heap Sort:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Heap Sort:** What input follows the best-case behavior listed in the source catalog?
14. **Heap Sort:** What input shape can trigger the listed worst-case behavior?
15. **Heap Sort:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Heap Sort:** What should happen for an empty or minimal input if the UI permits it?
17. **Heap Sort:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Heap Sort:** What auxiliary storage is allocated and when can it be released?
19. **Heap Sort:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Heap Sort:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Heap Sort:** What result would demonstrate that this trace has finished correctly?
22. **Heap Sort:** Which independent test assertion could catch a bug in this transition?
23. **Heap Sort:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Heap Sort:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n log n), average time O(n log n), worst time O(n log n), and auxiliary space O(1).
1. **Heap Sort:** Name the input-size variable used in the published time bound.
2. **Heap Sort:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Heap Sort:** Identify the operation performed once per outer iteration.
4. **Heap Sort:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Heap Sort:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Heap Sort:** Explain how the input structure changes the amount of work.
7. **Heap Sort:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Heap Sort:** Separate comparisons from writes or swaps where appropriate.
9. **Heap Sort:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Heap Sort:** Explain why the average-case entry may differ from both best and worst case.
11. **Heap Sort:** Describe what auxiliary space counts for this algorithm.
12. **Heap Sort:** Check whether recursion stack space is included in the documented space bound.
13. **Heap Sort:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Heap Sort:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Heap Sort:** Explain which code operation dominates as the input grows.
16. **Heap Sort:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function heapSort(A):
  buildMaxHeap(A)
  for i from n - 1 down to 1:
    swap(A[0], A[i])
    heapify(A, 0, i)
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Heap Sort; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace this repetition in Heap Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Check the index and boundary for this Heap Sort access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.

##### CPP reference

```cpp
void heapify(vector<int>& arr, int n, int i) {
    int largest = i, l = 2*i + 1, r = 2*i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Evaluate this branch for the current Heap Sort state; note which alternative runs and which states are excluded.
- **CPP line 4:** Evaluate this branch for the current Heap Sort state; note which alternative runs and which states are excluded.
- **CPP line 5:** Evaluate this branch for the current Heap Sort state; note which alternative runs and which states are excluded.
- **CPP line 6:** Check the index and boundary for this Heap Sort access; state which input or auxiliary cell is read or updated.
- **CPP line 7:** Trace source line 7 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Heap Sort control-flow scope clear.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Heap Sort control-flow scope clear.

##### JAVA reference

```java
public static void heapSort(int[] arr) {
    int n = arr.length;
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;
        heapify(arr, i, 0);
    }
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Trace this repetition in Heap Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 4:** Trace this repetition in Heap Sort: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 5:** Check the index and boundary for this Heap Sort access; state which input or auxiliary cell is read or updated.
- **JAVA line 6:** Trace source line 6 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 7:** Match this closing delimiter with its opening block to keep the Heap Sort control-flow scope clear.
- **JAVA line 8:** Match this closing delimiter with its opening block to keep the Heap Sort control-flow scope clear.

##### PYTHON reference

```python
def heap_sort(arr):
    # Phase 1: Build Max Heap
    # Phase 2: Extract Max elements
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 3:** Read this source comment as intent; verify the executable statements implement the stated intent.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Max-Heap Property | The key at each node is greater than or equal to keys of its children. |
| In-Place Heapify | Fixes heap property violations in O(log n) time without auxiliary arrays. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Heap Sort without reading the code.

**Practice task:** Build one small input for Heap Sort, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Heap Sort short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Linear Search

**Catalog identifier:** `linear_search`  
**Course category:** Searching  
**Catalog position:** 15 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Sequential Scan |
| Best-case time | O(1) |
| Average-case time | O(n) |
| Worst-case time | O(n) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[35,45,55,65,75,90]` |
| Input requirement | Array and target integer |

#### Concept and teaching notes

**Short description.** Sequentially checks each element until a match is found or the array ends.
**Definition.** Sequentially checks each element until a match is found or the array ends.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Linear Search.
**When to use it.** Use this lesson to study Linear Search and compare its assumptions and bounds with related entries.
**Common mistake.** Searching unsorted data with Binary Search instead of Linear Search.
**Exam note.** Linear Search is optimal for unordered data or when n is very small.

#### Trace study questions

1. **Linear Search:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Linear Search:** What output or terminal status should a correct execution produce?
3. **Linear Search:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Linear Search:** What is the smallest meaningful state transition in this implementation?
5. **Linear Search:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Linear Search:** What condition allows execution to proceed to the next candidate?
7. **Linear Search:** What condition makes the algorithm stop?
8. **Linear Search:** Which values should be written in a dry-run table before the first update?
9. **Linear Search:** Which values should be written after one complete loop iteration or recursive call?
10. **Linear Search:** Which invariant or correctness property can be checked after this frame?
11. **Linear Search:** Which assumption is required for the selected algorithm to be correct?
12. **Linear Search:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Linear Search:** What input follows the best-case behavior listed in the source catalog?
14. **Linear Search:** What input shape can trigger the listed worst-case behavior?
15. **Linear Search:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Linear Search:** What should happen for an empty or minimal input if the UI permits it?
17. **Linear Search:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Linear Search:** What auxiliary storage is allocated and when can it be released?
19. **Linear Search:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Linear Search:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Linear Search:** What result would demonstrate that this trace has finished correctly?
22. **Linear Search:** Which independent test assertion could catch a bug in this transition?
23. **Linear Search:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Linear Search:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(n), worst time O(n), and auxiliary space O(1).
1. **Linear Search:** Name the input-size variable used in the published time bound.
2. **Linear Search:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Linear Search:** Identify the operation performed once per outer iteration.
4. **Linear Search:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Linear Search:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Linear Search:** Explain how the input structure changes the amount of work.
7. **Linear Search:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Linear Search:** Separate comparisons from writes or swaps where appropriate.
9. **Linear Search:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Linear Search:** Explain why the average-case entry may differ from both best and worst case.
11. **Linear Search:** Describe what auxiliary space counts for this algorithm.
12. **Linear Search:** Check whether recursion stack space is included in the documented space bound.
13. **Linear Search:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Linear Search:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Linear Search:** Explain which code operation dominates as the input grows.
16. **Linear Search:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function linearSearch(A, target):
  for i from 0 to length(A) - 1:
    if A[i] == target: return i
  return -1
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Linear Search; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace this repetition in Linear Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 3:** Evaluate this branch for the current Linear Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 4:** Record the result or trace state returned by Linear Search; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Name the state represented by this Linear Search variable and record its value before its first update.
- **CPP line 2:** Trace this repetition in Linear Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 3:** Evaluate this branch for the current Linear Search state; note which alternative runs and which states are excluded.
- **CPP line 4:** Match this closing delimiter with its opening block to keep the Linear Search control-flow scope clear.
- **CPP line 5:** Record the result or trace state returned by Linear Search; check that every required exit path reaches a valid result.
- **CPP line 6:** Match this closing delimiter with its opening block to keep the Linear Search control-flow scope clear.

##### JAVA reference

```java
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace this repetition in Linear Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 3:** Evaluate this branch for the current Linear Search state; note which alternative runs and which states are excluded.
- **JAVA line 4:** Match this closing delimiter with its opening block to keep the Linear Search control-flow scope clear.
- **JAVA line 5:** Record the result or trace state returned by Linear Search; check that every required exit path reaches a valid result.
- **JAVA line 6:** Match this closing delimiter with its opening block to keep the Linear Search control-flow scope clear.

##### PYTHON reference

```python
def linear_search(arr, target):
    for idx, val in enumerate(arr):
        if val == target: return idx
    return -1
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace this repetition in Linear Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 3:** Evaluate this branch for the current Linear Search state; note which alternative runs and which states are excluded.
- **PYTHON line 4:** Record the result or trace state returned by Linear Search; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Sequential Scan | Examines elements one by one from beginning to end. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Linear Search without reading the code.

**Practice task:** Build one small input for Linear Search, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Linear Search short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Circular Queue (Wraparound)

**Catalog identifier:** `circular_queue`  
**Course category:** Data Structures  
**Catalog position:** 16 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Modulo Ring Buffer |
| Best-case time | O(1) |
| Average-case time | O(1) |
| Worst-case time | O(1) |
| Auxiliary space | O(k) |
| Stable | N/A |
| In place | Yes |
| Default input | `[1,2,3,4]` |
| Input requirement | Fixed capacity ring buffer |

#### Concept and teaching notes

**Short description.** Ring buffer data structure that reuses vacated front memory slots using modulo arithmetic.
**Definition.** Ring buffer data structure that reuses vacated front memory slots using modulo arithmetic.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Circular Queue (Wraparound).
**When to use it.** Use this lesson to study Circular Queue (Wraparound) and compare its assumptions and bounds with related entries.
**Common mistake.** Confusing empty (front == -1) and full ((rear + 1) % cap == front) queue conditions.
**Exam note.** Always cite the pointer update formulas: rear = (rear + 1) % capacity and front = (front + 1) % capacity.

#### Trace study questions

1. **Circular Queue (Wraparound):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Circular Queue (Wraparound):** What output or terminal status should a correct execution produce?
3. **Circular Queue (Wraparound):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Circular Queue (Wraparound):** What is the smallest meaningful state transition in this implementation?
5. **Circular Queue (Wraparound):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Circular Queue (Wraparound):** What condition allows execution to proceed to the next candidate?
7. **Circular Queue (Wraparound):** What condition makes the algorithm stop?
8. **Circular Queue (Wraparound):** Which values should be written in a dry-run table before the first update?
9. **Circular Queue (Wraparound):** Which values should be written after one complete loop iteration or recursive call?
10. **Circular Queue (Wraparound):** Which invariant or correctness property can be checked after this frame?
11. **Circular Queue (Wraparound):** Which assumption is required for the selected algorithm to be correct?
12. **Circular Queue (Wraparound):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Circular Queue (Wraparound):** What input follows the best-case behavior listed in the source catalog?
14. **Circular Queue (Wraparound):** What input shape can trigger the listed worst-case behavior?
15. **Circular Queue (Wraparound):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Circular Queue (Wraparound):** What should happen for an empty or minimal input if the UI permits it?
17. **Circular Queue (Wraparound):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Circular Queue (Wraparound):** What auxiliary storage is allocated and when can it be released?
19. **Circular Queue (Wraparound):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Circular Queue (Wraparound):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Circular Queue (Wraparound):** What result would demonstrate that this trace has finished correctly?
22. **Circular Queue (Wraparound):** Which independent test assertion could catch a bug in this transition?
23. **Circular Queue (Wraparound):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Circular Queue (Wraparound):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(1), worst time O(1), and auxiliary space O(k).
1. **Circular Queue (Wraparound):** Name the input-size variable used in the published time bound.
2. **Circular Queue (Wraparound):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Circular Queue (Wraparound):** Identify the operation performed once per outer iteration.
4. **Circular Queue (Wraparound):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Circular Queue (Wraparound):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Circular Queue (Wraparound):** Explain how the input structure changes the amount of work.
7. **Circular Queue (Wraparound):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Circular Queue (Wraparound):** Separate comparisons from writes or swaps where appropriate.
9. **Circular Queue (Wraparound):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Circular Queue (Wraparound):** Explain why the average-case entry may differ from both best and worst case.
11. **Circular Queue (Wraparound):** Describe what auxiliary space counts for this algorithm.
12. **Circular Queue (Wraparound):** Check whether recursion stack space is included in the documented space bound.
13. **Circular Queue (Wraparound):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Circular Queue (Wraparound):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Circular Queue (Wraparound):** Explain which code operation dominates as the input grows.
16. **Circular Queue (Wraparound):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function enqueue(val):
  if (rear + 1) % cap == front: return "Full"
  if front == -1: front = 0
  rear = (rear + 1) % cap
  buffer[rear] = val
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Circular Queue (Wraparound); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Evaluate this branch for the current Circular Queue (Wraparound) state; note which alternative runs and which states are excluded.
- **PSEUDO line 3:** Evaluate this branch for the current Circular Queue (Wraparound) state; note which alternative runs and which states are excluded.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Check the index and boundary for this Circular Queue (Wraparound) access; state which input or auxiliary cell is read or updated.

##### CPP reference

```cpp
void enqueue(int val) {
    if ((rear + 1) % capacity == front) return; // Full
    if (front == -1) front = 0;
    rear = (rear + 1) % capacity;
    arr[rear] = val;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Evaluate this branch for the current Circular Queue (Wraparound) state; note which alternative runs and which states are excluded.
- **CPP line 3:** Evaluate this branch for the current Circular Queue (Wraparound) state; note which alternative runs and which states are excluded.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Check the index and boundary for this Circular Queue (Wraparound) access; state which input or auxiliary cell is read or updated.
- **CPP line 6:** Match this closing delimiter with its opening block to keep the Circular Queue (Wraparound) control-flow scope clear.

##### JAVA reference

```java
public void enqueue(int val) {
    if ((rear + 1) % capacity == front) return;
    if (front == -1) front = 0;
    rear = (rear + 1) % capacity;
    arr[rear] = val;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Evaluate this branch for the current Circular Queue (Wraparound) state; note which alternative runs and which states are excluded.
- **JAVA line 3:** Evaluate this branch for the current Circular Queue (Wraparound) state; note which alternative runs and which states are excluded.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Check the index and boundary for this Circular Queue (Wraparound) access; state which input or auxiliary cell is read or updated.
- **JAVA line 6:** Match this closing delimiter with its opening block to keep the Circular Queue (Wraparound) control-flow scope clear.

##### PYTHON reference

```python
def enqueue(self, val):
    if (self.rear + 1) % self.capacity == self.front: return False
    if self.front == -1: self.front = 0
    self.rear = (self.rear + 1) % self.capacity
    self.buffer[self.rear] = val
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Evaluate this branch for the current Circular Queue (Wraparound) state; note which alternative runs and which states are excluded.
- **PYTHON line 3:** Evaluate this branch for the current Circular Queue (Wraparound) state; note which alternative runs and which states are excluded.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Check the index and boundary for this Circular Queue (Wraparound) access; state which input or auxiliary cell is read or updated.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Modulo Wraparound | Index cycles from capacity - 1 back to 0 seamlessly. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Circular Queue (Wraparound) without reading the code.

**Practice task:** Build one small input for Circular Queue (Wraparound), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Circular Queue (Wraparound) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Depth-First Search (DFS)

**Catalog identifier:** `graph_dfs`  
**Course category:** Graphs  
**Catalog position:** 17 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Backtracking Graph Traversal |
| Best-case time | O(V + E) |
| Average-case time | O(V + E) |
| Worst-case time | O(V + E) |
| Auxiliary space | O(V) |
| Stable | N/A |
| In place | N/A |
| Default input | `[1,2,3,4,5,6]` |
| Input requirement | Graph vertices and adjacency list |

#### Concept and teaching notes

**Short description.** Explores as deep as possible along each branch before backtracking.
**Definition.** Explores as deep as possible along each branch before backtracking.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Depth-First Search (DFS).
**When to use it.** Use this lesson to study Depth-First Search (DFS) and compare its assumptions and bounds with related entries.
**Common mistake.** Forgetting visited array leading to infinite loops in cyclic graphs.
**Exam note.** DFS produces a DFS tree and classifies edges into tree, back, forward, and cross edges.

#### Trace study questions

1. **Depth-First Search (DFS):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Depth-First Search (DFS):** What output or terminal status should a correct execution produce?
3. **Depth-First Search (DFS):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Depth-First Search (DFS):** What is the smallest meaningful state transition in this implementation?
5. **Depth-First Search (DFS):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Depth-First Search (DFS):** What condition allows execution to proceed to the next candidate?
7. **Depth-First Search (DFS):** What condition makes the algorithm stop?
8. **Depth-First Search (DFS):** Which values should be written in a dry-run table before the first update?
9. **Depth-First Search (DFS):** Which values should be written after one complete loop iteration or recursive call?
10. **Depth-First Search (DFS):** Which invariant or correctness property can be checked after this frame?
11. **Depth-First Search (DFS):** Which assumption is required for the selected algorithm to be correct?
12. **Depth-First Search (DFS):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Depth-First Search (DFS):** What input follows the best-case behavior listed in the source catalog?
14. **Depth-First Search (DFS):** What input shape can trigger the listed worst-case behavior?
15. **Depth-First Search (DFS):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Depth-First Search (DFS):** What should happen for an empty or minimal input if the UI permits it?
17. **Depth-First Search (DFS):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Depth-First Search (DFS):** What auxiliary storage is allocated and when can it be released?
19. **Depth-First Search (DFS):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Depth-First Search (DFS):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Depth-First Search (DFS):** What result would demonstrate that this trace has finished correctly?
22. **Depth-First Search (DFS):** Which independent test assertion could catch a bug in this transition?
23. **Depth-First Search (DFS):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Depth-First Search (DFS):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(V + E), average time O(V + E), worst time O(V + E), and auxiliary space O(V).
1. **Depth-First Search (DFS):** Name the input-size variable used in the published time bound.
2. **Depth-First Search (DFS):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Depth-First Search (DFS):** Identify the operation performed once per outer iteration.
4. **Depth-First Search (DFS):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Depth-First Search (DFS):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Depth-First Search (DFS):** Explain how the input structure changes the amount of work.
7. **Depth-First Search (DFS):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Depth-First Search (DFS):** Separate comparisons from writes or swaps where appropriate.
9. **Depth-First Search (DFS):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Depth-First Search (DFS):** Explain why the average-case entry may differ from both best and worst case.
11. **Depth-First Search (DFS):** Describe what auxiliary space counts for this algorithm.
12. **Depth-First Search (DFS):** Check whether recursion stack space is included in the documented space bound.
13. **Depth-First Search (DFS):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Depth-First Search (DFS):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Depth-First Search (DFS):** Explain which code operation dominates as the input grows.
16. **Depth-First Search (DFS):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function DFS(u):
  visited[u] = true
  for neighbor v in adj[u]:
    if not visited[v]: DFS(v)
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Depth-First Search (DFS); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Check the index and boundary for this Depth-First Search (DFS) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 3:** Trace this repetition in Depth-First Search (DFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Evaluate this branch for the current Depth-First Search (DFS) state; note which alternative runs and which states are excluded.

##### CPP reference

```cpp
void dfs(int u, vector<vector<int>>& adj, vector<bool>& vis) {
    vis[u] = true;
    for (int v : adj[u]) {
        if (!vis[v]) dfs(v, adj, vis);
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Check the index and boundary for this Depth-First Search (DFS) access; state which input or auxiliary cell is read or updated.
- **CPP line 3:** Trace this repetition in Depth-First Search (DFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Evaluate this branch for the current Depth-First Search (DFS) state; note which alternative runs and which states are excluded.
- **CPP line 5:** Match this closing delimiter with its opening block to keep the Depth-First Search (DFS) control-flow scope clear.
- **CPP line 6:** Match this closing delimiter with its opening block to keep the Depth-First Search (DFS) control-flow scope clear.

##### JAVA reference

```java
public static void dfs(int u, List<List<Integer>> adj, boolean[] vis) {
    vis[u] = true;
    for (int v : adj.get(u)) {
        if (!vis[v]) dfs(v, adj, vis);
    }
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Check the index and boundary for this Depth-First Search (DFS) access; state which input or auxiliary cell is read or updated.
- **JAVA line 3:** Trace this repetition in Depth-First Search (DFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 4:** Evaluate this branch for the current Depth-First Search (DFS) state; note which alternative runs and which states are excluded.
- **JAVA line 5:** Match this closing delimiter with its opening block to keep the Depth-First Search (DFS) control-flow scope clear.
- **JAVA line 6:** Match this closing delimiter with its opening block to keep the Depth-First Search (DFS) control-flow scope clear.

##### PYTHON reference

```python
def dfs(u, adj, visited):
    visited.add(u)
    for v in adj[u]:
        if v not in visited:
            dfs(v, adj, visited)
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Track the collection mutation made by Depth-First Search (DFS); compare the collection immediately before and after this statement.
- **PYTHON line 3:** Trace this repetition in Depth-First Search (DFS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 4:** Evaluate this branch for the current Depth-First Search (DFS) state; note which alternative runs and which states are excluded.
- **PYTHON line 5:** Trace source line 5 in python: record the values it reads, the state it changes, and the next statement it enables.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Backtracking | Returning to previous vertex when all outgoing edges have been explored. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Depth-First Search (DFS) without reading the code.

**Practice task:** Build one small input for Depth-First Search (DFS), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Depth-First Search (DFS) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Dijkstra's Shortest Path

**Catalog identifier:** `dijkstra`  
**Course category:** Graphs  
**Catalog position:** 18 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Greedy Method |
| Best-case time | O((V + E) log V) |
| Average-case time | O((V + E) log V) |
| Worst-case time | O((V + E) log V) |
| Auxiliary space | O(V) |
| Stable | N/A |
| In place | N/A |
| Default input | `[1,2,3,4,5,6]` |
| Input requirement | Weighted graph with non-negative edge weights |

#### Concept and teaching notes

**Short description.** Greedily extracts minimum distance unsettled vertex and relaxes outgoing edges.
**Definition.** Greedily extracts minimum distance unsettled vertex and relaxes outgoing edges.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Dijkstra's Shortest Path.
**When to use it.** Use this lesson to study Dijkstra's Shortest Path and compare its assumptions and bounds with related entries.
**Common mistake.** Using Dijkstra on graphs with negative edge weights. Negative edges require Bellman-Ford.
**Exam note.** Triangle Inequality: dist[v] <= dist[u] + weight(u, v). Edge relaxation checks if dist[u] + w < dist[v].

#### Trace study questions

1. **Dijkstra's Shortest Path:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Dijkstra's Shortest Path:** What output or terminal status should a correct execution produce?
3. **Dijkstra's Shortest Path:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Dijkstra's Shortest Path:** What is the smallest meaningful state transition in this implementation?
5. **Dijkstra's Shortest Path:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Dijkstra's Shortest Path:** What condition allows execution to proceed to the next candidate?
7. **Dijkstra's Shortest Path:** What condition makes the algorithm stop?
8. **Dijkstra's Shortest Path:** Which values should be written in a dry-run table before the first update?
9. **Dijkstra's Shortest Path:** Which values should be written after one complete loop iteration or recursive call?
10. **Dijkstra's Shortest Path:** Which invariant or correctness property can be checked after this frame?
11. **Dijkstra's Shortest Path:** Which assumption is required for the selected algorithm to be correct?
12. **Dijkstra's Shortest Path:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Dijkstra's Shortest Path:** What input follows the best-case behavior listed in the source catalog?
14. **Dijkstra's Shortest Path:** What input shape can trigger the listed worst-case behavior?
15. **Dijkstra's Shortest Path:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Dijkstra's Shortest Path:** What should happen for an empty or minimal input if the UI permits it?
17. **Dijkstra's Shortest Path:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Dijkstra's Shortest Path:** What auxiliary storage is allocated and when can it be released?
19. **Dijkstra's Shortest Path:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Dijkstra's Shortest Path:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Dijkstra's Shortest Path:** What result would demonstrate that this trace has finished correctly?
22. **Dijkstra's Shortest Path:** Which independent test assertion could catch a bug in this transition?
23. **Dijkstra's Shortest Path:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Dijkstra's Shortest Path:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O((V + E) log V), average time O((V + E) log V), worst time O((V + E) log V), and auxiliary space O(V).
1. **Dijkstra's Shortest Path:** Name the input-size variable used in the published time bound.
2. **Dijkstra's Shortest Path:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Dijkstra's Shortest Path:** Identify the operation performed once per outer iteration.
4. **Dijkstra's Shortest Path:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Dijkstra's Shortest Path:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Dijkstra's Shortest Path:** Explain how the input structure changes the amount of work.
7. **Dijkstra's Shortest Path:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Dijkstra's Shortest Path:** Separate comparisons from writes or swaps where appropriate.
9. **Dijkstra's Shortest Path:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Dijkstra's Shortest Path:** Explain why the average-case entry may differ from both best and worst case.
11. **Dijkstra's Shortest Path:** Describe what auxiliary space counts for this algorithm.
12. **Dijkstra's Shortest Path:** Check whether recursion stack space is included in the documented space bound.
13. **Dijkstra's Shortest Path:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Dijkstra's Shortest Path:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Dijkstra's Shortest Path:** Explain which code operation dominates as the input grows.
16. **Dijkstra's Shortest Path:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function dijkstra(src):
  dist[all] = inf, dist[src] = 0
  pq.insert({0, src})
  while pq not empty:
    {d, u} = pq.extractMin()
    for {v, w} in adj[u]:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
        pq.insert({dist[v], v})
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Dijkstra's Shortest Path; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Check the index and boundary for this Dijkstra's Shortest Path access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace this repetition in Dijkstra's Shortest Path: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Mark the beginning of a Dijkstra's Shortest Path block or expression and identify the statements governed by it.
- **PSEUDO line 6:** Trace this repetition in Dijkstra's Shortest Path: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 7:** Evaluate this branch for the current Dijkstra's Shortest Path state; note which alternative runs and which states are excluded.
- **PSEUDO line 8:** Check the index and boundary for this Dijkstra's Shortest Path access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 9:** Check the index and boundary for this Dijkstra's Shortest Path access; state which input or auxiliary cell is read or updated.

##### CPP reference

```cpp
void dijkstra(int src, vector<vector<pair<int,int>>>& adj, vector<int>& dist) {
    dist[src] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Check the index and boundary for this Dijkstra's Shortest Path access; state which input or auxiliary cell is read or updated.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Track the collection mutation made by Dijkstra's Shortest Path; compare the collection immediately before and after this statement.
- **CPP line 5:** Trace this repetition in Dijkstra's Shortest Path: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Track the collection mutation made by Dijkstra's Shortest Path; compare the collection immediately before and after this statement.
- **CPP line 7:** Evaluate this branch for the current Dijkstra's Shortest Path state; note which alternative runs and which states are excluded.
- **CPP line 8:** Trace this repetition in Dijkstra's Shortest Path: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 9:** Evaluate this branch for the current Dijkstra's Shortest Path state; note which alternative runs and which states are excluded.
- **CPP line 10:** Check the index and boundary for this Dijkstra's Shortest Path access; state which input or auxiliary cell is read or updated.
- **CPP line 11:** Track the collection mutation made by Dijkstra's Shortest Path; compare the collection immediately before and after this statement.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Dijkstra's Shortest Path control-flow scope clear.
- **CPP line 13:** Match this closing delimiter with its opening block to keep the Dijkstra's Shortest Path control-flow scope clear.
- **CPP line 14:** Match this closing delimiter with its opening block to keep the Dijkstra's Shortest Path control-flow scope clear.
- **CPP line 15:** Match this closing delimiter with its opening block to keep the Dijkstra's Shortest Path control-flow scope clear.

##### JAVA reference

```java
// PriorityQueue based Dijkstra
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
import heapq
def dijkstra(src, adj):
    dist = {node: float('inf') for node in adj}
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Check the index and boundary for this Dijkstra's Shortest Path access; state which input or auxiliary cell is read or updated.
- **PYTHON line 5:** Trace source line 5 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 6:** Trace this repetition in Dijkstra's Shortest Path: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 7:** Trace source line 7 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 8:** Evaluate this branch for the current Dijkstra's Shortest Path state; note which alternative runs and which states are excluded.
- **PYTHON line 9:** Trace this repetition in Dijkstra's Shortest Path: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 10:** Evaluate this branch for the current Dijkstra's Shortest Path state; note which alternative runs and which states are excluded.
- **PYTHON line 11:** Check the index and boundary for this Dijkstra's Shortest Path access; state which input or auxiliary cell is read or updated.
- **PYTHON line 12:** Check the index and boundary for this Dijkstra's Shortest Path access; state which input or auxiliary cell is read or updated.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Edge Relaxation | Updating distance to a vertex if a shorter path through another vertex is discovered. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Dijkstra's Shortest Path without reading the code.

**Practice task:** Build one small input for Dijkstra's Shortest Path, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Dijkstra's Shortest Path short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Kruskal's Minimum Spanning Tree

**Catalog identifier:** `kruskal_mst`  
**Course category:** Greedy  
**Catalog position:** 19 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Greedy with Disjoint Set Union |
| Best-case time | O(E log E) |
| Average-case time | O(E log E) |
| Worst-case time | O(E log E) |
| Auxiliary space | O(V) |
| Stable | N/A |
| In place | N/A |
| Default input | `[1,2,3,4,5,6]` |
| Input requirement | Connected undirected weighted graph |

#### Concept and teaching notes

**Short description.** Sorts all edges by weight and greedily accepts edges that do not form a cycle.
**Definition.** Sorts all edges by weight and greedily accepts edges that do not form a cycle.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Kruskal's Minimum Spanning Tree.
**When to use it.** Use this lesson to study Kruskal's Minimum Spanning Tree and compare its assumptions and bounds with related entries.
**Common mistake.** Forgetting to check if both endpoints already belong to the same component, causing a cycle.
**Exam note.** An MST on a connected graph with V vertices always contains exactly V - 1 edges.

#### Trace study questions

1. **Kruskal's Minimum Spanning Tree:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Kruskal's Minimum Spanning Tree:** What output or terminal status should a correct execution produce?
3. **Kruskal's Minimum Spanning Tree:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Kruskal's Minimum Spanning Tree:** What is the smallest meaningful state transition in this implementation?
5. **Kruskal's Minimum Spanning Tree:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Kruskal's Minimum Spanning Tree:** What condition allows execution to proceed to the next candidate?
7. **Kruskal's Minimum Spanning Tree:** What condition makes the algorithm stop?
8. **Kruskal's Minimum Spanning Tree:** Which values should be written in a dry-run table before the first update?
9. **Kruskal's Minimum Spanning Tree:** Which values should be written after one complete loop iteration or recursive call?
10. **Kruskal's Minimum Spanning Tree:** Which invariant or correctness property can be checked after this frame?
11. **Kruskal's Minimum Spanning Tree:** Which assumption is required for the selected algorithm to be correct?
12. **Kruskal's Minimum Spanning Tree:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Kruskal's Minimum Spanning Tree:** What input follows the best-case behavior listed in the source catalog?
14. **Kruskal's Minimum Spanning Tree:** What input shape can trigger the listed worst-case behavior?
15. **Kruskal's Minimum Spanning Tree:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Kruskal's Minimum Spanning Tree:** What should happen for an empty or minimal input if the UI permits it?
17. **Kruskal's Minimum Spanning Tree:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Kruskal's Minimum Spanning Tree:** What auxiliary storage is allocated and when can it be released?
19. **Kruskal's Minimum Spanning Tree:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Kruskal's Minimum Spanning Tree:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Kruskal's Minimum Spanning Tree:** What result would demonstrate that this trace has finished correctly?
22. **Kruskal's Minimum Spanning Tree:** Which independent test assertion could catch a bug in this transition?
23. **Kruskal's Minimum Spanning Tree:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Kruskal's Minimum Spanning Tree:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(E log E), average time O(E log E), worst time O(E log E), and auxiliary space O(V).
1. **Kruskal's Minimum Spanning Tree:** Name the input-size variable used in the published time bound.
2. **Kruskal's Minimum Spanning Tree:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Kruskal's Minimum Spanning Tree:** Identify the operation performed once per outer iteration.
4. **Kruskal's Minimum Spanning Tree:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Kruskal's Minimum Spanning Tree:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Kruskal's Minimum Spanning Tree:** Explain how the input structure changes the amount of work.
7. **Kruskal's Minimum Spanning Tree:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Kruskal's Minimum Spanning Tree:** Separate comparisons from writes or swaps where appropriate.
9. **Kruskal's Minimum Spanning Tree:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Kruskal's Minimum Spanning Tree:** Explain why the average-case entry may differ from both best and worst case.
11. **Kruskal's Minimum Spanning Tree:** Describe what auxiliary space counts for this algorithm.
12. **Kruskal's Minimum Spanning Tree:** Check whether recursion stack space is included in the documented space bound.
13. **Kruskal's Minimum Spanning Tree:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Kruskal's Minimum Spanning Tree:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Kruskal's Minimum Spanning Tree:** Explain which code operation dominates as the input grows.
16. **Kruskal's Minimum Spanning Tree:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function kruskal(edges, V):
  sort edges by weight
  dsu = makeSet(V)
  mst = []
  for (u, v, w) in edges:
    if find(u) != find(v):
      union(u, v)
      mst.append((u, v, w))
  return mst
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Kruskal's Minimum Spanning Tree; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace this repetition in Kruskal's Minimum Spanning Tree: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Evaluate this branch for the current Kruskal's Minimum Spanning Tree state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Trace source line 8 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 9:** Record the result or trace state returned by Kruskal's Minimum Spanning Tree; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int kruskal(int V, vector<vector<int>>& edges) {
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) { return a[2] < b[2]; });
    DSU dsu(V);
    int totalWeight = 0;
    for (auto& e : edges) {
        if (dsu.find(e[0]) != dsu.find(e[1])) {
            dsu.unite(e[0], e[1]);
            totalWeight += e[2];
        }
    }
    return totalWeight;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Track the collection mutation made by Kruskal's Minimum Spanning Tree; compare the collection immediately before and after this statement.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace this repetition in Kruskal's Minimum Spanning Tree: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Evaluate this branch for the current Kruskal's Minimum Spanning Tree state; note which alternative runs and which states are excluded.
- **CPP line 7:** Check the index and boundary for this Kruskal's Minimum Spanning Tree access; state which input or auxiliary cell is read or updated.
- **CPP line 8:** Check the index and boundary for this Kruskal's Minimum Spanning Tree access; state which input or auxiliary cell is read or updated.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Kruskal's Minimum Spanning Tree control-flow scope clear.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Kruskal's Minimum Spanning Tree control-flow scope clear.
- **CPP line 11:** Record the result or trace state returned by Kruskal's Minimum Spanning Tree; check that every required exit path reaches a valid result.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Kruskal's Minimum Spanning Tree control-flow scope clear.

##### JAVA reference

```java
// Kruskal with DSU
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def kruskal(edges, V):
    edges.sort(key=lambda x: x[2])
    dsu = DSU(V)
    mst_weight = 0
    for u, v, w in edges:
        if dsu.find(u) != dsu.find(v):
            dsu.union(u, v)
            mst_weight += w
    return mst_weight
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Track the collection mutation made by Kruskal's Minimum Spanning Tree; compare the collection immediately before and after this statement.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Trace this repetition in Kruskal's Minimum Spanning Tree: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 6:** Evaluate this branch for the current Kruskal's Minimum Spanning Tree state; note which alternative runs and which states are excluded.
- **PYTHON line 7:** Trace source line 7 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 8:** Trace source line 8 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 9:** Record the result or trace state returned by Kruskal's Minimum Spanning Tree; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Minimum Spanning Tree | A tree spanning all vertices with minimal total edge weight. |
| DSU / Union-Find | Data structure supporting near-O(1) cycle detection via path compression. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Kruskal's Minimum Spanning Tree without reading the code.

**Practice task:** Build one small input for Kruskal's Minimum Spanning Tree, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Kruskal's Minimum Spanning Tree short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Longest Common Subsequence (LCS)

**Catalog identifier:** `lcs_dp`  
**Course category:** Dynamic Programming  
**Catalog position:** 20 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Dynamic Programming |
| Best-case time | O(m * n) |
| Average-case time | O(m * n) |
| Worst-case time | O(m * n) |
| Auxiliary space | O(m * n) |
| Stable | N/A |
| In place | N/A |
| Default input | `[1,2,3,4]` |
| Input requirement | Two strings |

#### Concept and teaching notes

**Short description.** Finds the longest subsequence present in both sequences in identical relative order.
**Definition.** Finds the longest subsequence present in both sequences in identical relative order.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Longest Common Subsequence (LCS).
**When to use it.** Use this lesson to study Longest Common Subsequence (LCS) and compare its assumptions and bounds with related entries.
**Common mistake.** Confusing substring (contiguous elements) with subsequence (relative order preserved, not necessarily contiguous).
**Exam note.** Recurrence: if X[i-1] == Y[j-1]: dp[i][j] = 1 + dp[i-1][j-1]. Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).

#### Trace study questions

1. **Longest Common Subsequence (LCS):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Longest Common Subsequence (LCS):** What output or terminal status should a correct execution produce?
3. **Longest Common Subsequence (LCS):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Longest Common Subsequence (LCS):** What is the smallest meaningful state transition in this implementation?
5. **Longest Common Subsequence (LCS):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Longest Common Subsequence (LCS):** What condition allows execution to proceed to the next candidate?
7. **Longest Common Subsequence (LCS):** What condition makes the algorithm stop?
8. **Longest Common Subsequence (LCS):** Which values should be written in a dry-run table before the first update?
9. **Longest Common Subsequence (LCS):** Which values should be written after one complete loop iteration or recursive call?
10. **Longest Common Subsequence (LCS):** Which invariant or correctness property can be checked after this frame?
11. **Longest Common Subsequence (LCS):** Which assumption is required for the selected algorithm to be correct?
12. **Longest Common Subsequence (LCS):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Longest Common Subsequence (LCS):** What input follows the best-case behavior listed in the source catalog?
14. **Longest Common Subsequence (LCS):** What input shape can trigger the listed worst-case behavior?
15. **Longest Common Subsequence (LCS):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Longest Common Subsequence (LCS):** What should happen for an empty or minimal input if the UI permits it?
17. **Longest Common Subsequence (LCS):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Longest Common Subsequence (LCS):** What auxiliary storage is allocated and when can it be released?
19. **Longest Common Subsequence (LCS):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Longest Common Subsequence (LCS):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Longest Common Subsequence (LCS):** What result would demonstrate that this trace has finished correctly?
22. **Longest Common Subsequence (LCS):** Which independent test assertion could catch a bug in this transition?
23. **Longest Common Subsequence (LCS):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Longest Common Subsequence (LCS):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(m * n), average time O(m * n), worst time O(m * n), and auxiliary space O(m * n).
1. **Longest Common Subsequence (LCS):** Name the input-size variable used in the published time bound.
2. **Longest Common Subsequence (LCS):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Longest Common Subsequence (LCS):** Identify the operation performed once per outer iteration.
4. **Longest Common Subsequence (LCS):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Longest Common Subsequence (LCS):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Longest Common Subsequence (LCS):** Explain how the input structure changes the amount of work.
7. **Longest Common Subsequence (LCS):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Longest Common Subsequence (LCS):** Separate comparisons from writes or swaps where appropriate.
9. **Longest Common Subsequence (LCS):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Longest Common Subsequence (LCS):** Explain why the average-case entry may differ from both best and worst case.
11. **Longest Common Subsequence (LCS):** Describe what auxiliary space counts for this algorithm.
12. **Longest Common Subsequence (LCS):** Check whether recursion stack space is included in the documented space bound.
13. **Longest Common Subsequence (LCS):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Longest Common Subsequence (LCS):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Longest Common Subsequence (LCS):** Explain which code operation dominates as the input grows.
16. **Longest Common Subsequence (LCS):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function LCS(X, Y):
  for i from 1 to m:
    for j from 1 to n:
      if X[i-1] == Y[j-1]: dp[i][j] = dp[i-1][j-1] + 1
      else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
  return dp[m][n]
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Longest Common Subsequence (LCS); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace this repetition in Longest Common Subsequence (LCS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 3:** Trace this repetition in Longest Common Subsequence (LCS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Evaluate this branch for the current Longest Common Subsequence (LCS) state; note which alternative runs and which states are excluded.
- **PSEUDO line 5:** Evaluate this branch for the current Longest Common Subsequence (LCS) state; note which alternative runs and which states are excluded.
- **PSEUDO line 6:** Record the result or trace state returned by Longest Common Subsequence (LCS); check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int lcs(string X, string Y) {
    int m = X.size(), n = Y.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace this repetition in Longest Common Subsequence (LCS): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Trace this repetition in Longest Common Subsequence (LCS): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Evaluate this branch for the current Longest Common Subsequence (LCS) state; note which alternative runs and which states are excluded.
- **CPP line 7:** Evaluate this branch for the current Longest Common Subsequence (LCS) state; note which alternative runs and which states are excluded.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Longest Common Subsequence (LCS) control-flow scope clear.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Longest Common Subsequence (LCS) control-flow scope clear.
- **CPP line 10:** Record the result or trace state returned by Longest Common Subsequence (LCS); check that every required exit path reaches a valid result.
- **CPP line 11:** Match this closing delimiter with its opening block to keep the Longest Common Subsequence (LCS) control-flow scope clear.

##### JAVA reference

```java
public static int lcs(String X, String Y) { /* DP table calculation */ return 0; }
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.

##### PYTHON reference

```python
def lcs(X, Y):
    m, n = len(X), len(Y)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if X[i-1] == Y[j-1]: dp[i][j] = 1 + dp[i-1][j-1]
            else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace this repetition in Longest Common Subsequence (LCS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 5:** Trace this repetition in Longest Common Subsequence (LCS): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 6:** Evaluate this branch for the current Longest Common Subsequence (LCS) state; note which alternative runs and which states are excluded.
- **PYTHON line 7:** Evaluate this branch for the current Longest Common Subsequence (LCS) state; note which alternative runs and which states are excluded.
- **PYTHON line 8:** Record the result or trace state returned by Longest Common Subsequence (LCS); check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Subsequence | Sequence derived by deleting zero or more elements without changing relative order. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Longest Common Subsequence (LCS) without reading the code.

**Practice task:** Build one small input for Longest Common Subsequence (LCS), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Longest Common Subsequence (LCS) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Rat in a Maze

**Catalog identifier:** `rat_in_maze`  
**Course category:** Backtracking  
**Catalog position:** 21 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Backtracking Grid Search |
| Best-case time | O(4^(N²)) |
| Average-case time | O(4^(N²)) |
| Worst-case time | O(4^(N²)) |
| Auxiliary space | O(N²) |
| Stable | N/A |
| In place | Yes |
| Default input | `[4]` |
| Input requirement | Grid dimensions N |

#### Concept and teaching notes

**Short description.** Backtracking pathfinding from source (0,0) to destination (N-1,N-1) through grid barriers.
**Definition.** Backtracking pathfinding from source (0,0) to destination (N-1,N-1) through grid barriers.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Rat in a Maze.
**When to use it.** Use this lesson to study Rat in a Maze and compare its assumptions and bounds with related entries.
**Common mistake.** Not marking visited cells causing infinite back-and-forth loops.
**Exam note.** Backtracking step: When all 4 directions fail, unmark the cell before returning false.

#### Trace study questions

1. **Rat in a Maze:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Rat in a Maze:** What output or terminal status should a correct execution produce?
3. **Rat in a Maze:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Rat in a Maze:** What is the smallest meaningful state transition in this implementation?
5. **Rat in a Maze:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Rat in a Maze:** What condition allows execution to proceed to the next candidate?
7. **Rat in a Maze:** What condition makes the algorithm stop?
8. **Rat in a Maze:** Which values should be written in a dry-run table before the first update?
9. **Rat in a Maze:** Which values should be written after one complete loop iteration or recursive call?
10. **Rat in a Maze:** Which invariant or correctness property can be checked after this frame?
11. **Rat in a Maze:** Which assumption is required for the selected algorithm to be correct?
12. **Rat in a Maze:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Rat in a Maze:** What input follows the best-case behavior listed in the source catalog?
14. **Rat in a Maze:** What input shape can trigger the listed worst-case behavior?
15. **Rat in a Maze:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Rat in a Maze:** What should happen for an empty or minimal input if the UI permits it?
17. **Rat in a Maze:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Rat in a Maze:** What auxiliary storage is allocated and when can it be released?
19. **Rat in a Maze:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Rat in a Maze:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Rat in a Maze:** What result would demonstrate that this trace has finished correctly?
22. **Rat in a Maze:** Which independent test assertion could catch a bug in this transition?
23. **Rat in a Maze:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Rat in a Maze:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(4^(N²)), average time O(4^(N²)), worst time O(4^(N²)), and auxiliary space O(N²).
1. **Rat in a Maze:** Name the input-size variable used in the published time bound.
2. **Rat in a Maze:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Rat in a Maze:** Identify the operation performed once per outer iteration.
4. **Rat in a Maze:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Rat in a Maze:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Rat in a Maze:** Explain how the input structure changes the amount of work.
7. **Rat in a Maze:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Rat in a Maze:** Separate comparisons from writes or swaps where appropriate.
9. **Rat in a Maze:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Rat in a Maze:** Explain why the average-case entry may differ from both best and worst case.
11. **Rat in a Maze:** Describe what auxiliary space counts for this algorithm.
12. **Rat in a Maze:** Check whether recursion stack space is included in the documented space bound.
13. **Rat in a Maze:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Rat in a Maze:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Rat in a Maze:** Explain which code operation dominates as the input grows.
16. **Rat in a Maze:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function solveMaze(r, c):
  if r == n-1 and c == n-1: return true
  for (dr, dc) in directions:
    if isSafe(r+dr, c+dc):
      markVisited()
      if solveMaze(r+dr, c+dc): return true
      unmark() // Backtrack
  return false
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Rat in a Maze; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Evaluate this branch for the current Rat in a Maze state; note which alternative runs and which states are excluded.
- **PSEUDO line 3:** Trace this repetition in Rat in a Maze: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Evaluate this branch for the current Rat in a Maze state; note which alternative runs and which states are excluded.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Evaluate this branch for the current Rat in a Maze state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Record the result or trace state returned by Rat in a Maze; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
bool solveMaze(int r, int c, vector<vector<int>>& maze, vector<vector<int>>& sol) {
    if (r == N - 1 && c == N - 1) { sol[r][c] = 1; return true; }
    if (isSafe(r, c, maze)) {
        sol[r][c] = 1;
        if (solveMaze(r + 1, c, maze, sol)) return true;
        if (solveMaze(r, c + 1, maze, sol)) return true;
        sol[r][c] = 0; // Backtrack
    }
    return false;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Evaluate this branch for the current Rat in a Maze state; note which alternative runs and which states are excluded.
- **CPP line 3:** Evaluate this branch for the current Rat in a Maze state; note which alternative runs and which states are excluded.
- **CPP line 4:** Check the index and boundary for this Rat in a Maze access; state which input or auxiliary cell is read or updated.
- **CPP line 5:** Evaluate this branch for the current Rat in a Maze state; note which alternative runs and which states are excluded.
- **CPP line 6:** Evaluate this branch for the current Rat in a Maze state; note which alternative runs and which states are excluded.
- **CPP line 7:** Check the index and boundary for this Rat in a Maze access; state which input or auxiliary cell is read or updated.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Rat in a Maze control-flow scope clear.
- **CPP line 9:** Record the result or trace state returned by Rat in a Maze; check that every required exit path reaches a valid result.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Rat in a Maze control-flow scope clear.

##### JAVA reference

```java
// Rat in Maze solution
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def solve_maze(r, c, maze, sol):
    # Backtracking search
    pass
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Grid Backtracking | Exploration with state undoing upon reaching dead ends. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Rat in a Maze without reading the code.

**Practice task:** Build one small input for Rat in a Maze, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Rat in a Maze short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Asymptotic Growth Comparator (Big-O)

**Catalog identifier:** `asymptotic_growth`  
**Course category:** Analysis & Correctness  
**Catalog position:** 22 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Mathematical Order Analysis |
| Best-case time | O(1) |
| Average-case time | O(1) |
| Worst-case time | O(1) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[1,2,4,8,16]` |
| Input requirement | Input scale array n values [1, 2, 4, 8, 16] |

#### Concept and teaching notes

**Short description.** Compares growth rates of O(1), O(log n), O(n), O(n log n), O(n²), and O(2ⁿ) as problem size scales.
**Definition.** Compares growth rates of O(1), O(log n), O(n), O(n log n), O(n²), and O(2ⁿ) as problem size scales.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Asymptotic Growth Comparator (Big-O).
**When to use it.** Use this lesson to study Asymptotic Growth Comparator (Big-O) and compare its assumptions and bounds with related entries.
**Common mistake.** Thinking O(n log n) is worse than O(n²). For large n, n log n is drastically faster than n².
**Exam note.** Strict hierarchy: O(1) ⊂ O(log n) ⊂ O(n) ⊂ O(n log n) ⊂ O(n²) ⊂ O(n³) ⊂ O(2ⁿ) ⊂ O(n!).

#### Trace study questions

1. **Asymptotic Growth Comparator (Big-O):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Asymptotic Growth Comparator (Big-O):** What output or terminal status should a correct execution produce?
3. **Asymptotic Growth Comparator (Big-O):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Asymptotic Growth Comparator (Big-O):** What is the smallest meaningful state transition in this implementation?
5. **Asymptotic Growth Comparator (Big-O):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Asymptotic Growth Comparator (Big-O):** What condition allows execution to proceed to the next candidate?
7. **Asymptotic Growth Comparator (Big-O):** What condition makes the algorithm stop?
8. **Asymptotic Growth Comparator (Big-O):** Which values should be written in a dry-run table before the first update?
9. **Asymptotic Growth Comparator (Big-O):** Which values should be written after one complete loop iteration or recursive call?
10. **Asymptotic Growth Comparator (Big-O):** Which invariant or correctness property can be checked after this frame?
11. **Asymptotic Growth Comparator (Big-O):** Which assumption is required for the selected algorithm to be correct?
12. **Asymptotic Growth Comparator (Big-O):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Asymptotic Growth Comparator (Big-O):** What input follows the best-case behavior listed in the source catalog?
14. **Asymptotic Growth Comparator (Big-O):** What input shape can trigger the listed worst-case behavior?
15. **Asymptotic Growth Comparator (Big-O):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Asymptotic Growth Comparator (Big-O):** What should happen for an empty or minimal input if the UI permits it?
17. **Asymptotic Growth Comparator (Big-O):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Asymptotic Growth Comparator (Big-O):** What auxiliary storage is allocated and when can it be released?
19. **Asymptotic Growth Comparator (Big-O):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Asymptotic Growth Comparator (Big-O):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Asymptotic Growth Comparator (Big-O):** What result would demonstrate that this trace has finished correctly?
22. **Asymptotic Growth Comparator (Big-O):** Which independent test assertion could catch a bug in this transition?
23. **Asymptotic Growth Comparator (Big-O):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Asymptotic Growth Comparator (Big-O):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(1), worst time O(1), and auxiliary space O(1).
1. **Asymptotic Growth Comparator (Big-O):** Name the input-size variable used in the published time bound.
2. **Asymptotic Growth Comparator (Big-O):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Asymptotic Growth Comparator (Big-O):** Identify the operation performed once per outer iteration.
4. **Asymptotic Growth Comparator (Big-O):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Asymptotic Growth Comparator (Big-O):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Asymptotic Growth Comparator (Big-O):** Explain how the input structure changes the amount of work.
7. **Asymptotic Growth Comparator (Big-O):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Asymptotic Growth Comparator (Big-O):** Separate comparisons from writes or swaps where appropriate.
9. **Asymptotic Growth Comparator (Big-O):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Asymptotic Growth Comparator (Big-O):** Explain why the average-case entry may differ from both best and worst case.
11. **Asymptotic Growth Comparator (Big-O):** Describe what auxiliary space counts for this algorithm.
12. **Asymptotic Growth Comparator (Big-O):** Check whether recursion stack space is included in the documented space bound.
13. **Asymptotic Growth Comparator (Big-O):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Asymptotic Growth Comparator (Big-O):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Asymptotic Growth Comparator (Big-O):** Explain which code operation dominates as the input grows.
16. **Asymptotic Growth Comparator (Big-O):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function compareGrowth(n):
  return {
    constant: 1,
    logarithmic: log2(n),
    linear: n,
    linearithmic: n * log2(n),
    quadratic: n * n,
    exponential: 2^n
  }
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Asymptotic Growth Comparator (Big-O); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Record the result or trace state returned by Asymptotic Growth Comparator (Big-O); check that every required exit path reaches a valid result.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Trace source line 8 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 9:** Match this closing delimiter with its opening block to keep the Asymptotic Growth Comparator (Big-O) control-flow scope clear.

##### CPP reference

```cpp
struct ComplexitySample {
    double logN, N, nLogN, nSquared, twoPowerN;
    static ComplexitySample at(int n) {
        return { log2(n), (double)n, n * log2(n), (double)(n*n), pow(2, n) };
    }
};
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Record the result or trace state returned by Asymptotic Growth Comparator (Big-O); check that every required exit path reaches a valid result.
- **CPP line 5:** Match this closing delimiter with its opening block to keep the Asymptotic Growth Comparator (Big-O) control-flow scope clear.
- **CPP line 6:** Match this closing delimiter with its opening block to keep the Asymptotic Growth Comparator (Big-O) control-flow scope clear.

##### JAVA reference

```java
public class GrowthRates {
    public static void printHierarchy(int n) {
        System.out.println("O(log n) = " + (Math.log(n)/Math.log(2)));
        System.out.println("O(n log n) = " + (n * Math.log(n)/Math.log(2)));
    }
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Trace source line 3 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Match this closing delimiter with its opening block to keep the Asymptotic Growth Comparator (Big-O) control-flow scope clear.
- **JAVA line 6:** Match this closing delimiter with its opening block to keep the Asymptotic Growth Comparator (Big-O) control-flow scope clear.

##### PYTHON reference

```python
import math
def growth_rates(n):
    return {
        "log_n": math.log2(n),
        "n": n,
        "n_log_n": n * math.log2(n),
        "n_sq": n**2,
        "exp": 2**n
    }
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Record the result or trace state returned by Asymptotic Growth Comparator (Big-O); check that every required exit path reaches a valid result.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Trace source line 5 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 6:** Trace source line 6 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 7:** Trace source line 7 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 8:** Trace source line 8 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 9:** Match this closing delimiter with its opening block to keep the Asymptotic Growth Comparator (Big-O) control-flow scope clear.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Big-O (O) | Asymptotic upper bound: f(n) <= c · g(n) for all n >= n0. |
| Big-Omega (Ω) | Asymptotic lower bound: f(n) >= c · g(n) for all n >= n0. |
| Big-Theta (Θ) | Asymptotically tight bound: c1·g(n) <= f(n) <= c2·g(n). |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Asymptotic Growth Comparator (Big-O) without reading the code.

**Practice task:** Build one small input for Asymptotic Growth Comparator (Big-O), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Asymptotic Growth Comparator (Big-O) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Master Theorem Recurrence Solver

**Catalog identifier:** `master_theorem_sim`  
**Course category:** Analysis & Correctness  
**Catalog position:** 23 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Recurrence Equation Analysis |
| Best-case time | O(1) |
| Average-case time | O(1) |
| Worst-case time | O(1) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[2,2,1]` |
| Input requirement | Parameters a, b, d for recurrence T(n) = a·T(n/b) + Θ(n^d) |

#### Concept and teaching notes

**Short description.** Automated solver for divide-and-conquer recurrences T(n) = a·T(n/b) + f(n).
**Definition.** Automated solver for divide-and-conquer recurrences T(n) = a·T(n/b) + f(n).
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Master Theorem Recurrence Solver.
**When to use it.** Use this lesson to study Master Theorem Recurrence Solver and compare its assumptions and bounds with related entries.
**Common mistake.** Applying Master Theorem when b <= 1, a < 1, or f(n) is not polynomial (e.g. 2^n).
**Exam note.** Case 1: log_b(a) > d => Θ(n^(log_b a)). Case 2: log_b(a) == d => Θ(n^d · log n). Case 3: log_b(a) < d => Θ(f(n)).

#### Trace study questions

1. **Master Theorem Recurrence Solver:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Master Theorem Recurrence Solver:** What output or terminal status should a correct execution produce?
3. **Master Theorem Recurrence Solver:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Master Theorem Recurrence Solver:** What is the smallest meaningful state transition in this implementation?
5. **Master Theorem Recurrence Solver:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Master Theorem Recurrence Solver:** What condition allows execution to proceed to the next candidate?
7. **Master Theorem Recurrence Solver:** What condition makes the algorithm stop?
8. **Master Theorem Recurrence Solver:** Which values should be written in a dry-run table before the first update?
9. **Master Theorem Recurrence Solver:** Which values should be written after one complete loop iteration or recursive call?
10. **Master Theorem Recurrence Solver:** Which invariant or correctness property can be checked after this frame?
11. **Master Theorem Recurrence Solver:** Which assumption is required for the selected algorithm to be correct?
12. **Master Theorem Recurrence Solver:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Master Theorem Recurrence Solver:** What input follows the best-case behavior listed in the source catalog?
14. **Master Theorem Recurrence Solver:** What input shape can trigger the listed worst-case behavior?
15. **Master Theorem Recurrence Solver:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Master Theorem Recurrence Solver:** What should happen for an empty or minimal input if the UI permits it?
17. **Master Theorem Recurrence Solver:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Master Theorem Recurrence Solver:** What auxiliary storage is allocated and when can it be released?
19. **Master Theorem Recurrence Solver:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Master Theorem Recurrence Solver:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Master Theorem Recurrence Solver:** What result would demonstrate that this trace has finished correctly?
22. **Master Theorem Recurrence Solver:** Which independent test assertion could catch a bug in this transition?
23. **Master Theorem Recurrence Solver:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Master Theorem Recurrence Solver:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(1), worst time O(1), and auxiliary space O(1).
1. **Master Theorem Recurrence Solver:** Name the input-size variable used in the published time bound.
2. **Master Theorem Recurrence Solver:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Master Theorem Recurrence Solver:** Identify the operation performed once per outer iteration.
4. **Master Theorem Recurrence Solver:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Master Theorem Recurrence Solver:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Master Theorem Recurrence Solver:** Explain how the input structure changes the amount of work.
7. **Master Theorem Recurrence Solver:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Master Theorem Recurrence Solver:** Separate comparisons from writes or swaps where appropriate.
9. **Master Theorem Recurrence Solver:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Master Theorem Recurrence Solver:** Explain why the average-case entry may differ from both best and worst case.
11. **Master Theorem Recurrence Solver:** Describe what auxiliary space counts for this algorithm.
12. **Master Theorem Recurrence Solver:** Check whether recursion stack space is included in the documented space bound.
13. **Master Theorem Recurrence Solver:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Master Theorem Recurrence Solver:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Master Theorem Recurrence Solver:** Explain which code operation dominates as the input grows.
16. **Master Theorem Recurrence Solver:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function solveMasterTheorem(a, b, d):
  crit = log_b(a)
  if crit > d: return "Theta(n^" + crit + ")"
  else if crit == d: return "Theta(n^" + d + " * log n)"
  else: return "Theta(n^" + d + ")"
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Master Theorem Recurrence Solver; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.
- **PSEUDO line 4:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.
- **PSEUDO line 5:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.

##### CPP reference

```cpp
string solveMaster(double a, double b, double d) {
    double crit = log(a) / log(b);
    if (abs(crit - d) < 1e-6) return "Theta(n^" + to_string((int)d) + " log n)";
    if (crit > d) return "Theta(n^" + to_string(crit) + ")";
    return "Theta(n^" + to_string((int)d) + ")";
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.
- **CPP line 4:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.
- **CPP line 5:** Record the result or trace state returned by Master Theorem Recurrence Solver; check that every required exit path reaches a valid result.
- **CPP line 6:** Match this closing delimiter with its opening block to keep the Master Theorem Recurrence Solver control-flow scope clear.

##### JAVA reference

```java
public static String solveMaster(double a, double b, double d) {
    double crit = Math.log(a) / Math.log(b);
    if (Math.abs(crit - d) < 1e-5) return "Theta(n^" + d + " log n)";
    return crit > d ? "Theta(n^" + crit + ")" : "Theta(n^" + d + ")";
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.
- **JAVA line 4:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.
- **JAVA line 5:** Match this closing delimiter with its opening block to keep the Master Theorem Recurrence Solver control-flow scope clear.

##### PYTHON reference

```python
import math
def master_theorem(a, b, d):
    crit = math.log(a, b)
    if math.isclose(crit, d): return f"Theta(n^{d} log n)"
    elif crit > d: return f"Theta(n^{crit:.2f})"
    else: return f"Theta(n^{d})"
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.
- **PYTHON line 5:** Translate this Master Theorem Recurrence Solver comparison into a true/false condition for the active values, including equality and boundary cases.
- **PYTHON line 6:** Evaluate this branch for the current Master Theorem Recurrence Solver state; note which alternative runs and which states are excluded.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Critical Exponent | log_b(a): The watershed exponent separating leaf-heavy and root-heavy recurrences. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Master Theorem Recurrence Solver without reading the code.

**Practice task:** Build one small input for Master Theorem Recurrence Solver, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Master Theorem Recurrence Solver short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Karatsuba Fast Multiplication

**Catalog identifier:** `karatsuba_mult`  
**Course category:** Divide and Conquer  
**Catalog position:** 24 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Divide and Conquer |
| Best-case time | O(n^1.585) |
| Average-case time | O(n^1.585) |
| Worst-case time | O(n^1.585) |
| Auxiliary space | O(n) |
| Stable | N/A |
| In place | No |
| Default input | `[1234,5678]` |
| Input requirement | Two multi-digit integers [X, Y] |

#### Concept and teaching notes

**Short description.** Multiplies large integers in O(n^1.585) using 3 recursive multiplications instead of 4.
**Definition.** Multiplies large integers in O(n^1.585) using 3 recursive multiplications instead of 4.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Karatsuba Fast Multiplication.
**When to use it.** Use this lesson to study Karatsuba Fast Multiplication and compare its assumptions and bounds with related entries.
**Common mistake.** Assuming standard grade-school multiplication O(n²) cannot be asymptotically beaten.
**Exam note.** Karatsuba recurrence: T(n) = 3T(n/2) + O(n). By Master Theorem: a=3, b=2 => log_2(3) ≈ 1.585.

#### Trace study questions

1. **Karatsuba Fast Multiplication:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Karatsuba Fast Multiplication:** What output or terminal status should a correct execution produce?
3. **Karatsuba Fast Multiplication:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Karatsuba Fast Multiplication:** What is the smallest meaningful state transition in this implementation?
5. **Karatsuba Fast Multiplication:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Karatsuba Fast Multiplication:** What condition allows execution to proceed to the next candidate?
7. **Karatsuba Fast Multiplication:** What condition makes the algorithm stop?
8. **Karatsuba Fast Multiplication:** Which values should be written in a dry-run table before the first update?
9. **Karatsuba Fast Multiplication:** Which values should be written after one complete loop iteration or recursive call?
10. **Karatsuba Fast Multiplication:** Which invariant or correctness property can be checked after this frame?
11. **Karatsuba Fast Multiplication:** Which assumption is required for the selected algorithm to be correct?
12. **Karatsuba Fast Multiplication:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Karatsuba Fast Multiplication:** What input follows the best-case behavior listed in the source catalog?
14. **Karatsuba Fast Multiplication:** What input shape can trigger the listed worst-case behavior?
15. **Karatsuba Fast Multiplication:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Karatsuba Fast Multiplication:** What should happen for an empty or minimal input if the UI permits it?
17. **Karatsuba Fast Multiplication:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Karatsuba Fast Multiplication:** What auxiliary storage is allocated and when can it be released?
19. **Karatsuba Fast Multiplication:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Karatsuba Fast Multiplication:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Karatsuba Fast Multiplication:** What result would demonstrate that this trace has finished correctly?
22. **Karatsuba Fast Multiplication:** Which independent test assertion could catch a bug in this transition?
23. **Karatsuba Fast Multiplication:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Karatsuba Fast Multiplication:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n^1.585), average time O(n^1.585), worst time O(n^1.585), and auxiliary space O(n).
1. **Karatsuba Fast Multiplication:** Name the input-size variable used in the published time bound.
2. **Karatsuba Fast Multiplication:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Karatsuba Fast Multiplication:** Identify the operation performed once per outer iteration.
4. **Karatsuba Fast Multiplication:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Karatsuba Fast Multiplication:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Karatsuba Fast Multiplication:** Explain how the input structure changes the amount of work.
7. **Karatsuba Fast Multiplication:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Karatsuba Fast Multiplication:** Separate comparisons from writes or swaps where appropriate.
9. **Karatsuba Fast Multiplication:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Karatsuba Fast Multiplication:** Explain why the average-case entry may differ from both best and worst case.
11. **Karatsuba Fast Multiplication:** Describe what auxiliary space counts for this algorithm.
12. **Karatsuba Fast Multiplication:** Check whether recursion stack space is included in the documented space bound.
13. **Karatsuba Fast Multiplication:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Karatsuba Fast Multiplication:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Karatsuba Fast Multiplication:** Explain which code operation dominates as the input grows.
16. **Karatsuba Fast Multiplication:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function karatsuba(x, y):
  if x < 10 or y < 10: return x * y
  m = max(len(x), len(y)) / 2
  a, b = split(x, m)
  c, d = split(y, m)
  z0 = karatsuba(b, d)
  z2 = karatsuba(a, c)
  z1 = karatsuba(a + b, c + d) - z2 - z0
  return z2 * 10^(2m) + z1 * 10^m + z0
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Karatsuba Fast Multiplication; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Evaluate this branch for the current Karatsuba Fast Multiplication state; note which alternative runs and which states are excluded.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Trace source line 8 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 9:** Record the result or trace state returned by Karatsuba Fast Multiplication; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
long long karatsuba(long long x, long long y) {
    if (x < 10 || y < 10) return x * y;
    int n = to_string(max(x, y)).length();
    int m = n / 2;
    long long base = pow(10, m);
    long long a = x / base, b = x % base;
    long long c = y / base, d = y % base;
    long long z0 = karatsuba(b, d);
    long long z2 = karatsuba(a, c);
    long long z1 = karatsuba(a + b, c + d) - z2 - z0;
    return z2 * pow(10, 2*m) + z1 * base + z0;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Evaluate this branch for the current Karatsuba Fast Multiplication state; note which alternative runs and which states are excluded.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace source line 5 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 6:** Trace source line 6 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 7:** Trace source line 7 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 8:** Trace source line 8 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 9:** Trace source line 9 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 10:** Trace source line 10 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 11:** Record the result or trace state returned by Karatsuba Fast Multiplication; check that every required exit path reaches a valid result.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Karatsuba Fast Multiplication control-flow scope clear.

##### JAVA reference

```java
public static long karatsuba(long x, long y) {
    if (x < 10 || y < 10) return x * y;
    int m = Math.max(String.valueOf(x).length(), String.valueOf(y).length()) / 2;
    long base = (long) Math.pow(10, m);
    long a = x / base, b = x % base, c = y / base, d = y % base;
    long z0 = karatsuba(b, d), z2 = karatsuba(a, c);
    long z1 = karatsuba(a + b, c + d) - z2 - z0;
    return z2 * (long)Math.pow(10, 2 * m) + z1 * base + z0;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Evaluate this branch for the current Karatsuba Fast Multiplication state; note which alternative runs and which states are excluded.
- **JAVA line 3:** Trace source line 3 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 4:** Trace source line 4 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 5:** Trace source line 5 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 6:** Trace source line 6 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 7:** Trace source line 7 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 8:** Record the result or trace state returned by Karatsuba Fast Multiplication; check that every required exit path reaches a valid result.
- **JAVA line 9:** Match this closing delimiter with its opening block to keep the Karatsuba Fast Multiplication control-flow scope clear.

##### PYTHON reference

```python
def karatsuba(x, y):
    if x < 10 or y < 10: return x * y
    m = max(len(str(x)), len(str(y))) // 2
    base = 10**m
    a, b = divmod(x, base)
    c, d = divmod(y, base)
    z0 = karatsuba(b, d)
    z2 = karatsuba(a, c)
    z1 = karatsuba(a + b, c + d) - z2 - z0
    return z2 * 10**(2*m) + z1 * base + z0
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Evaluate this branch for the current Karatsuba Fast Multiplication state; note which alternative runs and which states are excluded.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Trace source line 5 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 6:** Trace source line 6 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 7:** Trace source line 7 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 8:** Trace source line 8 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 9:** Trace source line 9 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 10:** Record the result or trace state returned by Karatsuba Fast Multiplication; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Sub-quadratic multiplication | Beating O(n²) integer multiplication using algebraic identity. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Karatsuba Fast Multiplication without reading the code.

**Practice task:** Build one small input for Karatsuba Fast Multiplication, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Karatsuba Fast Multiplication short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Closest Pair of 2D Points

**Catalog identifier:** `closest_pair`  
**Course category:** Divide and Conquer  
**Catalog position:** 25 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Divide and Conquer |
| Best-case time | O(n log n) |
| Average-case time | O(n log n) |
| Worst-case time | O(n log n) |
| Auxiliary space | O(n) |
| Stable | N/A |
| In place | No |
| Default input | `[2,12,40,5,12,3]` |
| Input requirement | 2D Cartesian coordinates |

#### Concept and teaching notes

**Short description.** Finds two closest points in a plane in O(n log n) by dividing along a vertical strip.
**Definition.** Finds two closest points in a plane in O(n log n) by dividing along a vertical strip.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Closest Pair of 2D Points.
**When to use it.** Use this lesson to study Closest Pair of 2D Points and compare its assumptions and bounds with related entries.
**Common mistake.** Checking all pairs in the strip in O(n²). Only 7 subsequent points in sorted y order need testing!
**Exam note.** Geometric packing argument: Within a d × 2d rectangle, at most 8 points can exist without violating minimum distance d.

#### Trace study questions

1. **Closest Pair of 2D Points:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Closest Pair of 2D Points:** What output or terminal status should a correct execution produce?
3. **Closest Pair of 2D Points:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Closest Pair of 2D Points:** What is the smallest meaningful state transition in this implementation?
5. **Closest Pair of 2D Points:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Closest Pair of 2D Points:** What condition allows execution to proceed to the next candidate?
7. **Closest Pair of 2D Points:** What condition makes the algorithm stop?
8. **Closest Pair of 2D Points:** Which values should be written in a dry-run table before the first update?
9. **Closest Pair of 2D Points:** Which values should be written after one complete loop iteration or recursive call?
10. **Closest Pair of 2D Points:** Which invariant or correctness property can be checked after this frame?
11. **Closest Pair of 2D Points:** Which assumption is required for the selected algorithm to be correct?
12. **Closest Pair of 2D Points:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Closest Pair of 2D Points:** What input follows the best-case behavior listed in the source catalog?
14. **Closest Pair of 2D Points:** What input shape can trigger the listed worst-case behavior?
15. **Closest Pair of 2D Points:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Closest Pair of 2D Points:** What should happen for an empty or minimal input if the UI permits it?
17. **Closest Pair of 2D Points:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Closest Pair of 2D Points:** What auxiliary storage is allocated and when can it be released?
19. **Closest Pair of 2D Points:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Closest Pair of 2D Points:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Closest Pair of 2D Points:** What result would demonstrate that this trace has finished correctly?
22. **Closest Pair of 2D Points:** Which independent test assertion could catch a bug in this transition?
23. **Closest Pair of 2D Points:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Closest Pair of 2D Points:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n log n), average time O(n log n), worst time O(n log n), and auxiliary space O(n).
1. **Closest Pair of 2D Points:** Name the input-size variable used in the published time bound.
2. **Closest Pair of 2D Points:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Closest Pair of 2D Points:** Identify the operation performed once per outer iteration.
4. **Closest Pair of 2D Points:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Closest Pair of 2D Points:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Closest Pair of 2D Points:** Explain how the input structure changes the amount of work.
7. **Closest Pair of 2D Points:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Closest Pair of 2D Points:** Separate comparisons from writes or swaps where appropriate.
9. **Closest Pair of 2D Points:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Closest Pair of 2D Points:** Explain why the average-case entry may differ from both best and worst case.
11. **Closest Pair of 2D Points:** Describe what auxiliary space counts for this algorithm.
12. **Closest Pair of 2D Points:** Check whether recursion stack space is included in the documented space bound.
13. **Closest Pair of 2D Points:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Closest Pair of 2D Points:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Closest Pair of 2D Points:** Explain which code operation dominates as the input grows.
16. **Closest Pair of 2D Points:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function closestPair(P):
  sort P by X
  divide into Left and Right
  d = min(closest(Left), closest(Right))
  strip = points within d of midline
  sort strip by Y
  for each p in strip:
    check next 7 points for dist < d
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Closest Pair of 2D Points; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Trace this repetition in Closest Pair of 2D Points: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 8:** Translate this Closest Pair of 2D Points comparison into a true/false condition for the active values, including equality and boundary cases.

##### CPP reference

```cpp
double closestPair(vector<Point>& P) {
    sort(P.begin(), P.end(), [](auto& a, auto& b) { return a.x < b.x; });
    return closestUtil(P, 0, P.size() - 1);
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Track the collection mutation made by Closest Pair of 2D Points; compare the collection immediately before and after this statement.
- **CPP line 3:** Record the result or trace state returned by Closest Pair of 2D Points; check that every required exit path reaches a valid result.
- **CPP line 4:** Match this closing delimiter with its opening block to keep the Closest Pair of 2D Points control-flow scope clear.

##### JAVA reference

```java
// Divide and Conquer Closest Pair
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def closest_pair(points):
    points.sort(key=lambda p: p[0])
    # Recursive divide and 7-neighbor strip check
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Track the collection mutation made by Closest Pair of 2D Points; compare the collection immediately before and after this statement.
- **PYTHON line 3:** Read this source comment as intent; verify the executable statements implement the stated intent.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Strip Optimization | Restricting cross-boundary distance queries to a 2d boundary band. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Closest Pair of 2D Points without reading the code.

**Practice task:** Build one small input for Closest Pair of 2D Points, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Closest Pair of 2D Points short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Fractional Knapsack Problem

**Catalog identifier:** `fractional_knapsack`  
**Course category:** cat_design_tech  
**Catalog position:** 26 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Greedy Method |
| Best-case time | O(n log n) |
| Average-case time | O(n log n) |
| Worst-case time | O(n log n) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[10,20,30]` |
| Input requirement | Item weights, values, and total capacity |

#### Concept and teaching notes

**Short description.** Greedily takes items by highest value/weight ratio with ability to cut fractional portions.
**Definition.** Greedily takes items by highest value/weight ratio with ability to cut fractional portions.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Fractional Knapsack Problem.
**When to use it.** Use this lesson to study Fractional Knapsack Problem and compare its assumptions and bounds with related entries.
**Common mistake.** Confusing 0/1 Knapsack with Fractional Knapsack. Fractional CAN be solved with Greedy; 0/1 CANNOT!
**Exam note.** Always cite Greedy Choice Property: Taking the item with highest value density is provably optimal.

#### Trace study questions

1. **Fractional Knapsack Problem:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Fractional Knapsack Problem:** What output or terminal status should a correct execution produce?
3. **Fractional Knapsack Problem:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Fractional Knapsack Problem:** What is the smallest meaningful state transition in this implementation?
5. **Fractional Knapsack Problem:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Fractional Knapsack Problem:** What condition allows execution to proceed to the next candidate?
7. **Fractional Knapsack Problem:** What condition makes the algorithm stop?
8. **Fractional Knapsack Problem:** Which values should be written in a dry-run table before the first update?
9. **Fractional Knapsack Problem:** Which values should be written after one complete loop iteration or recursive call?
10. **Fractional Knapsack Problem:** Which invariant or correctness property can be checked after this frame?
11. **Fractional Knapsack Problem:** Which assumption is required for the selected algorithm to be correct?
12. **Fractional Knapsack Problem:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Fractional Knapsack Problem:** What input follows the best-case behavior listed in the source catalog?
14. **Fractional Knapsack Problem:** What input shape can trigger the listed worst-case behavior?
15. **Fractional Knapsack Problem:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Fractional Knapsack Problem:** What should happen for an empty or minimal input if the UI permits it?
17. **Fractional Knapsack Problem:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Fractional Knapsack Problem:** What auxiliary storage is allocated and when can it be released?
19. **Fractional Knapsack Problem:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Fractional Knapsack Problem:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Fractional Knapsack Problem:** What result would demonstrate that this trace has finished correctly?
22. **Fractional Knapsack Problem:** Which independent test assertion could catch a bug in this transition?
23. **Fractional Knapsack Problem:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Fractional Knapsack Problem:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n log n), average time O(n log n), worst time O(n log n), and auxiliary space O(1).
1. **Fractional Knapsack Problem:** Name the input-size variable used in the published time bound.
2. **Fractional Knapsack Problem:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Fractional Knapsack Problem:** Identify the operation performed once per outer iteration.
4. **Fractional Knapsack Problem:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Fractional Knapsack Problem:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Fractional Knapsack Problem:** Explain how the input structure changes the amount of work.
7. **Fractional Knapsack Problem:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Fractional Knapsack Problem:** Separate comparisons from writes or swaps where appropriate.
9. **Fractional Knapsack Problem:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Fractional Knapsack Problem:** Explain why the average-case entry may differ from both best and worst case.
11. **Fractional Knapsack Problem:** Describe what auxiliary space counts for this algorithm.
12. **Fractional Knapsack Problem:** Check whether recursion stack space is included in the documented space bound.
13. **Fractional Knapsack Problem:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Fractional Knapsack Problem:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Fractional Knapsack Problem:** Explain which code operation dominates as the input grows.
16. **Fractional Knapsack Problem:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function fractionalKnapsack(items, W):
  sort items by (value / weight) descending
  totalVal = 0
  for item in items:
    if W >= item.weight:
      totalVal += item.value
      W -= item.weight
    else:
      totalVal += item.value * (W / item.weight)
      break
  return totalVal
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Fractional Knapsack Problem; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace this repetition in Fractional Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Evaluate this branch for the current Fractional Knapsack Problem state; note which alternative runs and which states are excluded.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Evaluate this branch for the current Fractional Knapsack Problem state; note which alternative runs and which states are excluded.
- **PSEUDO line 9:** Trace source line 9 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 10:** Trace source line 10 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 11:** Record the result or trace state returned by Fractional Knapsack Problem; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
double fractionalKnapsack(int W, vector<Item>& items) {
    sort(items.begin(), items.end(), [](auto& a, auto& b) {
        return (double)a.val / a.wt > (double)b.val / b.wt;
    });
    double totalVal = 0.0;
    for (auto& item : items) {
        if (W >= item.wt) { totalVal += item.val; W -= item.wt; }
        else { totalVal += item.val * ((double)W / item.wt); break; }
    }
    return totalVal;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Track the collection mutation made by Fractional Knapsack Problem; compare the collection immediately before and after this statement.
- **CPP line 3:** Record the result or trace state returned by Fractional Knapsack Problem; check that every required exit path reaches a valid result.
- **CPP line 4:** Match this closing delimiter with its opening block to keep the Fractional Knapsack Problem control-flow scope clear.
- **CPP line 5:** Trace source line 5 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 6:** Trace this repetition in Fractional Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 7:** Evaluate this branch for the current Fractional Knapsack Problem state; note which alternative runs and which states are excluded.
- **CPP line 8:** Evaluate this branch for the current Fractional Knapsack Problem state; note which alternative runs and which states are excluded.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Fractional Knapsack Problem control-flow scope clear.
- **CPP line 10:** Record the result or trace state returned by Fractional Knapsack Problem; check that every required exit path reaches a valid result.
- **CPP line 11:** Match this closing delimiter with its opening block to keep the Fractional Knapsack Problem control-flow scope clear.

##### JAVA reference

```java
// Fractional Knapsack Greedy implementation
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def fractional_knapsack(items, W):
    items.sort(key=lambda x: x['val']/x['wt'], reverse=True)
    total_val = 0.0
    for it in items:
        if W >= it['wt']: total_val += it['val']; W -= it['wt']
        else: total_val += it['val'] * (W / it['wt']); break
    return total_val
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Track the collection mutation made by Fractional Knapsack Problem; compare the collection immediately before and after this statement.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace this repetition in Fractional Knapsack Problem: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 5:** Evaluate this branch for the current Fractional Knapsack Problem state; note which alternative runs and which states are excluded.
- **PYTHON line 6:** Evaluate this branch for the current Fractional Knapsack Problem state; note which alternative runs and which states are excluded.
- **PYTHON line 7:** Record the result or trace state returned by Fractional Knapsack Problem; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Value Density | The ratio value / weight; metric for greedy priority. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Fractional Knapsack Problem without reading the code.

**Practice task:** Build one small input for Fractional Knapsack Problem, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Fractional Knapsack Problem short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Huffman Optimal Prefix Code

**Catalog identifier:** `huffman_coding`  
**Course category:** cat_design_tech  
**Catalog position:** 27 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Greedy Priority Queue |
| Best-case time | O(n log n) |
| Average-case time | O(n log n) |
| Worst-case time | O(n log n) |
| Auxiliary space | O(n) |
| Stable | N/A |
| In place | No |
| Default input | `[45,13,12,16,9,5]` |
| Input requirement | Character frequency distribution array |

#### Concept and teaching notes

**Short description.** Constructs an optimal prefix tree for lossless data compression based on character frequencies.
**Definition.** Constructs an optimal prefix tree for lossless data compression based on character frequencies.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Huffman Optimal Prefix Code.
**When to use it.** Use this lesson to study Huffman Optimal Prefix Code and compare its assumptions and bounds with related entries.
**Common mistake.** Using fixed-length binary codes for variable frequency data, wasting bandwidth.
**Exam note.** Huffman codes satisfy the Prefix Rule: No valid code word is a prefix of any other code word.

#### Trace study questions

1. **Huffman Optimal Prefix Code:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Huffman Optimal Prefix Code:** What output or terminal status should a correct execution produce?
3. **Huffman Optimal Prefix Code:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Huffman Optimal Prefix Code:** What is the smallest meaningful state transition in this implementation?
5. **Huffman Optimal Prefix Code:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Huffman Optimal Prefix Code:** What condition allows execution to proceed to the next candidate?
7. **Huffman Optimal Prefix Code:** What condition makes the algorithm stop?
8. **Huffman Optimal Prefix Code:** Which values should be written in a dry-run table before the first update?
9. **Huffman Optimal Prefix Code:** Which values should be written after one complete loop iteration or recursive call?
10. **Huffman Optimal Prefix Code:** Which invariant or correctness property can be checked after this frame?
11. **Huffman Optimal Prefix Code:** Which assumption is required for the selected algorithm to be correct?
12. **Huffman Optimal Prefix Code:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Huffman Optimal Prefix Code:** What input follows the best-case behavior listed in the source catalog?
14. **Huffman Optimal Prefix Code:** What input shape can trigger the listed worst-case behavior?
15. **Huffman Optimal Prefix Code:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Huffman Optimal Prefix Code:** What should happen for an empty or minimal input if the UI permits it?
17. **Huffman Optimal Prefix Code:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Huffman Optimal Prefix Code:** What auxiliary storage is allocated and when can it be released?
19. **Huffman Optimal Prefix Code:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Huffman Optimal Prefix Code:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Huffman Optimal Prefix Code:** What result would demonstrate that this trace has finished correctly?
22. **Huffman Optimal Prefix Code:** Which independent test assertion could catch a bug in this transition?
23. **Huffman Optimal Prefix Code:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Huffman Optimal Prefix Code:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n log n), average time O(n log n), worst time O(n log n), and auxiliary space O(n).
1. **Huffman Optimal Prefix Code:** Name the input-size variable used in the published time bound.
2. **Huffman Optimal Prefix Code:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Huffman Optimal Prefix Code:** Identify the operation performed once per outer iteration.
4. **Huffman Optimal Prefix Code:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Huffman Optimal Prefix Code:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Huffman Optimal Prefix Code:** Explain how the input structure changes the amount of work.
7. **Huffman Optimal Prefix Code:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Huffman Optimal Prefix Code:** Separate comparisons from writes or swaps where appropriate.
9. **Huffman Optimal Prefix Code:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Huffman Optimal Prefix Code:** Explain why the average-case entry may differ from both best and worst case.
11. **Huffman Optimal Prefix Code:** Describe what auxiliary space counts for this algorithm.
12. **Huffman Optimal Prefix Code:** Check whether recursion stack space is included in the documented space bound.
13. **Huffman Optimal Prefix Code:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Huffman Optimal Prefix Code:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Huffman Optimal Prefix Code:** Explain which code operation dominates as the input grows.
16. **Huffman Optimal Prefix Code:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function buildHuffmanTree(freqs):
  pq = PriorityQueue(freqs)
  while pq.size() > 1:
    left = pq.extractMin()
    right = pq.extractMin()
    merged = Node(left.freq + right.freq, left, right)
    pq.insert(merged)
  return pq.extractMin()
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Huffman Optimal Prefix Code; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace this repetition in Huffman Optimal Prefix Code: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Record the result or trace state returned by Huffman Optimal Prefix Code; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
Node* buildHuffman(const vector<pair<char, int>>& freqs) {
    priority_queue<Node*, vector<Node*>, Compare> pq;
    for (auto& f : freqs) pq.push(new Node(f.first, f.second));
    while (pq.size() > 1) {
        auto l = pq.top(); pq.pop();
        auto r = pq.top(); pq.pop();
        pq.push(new Node('$', l->freq + r->freq, l, r));
    }
    return pq.top();
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Name the state represented by this Huffman Optimal Prefix Code variable and record its value before its first update.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace this repetition in Huffman Optimal Prefix Code: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Trace this repetition in Huffman Optimal Prefix Code: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Track the collection mutation made by Huffman Optimal Prefix Code; compare the collection immediately before and after this statement.
- **CPP line 6:** Track the collection mutation made by Huffman Optimal Prefix Code; compare the collection immediately before and after this statement.
- **CPP line 7:** Track the collection mutation made by Huffman Optimal Prefix Code; compare the collection immediately before and after this statement.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Huffman Optimal Prefix Code control-flow scope clear.
- **CPP line 9:** Record the result or trace state returned by Huffman Optimal Prefix Code; check that every required exit path reaches a valid result.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Huffman Optimal Prefix Code control-flow scope clear.

##### JAVA reference

```java
// Huffman PriorityQueue Tree
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
import heapq
def huffman_tree(freqs):
    heap = [[wt, [sym, ""]] for sym, wt in freqs.items()]
    heapq.heapify(heap)
    # Merge two lowest frequencies repeatedly
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace source line 4 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 5:** Read this source comment as intent; verify the executable statements implement the stated intent.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Prefix Code | Code system where no codeword is a prefix of another, enabling instant greedy parsing. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Huffman Optimal Prefix Code without reading the code.

**Practice task:** Build one small input for Huffman Optimal Prefix Code, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Huffman Optimal Prefix Code short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Vertex Cover 2-Approximation

**Catalog identifier:** `vertex_cover_approx`  
**Course category:** Complexity Theory  
**Catalog position:** 28 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Greedy Maximal Matching |
| Best-case time | O(V + E) |
| Average-case time | O(V + E) |
| Worst-case time | O(V + E) |
| Auxiliary space | O(V) |
| Stable | N/A |
| In place | No |
| Default input | `[5,6]` |
| Input requirement | Graph vertices and edges |

#### Concept and teaching notes

**Short description.** Polynomial-time approximation algorithm guaranteeing cover size <= 2 × OPT for NP-Hard problem.
**Definition.** Polynomial-time approximation algorithm guaranteeing cover size <= 2 × OPT for NP-Hard problem.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Vertex Cover 2-Approximation.
**When to use it.** Use this lesson to study Vertex Cover 2-Approximation and compare its assumptions and bounds with related entries.
**Common mistake.** Thinking all NP-Hard problems have no practical algorithms. Approximation algorithms provide provable bounds.
**Exam note.** Proof of 2-approximation: Picked edges form a matching M. No two edges in M share a vertex, so OPT >= |M|. We pick 2|M| vertices, so |C| = 2|M| <= 2·OPT.

#### Trace study questions

1. **Vertex Cover 2-Approximation:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Vertex Cover 2-Approximation:** What output or terminal status should a correct execution produce?
3. **Vertex Cover 2-Approximation:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Vertex Cover 2-Approximation:** What is the smallest meaningful state transition in this implementation?
5. **Vertex Cover 2-Approximation:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Vertex Cover 2-Approximation:** What condition allows execution to proceed to the next candidate?
7. **Vertex Cover 2-Approximation:** What condition makes the algorithm stop?
8. **Vertex Cover 2-Approximation:** Which values should be written in a dry-run table before the first update?
9. **Vertex Cover 2-Approximation:** Which values should be written after one complete loop iteration or recursive call?
10. **Vertex Cover 2-Approximation:** Which invariant or correctness property can be checked after this frame?
11. **Vertex Cover 2-Approximation:** Which assumption is required for the selected algorithm to be correct?
12. **Vertex Cover 2-Approximation:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Vertex Cover 2-Approximation:** What input follows the best-case behavior listed in the source catalog?
14. **Vertex Cover 2-Approximation:** What input shape can trigger the listed worst-case behavior?
15. **Vertex Cover 2-Approximation:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Vertex Cover 2-Approximation:** What should happen for an empty or minimal input if the UI permits it?
17. **Vertex Cover 2-Approximation:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Vertex Cover 2-Approximation:** What auxiliary storage is allocated and when can it be released?
19. **Vertex Cover 2-Approximation:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Vertex Cover 2-Approximation:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Vertex Cover 2-Approximation:** What result would demonstrate that this trace has finished correctly?
22. **Vertex Cover 2-Approximation:** Which independent test assertion could catch a bug in this transition?
23. **Vertex Cover 2-Approximation:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Vertex Cover 2-Approximation:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(V + E), average time O(V + E), worst time O(V + E), and auxiliary space O(V).
1. **Vertex Cover 2-Approximation:** Name the input-size variable used in the published time bound.
2. **Vertex Cover 2-Approximation:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Vertex Cover 2-Approximation:** Identify the operation performed once per outer iteration.
4. **Vertex Cover 2-Approximation:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Vertex Cover 2-Approximation:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Vertex Cover 2-Approximation:** Explain how the input structure changes the amount of work.
7. **Vertex Cover 2-Approximation:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Vertex Cover 2-Approximation:** Separate comparisons from writes or swaps where appropriate.
9. **Vertex Cover 2-Approximation:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Vertex Cover 2-Approximation:** Explain why the average-case entry may differ from both best and worst case.
11. **Vertex Cover 2-Approximation:** Describe what auxiliary space counts for this algorithm.
12. **Vertex Cover 2-Approximation:** Check whether recursion stack space is included in the documented space bound.
13. **Vertex Cover 2-Approximation:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Vertex Cover 2-Approximation:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Vertex Cover 2-Approximation:** Explain which code operation dominates as the input grows.
16. **Vertex Cover 2-Approximation:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function approxVertexCover(G):
  C = empty set
  E_copy = copy of edges in G
  while E_copy is not empty:
    pick arbitrary edge (u, v) in E_copy
    C.add(u)
    C.add(v)
    remove all edges incident to u or v from E_copy
  return C
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Vertex Cover 2-Approximation; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace this repetition in Vertex Cover 2-Approximation: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Track the collection mutation made by Vertex Cover 2-Approximation; compare the collection immediately before and after this statement.
- **PSEUDO line 7:** Track the collection mutation made by Vertex Cover 2-Approximation; compare the collection immediately before and after this statement.
- **PSEUDO line 8:** Trace source line 8 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 9:** Record the result or trace state returned by Vertex Cover 2-Approximation; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
vector<int> approxVertexCover(int V, const vector<pair<int,int>>& edges) {
    vector<bool> visited(V, false);
    vector<int> cover;
    for (auto& [u, v] : edges) {
        if (!visited[u] && !visited[v]) {
            visited[u] = true;
            visited[v] = true;
            cover.push_back(u);
            cover.push_back(v);
        }
    }
    return cover;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Name the state represented by this Vertex Cover 2-Approximation variable and record its value before its first update.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace this repetition in Vertex Cover 2-Approximation: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Evaluate this branch for the current Vertex Cover 2-Approximation state; note which alternative runs and which states are excluded.
- **CPP line 6:** Check the index and boundary for this Vertex Cover 2-Approximation access; state which input or auxiliary cell is read or updated.
- **CPP line 7:** Check the index and boundary for this Vertex Cover 2-Approximation access; state which input or auxiliary cell is read or updated.
- **CPP line 8:** Trace source line 8 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 9:** Trace source line 9 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Vertex Cover 2-Approximation control-flow scope clear.
- **CPP line 11:** Match this closing delimiter with its opening block to keep the Vertex Cover 2-Approximation control-flow scope clear.
- **CPP line 12:** Record the result or trace state returned by Vertex Cover 2-Approximation; check that every required exit path reaches a valid result.
- **CPP line 13:** Match this closing delimiter with its opening block to keep the Vertex Cover 2-Approximation control-flow scope clear.

##### JAVA reference

```java
// 2-Approximation for Vertex Cover
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def approx_vertex_cover(edges):
    cover = set()
    for u, v in edges:
        if u not in cover and v not in cover:
            cover.add(u)
            cover.add(v)
    return cover
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Track the collection mutation made by Vertex Cover 2-Approximation; compare the collection immediately before and after this statement.
- **PYTHON line 3:** Trace this repetition in Vertex Cover 2-Approximation: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 4:** Evaluate this branch for the current Vertex Cover 2-Approximation state; note which alternative runs and which states are excluded.
- **PYTHON line 5:** Track the collection mutation made by Vertex Cover 2-Approximation; compare the collection immediately before and after this statement.
- **PYTHON line 6:** Track the collection mutation made by Vertex Cover 2-Approximation; compare the collection immediately before and after this statement.
- **PYTHON line 7:** Record the result or trace state returned by Vertex Cover 2-Approximation; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Approximation Ratio (ρ) | Cost(Approximation) / Cost(OPT) <= ρ (here ρ = 2). |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Vertex Cover 2-Approximation without reading the code.

**Practice task:** Build one small input for Vertex Cover 2-Approximation, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Vertex Cover 2-Approximation short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Traveling Salesperson Problem (TSP)

**Catalog identifier:** `tsp_held_karp`  
**Course category:** Complexity Theory  
**Catalog position:** 29 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | NP-Hard Dynamic Programming / 2-Opt |
| Best-case time | O(n² · 2ⁿ) |
| Average-case time | O(n² · 2ⁿ) |
| Worst-case time | O(n² · 2ⁿ) |
| Auxiliary space | O(n · 2ⁿ) |
| Stable | N/A |
| In place | No |
| Default input | `[4]` |
| Input requirement | Distance matrix for cities |

#### Concept and teaching notes

**Short description.** Finds optimal minimum Hamiltonian cycle. Solved via Held-Karp dynamic programming in O(n² · 2ⁿ).
**Definition.** Finds optimal minimum Hamiltonian cycle. Solved via Held-Karp dynamic programming in O(n² · 2ⁿ).
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Traveling Salesperson Problem (TSP).
**When to use it.** Use this lesson to study Traveling Salesperson Problem (TSP) and compare its assumptions and bounds with related entries.
**Common mistake.** Attempting brute force O(n!) for n > 15. Held-Karp reduces n=20 from 2.4×10¹⁸ operations to 4×10⁸ operations.
**Exam note.** Metric TSP with Triangle Inequality admits a 2-approximation using MST preorder traversal.

#### Trace study questions

1. **Traveling Salesperson Problem (TSP):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Traveling Salesperson Problem (TSP):** What output or terminal status should a correct execution produce?
3. **Traveling Salesperson Problem (TSP):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Traveling Salesperson Problem (TSP):** What is the smallest meaningful state transition in this implementation?
5. **Traveling Salesperson Problem (TSP):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Traveling Salesperson Problem (TSP):** What condition allows execution to proceed to the next candidate?
7. **Traveling Salesperson Problem (TSP):** What condition makes the algorithm stop?
8. **Traveling Salesperson Problem (TSP):** Which values should be written in a dry-run table before the first update?
9. **Traveling Salesperson Problem (TSP):** Which values should be written after one complete loop iteration or recursive call?
10. **Traveling Salesperson Problem (TSP):** Which invariant or correctness property can be checked after this frame?
11. **Traveling Salesperson Problem (TSP):** Which assumption is required for the selected algorithm to be correct?
12. **Traveling Salesperson Problem (TSP):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Traveling Salesperson Problem (TSP):** What input follows the best-case behavior listed in the source catalog?
14. **Traveling Salesperson Problem (TSP):** What input shape can trigger the listed worst-case behavior?
15. **Traveling Salesperson Problem (TSP):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Traveling Salesperson Problem (TSP):** What should happen for an empty or minimal input if the UI permits it?
17. **Traveling Salesperson Problem (TSP):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Traveling Salesperson Problem (TSP):** What auxiliary storage is allocated and when can it be released?
19. **Traveling Salesperson Problem (TSP):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Traveling Salesperson Problem (TSP):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Traveling Salesperson Problem (TSP):** What result would demonstrate that this trace has finished correctly?
22. **Traveling Salesperson Problem (TSP):** Which independent test assertion could catch a bug in this transition?
23. **Traveling Salesperson Problem (TSP):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Traveling Salesperson Problem (TSP):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n² · 2ⁿ), average time O(n² · 2ⁿ), worst time O(n² · 2ⁿ), and auxiliary space O(n · 2ⁿ).
1. **Traveling Salesperson Problem (TSP):** Name the input-size variable used in the published time bound.
2. **Traveling Salesperson Problem (TSP):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Traveling Salesperson Problem (TSP):** Identify the operation performed once per outer iteration.
4. **Traveling Salesperson Problem (TSP):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Traveling Salesperson Problem (TSP):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Traveling Salesperson Problem (TSP):** Explain how the input structure changes the amount of work.
7. **Traveling Salesperson Problem (TSP):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Traveling Salesperson Problem (TSP):** Separate comparisons from writes or swaps where appropriate.
9. **Traveling Salesperson Problem (TSP):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Traveling Salesperson Problem (TSP):** Explain why the average-case entry may differ from both best and worst case.
11. **Traveling Salesperson Problem (TSP):** Describe what auxiliary space counts for this algorithm.
12. **Traveling Salesperson Problem (TSP):** Check whether recursion stack space is included in the documented space bound.
13. **Traveling Salesperson Problem (TSP):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Traveling Salesperson Problem (TSP):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Traveling Salesperson Problem (TSP):** Explain which code operation dominates as the input grows.
16. **Traveling Salesperson Problem (TSP):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function heldKarp(dist, n):
  dp[mask][u] = min cost to visit subset 'mask' ending at 'u'
  for mask from 1 to 2^n - 1:
    for u in mask:
      for v not in mask:
        dp[mask | (1 << v)][v] = min(dp[mask][u] + dist[u][v])
  return min over u of (dp[(1<<n)-1][u] + dist[u][0])
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Traveling Salesperson Problem (TSP); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Check the index and boundary for this Traveling Salesperson Problem (TSP) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 3:** Trace this repetition in Traveling Salesperson Problem (TSP): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Trace this repetition in Traveling Salesperson Problem (TSP): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Trace this repetition in Traveling Salesperson Problem (TSP): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Check the index and boundary for this Traveling Salesperson Problem (TSP) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 7:** Record the result or trace state returned by Traveling Salesperson Problem (TSP); check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int tsp(int mask, int pos, int n, const vector<vector<int>>& dist, vector<vector<int>>& dp) {
    if (mask == (1 << n) - 1) return dist[pos][0];
    if (dp[mask][pos] != -1) return dp[mask][pos];
    int ans = 1e9;
    for (int nxt = 0; nxt < n; nxt++) {
        if ((mask & (1 << nxt)) == 0)
            ans = min(ans, dist[pos][nxt] + tsp(mask | (1 << nxt), nxt, n, dist, dp));
    }
    return dp[mask][pos] = ans;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Name the state represented by this Traveling Salesperson Problem (TSP) variable and record its value before its first update.
- **CPP line 2:** Evaluate this branch for the current Traveling Salesperson Problem (TSP) state; note which alternative runs and which states are excluded.
- **CPP line 3:** Evaluate this branch for the current Traveling Salesperson Problem (TSP) state; note which alternative runs and which states are excluded.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace this repetition in Traveling Salesperson Problem (TSP): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Evaluate this branch for the current Traveling Salesperson Problem (TSP) state; note which alternative runs and which states are excluded.
- **CPP line 7:** Check the index and boundary for this Traveling Salesperson Problem (TSP) access; state which input or auxiliary cell is read or updated.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Traveling Salesperson Problem (TSP) control-flow scope clear.
- **CPP line 9:** Record the result or trace state returned by Traveling Salesperson Problem (TSP); check that every required exit path reaches a valid result.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Traveling Salesperson Problem (TSP) control-flow scope clear.

##### JAVA reference

```java
// Held-Karp O(n^2 2^n) TSP
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def tsp(mask, u, n, dist, memo):
    if mask == (1 << n) - 1: return dist[u][0]
    # Bitmask DP memoization
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Evaluate this branch for the current Traveling Salesperson Problem (TSP) state; note which alternative runs and which states are excluded.
- **PYTHON line 3:** Read this source comment as intent; verify the executable statements implement the stated intent.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Hamiltonian Cycle | A closed loop that visits each vertex of a graph exactly once. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Traveling Salesperson Problem (TSP) without reading the code.

**Practice task:** Build one small input for Traveling Salesperson Problem (TSP), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Traveling Salesperson Problem (TSP) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### QuickSelect (Hoare's Selection)

**Catalog identifier:** `quick_select`  
**Course category:** DAA Extensions  
**Catalog position:** 30 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Prune and Search (Decrease & Conquer) |
| Best-case time | O(n) |
| Average-case time | O(n) |
| Worst-case time | O(n²) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[65,35,45,90,55,75]` |
| Input requirement | Unsorted array of integers and target rank k |

#### Concept and teaching notes

**Short description.** Finds the k-th smallest element in an unordered list in O(n) average time without full sorting.
**Definition.** Finds the k-th smallest element in an unordered list in O(n) average time without full sorting.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for QuickSelect (Hoare's Selection).
**When to use it.** Use this lesson to study QuickSelect (Hoare's Selection) and compare its assumptions and bounds with related entries.
**Common mistake.** Sorting the array in O(n log n) when only the k-th order statistic is needed.
**Exam note.** Recurrence: T(n) = T(n/2) + O(n). Solves to T(n) = O(n) because n + n/2 + n/4 + ... <= 2n.

#### Trace study questions

1. **QuickSelect (Hoare's Selection):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **QuickSelect (Hoare's Selection):** What output or terminal status should a correct execution produce?
3. **QuickSelect (Hoare's Selection):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **QuickSelect (Hoare's Selection):** What is the smallest meaningful state transition in this implementation?
5. **QuickSelect (Hoare's Selection):** Which variable, index, pointer, node, or table cell controls that transition?
6. **QuickSelect (Hoare's Selection):** What condition allows execution to proceed to the next candidate?
7. **QuickSelect (Hoare's Selection):** What condition makes the algorithm stop?
8. **QuickSelect (Hoare's Selection):** Which values should be written in a dry-run table before the first update?
9. **QuickSelect (Hoare's Selection):** Which values should be written after one complete loop iteration or recursive call?
10. **QuickSelect (Hoare's Selection):** Which invariant or correctness property can be checked after this frame?
11. **QuickSelect (Hoare's Selection):** Which assumption is required for the selected algorithm to be correct?
12. **QuickSelect (Hoare's Selection):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **QuickSelect (Hoare's Selection):** What input follows the best-case behavior listed in the source catalog?
14. **QuickSelect (Hoare's Selection):** What input shape can trigger the listed worst-case behavior?
15. **QuickSelect (Hoare's Selection):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **QuickSelect (Hoare's Selection):** What should happen for an empty or minimal input if the UI permits it?
17. **QuickSelect (Hoare's Selection):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **QuickSelect (Hoare's Selection):** What auxiliary storage is allocated and when can it be released?
19. **QuickSelect (Hoare's Selection):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **QuickSelect (Hoare's Selection):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **QuickSelect (Hoare's Selection):** What result would demonstrate that this trace has finished correctly?
22. **QuickSelect (Hoare's Selection):** Which independent test assertion could catch a bug in this transition?
23. **QuickSelect (Hoare's Selection):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **QuickSelect (Hoare's Selection):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n), average time O(n), worst time O(n²), and auxiliary space O(1).
1. **QuickSelect (Hoare's Selection):** Name the input-size variable used in the published time bound.
2. **QuickSelect (Hoare's Selection):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **QuickSelect (Hoare's Selection):** Identify the operation performed once per outer iteration.
4. **QuickSelect (Hoare's Selection):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **QuickSelect (Hoare's Selection):** Write a rough operation count for the smallest meaningful demonstration input.
6. **QuickSelect (Hoare's Selection):** Explain how the input structure changes the amount of work.
7. **QuickSelect (Hoare's Selection):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **QuickSelect (Hoare's Selection):** Separate comparisons from writes or swaps where appropriate.
9. **QuickSelect (Hoare's Selection):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **QuickSelect (Hoare's Selection):** Explain why the average-case entry may differ from both best and worst case.
11. **QuickSelect (Hoare's Selection):** Describe what auxiliary space counts for this algorithm.
12. **QuickSelect (Hoare's Selection):** Check whether recursion stack space is included in the documented space bound.
13. **QuickSelect (Hoare's Selection):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **QuickSelect (Hoare's Selection):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **QuickSelect (Hoare's Selection):** Explain which code operation dominates as the input grows.
16. **QuickSelect (Hoare's Selection):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function quickSelect(A, low, high, k):
  p = partition(A, low, high)
  if p == k: return A[p]
  else if p > k: return quickSelect(A, low, p - 1, k)
  else: return quickSelect(A, p + 1, high, k)
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for QuickSelect (Hoare's Selection); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.
- **PSEUDO line 4:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.
- **PSEUDO line 5:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.

##### CPP reference

```cpp
int quickSelect(vector<int>& arr, int l, int r, int k) {
    int p = partition(arr, l, r);
    if (p == k) return arr[p];
    if (p > k) return quickSelect(arr, l, p - 1, k);
    return quickSelect(arr, p + 1, r, k);
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.
- **CPP line 4:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.
- **CPP line 5:** Record the result or trace state returned by QuickSelect (Hoare's Selection); check that every required exit path reaches a valid result.
- **CPP line 6:** Match this closing delimiter with its opening block to keep the QuickSelect (Hoare's Selection) control-flow scope clear.

##### JAVA reference

```java
public static int quickSelect(int[] arr, int l, int r, int k) {
    int p = partition(arr, l, r);
    if (p == k) return arr[p];
    return p > k ? quickSelect(arr, l, p - 1, k) : quickSelect(arr, p + 1, r, k);
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.
- **JAVA line 4:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.
- **JAVA line 5:** Match this closing delimiter with its opening block to keep the QuickSelect (Hoare's Selection) control-flow scope clear.

##### PYTHON reference

```python
def quick_select(arr, l, r, k):
    p = partition(arr, l, r)
    if p == k: return arr[p]
    elif p > k: return quick_select(arr, l, p - 1, k)
    else: return quick_select(arr, p + 1, r, k)
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.
- **PYTHON line 4:** Translate this QuickSelect (Hoare's Selection) comparison into a true/false condition for the active values, including equality and boundary cases.
- **PYTHON line 5:** Evaluate this branch for the current QuickSelect (Hoare's Selection) state; note which alternative runs and which states are excluded.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Order Statistic | The k-th smallest element in a statistical dataset. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for QuickSelect (Hoare's Selection) without reading the code.

**Practice task:** Build one small input for QuickSelect (Hoare's Selection), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the QuickSelect (Hoare's Selection) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Dynamic Array Doubling (Amortized O(1))

**Catalog identifier:** `dynamic_array_amortized`  
**Course category:** DAA Extensions  
**Catalog position:** 31 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Amortized Analysis (Potential / Banker Method) |
| Best-case time | O(1) |
| Average-case time | O(1) |
| Worst-case time | O(n) |
| Auxiliary space | O(n) |
| Stable | N/A |
| In place | No |
| Default input | `[10,20,30,40,50,60,70,80,90]` |
| Input requirement | Sequence of insert elements |

#### Concept and teaching notes

**Short description.** Demonstrates amortized analysis via aggregate and potential methods for geometric array resizing.
**Definition.** Demonstrates amortized analysis via aggregate and potential methods for geometric array resizing.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Dynamic Array Doubling (Amortized O(1)).
**When to use it.** Use this lesson to study Dynamic Array Doubling (Amortized O(1)) and compare its assumptions and bounds with related entries.
**Common mistake.** Assuming single-operation worst case O(n) means the average cost per insert is O(n).
**Exam note.** Amortized Cost: Total cost of n operations divided by n is strictly O(1) when capacity doubles.

#### Trace study questions

1. **Dynamic Array Doubling (Amortized O(1)):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Dynamic Array Doubling (Amortized O(1)):** What output or terminal status should a correct execution produce?
3. **Dynamic Array Doubling (Amortized O(1)):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Dynamic Array Doubling (Amortized O(1)):** What is the smallest meaningful state transition in this implementation?
5. **Dynamic Array Doubling (Amortized O(1)):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Dynamic Array Doubling (Amortized O(1)):** What condition allows execution to proceed to the next candidate?
7. **Dynamic Array Doubling (Amortized O(1)):** What condition makes the algorithm stop?
8. **Dynamic Array Doubling (Amortized O(1)):** Which values should be written in a dry-run table before the first update?
9. **Dynamic Array Doubling (Amortized O(1)):** Which values should be written after one complete loop iteration or recursive call?
10. **Dynamic Array Doubling (Amortized O(1)):** Which invariant or correctness property can be checked after this frame?
11. **Dynamic Array Doubling (Amortized O(1)):** Which assumption is required for the selected algorithm to be correct?
12. **Dynamic Array Doubling (Amortized O(1)):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Dynamic Array Doubling (Amortized O(1)):** What input follows the best-case behavior listed in the source catalog?
14. **Dynamic Array Doubling (Amortized O(1)):** What input shape can trigger the listed worst-case behavior?
15. **Dynamic Array Doubling (Amortized O(1)):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Dynamic Array Doubling (Amortized O(1)):** What should happen for an empty or minimal input if the UI permits it?
17. **Dynamic Array Doubling (Amortized O(1)):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Dynamic Array Doubling (Amortized O(1)):** What auxiliary storage is allocated and when can it be released?
19. **Dynamic Array Doubling (Amortized O(1)):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Dynamic Array Doubling (Amortized O(1)):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Dynamic Array Doubling (Amortized O(1)):** What result would demonstrate that this trace has finished correctly?
22. **Dynamic Array Doubling (Amortized O(1)):** Which independent test assertion could catch a bug in this transition?
23. **Dynamic Array Doubling (Amortized O(1)):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Dynamic Array Doubling (Amortized O(1)):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(1), average time O(1), worst time O(n), and auxiliary space O(n).
1. **Dynamic Array Doubling (Amortized O(1)):** Name the input-size variable used in the published time bound.
2. **Dynamic Array Doubling (Amortized O(1)):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Dynamic Array Doubling (Amortized O(1)):** Identify the operation performed once per outer iteration.
4. **Dynamic Array Doubling (Amortized O(1)):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Dynamic Array Doubling (Amortized O(1)):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Dynamic Array Doubling (Amortized O(1)):** Explain how the input structure changes the amount of work.
7. **Dynamic Array Doubling (Amortized O(1)):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Dynamic Array Doubling (Amortized O(1)):** Separate comparisons from writes or swaps where appropriate.
9. **Dynamic Array Doubling (Amortized O(1)):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Dynamic Array Doubling (Amortized O(1)):** Explain why the average-case entry may differ from both best and worst case.
11. **Dynamic Array Doubling (Amortized O(1)):** Describe what auxiliary space counts for this algorithm.
12. **Dynamic Array Doubling (Amortized O(1)):** Check whether recursion stack space is included in the documented space bound.
13. **Dynamic Array Doubling (Amortized O(1)):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Dynamic Array Doubling (Amortized O(1)):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Dynamic Array Doubling (Amortized O(1)):** Explain which code operation dominates as the input grows.
16. **Dynamic Array Doubling (Amortized O(1)):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function push_back(val):
  if size == capacity:
    allocate new array of 2 * capacity
    copy old elements
    capacity = 2 * capacity
  arr[size] = val
  size++
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Dynamic Array Doubling (Amortized O(1)); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Evaluate this branch for the current Dynamic Array Doubling (Amortized O(1)) state; note which alternative runs and which states are excluded.
- **PSEUDO line 3:** Identify the storage created for Dynamic Array Doubling (Amortized O(1)); state its size, lifetime, and contribution to auxiliary-space complexity.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Check the index and boundary for this Dynamic Array Doubling (Amortized O(1)) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.

##### CPP reference

```cpp
void pushBack(int val) {
    if (size == capacity) {
        capacity *= 2;
        int* newArr = new int[capacity];
        for (int i = 0; i < size; i++) newArr[i] = arr[i];
        delete[] arr;
        arr = newArr;
    }
    arr[size++] = val;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Evaluate this branch for the current Dynamic Array Doubling (Amortized O(1)) state; note which alternative runs and which states are excluded.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Check the index and boundary for this Dynamic Array Doubling (Amortized O(1)) access; state which input or auxiliary cell is read or updated.
- **CPP line 5:** Trace this repetition in Dynamic Array Doubling (Amortized O(1)): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Trace source line 6 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 7:** Identify the storage created for Dynamic Array Doubling (Amortized O(1)); state its size, lifetime, and contribution to auxiliary-space complexity.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Dynamic Array Doubling (Amortized O(1)) control-flow scope clear.
- **CPP line 9:** Check the index and boundary for this Dynamic Array Doubling (Amortized O(1)) access; state which input or auxiliary cell is read or updated.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Dynamic Array Doubling (Amortized O(1)) control-flow scope clear.

##### JAVA reference

```java
// ArrayList dynamic resize amortized demonstration
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def append_amortized(val):
    # Potential function Phi = 2 * size - capacity
    pass
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Amortized Time | Average running time per operation over a worst-case sequence of operations. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Dynamic Array Doubling (Amortized O(1)) without reading the code.

**Practice task:** Build one small input for Dynamic Array Doubling (Amortized O(1)), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Dynamic Array Doubling (Amortized O(1)) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Knuth-Morris-Pratt (KMP) Search

**Catalog identifier:** `kmp_string_match`  
**Course category:** Strings  
**Catalog position:** 32 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Prefix Automaton Preprocessing |
| Best-case time | O(n) |
| Average-case time | O(n + m) |
| Worst-case time | O(n + m) |
| Auxiliary space | O(m) |
| Stable | N/A |
| In place | Yes |
| Default input | `[1,2,3,4]` |
| Input requirement | Target text and search pattern |

#### Concept and teaching notes

**Short description.** Linear time string matching O(n + m) utilizing precomputed longest prefix-suffix (π-table).
**Definition.** Linear time string matching O(n + m) utilizing precomputed longest prefix-suffix (π-table).
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Knuth-Morris-Pratt (KMP) Search.
**When to use it.** Use this lesson to study Knuth-Morris-Pratt (KMP) Search and compare its assumptions and bounds with related entries.
**Common mistake.** Backtracking the text pointer upon a mismatch. In KMP, the text pointer i NEVER moves backward!
**Exam note.** KMP achieves deterministic linear time because the text index i is monotonically non-decreasing.

#### Trace study questions

1. **Knuth-Morris-Pratt (KMP) Search:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Knuth-Morris-Pratt (KMP) Search:** What output or terminal status should a correct execution produce?
3. **Knuth-Morris-Pratt (KMP) Search:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Knuth-Morris-Pratt (KMP) Search:** What is the smallest meaningful state transition in this implementation?
5. **Knuth-Morris-Pratt (KMP) Search:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Knuth-Morris-Pratt (KMP) Search:** What condition allows execution to proceed to the next candidate?
7. **Knuth-Morris-Pratt (KMP) Search:** What condition makes the algorithm stop?
8. **Knuth-Morris-Pratt (KMP) Search:** Which values should be written in a dry-run table before the first update?
9. **Knuth-Morris-Pratt (KMP) Search:** Which values should be written after one complete loop iteration or recursive call?
10. **Knuth-Morris-Pratt (KMP) Search:** Which invariant or correctness property can be checked after this frame?
11. **Knuth-Morris-Pratt (KMP) Search:** Which assumption is required for the selected algorithm to be correct?
12. **Knuth-Morris-Pratt (KMP) Search:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Knuth-Morris-Pratt (KMP) Search:** What input follows the best-case behavior listed in the source catalog?
14. **Knuth-Morris-Pratt (KMP) Search:** What input shape can trigger the listed worst-case behavior?
15. **Knuth-Morris-Pratt (KMP) Search:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Knuth-Morris-Pratt (KMP) Search:** What should happen for an empty or minimal input if the UI permits it?
17. **Knuth-Morris-Pratt (KMP) Search:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Knuth-Morris-Pratt (KMP) Search:** What auxiliary storage is allocated and when can it be released?
19. **Knuth-Morris-Pratt (KMP) Search:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Knuth-Morris-Pratt (KMP) Search:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Knuth-Morris-Pratt (KMP) Search:** What result would demonstrate that this trace has finished correctly?
22. **Knuth-Morris-Pratt (KMP) Search:** Which independent test assertion could catch a bug in this transition?
23. **Knuth-Morris-Pratt (KMP) Search:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Knuth-Morris-Pratt (KMP) Search:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n), average time O(n + m), worst time O(n + m), and auxiliary space O(m).
1. **Knuth-Morris-Pratt (KMP) Search:** Name the input-size variable used in the published time bound.
2. **Knuth-Morris-Pratt (KMP) Search:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Knuth-Morris-Pratt (KMP) Search:** Identify the operation performed once per outer iteration.
4. **Knuth-Morris-Pratt (KMP) Search:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Knuth-Morris-Pratt (KMP) Search:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Knuth-Morris-Pratt (KMP) Search:** Explain how the input structure changes the amount of work.
7. **Knuth-Morris-Pratt (KMP) Search:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Knuth-Morris-Pratt (KMP) Search:** Separate comparisons from writes or swaps where appropriate.
9. **Knuth-Morris-Pratt (KMP) Search:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Knuth-Morris-Pratt (KMP) Search:** Explain why the average-case entry may differ from both best and worst case.
11. **Knuth-Morris-Pratt (KMP) Search:** Describe what auxiliary space counts for this algorithm.
12. **Knuth-Morris-Pratt (KMP) Search:** Check whether recursion stack space is included in the documented space bound.
13. **Knuth-Morris-Pratt (KMP) Search:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Knuth-Morris-Pratt (KMP) Search:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Knuth-Morris-Pratt (KMP) Search:** Explain which code operation dominates as the input grows.
16. **Knuth-Morris-Pratt (KMP) Search:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function KMP(text, pattern):
  lps = computeLPS(pattern)
  i = 0, j = 0
  while i < len(text):
    if text[i] == pattern[j]: i++, j++
    if j == len(pattern):
      recordMatch(i - j)
      j = lps[j - 1]
    else if i < len(text) and text[i] != pattern[j]:
      if j != 0: j = lps[j - 1]
      else: i++
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Knuth-Morris-Pratt (KMP) Search; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Trace this repetition in Knuth-Morris-Pratt (KMP) Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 6:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Check the index and boundary for this Knuth-Morris-Pratt (KMP) Search access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 9:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 10:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 11:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.

##### CPP reference

```cpp
void KMPSearch(string pat, string txt) {
    int m = pat.size(), n = txt.size();
    vector<int> lps(m, 0);
    computeLPS(pat, m, lps);
    int i = 0, j = 0;
    while (i < n) {
        if (pat[j] == txt[i]) { i++; j++; }
        if (j == m) { cout << "Found at " << i - j << endl; j = lps[j - 1]; }
        else if (i < n && pat[j] != txt[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace source line 5 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 6:** Trace this repetition in Knuth-Morris-Pratt (KMP) Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 7:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **CPP line 8:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **CPP line 9:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **CPP line 10:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **CPP line 11:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Knuth-Morris-Pratt (KMP) Search control-flow scope clear.
- **CPP line 13:** Match this closing delimiter with its opening block to keep the Knuth-Morris-Pratt (KMP) Search control-flow scope clear.
- **CPP line 14:** Match this closing delimiter with its opening block to keep the Knuth-Morris-Pratt (KMP) Search control-flow scope clear.

##### JAVA reference

```java
// KMP pattern search
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def kmp_search(text, pattern):
    lps = compute_lps(pattern)
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]: i += 1; j += 1
        if j == len(pattern): return i - j
        elif i < len(text) and text[i] != pattern[j]:
            j = lps[j - 1] if j != 0 else 0
            if j == 0: i += 1
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 4:** Trace this repetition in Knuth-Morris-Pratt (KMP) Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 5:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **PYTHON line 6:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.
- **PYTHON line 7:** Check the index and boundary for this Knuth-Morris-Pratt (KMP) Search access; state which input or auxiliary cell is read or updated.
- **PYTHON line 8:** Check the index and boundary for this Knuth-Morris-Pratt (KMP) Search access; state which input or auxiliary cell is read or updated.
- **PYTHON line 9:** Evaluate this branch for the current Knuth-Morris-Pratt (KMP) Search state; note which alternative runs and which states are excluded.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| LPS Array (π-table) | Precomputed array storing the length of the longest proper prefix that is also a suffix. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Knuth-Morris-Pratt (KMP) Search without reading the code.

**Practice task:** Build one small input for Knuth-Morris-Pratt (KMP) Search, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Knuth-Morris-Pratt (KMP) Search short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Rabin-Karp Rolling Hash Search

**Catalog identifier:** `rabin_karp`  
**Course category:** Strings  
**Catalog position:** 33 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Rolling Hash / Modular Arithmetic |
| Best-case time | O(n + m) |
| Average-case time | O(n + m) |
| Worst-case time | O(n · m) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[1,2,3,4]` |
| Input requirement | Target text and search pattern |

#### Concept and teaching notes

**Short description.** String search using rolling polynomial hash to achieve O(n + m) expected running time.
**Definition.** String search using rolling polynomial hash to achieve O(n + m) expected running time.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Rabin-Karp Rolling Hash Search.
**When to use it.** Use this lesson to study Rabin-Karp Rolling Hash Search and compare its assumptions and bounds with related entries.
**Common mistake.** Recomputing hash of each window from scratch in O(m). Rolling hash updates in O(1) arithmetic operations!
**Exam note.** Spurious Hits: When hash values match due to modulo collision, verify characters character-by-character.

#### Trace study questions

1. **Rabin-Karp Rolling Hash Search:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Rabin-Karp Rolling Hash Search:** What output or terminal status should a correct execution produce?
3. **Rabin-Karp Rolling Hash Search:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Rabin-Karp Rolling Hash Search:** What is the smallest meaningful state transition in this implementation?
5. **Rabin-Karp Rolling Hash Search:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Rabin-Karp Rolling Hash Search:** What condition allows execution to proceed to the next candidate?
7. **Rabin-Karp Rolling Hash Search:** What condition makes the algorithm stop?
8. **Rabin-Karp Rolling Hash Search:** Which values should be written in a dry-run table before the first update?
9. **Rabin-Karp Rolling Hash Search:** Which values should be written after one complete loop iteration or recursive call?
10. **Rabin-Karp Rolling Hash Search:** Which invariant or correctness property can be checked after this frame?
11. **Rabin-Karp Rolling Hash Search:** Which assumption is required for the selected algorithm to be correct?
12. **Rabin-Karp Rolling Hash Search:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Rabin-Karp Rolling Hash Search:** What input follows the best-case behavior listed in the source catalog?
14. **Rabin-Karp Rolling Hash Search:** What input shape can trigger the listed worst-case behavior?
15. **Rabin-Karp Rolling Hash Search:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Rabin-Karp Rolling Hash Search:** What should happen for an empty or minimal input if the UI permits it?
17. **Rabin-Karp Rolling Hash Search:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Rabin-Karp Rolling Hash Search:** What auxiliary storage is allocated and when can it be released?
19. **Rabin-Karp Rolling Hash Search:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Rabin-Karp Rolling Hash Search:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Rabin-Karp Rolling Hash Search:** What result would demonstrate that this trace has finished correctly?
22. **Rabin-Karp Rolling Hash Search:** Which independent test assertion could catch a bug in this transition?
23. **Rabin-Karp Rolling Hash Search:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Rabin-Karp Rolling Hash Search:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n + m), average time O(n + m), worst time O(n · m), and auxiliary space O(1).
1. **Rabin-Karp Rolling Hash Search:** Name the input-size variable used in the published time bound.
2. **Rabin-Karp Rolling Hash Search:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Rabin-Karp Rolling Hash Search:** Identify the operation performed once per outer iteration.
4. **Rabin-Karp Rolling Hash Search:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Rabin-Karp Rolling Hash Search:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Rabin-Karp Rolling Hash Search:** Explain how the input structure changes the amount of work.
7. **Rabin-Karp Rolling Hash Search:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Rabin-Karp Rolling Hash Search:** Separate comparisons from writes or swaps where appropriate.
9. **Rabin-Karp Rolling Hash Search:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Rabin-Karp Rolling Hash Search:** Explain why the average-case entry may differ from both best and worst case.
11. **Rabin-Karp Rolling Hash Search:** Describe what auxiliary space counts for this algorithm.
12. **Rabin-Karp Rolling Hash Search:** Check whether recursion stack space is included in the documented space bound.
13. **Rabin-Karp Rolling Hash Search:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Rabin-Karp Rolling Hash Search:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Rabin-Karp Rolling Hash Search:** Explain which code operation dominates as the input grows.
16. **Rabin-Karp Rolling Hash Search:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function rabinKarp(text, pattern, prime):
  pHash = hash(pattern)
  tHash = hash(text[0..m-1])
  for i from 0 to n - m:
    if pHash == tHash and text[i..i+m-1] == pattern:
      return i
    tHash = rollHash(tHash, text[i], text[i+m])
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Rabin-Karp Rolling Hash Search; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Check the index and boundary for this Rabin-Karp Rolling Hash Search access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 4:** Trace this repetition in Rabin-Karp Rolling Hash Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Evaluate this branch for the current Rabin-Karp Rolling Hash Search state; note which alternative runs and which states are excluded.
- **PSEUDO line 6:** Record the result or trace state returned by Rabin-Karp Rolling Hash Search; check that every required exit path reaches a valid result.
- **PSEUDO line 7:** Check the index and boundary for this Rabin-Karp Rolling Hash Search access; state which input or auxiliary cell is read or updated.

##### CPP reference

```cpp
int rabinKarp(string txt, string pat, int q = 101) {
    int d = 256, m = pat.size(), n = txt.size();
    int p = 0, t = 0, h = 1;
    for (int i = 0; i < m - 1; i++) h = (h * d) % q;
    for (int i = 0; i < m; i++) {
        p = (d * p + pat[i]) % q;
        t = (d * t + txt[i]) % q;
    }
    for (int i = 0; i <= n - m; i++) {
        if (p == t && txt.substr(i, m) == pat) return i;
        if (i < n - m) {
            t = (d * (t - txt[i] * h) + txt[i + m]) % q;
            if (t < 0) t += q;
        }
    }
    return -1;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace source line 3 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 4:** Trace this repetition in Rabin-Karp Rolling Hash Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Trace this repetition in Rabin-Karp Rolling Hash Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Check the index and boundary for this Rabin-Karp Rolling Hash Search access; state which input or auxiliary cell is read or updated.
- **CPP line 7:** Check the index and boundary for this Rabin-Karp Rolling Hash Search access; state which input or auxiliary cell is read or updated.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Rabin-Karp Rolling Hash Search control-flow scope clear.
- **CPP line 9:** Trace this repetition in Rabin-Karp Rolling Hash Search: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 10:** Evaluate this branch for the current Rabin-Karp Rolling Hash Search state; note which alternative runs and which states are excluded.
- **CPP line 11:** Evaluate this branch for the current Rabin-Karp Rolling Hash Search state; note which alternative runs and which states are excluded.
- **CPP line 12:** Check the index and boundary for this Rabin-Karp Rolling Hash Search access; state which input or auxiliary cell is read or updated.
- **CPP line 13:** Evaluate this branch for the current Rabin-Karp Rolling Hash Search state; note which alternative runs and which states are excluded.
- **CPP line 14:** Match this closing delimiter with its opening block to keep the Rabin-Karp Rolling Hash Search control-flow scope clear.
- **CPP line 15:** Match this closing delimiter with its opening block to keep the Rabin-Karp Rolling Hash Search control-flow scope clear.
- **CPP line 16:** Record the result or trace state returned by Rabin-Karp Rolling Hash Search; check that every required exit path reaches a valid result.
- **CPP line 17:** Match this closing delimiter with its opening block to keep the Rabin-Karp Rolling Hash Search control-flow scope clear.

##### JAVA reference

```java
// Rabin-Karp rolling hash
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def rabin_karp(text, pattern):
    # Rolling hash implementation
    pass
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Rolling Hash | Hash function enabling update of window hash in O(1) time without re-examining internal characters. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Rabin-Karp Rolling Hash Search without reading the code.

**Practice task:** Build one small input for Rabin-Karp Rolling Hash Search, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Rabin-Karp Rolling Hash Search short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Sieve of Eratosthenes (Primes)

**Catalog identifier:** `sieve_eratosthenes`  
**Course category:** Number Theory  
**Catalog position:** 34 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Multiplicative Elimination |
| Best-case time | O(N log log N) |
| Average-case time | O(N log log N) |
| Worst-case time | O(N log log N) |
| Auxiliary space | O(N) |
| Stable | N/A |
| In place | No |
| Default input | `[20]` |
| Input requirement | Upper limit integer N |

#### Concept and teaching notes

**Short description.** Ancient algorithm generating all prime numbers up to N in near-linear O(N log log N) time.
**Definition.** Ancient algorithm generating all prime numbers up to N in near-linear O(N log log N) time.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Sieve of Eratosthenes (Primes).
**When to use it.** Use this lesson to study Sieve of Eratosthenes (Primes) and compare its assumptions and bounds with related entries.
**Common mistake.** Checking multiples starting at 2p. You can start striking out at p² because smaller multiples are already eliminated.
**Exam note.** Sum of reciprocals of primes: Sum_{p <= n} 1/p = Θ(log log n). Hence total time is O(n log log n).

#### Trace study questions

1. **Sieve of Eratosthenes (Primes):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Sieve of Eratosthenes (Primes):** What output or terminal status should a correct execution produce?
3. **Sieve of Eratosthenes (Primes):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Sieve of Eratosthenes (Primes):** What is the smallest meaningful state transition in this implementation?
5. **Sieve of Eratosthenes (Primes):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Sieve of Eratosthenes (Primes):** What condition allows execution to proceed to the next candidate?
7. **Sieve of Eratosthenes (Primes):** What condition makes the algorithm stop?
8. **Sieve of Eratosthenes (Primes):** Which values should be written in a dry-run table before the first update?
9. **Sieve of Eratosthenes (Primes):** Which values should be written after one complete loop iteration or recursive call?
10. **Sieve of Eratosthenes (Primes):** Which invariant or correctness property can be checked after this frame?
11. **Sieve of Eratosthenes (Primes):** Which assumption is required for the selected algorithm to be correct?
12. **Sieve of Eratosthenes (Primes):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Sieve of Eratosthenes (Primes):** What input follows the best-case behavior listed in the source catalog?
14. **Sieve of Eratosthenes (Primes):** What input shape can trigger the listed worst-case behavior?
15. **Sieve of Eratosthenes (Primes):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Sieve of Eratosthenes (Primes):** What should happen for an empty or minimal input if the UI permits it?
17. **Sieve of Eratosthenes (Primes):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Sieve of Eratosthenes (Primes):** What auxiliary storage is allocated and when can it be released?
19. **Sieve of Eratosthenes (Primes):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Sieve of Eratosthenes (Primes):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Sieve of Eratosthenes (Primes):** What result would demonstrate that this trace has finished correctly?
22. **Sieve of Eratosthenes (Primes):** Which independent test assertion could catch a bug in this transition?
23. **Sieve of Eratosthenes (Primes):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Sieve of Eratosthenes (Primes):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(N log log N), average time O(N log log N), worst time O(N log log N), and auxiliary space O(N).
1. **Sieve of Eratosthenes (Primes):** Name the input-size variable used in the published time bound.
2. **Sieve of Eratosthenes (Primes):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Sieve of Eratosthenes (Primes):** Identify the operation performed once per outer iteration.
4. **Sieve of Eratosthenes (Primes):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Sieve of Eratosthenes (Primes):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Sieve of Eratosthenes (Primes):** Explain how the input structure changes the amount of work.
7. **Sieve of Eratosthenes (Primes):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Sieve of Eratosthenes (Primes):** Separate comparisons from writes or swaps where appropriate.
9. **Sieve of Eratosthenes (Primes):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Sieve of Eratosthenes (Primes):** Explain why the average-case entry may differ from both best and worst case.
11. **Sieve of Eratosthenes (Primes):** Describe what auxiliary space counts for this algorithm.
12. **Sieve of Eratosthenes (Primes):** Check whether recursion stack space is included in the documented space bound.
13. **Sieve of Eratosthenes (Primes):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Sieve of Eratosthenes (Primes):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Sieve of Eratosthenes (Primes):** Explain which code operation dominates as the input grows.
16. **Sieve of Eratosthenes (Primes):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function sieve(n):
  prime = array of size n+1 filled with true
  prime[0] = prime[1] = false
  for p from 2 to sqrt(n):
    if prime[p]:
      for i from p*p to n step p:
        prime[i] = false
  return prime
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Sieve of Eratosthenes (Primes); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Check the index and boundary for this Sieve of Eratosthenes (Primes) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 4:** Trace this repetition in Sieve of Eratosthenes (Primes): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Evaluate this branch for the current Sieve of Eratosthenes (Primes) state; note which alternative runs and which states are excluded.
- **PSEUDO line 6:** Trace this repetition in Sieve of Eratosthenes (Primes): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 7:** Check the index and boundary for this Sieve of Eratosthenes (Primes) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 8:** Record the result or trace state returned by Sieve of Eratosthenes (Primes); check that every required exit path reaches a valid result.

##### CPP reference

```cpp
vector<int> sieve(int n) {
    vector<bool> isPrime(n + 1, true);
    isPrime[0] = isPrime[1] = false;
    for (int p = 2; p * p <= n; p++) {
        if (isPrime[p]) {
            for (int i = p * p; i <= n; i += p) isPrime[i] = false;
        }
    }
    vector<int> primes;
    for (int i = 2; i <= n; i++) if (isPrime[i]) primes.push_back(i);
    return primes;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Check the index and boundary for this Sieve of Eratosthenes (Primes) access; state which input or auxiliary cell is read or updated.
- **CPP line 4:** Trace this repetition in Sieve of Eratosthenes (Primes): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Evaluate this branch for the current Sieve of Eratosthenes (Primes) state; note which alternative runs and which states are excluded.
- **CPP line 6:** Trace this repetition in Sieve of Eratosthenes (Primes): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 7:** Match this closing delimiter with its opening block to keep the Sieve of Eratosthenes (Primes) control-flow scope clear.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Sieve of Eratosthenes (Primes) control-flow scope clear.
- **CPP line 9:** Trace source line 9 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 10:** Trace this repetition in Sieve of Eratosthenes (Primes): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 11:** Record the result or trace state returned by Sieve of Eratosthenes (Primes); check that every required exit path reaches a valid result.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Sieve of Eratosthenes (Primes) control-flow scope clear.

##### JAVA reference

```java
// Sieve of Eratosthenes
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for p in range(2, int(n**0.5) + 1):
        if is_prime[p]:
            for i in range(p*p, n + 1, p): is_prime[i] = False
    return [i for i, p in enumerate(is_prime) if p]
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Check the index and boundary for this Sieve of Eratosthenes (Primes) access; state which input or auxiliary cell is read or updated.
- **PYTHON line 4:** Trace this repetition in Sieve of Eratosthenes (Primes): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 5:** Evaluate this branch for the current Sieve of Eratosthenes (Primes) state; note which alternative runs and which states are excluded.
- **PYTHON line 6:** Trace this repetition in Sieve of Eratosthenes (Primes): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 7:** Record the result or trace state returned by Sieve of Eratosthenes (Primes); check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Prime Sieve | Technique that identifies primes by systematically eliminating composite multiples. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Sieve of Eratosthenes (Primes) without reading the code.

**Practice task:** Build one small input for Sieve of Eratosthenes (Primes), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Sieve of Eratosthenes (Primes) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Number of Connected Islands (Flood Fill)

**Catalog identifier:** `flood_fill_islands`  
**Course category:** Matrix / Grid  
**Catalog position:** 35 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Grid Breadth-First Search / Flood Fill |
| Best-case time | O(M × N) |
| Average-case time | O(M × N) |
| Worst-case time | O(M × N) |
| Auxiliary space | O(min(M, N)) |
| Stable | N/A |
| In place | Yes |
| Default input | `[4,5]` |
| Input requirement | Binary 2D grid matrix |

#### Concept and teaching notes

**Short description.** Grid pathfinding traversal counting disjoint 4-directionally connected land components.
**Definition.** Grid pathfinding traversal counting disjoint 4-directionally connected land components.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Number of Connected Islands (Flood Fill).
**When to use it.** Use this lesson to study Number of Connected Islands (Flood Fill) and compare its assumptions and bounds with related entries.
**Common mistake.** Forgetting 4-way boundary checks (0 <= r < M and 0 <= c < N) causing index out of bounds.
**Exam note.** Flood Fill can mutate the grid in-place (changing 1s to 0s or 2s) to achieve O(1) auxiliary space beyond recursion/queue.

#### Trace study questions

1. **Number of Connected Islands (Flood Fill):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Number of Connected Islands (Flood Fill):** What output or terminal status should a correct execution produce?
3. **Number of Connected Islands (Flood Fill):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Number of Connected Islands (Flood Fill):** What is the smallest meaningful state transition in this implementation?
5. **Number of Connected Islands (Flood Fill):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Number of Connected Islands (Flood Fill):** What condition allows execution to proceed to the next candidate?
7. **Number of Connected Islands (Flood Fill):** What condition makes the algorithm stop?
8. **Number of Connected Islands (Flood Fill):** Which values should be written in a dry-run table before the first update?
9. **Number of Connected Islands (Flood Fill):** Which values should be written after one complete loop iteration or recursive call?
10. **Number of Connected Islands (Flood Fill):** Which invariant or correctness property can be checked after this frame?
11. **Number of Connected Islands (Flood Fill):** Which assumption is required for the selected algorithm to be correct?
12. **Number of Connected Islands (Flood Fill):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Number of Connected Islands (Flood Fill):** What input follows the best-case behavior listed in the source catalog?
14. **Number of Connected Islands (Flood Fill):** What input shape can trigger the listed worst-case behavior?
15. **Number of Connected Islands (Flood Fill):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Number of Connected Islands (Flood Fill):** What should happen for an empty or minimal input if the UI permits it?
17. **Number of Connected Islands (Flood Fill):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Number of Connected Islands (Flood Fill):** What auxiliary storage is allocated and when can it be released?
19. **Number of Connected Islands (Flood Fill):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Number of Connected Islands (Flood Fill):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Number of Connected Islands (Flood Fill):** What result would demonstrate that this trace has finished correctly?
22. **Number of Connected Islands (Flood Fill):** Which independent test assertion could catch a bug in this transition?
23. **Number of Connected Islands (Flood Fill):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Number of Connected Islands (Flood Fill):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(M × N), average time O(M × N), worst time O(M × N), and auxiliary space O(min(M, N)).
1. **Number of Connected Islands (Flood Fill):** Name the input-size variable used in the published time bound.
2. **Number of Connected Islands (Flood Fill):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Number of Connected Islands (Flood Fill):** Identify the operation performed once per outer iteration.
4. **Number of Connected Islands (Flood Fill):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Number of Connected Islands (Flood Fill):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Number of Connected Islands (Flood Fill):** Explain how the input structure changes the amount of work.
7. **Number of Connected Islands (Flood Fill):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Number of Connected Islands (Flood Fill):** Separate comparisons from writes or swaps where appropriate.
9. **Number of Connected Islands (Flood Fill):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Number of Connected Islands (Flood Fill):** Explain why the average-case entry may differ from both best and worst case.
11. **Number of Connected Islands (Flood Fill):** Describe what auxiliary space counts for this algorithm.
12. **Number of Connected Islands (Flood Fill):** Check whether recursion stack space is included in the documented space bound.
13. **Number of Connected Islands (Flood Fill):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Number of Connected Islands (Flood Fill):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Number of Connected Islands (Flood Fill):** Explain which code operation dominates as the input grows.
16. **Number of Connected Islands (Flood Fill):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function countIslands(grid):
  count = 0
  for r from 0 to M-1:
    for c from 0 to N-1:
      if grid[r][c] == 1:
        count++
        floodFillBFS(r, c)
  return count
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Number of Connected Islands (Flood Fill); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace this repetition in Number of Connected Islands (Flood Fill): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Trace this repetition in Number of Connected Islands (Flood Fill): write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 5:** Evaluate this branch for the current Number of Connected Islands (Flood Fill) state; note which alternative runs and which states are excluded.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Record the result or trace state returned by Number of Connected Islands (Flood Fill); check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size(), count = 0;
    for (int r = 0; r < m; r++) {
        for (int c = 0; c < n; c++) {
            if (grid[r][c] == '1') {
                count++;
                bfs(grid, r, c);
            }
        }
    }
    return count;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Check the index and boundary for this Number of Connected Islands (Flood Fill) access; state which input or auxiliary cell is read or updated.
- **CPP line 3:** Trace this repetition in Number of Connected Islands (Flood Fill): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Trace this repetition in Number of Connected Islands (Flood Fill): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Evaluate this branch for the current Number of Connected Islands (Flood Fill) state; note which alternative runs and which states are excluded.
- **CPP line 6:** Trace source line 6 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 7:** Trace source line 7 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the Number of Connected Islands (Flood Fill) control-flow scope clear.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Number of Connected Islands (Flood Fill) control-flow scope clear.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the Number of Connected Islands (Flood Fill) control-flow scope clear.
- **CPP line 11:** Record the result or trace state returned by Number of Connected Islands (Flood Fill); check that every required exit path reaches a valid result.
- **CPP line 12:** Match this closing delimiter with its opening block to keep the Number of Connected Islands (Flood Fill) control-flow scope clear.

##### JAVA reference

```java
// Grid BFS Islands
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def num_islands(grid):
    # Flood Fill Breadth-First Search
    pass
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 3:** Trace source line 3 in python: record the values it reads, the state it changes, and the next statement it enables.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Connected Component | Sub-grid where every cell is reachable from any other cell via valid land moves. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Number of Connected Islands (Flood Fill) without reading the code.

**Practice task:** Build one small input for Number of Connected Islands (Flood Fill), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Number of Connected Islands (Flood Fill) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Spiral Matrix Traversal

**Catalog identifier:** `spiral_matrix`  
**Course category:** Matrix / Grid  
**Catalog position:** 36 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Layer-by-Layer Boundary Shrinking |
| Best-case time | O(M × N) |
| Average-case time | O(M × N) |
| Worst-case time | O(M × N) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[4,4]` |
| Input requirement | 2D matrix dimensions |

#### Concept and teaching notes

**Short description.** Clockwise perimeter spiral navigation peeling outer boundary layers inward in O(M × N).
**Definition.** Clockwise perimeter spiral navigation peeling outer boundary layers inward in O(M × N).
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Spiral Matrix Traversal.
**When to use it.** Use this lesson to study Spiral Matrix Traversal and compare its assumptions and bounds with related entries.
**Common mistake.** Failing to check top <= bottom or left <= right before reverse sweeps, printing duplicate rows.
**Exam note.** Maintain 4 boundary pointers: top, bottom, left, right, and increment/decrement after every directional pass.

#### Trace study questions

1. **Spiral Matrix Traversal:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Spiral Matrix Traversal:** What output or terminal status should a correct execution produce?
3. **Spiral Matrix Traversal:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Spiral Matrix Traversal:** What is the smallest meaningful state transition in this implementation?
5. **Spiral Matrix Traversal:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Spiral Matrix Traversal:** What condition allows execution to proceed to the next candidate?
7. **Spiral Matrix Traversal:** What condition makes the algorithm stop?
8. **Spiral Matrix Traversal:** Which values should be written in a dry-run table before the first update?
9. **Spiral Matrix Traversal:** Which values should be written after one complete loop iteration or recursive call?
10. **Spiral Matrix Traversal:** Which invariant or correctness property can be checked after this frame?
11. **Spiral Matrix Traversal:** Which assumption is required for the selected algorithm to be correct?
12. **Spiral Matrix Traversal:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Spiral Matrix Traversal:** What input follows the best-case behavior listed in the source catalog?
14. **Spiral Matrix Traversal:** What input shape can trigger the listed worst-case behavior?
15. **Spiral Matrix Traversal:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Spiral Matrix Traversal:** What should happen for an empty or minimal input if the UI permits it?
17. **Spiral Matrix Traversal:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Spiral Matrix Traversal:** What auxiliary storage is allocated and when can it be released?
19. **Spiral Matrix Traversal:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Spiral Matrix Traversal:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Spiral Matrix Traversal:** What result would demonstrate that this trace has finished correctly?
22. **Spiral Matrix Traversal:** Which independent test assertion could catch a bug in this transition?
23. **Spiral Matrix Traversal:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Spiral Matrix Traversal:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(M × N), average time O(M × N), worst time O(M × N), and auxiliary space O(1).
1. **Spiral Matrix Traversal:** Name the input-size variable used in the published time bound.
2. **Spiral Matrix Traversal:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Spiral Matrix Traversal:** Identify the operation performed once per outer iteration.
4. **Spiral Matrix Traversal:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Spiral Matrix Traversal:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Spiral Matrix Traversal:** Explain how the input structure changes the amount of work.
7. **Spiral Matrix Traversal:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Spiral Matrix Traversal:** Separate comparisons from writes or swaps where appropriate.
9. **Spiral Matrix Traversal:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Spiral Matrix Traversal:** Explain why the average-case entry may differ from both best and worst case.
11. **Spiral Matrix Traversal:** Describe what auxiliary space counts for this algorithm.
12. **Spiral Matrix Traversal:** Check whether recursion stack space is included in the documented space bound.
13. **Spiral Matrix Traversal:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Spiral Matrix Traversal:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Spiral Matrix Traversal:** Explain which code operation dominates as the input grows.
16. **Spiral Matrix Traversal:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function spiralOrder(matrix):
  top = 0, bottom = M - 1, left = 0, right = N - 1
  while top <= bottom and left <= right:
    sweepRight(top, left, right); top++
    sweepDown(right, top, bottom); right--
    if top <= bottom: sweepLeft(bottom, right, left); bottom--
    if left <= right: sweepUp(left, bottom, top); left++
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Spiral Matrix Traversal; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace this repetition in Spiral Matrix Traversal: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Evaluate this branch for the current Spiral Matrix Traversal state; note which alternative runs and which states are excluded.
- **PSEUDO line 7:** Evaluate this branch for the current Spiral Matrix Traversal state; note which alternative runs and which states are excluded.

##### CPP reference

```cpp
vector<int> spiralOrder(vector<vector<int>>& mat) {
    vector<int> res;
    int top = 0, bottom = mat.size() - 1, left = 0, right = mat[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) res.push_back(mat[top][c]);
        top++;
        for (int r = top; r <= bottom; r++) res.push_back(mat[r][right]);
        right--;
        if (top <= bottom) { for (int c = right; c >= left; c--) res.push_back(mat[bottom][c]); bottom--; }
        if (left <= right) { for (int r = bottom; r >= top; r--) res.push_back(mat[r][left]); left++; }
    }
    return res;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Check the index and boundary for this Spiral Matrix Traversal access; state which input or auxiliary cell is read or updated.
- **CPP line 4:** Trace this repetition in Spiral Matrix Traversal: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 5:** Trace this repetition in Spiral Matrix Traversal: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Trace source line 6 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 7:** Trace this repetition in Spiral Matrix Traversal: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 8:** Trace source line 8 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 9:** Evaluate this branch for the current Spiral Matrix Traversal state; note which alternative runs and which states are excluded.
- **CPP line 10:** Evaluate this branch for the current Spiral Matrix Traversal state; note which alternative runs and which states are excluded.
- **CPP line 11:** Match this closing delimiter with its opening block to keep the Spiral Matrix Traversal control-flow scope clear.
- **CPP line 12:** Record the result or trace state returned by Spiral Matrix Traversal; check that every required exit path reaches a valid result.
- **CPP line 13:** Match this closing delimiter with its opening block to keep the Spiral Matrix Traversal control-flow scope clear.

##### JAVA reference

```java
// Spiral matrix traversal
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def spiral_order(matrix):
    res = []
    # Peel outer layers clockwise
    return res
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 4:** Record the result or trace state returned by Spiral Matrix Traversal; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Perimeter Peeling | Processing outer grid perimeter and shrinking boundaries until matrix is exhausted. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Spiral Matrix Traversal without reading the code.

**Practice task:** Build one small input for Spiral Matrix Traversal, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Spiral Matrix Traversal short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Minimax with Alpha-Beta Pruning

**Catalog identifier:** `minimax_alphabeta`  
**Course category:** Games  
**Catalog position:** 37 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Adversarial Game Tree Search |
| Best-case time | O(b^(d/2)) |
| Average-case time | O(b^(3d/4)) |
| Worst-case time | O(b^d) |
| Auxiliary space | O(d) |
| Stable | N/A |
| In place | No |
| Default input | `[3,5,6,9]` |
| Input requirement | Leaf evaluation payoffs |

#### Concept and teaching notes

**Short description.** Adversarial decision game tree search pruning provably sub-optimal branches via alpha-beta bounds.
**Definition.** Adversarial decision game tree search pruning provably sub-optimal branches via alpha-beta bounds.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Minimax with Alpha-Beta Pruning.
**When to use it.** Use this lesson to study Minimax with Alpha-Beta Pruning and compare its assumptions and bounds with related entries.
**Common mistake.** Assuming alpha-beta pruning changes the computed move. The outcome is 100% IDENTICAL to plain Minimax, just faster!
**Exam note.** Alpha-Beta Condition: Prune (cutoff) when alpha >= beta. Alpha is best MAX score; Beta is best MIN score.

#### Trace study questions

1. **Minimax with Alpha-Beta Pruning:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Minimax with Alpha-Beta Pruning:** What output or terminal status should a correct execution produce?
3. **Minimax with Alpha-Beta Pruning:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Minimax with Alpha-Beta Pruning:** What is the smallest meaningful state transition in this implementation?
5. **Minimax with Alpha-Beta Pruning:** Which variable, index, pointer, node, or table cell controls that transition?
6. **Minimax with Alpha-Beta Pruning:** What condition allows execution to proceed to the next candidate?
7. **Minimax with Alpha-Beta Pruning:** What condition makes the algorithm stop?
8. **Minimax with Alpha-Beta Pruning:** Which values should be written in a dry-run table before the first update?
9. **Minimax with Alpha-Beta Pruning:** Which values should be written after one complete loop iteration or recursive call?
10. **Minimax with Alpha-Beta Pruning:** Which invariant or correctness property can be checked after this frame?
11. **Minimax with Alpha-Beta Pruning:** Which assumption is required for the selected algorithm to be correct?
12. **Minimax with Alpha-Beta Pruning:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Minimax with Alpha-Beta Pruning:** What input follows the best-case behavior listed in the source catalog?
14. **Minimax with Alpha-Beta Pruning:** What input shape can trigger the listed worst-case behavior?
15. **Minimax with Alpha-Beta Pruning:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Minimax with Alpha-Beta Pruning:** What should happen for an empty or minimal input if the UI permits it?
17. **Minimax with Alpha-Beta Pruning:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Minimax with Alpha-Beta Pruning:** What auxiliary storage is allocated and when can it be released?
19. **Minimax with Alpha-Beta Pruning:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Minimax with Alpha-Beta Pruning:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Minimax with Alpha-Beta Pruning:** What result would demonstrate that this trace has finished correctly?
22. **Minimax with Alpha-Beta Pruning:** Which independent test assertion could catch a bug in this transition?
23. **Minimax with Alpha-Beta Pruning:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Minimax with Alpha-Beta Pruning:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(b^(d/2)), average time O(b^(3d/4)), worst time O(b^d), and auxiliary space O(d).
1. **Minimax with Alpha-Beta Pruning:** Name the input-size variable used in the published time bound.
2. **Minimax with Alpha-Beta Pruning:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Minimax with Alpha-Beta Pruning:** Identify the operation performed once per outer iteration.
4. **Minimax with Alpha-Beta Pruning:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Minimax with Alpha-Beta Pruning:** Write a rough operation count for the smallest meaningful demonstration input.
6. **Minimax with Alpha-Beta Pruning:** Explain how the input structure changes the amount of work.
7. **Minimax with Alpha-Beta Pruning:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Minimax with Alpha-Beta Pruning:** Separate comparisons from writes or swaps where appropriate.
9. **Minimax with Alpha-Beta Pruning:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Minimax with Alpha-Beta Pruning:** Explain why the average-case entry may differ from both best and worst case.
11. **Minimax with Alpha-Beta Pruning:** Describe what auxiliary space counts for this algorithm.
12. **Minimax with Alpha-Beta Pruning:** Check whether recursion stack space is included in the documented space bound.
13. **Minimax with Alpha-Beta Pruning:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Minimax with Alpha-Beta Pruning:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Minimax with Alpha-Beta Pruning:** Explain which code operation dominates as the input grows.
16. **Minimax with Alpha-Beta Pruning:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function alphaBeta(node, depth, alpha, beta, isMax):
  if depth == 0 or node.isTerminal(): return node.val
  if isMax:
    maxEval = -inf
    for child in node.children:
      eval = alphaBeta(child, depth-1, alpha, beta, false)
      maxEval = max(maxEval, eval)
      alpha = max(alpha, eval)
      if beta <= alpha: break // Prune!
    return maxEval
  else:
    minEval = +inf
    for child in node.children:
      eval = alphaBeta(child, depth-1, alpha, beta, true)
      minEval = min(minEval, eval)
      beta = min(beta, eval)
      if beta <= alpha: break // Prune!
    return minEval
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Minimax with Alpha-Beta Pruning; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **PSEUDO line 3:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **PSEUDO line 4:** Trace source line 4 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 5:** Trace this repetition in Minimax with Alpha-Beta Pruning: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 6:** Trace source line 6 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 7:** Trace source line 7 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 8:** Trace source line 8 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 9:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **PSEUDO line 10:** Record the result or trace state returned by Minimax with Alpha-Beta Pruning; check that every required exit path reaches a valid result.
- **PSEUDO line 11:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **PSEUDO line 12:** Trace source line 12 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 13:** Trace this repetition in Minimax with Alpha-Beta Pruning: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 14:** Trace source line 14 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 15:** Trace source line 15 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 16:** Trace source line 16 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 17:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **PSEUDO line 18:** Record the result or trace state returned by Minimax with Alpha-Beta Pruning; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int alphabeta(Node* node, int d, int alpha, int beta, bool isMax) {
    if (d == 0 || node->isLeaf()) return node->val;
    if (isMax) {
        int maxE = -1e9;
        for (auto c : node->children) {
            maxE = max(maxE, alphabeta(c, d - 1, alpha, beta, false));
            alpha = max(alpha, maxE);
            if (beta <= alpha) break; // Cutoff
        }
        return maxE;
    } else {
        int minE = 1e9;
        for (auto c : node->children) {
            minE = min(minE, alphabeta(c, d - 1, alpha, beta, true));
            beta = min(beta, minE);
            if (beta <= alpha) break; // Cutoff
        }
        return minE;
    }
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **CPP line 3:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace this repetition in Minimax with Alpha-Beta Pruning: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 6:** Trace source line 6 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 7:** Trace source line 7 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 8:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the Minimax with Alpha-Beta Pruning control-flow scope clear.
- **CPP line 10:** Record the result or trace state returned by Minimax with Alpha-Beta Pruning; check that every required exit path reaches a valid result.
- **CPP line 11:** Match this closing delimiter with its opening block to keep the Minimax with Alpha-Beta Pruning control-flow scope clear.
- **CPP line 12:** Trace source line 12 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 13:** Trace this repetition in Minimax with Alpha-Beta Pruning: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 14:** Trace source line 14 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 15:** Trace source line 15 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 16:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **CPP line 17:** Match this closing delimiter with its opening block to keep the Minimax with Alpha-Beta Pruning control-flow scope clear.
- **CPP line 18:** Record the result or trace state returned by Minimax with Alpha-Beta Pruning; check that every required exit path reaches a valid result.
- **CPP line 19:** Match this closing delimiter with its opening block to keep the Minimax with Alpha-Beta Pruning control-flow scope clear.
- **CPP line 20:** Match this closing delimiter with its opening block to keep the Minimax with Alpha-Beta Pruning control-flow scope clear.

##### JAVA reference

```java
// Minimax Alpha-Beta Pruning
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Read this source comment as intent; verify the executable statements implement the stated intent.

##### PYTHON reference

```python
def alphabeta(node, depth, alpha, beta, is_max):
    if depth == 0 or node.is_leaf(): return node.val
    # Alpha-Beta branch pruning
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Evaluate this branch for the current Minimax with Alpha-Beta Pruning state; note which alternative runs and which states are excluded.
- **PYTHON line 3:** Read this source comment as intent; verify the executable statements implement the stated intent.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Alpha Bound | The highest value that the MAX player is guaranteed to achieve so far. |
| Beta Bound | The lowest value that the MIN player is guaranteed to achieve so far. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Minimax with Alpha-Beta Pruning without reading the code.

**Practice task:** Build one small input for Minimax with Alpha-Beta Pruning, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Minimax with Alpha-Beta Pruning short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### Game of Nim (Bouton's Theorem)

**Catalog identifier:** `game_of_nim`  
**Course category:** Games  
**Catalog position:** 38 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | Sprague-Grundy Theorem / Bouton's Nim-Sum |
| Best-case time | O(k) |
| Average-case time | O(k) |
| Worst-case time | O(k) |
| Auxiliary space | O(1) |
| Stable | N/A |
| In place | Yes |
| Default input | `[3,4,5]` |
| Input requirement | Heap sizes array |

#### Concept and teaching notes

**Short description.** Impartial combinatorial game solved via Sprague-Grundy theorem and bitwise XOR Nim-Sum.
**Definition.** Impartial combinatorial game solved via Sprague-Grundy theorem and bitwise XOR Nim-Sum.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for Game of Nim (Bouton's Theorem).
**When to use it.** Use this lesson to study Game of Nim (Bouton's Theorem) and compare its assumptions and bounds with related entries.
**Common mistake.** Thinking Nim requires exploring game trees. Bouton proved in 1901 that XOR sum determines win in O(k)!
**Exam note.** Winning Position (N-position): Nim-Sum != 0 (Player 1 can force win). Losing Position (P-position): Nim-Sum == 0.

#### Trace study questions

1. **Game of Nim (Bouton's Theorem):** What input does the implementation receive, and which constraints are stated in the catalog?
2. **Game of Nim (Bouton's Theorem):** What output or terminal status should a correct execution produce?
3. **Game of Nim (Bouton's Theorem):** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **Game of Nim (Bouton's Theorem):** What is the smallest meaningful state transition in this implementation?
5. **Game of Nim (Bouton's Theorem):** Which variable, index, pointer, node, or table cell controls that transition?
6. **Game of Nim (Bouton's Theorem):** What condition allows execution to proceed to the next candidate?
7. **Game of Nim (Bouton's Theorem):** What condition makes the algorithm stop?
8. **Game of Nim (Bouton's Theorem):** Which values should be written in a dry-run table before the first update?
9. **Game of Nim (Bouton's Theorem):** Which values should be written after one complete loop iteration or recursive call?
10. **Game of Nim (Bouton's Theorem):** Which invariant or correctness property can be checked after this frame?
11. **Game of Nim (Bouton's Theorem):** Which assumption is required for the selected algorithm to be correct?
12. **Game of Nim (Bouton's Theorem):** Does input order, graph weight sign, capacity, or problem structure matter?
13. **Game of Nim (Bouton's Theorem):** What input follows the best-case behavior listed in the source catalog?
14. **Game of Nim (Bouton's Theorem):** What input shape can trigger the listed worst-case behavior?
15. **Game of Nim (Bouton's Theorem):** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **Game of Nim (Bouton's Theorem):** What should happen for an empty or minimal input if the UI permits it?
17. **Game of Nim (Bouton's Theorem):** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **Game of Nim (Bouton's Theorem):** What auxiliary storage is allocated and when can it be released?
19. **Game of Nim (Bouton's Theorem):** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **Game of Nim (Bouton's Theorem):** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **Game of Nim (Bouton's Theorem):** What result would demonstrate that this trace has finished correctly?
22. **Game of Nim (Bouton's Theorem):** Which independent test assertion could catch a bug in this transition?
23. **Game of Nim (Bouton's Theorem):** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **Game of Nim (Bouton's Theorem):** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(k), average time O(k), worst time O(k), and auxiliary space O(1).
1. **Game of Nim (Bouton's Theorem):** Name the input-size variable used in the published time bound.
2. **Game of Nim (Bouton's Theorem):** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **Game of Nim (Bouton's Theorem):** Identify the operation performed once per outer iteration.
4. **Game of Nim (Bouton's Theorem):** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **Game of Nim (Bouton's Theorem):** Write a rough operation count for the smallest meaningful demonstration input.
6. **Game of Nim (Bouton's Theorem):** Explain how the input structure changes the amount of work.
7. **Game of Nim (Bouton's Theorem):** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **Game of Nim (Bouton's Theorem):** Separate comparisons from writes or swaps where appropriate.
9. **Game of Nim (Bouton's Theorem):** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **Game of Nim (Bouton's Theorem):** Explain why the average-case entry may differ from both best and worst case.
11. **Game of Nim (Bouton's Theorem):** Describe what auxiliary space counts for this algorithm.
12. **Game of Nim (Bouton's Theorem):** Check whether recursion stack space is included in the documented space bound.
13. **Game of Nim (Bouton's Theorem):** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **Game of Nim (Bouton's Theorem):** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **Game of Nim (Bouton's Theorem):** Explain which code operation dominates as the input grows.
16. **Game of Nim (Bouton's Theorem):** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function solveNim(heaps):
  nimSum = heaps[0] XOR heaps[1] XOR ... XOR heaps[k-1]
  if nimSum != 0: return "First Player (P1) Wins"
  else: return "Second Player (P2) Wins"
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for Game of Nim (Bouton's Theorem); record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Check the index and boundary for this Game of Nim (Bouton's Theorem) access; state which input or auxiliary cell is read or updated.
- **PSEUDO line 3:** Evaluate this branch for the current Game of Nim (Bouton's Theorem) state; note which alternative runs and which states are excluded.
- **PSEUDO line 4:** Evaluate this branch for the current Game of Nim (Bouton's Theorem) state; note which alternative runs and which states are excluded.

##### CPP reference

```cpp
bool isWinningNim(const vector<int>& heaps) {
    int nimSum = 0;
    for (int h : heaps) nimSum ^= h;
    return nimSum != 0;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Name the state represented by this Game of Nim (Bouton's Theorem) variable and record its value before its first update.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace this repetition in Game of Nim (Bouton's Theorem): write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Record the result or trace state returned by Game of Nim (Bouton's Theorem); check that every required exit path reaches a valid result.
- **CPP line 5:** Match this closing delimiter with its opening block to keep the Game of Nim (Bouton's Theorem) control-flow scope clear.

##### JAVA reference

```java
public static boolean isWinning(int[] heaps) {
    int nimSum = 0;
    for (int h : heaps) nimSum ^= h;
    return nimSum != 0;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Trace source line 2 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 3:** Trace this repetition in Game of Nim (Bouton's Theorem): write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 4:** Record the result or trace state returned by Game of Nim (Bouton's Theorem); check that every required exit path reaches a valid result.
- **JAVA line 5:** Match this closing delimiter with its opening block to keep the Game of Nim (Bouton's Theorem) control-flow scope clear.

##### PYTHON reference

```python
def solve_nim(heaps):
    nim_sum = 0
    for h in heaps: nim_sum ^= h
    return "Player 1 Wins" if nim_sum != 0 else "Player 2 Wins"
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Trace source line 2 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 3:** Trace this repetition in Game of Nim (Bouton's Theorem): write its initial value, stopping condition, update, and the number of items it may visit.
- **PYTHON line 4:** Record the result or trace state returned by Game of Nim (Bouton's Theorem); check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Nim-Sum | Bitwise XOR sum of all heap sizes; determines winning vs losing game states. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for Game of Nim (Bouton's Theorem) without reading the code.

**Practice task:** Build one small input for Game of Nim (Bouton's Theorem), predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the Game of Nim (Bouton's Theorem) short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### 0/1 Knapsack Branch & Bound

**Catalog identifier:** `knapsack_branch_bound`  
**Course category:** Branch and Bound  
**Catalog position:** 39 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | State Space Search & Pruning |
| Best-case time | O(n log n) |
| Average-case time | O(2^n) |
| Worst-case time | O(2^n) |
| Auxiliary space | O(2^n) |
| Stable | N/A |
| In place | No |
| Default input | `[2,3,4,5]` |
| Input requirement | Item weights & values |

#### Concept and teaching notes

**Short description.** State space tree search using fractional upper bounds to prune subtrees that cannot beat current best profit.
**Definition.** State space tree search using fractional upper bounds to prune subtrees that cannot beat current best profit.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for 0/1 Knapsack Branch & Bound.
**When to use it.** Use this lesson to study 0/1 Knapsack Branch & Bound and compare its assumptions and bounds with related entries.
**Common mistake.** Branch and Bound does not evaluate all 2^n leaf nodes blindly; nodes whose upper bound is <= current max profit are pruned immediately.
**Exam note.** KCT Unit 3: Compute upper bound using fractional relaxation: Bound = v + (W - w) * (v_{i+1} / w_{i+1}). Prune when bound <= maxProfit.

#### Trace study questions

1. **0/1 Knapsack Branch & Bound:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **0/1 Knapsack Branch & Bound:** What output or terminal status should a correct execution produce?
3. **0/1 Knapsack Branch & Bound:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **0/1 Knapsack Branch & Bound:** What is the smallest meaningful state transition in this implementation?
5. **0/1 Knapsack Branch & Bound:** Which variable, index, pointer, node, or table cell controls that transition?
6. **0/1 Knapsack Branch & Bound:** What condition allows execution to proceed to the next candidate?
7. **0/1 Knapsack Branch & Bound:** What condition makes the algorithm stop?
8. **0/1 Knapsack Branch & Bound:** Which values should be written in a dry-run table before the first update?
9. **0/1 Knapsack Branch & Bound:** Which values should be written after one complete loop iteration or recursive call?
10. **0/1 Knapsack Branch & Bound:** Which invariant or correctness property can be checked after this frame?
11. **0/1 Knapsack Branch & Bound:** Which assumption is required for the selected algorithm to be correct?
12. **0/1 Knapsack Branch & Bound:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **0/1 Knapsack Branch & Bound:** What input follows the best-case behavior listed in the source catalog?
14. **0/1 Knapsack Branch & Bound:** What input shape can trigger the listed worst-case behavior?
15. **0/1 Knapsack Branch & Bound:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **0/1 Knapsack Branch & Bound:** What should happen for an empty or minimal input if the UI permits it?
17. **0/1 Knapsack Branch & Bound:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **0/1 Knapsack Branch & Bound:** What auxiliary storage is allocated and when can it be released?
19. **0/1 Knapsack Branch & Bound:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **0/1 Knapsack Branch & Bound:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **0/1 Knapsack Branch & Bound:** What result would demonstrate that this trace has finished correctly?
22. **0/1 Knapsack Branch & Bound:** Which independent test assertion could catch a bug in this transition?
23. **0/1 Knapsack Branch & Bound:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **0/1 Knapsack Branch & Bound:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n log n), average time O(2^n), worst time O(2^n), and auxiliary space O(2^n).
1. **0/1 Knapsack Branch & Bound:** Name the input-size variable used in the published time bound.
2. **0/1 Knapsack Branch & Bound:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **0/1 Knapsack Branch & Bound:** Identify the operation performed once per outer iteration.
4. **0/1 Knapsack Branch & Bound:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **0/1 Knapsack Branch & Bound:** Write a rough operation count for the smallest meaningful demonstration input.
6. **0/1 Knapsack Branch & Bound:** Explain how the input structure changes the amount of work.
7. **0/1 Knapsack Branch & Bound:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **0/1 Knapsack Branch & Bound:** Separate comparisons from writes or swaps where appropriate.
9. **0/1 Knapsack Branch & Bound:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **0/1 Knapsack Branch & Bound:** Explain why the average-case entry may differ from both best and worst case.
11. **0/1 Knapsack Branch & Bound:** Describe what auxiliary space counts for this algorithm.
12. **0/1 Knapsack Branch & Bound:** Check whether recursion stack space is included in the documented space bound.
13. **0/1 Knapsack Branch & Bound:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **0/1 Knapsack Branch & Bound:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **0/1 Knapsack Branch & Bound:** Explain which code operation dominates as the input grows.
16. **0/1 Knapsack Branch & Bound:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function knapsackBranchAndBound(items, W):
  sort items by ratio value/weight descending
  Q = PriorityQueue ordered by upper_bound
  Q.push(rootNode)
  maxProfit = 0
  while not Q.empty():
    node = Q.pop()
    if node.bound > maxProfit:
      leftChild = include(node, nextItem)
      if leftChild.weight <= W:
        maxProfit = max(maxProfit, leftChild.val)
        if leftChild.bound > maxProfit: Q.push(leftChild)
      rightChild = exclude(node, nextItem)
      if rightChild.bound > maxProfit: Q.push(rightChild)
  return maxProfit
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for 0/1 Knapsack Branch & Bound; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Trace source line 2 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Track the collection mutation made by 0/1 Knapsack Branch & Bound; compare the collection immediately before and after this statement.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Trace this repetition in 0/1 Knapsack Branch & Bound: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 7:** Track the collection mutation made by 0/1 Knapsack Branch & Bound; compare the collection immediately before and after this statement.
- **PSEUDO line 8:** Evaluate this branch for the current 0/1 Knapsack Branch & Bound state; note which alternative runs and which states are excluded.
- **PSEUDO line 9:** Trace source line 9 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 10:** Evaluate this branch for the current 0/1 Knapsack Branch & Bound state; note which alternative runs and which states are excluded.
- **PSEUDO line 11:** Trace source line 11 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 12:** Evaluate this branch for the current 0/1 Knapsack Branch & Bound state; note which alternative runs and which states are excluded.
- **PSEUDO line 13:** Trace source line 13 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 14:** Evaluate this branch for the current 0/1 Knapsack Branch & Bound state; note which alternative runs and which states are excluded.
- **PSEUDO line 15:** Record the result or trace state returned by 0/1 Knapsack Branch & Bound; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
struct Node { int level, profit, weight; double bound; };
double bound(Node u, int n, int W, vector<Item>& arr) {
    if (u.weight >= W) return 0;
    double profit_bound = u.profit;
    int j = u.level + 1, totweight = u.weight;
    while (j < n && totweight + arr[j].weight <= W) {
        totweight += arr[j].weight;
        profit_bound += arr[j].value;
        j++;
    }
    if (j < n) profit_bound += (W - totweight) * ((double)arr[j].value / arr[j].weight);
    return profit_bound;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Evaluate this branch for the current 0/1 Knapsack Branch & Bound state; note which alternative runs and which states are excluded.
- **CPP line 4:** Trace source line 4 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 5:** Trace source line 5 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 6:** Trace this repetition in 0/1 Knapsack Branch & Bound: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 7:** Check the index and boundary for this 0/1 Knapsack Branch & Bound access; state which input or auxiliary cell is read or updated.
- **CPP line 8:** Check the index and boundary for this 0/1 Knapsack Branch & Bound access; state which input or auxiliary cell is read or updated.
- **CPP line 9:** Trace source line 9 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 10:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Branch & Bound control-flow scope clear.
- **CPP line 11:** Evaluate this branch for the current 0/1 Knapsack Branch & Bound state; note which alternative runs and which states are excluded.
- **CPP line 12:** Record the result or trace state returned by 0/1 Knapsack Branch & Bound; check that every required exit path reaches a valid result.
- **CPP line 13:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Branch & Bound control-flow scope clear.

##### JAVA reference

```java
static int knapsackBAndB(int W, Item[] arr, int n) {
    Queue<Node> Q = new LinkedList<>();
    Node u = new Node(-1, 0, 0);
    Q.add(u);
    int maxProfit = 0;
    while (!Q.isEmpty()) {
        u = Q.poll();
        if (u.bound > maxProfit) {
            // explore child branches and prune
        }
    }
    return maxProfit;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Identify the storage created for 0/1 Knapsack Branch & Bound; state its size, lifetime, and contribution to auxiliary-space complexity.
- **JAVA line 3:** Identify the storage created for 0/1 Knapsack Branch & Bound; state its size, lifetime, and contribution to auxiliary-space complexity.
- **JAVA line 4:** Track the collection mutation made by 0/1 Knapsack Branch & Bound; compare the collection immediately before and after this statement.
- **JAVA line 5:** Trace source line 5 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 6:** Trace this repetition in 0/1 Knapsack Branch & Bound: write its initial value, stopping condition, update, and the number of items it may visit.
- **JAVA line 7:** Trace source line 7 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 8:** Evaluate this branch for the current 0/1 Knapsack Branch & Bound state; note which alternative runs and which states are excluded.
- **JAVA line 9:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **JAVA line 10:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Branch & Bound control-flow scope clear.
- **JAVA line 11:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Branch & Bound control-flow scope clear.
- **JAVA line 12:** Record the result or trace state returned by 0/1 Knapsack Branch & Bound; check that every required exit path reaches a valid result.
- **JAVA line 13:** Match this closing delimiter with its opening block to keep the 0/1 Knapsack Branch & Bound control-flow scope clear.

##### PYTHON reference

```python
def knapsack_branch_and_bound(W, weights, values):
    # State space tree search with LC Bounding
    items = sorted(zip(weights, values), key=lambda x: x[1]/x[0], reverse=True)
    # Prune nodes where upper_bound <= best_value
    return max_profit
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 3:** Check the index and boundary for this 0/1 Knapsack Branch & Bound access; state which input or auxiliary cell is read or updated.
- **PYTHON line 4:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 5:** Record the result or trace state returned by 0/1 Knapsack Branch & Bound; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Branch and Bound | Systematic state space search using upper/lower bounds to prune non-optimal candidate subtrees. |
| Upper Bound | An optimistic estimate of the maximum profit achievable from any node in the subtree. |
| Pruning | Discarding a subproblem node immediately when its bound proves it cannot beat the best known solution. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for 0/1 Knapsack Branch & Bound without reading the code.

**Practice task:** Build one small input for 0/1 Knapsack Branch & Bound, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the 0/1 Knapsack Branch & Bound short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

### TSP Reduced Cost Matrix Branch & Bound

**Catalog identifier:** `tsp_branch_bound`  
**Course category:** Branch and Bound  
**Catalog position:** 40 of 40  

| Property | Catalog value |
| --- | --- |
| Paradigm | LC Branch and Bound (Reduced Matrix) |
| Best-case time | O(n²) |
| Average-case time | O(n² 2^n) |
| Worst-case time | O(n² 2^n) |
| Auxiliary space | O(n²) |
| Stable | N/A |
| In place | No |
| Default input | `[4]` |
| Input requirement | Matrix dimension (4 cities) |

#### Concept and teaching notes

**Short description.** Solves Traveling Salesperson Problem by reducing cost matrix row-by-row and col-by-col to generate lower bounds for state branches.
**Definition.** Solves Traveling Salesperson Problem by reducing cost matrix row-by-row and col-by-col to generate lower bounds for state branches.
**Real-world analogy.** Use the step trace and state representation as the concrete analogy for TSP Reduced Cost Matrix Branch & Bound.
**When to use it.** Use this lesson to study TSP Reduced Cost Matrix Branch & Bound and compare its assumptions and bounds with related entries.
**Common mistake.** Forgetting to set reverse edges to infinity when branching (e.g. from A to B, set cell [B, A] = ∞ to prevent premature 2-city loops).
**Exam note.** KCT Unit 3: Total lower bound = Parent Bound + cost(i, j) + sum of row/col reduction constants in reduced matrix.

#### Trace study questions

1. **TSP Reduced Cost Matrix Branch & Bound:** What input does the implementation receive, and which constraints are stated in the catalog?
2. **TSP Reduced Cost Matrix Branch & Bound:** What output or terminal status should a correct execution produce?
3. **TSP Reduced Cost Matrix Branch & Bound:** Which state is the algorithm trying to make smaller, larger, sorted, reachable, or optimal?
4. **TSP Reduced Cost Matrix Branch & Bound:** What is the smallest meaningful state transition in this implementation?
5. **TSP Reduced Cost Matrix Branch & Bound:** Which variable, index, pointer, node, or table cell controls that transition?
6. **TSP Reduced Cost Matrix Branch & Bound:** What condition allows execution to proceed to the next candidate?
7. **TSP Reduced Cost Matrix Branch & Bound:** What condition makes the algorithm stop?
8. **TSP Reduced Cost Matrix Branch & Bound:** Which values should be written in a dry-run table before the first update?
9. **TSP Reduced Cost Matrix Branch & Bound:** Which values should be written after one complete loop iteration or recursive call?
10. **TSP Reduced Cost Matrix Branch & Bound:** Which invariant or correctness property can be checked after this frame?
11. **TSP Reduced Cost Matrix Branch & Bound:** Which assumption is required for the selected algorithm to be correct?
12. **TSP Reduced Cost Matrix Branch & Bound:** Does input order, graph weight sign, capacity, or problem structure matter?
13. **TSP Reduced Cost Matrix Branch & Bound:** What input follows the best-case behavior listed in the source catalog?
14. **TSP Reduced Cost Matrix Branch & Bound:** What input shape can trigger the listed worst-case behavior?
15. **TSP Reduced Cost Matrix Branch & Bound:** How do duplicates, ties, equal priorities, or repeated values affect decisions?
16. **TSP Reduced Cost Matrix Branch & Bound:** What should happen for an empty or minimal input if the UI permits it?
17. **TSP Reduced Cost Matrix Branch & Bound:** Which input boundary is explicitly validated, and which remains an engine responsibility?
18. **TSP Reduced Cost Matrix Branch & Bound:** What auxiliary storage is allocated and when can it be released?
19. **TSP Reduced Cost Matrix Branch & Bound:** Is the algorithm stable or in-place according to the source catalog, and what does that imply?
20. **TSP Reduced Cost Matrix Branch & Bound:** Which work counter or visual highlight makes the next operation easiest to inspect?
21. **TSP Reduced Cost Matrix Branch & Bound:** What result would demonstrate that this trace has finished correctly?
22. **TSP Reduced Cost Matrix Branch & Bound:** Which independent test assertion could catch a bug in this transition?
23. **TSP Reduced Cost Matrix Branch & Bound:** How would you explain this frame to a learner seeing the algorithm for the first time?
24. **TSP Reduced Cost Matrix Branch & Bound:** Which comparison with another catalog entry would make a useful lesson?

#### Correctness and edge-case review

- **Review 01:** Input contract: check that the provided example meets the stated input requirement.
- **Review 02:** Initialization: verify that every pointer, boundary, counter, container, and result starts in a defined state.
- **Review 03:** First transition: confirm the first recorded action matches the declared starting state.
- **Review 04:** Progress: identify the variable or set that moves toward a terminal condition.
- **Review 05:** Bounds: check all index, row, column, node, and capacity boundaries before access.
- **Review 06:** Decision: verify the branch condition agrees with the algorithm’s rule for current values.
- **Review 07:** State update: compare every modified value against the preceding frame.
- **Review 08:** Preservation: list the values or candidates that must not be lost during the update.
- **Review 09:** Invariant: state what is already known to be correct after this frame.
- **Review 10:** Termination: prove that the terminal condition cannot be reached prematurely.
- **Review 11:** Result: compare the returned or displayed result with an independently reasoned answer.
- **Review 12:** Duplicates: inspect how equal keys, repeated values, or equal costs are handled.
- **Review 13:** Small input: reason through the minimum input size accepted by the user interface.
- **Review 14:** Adversarial input: identify an ordering or structure likely to stress the chosen strategy.
- **Review 15:** Counterexample: attempt to construct an input that violates one stated assumption.
- **Review 16:** Complexity: tie the dominant operation to the input-size variables used in the catalog.
- **Review 17:** Space: identify memory that grows with the input or recursion depth.
- **Review 18:** Visualization: confirm the displayed highlight names the same item used by the code.
- **Review 19:** Accessibility: verify that text explains the highlighted state in addition to color.
- **Review 20:** Regression: add or retain an automated assertion for a discovered boundary case.

#### Complexity-analysis worksheet

The catalog records best time O(n²), average time O(n² 2^n), worst time O(n² 2^n), and auxiliary space O(n²).
1. **TSP Reduced Cost Matrix Branch & Bound:** Name the input-size variable used in the published time bound.
2. **TSP Reduced Cost Matrix Branch & Bound:** Name any second input-size variable, such as a graph edge count, string length, grid dimension, or capacity.
3. **TSP Reduced Cost Matrix Branch & Bound:** Identify the operation performed once per outer iteration.
4. **TSP Reduced Cost Matrix Branch & Bound:** Identify any inner loop, recursive branch, heap operation, or table-cell dependency.
5. **TSP Reduced Cost Matrix Branch & Bound:** Write a rough operation count for the smallest meaningful demonstration input.
6. **TSP Reduced Cost Matrix Branch & Bound:** Explain how the input structure changes the amount of work.
7. **TSP Reduced Cost Matrix Branch & Bound:** Explain how an early exit changes observed work without changing the general worst-case bound.
8. **TSP Reduced Cost Matrix Branch & Bound:** Separate comparisons from writes or swaps where appropriate.
9. **TSP Reduced Cost Matrix Branch & Bound:** Compare best and worst catalog bounds and identify the assumptions that distinguish them.
10. **TSP Reduced Cost Matrix Branch & Bound:** Explain why the average-case entry may differ from both best and worst case.
11. **TSP Reduced Cost Matrix Branch & Bound:** Describe what auxiliary space counts for this algorithm.
12. **TSP Reduced Cost Matrix Branch & Bound:** Check whether recursion stack space is included in the documented space bound.
13. **TSP Reduced Cost Matrix Branch & Bound:** Distinguish a teaching-trace step count from a formal asymptotic time bound.
14. **TSP Reduced Cost Matrix Branch & Bound:** Use a second input size to check whether the expression is logarithmic, polynomial, exponential, or factorial.
15. **TSP Reduced Cost Matrix Branch & Bound:** Explain which code operation dominates as the input grows.
16. **TSP Reduced Cost Matrix Branch & Bound:** Do not infer runtime superiority from one small animation or one input example.

#### Catalog code snippets

The following language examples are sourced from this algorithm’s entry in `src/data/daaData.ts`.
The snippets are teaching references; executable engine implementations are maintained in `src/engine/algorithms/` and dispatched through `src/engine/algorithmRegistry.ts`.

##### PSEUDO reference

```text
function solveTSP_BAndB(costMatrix):
  root = new Node(path=[0], matrix=reduceMatrix(costMatrix))
  PQ = PriorityQueue(ordered by lower_bound)
  PQ.push(root)
  minTourCost = INFINITY
  while not PQ.empty():
    curr = PQ.pop()
    if curr.cost < minTourCost:
      for each unvisited city v:
        child = branch(curr, v)
        if isCompleteTour(child): minTourCost = min(minTourCost, child.cost)
        elif child.cost < minTourCost: PQ.push(child)
  return minTourCost
```

##### Reading guide for the PSEUDO reference

- **PSEUDO line 1:** Identify the callable or declared unit for TSP Reduced Cost Matrix Branch & Bound; record its inputs, output, and where this unit is invoked.
- **PSEUDO line 2:** Identify the storage created for TSP Reduced Cost Matrix Branch & Bound; state its size, lifetime, and contribution to auxiliary-space complexity.
- **PSEUDO line 3:** Trace source line 3 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 4:** Track the collection mutation made by TSP Reduced Cost Matrix Branch & Bound; compare the collection immediately before and after this statement.
- **PSEUDO line 5:** Trace source line 5 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 6:** Trace this repetition in TSP Reduced Cost Matrix Branch & Bound: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 7:** Track the collection mutation made by TSP Reduced Cost Matrix Branch & Bound; compare the collection immediately before and after this statement.
- **PSEUDO line 8:** Evaluate this branch for the current TSP Reduced Cost Matrix Branch & Bound state; note which alternative runs and which states are excluded.
- **PSEUDO line 9:** Trace this repetition in TSP Reduced Cost Matrix Branch & Bound: write its initial value, stopping condition, update, and the number of items it may visit.
- **PSEUDO line 10:** Trace source line 10 in pseudo: record the values it reads, the state it changes, and the next statement it enables.
- **PSEUDO line 11:** Evaluate this branch for the current TSP Reduced Cost Matrix Branch & Bound state; note which alternative runs and which states are excluded.
- **PSEUDO line 12:** Track the collection mutation made by TSP Reduced Cost Matrix Branch & Bound; compare the collection immediately before and after this statement.
- **PSEUDO line 13:** Record the result or trace state returned by TSP Reduced Cost Matrix Branch & Bound; check that every required exit path reaches a valid result.

##### CPP reference

```cpp
int rowReduction(vector<vector<int>>& mat) {
    int reduction = 0;
    for (int i = 0; i < mat.size(); i++) {
        int rMin = *min_element(mat[i].begin(), mat[i].end());
        if (rMin != INF && rMin > 0) {
            reduction += rMin;
            for (int j = 0; j < mat.size(); j++) if (mat[i][j] != INF) mat[i][j] -= rMin;
        }
    }
    return reduction;
}
```

##### Reading guide for the CPP reference

- **CPP line 1:** Trace source line 1 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 2:** Trace source line 2 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 3:** Trace this repetition in TSP Reduced Cost Matrix Branch & Bound: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 4:** Check the index and boundary for this TSP Reduced Cost Matrix Branch & Bound access; state which input or auxiliary cell is read or updated.
- **CPP line 5:** Evaluate this branch for the current TSP Reduced Cost Matrix Branch & Bound state; note which alternative runs and which states are excluded.
- **CPP line 6:** Trace source line 6 in cpp: record the values it reads, the state it changes, and the next statement it enables.
- **CPP line 7:** Trace this repetition in TSP Reduced Cost Matrix Branch & Bound: write its initial value, stopping condition, update, and the number of items it may visit.
- **CPP line 8:** Match this closing delimiter with its opening block to keep the TSP Reduced Cost Matrix Branch & Bound control-flow scope clear.
- **CPP line 9:** Match this closing delimiter with its opening block to keep the TSP Reduced Cost Matrix Branch & Bound control-flow scope clear.
- **CPP line 10:** Record the result or trace state returned by TSP Reduced Cost Matrix Branch & Bound; check that every required exit path reaches a valid result.
- **CPP line 11:** Match this closing delimiter with its opening block to keep the TSP Reduced Cost Matrix Branch & Bound control-flow scope clear.

##### JAVA reference

```java
public static int solveTSP(int[][] costMatrix) {
    // LC Branch and Bound with priority queue over reduced matrices
    return minCost;
}
```

##### Reading guide for the JAVA reference

- **JAVA line 1:** Trace source line 1 in java: record the values it reads, the state it changes, and the next statement it enables.
- **JAVA line 2:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **JAVA line 3:** Record the result or trace state returned by TSP Reduced Cost Matrix Branch & Bound; check that every required exit path reaches a valid result.
- **JAVA line 4:** Match this closing delimiter with its opening block to keep the TSP Reduced Cost Matrix Branch & Bound control-flow scope clear.

##### PYTHON reference

```python
def tsp_branch_and_bound(matrix):
    # Reduce rows and columns to establish root lower bound
    return min_tour_cost
```

##### Reading guide for the PYTHON reference

- **PYTHON line 1:** Trace source line 1 in python: record the values it reads, the state it changes, and the next statement it enables.
- **PYTHON line 2:** Read this source comment as intent; verify the executable statements implement the stated intent.
- **PYTHON line 3:** Record the result or trace state returned by TSP Reduced Cost Matrix Branch & Bound; check that every required exit path reaches a valid result.

#### Terms, oral review, and practice

| Term | Source definition |
| --- | --- |
| Reduced Matrix | A cost matrix where every row and column has at least one zero entry. |
| Lower Bound | The minimum cost that any complete tour containing the current partial path must incur. |

**Oral review prompt:** Explain the input contract, correctness argument, and worst-case bound for TSP Reduced Cost Matrix Branch & Bound without reading the code.

**Practice task:** Build one small input for TSP Reduced Cost Matrix Branch & Bound, predict the first three state transitions, and verify the terminal result independently.

**Suggested lesson sequence:** Read the TSP Reduced Cost Matrix Branch & Bound short description; review the catalog definition; run the default input; pause on each transition; record the invariant; compare measured work with the catalog bounds; then complete one edge-case review.

## Trace model and teaching concepts

### What a trace step represents

A step is a snapshot emitted by an algorithm generator for display.
The exact optional fields depend on the algorithm family.
Array algorithms may expose an array, auxiliary array, active indices, swapped indices, sorted indices, pivot, target, or search range.
Data-structure algorithms may expose a stack, queue, ring-buffer pointers, or capacity.
Graph algorithms may expose nodes, edges, frontier state, distances, predecessors, or minimum-spanning-tree flags.
Dynamic-programming algorithms may expose a table, active cell, dependency cells, recurrence explanation, and reconstructed path.
Backtracking algorithms may expose placements, candidates, a current sum, a maze grid, or a current location.
Other families can expose intervals, string-pattern state, matrix-grid state, minimax nodes, or equations.
The rendered scene should make the currently relevant state legible and avoid implying fields the generator did not produce.

### Building a useful invariant explanation

1. Name the region, set, prefix, suffix, frontier, table, or partial solution covered by the invariant.
2. State the property that is already true for that region.
3. Explain why initialization establishes the property before the first repeated operation.
4. Explain which operation preserves the property.
5. Explain how termination turns the invariant into the requested result.
6. Identify assumptions required for the argument.
7. Test the argument against the smallest legal input.
8. Test the argument against ties, duplicates, disconnected inputs, or unreachable states as appropriate.

### Complexity vocabulary

- Big-O describes an asymptotic upper bound.
- Big-Omega describes an asymptotic lower bound.
- Big-Theta describes a tight asymptotic bound when upper and lower bounds match.
- Best-case, average-case, and worst-case analysis refer to different input distributions or structures.
- Auxiliary space is extra storage beyond the input representation, subject to the catalog’s convention.
- A trace frame is a pedagogical event and is not necessarily one machine instruction.
- A small visual input makes a state legible but does not benchmark large-input performance.
- Comparisons, writes, heap operations, table cells, and recursive calls are distinct cost measures.
- For graph algorithms, note both the vertex count `V` and edge count `E`.
- For two-string algorithms, note both lengths, conventionally written `m` and `n`.
- For dynamic-programming knapsack, `W` commonly denotes capacity and can make a bound pseudo-polynomial.
- For exponential algorithms, distinguish decision branches from input length.

## Testing and quality practices

### Current automated harness

The test command runs `test/algorithms.test.ts`.
The harness checks that six sorting algorithms produce sorted output and preserve the input multiset across seven data sets.
The sorting data sets include a single value, reversed pairs, sorted and reverse-sorted data, duplicate-heavy data, negative numbers, and a mixed distribution.
Searching tests cover successful and unsuccessful linear and binary searches.
Data-structure tests cover stack underflow, stack overflow, queue sequencing, and circular-queue wraparound.
Graph tests cover BFS completion, DFS completion, Dijkstra shortest-path status, and a Kruskal MST weight.
Dynamic-programming tests check a knapsack optimum and an LCS result.
Backtracking tests check a four-queens placement and a maze exit.
Master Theorem tests check representative exponent comparisons for three cases.

### Recommended test additions

- Assert that every generated trace contains at least one well-formed step.
- Assert that each step index and total-step value are consistent.
- Assert the terminal state for every registered algorithm.
- Add a legal minimum-size input for each generator that accepts external input.
- Add duplicate and tie cases where ordering or tie-breaking matters.
- Add invalid-weight tests when an algorithm contract forbids negative weights.
- Add disconnected graphs and isolated vertices for graph traversals.
- Add empty text, empty pattern, and repeated-prefix strings for string matching.
- Add single-row and single-column matrices for grid traversal.
- Add a recursion or search case that proves backtracking restores state correctly.
- Verify that a view renders optional fields safely when the generator omits them.
- Keep UI behavior checks separate from pure algorithm correctness checks.

### Change validation checklist

1. Read the current algorithm and renderer before changing behavior.
2. Preserve user changes in the worktree.
3. Update source metadata and UI together when they express the same user-facing fact.
4. Add or adjust a focused test for behavior that can be asserted deterministically.
5. Run `npm run lint`.
6. Run `npm test` for algorithm changes.
7. Run `npm run build` for application changes.
8. Inspect the changed view at desktop and narrow viewport widths.
9. Confirm keyboard controls, readable labels, and reduced-motion behavior where applicable.
10. Review the diff for unrelated generated output or temporary files.

## Accessibility and responsive design

Use semantic buttons for actions and descriptive accessible names for icon-only controls.
Provide a visible textual explanation in addition to color when visual states differ.
Do not use animation as the only way to communicate a comparison or result.
Respect the application motion control and the system reduced-motion preference for custom effects.
Keep text labels and code values readable against their backgrounds.
Check graph labels, road weights, node labels, legends, and character speech for overlap.
Make input labels and error states discoverable to keyboard and assistive-technology users.
At narrow widths, allow controls to wrap and avoid horizontal page overflow.
Prefer stable focus indication and logical tab order.
When adding an SVG, label its educational purpose or mark decorative graphics as hidden from assistive technology.

## Troubleshooting

### Port 3000 is already in use

Check the terminal that started the existing Vite server before starting another instance.
The Vite configuration specifies port 3000; inspect its output if the server selects another port or exits.

### Dependency installation fails

Check the Node.js and npm versions installed on the machine.
Check network access to the package registry.
Use one package manager consistently when updating the lockfile.
Do not delete project source or lockfiles as a first troubleshooting step.

### Type checking fails

Read the first compiler diagnostic and follow its file and line reference.
Check whether a property belongs to the correct step type before using it in a scene.
Prefer adding or importing the proper type over suppressing a compiler error.
Rerun `npm run lint` after correcting the source.

### An animation appears clipped or overlaps labels

Inspect the positioned element’s containing block and verify it has a definite height.
Check coordinate-system conversions between CSS percentages and SVG view boxes.
Use browser bounding boxes at representative viewport sizes to confirm separations.
Test at a narrow viewport and with larger text where feasible.
Confirm a speech bubble cannot obscure the active graph node or relevant edge labels.

### A trace seems inconsistent

Re-run the pure algorithm test before changing presentation code.
Compare the terminal result with an independent calculation.
Check whether the visualization intentionally uses a fixed demonstration input.
Inspect the emitted state object and the renderer’s interpretation of each field.
Do not infer a production-scale performance result from the frame count.

### Fonts or images do not appear

Check the browser network panel for failed asset or external font requests.
Check that files referenced from `public/` use root-relative public URLs.
Verify the asset path and filename casing.
Keep a meaningful alt description for informative images.

## Contribution workflow

### Add or update algorithm metadata

1. Find the algorithm entry in `src/data/daaData.ts`.
2. Keep the identifier stable unless a migration is intentional.
3. Verify the category identifier exists in the category catalog.
4. Document the input requirement and assumptions.
5. Review best, average, worst, and space bounds for the stated implementation.
6. Provide concise language snippets that match the algorithm’s behavior.
7. Add a common mistake and an exam-oriented note when useful.
8. Add glossary entries, oral questions, or practice material when supported by the lesson.

### Add or update an execution generator

1. Implement or update the appropriate module under `src/engine/algorithms/`.
2. Emit explicit state snapshots with a clear description and index.
3. Keep the final state informative and deterministic for a fixed input.
4. Avoid mutating caller-owned data unless that behavior is deliberate and documented.
5. Register the generator in `src/engine/algorithmRegistry.ts` when it is a registry-driven entry.
6. Connect metadata and selection behavior to the same stable algorithm identifier.
7. Add correctness and boundary tests under `test/`.
8. Validate the trace through cartoon and engineering displays when both support the state.

### Add or update an animated scene

1. Follow existing React component and Tailwind conventions.
2. Use typed step fields rather than parsing display text when structured state is available.
3. Keep explanatory copy aligned with the actual current step.
4. Make active and inactive states distinguishable through label, shape, or position as well as color.
5. Keep overlays away from the important graph or table region.
6. Wire calm-motion behavior for additional continuous or large motion.
7. Verify reduced-motion behavior and small-screen layout.
8. Run type checking, tests, and a production build.

## Android scaffold

The repository contains Android Gradle configuration in addition to the Vite web application.
The Android module uses Kotlin DSL build scripts, Android Compose dependencies, a version catalog, and Firebase-related dependencies.
Android packaging, signing configuration, and project credentials are separate from the browser app setup.
Do not put signing passwords, keystore files, API keys, or service-account credentials in the README.
Follow the existing Gradle configuration and Android Studio workflow before changing the Android scaffold.
The Vite commands documented here do not build or install the Android application.

## Glossary

| Term | Meaning in this handbook |
| --- | --- |
| Algorithm | A finite procedure that transforms an input into a result. |
| State | Values that describe an execution at a particular point. |
| Trace | An ordered sequence of execution states made visible to a learner. |
| Invariant | A property that remains true at a defined point in an algorithm. |
| Candidate | A value, node, path, or partial solution currently being considered. |
| Frontier | A collection of discovered work eligible for later processing. |
| Relaxation | A shortest-path update that improves a known distance when a cheaper route is found. |
| Stable sort | A sorting method that preserves the relative order of equal keys. |
| In-place algorithm | An algorithm with extra storage bounded independently of input size, under the stated convention. |
| Recurrence | An equation describing work in terms of smaller instances. |
| Amortized analysis | Average cost per operation over a sequence, not a random-input average. |
| Greedy choice | A local action requiring a correctness argument for global optimality. |
| Backtracking | A search technique that explores a partial choice and undoes it when it cannot lead to a solution. |
| Branch and bound | A search technique that compares bounds on partial solutions to prune subtrees. |
| Dynamic programming | A method that solves overlapping subproblems and stores their results. |
| Pseudo-polynomial | Polynomial in a numeric value such as capacity, not necessarily in the bits encoding it. |
| Hamiltonian cycle | A cycle visiting each vertex exactly once and returning to its start. |
| Spanning tree | A connected, acyclic subgraph containing every vertex of a connected graph. |
| Minimum spanning tree | A spanning tree with minimum total edge weight. |
| Prefix code | A code in which no symbol’s codeword is a prefix of another codeword. |
| Longest common subsequence | A longest sequence appearing in two strings in the same relative order, not necessarily contiguously. |
| Rolling hash | A hash that can be updated efficiently as a fixed-size window moves over text. |
| View | A page or panel presented by the React application. |
| Component | A reusable React function that renders part of the interface. |
| Registry | A mapping from a stable algorithm identifier to execution configuration. |
| Public asset | A file served directly by the frontend development or production server. |
| Production build | Optimized static output created by the bundler. |

## Documentation maintenance

The algorithm reference above is generated from the source catalog and includes code snippets maintained in that catalog.
When metadata changes, update the reference consistently with the implementation and tests.
Do not treat handbook length as a substitute for correctness, clarity, or maintained source documentation.
The compact quick-start sections appear before the extended reference so contributors can run the app without reading every chapter.
Review the catalogue, algorithm descriptions, generated snippets, and validation commands whenever package scripts or architecture change.

---

**Catalog snapshot:** 40 algorithms, 16 categories.
**Primary implementation:** TypeScript and React.
**Frontend development server:** Vite on port 3000.
**Focused validation commands:** `npm run lint`, `npm test`, and `npm run build`.
