import React from 'react';
import { motion } from 'framer-motion';

/**
 * 21st.dev inspired ShimmerButton Component
 * Luxury industrial button with continuous metallic light sweep reflection and spring physics.
 */
export default function ShimmerButton({
  children,
  onClick,
  href,
  className = '',
  shimmerColor = 'rgba(251, 191, 36, 0.4)',
  shimmerDuration = '2.8s',
  borderRadius = '9999px',
  background = 'rgb(10, 14, 23)',
  ...props
}) {
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center overflow-hidden font-sans font-bold text-sm tracking-wide text-white shadow-xl shadow-slate-950/20 border border-amber-500/40 cursor-pointer ${className}`}
      style={{
        borderRadius,
        backgroundColor: background,
      }}
      {...props}
    >
      {/* Sweeping Shimmer Beam */}
      <div 
        className="absolute inset-0 -translate-x-full animate-shimmer pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${shimmerColor} 50%, transparent 100%)`,
        }}
      />

      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 px-6 py-3.5">
        {children}
      </span>
    </Component>
  );
}
