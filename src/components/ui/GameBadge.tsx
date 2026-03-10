import { cn } from "@/lib/utils";

interface GameBadgeProps {
  game: string;
  size?: "sm" | "md";
}

const gameConfig: Record<string, { bg: string; text: string; dot: string; label: string }> = {
  MLBB: {
    bg: "bg-[var(--color-mlbb)]/15",
    text: "text-[var(--color-mlbb)]",
    dot: "bg-[var(--color-mlbb)]",
    label: "MLBB",
  },
  FF: {
    bg: "bg-[var(--color-freefire)]/15",
    text: "text-[var(--color-freefire)]",
    dot: "bg-[var(--color-freefire)]",
    label: "Free Fire",
  },
};

export function GameBadge({ game, size = "md" }: GameBadgeProps) {
  const config = gameConfig[game.toUpperCase()] ?? gameConfig.MLBB;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold rounded-full",
        config.bg,
        config.text,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs"
      )}
    >
      <span className={cn("size-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
