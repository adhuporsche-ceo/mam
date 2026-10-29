import React, { useState, useEffect } from 'react';
import {
  CATEGORIES,
  ALGORITHMS,
  AlgorithmCategory,
  AlgorithmItem,
  AlgorithmStep
} from './data/daaData';
import { executeAlgorithm } from './engine/algorithmRegistry';
import { CartoonStage } from './components/animation/CartoonStage';
import { VisualizerCanvas } from './components/VisualizerCanvas';
import { PlaybackDeck } from './components/PlaybackDeck';
import { ComplexityCard } from './components/ComplexityCard';
import { CodeTraceView } from './components/CodeTraceView';
import { DryRunWorksheet } from './components/DryRunWorksheet';
import { StepPredictionQuiz } from './components/StepPredictionQuiz';
import { MasterTheoremSolver } from './components/MasterTheoremSolver';
import { AlgorithmComparator } from './components/AlgorithmComparator';
import { LiveClassroomSession } from './components/LiveClassroomSession';
import { ComplexityGrowthLab } from './components/ComplexityGrowthLab';
import { ExamPrepStudio } from './components/ExamPrepStudio';
import { StudentProgressDashboard } from './components/StudentProgressDashboard';
import { RealtimeVariableWatcher } from './components/RealtimeVariableWatcher';
import { CheggNavbar } from './components/CheggNavbar';
import { OnThisPageNav } from './components/OnThisPageNav';
import { CheggRightSidebar } from './components/CheggRightSidebar';
import { SearchModal } from './components/SearchModal';
import { soundFx } from './utils/soundEffects';
import { PeacockLogo } from './components/PeacockLogo';
import { SubproblemTeachingStudio } from './components/SubproblemTeachingStudio';
import { GlossaryTooltip } from './components/GlossaryTooltip';
import { Masterclass30Min } from './components/Masterclass30Min';
import { AsymptoticComplexityCalculator } from './components/AsymptoticComplexityCalculator';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  PlayCircle,
  Layers,
  CheckCircle2,
  Code2,
  Lock,
  Radio,
  Volume2,
  VolumeX,
  School,
  Activity,
  Sliders,
  Check,
  X,
  Shuffle,
  ShieldCheck,
  Calendar,
  Clock,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'visualizer' | 'master_theorem' | 'compare' | 'classroom' | 'complexity_lab' | 'exam' | 'dashboard' | 'masterclass' | 'complexity_calculator'>('visualizer');
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory>(CATEGORIES[5]); // Sorting Algorithms
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmItem>(ALGORITHMS[0]); // Bubble sort
  const [activeTab, setActiveTab] = useState<'walkthrough' | 'subproblems' | 'quiz' | 'dryrun' | 'code' | 'curriculum' | 'telemetry' | 'summary'>('walkthrough');
  const [activeSection, setActiveSection] = useState<string>('sec-summary');
  const [isAudioMuted, setIsAudioMuted] = useState(soundFx.getMuted());
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomInputModalOpen, setIsCustomInputModalOpen] = useState(false);
  const [customInputString, setCustomInputString] = useState('65, 35, 80, 25, 90, 45, 15, 70');

  useEffect(() => {
    const bootTimer = window.setTimeout(() => setIsBooting(false), 2000);
    return () => window.clearTimeout(bootTimer);
  }, []);

  // Student progress in localStorage
  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bharthi_completed_algorithms');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleComplete = (id: string) => {
    setCompletedIds(prev => {
      const updated = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('bharthi_completed_algorithms', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Algorithm step state
  const [currentInput, setCurrentInput] = useState<number[]>(selectedAlgorithm.defaultInput);
  const [steps, setSteps] = useState<AlgorithmStep[]>(() => executeAlgorithm(selectedAlgorithm.id, selectedAlgorithm.defaultInput));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [stageMode, setStageMode] = useState<'cartoon' | 'engineering'>('cartoon');
  const [reducedMotion, setReducedMotion] = useState(false);

  // Keyboard shortcut for Command+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync default input when algorithm changes
  useEffect(() => {
    setCurrentInput(selectedAlgorithm.defaultInput);
  }, [selectedAlgorithm.id, selectedAlgorithm.defaultInput]);

  // Generate steps whenever selectedAlgorithm or currentInput changes
  useEffect(() => {
    const newSteps = executeAlgorithm(selectedAlgorithm.id, currentInput);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [selectedAlgorithm.id, currentInput]);

  // Automated stepping loop with real-time sound effects
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      const delayMs = Math.max(120, 1000 / playbackSpeed);
      timer = setTimeout(() => {
        setCurrentStepIndex(prev => {
          const next = prev + 1;
          const nextStep = steps[next];
          if (nextStep) {
            if (nextStep.swappedIndices && nextStep.swappedIndices.length > 0) {
              soundFx.playSwapSound();
            } else if (nextStep.activeIndices && nextStep.activeIndices.length > 0) {
              soundFx.playComparisonSound();
            } else if (next === steps.length - 1) {
              soundFx.playSuccessChime();
            }
          }
          return next;
        });
      }, delayMs);
    } else if (isPlaying && currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
      soundFx.playSuccessChime();
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentStepIndex, steps, playbackSpeed]);

  const currentStep: AlgorithmStep = steps[currentStepIndex] || {
    stepIndex: 0,
    totalSteps: 1,
    description: 'Initial state of array.',
    codeLine: 1,
    arrayState: currentInput,
    variables: {}
  };
  const stageProgress = steps.length > 1
    ? Math.round((currentStepIndex / (steps.length - 1)) * 100)
    : 100;
  const sceneDomain = currentStep.graphNodes?.length
    ? 'GRAPH EXPLORATION'
    : currentStep.dpTable
    ? 'DYNAMIC PROGRAMMING'
    : selectedAlgorithm.id === 'rat_in_maze' ||
      selectedAlgorithm.id === 'n_queens' ||
      currentStep.queensPlacement?.length
    ? 'BACKTRACKING'
    : currentStep.stackState || currentStep.queueState
    ? 'DATA STRUCTURE'
    : currentStep.arrayState
    ? 'ARRAY TRACE'
    : 'ALGORITHM TRACE';

  const handleToggleAudio = () => {
    const next = soundFx.toggleMute();
    setIsAudioMuted(next);
  };

  const handleSelectAlgorithm = (algo: AlgorithmItem) => {
    setSelectedAlgorithm(algo);
    const cat = CATEGORIES.find(c => c.id === algo.categoryId) || selectedCategory;
    setSelectedCategory(cat);
    setCurrentView('visualizer');
    setSidebarOpen(false);
  };

  const handleCustomInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = customInputString
      .split(/[\s,]+/)
      .map(x => parseInt(x.trim(), 10))
      .filter(x => !isNaN(x) && x > 0 && x <= 999);
    if (parsed.length >= 2) {
      setCurrentInput(parsed.slice(0, 16));
      setIsCustomInputModalOpen(false);
      soundFx.playSuccessChime();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6FE] text-[#201538] flex flex-col font-sans selection:bg-[#7B42F6] selection:text-white">
      {isBooting && (
        <div
          className="lab-boot-screen fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden px-5 py-8"
          role="status"
          aria-live="polite"
          aria-label="Loading ADHITHYA DAA Lab"
        >
          <div className="lab-boot-orb lab-boot-orb-left" />
          <div className="lab-boot-orb lab-boot-orb-right" />

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
            <div className="absolute left-0 top-0 hidden items-center gap-2 rounded-full border border-[#E8C9B9] bg-white/70 px-4 py-2 font-mono text-[11px] font-bold tracking-wider text-[#7C5146] shadow-sm sm:flex">
              <Code2 className="h-4 w-4 text-[#C97965]" />
              ADHITHYA DAA LAB · LEARNING CORE
            </div>
            <div className="absolute right-0 top-0 hidden items-center gap-4 sm:flex">
              <span className="rounded-full border border-[#E8C9B9] bg-white/70 px-4 py-2 font-mono text-[10px] font-bold tracking-wider text-[#7C5146]">
                23CS401 · READY
              </span>
            </div>

            <div className="lab-boot-emblem mt-8 flex h-36 w-36 items-center justify-center rounded-full sm:mt-12 sm:h-44 sm:w-44">
              <div className="flex h-[calc(100%-12px)] w-[calc(100%-12px)] items-center justify-center rounded-full bg-gradient-to-br from-[#32243B] via-[#201538] to-[#493449] text-white shadow-inner">
                <img
                  src="/assets/bharathi-wolf-logo.png"
                  alt="ADHITHYA wolf and sword logo"
                  className="h-[82%] w-[82%] object-contain"
                />
              </div>
            </div>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#E8B9A8] bg-[#F8E3DA]/80 px-4 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.24em] text-[#914B3D]">
              <Code2 className="h-3.5 w-3.5" />
              Interactive learning system
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-[0.12em] text-[#41251F] drop-shadow-sm sm:text-6xl md:text-7xl">
              ADHITHYA
            </h1>
            <div className="mt-2 rounded-full border border-[#D88F79] bg-[#F8E3DA]/80 px-5 py-1.5 font-mono text-xs font-black uppercase tracking-[0.3em] text-[#884537] sm:text-sm">
              DAA · ALGORITHM LAB
            </div>
            <p className="mt-4 max-w-xl text-xs font-semibold uppercase tracking-[0.16em] text-[#80675D] sm:text-sm">
              Explore algorithms. Follow every step. Understand the why.
            </p>

            <div className="mt-8 flex h-12 items-center justify-center gap-2" aria-hidden="true">
              {[0, 1, 2, 3, 4].map(dot => (
                <span key={dot} className="lab-boot-dot" style={{ animationDelay: `${dot * 110}ms` }} />
              ))}
            </div>

            <div className="mt-3 w-full max-w-lg">
              <div className="h-2 overflow-hidden rounded-full border border-[#E8C9B9] bg-[#F4DFD6]">
                <div className="lab-boot-progress h-full rounded-full bg-gradient-to-r from-[#D99A87] via-[#C97965] to-[#9E6258]" />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[10px] font-semibold text-[#71584F] sm:text-xs">
                <span className="text-left">Preparing your algorithm studio...</span>
                <span className="shrink-0 text-[#A95C4B]">2 SEC</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[10px] text-[#80675D] sm:text-xs">
              <span className="rounded-full border border-[#E8C9B9] bg-white/60 px-3 py-1.5 font-bold">
                DEVELOPED BY ADHITHYA
              </span>
              <span aria-hidden="true">•</span>
              <span>Interactive Algorithm Visualizer</span>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP NAVBAR */}
      <CheggNavbar
        currentView={currentView}
        onNavigateView={view => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={cat => {
          setSelectedCategory(cat);
          const firstAlgo = ALGORITHMS.find(a => a.categoryId === cat.id);
          if (firstAlgo) setSelectedAlgorithm(firstAlgo);
          setCurrentView('category');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        selectedAlgorithm={selectedAlgorithm}
        onSelectAlgorithm={handleSelectAlgorithm}
        onOpenSearch={() => setIsSearchOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenMobileMenu={() => setSidebarOpen(true)}
      />

      {/* Global Quick Search Modal (⌘K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAlgorithm={handleSelectAlgorithm}
      />

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#1E1435]/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#E5DCF9] transform transition-transform duration-200 ease-in-out lg:hidden flex flex-col justify-between pt-4 pb-6 px-4 shadow-2xl ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
          <div className="flex items-center gap-2">
            <PeacockLogo size={24} className="w-6 h-6" />
            <span className="text-xl font-black text-[#7B42F6]">Bharthi DAA</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded text-[#887D9F] hover:bg-[#F4F0FF]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {/* Quick Learning Suite Links */}
          <div className="space-y-1 pb-2 border-b border-[#E5DCF9]">
            <div className="text-[10px] font-mono font-bold text-[#887D9F] uppercase tracking-wider px-2 mb-1">
              Interactive Learning Labs
            </div>
            <button
              onClick={() => {
                setCurrentView('masterclass');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'masterclass' ? 'bg-[#EDE8FE] text-[#7B42F6]' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>⏱️ 30-Min Exam Masterclass</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('visualizer');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'visualizer' ? 'bg-[#EDE8FE] text-[#7B42F6]' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>⚡ Real-Time Visualizer</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('complexity_calculator');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'complexity_calculator' ? 'bg-[#EDE8FE] text-[#7B42F6]' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>🧮 Asymptotic Complexity Calculator</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('complexity_lab');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'complexity_lab' ? 'bg-[#EDE8FE] text-[#7B42F6]' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>📈 Asymptotic Growth Lab</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('exam');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'exam' ? 'bg-[#EDE8FE] text-[#7B42F6]' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>🎓 Exam Prep Center</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('dashboard');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'dashboard' ? 'bg-[#EDE8FE] text-[#7B42F6]' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>📊 My Progress &amp; Lab Record</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('master_theorem');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'master_theorem' ? 'bg-[#EDE8FE] text-[#7B42F6]' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>📐 Master Theorem Solver</span>
            </button>
            <button
              onClick={() => {
                setCurrentView('compare');
                setSidebarOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                currentView === 'compare' ? 'bg-[#EDE8FE] text-[#7B42F6]' : 'text-[#201538] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>🏎️ Multi-Algo Race Arena</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-[#887D9F] uppercase tracking-wider px-2 mb-1">
              DAA Syllabus (16 Units)
            </div>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat);
                  const firstAlgo = ALGORITHMS.find(a => a.categoryId === cat.id);
                  if (firstAlgo) setSelectedAlgorithm(firstAlgo);
                  setCurrentView('category');
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between ${
                  selectedCategory.id === cat.id ? 'bg-[#EDE8FE] text-[#7B42F6] font-bold' : 'text-[#201538] hover:bg-[#F4F0FF]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-mono text-[#7B42F6] font-bold">{cat.indexStr}</span>
                  <span className="truncate">{cat.title}</span>
                </div>
                <span className="text-[10px] font-mono text-[#887D9F]">{cat.lessonCount}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[#E5DCF9] text-xs text-[#887D9F] font-mono">
          KCT CSE 23CS401 · 2025–2026
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER (Edge-to-Edge Full Page Width) */}
      <div className="flex-1 w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* ============================================================= */}
        {/* VIEW: VISUALIZER (Full-Page Edge-to-Edge Visualizer Studio)   */}
        {/* ============================================================= */}
        {currentView === 'visualizer' && (
          <div className="space-y-5 w-full">
            {/* 1. STUDIO HEADER & COMMAND BAR */}
            <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-4 sm:p-5 shadow-sm shadow-[#8C52FF]/5 flex flex-wrap items-center justify-between gap-4">
              {/* Left: Quick Path & Instant Algorithm Selector Dropdown */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <nav className="flex items-center gap-1.5 text-xs font-bold text-[#5B507A]">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setCurrentView('home');
                    }}
                    className="hover:text-[#7B42F6] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>🏠 Home</span>
                  </button>
                  <span className="text-[#D4C7F5]">›</span>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setCurrentView('category');
                    }}
                    className="hover:text-[#7B42F6] transition-colors cursor-pointer truncate max-w-[160px] sm:max-w-none"
                  >
                    {selectedCategory.title}
                  </button>
                  <span className="text-[#D4C7F5]">›</span>
                </nav>

                {/* Instant Algorithm Switcher Dropdown */}
                <div className="relative">
                  <select
                    value={selectedAlgorithm.id}
                    onChange={e => {
                      const target = ALGORITHMS.find(a => a.id === e.target.value);
                      if (target) handleSelectAlgorithm(target);
                    }}
                    className="text-xs sm:text-sm font-black text-[#201538] bg-[#F4F0FF] border-2 border-[#D4C7F5] rounded-2xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#7B42F6] cursor-pointer shadow-2xs"
                  >
                    {CATEGORIES.map(cat => (
                      <optgroup key={cat.id} label={`${cat.indexStr}. ${cat.title}`}>
                        {ALGORITHMS.filter(a => a.categoryId === cat.id).map(algo => (
                          <option key={algo.id} value={algo.id}>
                            {algo.name} ({algo.complexity.worst})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Asymptotic Badge */}
                <GlossaryTooltip term="asymptotic">
                  <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#FFF7D6] text-[#8C5300] border border-[#FFE082] shadow-2xs cursor-help">
                    {selectedAlgorithm.complexity.worst}
                  </span>
                </GlossaryTooltip>

                {completedIds.includes(selectedAlgorithm.id) && (
                  <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#EBF7E3] text-[#33691E] border border-[#C5E1A5]">
                    ✓ Mastered
                  </span>
                )}
              </div>

              {/* Right: Stage Mode, Scenario Presets & Motion Controls */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {/* Stage Mode Tabs */}
                <div className="flex items-center gap-1 bg-[#F4F0FF] p-1 rounded-2xl border border-[#E5DCF9]">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setStageMode('cartoon');
                    }}
                    className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      stageMode === 'cartoon'
                        ? 'bg-[#7B42F6] text-white shadow-xs'
                        : 'text-[#5B507A] hover:text-[#7B42F6] hover:bg-white/60'
                    }`}
                  >
                    <span>🎨 Cartoon Stage</span>
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      setStageMode('engineering');
                    }}
                    className={`flex items-center gap-1.5 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      stageMode === 'engineering'
                        ? 'bg-[#7B42F6] text-white shadow-xs'
                        : 'text-[#5B507A] hover:text-[#7B42F6] hover:bg-white/60'
                    }`}
                  >
                    <span>⚙️ Engineering Canvas</span>
                  </button>
                </div>

                {/* Scenario Presets (For Array algorithms) */}
                {(selectedAlgorithm.id.includes('sort') || selectedAlgorithm.id.includes('search')) && (
                  <div className="hidden md:flex items-center gap-1 bg-[#F4F0FF] p-1 rounded-2xl border border-[#E5DCF9] text-xs font-mono font-bold">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        const rand = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
                        setCurrentInput(rand);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[#5B507A] hover:text-[#201538] hover:bg-white transition-colors"
                      title="Generate random array"
                    >
                      🎲 Random
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentInput([15, 25, 38, 42, 60, 55, 78, 90]);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[#5B507A] hover:text-[#201538] hover:bg-white transition-colors"
                      title="Nearly sorted array"
                    >
                      📈 Nearly Sorted
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentInput([95, 85, 72, 60, 48, 35, 20, 10]);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[#5B507A] hover:text-[#201538] hover:bg-white transition-colors"
                      title="Reverse sorted array"
                    >
                      📉 Reversed
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setIsCustomInputModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-xl text-[#7B42F6] hover:bg-white font-extrabold transition-colors"
                      title="Custom input array"
                    >
                      ✏️ Custom
                    </button>
                  </div>
                )}

                {/* Reduced Motion Toggle */}
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border transition-all ${
                    reducedMotion
                      ? 'bg-[#FFF7D6] text-[#8C5300] border-[#FFE082]'
                      : 'bg-[#F4F0FF] text-[#5B507A] border-[#E5DCF9] hover:border-[#D4C7F5]'
                  }`}
                >
                  {reducedMotion ? '✓ Motion: Calm' : 'Motion: Animated'}
                </button>
              </div>
            </div>

            {/* 2. FULL-PAGE CARTOON ANIMATION STAGE (Immediate Full Width Edge-to-Edge) */}
            <div className="w-full">
              <section className={`cinematic-stage relative isolate w-full overflow-hidden rounded-[2rem] border border-[#E5DCF9] bg-white p-1.5 shadow-[0_18px_50px_-32px_rgba(91,70,130,0.38)] sm:p-2 ${reducedMotion ? 'cinematic-stage-calm' : ''}`}>
                <div className="relative z-10 flex flex-col gap-4 p-4 sm:p-6">
                  <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <div className="min-w-0 space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800">
                          <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${reducedMotion ? '' : 'animate-pulse'}`} />
                          Live algorithm filmroom
                        </span>
                        <span className="rounded-full border border-[#E5DCF9] bg-[#F8F6FE] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B32E8]">
                          {sceneDomain}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight text-[#201538] sm:text-3xl">
                          {selectedAlgorithm.name}
                        </h2>
                        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[#5B507A]">
                          {selectedAlgorithm.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:min-w-[360px]">
                      <div className="rounded-2xl border border-[#E5DCF9] bg-[#FBFAFF] px-3 py-2.5">
                        <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#887D9F]">Frame</div>
                        <div className="mt-1 font-mono text-sm font-black text-[#201538]">
                          {String(currentStepIndex + 1).padStart(2, '0')}
                          <span className="text-[#A99DBD]"> / {String(steps.length).padStart(2, '0')}</span>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-[#E5DCF9] bg-[#FBFAFF] px-3 py-2.5">
                        <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#887D9F]">Comparisons</div>
                        <div className="mt-1 font-mono text-sm font-black text-[#8C5300]">
                          {currentStep.comparisonsCount ?? currentStep.stats?.comparisons ?? 0}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-[#E5DCF9] bg-[#FBFAFF] px-3 py-2.5">
                        <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#887D9F]">Complexity</div>
                        <div className="mt-1 font-mono text-sm font-black text-emerald-800">
                          {selectedAlgorithm.complexity.worst}
                        </div>
                      </div>
                    </div>
                  </header>

                  <div
                    className="h-1 overflow-hidden rounded-full bg-[#EDE8FE]"
                    role="progressbar"
                    aria-label="Algorithm walkthrough progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={stageProgress}
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#8C52FF] via-[#C084FC] to-[#10B981] transition-[width] duration-500"
                      style={{ width: `${stageProgress}%` }}
                    />
                  </div>

                  <div className="rounded-[1.5rem] bg-[#F8F6FE] p-1.5 sm:p-2">
                    {stageMode === 'cartoon' ? (
                      <CartoonStage
                        step={currentStep}
                        algorithmId={selectedAlgorithm.id}
                        algorithmName={selectedAlgorithm.name}
                        reducedMotion={reducedMotion}
                      />
                    ) : (
                      <VisualizerCanvas step={currentStep} algorithmId={selectedAlgorithm.id} />
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* 3. REAL-TIME VARIABLE WATCHER & CPU INVARIANTS (Full Width) */}
            <div className="w-full">
              <RealtimeVariableWatcher step={currentStep} algorithmId={selectedAlgorithm.id} />
            </div>

            {/* 4. FULL-WIDTH PLAYBACK DECK CONTROLS */}
            <div className="w-full">
              <PlaybackDeck
                currentStepIndex={currentStepIndex}
                totalSteps={steps.length}
                isPlaying={isPlaying}
                playbackSpeed={playbackSpeed}
                onPlayPauseToggle={() => setIsPlaying(!isPlaying)}
                onStepForward={() => {
                  if (currentStepIndex < steps.length - 1) {
                    const next = currentStepIndex + 1;
                    setCurrentStepIndex(next);
                    setIsPlaying(false);
                    const st = steps[next];
                    if (st?.swappedIndices?.length) soundFx.playSwapSound();
                    else soundFx.playComparisonSound();
                  }
                }}
                onStepBackward={() => {
                  if (currentStepIndex > 0) {
                    setCurrentStepIndex(currentStepIndex - 1);
                    setIsPlaying(false);
                    soundFx.playClick();
                  }
                }}
                onJumpStart={() => {
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                  soundFx.playClick();
                }}
                onJumpEnd={() => {
                  setCurrentStepIndex(steps.length - 1);
                  setIsPlaying(false);
                  soundFx.playSuccessChime();
                }}
                onReset={() => {
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                  soundFx.playClick();
                }}
                onSpeedChange={s => setPlaybackSpeed(s)}
                onPresetRandom={() => {
                  const rand = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
                  setCurrentInput(rand);
                }}
                onPresetNearlySorted={() => setCurrentInput([15, 25, 38, 42, 60, 55, 78, 90])}
                onPresetReversed={() => setCurrentInput([95, 85, 72, 60, 48, 35, 20, 10])}
                onCustomInputSubmit={input => setCurrentInput(input)}
                onScrubStep={idx => setCurrentStepIndex(idx)}
                hasArrayInput={selectedAlgorithm.id.includes('sort') || selectedAlgorithm.id.includes('search')}
              />
            </div>

            {/* 5. FULL-WIDTH SECONDARY LEARNING & WORKSHOP SUITE */}
            <div className="w-full space-y-4 pt-1">
              {/* Studio Tabs Navigation */}
              <div className="flex items-center gap-2 border-b-2 border-[#E5DCF9] pb-1 overflow-x-auto select-none">
                {[
                  { id: 'walkthrough', label: '📊 Asymptotic Complexity & Rating' },
                  { id: 'subproblems', label: '🧩 Subproblem Teaching Deck (Decomposition)' },
                  { id: 'dryrun', label: '📝 Lab Dry-Run Worksheet' },
                  { id: 'code', label: '💻 Multi-Language Code (C++, Java, Python)' },
                  { id: 'quiz', label: '🎯 Step Prediction Quiz' },
                  { id: 'curriculum', label: '📚 DAA Syllabus (16 Units · 38+ Algorithms)' },
                  { id: 'telemetry', label: '⚙️ Real-Time Engine Telemetry' },
                  { id: 'summary', label: '📋 Summary & Examination Proofs' }
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

              {/* Tab 1: Asymptotic Complexity & Invariant Proofs */}
              {activeTab === 'walkthrough' && (
                <div className="w-full">
                  <ComplexityCard
                    algorithm={selectedAlgorithm}
                    isCompleted={completedIds.includes(selectedAlgorithm.id)}
                    onToggleComplete={() => toggleComplete(selectedAlgorithm.id)}
                  />
                </div>
              )}

              {/* Tab 1b: Subproblem Teaching Deck (Requirement 3) */}
              {activeTab === 'subproblems' && (
                <div className="w-full">
                  <SubproblemTeachingStudio
                    algorithm={selectedAlgorithm}
                    category={selectedCategory}
                    onLaunchAlgorithm={algoId => {
                      const target = ALGORITHMS.find(a => a.id === algoId);
                      if (target) handleSelectAlgorithm(target);
                    }}
                    onJumpToStep={stepIdx => {
                      setCurrentStepIndex(stepIdx);
                      setIsPlaying(false);
                    }}
                  />
                </div>
              )}

              {/* Tab 2: Dry Run Worksheet */}
              {activeTab === 'dryrun' && (
                <div className="w-full">
                  <DryRunWorksheet
                    steps={steps}
                    currentStepIndex={currentStepIndex}
                    algorithmTitle={selectedAlgorithm.name}
                    onSelectStep={idx => {
                      setCurrentStepIndex(idx);
                      setIsPlaying(false);
                    }}
                  />
                </div>
              )}

              {/* Tab 3: Code Trace View */}
              {activeTab === 'code' && (
                <div className="w-full">
                  <CodeTraceView
                    codeSnippets={selectedAlgorithm.codeSnippets}
                    activeLine={currentStep.codeLine}
                  />
                </div>
              )}

              {/* Tab 4: Prediction Quiz */}
              {activeTab === 'quiz' && (
                <div className="w-full">
                  {currentStep.quiz ? (
                    <StepPredictionQuiz quiz={currentStep.quiz} />
                  ) : (
                    <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-8 text-center space-y-2 shadow-sm shadow-[#8C52FF]/5">
                      <Code2 className="w-6 h-6 text-[#7B42F6] mx-auto animate-pulse" />
                      <h3 className="text-sm font-black text-[#201538]">
                        Interactive Step Prediction Point
                      </h3>
                      <p className="text-xs text-[#5B507A] max-w-sm mx-auto">
                        In sorting algorithms, advance to Step 3 or 4 to test element comparison and swapping predictions!
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 5: DAA Syllabus Curriculum Browser (Full Width Grid) */}
              {activeTab === 'curriculum' && (
                <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm shadow-[#8C52FF]/5 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
                    <div>
                      <h3 className="text-base font-black text-[#201538]">
                        DAA 23CS401 Autonomous Curriculum Library
                      </h3>
                      <p className="text-xs text-[#5B507A]">
                        Select any unit or algorithm to launch its live cartoon simulation.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#7B42F6] bg-[#EDE8FE] px-3 py-1 rounded-full border border-[#D4C7F5]">
                      16 Units · 35+ Algorithms
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {CATEGORIES.map(cat => (
                      <div
                        key={cat.id}
                        className={`p-3.5 rounded-2xl border-2 transition-all ${
                          selectedCategory.id === cat.id
                            ? 'bg-[#F4F0FF] border-[#7B42F6] shadow-xs'
                            : 'bg-white border-[#E5DCF9] hover:border-[#D4C7F5]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs font-black text-[#7B42F6]">
                            Unit {cat.indexStr}
                          </span>
                          <span className="text-[10px] font-mono text-[#5B507A] bg-[#EDE8FE] px-2 py-0.5 rounded-md">
                            {cat.lessonCount}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#201538] mb-2 truncate">
                          {cat.title}
                        </h4>
                        <div className="space-y-1">
                          {ALGORITHMS.filter(a => a.categoryId === cat.id).map(algo => (
                            <button
                              key={algo.id}
                              onClick={() => {
                                soundFx.playClick();
                                handleSelectAlgorithm(algo);
                              }}
                              className={`w-full text-left px-2 py-1 rounded-lg text-[11px] font-mono flex items-center justify-between transition-colors ${
                                selectedAlgorithm.id === algo.id
                                  ? 'bg-[#7B42F6] text-white font-black'
                                  : 'text-[#5B507A] hover:bg-[#F4F0FF] hover:text-[#201538]'
                              }`}
                            >
                              <span className="truncate">{algo.name}</span>
                              <span className="text-[9px] opacity-75">{algo.complexity.worst}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 6: Hardware Engine & Telemetry */}
              {activeTab === 'telemetry' && (
                <div className="w-full">
                  <CheggRightSidebar
                    algorithmName={selectedAlgorithm.name}
                    currentStep={currentStep}
                    currentStepIndex={currentStepIndex}
                    totalSteps={steps.length}
                    isPlaying={isPlaying}
                    onTogglePlay={() => setIsPlaying(!isPlaying)}
                    playbackSpeed={playbackSpeed}
                    onChangeSpeed={s => setPlaybackSpeed(s)}
                    onPresetRandom={() => {
                      const rand = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 10);
                      setCurrentInput(rand);
                    }}
                    onPresetNearlySorted={() => setCurrentInput([15, 25, 38, 42, 60, 55, 78, 90])}
                    onPresetReversed={() => setCurrentInput([95, 85, 72, 60, 48, 35, 20, 10])}
                    onOpenCustomModal={() => setIsCustomInputModalOpen(true)}
                    isAudioMuted={isAudioMuted}
                    onToggleAudio={handleToggleAudio}
                    onLaunchRaceArena={() => setCurrentView('compare')}
                  />
                </div>
              )}

              {/* Tab 7: Algorithm Invariant Summary */}
              {activeTab === 'summary' && (
                <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm shadow-[#8C52FF]/5 space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#E5DCF9]">
                    <span className="text-xl">📋</span>
                    <div>
                      <h3 className="text-base font-black text-[#201538]">
                        {selectedAlgorithm.name} · Formal Invariant &amp; Examination Notes
                      </h3>
                      <p className="text-xs text-[#5B507A]">
                        KCT CSE 23CS401 Tier-1 Syllabus Academic Regulation
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#201538] leading-relaxed">
                    <li className="flex items-start gap-2.5 bg-[#F8F6FE] p-3 rounded-2xl border border-[#E5DCF9]">
                      <span className="text-[#7B42F6] font-black text-base leading-none">•</span>
                      <span>
                        <strong>Real-Time Deterministic Simulation:</strong> Live execution advances step-by-step with synchronized register mutations, array element swaps, and sound feedback.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 bg-[#F8F6FE] p-3 rounded-2xl border border-[#E5DCF9]">
                      <span className="text-[#7B42F6] font-black text-base leading-none">•</span>
                      <span>
                        <strong>Verified Loop Invariants:</strong> Formal mathematical proof invariants are verified at every iteration for KCT Autonomous 16-mark examinations.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 bg-[#F8F6FE] p-3 rounded-2xl border border-[#E5DCF9]">
                      <span className="text-[#7B42F6] font-black text-base leading-none">•</span>
                      <span>
                        <strong>Multi-Language Implementations:</strong> Line-by-line synchronized source code available in standard C++, Java, and Python with dynamic PC line cursor.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 bg-[#F8F6FE] p-3 rounded-2xl border border-[#E5DCF9]">
                      <span className="text-[#7B42F6] font-black text-base leading-none">•</span>
                      <span>
                        <strong>Interactive Dry-Run Worksheet:</strong> Fillable student tracing matrix designed for laboratory evaluations and autonomous internal assessments.
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: HOME DASHBOARD (Clean EdTech ERP Overview)              */}
        {/* ============================================================= */}
        {currentView === 'home' && (
          <div className="space-y-8">
            {/* Editorial Hero Banner */}
            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-10 shadow-sm shadow-[#8C52FF]/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#EDE8FE]/50 rounded-full blur-3xl pointer-events-none" />
              {/* Floating Animatic Graphic Badges */}
              <div className="absolute top-6 right-10 hidden xl:flex items-center gap-2 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-2xl border border-[#D4C7F5] shadow-xs animate-float-slow pointer-events-none">
                <span className="text-base">🦚</span>
                <span className="text-[11px] font-mono font-bold text-[#047857]">Peacock DAA Mentor</span>
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden xl:flex items-center gap-2 bg-[#FAF5FF]/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#E9D5FF] text-[10px] font-mono font-bold text-[#7B42F6] animate-float-bob pointer-events-none">
                <span>✨ 35+ Animated Interactive Simulations</span>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8FE] border border-[#D4C7F5] text-xs font-bold text-[#7B42F6] shadow-2xs">
                    <Code2 className="w-3.5 h-3.5 text-[#FFB800] animate-spin" style={{ animationDuration: '6s' }} />
                    <span>A little curiosity. A lot of clarity.</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#201538] leading-tight">
                    Big algorithmic ideas.<br />
                    <span className="text-[#7B42F6] drop-shadow-xs">
                      One real-time step at a time.
                    </span>
                  </h1>

                  <p className="text-sm text-[#5B507A] max-w-xl leading-relaxed">
                    Interactive real-time algorithm visualizer and DAA learning platform for Kumaraguru College of Technology students. Learn algorithmic intuition, step through live cartoon traces, benchmark algorithm races, and prepare for university examinations effortlessly.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        const bubbleAlgo = ALGORITHMS.find(a => a.id === 'bubble_sort') || ALGORITHMS[0];
                        setSelectedAlgorithm(bubbleAlgo);
                        setCurrentView('visualizer');
                      }}
                      className="px-6 py-3 bg-[#7B42F6] hover:bg-[#6830E0] text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-md transition-transform active:scale-95 cursor-pointer hover:shadow-lg hover:shadow-[#7B42F6]/30"
                    >
                      <span className="text-base">🚀</span>
                      <span>Launch Visualizer Studio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentView('masterclass');
                      }}
                      className="px-5 py-3 bg-[#FEF9C3] hover:bg-[#FDE047] text-[#854D0E] border-2 border-[#F5B800] rounded-full text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Clock className="w-4 h-4 text-[#B45309] animate-spin" style={{ animationDuration: '10s' }} />
                      <span>⚡ 30-Min Exam Masterclass</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentView('complexity_calculator');
                      }}
                      className="px-5 py-3 bg-[#EDE8FE] hover:bg-[#D4C7F5] text-[#7B42F6] border-2 border-[#D4C7F5] rounded-full text-xs font-black transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <span>🧮 Asymptotic Calculator</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentView('complexity_lab');
                      }}
                      className="px-5 py-3 bg-[#F8F6FE] hover:bg-[#EDE8FE] text-[#201538] border border-[#E5DCF9] rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>📈 Growth Lab</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentView('exam');
                      }}
                      className="px-5 py-3 bg-[#F8F6FE] hover:bg-[#EDE8FE] text-[#201538] border border-[#E5DCF9] rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>🎓 Exam Prep</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentView('classroom');
                      }}
                      className="px-5 py-3 bg-[#F8F6FE] hover:bg-[#EDE8FE] text-[#201538] border border-[#E5DCF9] rounded-full text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Radio className="w-3.5 h-3.5 text-[#7B42F6]" />
                      <span>Live Classroom</span>
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick();
                        setCurrentView('compare');
                      }}
                      className="px-5 py-3 bg-[#F8F6FE] hover:bg-[#EDE8FE] text-[#201538] border border-[#E5DCF9] rounded-full text-xs font-bold transition-colors cursor-pointer"
                    >
                      Race Arena
                    </button>
                  </div>
                </div>

                {/* Hero Interactive Metric Box */}
                <div className="lg:col-span-5">
                  <div className="bg-[#1E1435] text-white rounded-3xl p-6 shadow-xl border border-[#2E2050] space-y-4 relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#7B42F6]/30 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#FFC72C] font-black uppercase text-[11px] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#8BC34A] animate-ping" />
                        From confusion to clarity
                      </span>
                      <span className="font-bold text-purple-200 bg-[#2D1F4D] px-2 py-0.5 rounded border border-[#3E2D69] shadow-2xs">
                        O(n log n)
                      </span>
                    </div>

                    <div className="h-32 flex items-end justify-center gap-2 pt-2">
                      {[35, 65, 45, 90, 55, 75].map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group/bar cursor-pointer"
                          onClick={() => soundFx.playPop()}
                        >
                          <span className="text-[10px] font-mono text-purple-200/80 mb-1 group-hover/bar:text-[#F5B800] transition-colors">{val}</span>
                          <div
                            style={{ height: `${(val / 90) * 100}%` }}
                            className={`w-full rounded-t-lg transition-all duration-300 group-hover/bar:scale-105 ${
                              idx === 3 ? 'bg-[#7B42F6] shadow-md shadow-[#7B42F6]/50' : idx === 1 ? 'bg-[#FFC72C]' : 'bg-[#3E2D69]'
                            }`}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] font-mono text-purple-200/70 pt-2 border-t border-[#2E2050] flex justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8BC34A] animate-pulse" />
                        Live CPU Simulation
                      </span>
                      <span className="text-[#8BC34A] font-bold">● Active 24 kHz</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Learning Tracks */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider block font-mono">
                  CHOOSE YOUR NEXT STEP
                </span>
                <h2 className="text-xl font-extrabold text-[#201538]">
                  A path for every curious mind
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => {
                    soundFx.playClick();
                    const bubbleAlgo = ALGORITHMS.find(a => a.id === 'bubble_sort') || ALGORITHMS[0];
                    setSelectedAlgorithm(bubbleAlgo);
                    setCurrentView('visualizer');
                  }}
                  className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-5 shadow-2xs hover:border-[#7B42F6] cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider font-mono">
                      START HERE
                    </span>
                    <span className="text-lg font-mono font-bold text-[#D4C7F5]">01</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#201538] group-hover:text-[#7B42F6] transition-colors">
                    Start with the fundamentals
                  </h3>
                  <p className="text-xs text-[#5B507A] leading-relaxed">
                    Build intuition with sorting, searching, and asymptotic algorithm analysis.
                  </p>
                  <div className="text-xs font-bold text-[#7B42F6] flex items-center gap-1">
                    <span>Let&apos;s get started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div
                  onClick={() => {
                    soundFx.playClick();
                    const bfsAlgo = ALGORITHMS.find(a => a.id === 'graph_bfs') || ALGORITHMS[0];
                    setSelectedAlgorithm(bfsAlgo);
                    setCurrentView('visualizer');
                  }}
                  className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-5 shadow-2xs hover:border-[#7B42F6] cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider font-mono">
                      EXPLORE
                    </span>
                    <span className="text-lg font-mono font-bold text-[#D4C7F5]">02</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#201538] group-hover:text-[#7B42F6] transition-colors">
                    Think in graphs &amp; queues
                  </h3>
                  <p className="text-xs text-[#5B507A] leading-relaxed">
                    Explore node connections, queue level traversals, and shortest path trees.
                  </p>
                  <div className="text-xs font-bold text-[#7B42F6] flex items-center gap-1">
                    <span>Let&apos;s get started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div
                  onClick={() => {
                    soundFx.playClick();
                    const knapsackAlgo = ALGORITHMS.find(a => a.id === 'knapsack_dp') || ALGORITHMS[0];
                    setSelectedAlgorithm(knapsackAlgo);
                    setCurrentView('visualizer');
                  }}
                  className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-5 shadow-2xs hover:border-[#7B42F6] cursor-pointer transition-all space-y-3 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider font-mono">
                      CONCEPT LIBRARY
                    </span>
                    <span className="text-lg font-mono font-bold text-[#D4C7F5]">03</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#201538] group-hover:text-[#7B42F6] transition-colors">
                    Dynamic programming &amp; memoization
                  </h3>
                  <p className="text-xs text-[#5B507A] leading-relaxed">
                    Build your understanding of 0/1 knapsack, recurrence relations, and DP tables.
                  </p>
                  <div className="text-xs font-bold text-[#7B42F6] flex items-center gap-1">
                    <span>Let&apos;s get started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* 16 Syllabus Categories Grid */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#7B42F6] uppercase tracking-wider block font-mono">
                  YOUR ALGORITHM LIBRARY
                </span>
                <h2 className="text-2xl font-extrabold text-[#201538] tracking-tight">
                  16 Curriculum Modules · 35+ Live Interactive Traces
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {CATEGORIES.map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedCategory(cat);
                      setCurrentView('category');
                    }}
                    className="bg-white border-2 border-[#E5DCF9] rounded-2xl p-4 shadow-2xs hover:border-[#7B42F6] cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <span className="text-lg font-mono font-bold text-[#7B42F6]">
                        {cat.indexStr}
                      </span>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-[#201538] truncate group-hover:text-[#7B42F6] transition-colors">
                          {cat.title}
                        </h4>
                        <span className="text-[11px] text-[#5B507A]">
                          {cat.lessonCount} lessons
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#887D9F] group-hover:text-[#7B42F6] group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: CATEGORY DETAILS (Curriculum Module View)               */}
        {/* ============================================================= */}
        {currentView === 'category' && (
          <div className="space-y-6">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Syllabus Dashboard
            </button>

            <div className="bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 sm:p-8 shadow-sm shadow-[#8C52FF]/5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7B42F6]">
                <span>Unit {selectedCategory.indexStr}</span>
                <span>•</span>
                <span>{selectedCategory.lessonCount} Lessons &amp; Explorations</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#201538] tracking-tight">
                {selectedCategory.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#5B507A] max-w-2xl leading-relaxed">
                {selectedCategory.description}
              </p>
            </div>

            {/* Subproblem Teaching & Decomposition Deck for this Unit (Requirement 3) */}
            <div className="w-full">
              <SubproblemTeachingStudio
                algorithm={selectedAlgorithm}
                category={selectedCategory}
                onLaunchAlgorithm={algoId => {
                  const target = ALGORITHMS.find(a => a.id === algoId);
                  if (target) handleSelectAlgorithm(target);
                }}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-[#887D9F] uppercase tracking-wider font-mono">
                  Interactive Runnable Modules in Unit {selectedCategory.indexStr}
                </h2>
                <span className="text-xs font-mono text-[#7B42F6] font-bold">
                  {ALGORITHMS.filter(a => a.categoryId === selectedCategory.id).length} Runnable Simulations
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALGORITHMS.filter(a => a.categoryId === selectedCategory.id).map(algo => {
                  const isDone = completedIds.includes(algo.id);
                  return (
                    <div
                      key={algo.id}
                      onClick={() => {
                        soundFx.playClick();
                        setSelectedAlgorithm(algo);
                        setCurrentView('visualizer');
                      }}
                      className={`bg-white border-2 rounded-2xl p-5 shadow-2xs cursor-pointer hover:border-[#7B42F6] transition-all space-y-3 ${
                        isDone ? 'border-[#8BC34A] ring-1 ring-[#C5E1A5]' : 'border-[#E5DCF9]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-[#201538]">
                          {algo.name}
                        </h3>
                        {isDone && (
                          <span className="text-[10px] bg-[#EBF7E3] text-[#33691E] font-bold px-2.5 py-0.5 rounded-full border border-[#C5E1A5]">
                            Mastered
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5B507A] leading-relaxed">
                        {algo.shortDesc}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E5DCF9] text-[11px] font-mono text-[#5B507A]">
                        <span>Worst: {algo.complexity.worst}</span>
                        <span>Space: {algo.complexity.space}</span>
                        <span className="text-[#7B42F6] font-bold flex items-center gap-1">
                          Launch Visualizer &rarr;
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: LIVE CLASSROOM                                          */}
        {/* ============================================================= */}
        {currentView === 'classroom' && (
          <div className="space-y-6">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <LiveClassroomSession
              onSelectAlgorithm={algoId => {
                soundFx.playClick();
                const target = ALGORITHMS.find(a => a.id === algoId) || ALGORITHMS[0];
                handleSelectAlgorithm(target);
              }}
            />
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: MASTER THEOREM SOLVER                                   */}
        {/* ============================================================= */}
        {currentView === 'master_theorem' && (
          <div className="space-y-6">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <MasterTheoremSolver />
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: MULTI-ALGO RACE ARENA                                   */}
        {/* ============================================================= */}
        {currentView === 'compare' && (
          <div className="space-y-6">
            <button
              onClick={() => {
                soundFx.playClick();
                setCurrentView('home');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#7B42F6] hover:underline cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <AlgorithmComparator />
          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW: ASYMPTOTIC COMPLEXITY GROWTH LAB                         */}
        {/* ============================================================= */}
        {currentView === 'complexity_lab' && (
          <ComplexityGrowthLab
            onBackToDashboard={() => {
              soundFx.playClick();
              setCurrentView('home');
            }}
            onLaunchVisualizer={() => {
              soundFx.playClick();
              setCurrentView('visualizer');
            }}
            onOpenMasterTheorem={() => {
              soundFx.playClick();
              setCurrentView('master_theorem');
            }}
            onOpenComplexityCalculator={() => {
              soundFx.playClick();
              setCurrentView('complexity_calculator');
            }}
          />
        )}

        {/* ============================================================= */}
        {/* VIEW: ASYMPTOTIC COMPLEXITY CALCULATOR & RECURRENCE SOLVER     */}
        {/* ============================================================= */}
        {currentView === 'complexity_calculator' && (
          <AsymptoticComplexityCalculator
            onBackToDashboard={() => {
              soundFx.playClick();
              setCurrentView('home');
            }}
            onLaunchVisualizer={algoId => {
              soundFx.playClick();
              const target = ALGORITHMS.find(a => a.id === algoId) || ALGORITHMS[0];
              handleSelectAlgorithm(target);
            }}
          />
        )}

        {/* ============================================================= */}
        {/* VIEW: UNIVERSITY EXAM PREPARATION CENTER                      */}
        {/* ============================================================= */}
        {currentView === 'exam' && (
          <ExamPrepStudio
            onBackToDashboard={() => {
              soundFx.playClick();
              setCurrentView('home');
            }}
            onLaunchVisualizer={() => {
              soundFx.playClick();
              setCurrentView('visualizer');
            }}
            onOpenComplexityCalculator={() => {
              soundFx.playClick();
              setCurrentView('complexity_calculator');
            }}
          />
        )}

        {/* ============================================================= */}
        {/* VIEW: STUDENT PROGRESS & LAB COMPLETION DASHBOARD             */}
        {/* ============================================================= */}
        {currentView === 'dashboard' && (
          <StudentProgressDashboard
            completedIds={completedIds}
            onToggleComplete={toggleComplete}
            onSelectAlgorithm={algo => {
              handleSelectAlgorithm(algo);
            }}
            onBackToDashboard={() => {
              soundFx.playClick();
              setCurrentView('home');
            }}
          />
        )}

        {/* ============================================================= */}
        {/* VIEW: 30-MINUTE HIGH-YIELD ANIMATED MASTERCLASS               */}
        {/* ============================================================= */}
        {currentView === 'masterclass' && (
          <Masterclass30Min
            onBackToDashboard={() => {
              soundFx.playClick();
              setCurrentView('home');
            }}
            onLaunchAlgorithm={algoId => {
              soundFx.playClick();
              const target = ALGORITHMS.find(a => a.id === algoId) || ALGORITHMS[0];
              handleSelectAlgorithm(target);
            }}
          />
        )}
      </div>

      {/* 3. CUSTOM ARRAY INPUT MODAL */}
      {isCustomInputModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1E1435]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E5DCF9] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
              <div className="flex items-center gap-2">
                <span className="text-xl">✏️</span>
                <h3 className="text-base font-black text-[#201538]">Enter Custom Input Array</h3>
              </div>
              <button
                onClick={() => setIsCustomInputModalOpen(false)}
                className="p-1 rounded-lg text-[#887D9F] hover:bg-[#F4F0FF] text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCustomInputSubmit} className="mt-4 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#201538]">Comma-separated numbers (2 to 16 elements):</label>
                <input
                  type="text"
                  value={customInputString}
                  onChange={e => setCustomInputString(e.target.value)}
                  placeholder="e.g. 45, 12, 89, 34, 25, 77"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#E5DCF9] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#7B42F6]"
                />
              </div>

              <div className="text-[11px] text-[#5B507A]">
                Values should be positive integers. The real-time simulator will immediately compile and start tracing this dataset.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomInputModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#E5DCF9] text-[#5B507A] font-bold text-xs hover:bg-[#F4F0FF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#7B42F6] text-white font-bold text-xs hover:bg-[#6830E0] shadow-xs"
                >
                  Load &amp; Run
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. FOOTER */}
      <footer className="mt-auto bg-white border-t-2 border-[#E5DCF9] py-6 px-4 sm:px-6 lg:px-8 text-xs text-[#5B507A] select-none">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <PeacockLogo size={20} className="w-5 h-5" />
            <span className="font-black text-[#201538] text-sm">Bharthi DAA Visualizer</span>
            <span>·</span>
            <span>KCT Computer Science &amp; Engineering Department</span>
          </div>

          <div className="flex items-center gap-4 text-[#887D9F] font-mono text-[11px]">
            <span>Course Code: 23CS401</span>
            <span>•</span>
            <span>Regulation 2022 CBCS</span>
            <span>•</span>
            <span>Real-Time Engine v2.4</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
