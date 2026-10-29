import React from 'react';
import { AlgorithmStep } from '../../engine/types';
import { CartoonCharacter } from './CartoonCharacter';
import { SpeechBubble } from './SpeechBubble';
import { TravelingSalespersonScene, RatInMazeScene, SieveEratosthenesScene } from './SpecializedAnimeScenes';
import { Search, Compass, ShieldAlert, Award, Footprints, Package, ArrowRight, ArrowDown, ArrowUp, Undo2, Crown, Trophy, Layers, CheckCircle2, Split, Scissors, Scale, TrendingUp, Database, Sparkles, Coins, GitMerge, ShieldCheck } from 'lucide-react';

interface CartoonStageProps {
  step: AlgorithmStep;
  algorithmId: string;
  algorithmName: string;
  reducedMotion?: boolean;
}

export const CartoonStage: React.FC<CartoonStageProps> = ({
  step,
  algorithmId,
  algorithmName,
  reducedMotion = false
}) => {
  const array = step.arrayState || [65, 35, 45, 90, 55, 75];
  const maxVal = Math.max(...array, 10);
  const minVal = Math.min(...array, 0);
  const activeIndices = step.activeIndices || [];
  const swappedIndices = step.swappedIndices || [];
  const sortedIndices = step.sortedIndices || [];
  const pivotIndex = step.pivotIndex;
  const targetIndex = step.targetIndex;

  // =========================================================================
  // SPECIALIZED ANIME SCENES (Dedicated Characters for High-Impact Modules)
  // =========================================================================
  if (algorithmId === 'traveling_salesperson' || algorithmId === 'tsp_branch_bound') {
    return (
      <TravelingSalespersonScene
        step={step}
        algorithmId={algorithmId}
        algorithmName={algorithmName}
        reducedMotion={reducedMotion}
      />
    );
  }

  if (algorithmId === 'rat_in_maze' || step.mazeGrid) {
    return (
      <RatInMazeScene
        step={step}
        algorithmId={algorithmId}
        algorithmName={algorithmName}
        reducedMotion={reducedMotion}
      />
    );
  }

  if (algorithmId === 'sieve_eratosthenes') {
    return (
      <SieveEratosthenesScene
        step={step}
        algorithmId={algorithmId}
        algorithmName={algorithmName}
        reducedMotion={reducedMotion}
      />
    );
  }

  // =========================================================================
  // 1. STACK CARTOON SCENE (Kids Attractive Warm Beige & Biscuit)
  // =========================================================================
  if (step.stackState && (step.stackState.length > 0 || algorithmId === 'stack_ds')) {
    const stack = step.stackState || [];
    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[380px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-end relative overflow-hidden">
          <div className="w-80 max-w-full h-64 border-x-4 border-b-4 border-[#B07038] rounded-b-3xl bg-[#FFFDFB]/95 p-3 flex flex-col-reverse gap-2 items-center justify-start shadow-inner overflow-hidden relative">
            {stack.length === 0 ? (
              <div className="text-[#9C826B] text-xs text-center mt-20 font-mono font-medium">
                Stack Canister Empty<br />
                <span className="text-[11px] text-rose-500 font-bold">(Underflow Condition)</span>
              </div>
            ) : (
              stack.map((item, idx) => {
                const isTop = idx === stack.length - 1;
                return (
                  <div
                    key={idx}
                    className={`w-full py-2.5 px-4 rounded-2xl flex items-center justify-between border-2 transition-all duration-300 ${
                      isTop
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-black shadow-md scale-102 ring-4 ring-amber-300/40 animate-pulse'
                        : 'bg-[#FBF4EA] border-[#D4A373] text-[#5C3617] font-bold shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono opacity-80">#{idx}</span>
                      <span className="text-sm font-mono font-extrabold">{item}</span>
                    </div>
                    {isTop && (
                      <span className="text-[10px] font-mono font-extrabold bg-amber-300 text-amber-950 px-2 py-0.5 rounded-full uppercase shadow-2xs">
                        TOP 👈
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="text-xs font-mono text-[#7A6451] mt-3 font-bold flex items-center gap-2">
            <span>Canister Mode: LIFO (Last-In, First-Out)</span>
            <span className="text-[#EB6100] font-extrabold">Size: {stack.length}</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. QUEUE & CIRCULAR QUEUE CARTOON SCENE (Kids Attractive Warm Beige & Biscuit)
  // =========================================================================
  if (step.queueState && (step.queueState.length > 0 || algorithmId === 'queue_ds' || algorithmId === 'circular_queue')) {
    const queue = step.queueState || [];
    const isCircular = step.isCircularQueue || algorithmId === 'circular_queue';

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-center items-center relative overflow-hidden">
          <div className="w-full max-w-4xl flex justify-between text-xs font-mono font-bold mb-3 px-2">
            <span className="text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 shadow-2xs">
              ← FRONT (Service Window)
            </span>
            <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
              REAR (Arrival Gate) ←
            </span>
          </div>

          <div className="w-full max-w-4xl h-36 border-2 border-[#D4A373] rounded-3xl bg-[#FFFDFB]/95 p-4 flex items-center gap-3 overflow-x-auto shadow-inner">
            {queue.length === 0 ? (
              <div className="w-full text-center text-[#9C826B] text-xs font-mono font-bold">
                Queue Waiting Pipeline is Empty
              </div>
            ) : (
              queue.map((item, idx) => {
                const isFront = idx === 0;
                const isRear = idx === queue.length - 1;
                return (
                  <div
                    key={idx}
                    className={`flex-1 min-w-[120px] h-24 rounded-2xl p-2.5 flex flex-col items-center justify-center font-mono font-bold border-2 transition-all duration-300 ${
                      isFront
                        ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-md ring-4 ring-rose-300/40 scale-102'
                        : isRear
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-md ring-4 ring-emerald-300/40 scale-102'
                        : 'bg-[#FBF5EC] border-[#DECBB5] text-[#5C3617] shadow-xs'
                    }`}
                  >
                    <span className="text-base font-extrabold">{item}</span>
                    <span className="text-[10px] opacity-80 mt-1 font-semibold">
                      {isFront && isRear ? 'FRONT & REAR' : isFront ? 'FRONT (Next Out)' : isRear ? 'REAR (Last In)' : `Slot #${idx}`}
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <div className="text-xs font-mono text-[#7A6451] mt-3 font-semibold flex items-center gap-2">
            <span>{isCircular ? 'Ring Buffer Carousel (Modulo Wraparound)' : 'Conveyor Queue (FIFO)'}</span>
            {isCircular && <span className="bg-[#FBEFE3] text-[#8C4A19] px-2.5 py-0.5 rounded-full text-[10px] font-bold border border-[#E8DAC7]">Modulo Math Active</span>}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. GRAPH ALGORITHMS CARTOON SCENE (BFS, DFS, Dijkstra, Kruskal's MST)
  // =========================================================================
  if (step.graphNodes && step.graphNodes.length > 0) {
    const nodes = step.graphNodes;
    const edges = step.graphEdges || [];

    const isBfs = algorithmId === 'bfs' || Boolean(step.queueState && step.queueState.length > 0) || Boolean(step.variables.queue);
    const isDfs = algorithmId === 'dfs' || Boolean(step.stackState && step.stackState.length > 0) || Boolean(step.variables.call_stack) || step.description.toLowerCase().includes('dfs');
    const isBacktracking = step.description.toLowerCase().includes('backtrack') || Boolean(step.variables.current && step.variables.current.toLowerCase().includes('backtrack'));

    // Find currently visiting node for Explorer positioning
    const activeNode = nodes.find(n => n.status === 'visiting')
      || (step.variables.current ? nodes.find(n => n.id === step.variables.current?.slice(0, 1)) : undefined)
      || nodes.find(n => n.status === 'in_path')
      || nodes[0];

    const currentQueue = step.queueState || [];
    const currentStack = step.stackState || [];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        {/* Specialized BFS Queue Conveyor Belt Ribbon - Warm Biscuit Style */}
        {isBfs && (
          <div className="w-full bg-[#FAF5EC] border border-[#E8DAC7] rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🚚</span>
              <div>
                <div className="text-xs font-mono font-bold text-[#5C3617] flex items-center gap-1.5">
                  <span>BFS QUEUE CONVEYOR BELT</span>
                  <span className="text-[10px] bg-[#FBEFE3] text-[#8C4A19] px-2 py-0.2 rounded-full font-extrabold uppercase border border-[#E8DAC7]">
                    FIFO (First-In, First-Out)
                  </span>
                </div>
                <div className="text-[11px] text-[#8C7460] font-medium">
                  {currentQueue.length > 0 ? `Front: Dequeues next • Size: ${currentQueue.length}` : 'Queue currently empty (Frontier drained)'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[10px] font-mono font-extrabold text-amber-800 bg-amber-100 px-2 py-1 rounded-lg border border-amber-300 flex items-center gap-1">
                <span>FRONT ⬅</span>
              </span>

              {currentQueue.length === 0 ? (
                <div className="text-xs font-mono text-[#9C826B] italic px-3 py-1 bg-white rounded-lg border border-dashed border-[#DFCDB8]">
                  Empty
                </div>
              ) : (
                currentQueue.map((item, idx) => {
                  const nodeObj = nodes.find(n => n.id === item || n.label.startsWith(item));
                  const dist = nodeObj?.distance !== undefined && nodeObj.distance !== '∞' ? nodeObj.distance : idx;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 bg-white border-2 border-[#D4A373] px-2.5 py-1 rounded-xl shadow-xs font-mono animate-pulse"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#EB6100] text-white flex items-center justify-center text-xs font-black">
                        {item}
                      </div>
                      <span className="text-[10px] font-bold text-[#8C4A19]">dist:{dist}</span>
                    </div>
                  );
                })
              )}

              <span className="text-[10px] font-mono font-extrabold text-[#7A451E] bg-[#F5ECE0] px-2 py-1 rounded-lg border border-[#DFCDB8] flex items-center gap-1">
                <span>⬅ REAR</span>
              </span>
            </div>
          </div>
        )}

        {/* Specialized DFS Call Stack & Backtracking Trail Ribbon */}
        {isDfs && (
          <div className="w-full bg-purple-50/80 border border-purple-200 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧗</span>
              <div>
                <div className="text-xs font-mono font-bold text-purple-950 flex items-center gap-1.5">
                  <span>DFS RECURSION CALL STACK</span>
                  <span className="text-[10px] bg-purple-200 text-purple-800 px-2 py-0.2 rounded-full font-extrabold uppercase">
                    LIFO (Deepest First)
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {isBacktracking
                    ? '↩ RETRACTING: No unvisited branches remain, backtracking to caller'
                    : `Active Stack Depth: ${currentStack.length}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {currentStack.map((frame, idx) => {
                const isTop = idx === currentStack.length - 1;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold transition-all ${
                      isTop
                        ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105 ring-2 ring-purple-300'
                        : 'bg-white text-purple-900 border-purple-200'
                    }`}
                  >
                    <span>{frame}</span>
                    <span className="text-[9px] opacity-75">d:{idx}</span>
                    {isTop && <span className="text-[10px] ml-0.5">👈 TOP</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Backtracking Notice Bar if Backtracking in DFS */}
        {isDfs && isBacktracking && (
          <div className="w-full bg-rose-50 border border-rose-300 rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-mono text-rose-900 animate-pulse">
            <Undo2 className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-bold">Backtracking Retrace:</span>
            <span>Explorer is retreating back up the call stack to explore remaining untraversed branches.</span>
          </div>
        )}

        {/* Main Graph Exploration Stage - Kids Attractive Warm Biscuit Canvas */}
        <div className="w-full h-[440px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-4 relative overflow-hidden">
          {/* Status Indicators & Legend */}
          <div className="absolute top-3 left-4 flex flex-wrap items-center gap-2 z-10 text-[11px] font-mono">
            <span className="flex items-center gap-1 bg-[#FFFDFB] border border-[#DFCDB8] px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
              <span className="text-[#5C3617] font-semibold">Unvisited</span>
            </span>
            <span className="flex items-center gap-1 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-900 font-bold">Visiting</span>
            </span>
            <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-emerald-900 font-bold">Visited</span>
            </span>
            <span className="flex items-center gap-1 bg-purple-50 border border-purple-300 px-2 py-0.5 rounded-md shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span className="text-purple-900 font-bold">In Path / Tree</span>
            </span>
          </div>

          {/* SVG Canvas for Edges */}
          <svg className="w-full h-full absolute inset-0 pointer-events-none">
            {edges.map((e, idx) => {
              const fromNode = nodes.find(n => n.id === e.from);
              const toNode = nodes.find(n => n.id === e.to);
              if (!fromNode || !toNode) return null;

              const isMst = e.isInMst;
              const isHigh = e.isHighlighted;
              const isDisc = e.isDiscarded;

              const stroke = isMst ? '#9333ea' : isHigh ? (isBacktracking ? '#f43f5e' : '#f59e0b') : isDisc ? '#f43f5e' : '#cbd5e1';
              const strokeWidth = isMst || isHigh ? 4 : isDisc ? 2 : 2.5;

              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;

              return (
                <g key={idx}>
                  <line
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isBacktracking && isHigh ? '6 4' : isDisc ? '4 4' : undefined}
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                  {e.weight !== undefined && (
                    <g transform={`translate(${midX * 8}, ${midY * 3.6})`}>
                      <rect
                        x="-12"
                        y="-10"
                        width="24"
                        height="20"
                        rx="6"
                        fill="#ffffff"
                        stroke={stroke}
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                        fill={isMst ? '#7e22ce' : '#334155'}
                      >
                        {e.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Graph Cartoon Nodes - Kids Friendly Biscuit Circles */}
          {nodes.map(node => {
            const isVisiting = node.status === 'visiting';
            const isVisited = node.status === 'visited';
            const isInPath = node.status === 'in_path';

            let fill = 'bg-[#FFFDFB] border-[#D4A373] text-[#4A240A]';
            if (isVisiting) fill = 'bg-amber-100 border-amber-500 text-amber-950 scale-115 ring-4 ring-amber-300/60 shadow-lg';
            else if (isInPath) fill = 'bg-purple-100 border-purple-500 text-purple-950 scale-110 ring-4 ring-purple-300/60 shadow-md';
            else if (isVisited) fill = 'bg-emerald-50 border-emerald-500 text-emerald-950';

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center select-none group transition-all duration-300 z-10"
              >
                {/* Cartoon Styled Circle Node */}
                <div
                  className={`w-14 h-14 rounded-full border-3 flex flex-col items-center justify-center font-mono font-black text-sm shadow-sm transition-all duration-300 relative ${fill}`}
                >
                  {/* Cartoon Facial Expressions */}
                  <div className="flex items-center gap-1.5 -mt-0.5 mb-0.5">
                    {/* Left Eye */}
                    <div
                      className={`rounded-full transition-all duration-150 ${
                        isVisiting
                          ? 'w-2 h-2.5 bg-amber-950 animate-bounce'
                          : isVisited || isInPath
                          ? 'w-1.5 h-1.5 bg-emerald-800'
                          : 'w-1.5 h-1.5 bg-slate-700'
                      }`}
                    />
                    {/* Right Eye */}
                    <div
                      className={`rounded-full transition-all duration-150 ${
                        isVisiting
                          ? 'w-2 h-2.5 bg-amber-950 animate-bounce'
                          : isVisited || isInPath
                          ? 'w-1.5 h-1.5 bg-emerald-800'
                          : 'w-1.5 h-1.5 bg-slate-700'
                      }`}
                    />
                  </div>

                  {/* Blush Cheeks when Visiting or Visited */}
                  {(isVisiting || isVisited) && (
                    <div className="absolute inset-x-2.5 top-6 flex justify-between pointer-events-none">
                      <div className="w-1.5 h-1 rounded-full bg-rose-300/80" />
                      <div className="w-1.5 h-1 rounded-full bg-rose-300/80" />
                    </div>
                  )}

                  {/* Node Label Text */}
                  <span className="tracking-tight text-xs">{node.label}</span>

                  {/* Visiting Mascot Aura Pulse */}
                  {isVisiting && (
                    <div className="w-18 h-18 rounded-full border-2 border-amber-400/60 absolute -inset-2 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Distance Badge for BFS / Dijkstra */}
                {node.distance !== undefined && (
                  <span className="mt-1 text-[10px] font-mono font-bold px-1.5 py-0.2 bg-[#FFFDFB] border border-[#DFCDB8] text-[#5C3617] rounded-md shadow-2xs">
                    dist: {node.distance}
                  </span>
                )}
              </div>
            );
          })}

          {/* DYNAMIC EXPLORER CHARACTER MASCOT */}
          {activeNode && (
            <div
              style={{
                left: `${activeNode.x}%`,
                top: `${Math.max(18, activeNode.y - 13)}%`,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none z-30 select-none"
            >
              {/* Explorer Speech Bubble */}
              <div className="bg-[#201538] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-md mb-1 border border-purple-400/60 flex items-center gap-1 animate-bounce whitespace-nowrap">
                <span>{isBacktracking ? '↩ Retracing' : isBfs ? '🔭 Queueing' : '🧭 Exploring'}</span>
                <span className="text-amber-300 font-black">{activeNode.label}</span>
              </div>

              {/* Explorer Character Sprite */}
              <div className="flex flex-col items-center filter drop-shadow-md">
                {/* Safari / Adventurer Hat */}
                <div className="w-9 h-3.5 bg-amber-600 rounded-t-full border border-amber-800 shadow-xs relative flex justify-center items-center">
                  <div className="w-12 h-1 bg-amber-700 -bottom-0.5 rounded-full absolute" />
                  <div className="w-2.5 h-1 bg-amber-300 rounded-xs" />
                </div>

                {/* Explorer Head - Kawaii Anime Adventurer */}
                <div className="w-8 h-7 bg-[#FFF2E0] border-2 border-[#D4A373] rounded-2xl flex flex-col items-center justify-center p-0.5 shadow-xs relative">
                  {/* Anime Hair Bangs */}
                  <div className="w-7 h-1.5 bg-[#78350F] rounded-t-md -mt-1 mb-0.5" />
                  {/* Anime Sparkle Eyes */}
                  <div className="w-full flex items-center justify-around px-1">
                    <div className="w-1.5 h-2 rounded-full bg-[#1E1B4B] flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-white -mt-0.5 -ml-0.5" />
                    </div>
                    <div className="w-1.5 h-2 rounded-full bg-[#1E1B4B] flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-white -mt-0.5 -ml-0.5" />
                    </div>
                  </div>
                  {/* Kawaii Rosy Cheeks */}
                  <div className="w-full flex justify-between px-1 -mt-0.5">
                    <div className="w-1.5 h-0.8 rounded-full bg-rose-400/70" />
                    <div className="w-1.5 h-0.8 rounded-full bg-rose-400/70" />
                  </div>
                  {/* Smile */}
                  <div className="w-2.5 h-0.5 bg-[#78350F] rounded-full mt-0.5" />
                </div>

                {/* Explorer Torso & Backpack */}
                <div className="w-7 h-5 bg-emerald-600 border border-emerald-800 rounded-b-lg flex items-center justify-between px-1 relative">
                  {/* Backpack */}
                  <div className="w-2 h-3.5 bg-amber-800 rounded-xs absolute -left-1.5 top-0.5 border border-amber-900" />
                  {/* Compass / Lantern */}
                  <div className="w-3 h-3 rounded-full bg-amber-300 border border-amber-600 flex items-center justify-center shadow-xs">
                    <span className="text-[8px]">🧭</span>
                  </div>
                </div>

                {/* Footsteps / Shadow */}
                <div className="flex gap-1.5 -mt-0.5">
                  <div className="w-2 h-1 bg-amber-900 rounded-full" />
                  <div className="w-2 h-1 bg-amber-900 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 4. DYNAMIC PROGRAMMING SCENE (0/1 Knapsack & LCS)
  // =========================================================================
  if (step.dpTable) {
    const dp = step.dpTable;
    const isKnapsack = algorithmId === 'knapsack_dp';

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-5 flex flex-col gap-4">
          {/* Cartoon Adventurer Backpack Banner for Knapsack */}
          {isKnapsack && (
            <div className="w-full bg-[#FFFDFB] border border-[#E8DAC7] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border-2 border-amber-400 flex items-center justify-center text-2xl shadow-inner">
                  🎒
                </div>
                <div>
                  <div className="text-xs font-bold text-[#5C3617] flex items-center gap-2">
                    <span>Adventurer's Knapsack</span>
                    <span className="text-[10px] font-mono font-extrabold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
                      Max Weight: 5 kg
                    </span>
                  </div>
                  <div className="text-[11px] text-[#7A6451] mt-0.5">
                    Optimal Value Formula: <code className="font-mono text-[#EB6100] font-bold">{dp.formulaExplanation}</code>
                  </div>
                </div>
              </div>

              {/* Treasure items icons */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold shadow-2xs">
                  🪙 Gold (2kg, $3)
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold shadow-2xs">
                  💎 Emerald (3kg, $4)
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 font-bold shadow-2xs">
                  👑 Crown (4kg, $5)
                </span>
              </div>
            </div>
          )}

          {/* Live Animated DP Matrix */}
          <div className="w-full overflow-x-auto border-2 border-[#E8DAC7] rounded-2xl bg-[#FFFDFB] p-3 shadow-sm">
            <table className="w-full border-collapse font-mono text-xs">
              <thead>
                <tr>
                  <th className="p-2 border border-[#EADFCF] bg-[#FAF5EB] text-[#7A6451] text-left font-bold">
                    Items \ Weight
                  </th>
                  {dp.colHeaders.map((col, idx) => (
                    <th key={idx} className="p-2 border border-[#EADFCF] bg-[#FAF5EB] text-[#5C3617] font-extrabold text-center">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dp.matrix.map((row, rIdx) => {
                  const isCurrentRow = dp.activeRow === rIdx;
                  return (
                    <tr key={rIdx} className={isCurrentRow ? 'bg-amber-50/50' : undefined}>
                      <td className="p-2 border border-[#EADFCF] bg-[#FAF5EB]/60 font-bold text-[#5C3617] text-left">
                        {dp.rowHeaders[rIdx]}
                      </td>
                      {row.map((val, cIdx) => {
                        const isCurrentCell = dp.activeRow === rIdx && dp.activeCol === cIdx;
                        return (
                          <td
                            key={cIdx}
                            className={`p-2.5 border border-[#EADFCF] text-center font-extrabold transition-all duration-200 ${
                              isCurrentCell
                                ? 'bg-amber-400 text-slate-950 scale-110 shadow-md ring-4 ring-amber-300/50 rounded-lg'
                                : 'text-[#2E2319]'
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5. BACKTRACKING SCENE (N-Queens Chessboard)
  // =========================================================================
  if (step.queensPlacement || algorithmId === 'n_queens') {
    const queens = step.queensPlacement || [1, 3, 0, 2];
    const n = queens.length || 4;

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-center">
          <div className="border-4 border-[#7B42F6] rounded-3xl overflow-hidden shadow-lg grid grid-cols-4 gap-0.5 bg-[#D4C7F5] p-1">
            {Array.from({ length: n }).map((_, row) =>
              Array.from({ length: n }).map((__, col) => {
                const hasQueen = queens[row] === col;
                const isEven = (row + col) % 2 === 0;
                return (
                  <div
                    key={`${row}-${col}`}
                    className={`w-18 h-18 flex items-center justify-center text-3xl select-none transition-all duration-300 rounded-xl ${
                      isEven ? 'bg-[#FFFDFB]' : 'bg-[#F4F0FF]'
                    } ${hasQueen ? 'bg-amber-100 ring-4 ring-amber-300 shadow-md scale-102' : ''}`}
                  >
                    {hasQueen ? (
                      <div className="flex flex-col items-center animate-bounce select-none">
                        <span className="text-2xl filter drop-shadow-xs">👸</span>
                        <span className="text-[9px] font-mono font-black text-purple-900 bg-amber-200 px-1.5 py-0.2 rounded-md shadow-2xs mt-0.5">
                          Queen #{row + 1}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-[#9C826B]">
                        {row},{col}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <div className="text-xs font-mono text-[#7A6451] mt-4 font-bold">
            Chessboard Constraint: No 2 Queens threaten same Row, Column, or Diagonal
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 6. SEARCHING SCENE (Binary Search & Linear Search)
  // =========================================================================
  if (algorithmId === 'binary_search' || algorithmId === 'linear_search') {
    const isBinary = algorithmId === 'binary_search';
    const low = step.searchRange ? step.searchRange[0] : 0;
    const high = step.searchRange ? step.searchRange[1] : array.length - 1;
    const mid = pivotIndex !== undefined ? pivotIndex : -1;

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-end items-center relative overflow-hidden">
          {/* Detective Magnifier Spotlight Banner */}
          <div className="w-full flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2 bg-[#FFFDFB] border border-[#DECBB5] px-3 py-1.5 rounded-xl shadow-xs">
              <Search className="w-4 h-4 text-[#EB6100] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#5C3617]">
                Detective Target: <span className="text-[#EB6100] font-black">55</span>
              </span>
            </div>

            {isBinary && (
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold">
                <span className="bg-[#FBEFE3] text-[#8C4A19] px-2.5 py-0.5 rounded-md border border-[#E8DAC7]">
                  🚩 LOW: {low}
                </span>
                <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-md border border-amber-300">
                  🎯 MID: {mid >= 0 ? mid : 'N/A'}
                </span>
                <span className="bg-[#FBEFE3] text-[#8C4A19] px-2.5 py-0.5 rounded-md border border-[#E8DAC7]">
                  🚩 HIGH: {high}
                </span>
              </div>
            )}
          </div>

          {/* Character Row with Sleeping and Detective States */}
          <div className="w-full flex items-end justify-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-4 pt-6 px-4">
            {array.map((val, idx) => {
              const isFound = targetIndex === idx;
              const isMid = mid === idx;
              const isOut = isBinary && (idx < low || idx > high);

              let charState: 'idle' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'target' | 'sleeping' = 'idle';
              let subLabel: string | undefined = undefined;

              if (isFound) {
                charState = 'target';
                subLabel = 'FOUND! 🎉';
              } else if (isMid) {
                charState = 'pivot';
                subLabel = '🎯 MID';
              } else if (isOut) {
                charState = 'sleeping';
                subLabel = 'ELIMINATED';
              } else if (idx === low && idx === high) {
                subLabel = 'LOW & HIGH';
              } else if (idx === low) {
                subLabel = '🚩 LOW';
              } else if (idx === high) {
                subLabel = '🚩 HIGH';
              }

              const range = Math.max(1, maxVal - minVal);
              const heightPercent = Math.round(((val - minVal) / range) * 85);

              return (
                <CartoonCharacter
                  key={`${idx}-${val}`}
                  id={`char-${idx}`}
                  value={val}
                  index={idx}
                  state={charState}
                  heightPercent={heightPercent}
                  subLabel={subLabel}
                  reducedMotion={reducedMotion}
                />
              );
            })}
          </div>

          {/* Stage Plank */}
          <div className="w-full border-t-4 border-[#DECBB5] flex justify-between items-center pt-2 px-6 text-[11px] font-mono text-[#7A6451]">
            <div>Logarithmic Interval Reduction: Halves array size every step</div>
            <div className="font-bold text-[#5C3617]">Array Size: {array.length}</div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 7. GREEDY ACTIVITY SCHEDULING CARTOON SCENE (Kids Attractive Warm Beige)
  // =========================================================================
  if (step.activityIntervals || algorithmId === 'activity_selection') {
    const activities = step.activityIntervals || [
      { id: 'A1', name: 'Lab 1', start: 1, finish: 3, isSelected: true },
      { id: 'A2', name: 'Seminar', start: 2, finish: 5, isRejected: true },
      { id: 'A3', name: 'Review', start: 0, finish: 6, isRejected: true },
      { id: 'A4', name: 'Design', start: 4, finish: 7, isSelected: true },
      { id: 'A5', name: 'Testing', start: 6, finish: 9, isSelected: false },
      { id: 'A6', name: 'Demo', start: 8, finish: 10, isSelected: true }
    ];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono font-bold mb-3 px-2">
            <span className="text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
              🟢 Scheduled Non-overlapping Activities
            </span>
            <span className="text-[#8C7460]">
              Timeline: 0 to 11 Hours
            </span>
          </div>

          <div className="space-y-2.5 w-full">
            {activities.map((act, idx) => {
              const leftPercent = (act.start / 11) * 100;
              const widthPercent = Math.max(14, ((act.finish - act.start) / 11) * 100);

              let barClass = 'bg-[#F5ECE0] border-[#DECBB5] text-[#5C3617]';
              let badge = 'PENDING';
              if (act.isSelected) {
                barClass = 'bg-emerald-500 border-emerald-600 text-white shadow-md ring-4 ring-emerald-300/40 font-black';
                badge = 'SELECTED 🏆';
              } else if (act.isRejected) {
                barClass = 'bg-rose-100 border-rose-300 text-rose-800 line-through opacity-60';
                badge = 'CLASH ✕';
              } else if (act.isExamined) {
                barClass = 'bg-amber-400 border-amber-500 text-amber-950 font-black ring-4 ring-amber-300/60 animate-pulse';
                badge = 'INSPECTING';
              }

              return (
                <div key={act.id || idx} className="w-full bg-[#FAF5EB]/90 rounded-xl p-1 border border-[#E8DAC7] relative h-11 flex items-center">
                  <div
                    style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}
                    className={`absolute h-8 rounded-lg border-2 px-2.5 flex items-center justify-between transition-all duration-300 text-xs font-mono font-bold ${barClass}`}
                  >
                    <span className="truncate">{act.name}</span>
                    <span className="text-[10px] uppercase ml-1 opacity-90">{badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full border-t-2 border-dashed border-[#DECBB5] pt-2 flex justify-between text-[11px] font-mono text-[#7A6451]">
            <span>T=0h</span>
            <span>T=3h</span>
            <span>T=6h</span>
            <span>T=9h</span>
            <span>T=11h</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 8. STRING MATCHING (KMP & Rabin-Karp) CARTOON SCENE (Warm Caramel & Biscuit)
  // =========================================================================
  if (step.stringPatternState || algorithmId === 'kmp_string_match' || algorithmId === 'rabin_karp') {
    const sp = step.stringPatternState || {
      text: 'ABABDABACDABABCABAB',
      pattern: 'ABABCABAB',
      textIndex: 0,
      patternIndex: 0,
      isMatch: false
    };

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-center items-center gap-6 overflow-x-auto">
          {/* Main Text Tape */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-[#8C7460] mb-1.5">
              SEARCH TEXT TAPE (Length {sp.text.length})
            </span>
            <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-[#FFFDFB] border-2 border-[#DECBB5] shadow-xs">
              {sp.text.split('').map((char, idx) => {
                const isUnderCursor = idx === sp.textIndex;
                return (
                  <div
                    key={idx}
                    className={`w-10 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-black text-sm border-2 transition-all duration-200 ${
                      isUnderCursor
                        ? 'bg-amber-400 border-amber-500 text-slate-950 scale-110 shadow-md ring-4 ring-amber-300/50'
                        : 'bg-[#FAF5EB] border-[#E8DAC7] text-[#5C3617]'
                    }`}
                  >
                    <span>{char}</span>
                    <span className="text-[8px] opacity-60 font-semibold">{idx}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pattern Slider Tape - Warm Toasted Caramel Tape */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono font-bold text-[#EB6100] mb-1.5">
              SLIDING PATTERN TAPE (Length {sp.pattern.length})
            </span>
            <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-[#C48247] border-2 border-[#A86E38] text-white shadow-md">
              {sp.pattern.split('').map((char, idx) => {
                const isCurrentPatternChar = idx === sp.patternIndex;
                const isMatched = sp.isMatch && isCurrentPatternChar;
                return (
                  <div
                    key={idx}
                    className={`w-10 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-black text-sm border-2 transition-all duration-200 ${
                      isMatched
                        ? 'bg-emerald-400 border-emerald-300 text-slate-950 scale-110 shadow-md ring-4 ring-emerald-300/50'
                        : isCurrentPatternChar
                        ? 'bg-amber-300 border-amber-200 text-amber-950 scale-105 shadow-xs'
                        : 'bg-[#A86E38] border-[#8C5A2B] text-white'
                    }`}
                  >
                    <span>{char}</span>
                    <span className="text-[8px] opacity-80 font-semibold">p[{idx}]</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LPS Array Display for KMP */}
          {sp.lpsTable && sp.lpsTable.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-mono bg-[#FFFDFB] px-4 py-2 rounded-xl border border-[#DECBB5] shadow-2xs">
              <span className="font-bold text-[#EB6100]">π-Table (LPS):</span>
              <span className="text-[#5C3617]">[{sp.lpsTable.join(', ')}]</span>
              <span className="text-[10px] text-[#8C7460] ml-2">(Longest Prefix Suffix fallback bounds)</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 9. MATRIX / GRID FLOOD FILL & SPIRAL CARTOON SCENE (Warm Beige & Lagoon)
  // =========================================================================
  if (step.matrixGridState || algorithmId === 'flood_fill_islands' || algorithmId === 'spiral_matrix') {
    const mg = step.matrixGridState || {
      grid: [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 1],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0]
      ],
      islandCount: 2
    };

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-4 text-xs font-mono font-bold">
            <span className="flex items-center gap-1.5 bg-[#FAF5EB] text-[#5C3617] px-3 py-1 rounded-full border border-[#DECBB5]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
              <span>Water (0)</span>
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Unvisited Land (1)</span>
            </span>
            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span>Flooded / Explored (2)</span>
            </span>
          </div>

          <div className="border-4 border-[#D4A373] rounded-2xl overflow-hidden shadow-md bg-[#FFFDFB] p-2">
            <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${mg.grid[0]?.length || 4}, minmax(0, 1fr))` }}>
              {mg.grid.map((row, rIdx) =>
                row.map((cell, cIdx) => {
                  const isActive = mg.activeCell && mg.activeCell[0] === rIdx && mg.activeCell[1] === cIdx;
                  const isWater = cell === 0;
                  const isLand = cell === 1;
                  const isFlooded = cell === 2;

                  let cellStyle = 'bg-[#FAF5EB] border-[#E8DAC7] text-[#7A6451]';
                  if (isLand) cellStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-black';
                  if (isFlooded) cellStyle = 'bg-amber-100 border-amber-400 text-amber-950 font-black';
                  if (isActive) cellStyle = 'bg-amber-400 border-amber-500 text-slate-950 scale-105 shadow-md ring-4 ring-amber-300/60 font-black';

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`w-14 h-14 rounded-xl border-2 flex flex-col items-center justify-center font-mono text-xs transition-all duration-200 select-none ${cellStyle}`}
                    >
                      {isActive ? (
                        <span className="text-xl animate-bounce">🦚</span>
                      ) : isWater ? (
                        <span className="opacity-40">🌊</span>
                      ) : (
                        <span>{cell}</span>
                      )}
                      <span className="text-[8px] opacity-60">[{rIdx},{cIdx}]</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="text-xs font-mono text-[#7A6451] font-bold">
            {mg.islandCount !== undefined ? `Connected Islands Counted: ${mg.islandCount}` : 'Matrix Navigation Active'}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 10. MINIMAX & GAME TREE CARTOON SCENE (Warm Beige & Purple)
  // =========================================================================
  if (step.minimaxTreeState || algorithmId === 'minimax_alphabeta' || algorithmId === 'game_of_nim') {
    const nodes = step.minimaxTreeState?.nodes || [
      { id: 'root', label: 'Root (MAX)', depth: 0, isMax: true, value: 6, isCurrent: true },
      { id: 'left_min', label: 'Left (MIN)', depth: 1, isMax: false, value: 3 },
      { id: 'right_min', label: 'Right (MIN)', depth: 1, isMax: false, value: 6 }
    ];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono font-bold mb-2">
            <span className="bg-[#FAF5EB] text-[#5C3617] px-3 py-1 rounded-full border border-[#DECBB5] flex items-center gap-1 shadow-2xs">
              👑 MAX Player (Maximize Profit)
            </span>
            <span className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full border border-purple-200 flex items-center gap-1 shadow-2xs">
              🛡️ MIN Player (Minimize Opponent)
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 my-auto">
            {nodes.map(n => {
              const isCur = n.isCurrent;
              return (
                <div
                  key={n.id}
                  className={`w-32 h-24 rounded-2xl border-2 p-3 flex flex-col items-center justify-between font-mono transition-all duration-300 shadow-xs ${
                    n.isMax
                      ? 'bg-[#FAF5EB] border-[#D4A373] text-[#4A240A]'
                      : 'bg-purple-50 border-purple-400 text-purple-950'
                  } ${isCur ? 'ring-4 ring-amber-400 scale-108 shadow-md' : ''}`}
                >
                  <div className="text-[10px] font-extrabold uppercase flex items-center gap-1">
                    <span>{n.isMax ? '👑 MAX' : '🛡️ MIN'}</span>
                    {isCur && <span className="text-amber-600 animate-pulse">👈 ACTIVE</span>}
                  </div>
                  <div className="text-lg font-black">{n.value !== undefined ? n.value : '?'}</div>
                  <div className="text-[9px] opacity-70 font-semibold">{n.label}</div>
                </div>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[#7A6451] font-semibold">
            Alpha-Beta Pruning Cutoff Rule: If α &ge; β, prune remaining branches!
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11. EUCLIDEAN GCD & NUMBER THEORY CARTOON SCENE (Warm Biscuit Math)
  // =========================================================================
  if (step.mathEquationState || algorithmId === 'euclidean_gcd' || algorithmId === 'sieve_eratosthenes') {
    const eq = step.mathEquationState || { a: 48, b: 18, quotient: 2, remainder: 12, equation: '48 = 2 × 18 + 12' };

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[360px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col items-center justify-center gap-6">
          <div className="text-xs font-mono font-bold text-[#8C4A19] bg-[#FAF5EB] px-4 py-1.5 rounded-full border border-[#E8DAC7] shadow-2xs">
            Euclidean Invariant: gcd(a, b) = gcd(b, a % b)
          </div>

          {/* Division Chamber Boxes */}
          <div className="flex items-center gap-4 text-center font-mono">
            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-[#D4A373] p-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-[10px] text-[#8C7460] font-bold uppercase">Dividend (a)</span>
              <span className="text-2xl font-black text-[#5C3617] mt-1">{eq.a}</span>
            </div>

            <div className="text-2xl font-black text-[#A89482]">=</div>

            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-amber-300 p-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-[10px] text-[#8C7460] font-bold uppercase">Divisor (b)</span>
              <span className="text-2xl font-black text-amber-900 mt-1">{eq.b}</span>
            </div>

            <div className="text-2xl font-black text-[#A89482]">× {eq.quotient} +</div>

            <div className="w-24 h-24 rounded-2xl bg-white border-2 border-rose-300 p-3 flex flex-col items-center justify-center shadow-xs">
              <span className="text-[10px] text-[#8C7460] font-bold uppercase">Remainder (r)</span>
              <span className="text-2xl font-black text-rose-900 mt-1">{eq.remainder}</span>
            </div>
          </div>

          {/* Equation Banner */}
          <div className="px-6 py-2.5 bg-[#FFFDFB] border-2 border-[#DFCDB8] rounded-2xl font-mono text-sm font-extrabold text-[#4A240A] shadow-xs">
            {eq.equation}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11b. BRANCH AND BOUND STATE-SPACE TREE SCENE (Unit 03: Knapsack & TSP B&B)
  // =========================================================================
  if (algorithmId === 'knapsack_branch_bound' || algorithmId === 'tsp_branch_bound') {
    const isKnapsack = algorithmId === 'knapsack_branch_bound';
    const subproblem = step.variables.subproblem || step.variables.branch || 'State Space Exploration';
    const bound = step.variables.upper_bound || step.variables.lower_bound || '9.4';
    const bestVal = step.variables.best_value || step.variables.best_known || '0';
    const isPruned = step.variables.status?.includes('PRUNED') || step.variables.action?.includes('Discard') || step.description.includes('Prune');
    const nodesExplored = step.stepIndex + 1;

    // Simulated state space tree nodes for visual representation
    const treeNodes = [
      { id: 'root', label: 'Root (0)', wt: '0', val: '0', bound: '9.4', status: 'explored', x: 50, y: 15 },
      { id: 'n1', label: 'Item 1 IN', wt: '2', val: '3', bound: '9.4', status: step.stepIndex >= 1 ? 'active' : 'pending', x: 26, y: 45 },
      { id: 'n2', label: 'Item 1 OUT', wt: '0', val: '0', bound: '8.6', status: step.stepIndex >= 2 ? (step.stepIndex >= 6 ? 'pruned' : 'enqueued') : 'pending', x: 74, y: 45 },
      { id: 'n3', label: 'Item 2 IN', wt: '5', val: '7', bound: '7.0', status: step.stepIndex >= 3 ? 'feasible' : 'pending', x: 14, y: 75 },
      { id: 'n4', label: 'Item 3 IN', wt: '6>5', val: '8', bound: '-', status: step.stepIndex >= 4 ? 'pruned' : 'pending', x: 38, y: 75 },
      { id: 'n5', label: 'Item 4 IN', wt: '5', val: '8', bound: '8.0', status: step.stepIndex >= 5 ? 'optimal' : 'pending', x: 86, y: 75 }
    ];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[420px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Header Metric Strip */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E5DCF9]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-2.5 py-1 rounded-xl border border-[#D4C7F5] flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#7B42F6]" />
                <span>{isKnapsack ? 'LC Branch & Bound (Knapsack)' : 'Reduced Matrix TSP'}</span>
              </span>
              <span className="text-xs font-mono text-[#5B507A]">
                Subproblem: <strong className="text-[#201538]">{subproblem}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-mono font-bold">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span>{isKnapsack ? 'Upper Bound' : 'Lower Bound'}: {bound}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                <span>Best Solution: {bestVal}</span>
              </div>
            </div>
          </div>

          {/* State Space Tree Visualization Stage */}
          <div className="relative w-full h-[270px] my-2 bg-[#FAF7FD] rounded-2xl border border-[#E5DCF9] p-4 overflow-hidden">
            {/* SVG Connecting Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1="20%" x2="26%" y2="50%" stroke="#D4C7F5" strokeWidth="2.5" />
              <line x1="50%" y1="20%" x2="74%" y2="50%" stroke="#D4C7F5" strokeWidth="2.5" />
              <line x1="26%" y1="50%" x2="14%" y2="80%" stroke="#D4C7F5" strokeWidth="2.5" />
              <line x1="26%" y1="50%" x2="38%" y2="80%" stroke="#D4C7F5" strokeWidth="2.5" />
              <line x1="74%" y1="50%" x2="86%" y2="80%" stroke="#D4C7F5" strokeWidth="2.5" />
            </svg>

            {/* Tree Nodes */}
            {treeNodes.map(node => {
              let nodeStyle = 'bg-white border-[#D4C7F5] text-[#5B507A]';
              let badge = '';

              if (node.status === 'optimal') {
                nodeStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-4 ring-emerald-300/50 shadow-md scale-105';
                badge = '🏆 BEST';
              } else if (node.status === 'active') {
                nodeStyle = 'bg-[#EDE8FE] border-[#7B42F6] text-[#7B42F6] font-black ring-4 ring-purple-300/50 shadow-md scale-105';
                badge = '● ACTIVE';
              } else if (node.status === 'pruned') {
                nodeStyle = 'bg-rose-50 border-rose-400 text-rose-800 opacity-80';
                badge = '✂️ PRUNED';
              } else if (node.status === 'feasible') {
                nodeStyle = 'bg-amber-50 border-amber-400 text-amber-900 font-bold';
                badge = '✓ FEASIBLE';
              } else if (node.status === 'enqueued') {
                nodeStyle = 'bg-sky-50 border-sky-400 text-sky-900';
                badge = 'PQ ENQUEUE';
              }

              return (
                <div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`px-3 py-1.5 rounded-2xl border-2 text-center text-xs font-mono shadow-xs transition-all duration-300 min-w-[100px] z-10 ${nodeStyle}`}
                >
                  <div className="font-extrabold text-[11px] truncate">{node.label}</div>
                  <div className="text-[9px] opacity-80">wt:{node.wt} val:{node.val} bnd:{node.bound}</div>
                  {badge && (
                    <div className="text-[8px] font-extrabold uppercase mt-0.5 tracking-wider">
                      {badge}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Pruning & State Invariant Bar */}
          <div className="w-full flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E5DCF9] text-[11px] font-mono">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#201538]">Bounding Invariant:</span>
              <span className="text-[#5B507A]">
                {isKnapsack ? 'Upper Bound = v + (W - w) × (v_{i+1}/w_{i+1})' : 'Lower Bound = Parent + cost(i,j) + sum(reductions)'}
              </span>
            </div>

            <div className="text-[#7B42F6] font-bold">
              Subproblem Tree Nodes Explored: {nodesExplored} / 6
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11c. ASYMPTOTIC COMPLEXITY GROWTH RACE ARENA (Unit 01: Asymptotic Analysis)
  // =========================================================================
  if (algorithmId === 'asymptotic_growth') {
    const activeClass = step.variables['Class'] || 'O(1) Constant';
    const complexityLanes = [
      { name: 'O(1) Constant', color: 'bg-emerald-500', textCol: 'text-emerald-700', n16: '1 ops', speed: 95, icon: '⚡' },
      { name: 'O(log n) Logarithmic', color: 'bg-teal-500', textCol: 'text-teal-700', n16: '4 ops', speed: 85, icon: '🚀' },
      { name: 'O(n) Linear', color: 'bg-sky-500', textCol: 'text-sky-700', n16: '16 ops', speed: 65, icon: '🏃' },
      { name: 'O(n log n) Linearithmic', color: 'bg-[#7B42F6]', textCol: 'text-[#7B42F6]', n16: '64 ops', speed: 45, icon: '🚴' },
      { name: 'O(n²) Quadratic', color: 'bg-amber-500', textCol: 'text-amber-700', n16: '256 ops', speed: 20, icon: '🐢' },
      { name: 'O(2ⁿ) Exponential', color: 'bg-rose-500', textCol: 'text-rose-700', n16: '65,536 ops', speed: 5, icon: '🛑' }
    ];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[400px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DCF9]">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#7B42F6]" />
              <h4 className="text-xs font-mono font-black text-[#201538] uppercase tracking-wider">
                Asymptotic Growth Race Track (n = 16)
              </h4>
            </div>
            <span className="text-[11px] font-mono text-[#887D9F]">
              Hierarchy: O(1) &lt; O(log n) &lt; O(n) &lt; O(n log n) &lt; O(n²) &lt; O(2ⁿ)
            </span>
          </div>

          {/* 6 Comparative Race Lanes */}
          <div className="space-y-2.5">
            {complexityLanes.map((lane, idx) => {
              const isActive = activeClass.includes(lane.name.split(' ')[0]);
              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? 'bg-white border-[#7B42F6] ring-4 ring-purple-200 shadow-sm scale-101'
                      : 'bg-[#FAF7FD] border-[#E5DCF9] opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <div className="flex items-center gap-2 font-black">
                      <span>{lane.icon}</span>
                      <span className={lane.textCol}>{lane.name}</span>
                    </div>
                    <span className="font-extrabold text-[#201538] bg-white px-2 py-0.5 rounded-lg border border-[#E5DCF9]">
                      f(16) = {lane.n16}
                    </span>
                  </div>

                  {/* Race Track Bar */}
                  <div className="w-full h-3.5 bg-[#EFEAFB] rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: `${lane.speed}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${lane.color}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-[#FFFDFB] rounded-xl border border-[#E5DCF9] text-xs font-mono text-[#5B507A] flex justify-between items-center">
            <span><strong>KCT Autonomous Rule:</strong> Higher-order terms dominate lower-order terms as n → ∞.</span>
            <span className="text-[#7B42F6] font-bold">Step {step.stepIndex + 1} of {step.totalSteps}</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11d. MASTER THEOREM BALANCE SCALE SCENE (Unit 01: Master Theorem)
  // =========================================================================
  if (algorithmId === 'master_theorem' || algorithmId === 'master_theorem_sim') {
    const a = step.variables['Subproblems (a)'] || '2';
    const b = step.variables['Shrink Factor (b)'] || '2';
    const d = step.variables['Work per Level (d)'] || 'n¹ (d = 1)';
    const logVal = step.variables['log_b(a)'] || 'log₂(2) = 1.0';

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[380px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center space-y-4">
          <div className="text-xs font-mono font-bold text-[#7B42F6] bg-[#EDE8FE] px-4 py-1.5 rounded-full border border-[#D4C7F5]">
            Master Theorem Form: T(n) = a·T(n/b) + Θ(n^d)
          </div>

          {/* Master Theorem Weighing Scale Visual */}
          <div className="w-full max-w-2xl bg-white border-2 border-[#E5DCF9] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center font-mono">
              {/* Left Scale Pan: Leaf Work */}
              <div className="p-4 rounded-xl bg-[#F8F6FE] border-2 border-[#7B42F6] space-y-1">
                <span className="text-[10px] text-[#7B6E96] uppercase font-bold tracking-wider block">
                  Leaf Subproblem Growth
                </span>
                <span className="text-xl font-black text-[#7B42F6] block">
                  n^(log_b a) = n¹
                </span>
                <span className="text-[11px] text-[#5B507A] block">
                  Subproblems a = {a}, shrink b = {b}
                </span>
              </div>

              {/* Right Scale Pan: Root Work */}
              <div className="p-4 rounded-xl bg-amber-50/70 border-2 border-amber-400 space-y-1">
                <span className="text-[10px] text-amber-800 uppercase font-bold tracking-wider block">
                  Root Combining Work f(n)
                </span>
                <span className="text-xl font-black text-amber-950 block">
                  f(n) = Θ(n^d)
                </span>
                <span className="text-[11px] text-amber-900 block">
                  Merge Work d = 1 (f(n) = n)
                </span>
              </div>
            </div>

            {/* Scale Balance Indicator */}
            <div className="p-3 bg-[#EBF7E3] rounded-xl border border-[#C5E1A5] text-xs font-mono text-center font-bold text-[#1B5E20]">
              ⚖️ Exponents Match: log_b(a) == d == 1.0 ⇒ CASE 2 APPLIES: T(n) = Θ(n log n)
            </div>
          </div>

          <div className="text-xs font-mono text-[#5B507A]">
            KCT Exam Proof: MergeSort splits into 2 subproblems of size n/2 and combines in linear O(n) time.
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11e. DYNAMIC ARRAY DOUBLING & AMORTIZED BANK VAULT (Unit 05: Extensions)
  // =========================================================================
  if (algorithmId === 'dynamic_array_amortized') {
    const size = step.variables['Size'] || '0';
    const capacity = step.variables['Capacity'] || '2';
    const event = step.variables['Event'] || 'Element Insertion';
    const instantCost = step.variables['Instant Cost'] || '1';

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[380px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E5DCF9]">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-[#F5B800]" />
              <h4 className="text-xs font-mono font-black text-[#201538] uppercase tracking-wider">
                Amortized Banker&apos;s Credit Method (O(1) Average)
              </h4>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span className="bg-[#EDE8FE] text-[#7B42F6] px-2.5 py-0.5 rounded-lg border border-[#D4C7F5]">
                Size: {size}
              </span>
              <span className="bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-lg border border-amber-300">
                Capacity: {capacity}
              </span>
            </div>
          </div>

          {/* Dynamic Array Memory Buffer Cells */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-[#887D9F] uppercase tracking-wider block">
              Contiguous RAM Buffer (Capacity: {capacity}):
            </span>

            <div className="flex flex-wrap gap-2">
              {array.map((val, idx) => {
                const isOccupied = idx < Number(size);
                const isRecentlyWritten = idx === Number(size) - 1;

                return (
                  <div
                    key={idx}
                    className={`w-14 h-16 rounded-xl border-2 font-mono flex flex-col items-center justify-center transition-all ${
                      isRecentlyWritten
                        ? 'bg-[#EDE8FE] border-[#7B42F6] text-[#7B42F6] font-black ring-4 ring-purple-200 scale-105 shadow-sm'
                        : isOccupied
                        ? 'bg-white border-[#D4C7F5] text-[#201538] font-bold shadow-2xs'
                        : 'bg-[#F4F0FF]/60 border-dashed border-[#D4C7F5] text-[#887D9F]'
                    }`}
                  >
                    <span className="text-[9px] opacity-70">[{idx}]</span>
                    <span className="text-sm font-extrabold">{isOccupied ? val : '·'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Amortized Credit Bank Box */}
          <div className="p-4 bg-[#FFFDFB] rounded-2xl border-2 border-[#E5DCF9] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="space-y-0.5">
              <div className="font-bold text-[#201538] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F5B800]" />
                <span>Accounting Method: 3 Tokens per Write</span>
              </div>
              <p className="text-[11px] text-[#5B507A]">
                1 Token pays for instant insertion; 2 Tokens deposited in bank to pay for future doubling copy.
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[#887D9F] block uppercase">Instant Cost</span>
              <span className="text-lg font-black text-[#7B42F6]">{instantCost} ops</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11f. VERTEX COVER 2-APPROXIMATION (Unit 04: Complexity Theory)
  // =========================================================================
  if (algorithmId === 'vertex_cover_approx') {
    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[380px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center space-y-4">
          <div className="w-full flex items-center justify-between pb-2 border-b border-[#E5DCF9]">
            <span className="text-xs font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-2.5 py-1 rounded-xl border border-[#D4C7F5]">
              Vertex Cover 2-Approximation (NP-Complete Heuristic)
            </span>
            <span className="text-xs font-mono font-bold text-[#10B981] bg-[#EBF7E3] px-2.5 py-0.5 rounded-full border border-[#C5E1A5]">
              Guaranteed Bound: |C| ≤ 2 · OPT
            </span>
          </div>

          {/* Graph Visualization */}
          <div className="w-full max-w-lg h-56 bg-white border-2 border-[#E5DCF9] rounded-2xl relative p-4 flex items-center justify-center">
            {/* Vertices */}
            <div className="absolute top-6 left-12 w-10 h-10 rounded-full bg-[#7B42F6] text-white font-mono font-black flex items-center justify-center shadow-md">
              A
            </div>
            <div className="absolute top-6 right-12 w-10 h-10 rounded-full bg-[#7B42F6] text-white font-mono font-black flex items-center justify-center shadow-md">
              B
            </div>
            <div className="absolute bottom-6 left-20 w-10 h-10 rounded-full bg-[#EDE8FE] text-[#7B42F6] font-mono font-black border-2 border-[#7B42F6] flex items-center justify-center shadow-xs">
              C
            </div>
            <div className="absolute bottom-6 right-20 w-10 h-10 rounded-full bg-[#EDE8FE] text-[#7B42F6] font-mono font-black border-2 border-[#7B42F6] flex items-center justify-center shadow-xs">
              D
            </div>
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#7B42F6] text-white font-mono font-black flex items-center justify-center shadow-md">
              E
            </div>

            <div className="text-center font-mono text-xs text-[#5B507A] space-y-1">
              <span className="font-extrabold text-[#201538] block">Greedy Edge Selection: (u, v)</span>
              <span>Pick arbitrary edge (A, B) → Add BOTH endpoints to cover C.</span>
              <span className="block text-[11px] text-[#7B42F6] font-bold">Discard all incident edges to A and B.</span>
            </div>
          </div>

          <div className="w-full p-3 bg-[#FAF7FD] rounded-xl border border-[#E5DCF9] text-xs font-mono text-center text-[#5B507A]">
            Proof: Any valid vertex cover must select at least one endpoint of each disjoint edge in maximal matching M. Hence OPT ≥ |M|, and |C| = 2|M| ≤ 2·OPT.
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11g. KARATSUBA FAST MULTIPLICATION (Unit 02: Divide & Conquer)
  // =========================================================================
  if (algorithmId === 'karatsuba_mult') {
    const stepIdx = step.stepIndex ?? 0;
    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[420px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center space-y-4">
          <div className="w-full flex flex-wrap items-center justify-between pb-3 border-b border-[#E5DCF9] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span className="text-xs font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-xl border border-[#D4C7F5]">
                Karatsuba Fast Integer Multiplication · T(n) = 3T(n/2) + O(n)
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              O(n^1.585) vs Grade School O(n²)
            </span>
          </div>

          {/* Primary Split Stage */}
          <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Number X */}
            <div className="p-4 rounded-2xl bg-white border-2 border-[#E5DCF9] shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-black text-[#201538]">Integer X = 1234</span>
                <span className="text-[#7B42F6] font-bold">m = 2 digits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#EDE8FE] border-2 border-[#7B42F6] p-2.5 rounded-xl text-center">
                  <div className="text-[10px] font-mono text-[#5B507A]">High Half (a)</div>
                  <div className="text-lg font-mono font-black text-[#7B42F6]">12</div>
                </div>
                <span className="text-lg font-bold text-[#D4C7F5]">+</span>
                <div className="flex-1 bg-[#F4F0FF] border-2 border-[#D4C7F5] p-2.5 rounded-xl text-center">
                  <div className="text-[10px] font-mono text-[#5B507A]">Low Half (b)</div>
                  <div className="text-lg font-mono font-black text-[#201538]">34</div>
                </div>
              </div>
            </div>

            {/* Number Y */}
            <div className="p-4 rounded-2xl bg-white border-2 border-[#E5DCF9] shadow-xs space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="font-black text-[#201538]">Integer Y = 5678</span>
                <span className="text-[#10B981] font-bold">m = 2 digits</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#ECFDF5] border-2 border-[#10B981] p-2.5 rounded-xl text-center">
                  <div className="text-[10px] font-mono text-[#065F46]">High Half (c)</div>
                  <div className="text-lg font-mono font-black text-[#10B981]">56</div>
                </div>
                <span className="text-lg font-bold text-[#D4C7F5]">+</span>
                <div className="flex-1 bg-[#F0FDF4] border-2 border-[#A7F3D0] p-2.5 rounded-xl text-center">
                  <div className="text-[10px] font-mono text-[#065F46]">Low Half (d)</div>
                  <div className="text-lg font-mono font-black text-[#201538]">78</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Karatsuba Multiplication Pods */}
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              stepIdx >= 2 ? 'bg-white border-[#7B42F6] shadow-sm animate-pulse-glow' : 'bg-[#FAF7FD] border-[#E5DCF9]'
            }`}>
              <div className="text-[10px] font-mono font-black text-[#7B42F6] uppercase">Pod 1: z2 = a × c</div>
              <div className="text-base font-mono font-black text-[#201538] mt-1">12 × 56 = 672</div>
              <div className="text-[11px] text-[#5B507A] mt-1">Weighted by 10⁴</div>
            </div>

            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              stepIdx >= 2 ? 'bg-white border-[#10B981] shadow-sm animate-pulse-glow-emerald' : 'bg-[#FAF7FD] border-[#E5DCF9]'
            }`}>
              <div className="text-[10px] font-mono font-black text-[#10B981] uppercase">Pod 2: z0 = b × d</div>
              <div className="text-base font-mono font-black text-[#201538] mt-1">34 × 78 = 2,652</div>
              <div className="text-[11px] text-[#5B507A] mt-1">Weighted by 10⁰ (Units)</div>
            </div>

            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              stepIdx >= 3 ? 'bg-white border-[#F5B800] shadow-sm animate-pulse-glow-gold' : 'bg-[#FAF7FD] border-[#E5DCF9]'
            }`}>
              <div className="text-[10px] font-mono font-black text-[#8C5300] uppercase">Pod 3: Karatsuba Trick (z1)</div>
              <div className="text-base font-mono font-black text-[#201538] mt-1">6164 - 672 - 2652</div>
              <div className="text-[11px] font-bold text-[#8C5300] mt-1">= 2,840 (No 4th mult!)</div>
            </div>
          </div>

          {/* Final Combined Formula Bar */}
          <div className="w-full p-4 bg-gradient-to-r from-[#EDE8FE] via-[#F4F0FF] to-[#ECFDF5] rounded-2xl border-2 border-[#D4C7F5] flex flex-wrap items-center justify-between gap-3 font-mono">
            <div>
              <div className="text-xs text-[#5B507A]">Final Stitched Product (z2·10⁴ + z1·10² + z0):</div>
              <div className="text-lg font-black text-[#201538]">
                6,720,000 + 284,000 + 2,652 = <span className="text-[#7B42F6]">7,006,652</span>
              </div>
            </div>
            <div className="text-xs font-bold text-[#10B981] bg-white px-3 py-1.5 rounded-xl border border-[#A7F3D0] shadow-2xs">
              ✓ Verified Exact Match
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11h. CLOSEST PAIR OF 2D POINTS (Unit 02: Divide & Conquer)
  // =========================================================================
  if (algorithmId === 'closest_pair') {
    const points = [
      { id: 'P1', x: 2, y: 3, px: 20, py: 75, group: 'left' },
      { id: 'P6', x: 3, y: 4, px: 28, py: 65, group: 'left' },
      { id: 'P4', x: 5, y: 1, px: 42, py: 85, group: 'left' },
      { id: 'P5', x: 12, y: 10, px: 65, py: 45, group: 'right' },
      { id: 'P2', x: 12, y: 30, px: 68, py: 25, group: 'right' },
      { id: 'P3', x: 40, y: 50, px: 88, py: 15, group: 'right' }
    ];

    const stepIdx = step.stepIndex ?? 0;

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[420px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center space-y-4">
          <div className="w-full flex flex-wrap items-center justify-between pb-3 border-b border-[#E5DCF9] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <span className="text-xs font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-xl border border-[#D4C7F5]">
                Closest Pair of 2D Points · Divide-and-Conquer Canvas
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              Minimal δ = 1.414 (P1 ↔ P6)
            </span>
          </div>

          {/* 2D Coordinate Plane */}
          <div className="w-full max-w-2xl h-64 bg-white border-2 border-[#E5DCF9] rounded-2xl relative overflow-hidden shadow-inner flex items-center justify-center">
            {/* Left Subplane Tint */}
            <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#F8F6FE]/60 border-r border-dashed border-[#7B42F6]/60 flex items-start p-2">
              <span className="text-[10px] font-mono font-bold text-[#7B42F6]">Left Plane (x &lt; 8.5)</span>
            </div>

            {/* Right Subplane Tint */}
            <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#FFFDF5]/60 flex items-start justify-end p-2">
              <span className="text-[10px] font-mono font-bold text-[#8C5300]">Right Plane (x &gt; 8.5)</span>
            </div>

            {/* Central Delta Strip */}
            <div className="absolute top-0 bottom-0 left-[42%] right-[42%] bg-[#ECFDF5]/50 border-x-2 border-emerald-400 pointer-events-none flex flex-col items-center justify-end pb-1">
              <span className="text-[9px] font-mono font-black text-[#047857] bg-white px-1.5 py-0.5 rounded shadow-2xs">
                Strip [L-δ, L+δ]
              </span>
            </div>

            {/* Connecting Measuring Ruler between P1 and P6 */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="20%"
                y1="75%"
                x2="28%"
                y2="65%"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
              <text x="24%" y="67%" fill="#047857" fontSize="10" fontWeight="bold" fontFamily="monospace">
                δ=1.414
              </text>
            </svg>

            {/* Plotted Points */}
            {points.map((pt) => {
              const isWinner = pt.id === 'P1' || pt.id === 'P6';
              return (
                <div
                  key={pt.id}
                  style={{ left: `${pt.px}%`, top: `${pt.py}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all ${
                    isWinner ? 'scale-110 z-20' : 'z-10'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-black text-[11px] shadow-sm transition-transform group-hover:scale-125 ${
                    isWinner
                      ? 'bg-[#10B981] text-white ring-4 ring-[#10B981]/40 animate-pulse'
                      : pt.group === 'left'
                      ? 'bg-[#7B42F6] text-white'
                      : 'bg-[#F5B800] text-[#201538]'
                  }`}>
                    {pt.id}
                  </div>
                  <span className="text-[9px] font-mono font-bold text-[#201538] bg-white/90 px-1 rounded shadow-2xs mt-0.5 whitespace-nowrap">
                    ({pt.x},{pt.y})
                  </span>
                </div>
              );
            })}
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 bg-white border border-[#E5DCF9] rounded-xl text-center">
              <span className="text-[#7B42F6] font-bold block">Left Pair (P1, P6)</span>
              <span className="text-base font-black text-[#201538]">d_left = 1.414</span>
            </div>
            <div className="p-3 bg-white border border-[#E5DCF9] rounded-xl text-center">
              <span className="text-[#8C5300] font-bold block">Right Pair (P5, P2)</span>
              <span className="text-base font-black text-[#201538]">d_right = 20.00</span>
            </div>
            <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-center">
              <span className="text-[#047857] font-bold block">Minimal δ Boundary</span>
              <span className="text-base font-black text-[#047857]">δ = min(1.41, 20) = 1.41</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11i. FRACTIONAL KNAPSACK (Unit 02: Greedy Paradigm)
  // =========================================================================
  if (algorithmId === 'fractional_knapsack') {
    const stepIdx = step.stepIndex ?? 0;
    const capacity = 50;
    const currentWeight = stepIdx === 0 ? 0 : stepIdx === 1 ? 10 : stepIdx === 2 ? 30 : 50;
    const currentVal = stepIdx === 0 ? 0 : stepIdx === 1 ? 60 : stepIdx === 2 ? 160 : 240;

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[420px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center space-y-4">
          <div className="w-full flex flex-wrap items-center justify-between pb-3 border-b border-[#E5DCF9] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎒</span>
              <span className="text-xs font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-xl border border-[#D4C7F5]">
                Fractional Knapsack · Greedy Value Density Optimization
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#F5B800] bg-[#FFF7D6] px-3 py-1 rounded-full border border-[#FFE082]">
              Greedy Choice: Pick Max (Value/Weight)
            </span>
          </div>

          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Knapsack Container with Animated Fill Gauge */}
            <div className="md:col-span-5 bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm flex flex-col items-center space-y-3">
              <span className="text-xs font-mono font-black text-[#201538]">
                KNAPSACK SACK (Max 50 kg)
              </span>

              <div className="w-36 h-48 rounded-b-3xl border-4 border-[#7B42F6] bg-[#F8F6FE] relative overflow-hidden flex flex-col justify-end shadow-inner">
                {/* Liquid / Ore Fill Level */}
                <div
                  className="w-full bg-gradient-to-t from-[#7B42F6] to-[#10B981] transition-all duration-500 rounded-b-2xl relative"
                  style={{ height: `${(currentWeight / capacity) * 100}%` }}
                >
                  <div className="absolute top-1 left-0 right-0 text-center text-white text-[11px] font-mono font-black drop-shadow">
                    {currentWeight} / 50 kg
                  </div>
                </div>
              </div>

              <div className="text-center font-mono">
                <span className="text-xs text-[#5B507A] block">Accumulated Profit</span>
                <span className="text-2xl font-black text-[#10B981]">${currentVal}</span>
              </div>
            </div>

            {/* Items Sorted by Value Density Ratio */}
            <div className="md:col-span-7 space-y-3">
              <span className="text-xs font-mono font-bold text-[#5B507A] block">
                Precious Materials (Sorted by Value / Weight):
              </span>

              <div className="space-y-2">
                <div className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  stepIdx >= 1 ? 'bg-[#ECFDF5] border-[#10B981] shadow-xs' : 'bg-white border-[#E5DCF9]'
                }`}>
                  <div>
                    <div className="text-xs font-bold text-[#201538]">1. Platinum Ore (Ratio: $6.0/kg)</div>
                    <div className="text-[11px] font-mono text-[#5B507A]">Weight: 10 kg · Value: $60</div>
                  </div>
                  <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full ${
                    stepIdx >= 1 ? 'bg-[#10B981] text-white' : 'bg-[#EDE8FE] text-[#7B42F6]'
                  }`}>
                    {stepIdx >= 1 ? 'TAKEN 100%' : 'READY'}
                  </span>
                </div>

                <div className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  stepIdx >= 2 ? 'bg-[#ECFDF5] border-[#10B981] shadow-xs' : 'bg-white border-[#E5DCF9]'
                }`}>
                  <div>
                    <div className="text-xs font-bold text-[#201538]">2. Gold Dust (Ratio: $5.0/kg)</div>
                    <div className="text-[11px] font-mono text-[#5B507A]">Weight: 20 kg · Value: $100</div>
                  </div>
                  <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full ${
                    stepIdx >= 2 ? 'bg-[#10B981] text-white' : 'bg-[#EDE8FE] text-[#7B42F6]'
                  }`}>
                    {stepIdx >= 2 ? 'TAKEN 100%' : 'READY'}
                  </span>
                </div>

                <div className={`p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  stepIdx >= 3 ? 'bg-[#FFF7D6] border-[#F5B800] shadow-xs' : 'bg-white border-[#E5DCF9]'
                }`}>
                  <div>
                    <div className="text-xs font-bold text-[#201538]">3. Silver Bars (Ratio: $4.0/kg)</div>
                    <div className="text-[11px] font-mono text-[#5B507A]">Weight: 30 kg · Value: $120</div>
                  </div>
                  <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full ${
                    stepIdx >= 3 ? 'bg-[#F5B800] text-[#201538]' : 'bg-[#EDE8FE] text-[#7B42F6]'
                  }`}>
                    {stepIdx >= 3 ? 'CUT 20/30 (66.7%) ✂️' : 'READY'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 11j. HUFFMAN CODING (Unit 02: Greedy Paradigm)
  // =========================================================================
  if (algorithmId === 'huffman_coding') {
    const stepIdx = step.stepIndex ?? 0;
    const codes = [
      { char: 'A', freq: 45, code: '0', bits: 1 },
      { char: 'B', freq: 13, code: '101', bits: 3 },
      { char: 'C', freq: 12, code: '100', bits: 3 },
      { char: 'D', freq: 16, code: '111', bits: 3 },
      { char: 'E', freq: 9, code: '1101', bits: 4 },
      { char: 'F', freq: 5, code: '1100', bits: 4 }
    ];

    return (
      <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
        <SpeechBubble
          currentStep={step}
          description={step.description}
          variables={step.variables}
          algorithmName={algorithmName}
          stepIndex={step.stepIndex}
          totalSteps={step.totalSteps}
        />

        <div className="w-full min-h-[420px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center space-y-4">
          <div className="w-full flex flex-wrap items-center justify-between pb-3 border-b border-[#E5DCF9] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌲</span>
              <span className="text-xs font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-xl border border-[#D4C7F5]">
                Huffman Optimal Prefix Code Tree · Lossless Data Compression
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#10B981] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
              25.3% Storage Bit Reduction
            </span>
          </div>

          {/* Priority Queue Nodes Strip */}
          <div className="w-full flex items-center justify-center gap-2 flex-wrap">
            {codes.map(c => (
              <div
                key={c.char}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center min-w-[70px] shadow-2xs transition-all ${
                  c.char === 'A'
                    ? 'bg-[#EDE8FE] border-[#7B42F6] text-[#7B42F6]'
                    : 'bg-white border-[#E5DCF9] text-[#201538]'
                }`}
              >
                <span className="text-base font-black">{c.char}</span>
                <span className="text-[10px] font-mono text-[#5B507A]">f={c.freq}</span>
                <span className="text-[10px] font-mono font-black text-[#10B981] bg-[#ECFDF5] px-1.5 rounded mt-1">
                  {c.code}
                </span>
              </div>
            ))}
          </div>

          {/* Huffman Binary Tree Visualization */}
          <div className="w-full max-w-xl bg-white border-2 border-[#E5DCF9] rounded-2xl p-4 shadow-sm relative h-48 flex items-center justify-center font-mono">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Branch connecting lines */}
              <line x1="50%" y1="20%" x2="30%" y2="50%" stroke="#7B42F6" strokeWidth="2" />
              <line x1="50%" y1="20%" x2="70%" y2="50%" stroke="#7B42F6" strokeWidth="2" />
              <text x="38%" y="32%" fill="#7B42F6" fontSize="11" fontWeight="bold">0</text>
              <text x="62%" y="32%" fill="#7B42F6" fontSize="11" fontWeight="bold">1</text>
            </svg>

            {/* Root Node */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#7B42F6] text-white flex flex-col items-center justify-center shadow-md z-10">
              <span className="text-[9px] font-normal opacity-80">Root</span>
              <span className="text-xs font-black">100</span>
            </div>

            {/* Left Leaf (Character A) */}
            <div className="absolute top-24 left-[24%] w-12 h-12 rounded-2xl bg-[#ECFDF5] border-2 border-[#10B981] text-[#047857] flex flex-col items-center justify-center shadow-sm z-10">
              <span className="text-sm font-black">A:45</span>
              <span className="text-[9px] font-bold">code: 0</span>
            </div>

            {/* Right Subtree Node */}
            <div className="absolute top-24 right-[24%] w-12 h-12 rounded-full bg-[#EDE8FE] border-2 border-[#7B42F6] text-[#7B42F6] flex flex-col items-center justify-center shadow-sm z-10">
              <span className="text-xs font-black">55</span>
            </div>
          </div>

          {/* Code dictionary summary */}
          <div className="w-full p-3 bg-[#FAF7FD] rounded-xl border border-[#E5DCF9] text-xs font-mono flex flex-wrap justify-between items-center text-[#5B507A] gap-2">
            <span>Optimal Prefix Property: No codeword is a prefix of any other codeword.</span>
            <span className="font-bold text-[#7B42F6]">Weighted Path Length WPL = 224 bits</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 12. SORTING & GENERAL ALGORITHMS CARTOON SCENE (Bubble, Selection, Insertion, Merge, Quick, Heap, QuickSelect)
  // =========================================================================
  const isBubble = algorithmId === 'bubble_sort';
  const isQuick = algorithmId === 'quick_sort' || algorithmId === 'quick_select';
  const isSelection = algorithmId === 'selection_sort';
  const isInsertion = algorithmId === 'insertion_sort';
  const isMerge = algorithmId === 'merge_sort';
  const isHeap = algorithmId === 'heap_sort';

  // Extract sorting-specific variables
  const minIdxVal = step.variables.minIdx !== undefined ? Number(step.variables.minIdx) : undefined;
  const currentKey = step.variables.key !== undefined ? step.variables.key : undefined;
  const pivotVal = step.variables.pivot !== undefined ? step.variables.pivot : undefined;
  const quickI = step.variables.i !== undefined ? Number(step.variables.i) : undefined;
  const quickJ = step.variables.j !== undefined ? Number(step.variables.j) : undefined;
  const mergeLeft = step.variables.left !== undefined ? Number(step.variables.left) : undefined;
  const mergeMid = step.variables.mid !== undefined ? Number(step.variables.mid) : undefined;
  const mergeRight = step.variables.right !== undefined ? Number(step.variables.right) : undefined;
  const heapSize = step.variables.heap_size !== undefined ? Number(step.variables.heap_size) : (step.variables.new_heap_size !== undefined ? Number(step.variables.new_heap_size) : array.length);

  // Detective scanner position for Selection Sort
  const detectiveIndex = activeIndices.length > 0 ? activeIndices[0] : (step.variables.j !== undefined ? Number(step.variables.j) : undefined);

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4">
      <SpeechBubble
        currentStep={step}
        description={step.description}
        variables={step.variables}
        algorithmName={algorithmName}
        stepIndex={step.stepIndex}
        totalSteps={step.totalSteps}
      />

      {/* Main Cartoon Stage Canvas - Expansive Warm Biscuit Stage */}
      <div className="w-full min-h-[440px] rounded-2xl bg-gradient-to-b from-[#F8F6FE] via-white to-[#F4F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center relative overflow-hidden">
        {/* Stage Curtains / Ambient Warm Lighting */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#F2E7D5]/60 to-transparent pointer-events-none" />

        {/* Ambient Manga & Sparkle Background Particles */}
        {!reducedMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 select-none">
            <span className="absolute top-4 left-8 text-xs text-[#7B42F6] animate-pulse">✨</span>
            <span className="absolute top-16 right-16 text-sm text-[#F5B800] animate-bounce">⭐</span>
            <span className="absolute bottom-20 left-12 text-xs text-[#10B981] animate-ping">💫</span>
            <span className="absolute bottom-12 right-24 text-xs text-[#7B42F6] animate-pulse delay-200">✨</span>
          </div>
        )}

        {/* Interactive Click Tip for Students & Kids */}
        <div className="absolute top-3 right-4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#E5DCF9] shadow-2xs text-[10px] font-mono text-[#7B42F6]">
          <span className="animate-bounce">👆</span>
          <span className="font-semibold">Tap any character to cheer &amp; pop!</span>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 0. BUBBLE SORT: Hydro-Bubble Pass Chamber                      */}
        {/* ------------------------------------------------------------- */}
        {isBubble && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-[#EFF6FF] border-2 border-[#BFDBFE] rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl animate-bounce">🫧</span>
              <div>
                <div className="text-xs font-mono font-bold text-[#1E3A8A] flex items-center gap-2">
                  <span>BUBBLE SORT: HYDRO-BUBBLE PASS CHAMBER</span>
                  <span className="text-[10px] bg-[#DBEAFE] text-[#1E40AF] px-2.5 py-0.5 rounded-full font-black border border-[#BFDBFE]">
                    Adjacent Swaps · Heavy Sinks, Light Floats
                  </span>
                </div>
                <div className="text-[11px] text-[#2563EB] font-medium">
                  {swappedIndices.length > 0
                    ? `🫧 Swapping arr[${swappedIndices[0]}] ⇄ arr[${swappedIndices[1]}]: Bubble rise in progress!`
                    : 'Pairwise comparing adjacent neighbors across each pass.'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono bg-white px-3 py-1.5 rounded-xl border border-[#BFDBFE] text-[#1E3A8A] shadow-xs">
              <span className="text-sm">🫧</span>
              <span className="font-extrabold">Bubble Rule:</span>
              <span className="font-bold text-[#2563EB]">Largest floats to end on each pass</span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 1. SELECTION SORT: Top Seeker & Trophy Bar                     */}
        {/* ------------------------------------------------------------- */}
        {isSelection && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-amber-50/90 border border-amber-200 rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🔍</span>
              <div>
                <div className="text-xs font-mono font-bold text-amber-950 flex items-center gap-2">
                  <span>SELECTION SORT: MINIMUM SEEKER</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.2 rounded-full font-black">
                    O(n²) Comparisons Guaranteed
                  </span>
                </div>
                <div className="text-[11px] text-amber-800">
                  Scans unsorted suffix to isolate smallest remaining value.
                </div>
              </div>
            </div>

            {minIdxVal !== undefined && minIdxVal >= 0 && minIdxVal < array.length && (
              <div className="flex items-center gap-2 bg-white border-2 border-amber-300 px-3 py-1.5 rounded-xl shadow-xs font-mono">
                <span className="text-base">🏆</span>
                <span className="text-[11px] font-bold text-[#8C7460]">Current Min:</span>
                <span className="text-xs font-black text-amber-950 bg-amber-100 px-2 py-0.5 rounded-md">
                  arr[{minIdxVal}] = {array[minIdxVal]}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. INSERTION SORT: Mechanical Key Hoist Platform               */}
        {/* ------------------------------------------------------------- */}
        {isInsertion && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-[#FAF5EB] border border-[#EADFCF] rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">🏗️</span>
              <div>
                <div className="text-xs font-mono font-bold text-[#5C3617] flex items-center gap-2">
                  <span>INSERTION SORT: KEY HOIST & SLIDE</span>
                  <span className="text-[10px] bg-[#FBEFE3] text-[#8C4A19] px-2 py-0.2 rounded-full font-black border border-[#E8DAC7]">
                    Online &amp; Adaptive
                  </span>
                </div>
                <div className="text-[11px] text-[#7A5A3E]">
                  {step.variables.shift
                    ? `Shifting larger cards right: ${step.variables.shift}`
                    : `Sorted prefix grows from left to right as keys settle.`}
                </div>
              </div>
            </div>

            {currentKey !== undefined && (
              <div className="flex items-center gap-2 bg-[#FFFDFB] border-2 border-[#D4A373] px-3 py-1.5 rounded-xl shadow-xs font-mono animate-bounce">
                <span className="text-[10px] font-extrabold uppercase text-[#EB6100]">HOISTED KEY:</span>
                <span className="text-sm font-black text-[#5C3617] bg-[#FEF3C7] px-2.5 py-0.5 rounded-md border border-[#FDE68A]">
                  {currentKey}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. MERGE SORT: Divide & Conquer Multi-Deck Banner              */}
        {/* ------------------------------------------------------------- */}
        {isMerge && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-[#FAF5EB] border border-[#EADFCF] rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⚔️</span>
              <div>
                <div className="text-xs font-mono font-bold text-[#5C3617] flex items-center gap-2">
                  <span>MERGE SORT: DIVIDE &amp; CONQUER ARENA</span>
                  <span className="text-[10px] bg-[#FBEFE3] text-[#8C4A19] px-2 py-0.2 rounded-full font-black border border-[#E8DAC7]">
                    Θ(n log n) Guaranteed
                  </span>
                </div>
                <div className="text-[11px] text-[#7A5A3E]">
                  {mergeLeft !== undefined && mergeRight !== undefined
                    ? `Subarrays: Left [${mergeLeft}..${mergeMid}] vs Right [${(mergeMid ?? 0) + 1}..${mergeRight}]`
                    : 'Recursively splitting and stably zipping sorted sublists.'}
                </div>
              </div>
            </div>

            {step.variables['left[i]'] && step.variables['right[j]'] && (
              <div className="flex items-center gap-2 bg-[#FFFDFB] border-2 border-[#DECBB5] px-3 py-1.5 rounded-xl shadow-xs font-mono">
                <span className="text-xs font-black text-[#EB6100]">{step.variables['left[i]']}</span>
                <span className="text-xs font-bold text-[#8C7460]">vs</span>
                <span className="text-xs font-black text-purple-700">{step.variables['right[j]']}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-sm ml-1">
                  Stably picking smaller
                </span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. QUICK SORT & QUICKSELECT: Captain Pivot & Lomuto Deck       */}
        {/* ------------------------------------------------------------- */}
        {isQuick && (
          <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-purple-50/90 border border-purple-200 rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">{algorithmId === 'quick_select' ? '🎯' : '👑'}</span>
              <div>
                <div className="text-xs font-mono font-bold text-purple-950 flex items-center gap-2">
                  <span>
                    {algorithmId === 'quick_select'
                      ? "QUICKSELECT: HOARE'S SELECTION"
                      : 'QUICK SORT: CAPTAIN PIVOT & LOMUTO PARTITION'}
                  </span>
                  <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.2 rounded-full font-black">
                    {algorithmId === 'quick_select' ? 'Average O(n) Time' : 'In-Place Partition'}
                  </span>
                </div>
                <div className="text-[11px] text-purple-800">
                  {algorithmId === 'quick_select'
                    ? 'Discards non-promising partition recursively to locate rank-k in linear time.'
                    : 'Invariant: Elements left of boundary < Pivot, elements right >= Pivot.'}
                </div>
              </div>
            </div>

            {algorithmId === 'quick_select' && step.variables['Target Rank (k)'] && (
              <div className="flex items-center gap-2 bg-white border-2 border-purple-300 px-3 py-1.5 rounded-xl shadow-xs font-mono">
                <span className="text-base">📍</span>
                <span className="text-[11px] font-bold text-purple-700">Target:</span>
                <span className="text-xs font-black text-purple-950 bg-purple-100 px-2 py-0.5 rounded-md">
                  {step.variables['Target Rank (k)']}
                </span>
              </div>
            )}

            {pivotVal !== undefined && (
              <div className="flex items-center gap-2 bg-white border-2 border-purple-400 px-3 py-1.5 rounded-xl shadow-xs font-mono">
                <span className="text-[10px] font-bold text-purple-700 uppercase">CAPTAIN PIVOT:</span>
                <span className="text-xs font-black text-purple-950 bg-purple-100 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                  <span>👑</span>
                  <span>{pivotVal}</span>
                </span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 5. HEAP SORT: Max-Heap Binary Tree Cartoon Hierarchy           */}
        {/* ------------------------------------------------------------- */}
        {isHeap && (
          <div className="w-full flex flex-col items-center justify-center gap-2 bg-amber-50/70 border border-amber-200 rounded-2xl p-3 z-10 shadow-xs mb-2">
            <div className="w-full flex items-center justify-between text-xs font-mono font-bold text-amber-950 px-2">
              <div className="flex items-center gap-2">
                <span className="text-base">👑</span>
                <span>MAX-HEAP COMPLETE BINARY TREE PYRAMID</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-extrabold">
                  Heap Size: {heapSize} / {array.length}
                </span>
                <span className="text-slate-500 font-normal">
                  Invariant: Parent &ge; Children (arr[i] &ge; arr[2i+1], arr[2i+2])
                </span>
              </div>
            </div>

            {/* Cartoon Binary Tree Representation (Top 7 Nodes) */}
            <div className="w-full max-w-md py-2 flex flex-col items-center justify-center relative select-none">
              {/* Level 0: Root King */}
              <div className="flex items-center justify-center relative z-10">
                <div
                  className={`w-12 h-10 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-black text-xs shadow-xs transition-all ${
                    sortedIndices.includes(0)
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                      : 'bg-amber-100 border-amber-400 text-amber-950 ring-2 ring-amber-300'
                  }`}
                >
                  <span className="text-[9px] -mt-0.5">👑 arr[0]</span>
                  <span className="text-sm font-black">{array[0]}</span>
                </div>
              </div>

              {/* Connecting Tree SVG Branches */}
              <svg className="w-full h-10 overflow-visible pointer-events-none -my-1">
                {/* Branches to Level 1 */}
                <line x1="50%" y1="0" x2="30%" y2="100%" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="50%" y1="0" x2="70%" y2="100%" stroke="#d97706" strokeWidth="2" strokeDasharray="3 3" />
              </svg>

              {/* Level 1: Left and Right Children */}
              <div className="w-full flex items-center justify-around px-8 relative z-10">
                {array.length > 1 && (
                  <div
                    className={`w-11 h-9 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-xs shadow-xs ${
                      sortedIndices.includes(1) || 1 >= heapSize
                        ? 'bg-[#F5ECE0] border-[#DFCDB8] text-[#9C826B]'
                        : activeIndices.includes(1) || swappedIndices.includes(1)
                        ? 'bg-amber-200 border-amber-500 text-amber-950 ring-2 ring-amber-400'
                        : 'bg-white border-[#D4A373] text-[#5C3617]'
                    }`}
                  >
                    <span className="text-[8px] opacity-70">arr[1]</span>
                    <span className="font-extrabold">{array[1]}</span>
                  </div>
                )}

                {array.length > 2 && (
                  <div
                    className={`w-11 h-9 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-xs shadow-xs ${
                      sortedIndices.includes(2) || 2 >= heapSize
                        ? 'bg-[#F5ECE0] border-[#DFCDB8] text-[#9C826B]'
                        : activeIndices.includes(2) || swappedIndices.includes(2)
                        ? 'bg-amber-200 border-amber-500 text-amber-950 ring-2 ring-amber-400'
                        : 'bg-white border-[#D4A373] text-[#5C3617]'
                    }`}
                  >
                    <span className="text-[8px] opacity-70">arr[2]</span>
                    <span className="font-extrabold">{array[2]}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MAIN CARTOON CHARACTER STAGE ROW - Wide Fluid Layout          */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full flex items-end justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto pb-4 pt-10 px-4 my-auto relative">
          {/* Anime Victory Celebration Banner */}
          {((sortedIndices.length === array.length && array.length > 1) ||
            step.variables?.status === 'Sorted' ||
            (step.stepIndex !== undefined && step.totalSteps !== undefined && step.stepIndex === step.totalSteps - 1 && array.length > 1)) &&
            !reducedMotion && (
              <div className="absolute -top-7 left-0 right-0 flex items-center justify-center pointer-events-none z-30 animate-spark-pop">
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-[#10B981] text-white text-xs sm:text-sm font-mono font-black px-6 py-2 rounded-full shadow-xl border-2 border-white flex items-center gap-2.5 animate-bounce">
                  <span className="text-lg">🎉</span>
                  <span>YATTA! ALL {array.length} CHARACTERS CELEBRATING IN PERFECT ORDER!</span>
                  <span className="text-yellow-300 text-base animate-spin">⭐</span>
                </div>
              </div>
            )}

          {/* Animated Cartoon Swap Banner */}
          {swappedIndices.length >= 2 && !reducedMotion && (
            <div className="absolute -top-6 left-0 right-0 flex items-center justify-center pointer-events-none z-30 animate-bubble-pop">
              <div className="bg-[#7B42F6] text-white text-xs font-mono font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white animate-bounce flex items-center gap-2">
                <span className="text-sm">🔄</span>
                <span>SWAPPING POSITIONS: arr[{swappedIndices[0]}] ⇄ arr[{swappedIndices[1]}]</span>
                <span className="text-[#F5B800] text-sm animate-spin">✨</span>
              </div>
            </div>
          )}

          {/* Animated Cartoon Compare Banner */}
          {activeIndices.length >= 2 && swappedIndices.length === 0 && !reducedMotion && (
            <div className="absolute -top-6 left-0 right-0 flex items-center justify-center pointer-events-none z-30 animate-bubble-pop">
              <div className="bg-[#FFF7D6] text-[#8C5300] text-xs font-mono font-black px-4 py-1 rounded-full shadow-md border-2 border-[#FFE082] flex items-center gap-2">
                <span className="text-sm">⚖️</span>
                <span>COMPARING VALUES: arr[{activeIndices[0]}] vs arr[{activeIndices[1]}]</span>
                <span className="text-sm">🔍</span>
              </div>
            </div>
          )}

          {/* Detective Spotlight for Selection Sort */}
          {isSelection && detectiveIndex !== undefined && detectiveIndex >= 0 && detectiveIndex < array.length && (
            <div
              style={{
                left: `${((detectiveIndex + 0.5) / array.length) * 100}%`
              }}
              className="absolute -top-10 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-300 z-20"
            >
              <div className="bg-[#4A240A] text-white text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 animate-bounce">
                <span>🕵️ Seeker: arr[{detectiveIndex}]</span>
              </div>
              <div className="w-0.5 h-6 bg-amber-400/80 border-dashed" />
            </div>
          )}

          {array.map((val, idx) => {
            let charState: 'idle' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'target' | 'key' | 'min' = 'idle';
            let roleBadge: string | undefined = undefined;
            let subLabel: string | undefined = undefined;
            let crown = false;

            if (swappedIndices.includes(idx)) {
              charState = 'swapping';
            } else if (activeIndices.includes(idx)) {
              charState = 'comparing';
            } else if (sortedIndices.includes(idx)) {
              charState = 'sorted';
            } else if (pivotIndex === idx) {
              charState = 'pivot';
              crown = true;
              roleBadge = 'PIVOT';
              subLabel = 'CAPTAIN';
            } else if (targetIndex === idx) {
              charState = 'target';
            }

            // Selection sort min candidate logic
            if (isSelection) {
              if (minIdxVal === idx) {
                charState = 'min';
                roleBadge = 'MIN CANDIDATE';
                subLabel = 'SMALLEST SO FAR';
                crown = true;
              } else if (detectiveIndex === idx) {
                roleBadge = 'INSPECTING';
              }
            }

            // Insertion sort key item & shift indicators
            if (isInsertion) {
              if (currentKey !== undefined && Number(currentKey) === val && activeIndices.includes(idx)) {
                charState = 'key';
                roleBadge = 'KEY ITEM';
                subLabel = 'HOISTED';
              } else if (step.variables.shift && activeIndices.includes(idx)) {
                roleBadge = 'SHIFTING ⏩';
              }
            }

            // Merge sort subarray role labels
            if (isMerge) {
              if (mergeLeft !== undefined && mergeRight !== undefined && idx >= mergeLeft && idx <= mergeRight) {
                if (mergeMid !== undefined && idx <= mergeMid) {
                  subLabel = 'LEFT SUB';
                } else {
                  subLabel = 'RIGHT SUB';
                }
              }
            }

            // Quick Sort Lomuto role badges
            if (isQuick) {
              if (quickI !== undefined && idx === quickI) {
                subLabel = 'GUARD (i)';
              } else if (quickJ !== undefined && idx === quickJ) {
                subLabel = 'SCOUT (j)';
              }
            }

            // Heap Sort Root King
            if (isHeap && idx === 0 && !sortedIndices.includes(0)) {
              crown = true;
              subLabel = 'ROOT KING';
            }

            // Calculate scaled height percent
            const range = Math.max(1, maxVal - minVal);
            const heightPercent = Math.round(((val - minVal) / range) * 85);

            return (
              <div key={`${idx}-${val}`} className="flex flex-col items-center relative">
                {/* Bubble Sort Rising Soap Bubble Particles */}
                {isBubble && (swappedIndices.includes(idx) || activeIndices.includes(idx)) && !reducedMotion && (
                  <div className="absolute -top-12 flex items-center justify-center gap-0.5 pointer-events-none z-30 animate-bubble-pop">
                    <span className="text-xl animate-bounce">🫧</span>
                    <span className="text-xs text-sky-400 animate-ping">✨</span>
                  </div>
                )}
                <CartoonCharacter
                  id={`char-${idx}`}
                  value={val}
                  index={idx}
                  state={charState}
                  heightPercent={heightPercent}
                  roleBadge={roleBadge}
                  subLabel={subLabel}
                  crown={crown}
                  reducedMotion={reducedMotion}
                />
              </div>
            );
          })}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STAGE FLOOR PLANK & TERRITORY LEGEND - Warm Oak Plank Style   */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full border-t-4 border-[#DECBB5] flex flex-wrap justify-between items-center pt-2.5 px-6 text-[11px] font-mono text-[#7A6451] gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-200" />
              <span>Comparing</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-200" />
              <span>Swapping</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
              <span>Sorted</span>
            </span>
            {isQuick && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-purple-200" />
                <span>Pivot Captain</span>
              </span>
            )}
            {isSelection && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-amber-300" />
                <span>Min Trophy</span>
              </span>
            )}
            {isInsertion && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EB6100] ring-2 ring-orange-200" />
                <span>Hoisted Key</span>
              </span>
            )}
          </div>

          <div className="font-bold text-[#5C3617]">
            Array Size: {array.length}
          </div>
        </div>
      </div>
    </div>
  );
};
