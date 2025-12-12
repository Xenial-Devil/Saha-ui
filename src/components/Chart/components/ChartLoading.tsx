import { cn } from "../../../lib/utils";
import type { ChartSize } from "../Chart.types";

interface ChartLoadingProps {
  size?: ChartSize;
  className?: string;
}

const sizeMap = {
  xs: "min-h-[150px]",
  sm: "min-h-[200px]",
  md: "min-h-[300px]",
  lg: "min-h-[400px]",
  xl: "min-h-[500px]",
  "2xl": "min-h-[600px]",
  "3xl": "min-h-[700px]",
  "4xl": "min-h-[800px]",
};

export function ChartLoading({ size = "md", className }: ChartLoadingProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full",
        sizeMap[size],
        className
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading chart...</p>
      </div>
    </div>
  );
}
