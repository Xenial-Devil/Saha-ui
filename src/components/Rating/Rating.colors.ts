import type { RatingColorScheme } from "./Rating.types";

/**
 * Color scheme configuration
 */
export interface ColorSchemeConfig {
  filled: string;
  empty: string;
  glow: string;
}

/**
 * Predefined color schemes with filled and empty colors
 */
export const colorSchemes: Record<RatingColorScheme, ColorSchemeConfig> = {
  // Warm colors
  yellow: {
    filled: "#eab308",
    empty: "#fef9c3",
    glow: "rgba(234, 179, 8, 0.6)",
  },
  amber: {
    filled: "#f59e0b",
    empty: "#fef3c7",
    glow: "rgba(245, 158, 11, 0.6)",
  },
  orange: {
    filled: "#f97316",
    empty: "#ffedd5",
    glow: "rgba(249, 115, 22, 0.6)",
  },
  red: {
    filled: "#ef4444",
    empty: "#fee2e2",
    glow: "rgba(239, 68, 68, 0.6)",
  },
  rose: {
    filled: "#f43f5e",
    empty: "#ffe4e6",
    glow: "rgba(244, 63, 94, 0.6)",
  },
  pink: {
    filled: "#ec4899",
    empty: "#fce7f3",
    glow: "rgba(236, 72, 153, 0.6)",
  },
  fuchsia: {
    filled: "#d946ef",
    empty: "#fae8ff",
    glow: "rgba(217, 70, 239, 0.6)",
  },

  // Cool colors
  purple: {
    filled: "#a855f7",
    empty: "#f3e8ff",
    glow: "rgba(168, 85, 247, 0.6)",
  },
  violet: {
    filled: "#8b5cf6",
    empty: "#ede9fe",
    glow: "rgba(139, 92, 246, 0.6)",
  },
  indigo: {
    filled: "#6366f1",
    empty: "#e0e7ff",
    glow: "rgba(99, 102, 241, 0.6)",
  },
  blue: {
    filled: "#3b82f6",
    empty: "#dbeafe",
    glow: "rgba(59, 130, 246, 0.6)",
  },
  sky: {
    filled: "#0ea5e9",
    empty: "#e0f2fe",
    glow: "rgba(14, 165, 233, 0.6)",
  },
  cyan: {
    filled: "#06b6d4",
    empty: "#cffafe",
    glow: "rgba(6, 182, 212, 0.6)",
  },
  teal: {
    filled: "#14b8a6",
    empty: "#ccfbf1",
    glow: "rgba(20, 184, 166, 0.6)",
  },

  // Nature colors
  green: {
    filled: "#22c55e",
    empty: "#dcfce7",
    glow: "rgba(34, 197, 94, 0.6)",
  },
  emerald: {
    filled: "#10b981",
    empty: "#d1fae5",
    glow: "rgba(16, 185, 129, 0.6)",
  },
  lime: {
    filled: "#84cc16",
    empty: "#ecfccb",
    glow: "rgba(132, 204, 22, 0.6)",
  },

  // Neutral colors
  slate: {
    filled: "#64748b",
    empty: "#e2e8f0",
    glow: "rgba(100, 116, 139, 0.6)",
  },
  gray: {
    filled: "#6b7280",
    empty: "#e5e7eb",
    glow: "rgba(107, 114, 128, 0.6)",
  },
  zinc: {
    filled: "#71717a",
    empty: "#e4e4e7",
    glow: "rgba(113, 113, 122, 0.6)",
  },
  neutral: {
    filled: "#737373",
    empty: "#e5e5e5",
    glow: "rgba(115, 115, 115, 0.6)",
  },
  stone: {
    filled: "#78716c",
    empty: "#e7e5e4",
    glow: "rgba(120, 113, 108, 0.6)",
  },

  // Special colors
  gold: {
    filled: "#ca8a04",
    empty: "#fef3c7",
    glow: "rgba(202, 138, 4, 0.8)",
  },
  bronze: {
    filled: "#c2410c",
    empty: "#ffedd5",
    glow: "rgba(194, 65, 12, 0.6)",
  },
  silver: {
    filled: "#9ca3af",
    empty: "#f3f4f6",
    glow: "rgba(156, 163, 175, 0.8)",
  },
  rainbow: {
    filled:
      "linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)",
    empty: "#e5e7eb",
    glow: "rgba(168, 85, 247, 0.6)",
  },
};

/**
 * Get color scheme by name or return default
 */
export const getColorScheme = (
  scheme: RatingColorScheme | undefined
): ColorSchemeConfig => {
  return colorSchemes[scheme || "yellow"] || colorSchemes.yellow;
};

/**
 * Get all available color scheme names
 */
export const getAllColorSchemes = (): RatingColorScheme[] => {
  return Object.keys(colorSchemes) as RatingColorScheme[];
};

/**
 * Color scheme categories for documentation
 */
export const colorSchemeCategories = {
  warm: ["yellow", "amber", "orange", "red", "rose", "pink", "fuchsia"],
  cool: ["purple", "violet", "indigo", "blue", "sky", "cyan", "teal"],
  nature: ["green", "emerald", "lime"],
  neutral: ["slate", "gray", "zinc", "neutral", "stone"],
  special: ["gold", "bronze", "silver", "rainbow"],
} as const;
