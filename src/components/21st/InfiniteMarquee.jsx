import React from 'react';

/**
 * 21st.dev inspired InfiniteMarquee Component
 * Smooth continuous ticker ribbon with dual gradient edge masks and pause-on-hover.
 */
export default function InfiniteMarquee({
  children,
  className = '',
  reverse = false,
  pauseOnHover = true,
}) {
  return (
    <div
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${className}`}
    >
      <div
        className={`flex min-w-full shrink-0 gap-4 py-3 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
