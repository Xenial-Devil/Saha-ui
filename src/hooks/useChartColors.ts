import { useMemo } from "react";
import type { ChartVariant } from "../components/Chart/Chart.types";

const CHART_COLOR_PALETTES: Record<ChartVariant, string[]> = {
  default: [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ],
  primary: [
    "hsl(var(--primary))",
    "hsl(var(--primary) / 0.8)",
    "hsl(var(--primary) / 0.6)",
    "hsl(var(--primary) / 0.4)",
    "hsl(var(--primary) / 0.2)",
  ],
  secondary: [
    "hsl(var(--secondary))",
    "hsl(var(--secondary) / 0.8)",
    "hsl(var(--secondary) / 0.6)",
    "hsl(var(--secondary) / 0.4)",
    "hsl(var(--secondary) / 0.2)",
  ],
  accent: [
    "hsl(var(--accent))",
    "hsl(var(--accent-foreground) / 0.8)",
    "hsl(var(--accent) / 0.6)",
    "hsl(var(--accent) / 0.4)",
    "hsl(var(--accent) / 0.2)",
  ],
  success: [
    "hsl(var(--success))",
    "hsl(142 76% 46%)",
    "hsl(142 76% 56%)",
    "hsl(142 76% 66%)",
    "hsl(142 76% 76%)",
  ],
  warning: [
    "hsl(var(--warning))",
    "hsl(38 92% 60%)",
    "hsl(38 92% 70%)",
    "hsl(38 92% 80%)",
    "hsl(38 92% 90%)",
  ],
  error: [
    "hsl(var(--destructive))",
    "hsl(0 84% 70%)",
    "hsl(0 84% 75%)",
    "hsl(0 84% 80%)",
    "hsl(0 84% 85%)",
  ],
  info: [
    "hsl(var(--info))",
    "hsl(199 89% 58%)",
    "hsl(199 89% 68%)",
    "hsl(199 89% 78%)",
    "hsl(199 89% 88%)",
  ],
  outline: [
    "hsl(var(--foreground))",
    "hsl(var(--foreground) / 0.7)",
    "hsl(var(--foreground) / 0.5)",
    "hsl(var(--foreground) / 0.3)",
    "hsl(var(--foreground) / 0.1)",
  ],
  ghost: [
    "hsl(var(--muted-foreground))",
    "hsl(var(--muted-foreground) / 0.7)",
    "hsl(var(--muted-foreground) / 0.5)",
    "hsl(var(--muted-foreground) / 0.3)",
    "hsl(var(--muted-foreground) / 0.1)",
  ],
  glass: [
    "hsl(var(--primary) / 0.8)",
    "hsl(var(--secondary) / 0.8)",
    "hsl(var(--accent) / 0.8)",
    "hsl(var(--success) / 0.8)",
    "hsl(var(--warning) / 0.8)",
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
