import React, { useState, useEffect } from 'react';
import { CharacterExpressions, ExpressionType } from './CharacterExpressions';
import { soundFx } from '../../utils/soundEffects';

export interface CartoonCharacterProps {
  id: string;
  value: number | string;
  index: number;
  state: 'idle' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'target' | 'sleeping' | 'key' | 'min' | 'discarded';
  heightPercent?: number; // 40% to 100% based on relative value
  reducedMotion?: boolean;
  subLabel?: string;
  roleBadge?: string;
  crown?: boolean;
}

export const CartoonCharacter: React.FC<CartoonCharacterProps> = ({
  value,
  index,
  state,
  heightPercent = 70,
  reducedMotion = false,
  subLabel,
  roleBadge,
  crown = false
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isClickedHop, setIsClickedHop] = useState(false);

  const handleCharacterClick = () => {
    soundFx.playPop();
    setIsClickedHop(true);
    setTimeout(() => setIsClickedHop(false), 500);
  };

  // Periodic natural blinking
  useEffect(() => {
    if (reducedMotion || state === 'sleeping') return;
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3200 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [reducedMotion, state]);

  // Expression selection based on algorithm state
  let expression: ExpressionType = 'idle';
  if (state === 'comparing') expression = 'comparing';
  else if (state === 'swapping') expression = 'surprised';
  else if (state === 'sorted') expression = 'celebrating';
  else if (state === 'pivot') expression = 'thinking';
  else if (state === 'target') expression = 'happy';
  else if (state === 'sleeping' || state === 'discarded') expression = 'sleeping';
  else if (state === 'key' || state === 'min') expression = 'thinking';

  // State-specific palette & animations - 4-Color Professional Theme
  let bodyFill = '#F4F0FF'; // soft lilac-white
  let bodyStroke = '#D4C7F5'; // lavender outline
  let shadowColor = 'shadow-[#E5DCF9]/60';
  let badgeColor = 'bg-[#7B42F6] text-white font-extrabold';
  let stateTag = roleBadge || '';

  if (state === 'comparing') {
    bodyFill = '#FEF9C3'; // warm golden yellow-50
    bodyStroke = '#F5B800'; // golden yellow
    shadowColor = 'shadow-amber-200 ring-4 ring-[#F5B800]/40';
    badgeColor = 'bg-[#F5B800] text-[#201538] font-black';
    if (!stateTag) stateTag = 'COMPARE';
  } else if (state === 'swapping') {
    bodyFill = '#F4F0FF'; // lavender violet
    bodyStroke = '#7B42F6'; // vibrant purple
    shadowColor = 'shadow-purple-300 ring-4 ring-[#7B42F6]/50';
    badgeColor = 'bg-[#7B42F6] text-white font-black';
    if (!stateTag) stateTag = 'SWAP!';
  } else if (state === 'sorted') {
    bodyFill = '#ECFDF5'; // mint emerald-50
    bodyStroke = '#10B981'; // leaf green
    shadowColor = 'shadow-emerald-200 ring-2 ring-emerald-300';
    badgeColor = 'bg-[#10B981] text-white font-bold';
    if (!stateTag) stateTag = '✓ SORTED';
  } else if (state === 'pivot') {
    bodyFill = '#F4F0FF';
    bodyStroke = '#7B42F6';
    shadowColor = 'shadow-purple-200 ring-3 ring-[#7B42F6]/60';
    badgeColor = 'bg-[#7B42F6] text-white font-bold';
    if (!stateTag) stateTag = 'PIVOT';
  } else if (state === 'target') {
    bodyFill = '#ECFDF5';
    bodyStroke = '#10B981';
    badgeColor = 'bg-[#10B981] text-white';
    if (!stateTag) stateTag = 'FOUND!';
  } else if (state === 'key') {
    bodyFill = '#FEF9C3';
    bodyStroke = '#F5B800';
    shadowColor = 'shadow-amber-300 ring-4 ring-[#F5B800]/60';
    badgeColor = 'bg-[#F5B800] text-[#201538] font-black';
    if (!stateTag) stateTag = 'KEY ITEM';
  } else if (state === 'min') {
    bodyFill = '#FEF9C3';
    bodyStroke = '#F5B800';
    shadowColor = 'shadow-amber-300 ring-3 ring-[#F5B800]/50';
    badgeColor = 'bg-[#F5B800] text-[#201538] font-bold';
    if (!stateTag) stateTag = 'MIN CANDIDATE';
  } else if (state === 'sleeping' || state === 'discarded') {
    bodyFill = '#F8F6FE';
    bodyStroke = '#E5DCF9';
    shadowColor = 'shadow-none opacity-40';
    badgeColor = 'bg-[#7C6E96] text-white';
    if (!stateTag) stateTag = 'Zzz...';
  }

  // Jumping or bouncing offset for swapping/comparing or user click
  const transformStyle = reducedMotion
    ? undefined
    : isClickedHop
    ? 'translateY(-24px) scale(1.18)'
    : state === 'swapping'
    ? 'translateY(-16px) scale(1.08)'
    : state === 'comparing'
    ? 'translateY(-7px) scale(1.04)'
    : state === 'sorted'
    ? 'translateY(-2px)'
    : 'translateY(0px)';

  return (
    <div
      onClick={handleCharacterClick}
      title="Click me to cheer on this character!"
      style={{
        transform: transformStyle,
        transition: 'all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      className={`flex flex-col items-center justify-end select-none relative group min-w-[58px] sm:min-w-[72px] cursor-pointer hover:brightness-105 active:scale-95 ${
        state === 'idle' ? 'animate-float-bob' : ''
      }`}
    >
      {/* Click Hop Anime Reaction */}
      {isClickedHop && (
        <div className="absolute -top-12 flex items-center justify-center gap-1 pointer-events-none z-30 animate-bounce">
          <span className="text-base drop-shadow-md">💖</span>
          <span className="text-xs text-amber-400 animate-ping">⭐</span>
          <span className="text-xs font-black text-[#7B42F6] font-mono">KYAA!</span>
        </div>
      )}

      {/* Popping Spark Particles on Swap */}
      {state === 'swapping' && !reducedMotion && (
        <div className="absolute -top-11 flex items-center gap-1 pointer-events-none z-20">
          <span className="text-xs animate-ping">✨</span>
          <span className="text-sm font-black text-[#7B42F6] animate-bounce">⚡</span>
          <span className="text-xs animate-ping delay-150">💫</span>
        </div>
      )}

      {/* State Callout Pill */}
      {stateTag && (
        <span
          className={`absolute -top-7 text-[9px] font-mono font-extrabold px-2 py-0.5 rounded-full border shadow-xs animate-bounce z-10 ${
            state === 'swapping'
              ? 'bg-[#F4F0FF] text-[#7B42F6] border-[#D4C7F5] ring-2 ring-[#7B42F6]/30'
              : state === 'comparing'
              ? 'bg-[#FEF9C3] text-[#92400E] border-[#F5B800] ring-2 ring-[#F5B800]/40'
              : 'bg-[#ECFDF5] text-[#065F46] border-[#10B981] ring-2 ring-[#10B981]/30'
          }`}
        >
          {stateTag}
        </span>
      )}

      {/* Crown for Pivot or Max-Heap King */}
      {(crown || state === 'pivot') && (
        <div className="absolute -top-6 text-sm font-bold text-[#F5B800] drop-shadow-sm animate-bounce z-10">
          👑
        </div>
      )}

      {/* Graduation Cap / Star for Sorted Elements */}
      {state === 'sorted' && !crown && (
        <div className="absolute -top-4 text-xs font-bold text-[#10B981] drop-shadow-sm animate-pulse z-10">
          ⭐
        </div>
      )}

      {/* Sleeping Zzz bubble */}
      {(state === 'sleeping' || state === 'discarded') && (
        <div className="absolute -top-5 right-1 text-xs font-mono font-black text-[#8C7DA8] animate-pulse z-10">
          💤 Zzz
        </div>
      )}

      {/* Character Wrapper with Animated Arms */}
      <div className="relative flex items-center justify-center">
        {/* Left Arm */}
        <div
          className={`absolute -left-2.5 w-3 h-5 rounded-full border-2 transition-transform duration-300 z-0 ${
            state === 'swapping'
              ? '-top-1 rotate-[-55deg] origin-bottom'
              : state === 'comparing'
              ? 'top-4 rotate-[-20deg] origin-top'
              : state === 'sorted'
              ? 'top-2 rotate-[-45deg] origin-bottom'
              : 'top-6 rotate-[10deg] origin-top'
          }`}
          style={{
            backgroundColor: bodyStroke,
            borderColor: bodyStroke
          }}
        >
          {state === 'sorted' && (
            <span className="absolute -top-2 -left-1 text-[8px]">👍</span>
          )}
        </div>

        {/* 2D Character Body */}
        <div
          className={`w-14 sm:w-16 rounded-3xl border-2 flex flex-col items-center justify-between p-2 relative shadow-md transition-all z-10 ${shadowColor} ${
            state === 'swapping' ? 'animate-squish' : state === 'comparing' ? 'animate-wiggle' : ''
          }`}
          style={{
            backgroundColor: bodyFill,
            borderColor: bodyStroke,
            height: `${Math.max(95, Math.min(175, 80 + heightPercent * 0.9))}px`
          }}
        >
          {/* SVG Face Container */}
          <svg viewBox="0 0 64 45" className="w-12 h-9 mt-1 overflow-visible">
            <CharacterExpressions expression={expression} isBlinking={isBlinking} />
          </svg>

          {/* Value Belly Badge */}
          <div
            className={`px-2 py-1 rounded-xl text-xs sm:text-sm font-mono font-extrabold shadow-inner transition-colors duration-200 ${badgeColor}`}
          >
            {value}
          </div>

          {/* Cute Feet */}
          <div className="flex gap-3 -mb-3 z-10">
            <div
              className={`w-3.5 h-2 rounded-full border transition-transform duration-200 ${
                state === 'swapping' ? 'translate-y-0.5' : ''
              }`}
              style={{ backgroundColor: bodyStroke, borderColor: bodyStroke }}
            />
            <div
              className={`w-3.5 h-2 rounded-full border transition-transform duration-200 ${
                state === 'swapping' ? 'translate-y-0.5' : ''
              }`}
              style={{ backgroundColor: bodyStroke, borderColor: bodyStroke }}
            />
          </div>
        </div>

        {/* Right Arm */}
        <div
          className={`absolute -right-2.5 w-3 h-5 rounded-full border-2 transition-transform duration-300 z-0 ${
            state === 'swapping'
              ? '-top-1 rotate-[55deg] origin-bottom'
              : state === 'comparing'
              ? 'top-4 rotate-[35deg] origin-top'
              : state === 'sorted'
              ? 'top-2 rotate-[45deg] origin-bottom'
              : 'top-6 rotate-[-10deg] origin-top'
          }`}
          style={{
            backgroundColor: bodyStroke,
            borderColor: bodyStroke
          }}
        >
          {state === 'comparing' && (
            <span className="absolute -top-1.5 -right-1 text-[9px]">🔍</span>
          )}
        </div>
      </div>

      {/* Dynamic Ground Shadow Ellipse */}
      <div
        className="h-1.5 rounded-full bg-[#201538]/20 blur-[0.8px] transition-all duration-300 mt-2"
        style={{
          width: state === 'swapping' ? '24px' : state === 'comparing' ? '32px' : '42px',
          opacity: state === 'swapping' ? 0.35 : 0.75,
          transform: state === 'swapping' ? 'scale(0.8)' : 'scale(1)'
        }}
      />

      {/* Index and SubLabel under feet */}
      <div className="mt-1 flex flex-col items-center gap-0.5">
        <span className="text-[10px] font-mono font-semibold text-[#665687]">
          #{index}
        </span>
        {subLabel && (
          <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded-md bg-[#F4F0FF] text-[#5521B5] border border-[#E5DCF9] shadow-2xs">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};
