import React, { useState, useEffect, useRef } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=<>?/';

export default function DecryptedText({
  text = '',
  speed = 40,
  maxIterations = 15,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  animateOn = 'hover', // 'hover', 'view', or 'both'
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  const triggerAnimation = () => {
    let iteration = 0;
    const originalText = text;
    const textLength = originalText.length;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential) {
              const progress = iteration / maxIterations;
              const threshold =
                revealDirection === 'end'
                  ? (textLength - index) / textLength
                  : index / textLength;
              if (progress > threshold) return char;
            } else {
              if (iteration >= maxIterations) return char;
            }

            if (useOriginalCharsOnly) {
              const chars = originalText.replace(/\s+/g, '');
              return chars[Math.floor(Math.random() * chars.length)] || char;
            }
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('');
      });

      iteration += 1;
      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
      }
    }, speed);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (animateOn === 'view' || animateOn === 'both') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              triggerAnimation();
              setHasAnimated(true);
            }
          });
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => observer.disconnect();
    }
  }, [text, hasAnimated, animateOn]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' || animateOn === 'both') {
      setIsHovering(true);
      triggerAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block font-mono tracking-wider cursor-default ${parentClassName}`}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
