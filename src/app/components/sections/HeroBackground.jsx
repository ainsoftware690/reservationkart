// Pure CSS + SVG animated sky — zero dependencies
// Renders on server (no 'use client' needed — no state/effects)

const PlaneSVG = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Side-profile airplane silhouette */}
    <path d="M 10 55 L 42 42 L 75 40 Q 92 40 92 50 Q 92 60 75 60 L 42 58 L 10 65 Z" />
    <path d="M 30 42 L 50 25 L 58 25 L 48 42 Z" />
    <path d="M 20 58 L 32 68 L 38 68 L 32 58 Z" />
    <path d="M 78 50 L 88 44 L 90 50 L 88 56 Z" />
  </svg>
);

const CloudSVG = ({ className, style }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 300 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <ellipse cx="150" cy="70" rx="140" ry="30" fill="white" fillOpacity="0.12" />
    <ellipse cx="110" cy="55" rx="70"  ry="35" fill="white" fillOpacity="0.10" />
    <ellipse cx="190" cy="50" rx="60"  ry="30" fill="white" fillOpacity="0.10" />
    <ellipse cx="150" cy="45" rx="90"  ry="40" fill="white" fillOpacity="0.08" />
  </svg>
);

// Static stars — deterministic positions (no Math.random = no hydration mismatch)
const STARS = [
  { x: 5,  y: 8,  size: 2, delay: 0   },
  { x: 12, y: 15, size: 1, delay: 0.5 },
  { x: 20, y: 5,  size: 2, delay: 1   },
  { x: 28, y: 20, size: 1, delay: 1.5 },
  { x: 35, y: 10, size: 2, delay: 0.8 },
  { x: 42, y: 3,  size: 1, delay: 2   },
  { x: 50, y: 18, size: 2, delay: 0.3 },
  { x: 58, y: 8,  size: 1, delay: 1.2 },
  { x: 65, y: 22, size: 2, delay: 0.6 },
  { x: 72, y: 6,  size: 1, delay: 1.8 },
  { x: 80, y: 14, size: 2, delay: 0.9 },
  { x: 88, y: 4,  size: 1, delay: 2.2 },
  { x: 93, y: 19, size: 2, delay: 0.4 },
  { x: 15, y: 28, size: 1, delay: 1.6 },
  { x: 45, y: 25, size: 1, delay: 0.7 },
  { x: 75, y: 28, size: 2, delay: 1.3 },
];

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">

      {/* === SKY GRADIENT === */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            180deg,
            #060D20 0%,
            #0B1E4B 25%,
            #0E2A6B 55%,
            #1a3a8a 75%,
            rgba(242,101,34,0.25) 100%
          )`,
        }}
      />

      {/* === STARS === */}
      {STARS.map((star, i) => (
        <div
          key={i}
          className="hero-star absolute rounded-full bg-white"
          style={{
            width:  star.size,
            height: star.size,
            left:   `${star.x}%`,
            top:    `${star.y}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* === GLOWING ORBS (brand color atmosphere) === */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(242,101,34,0.2) 0%, transparent 70%)',
          animation: 'orbPulse 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(29,78,216,0.15) 0%, transparent 70%)',
          animation: 'orbPulse 8s ease-in-out infinite 2s',
        }}
      />

      {/* === CLOUDS === */}
      <CloudSVG
        className="hero-cloud-1 absolute"
        style={{ top: '15%', width: 350, animationDelay: '0s' }}
      />
      <CloudSVG
        className="hero-cloud-2 absolute"
        style={{ top: '35%', width: 260, animationDelay: '15s' }}
      />
      <CloudSVG
        className="hero-cloud-3 absolute"
        style={{ top: '55%', width: 400, animationDelay: '6s' }}
      />

      {/* === AIRPLANES === */}
      {/* Large plane — middle height */}
      <PlaneSVG
        className="hero-plane-1 absolute text-white"
        style={{
          top: '30%',
          width: 80,
          height: 80,
          opacity: 0.9,
          filter: 'drop-shadow(0 0 8px rgba(242,101,34,0.8))',
        }}
      />

      {/* Small plane — upper area */}
      <PlaneSVG
        className="hero-plane-2 absolute text-brand-orange-400"
        style={{
          top: '15%',
          width: 45,
          height: 45,
          opacity: 0.7,
          filter: 'drop-shadow(0 0 4px rgba(242,101,34,0.5))',
        }}
      />

      {/* Tiny plane — opposite direction, lower */}
      <PlaneSVG
        className="hero-plane-3 absolute text-white"
        style={{
          top: '55%',
          width: 30,
          height: 30,
          opacity: 0.4,
        }}
      />

      {/* === SUBTLE GRID OVERLAY (depth effect) === */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* === BOTTOM FADE (blends into content) === */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.95))',
        }}
      />
    </div>
  );
}