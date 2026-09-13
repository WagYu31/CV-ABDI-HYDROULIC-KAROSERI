import React, { useEffect, useRef, useState } from 'react';

export default function CountUp({
  to = 0,
  from = 0,
  duration = 2,
  separator = '',
  useGrouping = false,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [count, setCount] = useState(from);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            animateCount();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [to, from, duration]);

  const animateCount = () => {
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // EaseOutExpo curve
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = from + (to - from) * easeOut;

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(to);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const formattedValue = useGrouping
    ? count.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : Math.round(count).toString();

  return (
    <span ref={elementRef} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
