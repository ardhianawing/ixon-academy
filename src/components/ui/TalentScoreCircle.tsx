import { cn } from "@/lib/utils";

interface TalentScoreCircleProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function TalentScoreCircle({
  score,
  size = 120,
  strokeWidth = 8,
  className,
}: TalentScoreCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(score, 0), 100);
  const offset = circumference - (percentage / 100) * circumference;

  const color =
    score >= 85
      ? "var(--color-accent-green)"
      : score >= 70
        ? "var(--color-accent-orange)"
        : "var(--color-accent-red)";

  const label =
    score >= 85 ? "Excellent" : score >= 70 ? "Good" : "Needs Work";

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/50"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-heading font-bold tabular-nums"
          style={{ fontSize: size * 0.28, color }}
        >
          {score}
        </span>
        <span
          className="text-muted-foreground font-medium"
          style={{ fontSize: size * 0.1 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
