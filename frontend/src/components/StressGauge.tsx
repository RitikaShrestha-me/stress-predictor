import { useEffect, useState } from "react";

interface StressGaugeProps {
  level: "Low" | "Moderate" | "High";
}

const config = {
  Low: { rotation: -60, color: "var(--stress-low)", label: "Low Stress" },
  Moderate: { rotation: 0, color: "var(--stress-moderate)", label: "Moderate Stress" },
  High: { rotation: 60, color: "var(--stress-high)", label: "High Stress" },
};

const StressGauge = ({ level }: StressGaugeProps) => {
  const [animated, setAnimated] = useState(false);
  const { rotation, color, label } = config[level];

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 animate-scale-in">
      <div className="relative w-48 h-28 overflow-hidden">
        {/* Gauge arc */}
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(152, 55%, 45%)" />
              <stop offset="50%" stopColor="hsl(38, 90%, 52%)" />
              <stop offset="100%" stopColor="hsl(0, 72%, 55%)" />
            </linearGradient>
          </defs>
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.3"
          />
          {/* Needle */}
          <g
            style={{
              transform: `rotate(${animated ? rotation : -90}deg)`,
              transformOrigin: "100px 100px",
              transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <line x1="100" y1="100" x2="100" y2="30" stroke={`hsl(${color})`} strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="100" r="6" fill={`hsl(${color})`} />
          </g>
        </svg>
      </div>

      <div className="text-center">
        <div
          className="relative inline-flex items-center justify-center"
        >
          <span
            className="absolute w-16 h-16 rounded-full animate-pulse-ring"
            style={{ backgroundColor: `hsl(${color} / 0.15)` }}
          />
          <span
            className="relative text-2xl font-bold tracking-tight"
            style={{ color: `hsl(${color})` }}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StressGauge;
