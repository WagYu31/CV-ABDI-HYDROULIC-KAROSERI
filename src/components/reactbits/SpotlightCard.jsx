import React, { useRef, useState } from 'react';

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(217, 119, 6, 0.12)', // Rich Gold/Amber highlight in light theme
  outerClassName = '',
  badge = null,
}) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    // Outer Shell (Doppelrand / Double-Bezel Architecture in Luxury Light)
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl p-1.5 bg-slate-100/90 border border-slate-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_12px_40px_rgb(217,119,6,0.08)] group ${outerClassName}`}
    >
      {/* Dynamic Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 45%)`,
        }}
      />

      {/* Mechanical Corner Marks */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-400 select-none pointer-events-none">
        +
      </div>
      <div className="absolute top-2 right-2 text-[10px] font-mono text-slate-400 select-none pointer-events-none">
        +
      </div>

      {/* Inner Core */}
      <div
        className={`relative z-10 h-full w-full rounded-[calc(1rem-2px)] bg-white p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] text-slate-900 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
