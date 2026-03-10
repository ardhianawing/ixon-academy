import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  trend?: {
    direction: "up" | "down";
    value: string;
  };
  className?: string;
}

export function StatCard({ value, label, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-4 space-y-2",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-heading font-bold text-2xl text-foreground tabular-nums">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md",
              trend.direction === "up"
                ? "text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10"
                : "text-[var(--color-accent-red)] bg-[var(--color-accent-red)]/10"
            )}
          >
            {trend.direction === "up" ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {trend.value}
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
