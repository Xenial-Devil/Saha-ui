"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ChartLegendProps {
  payload?: Array<{
    value: string;
    color?: string;
    dataKey?: string;
    type?: string;
    payload?: any;
  }>;
  verticalAlign?: "top" | "bottom" | "middle";
  nameKey?: string;
  className?: string;
  content?: React.ReactElement;
}

export const ChartLegend = React.forwardRef<HTMLDivElement, ChartLegendProps>(
  ({ payload, verticalAlign = "bottom", nameKey, className }, ref) => {
    if (!payload?.length) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" && "pb-3",
          verticalAlign === "bottom" && "pt-3",
          className,
        )}
      >
        {payload.map((item, index) => {
          const itemName = nameKey
            ? item.payload?.[nameKey]
            : item.value || item.dataKey;

          return (
            <div
              key={`legend-item-${index}`}
              className="flex items-center gap-1.5"
            >
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color || "hsl(var(--muted-foreground))",
                }}
              />
              <span className="text-xs text-muted-foreground">{itemName}</span>
            </div>
          );
        })}
      </div>
    );
  },
);

ChartLegend.displayName = "ChartLegend";

// Wrapper component for Recharts Legend content prop
export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  Omit<ChartLegendProps, "payload">
>((props, ref) => {
  return <ChartLegend ref={ref} payload={(props as any).payload} {...props} />;
});

ChartLegendContent.displayName = "ChartLegendContent";
