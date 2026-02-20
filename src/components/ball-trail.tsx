// src/components/field/BallTrail.tsx

interface BallTrailProps {
  path: string;
  id: string;
}

export function BallTrail({ path, id }: BallTrailProps) {
  return (
    <g>
      <defs>
        <linearGradient
          id={`${id}-grad`}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="40%" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.7" />
        </linearGradient>

        <filter id={`${id}-glow`}>
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Glow largo */}
      <path
        id={`${id}-glow-path`}
        d={path}
        fill="none"
        stroke={`url(#${id}-grad)`}
        strokeWidth="8"
        strokeLinecap="round"
        filter={`url(#${id}-glow)`}
        opacity="0"
        strokeDasharray="2000"
        strokeDashoffset="2000"
      />

      {/* Linha nítida */}
      <path
        id={`${id}-line`}
        d={path}
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0"
        strokeDasharray="2000"
        strokeDashoffset="2000"
      />
    </g>
  );
}