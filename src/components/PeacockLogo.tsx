import React from 'react';

interface PeacockLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/**
 * High-fidelity, artistic Peacock Logo in greenish symbol.
 * Features peacock feather crown, emerald plumage, and jewel eye.
 */
export const PeacockLogo: React.FC<PeacockLogoProps> = ({
  className = 'w-7 h-7',
  size = 28,
  animated = false
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${animated ? 'animate-pulse' : ''} ${className}`}
      aria-label="Peacock Symbol"
    >
      <defs>
        {/* Rich Greenish Gradients */}
        <linearGradient id="peacockEmeraldGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="45%" stopColor="#10B981" />
          <stop offset="85%" stopColor="#059669" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        <linearGradient id="peacockTealGrad" x1="10" y1="20" x2="38" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="60%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>

        <linearGradient id="peacockPlumeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <filter id="peacockGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#10B981" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Background soft glow circular badge */}
      <circle cx="24" cy="24" r="22" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.5" />

      {/* Fan of Peacock Feathers (Ocelli) - Animated Breathing Fan */}
      <g filter="url(#peacockGlow)" className="animate-feather-fan" style={{ transformOrigin: '24px 28px' }}>
        {/* Feather 1 - Left Outer */}
        <path
          d="M24 28 C14 26 8 20 8 13 C12 12 18 16 24 28 Z"
          fill="url(#peacockTealGrad)"
          opacity="0.9"
        />
        {/* Eye 1 */}
        <ellipse cx="12" cy="16" rx="2.5" ry="3.5" transform="rotate(-30 12 16)" fill="#10B981" />
        <circle cx="12" cy="16" r="1.5" fill="#F5B800" />
        <circle cx="12" cy="16" r="0.75" fill="#047857" />

        {/* Feather 2 - Left Inner */}
        <path
          d="M24 28 C16 22 13 14 15 7 C20 7 22 14 24 28 Z"
          fill="url(#peacockEmeraldGrad)"
        />
        {/* Eye 2 */}
        <ellipse cx="17" cy="11" rx="2.5" ry="3.5" transform="rotate(-15 17 11)" fill="#34D399" />
        <circle cx="17" cy="11" r="1.5" fill="#F5B800" />
        <circle cx="17" cy="11" r="0.75" fill="#065F46" />

        {/* Feather 3 - Center Top */}
        <path
          d="M24 28 C21 18 20 10 24 4 C28 10 27 18 24 28 Z"
          fill="url(#peacockEmeraldGrad)"
        />
        {/* Eye 3 */}
        <ellipse cx="24" cy="8" rx="2.8" ry="3.8" fill="#6EE7B7" />
        <circle cx="24" cy="8" r="1.8" fill="#F5B800" />
        <circle cx="24" cy="8" r="0.8" fill="#047857" />

        {/* Feather 4 - Right Inner */}
        <path
          d="M24 28 C26 14 28 7 33 7 C35 14 32 22 24 28 Z"
          fill="url(#peacockEmeraldGrad)"
        />
        {/* Eye 4 */}
        <ellipse cx="31" cy="11" rx="2.5" ry="3.5" transform="rotate(15 31 11)" fill="#34D399" />
        <circle cx="31" cy="11" r="1.5" fill="#F5B800" />
        <circle cx="31" cy="11" r="0.75" fill="#065F46" />

        {/* Feather 5 - Right Outer */}
        <path
          d="M24 28 C30 16 36 12 40 13 C40 20 34 26 24 28 Z"
          fill="url(#peacockTealGrad)"
          opacity="0.9"
        />
        {/* Eye 5 */}
        <ellipse cx="36" cy="16" rx="2.5" ry="3.5" transform="rotate(30 36 16)" fill="#10B981" />
        <circle cx="36" cy="16" r="1.5" fill="#F5B800" />
        <circle cx="36" cy="16" r="0.75" fill="#047857" />
      </g>

      {/* Slender Peacock Neck & Body in Royal Emerald/Teal */}
      <path
        d="M22 41 C19 39 19 32 21 28 C22 25 23 23 23 20 C23 18 21.5 17 22.5 15 C23.5 13 26 13 26.5 15 C27 16.5 25.5 18 25.5 20 C25.5 23 27 26 27 30 C27 36 26 40 22 41 Z"
        fill="#047857"
      />
      {/* Breast Highlight */}
      <path
        d="M23 25 C23 22 24 20 24.5 18 C25 20 25.5 23 25.5 26 C25.5 29 24.5 33 23 35 Z"
        fill="#10B981"
        opacity="0.85"
      />

      {/* Peacock Beak (Golden) */}
      <polygon points="26.5,15.2 29.5,16.5 26.5,17.2" fill="#F5B800" />

      {/* Peacock Eye */}
      <circle cx="24.8" cy="15.2" r="0.9" fill="#FFFFFF" />
      <circle cx="24.9" cy="15.2" r="0.5" fill="#064E3B" />

      {/* Peacock Crown / Crest Feathers on Head */}
      <path d="M24 13.5 L22.5 9" stroke="#047857" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="22.5" cy="8.5" r="1" fill="#34D399" />

      <path d="M24.5 13.5 L24.5 8" stroke="#047857" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="24.5" cy="7.5" r="1.1" fill="#10B981" />

      <path d="M25 13.5 L26.5 9" stroke="#047857" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="26.5" cy="8.5" r="1" fill="#34D399" />
    </svg>
  );
};
