import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Play,
  Share2,
  GraduationCap,
  GitBranch,
  Split,
  Binary
} from 'lucide-react';
import { AlgorithmItem, AlgorithmCategory } from '../data/daaData';
import { SubproblemLesson, getSubproblemsForCategory } from '../data/subproblemsData';
import { soundFx } from '../utils/soundEffects';
import { GlossaryTooltip } from './GlossaryTooltip';

interface SubproblemTeachingStudioProps {
  algorithm: AlgorithmItem;
  category: AlgorithmCategory;
  onLaunchAlgorithm: (algoId: string) => void;
  onJumpToStep?: (stepIndex: number) => void;
}

export const SubproblemTeachingStudio: React.FC<SubproblemTeachingStudioProps> = ({
  algorithm,
  category,
  onLaunchAlgorithm,
  onJumpToStep
}) => {
  const subproblems = getSubproblemsForCategory(category.id, category.title);
  const [selectedSubproblemId, setSelectedSubproblemId] = useState<string>(
    subproblems[0]?.id || ''
  );
  const [expandedId, setExpandedId] = useState<string | null>(subproblems[0]?.id || null);

  const activeSubproblem =
    subproblems.find(s => s.id === selectedSubproblemId) || subproblems[0];

  const typeBadges: Record<string, { label: string; color: string }> = {
    base_case: { label: 'Base Case Subproblem', color: 'bg-emerald-50 text-emerald-800 border-emerald-300' },
    recursive_step: { label: 'Recursive State Branch', color: 'bg-[#EDE8FE] text-[#7B42F6] border-[#D4C7F5]' },
    combine_step: { label: 'Combine & Reconstruct', color: 'bg-sky-50 text-sky-800 border-sky-300' },
    partition: { label: 'Partition Subproblem', color: 'bg-amber-50 text-amber-800 border-amber-300' },
    relaxation: { label: 'Relaxation Subproblem', color: 'bg-indigo-50 text-indigo-800 border-indigo-300' },
    pruning: { label: 'Branch & Bound Pruning', color: 'bg-rose-50 text-rose-800 border-rose-300' },
    proof: { label: 'Invariant Proof Subproblem', color: 'bg-purple-50 text-purple-900 border-purple-300' }
  };

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-5 sm:p-7 shadow-sm shadow-[#8C52FF]/5 space-y-6 select-none">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DCF9]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-black text-[#7B42F6] bg-[#EDE8FE] px-2.5 py-0.5 rounded-full border border-[#D4C7F5]">
              Unit {category.indexStr} · {category.title}
            </span>
            <span className="text-xs font-mono text-[#887D9F]">
              {subproblems.length} Syllabus Subproblems
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#201538] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#7B42F6]" />
            <span>Subproblem Teaching &amp; Decomposition Deck</span>
          </h3>
          <p className="text-xs text-[#5B507A] max-w-2xl leading-relaxed">
            In DAA, complex algorithms are never monolithic: they decompose into smaller, mathematically rigorous <GlossaryTooltip term="subproblems">subproblems</GlossaryTooltip>. Explore each subproblem step-by-step below.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[#10B981] bg-[#EBF7E3] px-3 py-1.5 rounded-xl border border-[#C5E1A5] flex items-center gap-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Curriculum Aligned</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Left Subproblem Selector / Right Interactive Teacher View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Subproblem List Navigation (5 Cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-mono font-bold text-[#887D9F] uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Subproblem Breakdown</span>
            <span>Click to Teach</span>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {subproblems.map((sub, idx) => {
              const isSelected = sub.id === activeSubproblem?.id;
              const badge = typeBadges[sub.type] || typeBadges.proof;
              return (
                <div
                  key={sub.id}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedSubproblemId(sub.id);
                  }}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F4F0FF] border-[#7B42F6] shadow-xs'
                      : 'bg-[#F8F6FE] border-[#E5DCF9] hover:border-[#D4C7F5] hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full text-[10px] font-mono font-black flex items-center justify-center ${
                        isSelected ? 'bg-[#7B42F6] text-white' : 'bg-[#E5DCF9] text-[#5B507A]'
                      }`}>
                        {idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-[#201538] leading-snug">
                        {sub.title}
                      </h4>
                    </div>

                    <ChevronRight className={`w-4 h-4 text-[#7B42F6] shrink-0 transition-transform ${
                      isSelected ? 'translate-x-1 font-bold' : 'opacity-40'
                    }`} />
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E5DCF9]/70 text-[10px] font-mono">
                    <span className={`px-2 py-0.5 rounded-md border font-semibold ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-[#887D9F]">{sub.examWeightage}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Subproblem Teacher Card (7 Cols) */}
        {activeSubproblem && (
          <div className="lg:col-span-7 bg-[#F8F6FE] border-2 border-[#E5DCF9] rounded-2xl p-5 space-y-4">
            {/* Subproblem Header */}
            <div className="space-y-2 pb-3 border-b border-[#E5DCF9]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-black text-[#7B42F6] bg-white px-2.5 py-0.5 rounded-full border border-[#D4C7F5]">
                  Subproblem {activeSubproblem.number} of {subproblems.length}
                </span>
                <span className="text-[11px] font-mono font-extrabold text-[#92400E] bg-[#FEF9C3] px-2.5 py-0.5 rounded-full border border-[#FDE047]">
                  🎓 {activeSubproblem.examWeightage}
                </span>
              </div>

              <h4 className="text-base sm:text-lg font-black text-[#201538]">
                {activeSubproblem.title}
              </h4>
            </div>

            {/* Mathematical Recurrence / Formal Invariant */}
            <div className="p-3.5 bg-white rounded-xl border border-[#E5DCF9] space-y-1 font-mono">
              <span className="text-[10px] font-extrabold text-[#7B42F6] uppercase tracking-wider block">
                Mathematical Recurrence / Formal Invariant:
              </span>
              <p className="text-xs sm:text-sm font-black text-[#201538] bg-[#F4F0FF] p-2 rounded-lg border border-[#D4C7F5] overflow-x-auto">
                {activeSubproblem.recurrenceOrInvariant}
              </p>
            </div>

            {/* Why & How this Subproblem Decomposes (Student Teaching Explanation) */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#201538] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#7B42F6]" />
                <span>Pedagogical Teaching Guide (1st-Year Students):</span>
              </span>
              <p className="text-xs text-[#5B507A] leading-relaxed bg-white p-3.5 rounded-xl border border-[#E5DCF9]">
                {activeSubproblem.teachingExplanation}
              </p>
            </div>

            {/* Step-by-Step Dry-Run Execution */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#201538] flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Subproblem Step-by-Step Numerical Walkthrough:</span>
              </span>

              <div className="space-y-1.5">
                {activeSubproblem.stepByStepDryRun.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-2.5 bg-white rounded-xl border border-[#E5DCF9] text-xs flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#EDE8FE] text-[#7B42F6] font-mono text-[10px] font-black shrink-0 flex items-center justify-center mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="text-[#201538] leading-relaxed font-medium">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5DCF9]">
              <div className="text-[11px] text-[#887D9F] font-mono">
                KCT Autonomous Regulation 2025–2026
              </div>

              {activeSubproblem.runnableAlgoId && (
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onLaunchAlgorithm(activeSubproblem.runnableAlgoId!);
                  }}
                  className="px-4 py-2 bg-[#7B42F6] hover:bg-[#6830E0] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-transform active:scale-95 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Launch Live Simulation for this Subproblem</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
