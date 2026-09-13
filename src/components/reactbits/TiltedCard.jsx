import React, { useRef, useState } from 'react';

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted Card Image',
  captionText = '',
  badge = '',
  specList = [],
  containerHeight = '340px',
  scaleOnHover = 1.02,
  rotateAmplitude = 10,
  onClick = null,
}) {
  const ref = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    setRotateX(rotX);
    setRotateY(rotY);

    const glX = ((e.clientX - rect.left) / rect.width) * 100;
    const glY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glX, y: glY, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1000px',
      }}
      className={`relative cursor-pointer transition-transform duration-300 ease-out group ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Outer Enclosure with Luxury Light Bezel */}
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
          height: containerHeight,
        }}
        className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-lg shadow-slate-300/40 hover:shadow-2xl hover:border-amber-500/40 transition-all duration-300"
      >
        {/* Real Vehicle Image */}
        <img
          src={imageSrc}
          alt={altText}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Dynamic Specular Glare Overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glarePosition.opacity,
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
          }}
        />

        {/* Technical Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />

        {/* Top Badges */}
        {badge && (
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/95 text-amber-600 border border-amber-500/30 shadow-md backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              {badge}
            </span>
          </div>
        )}

        {/* Bottom Technical Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5 z-20 flex flex-col justify-end">
          <p className="text-[11px] font-mono text-amber-400 font-bold tracking-wider uppercase mb-1">
            [ UNIT PROFILE ]
          </p>
          <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-amber-300 transition-colors">
            {captionText}
          </h4>

          {specList && specList.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {specList.map((spec, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-black/60 border border-white/15 text-[11px] font-mono text-slate-200 backdrop-blur-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
