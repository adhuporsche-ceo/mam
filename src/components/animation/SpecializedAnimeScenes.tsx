import React, { useState } from 'react';
import { AlgorithmStep } from '../../engine/types';
import { SpeechBubble } from './SpeechBubble';
import { soundFx } from '../../utils/soundEffects';
import { Sparkles, Trophy, Award, Footprints, Compass, MapPin, Undo2, Crown, Check } from 'lucide-react';

interface SceneProps {
  step: AlgorithmStep;
  algorithmId: string;
  algorithmName: string;
  reducedMotion?: boolean;
}

// =========================================================================
// 1. TRAVELLING SALESPERSON PROBLEM (TSP) - MARCO THE CHIBI TRAVELING SALESMAN
// =========================================================================
export const TravelingSalespersonScene: React.FC<SceneProps> = ({
  step,
  algorithmName,
  reducedMotion = false
}) => {
  const [clickedTown, setClickedTown] = useState<string | null>(null);

  const towns = [
    { id: '0', code: 'A', name: 'Sakura Town', icon: '🌸', x: 22, y: 34, color: 'border-pink-300 bg-pink-50 text-pink-950' },
    { id: '1', code: 'B', name: 'Golden Port', icon: '⚓', x: 78, y: 34, color: 'border-amber-300 bg-amber-50 text-amber-950' },
    { id: '2', code: 'C', name: 'Emerald Spire', icon: '🌲', x: 78, y: 76, color: 'border-emerald-300 bg-emerald-50 text-emerald-950' },
    { id: '3', code: 'D', name: 'Oasis Citadel', icon: '💎', x: 22, y: 76, color: 'border-purple-300 bg-purple-50 text-purple-950' }
  ];

  const highways = [
    { from: '0', to: '1', weight: 10, label: 'Coastal Highway' },
    { from: '1', to: '2', weight: 15, label: 'Canal Way' },
    { from: '2', to: '3', weight: 20, label: 'Forest Trail' },
    { from: '3', to: '0', weight: 25, label: 'Mountain Pass' },
    { from: '0', to: '2', weight: 35, label: 'Diagonal Express' },
    { from: '1', to: '3', weight: 30, label: 'Valley Crossway' }
  ];

  const stepIdx = step.stepIndex ?? 0;
  const isTour1 = stepIdx === 1;
  const isTour2 = stepIdx === 2;
  const isOptimal = stepIdx >= 3;

  // Determine active route edges
  const isEdgeInCurrentTour = (from: string, to: string) => {
    const pair = [from, to].sort().join('-');
    if (isTour1) {
      // Tour 1: A-B, B-D, D-C, C-A (0-1, 1-3, 3-2, 2-0)
      return ['0-1', '1-3', '2-3', '0-2'].includes(pair);
    }
    if (isTour2 || isOptimal) {
      // Tour 2: A-B, B-C, C-D, D-A (0-1, 1-2, 2-3, 0-3)
      return ['0-1', '1-2', '2-3', '0-3'].includes(pair);
    }
    return false;
  };

  // Dynamic position of Marco the Salesman
  const marcoX = 50;
  const marcoY = 8;
  let marcoMood: 'planning' | 'walking' | 'excited' | 'celebrating' = 'planning';
  let marcoSpeech = "Planning route to visit all 4 towns! 🗺️";

  if (stepIdx === 0) {
    marcoMood = 'planning';
    marcoSpeech = "Packing wares! Evaluating (4-1)! / 2 = 3 unique tours. 🎒";
  } else if (stepIdx === 1) {
    marcoMood = 'walking';
    marcoSpeech = "Testing Tour 1 (Crossway): Cost = 10+30+20+35 = 95 km! 🧭";
  } else if (stepIdx === 2) {
    marcoMood = 'excited';
    marcoSpeech = "Testing Tour 2 (Perimeter): 10+15+20+25 = 70 km! NEW BEST! 🌟";
  } else {
    marcoMood = 'celebrating';
    marcoSpeech = "YATTA! Minimal Hamiltonian Tour = 70 km verified! 🏆🎉";
  }

  const handleTownClick = (name: string) => {
    soundFx.playPop();
    setClickedTown(name);
    setTimeout(() => setClickedTown(null), 800);
  };

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4 select-none">
      <SpeechBubble
        currentStep={step}
        description={step.description}
        variables={step.variables}
        algorithmName={algorithmName}
        stepIndex={step.stepIndex}
        totalSteps={step.totalSteps}
      />

      {/* Main Kingdom Map Stage */}
      <div className="w-full min-h-[560px] rounded-2xl bg-gradient-to-b from-[#FDFBF7] via-[#FFFDF9] to-[#F8F4EE] border border-[#E8DAC7] p-4 sm:p-6 relative overflow-hidden flex flex-col gap-4">
        {/* Ambient Map Grid & Compass Rose */}
        <div className="absolute top-4 right-5 flex items-center gap-2 bg-white/90 border border-[#E8DAC7] px-3 py-1.5 rounded-2xl shadow-xs z-20">
          <Compass className="w-4 h-4 text-[#7B42F6] animate-spin" style={{ animationDuration: '12s' }} />
          <span className="text-[11px] font-mono font-bold text-[#5C3617]">Kingdom Road Atlas · NP-Hard</span>
        </div>

        {/* Tour Comparison Odometer */}
        <div className="absolute top-4 left-6 z-20 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 bg-white/95 border border-[#DECBB5] px-3 py-1.5 rounded-2xl shadow-xs">
            <span className="text-sm">🧳</span>
            <div className="text-[11px] font-mono">
              <span className="text-[#8C7460] font-bold">Tour Odometer: </span>
              <span className={`font-black ${isOptimal || isTour2 ? 'text-emerald-700' : 'text-amber-800'}`}>
                {isTour1 ? '95 km (Tour 1)' : isTour2 || isOptimal ? '70 km (Optimal)' : '0 km (At Start)'}
              </span>
            </div>
          </div>

          {(isTour2 || isOptimal) && (
            <div className="bg-emerald-500 text-white text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 self-start animate-bounce">
              <Trophy className="w-3 h-3 text-yellow-300" />
              <span>GLOBAL MINIMUM HAMILTONIAN CYCLE</span>
            </div>
          )}
        </div>

        {/* SVG Highways connecting towns */}
        <div className="relative min-h-[400px] flex-1 w-full">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute inset-0 pointer-events-none z-10">
          {highways.map((hw, idx) => {
            const tFrom = towns.find(t => t.id === hw.from)!;
            const tTo = towns.find(t => t.id === hw.to)!;
            const isTourEdge = isEdgeInCurrentTour(hw.from, hw.to);

            return (
              <g key={idx}>
                {/* Glow underlay if active */}
                {isTourEdge && !reducedMotion && (
                  <line
                    x1={tFrom.x}
                    y1={tFrom.y}
                    x2={tTo.x}
                    y2={tTo.y}
                    stroke={isOptimal || isTour2 ? '#10B981' : '#F59E0B'}
                    strokeWidth="10"
                    strokeOpacity="0.3"
                    strokeLinecap="round"
                  />
                )}

                {/* Primary road line */}
                <line
                  x1={tFrom.x}
                  y1={tFrom.y}
                  x2={tTo.x}
                  y2={tTo.y}
                  stroke={isTourEdge ? (isOptimal || isTour2 ? '#059669' : '#D97706') : '#D4C7F5'}
                  strokeWidth={isTourEdge ? 4 : 2}
                  strokeDasharray={isTourEdge ? '8 6' : undefined}
                  strokeLinecap="round"
                  className={isTourEdge ? 'transition-all duration-300' : ''}
                />

              </g>
            );
          })}
        </svg>

        <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
          {highways.map(hw => {
            const from = towns.find(town => town.id === hw.from)!;
            const to = towns.find(town => town.id === hw.to)!;
            const isTourEdge = isEdgeInCurrentTour(hw.from, hw.to);
            const isDiagonal = from.x !== to.x && from.y !== to.y;
            return (
              <span
                key={`${hw.from}-${hw.to}`}
                style={{
                  left: `${(from.x + to.x) / 2 + (isDiagonal ? (hw.weight === 35 ? -4 : 4) : 0)}%`,
                  top: `${(from.y + to.y) / 2}%`
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border bg-white px-2 py-1 text-[10px] font-black font-mono shadow-sm sm:text-xs ${
                  isTourEdge
                    ? isOptimal || isTour2
                      ? 'border-emerald-600 text-emerald-800'
                      : 'border-amber-600 text-amber-800'
                    : 'border-[#D4C7F5] text-[#665687]'
                }`}
              >
                {hw.weight} km
              </span>
            );
          })}
        </div>

        {/* Storybook Kingdom Towns */}
        <div className="absolute inset-0 z-20">
          {towns.map(town => {
            const isStart = town.code === 'A';
            const isClicked = clickedTown === town.name;

            return (
              <div
                key={town.id}
                onClick={() => handleTownClick(town.name)}
                style={{ left: `${town.x}%`, top: `${town.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group transition-transform duration-200"
                title={`Click ${town.name} to view!`}
              >
                {/* Town Card Icon */}
                <div
                  className={`h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem] rounded-3xl border-2 flex flex-col items-center justify-center shadow-md transition-all duration-300 ${town.color} ${
                    isClicked ? 'scale-115 ring-4 ring-amber-400' : 'group-hover:scale-105'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl filter drop-shadow-xs">{town.icon}</span>
                  <span className="text-[11px] font-mono font-black mt-0.5">{town.code}</span>
                  {isStart && (
                    <span className="absolute -top-2.5 bg-[#7B42F6] text-white text-[9px] font-mono font-black px-2 py-0.2 rounded-full shadow-xs">
                      START / HOME
                    </span>
                  )}
                </div>

                <div className="mt-1 text-center">
                  <span className="text-xs font-mono font-extrabold text-[#201538] block">
                    {town.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#8C7460] font-semibold">
                    Node #{town.id}
                  </span>
                </div>
              </div>
            );
          })}

          {/* DYNAMIC MARCO THE TRAVELING SALESMAN CHARACTER */}
          <div
            style={{
              left: `${marcoX}%`,
              top: `${marcoY}%`,
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            className="absolute -translate-x-1/2 flex flex-row-reverse items-center gap-2 pointer-events-none z-30 select-none"
          >
            {/* Marco's Speech Bubble */}
            <div className="max-w-[min(72vw,440px)] rounded-2xl border border-[#D4C7F5] bg-white/95 px-3 py-2 text-[10px] font-mono font-bold text-[#201538] shadow-md sm:text-[11px]">
              <span>{marcoMood === 'celebrating' ? '🎉' : marcoMood === 'excited' ? '⭐' : '🎒'}</span>
              <span className="ml-1">{marcoSpeech}</span>
            </div>

            {/* Marco Chibi Character Sprite */}
            <div className="flex flex-col items-center filter drop-shadow-md">
              {/* Jaunty Feather Merchant Hat */}
              <div className="w-10 h-4 bg-[#7B42F6] rounded-t-full border border-[#5521B5] relative flex justify-center items-center shadow-xs">
                <div className="w-13 h-1.5 bg-[#5521B5] -bottom-0.5 rounded-full absolute" />
                <div className="w-2.5 h-3 bg-amber-400 rounded-full absolute -top-2 right-1 rotate-15 border border-amber-500 shadow-2xs" />
                <span className="text-[8px] text-white absolute -top-1">✨</span>
              </div>

              {/* Chibi Anime Head */}
              <div className="w-9 h-8 bg-[#FFF2E0] border-2 border-[#D4A373] rounded-2xl flex flex-col items-center justify-center p-1 relative shadow-xs">
                {/* Hair Bangs */}
                <div className="w-8 h-2 bg-[#78350F] rounded-t-lg -mt-1 mb-0.5" />
                {/* Anime Sparkle Eyes */}
                <div className="flex items-center justify-around w-full px-1">
                  {marcoMood === 'celebrating' ? (
                    <>
                      <span className="text-[10px] text-amber-500 font-black">⭐</span>
                      <span className="text-[10px] text-amber-500 font-black">⭐</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-[#1E1B4B] flex items-center justify-center">
                        <div className="w-0.8 h-0.8 rounded-full bg-white -mt-0.5 -ml-0.5" />
                      </div>
                      <div className="w-2 h-2 rounded-full bg-[#1E1B4B] flex items-center justify-center">
                        <div className="w-0.8 h-0.8 rounded-full bg-white -mt-0.5 -ml-0.5" />
                      </div>
                    </>
                  )}
                </div>
                {/* Kawaii Rosy Cheeks */}
                <div className="w-full flex justify-between px-1 -mt-0.5">
                  <div className="w-1.5 h-1 rounded-full bg-rose-400/70" />
                  <div className="w-1.5 h-1 rounded-full bg-rose-400/70" />
                </div>
                {/* Smile */}
                <div className="w-2.5 h-1 border-b-2 border-[#78350F] rounded-full -mt-0.5" />
              </div>

              {/* Merchant Tunic & Courier Bag */}
              <div className="w-8 h-6 bg-[#10B981] border border-emerald-800 rounded-b-xl flex items-center justify-between px-1.5 relative">
                {/* Backpack */}
                <div className="w-3 h-5 bg-[#92400E] rounded-md absolute -left-2 top-0.5 border border-amber-950 flex items-center justify-center">
                  <span className="text-[7px]">📜</span>
                </div>
                {/* Merchant Ledger / Compass */}
                <div className="w-3.5 h-3.5 rounded-full bg-amber-300 border border-amber-600 flex items-center justify-center shadow-xs mx-auto">
                  <span className="text-[8px]">🧭</span>
                </div>
              </div>

              {/* Walking Chibi Feet */}
              <div className="flex gap-2 -mt-0.5">
                <div className="w-2.5 h-1.5 bg-[#78350F] rounded-full animate-bounce" />
                <div className="w-2.5 h-1.5 bg-[#78350F] rounded-full animate-bounce delay-100" />
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Kingdom Road Legend & Computational Proof */}
        <div className="w-full border-t-2 border-[#E8DAC7] pt-2.5 flex flex-wrap justify-between items-center text-xs font-mono text-[#5C3617] gap-2 z-20">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#059669] rounded-full" />
              <span className="font-bold">Optimal Tour: A → B → C → D → A (70 km)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-1 bg-[#D97706] rounded-full" />
              <span>Tour 1: A → B → D → C → A (95 km)</span>
            </span>
          </div>

          <div className="font-bold text-[#7B42F6] bg-white px-3 py-1 rounded-xl border border-[#D4C7F5] shadow-2xs">
            Complexity: Held-Karp O(n²·2ⁿ) vs Brute Force O((n-1)!)
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. RAT IN A MAZE - REMY THE CHIBI MOUSE & CHEESE DUNGEON
// =========================================================================
export const RatInMazeScene: React.FC<SceneProps> = ({
  step,
  algorithmName,
  reducedMotion = false
}) => {
  const maze = step.mazeGrid || [
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [0, 1, 0, 0],
    [1, 1, 1, 1]
  ];
  const path = step.mazePath || [];
  const current = step.mazeCurrent || [0, 0];
  const isGoal = current[0] === 3 && current[1] === 3;
  const isBacktracking = step.description.toLowerCase().includes('backtrack');

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4 select-none">
      <SpeechBubble
        currentStep={step}
        description={step.description}
        variables={step.variables}
        algorithmName={algorithmName}
        stepIndex={step.stepIndex}
        totalSteps={step.totalSteps}
      />

      <div className="w-full min-h-[440px] rounded-2xl bg-gradient-to-b from-[#FAF8FF] via-white to-[#F5F0FF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center space-y-4">
        {/* Banner */}
        <div className="w-full flex flex-wrap items-center justify-between pb-2 border-b border-[#E5DCF9] gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧀</span>
            <span className="text-xs font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-xl border border-[#D4C7F5]">
              Rat in a Maze · Backtracking Search
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            <span className="bg-[#ECFDF5] text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
              Start: (0,0) → Goal: (3,3)
            </span>
            <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
              Path Length: {path.length} steps
            </span>
          </div>
        </div>

        {/* 4x4 Maze Grid Stage */}
        <div className="border-4 border-[#7B42F6] rounded-3xl overflow-hidden shadow-lg grid grid-cols-4 gap-1 p-2 bg-[#201538] max-w-sm sm:max-w-md w-full relative">
          {maze.map((row, rIdx) =>
            row.map((val, cIdx) => {
              const isOpen = val === 1;
              const isCurrent = current[0] === rIdx && current[1] === cIdx;
              const isInPath = path.some(([pr, pc]) => pr === rIdx && pc === cIdx);
              const isStart = rIdx === 0 && cIdx === 0;
              const isExit = rIdx === 3 && cIdx === 3;

              return (
                <div
                  key={`${rIdx}-${cIdx}`}
                  className={`h-20 sm:h-24 rounded-2xl flex flex-col items-center justify-between p-1.5 relative transition-all duration-300 ${
                    !isOpen
                      ? 'bg-[#332252] border border-[#442D6B] text-slate-500'
                      : isCurrent
                      ? 'bg-amber-100 border-2 border-amber-400 ring-4 ring-amber-300/60 shadow-md'
                      : isInPath
                      ? 'bg-[#EDE8FE] border-2 border-[#7B42F6] shadow-xs'
                      : 'bg-white border border-[#E5DCF9]'
                  }`}
                >
                  {/* Top Coordinate Label */}
                  <div className="w-full flex justify-between items-center text-[9px] font-mono opacity-70">
                    <span>({rIdx},{cIdx})</span>
                    {isStart && <span className="font-bold text-[#7B42F6]">START</span>}
                    {isExit && <span className="font-bold text-amber-600">EXIT</span>}
                  </div>

                  {/* Cell Centerpiece */}
                  <div className="flex items-center justify-center my-auto relative">
                    {!isOpen ? (
                      <span className="text-2xl opacity-75">🧱</span>
                    ) : isCurrent ? (
                      /* REMY THE CHIBI MOUSE AT CURRENT CELL */
                      <div className="flex flex-col items-center animate-bounce">
                        <div className="relative">
                          {/* Mouse Ears */}
                          <div className="flex justify-between w-9 -mb-2 z-0">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#E2E8F0] border border-rose-300 shadow-2xs" />
                            <div className="w-3.5 h-3.5 rounded-full bg-[#E2E8F0] border border-rose-300 shadow-2xs" />
                          </div>
                          {/* Mouse Face */}
                          <div className="w-8 h-7 bg-white border-2 border-slate-400 rounded-full flex flex-col items-center justify-center relative z-10 shadow-xs">
                            <div className="flex items-center justify-around w-full px-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                            </div>
                            <div className="w-1.5 h-1 rounded-full bg-rose-400 mt-0.5" />
                          </div>
                        </div>
                        <span className="text-[9px] font-mono font-black text-purple-900 bg-white px-1.5 rounded-md shadow-2xs mt-0.5">
                          REMY
                        </span>
                      </div>
                    ) : isExit ? (
                      /* GOLDEN CHEESE WEDGE AT EXIT */
                      <div className="flex flex-col items-center animate-pulse">
                        <span className="text-3xl filter drop-shadow-md">🧀</span>
                        <span className="text-[9px] font-mono font-black text-amber-900 bg-amber-200 px-1.5 rounded-md">
                          GOAL
                        </span>
                      </div>
                    ) : isInPath ? (
                      /* CHEESE CRUMB FOOTPRINT */
                      <div className="flex flex-col items-center">
                        <span className="text-base text-amber-500 animate-pulse">🐾</span>
                        <span className="text-[8px] font-mono text-purple-700 font-bold">crumb</span>
                      </div>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-300">path</span>
                    )}
                  </div>

                  {/* Status footer for cell */}
                  <div className="text-[8px] font-mono text-[#8C7DA8]">
                    {!isOpen ? 'WALL' : isExit ? 'TARGET' : 'OPEN'}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Backtrack Warning if currently backtracking */}
        {isBacktracking && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-900 px-4 py-1.5 rounded-full text-xs font-mono font-bold animate-pulse">
            <Undo2 className="w-3.5 h-3.5 text-rose-600" />
            <span>Dead End Encountered! Remy backtracks to the previous junction.</span>
          </div>
        )}

        {isGoal && (
          <div className="flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-950 px-5 py-2 rounded-full text-xs font-mono font-black shadow-md animate-bounce">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span>YUMMY! Remy safely navigated the maze and reached the cheese feast!</span>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 3. SIEVE OF ERATOSTHENES - CHIBI ALCHEMIST PRIME LAB
// =========================================================================
export const SieveEratosthenesScene: React.FC<SceneProps> = ({
  step,
  algorithmName,
  reducedMotion = false
}) => {
  const numbers = Array.from({ length: 19 }, (_, i) => i + 2); // 2..20
  const activePrime = step.variables['Active Prime'] ? Number(step.variables['Active Prime']) : undefined;
  const struckOut = step.variables['Struck Out'] ? Number(step.variables['Struck Out']) : undefined;
  const primesFound = step.variables['Primes Found']
    ? step.variables['Primes Found'].split(',').map(s => Number(s.trim()))
    : undefined;

  // Determine which numbers are composite so far based on step description / state
  const isComplete = Boolean(primesFound);

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 shadow-sm shadow-[#E5DCF9]/40 space-y-4 select-none">
      <SpeechBubble
        currentStep={step}
        description={step.description}
        variables={step.variables}
        algorithmName={algorithmName}
        stepIndex={step.stepIndex}
        totalSteps={step.totalSteps}
      />

      <div className="w-full min-h-[440px] rounded-2xl bg-gradient-to-b from-[#F9F7FE] via-white to-[#F4EEFF] border border-[#E5DCF9] p-6 flex flex-col justify-between items-center space-y-4">
        {/* Header Ribbon */}
        <div className="w-full flex flex-wrap items-center justify-between pb-3 border-b border-[#E5DCF9] gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧪</span>
            <span className="text-xs font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-xl border border-[#D4C7F5]">
              Sieve of Eratosthenes · Prime Alchemist Laboratory
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold">
            <span className="bg-[#ECFDF5] text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
              Range: 2 to 20
            </span>
            <span className="bg-purple-100 text-[#7B42F6] px-3 py-1 rounded-full border border-[#D4C7F5]">
              Complexity: O(n log log n)
            </span>
          </div>
        </div>

        {/* Alchemist Number Jars Grid */}
        <div className="w-full max-w-4xl grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2.5 sm:gap-3 py-2">
          {numbers.map(num => {
            const isActivePrime = activePrime === num;
            const isStruck = struckOut === num;
            const isKnownPrime = primesFound?.includes(num);

            // Is composite check
            const isComposite = (step.stepIndex >= 2 && num % 2 === 0 && num > 2) ||
                                (step.stepIndex >= 4 && num % 3 === 0 && num > 3);

            return (
              <div
                key={num}
                className={`h-20 sm:h-22 rounded-2xl border-2 flex flex-col items-center justify-between p-2 font-mono transition-all duration-300 relative ${
                  isActivePrime
                    ? 'bg-amber-100 border-amber-400 text-amber-950 scale-105 ring-4 ring-amber-300 shadow-md'
                    : isStruck
                    ? 'bg-rose-50 border-rose-300 text-rose-400 opacity-60 scale-95'
                    : isKnownPrime
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                    : isComposite
                    ? 'bg-slate-100 border-slate-300 text-slate-400 opacity-50'
                    : 'bg-white border-[#E5DCF9] text-[#201538] shadow-2xs hover:border-[#7B42F6]'
                }`}
              >
                {/* Crown for prime */}
                {(isActivePrime || isKnownPrime) && (
                  <span className="text-[10px] -mt-1 text-amber-500 animate-bounce">👑</span>
                )}

                {/* Struck icon */}
                {(isStruck || isComposite) && (
                  <span className="text-[10px] text-rose-500 font-black -mt-1">❌</span>
                )}

                {/* Number Flask */}
                <div className="flex flex-col items-center my-auto">
                  <span className="text-base sm:text-lg font-black">{num}</span>
                  <span className="text-[9px] opacity-75">
                    {isActivePrime ? 'PRIME' : isKnownPrime ? 'PRIME' : isComposite ? 'COMPOSITE' : 'CANDIDATE'}
                  </span>
                </div>

                <div className="text-[8px] font-bold text-center">
                  {num === 2 ? 'EVEN PRIME' : num % 2 === 0 ? 'MULT OF 2' : num % 3 === 0 && num > 3 ? 'MULT OF 3' : 'UNBROKEN'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Eratosthenes the Chibi Alchemist Mentor */}
        <div className="w-full p-4 bg-[#FAF7FD] rounded-2xl border border-[#E5DCF9] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 border-2 border-[#7B42F6] flex items-center justify-center text-xl shadow-xs">
              🧙‍♂️
            </div>
            <div>
              <span className="font-black text-[#201538] block">Eratosthenes&apos; Alchemist Axiom:</span>
              <span className="text-[11px] text-[#5B507A]">
                Any composite number n must have a prime factor ≤ √n. For n = 20, √20 ≈ 4.47, so we only need to test primes 2 and 3!
              </span>
            </div>
          </div>

          {isComplete && (
            <div className="bg-emerald-600 text-white font-mono font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-2 animate-bounce">
              <Check className="w-4 h-4" />
              <span>All 8 Primes Extracted: 2, 3, 5, 7, 11, 13, 17, 19</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
