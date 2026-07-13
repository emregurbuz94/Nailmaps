import { ServicePattern } from "@/lib/types";

interface Props {
  pattern: ServicePattern;
  colors: [string, string, string];
}

export default function SalonCover({ pattern, colors }: Props) {
  const [a, b, c] = colors;

  if (pattern === "marble") {
    return (
      <svg viewBox="0 0 104 130" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="104" height="130" fill={a} />
        <path d="M-10 40 Q40 10 60 50 T130 60" stroke={b} strokeWidth="7" fill="none" opacity=".7" />
        <path d="M-10 90 Q50 70 80 100 T130 95" stroke="#fff" strokeWidth="4" fill="none" opacity=".5" />
        <circle cx="80" cy="30" r="5" fill={c} />
      </svg>
    );
  }

  if (pattern === "french") {
    return (
      <svg viewBox="0 0 104 130" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="104" height="130" fill={a} />
        <path d="M0 20 Q52 -10 104 20 V0 H0 Z" fill={c} />
        <circle cx="26" cy="70" r="4" fill={b} />
        <circle cx="60" cy="95" r="4" fill={b} />
        <circle cx="82" cy="55" r="4" fill={b} />
      </svg>
    );
  }

  if (pattern === "glitter") {
    return (
      <svg viewBox="0 0 104 130" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="104" height="130" fill={a} />
        {Array.from({ length: 14 }).map((_, i) => (
          <circle
            key={i}
            cx={(i * 37) % 104}
            cy={(i * 53) % 130}
            r={1.5 + (i % 3)}
            fill={i % 2 ? b : c}
            opacity={0.5 + (i % 4) * 0.12}
          />
        ))}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 104 130" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="104" height="130" fill={a} />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle
          key={i}
          cx={18 + (i % 3) * 34}
          cy={20 + Math.floor(i / 3) * 40}
          r="7"
          fill={i % 2 ? b : c}
        />
      ))}
    </svg>
  );
}
