export function FootballField() {
  return (
    <svg
      viewBox="0 0 1200 533"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 h-full w-full object-cover"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ opacity: 0.5 }}
    >
      {/* Field background */}
      <rect width="1200" height="533" fill="#1a3d0e" />

      {/* End zones */}
      <rect x="0" y="0" width="100" height="533" fill="#1f4a12" />
      <rect x="1100" y="0" width="100" height="533" fill="#1f4a12" />

      {/* End zone text */}
      <text
        x="50"
        y="280"
        fill="#2a5e18"
        fontSize="60"
        fontWeight="bold"
        textAnchor="middle"
        transform="rotate(-90, 50, 280)"
        fontFamily="sans-serif"
      >
        PLAYBOOK
      </text>
      <text
        x="1150"
        y="260"
        fill="#2a5e18"
        fontSize="60"
        fontWeight="bold"
        textAnchor="middle"
        transform="rotate(90, 1150, 260)"
        fontFamily="sans-serif"
      >
        BRASIL
      </text>

      {/* End zone boundary lines */}
      <line x1="100" y1="0" x2="100" y2="533" stroke="white" strokeWidth="2" />
      <line x1="1100" y1="0" x2="1100" y2="533" stroke="white" strokeWidth="2" />

      {/* Yard lines every 100px (10 yards) from endzone to endzone */}
      {Array.from({ length: 9 }, (_, i) => {
        const x = 200 + i * 100
        return (
          <line
            key={`yard-${i}`}
            x1={x}
            y1={0}
            x2={x}
            y2={533}
            stroke="white"
            strokeWidth="1.5"
          />
        )
      })}

      {/* Yard numbers */}
      {[10, 20, 30, 40, 50, 40, 30, 20, 10].map((num, i) => {
        const x = 200 + i * 100
        return (
          <g key={`num-${i}`}>
            <text
              x={x}
              y={60}
              fill="white"
              fontSize="28"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="sans-serif"
              opacity="0.4"
            >
              {num}
            </text>
            <text
              x={x}
              y={510}
              fill="white"
              fontSize="28"
              fontWeight="bold"
              textAnchor="middle"
              fontFamily="sans-serif"
              opacity="0.4"
            >
              {num}
            </text>
          </g>
        )
      })}

      {/* Hash marks */}
      {Array.from({ length: 99 }, (_, i) => {
        const x = 110 + i * 10
        return (
          <g key={`hash-${i}`}>
            {/* Top hash */}
            <line
              x1={x}
              y1={175}
              x2={x}
              y2={185}
              stroke="white"
              strokeWidth="0.75"
            />
            {/* Bottom hash */}
            <line
              x1={x}
              y1={348}
              x2={x}
              y2={358}
              stroke="white"
              strokeWidth="0.75"
            />
          </g>
        )
      })}

      {/* Sideline borders */}
      <rect
        x="0"
        y="0"
        width="1200"
        height="533"
        fill="none"
        stroke="white"
        strokeWidth="3"
      />

      {/* Center circle (midfield logo area) */}
      <circle cx="600" cy="266" r="40" stroke="white" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  )
}
