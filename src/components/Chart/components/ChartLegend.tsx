// components/ChartLegend.tsx
import { cn } from "../../../lib/utils";

type LegendItem = { value: string; color: string; dataKey: string };
type Props = {
  payload: LegendItem[];
  config?: {
    onClick?: (dataKey: string) => void;
    position?: "top" | "bottom" | "right" | "left";
  };
  disabled: Set<string>;
};

export function ChartLegend({ payload, config, disabled }: Props) {
  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap gap-2",
        config?.position === "top" ? "mb-3" : "mt-3"
      )}
      role="list"
      aria-label="Chart legend"
    >
      {payload.map((item) => {
        const isDisabled = disabled.has(item.dataKey);
        return (
          <button
            key={item.dataKey}
            type="button"
            onClick={() => config?.onClick?.(item.dataKey)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              "bg-card hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-ring",
              isDisabled ? "opacity-50 grayscale" : "opacity-100"
            )}
            aria-pressed={!isDisabled}
            aria-label={`Toggle ${item.value}`}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.value}</span>
          </button>
        );
      })}
    </div>
  );
}
