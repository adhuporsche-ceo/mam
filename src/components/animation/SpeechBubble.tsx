import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Code2, GraduationCap, Cpu } from 'lucide-react';
import { soundFx } from '../../utils/soundEffects';

export type ExplanationMode = 'beginner' | 'exam' | 'technical';

export interface SpeechBubbleProps {
  currentStep?: {
    description?: string;
    variables?: Record<string, string>;
    stepIndex?: number;
    totalSteps?: number;
    codeLine?: number;
    swappedIndices?: number[];
    activeIndices?: number[];
    sortedIndices?: number[];
    pivotIndex?: number;
    targetIndex?: number;
    [key: string]: any;
  };
  description?: string;
  variables?: Record<string, string>;
  algorithmName?: string;
  stepIndex?: number;
  totalSteps?: number;
  className?: string;
  onAlgoClick?: () => void;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  currentStep,
  description: directDescription,
  variables: directVariables,
  algorithmName = 'Algorithm Execution',
  stepIndex: directStepIndex,
  totalSteps: directTotalSteps,
  className = '',
  onAlgoClick
}) => {
  // Prefer currentStep properties, falling back to direct props
  const description = currentStep?.description ?? directDescription ?? 'Observing algorithm state and invariant verification...';
  const variables = currentStep?.variables ?? directVariables ?? {};
  const stepIndex = currentStep?.stepIndex ?? directStepIndex ?? 0;
  const totalSteps = currentStep?.totalSteps ?? directTotalSteps ?? 1;

  const [mode, setMode] = useState<ExplanationMode>('beginner');
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [isBlinking, setIsBlinking] = useState(false);
  const [algoBounce, setAlgoBounce] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speaking when step changes or unmounts
  useEffect(() => {
    return () => {
      soundFx.stopSpeaking();
    };
  }, [stepIndex]);

  // Blinking animation for Algo's eyes
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  const handleToggleSound = () => {
    const next = soundFx.toggleMute();
    setIsMuted(next);
  };

  const handleSpeak = () => {
    soundFx.playPop();
    if (isSpeaking) {
      soundFx.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const ok = soundFx.speak(displayedText, () => {
        setIsSpeaking(false);
      });
      if (!ok) setIsSpeaking(false);
    }
  };

  const handleAlgoClick = () => {
    soundFx.playBoing();
    setAlgoBounce(true);
    setTimeout(() => setAlgoBounce(false), 500);
    handleSpeak();
    if (onAlgoClick) onAlgoClick();
  };

  // Student-focused explanation tailored by mode
  let displayedText = description;
  let modeBadge = 'Intuitive Analogy';

  if (mode === 'exam') {
    modeBadge = 'KCT 23CS401 Exam Standard';
    if (variables.status === 'Sorted' || variables.status === 'Completed') {
      displayedText = `Exam Note: Loop invariant holds. Every element in subarray [0..${totalSteps}] is in its final sorted non-decreasing position. State this theorem clearly for full 8/16 marks in Anna University & KCT examinations.`;
    } else if (variables.pivot !== undefined) {
      displayedText = `Exam Note: Lomuto Partitioning with pivot = ${variables.pivot}. Invariant: arr[low..i] < pivot, arr[i+1..j-1] >= pivot. Write this exact inequality in Part B dry-run questions.`;
    } else if (variables.minIdx !== undefined) {
      displayedText = `Exam Note: Selection Sort scans for the smallest element in unsorted suffix. Comparisons = n(n-1)/2 regardless of initial input permutation.`;
    } else {
      const varsList = Object.entries(variables).map(([k, v]) => `${k}=${v}`).join(', ');
      displayedText = `Exam Tip: Trace registers (${varsList || 'i, j, key'}) in your worksheet dry-run table. Every step must reflect the exact line executed.`;
    }
  } else if (mode === 'technical') {
    modeBadge = 'Register & Invariant Inspector';
    const regString = Object.entries(variables).length > 0
      ? Object.entries(variables).map(([k, v]) => `${k}: ${v}`).join(' | ')
      : 'No active register writes';
    displayedText = `Registers: [${regString}] • Execution Progress: Step ${stepIndex + 1} of ${totalSteps} (${Math.round(((stepIndex + 1) / Math.max(1, totalSteps)) * 100)}%). Invariant verified.`;
  }

  const progressPercent = Math.min(100, Math.round(((stepIndex + 1) / Math.max(1, totalSteps)) * 100));

  return (
    <div className={`w-full flex flex-col items-center select-none ${className}`}>
      {/* 1. SPEECH BUBBLE (Above Algo) - 4-Color Theme */}
      <div className="w-full relative bg-white border-2 border-[#E5DCF9] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg shadow-[#E5DCF9]/60 transition-all duration-300">
        {/* Subtle decorative background accent */}
        <div className="absolute top-0 right-0 w-40 sm:w-64 h-full bg-gradient-to-l from-[#F8F6FE]/80 to-transparent rounded-r-2xl sm:rounded-r-3xl pointer-events-none" />

        {/* Bubble Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-[#F0EBFD]">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 bg-[#F4F0FF] p-1 rounded-xl border border-[#E5DCF9]">
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('beginner');
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                mode === 'beginner'
                  ? 'bg-[#7B42F6] text-white shadow-xs scale-102'
                  : 'text-[#61527E] hover:text-[#7B42F6] hover:bg-white/80'
              }`}
              title="Beginner mode with friendly analogies"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Beginner</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('exam');
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                mode === 'exam'
                  ? 'bg-[#7B42F6] text-white shadow-xs scale-102'
                  : 'text-[#61527E] hover:text-[#7B42F6] hover:bg-white/80'
              }`}
              title="Exam-oriented note tailored for KCT 23CS401 syllabus"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Exam Mode</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('technical');
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                mode === 'technical'
                  ? 'bg-[#7B42F6] text-white shadow-xs scale-102'
                  : 'text-[#61527E] hover:text-[#7B42F6] hover:bg-white/80'
              }`}
              title="Technical state inspection"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Technical</span>
            </button>
          </div>

          {/* Step Progress & Sound Control */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-[#F8F6FE] border border-[#E5DCF9] px-2.5 py-1 rounded-lg text-xs font-mono text-[#544372]">
              <span className="font-bold text-[#7B42F6]">Step {stepIndex + 1}/{totalSteps}</span>
              <div className="w-14 h-1.5 bg-[#E5DCF9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#7B42F6] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              className="p-1.5 rounded-lg border border-[#E5DCF9] text-[#61527E] hover:text-[#7B42F6] hover:bg-[#F4F0FF] transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#7B42F6]" />}
            </button>
          </div>
        </div>

        {/* Bubble Description Body */}
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#7B42F6] bg-[#F4F0FF] border border-[#E5DCF9] px-2 py-0.5 rounded-md">
              {modeBadge}
            </span>
            <span className="text-xs text-[#7B6E96] font-medium truncate">
              {algorithmName}
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-[#F8F6FE] border border-[#E5DCF9]">
            <p className="text-sm sm:text-base text-[#201538] leading-relaxed font-semibold tracking-normal">
              {displayedText}
            </p>
          </div>

          {/* Quick Variable Badges if present */}
          {Object.keys(variables).length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] font-mono text-[#7B6E96] mr-1">Registers:</span>
              {Object.entries(variables).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-[#E5DCF9] text-[#201538] shadow-2xs"
                >
                  <span className="text-[#7B42F6]">{key}:</span>
                  <span className="font-bold">{value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 2. TAIL-POINTING SVG */}
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-8 h-4 pointer-events-none overflow-visible flex justify-center">
          <svg
            width="28"
            height="15"
            viewBox="0 0 28 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_2px_rgba(200,185,235,0.6)]"
          >
            {/* White triangular fill */}
            <path
              d="M0 0 L14 15 L28 0 Z"
              fill="#FFFFFF"
            />
            {/* Outline matching border-[#E5DCF9] */}
            <path
              d="M0 0 L14 15 L28 0"
              stroke="#E5DCF9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Erase the top border seam inside the speech bubble */}
            <line x1="1" y1="0" x2="27" y2="0" stroke="#FFFFFF" strokeWidth="3" />
          </svg>
        </div>
      </div>

      {/* 3. PEACOCK MENTOR CHARACTER - Elegant Greenish Symbol */}
      <div
        onClick={handleAlgoClick}
        className={`flex flex-col items-center mt-3 cursor-pointer group transition-transform duration-200 ${
          algoBounce ? 'scale-110 -translate-y-1' : 'hover:scale-105'
        }`}
        title="Peacock - DAA Mentor (Click for voice explanation!)"
      >
        {/* Peacock Crest Feather plumes aligning with speech bubble pointer */}
        <div className="relative flex flex-col items-center">
          {/* Shimmering Green Feather Aura */}
          <div className="w-4 h-4 rounded-full bg-[#10B981] absolute -top-1 animate-ping opacity-50 pointer-events-none" />
          <div className="flex items-center gap-1 -mb-1 relative z-10">
            <div className="w-1.5 h-3 bg-gradient-to-t from-[#047857] to-[#34D399] rounded-full transform -rotate-15 shadow-xs" />
            <div className="w-2 h-4 bg-gradient-to-t from-[#047857] to-[#10B981] rounded-full shadow-xs" />
            <div className="w-1.5 h-3 bg-gradient-to-t from-[#047857] to-[#34D399] rounded-full transform rotate-15 shadow-xs" />
          </div>
        </div>

        {/* Peacock Head & Feather Crest Badge - Greenish Palette */}
        <div className={`w-20 h-14 bg-gradient-to-b from-[#ECFDF5] via-white to-[#F0FDF4] border-2 rounded-2xl flex items-center justify-center p-1.5 shadow-md relative transition-all ${
          isSpeaking
            ? 'border-[#10B981] animate-pulse-glow-emerald scale-105'
            : 'border-[#10B981] group-hover:border-[#059669]'
        }`}>
          {/* Speaking Floating Sound Waves */}
          {isSpeaking && (
            <div className="absolute -right-3 -top-2 flex items-center gap-0.5 pointer-events-none">
              <span className="text-xs animate-ping">🗣️</span>
              <span className="text-xs animate-bounce delay-100">💬</span>
            </div>
          )}

          {/* Peacock SVG Illustration */}
          <svg viewBox="0 0 60 40" className="w-full h-full overflow-visible">
            {/* Background Feather Plumage Fan */}
            <g className={isSpeaking ? 'animate-feather-fan origin-bottom' : ''}>
              <path d="M12 28 C8 18 14 8 22 14" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
              <circle cx="21" cy="14" r="2" fill="#F5B800" />
              <path d="M22 28 C20 12 28 6 30 12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
              <circle cx="30" cy="12" r="2.2" fill="#F5B800" />
              <path d="M48 28 C52 18 46 8 38 14" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
              <circle cx="39" cy="14" r="2" fill="#F5B800" />
            </g>

            {/* Peacock Body & Royal Neck */}
            <path
              d="M26 34 C24 30 25 24 27 20 C28 17 31 17 32 19 C33 22 32 28 34 34 Z"
              fill="#047857"
            />
            {/* Crown Plume */}
            <circle cx="28" cy="14" r="1.5" fill="#34D399" />
            <circle cx="31" cy="13.5" r="1.6" fill="#10B981" />

            {/* Golden Beak - animated when speaking */}
            <polygon
              points={isSpeaking ? "32.5,18.5 36.5,20.5 32.5,22.2" : "32.5,19 36,20.5 32.5,21.5"}
              fill="#F5B800"
              className={isSpeaking ? "transition-all duration-150" : ""}
            />

            {/* Blinking Jewel Eye */}
            <circle cx="30" cy="19" r={isBlinking ? "0.4" : "1.2"} fill="#FFFFFF" />
            {!isBlinking && <circle cx="30.2" cy="19" r="0.6" fill="#064E3B" />}

            {/* Emerald Wing Accent */}
            <ellipse cx="29" cy="28" rx="4" ry="5" fill="#10B981" opacity="0.9" />
            <ellipse cx="29" cy="28" rx="2" ry="2.5" fill="#34D399" />
          </svg>
        </div>

        {/* Peacock Mentor Name and Role Badge */}
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className="text-xs font-mono font-black text-[#047857] tracking-wider flex items-center gap-1">
            <span>PEACOCK</span>
            {isSpeaking && <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />}
          </span>
          <span className="text-[10px] font-bold text-[#047857] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.2 rounded-full shadow-2xs">
            {isSpeaking ? 'Narrating...' : 'DAA Peacock Mentor'}
          </span>
        </div>
      </div>
    </div>
  );
};
