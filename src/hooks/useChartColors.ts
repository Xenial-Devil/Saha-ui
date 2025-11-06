import { useMemo } from "react";
import type { ChartVariant } from "../components/Chart/Chart.types";

const CHART_COLOR_PALETTES: Record<ChartVariant, string[]> = {
  // Default: Vibrant diverse palette (starts darker for better gradients)
  default: [
    "oklch(0.50 0.18 275)", // Purple - darker start
    "oklch(0.50 0.15 145)", // Green - darker start
    "oklch(0.50 0.15 250)", // Blue - darker start
    "oklch(0.55 0.25 340)", // Pink - darker start
    "oklch(0.55 0.12 185)", // Teal - darker start
    "oklch(0.60 0.15 65)", // Orange - darker start
    "oklch(0.50 0.20 25)", // Red - darker start
    "oklch(0.58 0.18 300)", // Violet - darker start
    "oklch(0.55 0.15 110)", // Lime - darker start
    "oklch(0.50 0.18 220)", // Sky Blue - darker start
  ],

  // Primary: Blue-based palette (starts darker)
  primary: [
    "oklch(0.50 0.23 270)", // Primary Blue - darker start
    "oklch(0.55 0.25 340)", // Pink - darker start
    "oklch(0.50 0.15 250)", // Lighter Blue - darker start
    "oklch(0.55 0.12 185)", // Teal - darker start
    "oklch(0.58 0.18 300)", // Purple - darker start
    "oklch(0.60 0.15 65)", // Orange - darker start
    "oklch(0.50 0.18 220)", // Sky Blue - darker start
    "oklch(0.55 0.20 290)", // Deep Purple - darker start
    "oklch(0.52 0.15 240)", // Azure - darker start
    "oklch(0.58 0.10 260)", // Soft Blue - darker start
  ],

  // Secondary: Pink-based palette (starts darker)
  secondary: [
    "oklch(0.55 0.25 340)", // Pink - darker start
    "oklch(0.58 0.18 300)", // Purple - darker start
    "oklch(0.50 0.20 25)", // Red - darker start
    "oklch(0.55 0.12 185)", // Teal - darker start
    "oklch(0.60 0.15 65)", // Orange - darker start
    "oklch(0.50 0.23 270)", // Blue - darker start
    "oklch(0.60 0.22 350)", // Hot Pink - darker start
    "oklch(0.52 0.18 320)", // Magenta - darker start
    "oklch(0.58 0.15 10)", // Coral - darker start
    "oklch(0.55 0.20 330)", // Rose - darker start
  ],

  // Accent: Teal-based palette (starts darker)
  accent: [
    "oklch(0.55 0.12 185)", // Teal - darker start
    "oklch(0.50 0.15 250)", // Blue - darker start
    "oklch(0.50 0.15 145)", // Green - darker start
    "oklch(0.60 0.15 65)", // Orange - darker start
    "oklch(0.58 0.18 300)", // Purple - darker start
    "oklch(0.55 0.25 340)", // Pink - darker start
    "oklch(0.52 0.15 170)", // Cyan - darker start
    "oklch(0.58 0.12 200)", // Turquoise - darker start
    "oklch(0.50 0.18 220)", // Sky - darker start
    "oklch(0.60 0.10 190)", // Mint - darker start
  ],

  // Success: Green-based palette (starts darker)
  success: [
    "oklch(0.50 0.15 145)", // Green - darker start
    "oklch(0.55 0.12 185)", // Teal - darker start
    "oklch(0.50 0.18 275)", // Purple - darker start
    "oklch(0.60 0.15 65)", // Yellow-Orange - darker start
    "oklch(0.50 0.15 250)", // Blue - darker start
    "oklch(0.55 0.18 130)", // Bright Green - darker start
    "oklch(0.58 0.10 160)", // Sage - darker start
    "oklch(0.52 0.12 110)", // Lime - darker start
    "oklch(0.55 0.20 155)", // Forest - darker start
    "oklch(0.60 0.08 170)", // Mint - darker start
  ],

  // Warning: Orange-based palette (starts darker)
  warning: [
    "oklch(0.60 0.15 65)", // Orange - darker start
    "oklch(0.65 0.18 85)", // Yellow - darker start
    "oklch(0.50 0.20 25)", // Red - darker start
    "oklch(0.50 0.15 250)", // Blue - darker start
    "oklch(0.55 0.25 340)", // Pink - darker start
    "oklch(0.62 0.18 55)", // Amber - darker start
    "oklch(0.58 0.20 45)", // Burnt Orange - darker start
    "oklch(0.68 0.15 95)", // Gold - darker start
    "oklch(0.55 0.18 35)", // Terracotta - darker start
    "oklch(0.60 0.12 75)", // Peach - darker start
  ],

  // Error: Red-based palette (starts darker)
  error: [
    "oklch(0.50 0.20 25)", // Red - darker start
    "oklch(0.55 0.25 340)", // Pink - darker start
    "oklch(0.60 0.15 65)", // Orange - darker start
    "oklch(0.50 0.15 145)", // Green - darker start
    "oklch(0.58 0.18 300)", // Purple - darker start
    "oklch(0.52 0.22 15)", // Crimson - darker start
    "oklch(0.48 0.25 35)", // Deep Red - darker start
    "oklch(0.58 0.18 350)", // Rose - darker start
    "oklch(0.55 0.20 10)", // Scarlet - darker start
    "oklch(0.60 0.15 40)", // Coral - darker start
  ],

  // Info: Blue-based palette (starts darker)
  info: [
    "oklch(0.50 0.15 250)", // Blue - darker start
    "oklch(0.55 0.12 185)", // Teal - darker start
    "oklch(0.58 0.18 300)", // Purple - darker start
    "oklch(0.60 0.15 65)", // Orange - darker start
    "oklch(0.50 0.15 145)", // Green - darker start
    "oklch(0.52 0.18 220)", // Sky Blue - darker start
    "oklch(0.48 0.18 260)", // Royal Blue - darker start
    "oklch(0.58 0.10 240)", // Soft Blue - darker start
    "oklch(0.55 0.15 210)", // Azure - darker start
    "oklch(0.60 0.08 230)", // Powder Blue - darker start
  ],

  // Outline: Diverse grayscale with subtle color hints (starts darker)
  outline: [
    "oklch(0.35 0.02 270)", // Dark Blue-Gray - darker start
    "oklch(0.45 0.02 340)", // Medium Pink-Gray - darker start
    "oklch(0.55 0.02 145)", // Light Green-Gray - darker start
    "oklch(0.65 0.02 65)", // Very Light Warm Gray - darker start
    "oklch(0.25 0.02 185)", // Very Dark Teal-Gray - darker start
    "oklch(0.40 0.02 250)", // Dark Cool Gray - darker start
    "oklch(0.50 0.02 25)", // Medium Warm Gray - darker start
    "oklch(0.60 0.02 300)", // Light Purple-Gray - darker start
    "oklch(0.30 0.02 110)", // Dark Olive-Gray - darker start
    "oklch(0.70 0.02 220)", // Very Light Cool Gray - darker start
  ],

  // Ghost: Subtle muted colors with low saturation (starts darker)
  ghost: [
    "oklch(0.50 0.04 270)", // Muted Blue - darker start
    "oklch(0.55 0.04 145)", // Muted Green - darker start
    "oklch(0.45 0.04 340)", // Muted Pink - darker start
    "oklch(0.60 0.04 65)", // Muted Orange - darker start
    "oklch(0.47 0.04 185)", // Muted Teal - darker start
    "oklch(0.53 0.04 300)", // Muted Purple - darker start
    "oklch(0.57 0.04 25)", // Muted Red - darker start
    "oklch(0.43 0.04 250)", // Muted Dark Blue - darker start
    "oklch(0.63 0.04 110)", // Muted Lime - darker start
    "oklch(0.40 0.04 220)", // Muted Navy - darker start
  ],

  // Glass: Vibrant colors with transparency (lighter and more distinct)
  glass: [
    "oklch(0.65 0.20 200 / 0.75)", // Cyan - lighter with more transparency
    "oklch(0.70 0.22 340 / 0.75)", // Bright Pink - lighter
    "oklch(0.68 0.18 160 / 0.75)", // Mint Green - lighter
    "oklch(0.72 0.20 60 / 0.75)", // Golden Orange - lighter
    "oklch(0.65 0.18 290 / 0.75)", // Lavender - lighter
    "oklch(0.70 0.15 180 / 0.75)", // Aqua - lighter
    "oklch(0.68 0.22 350 / 0.75)", // Rose - lighter
    "oklch(0.67 0.18 120 / 0.75)", // Spring Green - lighter
    "oklch(0.75 0.18 80 / 0.75)", // Amber - lighter
    "oklch(0.63 0.20 230 / 0.75)", // Periwinkle - lighter
  ],
};

export function useChartColors(variant: ChartVariant = "default") {
  return useMemo(() => {
    const colors = CHART_COLOR_PALETTES[variant];

    return {
      colors,
      getColor: (index: number): string => colors[index % colors.length],
      getPalette: () => colors,
    };
  }, [variant]);
}
