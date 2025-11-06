"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    color?: string;
    name: string;
    value: any;
    dataKey?: string;
    payload?: any;
    fill?: string;
    stroke?: string;
  }>;
  label?: string | number;
  labelFormatter?: (label: any, payload: any[]) => React.ReactNode;
  labelClassName?: string;
  formatter?: (
    value: any,
    name: string,
    item: any,
    index: number,
    payload: any[],
  ) => React.ReactNode;
  indicator?: "dot" | "line" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  nameKey?: string;
  className?: string;
}

export const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  (
    {
      active,
      payload,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      nameKey,
      className,
    },
    ref,
  ) => {
    if (!active || !payload?.length) {
      return null;
    }

    const renderLabel = () => {
      if (hideLabel) return null;

      const displayLabel = labelFormatter
        ? labelFormatter(label, payload)
        : label;

      if (!displayLabel) return null;

      return (
        <div
          className={cn("mb-1.5 font-medium text-foreground", labelClassName)}
        >
          {displayLabel}
        </div>
      );
    };

    const renderIndicator = (color: string) => {
      if (hideIndicator) return null;

      switch (indicator) {
        case "line":
          return (
            <div
              className="h-2.5 w-0.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
          );
        case "dashed":
          return (
            <div className="flex h-2.5 w-1 shrink-0 flex-col gap-[3px]">
              <div
                className="h-px w-full rounded-full"
                style={{ backgroundColor: color }}
              />
              <div
                className="h-px w-full rounded-full"
                style={{ backgroundColor: color }}
              />
            </div>
          );
        case "dot":
        default:
          return (
            <div
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: color }}
            />
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {renderLabel()}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const itemColor =
              item.stroke ||
              item.fill ||
              item.color ||
              "hsl(var(--muted-foreground))";
            const itemName = nameKey
              ? item.payload?.[nameKey]
              : item.name || item.dataKey;

            const itemValue = formatter
              ? formatter(item.value, itemName, item, index, payload)
              : item.value;

            return (
              <div
                key={`${item.dataKey}-${index}`}
                className="flex w-full items-center justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-1.5">
                  {renderIndicator(itemColor)}
                  <span className="text-muted-foreground">{itemName}</span>
                </div>
                <span className="font-mono font-medium tabular-nums text-foreground">
                  {itemValue}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

ChartTooltip.displayName = "ChartTooltip";

// Wrapper component for Recharts Tooltip content prop
export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  Omit<ChartTooltipProps, "active" | "payload" | "label">
>((props, ref) => {
  return (props as any).active ? (
    <ChartTooltip
      ref={ref}
      active={(props as any).active}
      payload={(props as any).payload}
      label={(props as any).label}
      {...props}
    />
  ) : null;
});

ChartTooltipContent.displayName = "ChartTooltipContent";
