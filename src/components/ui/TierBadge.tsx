import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: string;
  size?: "sm" | "md";
}

const tierConfig: Record<string, { bg: string; text: string; label: string }> = {
  FREE: {
    bg: "bg-[var(--color-tier-free)]/15",
    text: "text-[var(--color-tier-free)]",
    label: "Free",
  },
  SILVER: {
    bg: "bg-[var(--color-tier-silver)]/15",
    text: "text-[var(--color-tier-silver)]",
    label: "Silver",
  },
  GOLD: {
    bg: "bg-[var(--color-tier-gold)]/15",
    text: "text-[var(--color-tier-gold)]",
    label: "Gold",
  },
  PLATINUM: {
    bg: "bg-[var(--color-tier-platinum)]/15",
    text: "text-[var(--color-tier-platinum)]",
    label: "Platinum",
  },
};

export function TierBadge({ tier, size = "md" }: TierBadgeProps) {
  const config = tierConfig[tier.toUpperCase()] ?? tierConfig.FREE;

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full border border-transparent",
        config.bg,
        config.text,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs"
      )}
    >
      {config.label}
    </span>
  );
}
