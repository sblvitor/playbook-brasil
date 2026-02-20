import { forwardRef } from "react";

interface PlayerProps {
  x: number;
  y: number;
  color: string;
  id?: string;
  label?: string;
}

export const Player = forwardRef<SVGGElement, PlayerProps>(
  ({ x, y, color, id, label }, ref) => {
    return (
      <g
        ref={ref}
        id={id}
        transform={`translate(${x}, ${y})`}
        style={{ willChange: "transform" }}
      >
        {/* Sombra */}
        <ellipse cx="0" cy="2" rx="12" ry="4" fill="#000" opacity="0.35" />

        {/* Círculo de fundo */}
        <circle cx="0" cy="0" r="11" fill={color} />
        <circle
          cx="0"
          cy="0"
          r="11"
          fill="none"
          stroke="#fff"
          strokeWidth="1.2"
          opacity="0.3"
        />

        {/* Silhueta de usuário */}
        {/* Cabeça */}
        <circle cx="0" cy="-3" r="3.5" fill="#fff" opacity="0.9" />
        {/* Corpo */}
        <path
          d="M -6,8 C -6,2 -4,1.5 0,1.5 C 4,1.5 6,2 6,8"
          fill="#fff"
          opacity="0.9"
        />

        {/* Label (posição) */}
        {label && (
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fill="#fff"
            fontSize="7"
            fontWeight="700"
            fontFamily="'Inter', sans-serif"
            opacity="0.5"
          >
            {label}
          </text>
        )}
      </g>
    );
  },
);

Player.displayName = "Player";