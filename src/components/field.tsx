interface FieldProps {
  className?: string;
  children?: React.ReactNode;
}

// ViewBox: 1200x534 → 10px = 1 jarda
// Endzones: 0-100 (esquerda) e 1100-1200 (direita)
// Campo: 100-1100
export function Field({ className, children }: FieldProps) {
  const yardNumbers = [10, 20, 30, 40, 50, 40, 30, 20, 10];

  return (
    <svg
      viewBox="0 0 1200 534"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="field-vignette" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor="#020a00" stopOpacity="0.7" />
        </radialGradient>

        {/* Textura de grama sutil */}
        <pattern
          id="grass"
          patternUnits="userSpaceOnUse"
          width="6"
          height="6"
        >
          <rect width="6" height="6" fill="transparent" />
          <circle cx="1" cy="1" r="0.4" fill="#fff" opacity="0.012" />
          <circle cx="4" cy="4" r="0.4" fill="#000" opacity="0.02" />
        </pattern>

        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== FUNDO BASE ===== */}
      <rect width="1200" height="534" fill="#14320d" />

      {/* ===== ENDZONES ===== */}
      <rect x="0" y="0" width="100" height="534" fill="#0f2609" />
      <rect x="1100" y="0" width="100" height="534" fill="#0f2609" />

      {/* Bordas das endzones */}
      <line
        x1="100"
        y1="0"
        x2="100"
        y2="534"
        stroke="#fff"
        strokeWidth="2.5"
        opacity="0.3"
      />
      <line
        x1="1100"
        y1="0"
        x2="1100"
        y2="534"
        stroke="#fff"
        strokeWidth="2.5"
        opacity="0.3"
      />

      {/* Texto das endzones */}
      <text
        x="50"
        y="300"
        textAnchor="middle"
        fill="#fff"
        opacity="0.07"
        fontSize="40"
        fontWeight="900"
        fontFamily="'Arial Black', sans-serif"
        transform="rotate(-90, 50, 300)"
        letterSpacing="12"
      >
        ENDZONE
      </text>
      <text
        x="1150"
        y="240"
        textAnchor="middle"
        fill="#fff"
        opacity="0.07"
        fontSize="40"
        fontWeight="900"
        fontFamily="'Arial Black', sans-serif"
        transform="rotate(90, 1150, 240)"
        letterSpacing="12"
      >
        ENDZONE
      </text>

      {/* ===== FAIXAS DE GRAMA (mowing pattern) ===== */}
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={`stripe-${i}`}
          x={100 + i * 100}
          y="0"
          width="100"
          height="534"
          fill={i % 2 === 0 ? "#fff" : "#000"}
          opacity={i % 2 === 0 ? 0.012 : 0.015}
        />
      ))}

      <rect width="1200" height="534" fill="url(#grass)" />

      {/* ===== SIDELINES ===== */}
      <line
        x1="0"
        y1="2"
        x2="1200"
        y2="2"
        stroke="#fff"
        strokeWidth="3"
        opacity="0.15"
      />
      <line
        x1="0"
        y1="532"
        x2="1200"
        y2="532"
        stroke="#fff"
        strokeWidth="3"
        opacity="0.15"
      />

      {/* ===== YARD LINES (a cada 10 jardas) ===== */}
      {yardNumbers.map((num, i) => {
        const x = 200 + i * 100;
        return (
          <g key={`yl-${i}`}>
            <line
              x1={x}
              y1="2"
              x2={x}
              y2="532"
              stroke="#fff"
              strokeWidth="1"
              opacity="0.15"
            />

            {/* Número topo */}
            <text
              x={x + 10}
              y="56"
              fill="#fff"
              opacity="0.12"
              fontSize="36"
              fontWeight="900"
              fontFamily="'Arial Black', sans-serif"
            >
              {num}
            </text>

            {/* Número base */}
            <text
              x={x + 10}
              y="518"
              fill="#fff"
              opacity="0.12"
              fontSize="36"
              fontWeight="900"
              fontFamily="'Arial Black', sans-serif"
            >
              {num}
            </text>
          </g>
        );
      })}

      {/* ===== YARD LINES INTERMEDIÁRIAS (a cada 5 jardas) ===== */}
      {Array.from({ length: 19 }, (_, i) => {
        const x = 150 + i * 50;
        // pular se já for linha de 10
        if ((x - 100) % 100 === 0) return null;
        return (
          <line
            key={`yl5-${i}`}
            x1={x}
            y1="2"
            x2={x}
            y2="532"
            stroke="#fff"
            strokeWidth="0.5"
            opacity="0.07"
          />
        );
      })}

      {/* ===== HASH MARKS ===== */}
      {Array.from({ length: 100 }, (_, i) => {
        const x = 100 + i * 10;
        return (
          <g key={`hash-${i}`}>
            {/* Hash superior */}
            <line
              x1={x}
              y1="178"
              x2={x}
              y2="190"
              stroke="#fff"
              strokeWidth="0.8"
              opacity="0.12"
            />
            {/* Hash inferior */}
            <line
              x1={x}
              y1="344"
              x2={x}
              y2="356"
              stroke="#fff"
              strokeWidth="0.8"
              opacity="0.12"
            />
          </g>
        );
      })}

      {/* ===== VINHETA ===== */}
      <rect width="1200" height="534" fill="url(#field-vignette)" />

      {/* ===== CONTEÚDO DINÂMICO ===== */}
      {children}
    </svg>
  );
}