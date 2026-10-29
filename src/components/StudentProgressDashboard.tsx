import React, { useState } from 'react';
import {
  ChevronLeft,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Download,
  Sparkles,
  Layers,
  GraduationCap,
  TrendingUp,
  FileText,
  Trophy,
  Shield,
  Star,
  Target,
  Zap,
  Check,
  Lock,
  Share2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CATEGORIES, ALGORITHMS, AlgorithmItem } from '../data/daaData';
import { soundFx } from '../utils/soundEffects';

export interface DaaAchievement {
  id: string;
  title: string;
  icon: string;
  badgeLevel: 'Bronze' | 'Silver' | 'Gold' | 'Diamond';
  description: string;
  category: string;
  xpPoints: number;
  requiredAlgoIds: string[];
  minRequiredCount?: number;
}

export const DAA_ACHIEVEMENTS: DaaAchievement[] = [
  {
    id: 'mastered_sorting',
    title: 'Mastered Sorting',
    icon: '🏆',
    badgeLevel: 'Gold',
    description: 'Conquered quadratic and logarithmic divide-and-conquer sorting algorithms with verified loop invariants.',
    category: 'Sorting Algorithms',
    xpPoints: 250,
    requiredAlgoIds: ['bubble_sort', 'selection_sort', 'insertion_sort', 'quick_sort', 'heap_sort'],
    minRequiredCount: 4
  },
  {
    id: 'dp_expert',
    title: 'DP Expert',
    icon: '🧠',
    badgeLevel: 'Diamond',
    description: 'Mastered optimal substructure and overlapping subproblems across 0/1 Knapsack & Longest Common Subsequence.',
    category: 'Dynamic Programming',
    xpPoints: 300,
    requiredAlgoIds: ['knapsack_dp', 'lcs_dp']
  },
  {
    id: 'graph_traversal_pro',
    title: 'Graph Traversal Pro',
    icon: '🌐',
    badgeLevel: 'Gold',
    description: 'Navigated complex vertex topologies with BFS, DFS, Dijkstra Shortest Path, and Kruskal Minimum Spanning Tree.',
    category: 'Graph Algorithms',
    xpPoints: 300,
    requiredAlgoIds: ['graph_bfs', 'graph_dfs', 'dijkstra_shortest_path', 'kruskal_mst'],
    minRequiredCount: 3
  },
  {
    id: 'recurrence_wizard',
    title: 'Recurrence Wizard',
    icon: '📐',
    badgeLevel: 'Silver',
    description: 'Analyzed asymptotic growth curves, Master Theorem cases, and recursion tree balancing limits.',
    category: 'Algorithmic Analysis',
    xpPoints: 200,
    requiredAlgoIds: ['asymptotic_growth', 'master_theorem']
  },
  {
    id: 'search_scout',
    title: 'Search Scout',
    icon: '🔍',
    badgeLevel: 'Bronze',
    description: 'Validated sequential iteration and logarithmic halving boundaries with linear & binary search.',
    category: 'Searching Algorithms',
    xpPoints: 150,
    requiredAlgoIds: ['linear_search', 'binary_search']
  },
  {
    id: 'branch_bound_strategist',
    title: 'Branch & Bound Strategist',
    icon: '✂️',
    badgeLevel: 'Gold',
    description: 'Pruned exponential state-space search trees using strict upper/lower bounding functions.',
    category: 'Branch & Bound',
    xpPoints: 250,
    requiredAlgoIds: ['knapsack_branch_bound', 'tsp_branch_bound'],
    minRequiredCount: 1
  },
  {
    id: 'divide_conquer_general',
    title: 'Divide & Conquer General',
    icon: '⚔️',
    badgeLevel: 'Silver',
    description: 'Subdivided problems recursively and combined linear-time solutions via Merge Sort and Karatsuba Multiplication.',
    category: 'Divide & Conquer',
    xpPoints: 200,
    requiredAlgoIds: ['merge_sort', 'karatsuba_mult', 'closest_pair'],
    minRequiredCount: 2
  },
  {
    id: 'loop_invariant_master',
    title: 'Loop Invariant Master',
    icon: '🛡️',
    badgeLevel: 'Bronze',
    description: 'Demonstrated formal mathematical induction (Initialization, Maintenance, Termination) on 5+ routines.',
    category: 'Formal Verification',
    xpPoints: 150,
    requiredAlgoIds: [],
    minRequiredCount: 5
  },
  {
    id: 'curriculum_scholar',
    title: 'Curriculum Scholar',
    icon: '🎖️',
    badgeLevel: 'Gold',
    description: 'Mastered 8 or more algorithm modules across the autonomous university syllabus.',
    category: 'Coursework Milestones',
    xpPoints: 300,
    requiredAlgoIds: [],
    minRequiredCount: 8
  },
  {
    id: 'grand_algorithmist',
    title: 'Grand Algorithmist',
    icon: '👑',
    badgeLevel: 'Diamond',
    description: 'Complete 100% syllabus mastery across all 16 autonomous laboratory curriculum modules!',
    category: 'Legendary Honor',
    xpPoints: 500,
    requiredAlgoIds: [],
    minRequiredCount: 16
  }
];

interface StudentProgressDashboardProps {
  completedIds: string[];
  onToggleComplete: (id: string) => void;
  onSelectAlgorithm: (algo: AlgorithmItem) => void;
  onBackToDashboard: () => void;
}

export const StudentProgressDashboard: React.FC<StudentProgressDashboardProps> = ({
  completedIds,
  onToggleComplete,
  onSelectAlgorithm,
  onBackToDashboard
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [selectedBadge, setSelectedBadge] = useState<DaaAchievement | null>(null);
  const studentName = 'Adhithya R.';
  const rollNumber = '720723104005';
  const department = 'Computer Science and Engineering (CSE II Year)';
  const courseCode = '23CS401 · Design & Analysis of Algorithms Laboratory';

  const totalAlgorithms = ALGORITHMS.length;
  const completedCount = completedIds.length;
  const progressPercent = Math.round((completedCount / totalAlgorithms) * 100);

  // Helper to evaluate badge unlock progress
  const evaluateBadge = (badge: DaaAchievement) => {
    if (badge.requiredAlgoIds.length > 0) {
      const doneCount = badge.requiredAlgoIds.filter(id => completedIds.includes(id)).length;
      const target = badge.minRequiredCount ?? badge.requiredAlgoIds.length;
      const isUnlocked = doneCount >= target;
      const progressRatio = Math.min(1, doneCount / target);
      return { isUnlocked, doneCount, target, progressRatio };
    } else {
      const target = badge.minRequiredCount ?? 1;
      const doneCount = Math.min(completedCount, target);
      const isUnlocked = completedCount >= target;
      const progressRatio = Math.min(1, completedCount / target);
      return { isUnlocked, doneCount, target, progressRatio };
    }
  };

  const unlockedBadges = DAA_ACHIEVEMENTS.filter(b => evaluateBadge(b).isUnlocked);
  const totalXp = unlockedBadges.reduce((acc, b) => acc + b.xpPoints, 0);

  // Determine Student Algorithmist Rank based on XP
  const getRank = (xp: number) => {
    if (xp >= 1500) return { title: 'Grandmaster Algorithmist', level: 5, color: 'text-amber-500' };
    if (xp >= 1000) return { title: 'Senior Algorithm Engineer', level: 4, color: 'text-purple-600' };
    if (xp >= 600) return { title: 'Journeyman Scholar', level: 3, color: 'text-indigo-600' };
    if (xp >= 250) return { title: 'Apprentice Algorithmist', level: 2, color: 'text-emerald-600' };
    return { title: 'Initiate Student', level: 1, color: 'text-slate-600' };
  };

  const rank = getRank(totalXp);

  // Group algorithms by paradigm
  const paradigms = [
    { name: 'Sorting & Searching', filter: (a: AlgorithmItem) => a.categoryId === 'sorting' || a.categoryId === 'searching' },
    { name: 'Divide & Conquer', filter: (a: AlgorithmItem) => a.categoryId === 'divide_conquer' || a.complexity.paradigm.includes('Divide') },
    { name: 'Greedy Technique', filter: (a: AlgorithmItem) => a.categoryId === 'greedy' || a.complexity.paradigm.includes('Greedy') },
    { name: 'Dynamic Programming', filter: (a: AlgorithmItem) => a.categoryId === 'dp' || a.complexity.paradigm.includes('Dynamic') },
    { name: 'Graph Algorithms', filter: (a: AlgorithmItem) => a.categoryId === 'graphs' },
    { name: 'Backtracking & Branch/Bound', filter: (a: AlgorithmItem) => a.categoryId === 'backtracking' || a.categoryId === 'branch_bound' }
  ];

  // Unmastered algorithms for personalized recommendation
  const unmastered = ALGORITHMS.filter(a => !completedIds.includes(a.id));
  const recommendedNext = unmastered.slice(0, 3);

  // Export Official Lab Progress Certificate
  const handleExportCertificate = () => {
    try {
      setIsExporting(true);
      soundFx.playClick();

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Header Banner (Deep Plum Purple)
      doc.setFillColor(32, 21, 56); // #201538
      doc.rect(0, 0, 210, 38, 'F');

      // Gold Accent Strip
      doc.setFillColor(245, 184, 0); // #F5B800
      doc.rect(0, 38, 210, 3, 'F');

      // Title & College
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('KUMARAGURU COLLEGE OF TECHNOLOGY', 105, 14, { align: 'center' });

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Autonomous Institution Affiliated to Anna University · Coimbatore - 641049', 105, 20, { align: 'center' });

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(245, 184, 0);
      doc.text('DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING', 105, 28, { align: 'center' });

      doc.setFontSize(9);
      doc.setTextColor(233, 213, 255);
      doc.text('23CS401 - DESIGN AND ANALYSIS OF ALGORITHMS LABORATORY', 105, 34, { align: 'center' });

      // Certificate Title
      doc.setTextColor(32, 21, 56);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('OFFICIAL LAB TRACE RECORD & CERTIFICATE', 105, 52, { align: 'center' });

      // Student Meta Box
      doc.setFillColor(248, 246, 254);
      doc.setDrawColor(229, 220, 249);
      doc.rect(14, 58, 182, 32, 'FD');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(123, 66, 246);
      doc.text(`Student Name: ${studentName}`, 20, 66);
      doc.text(`Roll Number: ${rollNumber}`, 120, 66);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(91, 80, 122);
      doc.text(`Department: ${department}`, 20, 74);
      doc.text(`Academic Year: 2025–2026 (Semester IV)`, 120, 74);

      doc.setFont('helvetica', 'bold');
      doc.setTextColor(16, 185, 129);
      doc.text(`Curriculum Mastery: ${completedCount} / ${totalAlgorithms} Modules (${progressPercent}%)`, 20, 83);
      doc.text(`Date of Issue: ${new Date().toLocaleDateString('en-GB')}`, 120, 83);

      // Table of Mastered Algorithms
      const tableData = ALGORITHMS.map((algo, idx) => {
        const isDone = completedIds.includes(algo.id);
        const cat = CATEGORIES.find(c => c.id === algo.categoryId);
        return [
          String(idx + 1),
          algo.name,
          cat ? `Unit ${cat.indexStr}` : '-',
          algo.complexity.worst,
          algo.complexity.space,
          isDone ? 'COMPLETED (100%)' : 'In Progress'
        ];
      });

      autoTable(doc, {
        startY: 96,
        head: [['#', 'Algorithm Title', 'Unit', 'Time (Worst)', 'Aux Space', 'Verification Status']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [123, 66, 246], // #7B42F6
          textColor: [255, 255, 255],
          fontSize: 8,
          fontStyle: 'bold',
          halign: 'center'
        },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          textColor: [32, 21, 56],
          lineColor: [229, 220, 249],
          lineWidth: 0.1
        },
        alternateRowStyles: {
          fillColor: [248, 246, 254]
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 10 },
          1: { halign: 'left', cellWidth: 50 },
          2: { halign: 'center', cellWidth: 20 },
          3: { halign: 'center', cellWidth: 25 },
          4: { halign: 'center', cellWidth: 25 },
          5: { halign: 'center', cellWidth: 35 }
        }
      });

      // Signature Block at footer
      const finalY = (doc as any).lastAutoTable?.finalY || 240;
      if (finalY < 260) {
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(136, 125, 159);
        doc.text('Digitally generated by Bharthi DAA Lab Execution Engine. Autonomous Course Evaluation Record.', 14, finalY + 12);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(32, 21, 56);
        doc.text('Student Signature', 25, finalY + 28);
        doc.text('Lab In-Charge / Faculty Signature', 125, finalY + 28);

        doc.setDrawColor(200, 185, 235);
        doc.line(20, finalY + 24, 75, finalY + 24);
        doc.line(120, finalY + 24, 185, finalY + 24);
      }

      doc.save(`KCT_DAA_Lab_Record_${rollNumber}.pdf`);
      soundFx.playSuccessChime();
    } catch (e) {
      console.error('Certificate export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            soundFx.playClick();
            onBackToDashboard();
          }}
          className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Syllabus Dashboard
        </button>

        <button
          onClick={handleExportCertificate}
          disabled={isExporting}
          className="text-xs font-bold text-white bg-[#7B42F6] hover:bg-[#6830E0] px-4 py-2 rounded-full shadow-xs transition-transform active:scale-95 flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Generating PDF...' : 'Export Official Lab Record (PDF)'}</span>
        </button>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F0EBFD]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-[#7B42F6] text-white flex items-center justify-center text-2xl font-black shadow-md shadow-[#7B42F6]/30">
              A
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-[#201538]">{studentName}</h1>
                <span className="text-[10px] bg-[#ECFDF5] text-[#065F46] font-extrabold px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                  ✓ KCT Verified
                </span>
              </div>
              <p className="text-xs font-mono text-[#5B507A] mt-0.5">
                Roll No: {rollNumber} · {department}
              </p>
              <p className="text-xs text-[#887D9F] mt-0.5">
                {courseCode}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#FFF7D6] border border-[#FFE082] text-center min-w-[90px]">
              <span className="text-[10px] font-mono font-bold text-[#8C5300]">CURRENT GPA</span>
              <div className="text-xl font-black text-[#8C5300]">8.92</div>
            </div>
            <div className="p-3 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-center min-w-[90px]">
              <span className="text-[10px] font-mono font-bold text-[#047857]">ATTENDANCE</span>
              <div className="text-xl font-black text-[#047857]">96.4%</div>
            </div>
          </div>
        </div>

        {/* Overall Mastery Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline text-xs font-mono">
            <span className="font-bold text-[#201538]">Overall Syllabus Mastery:</span>
            <span className="font-black text-[#7B42F6]">
              {completedCount} of {totalAlgorithms} Modules Mastered ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-3 bg-[#F4F0FF] rounded-full overflow-hidden border border-[#E5DCF9]">
            <div
              className="h-full bg-gradient-to-r from-[#7B42F6] via-[#9060FA] to-[#10B981] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Personalized Next Step Recommendations */}
      {recommendedNext.length > 0 && (
        <div className="bg-[#1E1435] text-white rounded-3xl p-6 shadow-xl space-y-4 border border-[#2E2050]">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#F5B800] font-black uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F5B800]" />
              Personalized Recommendations (Next Best Actions)
            </span>
            <span className="text-purple-200">Based on Autonomous Syllabus Weightage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {recommendedNext.map(algo => (
              <div
                key={algo.id}
                onClick={() => {
                  soundFx.playClick();
                  onSelectAlgorithm(algo);
                }}
                className="bg-[#2D1F4D] hover:bg-[#3E2D69] p-4 rounded-2xl border border-[#3E2D69] cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#F5B800] transition-colors">
                    {algo.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#F5B800] bg-[#3E2D69] px-2 py-0.5 rounded">
                    {algo.complexity.worst}
                  </span>
                </div>
                <p className="text-[11px] text-purple-200/80 line-clamp-2">
                  {algo.shortDesc}
                </p>
                <div className="text-[11px] font-bold text-[#F5B800] flex items-center gap-1 pt-1">
                  <span>Launch Visualizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DAA Achievement System - Digital Badges & Milestones Showcase */}
      <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#F0EBFD]">
          <div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#F5B800]" />
              <h2 className="text-xl font-black text-[#201538]">
                DAA Digital Achievements &amp; Badges
              </h2>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#EDE8FE] text-[#7B42F6] border border-[#D4C7F5]">
                {unlockedBadges.length} / {DAA_ACHIEVEMENTS.length} Unlocked
              </span>
            </div>
            <p className="text-xs text-[#5B507A] mt-1">
              Earn university badges and academic XP by verifying algorithm traces, solving recurrences, and mastering syllabus units.
            </p>
          </div>

          {/* XP & Current Rank Pill */}
          <div className="flex items-center gap-3 bg-[#F8F6FE] p-2.5 rounded-2xl border border-[#E5DCF9]">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl shadow-2xs">
              <Zap className="w-4 h-4 text-[#F5B800] fill-[#F5B800]" />
              <div className="text-xs font-mono font-black text-[#201538]">
                {totalXp} <span className="text-[#887D9F] text-[10px] font-normal">XP</span>
              </div>
            </div>
            <div className="text-left pr-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#887D9F] block">CURRENT TIER</span>
              <span className={`text-xs font-black ${rank.color}`}>{rank.title}</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 bg-[#F4F0FF] p-1 rounded-2xl border border-[#E5DCF9] text-xs font-bold">
            <button
              onClick={() => {
                soundFx.playClick();
                setBadgeFilter('all');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                badgeFilter === 'all'
                  ? 'bg-[#7B42F6] text-white shadow-2xs'
                  : 'text-[#5B507A] hover:text-[#7B42F6]'
              }`}
            >
              All Badges ({DAA_ACHIEVEMENTS.length})
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setBadgeFilter('unlocked');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                badgeFilter === 'unlocked'
                  ? 'bg-[#10B981] text-white shadow-2xs'
                  : 'text-[#5B507A] hover:text-[#10B981]'
              }`}
            >
              Unlocked ({unlockedBadges.length})
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setBadgeFilter('locked');
              }}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                badgeFilter === 'locked'
                  ? 'bg-[#F5B800] text-[#201538] shadow-2xs'
                  : 'text-[#5B507A] hover:text-[#8C5300]'
              }`}
            >
              In Progress ({DAA_ACHIEVEMENTS.length - unlockedBadges.length})
            </button>
          </div>

          <span className="text-xs text-[#887D9F] font-mono">
            Click any badge to inspect criteria &amp; launch missing algorithms
          </span>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
          {DAA_ACHIEVEMENTS.filter(badge => {
            const { isUnlocked } = evaluateBadge(badge);
            if (badgeFilter === 'unlocked') return isUnlocked;
            if (badgeFilter === 'locked') return !isUnlocked;
            return true;
          }).map(badge => {
            const { isUnlocked, doneCount, target, progressRatio } = evaluateBadge(badge);

            const levelColors = {
              Bronze: 'border-[#CD7F32]/40 bg-[#FFF8F0] text-[#8C4A00]',
              Silver: 'border-slate-300 bg-slate-50 text-slate-700',
              Gold: 'border-[#F5B800]/50 bg-[#FFFDF5] text-[#8C5300]',
              Diamond: 'border-cyan-300 bg-[#F0FDFA] text-cyan-800'
            };

            return (
              <div
                key={badge.id}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedBadge(badge);
                }}
                className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                  isUnlocked
                    ? 'border-[#7B42F6] bg-gradient-to-b from-white to-[#FAF8FF] shadow-xs hover:shadow-md hover:-translate-y-0.5'
                    : 'border-[#E5DCF9] bg-[#FBF9FE] opacity-80 hover:opacity-100 hover:border-[#D4C7F5]'
                }`}
              >
                {/* Top Badge Icon & Tier */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs transition-transform group-hover:scale-110 duration-200"
                      style={{
                        backgroundColor: isUnlocked ? '#EDE8FE' : '#F1EDFA',
                        border: isUnlocked ? '2px solid #7B42F6' : '1px solid #E5DCF9'
                      }}
                    >
                      {badge.icon}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full border ${levelColors[badge.badgeLevel]}`}>
                        {badge.badgeLevel}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#7B42F6] flex items-center gap-0.5">
                        +{badge.xpPoints} XP
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-xs font-black text-[#201538] group-hover:text-[#7B42F6] transition-colors leading-snug">
                    {badge.title}
                  </h3>
                  <span className="text-[10px] font-mono text-[#887D9F] block mb-2">
                    {badge.category}
                  </span>

                  <p className="text-[11px] text-[#5B507A] leading-relaxed line-clamp-2 mb-3">
                    {badge.description}
                  </p>
                </div>

                {/* Bottom Progress & Unlock Status */}
                <div className="space-y-1.5 pt-2 border-t border-[#F0EBFD]">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                    <span className="text-[#5B507A]">
                      {isUnlocked ? (
                        <span className="text-[#10B981] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#10B981]" /> Unlocked
                        </span>
                      ) : (
                        <span className="text-[#887D9F] flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Locked
                        </span>
                      )}
                    </span>
                    <span className="text-[#7B42F6]">
                      {doneCount}/{target}
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-[#EDE8FE] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isUnlocked ? 'bg-[#10B981]' : 'bg-[#7B42F6]'
                      }`}
                      style={{ width: `${Math.round(progressRatio * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Badge Detailed Inspection Modal */}
      {selectedBadge && (() => {
        const { isUnlocked, doneCount, target, progressRatio } = evaluateBadge(selectedBadge);
        return (
          <div className="fixed inset-0 z-50 bg-[#1E1435]/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-[#E5DCF9] space-y-5 animate-in zoom-in-95">
              <div className="flex items-start justify-between pb-3 border-b border-[#F0EBFD]">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#EDE8FE] border-2 border-[#7B42F6] flex items-center justify-center text-3xl shadow-sm">
                    {selectedBadge.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-[#201538]">
                        {selectedBadge.title}
                      </h3>
                      <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-[#FFF7D6] text-[#8C5300] border border-[#FFE082]">
                        {selectedBadge.badgeLevel} Tier
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#7B42F6] mt-0.5">
                      {selectedBadge.category} · +{selectedBadge.xpPoints} Academic XP
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBadge(null)}
                  className="p-1.5 rounded-xl text-[#887D9F] hover:bg-[#F4F0FF] text-base cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#201538] font-mono uppercase tracking-wider">
                  Achievement Description
                </h4>
                <p className="text-xs sm:text-sm text-[#5B507A] leading-relaxed bg-[#F8F6FE] p-3.5 rounded-2xl border border-[#E5DCF9]">
                  {selectedBadge.description}
                </p>
              </div>

              {/* Progress Summary */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-[#201538]">Milestone Progress:</span>
                  <span className="font-black text-[#7B42F6]">
                    {doneCount} of {target} required ({Math.round(progressRatio * 100)}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#F4F0FF] rounded-full overflow-hidden border border-[#E5DCF9]">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isUnlocked ? 'bg-[#10B981]' : 'bg-[#7B42F6]'
                    }`}
                    style={{ width: `${Math.round(progressRatio * 100)}%` }}
                  />
                </div>
              </div>

              {/* Required Algorithms Checklist */}
              {selectedBadge.requiredAlgoIds.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#201538] font-mono uppercase tracking-wider">
                    Required Algorithms Checklist (Click to Launch Visualizer):
                  </h4>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {selectedBadge.requiredAlgoIds.map(algoId => {
                      const algo = ALGORITHMS.find(a => a.id === algoId);
                      const isDone = completedIds.includes(algoId);
                      if (!algo) return null;

                      return (
                        <div
                          key={algoId}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#E5DCF9] hover:border-[#7B42F6] transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className={isDone ? 'text-[#10B981]' : 'text-slate-300'}>
                              {isDone ? <CheckCircle2 className="w-4 h-4 text-[#10B981]" /> : <Lock className="w-4 h-4 text-slate-300" />}
                            </span>
                            <span className="text-xs font-bold text-[#201538]">
                              {algo.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#887D9F] bg-[#F4F0FF] px-1.5 py-0.5 rounded">
                              {algo.complexity.worst}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                soundFx.playClick();
                                onToggleComplete(algo.id);
                              }}
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                                isDone
                                  ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                                  : 'bg-[#F4F0FF] text-[#7B42F6] hover:bg-[#EDE8FE]'
                              }`}
                            >
                              {isDone ? '✓ Mastered' : '+ Mark Done'}
                            </button>

                            <button
                              onClick={() => {
                                soundFx.playClick();
                                setSelectedBadge(null);
                                onSelectAlgorithm(algo);
                              }}
                              className="text-[10px] font-bold text-white bg-[#7B42F6] hover:bg-[#6830E0] px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                            >
                              <span>Trace</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Status footer banner */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#5B507A]">
                  {isUnlocked ? '🎉 Congratulations! You have claimed this badge.' : '⚡ Practice and dry-run these algorithms to unlock.'}
                </span>
                <button
                  onClick={() => setSelectedBadge(null)}
                  className="px-4 py-2 bg-[#7B42F6] text-white rounded-full font-bold text-xs hover:bg-[#6830E0] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Paradigm Breakdown Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-[#201538] font-mono uppercase tracking-wider">
          Mastery Breakdown by Algorithmic Paradigm
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paradigms.map((p, idx) => {
            const list = ALGORITHMS.filter(p.filter);
            const doneInP = list.filter(a => completedIds.includes(a.id)).length;
            const pct = list.length > 0 ? Math.round((doneInP / list.length) * 100) : 0;

            return (
              <div
                key={idx}
                className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-4 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#201538]">{p.name}</span>
                  <span className="text-xs font-mono font-black text-[#7B42F6]">
                    {doneInP}/{list.length}
                  </span>
                </div>

                <div className="w-full h-2 bg-[#F4F0FF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7B42F6] rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="space-y-1 pt-1 border-t border-[#F0EBFD]">
                  {list.slice(0, 4).map(algo => {
                    const isDone = completedIds.includes(algo.id);
                    return (
                      <div
                        key={algo.id}
                        className="flex items-center justify-between text-xs py-0.5"
                      >
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onSelectAlgorithm(algo);
                          }}
                          className="text-[#5B507A] hover:text-[#7B42F6] truncate max-w-[170px] text-left cursor-pointer"
                        >
                          {algo.name}
                        </button>
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            onToggleComplete(algo.id);
                          }}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                            isDone
                              ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                              : 'bg-[#F4F0FF] text-[#887D9F] hover:bg-[#EDE8FE]'
                          }`}
                        >
                          {isDone ? '✓ Mastered' : '+ Mark'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
