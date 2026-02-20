// src/components/field/Football.tsx
import { forwardRef } from "react";

interface FootballProps {
  id?: string;
}

export const Football = forwardRef<SVGGElement, FootballProps>(
  ({ id }, ref) => {
    return (
      <g ref={ref} id={id} style={{ willChange: "transform" }}>
        {/* Sombra */}
        <ellipse cx="0" cy="4" rx="7" ry="3" fill="#000" opacity="0.4" />

        {/* Corpo da bola */}
        <ellipse cx="0" cy="0" rx="5.5" ry="8" fill="#6B3410" />

        {/* Brilho */}
        <ellipse
          cx="-1.5"
          cy="-1"
          rx="2.5"
          ry="5"
          fill="#9B6B3F"
          opacity="0.4"
        />

        {/* Costura central */}
        <line
          x1="0"
          y1="-4.5"
          x2="0"
          y2="4.5"
          stroke="#fff"
          strokeWidth="0.7"
          opacity="0.8"
        />

        {/* Laces */}
        {[-3, -1.5, 0, 1.5, 3].map((offset) => (
          <line
            key={offset}
            x1="-1.5"
            y1={offset}
            x2="1.5"
            y2={offset}
            stroke="#fff"
            strokeWidth="0.5"
            opacity="0.7"
          />
        ))}

        {/* Borda */}
        <ellipse
          cx="0"
          cy="0"
          rx="5.5"
          ry="8"
          fill="none"
          stroke="#3D1E08"
          strokeWidth="0.5"
        />
      </g>
    );
  },
);

Football.displayName = "Football";