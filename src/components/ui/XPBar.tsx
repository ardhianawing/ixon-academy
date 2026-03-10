import { cn } from "@/lib/utils";

interface XPBarProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  className?: string;
}

export function XPBar({ currentXP, nextLevelXP, level, className }: XPBarProps) {
  const percentage = Math.min((currentXP / nextLevelXP) * 100, 100);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Level */}
      <div className="flex items-center justify-center size-8 rounded-lg bg-primary/15 text-primary font-bold text-sm shrink-0">
        {level}
      </div>

      {/* Bar */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Level {level}</span>
          <span className="text-muted-foreground tabular-nums">
            {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${percentage}%`,
              background: "linear-gradient(90deg, var(--color-gold-dark), var(--color-gold), var(--color-gold-light))",
            }}
          />
        </div>
      </div>
    </div>
  );
}
