import React, { useState } from 'react';

export default function TrueFocus({
  words = ['HIDROLIK', 'KAROSERI', 'DISHUB', 'PRESISI'],
  manualMode = false,
  blurAmount = 4,
  borderColor = '#f59e0b',
  glowColor = 'rgba(245, 158, 11, 0.4)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = '',
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={`relative inline-flex items-center gap-2 flex-wrap ${className}`}>
      {words.map((word, index) => {
        const isFocused = currentIndex === index;
        return (
          <span
            key={index}
            onMouseEnter={() => setCurrentIndex(index)}
            className="relative px-3 py-1 text-sm md:text-base font-mono font-bold uppercase transition-all duration-300 cursor-pointer"
            style={{
              color: isFocused ? '#ffffff' : '#94a3b8',
              filter: isFocused ? 'none' : `blur(${blurAmount * 0.3}px)`,
              opacity: isFocused ? 1 : 0.6,
            }}
          >
            {/* Active Industrial Focus Brackets */}
            {isFocused && (
              <span
                className="absolute inset-0 pointer-events-none rounded border-2"
                style={{
                  borderColor: borderColor,
                  boxShadow: `0 0 15px ${glowColor}`,
                }}
              >
                <span className="absolute -top-1 -left-1 w-2 h-2 bg-amber-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-400" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-400" />
              </span>
            )}
            {word}
          </span>
        );
      })}
    </div>
  );
}
