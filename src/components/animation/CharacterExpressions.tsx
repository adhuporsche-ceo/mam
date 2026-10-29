import React from 'react';

export type ExpressionType = 'idle' | 'thinking' | 'surprised' | 'happy' | 'sad' | 'celebrating' | 'comparing' | 'sleeping';

interface CharacterExpressionsProps {
  expression: ExpressionType;
  isBlinking?: boolean;
}

/**
 * Anime & Chibi Model Expression Renderer
 * Features kawaii blush cheeks, multi-glint anime irises, star-eyes, anime sweat drops, and cat mouths.
 */
export const CharacterExpressions: React.FC<CharacterExpressionsProps> = ({
  expression,
  isBlinking = false
}) => {
  // Blinking closed anime eyes: cute curved lashes with rosy blush
  if (isBlinking && (expression === 'idle' || expression === 'thinking')) {
    return (
      <g className="transition-all duration-150">
        {/* Anime curved lashes */}
        <path d="M 15 20 Q 21 24 27 20" fill="none" stroke="#201538" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M 37 20 Q 43 24 49 20" fill="none" stroke="#201538" strokeWidth="2.8" strokeLinecap="round" />
        {/* Kawaii cheek blush */}
        <ellipse cx="14" cy="24" rx="4" ry="2" fill="#F43F5E" opacity="0.4" />
        <ellipse cx="50" cy="24" rx="4" ry="2" fill="#F43F5E" opacity="0.4" />
        {/* Cute small smile */}
        <path d="M 28 28 Q 32 31 36 28" fill="none" stroke="#201538" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }

  switch (expression) {
    // -----------------------------------------------------------------------
    // 1. CELEBRATING: Anime Star-Eyes & Cat Mouth (✨ Starry Eyes! ✨)
    // -----------------------------------------------------------------------
    case 'celebrating':
      return (
        <g className="transition-all duration-200">
          {/* Left Star Eye */}
          <path
            d="M 21 14 L 23 18 L 27 19 L 23 21 L 21 25 L 19 21 L 15 19 L 19 18 Z"
            fill="#F5B800"
            stroke="#B45309"
            strokeWidth="0.8"
            className="animate-spin"
            style={{ transformOrigin: '21px 19.5px', animationDuration: '4s' }}
          />
          {/* Right Star Eye */}
          <path
            d="M 43 14 L 45 18 L 49 19 L 45 21 L 43 25 L 41 21 L 37 19 L 41 18 Z"
            fill="#F5B800"
            stroke="#B45309"
            strokeWidth="0.8"
            className="animate-spin"
            style={{ transformOrigin: '43px 19.5px', animationDuration: '4s' }}
          />
          {/* Kawaii Soft Pink Anime Blush */}
          <ellipse cx="13" cy="25" rx="4.5" ry="2.5" fill="#FB7185" opacity="0.6" />
          <line x1="11" y1="24" x2="15" y2="26" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          <line x1="13" y1="23" x2="17" y2="25" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

          <ellipse cx="51" cy="25" rx="4.5" ry="2.5" fill="#FB7185" opacity="0.6" />
          <line x1="49" y1="24" x2="53" y2="26" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
          <line x1="51" y1="23" x2="55" y2="25" stroke="#E11D48" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

          {/* Happy Cat Mouth :3 */}
          <path
            d="M 27 28 Q 29.5 32 32 29 Q 34.5 32 37 28"
            fill="none"
            stroke="#201538"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      );

    // -----------------------------------------------------------------------
    // 2. COMPARING: Intense Anime Concentration & Sweat Drop (🔥 Concentrated! 💧)
    // -----------------------------------------------------------------------
    case 'comparing':
      return (
        <g className="transition-all duration-200">
          {/* Anime Sweat Drop on Temple */}
          <path
            d="M 52 8 C 50 11 48 13 50 15 C 52 17 55 16 55 14 C 55 12 53 10 52 8 Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="1"
            className="animate-bounce"
          />

          {/* Intense Anime Eyes with Multi-Glint */}
          <ellipse cx="21" cy="19" rx="6" ry="6.5" fill="#FFFFFF" stroke="#201538" strokeWidth="1.8" />
          <ellipse cx="23" cy="19" rx="3.5" ry="4.5" fill="#7B42F6" />
          <circle cx="23" cy="18" r="2" fill="#201538" />
          <circle cx="24.5" cy="16.5" r="1.4" fill="#FFFFFF" />
          <circle cx="21.5" cy="21" r="0.8" fill="#FFFFFF" opacity="0.9" />

          <ellipse cx="43" cy="19" rx="6" ry="6.5" fill="#FFFFFF" stroke="#201538" strokeWidth="1.8" />
          <ellipse cx="41" cy="19" rx="3.5" ry="4.5" fill="#7B42F6" />
          <circle cx="41" cy="18" r="2" fill="#201538" />
          <circle cx="42.5" cy="16.5" r="1.4" fill="#FFFFFF" />
          <circle cx="39.5" cy="21" r="0.8" fill="#FFFFFF" opacity="0.9" />

          {/* Sharp Anime Eyebrows */}
          <line x1="14" y1="12" x2="26" y2="14" stroke="#201538" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="40" y1="14" x2="50" y2="12" stroke="#201538" strokeWidth="2.4" strokeLinecap="round" />

          {/* Determined small mouth */}
          <line x1="28" y1="29" x2="36" y2="29" stroke="#201538" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      );

    // -----------------------------------------------------------------------
    // 3. SURPRISED / SWAPPING: Wide Anime Shock Eyes & Speed Lines
    // -----------------------------------------------------------------------
    case 'surprised':
      return (
        <g className="transition-all duration-200">
          {/* Big Wide Manga Eyes */}
          <circle cx="20" cy="18" r="7.5" fill="#FFFFFF" stroke="#201538" strokeWidth="2" />
          <circle cx="20" cy="18" r="3" fill="#201538" />
          <circle cx="22" cy="16" r="1.2" fill="#FFFFFF" />

          <circle cx="44" cy="18" r="7.5" fill="#FFFFFF" stroke="#201538" strokeWidth="2" />
          <circle cx="44" cy="18" r="3" fill="#201538" />
          <circle cx="46" cy="16" r="1.2" fill="#FFFFFF" />

          {/* High arched anime brows */}
          <path d="M 13 9 Q 20 4 27 9" fill="none" stroke="#201538" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 37 9 Q 44 4 51 9" fill="none" stroke="#201538" strokeWidth="2.2" strokeLinecap="round" />

          {/* Open Gasp O-mouth */}
          <ellipse cx="32" cy="30" rx="4" ry="5.5" fill="#201538" />
          <ellipse cx="32" cy="32" rx="2" ry="2.5" fill="#FB7185" />
        </g>
      );

    // -----------------------------------------------------------------------
    // 4. HAPPY / TARGET FOUND: Kawaii Crescent Eyes & Blush
    // -----------------------------------------------------------------------
    case 'happy':
      return (
        <g className="transition-all duration-200">
          {/* Inverted crescent happy eyes */}
          <path d="M 15 20 Q 21 12 27 20" fill="none" stroke="#201538" strokeWidth="3" strokeLinecap="round" />
          <path d="M 37 20 Q 43 12 49 20" fill="none" stroke="#201538" strokeWidth="3" strokeLinecap="round" />

          {/* Rosy blush cheeks with anime hash marks */}
          <ellipse cx="13" cy="24" rx="4" ry="2" fill="#FB7185" opacity="0.6" />
          <ellipse cx="51" cy="24" rx="4" ry="2" fill="#FB7185" opacity="0.6" />

          {/* Big open happy mouth */}
          <path d="M 25 26 Q 32 37 39 26 Z" fill="#E11D48" stroke="#201538" strokeWidth="1.6" />
          <path d="M 27 26 Q 32 29 37 26" fill="#FFFFFF" />
        </g>
      );

    // -----------------------------------------------------------------------
    // 5. THINKING / PIVOT: Contemplative Shonen Hero Gaze
    // -----------------------------------------------------------------------
    case 'thinking':
      return (
        <g className="transition-all duration-200">
          {/* Sparkle glint on glass/temple */}
          <circle cx="50" cy="12" r="1.5" fill="#F5B800" className="animate-ping" />

          {/* Eyes looking up-right */}
          <ellipse cx="21" cy="18" rx="6" ry="6.5" fill="#FFFFFF" stroke="#201538" strokeWidth="1.8" />
          <ellipse cx="23.5" cy="16" rx="3.2" ry="4" fill="#3B82F6" />
          <circle cx="23.5" cy="15.5" r="1.8" fill="#1E3A8A" />
          <circle cx="25" cy="14" r="1.2" fill="#FFFFFF" />

          <ellipse cx="43" cy="18" rx="6" ry="6.5" fill="#FFFFFF" stroke="#201538" strokeWidth="1.8" />
          <ellipse cx="45.5" cy="16" rx="3.2" ry="4" fill="#3B82F6" />
          <circle cx="45.5" cy="15.5" r="1.8" fill="#1E3A8A" />
          <circle cx="47" cy="14" r="1.2" fill="#FFFFFF" />

          {/* Curious raised brow */}
          <path d="M 14 13 Q 20 10 26 13" fill="none" stroke="#201538" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 39 10 Q 45 7 51 12" fill="none" stroke="#201538" strokeWidth="2.2" strokeLinecap="round" />

          {/* Thinking playful mouth */}
          <path d="M 28 29 Q 32 26 36 29" fill="none" stroke="#201538" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );

    // -----------------------------------------------------------------------
    // 6. SLEEPING: Chibi Zzz Bubble
    // -----------------------------------------------------------------------
    case 'sleeping':
      return (
        <g className="transition-all duration-200">
          {/* Gentle closed crescent sleeping lashes */}
          <path d="M 15 22 Q 21 26 27 22" fill="none" stroke="#64748B" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 37 22 Q 43 26 49 22" fill="none" stroke="#64748B" strokeWidth="2.8" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <ellipse cx="14" cy="26" rx="3.5" ry="1.8" fill="#FDA4AF" opacity="0.5" />
          <ellipse cx="50" cy="26" rx="3.5" ry="1.8" fill="#FDA4AF" opacity="0.5" />
          {/* Small mouth */}
          <ellipse cx="32" cy="29" rx="2" ry="2.2" fill="#64748B" />
        </g>
      );

    // -----------------------------------------------------------------------
    // 7. SAD / ELIMINATED: Droopy Anime Eyes with Tear Bead
    // -----------------------------------------------------------------------
    case 'sad':
      return (
        <g className="transition-all duration-200">
          {/* Droopy teardrop eye */}
          <circle cx="21" cy="20" r="5" fill="#FFFFFF" stroke="#201538" strokeWidth="1.6" />
          <circle cx="21" cy="21" r="2.5" fill="#3B82F6" />
          <circle cx="43" cy="20" r="5" fill="#FFFFFF" stroke="#201538" strokeWidth="1.6" />
          <circle cx="43" cy="21" r="2.5" fill="#3B82F6" />
          {/* Little tear drop */}
          <ellipse cx="15" cy="24" rx="1.5" ry="2" fill="#38BDF8" />
          {/* Downturned mouth */}
          <path d="M 27 31 Q 32 26 37 31" fill="none" stroke="#201538" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    // -----------------------------------------------------------------------
    // 8. IDLE: Signature Kawaii Anime Big Sparkling Eyes
    // -----------------------------------------------------------------------
    case 'idle':
    default:
      return (
        <g className="transition-all duration-200">
          {/* Left Big Anime Eye */}
          <ellipse cx="21" cy="18" rx="6.5" ry="7.5" fill="#FFFFFF" stroke="#201538" strokeWidth="1.8" />
          <ellipse cx="22" cy="18.5" rx="4" ry="5.5" fill="#7B42F6" />
          <circle cx="22" cy="18.5" r="2.5" fill="#201538" />
          {/* Large sparkle glint */}
          <circle cx="23.5" cy="15.5" r="1.8" fill="#FFFFFF" />
          {/* Small bottom glitter */}
          <circle cx="20.5" cy="21" r="1" fill="#FFFFFF" opacity="0.9" />

          {/* Right Big Anime Eye */}
          <ellipse cx="43" cy="18" rx="6.5" ry="7.5" fill="#FFFFFF" stroke="#201538" strokeWidth="1.8" />
          <ellipse cx="44" cy="18.5" rx="4" ry="5.5" fill="#7B42F6" />
          <circle cx="44" cy="18.5" r="2.5" fill="#201538" />
          {/* Large sparkle glint */}
          <circle cx="45.5" cy="15.5" r="1.8" fill="#FFFFFF" />
          {/* Small bottom glitter */}
          <circle cx="42.5" cy="21" r="1" fill="#FFFFFF" opacity="0.9" />

          {/* Soft Kawaii Blush */}
          <ellipse cx="13" cy="24" rx="3.5" ry="1.8" fill="#FB7185" opacity="0.45" />
          <ellipse cx="51" cy="24" rx="3.5" ry="1.8" fill="#FB7185" opacity="0.45" />

          {/* Gentle anime smile */}
          <path d="M 27 27 Q 32 32 37 27" fill="none" stroke="#201538" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      );
  }
};
