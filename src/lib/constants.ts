// Tier pricing (IDR)
export const TIER_PRICES = {
  FREE: 0,
  SILVER: 49_000,
  GOLD: 99_000,
  PLATINUM: 199_000,
} as const;

// Tier labels
export const TIER_LABELS = {
  FREE: "Free",
  SILVER: "Silver",
  GOLD: "Gold",
  PLATINUM: "Platinum",
} as const;

// Tier colors
export const TIER_COLORS = {
  FREE: "text-tier-free",
  SILVER: "text-tier-silver",
  GOLD: "text-tier-gold",
  PLATINUM: "text-tier-platinum",
} as const;

// Game labels
export const GAME_LABELS = {
  mlbb: "Mobile Legends",
  freefire: "Free Fire",
} as const;

// MLBB Ranks
export const MLBB_RANKS = [
  "Warrior",
  "Elite",
  "Master",
  "Grandmaster",
  "Epic",
  "Legend",
  "Mythic",
  "Mythical Honor",
  "Mythical Glory",
  "Immortal",
] as const;

// MLBB Roles
export const MLBB_ROLES = [
  "Gold Laner",
  "EXP Laner",
  "Mid Laner",
  "Jungler",
  "Roamer",
] as const;

// Free Fire Ranks
export const FF_RANKS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Heroic",
  "Grandmaster",
] as const;

// Evaluation rubric aspects
export const EVAL_ASPECTS = [
  { key: "mechanical", label: "Mechanical Skill", weight: 0.25 },
  { key: "gameSense", label: "Game Sense / Macro", weight: 0.25 },
  { key: "heroMastery", label: "Hero Mastery", weight: 0.20 },
  { key: "teamwork", label: "Teamwork & Communication", weight: 0.15 },
  { key: "mental", label: "Mental & Attitude", weight: 0.15 },
] as const;

// Talent Score formula weights
export const TALENT_WEIGHTS = {
  skill: 0.4,
  mindset: 0.3,
  commitment: 0.3,
} as const;

// Scouting threshold
export const SCOUTING_THRESHOLD = 85;
