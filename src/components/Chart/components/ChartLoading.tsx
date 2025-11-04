import { chartCanvasVariants } from "../Chart.styles";
import { cn } from "../../../lib/utils";
import type { ChartSize } from "../Chart.types";

interface ChartLoadingProps {
  size: ChartSize;
}

export function ChartLoading({ size }: ChartLoadingProps) {
  return (
    <div
      className={cn(
        chartCanvasVariants({ size }),
        "flex items-center justify-center"
      )}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        <p className="text-sm text-muted-foreground">Loading chart...</p>
      </div>
    </div>
  );
}
