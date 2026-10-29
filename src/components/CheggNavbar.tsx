import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  BookOpen,
  Layers,
  Radio,
  Sliders,
  ChevronDown,
  User,
  GraduationCap,
  Activity,
  Award,
  ExternalLink,
  X,
  Volume2,
  VolumeX,
  Menu,
  Clock
} from 'lucide-react';
import { CATEGORIES, ALGORITHMS, AlgorithmCategory, AlgorithmItem } from '../data/daaData';
import { soundFx } from '../utils/soundEffects';
import { PeacockLogo } from './PeacockLogo';

interface CheggNavbarProps {
  currentView: string;
  onNavigateView: (view: 'home' | 'category' | 'visualizer' | 'master_theorem' | 'compare' | 'classroom' | 'complexity_lab' | 'exam' | 'dashboard' | 'masterclass' | 'complexity_calculator') => void;
  selectedCategory: AlgorithmCategory;
  onSelectCategory: (cat: AlgorithmCategory) => void;
  selectedAlgorithm: AlgorithmItem;
  onSelectAlgorithm: (algo: AlgorithmItem) => void;
  onOpenSearch: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenMobileMenu?: () => void;
}

export const CheggNavbar: React.FC<CheggNavbarProps> = ({
  currentView,
  onNavigateView,
  selectedCategory,
  onSelectCategory,
  selectedAlgorithm,
  onSelectAlgorithm,
  onOpenSearch,
  isAudioMuted,
  onToggleAudio,
  onOpenMobileMenu
}) => {
  const [openDropdown, setOpenDropdown] = useState<'learn' | 'algorithms' | 'lab' | 'exam' | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCampusConnect, setShowCampusConnect] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menu: 'learn' | 'algorithms' | 'lab' | 'exam') => {
    soundFx.playClick();
    setOpenDropdown(prev => (prev === menu ? null : menu));
  };

  return (
    <>
      <header ref={navRef} className="sticky top-0 z-40 w-full bg-white border-b border-[#E5DCF9] select-none shadow-xs">
        {/* Main Navigation Bar */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 h-16 flex items-center justify-between gap-4">
          {/* Left Brand & Dropdown Links */}
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Mobile Menu Button */}
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-lg text-[#5B507A] hover:bg-[#F4F0FF]"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Logo - Distinctive Purple Periwinkle with Peacock Symbol */}
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigateView('home');
              }}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <PeacockLogo size={32} className="w-8 h-8 group-hover:scale-105 transition-transform" />
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#7B42F6] group-hover:opacity-90 transition-opacity">
                  Bharthi
                </span>
                <span className="text-[10px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-[#EDE8FE] text-[#6B32E8] border border-[#D4C7F5]">
                  DAA LAB
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links with Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-[#201538]">
              {/* 1. Learn Dropdown (Syllabus Units) */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('learn')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#7B42F6] hover:bg-[#F4F0FF] transition-colors ${
                    openDropdown === 'learn' || currentView === 'category' ? 'text-[#7B42F6] font-bold bg-[#F4F0FF]' : ''
                  }`}
                >
                  <span>Learn</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'learn' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'learn' && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-[#E5DCF9] rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-1 z-50 max-h-[440px] overflow-y-auto animate-in fade-in-50 slide-in-from-top-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#887D9F] font-mono uppercase tracking-wider border-b border-[#E5DCF9] flex justify-between">
                      <span>DAA Syllabus (16 Units)</span>
                      <span>KCT 23CS401</span>
                    </div>
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat);
                          onNavigateView('category');
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-[#F4F0FF] hover:text-[#7B42F6] transition-colors ${
                          selectedCategory.id === cat.id ? 'bg-[#EDE8FE] text-[#7B42F6] font-bold' : 'text-[#201538]'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="font-mono text-[10px] text-[#7B42F6] font-bold">{cat.indexStr}</span>
                          <span className="truncate">{cat.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#887D9F] shrink-0">{cat.lessonCount}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Algorithms Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('algorithms')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#7B42F6] hover:bg-[#F4F0FF] transition-colors ${
                    openDropdown === 'algorithms' || currentView === 'visualizer' ? 'text-[#7B42F6] font-bold bg-[#F4F0FF]' : ''
                  }`}
                >
                  <span>Algorithms</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'algorithms' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'algorithms' && (
                  <div className="absolute top-full left-0 mt-1 w-96 bg-white border border-[#E5DCF9] rounded-2xl shadow-xl p-3 z-50 max-h-[480px] overflow-y-auto animate-in fade-in-50 slide-in-from-top-2">
                    <div className="px-3 py-1.5 text-[11px] font-bold text-[#887D9F] font-mono uppercase tracking-wider border-b border-[#E5DCF9] flex justify-between">
                      <span>Interactive Algorithm Simulations</span>
                      <span>{ALGORITHMS.length} Runnable</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 pt-2">
                      {ALGORITHMS.map(algo => (
                        <button
                          key={algo.id}
                          onClick={() => {
                            onSelectAlgorithm(algo);
                            onNavigateView('visualizer');
                            setOpenDropdown(null);
                          }}
                          className={`text-left p-2 rounded-xl text-xs hover:bg-[#F4F0FF] hover:text-[#7B42F6] transition-colors ${
                            selectedAlgorithm.id === algo.id ? 'bg-[#EDE8FE] text-[#7B42F6] font-bold' : 'text-[#201538]'
                          }`}
                        >
                          <div className="font-bold truncate">{algo.name}</div>
                          <div className="text-[10px] font-mono text-[#887D9F]">{algo.complexity.worst}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Lab Suite Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('lab')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#7B42F6] hover:bg-[#F4F0FF] transition-colors ${
                    openDropdown === 'lab' || currentView === 'compare' || currentView === 'master_theorem' || currentView === 'classroom' || currentView === 'complexity_lab' ? 'text-[#7B42F6] font-bold bg-[#F4F0FF]' : ''
                  }`}
                >
                  <span>Lab Suite</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'lab' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'lab' && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-[#E5DCF9] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in-50 slide-in-from-top-2 space-y-1">
                    <button
                      onClick={() => {
                        onNavigateView('visualizer');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F0FF] hover:text-[#7B42F6] flex items-center gap-3 text-xs transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#EDE8FE] text-[#7B42F6] flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <div>
                        <div className="font-bold text-[#201538]">Real-Time Visualizer</div>
                        <div className="text-[10px] text-[#5B507A]">Step trace with Peacock DAA Mentor</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateView('complexity_lab');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F0FF] hover:text-[#7B42F6] flex items-center gap-3 text-xs transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#047857] flex items-center justify-center font-bold">
                        📈
                      </div>
                      <div>
                        <div className="font-bold text-[#201538]">Asymptotic Growth Lab</div>
                        <div className="text-[10px] text-[#5B507A]">Big-O curves, dominant terms &amp; loop analysis</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateView('compare');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F0FF] hover:text-[#7B42F6] flex items-center gap-3 text-xs transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FFF7D6] text-[#8C5300] flex items-center justify-center font-bold">
                        🏎️
                      </div>
                      <div>
                        <div className="font-bold text-[#201538]">Multi-Algo Race Arena</div>
                        <div className="text-[10px] text-[#5B507A]">Benchmark real-time sorting speeds</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateView('master_theorem');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F0FF] hover:text-[#7B42F6] flex items-center gap-3 text-xs transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#EBF7E3] text-[#33691E] flex items-center justify-center font-bold">
                        📐
                      </div>
                      <div>
                        <div className="font-bold text-[#201538]">Master Theorem Solver</div>
                        <div className="text-[10px] text-[#5B507A]">Recurrence solver for Unit 1 &amp; 2</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateView('complexity_calculator');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F0FF] hover:text-[#7B42F6] flex items-center gap-3 text-xs transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] text-[#7B42F6] border border-[#E9D5FF] flex items-center justify-center font-bold">
                        🧮
                      </div>
                      <div>
                        <div className="font-bold text-[#201538]">Asymptotic Complexity Calculator</div>
                        <div className="text-[10px] text-[#5B507A]">Recurrence solver &amp; arbitrary code loop inspector</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        onNavigateView('classroom');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F0FF] hover:text-[#7B42F6] flex items-center gap-3 text-xs transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#EDE8FE] text-[#7B42F6] flex items-center justify-center font-bold">
                        📡
                      </div>
                      <div>
                        <div className="font-bold text-[#201538]">Live Lab Classroom</div>
                        <div className="text-[10px] text-[#5B507A]">Real-time student collaboration room</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Exam Prep */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('exam')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg hover:text-[#7B42F6] hover:bg-[#F4F0FF] transition-colors ${
                    openDropdown === 'exam' || currentView === 'exam' ? 'text-[#7B42F6] font-bold bg-[#F4F0FF]' : ''
                  }`}
                >
                  <span>Exam Prep</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === 'exam' ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === 'exam' && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-[#E5DCF9] rounded-2xl shadow-xl p-3 z-50 animate-in fade-in-50 slide-in-from-top-2 space-y-2">
                    <div className="text-[11px] font-bold text-[#887D9F] font-mono uppercase tracking-wider border-b border-[#E5DCF9] pb-1 flex justify-between">
                      <span>KCT 23CS401 Exam Hub</span>
                      <span className="text-[#7B42F6]">Autonomous</span>
                    </div>
                    <div className="text-xs text-[#5B507A] leading-relaxed">
                      Part A (2-Mark), Part B &amp; C (5 &amp; 14-Mark) university question banks, loop invariant proofs, and timed mock assessments.
                    </div>
                    <div className="pt-1 flex flex-col gap-1.5">
                      <button
                        onClick={() => {
                          onNavigateView('exam');
                          setOpenDropdown(null);
                        }}
                        className="w-full text-center py-2 px-3 rounded-xl bg-[#7B42F6] hover:bg-[#6830E0] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        Launch Full Exam Preparation Center &rarr;
                      </button>
                      <button
                        onClick={() => {
                          onNavigateView('master_theorem');
                          setOpenDropdown(null);
                        }}
                        className="text-left text-xs font-bold text-[#7B42F6] hover:underline px-1"
                      >
                        → Solve Recurrences (T(n) = aT(n/b) + f(n))
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. 30-Min Masterclass Link */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  onNavigateView('masterclass');
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-[#7B42F6] hover:bg-[#F4F0FF] transition-colors cursor-pointer ${
                  currentView === 'masterclass' ? 'text-[#7B42F6] font-bold bg-[#F4F0FF]' : ''
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>30-Min Masterclass</span>
              </button>
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Bar / Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#F8F6FE] hover:bg-[#F1ECFD] border border-[#E5DCF9] text-xs text-[#5B507A] transition-colors"
              title="Search algorithms and syllabus (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-[#887D9F]" />
              <span className="hidden sm:inline">Search algorithms...</span>
              <kbd className="hidden sm:inline text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-[#E5DCF9] text-[#887D9F]">
                ⌘K
              </kbd>
            </button>

            {/* Sound FX Toggle */}
            <button
              onClick={onToggleAudio}
              title={isAudioMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              className="p-2 rounded-full border border-[#E5DCF9] text-[#5B507A] hover:text-[#201538] hover:bg-[#F4F0FF] transition-colors"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-[#887D9F]" /> : <Volume2 className="w-4 h-4 text-[#7B42F6]" />}
            </button>

            {/* My Progress Dashboard Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                onNavigateView('dashboard');
              }}
              className={`hidden sm:inline-flex items-center justify-center text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                currentView === 'dashboard'
                  ? 'bg-[#7B42F6] text-white border-[#7B42F6]'
                  : 'border-[#7B42F6] text-[#7B42F6] hover:bg-[#F4F0FF]'
              }`}
            >
              <span>📊 My Progress</span>
            </button>

            {/* Campus Connect Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                setShowCampusConnect(true);
              }}
              className="hidden md:inline-flex items-center justify-center text-xs font-bold px-4 py-1.5 rounded-full border border-[#7B42F6] text-[#7B42F6] hover:bg-[#F4F0FF] transition-all cursor-pointer"
            >
              Campus Connect
            </button>

            {/* Sign In / Student ID Button */}
            <button
              onClick={() => {
                soundFx.playClick();
                setShowStudentModal(true);
              }}
              className="inline-flex items-center justify-center text-xs font-bold px-5 py-2 rounded-full bg-[#7B42F6] hover:bg-[#6830E0] text-white shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Campus Connect Modal */}
      {showCampusConnect && (
        <div className="fixed inset-0 z-50 bg-[#1E1435]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#E5DCF9] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏛️</span>
                <h3 className="text-base font-black text-[#201538]">KCT Academic Campus Connect</h3>
              </div>
              <button
                onClick={() => setShowCampusConnect(false)}
                className="p-1 rounded-lg text-[#887D9F] hover:bg-[#F4F0FF] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs text-[#5B507A]">
              <p>
                Connected to <strong>Kumaraguru College of Technology (Autonomous)</strong> student portal for Department of Computer Science and Engineering.
              </p>
              <div className="p-3 rounded-2xl bg-[#EDE8FE] border border-[#D4C7F5] space-y-1">
                <div className="font-bold text-[#4C1D95]">Active Lab Course: 23CS401</div>
                <div className="text-[#5B507A]">Design and Analysis of Algorithms Laboratory (Theory &amp; Practical Integrated)</div>
              </div>
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between py-1 border-b border-[#E5DCF9]">
                  <span className="text-[#887D9F]">Class Incharge:</span>
                  <span className="font-bold text-[#201538]">Prof. DAA Course Faculty</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E5DCF9]">
                  <span className="text-[#887D9F]">Current Semester:</span>
                  <span className="font-bold text-[#201538]">Semester IV (Batch 2023–2027)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#887D9F]">Autonomous Regulation:</span>
                  <span className="font-bold text-[#201538]">R2022 / Choice Based Credit System</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowCampusConnect(false)}
                className="px-5 py-2 rounded-full bg-[#7B42F6] text-white font-bold text-xs hover:bg-[#6830E0]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Profile / Sign-In Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 bg-[#1E1435]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#E5DCF9] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5DCF9]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EDE8FE] text-[#7B42F6] flex items-center justify-center font-bold">
                  🎓
                </div>
                <h3 className="text-base font-black text-[#201538]">Student Portal Sign In</h3>
              </div>
              <button
                onClick={() => setShowStudentModal(false)}
                className="p-1 rounded-lg text-[#887D9F] hover:bg-[#F4F0FF] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-4 rounded-2xl bg-[#F8F6FE] border border-[#E5DCF9] flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#7B42F6] text-white flex items-center justify-center text-lg font-black shrink-0">
                  A
                </div>
                <div>
                  <div className="text-sm font-black text-[#201538]">Adhithya R.</div>
                  <div className="text-xs font-mono text-[#5B507A]">Roll: 720723104005 · CSE II Year</div>
                  <div className="text-[11px] text-[#689F38] font-bold mt-0.5">✓ KCT Verified Student Account</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-[#FFF7D6] border border-[#FFE082]">
                  <div className="text-[10px] text-[#8C5300] font-bold">CURRENT GPA</div>
                  <div className="text-base font-black text-[#8C5300] mt-0.5">8.92</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#EBF7E3] border border-[#C5E1A5]">
                  <div className="text-[10px] text-[#33691E] font-bold">LAB ATTENDANCE</div>
                  <div className="text-base font-black text-[#33691E] mt-0.5">96.4%</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowStudentModal(false);
                  onNavigateView('dashboard');
                }}
                className="w-full py-2.5 rounded-full bg-[#7B42F6] text-white font-bold text-xs hover:bg-[#6830E0] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Open Student Progress &amp; Lab Record</span>
                <span>&rarr;</span>
              </button>
              <button
                onClick={() => setShowStudentModal(false)}
                className="w-full py-2 rounded-full bg-[#F4F0FF] text-[#5B507A] font-bold text-xs hover:bg-[#EDE8FE] cursor-pointer"
              >
                Continue to Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
